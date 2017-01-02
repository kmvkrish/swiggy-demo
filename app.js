var express = require("express");
var app = express();

app.set("PORT", 3000);
app.use(express.static(__dirname));

app.listen(app.get("PORT"), () => {
	console.log("Server stated on port ", app.get("PORT"));
});