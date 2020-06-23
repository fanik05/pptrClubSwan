const puppeteer = require('puppeteer');
const randomize = require('randomatic');

(async () => {
  const browser = await puppeteer.launch({headless: false, defaultViewport: null, args: ['--start-maximized']});
  const page = await browser.newPage();

  await page.goto('https://member.dev.clubswan.com/signup');

  let firstName = randomize('A', 5);
  let lastName = randomize('A', 6);
  console.log(firstName + ' ' + lastName);

  await page.type('[name="firstName"]', firstName);
  await page.type('[name="lastName"]', lastName);
  await page.type('[name="dob"]', '01012000');
  await page.select('[placeholder="Select"]', 'BD');
  await page.type('[name="address1"]', 'Ramna');
  await page.type('[name="city"]', 'Dhaka');
  await page.type('[name="postCode"]', '1217');
  await page.type('[name= "emailAddress"]', randomize('a', 3) + '@' + randomize('a', 3) + '.com');
  await page.type('[name="phoneNumber"]', '01' + randomize('0', 9));
  
  let password = randomize('*', 30);

  await page.type('[name="password"]', password);
  await page.type('[name="confirmPassword"]', password);
  await page.click('#root > div > div > div > div.Card.Form > form > div.CardContent > div > div.one.column.row > div > div:nth-child(1) > div.ui.checkbox.Checkbox > label > span');
  await page.click('#root > div > div > div > div.Card.Form > form > div.CardContent > div > div.one.column.row > div > div:nth-child(2) > div.ui.checkbox.Checkbox > label > span');
  await Promise.all([
    page.click('#root > div > div > div > div.Card.Form > form > div.CardFooter > div > button.ui.fluid.primary.button.no-border'),
    page.waitForNavigation({waitUntil: 'networkidle2'}),
  ]);

  await page.screenshot({path: './screenshots/clubSwan.png'});

  await browser.close();
})();