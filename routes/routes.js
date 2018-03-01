var appRouter = function (app) {
    app.get("/", function(req, res) {
		res.status(200).send("Welcome to our restful API");
    });

    app.get("/report/:realm/:server/:char", function(req, res) {
		if (!req.params.server | !req.params.realm | !req.params.char) { 
			res.status(500); 
			res.send({"Error": "Invalid format."}); 
		}
		else{
			request.get({ url: "https://www.warcraftlogs.com:443/v1/rankings/character/" + req.params.char + "/" + req.params.server + "/" + req.params.server + "??metric=dps&api_key="},      function(error, response, body) { 
				if (!error && response.statusCode == 200) { 
					res.json(body); 
				} 
			}); 
		}
    });
}
  
module.exports = appRouter;