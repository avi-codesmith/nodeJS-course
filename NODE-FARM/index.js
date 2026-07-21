// const fs = require("fs"); -- legacy code
// const path = require("path");

// core modules
import http from 'http';
import fs from 'fs';

// third party modules
import slugify from 'slugify';

// own modules
import replaceTeplate from './modules/replaceTemplate.js';
////////////////////////////////////////////
///////////////////////////////////////////
//////////// FILES
// Synchronous or blocking code-------------------------------------------------------------------------------------------------------------------------

// const textinUTF = fs.readFileSync("node-farm/txt/input.txt", "utf-8");
// const textOut = `This is about avacado  🥑: ${textinUTF}.\nCreated on ${Date.now()}`;

// fs.writeFileSync("node-farm/txt/output.txt", textOut);

// Asynchronous or unblocking code----------------------------------------------------------------------------------------------------------------------

/*
fs.readFile("node-farm/txt/start.txt", "utf-8", (error, data1) => {
  if (error) return console.log("error :o +_-'");
  console.log(data1); // takes time in reading file then log data - 2nd
  fs.readFile(
    `node-farm/txt/${data1.replace(" ", "-")}.txt`,
    "utf-8",
    (error, data2) => {
      console.log(data2); // takes time in reading file then log data (depended on data1)
      fs.readFile(`node-farm/txt/append.txt`, "utf-8", (error, data3) => {
        console.log(data3); // takes time in reading file then log data (depended on data2)
        fs.writeFile(
          "node-farm/txt/final.txt",
          `${data2}\n${data3}`,
          "utf-8",
          (error) => {
            console.log("file has been written!");
          },
        );
      });
    },
  );
});

console.log("I will execute first!"); // first

*/

// A simple asynchnorous behavior :) //

/////////////////////////////////////////////
///////////////////////////////////////////
//////////// SERVER

const tempOverview = fs.readFileSync(
  './templates/templete-overview.html',
  'utf-8',
);

const tempProduct = fs.readFileSync(
  './templates/template-product.html',
  'utf-8',
);

const tempCard = fs.readFileSync('./templates/templete-card.html', 'utf-8');

const data = fs.readFileSync('./dev-data/data.json', 'utf-8');

const dataObject = JSON.parse(data);

const slugs = dataObject.map((el) => slugify(el.productName, { lower: true }));

console.log(slugs);

const server = http.createServer((req, res) => {
  // const { query, pathName: nameOfPath } = url.parse(req.url, true); -- don't use nonstandarized, It is prone to errors!
  // Instead use

  console.log(slugify('Fresh corns', { lower: true, replacement: '-' }));

  const parsedURL = new URL(req.url, 'http://localhost');
  const pathName = parsedURL.pathname;

  // overview page
  if (pathName === '/overview' || pathName === '/') {
    res.writeHead(200, {
      'Content-type': 'text/html',
    });

    const cardsHTML = dataObject.map((productData) =>
      replaceTeplate(tempCard, productData),
    );

    const output = tempOverview.replace('{%PRODUCTCARDS%}', cardsHTML);

    res.end(output);
  }

  // product page
  else if (pathName === '/product') {
    let id = parsedURL.searchParams.get('id');
    if (id === null) {
      id = 0;
    }
    const product = dataObject[id];
    const productHTML = replaceTeplate(tempProduct, product);
    res.writeHead(200, {
      'Content-type': 'text/html',
    });
    res.end(productHTML);
  }
  // API
  else if (pathName === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
      'Custom-header': 'data-fetched!',
    });
    res.end(data);
  }
  // NOT FOUND
  else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'Custom-header': 'hello wonder world',
    });
    res.end(`<h1><font color="red">4O4 error!</font></h1>`);
  }
}); // making a server where we response to browser (now doing routing here)

server.listen(8000, 'localhost', () => {
  console.log('listening to all request on 8000 port');
}); // declaring the server port
