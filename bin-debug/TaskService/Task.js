var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Task = (function (_super) {
    __extends(Task, _super);
    function Task(id, name, status, desc, fromNpcId, toNpcId, condition) {
        var _this = _super.call(this) || this;
        _this._current = 0;
        _this._total = 0;
        _this._id = id;
        _this._name = name;
        _this._status = status;
        _this._desc = desc;
        _this.fromNPCId = fromNpcId;
        _this.toNPCId = toNpcId;
        _this._condition = condition;
        return _this;
    }
    Object.defineProperty(Task.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "name", {
        get: function () {
            return this._name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "status", {
        get: function () {
            return this._status;
        },
        set: function (status) {
            this._status = status;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "desc", {
        get: function () {
            return this._desc;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Task.prototype, "current", {
        get: function () {
            return this._current;
        },
        enumerable: true,
        configurable: true
    });
    Task.prototype.checkStatus = function () {
        if (this.current > this._total) {
        }
        if (this._status == TaskStatus.DURING && this.current >= this._total) {
            this._status = TaskStatus.CAN_SUMBIT;
        }
    };
    return Task;
}(EventEmitter));
__reflect(Task.prototype, "Task", ["TaskConditionContext"]);
var TaskStatus;
(function (TaskStatus) {
    TaskStatus[TaskStatus["UNACCEPTABLE"] = 0] = "UNACCEPTABLE";
    TaskStatus[TaskStatus["ACCEPTABLE"] = 1] = "ACCEPTABLE";
    TaskStatus[TaskStatus["DURING"] = 2] = "DURING";
    TaskStatus[TaskStatus["CAN_SUMBIT"] = 3] = "CAN_SUMBIT";
    TaskStatus[TaskStatus["SUBMITTED"] = 4] = "SUBMITTED";
})(TaskStatus || (TaskStatus = {}));
var ErrorCode;
(function (ErrorCode) {
    ErrorCode[ErrorCode["SUCCESS"] = 0] = "SUCCESS";
    ErrorCode[ErrorCode["FAILED"] = 1] = "FAILED";
})(ErrorCode || (ErrorCode = {}));
//# sourceMappingURL=Task.js.map