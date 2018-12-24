var fs = require("fs");

var path = new Map();
function testFileUpload(request,response){
    request.on("data",function(data){
        var fis = fs.createWriteStream("./file/刘继东.docx");
        console.log(data.toString())
        fis.write(data);
        fis.end();
        response.end();
    })
}
path.set("/testFileUpload",testFileUpload);
module.exports.path = path;