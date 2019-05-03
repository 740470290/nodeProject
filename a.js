var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require("fs");

// 创建 application/x-www-form-urlencoded 编码解析
var urlencodedParser = bodyParser.urlencoded({extended: false})

app.use('/public', express.static('public'));

app.get('/data', function (req, res) {
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        res.end(data);
    })
})
app.get('/', function (req, res) {
    res.sendFile(__dirname + "/view/" + "index.html");
})
app.get('/add', function (req, res) {
    res.sendFile(__dirname + "/view/" + "add.html");
})
app.post('/process_post', urlencodedParser, function (req, res) {
    // 输出 JSON 格式
    var response = {
        "name": req.body.name,
        "content": req.body.content,
        "date": (new Date()).toLocaleString()
    };
    fs.readFile(__dirname + "/" + "users.json", 'utf8', function (err, data) {
        data = JSON.parse(data);
        data['message'].unshift(response)
        let Str_ans = JSON.stringify(data);
        fs.writeFile('users.json', Str_ans, 'utf8', (err) => {
            if (err) throw err;
            console.log('done');
        });
    })
    console.log(response);

res.redirect('/index');
})

var server = app.listen(8080, function () {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})
