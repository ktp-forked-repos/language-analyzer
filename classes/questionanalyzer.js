"use strict"

const Analyzer = require('./analyzer').constructor;

const POS = {
    Noun: 'NN',
    ProperNoun: 'NP',
};

const RegexTests = {
    Whitespace: { test_name: 'whitespace', regex: /\s+/, lookup: '' },
    What: [
        // DESC:def pattern 1
        { test_name: 'desc_def_1', regex: /^what(\s+)(is|are)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*[.?!]{1}$/, lookup: 'def' }, 
        // DESC:def pattern 2
        { test_name: 'desc_def_2', regex: /^what(\s+)(do|does)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*mean[.?!]{1}$/, lookup: 'def' }, 
        // ENTY:substance pattern
        { test_name: 'enty_substance', regex: /^what(\s+)(is|are)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*(composed|made)+[\s]*of[.?!]{1}$/, lookup: 'substance' },
        // DESC:desc pattern
        { test_name: 'desc_desc', regex: /^what(\s+)(does)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*do[.?!]{1}$/, lookup: 'desc'},
        // ENTY:term pattern
        { test_name: 'enty_term', regex: /^what do you call(\s+)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*[.?!]{1}$/, lookup: 'term'},
        // DESC:reason pattern 1
        { test_name: 'desc_reason_1', regex: /^what (cause|causes)(\s+)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*[.?!]{1}$/, lookup: ''},
        // DESC:reason pattern 2
        { test_name: 'desc_reason_2', regex: /^what (is|are)(\s+)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*used for[.?!]{1}$/, lookup: ''},
        // ABBR:exp pattern
        { test_name: 'abbr_exp', regex: /^what(\s+)(do|does)[\w\s.,\/#!$%\^&\*;:{}=\-_`~()]*stand for[.?!]{1}$/, lookup: ''}
    ],
    Who: { test_name: 'hum_desc', regex: /^who(\s+)(is|was){1}(\s+)([A-Z]{1}(\s*\w*)*)[.?!]{1}$/, lookup: 'hum_desc'}
};

// Analyzer based on the algorithms here: http://www.aclweb.org/anthology/D08-1097
class QuestionAnalyzer extends Analyzer {
    constructor() {
        super();
    }

    analyze(sentence, callback) {
        if (typeof sentence !== "string") {
            throw new TypeError(`Only string-based sentences can be analyzed (got ${typeof sentence}).`)
        }

        const result = {
            root: '',
            head: '',
            punctuation: '',
            expects: '',
            tags: []
        };

        result.root = this.getRootWord(sentence);
        result.head = this.getHeadWord(result.root, sentence);

        this.tags = this.tagWords(sentence);

        if (result.head !== undefined) {
            callback(true, result);
        } else {
            callback(false, result);
        }
    }

    getRootWord(sentence) {
        if (sentence.search(new RegExp(/who /, "gi")) !== -1) return "who";
        if (sentence.search(new RegExp(/what /, "gi")) !== -1) return "what";
        if (sentence.search(new RegExp(/where /, "gi")) !== -1) return "where";
        if (sentence.search(new RegExp(/when /, "gi")) !== -1) return "when";
        if (sentence.search(new RegExp(/why /, "gi")) !== -1) return "why";
        if (sentence.search(new RegExp(/how /, "gi")) !== -1) return "how";
        return "rest";
    }

    getHeadWord(type, sentence) {
        type = type.toLowerCase();
        const words = sentence.split(RegexTests.Whitespace);
        switch (type) {
            case 'when':
            case 'where':
            case 'why':
                return undefined;
            case 'how':
                let i = 0;
                for (const word of words) {
                    if (word === 'how') break;
                    i++;
                }
                return words[(i+1)];
            case 'what':
                for (const test of RegexTests.What) {
                    if (sentence.match(test.regex) !== -1) {
                        return test.lookup;
                    }
                }
                break;
            case 'who':
                if (sentence.match(RegexTests.Who.regex)) {
                    return RegexTests.Who.lookup;
                }
                break;
            default:
                return undefined; // no pattern match
                // TODO: extract candidate head word from parse tree
                break;
        }

        // no category match or patterns for given category all failed
        // dead end...
        return undefined;
    }

    tagWords(sentence) {
        const result = [];

        const words = sentence.split(RegexTests.Whitespace);
        for (const word in words) {
            this.lookup(word, (err, defintions) => {
                result.push({ word: word, data: definitions });
            });
        }
    }
}

module.exports.POS = POS;
module.exports.QuestionAnalyzer = QuestionAnalyzer;