const express = require('express');
let jobList = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))
// serve static contents
app.use(express.static('static'));

// dynamic handling

app.get('/jobs', (request, response) => {
    let content ='';
    for (p of jobList)
    {
        content += '<div>';
        content += p.desc + ":" + p.price 
        content += ` <a href='/prod-img?path=${p.imgPath}&desc=${p.desc}'> See Image</a>`
        content += '</div>'
        content += '\n';
    }

    response.send(content);
})

// RESTful APIs for Inventory

app.get('/productsInJson', (req,res) => {
  //  res.send(JSON.stringify(productList));
    res.json(jobList);
})

app.get('/checkAvailability', (req,res) => {
   //find the product based on the desc
   let prodAvailable = false;
   for (let p of jobList)
   {
       if (p.desc == req.query.desc && p.qty > 0)
       {
            prodAvailable = true;
            break;
       }
   }
   
   res.send(JSON.stringify({available:prodAvailable}));
})

app.get('/:desc', (req,res) => {
   let index = jobList.findIndex((p) => p.desc == req.params.desc )

   if (index != -1)
        res.json(jobList[index]);
    else
        res.json({});
});

app.get('/reduceProduct/:desc' , (req,res) => {
    let index = jobList.findIndex((p) => p.desc == req.params.desc )
    let confirm = false;
    if (index != -1)
        {
            jobList[index].qty --;
            confirm = true;
            console.log(jobList[index].qty);
        }
    
     res.json({successful : confirm});
});



/*
app.get('/checkAvailability', (req,res) => {
    
    let prodAvailable=false;
    for (let p of productList)
    {
        if (p.desc ==  req.query.desc)
        {
            if (p.qty > 0)
            {
                prodAvailable = true;
            }
            break;
        }
    }
    res.send(JSON.stringify({available:prodAvailable}));
})

app.get('/:desc', (req,res) => {
    let index = productList.findIndex((p) => p.desc ==  req.params.desc)

    if (index != -1)
        res.json(productList[index]);
    else
        res.json({})
    
});

app.get('/reduceProduct/:desc', (req,res) => {
    let index = productList.findIndex((p) => p.desc ==  req.params.desc)

    let foundProduct;
    let confirmation = false;
    if (index != -1)
       {
         foundProduct = productList[index];
         foundProduct.qty --;
         confirmation = true;
       }
    console.log(foundProduct.qty)
    res.json({successful: confirmation })
})
*/
/*
app.get('/checkAvailability', (req,res) => {

    let foundProduct;
    for (let p of productList)
    {
        if (p.desc == req.query.desc )
        {
            foundProduct = p;
            break;
        }
    }

    let available = false;
    if (foundProduct)
    {
        available = (foundProduct.qty > 0) ;
    }

    res.send(JSON.stringify({"available": available}))    
})


app.get('/:desc', (req,res) => {

  let index =  productList.findIndex( (p) =>  p.desc == req.params.desc);
  let foundProduct;
  if (index != -1)
   foundProduct = productList[index];

   res.json(foundProduct);
})

app.get('/reduceProduct/:desc', (req, res) => {
    let index =  productList.findIndex( (p) =>  p.desc == req.params.desc);
    let foundProduct;
    if (index != -1)
     foundProduct = productList[index];

     if (foundProduct)
     {
        foundProduct.qty --;

        console.log(foundProduct.qty);
     }

    if (foundProduct)
      res.json({successfull: true})
    else 
    res.json({successfull: false})
})
*/
app.listen(2000);