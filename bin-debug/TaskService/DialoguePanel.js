var DialoguePanel = (function (_super) {
    __extends(DialoguePanel, _super);
    function DialoguePanel(chara) {
        _super.call(this);
        this._textField = new egret.TextField;
        this._button = new egret.Bitmap();
        this.panel = new egret.Shape;
        this.panel.x = 400;
        this.panel.y = 400;
        this.panel.graphics.clear();
        this.panel.graphics.beginFill(0x000000, 0.5);
        this.panel.graphics.drawRect(0, 0, 250, 300);
        this.panel.graphics.endFill();
        this._button.scaleX = 3;
        this._button.scaleY = 3;
        this._button.x = 500;
        this._button.y = 400;
        this._button.texture = RES.getRes("gtanhao_png");
        this._textField.x = 400;
        this._textField.y = 400;
        this._textField.text = "与npc1对话!";
        this.addChild(this.panel);
        this.addChild(this._textField);
        this.addChild(this._button);
        this._button.addEventListener(egret.TouchEvent.TOUCH_TAP, this.onButtonClick, this);
        this._button.touchEnabled = true;
        console.log(TaskService.getInstance().taskList[0].status);
    }
    var d = __define,c=DialoguePanel,p=c.prototype;
    p.onButtonClick = function (e) {
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
egret.registerClass(DialoguePanel,'DialoguePanel');
//# sourceMappingURL=DialoguePanel.js.map