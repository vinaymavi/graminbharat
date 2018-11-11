const PlanYear = require("./PlanYear");
const State = require("./State");
const PlanUnitType = require("./PlanUnitType");
const District = require("./District");
const Block = require("./Block");
const Village = require("./Village");
const Report = require('./Report');

const constraint = require("./constraint");

class Crawler {
  constructor(stage, page, url, waitForSec) {
    switch (stage) {
      case constraint.stages.planYear:
        this.stage = new PlanYear(page, url, waitForSec);
        break;
      case constraint.stages.state:
        this.stage = new State(page, url, waitForSec);
        break;
      case constraint.stages.planUnitType:
        this.stage = new PlanUnitType(page, url, waitForSec);
        break;
      case constraint.stages.district:
        this.stage = new District(page, url, waitForSec);
        break;
      case constraint.stages.block:
        this.stage = new Block(page, url, waitForSec);
        break;
      case constraint.stages.village:
        this.stage = new Village(page, url, waitForSec);
        break;
      case constraint.stages.report:
        this.stage = new Report(page, url, waitForSec);
        break;
      default:
        console.log(`invalid stage ${stage}`);
    }
  }
}

module.exports = Crawler;
