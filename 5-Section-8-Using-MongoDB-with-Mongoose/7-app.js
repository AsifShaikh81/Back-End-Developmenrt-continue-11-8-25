// topic :95. Making the API Better: Filtering
// topic :96. Making the API Better: Advance Filtering
// in this topic we learn how to allow user to query in url, like <url>?duration=5&difficulty=easy

const Tour = require('../4-Section-6-natours/models/tourModel');

//? what is req.query?
//req.query is an object that contains the values of the query parameters sent in the URL after the ? symbol.

// same as we did in mongo db, this is normal method for quering
//Syntax:<modekName>.find(fillter)
//Ex :
Tour.find({
 //queries
 duration: 5,
 difficulty: 'easy',
 //queries
});

// another method for quering ,it is moongoose method
Tour.find().where('duration').equals(5).where('difficulty').equals('easy');

//the simplest way
Tour.find(req.query) //yeh code aur uppar wala code dono ka mltb same hai, this is the simplest way   

// !note for better understanding u can check tourControllers-DB.js file

//*now here we want to exclude/delete some of the query/fields from req.query

const quryobj = {...req.query} // storing query object
const excludedFields = ['page', 'sort', 'limit', 'fields'] // a query/fields we want to delete/exclude
excludedFields. forEach (el => delete queryObj[el]) // looping in 'excludedFields' and deleting field from 'req.query'

//📒note whenever u executing query dont use 'await, why? check bwlow'
//❌const tours = await Tour.find(quryobj)  here we cannot use await bcz query will execute and return the document that match the query. if we do it like this we cannot use sort,pagination features, so below is the corrected code
//✅
// const query= Tour.find(quryobj) 
// const tours  = await query

//*Topic 96---------------
// here we will learn advance filtering 
// what is advance filtering?
// if user query '<url>?duration[gte]=5&price[lt]=1500' like this in this it should return document that matches user query, so below we writing code for that ,advance filtering!
let querystr = JSON.stringify(queryObj); // convert 'req.query' a js obj to string
     
querystr= querystr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)//replacing 'gte,gt,lte,lt' with $gte,$gt,$lte,$lte
console.log(JSON.parse(querystr));

const query = Tour.find(JSON.parse(querystr)) // convert 'req.query' a js object to string

const tours = await query

// note: there is a bug in advance filltering

