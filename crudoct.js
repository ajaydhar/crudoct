var http = require('http');
 var urlv = require('url');
 const functions = require('./dbfunctions/crudfunctions.js');
//  functions.createData(queryf, dbo); = postData;
//  functions.readData(queryf, dbo); = getData;
//  functions.updateData(query, dbo); = putData;
//  functions.deleteData(query, dbo); = deleteData;
 var MongoClient = require('mongodb').MongoClient;
 var url = "mongodb://localhost:27017/";
 var dbo;
 var MongoClient = require('mongodb').MongoClient;

 const client = new MongoClient(url, { useUnifiedTopology: true });
 async function ct(){
   console.log("entering ct");
let r = await client.connect(function(err, db){
  if (err) throw err;
  console.log("connected ct");
  // if (r.err) { console.log('error in connecting');
  dbo = db.db("sholay-quotes");  //srba ajay
  console.log("dbed ct");
  });
  console.log("exiting ct");
}
   ct();
 console.log("I Connected correctly to server");

function getData(queryf){
  const gotd = "Will get data of " + queryf.input1;
  console.log(gotd);
  query = { name: queryf.input1 };
   var myStr1 = "ALL";
   var myStr2 = queryf.input1;
  if (myStr1 == myStr2){
    console.log("WILL READ ALL");
    var sort = { name: 1 };
    dbo.collection("quotes").find().sort(sort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);

    });
  } else {
  dbo.collection("quotes").find(query).toArray(function(err, result){if (err) throw err;
  console.log(result);

  });}

  }

async function postData(queryf){
  // MongoClient.connect(url, { useUnifiedTopology: true },   function(err, db) {
   // if (err) throw err;
   // dbo = db.db("srba");
   if ("ALL" == queryf.input3) {
     var myobj = [
       { name: 'viru', quote: 'main khudkushi karoonga'},
       { name: 'jai', quote: 'toss ho jai'},
       { name: 'thakur', quote: 'ye haath naheen'},
       { name: 'kaakaa', quote: 'itnaa sannaataa kyon hai'},
       { name: 'asrani', quote: 'ham jailer saheb hain'},
       { name: 'jaya', quote: 'chaabee bhee chaahie'},
       { name: 'gabbar', quote: 'kitne aadmee the'},
       { name: 'dalip', quote: 'main ram hoon'}
     ];
     dbo.collection("quotes").insertMany(myobj, function(err, res) {
       if (err) throw err;
       console.log("Number of documents inserted: " + res.insertedCount);
     });

   } else {
   var myobj = { name : queryf.input3, quote : queryf.input4 };
   dbo.collection("quotes").insertOne(myobj, function(err, res) {
     if (err) throw err;
     console.log(res.result.n + " document(s) inserted");
   });

   }


  const posted = "Will post " + queryf.input3 + " " + queryf.input4;

   // The database to use
   // const dbName = "sholay-quotes";
  console.log("posted document");
}

function putData(queryf){
  const putd = "Will replace " + queryf.input5 + " by " + queryf.input2 + " " + queryf.input6;
  console.log(putd);
  var myquery = { quote: queryf.input5 };
  var newvalues = { $set: { name: queryf.input2, quote: queryf.input6 } };
  dbo.collection("quotes").updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    console.log("1 document updated");
  });
return;
}
 async function deleteData(queryf){
  const deleted = "Will delete data of " + queryf.input7;
  var myquery = { quote: queryf.input7 };
  if (queryf.input7 == "ALL") {
    dbo.collection("quotes").deleteMany({}, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " document(s) deleted");
    });
  }
  else {
    dbo.collection("quotes").deleteOne(myquery, function(err, obj) {
      if (err) throw err;
      console.log(obj.result.n + " document(s) deleted");
    });
  }

  console.log(deleted);
  return;
}


var postHTML =
'<html><head><title>Post Eg</title></head>' +
'<body>' +
'<form method="get">' +
'Quote 1: <input name="input1"><br>' +
'<input type="submit" value="Get">' +
'</form>' +
'<form method="post">' +
'Name : <input name="input3"><br>' +
'Quote: <input name="input4"><br>' +
'<input type="submit" value="Post">' +
'</form>' +
'<form method="put">' +
'Old quote : <input name="input5"><br>' +
'New Name: <input name="input2"><br>' +
'New quote : <input name="input6"><br>' +
'<input type="submit" value="Put">' +
'</form>' +
'<form method="delete">' +
'Quote to delete: <input name="input7"><br>' +
'<input type="submit" value="Delete">' +
'</form>' +
  '</body></html>';

http.createServer(function (req, res) {
  const { headers, method, url } = req;//ajay

  var body = "";
  req.on('data', function (chunk) {
    body += chunk;
  });
res.writeHead(200, {'content-type': 'text/html'});
const responseBody = { headers, method, url, body };
if (method=="GET")
{
  var query = urlv.parse(req.url,true).query;//ajay
  if (query.input1){
    console.log("Got data");
    functions.readData(query, dbo);
    // getData(query);
  }
  if (query.input5){
    console.log("Put data");
    // putData(query);
    functions.updateData(query, dbo);
  }
  if (query.input7){
    console.log("Deleted data");
 functions.deleteData(query, dbo);
  }
} //end get

req.on('end', function () {

  if (method=="POST"){
   console.log("posting data");
   body=body.split('+').join(' ');
  var params = body.split("&");
// Create the destination object.
  var obj = {};
// iterate the splitted String and assign the key and values into the obj.
    for (var i in params) {
      var keys = params[i].split("=");
      obj[keys[0]] = keys[1];
    }

    console.log("obj.input3 is "); // Object {sendNo
    console.log(obj.input3); // Object {sendNo
    console.log('POSTed: ' + body);
    functions.createData(obj, dbo);
  }
    res.end(postHTML);
  });

}).listen(8090);
// async function closed(){ await client.close();}
// closed();
