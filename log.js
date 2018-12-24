var fs = require("fs");
var globalConfig = require("./config");
var filename = globalConfig.log_path + globalConfig.log_name;
//同步
// fs.writeFileSync(filename,"asd")
function log(data){
    console.log(data)
    fs.appendFile(filename,data + "\n",{flag:"a"},function(){})
}
module.exports = log;