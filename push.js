var webPush = require('web-push');
 
const vapidKeys = {
   "publicKey": "BJeTjlLpLV_EnRFZ4i6kFFpqcv9Z73OjSTesfT428TLO29GD6_23uAw9el3DQCNag3cWXqmbbyNSQCDLUZYEEZY",
   "privateKey": "6xWZ4_AR285PFhRWxJRLEQuJVW-U4VAvB7kK_tNM_zs"
};
 
 
webPush.setVapidDetails(
   'mailto:example@yourdomain.org',
   vapidKeys.publicKey,
   vapidKeys.privateKey
)
var pushSubscription = {
   "endpoint": "https://fcm.googleapis.com/fcm/send/dKOdm0OJ4Jk:APA91bFNBOBLkBwqpyx3RMcNxeqAdKn2v4G_42mjage2gLoQ8xwXhAsQz5XpD9Rx_A8yp6oHrgF6nctdGjTixWinQCNW0PdKG3VFDRhDaXtkVCpHX_qzxEcc_aUSMSqEJEl-_HuMtWKu",
   "keys": {
       "p256dh": "BFMFhzOEc6cuzXo5pD1ngCssL772aVFkqABW/r4LcY18NN9w6ys94sfV9QYjTKnEWB8fcpw3irTh9WAjjpPzp5c=",
       "auth": "O6mJTPxdwzpRLVmJtA8L2g=="
   }
};
var payload = 'Dari Yosafat Tharumta sayang ECI ';
 
var options = {
   gcmAPIKey: '315888759775',
   TTL: 60
};
webPush.sendNotification(
   pushSubscription,
   payload,
   options
);