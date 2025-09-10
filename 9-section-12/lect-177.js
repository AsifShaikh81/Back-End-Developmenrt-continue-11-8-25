// 177. First Steps with Pug

1./* how we can actually pass data into a template and then how we can use that data
right here in Pug. */
app.get('/', (req, res) => {
  res.status(200).render('base',{
    tour:'the forest hiker',
    user:'Asif'
  });
});
// inside pug file
h1= tour //the forest hiker
h2= user //Asif

2. //two types of comments in pug
// double slash  ->> //h1 the park camper, inspect karo ye output mein dikhe ga
// - single dash  -->> //-h1 the park camper, inspect karo ye output mein nahi dhike ga

3.//u can also write js in pug  file
h2= user.toUpperCase()

4.// unbuffered code in pug
/* unbuffered code is code
that is not going to add anything to the output */
//ex: - const a = 9 , just add single dash before code

5.// template string in pug 
//template string in pug #{example}
//ex: title Tours | #{tour}

//template string in js ${example}
//${tours}

6.// u can also write normal html in pug 
//<link rel='stylesheet' href='/css/style.css'>