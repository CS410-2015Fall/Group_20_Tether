cordova.define('cordova/plugin_list', function(require, exports, module) {
module.exports = [
    {
        "file": "plugins/org.jmrezayi2.Applist/www/Applist.js",
        "id": "org.jmrezayi2.Applist.Applist",
        "clobbers": [
            "window.Applist"
        ]
    },
    {
        "file": "plugins/com.lane.GetForeground/www/ForegroundActivity.js",
        "id": "com.lane.GetForeground.ForegroundActivity",
        "clobbers": [
            "window.ForegroundActivity"
        ]
    }
];
module.exports.metadata = 
// TOP OF METADATA
{
    "cordova-plugin-whitelist": "1.0.0",
    "org.jmrezayi2.Applist": "0.1.4",
    "com.lane.GetForeground": "1.1.1"
}
// BOTTOM OF METADATA
});