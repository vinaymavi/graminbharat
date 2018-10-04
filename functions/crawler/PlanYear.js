const BaseClass = require("./BaseClass");
const Util = require('./Util');
const SELECTOR = 'select[id="planYearId"]';
class PlanYear extends BaseClass {
  constructor(page, url, waitForSec) {
      super(page,url,waitForSec);
  }
  
  async getValues(){
    return await Util.getSelectElmOptions(this.page,SELECTOR);
  }
}

module.exports = PlanYear;
