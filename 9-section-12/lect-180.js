// 180. Extending Our Base Template with Blocks

1.// define route for overview
app.get('/overview',(req,res)=>{
//------------------------file-name
  res.status(200).render('overviewTemp',{
    tittle:'All tours overview'
  })
})


2.//base.pug(parent)
 // <block content> --> // yaha pe child template ka content ayga  
 //  <h1 this is placeholder heading>

3.// second humne overiewTemp.pug(child template) file create kiya uske andar
//<extends base>
// ye 'extends' hai, jo bhi base.pug file ka content hai wo sab overview.pug file mein include kar lega jaise ki header, footer, meta tags,links tag everything

// block content -->(overiewTemp.pug(child temp) file ke andar jo bhi likhunga wo jakar base.pug(parent temp) file mein inject hoo jayga)
// <block content>
//  <h1 this is tour overview>

