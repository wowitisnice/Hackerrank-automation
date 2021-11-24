let puppeteer=require("puppeteer");
let email="vetomas242@latovic.com";
let password="xxxxxxxx";
let cPage;
let browser1;
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
let browserPromise=puppeteer.launch({headless:false,slowMo:80,args:["--start-maximized"],defaultViewport:null});
browserPromise.then(function (browser) {
    browser1=browser;
    return browser.pages();
}).then(function (allPagesArr) {
    cPage=allPagesArr[0];
    return cPage.goto("https://www.hackerrank.com/auth/login");
}).then(function () {
    return cPage.waitFor(50);
}).then(function () {
    return cPage.waitForSelector("#input-1");
}).then(function () {
    return cPage.waitFor(100);
}).then(function () {
        return cPage.type("#input-1",email,{delay:50});
}).then(function () {
       return cPage.type("#input-2",password,{delay: 50});
}).then(function () {
    return cPage.keyboard.press("Enter");
}).then(function () {
    return waitAndClick("div[data-automation=\"algorithms\"]",cPage);
}).then(function () {
   return  waitAndClick("input[value=\"warmup\"]",cPage);
}).then(function () {
    return cPage.waitForSelector(".challenge-submit-btn .ui-text");
}).then(function () {
    return cPage.$$(".challenge-submit-btn .ui-text");
}).then(function (qArr) {
    // console.log(qArr.length);
    questionSolver(qArr[0],answer);
});
function waitAndClick(selector,page) {
    return new Promise(function (resolve, reject) {
                let elementLoadPromise=page.waitForSelector(selector);
                elementLoadPromise.then(function () {
                    return page.click(selector);
                }).then(function () {
                    resolve();
                }).catch(function (err) {
                    reject()
                })
    })
}
function questionSolver(question,answer) {
    return new Promise(function (resolve, reject) {
        question.click().then(function () {
            return cPage.waitForSelector(".monaco-editor.no-user-select.vs");
        }).then(function () {
            return waitAndClick(".checkbox-input", cPage);
        }).then(function () {
           return cPage.waitForSelector("textarea.input");
        }).then(function () {
            return cPage.type("textarea.input",answer);
        }).then(function () {
            return cPage.keyboard.down("Control",{delay:50});
        }).then(function () {
            return cPage.keyboard.press("A",{delay:50});
        }).then(function () {
            return cPage.keyboard.press("X",{delay:50});
        }).then(function () {
            return cPage.keyboard.up("Control");
        }).then(function () {
            return cPage.click(".monaco-editor.no-user-select.vs");
        }).then(function () {
            return cPage.keyboard.down("Control",{delay:50});
        }).then(function () {
            return cPage.keyboard.press("A",{delay:50});
        }).then(function () {
            return cPage.keyboard.press("V",{delay:50});
        }).then(function () {
            return cPage.keyboard.up("Control");
        }).then(function () {
            cPage.waitFor(100);
        }).then(function () {
            return cPage.click(".pull-right.msR",{delay:50});
        }).then(function () {
            resolve();
        }).catch(function () {
            reject();
        })
    })
}