const State = require("./State");
const Util = require("./Util");
const SELECTOR = 'select[id="forwardedToType"]';
const PARENT_SELECTOR = 'select[id="stateCode"]';
class PlanUnitType extends State {
  constructor(page, url, waitForSec) {
    super(page, url, waitForSec);
  }
  async changeSelection(row) {
    await super.changeSelection(row);
    Util.changeSelectElmValue(this.page, PARENT_SELECTOR, row.state_value);
    await this.wait();
  }

  async getValues() {
    const planUnits = await Util.getSelectElmOptions(this.page, SELECTOR);
    let planUnitsArr = [];
    planUnits.forEach(planUnit => {
      if (planUnit.value.indexOf("G-3") > -1) {
        planUnitsArr.push(planUnit);
      }
    });
    return planUnitsArr;
  }
}

module.exports = PlanUnitType;
