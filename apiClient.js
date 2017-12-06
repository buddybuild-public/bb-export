'use strict';

const Promise = require('bluebird');
const request = require('request');
const rp = require('request-promise');
const LinkHeader = require('http-link-header');
const fs = require('fs');
const url = require('url');
const path= require('path');

class ApiClient {

    constructor(authToken) {
        this.authToken = authToken;
        this.baseUrl = process.env.BB_BASE_URL || 'https://dashboard.buddybuild.com/'
    }

    getLogger() {
        return this.logger;
    }

    streamUrl(sourceUrl, outDir) {
        const lastUrlPart = url.parse(sourceUrl).path.split('/').slice(-1)[0];
        const outFile = path.join(outDir, lastUrlPart);
        return new Promise((resolve, reject) => {
            request(sourceUrl, (err) => {
                if (err) {
                    return reject(err)
                }
                return resolve();
            }).pipe(fs.createWriteStream(outFile))
        }).then(() => outFile);

    }

    uri(path) {
        return `${this.baseUrl}/${path}`;
    }

    request(path, configOverrides) {
        const baseConfig = {
            json: true,
            method: 'GET'
        };

        const effectiveConfig = Object.assign(
            {
                uri: this.uri(path),
                headers: {
                    Authorization: `Bearer ${this.authToken}`
                }
            },
            baseConfig,
            configOverrides
        );
        
        return rp(effectiveConfig)
            .promise();
    }

    _fetchUriWithLinks(uri) {
        return this.request(uri, {
            resolveWithFullResponse: true
        }).then(response => {
            const result = response.body;
            if (response.headers.link) {
                const link = LinkHeader.parse(response.headers.link);
                link.refs.forEach(l => {
                    result[l.rel] = () => this._fetchUriWithLinks(l.uri);
                });
            }
            return result;
        });
    }
    
    listApps() {
        const path = 'v1/apps';
        return this.request(path);
    }

    listFeedback(appID) {
        const path = `v1/apps/${appID}/feedback`;
        return this._fetchUriWithLinks(path);
    }

    getFeedbackLogs(appID, feedbackID) {
        const path = `v1/apps/${appID}/feedback/${feedbackID}/logs`;
        return this.request(path, { json: false });
    }

    listCrashReport(appID) {
        const path = `v1/apps/${appID}/crash-report`;
        return this._fetchUriWithLinks(path);
    }

    getCrashReportLogs(appID, crashReportID) {
        const path = `v1/apps/${appID}/crash-report/${crashReportID}/logs`;
        return this.request(path, { json: false });
    }

}

exports.ApiClient = ApiClient;
