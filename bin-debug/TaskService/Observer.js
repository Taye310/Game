var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var TaskPanel = (function (_super) {
    __extends(TaskPanel, _super);
    function TaskPanel() {
        var _this = _super.call(this) || this;
        _this.textField = new egret.TextField;
        _this.panel = new egret.Shape;
        _this.panel.x = 700;
        _this.panel.y = 0;
        _this.textField.text = "----";
        _this.textField.x = 700;
        _this.panel.graphics.clear();
        _this.panel.graphics.beginFill(0x000000, 0.5);
        _this.panel.graphics.drawRect(0, 0, 250, 300);
        _this.panel.graphics.endFill();
        _this.addChild(_this.panel);
        _this.addChild(_this.textField);
        TaskService.addObserver(_this);
        return _this;
    }
    TaskPanel.prototype.onChange = function (task) {
        for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
            switch (TaskService.getInstance().taskList[i].status) {
                case TaskStatus.DURING:
                    this.textField.text = task.name + "during";
                    break;
                case TaskStatus.SUBMITTED:
                    this.textField.text = task.name + "finished";
                    break;
            }
        }
    };
    return TaskPanel;
}(egret.DisplayObjectContainer));
__reflect(TaskPanel.prototype, "TaskPanel", ["Observer"]);
//# sourceMappingURL=Observer.js.map