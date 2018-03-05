var request = require('request')
var appRouter = function (app) {
    app.get("/", function(req, res) {
		res.status(200).send("Welcome to our restful API");
    });

    app.get("/report/:char/:server/:realm", function(req, res) {
		if (!req.params.server | !req.params.realm | !req.params.char) { 
			res.status(500); 
			res.send({"Error": "Invalid format."}); 
		}
		else{
			request.get({ url: "https://www.warcraftlogs.com:443/v1/parses/character/" + req.params.char + "/" + req.params.server + "/" + req.params.realm + "&api_key=" + process.env.WCLOGS_API},      function(error, response, body) { 
				if (!error && response.statusCode == 200) { 
					res.send(body); 
				}
				else {
					res.send(body);
				} 
			});
		}
	});
		
	app.get("/report/:guild/:server/:realm", function(req, res) {
		if (!req.params.server | !req.params.realm | !req.params.guild) { 
			res.status(500); 
			res.send({"Error": "Invalid format."}); 
		}
		else{
			request.get({ url: "https://www.warcraftlogs.com:443/v1/reports/guild/" + req.params.guild + "/" + req.params.server + "/" + req.params.realm + "?metric=dps&api_key=" + process.env.WCLOGS_API},      function(error, response, body) { 
				if (!error && response.statusCode == 200) { 
					res.send(body); 
				} 
			});
		}
	});
}
  
module.exports = appRouter;