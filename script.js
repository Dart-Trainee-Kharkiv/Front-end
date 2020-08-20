/*let nameCompany = prompt ('Whats the official name JavaScript?', '')

if (nameCompany=="ECMAScript")
{
	alert('Great!');
}
else
{
	alert("Wrong");
}*/

/*let value = prompt ("Input your number", '');

if (value > 0)
{
	alert("1");
}
else if (value < 0) {
alert ("-1");
}
else {
	alert("0");
}*/

/*let result = (a + b < 4) ? 'Мало': 'Много';*/

/*let message = (login == 'Сотрудник') ? 'Привет' : 
(login == 'Директор') ? 'Здравствуйте' :
 (login == '') ? 'Нет логина' :
  '' ?;*/

/*let age = prompt('Input your age', '');

if ( age < 13 || age > 90)
{
	alert('Your age is not suit');
}
else {
	alert('Your age is acceptable');
}*/

/*let nameAdmin = prompt ('Whos there?', '');

if (nameAdmin == 'Admin')
{
	let parolAdmin = prompt('Parol?', '');
	if (parolAdmin == 'Iam boss here') {
		alert('Welcome!');
	}
	else if (parolAdmin==null) {
		alert('Canceled');
	}
	else {
		alert('Incorrect password');
	}
}
else if (nameAdmin==null)
{
	alert('Canceled');
}
else {
	alert('I dont know you');
}*/

/*for (var i=0; i<=10; i++)
{
	if ( i % 2 == 0) {
		alert(i);
	}
}*/

/*var i = 0;
while (i<3) {
	alert( `number ${i}!` );
	i++;
}*/

/*let value = prompt ('Input number more than 100', '');
outer: if (value > 100)
{

	alert('Great!');
}
else if ( value < 100) 
{
	for (var i=0;;i++)
	{
		value = prompt ('Input number more than 100', '');
		if (value > 100){break outer}
		if (value==null){alert('Cancelled');
break outer}

	}
}
else if (value==null)
{
	alert('Cancelled');
}*/

/*let n = prompt ('Set the value for variable n', '')
for (var i=0; i <= n; i++)
{
	if (i % i )
	{
		alert(i);
	}
}*/

/*if (browser === 'Edge')
{
	alert('You have got the Edge');
}
else if (browser === 'Chrome' || 'Firefox' || 'Safari' || 'Opera')
{
	alert('Ok, we support these browsers too');
}
else {
	alert( 'We hope that this page looks ok!' );
}*/

/*const number = +prompt('Введите число между 0 и 3', '');

switch (number)
{
	case 0: 
	alert('Вы ввели число 0');
break;
	case 1:
	alert('Вы ввели число 1');
break;
	case 2:
	case 3:
	alert('Вы ввели число 2 или может 3');
	break;
}*/


/*function checkAge(age) {

	(age > 18) ? true : (confirm('Родители разрешили?'));
}

checkAge(19);*/

/*function checkAge(age) {
	return ( age > 18) || confirm('But ur parents acceptable?');

}

checkAge(15);*/

/*let func = (question, yes, no) => {
	if (confirm(question)) yes()
  else no();
}

func("Вы согласны?",
  function() { alert("Вы согласились."); },
  function() { alert("Вы отменили выполнение."); });*/

/*function pow(x, n) {
  if (n < 0) {
    alert("Отрицательные значения 'n' не поддерживаются");
    return;
  }

  let result = 1;

  for (let i = 0; i < n; i++) {
    result *= x;
  }

  return result;
}

console.log(pow(2, -1))*/

/*let user = {
	name: "John",
	surname: 'Smith',
}

user.name = "Pete";

delete user.name;*/

/*let obj = {
	John: 200,
	Sarah: 300,
	position: "Junior FrontEnd",
}

function multiplyNumeric(obj) {
	for(let key in obj) {
		if (typeof obj[key] == 'number') {
        obj[key] *= 2;}
	} 
	
}

alert(multiplyNumeric(obj));*/

/*let nameCharacter = prompt('Enter name of your character', '');

let roleCharacter = prompt('Enter name of your character', '');

function makeCharacter (x, y) {
	return {
		name: x,
		role: y
	}
}

let user = makeCharacter(nameCharacter, roleCharacter);

for (let key in user)
{
	alert(user[key]);
}*/

"use strict"

/*let str = "Hello";

str.something = 5;

alert(str.something);*/

/*let arr = [1, 2, 3, 5, 8, 13];

function computeMax(x) {
	return Math.max(...arr);
}

alert(computeMax(arr));*/
 
/*let arr = [1, 2, 3, 4];

alert(arr[0]);

alert(typeof(arr));*/ // object

/*var vegetables = ['Капуста', 'Репа', 'Редиска', 'Морковка', 'Чебурек'];
function arrayClone(arr) {

	return arr;

}

var arr1 = arrayClone(vegetables);

alert(arr1);*/

/*let styles = ['Джаз', 'Блюз'];

styles.push('Рок-н-ролл');

for (let i = 0; i < styles.length; i++) {

	let getWord = styles;

	getWord(...styles) = 'Классика';

}*/

//let str = '123456';

//let arr1 = [4, 5, 6];

//let del = arr.splice(1, 0, 'a', 'b');

//arr.sort();

/*for ( let key in obj) {

	alert(key);

	alert(obj[key]);

}*/

/*let str = '123456';

let arr1 = str.split('');

let arr2 = arr1.reverse();

let result = arr2.join('');

alert(result);*/

/*let str1 = prompt('Write link', );

function getCheck (x) {

		if (x.substr(0, 7) == 'http://') {
			alert('Dio');
		}
		else {alert('Djotaro')};
	
}

alert(getCheck(str1)); */

/*function getCheck (hours, minutes, interval) {
		if ( hours >= 0 && hours < 24) {
		if ( minutes >= 0 && minutes < 60) {
			if ( interval >= 60 ) {
				Math.floor(minutes);
				alert(minutes);
			}
		}
	}
}


alert(getCheck(12, 30, 40));*/

/*function timeAdder (hours, minutes, interval) {
	if ( hours >= 0 && hours < 24) {
		if ( minutes >= 0 && minutes < 60) {
			if ( interval >= 60 ) {
				++hours;
				// let tmp = interval + minutes;
				
			}
			else {
				
			}
		}
	}
}

timeAdder(12, 30, 30)*/

/*let phrase = 'Прохожу курс на #coursera по #javascript';

function getString (tweet) {

	let space = ' ';

	let arrayOfString = tweet.split(space);

	let arrayResult = [];

	for ( let i = 0; i < arrayOfString.length; i++) {

		if (arrayOfString[i][0] === '#') {
			arrayResult.push(arrayOfString[i].slice(1));
		}
	}

	return arrayResult;
}

getString(phrase); */

/*let x = ['web', 'coursera', 'JavaScript', 'Coursera', 'script', 'programming', 'WeB'];

let h = '';

function getHashtags (hashtags) {

	let arrayResult = [];

	let string = 'dfgfdg';

	if ( hashtags.length <= 0 ) {

		console.log(string);
	}

	else {

		for ( let i = 0; i < hashtags.length; i++) {

			let lowerCase = hashtags[i].toLowerCase();

			arrayResult.push(lowerCase);

		}

		hashtags = arrayResult;

		let stringResult = arrayResult.join(', ');

		String.prototype.uniq = function () {
  var table = {};
  return this.split(' ').filter(function(a){
    return !table[a] && (table[a] = 1);
  }).join(' ');
};
var str = stringResult.uniq();
console.log(str);

	}

}

getHashtags(x);*/

/*function grabScreenshot() {
  ctx.drawImage(video, 0, 0, videoWidth, videoHeight);
  var img = new Image();
  img.src = canvas.toDataURL("image/png");
  img.width = 120;
  ssContainer.appendChild(img);
}*/

/*function genScreenshot() {
    html2canvas(document.body, {
      onrendered: function(canvas) {
    	$('#box1').html("");
		$('#box1').append(canvas);}});}*/

/*let height = window.innerHeight;

alert(location.href); // показывает текущий URL
if (confirm("Перейти на Wikipedia?")) {
location.href = "https://wikipedia.org"; // перенаправляет браузер на другой URL
}*/

//let video = document.getElementById("file");

//var vid = document.querySelector('vid');

//let input = document.querySelector('input');

/*if (document.getElementById('upload').click)
{
console.log(input.value);
}*/



//let vid = input.value; // Получаем результат инпута

