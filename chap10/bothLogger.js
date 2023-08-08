var BothLogger = /** @class */ (function () {
    function BothLogger() {
    }
    BothLogger.prototype.instanceLog = function (value) {
        console.log(value);
        return value;
    };
    BothLogger.staticLog = function (value) {
        var fromInstance;
        console.log(value);
        return value;
    };
    return BothLogger;
}());
var logger = new BothLogger();
logger.instanceLog([1, 2, 3]); // type: number[]
// 유추된 OnStatic 타입 인수 : boolean[]
BothLogger.staticLog([false, true]);
// 유추된 OnStatic 타입 인수 : string
BothLogger.staticLog("You can't change the music of your soul.");
