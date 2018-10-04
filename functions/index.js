const { Firestore } = require("./firebasestore");
const userCol = Firestore("users");

exports.addMessage = functions.https.onRequest((req, res) => {
  const firstname = req.query.firstname;
  const lastname = req.query.lastname;
  const age = req.query.age;
  userCol
    .add({
      first: firstname,
      last: lastname,
      born: age
    })
    .then(() => {
      return res.send("Document added successfully.");
    })
    .catch(err => {
      return res.send(`Error on server${err}`);
    });
});

exports.toUpperCase = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    // Get an object representing the document
    // e.g. {'name': 'Marie', 'age': 66}
    const newValue = snap.data();

    // access a particular field as you would any JS property
    const name =
      newValue.first.toUpperCase() + " " + newValue.last.toUpperCase();
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
