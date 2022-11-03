const schoolData = require("../data/school.json");

module.exports.getAll = function(req, res){
    const list = schoolData.reduce((accum, elem) => accum + `<li>${elem.name}-${elem.gpa}</li>`, '');
    res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul>${list}</ul>`);
}

module.exports.getOne = function(req, res){
    const id = parseInt(req.params.studentId);
    if(id < 1 || id > schoolData.length)
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.FILE_NOT_FOUND_MESSAGE);
    else {
        const student = schoolData[id - 1];
        res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul><li>${student.name}-${student.gpa}</li></ul>`)
    }
}