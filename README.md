# Language Analyzer
NPM module for breaking down sentences into their identifiable functional components. This library has a few tools which can be used to break down sentences based on their relevant grammar parse trees according to the Brown Corpus.

**BEWARE! This project is in active development and may break at any time.**

## Available Classes
These analyzer classes perform pre-defined algorithms for breaking down various types of sentences. Each Analyzer is based on WordNet.

### `QuestionAnalyzer`
The `QuestionAnalyzer` class can be used to break down questions and determine what sort of answer to search for or otherwise expect. For example, if you have the question *Where is Israel?* the analyzer will be able to tell you that you should search for or otherwise expect a *location*.

**Usage:**
```js
const langAnalyzer = require('language-analyzer');
const questionAnalyzer = new langAnalyzer.QuestionAnalyzer();

const sentence = 'Who is John Smith?';

// Outputs diagnostic about this question
// result: did the analysis succeed? (i.e. was the question able to be analyzed fully)
// state: an object with the for this object
questionAnalyzer.analyze(sentence, (result, state) => {
    console.log(state);
});
```

**Output Object (ideal case):**

|Property|Data Type|Description|
|--------|---------|-----------|
|root|`string`|The root "wh-" word determining what type of question it is. Can be `who`, `what`, `where`, `when`, `why`, `how`, or `rest`. A *rest* type is an indirect question.|
|head|`string`|The head word associated with the root word.|
|punctuation|`string/char`|The final punctuation character in this sentence.|
|expects|`string`|A temporal copy of the head word immediately after it is extracted to preserve the expected search type (this is what to look for)|
|tags|`array`|Array of objects with the objects and their corresponding part of speech according to the corpora.|

**Output Object (ideal case) (raw):**
```js
{
    root: '...',
    head: '...',
    punctuation: '...',
    expects: '...',
    tags: [ ... ]
}
```

## References
Huang, Z., Thint, M., & Qin, Z. (2018, Jan 29). General format. Retrieved from http://www.aclweb.org/anthology/D08-1097
