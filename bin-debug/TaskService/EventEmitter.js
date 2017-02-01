var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var EventEmitter = (function (_super) {
    __extends(EventEmitter, _super);
    function EventEmitter() {
        return _super.apply(this, arguments) || this;
    }
    EventEmitter.prototype.addObserver = function (observer) {
    };
    EventEmitter.prototype.notify = function (task) {
    };
    return EventEmitter;
}(egret.DisplayObjectContainer));
__reflect(EventEmitter.prototype, "EventEmitter");
var TaskService = (function (_super) {
    __extends(TaskService, _super);
    function TaskService() {
        var _this = _super.call(this) || this;
        _this.observerList = new Array();
        _this.taskList = new Array();
        return _this;
    }
    //danli
    TaskService.getInstance = function () {
        if (this.instance == null) {
            this.instance = new TaskService();
        }
        return this.instance;
    };
    TaskService.prototype.onChange = function (task) {
    };
    TaskService.prototype.accept = function (id) {
        if (!id) {
            return ErrorCode.FAILED;
        }
        var task = TaskService.getInstance().taskList[id];
        if (task.id == id) {
            task.status = TaskStatus.DURING;
            TaskService.notify(task);
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.FAILED;
        }
    };
    TaskService.prototype.finish = function (id) {
        if (!id) {
            return ErrorCode.FAILED;
        }
        var task = TaskService.getInstance().taskList[id];
        if (task.id == id) {
            task.status = TaskStatus.SUBMITTED;
            TaskService.notify(task);
            return ErrorCode.SUCCESS;
        }
        else {
            return ErrorCode.FAILED;
        }
    };
    TaskService.prototype.getTaskByCustomRole = function (rule) {
        return rule();
    };
    TaskService.notify = function (task) {
        for (var _i = 0, _a = TaskService.getInstance().observerList; _i < _a.length; _i++) {
            var observer = _a[_i];
            observer.onChange(task);
        }
        //console.log(TaskService.getInstance().taskList[0].status);
    };
    TaskService.addObserver = function (observer) {
        for (var i = 0; i < TaskService.getInstance().observerList.length; i++) {
            if (observer == TaskService.getInstance().observerList[i])
                return ErrorCode.FAILED;
        }
        TaskService.getInstance().observerList.push(observer);
    };
    return TaskService;
}(EventEmitter));
TaskService.instance = null;
__reflect(TaskService.prototype, "TaskService", ["Observer"]);
//# sourceMappingURL=EventEmitter.js.map