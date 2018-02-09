var mysql = require("mysql");
var inquirer = require('inquirer')
var connection = mysql.createConnection(
	{  host: "localhost", 
	 port: 3309,  
// Your username 
 user: "root",  
 // Your password  
 password: "nn@2061090",  
 database: "bamazonDB"
});
connection.connect(function(err) {
 if (!err) console.log("connected");
  
});

   var query = "SELECT item_id, product_name, price FROM products";
      connection.query(query, function(err, res){
      	//console.log(res);
      	managerAction();
      	
      });
  
  function managerAction(){
  	inquirer.prompt([
  		{
  			name: "manager",
  			type: "rawlist",
  			message: "What will you like to do?",
  			choices: [
		  			"view products for sale", 
		  			"view low inventory",
		  			"add to inventory", 
		  			"add new product"
  		

  		]

  	}
  		]).then(function(answer){
  			if(answer.manager !== ""){
  				console.log(answer.manager);
  			}
  			
  			if(answer.manager.toLowerCase() === "view products for sale"){
  				var query = "SELECT * FROM Products"
  				connection.query(query, function(err, res){
  					if (err) throw err
  					console.log(res);

  				})

  			}else if(answer.manager.toLowerCase() === "view low inventory"){
  				var query = "SELECT * FROM Products WHERE stock_quantity <= '5'"
  				connection.query(query, function(err, res){
  					if (err) throw err
  						console.log(res);
  					
  				})

  			}else if(answer.manager.toLowerCase() === "add to inventory"){
  				inquirer.prompt([
  					{
  					name: "itemID",
  					type: "input",
  					message: "What's the itemID of the product to add stock quantity to?"
  				},
  					{
  						name: "units",
  					type: "input",
  					message: "Enter the quantity you will like to add"
  				}
  				]).then(function(answers){
  					
  					var query = "UPDATE Products SET ? = ? +  WHERE ? "

  						connection.query(query, [
  						{
  							stock_quantity: parseInt(answers.units)
  						}, 
  						{
  							item_id: parseInt(answers.itemID)
  						}
  						], function(err, res){
  							if (err) throw err
  								console.log(res);
  						// 	for(var i = 0; i<res.length; i++){
  						// 	console.log(res[i].affectedRows); 
  						// }

  						})
  					
  				})


  			}else{
  				inquirer.prompt([
  					{
  						name: "productname",
  					type: "input",
  					message: "Enter the product name you will like to add"
  				},
  					{
  						name: "departmentname",
  					type: "input",
  					message: "Enter the department name you will like to add"
  				},
  					{
  						name: "price",
  					type: "input",
  					message: "Enter the the price you will like to add"
  				},
  					{
  						name: "units",
  					type: "input",
  					message: "Enter the quantity you will like to add"
  				},
  				{
  						name: "sales",
  					type: "input",
  					message: "Enter department sales"
  				}
  				
  				
  					
  					]).then(function(answers){
  					
  						connection.query(
  							"INSERT INTO Products SET ?",
  						{
  							department_name: answers.departmentname,
  							product_name: answers.productname,
  							stock_quantity: parseInt(answers.units),
  							price: parseInt(answers.price),
  							product_sales: parseInt(answers.sales),

  						},
  							
							function(err, res){
  						if (err) throw err
  							console.log(res);
  						if(!err){

  							var newProduct = ""

  						for(var i = 0; i<res.length; i++){

  							newProduct.push(res[i].affectedRows)
  							
  						}
  						console.log(newProduct);
  						}
  						
  					
  				});
  				
  					
  				})
  				// var query = "SELECT * FROM Products"
  				// connection.query(query, function(err, res){
  				// 	if (err) throw err
  					
  				// })
  			}

  		})
  }