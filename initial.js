require('fs');
const vars = require('./vars.js');
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const ca = require("moment/locale/ca");
const {TimeoutError} = require("puppeteer");
const {scrollableDiv, textsReceived} = require("./vars");

async function dlt() {
    puppeteer.use(StealthPlugin())
    const browser = await puppeteer.connect({
        browserWSEndpoint: 'ws://127.0.0.1:9222/devtools/browser/75e5942e-7cd1-462b-9283-009b11339b2c',
        ignoreDefaultArgs:true,
        // product:"firefox",
        pipe:true,
        ignoreHTTPSErrors: false,
        protocolTimeout: 6000000,
        headless: true,
        args: [
            "--headless",
            "--incognito",
            '--single-process',
            '--disable-web-security',
            '--disable-features=IsolateOrigins',
            ' --disable-site-isolation-trials',
            '--disable-infobars',
            '--no-zygote',
            '--no-first-run',
            '--disable-accelerated-2d-canvas',
            '--unlimited-storage',
            '--full-memory-crash-report',
            '--disable-dev-shm-usage',
            '--disable-gpu',
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-infobars',
            '--window-position=0,0',
            '--ignore-certifcate-errors',
            '--ignore-certifcate-errors-spki-list',
            '--disable-features=LookalikeUrlNavigationSuggestionsUI',
            // '--user-agent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3312.0 Safari/537.36',
            '--disable-background-timer-throttling',
            '--disable-backgrounding-occluded-windows',
            '--disable-breakpad',
            '--disable-component-extensions-with-background-pages',
            '--disable-extensions',
            '--disable-features=TranslateUI,BlinkGenPropertyTrees',
            '--disable-ipc-flooding-protection',
            '--disable-renderer-backgrounding',
            '--enable-features=NetworkService,NetworkServiceInProcess',
            '--force-color-profile=srgb',
            '--metrics-recording-only',
            '--mute-audio'
        ]})




    const page = await browser.newPage();
    await page.goto('https://www.instagram.com');
    // await page.waitForSelector(vars.usernamefield);
    // await page.type(vars.usernamefield, vars.username);
    // await page.type(vars.passwordfield, vars.password);
    // await page.click(vars.loginbutton);
    // await page.waitForNavigation({
    //     timeout: 300000
    // });
    console.log('logged in');

    await page.goto(vars.chatbox, {
        timeout: 60000,
        waitUntil: 'domcontentloaded'
    });

    // await page
    //     .waitForSelector(vars.notiButtonSelector, {
    //         timeout: 300000
    //     })
    //     .then(() => page.click(vars.notiButtonSelector));
    const selector = vars.scrollableDiv;
    await page.waitForSelector(selector);
    let i = 0;

    while (true) {

        const infiniteScroll = async (page) => {
            await page.waitForSelector('body > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div >div');


            while (true) {

                previousHeight = await page.evaluate((selector) => document.querySelector(selector).scrollHeight, 'body > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div >div');
                await page.evaluate((selector) => {
                    const scrollDiv = document.querySelector(selector);
                    scrollDiv.scrollTop = -scrollDiv.clientHeight;
                }, 'body > div:nth-child(2) > div > div > div:nth-child(2) > div > div > div > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > section > div > div > div > div:nth-child(1) > div > div:nth-child(2) > div > div > div > div > div > div:nth-child(2) > div > div > div:nth-child(1) > div > div > div > div > div >div');
                // try {await page.waitForSelector('div[role="progressbar"] img[src="https://static.cdn.com/rsrc.php/v3/yl/r/gTdm7zPKz-c.gif"]', {visible: true, timeout:20000});}catch (TimeoutError){}

                await page.waitForSelector('div[role="progressbar"] img[src="https://static.cdn.com/rsrc.php/v3/yl/r/gTdm7zPKz-c.gif"]', { hidden: true });


                let  date= await page.$$('div[role="row"]:has(div[data-scope="date_break"]):has(span.xk50ysn)>div')
                for (let element of date) {
                    await element.evaluate(el=>el.remove());
                }
                console.log(date);
                let replyingtotextsReceived = await page.$$('div.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3 div.x1n2onr6 div.x78zum5.xdt5ytf.x1n2onr6:has(div.x78zum5.x1iyjqo2.xs83m0k.xeuugli):has(div.x6prxxf.x1fc57z9.x1yc453h.x126k92a.xzsf02u):has(div[role="button"][aria-label="Double tap to like"].x1qjc9v5.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x78zum5.xdt5ytf.x2lah0s.xk390pu.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.xggy1nq.x11njtxf):has(span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.x1fhwpqd.xo1l8bm.x1roi4f4.x1s3etm8.x676frb.x10wh9bi.x1wdrske.x8viiok.x18hxmgj[dir="auto"][style="line-height: var(--base-line-clamp-line-height); --base-line-clamp-line-height: 16px;"])\n');
                for (let element of replyingtotextsReceived) {
                    await element.evaluate(el => el.remove());
                }
                console.log(replyingtotextsReceived);

                let TextsReceived = await page.$$('div > div > div.xjp7ctv > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k > div > div > div > div > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xmz0i5r.x6ikm8r.x10wlt62.x1n2onr6 > div > div > div > div > div > div > div:nth-child(3) > div  div.x78zum5.xdt5ytf.x1n2onr6:has(a.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1rg5ohu.x1a2a7pz)')
                    for (let element of TextsReceived) {
                    await element.evaluate(el => el.remove());
                }
                console.log(TextsReceived);

                let ImagesReceived = await page.$$('div.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3 div.x78zum5.xdt5ytf.x1n2onr6:has(a.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1rg5ohu.x1a2a7pz):has(img.x1lliihq.x193iq5w.x5yr21d.xh8yej3):has(h5.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz )> div >div.x78zum5>div.x78zum5.x1iyjqo2.xs83m0k.xeuugli\n')
                    for (let element of ImagesReceived) {
                    await element.evaluate(el => el.remove());
                }
                console.log(ImagesReceived);

                let  voicesReceived= await page.$$('div.x78zum5.xdt5ytf.x1iyjqo2.xs83m0k.x1xzczws.x6ikm8r.x1rife3k.x1n2onr6.xh8yej3 div.x78zum5.xdt5ytf.x1n2onr6:has(a.x1i10hfl.x1qjc9v5.xjbqb8w.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xeuugli.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1o1ewxj.x3x9cwd.x1e5q0jg.x13rtm0m.x1q0g3np.x87ps6o.x1lku1pv.x1rg5ohu.x1a2a7pz):has(div.x1i10hfl.xjqpnuy.xa49m3k.xqeqjp1.x2hbi6w.x13fuv20.xu3j5b3.x1q0q8m5.x26u7qi.x972fbf.xcfux6l.x1qhh985.xm0m39n.x9f619.x1ypdohk.xdl72j9.x2lah0s.xe8uvvx.xdj266r.x11i5rnm.xat24cr.x1mh8g0r.x2lwn1j.xexx8yu.x4uap5.x18d9i69.xkhd6sd.x1n2onr6.x16tdsg8.x1hl2dhg.xggy1nq.x1ja2u2z.x1t137rt.x1q0g3np.x87ps6o.x1lku1pv.x1a2a7pz.x6s0dn4.x14hiurz.x14yjl9h.xudhj91.x18nykt9.xww2gxu.x78zum5.xxk0z11.xl56j7k.xnei2rj):has(h5.x1heor9g.x1qlqyl8.x1pd3egz.x1a2a7pz )\n')
                for (let element of voicesReceived) {
                    await element.evaluate(el => el.remove());
                }
                console.log(voicesReceived);

                let  emojis= await page.$$('div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x1v4esvl > section > div > div > div > div.xjp7ctv > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k > div > div > div > div > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xmz0i5r.x6ikm8r.x10wlt62.x1n2onr6 > div > div > div > div > div > div > div:nth-child(3) > div > div.x1n2onr6 >div >div.x78zum5.xdt5ytf.x1n2onr6:has(span[class="xu54ipa xb7ehew xdj266r x11i5rnm xat24cr x1mh8g0r xexx8yu x4uap5 x18d9i69 xkhd6sd x126k92a,"])\n')
                for (let element of emojis) {
                    await element.evaluate(el => el.remove());
                }
                console.log(emojis);

                // let  date= await page.$$('div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x1v4esvl > section > div > div > div > div.xjp7ctv > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k > div > div > div > div > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xmz0i5r.x6ikm8r.x10wlt62.x1n2onr6 > div > div > div > div > div > div > div:nth-child(3) > div > div[role="row"]:has(div.xzpqnlu.x1hyvwdk.xqtp20y.x6ikm8r.x10wlt62.xnalus7)')
                // for (let element of date) {
                //     await element.evaluate(el => el.remove());
                // }
                let nolongerAvailableTexts = await page.$$('div > div > div.x9f619.x1n2onr6.x1ja2u2z > div > div > div > div.x78zum5.xdt5ytf.x1t2pt76.x1n2onr6.x1ja2u2z.x10cihs4 > div.x9f619.xvbhtw8.x78zum5.x168nmei.x13lgxp2.x5pf9jr.xo71vjh.x1uhb9sk.x1plvlek.xryxfnj.x1c4vz4f.x2lah0s.xdt5ytf.xqjyukv.x1qjc9v5.x1oa3qoh.x1qughib > div.x1gryazu.xh8yej3.x10o80wk.x14k21rp.x1v4esvl > section > div > div > div > div.xjp7ctv > div > div.x9f619.x1n2onr6.x1ja2u2z.x78zum5.xdt5ytf.x193iq5w.xeuugli.x1r8uery.x1iyjqo2.xs83m0k > div > div > div > div > div > div.x1uvtmcs.x4k7w5x.x1h91t0o.x1beo9mf.xaigb6o.x12ejxvf.x3igimt.xarpa2k.xedcshv.x1lytzrv.x1t2pt76.x7ja8zs.x1n2onr6.x1qrby5j.x1jfb8zj > div > div > div.x78zum5.x1r8uery.xdt5ytf.x1iyjqo2.xmz0i5r.x6ikm8r.x10wlt62.x1n2onr6 > div > div > div > div > div > div > div:nth-child(3) > div > div:has(span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xvs91rp.xo1l8bm.x1roi4f4.x1tu3fi.x3x7a5m.x10wh9bi.x1wdrske.x8viiok.x18hxmgj')
                for (let element of nolongerAvailableTexts) {
                    await element.evaluate(el => el.remove());
                }

                console.log(previousHeight)



                if (previousHeight >   3000) {
                    break
                }
                try {
                    const timeout = 100;
                    const timeoutPromise = new Promise((resolve) => {
                        setTimeout(() => {
                            resolve(); // Resolve the promise after the timeout duration
                        }, timeout);
                    });
                    const top = await Promise.race([
                        page.waitForSelector('span.x1lliihq.x1plvlek.xryxfnj.x1n2onr6.x193iq5w.xeuugli.x1fj9vlw.x13faqbe.x1vvkbs.x1s928wv.xhkezso.x1gmr53x.x1cpjm7i.x1fgarty.x1943h6x.x1i0vuye.xvs91rp.xo1l8bm.x1roi4f4.x2b8uid.x1tu3fi.x3x7a5m.x10wh9bi.x1wdrske.x8viiok.x18hxmgj'),
                        timeoutPromise, // Use the timeout promise
                    ])
                    if (top) {
                        break
                    }
                } catch (TimeoutError) {
                }
                await new Promise((resolve) => setTimeout(resolve, 2000));

            }

            // let b = await page.$$(vars.emojis);
            // for (let element of b) {
            //     await element.evaluate(el => el.remove());
            // }
            // let k = await page.$$(vars.replyingtotextsReceived)
            // for (let element of k) {
            //     await element.evaluate(el => el.remove());
            // }

        }
        // const loadingSelector = 'div[role="progressbar"] img[src="https://static.cdn.com/rsrc.php/v3/yl/r/gTdm7zPKz-c.gif"]';
        // try {await page.waitForSelector(loadingSelector, {visible: true, timeout:20000});}catch (TimeoutError){ await infiniteScroll(page);}
        // try {await page.waitForSelector(loadingSelector, {visible: true, timeout:20000});}catch (TimeoutError){ await infiniteScroll(page);}

        // async function scrollAfterLoad(page, loadingSelector) {
        //     // wait for the loading selector to appear
        //     try {await page.waitForSelector(loadingSelector, {visible: true, timeout:20000});}catch (TimeoutError){}
        //
        //     await page.waitForSelector(loadingSelector, { hidden: true });
        //
        //     await infiniteScroll(page);
        // }
        // await scrollAfterLoad(page,'div[role="progressbar"] img[src="https://static.cdn.com/rsrc.php/v3/yl/r/gTdm7zPKz-c.gif"]' );
        await  infiniteScroll(page);


        const texts = await page.$$(vars.textSent);
            console.log(texts);
            for (let text of texts) {
                try {

                    await text.hover();
                    await text.hover();
                    await text.hover();
                    await text.hover();
                    await text.hover();

                    console.log('hovered');
                    const timeout = 100;

                    const threeDots = await page.waitForSelector(vars.threeDots,{timeout:300});

                    await threeDots.click();
                    console.log('threedots clicked');

                    await page.waitForTimeout(300);
                    const unsend = await page.waitForXPath(vars.unsend);
                    await unsend.click();
                    await page.waitForTimeout(300);

                    const button = await page.waitForXPath('//button[text()=\'Unsend\']');
                    await button.click();
                    await page.waitForTimeout(500);
                    console.log('yes');


                    await new Promise((resolve) => setTimeout(resolve, 500));
                } catch (error) {
                    if (vars.errors.indexOf(error.message) !== -1) {
                        console.log('The element is no longer in the document.');
                    } else if (error instanceof TimeoutError) {
                        console.log('The operation timed out.');
                        await text.evaluate(el => el.remove());


                    }
                }
            }

            const images = await page.$$(vars.imagesSent);
            for (let image of images) {
                try {
                    await image.hover();
                    await image.hover();
                    await image.hover();
                    await image.hover();
                    await image.hover();

                    console.log('hovered');
                    const threeDots = await page.waitForSelector(vars.threeDots,{timeout:300});
                    await threeDots.click();
                    await page.waitForTimeout(300);
                    console.log('threedots clicked');
                    const unsend = await page.waitForXPath(vars.unsend);
                    await unsend.click();
                    await page.waitForTimeout(300);
                    const button = await page.waitForXPath('//button[text()=\'Unsend\']');
                    await button.click();
                    await page.waitForTimeout(500);
                    console.log('yes');
                    await new Promise((resolve) => setTimeout(resolve, 500));
                } catch (error) {
                    if (vars.errors.indexOf(error.message) !== -1) {
                        console.log('The element is no longer in the document.');
                    } else if (error instanceof TimeoutError) {
                        console.log('The operation timed out.');
                        await image.evaluate(el => el.remove());

                    }
                }
            }
            i += 500;
        }
    }

dlt();