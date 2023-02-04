const { default: axios } = require('axios');
const express = require('express');
const { USER } = require('./config/database');
const app = express();

app.use(express.json());






const db = require('./models');

const {User} = db.models;







(async () => {
    await db.sequelize.sync();
    // await db.sequelize.drop();



})();


app.post('/api/createContact', async(req, res) => {
  
  try {

    const { data_store, first_name, mobile_number, email, last_name, } = req.body;
    
    console.log(req.body)

    if (data_store === "DATABASE") {
      
      
      const ui = await User.create({
        first_name , last_name , mobile_number , email
      })

      ui.save({ fields: ['first_name', 'last_name', 'mobile_number', 'email'] });

      res.json({
        from: 'DATABASE',
         data : ui
        
      })
      
    }

    else if (data_store === 'CRM')
    {

      
      const data2 = { "contact": { "first_name": first_name.toString(), "last_name": last_name.toString(), "email": email.toString(), "mobile_number": mobile_number.toString() } };

      

	const config = {
        headers: {
          "Authorization": "YOUR TOKEN",
	        "content-type": "application/json"
        },
      };

      
     
      const {data} = await axios.post('https://YOURDOMAIN/api/contacts', data2, config);
      
      
       res.json({
        from: 'CRM',
         data : {data}
        
      })
    }

    
  } catch (error) {

    res.json(error.message);
    
  }



})


app.put('/api/updateContact/:id', async(req, res) => {
  
  try {

    const id = req.params.id;
    console.log(id)

    const { data_store, first_name, mobile_number, email, last_name, } = req.body;
    
    

    if (data_store === "DATABASE") {
      
      
    const result = await User.update(
    req.body,
    { where: { id: id } }
      )

      res.json({
        from: 'DATABASE',
         data : result
        
      })
      
    }

    else if (data_store === 'CRM')
    {

      
      // const data2 = { "contact": { "first_name": first_name.toString(), "last_name": last_name.toString(), "email": email.toString(), "mobile_number": mobile_number.toString() } };

      

	const config = {
        headers: {
          "Authorization": "YOUR TOKEN",
	        "content-type": "application/json"
        },
      };

      
     
      const {data} = await axios.put(`https://YOURDOMAIN/api/contacts/${id}`, req.body, config);
      
      
       res.json({
        from: 'CRM',
         data : data
        
      })
    }

    
  } catch (error) {

    res.json(error.message);
    
  }



})



app.post('/api/deleteContact/:id', async(req, res) => {
  
  try {

    const id = req.params.id;
    console.log(id)

    const {data_store} = req.body

    
    

    if (data_store === "DATABASE") {
      
      
  await User.destroy({ where: { id: id } });


      res.json({
        from: 'DATABASE',
         data : "delete the record"
        
      })
      
    }

    else if (data_store === 'CRM')
    {

      
      // const data2 = { "contact": { "first_name": first_name.toString(), "last_name": last_name.toString(), "email": email.toString(), "mobile_number": mobile_number.toString() } };

      

	const config = {
        headers: {
          "Authorization": "YOUR TOKEN",
	        "content-type": "application/json"
        },
      };

      
     
      await axios.delete(`https://YOURDOMAIN/api/contacts/${id}`, config);
      
      
       res.json({
        from: 'CRM',
         data : "deleted the records from crm"
        
      })
    }

    
  } catch (error) {

    res.json(error.message);
    
  }



})




app.post('/api/getContact/:id', async(req, res) => {
  
  try {

    const id = req.params.id;
    console.log(id)

    const {data_store} = req.body

    
    

    if (data_store === "DATABASE") {
      
      
  const user = await User.findOne({ where : {id : id }});

      if (user)
      {
        res.json({
        from: 'DATABASE',
         data : user
        
      })
      }
      else
      {
        res.json({
        from: 'DATABASE',
         data : "No such user"
        
      })
        
        }

      
      
      
    }

    else if (data_store === 'CRM')
    {

      
      // const data2 = { "contact": { "first_name": first_name.toString(), "last_name": last_name.toString(), "email": email.toString(), "mobile_number": mobile_number.toString() } };

      

	const config = {
        headers: {
          "Authorization": "YOUR TOKEN",
	        "content-type": "application/json"
        },
      };

      
     
       const {data} = await axios.get(`https://YOUR DOMAIN/api/contacts/${id}`, config);
      
      
       res.json({
        from: 'CRM',
         data : data
        
      })
    }

    
  } catch (error) {

    res.json(error.message);
    
  }



})










  
  



















app.listen(5001, () => {
   console.log('Listening on port 5001!!!!!!!!');
 });
