// 67. Improving Read Performance with Indexes

/* So let's now talk a little bit
about read performance in MongoDB,
why something called indexes are so important,
and how we can actually create them ourselves. */


/* what this lect about 
if we query its reading entire document if we have thousand of document so it will read all document this can cause performance issue so to tackle this we will learn indexes

what is index  
without an index Mongo has to look
at each document one by one.
But with an index on the field that we are querying for it will directly get ,
this process becomes much more efficient.
So that is pretty smart, right?

what is use ?
increse read performance */

//inside factory getAll function

 const doc = await features.query.explain();
//  explain()=>details deta hai kitna doc read kiya etc

//  applying indexing, it called single field index
 tourSchema.index({price:1}) // lect 167
//coumpound index
tourSchema.index({price:1, ratingsAverage:-1}) // lect 167
// slug index
tourSchema.index({slug:1}) // lect 167


/* 1=> sorted in asc order
-1=> sorted in des order */

syntax
// <schema-name>.index({<field name jisme tumh indexing laga chahte ho>})


// how do we decide which field to index?
/* we need to carefully study the access patterns

of our application in order to figure out

which fields are queried the most

and then set the indexes for these fields. */


