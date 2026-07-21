// import superagent from 'superagent';
// import fs from 'fs';
const fs = require('fs');
const superagent = require('superagent');

// CALLBACK HELL==========================================================================================================================================================

// fs.readFile('./dog.txt', 'utf-8', (err, data) => {
//   console.log(data);

//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((error, res) => {
//       if (error) return console.log(error.message);
//       console.log(res._body.message);
//       fs.writeFile('./dog-image.txt', res._body.message, (error) => {
//         if (error) console.log(error.message || "can't save file");
//         console.log('image saved');
//       });
//     });
// });

// fs.readFile('./dog.txt', 'utf-8', (err, data) => {
//   superagent
//     .get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .then((res) => {
//       console.log(res._body.message);
//       if (!res.ok) throw new Error('Something went wrong');
//       fs.writeFile('./dog-image.txt', res._body.message, (error) => {
//         if (error) console.log(error.message || "can't save file");
//         console.log('image saved');
//       });
//     })
//     .catch((error) => {
//       if (error) return console.log(error.message);
//     });
// });

// BUILDING PROMISES=====================================================================================================================================================

const readFileProm = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, 'utf-8', (error, data) => {
      error && reject("Couldn't find that file");
      resolve(data);
    });
  });
};

const writeFileProm = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (error) => {
      error && reject("Couldn't find that file");
      resolve('success');
    });
  });
};

/*

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////// USING .then(), .catch() method

readFileProm('./dog.txt')
  .then((data) => {
    console.log(data);
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
  })
  .then((res) => {
    const breed = res._body.message;
    console.log(res._body.message);
    if (!res.ok) throw new Error('Something went wrong');
    return writeFileProm('./dog-image.txt', breed);
  })
  .then(() => {
    console.log('Random image is saved to the file');
  })
  .catch((error) => {
    if (error) console.log(error);
  });

*/

///////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
/////////////////// USING ASYNC-AWAIT

////////////////// WITH TRY CATCH

const getDogPic = async () => {
  try {
    const data = await readFileProm('./dog.txt');
    console.log(data);

    ////////////////////////MAKING MULTIPLE PROMISES AT ONCE

    const req1 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const req2 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );
    const req3 = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`,
    );

    const allRes = await Promise.all([req1, req2, req3]);
    const alldata = allRes.map((data) => data._body.message);
    console.log(alldata); // We got data from in a array!!!!!

    await writeFileProm('./dog-image.txt', alldata.join('\n'));
    console.log('Random image is saved to the file');
  } catch (error) {
    console.log(error);
    throw new Error(error);
    // throwing an error play vital role, So that return a reject promise,
    // We can catch it when we call it
    // No more futher execution
  }
  return '3rd one I am here :)';
  // returned value, but async func. also return promise then!?, let us see below;
};

console.log('1- Will get dog pics!'); // execute first
// const x = getDogPic(); // execute but take time so execute at 3rd place
// console.log(x);
// getting Promise { <pending> } why not retruned string value, bcz:
// async functions initially return promises
// and we wanna get the retrun value then we use:

////////////////////////////////////////CALLING ASYNC FUNC. THROUGH .then() method

// getDogPic()
//   .then((returnedData) => {
//     console.log(returnedData);
//     console.log('4th - now actually done!');
//   })
//   .catch(() => {
//     console.log('error in promise occured! Promise rejected!');
//   });
// we can catch the error, So that no more web carshing!

////////////////////////////////////////CALLING ASYNC FUNC. THROUGH IIFE

(async () => {
  try {
    const x = await getDogPic();
    console.log(x);
  } catch (e) {
    console.log('error in promise occured! Promise rejected!');
  }
})(); // IIFE
// It will work as same as .then() calling async function do but ease and compact in nature

console.log('2- Done getting dog pics!');
// execute 2ndly, actually ain't done here the promise may be pending

/* GREAT SUMMARY FOR ASYNC AWAIT
Call getDogPic()
⬇
Returns Promise (Pending)
⬇
Read file
⬇
Call API
⬇
Write file
⬇
return "3rd one I am here :)"
⬇
Promise resolves with the returned value
⬇
.then() receives the value


------------------------FOR ERRORS----------------------------------------------

If error occured in async function
⬇
The promise is still return successfully untill we throw the error
⬇
Leds to further execution! problem!, 
but when we throw an error promise get rejected! yeah!
⬇
We can catch that error when we call the async function
⬇
So, no more web crashing!
No more futher execution!

*/
