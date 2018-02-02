const langAnalyzer = require('../');
const questionAnalyzer = new langAnalyzer.QuestionAnalyzer();

const sentence = 'Who is John Smith?';

// Outputs diagnostic about this question
// result: did the analysis succeed? (i.e. was the question able to be analyzed fully)
// state: an object with the for this object
questionAnalyzer.analyze(sentence, (result, state) => {
    console.log(`Result: ${result}`);
    console.log(`Sentence: ${sentence}`);
    console.log(state);
});