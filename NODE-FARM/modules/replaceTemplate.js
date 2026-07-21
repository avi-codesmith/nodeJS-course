const replaceTeplate = (temp, productData) => {
  let output = temp.replace(/{%PRODUCTNAME%}/g, productData.productName);
  output = output.replace(/{%IMAGE%}/g, productData.image);
  output = output.replace(/{%PLACE%}/g, productData.from);
  output = output.replace(/{%NUTRIENTS%}/g, productData.nutrients);
  output = output.replace(/{%QUANTITY%}/g, productData.quantity);
  output = output.replace(/{%PRICE%}/g, productData.price);
  if (productData.organic === false) {
    output = output.replace(/{%NOT_ORGANIC%}/g, "not-organic");
  }
  output = output.replace(/{%DESC%}/g, productData.description);
  output = output.replace(/{%ID%}/g, productData.id);

  return output;
};

export default replaceTeplate;
