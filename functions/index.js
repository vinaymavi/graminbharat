const functions = require("firebase-functions");
const puppeteer = require("puppeteer");
const Crawler = require("./crawler");
const Firestore = require("./firebasestore");
const constraint = require("./crawler/constraint");
const COLLECTION_NAME = 'rows1';
const rowsCol = new Firestore(COLLECTION_NAME);
// Error =  "Possible EventEmitter memory leak detected. 11 SIGINT listeners added" solutions
process.setMaxListeners(Infinity);
exports.betaRowListener = functions.firestore
  .document(`${COLLECTION_NAME}/{userId}`)
  .onCreate(async (snap, context) => {
    const browser = await puppeteer.launch({ args: ["--no-sandbox","--disable-setuid-sandbox"] });
    const page = await browser.newPage();
    const data = snap.data();
    const crawler = new Crawler(data.stage, page, data.url, 2);
    if (!crawler.stage) {
      console.log(data);
      return 0;
    }
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

    async function fetchPlanYearAndInsert() {
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { plan_year: item.text, plan_year_value: item.value };
      });

      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.state
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }

    async function fetchStateAndInsert() {
      await crawler.stage.changeSelection(data);
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { state: item.text, state_value: item.value };
      });

      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.planUnitType
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }

    async function fetchPlanUnitAndInsert() {
      await crawler.stage.changeSelection(data);
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { plan_unit: item.text, plan_unit_value: item.value };
      });
      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.district
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }

    async function fetchDistrictAndInsert() {
      await crawler.stage.changeSelection(data);
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { district: item.text, district_value: item.value };
      });
      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.block
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }

    async function fetchBlockAndInsert() {
      await crawler.stage.changeSelection(data);
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { block: item.text, block_value: item.value };
      });
      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.village
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }

    async function fetchVillageAndInsert() {
      await crawler.stage.changeSelection(data);
      const list = await crawler.stage.getValues();
      const preparedList = list.map(item => {
        return { village: item.text, village_value: item.value };
      });
      if (preparedList && preparedList.length) {
        const preparedRows = rowsCol.crateRows(
          data,
          preparedList,
          constraint.stages.report
        );
        return rowsCol.batchUplaod(preparedRows);
      }
      return 0;
    }
  });
