/**
 * Crea§`ted by latheshkarkera on 3/4/17.
 */
var http = require('http');
var mime = require('mime');
var fs = require('fs');
var path = require('path');


var server = http.createServer(function (request,response) {
   var filePath = false;
   if(request.url == '/'){
      filePath = "index.html";
   }else{
      filePath = request.url;
   }
   var absPath = "./"+filePath;
   serverWorking(response,absPath);
});

server.listen(process.env.PORT || 3000);


function send404(res) {
    res.writeHead(404,{"Content-type":"text/plain"});
    res.write("Error 404:resource not found");
    res.end();
}

function sendPage(res,filepath,fileContents) {
    res.writeHead(200,{"Content-type":mime.lookup(path.basename(filepath))});
    res.end(fileContents);
}

function serverWorking(response,absPath){
   fs.exists(absPath,function (exists) {
       if(exists){
          fs.readFile(absPath,function (err,data) {
            if(err){
               send404(response);
            }else{
               sendPage(response,absPath,data);
            }
          });
       }else{
          send404(response);
       }
   });
}



