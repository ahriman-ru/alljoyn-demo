cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/cordova-plugin-alljoyn/www/AllJoyn.js",
        "id": "cordova-plugin-alljoyn.AllJoyn",
        "clobbers": [
            "AllJoyn"
        ]
    },
    {
        "file": "plugins/cordova-plugin-alljoyn/src/windows/AllJoynProxy.js",
        "id": "cordova-plugin-alljoyn.AllJoynProxy",
        "merges": [
            ""
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-alljoyn": "0.0.5",
    "cordova-plugin-whitelist": "1.0.0"
}
// BOTTOM OF METADATA
});