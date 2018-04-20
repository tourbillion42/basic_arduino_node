var express = require('express');
var http = require('http');
var app = express();
var path = require('path');
var server = http.createServer(app);
server.listen(9000);

// 시리얼 포트 설정
// COM3 : 아두이노가 연결된 포트
var serialPort  = require('serialport');
var com6 = new serialPort('COM3',{
    baudRate : 9600,
    // defaults for Arduino serial communication
    dataBits : 8,
    parity : 'none',
    stopBits: 1,
    flowControl: false
})
// start
com6.on('open', function () {
    console.log('open serial communication');
})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));

app.get('/',function(req,res) {
    res.status(200).render('controller.ejs');
})

app.get('/controller/:id',function(req,res){
    console.log(req.params.id);
    com6.write(req.params.id) ;
    res.status(200).send('LED Controll OK!!');
})
