var url = require("url");
var globalConfig = require("../config");

function loginFilter(request,response){
    var pathName = url.parse(request.url).pathname;
    if (pathName == "/login.html" || pathName == "/login" || isStaticsRequest(pathName)){
        console.log("放行")
        return true;
    }
    if (request.headers.cookie){
        var cookie = request.headers.cookie.split(";");
        for (var i = 0; i < cookie.length; i++){
            if (cookie[i].split("=")[0].trim() == "id"){
                return true;
            }
        }
    }
    console.log("拦截")
    response.writeHead(302,{"location":"/login.html"});
    response.end();
    return false;
}

function isStaticsRequest(pathName){
    for (var i =0; i < globalConfig.static_file_type.length; i++){
        var temp = globalConfig.static_file_type[i];
        if (temp == ".html"){
            continue;
        }
        if (pathName.indexOf(temp) == pathName.length - temp.length){
            return true
        }
    }
    return false;
}
module.exports = loginFilter;