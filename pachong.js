/*
 @ Name：nodejs 文本爬虫
 @ Author：前端老徐
 @ Date：2016/07/18 23:16
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu
 @ blog:http://www.loveqiao.com/
*/

var http = require('http');
var fs = require("fs");
var cheerio = require('cheerio');

//过滤
function filterHtml(html){
	var $=cheerio.load(html);
	var list=$('.key-list .item-mod');
	var html=[];
	list.each(function(){
		html.push({
			title:$(this).find('h3').text(),
			id:$(this).find('.pic').attr('href').split('.html')[0].split('loupan/')[1]
		})
	})
	return html;
}

//打印
function printInfo(data){
	console.log("准备写入文件");
	var html=[]
	data.forEach(function(item){
		//console.log(item.title+'---'+item.id);
		html.push(item.title+'---'+item.id);
	});

	
	fs.writeFile('input.txt',html.join('\n'),  function(err) {
	   if (err) {
	       return console.error(err);
	   }
	   console.log("数据写入成功！");
	   console.log("--------我是分割线-------------")
	   console.log("读取写入的数据！");
	   fs.readFile('input.txt', function (err, data) {
	      if (err) {
	         return console.error(err);
	      }
	      console.log("异步读取文件数据:\n " + data.toString());
	   });
	});
}

//爬虫
var url="http://bj.fang.anjuke.com/?from=navigation";
http.get(url,function(res){
	var html='';
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		//console.log(html)
		var data=filterHtml(html);
		printInfo(data);
	})
}).on('error',function(){
	console.log('程序出错')
})