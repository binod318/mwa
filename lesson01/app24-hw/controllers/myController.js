module.exports.getResult = function(req, res){
    
    const numerator = parseInt(req.params.numerator);
    const { denominator } = req.query;
    if(denominator === 0)
        res.send(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.DENOM_ZERO_MESSAGE);

    const result = numerator/denominator;
    res.status(parseInt(process.env.OK_STATUS_CODE)).send(process.env.RESULT_MESSAGE + result);
}

module.exports.defaultResult = function(req, res){
    res.status(parseInt(process.env.FILE_NOT_FOUND_STATUS_CODE)).send(process.env.DEFAULT_MESSAGE);
}