'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

const doExport = (config, appExportDir, apiClient, appID, shouldContinue) => {
    if (!config.includeFeedback) {
        return Promise.resolve();
    }
  
    const exportDir = path.join(appExportDir, 'feedback');
    fs.mkdirSync(exportDir);

    const handlePage = page => {
        const fetchPromises = [];
        page.items.forEach(i => {
            const itemDir = path.join(exportDir, i._id);
            fs.mkdirSync(itemDir);
            const itemJsonPath = path.join(itemDir, 'info.json');
            fs.writeFileSync(itemJsonPath, JSON.stringify(i));
            console.log(`Feedback JSON ${itemJsonPath}`);
            if (i.image_url) {
                fetchPromises.push(apiClient.streamUrl(i.image_url, itemDir)
                .then(name => {
                    console.log(`Feedback Image ${name}`)
                }));
            }
            if (i.replay_url) {
                fetchPromises.push(apiClient.streamUrl(i.replay_url, itemDir)
                .then(name => {
                    console.log(`Feedback Replay ${name}`)
                }));
            }
            if (i.has_logs) {
                fetchPromises.push(apiClient.getFeedbackLogs(appID, i._id)
                .then(log => {
                    const logPath = path.join(itemDir, 'log.txt');
                    fs.writeFileSync(logPath, log);
                    console.log(`Feedback Log ${logPath}`)
                }));
            }
        });
        return Promise.all(fetchPromises).then(() => {
            if (page.next && shouldContinue(page.items[0])) {
                return page.next().then(handlePage);
            }
        });
    };
    
    return apiClient.listFeedback(appID).then(handlePage);
};

exports.doExport = doExport;