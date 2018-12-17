const hash = message => sjcl.codec.hex.fromBits(sjcl.hash.sha256.hash(message));
const hashGen = word => {
	let wordArr = [];
	wordArr.push(word.toUpperCase());
	wordArr.push(word.toLowerCase());
	let binaryArr = permuteBinary(wordArr[0].length);
	let hashes = "";
	for(let i=0;i<binaryArr.length;i++)
		hashes += hash(genWord(binaryArr[i],wordArr)) + "A";
	return hashes;
};

const genWord = (pattern, wordArr) => {
	let word = "";
	for(let i = 0; i < pattern.length; i++)
		word += wordArr[parseInt(pattern.charAt(i))].charAt(i);
	return word;
}

const permuteBinary = length => {
	const permutation = [];
	for(let i = 0; i < Math.pow(2,length); i++)
		permutation.push(intToBinaryStringFixedWidth(i, length))
	return permutation;
};

const intToBinaryStringFixedWidth = (int,length) => {
	let binaryString = intToBinaryString(int);
	let binaryStringPad = "";
	for(let i=0; i < length - binaryString.length; i++)
		binaryStringPad = "0" + binaryStringPad;
	return binaryStringPad + binaryString;
};

const intToBinaryString = (int) => {
	if(int === 0) return "";
	let digit = int % 2;
	return "" + intToBinaryString(Math.floor(int/2)) + digit;
};

console.log(hashGen("mole"));
console.log(hashGen("handle"));