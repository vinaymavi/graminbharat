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
  batchUplaod(rows) {
    const batch = firestore.batch();
    rows.forEach(row => {
      batch.set(this.collection.doc(), row);
    });

    return batch
      .commit()
      .then(res => {
        console.log(res);
        return res;
      })
      .catch(err => {
        console.log(`Error ${err}`);
      });
  }
  add(data) {
    return this.collection.doc().set(data);
  }
}

module.exports = Firestore;
