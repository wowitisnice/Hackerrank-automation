let puppeteer=require("puppeteer");
let email="vetomas242@latovic.com";
let password="xxxxxxxx";
let answer=`
         #include <cstdio>
#include <iostream>
#include <vector>
#include <iostream>
#include <algorithm>
using namespace std;

int solveMeFirst(int a, int b) {
  return a+b;
}

int main() {
  int num1, num2;
  int sum;
  cin>>num1>>num2;
  sum = solveMeFirst(num1,num2);
  cout<<sum;
  return 0;
}`;
(async function() {
    let browser=await puppeteer.launch({headless: false, slowMo: 60, defaultViewport: null, args: ["--start-maximized"]});
    let allTabs=await browser.pages();
    await allTabs[0].goto("https://www.hackerrank.com/auth/login");
    await allTabs[0].waitFor(50);
    await allTabs[0].waitForSelector("#input-1");
    await allTabs[0].type("#input-1",email);
    await allTabs[0].waitForSelector("#input-2");
    await allTabs[0].type("#input-2",password);
    await waitAndClick(allTabs[0],".auth-button");
    await waitAndClick(allTabs[0],"div[data-automation=\"algorithms\"]");
    await waitAndClick(allTabs[0],"input[value=\"warmup\"]");
    let questionArr=await allTabs[0].$$(".challenge-submit-btn");
    await questionSolver(allTabs[0],questionArr[0],answer);
})()
async function waitAndClick(page,selector) {
    await page.waitForSelector(selector);
    await page.click(selector);
}
async function questionSolver(page,question,answer) {
    await question.click();
    await waitAndClick(page,".custom-holder.inset");
    await page.type(".custominput",answer);
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.down("X");
    await page.keyboard.up("Control");
    await page.click(".editor-scrollable");
    await page.keyboard.down("Control");
    await page.keyboard.press("A");
    await page.keyboard.down("V");
    await page.keyboard.up("Control");
    await page.click(".hr-monaco__run-code",{delay:10});
}