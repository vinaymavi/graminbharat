const Village = require("./Village");
const Util = require("./Util");
const SELECTOR = 'tr[id="buttonId"] input[value="Get Report"]';
const PARENT_SELECTOR = 'select[id="village"]';
const REPORT_SELECTOR = '#publicWorkTableId table[id="suggadd"] tr';
class Report extends Village {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    await super.changeSelection(row);
    Util.changeSelectElmValue(this.page, PARENT_SELECTOR, row.village_value);
    await this.wait();
  }

  async triggerClick() {
    await Util.triggerClick(this.page, SELECTOR);
    await this.wait();
  }
  async getValues() {
    return await Util.getReport(this.page, REPORT_SELECTOR);
  }
}

module.exports = Report;
