# Sitemap Generator

Creates a `sitemap.xml` file for any given `URL`.

## Instructions

Open `index.js`. Add the `URL` of the site you wish to crawl:

`const baseURL = "https://example.com";`

In the terminal run this command:

`node index.js`

## Output

A file `sitemap.xml` will be created in this format:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://example.com</loc></url>
  <url><loc>https://example.com/products</loc></url>
  <url><loc>https://example.com/products/1</loc></url>
  <url><loc>https://example.comp/products/2</loc></url>
</urlset>

```
