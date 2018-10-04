const Block = require("./Block");
const Util = require("./Util");
const SELECTOR = 'select[id="village"]';
const PARENT_SELECTOR = 'select[id="block"]';
class Village extends Block {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    await super.changeSelection(row);
    Util.changeSelectElmValue(this.page, PARENT_SELECTOR, row.block_value);
    await this.wait();
  }

  async getValues() {
    return await Util.getSelectElmOptions(this.page, SELECTOR);
  }
}

module.exports = Village;
