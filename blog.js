var express = require('express');

var app = express();
var hbs = require('hbs');
var fs = require('fs');
var md = require('markdown').markdown;

// set up handlebars view engine
var handlebars = require('express3-handlebars')
	.create({ defaultLayout:'main' });
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

//设置局部页模板
hbs.registerPartials(__dirname + '/views/partials');

app.set('port', process.env.PORT || 3000);

app.use(express.static(__dirname + '/public'));

// 请求静态json归档列表内容，为文章的基本信息
var dataJson = JSON.parse(fs.readFileSync('/Users/CoolYuan/blog/content/list.json', 'utf8'));

app.get('/home', function(req, res) {
	res.render('home', dataJson);
});

var urlJson,articleMd,fileContent;
// 请求静态json为.md文件名的数组
urlJson = JSON.parse(fs.readFileSync('/Users/CoolYuan/blog/content/url.json', 'utf8'));
for(var index in urlJson){
	var url = '/' + urlJson[index];
	//路径
	var path = '/Users/CoolYuan/blog/content/' + urlJson[index] + '.md';
	//读入markdown源文件
  articleMd = fs.readFileSync(path, 'utf8');
	//使用MarkdownJS模板把源文件转换为HTML源代码parse(str).toString();
	 fileContent = md.toHTML(articleMd.toString());
	//文章页请求
	getArticle(url, fileContent);
}

function getArticle(url, fileContent){
	app.get(url, function(req, res){
		res.render('articles', {content:fileContent});
	});
}

//封面页
app.get('/', function(req, res){
	res.render('cover');
});

//请求url列表通过jquery实现上一页，下一页
var urlData = fs.readFileSync('/Users/CoolYuan/blog/content/url.json', 'utf8');
app.get('/urllist', function(req, res){
	res.send(urlData);
});

// 404 catch-all handler (middleware)
app.use(function(req, res, next){
	res.status(404);
	res.render('404',{layout:false});
});

// 500 error handler (middleware)
app.use(function(err, req, res, next){
	console.error(err.stack);
	res.status(500);
	res.render('500',{layout:false});
});

app.listen(app.get('port'), function(){
  console.log( 'Express started on http://localhost:' +
    app.get('port') + '; press Ctrl-C to terminate.' );
});
