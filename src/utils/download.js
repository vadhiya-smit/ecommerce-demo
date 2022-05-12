var fs = require('fs')
const request = require('request');

var download = function(uri, filename, callback){
  request.head(uri, function(err, res, body){
    console.log('content-type:', res.headers['content-type']);
    console.log('content-length:', res.headers['content-length']);
    var imagePath = `google/${Date.now()}${res.req.path.split("/")[res.req.path.split("/").length-1]}`
    //request(uri).pipe(fs.createWriteStream(imagePath)).on('close', callback);
  });
};


module.exports = download
download('https://lh3.googleusercontent.com/a/AATXAJxUPAtKPCCKLiBGQdo0JMJqFpX4fCQyWJJerCR5=s96-c', `google/${Date.now()}google.png`, function(){
    //download('https://www.google.com/images/srpr/logo3w.png', `google/${Date.now()}google.png`, function(){
//download('http://localhost:3000/uploads/avtar.jepg', `google/${Date.now()}google.png`, function(){
  console.log('done');
});