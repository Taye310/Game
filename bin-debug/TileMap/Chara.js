var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Character = (function (_super) {
    __extends(Character, _super);
    function Character(main) {
        var _this = _super.call(this) || this;
        _this._idleState = new CharacterIdleState(_this);
        _this._moveState = new CharacterMoveState(_this);
        _this._main = main;
        _this._body = new egret.Bitmap;
        _this._body.texture = RES.getRes("chara1_png");
        _this._main.addChild(_this._body);
        _this._body.width = 100;
        _this._body.height = 100;
        _this._body.anchorOffsetX = _this._body.width * 0.5;
        console.log("anchorx :" + _this._body.anchorOffsetX);
        _this._body.anchorOffsetY = _this._body.height * 0;
        _this._stateMachine = new StateMachine();
        _this._body.x = _this._main.stage.stageWidth * 0.1 - 50;
        _this._body.y = _this._main.stage.stageHeight * 0.9;
        console.log(_this._body.x);
        _this._ifidle = true;
        _this._ifmove = false;
        return _this;
    }
    Character.prototype.stopMove = function (callback) {
        this.idle(); //not complete
        callback();
    };
    Character.prototype.move = function (targetX, targetY, path, callback) {
        //中止缓动动画，达到实现运动中更换目标点的目的
        egret.Tween.removeTweens(this._body);
        if (this.timer != null) {
            this.timer.stop();
        }
        //触发状态机
        this._stateMachine.setState(this._moveState);
        //如果状态机将_ifwalk变量调整为true,则进入运动状态
        if (this._ifmove) {
            console.log("move");
            this.startMove();
            //用Timer来实现固定间隔顺序读取路径数组中的点并移动
            var interval = 500;
            this.timer = new egret.Timer(interval, path.length - 1);
            this.timer.addEventListener(egret.TimerEvent.TIMER, function (e) {
                path[-1] = path[0];
                if ((path[this.timer.currentCount].x - path[this.timer.currentCount - 1].x) < 0) {
                    this._body.skewY = 180;
                }
                else {
                    this._body.skewY = 0;
                }
                if (path.length != 0) {
                    egret.Tween.get(this._body).to({ x: (path[this.timer.currentCount].x + 1) * 100 - 50, y: (path[this.timer.currentCount].y) * 100 }, 500);
                    console.log("target:" + path[this.timer.currentCount - 1].x + " , " + path[this.timer.currentCount - 1].y);
                }
            }, this);
            this.timer.addEventListener(egret.TimerEvent.TIMER_COMPLETE, function (e) {
                this.idle();
                callback(); ////////////////////////////
            }, this);
            this.timer.start();
            console.log(path.length);
        }
    };
    Character.prototype.idle = function () {
        this._stateMachine.setState(this._idleState);
        //如果状态机将_ifidle变量调整为true,则进入停止状态
        if (this._ifidle) {
            console.log("idle");
            this.startidle();
        }
    };
    //播放运动动画
    Character.prototype.startMove = function () {
        var _this = this;
        var list = ["chara1_png", "chara2_png", "chara3_png", "chara4_png", "chara5_png",
            "chara6_png", "chara7_png", "chara8_png", "chara9_png", "chara10_png", "chara11_png",
            "chara12_png", "chara13_png", "chara14_png", "chara15_png", "chara16_png", "chara17_png",
            "chara18_png", "chara19_png", "chara20_png", "chara21_png", "chara22_png", "chara23_png",
            "chara24_png", "chara25_png", "chara26_png"];
        var count = -1;
        //this._body.texture = RES.getRes("3_png");
        //循环执行
        egret.Ticker.getInstance().register(function () {
            if (_this._ifmove) {
                count = count + 0.5;
                if (count >= list.length) {
                    count = 0;
                }
                _this._body.texture = RES.getRes(list[Math.floor(count)]);
            }
        }, this);
    };
    Character.prototype.startidle = function () {
        this._body.texture = RES.getRes("chara1_png");
    };
    return Character;
}(egret.DisplayObjectContainer));
__reflect(Character.prototype, "Character");
//# sourceMappingURL=Chara.js.map