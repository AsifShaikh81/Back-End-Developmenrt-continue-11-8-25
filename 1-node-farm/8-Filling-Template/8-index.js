const fs = require("fs");
const http = require("http");
const url = require("url");

const replaceTemplate = (tmp, prd) => {
  let output = tmp.replace(/{%PRODUCTNAME%}/g, prd.productName);
  output = output.replace(/{%IMAGE%}/g, prd.image);
  output = output.replace(/{%FROM%}/g, prd.from);
  output = output.replace(/{%NUT%}/g, prd.nutrients);
  output = output.replace(/{%PRICE%}/g, prd.price);
  output = output.replace(/{%QUANTITY%}/g, prd.quantity);
  output = output.replace(/{%DESCRIPTION%}/g, prd.description);
  output = output.replace(/{%ID%}/g, prd.id);

  if (!prd.organic) output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  return output;
};

// reading file
const TempOverview = fs.readFileSync(`${__dirname}/overview.html`, "utf-8");
const TempCard = fs.readFileSync(`${__dirname}/card-template.html`, "utf-8");
const TempProduct = fs.readFileSync(`${__dirname}/product.html`, "utf-8");
const data = fs.readFileSync(`${__dirname}/data.json`);

const dataObj = JSON.parse(data); //convert json string to js object

const server = http.createServer((req, res) => {
  console.log(req.url);
  const { pathname, query } = url.parse(req.url, true); //parsing varibale from urls L-16
  console.log(pathname);
  console.log(query);

  if (pathname === "/" || pathname === "/overview") {
    res.writeHead(200, { "content-type": "text/html" });

    const cardHtml = dataObj
      .map((el) => replaceTemplate(TempCard, el))
      .join(""); // joining array ' dataObj.map(el => replaceTemplate(TempCard,el))' with string
    const Output = TempOverview.replace(/ {%PRODUCT_CARDS%}/g, cardHtml);
    //  console.log(cardHtml);

    res.end(Output);
  } else if (pathname === "/product") {
    res.writeHead(200, { "content-type": "text/html" });
    const product = dataObj[query.id];
    const result = replaceTemplate(TempProduct, product);
    res.end(result);
  } else if (pathname === "/api") {
    res.writeHead(200, { "content-type": "application/json" });
    res.end(data);
  }
});

server.listen(5000, "127.0.0.1", () => {
  console.log("listening to request on port 5000");
});

            