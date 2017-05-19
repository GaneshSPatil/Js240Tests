var fs = require('fs');
var usages = ['node runTest.js exampleTest.js ==> runs all tests',
	'node runTest.js exampleTest.js'+' -list '+'==> lists all tests',
	'node runTest.js exampleTest.js'+' -stop '+'==> stops on first failure',
	'node runTest.js exampleTest.js'+' -only '+' namePart ==> runs all tests that match the namePart'
];

var printLine = function(line){console.log(line);};

var TestUsageException = function(message){
	this.message = message;
	this.name = 'TestUsageException';
};
var trim_undefined = function(item){return item || ''};

var quit = function(){
	console.log('Usage:');
	usages.forEach(printLine);
	var args = Array.prototype.slice.call(arguments, 0);
	throw new TestUsageException(args.map(trim_undefined).join(' ').error);
};

var readTestDetails = function(testfileName){
	console.log('loading tests from:',testfileName);
	var test = require('../'+testfileName).test;
	test || quit('Missing test object in',testfileName);
	var members = Object.keys(test);
	var isAFunction = function(field){return ('function' == typeof test[field]);};
	var methods = members.filter(isAFunction);
	return {test:test,methodNames:methods};
};
var runTests = function(test,methodNames,option){
	var failed = 0;
	var executeTest = function(name){
		var member = test[name];
		console.log('--------');
		console.log('-->',name);
		try{
			member();
		}catch(error){
			failed++;
			console.log(error.stack.error);
			if(option === 'stop') throw {name:'User Requested to stop',message:'on first failure'};
		}
	};
	methodNames.forEach(executeTest);
	console.log('--------');
	var total = methodNames.length;
	console.log((total-failed +'/'+total)+' passed');
};


var main = function(){
	var testName = process.argv[2];
	var option = process.argv[3];
	var filterText = process.argv[4];
	var matching = function(name){return name.indexOf(filterText)>=0;};

	if(!fs.existsSync(testName)) quit('Missing testfile',testName);
	var testDetails = readTestDetails(testName);

	(option === '-list') && testDetails.methodNames.forEach(printLine);
	(option === '-stop') && runTests(testDetails.test,testDetails.methodNames,'stop');
	(option === '-only') && runTests(testDetails.test,testDetails.methodNames.filter(matching));
	option || runTests(testDetails.test,testDetails.methodNames);
};

main();
