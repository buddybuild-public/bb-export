'use strict';

const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');

const doExport = (config, appExportDir, apiClient, appID, shouldContinue) => {
    if (!config.includeBuildMetadata) {
        return Promise.resolve();
    }
    const exportBuildMetadataDir = path.join(appExportDir, 'build-metadata');
    fs.mkdirSync(exportBuildMetadataDir);

    const handlePage = page => {
        const fetchPromises = [];

        page.forEach(buildInfo => {
            const itemDir = path.join(exportBuildMetadataDir, buildInfo._id);
            fs.mkdirSync(itemDir);

            const itemJsonPath = path.join(itemDir, 'buildInfo.json');
            fs.writeFileSync(itemJsonPath, JSON.stringify(buildInfo, null, 2));
            console.log(`Build metadata JSON ${itemJsonPath}`);

            if (config.includeTestResult) {
                fetchPromises.push(apiClient.getTestResult(buildInfo._id)
                    .then((testResult) => {
                        const testResultJsonPath = path.join(itemDir, 'testResult.json');
                        fs.writeFileSync(testResultJsonPath, JSON.stringify(testResult, null, 2));
                        console.log(`Build test result JSON ${testResultJsonPath}`);
                    }));
            }

            if (config.includeTestCoverage) {
                fetchPromises.push(apiClient.getTestCoverage(buildInfo._id)
                    .then((testCoverage) => {
                        const testResultJsonPath = path.join(itemDir, 'testCoverage.json');
                        fs.writeFileSync(testResultJsonPath, JSON.stringify(testCoverage, null, 2));
                        console.log(`Build test coverage JSON ${testResultJsonPath}`);
                    }));
            }
        });

        return Promise.all(fetchPromises).then(() => {
            if (page.next && shouldContinue(page[0])) {
                return page.next().then(handlePage);
            }
        });
    };

    return apiClient.listBuildMetadata(appID).then(handlePage);
};

exports.doExport = doExport;
