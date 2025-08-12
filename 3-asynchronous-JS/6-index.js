// topic : Waiting for Multiple Promises Simultaneously
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
    // printing multiple promise
    const resPromise1 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const resPromise2 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);
    const resPromise3 = superAgent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([resPromise1, resPromise2, resPromise3]);
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    await writeFilePromise(`${__dirname}/starter/output6.txt`, imgs.join("\n")); //'imgs' var contain array so using join method to join string ,'\n => print each string in new line
    console.log("random dog img file saved😊");
  } catch (err) {
    console.log("Error", err.message);

    throw err.message;
  }

  return "Ready ✅";
};

(async () => {
  try {
    const x = await getDogPic();
  } catch (err) {
    console.log("Error💥:", err);
  }
})();
