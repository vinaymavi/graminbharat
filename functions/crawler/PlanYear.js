const BaseClass = require("./BaseClass");
const Util = require('./Util');
const SELECTOR = 'select[id="planYearId"]';
class PlanYear extends BaseClass {
  constructor(page, url, waitForSec) {
      super(page,url,waitForSec);
  }
  
  async getValues(){
    return [{text:'2017-2018',value:'2017-2018'}];
  }
}

module.exports = PlanYear;
