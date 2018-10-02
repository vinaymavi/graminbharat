const admin = require("firebase-admin");
const functions = require("firebase-functions");
const { Map, List } = require("immutable");

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
  batchUplaod() {
    
  }
  add(data) {
    return this.collection.doc().set(data);
  }
}

module.exports = Firestore;
