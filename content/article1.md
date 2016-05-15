express3-handlebars脚手架基本模板
====================
初始的网站的模板
---------------------

先创建一个目录的根目录，npm在__package.json__文件中管理项目的依赖项以及项目的元数据。最简单的办法就是npm init：生成一个__package.json__文件帮助你起步。

安装__express__：

`npm install express --save`

接下来我们创建__app.js__文件，项目的__入口__：

`var express = require('express');`

`var app = express();`

`app.set('port', process.env.PORT || 3000);`

`/ 404 catch-all handler (middleware)`

`app.use(function(req, res, next){`

`res.status(404);`

`res.render('404',{layout:false});`

`});`

`// 500 error handler (middleware)`

`app.use(function(err, req, res, next){`

`console.error(err.stack);`

`res.status(500);`

`res.render('500',{layout:false});`

`});`

`app.listen(app.get('port'), function(){`

  ``console.log( 'Express started on http://localhost:' + ``
	``app.get('port') + '; press Ctrl-C to terminate.' );``

`});`

现在就有了一个非常精简的__express__服务器。启动`node app.js`，然后访问[http://localhost:3000](http://localhost:3000)。你会看到一个404页面，因为没有任何路由，表示你访问的页面不存在。
