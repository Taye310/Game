var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var doMap = (function (_super) {
    __extends(doMap, _super);
    function doMap() {
        var _this = _super.call(this) || this;
        _this._cellSize = 20;
        _this.astar = new AStar();
        _this._grid = new Grid(10, 10);
        var container = new egret.DisplayObjectContainer();
        _this.addChild(container);
        for (var i = 0; i < config.length; i++) {
            for (var j = 0; j < config.length; j++) {
                var tile = config[i][j];
                //console.log(tile);
                var bitmap = new egret.Bitmap();
                bitmap.x = j * 100;
                bitmap.y = i * 100;
                _this.addChild(bitmap);
                if (tile == 1) {
                    bitmap.texture = RES.getRes("grass_jpg");
                }
                if (tile == 0) {
                    bitmap.texture = RES.getRes("road_jpg");
                }
                _this._grid.setWalkable(i, j, tile);
                container.addChild(bitmap);
            }
        }
        return _this;
    }
    doMap.prototype.astarPath = function (beginX, beginY, endX, endY) {
        var path = new Array();
        this._grid.setStartPoint(beginX, beginY);
        this._grid.setEndPoint(endX, endY);
        if (this.astar.findPath(this._grid)) {
            path = this.astar.getPath();
        }
        return path;
    };
    return doMap;
}(egret.DisplayObjectContainer));
__reflect(doMap.prototype, "doMap");
var config = [
    [1, 0, 1, 1, 1, 1, 0, 0, 1, 1],
    [0, 0, 0, 1, 0, 0, 0, 1, 1, 0],
    [1, 0, 0, 0, 0, 1, 0, 1, 0, 0],
    [1, 1, 1, 0, 0, 1, 0, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 0, 0, 1],
    [1, 1, 0, 0, 0, 0, 1, 0, 0, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 0, 1],
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0]
];
// var config = [//map
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     ]
// var config = [
//     { x: 0, y: 0, image: "road.jpg" },
//     { x: 0, y: 1, image: "road.jpg" },
//     { x: 0, y: 2, image: "road.jpg" },
//     { x: 1, y: 0, image: "road.jpg" },
//     { x: 1, y: 1, image: "road.jpg" },
//     { x: 1, y: 2, image: "road.jpg" },
//     { x: 2, y: 0, image: "road.jpg" },
//     { x: 2, y: 1, image: "road.jpg" },
//     { x: 2, y: 2, image: "road.jpg" }
// ]
//# sourceMappingURL=doMap.js.map