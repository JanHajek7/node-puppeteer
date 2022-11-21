import puppeteer from "puppeteer";

(async () => {
  const browser = await puppeteer.launch({ headless: false }); // default is true

  const delay = (milliseconds) =>
    new Promise((r) => setTimeout(r, milliseconds));

  let index = 1;
  for (const item of MockData) {
    const page = await browser.newPage();
    await page.goto("http://localhost:4200/");

    await page.type("input[name=name]", item.name);
    await delay(1500);

    await page.type("input[name=email]", item.email);
    await delay(1500);

    await page.type("input[name=confirm]", item.confirm);
    await delay(1500);

    await page.evaluate(() => {
      const button = document.querySelectorAll("button[type='submit']")[0];
      button.click();
    });
    await delay(1500);

    await page.screenshot({ path: `tmp/screenshots/form_${index}.png` });
    // await page.screenshot({ path: `tmp/pdfs/form_${index}.pdf` });

    index++;
  }

  await browser.close();

})();

export const MockData = [
  {
    name: "Jennifer Bullock",
    email: "varius.ultrices@icloud.com",
    confirm: "",
  },
  {
    name: "Liberty Ortega",
    email: "porttitdor.interdum.sed@icloud.net",
    confirm: "porttitdor.interdum.sed@icloud.net",
  },
  {
    name: "Boris Levy",
    email: "eu.elit@icloud.org",
    confirm: "eu.elit@icloud.org",
  },
];
