/**
 * @param {String[]} hashtags
 * @returns {String}
 */
module.exports = function (hashtags) {

let arrayResult = [];

	let string = '';

	let arrayHashtags = hashtags.split(' ');

	if ( arrayHashtags.length <= 0 ) {

		return(string);
	}

	else {

		for ( let i = 0; i < arrayHashtags.length; i++) {

			let lowerCase = arrayHashtags[i].toLowerCase();

			arrayResult.push(lowerCase);

		}

		arrayHashtags = arrayResult;

		let stringResult = arrayResult.join(', ');

		String.prototype.uniq = function () {
  		var table = {};
  		return this.split(' ').filter(function(a){
    	return !table[a] && (table[a] = 1);
  		}).join(' ');
		};
		var str = stringResult.uniq();
		return(str);

	}

};
