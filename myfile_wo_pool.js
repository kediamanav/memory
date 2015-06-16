var express    = require("express");
var mysql      = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'memory'
});
var app=express();
app.use(express.static('public'));
var bodyParser = require('body-parser');

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded


connection.connect(function(err){
	if(!err){
		console.log("Databse is connected ...\n\n");
	}
	else{
		console.log("Error connecting database ... \n\n");
	}
});

app.get('/', function(req, res) {
	console.log("Inside get function");
	//es.redirect("/home/1");
});

app.post('/getSequence', function(req, res) {
	console.log("Inside getSequence post function");
	res.send(JSON.stringify({id:3}));
});

app.post('/response',function(req,res){
	console.log("Inside post function");
	//console.log(req.body.id);
	//console.log(req.body.options[3]);
	//console.log(req.body.number[3]);
	var i;
	var correct=0;
	var marked=0;
	var columns = [];
	var options = [];
	for(i=0;i<20;i++){
		if(req.body.options[i]==2){
			if(req.body.number[i]>100){
				marked++;
				options[i]=1;
			}
			else
				options[i]=0;
		}
		else if(req.body.options[i]==1){
			marked++;
			options[i]=1;
			if(req.body.number[i]<=100)
				correct++;
		}
		else{
			options[i]=0;
		}
		columns[i] = "video_"+req.body.number[i];
	}
	console.log("Correct "+ correct);
	console.log("Marked " + marked);

	var precision = (correct*100)/marked;
	console.log("Precision :" +precision);
	
	if(precision>=60)
		res.send(JSON.stringify({result:"Passed"}));
	else
		res.send(JSON.stringify({result:"Failed"}));
	//console.log("After sending response");

	var colNames = "(survey_no";
	for(i=0;i<20;i++){
		colNames=colNames+","+columns[i];
	}
	colNames+=")"
	
	var colValues = "("+req.body.id;
	for(i=0;i<20;i++){
		colValues=colValues+","+options[i];
	}
	colValues+=")"
	var query = "INSERT INTO survey "+colNames+" values "+colValues+";";
	//console.log(query);
	//sql query
	connection.query(query, function(err, rows, fields) {
	  if (!err)
	  	console.log("Successfully added to database");
	    //console.log('The solution is: ', rows);
	  else
	    console.log('Error while performing Query.' + err);
	});

});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});

//connection.end();