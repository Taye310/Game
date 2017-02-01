var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var User = (function () {
    function User() {
        this.cash = 0;
        this.gold = 0;
        this.exp = 0;
        this.level = 0;
        this.totalExp = 0;
        this.heroes = [];
        this.level = 1;
    }
    Object.defineProperty(User.prototype, "heroesInTeam", {
        get: function () {
            return this.heroes.filter(function (hero) { return hero.isInTeam; });
        },
        enumerable: true,
        configurable: true
    });
    User.prototype.getFightPower = function () {
        var result = 0;
        this.heroesInTeam.forEach(function (hero) { return result += hero.getFightPower(); });
        result += this.pet.getFightPower();
        return result + this.level * 3;
        //arr.every     arr.some     arr.map     arr.foreach    arr.filter
        //大数据 map reduce
    };
    return User;
}());
User.user = new User();
__reflect(User.prototype, "User");
var Hero = (function () {
    function Hero(heroName, isInTeam) {
        this.isInTeam = false;
        this.equipments = [];
        //maxHp=100;//
        this.hp = 50;
        this.level = 1;
        this.quality = 2.8;
        this.heroName = heroName;
        this.isInTeam = isInTeam;
    }
    Object.defineProperty(Hero.prototype, "maxHp", {
        get: function () {
            return this.level * 100 * this.quality;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "attack", {
        //attack:number=100;//游戏树枝都是高级数值 大多数    高级数值 基础数值
        get: function () {
            var result = 0;
            this.equipments.forEach(function (e) { return result += e.attack; });
            return result;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Hero.prototype, "fightPower", {
        get: function () {
            return this.getFightPower();
        },
        enumerable: true,
        configurable: true
    });
    Hero.prototype.getFightPower = function () {
        return this.maxHp * 1.5 + this.attack * 1.8; //取整 前后端统一
    };
    return Hero;
}());
__decorate([
    Cache
], Hero.prototype, "maxHp", null);
__reflect(Hero.prototype, "Hero");
var Equipments = (function () {
    function Equipments(name, atk) {
        this.jewel = [];
        this.atk = 0;
        this.equipName = name;
        this.atk = atk;
    }
    Object.defineProperty(Equipments.prototype, "attack", {
        get: function () {
            var jewelResult = 0;
            for (var i = 0; i < this.jewel.length; i++) {
                jewelResult += this.jewel[i].attack;
            }
            return this.atk + jewelResult;
        },
        enumerable: true,
        configurable: true
    });
    return Equipments;
}());
__reflect(Equipments.prototype, "Equipments");
var Jewel = (function () {
    function Jewel(name) {
        this.jewelName = name;
    }
    Object.defineProperty(Jewel.prototype, "attack", {
        get: function () {
            return 10;
        },
        enumerable: true,
        configurable: true
    });
    return Jewel;
}());
__reflect(Jewel.prototype, "Jewel");
var Pet = (function () {
    function Pet(name) {
        this.petName = name;
    }
    Pet.prototype.getFightPower = function () {
        // if(name==this.petName[0]){
        //     return 10;
        // }
        // if(name==this.petName[1]){
        //     return 15;
        // }
        return 20;
    };
    return Pet;
}());
__reflect(Pet.prototype, "Pet");
//# sourceMappingURL=User.js.map