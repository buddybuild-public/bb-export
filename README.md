This script provides a mechanism to export buddybuild data via the public API (https://apidocs.buddybuild.com/).

Currently it fetches details about crash reports and feedback, as well as fetching related artifacts like
logs, screenshots, and instant replay videos.

## Prerequisites

This is a Node.js script.  Thus, to install it, you need both `node` and `npm` installed (any version 6 or later
will do).  If you don't have node installed, you can find it in your favorite distribution method (`homebrew`
for example on Mac, `apt-get` or `yum` on Linux), or you can follow the installation steps
here: https://nodejs.org/en/

Installing node also installs `npm`, the Node Package Manager.

## Instructions

* Get the script with: `npm install -g buddybuild-public/bb-export`
* Run the script with: `bb-export`

You will then be prompted to provide:
* api access token (see https://dashboard.buddybuild.com/account/access-token)
* application ID (or all)
* how far back should the script look for data (in months)
* if you want feeedback or crash reports or both
* the directory where you want the data exported 

The export will then run over the public API and pull down
* feedback json
* feedback images/replay videos/logs
* crashreport json
* crashreport images/replay videos/logs

## Example

```
$ bb-export 
Buddybuild Export Script: token:  (<default hidden>) 
Buddybuild Export Script: Application ID:  (all) 
Buddybuild Export Script: How many months back to go:  (3) 
Buddybuild Export Script: includeFeedback:  (true) 
Buddybuild Export Script: includeCrashReport:  (true) 
Buddybuild Export Script: exportDir:  (/Users/clint/projects/bb-export/export) 
Generating Export on app 593efc36b16fed0001d2aeef to /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a1776827796890001130bc5/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b599c355ad70001bafbcf/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b49fb2ff12a00013782e0/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b2235d2f6f20001ad9c73/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b220c1422f000017ecd25/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063f34c8d1680001c0bfab/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063f025302bd000185a900/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a06376b8fd36f000149653b/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063682c314c0000179cc43/info.json
Feedback JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063507c314c0000179cbd5/info.json
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063682c314c0000179cc43/8570c667-8374-465f-8172-1ab65bc0a2ed.mp4-thumbnail.png
Feedback Replay /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a06376b8fd36f000149653b/9e125e08-4856-4a91-92f4-efed70f5e51f.mp4
Feedback Replay /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063682c314c0000179cc43/8570c667-8374-465f-8172-1ab65bc0a2ed.mp4
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063f34c8d1680001c0bfab/f04af779-39cf-4418-86b6-d6786cacf31c.jpg
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063507c314c0000179cbd5/ec431f64-8e74-4cb8-8800-bd68f54101ca.mp4-thumbnail.png
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b2235d2f6f20001ad9c73/5bc4419c-cef2-4495-a2e5-0deca1fa119d.jpg
Feedback Replay /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063507c314c0000179cbd5/ec431f64-8e74-4cb8-8800-bd68f54101ca.mp4
Feedback Replay /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063f025302bd000185a900/fb9582ab-3671-4d22-a5c2-666769bd7afe.mp4
Feedback Replay /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a1776827796890001130bc5/bbb49272-b214-47f2-9b95-2b0d85be8e5c.mp4
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a1776827796890001130bc5/bbb49272-b214-47f2-9b95-2b0d85be8e5c.mp4-thumbnail.png
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a063f025302bd000185a900/fb9582ab-3671-4d22-a5c2-666769bd7afe.mp4-thumbnail.png
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b220c1422f000017ecd25/ab3d070f-5c33-495c-9356-7c689e36d1a2.jpg
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b49fb2ff12a00013782e0/21f99f7c-4bba-415e-beeb-6db87b13fbeb.jpg
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a06376b8fd36f000149653b/9e125e08-4856-4a91-92f4-efed70f5e51f.mp4-thumbnail.png
Feedback Image /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/feedback/5a0b599c355ad70001bafbcf/59623184-61bd-43db-800a-37ad5872654f.jpg
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21e1b50eedce000117a8ea/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21dcd90eedce0001179e0b/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21dc6b0eedce0001179dd0/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21d37ee1f8c90001c73d1b/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21c347a6dee400011df51e/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21ade7cab7520001454460/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0f88db9b4eea00014c8c76/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a011548dcd8530001e874e8/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0115237a0fda00016a0da9/info.json
Crash Report JSON /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a01147d7a0fda00016a0d55/info.json
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21d37ee1f8c90001c73d1b/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a01147d7a0fda00016a0d55/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0f88db9b4eea00014c8c76/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a011548dcd8530001e874e8/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21ade7cab7520001454460/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21dcd90eedce0001179e0b/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21c347a6dee400011df51e/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21e1b50eedce000117a8ea/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a21dc6b0eedce0001179dd0/log.txt
Crash Report Log /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0115237a0fda00016a0da9/log.txt
Crash Report IR thumbnail /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a011548dcd8530001e874e8/abe7ec18-230a-4fa9-b288-341c90f7bdc8.mp4-thumbnail.png
Crash Report IR thumbnail /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0115237a0fda00016a0da9/23c199d8-12c9-4fa8-b9ff-bcd44e5aba06.mp4-thumbnail.png
Crash Report IR /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a01147d7a0fda00016a0d55/61f98c7d-8baa-485f-837f-3a5969a0629a.mp4
Crash Report IR thumbnail /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a01147d7a0fda00016a0d55/61f98c7d-8baa-485f-837f-3a5969a0629a.mp4-thumbnail.png
Crash Report IR /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a0115237a0fda00016a0da9/23c199d8-12c9-4fa8-b9ff-bcd44e5aba06.mp4
Crash Report IR /Users/clint/projects/bb-export/export/593efc36b16fed0001d2aeef/crash-report/5a011548dcd8530001e874e8/abe7ec18-230a-4fa9-b288-341c90f7bdc8.mp4
**** Export Complete!
```
