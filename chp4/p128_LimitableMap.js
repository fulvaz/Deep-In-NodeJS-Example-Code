class LimitableMap {

    constructor(limit) {
        this.limit = limit;
        this.map = {};
        this.keys = [];
    }

    set(key, value) {
        let map = this.map;
        let keys = this.key;

        // 新键, 需要处理满的问题
        if (!map.hasOwnProperty(key)) {
            if (keys.length === this.limit) {
                let firstKey = keys.shift();
                delete map[firstKey];
            }
            keys.push(key);
        }
        // 添加或者更新
        map[key] = value;
    }

    get(key) {
        return this.map[key];
    }
}

