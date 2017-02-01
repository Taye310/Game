var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Panel = (function (_super) {
    __extends(Panel, _super);
    function Panel() {
        var _this = _super.call(this) || this;
        _this.McCree = new Hero("McCree", true);
        _this.Soilder76 = new Hero("Soilder76", true);
        _this.Tracer = new Hero("Tracer", true);
        _this.sword = new Equipments("sword", 50);
        _this.armor = new Equipments("armor", 10);
        _this.gun = new Equipments("gun", 70);
        _this.dog = new Pet("baiyukun");
        _this.blueJewel = new Jewel("blueJewel");
        _this.level = new egret.TextField;
        _this.hp = new egret.TextField;
        _this.fightPower = new egret.TextField;
        _this.heroInTeam = new egret.TextField;
        _this.equipments = new egret.TextField;
        _this.jewel = new egret.TextField;
        _this.pet = new egret.TextField;
        _this.bag1 = new egret.TextField;
        _this.bag2 = new egret.TextField;
        _this.bag3 = new egret.TextField;
        _this.propertyPanel = new egret.Shape;
        _this.bagPanel = new egret.Shape;
        _this.propertyPanel.x = 0;
        _this.propertyPanel.y = 0;
        _this.propertyPanel.graphics.beginFill(0x000000, 0.5);
        _this.propertyPanel.graphics.drawRect(0, 0, 400, 600);
        _this.propertyPanel.graphics.endFill();
        _this.addChild(_this.propertyPanel);
        _this.bagPanel.x = 100;
        _this.bagPanel.y = 700;
        _this.bagPanel.graphics.beginFill(0x000000, 0.5);
        _this.bagPanel.graphics.drawRect(0, 0, 600, 100);
        _this.bagPanel.graphics.endFill();
        _this.addChild(_this.bagPanel);
        //初始化用户状态
        User.user.heroes.push(_this.McCree, _this.Tracer);
        _this.McCree.equipments.push(_this.sword);
        _this.Soilder76.equipments.push(_this.gun);
        _this.sword.jewel.push(_this.blueJewel);
        User.user.pet = _this.dog;
        _this.bag1.text = "Soilder76";
        _this.bag1.textColor = 0xffffff;
        _this.bag1.x = _this.bagPanel.x + 10;
        _this.bag1.y = _this.bagPanel.y + 35;
        //mouse.enable(this.stage);
        //this.bag1.addEventListener(onmouseover)
        _this.bag1.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBagClick, _this);
        _this.bag1.touchEnabled = true;
        _this.addChild(_this.bag1);
        _this.bag2.text = "armor";
        _this.bag2.textColor = 0xffffff;
        _this.bag2.x = _this.bagPanel.x + 210;
        _this.bag2.y = _this.bagPanel.y + 35;
        _this.bag2.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBagClick, _this);
        _this.bag2.touchEnabled = true;
        _this.addChild(_this.bag2);
        _this.bag3.text = "";
        _this.bag3.textColor = 0xffffff;
        _this.bag3.x = _this.bagPanel.x + 410;
        _this.bag3.y = _this.bagPanel.y + 35;
        _this.bag3.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onBagClick, _this);
        _this.bag3.touchEnabled = true;
        _this.addChild(_this.bag3);
        _this.init();
        _this.heroInTeam.addEventListener(egret.TouchEvent.TOUCH_TAP, _this.onHeroesClick, _this);
        _this.heroInTeam.touchEnabled = true;
        return _this;
    }
    Panel.prototype.init = function () {
        var _this = this;
        this.level.text = "等级：" + User.user.level;
        this.addChild(this.level);
        this.fightPower.text = "目前战斗力：" + User.user.getFightPower();
        this.fightPower.y = 30;
        this.addChild(this.fightPower);
        this.heroInTeam.text = "在阵英雄：";
        User.user.heroesInTeam.forEach(function (e) {
            //console.log(e.heroName);
            _this.heroInTeam.text += e.heroName;
        });
        this.heroInTeam.y = 60;
        this.addChild(this.heroInTeam);
        this.equipments.text = "装备：";
        User.user.heroesInTeam.forEach(function (e) {
            e.equipments.forEach(function (elements) {
                _this.equipments.text += elements.equipName;
            });
        });
        this.equipments.y = 90;
        this.addChild(this.equipments);
        this.pet.y = 120;
        this.pet.text = "宠物：" + User.user.pet.petName;
        this.addChild(this.pet);
    };
    Panel.prototype.onBagClick = function (e) {
        console.log(e.target.text);
        if (e.target.text == "Soilder76") {
            User.user.heroes.push(this.Soilder76);
            e.target.text = null;
        }
        else if (e.target.text == "armor") {
            this.McCree.equipments.push(this.armor);
            e.target.text = null;
        }
        else if (e.target.text == "McCree") {
            User.user.heroes.push(this.McCree);
            e.target.text = null;
        }
        else if (e.target.text == "Tracer") {
            User.user.heroes.push(this.Tracer);
            e.target.text = null;
        }
        this.init();
    };
    Panel.prototype.onHeroesClick = function (e) {
        if (this.bag1.text == "") {
            this.bag1.text = User.user.heroes.pop().heroName;
        }
        else if (this.bag2.text == "") {
            this.bag2.text = User.user.heroes.pop().heroName;
        }
        else if (this.bag3.text == "") {
            this.bag3.text = User.user.heroes.pop().heroName;
        }
        else {
            console.warn("full bag");
        }
        this.init();
    };
    Panel.prototype.change = function (changeSth) {
    };
    return Panel;
}(egret.DisplayObjectContainer));
__reflect(Panel.prototype, "Panel");
//# sourceMappingURL=Panel.js.map