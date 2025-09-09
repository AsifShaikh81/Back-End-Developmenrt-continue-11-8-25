166. Importing Review and User Data

in this we imported user ,review ,tour data through our script "importData.js"

await user.create(userreadFile,{validateBeforeSave:false});
validateBeforeSave:false:jo bhi validation lagaya hai user model wo skip hojayga , why we doing this , kyu validation error aa raha tha 'password' ke liye