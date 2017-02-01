var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var TileNode = (function () {
    // bitmap: egret.Bitmap = null;
    function TileNode(x, y) {
        this.walkable = true;
        this.x = x;
        this.y = y;
        if (config[x][y] == 1) {
            this.walkable = false;
        }
        if (config[x][y] == 0) {
            this.walkable = true;
        }
    }
    return TileNode;
}());
__reflect(TileNode.prototype, "TileNode");
//# sourceMappingURL=Node.js.map