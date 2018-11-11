class Util {
  constructor() {}

  static changeSelectElmValue(page, selector, value) {
    console.log("Change Options", `Selector = ${selector}`, `value = ${value}`);
    return page.$eval(
      selector,
      (el, value) => {
        el.value = value;
        console.log("Changed Value = " + el.value);
        el.onchange();
      },
      value
    );
  }

  static getSelectElmOptions(page, selector) {
    console.log("Get Options", `Selector = ${selector}`);
    return page.$eval(selector, el => {
      let options = [];
      el.querySelectorAll("option").forEach(e => {
        if (
          typeof e.value === "string" &&
          e.value.trim() !== "Select" &&
          e.value.trim().length
        ) {
          options.push({ text: e.innerText, value: e.value });
        }
      });
      return options;
    });
  }

  static triggerClick(page, selector) {
    return page.$eval(selector, el => {
      el.click();
    });
  }

  static getReport(page, selector) {
    return page.$$eval(selector, rows => {
      let report = [];
      let row;
      // i=2 to skip first two rows.
      for (let i = 2; i < rows.length; i++) {
        row = rows[i];
        let reportArr = [];
        row.querySelectorAll("td").forEach(column => {
          reportArr.push(column.innerText);
        });
        report.push(reportArr);
      }
      return report;
    });
  }
}

module.exports = Util;
