const gamesData = require("../data/games.json");

module.exports.getResult = function(req, res){
    const list = gamesData.reduce((accum, elem) => accum + `<li>${elem.title}</li>`, '');
    res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul>${list}</ul>`);
}