const puppeteer = require('puppeteer');
const { PuppeteerScreenRecorder } = require('puppeteer-screen-recorder');

(async () => {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.goto('https://www.youtube.com/embed/A_BlNA7bBxo', { timeout: 800000000 });

    await page.addStyleTag({ content: '.ytp-chrome-top, .ytp-chrome-bottom{display: none}' })
    const recorder = new PuppeteerScreenRecorder(page, { fps: 60 });

    const youtubeBtnQuery = '.ytp-large-play-button'

    await page.$eval(youtubeBtnQuery, el => el.click());

    await recorder.start('./simple.mp4');

    await new Promise(res => setTimeout(res, 5000))

    await recorder.stop();

    await browser.close();
})();