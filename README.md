# Language Analyzer
NPM module for breaking down sentences into their identifiable functional components. This library has a few tools which can be used to break down sentences based on their relevant grammar parse trees according to the Brown Corpus.

## Available Classes
### `QuestionAnalyzer`
The `QuestionAnalyzer` class can be used to break down questions and determine what sort of answer to search for or otherwise expect. For example, if you have the question *Where is Israel?* the analyzer will be able to tell you that you should search for or otherwise expect a *location*.

**Usage**
```js
const langAnalyzer = require('language-analyzer');
const questionAnalyzer = new langAnalyzer.QuestionAnalyzer();

const sentence = 'Who is John Smith?';

// Outputs diagnostic about this question
console.log(questionAnalyzer.analyze(sentence));

// TODO: Add example
```

## References
Huang, Z., Thint, M., & Qin, Z. (2018, Jan 29). General format. Retrieved from http://www.aclweb.org/anthology/D08-1097