import http from "http";
import fs from "fs";

const homePage = fs.readFileSync("./home-page.html", "utf-8");
const bookTemp = fs.readFileSync("./book.html", "utf-8");
const cards = fs.readFileSync("./cards.html", "utf-8");
const books = fs.readFileSync("./books-data.json", "utf-8");

const booksObj = JSON.parse(books);

const replaceTemp = (temp, data) => {
  let output = temp.replace(/{%BOOKNAME%}/g, data.bookName);
  output = output.replace(/{%BOOKTITLE%}/g, data.bookTitle);
  output = output.replace(/{%BOOKDESC%}/g, data.bookDesc);
  output = output.replace(/{%ID%}/g, data.id);
  return output;
};

const server = http.createServer((req, res) => {
  const parsedURL = new URL(req.url, "http://localhost");
  const pathName = parsedURL.pathname;

  if (pathName === "/" || pathName === "/overview") {
    const cardsHTML = booksObj.map((book) => replaceTemp(cards, book)).join("");

    const output = homePage.replace("{%BOOKCARDS%}", cardsHTML);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(output);
  } else if (pathName === "/book") {
    const id = parsedURL.searchParams.get("id");
    const bookObj = booksObj.find((book) => book.id == id);

    const output = replaceTemp(bookTemp, bookObj);

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(output);
  } else {
    res.writeHead(404, {
      "Content-type": "text/html",
    });
    res.end("<h1>404 error! This page doesn't exist!</h1>");
  }
});

server.listen(8082, "localhost", () => {
  console.log("Listening all request on server 8082");
});
