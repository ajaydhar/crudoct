function getData(queryf, dbo){
  const gotd = "Will get data of " + queryf.input1;
  console.log(gotd);
  query = { name: queryf.input1 };
   var myStr1 = "ALL";
   var myStr2 = queryf.input1;
  if (myStr1 == myStr2){
    console.log("WILL FILL ALL");
    var sort = { name: 1 };
    dbo.collection("quotes").find().sort(sort).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
    });
  } else {
    dbo.collection("quotes").find(query).toArray(function(err, result){if (err) throw err;
    console.log(result);
    });
  }
}

async function postData(queryf, dbo){
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

function putData(queryf, dbo){
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

async function deleteData(queryf, dbo){
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

exports.createData = postData;
exports.readData = getData;
exports.updateData = putData;
exports.deleteData = deleteData;
// Create, read, update and delete
