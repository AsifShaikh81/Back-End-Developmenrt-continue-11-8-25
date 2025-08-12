// topic : returning Values from Async Functions
const fs = require("fs");
const superAgent = require("superagent");

//building read file promise
const readFilePromise = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, "utf-8", (err, data) => {
      if (err) return reject("file could not read 😞");
      resolve(data);
    });
  });
};
//building write file promise
const writeFilePromise = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) return reject("file could not write 😞");
      resolve("success");
    });
  });
};

// async/await
const getDogPic = async () => {
  try {
    const data = await readFilePromise(`${__dirname}/starter/dog.txt`);
    console.log(`Breed: ${data}`);

    const result = await superAgent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    console.log(result.body.message);

    await writeFilePromise(
      `${__dirname}/starter/output5.txt`,
      result.body.message
    ); //here not saving data in var bcz its writing file
    console.log("random dog img file saved😊");
  } catch (err) {
    console.log("Error", err.message);

    throw err.message; //if there is any error in this function this 'throw' will mark function as rejected, to see diff comment throw and run code
  }

  return "Ready ✅";
};
/*
 if u want to return something from aysnc function use 'then' bcz 'getDogPic'  itselt is a promise
getDogPic()
  .then((x) => {
    console.log("value returned from async func:", x);
  })
  .catch((err) => {
    console.log("Error💥:", err);
  });
  Note :here again we using 'then' ,if there a large code again we will stuck in chaining so to tackle this issue below is a cleaner version 
*/

// it is call IIFE
//note: usinf IIFE bcz its clean ,u can also declare seprate async function for this 
(async ()=>{
try {
const x = await getDogPic();
} catch(err) {
    console.log("Error💥:", err);
    
}
})();