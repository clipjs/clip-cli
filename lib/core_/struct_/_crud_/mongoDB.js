const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');


var mongodb = {
  connection:function(){
    return new Promise((resolve,reject)=>{
        const url = 'mongodb://localhost:27017';
        const dbName = 'clip';
          MongoClient.connect(url, function(err, client) {
              assert.equal(null, err);
              //console.log("Connected successfully to server");
              const db = client.db(dbName);
                resolve({db,client});
            });
        });

  },
  find:function(_collection_){
    return new Promise((resolve,reject)=>{
      this.connection().then((r_)=>{
       const collection = r_.db.collection(_collection_);
       collection.find({}).toArray(function(err, docs) {
        assert.equal(err, null);
        resolve(docs);
       });
        r_.client.close();
      });
    });
  },
  insert:function(_collection_,json){
    return new Promise((resolve,reject)=>{
      this.connection().then((r_)=>{
       const collection = r_.db.collection(_collection_);
          
        //[{ambiente : 1}, {ambiente : 2}, {ambiente : 3}]
        // console.log(json);
        
        collection.insertMany(json,function(err, result) {
          assert.equal(err, null);
          assert.equal(1, result.result.n);
          assert.equal(1, result.ops.length);
          //console.log("Inserted documents into the collection");
          resolve(result);
        });
        

        r_.client.close();
      });
    });
  }

};

module.exports = mongodb;


/*
//export default class Connection 

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'clip';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);


 // insert(db, function() {
 //   client.close();
 // });

find(db,()=>{
 client.close();
});

 //findFilter(db,()=>{
 //	client.close();
 //});

//update(db,()=>{
//	client.close();
//});

//remove(db,()=>{
//	client.close();
//});

 // client.close();
});


const insert = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ambientes');
  // Insert some documents
  collection.insertMany([
    {ambiente : 1}, {ambiente : 2}, {ambiente : 3}
  ], function(err, result) {
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}


const find = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ambientes');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


const findFilter = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ambientes');
  // Find some documents
  collection.find({'ambiente': 1}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs);
    callback(docs);
  });
}


const update = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ambientes');
  // Update document where a is 2, set b equal to 1
  collection.updateOne({ ambiente : 2 }
    , { $set: { ambiente : 'se ligo!' } }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Updated the document with the field a equal to 2");
    callback(result);
  });  
}

const remove = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('ambientes');
  // Delete document where a is 3
  collection.deleteOne({ ambiente : 1 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    

 collection.deleteOne({ ambiente : 3 }, function(err, result) {
    assert.equal(err, null);
    assert.equal(1, result.result.n);
    console.log("Removed the document with the field a equal to 3");
    callback(result);
  });    

}

*/