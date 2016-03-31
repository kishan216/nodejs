/**
 * http://usejsdoc.org/
 */

var express=require("express");

var app=express();

var mongodb=require("mongodb");

var mongoClient=mongodb.MongoClient;

var mongoObj;



var server=app.listen(2020);

app.set('view engine', 'jade');

(function(){	
	
	mongoClient.connect('mongodb://localhost:27017/BollyWood', function(err, db) {
	    if (err) {
	        throw err;
	    } 
		else {
	        mongoObj={db:db, coll:db.collection("MovieSongs")};
	    }
		
	}); 
})();


app.get('/',function(req,res){
	res.sendfile('./views/index.html');
});


app.get('/movies',function(req,res){
		  mongoObj.coll.find({},{movie:true,_id:false}).toArray(function(err, result) {
		        if (err) {
		            throw err;
		        }
				else {
					var arr = [];

					for(var x in result){
					  arr.push(result[x].movie);
					}
					
					res.render('index', { layout : 'layout', json: arr });
		        }
		});
});

app.get('/songs',function(req,res){
	var movie=req.query.movie;
	console.log(movie);
	 mongoObj.coll.find({movie:movie},{songs:true,_id:false}).toArray(function(err, result) {
		        if (err) {
		            throw err;
		        }
				else {
		            var arr = [];
				
						for(var x in result){
							for(var i in x){
								arr.push(result[x].songs);
							}
						}
						res.render('songs', { layout : 'layout1', json: arr });
				}
		});
});
