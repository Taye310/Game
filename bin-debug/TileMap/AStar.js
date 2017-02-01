var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var AStar = (function () {
    function AStar() {
        this._openList = []; //Array<TileNode>//
        this._closedList = []; //已考察表
        this._path = [];
        this._heuristic = this.diagonal;
        this._straightCost = 1.0;
        this._diagCost = Math.SQRT2;
    }
    AStar.prototype.findPath = function (grid) {
        this._grid = grid;
        this._openList = new Array();
        this._closedList = new Array();
        this._startNode = this._grid.getStartPoint();
        this._endNode = this._grid.getEndPoint();
        this._startNode.g = 0;
        this._startNode.h = this._heuristic(this._startNode);
        this._startNode.f = this._startNode.g + this._startNode.h;
        return this.search();
    };
    AStar.prototype.search = function () {
        var currentNode = this._startNode;
        while (currentNode != this._endNode) {
            var startX = Math.max(0, currentNode.x - 1);
            var endX = Math.min(this._grid._x - 1, currentNode.x + 1);
            var startY = Math.max(0, currentNode.y - 1);
            var endY = Math.min(this._grid._y - 1, currentNode.y + 1);
            for (var i = startX; i <= endX; i++) {
                for (var j = startY; j <= endY; j++) {
                    var test = this._grid._arr[i][j];
                    //console.log(test.walkable);
                    if (test == currentNode || !test.walkable || Math.abs(i - currentNode.x) + Math.abs(j - currentNode.y) == 2) {
                        continue;
                    }
                    var cost = this._straightCost;
                    if (!((currentNode.x == test.x) || (currentNode.y == test.y))) {
                        cost = this._diagCost;
                    }
                    var g = currentNode.g + cost;
                    var h = this._heuristic(test);
                    var f = g + h;
                    if (this.isOpen(test) || this.isClosed(test)) {
                        if (test.f > f) {
                            test.f = f;
                            test.g = g;
                            test.h = h;
                            test.parent = currentNode;
                        }
                    }
                    else {
                        test.f = f;
                        test.g = g;
                        test.h = h;
                        test.parent = currentNode;
                        this._openList.push(test);
                    }
                }
            }
            this._closedList.push(currentNode); //已考察列表
            if (this._openList.length == 0) {
                return false;
            }
            //this._openList.sortOn("f", Array.NUMERIC); 把f从小到大排序
            // var allf:number[]=new Array();
            // for(var i=0;i<this._openList.length;i++){
            // allf[i]=this._openList[i].f;
            // }
            this._openList.sort(function (a, b) {
                // if (a.f > b.f) {
                // 	return 1;
                // } else if (a.f < b.f) {
                // 	return -1
                // } else {
                // 	return 0;
                // }
                return a.f - b.f;
            });
            currentNode = this._openList.shift();
        }
        this.buildPath();
        return true;
    };
    AStar.prototype.isOpen = function (node) {
        for (var i = 0; i < this._openList.length; i++) {
            if (this._openList[i] == node) {
                return true;
            }
        }
        return false;
        //return this._openList.indexOf(node) > 0 ? true : false;
    };
    AStar.prototype.isClosed = function (node) {
        for (var i = 0; i < this._closedList.length; i++) {
            if (this._closedList[i] == node) {
                return true;
            }
        }
        return false;
        //return this._closedList.indexOf(node) > 0 ? true : false;
    };
    AStar.prototype.buildPath = function () {
        this._path = new Array();
        var node = this._endNode;
        this._path.push(node);
        while (node != this._startNode) {
            node = node.parent;
            this._path.unshift(node); //开头加入
        }
    };
    AStar.prototype.manhattan = function (node) {
        return Math.abs(this._endNode.x - node.x) * this._straightCost + Math.abs(this._endNode.y - node.y) * this._straightCost;
    };
    AStar.prototype.euclidian = function (node) {
        var dx = this._endNode.x - node.x;
        var dy = this._endNode.y - node.y;
        return Math.sqrt(dx * dx + dy * dy) * this._straightCost;
    };
    AStar.prototype.diagonal = function (node) {
        var dx = Math.abs(this._endNode.x - node.x);
        var dy = Math.abs(this._endNode.y - node.y);
        var diag = Math.min(dx, dy);
        var straight = dx + dy;
        return this._diagCost * diag + this._straightCost * (straight - 2 * diag);
    };
    AStar.prototype.visited = function () {
        return this._closedList.concat(this._openList);
    };
    AStar.prototype.validNode = function (node, currentNode) {
        if (currentNode == node || !node.walkable)
            return false;
        if (!this._grid._arr[currentNode.x][node.y].walkable)
            return false;
        if (!this._grid._arr[node.x][currentNode.y].walkable)
            return false;
        return true;
    };
    AStar.prototype.getPath = function () {
        return this._path;
    };
    return AStar;
}());
__reflect(AStar.prototype, "AStar");
//# sourceMappingURL=AStar.js.map