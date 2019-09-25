var server = require('./MRI/app');
var port = process.env.PORT || 3000;

server.listen(port, function(){
    console.log('Server running on port %d', port);
});