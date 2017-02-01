var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(chara) {
        var _this = _super.call(this) || this;
        _this._textField = new egret.TextField;
        _this._button = new egret.Bitmap();
        _this.panel = new egret.Shape;
        _this.panel.x = 400;
        _this.panel.y = 400;
        _this.panel.graphics.clear();
        _this.panel.graphics.beginFill(0x000000, 0.5);
        _this.panel.graphics.drawRect(0, 0, 250, 300);
        _this.panel.graphics.endFill();
        _this._button.scaleX = 3;
        _this._button.scaleY = 3;
        _this._button.x = 500;
        _this._button.y = 400;
        _this._button.texture = RES.getRes("gtanhao_png");
        _this._textField.x = 400;
        _this._textField.y = 400;
        _this._textField.text = "与npc1对话!";
        _this.addChild(_this.panel);
        _this.addChild(_this._textField);
        _this.addChild(_this._button);
        _this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onButtonClick, _this);
        _this._button.touchEnabled = true;
        console.log(TaskService.getInstance().taskList[0].status);
        return _this;
    }
    DialoguePanel.prototype.onButtonClick = function (e) {
        var _this = this;
        console.log(TaskService.getInstance().taskList[0].status);
        for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
            switch (TaskService.getInstance().taskList[i].status) {
                case TaskStatus.ACCEPTABLE:
                    if (TaskService.getInstance().taskList[i].id == "0") {
                        TaskService.getInstance().accept(TaskService.getInstance().taskList[i].id);
                        this._textField.text = "已接受！\n去找npc1说话吧！\n把问号点成金色";
                    }
                    else if (TaskService.getInstance().taskList[i].id == "1") {
                        TaskService.getInstance().accept(TaskService.getInstance().taskList[i].id);
                        this._textField.text = "已接受新任务！\n去杀十个白玉昆！";
                    }
                    break;
                case TaskStatus.CAN_SUMBIT:
                    this._textField.text = "已完成！";
                    TaskService.getInstance().taskList[1].status = TaskStatus.ACCEPTABLE;
                    TaskService.getInstance().finish(TaskService.getInstance().taskList[i].id);
                    egret.setTimeout(function () {
                        _this.removeChild(_this.panel);
                        _this.removeChild(_this._textField);
                        _this.removeChild(_this._button);
                    }, this, 3000);
                    break;
            }
        }
    };
    return DialoguePanel;
}(egret.DisplayObjectContainer));
__reflect(DialoguePanel.prototype, "DialoguePanel");
//# sourceMappingURL=DialoguePanel.js.map