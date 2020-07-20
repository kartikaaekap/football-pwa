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
    "endpoint": "https://fcm.googleapis.com/fcm/send/cTPZ56rpV7U:APA91bEHAfbsqB4tIfLndddMfUvnrey6VUjQSr5EK9ihdD914FLjguKEHZez3BQ52jXKBo1EUIvFkDB2xwPlT9Vms4UxbrNlPNx3Nldl_CcJyfTfm2GEKJjPyt6iLiRxV5iWM2Wbo3TI",
    "keys": {
        "p256dh": "BH+p7jzwYhbb40CEKv4rpPnYc2wAKXonSMvzzeNAbjI/YuG3PFOjwPBUu0VkSwWwsRUUCS2POw65fdM3papevqY=",
        "auth": "om40UcDcAfChxhUCf9EWaw=="
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