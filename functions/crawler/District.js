const PlanUnitType = require("./PlanUnitType");
const Util = require("./Util");
const SELECTOR = 'select[id="district"]';
const PARENT_SELECTOR = 'select[id="forwardedToType"]';
class District extends PlanUnitType {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    await super.changeSelection(row);
    Util.changeSelectElmValue(this.page, PARENT_SELECTOR, row.plan_unit_value);
    await this.wait();
  }

  async getValues() {
    return await Util.getSelectElmOptions(this.page, SELECTOR);
  }
}

module.exports = District;
