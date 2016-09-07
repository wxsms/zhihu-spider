'use strict';

module.exports = function (json) {
  let msg = json.msg;
  let prefix = 'class="zm-item-link-avatar"\nhref="/people/';
  let suffix = '"';
  return {
    list: msg.map((item) => {
      item = item.substr(item.indexOf(prefix) + prefix.length);
      item = item.substr(0, item.indexOf(suffix));
      return item;
    })
  };
};