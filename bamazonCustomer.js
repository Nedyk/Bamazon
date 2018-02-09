
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
  //if (!err) console.log("connected");
  
});
itemUnique = "" 
numberUnits = ""
   var query = "SELECT item_id, product_name, price, product_sales FROM products";
      connection.query(query, function(err, res){
      	console.log(res);
      	CustomerRequest();
      	
      });
  
function CustomerRequest(){
	

	inquirer.prompt([
{
	type: 'input', 
	message: 'Enter the ID of the item you will like to buy', 
	name: 'id',
	validate: function(value){
		if(isNaN(value)=== false){
			return true
			{
				return false
			}
		}
	}
},

	{
	type: 'input', 
	message: 'How many units would you like to buy', 
	name: 'units',
	validate: function(value){
		if(isNaN(value)=== false){
			return true
			{
				return false
			}
		}
	}

}

	
	]).then(function(answers){
		var query = "select stock_quantity, CAST(stock_quantity as CHAR(10))FROM products WHERE ?"
		// var query ="SELECT * FROM Products WHERE ?" 
		// connection.query(query, {item_id: answers.id, stock_quantity: answers.units}, function(err, res) {
		// 	console.log(JSON.Stringigy(res, null, 2));
		// });CAST(stock_quantity, item_id AS INT) 
		 connection.query(query,
			// "SELECT item_id, stock_quantity FROM products",
			{
				//item_id: parseInt(answers.id),
				stock_quantity: parseInt(answers.units)
			}, function(err, res){
				if(err) throw err;
				console.log('The items you requested are available');
				//return "Insufficient quantity";

			
				var query = "select  price, product_name, item_id, CAST(item_id as CHAR(10)) FROM products WHERE ?"
				connection.query(query, {item_id: parseInt(answers.id)}, function(err, res){
					if(err) throw err;
						console.log(res);
						var cost =[]; 
						var product =[]
						for(var i =0; i<res.length; i++){
							cost.push(res[i].price);
							product.push(res[i].product_name);
							
						}
						console.log( "The " + product + " will cost " + cost * parseInt(answers.id));
						
  						var query = "UPDATE Products SET ?  "

  						connection.query(query, [
  						{
  							product_sales: cost * parseInt(answers.units)
  						}, 
  					
  						], function(err, res){
  							if (err) throw err
  								console.log(res);
  						});
				})

			}
			)
		});
	//else{console.log('Please enter id of item you want to buy')}
	}
	// var query = "SELECT stock quantity FROM products where ?"
	//  connection.query(query, {stock_quantity: "10"}), function(err, res){
	//  	console.log(res);
	//  };

//console.log( 'item id is ' + itemUnique + " and  number of units needed is " + numberUnits); 



// function checkitemID(){
// 	var query ="SELECT * FROM Products WHERE ?" 
// 		connection.query(query, {item_id: answers.id}, function(err, res) {
// 			console.log(JSON.Stringigy(res, null, 2);
// 			for (var i = 0; i<res.length; i++){
// 				console.log("Product name is " + res(i).product_name + "|| stock quantity is " + res[i].stock_quantity)
// 			};
// 		});
// }




// The Content-type field has been set as multipart-formdata in Headers.
// Under body form-data option should be remain as default.
// Choose File option instead of text from dropdown at the right side.
// Type File in text box where placeholder is key.