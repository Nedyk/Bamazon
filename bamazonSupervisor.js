
var mysql = require("mysql");
var inquirer = require('inquirer')
var table = require('table-layout')
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


   var query = "SELECT * FROM departments";
      connection.query(query, function(err, res){
      	for(var i = 0; i<res.length; i++){
      		 var jsonData = [{
				over_head_costs: res[i].over_head_costs,
				department_name: res[i].department_name,
				department_id: res[i].department_id
//   col2: 'And some more text in column two. '
 }]

 var showTable = new table(jsonData, { maxWidth: 30 })
      		//console.log(res[i].over_head_costs); 
      	}


      	//console.log(res);
      	supervisorAction();
      	
      });

      function supervisorAction(){
      	 	inquirer.prompt([
  		{
  			name: "supervisor",
  			type: "rawlist",
  			message: "What will you like to do?",
  			choices: [
		  			"view product sales by department", 
		  			"create new department",		  	

  		]
//INNER JOIN departments 
  							// ON department_name = department_name
  	}
  		]).then(function(answers){
  			if(answers.supervisor === "view product sales by department" ) {
  				
  							var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, Products.product_sales ";      
  								query += "FROM departments INNER JOIN Products ON departments.department_name = Products.department_name ";  
  								query += "ORDER BY departments.department_id"    
  								//query += "= top5000.year) WHERE (departments.artist = ? AND top5000.artist = ?) ORDER BY departments.year ";
  				connection.query(query, function(err, res){
  					for(var i =0; i<res.length; i++){
  						console.log(res[i].departments.over_head_costs);
  					}
  					
  				})
  			}



  		})
      }

      //department_id, department_name, over_head_costs, product_sales 