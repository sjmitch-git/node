const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

const baseURL = "https://example.com"; // add your URL
const sitemapFilename = "sitemap.xml"; // saved file name

async function fetchHTML(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}: ${error}`);
    return null;
  }
}

function extractLinks(html) {
  const $ = cheerio.load(html);
  const links = [];
  $("a").each((index, element) => {
    const href = $(element).attr("href");
    if (href && !href.startsWith("https://")) {
      // ignores external links
      links.push(baseURL + href);
    }
  });
  return links;
}

async function crawl(url, visitedLinks = new Set()) {
  if (visitedLinks.has(url)) {
    return;
  }
  console.log(`Crawling ${url}`);
  visitedLinks.add(url);
  const html = await fetchHTML(url);
  if (!html) {
    return;
  }
  const links = extractLinks(html);
  for (const link of links) {
    await crawl(link, visitedLinks);
  }
}

async function generateSitemap() {
  const visitedLinks = new Set();
  await crawl(baseURL, visitedLinks);
  const sitemapContent =
    '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    Array.from(visitedLinks)
      .map((link) => `  <url><loc>${link}</loc></url>`)
      .join("\n") +
    "\n</urlset>";
  fs.writeFileSync(sitemapFilename, sitemapContent);
  console.log(`Sitemap generated successfully: ${sitemapFilename}`);
}

generateSitemap();
