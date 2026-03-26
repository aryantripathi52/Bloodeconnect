const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
    try {
        const browser = await puppeteer.launch({ headless: "new" });
        const page = await browser.newPage();
        
        page.on('console', msg => console.log('BROWSER CONSOLE:', msg.type(), msg.text()));
        page.on('pageerror', error => console.error('BROWSER ERROR:', error.message));
        
        const fileUrl = 'file:///' + path.resolve('e:/Bloodeconnect/index.html').replace(/\\/g, '/');
        console.log("Navigating to", fileUrl);
        await page.goto(fileUrl, { waitUntil: 'networkidle0' });
        
        console.log("Page loaded. Clicking 'Admin Panel'...");
        // Wait for the panel card and click it
        await page.waitForSelector('.panel-card');
        await page.evaluate(() => {
            document.querySelectorAll('.panel-card')[0].click();
        });
        
        // Check if modal has active class
        const isActive = await page.$eval('#loginModal', el => el.classList.contains('active'));
        console.log("Is Modal Active after click? ", isActive);
        
        await browser.close();
    } catch(e) {
        console.error("Puppeteer Script Error:", e);
    }
})();
