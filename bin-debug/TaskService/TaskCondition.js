var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var NPCTalkTaskCondition = (function () {
    function NPCTalkTaskCondition() {
    }
    NPCTalkTaskCondition.prototype.onAccept = function (task) {
        task.current++;
        //task.checkStatus();
    };
    NPCTalkTaskCondition.prototype.onSubmit = function (task) {
    };
    NPCTalkTaskCondition.prototype.onChange = function (task) {
    };
    return NPCTalkTaskCondition;
}());
__reflect(NPCTalkTaskCondition.prototype, "NPCTalkTaskCondition", ["TaskCondition"]);
var KillMonsterTaskCondition = (function (_super) {
    __extends(KillMonsterTaskCondition, _super);
    function KillMonsterTaskCondition() {
        return _super.apply(this, arguments) || this;
    }
    KillMonsterTaskCondition.prototype.onAccept = function (task) {
    };
    KillMonsterTaskCondition.prototype.onSubmit = function (task) {
    };
    KillMonsterTaskCondition.prototype.onChange = function (task) {
        task.current++;
    };
    return KillMonsterTaskCondition;
}(SenceService));
__reflect(KillMonsterTaskCondition.prototype, "KillMonsterTaskCondition", ["TaskCondition"]);
//# sourceMappingURL=TaskCondition.js.map