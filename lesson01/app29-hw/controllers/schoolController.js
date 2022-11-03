const schoolData = require("../data/school.json");

module.exports.getAll = function(req, res){
    console.log("Get All called",req.query);
    const list = schoolData.reduce((accum, elem) => accum + `<li>${elem.name}-${elem.gpa}</li>`, '');
    res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul>${list}</ul>`);
}

module.exports.addStudent = function(req, res){
    const { name, gpa } = req.body;
    console.log("Data received",name,gpa);
    res.status(parseInt(process.env.OK_STATUS_CODE)).send(`Data received name: ${name}, gpa: ${gpa}`);
}

module.exports.getOne = function(req, res){
    console.log("get one");
    const id = parseInt(req.params.studentId);
    if(id < 1 || id > schoolData.length)
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.FILE_NOT_FOUND_MESSAGE);
    else {
        const student = schoolData[id - 1];
        res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul><li>${student.name}-${student.gpa}</li></ul>`)
    }
}

module.exports.getOneUsingQS = function(req, res){
    console.log("Get one using Querystring");
    const id = parseInt(req.query.id);
    if(id < 1 || id > schoolData.length)
        res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.FILE_NOT_FOUND_MESSAGE);
    else {
        const student = schoolData[id - 1];
        res.status(parseInt(process.env.OK_STATUS_CODE)).send(`<ul><li>${student.name}-${student.gpa}</li></ul>`)
    }
}