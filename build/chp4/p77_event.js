'use strict';

var _events = require('events');

var _events2 = _interopRequireDefault(_events);

var _mongodb = require('mongodb');

var _mongodb2 = _interopRequireDefault(_mongodb);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * 利用事件队列解决雪崩问题
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * */

var Proxy = function (_events$EventEmitter) {
    _inherits(Proxy, _events$EventEmitter);

    function Proxy() {
        _classCallCheck(this, Proxy);

        return _possibleConstructorReturn(this, Object.getPrototypeOf(Proxy).call(this));
    }

    return Proxy;
}(_events2.default.EventEmitter);

var proxy = new Proxy();
var status = 'ready';

// 取消监听限制
proxy.setMaxListeners(0);

// 业务函数  Mongo如何使用复用, 什么时候close
var findXiaoming = function findXiaoming(callback) {
    var mongoClient = _mongodb2.default.MongoClient;
    mongoClient.connect('mongodb://localhost:27017/deepInNode', function (err, db) {
        var cursor = db.collection('user').find({ username: 'xiaohong' });
        cursor.toArray(function (err, doc) {
            callback(doc);
            db.close();
        });
    });
};

// 绑定事件封装逻辑
var select = function select(callback) {
    proxy.once('selected', callback);
    if (status === 'ready') {
        console.log('querying');
        status = 'pending';
        findXiaoming(function (result) {
            proxy.emit('selected', result);
            status = 'ready';
        });
    }
};

// 展示给用户的api就是一个简单的select
select(function (result) {
    console.log(result);
});
select(function (result) {
    console.log(result);
});
select(function (result) {
    console.log(result);
});
select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});
select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});select(function (result) {
    console.log(result);
});

// let mongoClient = mongodb.MongoClient;
// mongoClient.connect('mongodb://localhost:27017/deepInNode', (err, db) => {
//     if (err) console.log(err);
//     let cursor  = db.collection('user').find({username: 'xiaohong'});
//     cursor.toArray((err, result) => {
//         if (err) console.log(err);
//         if (result) console.dir(result);
//         db.close();
//     });
//
//     // db.collection('user').insertMany([{username: 'xiaohong', age: 22}], function(err, result) {
//     //     console.dir(result);
//     //     db.close();
//     // });
// });
//# sourceMappingURL=p77_event.js.map