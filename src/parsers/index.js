'use strict';

const jsdom = require('jsdom');
const util = require('./../utils/commonUtil');

exports.fromHtml = function (html, parsers) {
  return new Promise((resolve, reject) => {
    jsdom.env(html, (err, window) => {
      if (err) {
        window.close();
        util.logErrorAndResolve(reject, err)
      } else {
        const $ = require('jquery')(window);
        let item = {};
        for (let parser of parsers) {
          try {
            Object.assign(item, parser($));
          } catch (e) {
            console.error(e);
          }
        }
        window.close();
        resolve(item);
      }
    });
  })
};