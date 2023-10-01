require('fs');
const vars = require('./vars.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const ca = require("moment/locale/ca");
const {TimeoutError} = require("puppeteer");
async function dlt() {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.launch({
        headless: false,
        args: [
            '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36'
        ]
    })
    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    await page.waitForSelector(vars.usernamefield);
    await page.type(vars.usernamefield, vars.username);
    await page.type(vars.passwordfield, vars.password);
    await page.click(vars.loginbutton);
    await page.waitForNavigation({
        timeout: 300000
    });

    await page.goto(vars.chatbox, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });
    await page.waitForNavigation({
        timeout: 300000
    });

    await page
        .waitForSelector(vars.notiButtonSelector, {
            timeout: 300000
        })
        .then(() => page.click(vars.notiButtonSelector));
    const selector = vars.scrollableDiv;
    await page.waitForSelector(selector);
    let i = 0;

    while (true) {

        while (true) {

            await page.evaluate(() => {
                return new Promise((resolve, reject) => {
                    try {
                        const interval = setInterval(async () => {
                            let elements = await page.$$('div.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3 div.x1n2onr6 div.x78zum5.xdt5ytf.x1n2onr6:has(span.xzpqnlu.x1hyvwdk.xjm9jq1.x6ikm8r.x10wlt62.x10l6tqk.x1i1rx1s):has(div.x78zum5.x1iyjqo2.xs83m0k.xeuugli):has(div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u):has(div[role="button"][aria-label="Double tap to like"].x1qjc9v5.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xk390pu.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.xggy1nq.x11njtxf');
                            if (elements.length > 0) {
                                for (let element of elements) {
                                    await element.evaluate(el => el.remove());
                                    console.log('b');

                                }
                            } else {
                                clearInterval(interval);
                                resolve();

                            }
                        }, 1000); // adjust the time delay as needed
                    } catch (err) {
                        console.log(err);
                        reject(err);
                    }
                });
            });

            let elements = await page.$$('div.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3 div.x1n2onr6 div.x78zum5.xdt5ytf.x1n2onr6:has(span.xzpqnlu.x1hyvwdk.xjm9jq1.x6ikm8r.x10wlt62.x10l6tqk.x1i1rx1s):has(div.x78zum5.x1iyjqo2.xs83m0k.xeuugli):has(div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u):has(div[role="button"][aria-label="Double tap to like"].x1qjc9v5.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xk390pu.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.xggy1nq.x11njtxf');

            if (elements) {
                console.log(elements);
                for (let element of elements) {
                    await element.evaluate(el => el.remove());
                    console.log('b');
                }
            } else if (elements.length === 0) {
                console.log(elements.length)

            }


            previousHeight = await page.evaluate((selector) => document.querySelector(selector).scrollHeight, 'body > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div >div');
            console.log(previousHeight);
            await page.evaluate((selector) => {
                const scrollDiv = document.querySelector(selector);
                scrollDiv.scrollTop = -scrollDiv.clientHeight;
            }, 'body > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div >div');
            if (previousHeight > 280000 + i) {
                break
            }
            const texts = await page.$$(vars.textSent);
            for (let text of texts) {
                try {

                    await text.hover();
                    console.log('hovered');
                    const threeDots = await page.waitForSelector(vars.threeDots);
                    await threeDots.click();
                    console.log('threedots clicked');

                    await page.waitForTimeout(300);
                    const unsend = await page.waitForXPath(vars.unsend);
                    await unsend.click();
                    await page.waitForTimeout(300);

                    const button = await page.waitForXPath('//button[text()=\'Unsend\']');
                    await button.click();
                    await page.waitForTimeout(2000);
                    console.log('yes');


                    await new Promise((resolve) => setTimeout(resolve, 500));
                } catch (error) {
                    if (vars.errors.indexOf(error.message) !== -1) {
                        console.log('The element is no longer in the document.');
                    } else if (error instanceof TimeoutError) {
                        console.log('The operation timed out.');
                    }
                }
            }

            const images = await page.$$(vars.imagesSent);
            for (let image of images) {
                try {

                    await image.hover();
                    console.log('hovered');

                    const threeDots = await page.waitForSelector(vars.threeDots, {});
                    await threeDots.click();
                    await page.waitForTimeout(300);
                    console.log('threedots clicked');

                    const unsend = await page.waitForXPath(vars.unsend);
                    await unsend.click();
                    await page.waitForTimeout(300);

                    const button = await page.waitForXPath('//button[text()=\'Unsend\']');
                    await button.click();
                    await page.waitForTimeout(2000);
                    console.log('yes');
                    await new Promise((resolve) => setTimeout(resolve, 500));
                } catch (error) {
                    if (vars.errors.indexOf(error.message) !== -1) {
                        console.log('The element is no longer in the document.');
                    } else if (error instanceof TimeoutError) {
                        console.log('The operation timed out.');
                    }
                }
            }
        }
        i += 5000;
    }


}


dlt();