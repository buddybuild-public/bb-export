'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

const doExport = (config, appExportDir, apiClient, appID, shouldContinue) => {
    if (!config.includeCrashReport) {
        return Promise.resolve();
    }
    const exportDir = path.join(appExportDir, 'crash-report');
    fs.mkdirSync(exportDir);

    const handlePage = page => {
        const fetchPromises = [];
        page.items.forEach(i => {
            const itemDir = path.join(exportDir, i._id);
            fs.mkdirSync(itemDir);
            const itemJsonPath = path.join(itemDir, 'info.json');
            fs.writeFileSync(itemJsonPath, JSON.stringify(i));
            console.log(`Crash Report JSON ${itemJsonPath}`);
            if (i.instant_replay_thumbnail_url) {
                fetchPromises.push(apiClient.streamUrl(i.instant_replay_thumbnail_url, itemDir)
                .then(n => {
                    console.log(`Crash Report IR thumbnail ${n}`)
                }));
            }
            if (i.instant_replay_url) {
                fetchPromises.push(apiClient.streamUrl(i.instant_replay_url, itemDir)
                .then(n => {
                    console.log(`Crash Report IR ${n}`)
                }));
            }
            if (i.has_logs) {
                fetchPromises.push(apiClient.getCrashReportLogs(appID, i._id)
                .then(log => {
                    const logPath = path.join(itemDir, 'log.txt');
                    fs.writeFileSync(logPath, log);
                    console.log(`Crash Report Log ${logPath}`)
                }));
            }
        });
        return Promise.all(fetchPromises).then(() => {
            if (page.next  && shouldContinue(page.items[0])) {
                return page.next().then(handlePage);
            }
        });
    };

    return apiClient.listCrashReport(appID).then(handlePage);
};

exports.doExport = doExport;