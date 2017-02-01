var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var Grid = (function () {
    function Grid(x, y) {
        this._arr = [];
        this.walkable = true;
        this._x = x;
        this._y = y;
        this._arr = new Array();
        for (var i = 0; i < this._x; i++) {
            this._arr[i] = new Array();
            for (var j = 0; j < this._y; j++) {
                this._arr[i][j] = new TileNode(i, j); //Node(i,j)
            }
        }
    }
    Grid.prototype.setWalkable = function (j, i, state) {
        //console.log(state);
        if (state == 1) {
            this._arr[i][j].walkable = false;
        }
        if (state == 0) {
            this._arr[i][j].walkable = true;
        }
        //console.log(this._arr[i][j].walkable);
    };
    // public setStart(arrStart: TileNode) {
    //     this._start = arrStart;
    // }
    // public setEnd(arrEnd: TileNode) {
    //     this._end = arrEnd;
    // }
    Grid.prototype.setEndPoint = function (x, y) {
        this._end = this._arr[x][y];
    };
    Grid.prototype.setStartPoint = function (x, y) {
        this._start = this._arr[x][y];
    };
    Grid.prototype.getStartPoint = function () {
        return this._start;
    };
    Grid.prototype.getEndPoint = function () {
        return this._end;
    };
    return Grid;
}());
__reflect(Grid.prototype, "Grid");
//# sourceMappingURL=Grid.js.map