const express = require('express');
var jobList = require('./jobs.json');

const app = express();

app.use(express.urlencoded({extended:true}))
// serve static contents
app.use(express.static('static'));

// RESTful APIs for Inventory

app.get('/jobsInJson', (req,res) => {
  //  res.send(JSON.stringify(productList));
    res.json(jobList);
})

//1.categories mentioned in all the jobs and how many times 
app.get('/totalCategories', (req, res) => {
    let categories = {};

    for (j in jobList){
        for(c of jobList[j].categories){
            if(c in categories){
                categories[c]++;
            }
            else{
                categories[c] = 1;
            }
        }
    }

    res.send(JSON.stringify(categories));
});

//2.All Jobs in a given category sent as a paramater
app.get('/jobInCat/:category', (req,res) => {
    let jobInCat = {};

    for (j in jobList){
        for(c of jobList[j].categories){
            if (req.params.category == c){
                jobInCat[j] = jobList[j];
            }
        }
    }

    res.send(jobInCat);
});

//3.All Jobs in a given city sent in the querystring
app.get('/checkCity', (req,res) => {
   //find the job based on the city
//    jobs = Object.keys(jobList);
//    for (j=0; j<jobs.length; j++)
//    {
//        temp = jobs[j]
//        list =[]
       
//        startCity= jobList[temp].title.lastIndexOf("(")
//        endCity = jobList[temp].title.lastIndexOf(",")
//        if(endCity < startCity){
//            endCity = jobList[temp].title.lastIndexOf(")")
//        }
//        city = jobList[temp].title.substring(startCity + 1, endCity);
//        if(city == req.query.city){
//             list.push(jobList[temp])
//        }
//    }
//    console.log(city)
//    res.send(JSON.stringify(list));
let city = {};

    for (j in jobList){
        if(jobList[j].title.includes(req.query.city)){
            city[j] = jobList[j];
        }
    }

    res.send(JSON.stringify(city));
   
})

//2.All Jobs in a given category sent as a paramater
app.get('/jobInCat/:category', (req,res) => {
    let jobInCat = {};

    for (j in jobList){
        for(c of jobList[j].categories){
            if (req.params.category == c){
                jobInCat[j] = jobList[j];
            }
        }
    }

    res.send(jobInCat);
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
app.listen(3000);