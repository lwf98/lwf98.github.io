let fs = require('fs');
let path = require('path');

class DB{
    constructor(name){
        this._loadDB = () => {
            return new Promise(function (resolve, reject) {
                fs.readFile(path.join(__dirname, `${name}_db.json`), function (err, data) {
                    if (err){
                        reject(err);
                    }
                    resolve(JSON.parse(data.toString()));
                });
            });
        };

        this._updateDB = (data) => {
            return new Promise(function (resolve, reject) {
                fs.writeFile(path.join(__dirname, `${name}_db.json`), JSON.stringify(data), function (err, data) {
                    if (err){
                        reject(err);
                    }
                    resolve(data);
                });
            });
        };

        this.show = () => {
            this._loadDB().then(function (data) {
                console.log(data);
            });
        };

        this.find = (obj, callback) => {
            let ret = [];
            this._loadDB().then(function (data) {
                for (let value of data){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in value) || value[key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        ret.push(value);
                    }
                    flag = true;
                }
                callback(ret);
                return ret;
            });
        };

        this.findOne = (obj, callback) => {
            this._loadDB().then(function (data) {
                for (let value of data){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in value) || value[key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        callback(value);
                        return value;
                    }
                    flag = true;
                }
                callback(null);
                return null;
            });
        };

        this.save = (obj, callback) => {
            let _updateDB = this._updateDB;
            this._loadDB().then(function (data) {
                data.push(obj);
                return _updateDB(data);
            }).then(function () {
                console.log('Save success!');
            }, function (err) {
                console.log('Save fail!');
                callback(err);
            })
        };
        
        this.delete = (obj, callback) => {
            let ret = [];
            let _updateDB = this._updateDB;
            this._loadDB().then(function (data) {
                for (let i = 0; i < data.length; i++){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in data[i]) || data[i][key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        ret.push(data.splice(i, 1)[0]);
                    }
                    flag = true;
                }
                callback(ret);
                return _updateDB(data);
            }).then(function () {
                console.log('Delete success');
            });
        };

        this.deleteOne = (obj, callback) => {
            let ret;
            let _updateDB = this._updateDB;
            this._loadDB().then(function (data) {
                for (let i = 0; i < data.length; i++){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in data[i]) || data[i][key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        ret = data.splice(i, 1)[0];
                        break;
                    }
                    flag = true;
                }
                callback(ret);
                return _updateDB(data);
            }).then(function () {
                console.log('DeleteOne success');
            });
        }

        this.update = (obj, newObj, callback) => {
            let ret = [];
            let _updateDB = this._updateDB;
            this._loadDB().then(function (data) {
                for (let value of data){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in value) || value[key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        ret.push(value);
                        for (let key in newObj){
                            value[key] = newObj[key];
                        }
                    }
                    flag = true;
                }
                callback(ret);
                return _updateDB(data);
            }, function () {
                console.log('Update success');
            });
        };

        this.updateOne = (obj, newObj, callback) => {
            let ret;
            let _updateDB = this._updateDB;
            this._loadDB().then(function (data) {
                for (let value of data){
                    let flag = true;
                    for (let key in obj){
                        if (!(key in value) || value[key] !== obj[key]){
                            flag = false;
                        }
                    }
                    if (flag){
                        ret = value;
                        for (let key in newObj){
                            value[key] = newObj[key];
                        }
                        break;
                    }
                    flag = true;
                }
                callback(ret);
                return _updateDB(data);
            }, function () {
                console.log('UpdateOne success');
            });
        }
    }

}



module.exports = DB;

