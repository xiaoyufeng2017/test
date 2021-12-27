const MongoDB = require('mongodb')
const MongoClient = MongoDB.MongoClient
const objectID = MongoDB.objectID

const Config = require('./mongoDB.config.js')

class Db{
  
  static getInstance() {
    if(!Db.instance){
      Db.instance = new Db()
    }
    
    return Db.instance
  }

  constructor(){
    this.dbClient = "";
    this.connect()
  }

  connect(){
    return new Promise((resolve, reject) => {
      if(!this.dbClient){
        MongoClient.connect(Config.dbUrl,(err,client) => {
          if(err){
            reject(err)
          }
          else{
            this.dbClient = client.db(Config.dbName)
            resolve(this.dbClient)
          }
        })
      }
      else{
        resolve(this.dbClient)
      }
    })
  }

  add(tableName,json){
    return new Promise((resolve,reject) =>{
        this.connect().then(db => {
            db.collection(tableName).insertOne(json,(err,result) => {
                if(!err){
                    resolve(result);
                    console.log(result);
                    return;
                };
                reject(err);
            });
        });
    });
  };

  find(tableName,json){
    return new Promise((resolve,reject) => {
        this.connect().then(db => {
            let result = db.collection(tableName).find(json);
            result.toArray((err,data) => {
                if(!err){
                    resolve(data);
                    console.log(data);
                    return;
                }
                reject(err);
            });
        });
    });
};

 // 删除
 remove(tableName,json){
  return new Promise((resolve,reject) => {
      this.connect().then(db => {
          db.collection(tableName).deleteOne(json,(err,result) => {
              if(!err){
                  resolve(result);
                  return;
              };
              reject(err);
          });
      });
  });
};

// 更新
update(tableName,condition,json){
  return new Promise((resolve,reject) => {
      this.connect().then(db => {
          db.collection(tableName).updateOne(condition,{
              $set:json
          },(err,result) => {
              if(!err){
                  resolve(result);
                  return;
              };
              reject(err);
          });
      });
  });
};

}



module.exports = Db.getInstance()