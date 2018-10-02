const admin = require("firebase-admin");
const functions = require("firebase-functions");

admin.initializeApp(functions.config().firebase);

var db = admin.firestore();

// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  const age = req.query.age;
  var docRef = db.collection("users").doc(`${firstname}|${lastname}|${age}`);
  var setAda = docRef
    .set({
      first: firstname,
      last: lastname,
      born: age
    })
    .then(() => {
      return res.send("Document added successfully.");
    });
});

exports.toUpperCase = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const name = newValue.first.toUpperCase() +' '+ newValue.last.toUpperCase();
    const name_uppercase = name.toUpperCase();
    return snap.ref
      .update("name_uppercase", name_uppercase)
      .then(res => {
        console.log(`Document updated at ${res}`);
        return true;
      })
      .catch(err => {
        console.log(`Error occured = ${err.info}`);
        return true;
      });
  });
