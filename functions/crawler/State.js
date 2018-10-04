const PlanYear = require("./PlanYear");
const Util = require("./Util");
const SELECTOR = 'select[id="stateCode"]';
const PARENT_SELECTOR = 'select[id="planYearId"]';
class State extends PlanYear {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    Util.changeSelectElmValue(this.page,PARENT_SELECTOR,row.plan_year_value);
    await this.wait();
  }

  async getValues() {
    return await Util.getSelectElmOptions(this.page, SELECTOR);
  }
}

module.exports = State;
