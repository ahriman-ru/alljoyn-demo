cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-whitelist/whitelist.js",
        "id": "cordova-plugin-whitelist.whitelist",
        "runs": true
    },
    {
        "file": "plugins/cordova-plugin-alljoyn/www/AllJoyn.js",
        "id": "cordova-plugin-alljoyn.AllJoyn",
        "clobbers": [
            "AllJoyn"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "cordova-plugin-alljoyn": "0.0.5"
}
// BOTTOM OF METADATA
});