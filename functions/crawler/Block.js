const District = require("./District");
const Util = require("./Util");
const SELECTOR = 'select[id="block"]';
const PARENT_SELECTOR = 'select[id="district"]';
class Block extends District {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    await super.changeSelection(row);
    Util.changeSelectElmValue(this.page, PARENT_SELECTOR, row.district_value);
    await this.wait();
  }

  async getValues() {
    return await Util.getSelectElmOptions(this.page, SELECTOR);
  }
}

module.exports = Block;
