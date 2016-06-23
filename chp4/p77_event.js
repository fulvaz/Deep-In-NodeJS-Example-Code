/**
 * 利用事件队列解决雪崩问题
 *
 *
 * */

import events from 'events'
import mongodb from 'mongodb'

class Proxy extends events.EventEmitter {
    constructor() {
        super();
    }
}

let proxy = new Proxy();
let status = 'ready';

// 取消监听限制
proxy.setMaxListeners(0);

// 业务函数  Mongo如何使用复用, 什么时候close
let findXiaoming = function (callback) {
    let mongoClient = mongodb.MongoClient;
    mongoClient.connect('mongodb://localhost:27017/deepInNode', function(err, db) {
        let cursor = db.collection('user').find({username: 'xiaohong'});
        cursor.toArray((err, doc) => {
            callback(doc);
            db.close();
        });
    });
};

// 绑定事件封装逻辑
let select = function (callback) {
    proxy.once('selected', callback);
    if (status === 'ready') {
        console.log('querying');
        status = 'pending';
        findXiaoming((result) => {
            proxy.emit('selected', result);
            status = 'ready';
        })
    }
};

// 展示给用户的api就是一个简单的select
select((result) => {
    console.log(result);
});
select((result) => {
    console.log(result);
});
select((result) => {
    console.log(result);
});
select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});
select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
    console.log(result);
});select((result) => {
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
