### JS240Tests

JS240Tests is a basic test provider plugin for 240TestFramework.

##### How to Use:

Use the following code snippet to consume the JS240Tests provider

```
var testeeProjectPath = './ganeshpl_Js240Tests';
var provider = require('../Js240Tests/provide.js');

var testeeTests = [];

var addedResult = provider(testeeTests);
console.log(addedResult);
```
