'use strict';

const path = require('path');
const fs = require('fs');
const assert = require('assert');
const jsdom = require('jsdom');

const userProfile = fs.readFileSync(path.join(__dirname, '/data/userProfile.txt')).toString('utf8');

describe('Parsers', function () {
    describe('user parser', function () {
        it('should parse hashId correctly', function (done) {
            const hashIdParser = require('./../src/parsers/user/hashIdParser');
            jsdom.env(userProfile, (err, window) => {
                if (err) {
                    window.close();
                    done(err);
                } else {
                    const $ = require('jquery')(window);
                    let item = hashIdParser($);
                    assert.equal(item.hashId, '6a246a16b892bf7cbbb62ae586190c4a');
                    done();
                }
            });
        });
    });
});
