const puppeteer = require('puppeteer');

async function resizePage(browser, page){
  var height = 1000;
  var width = 1600;
  await page.setViewport({height, width});
  // Window frame - probably OS and WM dependent.
  height += 85;
  // Any tab.
  const {targetInfos: [{targetId}]} = await browser._connection.send(
    'Target.getTargets'
  );
  // Tab window. 
  const {windowId} = await browser._connection.send(
    'Browser.getWindowForTarget',
    {targetId}
  );
  // Resize.
  await browser._connection.send('Browser.setWindowBounds', {
    bounds: {height, width},
    windowId
  })
};

async function run() {
  const browser = await puppeteer.launch({
    headless: false
  });

  const page = await browser.newPage();
  page.on('console', msg => console.log('PAGE LOG: ', msg.text()));
  page.on('pageerror', error => {
    console.log('pageerror: ' + error.message());
   });
  page.on('response', response => {
    console.log('response: ' + response.status() + response.url());
  });
  page.on('requestfailed', request => {
    console.log('requestfailed: ' + request.failure().errorText + request.url());
  });

  await resizePage(browser, page);

  // dom element selectors
  const USERNAME_SELECTOR = '#i0116';
  const PASSWORD_SELECTOR = '#i0118';
  const NEXTBUTTON_SELECTOR = '#idSIButton9';
  
  await page.goto('https://portal.azure.com/#blade/Microsoft_Azure_Policy/PolicyMenuBlade/Overview');
  await page.waitFor(2*1000);

  await page.click(USERNAME_SELECTOR);
  await page.keyboard.type("cemheren@gmail.com");

  await page.waitFor(100);
  
  await page.click(NEXTBUTTON_SELECTOR);
  await page.waitFor(3*1000);

  await page.click(PASSWORD_SELECTOR);
  await page.keyboard.type("");

  await page.click(NEXTBUTTON_SELECTOR);
  await page.waitFor(3*1000);

  await page.click(NEXTBUTTON_SELECTOR);
  await page.waitFor(20*1000);

  // we are at the overview blade
  await page.screenshot({ path: 'screenshots/overview.png' });

  await browser.close();
};
 
run();
