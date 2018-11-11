const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Map, List } = require("immutable");
const hash = require('object-hash')
admin.initializeApp(functions.config().firebase);

var firestore = admin.firestore();

class Firestore {
  constructor(collectionName) {
    this.collection = firestore.collection(collectionName);
  }

  crateRows(parentData, dataArr, stage) {
    parentData.stage = stage;
    const map = Map(parentData);
    let rows = dataArr && dataArr.map(item => map.merge(item));
    return List(rows).toJS();
  }
  batchUplaod(rows) {
    const batch = firestore.batch();
    rows.forEach(row => {
      batch.create(this.collection.doc(`${hash(row)}`), row);
    });
    return batch
      .commit()
  }

  add(data) { 
    return this.collection.doc(`${hash(data)}`).create(data);
  }
}

module.exports = Firestore;
