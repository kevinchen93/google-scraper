const readline = require('readline');
const reader = readline.createInterface({
  input: process.stdin, 
  output: process.stdout
});
  
const puppeteer = require('puppeteer');

function searchGoogle(callback) {
  reader.question('What would you like to search?\n', (query) => {
    console.log(`\nYour query is ${query}.\n`);

    function goToGoogle(query) {
      try {
        (async () => {
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          await page.goto('https://google.com');
          await page.type('input.gLFyf.gsfi', query);
          page.keyboard.press('Enter');

          await page.waitForSelector('div#resultStats');

          const data = await page.evaluate(() => {
            const links = Array.from(document.querySelectorAll('div.r a'));
            const titles = Array.from(document.querySelectorAll('div.r h3'))
            return {
              title: titles.map(e => e.innerHTML)[0],
              url: links.map(e => e.getAttribute('href'))[0],
            }
          });

          await browser.close();
          callback(data);
        })();
      } catch (err) {
        console.error(err);
      }
    }
    
    goToGoogle(query);
  });
}

searchGoogle(result => { 
  console.log(`The first result's title is "${result.title}" at the url: ${result.url}`);
  reader.close();
});