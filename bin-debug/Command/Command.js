var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var WalkCommand = (function () {
    function WalkCommand(chara, x, y, path) {
        this.x = x;
        this.y = y;
        this.chara = chara;
        this.path = path;
    }
    WalkCommand.prototype.execute = function (callback) {
        // GameScene.getCurrentScene().moveTo(this.x, this.y, function () {
        //     callback();
        // })
        this.chara.move(this.x, this.y, this.path, function () {
            callback();
        });
    };
    WalkCommand.prototype.cancel = function (callback) {
        // GameScene.getCurrentScene().stopMove(function () {
        //     callback();
        // })
        this.chara.stopMove(function () {
            callback();
        });
    };
    return WalkCommand;
}());
__reflect(WalkCommand.prototype, "WalkCommand", ["Command"]);
var FightCommand = (function () {
    function FightCommand(main) {
        /**
         * 所有的 Command 都需要有这个标记，应该如何封装处理这个问题呢？
         */
        this._hasBeenCancelled = false;
        this._main = main;
    }
    FightCommand.prototype.execute = function (callback) {
        console.log("开始战斗");
        if (TaskService.getInstance().taskList[1].status == TaskStatus.DURING) {
            TaskService.getInstance().taskList[1]._current++;
            this._main.killCount.text = "Killed " + TaskService.getInstance().taskList[1]._current;
            console.log(TaskService.getInstance().taskList[1]._current);
            if (TaskService.getInstance().taskList[1]._current == 10) {
                TaskService.getInstance().finish(TaskService.getInstance().taskList[1].id);
            }
            console.log("开始结束");
        }
    };
    FightCommand.prototype.cancel = function (callback) {
        console.log("脱离战斗");
        this._hasBeenCancelled = true;
        egret.setTimeout(function () {
            callback();
        }, this, 100);
    };
    return FightCommand;
}());
__reflect(FightCommand.prototype, "FightCommand", ["Command"]);
var TalkCommand = (function () {
    function TalkCommand(npc) {
        this._npc = npc;
    }
    TalkCommand.prototype.execute = function (callback) {
        //console.log("打开对话框")
        for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
            switch (TaskService.getInstance().taskList[i].status) {
                case TaskStatus.ACCEPTABLE:
                    if (this._npc.state == false && this._npc._id == TaskService.getInstance().taskList[i].fromNPCId) {
                        var dialogPanel = new DialoguePanel(this._npc._chara);
                        this._npc.addChild(dialogPanel);
                        this._npc.state = true;
                        break;
                    }
                    else if (this._npc.state == true) {
                        break;
                    }
                case TaskStatus.DURING:
                    this._npc._emoji.texture = RES.getRes("ywenhao_png");
                    TaskService.getInstance().taskList[i].status = TaskStatus.CAN_SUMBIT;
                    break;
            }
        }
        console.log(TaskService.getInstance().taskList[0].status);
        egret.setTimeout(function () {
            console.log("结束对话");
            callback();
        }, this, 500);
    };
    TalkCommand.prototype.cancel = function (callback) {
        console.log("关闭对话框");
    };
    return TalkCommand;
}());
__reflect(TalkCommand.prototype, "TalkCommand", ["Command"]);
//# sourceMappingURL=Command.js.map