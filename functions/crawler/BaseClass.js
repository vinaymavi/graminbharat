class BaseClass {
  constructor(page, url, waitForSec) {
    this.page = page;
    this.url = url;
    this.waitForMillSec = waitForSec ? waitForSec * 1000 : 2 * 1000;
  }

  goto() {
    return this.page.goto(this.url, { waitUntil: "networkidle0" });
  }
  wait() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("OK");
      }, this.waitForMillSec);
    });
  }

  changeSelection() {
    throw new Error("This is an abstract method.");
  }
  
  getValues(){
    throw new Error("This is an abstract method.");
  }
}

module.exports = BaseClass;
