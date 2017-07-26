/*
  http://webdriver.io/
  https://developers.google.com/web/updates/2017/04/headless-chrome
*/
const webdriverio = require('webdriverio');
const chromedriver = require('chromedriver');

// This should be the path to your Canary installation.
// I'm assuming Mac for the example.
const PATH_TO_CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9515;


chromedriver.start([
  '--url-base=wd/hub',
  `--port=${PORT}`,
  '--verbose'
]);


(async function() {
  
  const opts = {
    port: PORT,
    desiredCapabilities: {
      browserName: 'chrome',
      chromeOptions: {
        binary: PATH_TO_CHROME, // Screenshots require Chrome 60. Force Canary.
        args: [
          '--headless',
          '--disable-gpu',
          '--window-size=1280,1800'
        ]
      }
    }
  };
  
  const browser = webdriverio.remote(opts).init();


  await browser.url('https://www.google.com/');


  const title = await browser.getTitle();
  console.log(`Title: ${title}`);


  await browser.setValue('#lst-ib', 'headless chrome');
  await browser.submitForm('#tsf');


  const buffer = await browser.saveScreenshot('build/screenshot.png');
  console.log('Saved screenshot...');


  await browser.end();
  chromedriver.stop();
  
  console.log('end');
  
})();