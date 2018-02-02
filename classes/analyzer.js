"use strict"

const WordNet = require('wordnet').constructor;

class Analyzer extends WordNet{
    constructor() {
        super();
    }
}

module.exports.Analyzer = Analyzer;