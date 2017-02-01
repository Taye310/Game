var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPC = (function (_super) {
    __extends(NPC, _super);
    function NPC(id, x, y, texture, main) {
        var _this = _super.call(this) || this;
        _this._emoji = new egret.Bitmap;
        _this._chara = new egret.Bitmap;
        _this.state = false;
        _this._main = main;
        _this._id = id;
        // this.x=x;
        // this.y=y;
        _this._chara.x = x;
        _this._chara.y = y;
        _this._chara.texture = RES.getRes(texture);
        _this._emoji.x = x;
        _this._emoji.y = y - 40;
        _this._emoji.scaleX = 2;
        _this._emoji.scaleY = 2;
        _this._emoji.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNPCClick, _this);
        _this._chara.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onNPCClick, _this);
        // for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
        //     if (this._id == TaskService.getInstance().taskList[i].fromNPCId) {
        //         this._emoji.texture = RES.getRes("ytanhao_png");
        //     }
        // }
        _this.onChange(TaskService.getInstance().taskList[0]);
        _this._emoji.touchEnabled = true;
        _this._chara.touchEnabled = true;
        _this.addChild(_this._chara);
        _this.addChild(_this._emoji);
        TaskService.addObserver(_this);
        return _this;
    }
    NPC.prototype.onNPCClick = function (e) {
        var startx = Math.floor((GameScene.chara._body.x + 50) / 100);
        var starty = Math.floor(GameScene.chara._body.y / 100);
        var endx = Math.floor(e.stageX / 100);
        var endy = Math.floor(e.stageY / 100);
        var path = GameScene.map.astarPath(startx - 1, starty, endx, endy);
        if (path.length != 1) {
            this._main.list.addCommand(new WalkCommand(GameScene.chara, e.localX, e.localY, path));
        }
        //console.log(endx);
        if (this._id == TaskService.getInstance().taskList[0].fromNPCId && NPC.isStart == false) {
            NPC.isStart = true;
            this._main.list.addCommand(new TalkCommand(this));
        }
        else if (this._id == TaskService.getInstance().taskList[0].toNPCId && NPC.isStart == true) {
            this._main.list.addCommand(new TalkCommand(this));
        }
        this._main.list.execute();
        // for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
        //     switch (TaskService.getInstance().taskList[i].status) {
        //         case TaskStatus.ACCEPTABLE:
        //             if (this.state == false) {
        //                 var dialogPanel = new DialoguePanel(this._chara);
        //                 this.addChild(dialogPanel);
        //                 this.state = true;
        //                 break;
        //             } else if (this.state == true) {
        //                 break;
        //             }
        //         case TaskStatus.DURING:
        //             this._emoji.texture = RES.getRes("ywenhao_png");
        //             TaskService.getInstance().taskList[i].status = TaskStatus.CAN_SUMBIT;
        //             break;
        //     }
        // }
        // console.log(TaskService.getInstance().taskList[0].status);
        ////////////////////////////////////////////////////////////////放到command里了
    };
    NPC.prototype.onChange = function (task) {
        switch (task.status) {
            case TaskStatus.ACCEPTABLE:
                for (var i = 0; i < TaskService.getInstance().taskList.length; i++) {
                    if (this._id == TaskService.getInstance().taskList[i].fromNPCId) {
                        this._emoji.texture = RES.getRes("ytanhao_png");
                    }
                }
                break;
            case TaskStatus.DURING:
                if (task.fromNPCId == this._id) {
                    this._emoji.texture = null;
                }
                else if (task.toNPCId == this._id) {
                    this._emoji.texture = RES.getRes("gwenhao_png");
                }
                break;
            case TaskStatus.CAN_SUMBIT:
                //useless
                break;
            case TaskStatus.SUBMITTED || TaskStatus.UNACCEPTABLE:
                this._emoji.texture = RES.getRes(null);
                break;
        }
        // if (task.status == TaskStatus.ACCEPTABLE) {
        //     this._emoji.texture = RES.getRes("ytanhao_png");
        // }
        // if (task.status == TaskStatus.DURING) {
        //     this._emoji.texture = RES.getRes("gwenhao_png");
        // }
        // if (task.status == TaskStatus.CAN_SUMBIT) {
        //     this._emoji.texture = RES.getRes("ywenhao_png");
        // }
        // if (task.status == TaskStatus.SUBMITTED||task.status == TaskStatus.UNACCEPTABLE) {
        //     this._emoji.texture = RES.getRes(null);
        // }
    };
    return NPC;
}(egret.DisplayObjectContainer));
NPC.isStart = false;
__reflect(NPC.prototype, "NPC", ["Observer"]);
//# sourceMappingURL=NPC.js.map