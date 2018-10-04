const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const Crawler = require("./crawler");
const Firestore = require("./firebasestore");
const constraint = require("./crawler/constraint");
const rowsCol = new Firestore("rows");
exports.rowListener = functions.firestore
  .document("rows/{userId}")
  .onCreate(async (snap, context) => {
    const browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const data = snap.data();
    const crawler = new Crawler(data.stage, page, data.url, 2);
    await crawler.stage.goto();
    switch (data.stage) {
      case constraint.stages.planYear:
        await fetchPlanYearAndInsert();
        break;
      case constraint.stages.state:
        await fetchStateAndInsert();
        break;
      case constraint.stages.planUnitType:
        await fetchPlanUnitAndInsert();
        break;
      case constraint.stages.district:
        await fetchDistrictAndInsert();
        break;
      case constraint.stages.block:
        await fetchBlockAndInsert();
        break;
      case constraint.stages.village:
        await fetchVillageAndInsert();
        break;
      default:
        console.log(data);
    }

    return 0;

    function fetchPlanYearAndInsert() {
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { plan_year: item.text, plan_year_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.state
      );
      return rowsCol.batchUplaod(preparedRows);
    }

    function fetchStateAndInsert() {
      crawler.stage.changeSelection(data);
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { state: item.text, state_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.planUnitType
      );
      return rowsCol.batchUplaod(preparedRows);
    }

    function fetchPlanUnitAndInsert() {
      crawler.stage.changeSelection(data);
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { plan_unit: item.text, plan_unit_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.district
      );
      return rowsCol.batchUplaod(preparedRows);
    }

    function fetchDistrictAndInsert() {
      crawler.stage.changeSelection(data);
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { district: item.text, district_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.block
      );
      return rowsCol.batchUplaod(preparedRows);
    }

    function fetchBlockAndInsert() {
      crawler.stage.changeSelection(data);
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { block: item.text, block_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.village
      );
      return rowsCol.batchUplaod(preparedRows);
    }

    function fetchVillageAndInsert() {
      crawler.stage.changeSelection(data);
      const list = crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { village: item.text, village_value: item.value };
      });
      const preparedRows = rowsCol.crateRows(
        data,
        preparedList,
        constraint.stages.report
      );
      return rowsCol.batchUplaod(preparedRows);
    }
  });
