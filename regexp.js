//m多行,只有在有^或$的情况下有效果
//^正常情况下匹配文本开始,在m下可以匹配行开始符
//$正常情况下匹配文本结束,在m下可以匹配行结束符
var str = 'abc\r\nde';
var reg1 = /^de$/;
var reg2 = /^de$/m;
console.log(reg1.test(str));
console.log(reg2.test(str));
//带g全局属性:
//exec方法: 下一次执行从lastIndex开始
//test方法: 不建议使用g
//match方法: 显示所有匹配结果数组
var str2 = 'abcdefgagc';
var reg3 = /a.c/g;
console.log(reg3.exec(str2));
console.log(reg3.exec(str2));
console.log(str2.match(reg3));
//replace方法
//string.replace(searchVal,replaceVal)
//当searchVal是字符串或没有带g属性的正则表达式,替换的都是第一个匹配结果
//当searchVal是带g属性的正则表达式,就是全局替换
//replaceVal可以是字符串、带捕获组字符串、函数(每次匹配成功执行)
var result1 = 'mother_in_law'.replace('_', '-');
var result2 = 'mother_in_law'.replace(/_/, '-');
var result3 = 'mother_in_law'.replace(/_/g, '-');
var result4 = '(555)666-777'.replace(/\((\d{3})\)/g, '$1-');
var result5 = '(555)666-777'.replace(/\((\d{3})\)/g, function (arg1, arg2) {
	return arg2 + '-';
});
console.log(result1);
console.log(result2);
console.log(result3);
console.log(result4);
console.log(result5);