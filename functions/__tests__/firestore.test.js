require("dotenv").config();
const Firestore = require("../firebasestore");
const usersCol = new Firestore("test_users");
describe("Firestore Test cases", () => {
  it("Firestore loaded successfully", () => {
    expect(Firestore).toBeTruthy();
  });

  it("Firestore should initialize successfully.", () => {
    expect(usersCol).toBeTruthy();
  });
  it("Create Rows should return a list", () => {
    const list = usersCol.crateRows(
      { name: "vinay" },
      [{ class: 5 }, { class: 6 }],
      "first"
    );
    expect(list.length).toBe(2);
  });

  it("Add user to firestore successfully.", () => {
    const list = usersCol.crateRows(
      { name: "vinay" },
      [{ class: 5 }, { class: 6 }],
      "first"
    );
    return expect(
      usersCol
        .add(list[0])
        .then((writeRef) => {
          return writeRef.writeTime;
        })
    ).resolves.toBeTruthy();
  });
});
