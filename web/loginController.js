var studentService = require("../service/studentService");
var url = require("url");

var path = new Map();

function getData(request,response){
    studentService.queryAllStudent(function(result){
        var resArr = [];
        for (var i = 0; i < result.length; i++){
            resArr.push(result[i].name + ":" + result[i].age);
        }
        response.write(resArr.toString());
        response.end();
    })
}
path.set("/getData",getData);

function login(request,response){
    // var params = url.parse(request.url,true).query;
    request.on("data",function(data){
        var strNum = data.toString().split("&")[0].split("=")[1];
        var password = data.toString().split("&")[1].split("=")[1];
        studentService.queryStudentByStuNum(strNum,function(result){
            var res = "";
            console.log(result.pwd);
            console.log(password);
            if (result == null || result.length == 0){
                res = "Fail";
            }else{
                if (result[0].pwd == password){
                    res = "OK";
                    response.writeHead(200,{"Set-Cookie":"id=" + result[0].id})
                }else{
                    res = "Fail";
                }
            }
            response.write(res);
            response.end();
        });
    })
}
path.set("/login",login);

module.exports.path = path;