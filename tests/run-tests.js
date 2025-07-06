const fs = require('fs');
const cheerio = require('cheerio');
const assert = require('assert');

const pages = [
  'index.html',
  'src/pages/ai.html',
  'src/pages/web.html',
  'src/pages/automation.html',
  'src/pages/marketing.html'
];

pages.forEach(page => {
  const html = fs.readFileSync(page, 'utf-8');
  assert(!/R[0-9]/.test(html), `${page} contains pricing info`);
  const $ = cheerio.load(html);
  const navLinks = $('nav').first().find('a');
  assert(navLinks.length >= 3, `${page} navigation incomplete`);
});

console.log('All tests passed');
