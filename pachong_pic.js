/*
 @ Name：nodejs 妹子图片爬虫
 @ Author：前端老徐
 @ Date：2016/07/18 23:16
 @ E-mail：442413729@qq.com
 @ Weibo:http://weibo.com/qdlaoxu
 @ GitHub:https://github.com/waihaolaoxu
 @ blog:http://www.loveqiao.com/
*/

var http = require('http');
var fs = require("fs");
var path = require('path');
var cheerio = require('cheerio');

//爬虫
var url="http://www.27270.com/ent/meinvtupian/";
http.get(url,function(res){
	var html="";
	res.on('data',function(data){
		html+=data;
	});
	res.on('end',function(){
		console.log('抓取页面成功!');
		//console.log(html);
		
		getImgUrl(html);

	});
}).on('error',function(){
	console.log('程序出错')
});

//获取html中图片路径
function getImgUrl(data){
	var $=cheerio.load(data);
	$('.MeinvTuPianBox img').each(function(i,d){
		console.log(d.attribs.src); //打印图片路径
		var imgsrc=d.attribs.src;
		var filename = parseUrlForFileName(imgsrc);  //生成文件名
		downloadImg(imgsrc,filename,function(){
			console.log(filename + ' done');
		});
	});
}
function parseUrlForFileName(address) {
    var filename = path.basename(address);
    return filename;
}

//下载图片
function downloadImg(uri, filename, callback) {
	http.get(uri, function(res) {
		var writerStream = fs.createWriteStream('images/' + filename);
		res.on('data',function(data){
			writerStream.write(data,'UTF8');
		});
		res.on('end',function(){
			callback();
		});
	}).on('error',function(){
		console.log('创建下载请求出错!')
	});
};