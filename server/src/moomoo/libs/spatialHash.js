export class SpatialHash {
    constructor(cellSize = 450) {
        this.cellSize = cellSize;
        this.inv = 1 / cellSize;
        this.map = new Map();
    }

    _cell(v) {
        return (v * this.inv) | 0;
    }

    _key(cx, cy) {
        // good enough for typical map sizes
        return (cx << 16) ^ (cy & 0xffff);
    }

    clear() {
        this.map.clear();
    }

    insert(ent) {
        const cx = this._cell(ent.x);
        const cy = this._cell(ent.y);
        const key = this._key(cx, cy);
        let bucket = this.map.get(key);
        if (!bucket) {
            bucket = [];
            this.map.set(key, bucket);
        }
        bucket.push(ent);
    }

    queryAABB(x1, y1, x2, y2, out = []) {
        out.length = 0;

        const minX = this._cell(x1), maxX = this._cell(x2);
        const minY = this._cell(y1), maxY = this._cell(y2);

        for (let cy = minY; cy <= maxY; cy++) {
            for (let cx = minX; cx <= maxX; cx++) {
                const bucket = this.map.get(this._key(cx, cy));
                if (!bucket) continue;
                for (let i = 0; i < bucket.length; i++) out.push(bucket[i]);
            }
        }

        return out;
    }
}
