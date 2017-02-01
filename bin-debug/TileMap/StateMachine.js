var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
//状态机
var StateMachine = (function () {
    function StateMachine() {
    }
    //设置状态
    StateMachine.prototype.setState = function (e) {
        if (this.currentState != null) {
            this.currentState.onExit();
        }
        this.currentState = e;
        e.onEnter();
    };
    return StateMachine;
}());
__reflect(StateMachine.prototype, "StateMachine");
var CharacterState = (function () {
    function CharacterState(character) {
        //super();
        this._character = character;
    }
    CharacterState.prototype.onEnter = function () { };
    CharacterState.prototype.onExit = function () { };
    return CharacterState;
}());
__reflect(CharacterState.prototype, "CharacterState", ["state"]);
var CharacterIdleState = (function (_super) {
    __extends(CharacterIdleState, _super);
    function CharacterIdleState() {
        return _super.apply(this, arguments) || this;
    }
    //进入时设置Character类的变量
    CharacterIdleState.prototype.onEnter = function () {
        this._character._ifidle = true;
    };
    //离开时同理
    CharacterIdleState.prototype.onExit = function () {
        this._character._ifidle = false;
    };
    return CharacterIdleState;
}(CharacterState));
__reflect(CharacterIdleState.prototype, "CharacterIdleState");
var CharacterMoveState = (function (_super) {
    __extends(CharacterMoveState, _super);
    function CharacterMoveState() {
        return _super.apply(this, arguments) || this;
    }
    CharacterMoveState.prototype.onEnter = function () {
        this._character._ifmove = true;
    };
    CharacterMoveState.prototype.onExit = function () {
        this._character._ifmove = false;
    };
    return CharacterMoveState;
}(CharacterState));
__reflect(CharacterMoveState.prototype, "CharacterMoveState");
//# sourceMappingURL=StateMachine.js.map