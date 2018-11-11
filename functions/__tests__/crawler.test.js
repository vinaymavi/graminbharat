require("dotenv").config();
const puppeteer = require("puppeteer");
const Crawler = require("../crawler");
const constraint = require("../crawler/constraint");
const URL =
  "http://planningonline.gov.in/ReportData.do?ReportMethod=getAnnualPlanReport";
let browser;
const testData = {
  plan_year_value: "2017-2018",
  state:'UTTAR PRADESH',
  state_value:'9',
  plan_unit:'Gram Panchayat',
  plan_unit_value:'G-3-2-0-0',
  district:"AGRA",
  district_value:'109',
  block:'ACHHNERA',
  block_value:'1386',
  village:'ABHAUDOPURA',
  village_value:'42727'
};
const testData1 = {
  plan_year_value: "2017-2018",
  state:'GOA',
  state_value:'30',
  plan_unit:'Gram Panchayat',
  plan_unit_value:'G-3-2-0-0',
};
describe("My Puppeteer Test cases", async () => {
  afterAll(async () => {
    browser && (await browser.close());
  });

  it("Loaded Successfully.", () => {
    expect(Crawler).toBeTruthy();
  });

  it("Stage created sucessfully.", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(constraint.stages.planYear, page, URL, constraint.waitTime);
    expect(crawler.stage).toBeTruthy();
  });

  it("Load plan year successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(constraint.stages.planYear, page, URL, constraint.waitTime);
    await crawler.stage.goto();
    const planYears = await crawler.stage.getValues();
    expect(planYears).toBeTruthy();
  });

  it("Load state successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.state,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    const states = await crawler.stage.getValues();
    expect(states).toBeTruthy();
  });

  it("Load plan unit successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.planUnitType,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    const planUnit = await crawler.stage.getValues();
    console.log("Plan Units = ",planUnit);
    expect(planUnit).toBeTruthy();
  });
 
  it("Load district unit successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.district,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    const districts = await crawler.stage.getValues();
    expect(districts).toBeTruthy();
  });
 
  it("Load block unit successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.block,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    const blocks = await crawler.stage.getValues();
    expect(blocks).toBeTruthy();
  });

  it("Load villages unit successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.village,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    const villages = await crawler.stage.getValues();
    expect(villages).toBeTruthy();
  });
  
  it("Load villages Report successfully..", async () => {
    browser = await puppeteer.launch({args: ['--no-sandbox']});
    const page = await browser.newPage();
    const crawler = new Crawler(
      constraint.stages.report,
      page,
      URL,
      constraint.waitTime
    );
    await crawler.stage.goto();
    await crawler.stage.changeSelection(testData);
    await crawler.stage.triggerClick();
    const villageReport = await crawler.stage.getValues();
    expect(villageReport.length).toBeTruthy();
  });
});
