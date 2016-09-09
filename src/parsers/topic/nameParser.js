'use strict';

module.exports = function (json) {
  let msg = json.msg;
  let length = msg[0];
  let content = msg[1];
  let prefix = '<strong>';
  let suffix = '<\/strong>';
  let list = [];
  for (let i = 0; i < length; i++) {
      content = content.substr(content.indexOf(prefix) + prefix.length);
      list.push(content.substr(0, content.indexOf(suffix)));
  }
  return {
    list: list
  };
};