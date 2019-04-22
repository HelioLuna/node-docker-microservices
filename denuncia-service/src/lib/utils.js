'use strict'

const unflatten = (data) => {
  if (Object(data) !== data || Array.isArray(data))
    return data;
  
  var regex = /\.?([^.\[\]]+)|\[(\d+)\]/g, resultholder = {};
  for (var p in data) {
    var cur = resultholder,
        prop = "",
        m;
    while (m = regex.exec(p)) {
      cur = cur[prop] || (cur[prop] = (m[2] ? [] : {}));
      prop = m[2] || m[1];
    }
    cur[prop] = data[p];
  }
  return resultholder[""] || resultholder;
}

module.exports = unflatten