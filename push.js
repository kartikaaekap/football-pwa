var webPush = require('web-push');
const vapidKeys = {
    "publicKey": "BIZ8agaZ2cqHapAoipV4djhdW01oxH2QrdbofwWewo2l-t9vImhxQxXVKt8kmuUM7mzuI9C1FbA6cAz7vhGzneA",
    "privateKey": "6DQ3qu8mHuAHDtWDDPA4RkBeHzGQNGXNIsSH9qrXgAI"
};
 
 
webPush.setVapidDetails(
    'mailto:example@yourdomain.org',
    vapidKeys.publicKey,
    vapidKeys.privateKey
)
var pushSubscription = {
    "endpoint": "https://fcm.googleapis.com/fcm/send/fepaHQIbhVE:APA91bEMWv7D8clkPwadgxm8_MmGe3BehLwqwnvdzD092C7qs6emEdWmxlm-2NZrQnZbBlNR19NDfGx7PkUJ82HN0k6_v0ZC9Yial5C94aLKvCGR2nHWppD_LGQ1Mkx0_iEA8r7B9O4m",
    "keys": {
        "p256dh": "BOa8ATGrdll2/0VhfshlWV4e0i5s6ieWE0UpyGo/kYG6LMGOM8LsIvYY+UVZHqFeepX8aFwHt+aDCSNrJiHZEsM=",
        "auth": "lD+xxeJKPrUCcTKytkcyQQ=="
    }
};
var payload = 'Selamat! Aplikasi Anda sudah dapat menerima push notifikasi!';
var options = {
    gcmAPIKey: '1046042759150',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);