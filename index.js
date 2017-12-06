#! /usr/bin/env node
'use strict';

const Promise = require('bluebird');
const prompt = require('prompt');
const path = require('path');
const {existsSync, mkdirSync} = require('fs');
const {ApiClient} = require('./apiClient');
const moment = require('moment');

const initialMessage = `Welcome to the buddybuild export script.  This script will ask you
a few questions and then download your data for archival purposes.
`;
console.log(initialMessage);
prompt.message = 'bb-export';
prompt.start();

const promptSchema = {
    properties: {
        token: {
            hidden: true,
            required: true,
            default: process.env.BB_TOKEN
        },
        appID: {
            message: 'Application ID',
            required: true,
            default: process.env.BB_APP_ID || 'all'
        },
        period: {
            message: 'How many months back to go',
            required: true,
            default: 3
        },
        includeFeedback: {
            type: 'boolean',
            message: 'include feedback (true/false)',
            required: true,
            default: true
        },
        includeCrashReport: {
            type: 'boolean',
            message: 'include crash reports (true/false)',
            required: true,
            default: true
        },
        exportDir: {
            default: path.join(process.cwd(), 'export')
        }
    }
};

const exportForApp = (config, apiClient, appID, shouldContinue) => {
    const appExportDir = path.join(config.exportDir, appID);
    mkdirSync(appExportDir);
    console.log(`Generating Export on app ${appID} to ${appExportDir}`);
    return require('./exportFeedback').doExport(config, appExportDir, apiClient, appID, shouldContinue)
    .then(() => require('./exportCrashReport').doExport(config, appExportDir, apiClient, appID, shouldContinue))
};

prompt.get(promptSchema, (err, result) => {
    const fromDate = moment().subtract(Number(result.period), 'months');
    const shouldContinue = item => {
        const doContinue = moment(item.created_at).isAfter(fromDate);
        if (!doContinue) {
            console.log('Not going back further...');
        }  
        return doContinue;
    };

    let apiClient;
    Promise.try(() => {
        if (err) {
            throw err;
        }
        const exportDir = result.exportDir;
        if (existsSync(exportDir)) {
            throw new Error(`${exportDir} already exists`)
        }
        mkdirSync(exportDir);

        apiClient = new ApiClient(result.token);
        if (result.appID === 'all') {
            return apiClient.listApps().then(apps => apps.map(a => a._id));
        } else {
            return [result.appID]
        }
    })
    .then(appIds => Promise.each(appIds, appId => exportForApp(result, apiClient, appId, shouldContinue)))
    .then(() => {
        console.log('**** Export Complete!')
    })
    .catch((err) => {
        console.log(err);
        return 1;
    });
});
