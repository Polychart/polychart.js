/** Generated on 2012-04-24T11:39:05.887050 */
;/**
 * Date ; 1/12/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */
var gg = (function(){
;if (!Date.now) Date.now = function() {
  return +new Date;
};
try {
  document.createElement("div").style.setProperty("opacity", 0, "");
} catch (error) {
  var d3_style_prototype = CSSStyleDeclaration.prototype,
      d3_style_setProperty = d3_style_prototype.setProperty;
  if (!d3_style_setProperty) {
    // IE compat. - priority is ignored.
    d3_style_prototype.setProperty = function(name, value) {
      this[name] = value;
    };

  } else {
    d3_style_prototype.setProperty = function(name, value, priority) {
      d3_style_setProperty.call(this, name, value + "", priority);
    };
  }
}
// Namespace related methods - does not exist in IE < 9.
var d3_createElementNS;
var d3_setAttributeNS;
if (!document.createElementNS) {
  d3_createElementNS = function createElementNS(space, name) {
    var node = document.createElement(name);
    if (space) { node.setAttribute('xmlns', space) }
    return node;
  }
} else {
  d3_createElementNS = function(ns, name) {
    return document.createElementNS(ns, name);
  }
}
var _setAttributeNS = document.createElement('div').setAttributeNS;
if(_setAttributeNS) {
  d3_setAttributeNS = _setAttributeNS;
} else {
  d3_setAttributeNS = function(ns, name, value) {
    this.setAttribute((ns ? (ns + ':'):'') + name, value);
  }
}
var d3_array_map;
var d3_array_forEach;
;(function() {
"use strict";
// Implementation copied from underscore.js
var ArrayProto         = Array.prototype
var nativeForEach      = ArrayProto.forEach
var nativeMap          = ArrayProto.map
var breaker = {};

d3_array_map = function(obj, iterator, context) {
  var results = [];
  if (obj == null) return results;
  if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
  d3_array_forEach(obj, function(value, index, list) {
    results[results.length] = iterator.call(context, value, index, list);
  });
  if (obj.length === +obj.length) results.length = obj.length;
  return results;
};

d3_array_forEach = function(obj, iterator, context) {
  if (obj == null) return;
  if (nativeForEach && obj.forEach === nativeForEach) {
    obj.forEach(iterator, context);
  } else if (obj.length === +obj.length) {
    for (var i = 0, l = obj.length; i < l; i++) {
      if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
    }
  } else {
    for (var key in obj) {
      if (_.has(obj, key)) {
        if (iterator.call(context, obj[key], key, obj) === breaker) return;
      }
    }
  }
};

if (!nativeMap) {
  Array.prototype.map = function(iterator) {
    return d3_array_map(this, iterator)
  }

}
})();
var d3_selectionPrototype_text;
var hasTextContent;

hasTextContent = (document.createElement("div").textContent !== undefined)
if (hasTextContent) {
  d3_selectionPrototype_text = function(value) {
    return arguments.length < 1
        ? this.node().textContent : this.each(typeof value === "function"
        ? function() { var v = value.apply(this, arguments); this.textContent = v == null ? "" : v; } : value == null
        ? function() { this.textContent = ""; }
        : function() { this.textContent = value; });
  }
} else {
  d3_selectionPrototype_text = function(value) {
    return arguments.length < 1
        ? this.node().innerText : this.each(typeof value === "function"
        ? function() { var v = value.apply(this, arguments); this.innerText = v == null ? "" : v; } : value == null
        ? function() { this.innerText = ""; }
        : function() { this.innerText = value; });
  }
}
d3 = {version: "2.8.1"}; // semver
function d3_class(ctor, properties) {
  try {
    for (var key in properties) {
      Object.defineProperty(ctor.prototype, key, {
        value: properties[key],
        enumerable: false
      });
    }
  } catch (e) {
    ctor.prototype = properties;
  }
}
var d3_array = d3_arraySlice; // conversion for NodeLists

function d3_arrayCopy(pseudoarray) {
  var i = -1, n = pseudoarray.length, array = [];
  while (++i < n) array.push(pseudoarray[i]);
  return array;
}

function d3_arraySlice(pseudoarray) {
  return Array.prototype.slice.call(pseudoarray);
}

try {
  d3_array(document.documentElement.childNodes)[0].nodeType;
} catch(e) {
  d3_array = d3_arrayCopy;
}

var d3_arraySubclass = [].__proto__?

// Until ECMAScript supports array subclassing, prototype injection works well.
function(array, prototype) {
  array.__proto__ = prototype;
}:

// And if your browser doesn't support __proto__, we'll use direct extension.
function(array, prototype) {
  for (var property in prototype) array[property] = prototype[property];
};
d3.map = function(object) {
  var map = new d3_Map;
  for (var key in object) map.set(key, object[key]);
  return map;
};

function d3_Map() {}

d3_class(d3_Map, {
  has: function(key) {
    return d3_map_prefix + key in this;
  },
  get: function(key) {
    return this[d3_map_prefix + key];
  },
  set: function(key, value) {
    return this[d3_map_prefix + key] = value;
  },
  remove: function(key) {
    key = d3_map_prefix + key;
    return key in this && delete this[key];
  },
  keys: function() {
    var keys = [];
    this.forEach(function(key) { keys.push(key); });
    return keys;
  },
  values: function() {
    var values = [];
    this.forEach(function(key, value) { values.push(value); });
    return values;
  },
  entries: function() {
    var entries = [];
    this.forEach(function(key, value) { entries.push({key: key, value: value}); });
    return entries;
  },
  forEach: function(f) {
    for (var key in this) {
      if (key.charCodeAt(0) === d3_map_prefixCode) {
        f.call(this, key.substring(1), this[key]);
      }
    }
  }
});

var d3_map_prefix = "\0", // prevent collision with built-ins
    d3_map_prefixCode = d3_map_prefix.charCodeAt(0);
function d3_this() {
  return this;
}
d3.functor = function(v) {
  return typeof v === "function" ? v : function() { return v; };
};
// Copies a variable number of methods from source to target.
d3.rebind = function(target, source) {
  var i = 1, n = arguments.length, method;
  while (++i < n) target[method = arguments[i]] = d3_rebind(target, source, source[method]);
  return target;
};

// Method is assumed to be a standard D3 getter-setter:
// If passed with no arguments, gets the value.
// If passed with arguments, sets the value and returns the target.
function d3_rebind(target, source, method) {
  return function() {
    var value = method.apply(source, arguments);
    return arguments.length ? target : value;
  };
}
d3.ascending = function(a, b) {
  return a < b ? -1 : a > b ? 1 : a >= b ? 0 : NaN;
};
d3.descending = function(a, b) {
  return b < a ? -1 : b > a ? 1 : b >= a ? 0 : NaN;
};
d3.mean = function(array, f) {
  var n = array.length,
      a,
      m = 0,
      i = -1,
      j = 0;
  if (arguments.length === 1) {
    while (++i < n) if (d3_number(a = array[i])) m += (a - m) / ++j;
  } else {
    while (++i < n) if (d3_number(a = f.call(array, array[i], i))) m += (a - m) / ++j;
  }
  return j ? m : undefined;
};
d3.median = function(array, f) {
  if (arguments.length > 1) array = array.map(f);
  array = array.filter(d3_number);
  return array.length ? d3.quantile(array.sort(d3.ascending), .5) : undefined;
};
d3.min = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && a > b) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && a > b) a = b;
  }
  return a;
};
d3.max = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b;
  if (arguments.length === 1) {
    while (++i < n && ((a = array[i]) == null || a != a)) a = undefined;
    while (++i < n) if ((b = array[i]) != null && b > a) a = b;
  } else {
    while (++i < n && ((a = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null && b > a) a = b;
  }
  return a;
};
d3.extent = function(array, f) {
  var i = -1,
      n = array.length,
      a,
      b,
      c;
  if (arguments.length === 1) {
    while (++i < n && ((a = c = array[i]) == null || a != a)) a = c = undefined;
    while (++i < n) if ((b = array[i]) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  } else {
    while (++i < n && ((a = c = f.call(array, array[i], i)) == null || a != a)) a = undefined;
    while (++i < n) if ((b = f.call(array, array[i], i)) != null) {
      if (a > b) a = b;
      if (c < b) c = b;
    }
  }
  return [a, c];
};
d3.random = {
  normal: function(mean, deviation) {
    if (arguments.length < 2) deviation = 1;
    if (arguments.length < 1) mean = 0;
    return function() {
      var x, y, r;
      do {
        x = Math.random() * 2 - 1;
        y = Math.random() * 2 - 1;
        r = x * x + y * y;
      } while (!r || r > 1);
      return mean + deviation * x * Math.sqrt(-2 * Math.log(r) / r);
    };
  }
};
function d3_number(x) {
  return x != null && !isNaN(x);
}
d3.sum = function(array, f) {
  var s = 0,
      n = array.length,
      a,
      i = -1;

  if (arguments.length === 1) {
    while (++i < n) if (!isNaN(a = +array[i])) s += a;
  } else {
    while (++i < n) if (!isNaN(a = +f.call(array, array[i], i))) s += a;
  }

  return s;
};
// R-7 per <http://en.wikipedia.org/wiki/Quantile>
d3.quantile = function(values, p) {
  var H = (values.length - 1) * p + 1,
      h = Math.floor(H),
      v = values[h - 1],
      e = H - h;
  return e ? v + e * (values[h] - v) : v;
};
d3.transpose = function(matrix) {
  return d3.zip.apply(d3, matrix);
};
d3.zip = function() {
  if (!(n = arguments.length)) return [];
  for (var i = -1, m = d3.min(arguments, d3_zipLength), zips = new Array(m); ++i < m;) {
    for (var j = -1, n, zip = zips[i] = new Array(n); ++j < n;) {
      zip[j] = arguments[j][i];
    }
  }
  return zips;
};

function d3_zipLength(d) {
  return d.length;
}
d3.bisector = function(f) {
  return {
    left: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (f.call(a, a[mid], mid) < x) lo = mid + 1;
        else hi = mid;
      }
      return lo;
    },
    right: function(a, x, lo, hi) {
      if (arguments.length < 3) lo = 0;
      if (arguments.length < 4) hi = a.length;
      while (lo < hi) {
        var mid = lo + hi >> 1;
        if (x < f.call(a, a[mid], mid)) hi = mid;
        else lo = mid + 1;
      }
      return lo;
    }
  };
};

var d3_bisector = d3.bisector(function(d) { return d; });
d3.bisectLeft = d3_bisector.left;
d3.bisect = d3.bisectRight = d3_bisector.right;
d3.first = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) > 0) {
      a = b;
    }
  }
  return a;
};
d3.last = function(array, f) {
  var i = 0,
      n = array.length,
      a = array[0],
      b;
  if (arguments.length === 1) f = d3.ascending;
  while (++i < n) {
    if (f.call(array, a, b = array[i]) <= 0) {
      a = b;
    }
  }
  return a;
};
d3.nest = function() {
  var nest = {},
      keys = [],
      sortKeys = [],
      sortValues,
      rollup;

  function map(array, depth) {
    if (depth >= keys.length) return rollup
        ? rollup.call(nest, array) : (sortValues
        ? array.sort(sortValues)
        : array);

    var i = -1,
        n = array.length,
        key = keys[depth++],
        keyValue,
        object,
        valuesByKey = new d3_Map,
        values,
        o = {};

    while (++i < n) {
      if (values = valuesByKey.get(keyValue = key(object = array[i]))) {
        values.push(object);
      } else {
        valuesByKey.set(keyValue, [object]);
      }
    }

    valuesByKey.forEach(function(keyValue) {
      o[keyValue] = map(valuesByKey.get(keyValue), depth);
    });

    return o;
  }

  function entries(map, depth) {
    if (depth >= keys.length) return map;

    var a = [],
        sortKey = sortKeys[depth++],
        key;

    for (key in map) {
      a.push({key: key, values: entries(map[key], depth)});
    }

    if (sortKey) a.sort(function(a, b) {
      return sortKey(a.key, b.key);
    });

    return a;
  }

  nest.map = function(array) {
    return map(array, 0);
  };

  nest.entries = function(array) {
    return entries(map(array, 0), 0);
  };

  nest.key = function(d) {
    keys.push(d);
    return nest;
  };

  // Specifies the order for the most-recently specified key.
  // Note: only applies to entries. Map keys are unordered!
  nest.sortKeys = function(order) {
    sortKeys[keys.length - 1] = order;
    return nest;
  };

  // Specifies the order for leaf values.
  // Applies to both maps and entries array.
  nest.sortValues = function(order) {
    sortValues = order;
    return nest;
  };

  nest.rollup = function(f) {
    rollup = f;
    return nest;
  };

  return nest;
};
d3.keys = function(map) {
  var keys = [];
  for (var key in map) keys.push(key);
  return keys;
};
d3.values = function(map) {
  var values = [];
  for (var key in map) values.push(map[key]);
  return values;
};
d3.entries = function(map) {
  var entries = [];
  for (var key in map) entries.push({key: key, value: map[key]});
  return entries;
};
d3.permute = function(array, indexes) {
  var permutes = [],
      i = -1,
      n = indexes.length;
  while (++i < n) permutes[i] = array[indexes[i]];
  return permutes;
};
d3.merge = function(arrays) {
  return Array.prototype.concat.apply([], arrays);
};
d3.split = function(array, f) {
  var arrays = [],
      values = [],
      value,
      i = -1,
      n = array.length;
  if (arguments.length < 2) f = d3_splitter;
  while (++i < n) {
    if (f.call(values, value = array[i], i)) {
      values = [];
    } else {
      if (!values.length) arrays.push(values);
      values.push(value);
    }
  }
  return arrays;
};

function d3_splitter(d) {
  return d == null;
}
function d3_collapse(s) {
  return s.replace(/(^\s+)|(\s+$)/g, "").replace(/\s+/g, " ");
}
d3.range = function(start, stop, step) {
  if (arguments.length < 3) {
    step = 1;
    if (arguments.length < 2) {
      stop = start;
      start = 0;
    }
  }
  if ((stop - start) / step === Infinity) throw new Error("infinite range");
  var range = [],
       k = d3_range_integerScale(Math.abs(step)),
       i = -1,
       j;
  start *= k, stop *= k, step *= k;
  if (step < 0) while ((j = start + step * ++i) > stop) range.push(j / k);
  else while ((j = start + step * ++i) < stop) range.push(j / k);
  return range;
};

function d3_range_integerScale(x) {
  var k = 1;
  while (x * k % 1) k *= 10;
  return k;
}
d3.requote = function(s) {
  return s.replace(d3_requote_re, "\\$&");
};

var d3_requote_re = /[\\\^\$\*\+\?\|\[\]\(\)\.\{\}]/g;
d3.round = function(x, n) {
  return n
      ? Math.round(x * (n = Math.pow(10, n))) / n
      : Math.round(x);
};
d3.xhr = function(url, mime, callback) {
  var req = new XMLHttpRequest;
  if (arguments.length < 3) callback = mime, mime = null;
  else if (mime && req.overrideMimeType) req.overrideMimeType(mime);
  req.open("GET", url, true);
  if (mime) req.setRequestHeader("Accept", mime);
  req.onreadystatechange = function() {
    if (req.readyState === 4) callback(req.status < 300 ? req : null);
  };
  req.send(null);
};
d3.text = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseText);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
d3.json = function(url, callback) {
  d3.text(url, "application/json", function(text) {
    callback(text ? JSON.parse(text) : null);
  });
};
d3.html = function(url, callback) {
  d3.text(url, "text/html", function(text) {
    if (text != null) { // Treat empty string as valid HTML.
      var range = document.createRange();
      range.selectNode(document.body);
      text = range.createContextualFragment(text);
    }
    callback(text);
  });
};
d3.xml = function(url, mime, callback) {
  function ready(req) {
    callback(req && req.responseXML);
  }
  if (arguments.length < 3) {
    callback = mime;
    mime = null;
  }
  d3.xhr(url, mime, ready);
};
var d3_nsPrefix = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: "http://www.w3.org/1999/xhtml",
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/",
  vml: "urn:schemas-microsoft-com:vml"
};

d3.ns = {
  prefix: d3_nsPrefix,
  qualify: function(name) {
    var i = name.indexOf(":"),
        prefix = name;
    if (i >= 0) {
      prefix = name.substring(0, i);
      name = name.substring(i + 1);
    }
    return d3_nsPrefix.hasOwnProperty(prefix)
        ? {space: d3_nsPrefix[prefix], local: name}
        : name;
  }
};
d3.dispatch = function() {
  var dispatch = new d3_dispatch,
      i = -1,
      n = arguments.length;
  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);
  return dispatch;
};

function d3_dispatch() {}

d3_dispatch.prototype.on = function(type, listener) {
  var i = type.indexOf("."),
      name = "";

  // Extract optional namespace, e.g., "click.foo"
  if (i > 0) {
    name = type.substring(i + 1);
    type = type.substring(0, i);
  }

  return arguments.length < 2
      ? this[type].on(name)
      : this[type].on(name, listener);
};

function d3_dispatch_event(dispatch) {
  var listeners = [],
      listenerByName = new d3_Map;

  function event() {
    var z = listeners, // defensive reference
        i = -1,
        n = z.length,
        l;
    while (++i < n) if (l = z[i].on) l.apply(this, arguments);
    return dispatch;
  }

  event.on = function(name, listener) {
    var l = listenerByName.get(name),
        i;

    // return the current listener, if any
    if (arguments.length < 2) return l && l.on;

    // remove the old listener, if any (with copy-on-write)
    if (l) {
      l.on = null;
      listeners = listeners.slice(0, i = listeners.indexOf(l)).concat(listeners.slice(i + 1));
      listenerByName.remove(name);
    }

    // add the new listener, if any
    if (listener) listeners.push(listenerByName.set(name, {on: listener}));

    return dispatch;
  };

  return event;
}
// TODO align
d3.format = function(specifier) {
  var match = d3_format_re.exec(specifier),
      fill = match[1] || " ",
      sign = match[3] || "",
      zfill = match[5],
      width = +match[6],
      comma = match[7],
      precision = match[8],
      type = match[9],
      scale = 1,
      suffix = "",
      integer = false;

  if (precision) precision = +precision.substring(1);

  if (zfill) {
    fill = "0"; // TODO align = "=";
    if (comma) width -= Math.floor((width - 1) / 4);
  }

  switch (type) {
    case "n": comma = true; type = "g"; break;
    case "%": scale = 100; suffix = "%"; type = "f"; break;
    case "p": scale = 100; suffix = "%"; type = "r"; break;
    case "d": integer = true; precision = 0; break;
    case "s": scale = -1; type = "r"; break;
  }

  // If no precision is specified for r, fallback to general notation.
  if (type == "r" && !precision) type = "g";

  type = d3_format_types.get(type) || d3_format_typeDefault;

  return function(value) {

    // Return the empty string for floats formatted as ints.
    if (integer && (value % 1)) return "";

    // Convert negative to positive, and record the sign prefix.
    var negative = (value < 0) && (value = -value) ? "\u2212" : sign;

    // Apply the scale, computing it from the value's exponent for si format.
    if (scale < 0) {
      var prefix = d3.formatPrefix(value, precision);
      value *= prefix.scale;
      suffix = prefix.symbol;
    } else {
      value *= scale;
    }

    // Convert to the desired precision.
    value = type(value, precision);

    // If the fill character is 0, the sign and group is applied after the fill.
    if (zfill) {
      var length = value.length + negative.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
      if (comma) value = d3_format_group(value);
      value = negative + value;
    }

    // Otherwise (e.g., space-filling), the sign and group is applied before.
    else {
      if (comma) value = d3_format_group(value);
      value = negative + value;
      var length = value.length;
      if (length < width) value = new Array(width - length + 1).join(fill) + value;
    }

    return value + suffix;
  };
};

// [[fill]align][sign][#][0][width][,][.precision][type]
var d3_format_re = /(?:([^{])?([<>=^]))?([+\- ])?(#)?(0)?([0-9]+)?(,)?(\.[0-9]+)?([a-zA-Z%])?/;

var d3_format_types = d3.map({
  g: function(x, p) { return x.toPrecision(p); },
  e: function(x, p) { return x.toExponential(p); },
  f: function(x, p) { return x.toFixed(p); },
  r: function(x, p) { return d3.round(x, p = d3_format_precision(x, p)).toFixed(Math.max(0, Math.min(20, p))); }
});

function d3_format_precision(x, p) {
  return p - (x ? 1 + Math.floor(Math.log(x + Math.pow(10, 1 + Math.floor(Math.log(x) / Math.LN10) - p)) / Math.LN10) : 1);
}

function d3_format_typeDefault(x) {
  return x + "";
}

// Apply comma grouping for thousands.
function d3_format_group(value) {
  var i = value.lastIndexOf("."),
      f = i >= 0 ? value.substring(i) : (i = value.length, ""),
      t = [];
  while (i > 0) t.push(value.substring(i -= 3, i + 3));
  return t.reverse().join(",") + f;
}
d3_formatPrefixes = d3_array_map(["y","z","a","f","p","n","μ","m","","k","M","G","T","P","E","Z","Y"], d3_formatPrefix);
d3.formatPrefix = function(value, precision) {
  var i = 0;
  if (value) {
    if (value < 0) value *= -1;
    if (precision) value = d3.round(value, d3_format_precision(value, precision));
    i = 1 + Math.floor(1e-12 + Math.log(value) / Math.LN10);
    i = Math.max(-24, Math.min(24, Math.floor((i <= 0 ? i + 1 : i - 1) / 3) * 3));
  }
  return d3_formatPrefixes[8 + i / 3];
};

function d3_formatPrefix(d, i) {
  return {
    scale: Math.pow(10, (8 - i) * 3),
    symbol: d
  };
}

/*
 * TERMS OF USE - EASING EQUATIONS
 *
 * Open source under the BSD License.
 *
 * Copyright 2001 Robert Penner
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * - Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * - Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * - Neither the name of the author nor the names of contributors may be used to
 *   endorse or promote products derived from this software without specific
 *   prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 * POSSIBILITY OF SUCH DAMAGE.
 */

var d3_ease_quad = d3_ease_poly(2),
    d3_ease_cubic = d3_ease_poly(3),
    d3_ease_default = function() { return d3_ease_identity; };

var d3_ease = d3.map({
  linear: d3_ease_default,
  poly: d3_ease_poly,
  quad: function() { return d3_ease_quad; },
  cubic: function() { return d3_ease_cubic; },
  sin: function() { return d3_ease_sin; },
  exp: function() { return d3_ease_exp; },
  circle: function() { return d3_ease_circle; },
  elastic: d3_ease_elastic,
  back: d3_ease_back,
  bounce: function() { return d3_ease_bounce; }
});

var d3_ease_mode = d3.map({
  "in": d3_ease_identity,
  "out": d3_ease_reverse,
  "in-out": d3_ease_reflect,
  "out-in": function(f) { return d3_ease_reflect(d3_ease_reverse(f)); }
});

d3.ease = function(name) {
  var i = name.indexOf("-"),
      t = i >= 0 ? name.substring(0, i) : name,
      m = i >= 0 ? name.substring(i + 1) : "in";
  t = d3_ease.get(t) || d3_ease_default;
  m = d3_ease_mode.get(m) || d3_ease_identity;
  return d3_ease_clamp(m(t.apply(null, Array.prototype.slice.call(arguments, 1))));
};

function d3_ease_clamp(f) {
  return function(t) {
    return t <= 0 ? 0 : t >= 1 ? 1 : f(t);
  };
}

function d3_ease_reverse(f) {
  return function(t) {
    return 1 - f(1 - t);
  };
}

function d3_ease_reflect(f) {
  return function(t) {
    return .5 * (t < .5 ? f(2 * t) : (2 - f(2 - 2 * t)));
  };
}

function d3_ease_identity(t) {
  return t;
}

function d3_ease_poly(e) {
  return function(t) {
    return Math.pow(t, e);
  };
}

function d3_ease_sin(t) {
  return 1 - Math.cos(t * Math.PI / 2);
}

function d3_ease_exp(t) {
  return Math.pow(2, 10 * (t - 1));
}

function d3_ease_circle(t) {
  return 1 - Math.sqrt(1 - t * t);
}

function d3_ease_elastic(a, p) {
  var s;
  if (arguments.length < 2) p = 0.45;
  if (arguments.length < 1) { a = 1; s = p / 4; }
  else s = p / (2 * Math.PI) * Math.asin(1 / a);
  return function(t) {
    return 1 + a * Math.pow(2, 10 * -t) * Math.sin((t - s) * 2 * Math.PI / p);
  };
}

function d3_ease_back(s) {
  if (!s) s = 1.70158;
  return function(t) {
    return t * t * ((s + 1) * t - s);
  };
}

function d3_ease_bounce(t) {
  return t < 1 / 2.75 ? 7.5625 * t * t
      : t < 2 / 2.75 ? 7.5625 * (t -= 1.5 / 2.75) * t + .75
      : t < 2.5 / 2.75 ? 7.5625 * (t -= 2.25 / 2.75) * t + .9375
      : 7.5625 * (t -= 2.625 / 2.75) * t + .984375;
}
d3.event = null;

function d3_eventCancel() {
  d3.event.stopPropagation();
  d3.event.preventDefault();
}

function d3_eventSource() {
  var e = d3.event, s;
  while (s = e.sourceEvent) e = s;
  return e;
}

// Like d3.dispatch, but for custom events abstracting native UI events. These
// events have a target component (such as a brush), a target element (such as
// the svg:g element containing the brush) and the standard arguments `d` (the
// target element's data) and `i` (the selection index of the target element).
function d3_eventDispatch(target) {
  var dispatch = new d3_dispatch,
      i = 0,
      n = arguments.length;

  while (++i < n) dispatch[arguments[i]] = d3_dispatch_event(dispatch);

  // Creates a dispatch context for the specified `thiz` (typically, the target
  // DOM element that received the source event) and `argumentz` (typically, the
  // data `d` and index `i` of the target element). The returned function can be
  // used to dispatch an event to any registered listeners; the function takes a
  // single argument as input, being the event to dispatch. The event must have
  // a "type" attribute which corresponds to a type registered in the
  // constructor. This context will automatically populate the "sourceEvent" and
  // "target" attributes of the event, as well as setting the `d3.event` global
  // for the duration of the notification.
  dispatch.of = function(thiz, argumentz) {
    return function(e1) {
      try {
        var e0 =
        e1.sourceEvent = d3.event;
        e1.target = target;
        d3.event = e1;
        dispatch[e1.type].apply(thiz, argumentz);
      } finally {
        d3.event = e0;
      }
    };
  };

  return dispatch;
}
d3.interpolate = function(a, b) {
  var i = d3.interpolators.length, f;
  while (--i >= 0 && !(f = d3.interpolators[i](a, b)));
  return f;
};

d3.interpolateNumber = function(a, b) {
  b -= a;
  return function(t) { return a + b * t; };
};

d3.interpolateRound = function(a, b) {
  b -= a;
  return function(t) { return Math.round(a + b * t); };
};

d3.interpolateString = function(a, b) {
  var m, // current match
      i, // current index
      j, // current index (for coallescing)
      s0 = 0, // start index of current string prefix
      s1 = 0, // end index of current string prefix
      s = [], // string constants and placeholders
      q = [], // number interpolators
      n, // q.length
      o;

  // Reset our regular expression!
  d3_interpolate_number.lastIndex = 0;

  // Find all numbers in b.
  for (i = 0; m = d3_interpolate_number.exec(b); ++i) {
    if (m.index) s.push(b.substring(s0, s1 = m.index));
    q.push({i: s.length, x: m[0]});
    s.push(null);
    s0 = d3_interpolate_number.lastIndex;
  }
  if (s0 < b.length) s.push(b.substring(s0));

  // Find all numbers in a.
  for (i = 0, n = q.length; (m = d3_interpolate_number.exec(a)) && i < n; ++i) {
    o = q[i];
    if (o.x == m[0]) { // The numbers match, so coallesce.
      if (o.i) {
        if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i - 1] += o.x;
          s.splice(o.i, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i - 1] += o.x + s[o.i + 1];
          s.splice(o.i, 2);
          for (j = i + 1; j < n; ++j) q[j].i -= 2;
        }
      } else {
          if (s[o.i + 1] == null) { // This match is followed by another number.
          s[o.i] = o.x;
        } else { // This match is followed by a string, so coallesce twice.
          s[o.i] = o.x + s[o.i + 1];
          s.splice(o.i + 1, 1);
          for (j = i + 1; j < n; ++j) q[j].i--;
        }
      }
      q.splice(i, 1);
      n--;
      i--;
    } else {
      o.x = d3.interpolateNumber(parseFloat(m[0]), parseFloat(o.x));
    }
  }

  // Remove any numbers in b not found in a.
  while (i < n) {
    o = q.pop();
    if (s[o.i + 1] == null) { // This match is followed by another number.
      s[o.i] = o.x;
    } else { // This match is followed by a string, so coallesce twice.
      s[o.i] = o.x + s[o.i + 1];
      s.splice(o.i + 1, 1);
    }
    n--;
  }

  // Special optimization for only a single match.
  if (s.length === 1) {
    return s[0] == null ? q[0].x : function() { return b; };
  }

  // Otherwise, interpolate each of the numbers and rejoin the string.
  return function(t) {
    for (i = 0; i < n; ++i) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateTransform = function(a, b) {
  var s = [], // string constants and placeholders
      q = [], // number interpolators
      n,
      A = d3.transform(a),
      B = d3.transform(b),
      ta = A.translate,
      tb = B.translate,
      ra = A.rotate,
      rb = B.rotate,
      wa = A.skew,
      wb = B.skew,
      ka = A.scale,
      kb = B.scale;

  if (ta[0] != tb[0] || ta[1] != tb[1]) {
    s.push("translate(", null, ",", null, ")");
    q.push({i: 1, x: d3.interpolateNumber(ta[0], tb[0])}, {i: 3, x: d3.interpolateNumber(ta[1], tb[1])});
  } else if (tb[0] || tb[1]) {
    s.push("translate(" + tb + ")");
  } else {
    s.push("");
  }

  if (ra != rb) {
    q.push({i: s.push(s.pop() + "rotate(", null, ")") - 2, x: d3.interpolateNumber(ra, rb)});
  } else if (rb) {
    s.push(s.pop() + "rotate(" + rb + ")");
  }

  if (wa != wb) {
    q.push({i: s.push(s.pop() + "skewX(", null, ")") - 2, x: d3.interpolateNumber(wa, wb)});
  } else if (wb) {
    s.push(s.pop() + "skewX(" + wb + ")");
  }

  if (ka[0] != kb[0] || ka[1] != kb[1]) {
    n = s.push(s.pop() + "scale(", null, ",", null, ")");
    q.push({i: n - 4, x: d3.interpolateNumber(ka[0], kb[0])}, {i: n - 2, x: d3.interpolateNumber(ka[1], kb[1])});
  } else if (kb[0] != 1 || kb[1] != 1) {
    s.push(s.pop() + "scale(" + kb + ")");
  }

  n = q.length;
  return function(t) {
    var i = -1, o;
    while (++i < n) s[(o = q[i]).i] = o.x(t);
    return s.join("");
  };
};

d3.interpolateRgb = function(a, b) {
  a = d3.rgb(a);
  b = d3.rgb(b);
  var ar = a.r,
      ag = a.g,
      ab = a.b,
      br = b.r - ar,
      bg = b.g - ag,
      bb = b.b - ab;
  return function(t) {
    return "#"
        + d3_rgb_hex(Math.round(ar + br * t))
        + d3_rgb_hex(Math.round(ag + bg * t))
        + d3_rgb_hex(Math.round(ab + bb * t));
  };
};

// interpolates HSL space, but outputs RGB string (for compatibility)
d3.interpolateHsl = function(a, b) {
  a = d3.hsl(a);
  b = d3.hsl(b);
  var h0 = a.h,
      s0 = a.s,
      l0 = a.l,
      h1 = b.h - h0,
      s1 = b.s - s0,
      l1 = b.l - l0;
  return function(t) {
    return d3_hsl_rgb(h0 + h1 * t, s0 + s1 * t, l0 + l1 * t).toString();
  };
};

d3.interpolateArray = function(a, b) {
  var x = [],
      c = [],
      na = a.length,
      nb = b.length,
      n0 = Math.min(a.length, b.length),
      i;
  for (i = 0; i < n0; ++i) x.push(d3.interpolate(a[i], b[i]));
  for (; i < na; ++i) c[i] = a[i];
  for (; i < nb; ++i) c[i] = b[i];
  return function(t) {
    for (i = 0; i < n0; ++i) c[i] = x[i](t);
    return c;
  };
};

d3.interpolateObject = function(a, b) {
  var i = {},
      c = {},
      k;
  for (k in a) {
    if (k in b) {
      i[k] = d3_interpolateByName(k)(a[k], b[k]);
    } else {
      c[k] = a[k];
    }
  }
  for (k in b) {
    if (!(k in a)) {
      c[k] = b[k];
    }
  }
  return function(t) {
    for (k in i) c[k] = i[k](t);
    return c;
  };
}

var d3_interpolate_number = /[-+]?(?:\d*\.?\d+)(?:[eE][-+]?\d+)?/g;

function d3_interpolateByName(n) {
  return n == "transform"
      ? d3.interpolateTransform
      : d3.interpolate;
}

d3.interpolators = [
  d3.interpolateObject,
  function(a, b) { return (b instanceof Array) && d3.interpolateArray(a, b); },
  function(a, b) { return (typeof a === "string" || typeof b === "string") && d3.interpolateString(a + "", b + ""); },
  function(a, b) { return (typeof b === "string" ? d3_rgb_names.has(b) || /^(#|rgb\(|hsl\()/.test(b) : b instanceof d3_Rgb || b instanceof d3_Hsl) && d3.interpolateRgb(a, b); },
  function(a, b) { return !isNaN(a = +a) && !isNaN(b = +b) && d3.interpolateNumber(a, b); }
];
function d3_uninterpolateNumber(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return (x - a) * b; };
}

function d3_uninterpolateClamp(a, b) {
  b = b - (a = +a) ? 1 / (b - a) : 0;
  return function(x) { return Math.max(0, Math.min(1, (x - a) * b)); };
}
d3.rgb = function(r, g, b) {
  return arguments.length === 1
      ? (r instanceof d3_Rgb ? d3_rgb(r.r, r.g, r.b)
      : d3_rgb_parse("" + r, d3_rgb, d3_hsl_rgb))
      : d3_rgb(~~r, ~~g, ~~b);
};

function d3_rgb(r, g, b) {
  return new d3_Rgb(r, g, b);
}

function d3_Rgb(r, g, b) {
  this.r = r;
  this.g = g;
  this.b = b;
}

d3_Rgb.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  var r = this.r,
      g = this.g,
      b = this.b,
      i = 30;
  if (!r && !g && !b) return d3_rgb(i, i, i);
  if (r && r < i) r = i;
  if (g && g < i) g = i;
  if (b && b < i) b = i;
  return d3_rgb(
      Math.min(255, Math.floor(r / k)),
      Math.min(255, Math.floor(g / k)),
      Math.min(255, Math.floor(b / k)));
};

d3_Rgb.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_rgb(
      Math.floor(k * this.r),
      Math.floor(k * this.g),
      Math.floor(k * this.b));
};

d3_Rgb.prototype.hsl = function() {
  return d3_rgb_hsl(this.r, this.g, this.b);
};

d3_Rgb.prototype.toString = function() {
  return "#" + d3_rgb_hex(this.r) + d3_rgb_hex(this.g) + d3_rgb_hex(this.b);
};

function d3_rgb_hex(v) {
  return v < 0x10
      ? "0" + Math.max(0, v).toString(16)
      : Math.min(255, v).toString(16);
}

function d3_rgb_parse(format, rgb, hsl) {
  var r = 0, // red channel; int in [0, 255]
      g = 0, // green channel; int in [0, 255]
      b = 0, // blue channel; int in [0, 255]
      m1, // CSS color specification match
      m2, // CSS color specification type (e.g., rgb)
      name;

  /* Handle hsl, rgb. */
  m1 = /([a-z]+)\((.*)\)/i.exec(format);
  if (m1) {
    m2 = m1[2].split(",");
    switch (m1[1]) {
      case "hsl": {
        return hsl(
          parseFloat(m2[0]), // degrees
          parseFloat(m2[1]) / 100, // percentage
          parseFloat(m2[2]) / 100 // percentage
        );
      }
      case "rgb": {
        return rgb(
          d3_rgb_parseNumber(m2[0]),
          d3_rgb_parseNumber(m2[1]),
          d3_rgb_parseNumber(m2[2])
        );
      }
    }
  }

  /* Named colors. */
  if (name = d3_rgb_names.get(format)) return rgb(name.r, name.g, name.b);

  /* Hexadecimal colors: #rgb and #rrggbb. */
  if (format != null && format.charAt(0) === "#") {
    if (format.length === 4) {
      r = format.charAt(1); r += r;
      g = format.charAt(2); g += g;
      b = format.charAt(3); b += b;
    } else if (format.length === 7) {
      r = format.substring(1, 3);
      g = format.substring(3, 5);
      b = format.substring(5, 7);
    }
    r = parseInt(r, 16);
    g = parseInt(g, 16);
    b = parseInt(b, 16);
  }

  return rgb(r, g, b);
}

function d3_rgb_hsl(r, g, b) {
  var min = Math.min(r /= 255, g /= 255, b /= 255),
      max = Math.max(r, g, b),
      d = max - min,
      h,
      s,
      l = (max + min) / 2;
  if (d) {
    s = l < .5 ? d / (max + min) : d / (2 - max - min);
    if (r == max) h = (g - b) / d + (g < b ? 6 : 0);
    else if (g == max) h = (b - r) / d + 2;
    else h = (r - g) / d + 4;
    h *= 60;
  } else {
    s = h = 0;
  }
  return d3_hsl(h, s, l);
}

function d3_rgb_parseNumber(c) { // either integer or percentage
  var f = parseFloat(c);
  return c.charAt(c.length - 1) === "%" ? Math.round(f * 2.55) : f;
}

var d3_rgb_names = d3.map({
  aliceblue: "#f0f8ff",
  antiquewhite: "#faebd7",
  aqua: "#00ffff",
  aquamarine: "#7fffd4",
  azure: "#f0ffff",
  beige: "#f5f5dc",
  bisque: "#ffe4c4",
  black: "#000000",
  blanchedalmond: "#ffebcd",
  blue: "#0000ff",
  blueviolet: "#8a2be2",
  brown: "#a52a2a",
  burlywood: "#deb887",
  cadetblue: "#5f9ea0",
  chartreuse: "#7fff00",
  chocolate: "#d2691e",
  coral: "#ff7f50",
  cornflowerblue: "#6495ed",
  cornsilk: "#fff8dc",
  crimson: "#dc143c",
  cyan: "#00ffff",
  darkblue: "#00008b",
  darkcyan: "#008b8b",
  darkgoldenrod: "#b8860b",
  darkgray: "#a9a9a9",
  darkgreen: "#006400",
  darkgrey: "#a9a9a9",
  darkkhaki: "#bdb76b",
  darkmagenta: "#8b008b",
  darkolivegreen: "#556b2f",
  darkorange: "#ff8c00",
  darkorchid: "#9932cc",
  darkred: "#8b0000",
  darksalmon: "#e9967a",
  darkseagreen: "#8fbc8f",
  darkslateblue: "#483d8b",
  darkslategray: "#2f4f4f",
  darkslategrey: "#2f4f4f",
  darkturquoise: "#00ced1",
  darkviolet: "#9400d3",
  deeppink: "#ff1493",
  deepskyblue: "#00bfff",
  dimgray: "#696969",
  dimgrey: "#696969",
  dodgerblue: "#1e90ff",
  firebrick: "#b22222",
  floralwhite: "#fffaf0",
  forestgreen: "#228b22",
  fuchsia: "#ff00ff",
  gainsboro: "#dcdcdc",
  ghostwhite: "#f8f8ff",
  gold: "#ffd700",
  goldenrod: "#daa520",
  gray: "#808080",
  green: "#008000",
  greenyellow: "#adff2f",
  grey: "#808080",
  honeydew: "#f0fff0",
  hotpink: "#ff69b4",
  indianred: "#cd5c5c",
  indigo: "#4b0082",
  ivory: "#fffff0",
  khaki: "#f0e68c",
  lavender: "#e6e6fa",
  lavenderblush: "#fff0f5",
  lawngreen: "#7cfc00",
  lemonchiffon: "#fffacd",
  lightblue: "#add8e6",
  lightcoral: "#f08080",
  lightcyan: "#e0ffff",
  lightgoldenrodyellow: "#fafad2",
  lightgray: "#d3d3d3",
  lightgreen: "#90ee90",
  lightgrey: "#d3d3d3",
  lightpink: "#ffb6c1",
  lightsalmon: "#ffa07a",
  lightseagreen: "#20b2aa",
  lightskyblue: "#87cefa",
  lightslategray: "#778899",
  lightslategrey: "#778899",
  lightsteelblue: "#b0c4de",
  lightyellow: "#ffffe0",
  lime: "#00ff00",
  limegreen: "#32cd32",
  linen: "#faf0e6",
  magenta: "#ff00ff",
  maroon: "#800000",
  mediumaquamarine: "#66cdaa",
  mediumblue: "#0000cd",
  mediumorchid: "#ba55d3",
  mediumpurple: "#9370db",
  mediumseagreen: "#3cb371",
  mediumslateblue: "#7b68ee",
  mediumspringgreen: "#00fa9a",
  mediumturquoise: "#48d1cc",
  mediumvioletred: "#c71585",
  midnightblue: "#191970",
  mintcream: "#f5fffa",
  mistyrose: "#ffe4e1",
  moccasin: "#ffe4b5",
  navajowhite: "#ffdead",
  navy: "#000080",
  oldlace: "#fdf5e6",
  olive: "#808000",
  olivedrab: "#6b8e23",
  orange: "#ffa500",
  orangered: "#ff4500",
  orchid: "#da70d6",
  palegoldenrod: "#eee8aa",
  palegreen: "#98fb98",
  paleturquoise: "#afeeee",
  palevioletred: "#db7093",
  papayawhip: "#ffefd5",
  peachpuff: "#ffdab9",
  peru: "#cd853f",
  pink: "#ffc0cb",
  plum: "#dda0dd",
  powderblue: "#b0e0e6",
  purple: "#800080",
  red: "#ff0000",
  rosybrown: "#bc8f8f",
  royalblue: "#4169e1",
  saddlebrown: "#8b4513",
  salmon: "#fa8072",
  sandybrown: "#f4a460",
  seagreen: "#2e8b57",
  seashell: "#fff5ee",
  sienna: "#a0522d",
  silver: "#c0c0c0",
  skyblue: "#87ceeb",
  slateblue: "#6a5acd",
  slategray: "#708090",
  slategrey: "#708090",
  snow: "#fffafa",
  springgreen: "#00ff7f",
  steelblue: "#4682b4",
  tan: "#d2b48c",
  teal: "#008080",
  thistle: "#d8bfd8",
  tomato: "#ff6347",
  turquoise: "#40e0d0",
  violet: "#ee82ee",
  wheat: "#f5deb3",
  white: "#ffffff",
  whitesmoke: "#f5f5f5",
  yellow: "#ffff00",
  yellowgreen: "#9acd32"
});

d3_rgb_names.forEach(function(key, value) {
  d3_rgb_names.set(key, d3_rgb_parse(value, d3_rgb, d3_hsl_rgb));
});
d3.hsl = function(h, s, l) {
  return arguments.length === 1
      ? (h instanceof d3_Hsl ? d3_hsl(h.h, h.s, h.l)
      : d3_rgb_parse("" + h, d3_rgb_hsl, d3_hsl))
      : d3_hsl(+h, +s, +l);
};

function d3_hsl(h, s, l) {
  return new d3_Hsl(h, s, l);
}

function d3_Hsl(h, s, l) {
  this.h = h;
  this.s = s;
  this.l = l;
}

d3_Hsl.prototype.brighter = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, this.l / k);
};

d3_Hsl.prototype.darker = function(k) {
  k = Math.pow(0.7, arguments.length ? k : 1);
  return d3_hsl(this.h, this.s, k * this.l);
};

d3_Hsl.prototype.rgb = function() {
  return d3_hsl_rgb(this.h, this.s, this.l);
};

d3_Hsl.prototype.toString = function() {
  return this.rgb().toString();
};

function d3_hsl_rgb(h, s, l) {
  var m1,
      m2;

  /* Some simple corrections for h, s and l. */
  h = h % 360; if (h < 0) h += 360;
  s = s < 0 ? 0 : s > 1 ? 1 : s;
  l = l < 0 ? 0 : l > 1 ? 1 : l;

  /* From FvD 13.37, CSS Color Module Level 3 */
  m2 = l <= .5 ? l * (1 + s) : l + s - l * s;
  m1 = 2 * l - m2;

  function v(h) {
    if (h > 360) h -= 360;
    else if (h < 0) h += 360;
    if (h < 60) return m1 + (m2 - m1) * h / 60;
    if (h < 180) return m2;
    if (h < 240) return m1 + (m2 - m1) * (240 - h) / 60;
    return m1;
  }

  function vv(h) {
    return Math.round(v(h) * 255);
  }

  return d3_rgb(vv(h + 120), vv(h), vv(h - 120));
}
function d3_noop() {}
;d3.csv = function(url, callback) {
  d3.text(url, "text/csv", function(text) {
    callback(text && d3.csv.parse(text));
  });
};
d3.csv.parse = function(text) {
  var header;
  return d3.csv.parseRows(text, function(row, i) {
    if (i) {
      var o = {}, j = -1, m = header.length;
      while (++j < m) o[header[j]] = j < row.length ? row[j] : null;
      return o;
    } else {
      header = row;
      return null;
    }
  });
};

d3.csv.parseRows = function(text, f) {
  var EOL = {}, // sentinel value for end-of-line
      EOF = {}, // sentinel value for end-of-file
      rows = [], // output rows
      re = /\r\n|[,\r\n]/g, // field separator regex
      n = 0, // the current line number
      t, // the current token
      eol; // is the current token followed by EOL?

  re.lastIndex = 0; // work-around bug in FF 3.6

  /** @private Returns the next token. */
  function token() {
    if (re.lastIndex >= text.length) return EOF; // special case: end of file
    if (eol) { eol = false; return EOL; } // special case: end of line

    // special case: quotes
    var j = re.lastIndex;
    if (text.charCodeAt(j) === 34) {
      var i = j;
      while (i++ < text.length) {
        if (text.charCodeAt(i) === 34) {
          if (text.charCodeAt(i + 1) !== 34) break;
          i++;
        }
      }
      re.lastIndex = i + 2;
      var c = text.charCodeAt(i + 1);
      if (c === 13) {
        eol = true;
        if (text.charCodeAt(i + 2) === 10) re.lastIndex++;
      } else if (c === 10) {
        eol = true;
      }
      return text.substring(j + 1, i).replace(/""/g, "\"");
    }

    // common case
    var m = re.exec(text);
    if (m) {
      eol = m[0].charCodeAt(0) !== 44;
      return text.substring(j, m.index);
    }
    re.lastIndex = text.length;
    return text.substring(j);
  }

  while ((t = token()) !== EOF) {
    var a = [];
    while ((t !== EOL) && (t !== EOF)) {
      a.push(t);
      t = token();
    }
    if (f && !(a = f(a, n++))) continue;
    rows.push(a);
  }

  return rows;
};
d3.csv.format = function(rows) {
  return rows.map(d3_csv_formatRow).join("\n");
};

function d3_csv_formatRow(row) {
  return row.map(d3_csv_formatValue).join(",");
}

function d3_csv_formatValue(text) {
  return /[",\n]/.test(text)
      ? "\"" + text.replace(/\"/g, "\"\"") + "\""
      : text;
}
;d3.scale = {};

function d3_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_scaleRange(scale) {
  return scale.rangeExtent ? scale.rangeExtent() : d3_scaleExtent(scale.range());
}
function d3_scale_nice(domain, nice) {
  var i0 = 0,
      i1 = domain.length - 1,
      x0 = domain[i0],
      x1 = domain[i1],
      dx;

  if (x1 < x0) {
    dx = i0; i0 = i1; i1 = dx;
    dx = x0; x0 = x1; x1 = dx;
  }

  if (dx = x1 - x0) {
    nice = nice(dx);
    domain[i0] = nice.floor(x0);
    domain[i1] = nice.ceil(x1);
  }

  return domain;
}

function d3_scale_niceDefault() {
  return Math;
}
d3.scale.linear = function() {
  return d3_scale_linear([0, 1], [0, 1], d3.interpolate, false);
};

function d3_scale_linear(domain, range, interpolate, clamp) {
  var output,
      input;

  function rescale() {
    var linear = Math.min(domain.length, range.length) > 2 ? d3_scale_polylinear : d3_scale_bilinear,
        uninterpolate = clamp ? d3_uninterpolateClamp : d3_uninterpolateNumber;
    output = linear(domain, range, uninterpolate, interpolate);
    input = linear(range, domain, uninterpolate, d3.interpolate);
    return scale;
  }

  function scale(x) {
    return output(x);
  }

  // Note: requires range is coercible to number!
  scale.invert = function(y) {
    return input(y);
  };

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(Number);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.rangeRound = function(x) {
    return scale.range(x).interpolate(d3.interpolateRound);
  };

  scale.clamp = function(x) {
    if (!arguments.length) return clamp;
    clamp = x;
    return rescale();
  };

  scale.interpolate = function(x) {
    if (!arguments.length) return interpolate;
    interpolate = x;
    return rescale();
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  scale.nice = function() {
    d3_scale_nice(domain, d3_scale_linearNice);
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_linear(domain, range, interpolate, clamp);
  };

  return rescale();
}

function d3_scale_linearRebind(scale, linear) {
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

function d3_scale_linearNice(dx) {
  dx = Math.pow(10, Math.round(Math.log(dx) / Math.LN10) - 1);
  return {
    floor: function(x) { return Math.floor(x / dx) * dx; },
    ceil: function(x) { return Math.ceil(x / dx) * dx; }
  };
}

function d3_scale_linearTickRange(domain, m) {
  var extent = d3_scaleExtent(domain),
      span = extent[1] - extent[0],
      step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10)),
      err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  extent[0] = Math.ceil(extent[0] / step) * step;
  extent[1] = Math.floor(extent[1] / step) * step + step * .5; // inclusive
  extent[2] = step;
  return extent;
}

function d3_scale_linearTicks(domain, m) {
  return d3.range.apply(d3, d3_scale_linearTickRange(domain, m));
}

function d3_scale_linearTickFormat(domain, m) {
  return d3.format(",." + Math.max(0, -Math.floor(Math.log(d3_scale_linearTickRange(domain, m)[2]) / Math.LN10 + .01)) + "f");
}
function d3_scale_bilinear(domain, range, uninterpolate, interpolate) {
  var u = uninterpolate(domain[0], domain[1]),
      i = interpolate(range[0], range[1]);
  return function(x) {
    return i(u(x));
  };
}
function d3_scale_polylinear(domain, range, uninterpolate, interpolate) {
  var u = [],
      i = [],
      j = 0,
      k = Math.min(domain.length, range.length) - 1;

  // Handle descending domains.
  if (domain[k] < domain[0]) {
    domain = domain.slice().reverse();
    range = range.slice().reverse();
  }

  while (++j <= k) {
    u.push(uninterpolate(domain[j - 1], domain[j]));
    i.push(interpolate(range[j - 1], range[j]));
  }

  return function(x) {
    var j = d3.bisect(domain, x, 1, k) - 1;
    return i[j](u[j](x));
  };
}
d3.scale.log = function() {
  return d3_scale_log(d3.scale.linear(), d3_scale_logp);
};

function d3_scale_log(linear, log) {
  var pow = log.pow;

  function scale(x) {
    return linear(log(x));
  }

  scale.invert = function(x) {
    return pow(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(pow);
    log = x[0] < 0 ? d3_scale_logn : d3_scale_logp;
    pow = log.pow;
    linear.domain(x.map(log));
    return scale;
  };

  scale.nice = function() {
    linear.domain(d3_scale_nice(linear.domain(), d3_scale_niceDefault));
    return scale;
  };

  scale.ticks = function() {
    var extent = d3_scaleExtent(linear.domain()),
        ticks = [];
    if (extent.every(isFinite)) {
      var i = Math.floor(extent[0]),
          j = Math.ceil(extent[1]),
          u = pow(extent[0]),
          v = pow(extent[1]);
      if (log === d3_scale_logn) {
        ticks.push(pow(i));
        for (; i++ < j;) for (var k = 9; k > 0; k--) ticks.push(pow(i) * k);
      } else {
        for (; i < j; i++) for (var k = 1; k < 10; k++) ticks.push(pow(i) * k);
        ticks.push(pow(i));
      }
      for (i = 0; ticks[i] < u; i++) {} // strip small values
      for (j = ticks.length; ticks[j - 1] > v; j--) {} // strip big values
      ticks = ticks.slice(i, j);
    }
    return ticks;
  };

  scale.tickFormat = function(n, format) {
    if (arguments.length < 2) format = d3_scale_logFormat;
    if (arguments.length < 1) return format;
    var k = n / scale.ticks().length,
        f = log === d3_scale_logn ? (e = -1e-12, Math.floor) : (e = 1e-12, Math.ceil),
        e;
    return function(d) {
      return d / pow(f(log(d) + e)) < k ? format(d) : "";
    };
  };

  scale.copy = function() {
    return d3_scale_log(linear.copy(), log);
  };

  return d3_scale_linearRebind(scale, linear);
}

var d3_scale_logFormat = d3.format(".0e");

function d3_scale_logp(x) {
  return Math.log(x < 0 ? 0 : x) / Math.LN10;
}

function d3_scale_logn(x) {
  return -Math.log(x > 0 ? 0 : -x) / Math.LN10;
}

d3_scale_logp.pow = function(x) {
  return Math.pow(10, x);
};

d3_scale_logn.pow = function(x) {
  return -Math.pow(10, -x);
};
d3.scale.pow = function() {
  return d3_scale_pow(d3.scale.linear(), 1);
};

function d3_scale_pow(linear, exponent) {
  var powp = d3_scale_powPow(exponent),
      powb = d3_scale_powPow(1 / exponent);

  function scale(x) {
    return linear(powp(x));
  }

  scale.invert = function(x) {
    return powb(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(powb);
    linear.domain(x.map(powp));
    return scale;
  };

  scale.ticks = function(m) {
    return d3_scale_linearTicks(scale.domain(), m);
  };

  scale.tickFormat = function(m) {
    return d3_scale_linearTickFormat(scale.domain(), m);
  };

  scale.nice = function() {
    return scale.domain(d3_scale_nice(scale.domain(), d3_scale_linearNice));
  };

  scale.exponent = function(x) {
    if (!arguments.length) return exponent;
    var domain = scale.domain();
    powp = d3_scale_powPow(exponent = x);
    powb = d3_scale_powPow(1 / exponent);
    return scale.domain(domain);
  };

  scale.copy = function() {
    return d3_scale_pow(linear.copy(), exponent);
  };

  return d3_scale_linearRebind(scale, linear);
}

function d3_scale_powPow(e) {
  return function(x) {
    return x < 0 ? -Math.pow(-x, e) : Math.pow(x, e);
  };
}
d3.scale.sqrt = function() {
  return d3.scale.pow().exponent(.5);
};
d3.scale.ordinal = function() {
  return d3_scale_ordinal([], {t: "range", x: []});
};

function d3_scale_ordinal(domain, ranger) {
  var index,
      range,
      rangeBand;

  function scale(x) {
    return range[((index.get(x) || index.set(x, domain.push(x))) - 1) % range.length];
  }

  function steps(start, step) {
    return d3.range(domain.length).map(function(i) { return start + step * i; });
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = [];
    index = new d3_Map;
    var i = -1, n = x.length, xi;
    while (++i < n) if (!index.has(xi = x[i])) index.set(xi, domain.push(xi));
    return scale[ranger.t](ranger.x, ranger.p);
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    rangeBand = 0;
    ranger = {t: "range", x: x};
    return scale;
  };

  scale.rangePoints = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var start = x[0],
        stop = x[1],
        step = (stop - start) / (domain.length - 1 + padding);
    range = steps(domain.length < 2 ? (start + stop) / 2 : start + step * padding / 2, step);
    rangeBand = 0;
    ranger = {t: "rangePoints", x: x, p: padding};
    return scale;
  };

  scale.rangeBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = (stop - start) / (domain.length + padding);
    range = steps(start + step * padding, step);
    if (reverse) range.reverse();
    rangeBand = step * (1 - padding);
    ranger = {t: "rangeBands", x: x, p: padding};
    return scale;
  };

  scale.rangeRoundBands = function(x, padding) {
    if (arguments.length < 2) padding = 0;
    var reverse = x[1] < x[0],
        start = x[reverse - 0],
        stop = x[1 - reverse],
        step = Math.floor((stop - start) / (domain.length + padding)),
        error = stop - start - (domain.length - padding) * step;
    range = steps(start + Math.round(error / 2), step);
    if (reverse) range.reverse();
    rangeBand = Math.round(step * (1 - padding));
    ranger = {t: "rangeRoundBands", x: x, p: padding};
    return scale;
  };

  scale.rangeBand = function() {
    return rangeBand;
  };

  scale.rangeExtent = function() {
    return d3_scaleExtent(ranger.x);
  };

  scale.copy = function() {
    return d3_scale_ordinal(domain, ranger);
  };

  return scale.domain(domain);
}
/*
 * This product includes color specifications and designs developed by Cynthia
 * Brewer (http://colorbrewer.org/). See lib/colorbrewer for more information.
 */

d3.scale.category10 = function() {
  return d3.scale.ordinal().range(d3_category10);
};

d3.scale.category20 = function() {
  return d3.scale.ordinal().range(d3_category20);
};

d3.scale.category20b = function() {
  return d3.scale.ordinal().range(d3_category20b);
};

d3.scale.category20c = function() {
  return d3.scale.ordinal().range(d3_category20c);
};

var d3_category10 = [
  "#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd",
  "#8c564b", "#e377c2", "#7f7f7f", "#bcbd22", "#17becf"
];

var d3_category20 = [
  "#1f77b4", "#aec7e8",
  "#ff7f0e", "#ffbb78",
  "#2ca02c", "#98df8a",
  "#d62728", "#ff9896",
  "#9467bd", "#c5b0d5",
  "#8c564b", "#c49c94",
  "#e377c2", "#f7b6d2",
  "#7f7f7f", "#c7c7c7",
  "#bcbd22", "#dbdb8d",
  "#17becf", "#9edae5"
];

var d3_category20b = [
  "#393b79", "#5254a3", "#6b6ecf", "#9c9ede",
  "#637939", "#8ca252", "#b5cf6b", "#cedb9c",
  "#8c6d31", "#bd9e39", "#e7ba52", "#e7cb94",
  "#843c39", "#ad494a", "#d6616b", "#e7969c",
  "#7b4173", "#a55194", "#ce6dbd", "#de9ed6"
];

var d3_category20c = [
  "#3182bd", "#6baed6", "#9ecae1", "#c6dbef",
  "#e6550d", "#fd8d3c", "#fdae6b", "#fdd0a2",
  "#31a354", "#74c476", "#a1d99b", "#c7e9c0",
  "#756bb1", "#9e9ac8", "#bcbddc", "#dadaeb",
  "#636363", "#969696", "#bdbdbd", "#d9d9d9"
];
d3.scale.quantile = function() {
  return d3_scale_quantile([], []);
};

function d3_scale_quantile(domain, range) {
  var thresholds;

  function rescale() {
    var k = 0,
        n = domain.length,
        q = range.length;
    thresholds = [];
    while (++k < q) thresholds[k - 1] = d3.quantile(domain, k / q);
    return scale;
  }

  function scale(x) {
    if (isNaN(x = +x)) return NaN;
    return range[d3.bisect(thresholds, x)];
  }

  scale.domain = function(x) {
    if (!arguments.length) return domain;
    domain = x.filter(function(d) { return !isNaN(d); }).sort(d3.ascending);
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.quantiles = function() {
    return thresholds;
  };

  scale.copy = function() {
    return d3_scale_quantile(domain, range); // copy on write!
  };

  return rescale();
}
d3.scale.quantize = function() {
  return d3_scale_quantize(0, 1, [0, 1]);
};

function d3_scale_quantize(x0, x1, range) {
  var kx, i;

  function scale(x) {
    return range[Math.max(0, Math.min(i, Math.floor(kx * (x - x0))))];
  }

  function rescale() {
    kx = range.length / (x1 - x0);
    i = range.length - 1;
    return scale;
  }

  scale.domain = function(x) {
    if (!arguments.length) return [x0, x1];
    x0 = +x[0];
    x1 = +x[x.length - 1];
    return rescale();
  };

  scale.range = function(x) {
    if (!arguments.length) return range;
    range = x;
    return rescale();
  };

  scale.copy = function() {
    return d3_scale_quantize(x0, x1, range); // copy on write
  };

  return rescale();
}
d3.scale.identity = function() {
  return d3_scale_identity([0, 1]);
};

function d3_scale_identity(domain) {

  function identity(x) { return +x; }

  identity.invert = identity;

  identity.domain = identity.range = function(x) {
    if (!arguments.length) return domain;
    domain = x.map(identity);
    return identity;
  };

  identity.ticks = function(m) {
    return d3_scale_linearTicks(domain, m);
  };

  identity.tickFormat = function(m) {
    return d3_scale_linearTickFormat(domain, m);
  };

  identity.copy = function() {
    return d3_scale_identity(domain);
  };

  return identity;
}
;d3.time = {};

var d3_time = Date;

function d3_time_utc() {
  this._ = new Date(arguments.length > 1
      ? Date.UTC.apply(this, arguments)
      : arguments[0]);
}

d3_time_utc.prototype = {
  getDate: function() { return this._.getUTCDate(); },
  getDay: function() { return this._.getUTCDay(); },
  getFullYear: function() { return this._.getUTCFullYear(); },
  getHours: function() { return this._.getUTCHours(); },
  getMilliseconds: function() { return this._.getUTCMilliseconds(); },
  getMinutes: function() { return this._.getUTCMinutes(); },
  getMonth: function() { return this._.getUTCMonth(); },
  getSeconds: function() { return this._.getUTCSeconds(); },
  getTime: function() { return this._.getTime(); },
  getTimezoneOffset: function() { return 0; },
  valueOf: function() { return this._.valueOf(); },
  setDate: function() { d3_time_prototype.setUTCDate.apply(this._, arguments); },
  setDay: function() { d3_time_prototype.setUTCDay.apply(this._, arguments); },
  setFullYear: function() { d3_time_prototype.setUTCFullYear.apply(this._, arguments); },
  setHours: function() { d3_time_prototype.setUTCHours.apply(this._, arguments); },
  setMilliseconds: function() { d3_time_prototype.setUTCMilliseconds.apply(this._, arguments); },
  setMinutes: function() { d3_time_prototype.setUTCMinutes.apply(this._, arguments); },
  setMonth: function() { d3_time_prototype.setUTCMonth.apply(this._, arguments); },
  setSeconds: function() { d3_time_prototype.setUTCSeconds.apply(this._, arguments); },
  setTime: function() { d3_time_prototype.setTime.apply(this._, arguments); }
};

var d3_time_prototype = Date.prototype;
d3.time.format = function(template) {
  var n = template.length;

  function format(date) {
    var string = [],
        i = -1,
        j = 0,
        c,
        f;
    while (++i < n) {
      if (template.charCodeAt(i) == 37) {
        string.push(
            template.substring(j, i),
            (f = d3_time_formats[c = template.charAt(++i)])
            ? f(date) : c);
        j = i + 1;
      }
    }
    string.push(template.substring(j, i));
    return string.join("");
  }

  format.parse = function(string) {
    var d = {y: 1900, m: 0, d: 1, H: 0, M: 0, S: 0, L: 0},
        i = d3_time_parse(d, template, string, 0);
    if (i != string.length) return null;

    // The am-pm flag is 0 for AM, and 1 for PM.
    if ("p" in d) d.H = d.H % 12 + d.p * 12;

    var date = new d3_time();
    date.setFullYear(d.y, d.m, d.d);
    date.setHours(d.H, d.M, d.S, d.L);
    return date;
  };

  format.toString = function() {
    return template;
  };

  return format;
};

function d3_time_parse(date, template, string, j) {
  var c,
      p,
      i = 0,
      n = template.length,
      m = string.length;
  while (i < n) {
    if (j >= m) return -1;
    c = template.charCodeAt(i++);
    if (c == 37) {
      p = d3_time_parsers[template.charAt(i++)];
      if (!p || ((j = p(date, string, j)) < 0)) return -1;
    } else if (c != string.charCodeAt(j++)) {
      return -1;
    }
  }
  return j;
}

var d3_time_zfill2 = d3.format("02d"),
    d3_time_zfill3 = d3.format("03d"),
    d3_time_zfill4 = d3.format("04d"),
    d3_time_sfill2 = d3.format("2d");

var d3_time_formats = {
  a: function(d) { return d3_time_weekdays[d.getDay()].substring(0, 3); },
  A: function(d) { return d3_time_weekdays[d.getDay()]; },
  b: function(d) { return d3_time_months[d.getMonth()].substring(0, 3); },
  B: function(d) { return d3_time_months[d.getMonth()]; },
  c: d3.time.format("%a %b %e %H:%M:%S %Y"),
  d: function(d) { return d3_time_zfill2(d.getDate()); },
  e: function(d) { return d3_time_sfill2(d.getDate()); },
  H: function(d) { return d3_time_zfill2(d.getHours()); },
  I: function(d) { return d3_time_zfill2(d.getHours() % 12 || 12); },
  j: function(d) { return d3_time_zfill3(1 + d3.time.dayOfYear(d)); },
  L: function(d) { return d3_time_zfill3(d.getMilliseconds()); },
  m: function(d) { return d3_time_zfill2(d.getMonth() + 1); },
  M: function(d) { return d3_time_zfill2(d.getMinutes()); },
  p: function(d) { return d.getHours() >= 12 ? "PM" : "AM"; },
  S: function(d) { return d3_time_zfill2(d.getSeconds()); },
  U: function(d) { return d3_time_zfill2(d3.time.sundayOfYear(d)); },
  w: function(d) { return d.getDay(); },
  W: function(d) { return d3_time_zfill2(d3.time.mondayOfYear(d)); },
  x: d3.time.format("%m/%d/%y"),
  X: d3.time.format("%H:%M:%S"),
  y: function(d) { return d3_time_zfill2(d.getFullYear() % 100); },
  Y: function(d) { return d3_time_zfill4(d.getFullYear() % 10000); },
  Z: d3_time_zone,
  "%": function(d) { return "%"; }
};

var d3_time_parsers = {
  a: d3_time_parseWeekdayAbbrev,
  A: d3_time_parseWeekday,
  b: d3_time_parseMonthAbbrev,
  B: d3_time_parseMonth,
  c: d3_time_parseLocaleFull,
  d: d3_time_parseDay,
  e: d3_time_parseDay,
  H: d3_time_parseHour24,
  I: d3_time_parseHour24,
  // j: function(d, s, i) { /*TODO day of year [001,366] */ return i; },
  L: d3_time_parseMilliseconds,
  m: d3_time_parseMonthNumber,
  M: d3_time_parseMinutes,
  p: d3_time_parseAmPm,
  S: d3_time_parseSeconds,
  // U: function(d, s, i) { /*TODO week number (sunday) [00,53] */ return i; },
  // w: function(d, s, i) { /*TODO weekday [0,6] */ return i; },
  // W: function(d, s, i) { /*TODO week number (monday) [00,53] */ return i; },
  x: d3_time_parseLocaleDate,
  X: d3_time_parseLocaleTime,
  y: d3_time_parseYear,
  Y: d3_time_parseFullYear
  // ,
  // Z: function(d, s, i) { /*TODO time zone */ return i; },
  // "%": function(d, s, i) { /*TODO literal % */ return i; }
};

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekdayAbbrev(date, string, i) {
  return d3_time_weekdayAbbrevRe.test(string.substring(i, i += 3)) ? i : -1;
}

// Note: weekday is validated, but does not set the date.
function d3_time_parseWeekday(date, string, i) {
  d3_time_weekdayRe.lastIndex = 0;
  var n = d3_time_weekdayRe.exec(string.substring(i, i + 10));
  return n ? i += n[0].length : -1;
}

var d3_time_weekdayAbbrevRe = /^(?:sun|mon|tue|wed|thu|fri|sat)/i,
    d3_time_weekdayRe = /^(?:Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)/i;
    d3_time_weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function d3_time_parseMonthAbbrev(date, string, i) {
  var n = d3_time_monthAbbrevLookup.get(string.substring(i, i += 3).toLowerCase());
  return n == null ? -1 : (date.m = n, i);
}

var d3_time_monthAbbrevLookup = d3.map({
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11
});

function d3_time_parseMonth(date, string, i) {
  d3_time_monthRe.lastIndex = 0;
  var n = d3_time_monthRe.exec(string.substring(i, i + 12));
  return n ? (date.m = d3_time_monthLookup.get(n[0].toLowerCase()), i += n[0].length) : -1;
}

var d3_time_monthRe = /^(?:January|February|March|April|May|June|July|August|September|October|November|December)/ig;

var d3_time_monthLookup = d3.map({
  january: 0,
  february: 1,
  march: 2,
  april: 3,
  may: 4,
  june: 5,
  july: 6,
  august: 7,
  september: 8,
  october: 9,
  november: 10,
  december: 11
});

var d3_time_months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December"
];

function d3_time_parseLocaleFull(date, string, i) {
  return d3_time_parse(date, d3_time_formats.c.toString(), string, i);
}

function d3_time_parseLocaleDate(date, string, i) {
  return d3_time_parse(date, d3_time_formats.x.toString(), string, i);
}

function d3_time_parseLocaleTime(date, string, i) {
  return d3_time_parse(date, d3_time_formats.X.toString(), string, i);
}

function d3_time_parseFullYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 4));
  return n ? (date.y = +n[0], i += n[0].length) : -1;
}

function d3_time_parseYear(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.y = d3_time_century() + +n[0], i += n[0].length) : -1;
}

function d3_time_century() {
  return ~~(new Date().getFullYear() / 1000) * 1000;
}

function d3_time_parseMonthNumber(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.m = n[0] - 1, i += n[0].length) : -1;
}

function d3_time_parseDay(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.d = +n[0], i += n[0].length) : -1;
}

// Note: we don't validate that the hour is in the range [0,23] or [1,12].
function d3_time_parseHour24(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.H = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMinutes(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.M = +n[0], i += n[0].length) : -1;
}

function d3_time_parseSeconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 2));
  return n ? (date.S = +n[0], i += n[0].length) : -1;
}

function d3_time_parseMilliseconds(date, string, i) {
  d3_time_numberRe.lastIndex = 0;
  var n = d3_time_numberRe.exec(string.substring(i, i + 3));
  return n ? (date.L = +n[0], i += n[0].length) : -1;
}

// Note: we don't look at the next directive.
var d3_time_numberRe = /\s*\d+/;

function d3_time_parseAmPm(date, string, i) {
  var n = d3_time_amPmLookup.get(string.substring(i, i += 2).toLowerCase());
  return n == null ? -1 : (date.p = n, i);
}

var d3_time_amPmLookup = d3.map({
  am: 0,
  pm: 1
});

// TODO table of time zone offset names?
function d3_time_zone(d) {
  var z = d.getTimezoneOffset(),
      zs = z > 0 ? "-" : "+",
      zh = ~~(Math.abs(z) / 60),
      zm = Math.abs(z) % 60;
  return zs + d3_time_zfill2(zh) + d3_time_zfill2(zm);
}
d3.time.format.utc = function(template) {
  var local = d3.time.format(template);

  function format(date) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time();
      utc._ = date;
      return local(utc);
    } finally {
      d3_time = Date;
    }
  }

  format.parse = function(string) {
    try {
      d3_time = d3_time_utc;
      var date = local.parse(string);
      return date && date._;
    } finally {
      d3_time = Date;
    }
  };

  format.toString = local.toString;

  return format;
};
var d3_time_formatIso = d3.time.format.utc("%Y-%m-%dT%H:%M:%S.%LZ");

d3.time.format.iso = Date.prototype.toISOString ? d3_time_formatIsoNative : d3_time_formatIso;

function d3_time_formatIsoNative(date) {
  return date.toISOString();
}

d3_time_formatIsoNative.parse = function(string) {
  return new Date(string);
};

d3_time_formatIsoNative.toString = d3_time_formatIso.toString;
function d3_time_interval(local, step, number) {

  function round(date) {
    var d0 = local(date), d1 = offset(d0, 1);
    return date - d0 < d1 - date ? d0 : d1;
  }

  function ceil(date) {
    step(date = local(new d3_time(date - 1)), 1);
    return date;
  }

  function offset(date, k) {
    step(date = new d3_time(+date), k);
    return date;
  }

  function range(t0, t1, dt) {
    var time = ceil(t0), times = [];
    if (dt > 1) {
      while (time < t1) {
        if (!(number(time) % dt)) times.push(new Date(+time));
        step(time, 1);
      }
    } else {
      while (time < t1) times.push(new Date(+time)), step(time, 1);
    }
    return times;
  }

  function range_utc(t0, t1, dt) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = t0;
      return range(utc, t1, dt);
    } finally {
      d3_time = Date;
    }
  }

  local.floor = local;
  local.round = round;
  local.ceil = ceil;
  local.offset = offset;
  local.range = range;

  var utc = local.utc = d3_time_interval_utc(local);
  utc.floor = utc;
  utc.round = d3_time_interval_utc(round);
  utc.ceil = d3_time_interval_utc(ceil);
  utc.offset = d3_time_interval_utc(offset);
  utc.range = range_utc;

  return local;
}

function d3_time_interval_utc(method) {
  return function(date, k) {
    try {
      d3_time = d3_time_utc;
      var utc = new d3_time_utc();
      utc._ = date;
      return method(utc, k)._;
    } finally {
      d3_time = Date;
    }
  };
}
d3.time.second = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 1e3) * 1e3);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 1e3); // DST breaks setSeconds
}, function(date) {
  return date.getSeconds();
});

d3.time.seconds = d3.time.second.range;
d3.time.seconds.utc = d3.time.second.utc.range;
d3.time.minute = d3_time_interval(function(date) {
  return new d3_time(Math.floor(date / 6e4) * 6e4);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 6e4); // DST breaks setMinutes
}, function(date) {
  return date.getMinutes();
});

d3.time.minutes = d3.time.minute.range;
d3.time.minutes.utc = d3.time.minute.utc.range;
d3.time.hour = d3_time_interval(function(date) {
  var timezone = date.getTimezoneOffset() / 60;
  return new d3_time((Math.floor(date / 36e5 - timezone) + timezone) * 36e5);
}, function(date, offset) {
  date.setTime(date.getTime() + Math.floor(offset) * 36e5); // DST breaks setHours
}, function(date) {
  return date.getHours();
});

d3.time.hours = d3.time.hour.range;
d3.time.hours.utc = d3.time.hour.utc.range;
d3.time.day = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), date.getDate());
}, function(date, offset) {
  date.setDate(date.getDate() + offset);
}, function(date) {
  return date.getDate() - 1;
});

d3.time.days = d3.time.day.range;
d3.time.days.utc = d3.time.day.utc.range;

d3.time.dayOfYear = function(date) {
  var year = d3.time.year(date);
  return Math.floor((date - year) / 864e5 - (date.getTimezoneOffset() - year.getTimezoneOffset()) / 1440);
};
d3_array_forEach(d3_time_weekdays, function(day, i) {
  day = day.toLowerCase();
  i = 7 - i;

  var interval = d3.time[day] = d3_time_interval(function(date) {
    (date = d3.time.day(date)).setDate(date.getDate() - (date.getDay() + i) % 7);
    return date;
  }, function(date, offset) {
    date.setDate(date.getDate() + Math.floor(offset) * 7);
  }, function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7) - (day !== i);
  });

  d3.time[day + "s"] = interval.range;
  d3.time[day + "s"].utc = interval.utc.range;

  d3.time[day + "OfYear"] = function(date) {
    var day = d3.time.year(date).getDay();
    return Math.floor((d3.time.dayOfYear(date) + (day + i) % 7) / 7);
  };
});

d3.time.week = d3.time.sunday;
d3.time.weeks = d3.time.sunday.range;
d3.time.weeks.utc = d3.time.sunday.utc.range;
d3.time.weekOfYear = d3.time.sundayOfYear;
d3.time.month = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), date.getMonth(), 1);
}, function(date, offset) {
  date.setMonth(date.getMonth() + offset);
}, function(date) {
  return date.getMonth();
});

d3.time.months = d3.time.month.range;
d3.time.months.utc = d3.time.month.utc.range;
d3.time.year = d3_time_interval(function(date) {
  return new d3_time(date.getFullYear(), 0, 1);
}, function(date, offset) {
  date.setFullYear(date.getFullYear() + offset);
}, function(date) {
  return date.getFullYear();
});

d3.time.years = d3.time.year.range;
d3.time.years.utc = d3.time.year.utc.range;
function d3_time_scale(linear, methods, format) {

  function scale(x) {
    return linear(x);
  }

  scale.invert = function(x) {
    return d3_time_scaleDate(linear.invert(x));
  };

  scale.domain = function(x) {
    if (!arguments.length) return linear.domain().map(d3_time_scaleDate);
    linear.domain(x);
    return scale;
  };

  scale.nice = function(m) {
    var extent = d3_time_scaleExtent(scale.domain());
    return scale.domain([m.floor(extent[0]), m.ceil(extent[1])]);
  };

  scale.ticks = function(m, k) {
    var extent = d3_time_scaleExtent(scale.domain());
    if (typeof m !== "function") {
      var span = extent[1] - extent[0],
          target = span / m,
          i = d3.bisect(d3_time_scaleSteps, target);
      if (i == d3_time_scaleSteps.length) return methods.year(extent, m);
      if (!i) return linear.ticks(m).map(d3_time_scaleDate);
      if (Math.log(target / d3_time_scaleSteps[i - 1]) < Math.log(d3_time_scaleSteps[i] / target)) --i;
      m = methods[i];
      k = m[1];
      m = m[0].range;
    }
    return m(extent[0], new Date(+extent[1] + 1), k); // inclusive upper bound
  };

  scale.tickFormat = function() {
    return format;
  };

  scale.copy = function() {
    return d3_time_scale(linear.copy(), methods, format);
  };

  // TOOD expose d3_scale_linear_rebind?
  return d3.rebind(scale, linear, "range", "rangeRound", "interpolate", "clamp");
}

// TODO expose d3_scaleExtent?
function d3_time_scaleExtent(domain) {
  var start = domain[0], stop = domain[domain.length - 1];
  return start < stop ? [start, stop] : [stop, start];
}

function d3_time_scaleDate(t) {
  return new Date(t);
}

function d3_time_scaleFormat(formats) {
  return function(date) {
    var i = formats.length - 1, f = formats[i];
    while (!f[1](date)) f = formats[--i];
    return f[0](date);
  };
}

function d3_time_scaleSetYear(y) {
  var d = new Date(y, 0, 1);
  d.setFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleGetYear(d) {
  var y = d.getFullYear(),
      d0 = d3_time_scaleSetYear(y),
      d1 = d3_time_scaleSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

var d3_time_scaleSteps = [
  1e3,    // 1-second
  5e3,    // 5-second
  15e3,   // 15-second
  3e4,    // 30-second
  6e4,    // 1-minute
  3e5,    // 5-minute
  9e5,    // 15-minute
  18e5,   // 30-minute
  36e5,   // 1-hour
  108e5,  // 3-hour
  216e5,  // 6-hour
  432e5,  // 12-hour
  864e5,  // 1-day
  1728e5, // 2-day
  6048e5, // 1-week
  2592e6, // 1-month
  7776e6, // 3-month
  31536e6 // 1-year
];

var d3_time_scaleLocalMethods = [
  [d3.time.second, 1],
  [d3.time.second, 5],
  [d3.time.second, 15],
  [d3.time.second, 30],
  [d3.time.minute, 1],
  [d3.time.minute, 5],
  [d3.time.minute, 15],
  [d3.time.minute, 30],
  [d3.time.hour, 1],
  [d3.time.hour, 3],
  [d3.time.hour, 6],
  [d3.time.hour, 12],
  [d3.time.day, 1],
  [d3.time.day, 2],
  [d3.time.week, 1],
  [d3.time.month, 1],
  [d3.time.month, 3],
  [d3.time.year, 1]
];

var d3_time_scaleLocalFormats = [
  [d3.time.format("%Y"), function(d) { return true; }],
  [d3.time.format("%B"), function(d) { return d.getMonth(); }],
  [d3.time.format("%b %d"), function(d) { return d.getDate() != 1; }],
  [d3.time.format("%a %d"), function(d) { return d.getDay() && d.getDate() != 1; }],
  [d3.time.format("%I %p"), function(d) { return d.getHours(); }],
  [d3.time.format("%I:%M"), function(d) { return d.getMinutes(); }],
  [d3.time.format(":%S"), function(d) { return d.getSeconds(); }],
  [d3.time.format(".%L"), function(d) { return d.getMilliseconds(); }]
];

var d3_time_scaleLinear = d3.scale.linear(),
    d3_time_scaleLocalFormat = d3_time_scaleFormat(d3_time_scaleLocalFormats);

d3_time_scaleLocalMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleGetYear)).ticks(m).map(d3_time_scaleSetYear);
};

d3.time.scale = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleLocalMethods, d3_time_scaleLocalFormat);
};
var d3_time_scaleUTCMethods = d3_array_map(d3_time_scaleLocalMethods, function(m) {
  return [m[0].utc, m[1]];
});

var d3_time_scaleUTCFormats = [
  [d3.time.format.utc("%Y"), function(d) { return true; }],
  [d3.time.format.utc("%B"), function(d) { return d.getUTCMonth(); }],
  [d3.time.format.utc("%b %d"), function(d) { return d.getUTCDate() != 1; }],
  [d3.time.format.utc("%a %d"), function(d) { return d.getUTCDay() && d.getUTCDate() != 1; }],
  [d3.time.format.utc("%I %p"), function(d) { return d.getUTCHours(); }],
  [d3.time.format.utc("%I:%M"), function(d) { return d.getUTCMinutes(); }],
  [d3.time.format.utc(":%S"), function(d) { return d.getUTCSeconds(); }],
  [d3.time.format.utc(".%L"), function(d) { return d.getUTCMilliseconds(); }]
];

var d3_time_scaleUTCFormat = d3_time_scaleFormat(d3_time_scaleUTCFormats);

function d3_time_scaleUTCSetYear(y) {
  var d = new Date(Date.UTC(y, 0, 1));
  d.setUTCFullYear(y); // Y2K fail
  return d;
}

function d3_time_scaleUTCGetYear(d) {
  var y = d.getUTCFullYear(),
      d0 = d3_time_scaleUTCSetYear(y),
      d1 = d3_time_scaleUTCSetYear(y + 1);
  return y + (d - d0) / (d1 - d0);
}

d3_time_scaleUTCMethods.year = function(extent, m) {
  return d3_time_scaleLinear.domain(extent.map(d3_time_scaleUTCGetYear)).ticks(m).map(d3_time_scaleUTCSetYear);
};

d3.time.scale.utc = function() {
  return d3_time_scale(d3.scale.linear(), d3_time_scaleUTCMethods, d3_time_scaleUTCFormat);
};
;//     Underscore.js 1.3.1
//     (c) 2009-2012 Jeremy Ashkenas, DocumentCloud Inc.
//     Underscore is freely distributable under the MIT license.
//     Portions of Underscore are inspired or borrowed from Prototype,
//     Oliver Steele's Functional, and John Resig's Micro-Templating.
//     For all details and documentation:
//     http://documentcloud.github.com/underscore

(function() {

  // Baseline setup
  // --------------

  // Establish the root object, `window` in the browser, or `global` on the server.
  var root = this;

  // Save the previous value of the `_` variable.
  var previousUnderscore = root._;

  // Establish the object that gets returned to break out of a loop iteration.
  var breaker = {};

  // Save bytes in the minified (but not gzipped) version:
  var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

  // Create quick reference variables for speed access to core prototypes.
  var slice            = ArrayProto.slice,
      unshift          = ArrayProto.unshift,
      toString         = ObjProto.toString,
      hasOwnProperty   = ObjProto.hasOwnProperty;

  // All **ECMAScript 5** native function implementations that we hope to use
  // are declared here.
  var
    nativeForEach      = ArrayProto.forEach,
    nativeMap          = ArrayProto.map,
    nativeReduce       = ArrayProto.reduce,
    nativeReduceRight  = ArrayProto.reduceRight,
    nativeFilter       = ArrayProto.filter,
    nativeEvery        = ArrayProto.every,
    nativeSome         = ArrayProto.some,
    nativeIndexOf      = ArrayProto.indexOf,
    nativeLastIndexOf  = ArrayProto.lastIndexOf,
    nativeIsArray      = Array.isArray,
    nativeKeys         = Object.keys,
    nativeBind         = FuncProto.bind;

  // Create a safe reference to the Underscore object for use below.
  var _ = function(obj) { return new wrapper(obj); };

  // Export the Underscore object for **Node.js**, with
  // backwards-compatibility for the old `require()` API. If we're in
  // the browser, add `_` as a global object via a string identifier,
  // for Closure Compiler "advanced" mode.
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      exports = module.exports = _;
    }
    exports._ = _;
  } else {
    root['_'] = _;
  }

  // Current version.
  _.VERSION = '1.3.1';

  // Collection Functions
  // --------------------

  // The cornerstone, an `each` implementation, aka `forEach`.
  // Handles objects with the built-in `forEach`, arrays, and raw objects.
  // Delegates to **ECMAScript 5**'s native `forEach` if available.
  var each = _.each = _.forEach = function(obj, iterator, context) {
    if (obj == null) return;
    if (nativeForEach && obj.forEach === nativeForEach) {
      obj.forEach(iterator, context);
    } else if (obj.length === +obj.length) {
      for (var i = 0, l = obj.length; i < l; i++) {
        if (i in obj && iterator.call(context, obj[i], i, obj) === breaker) return;
      }
    } else {
      for (var key in obj) {
        if (_.has(obj, key)) {
          if (iterator.call(context, obj[key], key, obj) === breaker) return;
        }
      }
    }
  };

  // Return the results of applying the iterator to each element.
  // Delegates to **ECMAScript 5**'s native `map` if available.
  _.map = _.collect = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeMap && obj.map === nativeMap) return obj.map(iterator, context);
    each(obj, function(value, index, list) {
      results[results.length] = iterator.call(context, value, index, list);
    });
    if (obj.length === +obj.length) results.length = obj.length;
    return results;
  };

  // **Reduce** builds up a single result from a list of values, aka `inject`,
  // or `foldl`. Delegates to **ECMAScript 5**'s native `reduce` if available.
  _.reduce = _.foldl = _.inject = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduce && obj.reduce === nativeReduce) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduce(iterator, memo) : obj.reduce(iterator);
    }
    each(obj, function(value, index, list) {
      if (!initial) {
        memo = value;
        initial = true;
      } else {
        memo = iterator.call(context, memo, value, index, list);
      }
    });
    if (!initial) throw new TypeError('Reduce of empty array with no initial value');
    return memo;
  };

  // The right-associative version of reduce, also known as `foldr`.
  // Delegates to **ECMAScript 5**'s native `reduceRight` if available.
  _.reduceRight = _.foldr = function(obj, iterator, memo, context) {
    var initial = arguments.length > 2;
    if (obj == null) obj = [];
    if (nativeReduceRight && obj.reduceRight === nativeReduceRight) {
      if (context) iterator = _.bind(iterator, context);
      return initial ? obj.reduceRight(iterator, memo) : obj.reduceRight(iterator);
    }
    var reversed = _.toArray(obj).reverse();
    if (context && !initial) iterator = _.bind(iterator, context);
    return initial ? _.reduce(reversed, iterator, memo, context) : _.reduce(reversed, iterator);
  };

  // Return the first value which passes a truth test. Aliased as `detect`.
  _.find = _.detect = function(obj, iterator, context) {
    var result;
    any(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) {
        result = value;
        return true;
      }
    });
    return result;
  };

  // Return all the elements that pass a truth test.
  // Delegates to **ECMAScript 5**'s native `filter` if available.
  // Aliased as `select`.
  _.filter = _.select = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    if (nativeFilter && obj.filter === nativeFilter) return obj.filter(iterator, context);
    each(obj, function(value, index, list) {
      if (iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Return all the elements for which a truth test fails.
  _.reject = function(obj, iterator, context) {
    var results = [];
    if (obj == null) return results;
    each(obj, function(value, index, list) {
      if (!iterator.call(context, value, index, list)) results[results.length] = value;
    });
    return results;
  };

  // Determine whether all of the elements match a truth test.
  // Delegates to **ECMAScript 5**'s native `every` if available.
  // Aliased as `all`.
  _.every = _.all = function(obj, iterator, context) {
    var result = true;
    if (obj == null) return result;
    if (nativeEvery && obj.every === nativeEvery) return obj.every(iterator, context);
    each(obj, function(value, index, list) {
      if (!(result = result && iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if at least one element in the object matches a truth test.
  // Delegates to **ECMAScript 5**'s native `some` if available.
  // Aliased as `any`.
  var any = _.some = _.any = function(obj, iterator, context) {
    iterator || (iterator = _.identity);
    var result = false;
    if (obj == null) return result;
    if (nativeSome && obj.some === nativeSome) return obj.some(iterator, context);
    each(obj, function(value, index, list) {
      if (result || (result = iterator.call(context, value, index, list))) return breaker;
    });
    return !!result;
  };

  // Determine if a given value is included in the array or object using `===`.
  // Aliased as `contains`.
  _.include = _.contains = function(obj, target) {
    var found = false;
    if (obj == null) return found;
    if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    found = any(obj, function(value) {
      return value === target;
    });
    return found;
  };

  // Invoke a method (with arguments) on every item in a collection.
  _.invoke = function(obj, method) {
    var args = slice.call(arguments, 2);
    return _.map(obj, function(value) {
      return (_.isFunction(method) ? method || value : value[method]).apply(value, args);
    });
  };

  // Convenience version of a common use case of `map`: fetching a property.
  _.pluck = function(obj, key) {
    return _.map(obj, function(value){ return value[key]; });
  };

  // Return the maximum element or (element-based computation).
  _.max = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.max.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return -Infinity;
    var result = {computed : -Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed >= result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Return the minimum element (or element-based computation).
  _.min = function(obj, iterator, context) {
    if (!iterator && _.isArray(obj) && obj[0] === +obj[0]) return Math.min.apply(Math, obj);
    if (!iterator && _.isEmpty(obj)) return Infinity;
    var result = {computed : Infinity};
    each(obj, function(value, index, list) {
      var computed = iterator ? iterator.call(context, value, index, list) : value;
      computed < result.computed && (result = {value : value, computed : computed});
    });
    return result.value;
  };

  // Shuffle an array.
  _.shuffle = function(obj) {
    var shuffled = [], rand;
    each(obj, function(value, index, list) {
      if (index == 0) {
        shuffled[0] = value;
      } else {
        rand = Math.floor(Math.random() * (index + 1));
        shuffled[index] = shuffled[rand];
        shuffled[rand] = value;
      }
    });
    return shuffled;
  };

  // Sort the object's values by a criterion produced by an iterator.
  _.sortBy = function(obj, iterator, context) {
    return _.pluck(_.map(obj, function(value, index, list) {
      return {
        value : value,
        criteria : iterator.call(context, value, index, list)
      };
    }).sort(function(left, right) {
      var a = left.criteria, b = right.criteria;
      return a < b ? -1 : a > b ? 1 : 0;
    }), 'value');
  };

  // Groups the object's values by a criterion. Pass either a string attribute
  // to group by, or a function that returns the criterion.
  _.groupBy = function(obj, val) {
    var result = {};
    var iterator = _.isFunction(val) ? val : function(obj) { return obj[val]; };
    each(obj, function(value, index) {
      var key = iterator(value, index);
      (result[key] || (result[key] = [])).push(value);
    });
    return result;
  };

  // Use a comparator function to figure out at what index an object should
  // be inserted so as to maintain order. Uses binary search.
  _.sortedIndex = function(array, obj, iterator) {
    iterator || (iterator = _.identity);
    var low = 0, high = array.length;
    while (low < high) {
      var mid = (low + high) >> 1;
      iterator(array[mid]) < iterator(obj) ? low = mid + 1 : high = mid;
    }
    return low;
  };

  // Safely convert anything iterable into a real, live array.
  _.toArray = function(iterable) {
    if (!iterable)                return [];
    if (iterable.toArray)         return iterable.toArray();
    if (_.isArray(iterable))      return slice.call(iterable);
    if (_.isArguments(iterable))  return slice.call(iterable);
    return _.values(iterable);
  };

  // Return the number of elements in an object.
  _.size = function(obj) {
    return _.isArray(obj) ? obj.length : _.keys(obj).length;
  };

  // Array Functions
  // ---------------

  // Get the first element of an array. Passing **n** will return the first N
  // values in the array. Aliased as `head`. The **guard** check allows it to work
  // with `_.map`.
  _.first = _.head = function(array, n, guard) {
    return (n != null) && !guard ? slice.call(array, 0, n) : array[0];
  };

  // Returns everything but the last entry of the array. Especcialy useful on
  // the arguments object. Passing **n** will return all the values in
  // the array, excluding the last N. The **guard** check allows it to work with
  // `_.map`.
  _.initial = function(array, n, guard) {
    return slice.call(array, 0, array.length - ((n == null) || guard ? 1 : n));
  };

  // Get the last element of an array. Passing **n** will return the last N
  // values in the array. The **guard** check allows it to work with `_.map`.
  _.last = function(array, n, guard) {
    if ((n != null) && !guard) {
      return slice.call(array, Math.max(array.length - n, 0));
    } else {
      return array[array.length - 1];
    }
  };

  // Returns everything but the first entry of the array. Aliased as `tail`.
  // Especially useful on the arguments object. Passing an **index** will return
  // the rest of the values in the array from that index onward. The **guard**
  // check allows it to work with `_.map`.
  _.rest = _.tail = function(array, index, guard) {
    return slice.call(array, (index == null) || guard ? 1 : index);
  };

  // Trim out all falsy values from an array.
  _.compact = function(array) {
    return _.filter(array, function(value){ return !!value; });
  };

  // Return a completely flattened version of an array.
  _.flatten = function(array, shallow) {
    return _.reduce(array, function(memo, value) {
      if (_.isArray(value)) return memo.concat(shallow ? value : _.flatten(value));
      memo[memo.length] = value;
      return memo;
    }, []);
  };

  // Return a version of the array that does not contain the specified value(s).
  _.without = function(array) {
    return _.difference(array, slice.call(arguments, 1));
  };

  // Produce a duplicate-free version of the array. If the array has already
  // been sorted, you have the option of using a faster algorithm.
  // Aliased as `unique`.
  _.uniq = _.unique = function(array, isSorted, iterator) {
    var initial = iterator ? _.map(array, iterator) : array;
    var results = [];
    // The `isSorted` flag is irrelevant if the array only contains two elements.
    if (array.length < 3) isSorted = true;
    _.reduce(initial, function (memo, value, index) {
      if (isSorted ? _.last(memo) !== value || !memo.length : !_.include(memo, value)) {
        memo.push(value);
        results.push(array[index]);
      }
      return memo;
    }, []);
    return results;
  };

  // Produce an array that contains the union: each distinct element from all of
  // the passed-in arrays.
  _.union = function() {
    return _.uniq(_.flatten(arguments, true));
  };

  // Produce an array that contains every item shared between all the
  // passed-in arrays. (Aliased as "intersect" for back-compat.)
  _.intersection = _.intersect = function(array) {
    var rest = slice.call(arguments, 1);
    return _.filter(_.uniq(array), function(item) {
      return _.every(rest, function(other) {
        return _.indexOf(other, item) >= 0;
      });
    });
  };

  // Take the difference between one array and a number of other arrays.
  // Only the elements present in just the first array will remain.
  _.difference = function(array) {
    var rest = _.flatten(slice.call(arguments, 1), true);
    return _.filter(array, function(value){ return !_.include(rest, value); });
  };

  // Zip together multiple lists into a single array -- elements that share
  // an index go together.
  _.zip = function() {
    var args = slice.call(arguments);
    var length = _.max(_.pluck(args, 'length'));
    var results = new Array(length);
    for (var i = 0; i < length; i++) results[i] = _.pluck(args, "" + i);
    return results;
  };

  // If the browser doesn't supply us with indexOf (I'm looking at you, **MSIE**),
  // we need this function. Return the position of the first occurrence of an
  // item in an array, or -1 if the item is not included in the array.
  // Delegates to **ECMAScript 5**'s native `indexOf` if available.
  // If the array is large and already in sort order, pass `true`
  // for **isSorted** to use binary search.
  _.indexOf = function(array, item, isSorted) {
    if (array == null) return -1;
    var i, l;
    if (isSorted) {
      i = _.sortedIndex(array, item);
      return array[i] === item ? i : -1;
    }
    if (nativeIndexOf && array.indexOf === nativeIndexOf) return array.indexOf(item);
    for (i = 0, l = array.length; i < l; i++) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Delegates to **ECMAScript 5**'s native `lastIndexOf` if available.
  _.lastIndexOf = function(array, item) {
    if (array == null) return -1;
    if (nativeLastIndexOf && array.lastIndexOf === nativeLastIndexOf) return array.lastIndexOf(item);
    var i = array.length;
    while (i--) if (i in array && array[i] === item) return i;
    return -1;
  };

  // Generate an integer Array containing an arithmetic progression. A port of
  // the native Python `range()` function. See
  // [the Python documentation](http://docs.python.org/library/functions.html#range).
  _.range = function(start, stop, step) {
    if (arguments.length <= 1) {
      stop = start || 0;
      start = 0;
    }
    step = arguments[2] || 1;

    var len = Math.max(Math.ceil((stop - start) / step), 0);
    var idx = 0;
    var range = new Array(len);

    while(idx < len) {
      range[idx++] = start;
      start += step;
    }

    return range;
  };

  // Function (ahem) Functions
  // ------------------

  // Reusable constructor function for prototype setting.
  var ctor = function(){};

  // Create a function bound to a given object (assigning `this`, and arguments,
  // optionally). Binding with arguments is also known as `curry`.
  // Delegates to **ECMAScript 5**'s native `Function.bind` if available.
  // We check for `func.bind` first, to fail fast when `func` is undefined.
  _.bind = function bind(func, context) {
    var bound, args;
    if (func.bind === nativeBind && nativeBind) return nativeBind.apply(func, slice.call(arguments, 1));
    if (!_.isFunction(func)) throw new TypeError;
    args = slice.call(arguments, 2);
    return bound = function() {
      if (!(this instanceof bound)) return func.apply(context, args.concat(slice.call(arguments)));
      ctor.prototype = func.prototype;
      var self = new ctor;
      var result = func.apply(self, args.concat(slice.call(arguments)));
      if (Object(result) === result) return result;
      return self;
    };
  };

  // Bind all of an object's methods to that object. Useful for ensuring that
  // all callbacks defined on an object belong to it.
  _.bindAll = function(obj) {
    var funcs = slice.call(arguments, 1);
    if (funcs.length == 0) funcs = _.functions(obj);
    each(funcs, function(f) { obj[f] = _.bind(obj[f], obj); });
    return obj;
  };

  // Memoize an expensive function by storing its results.
  _.memoize = function(func, hasher) {
    var memo = {};
    hasher || (hasher = _.identity);
    return function() {
      var key = hasher.apply(this, arguments);
      return _.has(memo, key) ? memo[key] : (memo[key] = func.apply(this, arguments));
    };
  };

  // Delays a function for the given number of milliseconds, and then calls
  // it with the arguments supplied.
  _.delay = function(func, wait) {
    var args = slice.call(arguments, 2);
    return setTimeout(function(){ return func.apply(func, args); }, wait);
  };

  // Defers a function, scheduling it to run after the current call stack has
  // cleared.
  _.defer = function(func) {
    return _.delay.apply(_, [func, 1].concat(slice.call(arguments, 1)));
  };

  // Returns a function, that, when invoked, will only be triggered at most once
  // during a given window of time.
  _.throttle = function(func, wait) {
    var context, args, timeout, throttling, more;
    var whenDone = _.debounce(function(){ more = throttling = false; }, wait);
    return function() {
      context = this; args = arguments;
      var later = function() {
        timeout = null;
        if (more) func.apply(context, args);
        whenDone();
      };
      if (!timeout) timeout = setTimeout(later, wait);
      if (throttling) {
        more = true;
      } else {
        func.apply(context, args);
      }
      whenDone();
      throttling = true;
    };
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // N milliseconds. If `immediate` is passed, trigger the function on the
  // leading edge, instead of the trailing.
  _.debounce = function(func, wait, immediate) {
    var timeout;
    return function() {
      var context = this, args = arguments;
      var later = function() {
        timeout = null;
        if (!immediate) func.apply(context, args);
      };
      if (immediate && !timeout) func.apply(context, args);
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  // Returns a function that will be executed at most one time, no matter how
  // often you call it. Useful for lazy initialization.
  _.once = function(func) {
    var ran = false, memo;
    return function() {
      if (ran) return memo;
      ran = true;
      return memo = func.apply(this, arguments);
    };
  };

  // Returns the first function passed as an argument to the second,
  // allowing you to adjust arguments, run code before and after, and
  // conditionally execute the original function.
  _.wrap = function(func, wrapper) {
    return function() {
      var args = [func].concat(slice.call(arguments, 0));
      return wrapper.apply(this, args);
    };
  };

  // Returns a function that is the composition of a list of functions, each
  // consuming the return value of the function that follows.
  _.compose = function() {
    var funcs = arguments;
    return function() {
      var args = arguments;
      for (var i = funcs.length - 1; i >= 0; i--) {
        args = [funcs[i].apply(this, args)];
      }
      return args[0];
    };
  };

  // Returns a function that will only be executed after being called N times.
  _.after = function(times, func) {
    if (times <= 0) return func();
    return function() {
      if (--times < 1) { return func.apply(this, arguments); }
    };
  };

  // Object Functions
  // ----------------

  // Retrieve the names of an object's properties.
  // Delegates to **ECMAScript 5**'s native `Object.keys`
  _.keys = nativeKeys || function(obj) {
    if (obj !== Object(obj)) throw new TypeError('Invalid object');
    var keys = [];
    for (var key in obj) if (_.has(obj, key)) keys[keys.length] = key;
    return keys;
  };

  // Retrieve the values of an object's properties.
  _.values = function(obj) {
    return _.map(obj, _.identity);
  };

  // Return a sorted list of the function names available on the object.
  // Aliased as `methods`
  _.functions = _.methods = function(obj) {
    var names = [];
    for (var key in obj) {
      if (_.isFunction(obj[key])) names.push(key);
    }
    return names.sort();
  };

  // Extend a given object with all the properties in passed-in object(s).
  _.extend = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Fill in a given object with default properties.
  _.defaults = function(obj) {
    each(slice.call(arguments, 1), function(source) {
      for (var prop in source) {
        if (obj[prop] == null) obj[prop] = source[prop];
      }
    });
    return obj;
  };

  // Create a (shallow-cloned) duplicate of an object.
  _.clone = function(obj) {
    if (!_.isObject(obj)) return obj;
    return _.isArray(obj) ? obj.slice() : _.extend({}, obj);
  };

  // Invokes interceptor with the obj, and then returns obj.
  // The primary purpose of this method is to "tap into" a method chain, in
  // order to perform operations on intermediate results within the chain.
  _.tap = function(obj, interceptor) {
    interceptor(obj);
    return obj;
  };

  // Internal recursive comparison function.
  function eq(a, b, stack) {
    // Identical objects are equal. `0 === -0`, but they aren't identical.
    // See the Harmony `egal` proposal: http://wiki.ecmascript.org/doku.php?id=harmony:egal.
    if (a === b) return a !== 0 || 1 / a == 1 / b;
    // A strict comparison is necessary because `null == undefined`.
    if (a == null || b == null) return a === b;
    // Unwrap any wrapped objects.
    if (a._chain) a = a._wrapped;
    if (b._chain) b = b._wrapped;
    // Invoke a custom `isEqual` method if one is provided.
    if (a.isEqual && _.isFunction(a.isEqual)) return a.isEqual(b);
    if (b.isEqual && _.isFunction(b.isEqual)) return b.isEqual(a);
    // Compare `[[Class]]` names.
    var className = toString.call(a);
    if (className != toString.call(b)) return false;
    switch (className) {
      // Strings, numbers, dates, and booleans are compared by value.
      case '[object String]':
        // Primitives and their corresponding object wrappers are equivalent; thus, `"5"` is
        // equivalent to `new String("5")`.
        return a == String(b);
      case '[object Number]':
        // `NaN`s are equivalent, but non-reflexive. An `egal` comparison is performed for
        // other numeric values.
        return a != +a ? b != +b : (a == 0 ? 1 / a == 1 / b : a == +b);
      case '[object Date]':
      case '[object Boolean]':
        // Coerce dates and booleans to numeric primitive values. Dates are compared by their
        // millisecond representations. Note that invalid dates with millisecond representations
        // of `NaN` are not equivalent.
        return +a == +b;
      // RegExps are compared by their source patterns and flags.
      case '[object RegExp]':
        return a.source == b.source &&
               a.global == b.global &&
               a.multiline == b.multiline &&
               a.ignoreCase == b.ignoreCase;
    }
    if (typeof a != 'object' || typeof b != 'object') return false;
    // Assume equality for cyclic structures. The algorithm for detecting cyclic
    // structures is adapted from ES 5.1 section 15.12.3, abstract operation `JO`.
    var length = stack.length;
    while (length--) {
      // Linear search. Performance is inversely proportional to the number of
      // unique nested structures.
      if (stack[length] == a) return true;
    }
    // Add the first object to the stack of traversed objects.
    stack.push(a);
    var size = 0, result = true;
    // Recursively compare objects and arrays.
    if (className == '[object Array]') {
      // Compare array lengths to determine if a deep comparison is necessary.
      size = a.length;
      result = size == b.length;
      if (result) {
        // Deep compare the contents, ignoring non-numeric properties.
        while (size--) {
          // Ensure commutative equality for sparse arrays.
          if (!(result = size in a == size in b && eq(a[size], b[size], stack))) break;
        }
      }
    } else {
      // Objects with different constructors are not equivalent.
      if ('constructor' in a != 'constructor' in b || a.constructor != b.constructor) return false;
      // Deep compare objects.
      for (var key in a) {
        if (_.has(a, key)) {
          // Count the expected number of properties.
          size++;
          // Deep compare each member.
          if (!(result = _.has(b, key) && eq(a[key], b[key], stack))) break;
        }
      }
      // Ensure that both objects contain the same number of properties.
      if (result) {
        for (key in b) {
          if (_.has(b, key) && !(size--)) break;
        }
        result = !size;
      }
    }
    // Remove the first object from the stack of traversed objects.
    stack.pop();
    return result;
  }

  // Perform a deep comparison to check if two objects are equal.
  _.isEqual = function(a, b) {
    return eq(a, b, []);
  };

  // Is a given array, string, or object empty?
  // An "empty" object has no enumerable own-properties.
  _.isEmpty = function(obj) {
    if (obj == null) return true;
    if (_.isArray(obj) || _.isString(obj)) return obj.length === 0;
    for (var key in obj) if (_.has(obj, key)) return false;
    return true;
  };

  // Is a given value a DOM element?
  _.isElement = function(obj) {
    return !!(obj && obj.nodeType == 1);
  };

  // Is a given value an array?
  // Delegates to ECMA5's native Array.isArray
  _.isArray = nativeIsArray || function(obj) {
    return toString.call(obj) == '[object Array]';
  };

  // Is a given variable an object?
  _.isObject = function(obj) {
    return obj === Object(obj);
  };

  // Is a given variable an arguments object?
  _.isArguments = function(obj) {
    return toString.call(obj) == '[object Arguments]';
  };
  if (!_.isArguments(arguments)) {
    _.isArguments = function(obj) {
      return !!(obj && _.has(obj, 'callee'));
    };
  }

  // Is a given value a function?
  _.isFunction = function(obj) {
    return toString.call(obj) == '[object Function]';
  };

  // Is a given value a string?
  _.isString = function(obj) {
    return toString.call(obj) == '[object String]';
  };

  // Is a given value a number?
  _.isNumber = function(obj) {
    return toString.call(obj) == '[object Number]';
  };

  // Is the given value `NaN`?
  _.isNaN = function(obj) {
    // `NaN` is the only value for which `===` is not reflexive.
    return obj !== obj;
  };

  // Is a given value a boolean?
  _.isBoolean = function(obj) {
    return obj === true || obj === false || toString.call(obj) == '[object Boolean]';
  };

  // Is a given value a date?
  _.isDate = function(obj) {
    return toString.call(obj) == '[object Date]';
  };

  // Is the given value a regular expression?
  _.isRegExp = function(obj) {
    return toString.call(obj) == '[object RegExp]';
  };

  // Is a given value equal to null?
  _.isNull = function(obj) {
    return obj === null;
  };

  // Is a given variable undefined?
  _.isUndefined = function(obj) {
    return obj === void 0;
  };

  // Has own property?
  _.has = function(obj, key) {
    return hasOwnProperty.call(obj, key);
  };

  // Utility Functions
  // -----------------

  // Run Underscore.js in *noConflict* mode, returning the `_` variable to its
  // previous owner. Returns a reference to the Underscore object.
  _.noConflict = function() {
    root._ = previousUnderscore;
    return this;
  };

  // Keep the identity function around for default iterators.
  _.identity = function(value) {
    return value;
  };

  // Run a function **n** times.
  _.times = function (n, iterator, context) {
    for (var i = 0; i < n; i++) iterator.call(context, i);
  };

  // Escape a string for HTML interpolation.
  _.escape = function(string) {
    return (''+string).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#x27;').replace(/\//g,'&#x2F;');
  };

  // If the value of the named property is a function then invoke it;
  // otherwise, return it.
  _.result = function(object, property) {
    if (object == null) return null;
    var value = object[property];
    return _.isFunction(value) ? value.call(object) : value;
  };

  // Add your own custom functions to the Underscore object, ensuring that
  // they're correctly added to the OOP wrapper as well.
  _.mixin = function(obj) {
    each(_.functions(obj), function(name){
      addToWrapper(name, _[name] = obj[name]);
    });
  };

  // Generate a unique integer id (unique within the entire client session).
  // Useful for temporary DOM ids.
  var idCounter = 0;
  _.uniqueId = function(prefix) {
    var id = idCounter++;
    return prefix ? prefix + id : id;
  };

  // By default, Underscore uses ERB-style template delimiters, change the
  // following template settings to use alternative delimiters.
  _.templateSettings = {
    evaluate    : /<%([\s\S]+?)%>/g,
    interpolate : /<%=([\s\S]+?)%>/g,
    escape      : /<%-([\s\S]+?)%>/g
  };

  // When customizing `templateSettings`, if you don't want to define an
  // interpolation, evaluation or escaping regex, we need one that is
  // guaranteed not to match.
  var noMatch = /.^/;

  // Certain characters need to be escaped so that they can be put into a
  // string literal.
  var escapes = {
    '\\': '\\',
    "'": "'",
    'r': '\r',
    'n': '\n',
    't': '\t',
    'u2028': '\u2028',
    'u2029': '\u2029'
  };

  for (var p in escapes) escapes[escapes[p]] = p;
  var escaper = /\\|'|\r|\n|\t|\u2028|\u2029/g;
  var unescaper = /\\(\\|'|r|n|t|u2028|u2029)/g;

  // Within an interpolation, evaluation, or escaping, remove HTML escaping
  // that had been previously added.
  var unescape = function(code) {
    return code.replace(unescaper, function(match, escape) {
      return escapes[escape];
    });
  };

  // JavaScript micro-templating, similar to John Resig's implementation.
  // Underscore templating handles arbitrary delimiters, preserves whitespace,
  // and correctly escapes quotes within interpolated code.
  _.template = function(str, data) {
    var settings  = _.templateSettings;
    var source = 'var __p=[],print=function(){__p.push.apply(__p,arguments);};' +
      'with(obj||{}){__p.push(\'' +
      str
        .replace(escaper, function(match) {
          return '\\' + escapes[match];
        })
        .replace(settings.escape || noMatch, function(match, code) {
          return "',\n_.escape(" + unescape(code) + "),\n'";
        })
        .replace(settings.interpolate || noMatch, function(match, code) {
          return "',\n" + unescape(code) + ",\n'";
        })
        .replace(settings.evaluate || noMatch, function(match, code) {
          return "');\n" + unescape(code) + "\n;__p.push('";
        })
        + "');\n}\nreturn __p.join('');";
    var render = new Function('obj', '_', source);
    if (data) return render(data, _);
    var template = function(data) {
      return render.call(this, data, _);
    };
    template.source = 'function(obj){\n' + source + '\n}';
    return template;
  };

  // Add a "chain" function, which will delegate to the wrapper.
  _.chain = function(obj) {
    return _(obj).chain();
  };

  // The OOP Wrapper
  // ---------------

  // If Underscore is called as a function, it returns a wrapped object that
  // can be used OO-style. This wrapper holds altered versions of all the
  // underscore functions. Wrapped objects may be chained.
  var wrapper = function(obj) { this._wrapped = obj; };

  // Expose `wrapper.prototype` as `_.prototype`
  _.prototype = wrapper.prototype;

  // Helper function to continue chaining intermediate results.
  var result = function(obj, chain) {
    return chain ? _(obj).chain() : obj;
  };

  // A method to easily add functions to the OOP wrapper.
  var addToWrapper = function(name, func) {
    wrapper.prototype[name] = function() {
      var args = slice.call(arguments);
      unshift.call(args, this._wrapped);
      return result(func.apply(_, args), this._chain);
    };
  };

  // Add all of the Underscore functions to the wrapper object.
  _.mixin(_);

  // Add all mutator Array functions to the wrapper.
  each(['pop', 'push', 'reverse', 'shift', 'sort', 'splice', 'unshift'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      var wrapped = this._wrapped;
      method.apply(wrapped, arguments);
      var length = wrapped.length;
      if ((name == 'shift' || name == 'splice') && length === 0) delete wrapped[0];
      return result(wrapped, this._chain);
    };
  });

  // Add all accessor Array functions to the wrapper.
  each(['concat', 'join', 'slice'], function(name) {
    var method = ArrayProto[name];
    wrapper.prototype[name] = function() {
      return result(method.apply(this._wrapped, arguments), this._chain);
    };
  });

  // Start chaining a wrapped Underscore object.
  wrapper.prototype.chain = function() {
    this._chain = true;
    return this;
  };

  // Extracts the result from a wrapped and chained object.
  wrapper.prototype.value = function() {
    return this._wrapped;
  };

}).call(this);
;// Underscore.string
// (c) 2010 Esa-Matti Suuronen <esa-matti aet suuronen dot org>
// Underscore.strings is freely distributable under the terms of the MIT license.
// Documentation: https://github.com/epeli/underscore.string
// Some code is borrowed from MooTools and Alexandru Marasteanu.

// Version 2.2.0rc

!function(root){
  'use strict';

  // Defining helper functions.

  var nativeTrim = String.prototype.trim;
  var nativeTrimRight = String.prototype.trimRight;
  var nativeTrimLeft = String.prototype.trimLeft;

  var parseNumber = function(source) { return source * 1 || 0; };
  
  var strRepeat = function(str, qty, separator){
    // ~~var — is the fastest available way to convert anything to Integer in javascript.
    // We'll use it extensively in this lib.
    str += ''; qty = ~~qty;
    for (var repeat = []; qty > 0; repeat[--qty] = str) {}
    return repeat.join(separator == null ? '' : separator);
  };

  var slice = function(a){
    return Array.prototype.slice.call(a);
  };

  var defaultToWhiteSpace = function(characters){
    if (characters != null) {
      return '[' + _s.escapeRegExp(''+characters) + ']';
    }
    return '\\s';
  };
  
  var escapeChars = {
    lt: '<',
    gt: '>',
    quot: '"',
    apos: "'",
    amp: '&'
  };
  
  var reversedEscapeChars = {};
  for(var key in escapeChars){ reversedEscapeChars[escapeChars[key]] = key; }

  // sprintf() for JavaScript 0.7-beta1
  // http://www.diveintojavascript.com/projects/javascript-sprintf
  //
  // Copyright (c) Alexandru Marasteanu <alexaholic [at) gmail (dot] com>
  // All rights reserved.

  var sprintf = (function() {
    function get_type(variable) {
      return Object.prototype.toString.call(variable).slice(8, -1).toLowerCase();
    }

    var str_repeat = strRepeat;

    var str_format = function() {
      if (!str_format.cache.hasOwnProperty(arguments[0])) {
        str_format.cache[arguments[0]] = str_format.parse(arguments[0]);
      }
      return str_format.format.call(null, str_format.cache[arguments[0]], arguments);
    };

    str_format.format = function(parse_tree, argv) {
      var cursor = 1, tree_length = parse_tree.length, node_type = '', arg, output = [], i, k, match, pad, pad_character, pad_length;
      for (i = 0; i < tree_length; i++) {
        node_type = get_type(parse_tree[i]);
        if (node_type === 'string') {
          output.push(parse_tree[i]);
        }
        else if (node_type === 'array') {
          match = parse_tree[i]; // convenience purposes only
          if (match[2]) { // keyword argument
            arg = argv[cursor];
            for (k = 0; k < match[2].length; k++) {
              if (!arg.hasOwnProperty(match[2][k])) {
                throw new Error(sprintf('[_.sprintf] property "%s" does not exist', match[2][k]));
              }
              arg = arg[match[2][k]];
            }
          } else if (match[1]) { // positional argument (explicit)
            arg = argv[match[1]];
          }
          else { // positional argument (implicit)
            arg = argv[cursor++];
          }

          if (/[^s]/.test(match[8]) && (get_type(arg) != 'number')) {
            throw new Error(sprintf('[_.sprintf] expecting number but found %s', get_type(arg)));
          }
          switch (match[8]) {
            case 'b': arg = arg.toString(2); break;
            case 'c': arg = String.fromCharCode(arg); break;
            case 'd': arg = parseInt(arg, 10); break;
            case 'e': arg = match[7] ? arg.toExponential(match[7]) : arg.toExponential(); break;
            case 'f': arg = match[7] ? parseFloat(arg).toFixed(match[7]) : parseFloat(arg); break;
            case 'o': arg = arg.toString(8); break;
            case 's': arg = ((arg = String(arg)) && match[7] ? arg.substring(0, match[7]) : arg); break;
            case 'u': arg = Math.abs(arg); break;
            case 'x': arg = arg.toString(16); break;
            case 'X': arg = arg.toString(16).toUpperCase(); break;
          }
          arg = (/[def]/.test(match[8]) && match[3] && arg >= 0 ? '+'+ arg : arg);
          pad_character = match[4] ? match[4] == '0' ? '0' : match[4].charAt(1) : ' ';
          pad_length = match[6] - String(arg).length;
          pad = match[6] ? str_repeat(pad_character, pad_length) : '';
          output.push(match[5] ? arg + pad : pad + arg);
        }
      }
      return output.join('');
    };

    str_format.cache = {};

    str_format.parse = function(fmt) {
      var _fmt = fmt, match = [], parse_tree = [], arg_names = 0;
      while (_fmt) {
        if ((match = /^[^\x25]+/.exec(_fmt)) !== null) {
          parse_tree.push(match[0]);
        }
        else if ((match = /^\x25{2}/.exec(_fmt)) !== null) {
          parse_tree.push('%');
        }
        else if ((match = /^\x25(?:([1-9]\d*)\$|\(([^\)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-fosuxX])/.exec(_fmt)) !== null) {
          if (match[2]) {
            arg_names |= 1;
            var field_list = [], replacement_field = match[2], field_match = [];
            if ((field_match = /^([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
              field_list.push(field_match[1]);
              while ((replacement_field = replacement_field.substring(field_match[0].length)) !== '') {
                if ((field_match = /^\.([a-z_][a-z_\d]*)/i.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else if ((field_match = /^\[(\d+)\]/.exec(replacement_field)) !== null) {
                  field_list.push(field_match[1]);
                }
                else {
                  throw new Error('[_.sprintf] huh?');
                }
              }
            }
            else {
              throw new Error('[_.sprintf] huh?');
            }
            match[2] = field_list;
          }
          else {
            arg_names |= 2;
          }
          if (arg_names === 3) {
            throw new Error('[_.sprintf] mixing positional and named placeholders is not (yet) supported');
          }
          parse_tree.push(match);
        }
        else {
          throw new Error('[_.sprintf] huh?');
        }
        _fmt = _fmt.substring(match[0].length);
      }
      return parse_tree;
    };

    return str_format;
  })();



  // Defining underscore.string

  var _s = {

    VERSION: '2.2.0rc',

    isBlank: function(str){
      return (/^\s*$/).test(str);
    },

    stripTags: function(str){
      return (''+str).replace(/<\/?[^>]+>/g, '');
    },

    capitalize : function(str) {
      str += '';
      return str.charAt(0).toUpperCase() + str.substring(1);
    },

    chop: function(str, step){
      str = str+'';
      step = ~~step || str.length;
      var arr = [];
      for (var i = 0; i < str.length; i += step)
        arr.push(str.slice(i,i + step));
      return arr;
    },

    clean: function(str){
      return _s.strip(str).replace(/\s+/g, ' ');
    },

    count: function(str, substr){
      str += ''; substr += '';
      return str.split(substr).length - 1;
    },

    chars: function(str) {
      return (''+str).split('');
    },

    escapeHTML: function(str) {
      return (''+str).replace(/[&<>"']/g, function(match){ return '&' + reversedEscapeChars[match] + ';'; });
    },

    unescapeHTML: function(str) {
      return (''+str).replace(/\&([^;]+);/g, function(entity, entityCode){
        var match;
        
        if (entityCode in escapeChars) {
          return escapeChars[entityCode];
        } else if (match = entityCode.match(/^#x([\da-fA-F]+)$/)) {
          return String.fromCharCode(parseInt(match[1], 16));
        } else if (match = entityCode.match(/^#(\d+)$/)) {
          return String.fromCharCode(~~match[1]);
        } else {
          return entity;
        }
      });
    },

    escapeRegExp: function(str){
      // From MooTools core 1.2.4
      return str.replace(/([-.*+?^${}()|[\]\/\\])/g, '\\$1');
    },

    insert: function(str, i, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, 0, ''+substr);
      return arr.join('');
    },

    include: function(str, needle){
      return !!~(''+str).indexOf(needle);
    },

    join: function() {
      var args = slice(arguments);
      return args.join(args.shift());
    },

    lines: function(str) {
      return (''+str).split("\n");
    },

    reverse: function(str){
      return _s.chars(str).reverse().join('');
    },

    splice: function(str, i, howmany, substr){
      var arr = _s.chars(str);
      arr.splice(~~i, ~~howmany, substr);
      return arr.join('');
    },

    startsWith: function(str, starts){
      str += ''; starts += '';
      return str.length >= starts.length && str.substring(0, starts.length) === starts;
    },

    endsWith: function(str, ends){
      str += ''; ends += '';
      return str.length >= ends.length && str.substring(str.length - ends.length) === ends;
    },

    succ: function(str){
      str += '';
      var arr = _s.chars(str);
      arr.splice(str.length-1, 1, String.fromCharCode(str.charCodeAt(str.length-1) + 1));
      return arr.join('');
    },

    titleize: function(str){
      return (''+str).replace(/\b./g, function(ch){ return ch.toUpperCase(); });
    },

    camelize: function(str){
      return _s.trim(str).replace(/[-_\s]+(.)?/g, function(match, chr){
        return chr && chr.toUpperCase();
      });
    },

    underscored: function(str){
      return _s.trim(str).replace(/([a-z\d])([A-Z]+)/g, '$1_$2').replace(/[-\s]+/g, '_').toLowerCase();
    },

    dasherize: function(str){
      return _s.trim(str).replace(/[_\s]+/g, '-').replace(/([A-Z])/g, '-$1').replace(/-+/g, '-').toLowerCase();
    },

    classify: function(str){
      str += '';
      return _s.titleize(str.replace(/_/g, ' ')).replace(/\s/g, '')
    },

    humanize: function(str){
      return _s.capitalize(this.underscored(str).replace(/_id$/,'').replace(/_/g, ' '));
    },

    trim: function(str, characters){
      str += '';
      if (!characters && nativeTrim) { return nativeTrim.call(str); }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('\^' + characters + '+|' + characters + '+$', 'g'), '');
    },

    ltrim: function(str, characters){
      str += '';
      if (!characters && nativeTrimLeft) {
        return nativeTrimLeft.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp('^' + characters + '+'), '');
    },

    rtrim: function(str, characters){
      str += '';
      if (!characters && nativeTrimRight) {
        return nativeTrimRight.call(str);
      }
      characters = defaultToWhiteSpace(characters);
      return str.replace(new RegExp(characters + '+$'), '');
    },

    truncate: function(str, length, truncateStr){
      str += ''; truncateStr = truncateStr || '...';
      length = ~~length;
      return str.length > length ? str.slice(0, length) + truncateStr : str;
    },

    /**
     * _s.prune: a more elegant version of truncate
     * prune extra chars, never leaving a half-chopped word.
     * @author github.com/sergiokas
     */
    prune: function(str, length, pruneStr){
      str += ''; length = ~~length;
      pruneStr = pruneStr != null ? ''+pruneStr : '...';
      
      var pruned, borderChar, template = str.replace(/\W/g, function(ch){
        return (ch.toUpperCase() !== ch.toLowerCase()) ? 'A' : ' ';
      });
      
      borderChar = template.charAt(length);
      
      pruned = template.slice(0, length);
      
      // Check if we're in the middle of a word
      if (borderChar && borderChar.match(/\S/))
        pruned = pruned.replace(/\s\S+$/, '');
        
      pruned = _s.rtrim(pruned);
      
      return (pruned+pruneStr).length > str.length ? str : str.substring(0, pruned.length)+pruneStr;
    },

    words: function(str, delimiter) {
      return _s.trim(str, delimiter).split(delimiter || /\s+/);
    },

    pad: function(str, length, padStr, type) {
      str += '';
      
      var padlen  = 0;

      length = ~~length;
      
      if (!padStr) {
        padStr = ' ';
      } else if (padStr.length > 1) {
        padStr = padStr.charAt(0);
      }
      
      switch(type) {
        case 'right':
          padlen = (length - str.length);
          return str + strRepeat(padStr, padlen);
        case 'both':
          padlen = (length - str.length);
          return strRepeat(padStr, Math.ceil(padlen/2)) + 
                 str + 
                 strRepeat(padStr, Math.floor(padlen/2));
        default: // 'left'
          padlen = (length - str.length);
          return strRepeat(padStr, padlen) + str;
        }
    },

    lpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr);
    },

    rpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'right');
    },

    lrpad: function(str, length, padStr) {
      return _s.pad(str, length, padStr, 'both');
    },

    sprintf: sprintf,

    vsprintf: function(fmt, argv){
      argv.unshift(fmt);
      return sprintf.apply(null, argv);
    },

    toNumber: function(str, decimals) {
      str += '';
      var num = parseNumber(parseNumber(str).toFixed(~~decimals));
      return num === 0 && !str.match(/^0+$/) ? Number.NaN : num;
    },

    strRight: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strRightBack: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.lastIndexOf(sep);
      return ~pos ? str.slice(pos+sep.length, str.length) : str;
    },

    strLeft: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = !sep ? -1 : str.indexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    strLeftBack: function(str, sep){
      str += ''; sep = sep != null ? ''+sep : sep;
      var pos = str.lastIndexOf(sep);
      return ~pos ? str.slice(0, pos) : str;
    },

    toSentence: function(array, separator, lastSeparator) {
        separator || (separator = ', ');
        lastSeparator || (lastSeparator = ' and ');
        var length = array.length, str = '';

        for (var i = 0; i < length; i++) {
            str += array[i];
            if (i === (length - 2)) { str += lastSeparator; }
            else if (i < (length - 1)) { str += separator; }
        }

        return str;
    },

    slugify: function(str) {
      var from  = "ąàáäâãćęèéëêìíïîłńòóöôõùúüûñçżź",
          to    = "aaaaaaceeeeeiiiilnooooouuuunczz",
          regex = new RegExp(defaultToWhiteSpace(from), 'g');

      str = (''+str).toLowerCase();

      str = str.replace(regex, function(ch){
        var index = from.indexOf(ch);
        return to.charAt(index) || '-';
      });

      return _s.trim(str.replace(/[^\w\s-]/g, '').replace(/[-\s]+/g, '-'), '-');
    },

    exports: function() {
      var result = {};

      for (var prop in this) {
        if (!this.hasOwnProperty(prop) || ~['include', 'contains', 'reverse'].indexOf(prop)) continue;
        result[prop] = this[prop];
      }

      return result;
    },
    
    repeat: strRepeat
  };

  // Aliases

  _s.strip    = _s.trim;
  _s.lstrip   = _s.ltrim;
  _s.rstrip   = _s.rtrim;
  _s.center   = _s.lrpad;
  _s.rjust    = _s.lpad;
  _s.ljust    = _s.rpad;
  _s.contains = _s.include;

  // CommonJS module is defined
  if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
      // Export module
      module.exports = _s;
    }
    exports._s = _s;

  } else if (typeof define === 'function' && define.amd) {
    // Register as a named module with AMD.
    define('underscore.string', function() {
      return _s;
    });
    
  } else {
    // Integrate with Underscore.js if defined
    // or create our own underscore object.
    root._ = root._ || {};
    root._.string = root._.str = _s;
  }

}(this);;// ┌────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël 2.1.0 - JavaScript Vector Library                          │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright © 2008-2012 Dmitry Baranovskiy (http://raphaeljs.com)    │ \\
// │ Copyright © 2008-2012 Sencha Labs (http://sencha.com)              │ \\
// ├────────────────────────────────────────────────────────────────────┤ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license.│ \\
// └────────────────────────────────────────────────────────────────────┘ \\

// ┌──────────────────────────────────────────────────────────────────────────────────────┐ \\
// │ Eve 0.3.4 - JavaScript Events Library                                                │ \\
// ├──────────────────────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://dmitry.baranovskiy.com/)          │ \\
// │ Licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) license. │ \\
// └──────────────────────────────────────────────────────────────────────────────────────┘ \\

(function (glob) {
    var version = "0.3.4",
        has = "hasOwnProperty",
        separator = /[\.\/]/,
        wildcard = "*",
        fun = function () {},
        numsort = function (a, b) {
            return a - b;
        },
        current_event,
        stop,
        events = {n: {}},
    
        eve = function (name, scope) {
            var e = events,
                oldstop = stop,
                args = Array.prototype.slice.call(arguments, 2),
                listeners = eve.listeners(name),
                z = 0,
                f = false,
                l,
                indexed = [],
                queue = {},
                out = [],
                ce = current_event,
                errors = [];
            current_event = name;
            stop = 0;
            for (var i = 0, ii = listeners.length; i < ii; i++) if ("zIndex" in listeners[i]) {
                indexed.push(listeners[i].zIndex);
                if (listeners[i].zIndex < 0) {
                    queue[listeners[i].zIndex] = listeners[i];
                }
            }
            indexed.sort(numsort);
            while (indexed[z] < 0) {
                l = queue[indexed[z++]];
                out.push(l.apply(scope, args));
                if (stop) {
                    stop = oldstop;
                    return out;
                }
            }
            for (i = 0; i < ii; i++) {
                l = listeners[i];
                if ("zIndex" in l) {
                    if (l.zIndex == indexed[z]) {
                        out.push(l.apply(scope, args));
                        if (stop) {
                            break;
                        }
                        do {
                            z++;
                            l = queue[indexed[z]];
                            l && out.push(l.apply(scope, args));
                            if (stop) {
                                break;
                            }
                        } while (l)
                    } else {
                        queue[l.zIndex] = l;
                    }
                } else {
                    out.push(l.apply(scope, args));
                    if (stop) {
                        break;
                    }
                }
            }
            stop = oldstop;
            current_event = ce;
            return out.length ? out : null;
        };
    
    eve.listeners = function (name) {
        var names = name.split(separator),
            e = events,
            item,
            items,
            k,
            i,
            ii,
            j,
            jj,
            nes,
            es = [e],
            out = [];
        for (i = 0, ii = names.length; i < ii; i++) {
            nes = [];
            for (j = 0, jj = es.length; j < jj; j++) {
                e = es[j].n;
                items = [e[names[i]], e[wildcard]];
                k = 2;
                while (k--) {
                    item = items[k];
                    if (item) {
                        nes.push(item);
                        out = out.concat(item.f || []);
                    }
                }
            }
            es = nes;
        }
        return out;
    };
    
    
    eve.on = function (name, f) {
        var names = name.split(separator),
            e = events;
        for (var i = 0, ii = names.length; i < ii; i++) {
            e = e.n;
            !e[names[i]] && (e[names[i]] = {n: {}});
            e = e[names[i]];
        }
        e.f = e.f || [];
        for (i = 0, ii = e.f.length; i < ii; i++) if (e.f[i] == f) {
            return fun;
        }
        e.f.push(f);
        return function (zIndex) {
            if (+zIndex == +zIndex) {
                f.zIndex = +zIndex;
            }
        };
    };
    
    eve.stop = function () {
        stop = 1;
    };
    
    eve.nt = function (subname) {
        if (subname) {
            return new RegExp("(?:\\.|\\/|^)" + subname + "(?:\\.|\\/|$)").test(current_event);
        }
        return current_event;
    };
    
    
    eve.off = eve.unbind = function (name, f) {
        var names = name.split(separator),
            e,
            key,
            splice,
            i, ii, j, jj,
            cur = [events];
        for (i = 0, ii = names.length; i < ii; i++) {
            for (j = 0; j < cur.length; j += splice.length - 2) {
                splice = [j, 1];
                e = cur[j].n;
                if (names[i] != wildcard) {
                    if (e[names[i]]) {
                        splice.push(e[names[i]]);
                    }
                } else {
                    for (key in e) if (e[has](key)) {
                        splice.push(e[key]);
                    }
                }
                cur.splice.apply(cur, splice);
            }
        }
        for (i = 0, ii = cur.length; i < ii; i++) {
            e = cur[i];
            while (e.n) {
                if (f) {
                    if (e.f) {
                        for (j = 0, jj = e.f.length; j < jj; j++) if (e.f[j] == f) {
                            e.f.splice(j, 1);
                            break;
                        }
                        !e.f.length && delete e.f;
                    }
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        var funcs = e.n[key].f;
                        for (j = 0, jj = funcs.length; j < jj; j++) if (funcs[j] == f) {
                            funcs.splice(j, 1);
                            break;
                        }
                        !funcs.length && delete e.n[key].f;
                    }
                } else {
                    delete e.f;
                    for (key in e.n) if (e.n[has](key) && e.n[key].f) {
                        delete e.n[key].f;
                    }
                }
                e = e.n;
            }
        }
    };
    
    eve.once = function (name, f) {
        var f2 = function () {
            var res = f.apply(this, arguments);
            eve.unbind(name, f2);
            return res;
        };
        return eve.on(name, f2);
    };
    
    eve.version = version;
    eve.toString = function () {
        return "You are running Eve " + version;
    };
    (typeof module != "undefined" && module.exports) ? (module.exports = eve) : (typeof define != "undefined" ? (define("eve", [], function() { return eve; })) : (glob.eve = eve));
})(this);


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ "Raphaël 2.1.0" - JavaScript Vector Library                         │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
(function () {
    
    function R(first) {
        if (R.is(first, "function")) {
            return loaded ? first() : eve.on("raphael.DOMload", first);
        } else if (R.is(first, array)) {
            return R._engine.create[apply](R, first.splice(0, 3 + R.is(first[0], nu))).add(first);
        } else {
            var args = Array.prototype.slice.call(arguments, 0);
            if (R.is(args[args.length - 1], "function")) {
                var f = args.pop();
                return loaded ? f.call(R._engine.create[apply](R, args)) : eve.on("raphael.DOMload", function () {
                    f.call(R._engine.create[apply](R, args));
                });
            } else {
                return R._engine.create[apply](R, arguments);
            }
        }
    }
    R.version = "2.1.0";
    R.eve = eve;
    var loaded,
        separator = /[, ]+/,
        elements = {circle: 1, rect: 1, path: 1, ellipse: 1, text: 1, image: 1},
        formatrg = /\{(\d+)\}/g,
        proto = "prototype",
        has = "hasOwnProperty",
        g = {
            doc: document,
            win: window
        },
        oldRaphael = {
            was: Object.prototype[has].call(g.win, "Raphael"),
            is: g.win.Raphael
        },
        Paper = function () {
            
            
            this.ca = this.customAttributes = {};
        },
        paperproto,
        appendChild = "appendChild",
        apply = "apply",
        concat = "concat",
        supportsTouch = "createTouch" in g.doc,
        E = "",
        S = " ",
        Str = String,
        split = "split",
        events = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel"[split](S),
        touchMap = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        lowerCase = Str.prototype.toLowerCase,
        math = Math,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        pow = math.pow,
        PI = math.PI,
        nu = "number",
        string = "string",
        array = "array",
        toString = "toString",
        fillString = "fill",
        objectToString = Object.prototype.toString,
        paper = {},
        push = "push",
        ISURL = R._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i,
        colourRegExp = /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i,
        isnan = {"NaN": 1, "Infinity": 1, "-Infinity": 1},
        bezierrg = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        round = math.round,
        setAttribute = "setAttribute",
        toFloat = parseFloat,
        toInt = parseInt,
        upperCase = Str.prototype.toUpperCase,
        availableAttrs = R._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        availableAnimAttrs = R._availableAnimAttrs = {
            blur: nu,
            "clip-rect": "csv",
            cx: nu,
            cy: nu,
            fill: "colour",
            "fill-opacity": nu,
            "font-size": nu,
            height: nu,
            opacity: nu,
            path: "path",
            r: nu,
            rx: nu,
            ry: nu,
            stroke: "colour",
            "stroke-opacity": nu,
            "stroke-width": nu,
            transform: "transform",
            width: nu,
            x: nu,
            y: nu
        },
        whitespace = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]/g,
        commaSpaces = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        hsrg = {hs: 1, rg: 1},
        p2s = /,?([achlmqrstvxz]),?/gi,
        pathCommand = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        tCommand = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/ig,
        pathValues = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/ig,
        radial_gradient = R._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/,
        eldata = {},
        sortByKey = function (a, b) {
            return a.key - b.key;
        },
        sortByNumber = function (a, b) {
            return toFloat(a) - toFloat(b);
        },
        fun = function () {},
        pipe = function (x) {
            return x;
        },
        rectPath = R._rectPath = function (x, y, w, h, r) {
            if (r) {
                return [["M", x + r, y], ["l", w - r * 2, 0], ["a", r, r, 0, 0, 1, r, r], ["l", 0, h - r * 2], ["a", r, r, 0, 0, 1, -r, r], ["l", r * 2 - w, 0], ["a", r, r, 0, 0, 1, -r, -r], ["l", 0, r * 2 - h], ["a", r, r, 0, 0, 1, r, -r], ["z"]];
            }
            return [["M", x, y], ["l", w, 0], ["l", 0, h], ["l", -w, 0], ["z"]];
        },
        ellipsePath = function (x, y, rx, ry) {
            if (ry == null) {
                ry = rx;
            }
            return [["M", x, y], ["m", 0, -ry], ["a", rx, ry, 0, 1, 1, 0, 2 * ry], ["a", rx, ry, 0, 1, 1, 0, -2 * ry], ["z"]];
        },
        getPath = R._getPath = {
            path: function (el) {
                return el.attr("path");
            },
            circle: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.r);
            },
            ellipse: function (el) {
                var a = el.attrs;
                return ellipsePath(a.cx, a.cy, a.rx, a.ry);
            },
            rect: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height, a.r);
            },
            image: function (el) {
                var a = el.attrs;
                return rectPath(a.x, a.y, a.width, a.height);
            },
            text: function (el) {
                var bbox = el._getBBox();
                return rectPath(bbox.x, bbox.y, bbox.width, bbox.height);
            }
        },
        
        mapPath = R.mapPath = function (path, matrix) {
            if (!matrix) {
                return path;
            }
            var x, y, i, j, ii, jj, pathi;
            path = path2curve(path);
            for (i = 0, ii = path.length; i < ii; i++) {
                pathi = path[i];
                for (j = 1, jj = pathi.length; j < jj; j += 2) {
                    x = matrix.x(pathi[j], pathi[j + 1]);
                    y = matrix.y(pathi[j], pathi[j + 1]);
                    pathi[j] = x;
                    pathi[j + 1] = y;
                }
            }
            return path;
        };

    R._g = g;
    
    R.type = (g.win.SVGAngle || g.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML");
    if (R.type == "VML") {
        var d = g.doc.createElement("div"),
            b;
        d.innerHTML = '<v:shape adj="1"/>';
        b = d.firstChild;
        b.style.behavior = "url(#default#VML)";
        if (!(b && typeof b.adj == "object")) {
            return (R.type = E);
        }
        d = null;
    }
    
    
    R.svg = !(R.vml = R.type == "VML");
    R._Paper = Paper;
    
    R.fn = paperproto = Paper.prototype = R.prototype;
    R._id = 0;
    R._oid = 0;
    
    R.is = function (o, type) {
        type = lowerCase.call(type);
        if (type == "finite") {
            return !isnan[has](+o);
        }
        if (type == "array") {
            return o instanceof Array;
        }
        return  (type == "null" && o === null) ||
                (type == typeof o && o !== null) ||
                (type == "object" && o === Object(o)) ||
                (type == "array" && Array.isArray && Array.isArray(o)) ||
                objectToString.call(o).slice(8, -1).toLowerCase() == type;
    };

    function clone(obj) {
        if (Object(obj) !== obj) {
            return obj;
        }
        var res = new obj.constructor;
        for (var key in obj) if (obj[has](key)) {
            res[key] = clone(obj[key]);
        }
        return res;
    }

    
    R.angle = function (x1, y1, x2, y2, x3, y3) {
        if (x3 == null) {
            var x = x1 - x2,
                y = y1 - y2;
            if (!x && !y) {
                return 0;
            }
            return (180 + math.atan2(-y, -x) * 180 / PI + 360) % 360;
        } else {
            return R.angle(x1, y1, x3, y3) - R.angle(x2, y2, x3, y3);
        }
    };
    
    R.rad = function (deg) {
        return deg % 360 * PI / 180;
    };
    
    R.deg = function (rad) {
        return rad * 180 / PI % 360;
    };
    
    R.snapTo = function (values, value, tolerance) {
        tolerance = R.is(tolerance, "finite") ? tolerance : 10;
        if (R.is(values, array)) {
            var i = values.length;
            while (i--) if (abs(values[i] - value) <= tolerance) {
                return values[i];
            }
        } else {
            values = +values;
            var rem = value % values;
            if (rem < tolerance) {
                return value - rem;
            }
            if (rem > values - tolerance) {
                return value - rem + values;
            }
        }
        return value;
    };
    
    
    var createUUID = R.createUUID = (function (uuidRegEx, uuidReplacer) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(uuidRegEx, uuidReplacer).toUpperCase();
        };
    })(/[xy]/g, function (c) {
        var r = math.random() * 16 | 0,
            v = c == "x" ? r : (r & 3 | 8);
        return v.toString(16);
    });

    
    R.setWindow = function (newwin) {
        eve("raphael.setWindow", R, g.win, newwin);
        g.win = newwin;
        g.doc = g.win.document;
        if (R._engine.initWin) {
            R._engine.initWin(g.win);
        }
    };
    var toHex = function (color) {
        if (R.vml) {
            // http://dean.edwards.name/weblog/2009/10/convert-any-colour-value-to-hex-in-msie/
            var trim = /^\s+|\s+$/g;
            var bod;
            try {
                var docum = new ActiveXObject("htmlfile");
                docum.write("<body>");
                docum.close();
                bod = docum.body;
            } catch(e) {
                bod = createPopup().document.body;
            }
            var range = bod.createTextRange();
            toHex = cacher(function (color) {
                try {
                    bod.style.color = Str(color).replace(trim, E);
                    var value = range.queryCommandValue("ForeColor");
                    value = ((value & 255) << 16) | (value & 65280) | ((value & 16711680) >>> 16);
                    return "#" + ("000000" + value.toString(16)).slice(-6);
                } catch(e) {
                    return "none";
                }
            });
        } else {
            var i = g.doc.createElement("i");
            i.title = "Rapha\xebl Colour Picker";
            i.style.display = "none";
            g.doc.body.appendChild(i);
            toHex = cacher(function (color) {
                i.style.color = color;
                return g.doc.defaultView.getComputedStyle(i, E).getPropertyValue("color");
            });
        }
        return toHex(color);
    },
    hsbtoString = function () {
        return "hsb(" + [this.h, this.s, this.b] + ")";
    },
    hsltoString = function () {
        return "hsl(" + [this.h, this.s, this.l] + ")";
    },
    rgbtoString = function () {
        return this.hex;
    },
    prepareRGB = function (r, g, b) {
        if (g == null && R.is(r, "object") && "r" in r && "g" in r && "b" in r) {
            b = r.b;
            g = r.g;
            r = r.r;
        }
        if (g == null && R.is(r, string)) {
            var clr = R.getRGB(r);
            r = clr.r;
            g = clr.g;
            b = clr.b;
        }
        if (r > 1 || g > 1 || b > 1) {
            r /= 255;
            g /= 255;
            b /= 255;
        }
        
        return [r, g, b];
    },
    packageRGB = function (r, g, b, o) {
        r *= 255;
        g *= 255;
        b *= 255;
        var rgb = {
            r: r,
            g: g,
            b: b,
            hex: R.rgb(r, g, b),
            toString: rgbtoString
        };
        R.is(o, "finite") && (rgb.opacity = o);
        return rgb;
    };
    
    
    R.color = function (clr) {
        var rgb;
        if (R.is(clr, "object") && "h" in clr && "s" in clr && "b" in clr) {
            rgb = R.hsb2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else if (R.is(clr, "object") && "h" in clr && "s" in clr && "l" in clr) {
            rgb = R.hsl2rgb(clr);
            clr.r = rgb.r;
            clr.g = rgb.g;
            clr.b = rgb.b;
            clr.hex = rgb.hex;
        } else {
            if (R.is(clr, "string")) {
                clr = R.getRGB(clr);
            }
            if (R.is(clr, "object") && "r" in clr && "g" in clr && "b" in clr) {
                rgb = R.rgb2hsl(clr);
                clr.h = rgb.h;
                clr.s = rgb.s;
                clr.l = rgb.l;
                rgb = R.rgb2hsb(clr);
                clr.v = rgb.b;
            } else {
                clr = {hex: "none"};
                clr.r = clr.g = clr.b = clr.h = clr.s = clr.v = clr.l = -1;
            }
        }
        clr.toString = rgbtoString;
        return clr;
    };
    
    R.hsb2rgb = function (h, s, v, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "b" in h) {
            v = h.b;
            s = h.s;
            h = h.h;
            o = h.o;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = v * s;
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = v - C;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.hsl2rgb = function (h, s, l, o) {
        if (this.is(h, "object") && "h" in h && "s" in h && "l" in h) {
            l = h.l;
            s = h.s;
            h = h.h;
        }
        if (h > 1 || s > 1 || l > 1) {
            h /= 360;
            s /= 100;
            l /= 100;
        }
        h *= 360;
        var R, G, B, X, C;
        h = (h % 360) / 60;
        C = 2 * s * (l < .5 ? l : 1 - l);
        X = C * (1 - abs(h % 2 - 1));
        R = G = B = l - C / 2;

        h = ~~h;
        R += [C, X, 0, 0, X, C][h];
        G += [X, C, C, X, 0, 0][h];
        B += [0, 0, X, C, C, X][h];
        return packageRGB(R, G, B, o);
    };
    
    R.rgb2hsb = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, V, C;
        V = mmax(r, g, b);
        C = V - mmin(r, g, b);
        H = (C == 0 ? null :
             V == r ? (g - b) / C :
             V == g ? (b - r) / C + 2 :
                      (r - g) / C + 4
            );
        H = ((H + 360) % 6) * 60 / 360;
        S = C == 0 ? 0 : C / V;
        return {h: H, s: S, b: V, toString: hsbtoString};
    };
    
    R.rgb2hsl = function (r, g, b) {
        b = prepareRGB(r, g, b);
        r = b[0];
        g = b[1];
        b = b[2];

        var H, S, L, M, m, C;
        M = mmax(r, g, b);
        m = mmin(r, g, b);
        C = M - m;
        H = (C == 0 ? null :
             M == r ? (g - b) / C :
             M == g ? (b - r) / C + 2 :
                      (r - g) / C + 4);
        H = ((H + 360) % 6) * 60 / 360;
        L = (M + m) / 2;
        S = (C == 0 ? 0 :
             L < .5 ? C / (2 * L) :
                      C / (2 - 2 * L));
        return {h: H, s: S, l: L, toString: hsltoString};
    };
    R._path2string = function () {
        return this.join(",").replace(p2s, "$1");
    };
    function repush(array, item) {
        for (var i = 0, ii = array.length; i < ii; i++) if (array[i] === item) {
            return array.push(array.splice(i, 1)[0]);
        }
    }
    function cacher(f, scope, postprocessor) {
        function newf() {
            var arg = Array.prototype.slice.call(arguments, 0),
                args = arg.join("\u2400"),
                cache = newf.cache = newf.cache || {},
                count = newf.count = newf.count || [];
            if (cache[has](args)) {
                repush(count, args);
                return postprocessor ? postprocessor(cache[args]) : cache[args];
            }
            count.length >= 1e3 && delete cache[count.shift()];
            count.push(args);
            cache[args] = f[apply](scope, arg);
            return postprocessor ? postprocessor(cache[args]) : cache[args];
        }
        return newf;
    }

    var preload = R._preload = function (src, f) {
        var img = g.doc.createElement("img");
        img.style.cssText = "position:absolute;left:-9999em;top:-9999em";
        img.onload = function () {
            f.call(this);
            this.onload = null;
            g.doc.body.removeChild(this);
        };
        img.onerror = function () {
            g.doc.body.removeChild(this);
        };
        g.doc.body.appendChild(img);
        img.src = src;
    };
    
    function clrToString() {
        return this.hex;
    }

    
    R.getRGB = cacher(function (colour) {
        if (!colour || !!((colour = Str(colour)).indexOf("-") + 1)) {
            return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
        }
        if (colour == "none") {
            return {r: -1, g: -1, b: -1, hex: "none", toString: clrToString};
        }
        !(hsrg[has](colour.toLowerCase().substring(0, 2)) || colour.charAt() == "#") && (colour = toHex(colour));
        var res,
            red,
            green,
            blue,
            opacity,
            t,
            values,
            rgb = colour.match(colourRegExp);
        if (rgb) {
            if (rgb[2]) {
                blue = toInt(rgb[2].substring(5), 16);
                green = toInt(rgb[2].substring(3, 5), 16);
                red = toInt(rgb[2].substring(1, 3), 16);
            }
            if (rgb[3]) {
                blue = toInt((t = rgb[3].charAt(3)) + t, 16);
                green = toInt((t = rgb[3].charAt(2)) + t, 16);
                red = toInt((t = rgb[3].charAt(1)) + t, 16);
            }
            if (rgb[4]) {
                values = rgb[4][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                rgb[1].toLowerCase().slice(0, 4) == "rgba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
            }
            if (rgb[5]) {
                values = rgb[5][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsba" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsb2rgb(red, green, blue, opacity);
            }
            if (rgb[6]) {
                values = rgb[6][split](commaSpaces);
                red = toFloat(values[0]);
                values[0].slice(-1) == "%" && (red *= 2.55);
                green = toFloat(values[1]);
                values[1].slice(-1) == "%" && (green *= 2.55);
                blue = toFloat(values[2]);
                values[2].slice(-1) == "%" && (blue *= 2.55);
                (values[0].slice(-3) == "deg" || values[0].slice(-1) == "\xb0") && (red /= 360);
                rgb[1].toLowerCase().slice(0, 4) == "hsla" && (opacity = toFloat(values[3]));
                values[3] && values[3].slice(-1) == "%" && (opacity /= 100);
                return R.hsl2rgb(red, green, blue, opacity);
            }
            rgb = {r: red, g: green, b: blue, toString: clrToString};
            rgb.hex = "#" + (16777216 | blue | (green << 8) | (red << 16)).toString(16).slice(1);
            R.is(opacity, "finite") && (rgb.opacity = opacity);
            return rgb;
        }
        return {r: -1, g: -1, b: -1, hex: "none", error: 1, toString: clrToString};
    }, R);
    
    R.hsb = cacher(function (h, s, b) {
        return R.hsb2rgb(h, s, b).hex;
    });
    
    R.hsl = cacher(function (h, s, l) {
        return R.hsl2rgb(h, s, l).hex;
    });
    
    R.rgb = cacher(function (r, g, b) {
        return "#" + (16777216 | b | (g << 8) | (r << 16)).toString(16).slice(1);
    });
    
    R.getColor = function (value) {
        var start = this.getColor.start = this.getColor.start || {h: 0, s: 1, b: value || .75},
            rgb = this.hsb2rgb(start.h, start.s, start.b);
        start.h += .075;
        if (start.h > 1) {
            start.h = 0;
            start.s -= .2;
            start.s <= 0 && (this.getColor.start = {h: 0, s: 1, b: start.b});
        }
        return rgb.hex;
    };
    
    R.getColor.reset = function () {
        delete this.start;
    };

    // http://schepers.cc/getting-to-the-point
    function catmullRom2bezier(crp, z) {
        var d = [];
        for (var i = 0, iLen = crp.length; iLen - 2 * !z > i; i += 2) {
            var p = [
                        {x: +crp[i - 2], y: +crp[i - 1]},
                        {x: +crp[i],     y: +crp[i + 1]},
                        {x: +crp[i + 2], y: +crp[i + 3]},
                        {x: +crp[i + 4], y: +crp[i + 5]}
                    ];
            if (z) {
                if (!i) {
                    p[0] = {x: +crp[iLen - 2], y: +crp[iLen - 1]};
                } else if (iLen - 4 == i) {
                    p[3] = {x: +crp[0], y: +crp[1]};
                } else if (iLen - 2 == i) {
                    p[2] = {x: +crp[0], y: +crp[1]};
                    p[3] = {x: +crp[2], y: +crp[3]};
                }
            } else {
                if (iLen - 4 == i) {
                    p[3] = p[2];
                } else if (!i) {
                    p[0] = {x: +crp[i], y: +crp[i + 1]};
                }
            }
            d.push(["C",
                  (-p[0].x + 6 * p[1].x + p[2].x) / 6,
                  (-p[0].y + 6 * p[1].y + p[2].y) / 6,
                  (p[1].x + 6 * p[2].x - p[3].x) / 6,
                  (p[1].y + 6*p[2].y - p[3].y) / 6,
                  p[2].x,
                  p[2].y
            ]);
        }

        return d;
    }
    
    R.parsePathString = function (pathString) {
        if (!pathString) {
            return null;
        }
        var pth = paths(pathString);
        if (pth.arr) {
            return pathClone(pth.arr);
        }
        
        var paramCounts = {a: 7, c: 6, h: 1, l: 2, m: 2, r: 4, q: 4, s: 4, t: 2, v: 1, z: 0},
            data = [];
        if (R.is(pathString, array) && R.is(pathString[0], array)) { // rough assumption
            data = pathClone(pathString);
        }
        if (!data.length) {
            Str(pathString).replace(pathCommand, function (a, b, c) {
                var params = [],
                    name = b.toLowerCase();
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                if (name == "m" && params.length > 2) {
                    data.push([b][concat](params.splice(0, 2)));
                    name = "l";
                    b = b == "m" ? "l" : "L";
                }
                if (name == "r") {
                    data.push([b][concat](params));
                } else while (params.length >= paramCounts[name]) {
                    data.push([b][concat](params.splice(0, paramCounts[name])));
                    if (!paramCounts[name]) {
                        break;
                    }
                }
            });
        }
        data.toString = R._path2string;
        pth.arr = pathClone(data);
        return data;
    };
    
    R.parseTransformString = cacher(function (TString) {
        if (!TString) {
            return null;
        }
        var paramCounts = {r: 3, s: 4, t: 2, m: 6},
            data = [];
        if (R.is(TString, array) && R.is(TString[0], array)) { // rough assumption
            data = pathClone(TString);
        }
        if (!data.length) {
            Str(TString).replace(tCommand, function (a, b, c) {
                var params = [],
                    name = lowerCase.call(b);
                c.replace(pathValues, function (a, b) {
                    b && params.push(+b);
                });
                data.push([b][concat](params));
            });
        }
        data.toString = R._path2string;
        return data;
    });
    // PATHS
    var paths = function (ps) {
        var p = paths.ps = paths.ps || {};
        if (p[ps]) {
            p[ps].sleep = 100;
        } else {
            p[ps] = {
                sleep: 100
            };
        }
        setTimeout(function () {
            for (var key in p) if (p[has](key) && key != ps) {
                p[key].sleep--;
                !p[key].sleep && delete p[key];
            }
        });
        return p[ps];
    };
    
    R.findDotsAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
        var t1 = 1 - t,
            t13 = pow(t1, 3),
            t12 = pow(t1, 2),
            t2 = t * t,
            t3 = t2 * t,
            x = t13 * p1x + t12 * 3 * t * c1x + t1 * 3 * t * t * c2x + t3 * p2x,
            y = t13 * p1y + t12 * 3 * t * c1y + t1 * 3 * t * t * c2y + t3 * p2y,
            mx = p1x + 2 * t * (c1x - p1x) + t2 * (c2x - 2 * c1x + p1x),
            my = p1y + 2 * t * (c1y - p1y) + t2 * (c2y - 2 * c1y + p1y),
            nx = c1x + 2 * t * (c2x - c1x) + t2 * (p2x - 2 * c2x + c1x),
            ny = c1y + 2 * t * (c2y - c1y) + t2 * (p2y - 2 * c2y + c1y),
            ax = t1 * p1x + t * c1x,
            ay = t1 * p1y + t * c1y,
            cx = t1 * c2x + t * p2x,
            cy = t1 * c2y + t * p2y,
            alpha = (90 - math.atan2(mx - nx, my - ny) * 180 / PI);
        (mx > nx || my < ny) && (alpha += 180);
        return {
            x: x,
            y: y,
            m: {x: mx, y: my},
            n: {x: nx, y: ny},
            start: {x: ax, y: ay},
            end: {x: cx, y: cy},
            alpha: alpha
        };
    };
    
    R.bezierBBox = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
        if (!R.is(p1x, "array")) {
            p1x = [p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y];
        }
        var bbox = curveDim.apply(null, p1x);
        return {
            x: bbox.min.x,
            y: bbox.min.y,
            x2: bbox.max.x,
            y2: bbox.max.y,
            width: bbox.max.x - bbox.min.x,
            height: bbox.max.y - bbox.min.y
        };
    };
    
    R.isPointInsideBBox = function (bbox, x, y) {
        return x >= bbox.x && x <= bbox.x2 && y >= bbox.y && y <= bbox.y2;
    };
    
    R.isBBoxIntersect = function (bbox1, bbox2) {
        var i = R.isPointInsideBBox;
        return i(bbox2, bbox1.x, bbox1.y)
            || i(bbox2, bbox1.x2, bbox1.y)
            || i(bbox2, bbox1.x, bbox1.y2)
            || i(bbox2, bbox1.x2, bbox1.y2)
            || i(bbox1, bbox2.x, bbox2.y)
            || i(bbox1, bbox2.x2, bbox2.y)
            || i(bbox1, bbox2.x, bbox2.y2)
            || i(bbox1, bbox2.x2, bbox2.y2)
            || (bbox1.x < bbox2.x2 && bbox1.x > bbox2.x || bbox2.x < bbox1.x2 && bbox2.x > bbox1.x)
            && (bbox1.y < bbox2.y2 && bbox1.y > bbox2.y || bbox2.y < bbox1.y2 && bbox2.y > bbox1.y);
    };
    function base3(t, p1, p2, p3, p4) {
        var t1 = -3 * p1 + 9 * p2 - 9 * p3 + 3 * p4,
            t2 = t * t1 + 6 * p1 - 12 * p2 + 6 * p3;
        return t * t2 - 3 * p1 + 3 * p2;
    }
    function bezlen(x1, y1, x2, y2, x3, y3, x4, y4, z) {
        if (z == null) {
            z = 1;
        }
        z = z > 1 ? 1 : z < 0 ? 0 : z;
        var z2 = z / 2,
            n = 12,
            Tvalues = [-0.1252,0.1252,-0.3678,0.3678,-0.5873,0.5873,-0.7699,0.7699,-0.9041,0.9041,-0.9816,0.9816],
            Cvalues = [0.2491,0.2491,0.2335,0.2335,0.2032,0.2032,0.1601,0.1601,0.1069,0.1069,0.0472,0.0472],
            sum = 0;
        for (var i = 0; i < n; i++) {
            var ct = z2 * Tvalues[i] + z2,
                xbase = base3(ct, x1, x2, x3, x4),
                ybase = base3(ct, y1, y2, y3, y4),
                comb = xbase * xbase + ybase * ybase;
            sum += Cvalues[i] * math.sqrt(comb);
        }
        return z2 * sum;
    }
    function getTatLen(x1, y1, x2, y2, x3, y3, x4, y4, ll) {
        if (ll < 0 || bezlen(x1, y1, x2, y2, x3, y3, x4, y4) < ll) {
            return;
        }
        var t = 1,
            step = t / 2,
            t2 = t - step,
            l,
            e = .01;
        l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        while (abs(l - ll) > e) {
            step /= 2;
            t2 += (l < ll ? 1 : -1) * step;
            l = bezlen(x1, y1, x2, y2, x3, y3, x4, y4, t2);
        }
        return t2;
    }
    function intersect(x1, y1, x2, y2, x3, y3, x4, y4) {
        if (
            mmax(x1, x2) < mmin(x3, x4) ||
            mmin(x1, x2) > mmax(x3, x4) ||
            mmax(y1, y2) < mmin(y3, y4) ||
            mmin(y1, y2) > mmax(y3, y4)
        ) {
            return;
        }
        var nx = (x1 * y2 - y1 * x2) * (x3 - x4) - (x1 - x2) * (x3 * y4 - y3 * x4),
            ny = (x1 * y2 - y1 * x2) * (y3 - y4) - (y1 - y2) * (x3 * y4 - y3 * x4),
            denominator = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

        if (!denominator) {
            return;
        }
        var px = nx / denominator,
            py = ny / denominator,
            px2 = +px.toFixed(2),
            py2 = +py.toFixed(2);
        if (
            px2 < +mmin(x1, x2).toFixed(2) ||
            px2 > +mmax(x1, x2).toFixed(2) ||
            px2 < +mmin(x3, x4).toFixed(2) ||
            px2 > +mmax(x3, x4).toFixed(2) ||
            py2 < +mmin(y1, y2).toFixed(2) ||
            py2 > +mmax(y1, y2).toFixed(2) ||
            py2 < +mmin(y3, y4).toFixed(2) ||
            py2 > +mmax(y3, y4).toFixed(2)
        ) {
            return;
        }
        return {x: px, y: py};
    }
    function inter(bez1, bez2) {
        return interHelper(bez1, bez2);
    }
    function interCount(bez1, bez2) {
        return interHelper(bez1, bez2, 1);
    }
    function interHelper(bez1, bez2, justCount) {
        var bbox1 = R.bezierBBox(bez1),
            bbox2 = R.bezierBBox(bez2);
        if (!R.isBBoxIntersect(bbox1, bbox2)) {
            return justCount ? 0 : [];
        }
        var l1 = bezlen.apply(0, bez1),
            l2 = bezlen.apply(0, bez2),
            n1 = ~~(l1 / 5),
            n2 = ~~(l2 / 5),
            dots1 = [],
            dots2 = [],
            xy = {},
            res = justCount ? 0 : [];
        for (var i = 0; i < n1 + 1; i++) {
            var p = R.findDotsAtSegment.apply(R, bez1.concat(i / n1));
            dots1.push({x: p.x, y: p.y, t: i / n1});
        }
        for (i = 0; i < n2 + 1; i++) {
            p = R.findDotsAtSegment.apply(R, bez2.concat(i / n2));
            dots2.push({x: p.x, y: p.y, t: i / n2});
        }
        for (i = 0; i < n1; i++) {
            for (var j = 0; j < n2; j++) {
                var di = dots1[i],
                    di1 = dots1[i + 1],
                    dj = dots2[j],
                    dj1 = dots2[j + 1],
                    ci = abs(di1.x - di.x) < .001 ? "y" : "x",
                    cj = abs(dj1.x - dj.x) < .001 ? "y" : "x",
                    is = intersect(di.x, di.y, di1.x, di1.y, dj.x, dj.y, dj1.x, dj1.y);
                if (is) {
                    if (xy[is.x.toFixed(4)] == is.y.toFixed(4)) {
                        continue;
                    }
                    xy[is.x.toFixed(4)] = is.y.toFixed(4);
                    var t1 = di.t + abs((is[ci] - di[ci]) / (di1[ci] - di[ci])) * (di1.t - di.t),
                        t2 = dj.t + abs((is[cj] - dj[cj]) / (dj1[cj] - dj[cj])) * (dj1.t - dj.t);
                    if (t1 >= 0 && t1 <= 1 && t2 >= 0 && t2 <= 1) {
                        if (justCount) {
                            res++;
                        } else {
                            res.push({
                                x: is.x,
                                y: is.y,
                                t1: t1,
                                t2: t2
                            });
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.pathIntersection = function (path1, path2) {
        return interPathHelper(path1, path2);
    };
    R.pathIntersectionNumber = function (path1, path2) {
        return interPathHelper(path1, path2, 1);
    };
    function interPathHelper(path1, path2, justCount) {
        path1 = R._path2curve(path1);
        path2 = R._path2curve(path2);
        var x1, y1, x2, y2, x1m, y1m, x2m, y2m, bez1, bez2,
            res = justCount ? 0 : [];
        for (var i = 0, ii = path1.length; i < ii; i++) {
            var pi = path1[i];
            if (pi[0] == "M") {
                x1 = x1m = pi[1];
                y1 = y1m = pi[2];
            } else {
                if (pi[0] == "C") {
                    bez1 = [x1, y1].concat(pi.slice(1));
                    x1 = bez1[6];
                    y1 = bez1[7];
                } else {
                    bez1 = [x1, y1, x1, y1, x1m, y1m, x1m, y1m];
                    x1 = x1m;
                    y1 = y1m;
                }
                for (var j = 0, jj = path2.length; j < jj; j++) {
                    var pj = path2[j];
                    if (pj[0] == "M") {
                        x2 = x2m = pj[1];
                        y2 = y2m = pj[2];
                    } else {
                        if (pj[0] == "C") {
                            bez2 = [x2, y2].concat(pj.slice(1));
                            x2 = bez2[6];
                            y2 = bez2[7];
                        } else {
                            bez2 = [x2, y2, x2, y2, x2m, y2m, x2m, y2m];
                            x2 = x2m;
                            y2 = y2m;
                        }
                        var intr = interHelper(bez1, bez2, justCount);
                        if (justCount) {
                            res += intr;
                        } else {
                            for (var k = 0, kk = intr.length; k < kk; k++) {
                                intr[k].segment1 = i;
                                intr[k].segment2 = j;
                                intr[k].bez1 = bez1;
                                intr[k].bez2 = bez2;
                            }
                            res = res.concat(intr);
                        }
                    }
                }
            }
        }
        return res;
    }
    
    R.isPointInsidePath = function (path, x, y) {
        var bbox = R.pathBBox(path);
        return R.isPointInsideBBox(bbox, x, y) &&
               interPathHelper(path, [["M", x, y], ["H", bbox.x2 + 10]], 1) % 2 == 1;
    };
    R._removedFactory = function (methodname) {
        return function () {
            eve("raphael.log", null, "Rapha\xebl: you are calling to method \u201c" + methodname + "\u201d of removed object", methodname);
        };
    };
    
    var pathDimensions = R.pathBBox = function (path) {
        var pth = paths(path);
        if (pth.bbox) {
            return pth.bbox;
        }
        if (!path) {
            return {x: 0, y: 0, width: 0, height: 0, x2: 0, y2: 0};
        }
        path = path2curve(path);
        var x = 0, 
            y = 0,
            X = [],
            Y = [],
            p;
        for (var i = 0, ii = path.length; i < ii; i++) {
            p = path[i];
            if (p[0] == "M") {
                x = p[1];
                y = p[2];
                X.push(x);
                Y.push(y);
            } else {
                var dim = curveDim(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                X = X[concat](dim.min.x, dim.max.x);
                Y = Y[concat](dim.min.y, dim.max.y);
                x = p[5];
                y = p[6];
            }
        }
        var xmin = mmin[apply](0, X),
            ymin = mmin[apply](0, Y),
            xmax = mmax[apply](0, X),
            ymax = mmax[apply](0, Y),
            bb = {
                x: xmin,
                y: ymin,
                x2: xmax,
                y2: ymax,
                width: xmax - xmin,
                height: ymax - ymin
            };
        pth.bbox = clone(bb);
        return bb;
    },
        pathClone = function (pathArray) {
            var res = clone(pathArray);
            res.toString = R._path2string;
            return res;
        },
        pathToRelative = R._pathToRelative = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.rel) {
                return pathClone(pth.rel);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = pathArray[0][1];
                y = pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res.push(["M", x, y]);
            }
            for (var i = start, ii = pathArray.length; i < ii; i++) {
                var r = res[i] = [],
                    pa = pathArray[i];
                if (pa[0] != lowerCase.call(pa[0])) {
                    r[0] = lowerCase.call(pa[0]);
                    switch (r[0]) {
                        case "a":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] - x).toFixed(3);
                            r[7] = +(pa[7] - y).toFixed(3);
                            break;
                        case "v":
                            r[1] = +(pa[1] - y).toFixed(3);
                            break;
                        case "m":
                            mx = pa[1];
                            my = pa[2];
                        default:
                            for (var j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +(pa[j] - ((j % 2) ? x : y)).toFixed(3);
                            }
                    }
                } else {
                    r = res[i] = [];
                    if (pa[0] == "m") {
                        mx = pa[1] + x;
                        my = pa[2] + y;
                    }
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        res[i][k] = pa[k];
                    }
                }
                var len = res[i].length;
                switch (res[i][0]) {
                    case "z":
                        x = mx;
                        y = my;
                        break;
                    case "h":
                        x += +res[i][len - 1];
                        break;
                    case "v":
                        y += +res[i][len - 1];
                        break;
                    default:
                        x += +res[i][len - 2];
                        y += +res[i][len - 1];
                }
            }
            res.toString = R._path2string;
            pth.rel = pathClone(res);
            return res;
        },
        pathToAbsolute = R._pathToAbsolute = function (pathArray) {
            var pth = paths(pathArray);
            if (pth.abs) {
                return pathClone(pth.abs);
            }
            if (!R.is(pathArray, array) || !R.is(pathArray && pathArray[0], array)) { // rough assumption
                pathArray = R.parsePathString(pathArray);
            }
            if (!pathArray || !pathArray.length) {
                return [["M", 0, 0]];
            }
            var res = [],
                x = 0,
                y = 0,
                mx = 0,
                my = 0,
                start = 0;
            if (pathArray[0][0] == "M") {
                x = +pathArray[0][1];
                y = +pathArray[0][2];
                mx = x;
                my = y;
                start++;
                res[0] = ["M", x, y];
            }
            var crz = pathArray.length == 3 && pathArray[0][0] == "M" && pathArray[1][0].toUpperCase() == "R" && pathArray[2][0].toUpperCase() == "Z";
            for (var r, pa, i = start, ii = pathArray.length; i < ii; i++) {
                res.push(r = []);
                pa = pathArray[i];
                if (pa[0] != upperCase.call(pa[0])) {
                    r[0] = upperCase.call(pa[0]);
                    switch (r[0]) {
                        case "A":
                            r[1] = pa[1];
                            r[2] = pa[2];
                            r[3] = pa[3];
                            r[4] = pa[4];
                            r[5] = pa[5];
                            r[6] = +(pa[6] + x);
                            r[7] = +(pa[7] + y);
                            break;
                        case "V":
                            r[1] = +pa[1] + y;
                            break;
                        case "H":
                            r[1] = +pa[1] + x;
                            break;
                        case "R":
                            var dots = [x, y][concat](pa.slice(1));
                            for (var j = 2, jj = dots.length; j < jj; j++) {
                                dots[j] = +dots[j] + x;
                                dots[++j] = +dots[j] + y;
                            }
                            res.pop();
                            res = res[concat](catmullRom2bezier(dots, crz));
                            break;
                        case "M":
                            mx = +pa[1] + x;
                            my = +pa[2] + y;
                        default:
                            for (j = 1, jj = pa.length; j < jj; j++) {
                                r[j] = +pa[j] + ((j % 2) ? x : y);
                            }
                    }
                } else if (pa[0] == "R") {
                    dots = [x, y][concat](pa.slice(1));
                    res.pop();
                    res = res[concat](catmullRom2bezier(dots, crz));
                    r = ["R"][concat](pa.slice(-2));
                } else {
                    for (var k = 0, kk = pa.length; k < kk; k++) {
                        r[k] = pa[k];
                    }
                }
                switch (r[0]) {
                    case "Z":
                        x = mx;
                        y = my;
                        break;
                    case "H":
                        x = r[1];
                        break;
                    case "V":
                        y = r[1];
                        break;
                    case "M":
                        mx = r[r.length - 2];
                        my = r[r.length - 1];
                    default:
                        x = r[r.length - 2];
                        y = r[r.length - 1];
                }
            }
            res.toString = R._path2string;
            pth.abs = pathClone(res);
            return res;
        },
        l2c = function (x1, y1, x2, y2) {
            return [x1, y1, x2, y2, x2, y2];
        },
        q2c = function (x1, y1, ax, ay, x2, y2) {
            var _13 = 1 / 3,
                _23 = 2 / 3;
            return [
                    _13 * x1 + _23 * ax,
                    _13 * y1 + _23 * ay,
                    _13 * x2 + _23 * ax,
                    _13 * y2 + _23 * ay,
                    x2,
                    y2
                ];
        },
        a2c = function (x1, y1, rx, ry, angle, large_arc_flag, sweep_flag, x2, y2, recursive) {
            // for more information of where this math came from visit:
            // http://www.w3.org/TR/SVG11/implnote.html#ArcImplementationNotes
            var _120 = PI * 120 / 180,
                rad = PI / 180 * (+angle || 0),
                res = [],
                xy,
                rotate = cacher(function (x, y, rad) {
                    var X = x * math.cos(rad) - y * math.sin(rad),
                        Y = x * math.sin(rad) + y * math.cos(rad);
                    return {x: X, y: Y};
                });
            if (!recursive) {
                xy = rotate(x1, y1, -rad);
                x1 = xy.x;
                y1 = xy.y;
                xy = rotate(x2, y2, -rad);
                x2 = xy.x;
                y2 = xy.y;
                var cos = math.cos(PI / 180 * angle),
                    sin = math.sin(PI / 180 * angle),
                    x = (x1 - x2) / 2,
                    y = (y1 - y2) / 2;
                var h = (x * x) / (rx * rx) + (y * y) / (ry * ry);
                if (h > 1) {
                    h = math.sqrt(h);
                    rx = h * rx;
                    ry = h * ry;
                }
                var rx2 = rx * rx,
                    ry2 = ry * ry,
                    k = (large_arc_flag == sweep_flag ? -1 : 1) *
                        math.sqrt(abs((rx2 * ry2 - rx2 * y * y - ry2 * x * x) / (rx2 * y * y + ry2 * x * x))),
                    cx = k * rx * y / ry + (x1 + x2) / 2,
                    cy = k * -ry * x / rx + (y1 + y2) / 2,
                    f1 = math.asin(((y1 - cy) / ry).toFixed(9)),
                    f2 = math.asin(((y2 - cy) / ry).toFixed(9));

                f1 = x1 < cx ? PI - f1 : f1;
                f2 = x2 < cx ? PI - f2 : f2;
                f1 < 0 && (f1 = PI * 2 + f1);
                f2 < 0 && (f2 = PI * 2 + f2);
                if (sweep_flag && f1 > f2) {
                    f1 = f1 - PI * 2;
                }
                if (!sweep_flag && f2 > f1) {
                    f2 = f2 - PI * 2;
                }
            } else {
                f1 = recursive[0];
                f2 = recursive[1];
                cx = recursive[2];
                cy = recursive[3];
            }
            var df = f2 - f1;
            if (abs(df) > _120) {
                var f2old = f2,
                    x2old = x2,
                    y2old = y2;
                f2 = f1 + _120 * (sweep_flag && f2 > f1 ? 1 : -1);
                x2 = cx + rx * math.cos(f2);
                y2 = cy + ry * math.sin(f2);
                res = a2c(x2, y2, rx, ry, angle, 0, sweep_flag, x2old, y2old, [f2, f2old, cx, cy]);
            }
            df = f2 - f1;
            var c1 = math.cos(f1),
                s1 = math.sin(f1),
                c2 = math.cos(f2),
                s2 = math.sin(f2),
                t = math.tan(df / 4),
                hx = 4 / 3 * rx * t,
                hy = 4 / 3 * ry * t,
                m1 = [x1, y1],
                m2 = [x1 + hx * s1, y1 - hy * c1],
                m3 = [x2 + hx * s2, y2 - hy * c2],
                m4 = [x2, y2];
            m2[0] = 2 * m1[0] - m2[0];
            m2[1] = 2 * m1[1] - m2[1];
            if (recursive) {
                return [m2, m3, m4][concat](res);
            } else {
                res = [m2, m3, m4][concat](res).join()[split](",");
                var newres = [];
                for (var i = 0, ii = res.length; i < ii; i++) {
                    newres[i] = i % 2 ? rotate(res[i - 1], res[i], rad).y : rotate(res[i], res[i + 1], rad).x;
                }
                return newres;
            }
        },
        findDotAtSegment = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t) {
            var t1 = 1 - t;
            return {
                x: pow(t1, 3) * p1x + pow(t1, 2) * 3 * t * c1x + t1 * 3 * t * t * c2x + pow(t, 3) * p2x,
                y: pow(t1, 3) * p1y + pow(t1, 2) * 3 * t * c1y + t1 * 3 * t * t * c2y + pow(t, 3) * p2y
            };
        },
        curveDim = cacher(function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y) {
            var a = (c2x - 2 * c1x + p1x) - (p2x - 2 * c2x + c1x),
                b = 2 * (c1x - p1x) - 2 * (c2x - c1x),
                c = p1x - c1x,
                t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a,
                t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a,
                y = [p1y, p2y],
                x = [p1x, p2x],
                dot;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            a = (c2y - 2 * c1y + p1y) - (p2y - 2 * c2y + c1y);
            b = 2 * (c1y - p1y) - 2 * (c2y - c1y);
            c = p1y - c1y;
            t1 = (-b + math.sqrt(b * b - 4 * a * c)) / 2 / a;
            t2 = (-b - math.sqrt(b * b - 4 * a * c)) / 2 / a;
            abs(t1) > "1e12" && (t1 = .5);
            abs(t2) > "1e12" && (t2 = .5);
            if (t1 > 0 && t1 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t1);
                x.push(dot.x);
                y.push(dot.y);
            }
            if (t2 > 0 && t2 < 1) {
                dot = findDotAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, t2);
                x.push(dot.x);
                y.push(dot.y);
            }
            return {
                min: {x: mmin[apply](0, x), y: mmin[apply](0, y)},
                max: {x: mmax[apply](0, x), y: mmax[apply](0, y)}
            };
        }),
        path2curve = R._path2curve = cacher(function (path, path2) {
            var pth = !path2 && paths(path);
            if (!path2 && pth.curve) {
                return pathClone(pth.curve);
            }
            var p = pathToAbsolute(path),
                p2 = path2 && pathToAbsolute(path2),
                attrs = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                attrs2 = {x: 0, y: 0, bx: 0, by: 0, X: 0, Y: 0, qx: null, qy: null},
                processPath = function (path, d) {
                    var nx, ny;
                    if (!path) {
                        return ["C", d.x, d.y, d.x, d.y, d.x, d.y];
                    }
                    !(path[0] in {T:1, Q:1}) && (d.qx = d.qy = null);
                    switch (path[0]) {
                        case "M":
                            d.X = path[1];
                            d.Y = path[2];
                            break;
                        case "A":
                            path = ["C"][concat](a2c[apply](0, [d.x, d.y][concat](path.slice(1))));
                            break;
                        case "S":
                            nx = d.x + (d.x - (d.bx || d.x));
                            ny = d.y + (d.y - (d.by || d.y));
                            path = ["C", nx, ny][concat](path.slice(1));
                            break;
                        case "T":
                            d.qx = d.x + (d.x - (d.qx || d.x));
                            d.qy = d.y + (d.y - (d.qy || d.y));
                            path = ["C"][concat](q2c(d.x, d.y, d.qx, d.qy, path[1], path[2]));
                            break;
                        case "Q":
                            d.qx = path[1];
                            d.qy = path[2];
                            path = ["C"][concat](q2c(d.x, d.y, path[1], path[2], path[3], path[4]));
                            break;
                        case "L":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], path[2]));
                            break;
                        case "H":
                            path = ["C"][concat](l2c(d.x, d.y, path[1], d.y));
                            break;
                        case "V":
                            path = ["C"][concat](l2c(d.x, d.y, d.x, path[1]));
                            break;
                        case "Z":
                            path = ["C"][concat](l2c(d.x, d.y, d.X, d.Y));
                            break;
                    }
                    return path;
                },
                fixArc = function (pp, i) {
                    if (pp[i].length > 7) {
                        pp[i].shift();
                        var pi = pp[i];
                        while (pi.length) {
                            pp.splice(i++, 0, ["C"][concat](pi.splice(0, 6)));
                        }
                        pp.splice(i, 1);
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                },
                fixM = function (path1, path2, a1, a2, i) {
                    if (path1 && path2 && path1[i][0] == "M" && path2[i][0] != "M") {
                        path2.splice(i, 0, ["M", a2.x, a2.y]);
                        a1.bx = 0;
                        a1.by = 0;
                        a1.x = path1[i][1];
                        a1.y = path1[i][2];
                        ii = mmax(p.length, p2 && p2.length || 0);
                    }
                };
            for (var i = 0, ii = mmax(p.length, p2 && p2.length || 0); i < ii; i++) {
                p[i] = processPath(p[i], attrs);
                fixArc(p, i);
                p2 && (p2[i] = processPath(p2[i], attrs2));
                p2 && fixArc(p2, i);
                fixM(p, p2, attrs, attrs2, i);
                fixM(p2, p, attrs2, attrs, i);
                var seg = p[i],
                    seg2 = p2 && p2[i],
                    seglen = seg.length,
                    seg2len = p2 && seg2.length;
                attrs.x = seg[seglen - 2];
                attrs.y = seg[seglen - 1];
                attrs.bx = toFloat(seg[seglen - 4]) || attrs.x;
                attrs.by = toFloat(seg[seglen - 3]) || attrs.y;
                attrs2.bx = p2 && (toFloat(seg2[seg2len - 4]) || attrs2.x);
                attrs2.by = p2 && (toFloat(seg2[seg2len - 3]) || attrs2.y);
                attrs2.x = p2 && seg2[seg2len - 2];
                attrs2.y = p2 && seg2[seg2len - 1];
            }
            if (!p2) {
                pth.curve = pathClone(p);
            }
            return p2 ? [p, p2] : p;
        }, null, pathClone),
        parseDots = R._parseDots = cacher(function (gradient) {
            var dots = [];
            for (var i = 0, ii = gradient.length; i < ii; i++) {
                var dot = {},
                    par = gradient[i].match(/^([^:]*):?([\d\.]*)/);
                dot.color = R.getRGB(par[1]);
                if (dot.color.error) {
                    return null;
                }
                dot.color = dot.color.hex;
                par[2] && (dot.offset = par[2] + "%");
                dots.push(dot);
            }
            for (i = 1, ii = dots.length - 1; i < ii; i++) {
                if (!dots[i].offset) {
                    var start = toFloat(dots[i - 1].offset || 0),
                        end = 0;
                    for (var j = i + 1; j < ii; j++) {
                        if (dots[j].offset) {
                            end = dots[j].offset;
                            break;
                        }
                    }
                    if (!end) {
                        end = 100;
                        j = ii;
                    }
                    end = toFloat(end);
                    var d = (end - start) / (j - i + 1);
                    for (; i < j; i++) {
                        start += d;
                        dots[i].offset = start + "%";
                    }
                }
            }
            return dots;
        }),
        tear = R._tear = function (el, paper) {
            el == paper.top && (paper.top = el.prev);
            el == paper.bottom && (paper.bottom = el.next);
            el.next && (el.next.prev = el.prev);
            el.prev && (el.prev.next = el.next);
        },
        tofront = R._tofront = function (el, paper) {
            if (paper.top === el) {
                return;
            }
            tear(el, paper);
            el.next = null;
            el.prev = paper.top;
            paper.top.next = el;
            paper.top = el;
        },
        toback = R._toback = function (el, paper) {
            if (paper.bottom === el) {
                return;
            }
            tear(el, paper);
            el.next = paper.bottom;
            el.prev = null;
            paper.bottom.prev = el;
            paper.bottom = el;
        },
        insertafter = R._insertafter = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.top && (paper.top = el);
            el2.next && (el2.next.prev = el);
            el.next = el2.next;
            el.prev = el2;
            el2.next = el;
        },
        insertbefore = R._insertbefore = function (el, el2, paper) {
            tear(el, paper);
            el2 == paper.bottom && (paper.bottom = el);
            el2.prev && (el2.prev.next = el);
            el.prev = el2.prev;
            el2.prev = el;
            el.next = el2;
        },
        
        toMatrix = R.toMatrix = function (path, transform) {
            var bb = pathDimensions(path),
                el = {
                    _: {
                        transform: E
                    },
                    getBBox: function () {
                        return bb;
                    }
                };
            extractTransform(el, transform);
            return el.matrix;
        },
        
        transformPath = R.transformPath = function (path, transform) {
            return mapPath(path, toMatrix(path, transform));
        },
        extractTransform = R._extractTransform = function (el, tstr) {
            if (tstr == null) {
                return el._.transform;
            }
            tstr = Str(tstr).replace(/\.{3}|\u2026/g, el._.transform || E);
            var tdata = R.parseTransformString(tstr),
                deg = 0,
                dx = 0,
                dy = 0,
                sx = 1,
                sy = 1,
                _ = el._,
                m = new Matrix;
            _.transform = tdata || [];
            if (tdata) {
                for (var i = 0, ii = tdata.length; i < ii; i++) {
                    var t = tdata[i],
                        tlen = t.length,
                        command = Str(t[0]).toLowerCase(),
                        absolute = t[0] != command,
                        inver = absolute ? m.invert() : 0,
                        x1,
                        y1,
                        x2,
                        y2,
                        bb;
                    if (command == "t" && tlen == 3) {
                        if (absolute) {
                            x1 = inver.x(0, 0);
                            y1 = inver.y(0, 0);
                            x2 = inver.x(t[1], t[2]);
                            y2 = inver.y(t[1], t[2]);
                            m.translate(x2 - x1, y2 - y1);
                        } else {
                            m.translate(t[1], t[2]);
                        }
                    } else if (command == "r") {
                        if (tlen == 2) {
                            bb = bb || el.getBBox(1);
                            m.rotate(t[1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            deg += t[1];
                        } else if (tlen == 4) {
                            if (absolute) {
                                x2 = inver.x(t[2], t[3]);
                                y2 = inver.y(t[2], t[3]);
                                m.rotate(t[1], x2, y2);
                            } else {
                                m.rotate(t[1], t[2], t[3]);
                            }
                            deg += t[1];
                        }
                    } else if (command == "s") {
                        if (tlen == 2 || tlen == 3) {
                            bb = bb || el.getBBox(1);
                            m.scale(t[1], t[tlen - 1], bb.x + bb.width / 2, bb.y + bb.height / 2);
                            sx *= t[1];
                            sy *= t[tlen - 1];
                        } else if (tlen == 5) {
                            if (absolute) {
                                x2 = inver.x(t[3], t[4]);
                                y2 = inver.y(t[3], t[4]);
                                m.scale(t[1], t[2], x2, y2);
                            } else {
                                m.scale(t[1], t[2], t[3], t[4]);
                            }
                            sx *= t[1];
                            sy *= t[2];
                        }
                    } else if (command == "m" && tlen == 7) {
                        m.add(t[1], t[2], t[3], t[4], t[5], t[6]);
                    }
                    _.dirtyT = 1;
                    el.matrix = m;
                }
            }

            
            el.matrix = m;

            _.sx = sx;
            _.sy = sy;
            _.deg = deg;
            _.dx = dx = m.e;
            _.dy = dy = m.f;

            if (sx == 1 && sy == 1 && !deg && _.bbox) {
                _.bbox.x += +dx;
                _.bbox.y += +dy;
            } else {
                _.dirtyT = 1;
            }
        },
        getEmpty = function (item) {
            var l = item[0];
            switch (l.toLowerCase()) {
                case "t": return [l, 0, 0];
                case "m": return [l, 1, 0, 0, 1, 0, 0];
                case "r": if (item.length == 4) {
                    return [l, 0, item[2], item[3]];
                } else {
                    return [l, 0];
                }
                case "s": if (item.length == 5) {
                    return [l, 1, 1, item[3], item[4]];
                } else if (item.length == 3) {
                    return [l, 1, 1];
                } else {
                    return [l, 1];
                }
            }
        },
        equaliseTransform = R._equaliseTransform = function (t1, t2) {
            t2 = Str(t2).replace(/\.{3}|\u2026/g, t1);
            t1 = R.parseTransformString(t1) || [];
            t2 = R.parseTransformString(t2) || [];
            var maxlength = mmax(t1.length, t2.length),
                from = [],
                to = [],
                i = 0, j, jj,
                tt1, tt2;
            for (; i < maxlength; i++) {
                tt1 = t1[i] || getEmpty(t2[i]);
                tt2 = t2[i] || getEmpty(tt1);
                if ((tt1[0] != tt2[0]) ||
                    (tt1[0].toLowerCase() == "r" && (tt1[2] != tt2[2] || tt1[3] != tt2[3])) ||
                    (tt1[0].toLowerCase() == "s" && (tt1[3] != tt2[3] || tt1[4] != tt2[4]))
                    ) {
                    return;
                }
                from[i] = [];
                to[i] = [];
                for (j = 0, jj = mmax(tt1.length, tt2.length); j < jj; j++) {
                    j in tt1 && (from[i][j] = tt1[j]);
                    j in tt2 && (to[i][j] = tt2[j]);
                }
            }
            return {
                from: from,
                to: to
            };
        };
    R._getContainer = function (x, y, w, h) {
        var container;
        container = h == null && !R.is(x, "object") ? g.doc.getElementById(x) : x;
        if (container == null) {
            return;
        }
        if (container.tagName) {
            if (y == null) {
                return {
                    container: container,
                    width: container.style.pixelWidth || container.offsetWidth,
                    height: container.style.pixelHeight || container.offsetHeight
                };
            } else {
                return {
                    container: container,
                    width: y,
                    height: w
                };
            }
        }
        return {
            container: 1,
            x: x,
            y: y,
            width: w,
            height: h
        };
    };
    
    R.pathToRelative = pathToRelative;
    R._engine = {};
    
    R.path2curve = path2curve;
    
    R.matrix = function (a, b, c, d, e, f) {
        return new Matrix(a, b, c, d, e, f);
    };
    function Matrix(a, b, c, d, e, f) {
        if (a != null) {
            this.a = +a;
            this.b = +b;
            this.c = +c;
            this.d = +d;
            this.e = +e;
            this.f = +f;
        } else {
            this.a = 1;
            this.b = 0;
            this.c = 0;
            this.d = 1;
            this.e = 0;
            this.f = 0;
        }
    }
    (function (matrixproto) {
        
        matrixproto.add = function (a, b, c, d, e, f) {
            var out = [[], [], []],
                m = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                matrix = [[a, c, e], [b, d, f], [0, 0, 1]],
                x, y, z, res;

            if (a && a instanceof Matrix) {
                matrix = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]];
            }

            for (x = 0; x < 3; x++) {
                for (y = 0; y < 3; y++) {
                    res = 0;
                    for (z = 0; z < 3; z++) {
                        res += m[x][z] * matrix[z][y];
                    }
                    out[x][y] = res;
                }
            }
            this.a = out[0][0];
            this.b = out[1][0];
            this.c = out[0][1];
            this.d = out[1][1];
            this.e = out[0][2];
            this.f = out[1][2];
        };
        
        matrixproto.invert = function () {
            var me = this,
                x = me.a * me.d - me.b * me.c;
            return new Matrix(me.d / x, -me.b / x, -me.c / x, me.a / x, (me.c * me.f - me.d * me.e) / x, (me.b * me.e - me.a * me.f) / x);
        };
        
        matrixproto.clone = function () {
            return new Matrix(this.a, this.b, this.c, this.d, this.e, this.f);
        };
        
        matrixproto.translate = function (x, y) {
            this.add(1, 0, 0, 1, x, y);
        };
        
        matrixproto.scale = function (x, y, cx, cy) {
            y == null && (y = x);
            (cx || cy) && this.add(1, 0, 0, 1, cx, cy);
            this.add(x, 0, 0, y, 0, 0);
            (cx || cy) && this.add(1, 0, 0, 1, -cx, -cy);
        };
        
        matrixproto.rotate = function (a, x, y) {
            a = R.rad(a);
            x = x || 0;
            y = y || 0;
            var cos = +math.cos(a).toFixed(9),
                sin = +math.sin(a).toFixed(9);
            this.add(cos, sin, -sin, cos, x, y);
            this.add(1, 0, 0, 1, -x, -y);
        };
        
        matrixproto.x = function (x, y) {
            return x * this.a + y * this.c + this.e;
        };
        
        matrixproto.y = function (x, y) {
            return x * this.b + y * this.d + this.f;
        };
        matrixproto.get = function (i) {
            return +this[Str.fromCharCode(97 + i)].toFixed(4);
        };
        matrixproto.toString = function () {
            return R.svg ?
                "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" :
                [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join();
        };
        matrixproto.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) +
                ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) +
                ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')";
        };
        matrixproto.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)];
        };
        function norm(a) {
            return a[0] * a[0] + a[1] * a[1];
        }
        function normalize(a) {
            var mag = math.sqrt(norm(a));
            a[0] && (a[0] /= mag);
            a[1] && (a[1] /= mag);
        }
        
        matrixproto.split = function () {
            var out = {};
            // translation
            out.dx = this.e;
            out.dy = this.f;

            // scale and shear
            var row = [[this.a, this.c], [this.b, this.d]];
            out.scalex = math.sqrt(norm(row[0]));
            normalize(row[0]);

            out.shear = row[0][0] * row[1][0] + row[0][1] * row[1][1];
            row[1] = [row[1][0] - row[0][0] * out.shear, row[1][1] - row[0][1] * out.shear];

            out.scaley = math.sqrt(norm(row[1]));
            normalize(row[1]);
            out.shear /= out.scaley;

            // rotation
            var sin = -row[0][1],
                cos = row[1][1];
            if (cos < 0) {
                out.rotate = R.deg(math.acos(cos));
                if (sin < 0) {
                    out.rotate = 360 - out.rotate;
                }
            } else {
                out.rotate = R.deg(math.asin(sin));
            }

            out.isSimple = !+out.shear.toFixed(9) && (out.scalex.toFixed(9) == out.scaley.toFixed(9) || !out.rotate);
            out.isSuperSimple = !+out.shear.toFixed(9) && out.scalex.toFixed(9) == out.scaley.toFixed(9) && !out.rotate;
            out.noRotation = !+out.shear.toFixed(9) && !out.rotate;
            return out;
        };
        
        matrixproto.toTransformString = function (shorter) {
            var s = shorter || this[split]();
            if (s.isSimple) {
                s.scalex = +s.scalex.toFixed(4);
                s.scaley = +s.scaley.toFixed(4);
                s.rotate = +s.rotate.toFixed(4);
                return  (s.dx || s.dy ? "t" + [s.dx, s.dy] : E) + 
                        (s.scalex != 1 || s.scaley != 1 ? "s" + [s.scalex, s.scaley, 0, 0] : E) +
                        (s.rotate ? "r" + [s.rotate, 0, 0] : E);
            } else {
                return "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)];
            }
        };
    })(Matrix.prototype);

    // WebKit rendering bug workaround method
    var version = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    if ((navigator.vendor == "Apple Computer, Inc.") && (version && version[1] < 4 || navigator.platform.slice(0, 2) == "iP") ||
        (navigator.vendor == "Google Inc." && version && version[1] < 8)) {
        
        paperproto.safari = function () {
            var rect = this.rect(-99, -99, this.width + 99, this.height + 99).attr({stroke: "none"});
            setTimeout(function () {rect.remove();});
        };
    } else {
        paperproto.safari = fun;
    }
 
    var preventDefault = function () {
        this.returnValue = false;
    },
    preventTouch = function () {
        return this.originalEvent.preventDefault();
    },
    stopPropagation = function () {
        this.cancelBubble = true;
    },
    stopTouch = function () {
        return this.originalEvent.stopPropagation();
    },
    addEvent = (function () {
        if (g.doc.addEventListener) {
            return function (obj, type, fn, element) {
                var realName = supportsTouch && touchMap[type] ? touchMap[type] : type,
                    f = function (e) {
                        var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                            x = e.clientX + scrollX,
                            y = e.clientY + scrollY;
                    if (supportsTouch && touchMap[has](type)) {
                        for (var i = 0, ii = e.targetTouches && e.targetTouches.length; i < ii; i++) {
                            if (e.targetTouches[i].target == obj) {
                                var olde = e;
                                e = e.targetTouches[i];
                                e.originalEvent = olde;
                                e.preventDefault = preventTouch;
                                e.stopPropagation = stopTouch;
                                break;
                            }
                        }
                    }
                    return fn.call(element, e, x, y);
                };
                obj.addEventListener(realName, f, false);
                return function () {
                    obj.removeEventListener(realName, f, false);
                    return true;
                };
            };
        } else if (g.doc.attachEvent) {
            return function (obj, type, fn, element) {
                var f = function (e) {
                    e = e || g.win.event;
                    var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                        scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
                        x = e.clientX + scrollX,
                        y = e.clientY + scrollY;
                    e.preventDefault = e.preventDefault || preventDefault;
                    e.stopPropagation = e.stopPropagation || stopPropagation;
                    return fn.call(element, e, x, y);
                };
                obj.attachEvent("on" + type, f);
                var detacher = function () {
                    obj.detachEvent("on" + type, f);
                    return true;
                };
                return detacher;
            };
        }
    })(),
    drag = [],
    dragMove = function (e) {
        var x = e.clientX,
            y = e.clientY,
            scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
            scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft,
            dragi,
            j = drag.length;
        while (j--) {
            dragi = drag[j];
            if (supportsTouch) {
                var i = e.touches.length,
                    touch;
                while (i--) {
                    touch = e.touches[i];
                    if (touch.identifier == dragi.el._drag.id) {
                        x = touch.clientX;
                        y = touch.clientY;
                        (e.originalEvent ? e.originalEvent : e).preventDefault();
                        break;
                    }
                }
            } else {
                e.preventDefault();
            }
            var node = dragi.el.node,
                o,
                next = node.nextSibling,
                parent = node.parentNode,
                display = node.style.display;
            g.win.opera && parent.removeChild(node);
            node.style.display = "none";
            o = dragi.el.paper.getElementByPoint(x, y);
            node.style.display = display;
            g.win.opera && (next ? parent.insertBefore(node, next) : parent.appendChild(node));
            o && eve("raphael.drag.over." + dragi.el.id, dragi.el, o);
            x += scrollX;
            y += scrollY;
            eve("raphael.drag.move." + dragi.el.id, dragi.move_scope || dragi.el, x - dragi.el._drag.x, y - dragi.el._drag.y, x, y, e);
        }
    },
    dragUp = function (e) {
        R.unmousemove(dragMove).unmouseup(dragUp);
        var i = drag.length,
            dragi;
        while (i--) {
            dragi = drag[i];
            dragi.el._drag = {};
            eve("raphael.drag.end." + dragi.el.id, dragi.end_scope || dragi.start_scope || dragi.move_scope || dragi.el, e);
        }
        drag = [];
    },
    
    elproto = R.el = {};
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    for (var i = events.length; i--;) {
        (function (eventName) {
            R[eventName] = elproto[eventName] = function (fn, scope) {
                if (R.is(fn, "function")) {
                    this.events = this.events || [];
                    this.events.push({name: eventName, f: fn, unbind: addEvent(this.shape || this.node || g.doc, eventName, fn, scope || this)});
                }
                return this;
            };
            R["un" + eventName] = elproto["un" + eventName] = function (fn) {
                var events = this.events || [],
                    l = events.length;
                while (l--) if (events[l].name == eventName && events[l].f == fn) {
                    events[l].unbind();
                    events.splice(l, 1);
                    !events.length && delete this.events;
                    return this;
                }
                return this;
            };
        })(events[i]);
    }
    
    
    elproto.data = function (key, value) {
        var data = eldata[this.id] = eldata[this.id] || {};
        if (arguments.length == 1) {
            if (R.is(key, "object")) {
                for (var i in key) if (key[has](i)) {
                    this.data(i, key[i]);
                }
                return this;
            }
            eve("raphael.data.get." + this.id, this, data[key], key);
            return data[key];
        }
        data[key] = value;
        eve("raphael.data.set." + this.id, this, value, key);
        return this;
    };
    
    elproto.removeData = function (key) {
        if (key == null) {
            eldata[this.id] = {};
        } else {
            eldata[this.id] && delete eldata[this.id][key];
        }
        return this;
    };
    
    elproto.hover = function (f_in, f_out, scope_in, scope_out) {
        return this.mouseover(f_in, scope_in).mouseout(f_out, scope_out || scope_in);
    };
    
    elproto.unhover = function (f_in, f_out) {
        return this.unmouseover(f_in).unmouseout(f_out);
    };
    var draggable = [];
    
    elproto.drag = function (onmove, onstart, onend, move_scope, start_scope, end_scope) {
        function start(e) {
            (e.originalEvent || e).preventDefault();
            var scrollY = g.doc.documentElement.scrollTop || g.doc.body.scrollTop,
                scrollX = g.doc.documentElement.scrollLeft || g.doc.body.scrollLeft;
            this._drag.x = e.clientX + scrollX;
            this._drag.y = e.clientY + scrollY;
            this._drag.id = e.identifier;
            !drag.length && R.mousemove(dragMove).mouseup(dragUp);
            drag.push({el: this, move_scope: move_scope, start_scope: start_scope, end_scope: end_scope});
            onstart && eve.on("raphael.drag.start." + this.id, onstart);
            onmove && eve.on("raphael.drag.move." + this.id, onmove);
            onend && eve.on("raphael.drag.end." + this.id, onend);
            eve("raphael.drag.start." + this.id, start_scope || move_scope || this, e.clientX + scrollX, e.clientY + scrollY, e);
        }
        this._drag = {};
        draggable.push({el: this, start: start});
        this.mousedown(start);
        return this;
    };
    
    elproto.onDragOver = function (f) {
        f ? eve.on("raphael.drag.over." + this.id, f) : eve.unbind("raphael.drag.over." + this.id);
    };
    
    elproto.undrag = function () {
        var i = draggable.length;
        while (i--) if (draggable[i].el == this) {
            this.unmousedown(draggable[i].start);
            draggable.splice(i, 1);
            eve.unbind("raphael.drag.*." + this.id);
        }
        !draggable.length && R.unmousemove(dragMove).unmouseup(dragUp);
    };
    
    paperproto.circle = function (x, y, r) {
        var out = R._engine.circle(this, x || 0, y || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.rect = function (x, y, w, h, r) {
        var out = R._engine.rect(this, x || 0, y || 0, w || 0, h || 0, r || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.ellipse = function (x, y, rx, ry) {
        var out = R._engine.ellipse(this, x || 0, y || 0, rx || 0, ry || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.path = function (pathString) {
        pathString && !R.is(pathString, string) && !R.is(pathString[0], array) && (pathString += E);
        var out = R._engine.path(R.format[apply](R, arguments), this);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.image = function (src, x, y, w, h) {
        var out = R._engine.image(this, src || "about:blank", x || 0, y || 0, w || 0, h || 0);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.text = function (x, y, text) {
        var out = R._engine.text(this, x || 0, y || 0, Str(text));
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.set = function (itemsArray) {
        !R.is(itemsArray, "array") && (itemsArray = Array.prototype.splice.call(arguments, 0, arguments.length));
        var out = new Set(itemsArray);
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    paperproto.setStart = function (set) {
        this.__set__ = set || this.set();
    };
    
    paperproto.setFinish = function (set) {
        var out = this.__set__;
        delete this.__set__;
        return out;
    };
    
    paperproto.setSize = function (width, height) {
        return R._engine.setSize.call(this, width, height);
    };
    
    paperproto.setViewBox = function (x, y, w, h, fit) {
        return R._engine.setViewBox.call(this, x, y, w, h, fit);
    };
    
    
    paperproto.top = paperproto.bottom = null;
    
    paperproto.raphael = R;
    var getOffset = function (elem) {
        var box = elem.getBoundingClientRect(),
            doc = elem.ownerDocument,
            body = doc.body,
            docElem = doc.documentElement,
            clientTop = docElem.clientTop || body.clientTop || 0, clientLeft = docElem.clientLeft || body.clientLeft || 0,
            top  = box.top  + (g.win.pageYOffset || docElem.scrollTop || body.scrollTop ) - clientTop,
            left = box.left + (g.win.pageXOffset || docElem.scrollLeft || body.scrollLeft) - clientLeft;
        return {
            y: top,
            x: left
        };
    };
    
    paperproto.getElementByPoint = function (x, y) {
        var paper = this,
            svg = paper.canvas,
            target = g.doc.elementFromPoint(x, y);
        if (g.win.opera && target.tagName == "svg") {
            var so = getOffset(svg),
                sr = svg.createSVGRect();
            sr.x = x - so.x;
            sr.y = y - so.y;
            sr.width = sr.height = 1;
            var hits = svg.getIntersectionList(sr, null);
            if (hits.length) {
                target = hits[hits.length - 1];
            }
        }
        if (!target) {
            return null;
        }
        while (target.parentNode && target != svg.parentNode && !target.raphael) {
            target = target.parentNode;
        }
        target == paper.canvas.parentNode && (target = svg);
        target = target && target.raphael ? paper.getById(target.raphaelid) : null;
        return target;
    };
    
    paperproto.getById = function (id) {
        var bot = this.bottom;
        while (bot) {
            if (bot.id == id) {
                return bot;
            }
            bot = bot.next;
        }
        return null;
    };
    
    paperproto.forEach = function (callback, thisArg) {
        var bot = this.bottom;
        while (bot) {
            if (callback.call(thisArg, bot) === false) {
                return this;
            }
            bot = bot.next;
        }
        return this;
    };
    
    paperproto.getElementsByPoint = function (x, y) {
        var set = this.set();
        this.forEach(function (el) {
            if (el.isPointInside(x, y)) {
                set.push(el);
            }
        });
        return set;
    };
    function x_y() {
        return this.x + S + this.y;
    }
    function x_y_w_h() {
        return this.x + S + this.y + S + this.width + " \xd7 " + this.height;
    }
    
    elproto.isPointInside = function (x, y) {
        var rp = this.realPath = this.realPath || getPath[this.type](this);
        return R.isPointInsidePath(rp, x, y);
    };
    
    elproto.getBBox = function (isWithoutTransform) {
        if (this.removed) {
            return {};
        }
        var _ = this._;
        if (isWithoutTransform) {
            if (_.dirty || !_.bboxwt) {
                this.realPath = getPath[this.type](this);
                _.bboxwt = pathDimensions(this.realPath);
                _.bboxwt.toString = x_y_w_h;
                _.dirty = 0;
            }
            return _.bboxwt;
        }
        if (_.dirty || _.dirtyT || !_.bbox) {
            if (_.dirty || !this.realPath) {
                _.bboxwt = 0;
                this.realPath = getPath[this.type](this);
            }
            _.bbox = pathDimensions(mapPath(this.realPath, this.matrix));
            _.bbox.toString = x_y_w_h;
            _.dirty = _.dirtyT = 0;
        }
        return _.bbox;
    };
    
    elproto.clone = function () {
        if (this.removed) {
            return null;
        }
        var out = this.paper[this.type]().attr(this.attr());
        this.__set__ && this.__set__.push(out);
        return out;
    };
    
    elproto.glow = function (glow) {
        if (this.type == "text") {
            return null;
        }
        glow = glow || {};
        var s = {
            width: (glow.width || 10) + (+this.attr("stroke-width") || 1),
            fill: glow.fill || false,
            opacity: glow.opacity || .5,
            offsetx: glow.offsetx || 0,
            offsety: glow.offsety || 0,
            color: glow.color || "#000"
        },
            c = s.width / 2,
            r = this.paper,
            out = r.set(),
            path = this.realPath || getPath[this.type](this);
        path = this.matrix ? mapPath(path, this.matrix) : path;
        for (var i = 1; i < c + 1; i++) {
            out.push(r.path(path).attr({
                stroke: s.color,
                fill: s.fill ? s.color : "none",
                "stroke-linejoin": "round",
                "stroke-linecap": "round",
                "stroke-width": +(s.width / c * i).toFixed(3),
                opacity: +(s.opacity / c).toFixed(3)
            }));
        }
        return out.insertBefore(this).translate(s.offsetx, s.offsety);
    };
    var curveslengths = {},
    getPointAtSegmentLength = function (p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length) {
        if (length == null) {
            return bezlen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y);
        } else {
            return R.findDotsAtSegment(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, getTatLen(p1x, p1y, c1x, c1y, c2x, c2y, p2x, p2y, length));
        }
    },
    getLengthFactory = function (istotal, subpath) {
        return function (path, length, onlystart) {
            path = path2curve(path);
            var x, y, p, l, sp = "", subpaths = {}, point,
                len = 0;
            for (var i = 0, ii = path.length; i < ii; i++) {
                p = path[i];
                if (p[0] == "M") {
                    x = +p[1];
                    y = +p[2];
                } else {
                    l = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6]);
                    if (len + l > length) {
                        if (subpath && !subpaths.start) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            sp += ["C" + point.start.x, point.start.y, point.m.x, point.m.y, point.x, point.y];
                            if (onlystart) {return sp;}
                            subpaths.start = sp;
                            sp = ["M" + point.x, point.y + "C" + point.n.x, point.n.y, point.end.x, point.end.y, p[5], p[6]].join();
                            len += l;
                            x = +p[5];
                            y = +p[6];
                            continue;
                        }
                        if (!istotal && !subpath) {
                            point = getPointAtSegmentLength(x, y, p[1], p[2], p[3], p[4], p[5], p[6], length - len);
                            return {x: point.x, y: point.y, alpha: point.alpha};
                        }
                    }
                    len += l;
                    x = +p[5];
                    y = +p[6];
                }
                sp += p.shift() + p;
            }
            subpaths.end = sp;
            point = istotal ? len : subpath ? subpaths : R.findDotsAtSegment(x, y, p[0], p[1], p[2], p[3], p[4], p[5], 1);
            point.alpha && (point = {x: point.x, y: point.y, alpha: point.alpha});
            return point;
        };
    };
    var getTotalLength = getLengthFactory(1),
        getPointAtLength = getLengthFactory(),
        getSubpathsAtLength = getLengthFactory(0, 1);
    
    R.getTotalLength = getTotalLength;
    
    R.getPointAtLength = getPointAtLength;
    
    R.getSubpath = function (path, from, to) {
        if (this.getTotalLength(path) - to < 1e-6) {
            return getSubpathsAtLength(path, from).end;
        }
        var a = getSubpathsAtLength(path, to, 1);
        return from ? getSubpathsAtLength(a, from).end : a;
    };
    
    elproto.getTotalLength = function () {
        if (this.type != "path") {return;}
        if (this.node.getTotalLength) {
            return this.node.getTotalLength();
        }
        return getTotalLength(this.attrs.path);
    };
    
    elproto.getPointAtLength = function (length) {
        if (this.type != "path") {return;}
        return getPointAtLength(this.attrs.path, length);
    };
    
    elproto.getSubpath = function (from, to) {
        if (this.type != "path") {return;}
        return R.getSubpath(this.attrs.path, from, to);
    };
    
    var ef = R.easing_formulas = {
        linear: function (n) {
            return n;
        },
        "<": function (n) {
            return pow(n, 1.7);
        },
        ">": function (n) {
            return pow(n, .48);
        },
        "<>": function (n) {
            var q = .48 - n / 1.04,
                Q = math.sqrt(.1734 + q * q),
                x = Q - q,
                X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1),
                y = -Q - q,
                Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1),
                t = X + Y + .5;
            return (1 - t) * 3 * t * t + t * t * t;
        },
        backIn: function (n) {
            var s = 1.70158;
            return n * n * ((s + 1) * n - s);
        },
        backOut: function (n) {
            n = n - 1;
            var s = 1.70158;
            return n * n * ((s + 1) * n + s) + 1;
        },
        elastic: function (n) {
            if (n == !!n) {
                return n;
            }
            return pow(2, -10 * n) * math.sin((n - .075) * (2 * PI) / .3) + 1;
        },
        bounce: function (n) {
            var s = 7.5625,
                p = 2.75,
                l;
            if (n < (1 / p)) {
                l = s * n * n;
            } else {
                if (n < (2 / p)) {
                    n -= (1.5 / p);
                    l = s * n * n + .75;
                } else {
                    if (n < (2.5 / p)) {
                        n -= (2.25 / p);
                        l = s * n * n + .9375;
                    } else {
                        n -= (2.625 / p);
                        l = s * n * n + .984375;
                    }
                }
            }
            return l;
        }
    };
    ef.easeIn = ef["ease-in"] = ef["<"];
    ef.easeOut = ef["ease-out"] = ef[">"];
    ef.easeInOut = ef["ease-in-out"] = ef["<>"];
    ef["back-in"] = ef.backIn;
    ef["back-out"] = ef.backOut;

    var animationElements = [],
        requestAnimFrame = window.requestAnimationFrame       ||
                           window.webkitRequestAnimationFrame ||
                           window.mozRequestAnimationFrame    ||
                           window.oRequestAnimationFrame      ||
                           window.msRequestAnimationFrame     ||
                           function (callback) {
                               setTimeout(callback, 16);
                           },
        animation = function () {
            var Now = +new Date,
                l = 0;
            for (; l < animationElements.length; l++) {
                var e = animationElements[l];
                if (e.el.removed || e.paused) {
                    continue;
                }
                var time = Now - e.start,
                    ms = e.ms,
                    easing = e.easing,
                    from = e.from,
                    diff = e.diff,
                    to = e.to,
                    t = e.t,
                    that = e.el,
                    set = {},
                    now,
                    init = {},
                    key;
                if (e.initstatus) {
                    time = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * ms;
                    e.status = e.initstatus;
                    delete e.initstatus;
                    e.stop && animationElements.splice(l--, 1);
                } else {
                    e.status = (e.prev + (e.percent - e.prev) * (time / ms)) / e.anim.top;
                }
                if (time < 0) {
                    continue;
                }
                if (time < ms) {
                    var pos = easing(time / ms);
                    for (var attr in from) if (from[has](attr)) {
                        switch (availableAnimAttrs[attr]) {
                            case nu:
                                now = +from[attr] + pos * ms * diff[attr];
                                break;
                            case "colour":
                                now = "rgb(" + [
                                    upto255(round(from[attr].r + pos * ms * diff[attr].r)),
                                    upto255(round(from[attr].g + pos * ms * diff[attr].g)),
                                    upto255(round(from[attr].b + pos * ms * diff[attr].b))
                                ].join(",") + ")";
                                break;
                            case "path":
                                now = [];
                                for (var i = 0, ii = from[attr].length; i < ii; i++) {
                                    now[i] = [from[attr][i][0]];
                                    for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        now[i][j] = +from[attr][i][j] + pos * ms * diff[attr][i][j];
                                    }
                                    now[i] = now[i].join(S);
                                }
                                now = now.join(S);
                                break;
                            case "transform":
                                if (diff[attr].real) {
                                    now = [];
                                    for (i = 0, ii = from[attr].length; i < ii; i++) {
                                        now[i] = [from[attr][i][0]];
                                        for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                            now[i][j] = from[attr][i][j] + pos * ms * diff[attr][i][j];
                                        }
                                    }
                                } else {
                                    var get = function (i) {
                                        return +from[attr][i] + pos * ms * diff[attr][i];
                                    };
                                    // now = [["r", get(2), 0, 0], ["t", get(3), get(4)], ["s", get(0), get(1), 0, 0]];
                                    now = [["m", get(0), get(1), get(2), get(3), get(4), get(5)]];
                                }
                                break;
                            case "csv":
                                if (attr == "clip-rect") {
                                    now = [];
                                    i = 4;
                                    while (i--) {
                                        now[i] = +from[attr][i] + pos * ms * diff[attr][i];
                                    }
                                }
                                break;
                            default:
                                var from2 = [][concat](from[attr]);
                                now = [];
                                i = that.paper.customAttributes[attr].length;
                                while (i--) {
                                    now[i] = +from2[i] + pos * ms * diff[attr][i];
                                }
                                break;
                        }
                        set[attr] = now;
                    }
                    that.attr(set);
                    (function (id, that, anim) {
                        setTimeout(function () {
                            eve("raphael.anim.frame." + id, that, anim);
                        });
                    })(that.id, that, e.anim);
                } else {
                    (function(f, el, a) {
                        setTimeout(function() {
                            eve("raphael.anim.frame." + el.id, el, a);
                            eve("raphael.anim.finish." + el.id, el, a);
                            R.is(f, "function") && f.call(el);
                        });
                    })(e.callback, that, e.anim);
                    that.attr(to);
                    animationElements.splice(l--, 1);
                    if (e.repeat > 1 && !e.next) {
                        for (key in to) if (to[has](key)) {
                            init[key] = e.totalOrigin[key];
                        }
                        e.el.attr(init);
                        runAnimation(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1);
                    }
                    if (e.next && !e.stop) {
                        runAnimation(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat);
                    }
                }
            }
            R.svg && that && that.paper && that.paper.safari();
            animationElements.length && requestAnimFrame(animation);
        },
        upto255 = function (color) {
            return color > 255 ? 255 : color < 0 ? 0 : color;
        };
    
    elproto.animateWith = function (el, anim, params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var a = params instanceof Animation ? params : R.animation(params, ms, easing, callback),
            x, y;
        runAnimation(a, element, a.percents[0], null, element.attr());
        for (var i = 0, ii = animationElements.length; i < ii; i++) {
            if (animationElements[i].anim == anim && animationElements[i].el == el) {
                animationElements[ii - 1].start = animationElements[i].start;
                break;
            }
        }
        return element;
        // 
        // 
        // var a = params ? R.animation(params, ms, easing, callback) : anim,
        //     status = element.status(anim);
        // return this.animate(a).status(a, status * anim.ms / a.ms);
    };
    function CubicBezierAtTime(t, p1x, p1y, p2x, p2y, duration) {
        var cx = 3 * p1x,
            bx = 3 * (p2x - p1x) - cx,
            ax = 1 - cx - bx,
            cy = 3 * p1y,
            by = 3 * (p2y - p1y) - cy,
            ay = 1 - cy - by;
        function sampleCurveX(t) {
            return ((ax * t + bx) * t + cx) * t;
        }
        function solve(x, epsilon) {
            var t = solveCurveX(x, epsilon);
            return ((ay * t + by) * t + cy) * t;
        }
        function solveCurveX(x, epsilon) {
            var t0, t1, t2, x2, d2, i;
            for(t2 = x, i = 0; i < 8; i++) {
                x2 = sampleCurveX(t2) - x;
                if (abs(x2) < epsilon) {
                    return t2;
                }
                d2 = (3 * ax * t2 + 2 * bx) * t2 + cx;
                if (abs(d2) < 1e-6) {
                    break;
                }
                t2 = t2 - x2 / d2;
            }
            t0 = 0;
            t1 = 1;
            t2 = x;
            if (t2 < t0) {
                return t0;
            }
            if (t2 > t1) {
                return t1;
            }
            while (t0 < t1) {
                x2 = sampleCurveX(t2);
                if (abs(x2 - x) < epsilon) {
                    return t2;
                }
                if (x > x2) {
                    t0 = t2;
                } else {
                    t1 = t2;
                }
                t2 = (t1 - t0) / 2 + t0;
            }
            return t2;
        }
        return solve(t, 1 / (200 * duration));
    }
    elproto.onAnimation = function (f) {
        f ? eve.on("raphael.anim.frame." + this.id, f) : eve.unbind("raphael.anim.frame." + this.id);
        return this;
    };
    function Animation(anim, ms) {
        var percents = [],
            newAnim = {};
        this.ms = ms;
        this.times = 1;
        if (anim) {
            for (var attr in anim) if (anim[has](attr)) {
                newAnim[toFloat(attr)] = anim[attr];
                percents.push(toFloat(attr));
            }
            percents.sort(sortByNumber);
        }
        this.anim = newAnim;
        this.top = percents[percents.length - 1];
        this.percents = percents;
    }
    
    Animation.prototype.delay = function (delay) {
        var a = new Animation(this.anim, this.ms);
        a.times = this.times;
        a.del = +delay || 0;
        return a;
    };
    
    Animation.prototype.repeat = function (times) { 
        var a = new Animation(this.anim, this.ms);
        a.del = this.del;
        a.times = math.floor(mmax(times, 0)) || 1;
        return a;
    };
    function runAnimation(anim, element, percent, status, totalOrigin, times) {
        percent = toFloat(percent);
        var params,
            isInAnim,
            isInAnimSet,
            percents = [],
            next,
            prev,
            timestamp,
            ms = anim.ms,
            from = {},
            to = {},
            diff = {};
        if (status) {
            for (i = 0, ii = animationElements.length; i < ii; i++) {
                var e = animationElements[i];
                if (e.el.id == element.id && e.anim == anim) {
                    if (e.percent != percent) {
                        animationElements.splice(i, 1);
                        isInAnimSet = 1;
                    } else {
                        isInAnim = e;
                    }
                    element.attr(e.totalOrigin);
                    break;
                }
            }
        } else {
            status = +to; // NaN
        }
        for (var i = 0, ii = anim.percents.length; i < ii; i++) {
            if (anim.percents[i] == percent || anim.percents[i] > status * anim.top) {
                percent = anim.percents[i];
                prev = anim.percents[i - 1] || 0;
                ms = ms / anim.top * (percent - prev);
                next = anim.percents[i + 1];
                params = anim.anim[percent];
                break;
            } else if (status) {
                element.attr(anim.anim[anim.percents[i]]);
            }
        }
        if (!params) {
            return;
        }
        if (!isInAnim) {
            for (var attr in params) if (params[has](attr)) {
                if (availableAnimAttrs[has](attr) || element.paper.customAttributes[has](attr)) {
                    from[attr] = element.attr(attr);
                    (from[attr] == null) && (from[attr] = availableAttrs[attr]);
                    to[attr] = params[attr];
                    switch (availableAnimAttrs[attr]) {
                        case nu:
                            diff[attr] = (to[attr] - from[attr]) / ms;
                            break;
                        case "colour":
                            from[attr] = R.getRGB(from[attr]);
                            var toColour = R.getRGB(to[attr]);
                            diff[attr] = {
                                r: (toColour.r - from[attr].r) / ms,
                                g: (toColour.g - from[attr].g) / ms,
                                b: (toColour.b - from[attr].b) / ms
                            };
                            break;
                        case "path":
                            var pathes = path2curve(from[attr], to[attr]),
                                toPath = pathes[1];
                            from[attr] = pathes[0];
                            diff[attr] = [];
                            for (i = 0, ii = from[attr].length; i < ii; i++) {
                                diff[attr][i] = [0];
                                for (var j = 1, jj = from[attr][i].length; j < jj; j++) {
                                    diff[attr][i][j] = (toPath[i][j] - from[attr][i][j]) / ms;
                                }
                            }
                            break;
                        case "transform":
                            var _ = element._,
                                eq = equaliseTransform(_[attr], to[attr]);
                            if (eq) {
                                from[attr] = eq.from;
                                to[attr] = eq.to;
                                diff[attr] = [];
                                diff[attr].real = true;
                                for (i = 0, ii = from[attr].length; i < ii; i++) {
                                    diff[attr][i] = [from[attr][i][0]];
                                    for (j = 1, jj = from[attr][i].length; j < jj; j++) {
                                        diff[attr][i][j] = (to[attr][i][j] - from[attr][i][j]) / ms;
                                    }
                                }
                            } else {
                                var m = (element.matrix || new Matrix),
                                    to2 = {
                                        _: {transform: _.transform},
                                        getBBox: function () {
                                            return element.getBBox(1);
                                        }
                                    };
                                from[attr] = [
                                    m.a,
                                    m.b,
                                    m.c,
                                    m.d,
                                    m.e,
                                    m.f
                                ];
                                extractTransform(to2, to[attr]);
                                to[attr] = to2._.transform;
                                diff[attr] = [
                                    (to2.matrix.a - m.a) / ms,
                                    (to2.matrix.b - m.b) / ms,
                                    (to2.matrix.c - m.c) / ms,
                                    (to2.matrix.d - m.d) / ms,
                                    (to2.matrix.e - m.e) / ms,
                                    (to2.matrix.f - m.f) / ms
                                ];
                                // from[attr] = [_.sx, _.sy, _.deg, _.dx, _.dy];
                                // var to2 = {_:{}, getBBox: function () { return element.getBBox(); }};
                                // extractTransform(to2, to[attr]);
                                // diff[attr] = [
                                //     (to2._.sx - _.sx) / ms,
                                //     (to2._.sy - _.sy) / ms,
                                //     (to2._.deg - _.deg) / ms,
                                //     (to2._.dx - _.dx) / ms,
                                //     (to2._.dy - _.dy) / ms
                                // ];
                            }
                            break;
                        case "csv":
                            var values = Str(params[attr])[split](separator),
                                from2 = Str(from[attr])[split](separator);
                            if (attr == "clip-rect") {
                                from[attr] = from2;
                                diff[attr] = [];
                                i = from2.length;
                                while (i--) {
                                    diff[attr][i] = (values[i] - from[attr][i]) / ms;
                                }
                            }
                            to[attr] = values;
                            break;
                        default:
                            values = [][concat](params[attr]);
                            from2 = [][concat](from[attr]);
                            diff[attr] = [];
                            i = element.paper.customAttributes[attr].length;
                            while (i--) {
                                diff[attr][i] = ((values[i] || 0) - (from2[i] || 0)) / ms;
                            }
                            break;
                    }
                }
            }
            var easing = params.easing,
                easyeasy = R.easing_formulas[easing];
            if (!easyeasy) {
                easyeasy = Str(easing).match(bezierrg);
                if (easyeasy && easyeasy.length == 5) {
                    var curve = easyeasy;
                    easyeasy = function (t) {
                        return CubicBezierAtTime(t, +curve[1], +curve[2], +curve[3], +curve[4], ms);
                    };
                } else {
                    easyeasy = pipe;
                }
            }
            timestamp = params.start || anim.start || +new Date;
            e = {
                anim: anim,
                percent: percent,
                timestamp: timestamp,
                start: timestamp + (anim.del || 0),
                status: 0,
                initstatus: status || 0,
                stop: false,
                ms: ms,
                easing: easyeasy,
                from: from,
                diff: diff,
                to: to,
                el: element,
                callback: params.callback,
                prev: prev,
                next: next,
                repeat: times || anim.times,
                origin: element.attr(),
                totalOrigin: totalOrigin
            };
            animationElements.push(e);
            if (status && !isInAnim && !isInAnimSet) {
                e.stop = true;
                e.start = new Date - ms * status;
                if (animationElements.length == 1) {
                    return animation();
                }
            }
            if (isInAnimSet) {
                e.start = new Date - e.ms * status;
            }
            animationElements.length == 1 && requestAnimFrame(animation);
        } else {
            isInAnim.initstatus = status;
            isInAnim.start = new Date - isInAnim.ms * status;
        }
        eve("raphael.anim.start." + element.id, element, anim);
    }
    
    R.animation = function (params, ms, easing, callback) {
        if (params instanceof Animation) {
            return params;
        }
        if (R.is(easing, "function") || !easing) {
            callback = callback || easing || null;
            easing = null;
        }
        params = Object(params);
        ms = +ms || 0;
        var p = {},
            json,
            attr;
        for (attr in params) if (params[has](attr) && toFloat(attr) != attr && toFloat(attr) + "%" != attr) {
            json = true;
            p[attr] = params[attr];
        }
        if (!json) {
            return new Animation(params, ms);
        } else {
            easing && (p.easing = easing);
            callback && (p.callback = callback);
            return new Animation({100: p}, ms);
        }
    };
    
    elproto.animate = function (params, ms, easing, callback) {
        var element = this;
        if (element.removed) {
            callback && callback.call(element);
            return element;
        }
        var anim = params instanceof Animation ? params : R.animation(params, ms, easing, callback);
        runAnimation(anim, element, anim.percents[0], null, element.attr());
        return element;
    };
    
    elproto.setTime = function (anim, value) {
        if (anim && value != null) {
            this.status(anim, mmin(value, anim.ms) / anim.ms);
        }
        return this;
    };
    
    elproto.status = function (anim, value) {
        var out = [],
            i = 0,
            len,
            e;
        if (value != null) {
            runAnimation(anim, this, -1, mmin(value, 1));
            return this;
        } else {
            len = animationElements.length;
            for (; i < len; i++) {
                e = animationElements[i];
                if (e.el.id == this.id && (!anim || e.anim == anim)) {
                    if (anim) {
                        return e.status;
                    }
                    out.push({
                        anim: e.anim,
                        status: e.status
                    });
                }
            }
            if (anim) {
                return 0;
            }
            return out;
        }
    };
    
    elproto.pause = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.pause." + this.id, this, animationElements[i].anim) !== false) {
                animationElements[i].paused = true;
            }
        }
        return this;
    };
    
    elproto.resume = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            var e = animationElements[i];
            if (eve("raphael.anim.resume." + this.id, this, e.anim) !== false) {
                delete e.paused;
                this.status(e.anim, e.status);
            }
        }
        return this;
    };
    
    elproto.stop = function (anim) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.id == this.id && (!anim || animationElements[i].anim == anim)) {
            if (eve("raphael.anim.stop." + this.id, this, animationElements[i].anim) !== false) {
                animationElements.splice(i--, 1);
            }
        }
        return this;
    };
    function stopAnimation(paper) {
        for (var i = 0; i < animationElements.length; i++) if (animationElements[i].el.paper == paper) {
            animationElements.splice(i--, 1);
        }
    }
    eve.on("raphael.remove", stopAnimation);
    eve.on("raphael.clear", stopAnimation);
    elproto.toString = function () {
        return "Rapha\xebl\u2019s object";
    };

    // Set
    var Set = function (items) {
        this.items = [];
        this.length = 0;
        this.type = "set";
        if (items) {
            for (var i = 0, ii = items.length; i < ii; i++) {
                if (items[i] && (items[i].constructor == elproto.constructor || items[i].constructor == Set)) {
                    this[this.items.length] = this.items[this.items.length] = items[i];
                    this.length++;
                }
            }
        }
    },
    setproto = Set.prototype;
    
    setproto.push = function () {
        var item,
            len;
        for (var i = 0, ii = arguments.length; i < ii; i++) {
            item = arguments[i];
            if (item && (item.constructor == elproto.constructor || item.constructor == Set)) {
                len = this.items.length;
                this[len] = this.items[len] = item;
                this.length++;
            }
        }
        return this;
    };
    
    setproto.pop = function () {
        this.length && delete this[this.length--];
        return this.items.pop();
    };
    
    setproto.forEach = function (callback, thisArg) {
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            if (callback.call(thisArg, this.items[i], i) === false) {
                return this;
            }
        }
        return this;
    };
    for (var method in elproto) if (elproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname][apply](el, arg);
                });
            };
        })(method);
    }
    setproto.attr = function (name, value) {
        if (name && R.is(name, array) && R.is(name[0], "object")) {
            for (var j = 0, jj = name.length; j < jj; j++) {
                this.items[j].attr(name[j]);
            }
        } else {
            for (var i = 0, ii = this.items.length; i < ii; i++) {
                this.items[i].attr(name, value);
            }
        }
        return this;
    };
    
    setproto.clear = function () {
        while (this.length) {
            this.pop();
        }
    };
    
    setproto.splice = function (index, count, insertion) {
        index = index < 0 ? mmax(this.length + index, 0) : index;
        count = mmax(0, mmin(this.length - index, count));
        var tail = [],
            todel = [],
            args = [],
            i;
        for (i = 2; i < arguments.length; i++) {
            args.push(arguments[i]);
        }
        for (i = 0; i < count; i++) {
            todel.push(this[index + i]);
        }
        for (; i < this.length - index; i++) {
            tail.push(this[index + i]);
        }
        var arglen = args.length;
        for (i = 0; i < arglen + tail.length; i++) {
            this.items[index + i] = this[index + i] = i < arglen ? args[i] : tail[i - arglen];
        }
        i = this.items.length = this.length -= count - arglen;
        while (this[i]) {
            delete this[i++];
        }
        return new Set(todel);
    };
    
    setproto.exclude = function (el) {
        for (var i = 0, ii = this.length; i < ii; i++) if (this[i] == el) {
            this.splice(i, 1);
            return true;
        }
    };
    setproto.animate = function (params, ms, easing, callback) {
        (R.is(easing, "function") || !easing) && (callback = easing || null);
        var len = this.items.length,
            i = len,
            item,
            set = this,
            collector;
        if (!len) {
            return this;
        }
        callback && (collector = function () {
            !--len && callback.call(set);
        });
        easing = R.is(easing, string) ? easing : collector;
        var anim = R.animation(params, ms, easing, collector);
        item = this.items[--i].animate(anim);
        while (i--) {
            this.items[i] && !this.items[i].removed && this.items[i].animateWith(item, anim, anim);
        }
        return this;
    };
    setproto.insertAfter = function (el) {
        var i = this.items.length;
        while (i--) {
            this.items[i].insertAfter(el);
        }
        return this;
    };
    setproto.getBBox = function () {
        var x = [],
            y = [],
            x2 = [],
            y2 = [];
        for (var i = this.items.length; i--;) if (!this.items[i].removed) {
            var box = this.items[i].getBBox();
            x.push(box.x);
            y.push(box.y);
            x2.push(box.x + box.width);
            y2.push(box.y + box.height);
        }
        x = mmin[apply](0, x);
        y = mmin[apply](0, y);
        x2 = mmax[apply](0, x2);
        y2 = mmax[apply](0, y2);
        return {
            x: x,
            y: y,
            x2: x2,
            y2: y2,
            width: x2 - x,
            height: y2 - y
        };
    };
    setproto.clone = function (s) {
        s = new Set;
        for (var i = 0, ii = this.items.length; i < ii; i++) {
            s.push(this.items[i].clone());
        }
        return s;
    };
    setproto.toString = function () {
        return "Rapha\xebl\u2018s set";
    };

    
    R.registerFont = function (font) {
        if (!font.face) {
            return font;
        }
        this.fonts = this.fonts || {};
        var fontcopy = {
                w: font.w,
                face: {},
                glyphs: {}
            },
            family = font.face["font-family"];
        for (var prop in font.face) if (font.face[has](prop)) {
            fontcopy.face[prop] = font.face[prop];
        }
        if (this.fonts[family]) {
            this.fonts[family].push(fontcopy);
        } else {
            this.fonts[family] = [fontcopy];
        }
        if (!font.svg) {
            fontcopy.face["units-per-em"] = toInt(font.face["units-per-em"], 10);
            for (var glyph in font.glyphs) if (font.glyphs[has](glyph)) {
                var path = font.glyphs[glyph];
                fontcopy.glyphs[glyph] = {
                    w: path.w,
                    k: {},
                    d: path.d && "M" + path.d.replace(/[mlcxtrv]/g, function (command) {
                            return {l: "L", c: "C", x: "z", t: "m", r: "l", v: "c"}[command] || "M";
                        }) + "z"
                };
                if (path.k) {
                    for (var k in path.k) if (path[has](k)) {
                        fontcopy.glyphs[glyph].k[k] = path.k[k];
                    }
                }
            }
        }
        return font;
    };
    
    paperproto.getFont = function (family, weight, style, stretch) {
        stretch = stretch || "normal";
        style = style || "normal";
        weight = +weight || {normal: 400, bold: 700, lighter: 300, bolder: 800}[weight] || 400;
        if (!R.fonts) {
            return;
        }
        var font = R.fonts[family];
        if (!font) {
            var name = new RegExp("(^|\\s)" + family.replace(/[^\w\d\s+!~.:_-]/g, E) + "(\\s|$)", "i");
            for (var fontName in R.fonts) if (R.fonts[has](fontName)) {
                if (name.test(fontName)) {
                    font = R.fonts[fontName];
                    break;
                }
            }
        }
        var thefont;
        if (font) {
            for (var i = 0, ii = font.length; i < ii; i++) {
                thefont = font[i];
                if (thefont.face["font-weight"] == weight && (thefont.face["font-style"] == style || !thefont.face["font-style"]) && thefont.face["font-stretch"] == stretch) {
                    break;
                }
            }
        }
        return thefont;
    };
    
    paperproto.print = function (x, y, string, font, size, origin, letter_spacing) {
        origin = origin || "middle"; // baseline|middle
        letter_spacing = mmax(mmin(letter_spacing || 0, 1), -1);
        var letters = Str(string)[split](E),
            shift = 0,
            notfirst = 0,
            path = E,
            scale;
        R.is(font, string) && (font = this.getFont(font));
        if (font) {
            scale = (size || 16) / font.face["units-per-em"];
            var bb = font.face.bbox[split](separator),
                top = +bb[0],
                lineHeight = bb[3] - bb[1],
                shifty = 0,
                height = +bb[1] + (origin == "baseline" ? lineHeight + (+font.face.descent) : lineHeight / 2);
            for (var i = 0, ii = letters.length; i < ii; i++) {
                if (letters[i] == "\n") {
                    shift = 0;
                    curr = 0;
                    notfirst = 0;
                    shifty += lineHeight;
                } else {
                    var prev = notfirst && font.glyphs[letters[i - 1]] || {},
                        curr = font.glyphs[letters[i]];
                    shift += notfirst ? (prev.w || font.w) + (prev.k && prev.k[letters[i]] || 0) + (font.w * letter_spacing) : 0;
                    notfirst = 1;
                }
                if (curr && curr.d) {
                    path += R.transformPath(curr.d, ["t", shift * scale, shifty * scale, "s", scale, scale, top, height, "t", (x - top) / scale, (y - height) / scale]);
                }
            }
        }
        return this.path(path).attr({
            fill: "#000",
            stroke: "none"
        });
    };

    
    paperproto.add = function (json) {
        if (R.is(json, "array")) {
            var res = this.set(),
                i = 0,
                ii = json.length,
                j;
            for (; i < ii; i++) {
                j = json[i] || {};
                elements[has](j.type) && res.push(this[j.type]().attr(j));
            }
        }
        return res;
    };

    
    R.format = function (token, params) {
        var args = R.is(params, array) ? [0][concat](params) : arguments;
        token && R.is(token, string) && args.length - 1 && (token = token.replace(formatrg, function (str, i) {
            return args[++i] == null ? E : args[i];
        }));
        return token || E;
    };
    
    R.fullfill = (function () {
        var tokenRegex = /\{([^\}]+)\}/g,
            objNotationRegex = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g, // matches .xxxxx or ["xxxxx"] to run over object properties
            replacer = function (all, key, obj) {
                var res = obj;
                key.replace(objNotationRegex, function (all, name, quote, quotedName, isFunc) {
                    name = name || quotedName;
                    if (res) {
                        if (name in res) {
                            res = res[name];
                        }
                        typeof res == "function" && isFunc && (res = res());
                    }
                });
                res = (res == null || res == obj ? all : res) + "";
                return res;
            };
        return function (str, obj) {
            return String(str).replace(tokenRegex, function (all, key) {
                return replacer(all, key, obj);
            });
        };
    })();
    
    R.ninja = function () {
        oldRaphael.was ? (g.win.Raphael = oldRaphael.is) : delete Raphael;
        return R;
    };
    
    R.st = setproto;
    // Firefox <3.6 fix: http://webreflection.blogspot.com/2009/11/195-chars-to-help-lazy-loading.html
    (function (doc, loaded, f) {
        if (doc.readyState == null && doc.addEventListener){
            doc.addEventListener(loaded, f = function () {
                doc.removeEventListener(loaded, f, false);
                doc.readyState = "complete";
            }, false);
            doc.readyState = "loading";
        }
        function isLoaded() {
            (/in/).test(doc.readyState) ? setTimeout(isLoaded, 9) : R.eve("raphael.DOMload");
        }
        isLoaded();
    })(document, "DOMContentLoaded");

    oldRaphael.was ? (g.win.Raphael = R) : (Raphael = R);
    
    eve.on("raphael.DOMload", function () {
        loaded = true;
    });
})();


// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ SVG Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.svg && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        toInt = parseInt,
        math = Math,
        mmax = math.max,
        abs = math.abs,
        pow = math.pow,
        separator = /[, ]+/,
        eve = R.eve,
        E = "",
        S = " ";
    var xlink = "http://www.w3.org/1999/xlink",
        markers = {
            block: "M5,0 0,2.5 5,5z",
            classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
            diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
            open: "M6,1 1,3.5 6,6",
            oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
        },
        markerCounter = {};
    R.toString = function () {
        return  "Your browser supports SVG.\nYou are running Rapha\xebl " + this.version;
    };
    var $ = function (el, attr) {
        if (attr) {
            if (typeof el == "string") {
                el = $(el);
            }
            for (var key in attr) if (attr[has](key)) {
                if (key.substring(0, 6) == "xlink:") {
                    el.setAttributeNS(xlink, key.substring(6), Str(attr[key]));
                } else {
                    el.setAttribute(key, Str(attr[key]));
                }
            }
        } else {
            el = R._g.doc.createElementNS("http://www.w3.org/2000/svg", el);
            el.style && (el.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
        }
        return el;
    },
    addGradientFill = function (element, gradient) {
        var type = "linear",
            id = element.id + gradient,
            fx = .5, fy = .5,
            o = element.node,
            SVG = element.paper,
            s = o.style,
            el = R._g.doc.getElementById(id);
        if (!el) {
            gradient = Str(gradient).replace(R._radial_gradient, function (all, _fx, _fy) {
                type = "radial";
                if (_fx && _fy) {
                    fx = toFloat(_fx);
                    fy = toFloat(_fy);
                    var dir = ((fy > .5) * 2 - 1);
                    pow(fx - .5, 2) + pow(fy - .5, 2) > .25 &&
                        (fy = math.sqrt(.25 - pow(fx - .5, 2)) * dir + .5) &&
                        fy != .5 &&
                        (fy = fy.toFixed(5) - 1e-5 * dir);
                }
                return E;
            });
            gradient = gradient.split(/\s*\-\s*/);
            if (type == "linear") {
                var angle = gradient.shift();
                angle = -toFloat(angle);
                if (isNaN(angle)) {
                    return null;
                }
                var vector = [0, 0, math.cos(R.rad(angle)), math.sin(R.rad(angle))],
                    max = 1 / (mmax(abs(vector[2]), abs(vector[3])) || 1);
                vector[2] *= max;
                vector[3] *= max;
                if (vector[2] < 0) {
                    vector[0] = -vector[2];
                    vector[2] = 0;
                }
                if (vector[3] < 0) {
                    vector[1] = -vector[3];
                    vector[3] = 0;
                }
            }
            var dots = R._parseDots(gradient);
            if (!dots) {
                return null;
            }
            id = id.replace(/[\(\)\s,\xb0#]/g, "_");
            
            if (element.gradient && id != element.gradient.id) {
                SVG.defs.removeChild(element.gradient);
                delete element.gradient;
            }

            if (!element.gradient) {
                el = $(type + "Gradient", {id: id});
                element.gradient = el;
                $(el, type == "radial" ? {
                    fx: fx,
                    fy: fy
                } : {
                    x1: vector[0],
                    y1: vector[1],
                    x2: vector[2],
                    y2: vector[3],
                    gradientTransform: element.matrix.invert()
                });
                SVG.defs.appendChild(el);
                for (var i = 0, ii = dots.length; i < ii; i++) {
                    el.appendChild($("stop", {
                        offset: dots[i].offset ? dots[i].offset : i ? "100%" : "0%",
                        "stop-color": dots[i].color || "#fff"
                    }));
                }
            }
        }
        $(o, {
            fill: "url(#" + id + ")",
            opacity: 1,
            "fill-opacity": 1
        });
        s.fill = E;
        s.opacity = 1;
        s.fillOpacity = 1;
        return 1;
    },
    updatePosition = function (o) {
        var bbox = o.getBBox(1);
        $(o.pattern, {patternTransform: o.matrix.invert() + " translate(" + bbox.x + "," + bbox.y + ")"});
    },
    addArrow = function (o, value, isEnd) {
        if (o.type == "path") {
            var values = Str(value).toLowerCase().split("-"),
                p = o.paper,
                se = isEnd ? "end" : "start",
                node = o.node,
                attrs = o.attrs,
                stroke = attrs["stroke-width"],
                i = values.length,
                type = "classic",
                from,
                to,
                dx,
                refX,
                attr,
                w = 3,
                h = 3,
                t = 5;
            while (i--) {
                switch (values[i]) {
                    case "block":
                    case "classic":
                    case "oval":
                    case "diamond":
                    case "open":
                    case "none":
                        type = values[i];
                        break;
                    case "wide": h = 5; break;
                    case "narrow": h = 2; break;
                    case "long": w = 5; break;
                    case "short": w = 2; break;
                }
            }
            if (type == "open") {
                w += 2;
                h += 2;
                t += 2;
                dx = 1;
                refX = isEnd ? 4 : 1;
                attr = {
                    fill: "none",
                    stroke: attrs.stroke
                };
            } else {
                refX = dx = w / 2;
                attr = {
                    fill: attrs.stroke,
                    stroke: "none"
                };
            }
            if (o._.arrows) {
                if (isEnd) {
                    o._.arrows.endPath && markerCounter[o._.arrows.endPath]--;
                    o._.arrows.endMarker && markerCounter[o._.arrows.endMarker]--;
                } else {
                    o._.arrows.startPath && markerCounter[o._.arrows.startPath]--;
                    o._.arrows.startMarker && markerCounter[o._.arrows.startMarker]--;
                }
            } else {
                o._.arrows = {};
            }
            if (type != "none") {
                var pathId = "raphael-marker-" + type,
                    markerId = "raphael-marker-" + se + type + w + h;
                if (!R._g.doc.getElementById(pathId)) {
                    p.defs.appendChild($($("path"), {
                        "stroke-linecap": "round",
                        d: markers[type],
                        id: pathId
                    }));
                    markerCounter[pathId] = 1;
                } else {
                    markerCounter[pathId]++;
                }
                var marker = R._g.doc.getElementById(markerId),
                    use;
                if (!marker) {
                    marker = $($("marker"), {
                        id: markerId,
                        markerHeight: h,
                        markerWidth: w,
                        orient: "auto",
                        refX: refX,
                        refY: h / 2
                    });
                    use = $($("use"), {
                        "xlink:href": "#" + pathId,
                        transform: (isEnd ? "rotate(180 " + w / 2 + " " + h / 2 + ") " : E) + "scale(" + w / t + "," + h / t + ")",
                        "stroke-width": (1 / ((w / t + h / t) / 2)).toFixed(4)
                    });
                    marker.appendChild(use);
                    p.defs.appendChild(marker);
                    markerCounter[markerId] = 1;
                } else {
                    markerCounter[markerId]++;
                    use = marker.getElementsByTagName("use")[0];
                }
                $(use, attr);
                var delta = dx * (type != "diamond" && type != "oval");
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - delta * stroke;
                } else {
                    from = delta * stroke;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                attr = {};
                attr["marker-" + se] = "url(#" + markerId + ")";
                if (to || from) {
                    attr.d = Raphael.getSubpath(attrs.path, from, to);
                }
                $(node, attr);
                o._.arrows[se + "Path"] = pathId;
                o._.arrows[se + "Marker"] = markerId;
                o._.arrows[se + "dx"] = delta;
                o._.arrows[se + "Type"] = type;
                o._.arrows[se + "String"] = value;
            } else {
                if (isEnd) {
                    from = o._.arrows.startdx * stroke || 0;
                    to = R.getTotalLength(attrs.path) - from;
                } else {
                    from = 0;
                    to = R.getTotalLength(attrs.path) - (o._.arrows.enddx * stroke || 0);
                }
                o._.arrows[se + "Path"] && $(node, {d: Raphael.getSubpath(attrs.path, from, to)});
                delete o._.arrows[se + "Path"];
                delete o._.arrows[se + "Marker"];
                delete o._.arrows[se + "dx"];
                delete o._.arrows[se + "Type"];
                delete o._.arrows[se + "String"];
            }
            for (attr in markerCounter) if (markerCounter[has](attr) && !markerCounter[attr]) {
                var item = R._g.doc.getElementById(attr);
                item && item.parentNode.removeChild(item);
            }
        }
    },
    dasharray = {
        "": [0],
        "none": [0],
        "-": [3, 1],
        ".": [1, 1],
        "-.": [3, 1, 1, 1],
        "-..": [3, 1, 1, 1, 1, 1],
        ". ": [1, 3],
        "- ": [4, 3],
        "--": [8, 3],
        "- .": [4, 3, 1, 3],
        "--.": [8, 3, 1, 3],
        "--..": [8, 3, 1, 3, 1, 3]
    },
    addDashes = function (o, value, params) {
        value = dasharray[Str(value).toLowerCase()];
        if (value) {
            var width = o.attrs["stroke-width"] || "1",
                butt = {round: width, square: width, butt: 0}[o.attrs["stroke-linecap"] || params["stroke-linecap"]] || 0,
                dashes = [],
                i = value.length;
            while (i--) {
                dashes[i] = value[i] * width + ((i % 2) ? 1 : -1) * butt;
            }
            $(o.node, {"stroke-dasharray": dashes.join(",")});
        }
    },
    setFillAndStroke = function (o, params) {
        var node = o.node,
            attrs = o.attrs,
            vis = node.style.visibility;
        node.style.visibility = "hidden";
        for (var att in params) {
            if (params[has](att)) {
                if (!R._availableAttrs[has](att)) {
                    continue;
                }
                var value = params[att];
                attrs[att] = value;
                switch (att) {
                    case "blur":
                        o.blur(value);
                        break;
                    case "href":
                    case "title":
                    case "target":
                        var pn = node.parentNode;
                        if (pn.tagName.toLowerCase() != "a") {
                            var hl = $("a");
                            pn.insertBefore(hl, node);
                            hl.appendChild(node);
                            pn = hl;
                        }
                        if (att == "target") {
                            pn.setAttributeNS(xlink, "show", value == "blank" ? "new" : value);
                        } else {
                            pn.setAttributeNS(xlink, att, value);
                        }
                        break;
                    case "cursor":
                        node.style.cursor = value;
                        break;
                    case "transform":
                        o.transform(value);
                        break;
                    case "arrow-start":
                        addArrow(o, value);
                        break;
                    case "arrow-end":
                        addArrow(o, value, 1);
                        break;
                    case "clip-rect":
                        var rect = Str(value).split(separator);
                        if (rect.length == 4) {
                            o.clip && o.clip.parentNode.parentNode.removeChild(o.clip.parentNode);
                            var el = $("clipPath"),
                                rc = $("rect");
                            el.id = R.createUUID();
                            $(rc, {
                                x: rect[0],
                                y: rect[1],
                                width: rect[2],
                                height: rect[3]
                            });
                            el.appendChild(rc);
                            o.paper.defs.appendChild(el);
                            $(node, {"clip-path": "url(#" + el.id + ")"});
                            o.clip = rc;
                        }
                        if (!value) {
                            var path = node.getAttribute("clip-path");
                            if (path) {
                                var clip = R._g.doc.getElementById(path.replace(/(^url\(#|\)$)/g, E));
                                clip && clip.parentNode.removeChild(clip);
                                $(node, {"clip-path": E});
                                delete o.clip;
                            }
                        }
                    break;
                    case "path":
                        if (o.type == "path") {
                            $(node, {d: value ? attrs.path = R._pathToAbsolute(value) : "M0,0"});
                            o._.dirty = 1;
                            if (o._.arrows) {
                                "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                                "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                            }
                        }
                        break;
                    case "width":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fx) {
                            att = "x";
                            value = attrs.x;
                        } else {
                            break;
                        }
                    case "x":
                        if (attrs.fx) {
                            value = -attrs.x - (attrs.width || 0);
                        }
                    case "rx":
                        if (att == "rx" && o.type == "rect") {
                            break;
                        }
                    case "cx":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "height":
                        node.setAttribute(att, value);
                        o._.dirty = 1;
                        if (attrs.fy) {
                            att = "y";
                            value = attrs.y;
                        } else {
                            break;
                        }
                    case "y":
                        if (attrs.fy) {
                            value = -attrs.y - (attrs.height || 0);
                        }
                    case "ry":
                        if (att == "ry" && o.type == "rect") {
                            break;
                        }
                    case "cy":
                        node.setAttribute(att, value);
                        o.pattern && updatePosition(o);
                        o._.dirty = 1;
                        break;
                    case "r":
                        if (o.type == "rect") {
                            $(node, {rx: value, ry: value});
                        } else {
                            node.setAttribute(att, value);
                        }
                        o._.dirty = 1;
                        break;
                    case "src":
                        if (o.type == "image") {
                            node.setAttributeNS(xlink, "href", value);
                        }
                        break;
                    case "stroke-width":
                        if (o._.sx != 1 || o._.sy != 1) {
                            value /= mmax(abs(o._.sx), abs(o._.sy)) || 1;
                        }
                        if (o.paper._vbSize) {
                            value *= o.paper._vbSize;
                        }
                        node.setAttribute(att, value);
                        if (attrs["stroke-dasharray"]) {
                            addDashes(o, attrs["stroke-dasharray"], params);
                        }
                        if (o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "stroke-dasharray":
                        addDashes(o, value, params);
                        break;
                    case "fill":
                        var isURL = Str(value).match(R._ISURL);
                        if (isURL) {
                            el = $("pattern");
                            var ig = $("image");
                            el.id = R.createUUID();
                            $(el, {x: 0, y: 0, patternUnits: "userSpaceOnUse", height: 1, width: 1});
                            $(ig, {x: 0, y: 0, "xlink:href": isURL[1]});
                            el.appendChild(ig);

                            (function (el) {
                                R._preload(isURL[1], function () {
                                    var w = this.offsetWidth,
                                        h = this.offsetHeight;
                                    $(el, {width: w, height: h});
                                    $(ig, {width: w, height: h});
                                    o.paper.safari();
                                });
                            })(el);
                            o.paper.defs.appendChild(el);
                            $(node, {fill: "url(#" + el.id + ")"});
                            o.pattern = el;
                            o.pattern && updatePosition(o);
                            break;
                        }
                        var clr = R.getRGB(value);
                        if (!clr.error) {
                            delete params.gradient;
                            delete attrs.gradient;
                            !R.is(attrs.opacity, "undefined") &&
                                R.is(params.opacity, "undefined") &&
                                $(node, {opacity: attrs.opacity});
                            !R.is(attrs["fill-opacity"], "undefined") &&
                                R.is(params["fill-opacity"], "undefined") &&
                                $(node, {"fill-opacity": attrs["fill-opacity"]});
                        } else if ((o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value)) {
                            if ("opacity" in attrs || "fill-opacity" in attrs) {
                                var gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                                if (gradient) {
                                    var stops = gradient.getElementsByTagName("stop");
                                    $(stops[stops.length - 1], {"stop-opacity": ("opacity" in attrs ? attrs.opacity : 1) * ("fill-opacity" in attrs ? attrs["fill-opacity"] : 1)});
                                }
                            }
                            attrs.gradient = value;
                            attrs.fill = "none";
                            break;
                        }
                        clr[has]("opacity") && $(node, {"fill-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                    case "stroke":
                        clr = R.getRGB(value);
                        node.setAttribute(att, clr.hex);
                        att == "stroke" && clr[has]("opacity") && $(node, {"stroke-opacity": clr.opacity > 1 ? clr.opacity / 100 : clr.opacity});
                        if (att == "stroke" && o._.arrows) {
                            "startString" in o._.arrows && addArrow(o, o._.arrows.startString);
                            "endString" in o._.arrows && addArrow(o, o._.arrows.endString, 1);
                        }
                        break;
                    case "gradient":
                        (o.type == "circle" || o.type == "ellipse" || Str(value).charAt() != "r") && addGradientFill(o, value);
                        break;
                    case "opacity":
                        if (attrs.gradient && !attrs[has]("stroke-opacity")) {
                            $(node, {"stroke-opacity": value > 1 ? value / 100 : value});
                        }
                        // fall
                    case "fill-opacity":
                        if (attrs.gradient) {
                            gradient = R._g.doc.getElementById(node.getAttribute("fill").replace(/^url\(#|\)$/g, E));
                            if (gradient) {
                                stops = gradient.getElementsByTagName("stop");
                                $(stops[stops.length - 1], {"stop-opacity": value});
                            }
                            break;
                        }
                    default:
                        att == "font-size" && (value = toInt(value, 10) + "px");
                        var cssrule = att.replace(/(\-.)/g, function (w) {
                            return w.substring(1).toUpperCase();
                        });
                        node.style[cssrule] = value;
                        o._.dirty = 1;
                        node.setAttribute(att, value);
                        break;
                }
            }
        }

        tuneText(o, params);
        node.style.visibility = vis;
    },
    leading = 1.2,
    tuneText = function (el, params) {
        if (el.type != "text" || !(params[has]("text") || params[has]("font") || params[has]("font-size") || params[has]("x") || params[has]("y"))) {
            return;
        }
        var a = el.attrs,
            node = el.node,
            fontSize = node.firstChild ? toInt(R._g.doc.defaultView.getComputedStyle(node.firstChild, E).getPropertyValue("font-size"), 10) : 10;

        if (params[has]("text")) {
            a.text = params.text;
            while (node.firstChild) {
                node.removeChild(node.firstChild);
            }
            var texts = Str(params.text).split("\n"),
                tspans = [],
                tspan;
            for (var i = 0, ii = texts.length; i < ii; i++) {
                tspan = $("tspan");
                i && $(tspan, {dy: fontSize * leading, x: a.x});
                tspan.appendChild(R._g.doc.createTextNode(texts[i]));
                node.appendChild(tspan);
                tspans[i] = tspan;
            }
        } else {
            tspans = node.getElementsByTagName("tspan");
            for (i = 0, ii = tspans.length; i < ii; i++) if (i) {
                $(tspans[i], {dy: fontSize * leading, x: a.x});
            } else {
                $(tspans[0], {dy: 0});
            }
        }
        $(node, {x: a.x, y: a.y});
        el._.dirty = 1;
        var bb = el._getBBox(),
            dif = a.y - (bb.y + bb.height / 2);
        dif && R.is(dif, "finite") && $(tspans[0], {dy: dif});
    },
    Element = function (node, svg) {
        var X = 0,
            Y = 0;
        
        this[0] = this.node = node;
        
        node.raphael = true;
        
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.matrix = R.matrix();
        this.realPath = null;
        
        this.paper = svg;
        this.attrs = this.attrs || {};
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            deg: 0,
            dx: 0,
            dy: 0,
            dirty: 1
        };
        !svg.bottom && (svg.bottom = this);
        
        this.prev = svg.top;
        svg.top && (svg.top.next = this);
        svg.top = this;
        
        this.next = null;
    },
    elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;

    R._engine.path = function (pathString, SVG) {
        var el = $("path");
        SVG.canvas && SVG.canvas.appendChild(el);
        var p = new Element(el, SVG);
        p.type = "path";
        setFillAndStroke(p, {
            fill: "none",
            stroke: "#000",
            path: pathString
        });
        return p;
    };
    
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        return this;
    };
    
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    
    elproto.transform = function (tstr) {
        var _ = this._;
        if (tstr == null) {
            return _.transform;
        }
        R._extractTransform(this, tstr);

        this.clip && $(this.clip, {transform: this.matrix.invert()});
        this.pattern && updatePosition(this);
        this.node && $(this.node, {transform: this.matrix});
    
        if (_.sx != 1 || _.sy != 1) {
            var sw = this.attrs[has]("stroke-width") ? this.attrs["stroke-width"] : 1;
            this.attr({"stroke-width": sw});
        }

        return this;
    };
    
    elproto.hide = function () {
        !this.removed && this.paper.safari(this.node.style.display = "none");
        return this;
    };
    
    elproto.show = function () {
        !this.removed && this.paper.safari(this.node.style.display = "");
        return this;
    };
    
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        var paper = this.paper;
        paper.__set__ && paper.__set__.exclude(this);
        eve.unbind("raphael.*.*." + this.id);
        if (this.gradient) {
            paper.defs.removeChild(this.gradient);
        }
        R._tear(this, paper);
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.removeChild(this.node.parentNode);
        } else {
            this.node.parentNode.removeChild(this.node);
        }
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto._getBBox = function () {
        if (this.node.style.display == "none") {
            this.show();
            var hide = true;
        }
        var bbox = {};
        try {
            bbox = this.node.getBBox();
        } catch(e) {
            // Firefox 3.0.x plays badly here
        } finally {
            bbox = bbox || {};
        }
        hide && this.hide();
        return bbox;
    };
    
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == "fill" && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            if (name == "transform") {
                return this._.transform;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        if (value != null) {
            var params = {};
            params[name] = value;
        } else if (name != null && R.is(name, "object")) {
            params = name;
        }
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
            var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
            this.attrs[key] = params[key];
            for (var subkey in par) if (par[has](subkey)) {
                params[subkey] = par[subkey];
            }
        }
        setFillAndStroke(this, params);
        return this;
    };
    
    elproto.toFront = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.tagName.toLowerCase() == "a") {
            this.node.parentNode.parentNode.appendChild(this.node.parentNode);
        } else {
            this.node.parentNode.appendChild(this.node);
        }
        var svg = this.paper;
        svg.top != this && R._tofront(this, svg);
        return this;
    };
    
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        var parent = this.node.parentNode;
        if (parent.tagName.toLowerCase() == "a") {
            parent.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild); 
        } else if (parent.firstChild != this.node) {
            parent.insertBefore(this.node, this.node.parentNode.firstChild);
        }
        R._toback(this, this.paper);
        var svg = this.paper;
        return this;
    };
    
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[element.length - 1].node;
        if (node.nextSibling) {
            node.parentNode.insertBefore(this.node, node.nextSibling);
        } else {
            node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        var node = element.node || element[0].node;
        node.parentNode.insertBefore(this.node, node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        // Experimental. No Safari support. Use it on your own risk.
        var t = this;
        if (+size !== 0) {
            var fltr = $("filter"),
                blur = $("feGaussianBlur");
            t.attrs.blur = size;
            fltr.id = R.createUUID();
            $(blur, {stdDeviation: +size || 1.5});
            fltr.appendChild(blur);
            t.paper.defs.appendChild(fltr);
            t._blur = fltr;
            $(t.node, {filter: "url(#" + fltr.id + ")"});
        } else {
            if (t._blur) {
                t._blur.parentNode.removeChild(t._blur);
                delete t._blur;
                delete t.attrs.blur;
            }
            t.node.removeAttribute("filter");
        }
    };
    R._engine.circle = function (svg, x, y, r) {
        var el = $("circle");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, r: r, fill: "none", stroke: "#000"};
        res.type = "circle";
        $(el, res.attrs);
        return res;
    };
    R._engine.rect = function (svg, x, y, w, h, r) {
        var el = $("rect");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, r: r || 0, rx: r || 0, ry: r || 0, fill: "none", stroke: "#000"};
        res.type = "rect";
        $(el, res.attrs);
        return res;
    };
    R._engine.ellipse = function (svg, x, y, rx, ry) {
        var el = $("ellipse");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {cx: x, cy: y, rx: rx, ry: ry, fill: "none", stroke: "#000"};
        res.type = "ellipse";
        $(el, res.attrs);
        return res;
    };
    R._engine.image = function (svg, src, x, y, w, h) {
        var el = $("image");
        $(el, {x: x, y: y, width: w, height: h, preserveAspectRatio: "none"});
        el.setAttributeNS(xlink, "href", src);
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {x: x, y: y, width: w, height: h, src: src};
        res.type = "image";
        return res;
    };
    R._engine.text = function (svg, x, y, text) {
        var el = $("text");
        svg.canvas && svg.canvas.appendChild(el);
        var res = new Element(el, svg);
        res.attrs = {
            x: x,
            y: y,
            "text-anchor": "middle",
            text: text,
            font: R._availableAttrs.font,
            stroke: "none",
            fill: "#000"
        };
        res.type = "text";
        setFillAndStroke(res, res.attrs);
        return res;
    };
    R._engine.setSize = function (width, height) {
        this.width = width || this.width;
        this.height = height || this.height;
        this.canvas.setAttribute("width", this.width);
        this.canvas.setAttribute("height", this.height);
        if (this._viewBox) {
            this.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con && con.container,
            x = con.x,
            y = con.y,
            width = con.width,
            height = con.height;
        if (!container) {
            throw new Error("SVG container not found.");
        }
        var cnvs = $("svg"),
            css = "overflow:hidden;",
            isFloating;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        $(cnvs, {
            height: height,
            version: 1.1,
            width: width,
            xmlns: "http://www.w3.org/2000/svg"
        });
        if (container == 1) {
            cnvs.style.cssText = css + "position:absolute;left:" + x + "px;top:" + y + "px";
            R._g.doc.body.appendChild(cnvs);
            isFloating = 1;
        } else {
            cnvs.style.cssText = css + "position:relative";
            if (container.firstChild) {
                container.insertBefore(cnvs, container.firstChild);
            } else {
                container.appendChild(cnvs);
            }
        }
        container = new R._Paper;
        container.width = width;
        container.height = height;
        container.canvas = cnvs;
        container.clear();
        container._left = container._top = 0;
        isFloating && (container.renderfix = function () {});
        container.renderfix();
        return container;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var size = mmax(w / this.width, h / this.height),
            top = this.top,
            aspectRatio = fit ? "meet" : "xMinYMin",
            vb,
            sw;
        if (x == null) {
            if (this._vbSize) {
                size = 1;
            }
            delete this._vbSize;
            vb = "0 0 " + this.width + S + this.height;
        } else {
            this._vbSize = size;
            vb = x + S + y + S + w + S + h;
        }
        $(this.canvas, {
            viewBox: vb,
            preserveAspectRatio: aspectRatio
        });
        while (size && top) {
            sw = "stroke-width" in top.attrs ? top.attrs["stroke-width"] : 1;
            top.attr({"stroke-width": sw});
            top._.dirty = 1;
            top._.dirtyT = 1;
            top = top.prev;
        }
        this._viewBox = [x, y, w, h, !!fit];
        return this;
    };
    
    R.prototype.renderfix = function () {
        var cnvs = this.canvas,
            s = cnvs.style,
            pos;
        try {
            pos = cnvs.getScreenCTM() || cnvs.createSVGMatrix();
        } catch (e) {
            pos = cnvs.createSVGMatrix();
        }
        var left = -pos.e % 1,
            top = -pos.f % 1;
        if (left || top) {
            if (left) {
                this._left = (this._left + left) % 1;
                s.left = this._left + "px";
            }
            if (top) {
                this._top = (this._top + top) % 1;
                s.top = this._top + "px";
            }
        }
    };
    
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        var c = this.canvas;
        while (c.firstChild) {
            c.removeChild(c.firstChild);
        }
        this.bottom = this.top = null;
        (this.desc = $("desc")).appendChild(R._g.doc.createTextNode("Created with Rapha\xebl " + R.version));
        c.appendChild(this.desc);
        c.appendChild(this.defs = $("defs"));
    };
    
    R.prototype.remove = function () {
        eve("raphael.remove", this);
        this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
    };
    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);

// ┌─────────────────────────────────────────────────────────────────────┐ \\
// │ Raphaël - JavaScript Vector Library                                 │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ VML Module                                                          │ \\
// ├─────────────────────────────────────────────────────────────────────┤ \\
// │ Copyright (c) 2008-2011 Dmitry Baranovskiy (http://raphaeljs.com)   │ \\
// │ Copyright (c) 2008-2011 Sencha Labs (http://sencha.com)             │ \\
// │ Licensed under the MIT (http://raphaeljs.com/license.html) license. │ \\
// └─────────────────────────────────────────────────────────────────────┘ \\
window.Raphael.vml && function (R) {
    var has = "hasOwnProperty",
        Str = String,
        toFloat = parseFloat,
        math = Math,
        round = math.round,
        mmax = math.max,
        mmin = math.min,
        abs = math.abs,
        fillString = "fill",
        separator = /[, ]+/,
        eve = R.eve,
        ms = " progid:DXImageTransform.Microsoft",
        S = " ",
        E = "",
        map = {M: "m", L: "l", C: "c", Z: "x", m: "t", l: "r", c: "v", z: "x"},
        bites = /([clmz]),?([^clmz]*)/gi,
        blurregexp = / progid:\S+Blur\([^\)]+\)/g,
        val = /-?[^,\s-]+/g,
        cssDot = "position:absolute;left:0;top:0;width:1px;height:1px",
        zoom = 21600,
        pathTypes = {path: 1, rect: 1, image: 1},
        ovalTypes = {circle: 1, ellipse: 1},
        path2vml = function (path) {
            var total =  /[ahqstv]/ig,
                command = R._pathToAbsolute;
            Str(path).match(total) && (command = R._path2curve);
            total = /[clmz]/g;
            if (command == R._pathToAbsolute && !Str(path).match(total)) {
                var res = Str(path).replace(bites, function (all, command, args) {
                    var vals = [],
                        isMove = command.toLowerCase() == "m",
                        res = map[command];
                    args.replace(val, function (value) {
                        if (isMove && vals.length == 2) {
                            res += vals + map[command == "m" ? "l" : "L"];
                            vals = [];
                        }
                        vals.push(round(value * zoom));
                    });
                    return res + vals;
                });
                return res;
            }
            var pa = command(path), p, r;
            res = [];
            for (var i = 0, ii = pa.length; i < ii; i++) {
                p = pa[i];
                r = pa[i][0].toLowerCase();
                r == "z" && (r = "x");
                for (var j = 1, jj = p.length; j < jj; j++) {
                    r += round(p[j] * zoom) + (j != jj - 1 ? "," : E);
                }
                res.push(r);
            }
            return res.join(S);
        },
        compensation = function (deg, dx, dy) {
            var m = R.matrix();
            m.rotate(-deg, .5, .5);
            return {
                dx: m.x(dx, dy),
                dy: m.y(dx, dy)
            };
        },
        setCoords = function (p, sx, sy, dx, dy, deg) {
            var _ = p._,
                m = p.matrix,
                fillpos = _.fillpos,
                o = p.node,
                s = o.style,
                y = 1,
                flip = "",
                dxdy,
                kx = zoom / sx,
                ky = zoom / sy;
            s.visibility = "hidden";
            if (!sx || !sy) {
                return;
            }
            o.coordsize = abs(kx) + S + abs(ky);
            s.rotation = deg * (sx * sy < 0 ? -1 : 1);
            if (deg) {
                var c = compensation(deg, dx, dy);
                dx = c.dx;
                dy = c.dy;
            }
            sx < 0 && (flip += "x");
            sy < 0 && (flip += " y") && (y = -1);
            s.flip = flip;
            o.coordorigin = (dx * -kx) + S + (dy * -ky);
            if (fillpos || _.fillsize) {
                var fill = o.getElementsByTagName(fillString);
                fill = fill && fill[0];
                o.removeChild(fill);
                if (fillpos) {
                    c = compensation(deg, m.x(fillpos[0], fillpos[1]), m.y(fillpos[0], fillpos[1]));
                    fill.position = c.dx * y + S + c.dy * y;
                }
                if (_.fillsize) {
                    fill.size = _.fillsize[0] * abs(sx) + S + _.fillsize[1] * abs(sy);
                }
                o.appendChild(fill);
            }
            s.visibility = "visible";
        };
    R.toString = function () {
        return  "Your browser doesn\u2019t support SVG. Falling down to VML.\nYou are running Rapha\xebl " + this.version;
    };
    var addArrow = function (o, value, isEnd) {
        var values = Str(value).toLowerCase().split("-"),
            se = isEnd ? "end" : "start",
            i = values.length,
            type = "classic",
            w = "medium",
            h = "medium";
        while (i--) {
            switch (values[i]) {
                case "block":
                case "classic":
                case "oval":
                case "diamond":
                case "open":
                case "none":
                    type = values[i];
                    break;
                case "wide":
                case "narrow": h = values[i]; break;
                case "long":
                case "short": w = values[i]; break;
            }
        }
        var stroke = o.node.getElementsByTagName("stroke")[0];
        stroke[se + "arrow"] = type;
        stroke[se + "arrowlength"] = w;
        stroke[se + "arrowwidth"] = h;
    },
    setFillAndStroke = function (o, params) {
        // o.paper.canvas.style.display = "none";
        o.attrs = o.attrs || {};
        var node = o.node,
            a = o.attrs,
            s = node.style,
            xy,
            newpath = pathTypes[o.type] && (params.x != a.x || params.y != a.y || params.width != a.width || params.height != a.height || params.cx != a.cx || params.cy != a.cy || params.rx != a.rx || params.ry != a.ry || params.r != a.r),
            isOval = ovalTypes[o.type] && (a.cx != params.cx || a.cy != params.cy || a.r != params.r || a.rx != params.rx || a.ry != params.ry),
            res = o;


        for (var par in params) if (params[has](par)) {
            a[par] = params[par];
        }
        if (newpath) {
            a.path = R._getPath[o.type](o);
            o._.dirty = 1;
        }
        params.href && (node.href = params.href);
        params.title && (node.title = params.title);
        params.target && (node.target = params.target);
        params.cursor && (s.cursor = params.cursor);
        "blur" in params && o.blur(params.blur);
        if (params.path && o.type == "path" || newpath) {
            node.path = path2vml(~Str(a.path).toLowerCase().indexOf("r") ? R._pathToAbsolute(a.path) : a.path);
            if (o.type == "image") {
                o._.fillpos = [a.x, a.y];
                o._.fillsize = [a.width, a.height];
                setCoords(o, 1, 1, 0, 0, 0);
            }
        }
        "transform" in params && o.transform(params.transform);
        if (isOval) {
            var cx = +a.cx,
                cy = +a.cy,
                rx = +a.rx || +a.r || 0,
                ry = +a.ry || +a.r || 0;
            node.path = R.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", round((cx - rx) * zoom), round((cy - ry) * zoom), round((cx + rx) * zoom), round((cy + ry) * zoom), round(cx * zoom));
        }
        if ("clip-rect" in params) {
            var rect = Str(params["clip-rect"]).split(separator);
            if (rect.length == 4) {
                rect[2] = +rect[2] + (+rect[0]);
                rect[3] = +rect[3] + (+rect[1]);
                var div = node.clipRect || R._g.doc.createElement("div"),
                    dstyle = div.style;
                dstyle.clip = R.format("rect({1}px {2}px {3}px {0}px)", rect);
                if (!node.clipRect) {
                    dstyle.position = "absolute";
                    dstyle.top = 0;
                    dstyle.left = 0;
                    dstyle.width = o.paper.width + "px";
                    dstyle.height = o.paper.height + "px";
                    node.parentNode.insertBefore(div, node);
                    div.appendChild(node);
                    node.clipRect = div;
                }
            }
            if (!params["clip-rect"]) {
                node.clipRect && (node.clipRect.style.clip = "auto");
            }
        }
        if (o.textpath) {
            var textpathStyle = o.textpath.style;
            params.font && (textpathStyle.font = params.font);
            params["font-family"] && (textpathStyle.fontFamily = '"' + params["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, E) + '"');
            params["font-size"] && (textpathStyle.fontSize = params["font-size"]);
            params["font-weight"] && (textpathStyle.fontWeight = params["font-weight"]);
            params["font-style"] && (textpathStyle.fontStyle = params["font-style"]);
        }
        if ("arrow-start" in params) {
            addArrow(res, params["arrow-start"]);
        }
        if ("arrow-end" in params) {
            addArrow(res, params["arrow-end"], 1);
        }
        if (params.opacity != null || 
            params["stroke-width"] != null ||
            params.fill != null ||
            params.src != null ||
            params.stroke != null ||
            params["stroke-width"] != null ||
            params["stroke-opacity"] != null ||
            params["fill-opacity"] != null ||
            params["stroke-dasharray"] != null ||
            params["stroke-miterlimit"] != null ||
            params["stroke-linejoin"] != null ||
            params["stroke-linecap"] != null) {
            var fill = node.getElementsByTagName(fillString),
                newfill = false;
            fill = fill && fill[0];
            !fill && (newfill = fill = createNode(fillString));
            if (o.type == "image" && params.src) {
                fill.src = params.src;
            }
            params.fill && (fill.on = true);
            if (fill.on == null || params.fill == "none" || params.fill === null) {
                fill.on = false;
            }
            if (fill.on && params.fill) {
                var isURL = Str(params.fill).match(R._ISURL);
                if (isURL) {
                    fill.parentNode == node && node.removeChild(fill);
                    fill.rotate = true;
                    fill.src = isURL[1];
                    fill.type = "tile";
                    var bbox = o.getBBox(1);
                    fill.position = bbox.x + S + bbox.y;
                    o._.fillpos = [bbox.x, bbox.y];

                    R._preload(isURL[1], function () {
                        o._.fillsize = [this.offsetWidth, this.offsetHeight];
                    });
                } else {
                    fill.color = R.getRGB(params.fill).hex;
                    fill.src = E;
                    fill.type = "solid";
                    if (R.getRGB(params.fill).error && (res.type in {circle: 1, ellipse: 1} || Str(params.fill).charAt() != "r") && addGradientFill(res, params.fill, fill)) {
                        a.fill = "none";
                        a.gradient = params.fill;
                        fill.rotate = false;
                    }
                }
            }
            if ("fill-opacity" in params || "opacity" in params) {
                var opacity = ((+a["fill-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+R.getRGB(params.fill).o + 1 || 2) - 1);
                opacity = mmin(mmax(opacity, 0), 1);
                fill.opacity = opacity;
                if (fill.src) {
                    fill.color = "none";
                }
            }
            node.appendChild(fill);
            var stroke = (node.getElementsByTagName("stroke") && node.getElementsByTagName("stroke")[0]),
            newstroke = false;
            !stroke && (newstroke = stroke = createNode("stroke"));
            if ((params.stroke && params.stroke != "none") ||
                params["stroke-width"] ||
                params["stroke-opacity"] != null ||
                params["stroke-dasharray"] ||
                params["stroke-miterlimit"] ||
                params["stroke-linejoin"] ||
                params["stroke-linecap"]) {
                stroke.on = true;
            }
            (params.stroke == "none" || params.stroke === null || stroke.on == null || params.stroke == 0 || params["stroke-width"] == 0) && (stroke.on = false);
            var strokeColor = R.getRGB(params.stroke);
            stroke.on && params.stroke && (stroke.color = strokeColor.hex);
            opacity = ((+a["stroke-opacity"] + 1 || 2) - 1) * ((+a.opacity + 1 || 2) - 1) * ((+strokeColor.o + 1 || 2) - 1);
            var width = (toFloat(params["stroke-width"]) || 1) * .75;
            opacity = mmin(mmax(opacity, 0), 1);
            params["stroke-width"] == null && (width = a["stroke-width"]);
            params["stroke-width"] && (stroke.weight = width);
            width && width < 1 && (opacity *= width) && (stroke.weight = 1);
            stroke.opacity = opacity;
        
            params["stroke-linejoin"] && (stroke.joinstyle = params["stroke-linejoin"] || "miter");
            stroke.miterlimit = params["stroke-miterlimit"] || 8;
            params["stroke-linecap"] && (stroke.endcap = params["stroke-linecap"] == "butt" ? "flat" : params["stroke-linecap"] == "square" ? "square" : "round");
            if (params["stroke-dasharray"]) {
                var dasharray = {
                    "-": "shortdash",
                    ".": "shortdot",
                    "-.": "shortdashdot",
                    "-..": "shortdashdotdot",
                    ". ": "dot",
                    "- ": "dash",
                    "--": "longdash",
                    "- .": "dashdot",
                    "--.": "longdashdot",
                    "--..": "longdashdotdot"
                };
                stroke.dashstyle = dasharray[has](params["stroke-dasharray"]) ? dasharray[params["stroke-dasharray"]] : E;
            }
            newstroke && node.appendChild(stroke);
        }
        if (res.type == "text") {
            res.paper.canvas.style.display = E;
            var span = res.paper.span,
                m = 100,
                fontSize = a.font && a.font.match(/\d+(?:\.\d*)?(?=px)/);
            s = span.style;
            a.font && (s.font = a.font);
            a["font-family"] && (s.fontFamily = a["font-family"]);
            a["font-weight"] && (s.fontWeight = a["font-weight"]);
            a["font-style"] && (s.fontStyle = a["font-style"]);
            fontSize = toFloat(a["font-size"] || fontSize && fontSize[0]) || 10;
            s.fontSize = fontSize * m + "px";
            res.textpath.string && (span.innerHTML = Str(res.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
            var brect = span.getBoundingClientRect();
            res.W = a.w = (brect.right - brect.left) / m;
            res.H = a.h = (brect.bottom - brect.top) / m;
            // res.paper.canvas.style.display = "none";
            res.X = a.x;
            res.Y = a.y + res.H / 2;

            ("x" in params || "y" in params) && (res.path.v = R.format("m{0},{1}l{2},{1}", round(a.x * zoom), round(a.y * zoom), round(a.x * zoom) + 1));
            var dirtyattrs = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"];
            for (var d = 0, dd = dirtyattrs.length; d < dd; d++) if (dirtyattrs[d] in params) {
                res._.dirty = 1;
                break;
            }
        
            // text-anchor emulation
            switch (a["text-anchor"]) {
                case "start":
                    res.textpath.style["v-text-align"] = "left";
                    res.bbx = res.W / 2;
                break;
                case "end":
                    res.textpath.style["v-text-align"] = "right";
                    res.bbx = -res.W / 2;
                break;
                default:
                    res.textpath.style["v-text-align"] = "center";
                    res.bbx = 0;
                break;
            }
            res.textpath.style["v-text-kern"] = true;
        }
        // res.paper.canvas.style.display = E;
    },
    addGradientFill = function (o, gradient, fill) {
        o.attrs = o.attrs || {};
        var attrs = o.attrs,
            pow = Math.pow,
            opacity,
            oindex,
            type = "linear",
            fxfy = ".5 .5";
        o.attrs.gradient = gradient;
        gradient = Str(gradient).replace(R._radial_gradient, function (all, fx, fy) {
            type = "radial";
            if (fx && fy) {
                fx = toFloat(fx);
                fy = toFloat(fy);
                pow(fx - .5, 2) + pow(fy - .5, 2) > .25 && (fy = math.sqrt(.25 - pow(fx - .5, 2)) * ((fy > .5) * 2 - 1) + .5);
                fxfy = fx + S + fy;
            }
            return E;
        });
        gradient = gradient.split(/\s*\-\s*/);
        if (type == "linear") {
            var angle = gradient.shift();
            angle = -toFloat(angle);
            if (isNaN(angle)) {
                return null;
            }
        }
        var dots = R._parseDots(gradient);
        if (!dots) {
            return null;
        }
        o = o.shape || o.node;
        if (dots.length) {
            o.removeChild(fill);
            fill.on = true;
            fill.method = "none";
            fill.color = dots[0].color;
            fill.color2 = dots[dots.length - 1].color;
            var clrs = [];
            for (var i = 0, ii = dots.length; i < ii; i++) {
                dots[i].offset && clrs.push(dots[i].offset + S + dots[i].color);
            }
            fill.colors = clrs.length ? clrs.join() : "0% " + fill.color;
            if (type == "radial") {
                fill.type = "gradientTitle";
                fill.focus = "100%";
                fill.focussize = "0 0";
                fill.focusposition = fxfy;
                fill.angle = 0;
            } else {
                // fill.rotate= true;
                fill.type = "gradient";
                fill.angle = (270 - angle) % 360;
            }
            o.appendChild(fill);
        }
        return 1;
    },
    Element = function (node, vml) {
        this[0] = this.node = node;
        node.raphael = true;
        this.id = R._oid++;
        node.raphaelid = this.id;
        this.X = 0;
        this.Y = 0;
        this.attrs = {};
        this.paper = vml;
        this.matrix = R.matrix();
        this._ = {
            transform: [],
            sx: 1,
            sy: 1,
            dx: 0,
            dy: 0,
            deg: 0,
            dirty: 1,
            dirtyT: 1
        };
        !vml.bottom && (vml.bottom = this);
        this.prev = vml.top;
        vml.top && (vml.top.next = this);
        vml.top = this;
        this.next = null;
    };
    var elproto = R.el;

    Element.prototype = elproto;
    elproto.constructor = Element;
    elproto.transform = function (tstr) {
        if (tstr == null) {
            return this._.transform;
        }
        var vbs = this.paper._viewBoxShift,
            vbt = vbs ? "s" + [vbs.scale, vbs.scale] + "-1-1t" + [vbs.dx, vbs.dy] : E,
            oldt;
        if (vbs) {
            oldt = tstr = Str(tstr).replace(/\.{3}|\u2026/g, this._.transform || E);
        }
        R._extractTransform(this, vbt + tstr);
        var matrix = this.matrix.clone(),
            skew = this.skew,
            o = this.node,
            split,
            isGrad = ~Str(this.attrs.fill).indexOf("-"),
            isPatt = !Str(this.attrs.fill).indexOf("url(");
        matrix.translate(-.5, -.5);
        if (isPatt || isGrad || this.type == "image") {
            skew.matrix = "1 0 0 1";
            skew.offset = "0 0";
            split = matrix.split();
            if ((isGrad && split.noRotation) || !split.isSimple) {
                o.style.filter = matrix.toFilter();
                var bb = this.getBBox(),
                    bbt = this.getBBox(1),
                    dx = bb.x - bbt.x,
                    dy = bb.y - bbt.y;
                o.coordorigin = (dx * -zoom) + S + (dy * -zoom);
                setCoords(this, 1, 1, dx, dy, 0);
            } else {
                o.style.filter = E;
                setCoords(this, split.scalex, split.scaley, split.dx, split.dy, split.rotate);
            }
        } else {
            o.style.filter = E;
            skew.matrix = Str(matrix);
            skew.offset = matrix.offset();
        }
        oldt && (this._.transform = oldt);
        return this;
    };
    elproto.rotate = function (deg, cx, cy) {
        if (this.removed) {
            return this;
        }
        if (deg == null) {
            return;
        }
        deg = Str(deg).split(separator);
        if (deg.length - 1) {
            cx = toFloat(deg[1]);
            cy = toFloat(deg[2]);
        }
        deg = toFloat(deg[0]);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
            cx = bbox.x + bbox.width / 2;
            cy = bbox.y + bbox.height / 2;
        }
        this._.dirtyT = 1;
        this.transform(this._.transform.concat([["r", deg, cx, cy]]));
        return this;
    };
    elproto.translate = function (dx, dy) {
        if (this.removed) {
            return this;
        }
        dx = Str(dx).split(separator);
        if (dx.length - 1) {
            dy = toFloat(dx[1]);
        }
        dx = toFloat(dx[0]) || 0;
        dy = +dy || 0;
        if (this._.bbox) {
            this._.bbox.x += dx;
            this._.bbox.y += dy;
        }
        this.transform(this._.transform.concat([["t", dx, dy]]));
        return this;
    };
    elproto.scale = function (sx, sy, cx, cy) {
        if (this.removed) {
            return this;
        }
        sx = Str(sx).split(separator);
        if (sx.length - 1) {
            sy = toFloat(sx[1]);
            cx = toFloat(sx[2]);
            cy = toFloat(sx[3]);
            isNaN(cx) && (cx = null);
            isNaN(cy) && (cy = null);
        }
        sx = toFloat(sx[0]);
        (sy == null) && (sy = sx);
        (cy == null) && (cx = cy);
        if (cx == null || cy == null) {
            var bbox = this.getBBox(1);
        }
        cx = cx == null ? bbox.x + bbox.width / 2 : cx;
        cy = cy == null ? bbox.y + bbox.height / 2 : cy;
    
        this.transform(this._.transform.concat([["s", sx, sy, cx, cy]]));
        this._.dirtyT = 1;
        return this;
    };
    elproto.hide = function () {
        !this.removed && (this.node.style.display = "none");
        return this;
    };
    elproto.show = function () {
        !this.removed && (this.node.style.display = E);
        return this;
    };
    elproto._getBBox = function () {
        if (this.removed) {
            return {};
        }
        return {
            x: this.X + (this.bbx || 0) - this.W / 2,
            y: this.Y - this.H,
            width: this.W,
            height: this.H
        };
    };
    elproto.remove = function () {
        if (this.removed || !this.node.parentNode) {
            return;
        }
        this.paper.__set__ && this.paper.__set__.exclude(this);
        R.eve.unbind("raphael.*.*." + this.id);
        R._tear(this, this.paper);
        this.node.parentNode.removeChild(this.node);
        this.shape && this.shape.parentNode.removeChild(this.shape);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        this.removed = true;
    };
    elproto.attr = function (name, value) {
        if (this.removed) {
            return this;
        }
        if (name == null) {
            var res = {};
            for (var a in this.attrs) if (this.attrs[has](a)) {
                res[a] = this.attrs[a];
            }
            res.gradient && res.fill == "none" && (res.fill = res.gradient) && delete res.gradient;
            res.transform = this._.transform;
            return res;
        }
        if (value == null && R.is(name, "string")) {
            if (name == fillString && this.attrs.fill == "none" && this.attrs.gradient) {
                return this.attrs.gradient;
            }
            var names = name.split(separator),
                out = {};
            for (var i = 0, ii = names.length; i < ii; i++) {
                name = names[i];
                if (name in this.attrs) {
                    out[name] = this.attrs[name];
                } else if (R.is(this.paper.customAttributes[name], "function")) {
                    out[name] = this.paper.customAttributes[name].def;
                } else {
                    out[name] = R._availableAttrs[name];
                }
            }
            return ii - 1 ? out : out[names[0]];
        }
        if (this.attrs && value == null && R.is(name, "array")) {
            out = {};
            for (i = 0, ii = name.length; i < ii; i++) {
                out[name[i]] = this.attr(name[i]);
            }
            return out;
        }
        var params;
        if (value != null) {
            params = {};
            params[name] = value;
        }
        value == null && R.is(name, "object") && (params = name);
        for (var key in params) {
            eve("raphael.attr." + key + "." + this.id, this, params[key]);
        }
        if (params) {
            for (key in this.paper.customAttributes) if (this.paper.customAttributes[has](key) && params[has](key) && R.is(this.paper.customAttributes[key], "function")) {
                var par = this.paper.customAttributes[key].apply(this, [].concat(params[key]));
                this.attrs[key] = params[key];
                for (var subkey in par) if (par[has](subkey)) {
                    params[subkey] = par[subkey];
                }
            }
            // this.paper.canvas.style.display = "none";
            if (params.text && this.type == "text") {
                this.textpath.string = params.text;
            }
            setFillAndStroke(this, params);
            // this.paper.canvas.style.display = E;
        }
        return this;
    };
    elproto.toFront = function () {
        !this.removed && this.node.parentNode.appendChild(this.node);
        this.paper && this.paper.top != this && R._tofront(this, this.paper);
        return this;
    };
    elproto.toBack = function () {
        if (this.removed) {
            return this;
        }
        if (this.node.parentNode.firstChild != this.node) {
            this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild);
            R._toback(this, this.paper);
        }
        return this;
    };
    elproto.insertAfter = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[element.length - 1];
        }
        if (element.node.nextSibling) {
            element.node.parentNode.insertBefore(this.node, element.node.nextSibling);
        } else {
            element.node.parentNode.appendChild(this.node);
        }
        R._insertafter(this, element, this.paper);
        return this;
    };
    elproto.insertBefore = function (element) {
        if (this.removed) {
            return this;
        }
        if (element.constructor == R.st.constructor) {
            element = element[0];
        }
        element.node.parentNode.insertBefore(this.node, element.node);
        R._insertbefore(this, element, this.paper);
        return this;
    };
    elproto.blur = function (size) {
        var s = this.node.runtimeStyle,
            f = s.filter;
        f = f.replace(blurregexp, E);
        if (+size !== 0) {
            this.attrs.blur = size;
            s.filter = f + S + ms + ".Blur(pixelradius=" + (+size || 1.5) + ")";
            s.margin = R.format("-{0}px 0 0 -{0}px", round(+size || 1.5));
        } else {
            s.filter = f;
            s.margin = 0;
            delete this.attrs.blur;
        }
    };

    R._engine.path = function (pathString, vml) {
        var el = createNode("shape");
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = vml.coordorigin;
        var p = new Element(el, vml),
            attr = {fill: "none", stroke: "#000"};
        pathString && (attr.path = pathString);
        p.type = "path";
        p.path = [];
        p.Path = E;
        setFillAndStroke(p, attr);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.rect = function (vml, x, y, w, h, r) {
        var path = R._rectPath(x, y, w, h, r),
            res = vml.path(path),
            a = res.attrs;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.r = r;
        a.path = path;
        res.type = "rect";
        return res;
    };
    R._engine.ellipse = function (vml, x, y, rx, ry) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - rx;
        res.Y = y - ry;
        res.W = rx * 2;
        res.H = ry * 2;
        res.type = "ellipse";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            rx: rx,
            ry: ry
        });
        return res;
    };
    R._engine.circle = function (vml, x, y, r) {
        var res = vml.path(),
            a = res.attrs;
        res.X = x - r;
        res.Y = y - r;
        res.W = res.H = r * 2;
        res.type = "circle";
        setFillAndStroke(res, {
            cx: x,
            cy: y,
            r: r
        });
        return res;
    };
    R._engine.image = function (vml, src, x, y, w, h) {
        var path = R._rectPath(x, y, w, h),
            res = vml.path(path).attr({stroke: "none"}),
            a = res.attrs,
            node = res.node,
            fill = node.getElementsByTagName(fillString)[0];
        a.src = src;
        res.X = a.x = x;
        res.Y = a.y = y;
        res.W = a.width = w;
        res.H = a.height = h;
        a.path = path;
        res.type = "image";
        fill.parentNode == node && node.removeChild(fill);
        fill.rotate = true;
        fill.src = src;
        fill.type = "tile";
        res._.fillpos = [x, y];
        res._.fillsize = [w, h];
        node.appendChild(fill);
        setCoords(res, 1, 1, 0, 0, 0);
        return res;
    };
    R._engine.text = function (vml, x, y, text) {
        var el = createNode("shape"),
            path = createNode("path"),
            o = createNode("textpath");
        x = x || 0;
        y = y || 0;
        text = text || "";
        path.v = R.format("m{0},{1}l{2},{1}", round(x * zoom), round(y * zoom), round(x * zoom) + 1);
        path.textpathok = true;
        o.string = Str(text);
        o.on = true;
        el.style.cssText = cssDot;
        el.coordsize = zoom + S + zoom;
        el.coordorigin = "0 0";
        var p = new Element(el, vml),
            attr = {
                fill: "#000",
                stroke: "none",
                font: R._availableAttrs.font,
                text: text
            };
        p.shape = el;
        p.path = path;
        p.textpath = o;
        p.type = "text";
        p.attrs.text = Str(text);
        p.attrs.x = x;
        p.attrs.y = y;
        p.attrs.w = 1;
        p.attrs.h = 1;
        setFillAndStroke(p, attr);
        el.appendChild(o);
        el.appendChild(path);
        vml.canvas.appendChild(el);
        var skew = createNode("skew");
        skew.on = true;
        el.appendChild(skew);
        p.skew = skew;
        p.transform(E);
        return p;
    };
    R._engine.setSize = function (width, height) {
        var cs = this.canvas.style;
        this.width = width;
        this.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        cs.width = width;
        cs.height = height;
        cs.clip = "rect(0 " + width + " " + height + " 0)";
        if (this._viewBox) {
            R._engine.setViewBox.apply(this, this._viewBox);
        }
        return this;
    };
    R._engine.setViewBox = function (x, y, w, h, fit) {
        R.eve("raphael.setViewBox", this, this._viewBox, [x, y, w, h, fit]);
        var width = this.width,
            height = this.height,
            size = 1 / mmax(w / width, h / height),
            H, W;
        if (fit) {
            H = height / h;
            W = width / w;
            if (w * H < width) {
                x -= (width - w * H) / 2 / H;
            }
            if (h * W < height) {
                y -= (height - h * W) / 2 / W;
            }
        }
        this._viewBox = [x, y, w, h, !!fit];
        this._viewBoxShift = {
            dx: -x,
            dy: -y,
            scale: size
        };
        this.forEach(function (el) {
            el.transform("...");
        });
        return this;
    };
    var createNode;
    R._engine.initWin = function (win) {
            var doc = win.document;
            doc.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
            try {
                !doc.namespaces.rvml && doc.namespaces.add("rvml", "urn:schemas-microsoft-com:vml");
                createNode = function (tagName) {
                    return doc.createElement('<rvml:' + tagName + ' class="rvml">');
                };
            } catch (e) {
                createNode = function (tagName) {
                    return doc.createElement('<' + tagName + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">');
                };
            }
        };
    R._engine.initWin(R._g.win);
    R._engine.create = function () {
        var con = R._getContainer.apply(0, arguments),
            container = con.container,
            height = con.height,
            s,
            width = con.width,
            x = con.x,
            y = con.y;
        if (!container) {
            throw new Error("VML container not found.");
        }
        var res = new R._Paper,
            c = res.canvas = R._g.doc.createElement("div"),
            cs = c.style;
        x = x || 0;
        y = y || 0;
        width = width || 512;
        height = height || 342;
        res.width = width;
        res.height = height;
        width == +width && (width += "px");
        height == +height && (height += "px");
        res.coordsize = zoom * 1e3 + S + zoom * 1e3;
        res.coordorigin = "0 0";
        res.span = R._g.doc.createElement("span");
        res.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;";
        c.appendChild(res.span);
        cs.cssText = R.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", width, height);
        if (container == 1) {
            R._g.doc.body.appendChild(c);
            cs.left = x + "px";
            cs.top = y + "px";
            cs.position = "absolute";
        } else {
            if (container.firstChild) {
                container.insertBefore(c, container.firstChild);
            } else {
                container.appendChild(c);
            }
        }
        res.renderfix = function () {};
        return res;
    };
    R.prototype.clear = function () {
        R.eve("raphael.clear", this);
        this.canvas.innerHTML = E;
        this.span = R._g.doc.createElement("span");
        this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;";
        this.canvas.appendChild(this.span);
        this.bottom = this.top = null;
    };
    R.prototype.remove = function () {
        R.eve("raphael.remove", this);
        this.canvas.parentNode.removeChild(this.canvas);
        for (var i in this) {
            this[i] = typeof this[i] == "function" ? R._removedFactory(i) : null;
        }
        return true;
    };

    var setproto = R.st;
    for (var method in elproto) if (elproto[has](method) && !setproto[has](method)) {
        setproto[method] = (function (methodname) {
            return function () {
                var arg = arguments;
                return this.forEach(function (el) {
                    el[methodname].apply(el, arg);
                });
            };
        })(method);
    }
}(window.Raphael);;/**
 * Date: 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Collection of utility functions, that might be useful.
 **/

var gg = gg || {};
var u = u || {};

// this is for firefox
if (!console) {
  var console = {'log':function(){}, 'assert':function(){}, 'warn':function(){}};
}

;(function(gg, u) {
"use strict";
// u.makeClass - By John Resig (MIT Licensed)
// This allows the classes to be instantiated both with and without
// the new keyword. I.e.
//
// Animal = u.makeClass();
// a = Animal(); // OK.
// a = new Animal(); // Also OK.
//
// The attribute "init" is used as the object initializer.
// Refer to http://ejohn.org/blog/simple-class-instantiation/ for more info.
//
// The second argument is the prototype.
//
// Author(Jee) - I hacked this up bit, so that this function doesn't depend on
// arguments.callee, which is deprecated in ECMAScript 5.
u.makeClass = function(name, SuperClass){
  var _key = {}; // key to determine
  var Class = function(key, args){
    if (this instanceof Class) {
      if ( typeof this.init == "function" ) {
        // fixed this part.
        this.init.apply( this, (key === _key) ? args : arguments );
      }
      // if (!u.undef(name)) { this._cls_name = name; }
    } else {
      return new Class(_key, arguments);
    }
  };
  // Set the prototype to an instance of superClass.
  if (arguments.length >= 2) {
    Class.prototype = new SuperClass();
    Class.prototype.constructor = Class;
  }
  if (!u.undef(name)) {
    Class.prototype._cls_name =  name;
    Class._class = true
  }
  return Class;
};

/** checks whether given variable is undefined. */
u.undef = function(obj){ return (typeof obj == "undefined") }

u.constfunc = function(obj){
  return function(){
    return obj;
  };
};

/** Create an inverted index. */
u.invertedIndex = function(ary) {
  var result = {};
  _.each(ary, function(v,k) {
    result[v] = k;
  });
  return result;
};

u.identity = function(l) {
  return l;
}

u.cloneobj = function(obj) {
  // clone the given object, and set the .constructor property.
  var newobj = _.clone(obj);
  if (newobj.constructor != obj.constructor) {
    newobj.constructor = obj.constructor;
  }
  if (_.has(obj, '_attr')) {
    newobj._attr = _.clone(obj._attr);
  }
  return newobj;
}

/* Postfixes of rounded numbers
 * not sure if this might be useful in places ther than u.prettify()
 */
u.postfix = function(num, pow) {
  var POSTFIXES = { 0: '', 3:'k', 6:'m', 9:'b', 12:'t'}
  if (!_.isUndefined(POSTFIXES[pow])) {
    return num+POSTFIXES[pow];
  }
  return num+'x10^'+pow;
} 

/* Round a number and prettify it */
u.prettify = function(num, exp) {
  // figure out the order of mangitude to round things to
  if (arguments.length == 1) {
    exp = -Math.floor(Math.log(Math.abs(num))/Math.LN10 );
    if (num > 0 && num < 10) {
      exp = 0;
    }
  }
  var exp_rounded = 3*Math.round(exp/3);
  var exp_max = Math.max(exp, exp_rounded); // actual power to round to
  // round the actual number...
  var rounded = Math.round(num*Math.pow(10,exp_max)) / Math.pow(10, exp_max - exp_rounded)
  // add formatting
  return u.postfix(rounded.toFixed(exp_max-exp_rounded), -exp_rounded)
}

u.roundTo = function(numeric, digits) {
  var base = Math.pow(10, digits);
  return Math.round(numeric * base) / base;
}

u.array = function(length, initializer) {
  // makes an array.
  var arr = [], i = length;
  var val;
  var hasInit = _.isFunction(initializer);
  while (i--) {
    if (hasInit) {
      val = initializer();
    } else {
      val = initializer;
    }
    arr[i] = val
  }
  return arr;
}

u.grid = function(rows, cols, initializer) {
  // make a 2-d array with rows, cols items;
  var r = 0, c = 0;
  var result = [];
  var hasInit = _.isFunction(initializer);

  for (r = 0; r < rows; r++) {
    var rowAry = [];
    for (c = 0; c < cols; c++) {
      if (hasInit) {
        // initializer is a function - invoke it.
        rowAry.push(initializer());
      } else {
        rowAry.push(initializer);
      }
    }
    result.push(rowAry);
  }
  return result;
}

// utility functions for getters / setters.
u.opts = function() {
  var GetterSetter = function(key, value) {
    if (arguments.length === 0) {
      gg.error(12, "Function opts() called with less than 1 parameter.")
    }
    // The actual getter / setter fucntion.
    var self = this;
    // function to be invoked whenever key / value has changed.
    var updateFunction = this._optsUpdate;
    if (!_.isFunction(updateFunction)) {
      // empty function.
      updateFunction = function(){};
    } else {
      updateFunction = _.bind(updateFunction, this);
    }

    if (arguments.length == 1) {
      if (!_.isString(key) && _.keys(key).length > 0) {
        // Special case for key being object.
        // object is an argument - use the setter behavior.
        _.each(key, function(v, k) {
          self._attr[k] = v;
          updateFunction(k, v);
        })
        return this;
      }
      // getter behavior.
      var output = this._attr[key];
      return output;
    }
    // setter behavior.
    u.assertString(key);
    this._attr[key] = value;
    updateFunction(key, value);
    return this;
  }
  return GetterSetter;
}

u.singleOpts = function(name) {
  // Creates getter / setter for a single variable.
  return function(variable) {
    if (arguments.length === 0) {
      return this.opts(name)
    }
    return this.opts(name, variable)
  }
}

// get all non-null attributes
u.getAttr = function() {
  var obj = {}
  _.each(this._attr, function(v, k) {
    if (!_.isNull(v) && !_.isUndefined(v) && v != -Infinity && v != Infinity) {
      obj[k] = v;
    }
  });
  return obj;
}

u.dataGetter = function(opts) {
  opts = opts || {};
  var onChange = opts.onChange;
  var data = function(data) {
    if (arguments.length === 0) {
      // getter behavior.
      return this._data;
    }
    // setter behavior.
    if (!data || data._cls_name != 'gg.data') {
      // convert the input to gg.data object.
      data = gg.data(data);
    }
    this._data = data;
    if (onChange) {
      onChange.apply(this);
    }
    return this;
  }
  return data;
};

u.calculateFacet = function(data, facet) {
  // utility function to calculate Facet.
  // Should create array of array of data.
  if (!facet) {
    // no facet specified.
    return [data];
  }
  var nrow = facet.nrow();
  var ncol = facet.ncol();
  var initializer = function() {
    return data.clone();
  };
  var result = u.array(nrow * ncol, initializer);
  var i, len = data.len();

  for(i = 0; i < len; i++) {
    // Bin each item into result grid.
    var obj = data.getObject(i);
    var idx = facet.bin(obj);
    result[idx].push(obj);
  }
  return result;
};

u.doubleMap = function(square, iterator) {
  /** Runs map() over list of lists. */
  return _.map(square, function(line) {
    return _.map(line, iterator);
  });
}

u.tripleMap = function(cube, iterator) {
  return _.map(cube, function(square) {
    return _.map(square, function(line) {
      return _.map(line, iterator);
    });
  });
}

var _empty = [];
u.concat = function(arrays) {
  // concat a list of arrays.
  return _empty.concat.apply(_empty, arrays);
}
u.pushall = function(array, other) {
  return _empty.push.apply(array, other);
}

// scale making function
u.add = function(f, g) {
  var fFunc = _.isFunction(f);
  var gFunc = _.isFunction(g);
  if (fFunc && gFunc) {
    return function(d) { return f(d) + g(d) }
  } else if (fFunc) {
    return function(d) { return f(d) + g }
  } else if (gFunc) {
    return function(d) { return f + g(d) }
  } else {
    return u.constfunc(f + g);
  }
}
u.sub = function(f, g) {
  var fFunc = _.isFunction(f);
  var gFunc = _.isFunction(g);
  if (fFunc && gFunc) {
    return function(d) { return f(d) - g(d) }
  } else if (fFunc) {
    return function(d) { return f(d) - g }
  } else if (gFunc) {
    return function(d) { return f - g(d) }
  } else {
    return u.constfunc(f - g);
  }
}

u.evaluate = function(attr, i) {
  if (_.isFunction(attr)) {
    return attr(i);
  }
  return attr;
}

u.unionType = function(array) {
  var x = _.uniq(_.reject(array, _.isNull));
  if (x.length === 0) {
    return null;
  } else if (x.length === 1) {
    return x[0];
  }
  if (_.include(x, 'unknown')) {
    return 'unknown';
  }
  return 'category';
}

u.bool = function(x) {
  // normalize the input argument to boolean.
  return x ? true : false;
}

u.startswith = function(x, head) {
  // returns true if the string x starts with head.
  if (!(_.isString(head) && _.isString(x))) return false;

  var lh = head.length;
  var lx = x.length;

  if (lh > lx) return false;
  return x.slice(0, lh) === head;
}

u.instantiate = function(cls) {
  // utility method used in various setters.
  // if the input is class (from u.makeClass()), instantiate it. otherwise, do nothing.
  if (_.isString(cls)) {
    return gg[cls]();
  }
  if (cls && cls.prototype && cls.prototype._cls_name) {
    return cls()
  }
  return cls;
};

u.sum = function() {
  // sum the given input.
  var i;
  var result = 0;
  var len;
  if (_.isArray(this)) {
    // case where sum is called by
    // u.sum.apply(array)
    len = this.length;
    for (var i = 0; i < len; i++) {
      result += this[i];
    }
  }
  // handle the arguments.
  len = arguments.length;
  for (var i = 0; i < len; i++) {
    result += arguments[i];
  }
  return result;
}

u.mergeArrays = function(arrays, iterator) {
  // merge various [sorted] arrays.
  // TODO(jee, mar 8 2012) - very inefficient implementation - change later if needed.
  var isSorted = true;
  var col = u.concat(arrays);
  iterator = iterator ? iterator : u.identity;
  col = _.sortBy(col, iterator);
  return _.uniq(
      col,
      isSorted,
      iterator
  );
}

u.minimumDelta = function(array, iterator) {
  // given a ascending sorted array, find the minimum difference between the elements.
  if (array.length <= 1) return null;
  var len = array.length;
  var i;
  var cur;
  iterator = iterator ? iterator : function(x){return x};
  var past = iterator(array[0]);
  var delta = Infinity;
  for (i = 1; i < len; i++) {
    cur = iterator(array[i]);
    delta = Math.min(delta, cur - past);
    past = cur;
  }
  return delta;
}

u.isSuperset = function(bigger, smaller) {
  // assumes smaller and bigger are both.
  var j = 0;
  for (var i = 0; i < smaller.length; i++) {
    while (bigger[j] != smaller[i] && j < bigger.length) {
      j++;
    }
    if (j == bigger.length) {
      return false;
    }
  }
  return true;
}

// assertions: 
u.assertNumber = function(num) {
  if (!_.isNumber(num)) {
    gg.warn(13, "Expecting a number but got "+num+".");
  }
}

u.assertString = function(str) {
  if (!_.isString(str)) {
    gg.warn(14, "Expecting a string but got "+str+".");
  }
}

u.assertAes = function(aes) {
  if (!_.include(gg.opts.aes, u.getBaseAes(aes))) {
    gg.error(11, "Aesthetics " + aes + " does not exist.");
  }
}

u.assertQuery = function(query) {
  if (!(query === 'data' ||
    query === 'aes' ||
    query === 'aes_group' ||
    query === 'key')) {
    // TODO - correct error number.
    gg.error(-1, "Query type " + query + " is invalid.");
  }
}

// embedding
u.getBlank = function(indent) {
  return Array(indent+1).join(' '); // pretty bad implementation
}
u.qt = function(str) {
  return '"'+str+'"';
}
u.toCode = function(indent, fnIndent, o) {
  // === FIX THE INDENTS ===
  if (!indent) indent = 0;  // the number of spaces to indent on first line
  if (!_.isNumber(fnIndent)) fnIndent = indent + 2; // on subsequent lines
  // === FIX THE OPTION VARIABLES ===
  if (!o.cls) o.cls= []; // the params to be passed to the constructor
  if (!o.params) o.params = []; // the params to be passed to the constructor
  if (!o.funcs) o.funcs = [];   // array of [function-name, params]
  // === CONSTRUCTOR STATEMENT ===
  var str = u.getBlank(indent)+o.cls+'('+o.params.join(', ')+')';
  // === ADD ANY FUNCTION CALLS ===
  _.each(o.funcs, function(funcCall) {
    var funcname = funcCall[0];
    var params = funcCall[1] || [];
    if (!_.isArray(params)) params = [params];
    str += '\n'+u.getBlank(fnIndent)+'.'+funcname+'('+params.join(', ')+')';
  });

  // done!
  return str;
}
u.toCodeBasic = function(indent, fnIndent) {
  var obj = { 'cls' : this._cls_name };
  if (_.isFunction(this.getAttr)) {
    obj.funcs = [['opts', JSON.stringify(this.getAttr())]]
  }
  return u.toCode(indent, fnIndent, obj);
}

u.timer = function() {
  return {
    _time : new Date(),
    mark : function(name) {
      var oldTime = this._time;
      var newTime = this._time = new Date();
      if (name) {
        var diff = newTime - oldTime;
        // gg.info(diff + " ms - " + name)
      }
    }
  }
}

})(gg, u);
;
u.isDerivedAes = function(aes) {
  return aes.indexOf('_') > -1;
}

u.getBaseAes = function(aes) {
  var splitted = aes.split('_', 1);
  var base = splitted[0];
  return base;
}
;;(function(u) {
"use strict";

// http://stackoverflow.com/questions/384286/javascript-isdom-how-do-you-check-if-a-javascript-object-is-a-dom-object
u.isNode = function(o) {
  return (
    typeof window.Node === "object" ? o instanceof window.Node :
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}

//Returns true if it is a DOM element
u.isElement = function(o) {
  return (
    typeof window.HTMLElement === "object" ? o instanceof window.HTMLElement : //DOM2
    o && typeof o === "object" && o.nodeType === 1 && typeof o.nodeName==="string"
  );
}

u.isURL = function(s) {
  // from http://stackoverflow.com/questions/5212424/form-validation-problem-code-doesnt-work
  var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
  return _.isString(s) && regex.test(s);
}

})(u)
;/**
 * Date: 3/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Implements data observer.
 **/
(function(u) {
"use strict";

u.Observer = function() {
  // Create a new observer where we can register / deregister events.
  this.callbacks = [];
}

u.Observer.prototype.register = function(key, callback, name) {
  this.callbacks.push({
    key: key,
    callback: callback,
    name: name
  });
}

u.Observer.prototype.remove = function(callback) {
  this.callbacks = _.reject(this.callbacks, function(obj) {
    return obj.callback === callback
  });
}

u.Observer.prototype.removeNamed = function(name) {
  this.callbacks = _.reject(this.callbacks, function(obj) {
    return obj.name === name;
  });
}

u.Observer.prototype.removeKey = function(key) {
  this.callbacks = _.reject(this.callbacks, function(obj) {
    return obj.key === key;
  });
}

u.Observer.prototype.trigger = function(key, value) {
  _.chain(this.callback)
   .filter(function(obj) { return obj.key === key; })
   .each(function(obj) { obj.callback(value); });
}

})(u);
;// Extensions on top of Raphael.js, to provide better rendering primitives.
// methods of the form gg_X can be used by both polar and cartesian coordinates.
// methods of the form gg_[polar|cart]_X canbe used only by the corresponding coordinates system.
;(function() {
"use strict";

Raphael.fn.gg_point = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.circle().attr('postProcess', function(attr) {
    var cx = attr.cx, cy = attr.cy;
    attr.cx = ox + coord.transX(cx, cy);
    attr.cy = oy + coord.transY(cx, cy);
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_symbol = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.path().attr('postProcess', function(attr) {
    var cx = attr.cx;
    var cy = attr.cy;
    var x = ox + coord.transX(cx, cy);
    var y = oy + coord.transY(cx, cy);
    var r = attr.r;
    var symbol = attr.symbol;
    attr.path = gg.symbol.makePath(symbol, x, y, r);
    delete attr.cx; delete attr.cy; delete attr.symbol; delete attr.r;
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
}

Raphael.fn.gg_text = function(coord) {
  TOTAL_COUNT++;
  // has both polar and non-polar implementation.
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.text().attr('postProcess', function(attr) {
    var x = attr.x, y = attr.y;
    attr.x = ox + coord.transX(x, y);
    attr.y = oy + coord.transY(x, y);
    if (!attr.text) {
      attr.text = ' '; // for VML
    }
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_cart_line = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.path().attr('postProcess', function(attr) {
    // translate (x1,x2,y1,y2) model to points.
    var x1, x2, y1, y2;
    y1 = oy + coord.transY(attr.x1, attr.y1);
    y2 = oy + coord.transY(attr.x2, attr.y2);
    x1 = ox + coord.transX(attr.x1, attr.y1);
    x2 = ox + coord.transX(attr.x2, attr.y2);
    delete attr.x1; delete attr.x2;
    delete attr.y1; delete attr.y2;
    attr.path = [['M', x1, y1], ['L', x2, y2]];
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_cart_rect = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.rect().attr('postProcess', function(attr) {
    var x1, x2, y1, y2; // input
    var x, y, width, height; // output
    x1 = coord.transX(attr.x1, attr.y1);
    x2 = coord.transX(attr.x2, attr.y2);
    y1 = coord.transY(attr.x1, attr.y1);
    y2 = coord.transY(attr.x2, attr.y2);
    x = Math.min(x1, x2); width = Math.abs(x2-x1);
    y = Math.min(y1, y2); height = Math.abs(y2-y1);
    delete attr.x1; delete attr.x2;
    delete attr.y1; delete attr.y2;
    attr.x = ox + x;
    attr.y = oy + y;
    attr.width = width; attr.height = height;
    return attr;
  });

  elem = u.addMouseover(coord, elem);
  return elem;
};

var d3_svg_arcOffset = -Math.PI / 2,
    d3_svg_arcMax = 2 * Math.PI - 1e-6;
var d3_arc = function(flip, ox, oy, x1, x2, y1, y2) {
  return function(data) {
    var r0, r1, a0, a1;
    if (!flip) {
      r0 = x1(data);
      r1 = x2(data);
      a0 = y1(data) + d3_svg_arcOffset;
      a1 = y2(data) + d3_svg_arcOffset;
    } else {
      r0 = y1(data);
      r1 = y2(data);
      a0 = x1(data) + d3_svg_arcOffset;
      a1 = x2(data) + d3_svg_arcOffset;
    }
    if (r1 < r0) {
      var _tmp = r0;
      r0 = r1;
      r1 = _tmp;
    }
    var da = (a1 < a0 && (da = a0, a0 = a1, a1 = da), a1 - a0),
        df = da < Math.PI ? 0 : 1,
        c0 = Math.cos(a0),
        s0 = Math.sin(a0),
        c1 = Math.cos(a1),
        s1 = Math.sin(a1);
    // copied from d3.
    // console.log(r0, r1, a0, a1);
    if (da >= d3_svg_arcMax) {
      // Arc is full circle - donut.
      if (r0) {
        return [
          ['M', ox, oy + r1],
          ['A', r1, r1, 0, 1, 1, ox, oy - r1],
          ['A', r1, r1, 0, 1, 1, ox, oy + r1],
          ['M', ox, oy + r0],
          ['A', r0, r0, 0, 1, 0, ox, oy - r0],
          ['A', r0, r0, 0, 1, 0, ox, oy + r0],
          ['Z']
        ]
      } else if (r1) {
        return [
          ['M', ox, oy + r1],
          ['A', r1, r1, 0, 1, 1, ox, oy - r1],
          ['A', r1, r1, 0, 1, 1, ox, oy + r1],
          ['Z']
        ]
      } else {
        // both r0 and r1 are not present - do not render.
        return ''
      }
    } else {
      // Arc is not full circle.
      if (r0) {
        if (a0 == a1) {
          // straight line.
          return [
            ['M', r1 * c0 + ox, r1 * s0 + oy],
            ['L', r0 * c1 + ox, r0 * s1 + oy]
          ];
        } else {
          return [
            ['M', r1 * c0 + ox, r1 * s0 + oy],
            ["A", r1, r1, 0, df, 1, (r1 * c1 + ox), (r1 * s1 + oy)],
            ['L', r0 * c1 + ox, r0 * s1 + oy],
            ['A', r0, r0, 0, df, 0, (r0 * c0 + ox), (r0 * s0 + oy)],
            ['Z']
          ];
        }
      } else if (r1) {
        if (a0 == a1) {
          // straight line.
          return [
            ['M', r1 * c0 + ox, r1 * s0 + oy],
            ['L', r0 * c1 + ox, r0 * s1 + oy]
          ];
        } else {
          return [
            ['M', r1 * c0 + ox, r1 * s0 + oy],
            ['A', r1, r1, 0, df, 1, r1 * c1 + ox, r1 * s1 + oy],
            ['L', ox, oy],
            ['Z']
          ];
        }
      } else {
        return '';
      }
    }
  }
};

Raphael.fn.gg_polar_rect = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var flip = coord._flip;
  var elem = this.path().attr('preProcess', function(func) {
    var x1, x2, y1, y2;
    x1 = func.x1; x2 = func.x2;
    y1 = func.y1; y2 = func.y2;
    // WHY IS THIS CODE HERE?
    delete func.x1; delete func.x2;
    delete func.y1; delete func.y2;
    func.path = d3_arc(flip, ox, oy, x1, x2, y1, y2);
    return func;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
}

Raphael.fn.gg_cart_vline = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.path().attr('postProcess', function(attr) {
    var x1, x2, y1, y2;
    y1 = oy + coord.transY(attr.x, attr.y1);
    y2 = oy + coord.transY(attr.x, attr.y2);
    x1 = ox + coord.transX(attr.x, attr.y1);
    x2 = ox + coord.transX(attr.x, attr.y2);
    attr.path = [['M', x1, y1], ['L', x2, y2]];
    delete attr.x;
    delete attr.y1;
    delete attr.y2;
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_polar_vline = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var flip = coord._flip;
  var elem = this.path().attr('preProcess', function(func) {
    var x1, x2, y1, y2;
    x1 = x2 = func.x;
    y1 = func.y1; y2 = func.y2;
    delete func.x;
    delete func.y1; delete func.y2;
    func.path = d3_arc(flip, ox, oy, x1, x2, y1, y2);
    return func;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_cart_hline = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var elem = this.path().attr('postProcess', function(attr) {
    var x1, x2, y1, y2;
    y1 = oy + coord.transY(attr.x1, attr.y);
    y2 = oy + coord.transY(attr.x2, attr.y);
    x1 = ox + coord.transX(attr.x1, attr.y);
    x2 = ox + coord.transX(attr.x2, attr.y);
    attr.path = [['M', x1, y1], ['L', x2, y2]];
    delete attr.x1;
    delete attr.x2;
    delete attr.y;
    return attr;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

Raphael.fn.gg_polar_hline = function(coord) {
  TOTAL_COUNT++;
  var ox = coord._offsetX, oy = coord._offsetY;
  var flip = coord._flip;
  var elem = this.path().attr('preProcess', function(func) {
    var x1, x2, y1, y2;
    x1 = func.x1; x2 = func.x2;
    y1 = y2 = func.y;
    delete func.x1; delete func.x2;
    delete func.y;
    func.path = d3_arc(flip, ox, oy, x1, x2, y1, y2);
    return func;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
}

u._path_function = function(coord, x, y, pointModifier, smoother, sort, data) {
  // used inside fn.gg_path, but pulled out for unit testing.
  // data - gg.data
  // x, y - extracts x, y data from the given record of data.
  // Optional parameters
  // pointModifier - modifies the array of (x, y) pairs afterwards.
  // sort - true if data should be sorted by x.
  
  var ox = coord._offsetX, oy = coord._offsetY;
  var raw = data.getObjects();
  if (sort) { raw = _.sortBy(raw, sort) }
  var thetaVals = _.map(raw, x);
  var rVals = _.map(raw, y);
  if (pointModifier) { pointModifier(thetaVals, rVals); }
  if (smoother) { 
    var _tmp = smoother(thetaVals, rVals);
    thetaVals = _tmp.x;
    rVals = _tmp.y;
  }

  // construct the line array.
  var pathArray = [];
  var first = true; // first SVG path command should be M, then L.
  var length = thetaVals.length;
  for (var i = 0 ; i < length; i++) {
    var rawT = thetaVals[i];
    var rawR = rVals[i];
    // check for number.
    if (!(_.isNumber(rawT) && _.isNumber(rawR))) { continue }
    var t = coord.transX(rawT, rawR);
    var r = coord.transY(rawT, rawR);
    // check for number.
    if (!(_.isNumber(t) && _.isNumber(r))) { continue }
    if (first) {
      pathArray.push(['M', t + ox, r + oy]);
      first = false ;
    } else {
      pathArray.push(['L', t + ox, r + oy]);
    }
  }
  return pathArray;
};


u._ensureFunction = function(func) {
  // make the function array to contain only functions.
  for (var key in func) {
    var value = func[key];
    if (typeof value !== 'function') {
      func[key] = u.constfunc(value);
    }
  }
};

Raphael.fn.gg_path = function(coord, smoother) {
  TOTAL_COUNT++;
  var elem = this.path().attr('preProcess', function(func) {
    var sort = func._sort; delete func._sort;
    var x = func.x; delete func.x;
    var y = func.y; delete func.y;
    var pointModifier = func._pointModifier; delete func._pointModifier;
    func.path = _.bind(u._path_function, null, coord, x, y, pointModifier, smoother, sort);
    return func;
  });
  elem = u.addMouseover(coord, elem);
  return elem;
};

u.configRaphaelAttributes = function(paper) {
  // data binding related function.
  //
  // func - object of data binding functions.
  // preProcess - pre process object of data binding functions.
  // postProcess - post process attributes that are generated.
  // data - data passed to the data binding functions.
  var applyFunction = function(data, func) {
    var preProcess = this.attr('preProcess');
    var postProcess = this.attr('postProcess');
    if (!data || !func) return {};
    if (func._style) {
      // '_style' is an extra parameter, that allows
      // convenient setting of styles.
      func = _.clone(func);
      var style = func._style;
      func.stroke = style.stroke
      func.fill = style.color;
      func['stroke-width'] = style.strokewidth;
      func['fill-opacity'] = style.opacity;
      delete func._style;
    };

    u._ensureFunction(func);
    if (preProcess) { func = preProcess(_.clone(func)) }

    var result = {};
    // apply the scales.
    for (var key in func) {
      var scale = func[key];
      result[key] = scale(data);
    }
    return postProcess ? postProcess(result) : result;
  };

  paper.ca.func = function(func) {
    return applyFunction.call(this, this.attr('data'), func);
  };

  paper.ca.data = function(data) {
    return applyFunction.call(this, data, this.attr('func'));
  };

  // just define some custom attributes.
  paper.ca.postProcess = function(value) {};
  paper.ca.preProcess = function(value) {};
}

u.Raphael = Raphael.ninja();

u.addMouseover = function(coord, element) {
  if (!coord.opts('mouseover_highlight')) {
    return element;
  }
  // add the mouseover_highlight behavior to the given Raphael element.
  var OLD_FILL = '_old_fill', OLD_STROKE = '_old_stroke';
  element.mouseover(function(event) {
    // var self = d3.select(this);
    var fill = element.attr('fill');
    var stroke = element.attr('stroke');
    if (fill != 'none') {
      element.data(OLD_FILL, fill);
      element.attr('fill', d3.rgb(fill).darker().toString());
    } else if (element.attr('stroke-width') > 0) {
      element.data(OLD_STROKE, stroke);
      element.attr('stroke', d3.rgb(stroke).darker().toString());
    }
    element.attr('cursor', 'hand');
  });
  element.mouseout(function(event) {
    var fill = element.attr('fill')
    if (element.attr('fill') != "none") {
      element.attr('fill', element.data(OLD_FILL));
    } else if (element.attr('stroke-width') > 0) {
      element.attr('stroke', element.data(OLD_STROKE));
    }
    element.attr('cursor', 'normal');
  });
  return element
};

u.addTooltip = function(element, tooltipFn) {
  if (tooltipFn) {
    element.mouseover(function(event) {
      // use bootstrap tooltip?
      $(event.srcElement).tooltip({
        title: tooltipFn(element.attr('data')),
        // helper: $(element.paper.canvas),
        helper: $('body'),
        trigger: 'manual',
        placement: 'left'
      }).tooltip('show');
    });
    element.mouseout(function(event) {
      $(event.srcElement).tooltip('hide');
    });
  }
  return element;
}

function initPolychartDom() {
  // create <div> with id #polychart-dnd.
  dom = $('#polychart-helper')
  if (dom.length == 0) {
    helper = $("<div id='polychart-helper' class='polychart-ui bootstrap'></div>")
    $('body').prepend(helper)
  }
}

var TOTAL_COUNT = 0;
var LAST_COUNT = 0;
u.raphael_mark = function(name) {
  var diff = TOTAL_COUNT - LAST_COUNT;
  LAST_COUNT = TOTAL_COUNT;
  if (name) {
    // gg.info(diff + " obj - " + name)
  }
}

})();
;;(function(gg) {
"use strict";

var GGError = function(code, msg) {
  this.code = code;
  this.msg = msg;
  this.toString = function() {
    return 'Error Code #' + code + ': ' + msg;
  };
  // add the stack trace - chrome only.
  if (console && console.trace) { this.stack = console.trace() }
};

gg.error = function(code, msg) {
  throw new GGError(code, msg);
}

gg.warn = function(code, msg) {
  if (console) {
    console.log(new GGError(code, msg));
  }
}
gg.info = function(msg) {
  if (console) {
    console.log(msg);
  }
}

})(gg);
;;(function(gg) {
"use strict";

gg.opts = {}; // NOT A CLASS!

gg.opts.graph = {
  // default width and height
  'width' : 300,
  'height' : 300,
  'padding-left': 50,
  'padding-right': 50,
  'padding-top': 50,
  'padding-bottom': 50,
  // --- legends
  'legend-position': 'right', // right now only supports RIGHT and NONE
  'legend-width': 60,
  'legend-height' : 30,
  // --- spacing between facets.
  'spacing-x': 20,
  'spacing-y': 40,
  'facet-x' : 20,
  // --- labels
  'title' : '',
  'title-size' : 15,
  'title-bold' : true,
  //'label-x': '',
  //'label-y': '',
  'label-size' : 12,
  'label-bold' : false,
  // --- axis
  'axis-y' : 'left', // TOP or BOTTOM or NONE.
  'axis-y-line' : null,
  'axis-y-label' : null,
  'axis-y-ticks' : null,
  'axis-y-ticklength' : null,
  'axis-y-color' : null,
  'axis-y-strokewidth' : null,
  'axis-y-' : null,
  'axis-x' : 'bottom', // LEFT or RIGHT or NONE.
  'axis-x-line' : null,
  'axis-x-label' : null,
  'axis-x-ticks' : null,
  'axis-x-ticklength' : null,
  'axis-x-color' : null,
  'axis-x-strokewidth' : null,
  // --- grid
  'grid-render-vertical' : null,
  'grid-render-horizontal' : null,
  'grid-stroke' : null,
  'grid-strokewidth' : null,
  'grid-dasharray' : null,
  // --- div
  'dom': null,
  // data filtering
  'filter': null,

  // rendering related.
  'render-make-default-scale' : true,
  // call compute() automatically in render().
  'render-compute' : true,
  'render-impute-mapping' : true,

  // -- mouseover supports.
  'tooltip' : null
};

gg.opts.aes = [
  'color',
  'fill',
  'font',
  'fontsize',
  'group',
  'opacity',
  'radius',
  'size',
  'stats', // not really an aesthetics, but used for group_stats.
  'stroke',
  'strokewidth',
  'symbol',
  'text',
  'x',
  'y'
];

gg.opts.mainFill = 'steelblue';
gg.opts.mainColor = 'black';

gg.opts.layer = {
  'x' : 1,
  'y' : 1,
  'color' : gg.opts.mainFill,
  'opacity' : 0.9,
  'stroke': "#FFFFFF",
  'strokewidth': 0,
  'facet' : true,
  'radius' : 3,
  // maximum # of artifacts to render per layer.
  'render-max' : 400
};

gg.opts.box = {
  'stroke' : gg.opts.mainColor,
  'strokewidth' : 1,
  'padding' : 0
}

gg.opts.line = {
  'color' : gg.opts.mainColor,
  'strokewidth' : 2,
  'padding' : 0.5
}

gg.opts.text = {
  'opacity' : 1,
  'color' : '#000000',
  'font' : 'Verdana',
  'text' : 'text label'
}

gg.opts.gradient = {
  'low' : '#cccccc',
  'high' : 'steelblue'
}

gg.opts.grid = {
  //'dasharray' : '1,3', // dotted
  //'dasharray' : '4,5', // dashed
  //'dasharray' : '0', // solid
  // 'dasharray' : '.', // Raphael.js - dotted.
  'dasharray' : '- ', // Raphael.js - dash
  'dashoffset' : 5,
  'stroke' : '#CCC',
  'strokewidth' : 1,
  'render-vertical' : false,
  'render-horizontal' : true
}

gg.opts.axis = {
  'color' : '#000',
  'fontsize' : 11,
  'labels' : true,
  'strokewidth' : 1,
  'ticklength-x' : 3,
  'ticklength-y' : 7,
  'ticks' : true
}

gg.opts.axis_x = {
  'line' : true
}

gg.opts.axis_y = {
  'line' : false
}

gg.opts.coord = {
  mouseover_highlight: true
}

gg.opts.epsilon = Math.pow(10, -7);

gg.opts.theme_bw = function() {

}



})(gg);
;/**
 * Date : 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

gg.graph = u.makeClass('gg.graph');

gg.graph.prototype.init = function(data) {
  // TODO - user should be able to provide their own div, in form of
  // - selector
  // - jQuery element
  // - d3 element
  // - DOM
  this._data = null;
  this._paper = null; // Raphael paper.
  this._filteredData = null;

  this._layers = [];     // to put layers in
  this._scales = {};
  this._coord = null;
  this._facet = null;
  // default attributes
  this._attr = u.cloneobj(gg.opts.graph);

  // cached dom elements.
  this._doms = {};
  // cached _calculateDims.
  this._dimCache = null;
  // true if this was ever rendered.
  this._rendered = false;

  if (data) this.data(data);
};

////////////////////////////////////////////////////////////////////////////////
// Getters and setteres.
////////////////////////////////////////////////////////////////////////////////
var onDataChange = function() {
  this._filterData();
}

gg.graph.prototype.data = u.dataGetter({onChange:onDataChange});

gg.graph.prototype.getFilteredData = function() {
  return this._filteredData;
}

gg.graph.prototype.getAttr = function() {
  var obj = {}
  _.each(this._attr, function(v, k) {
    if (_.isNull(v) ||
      _.isUndefined(v) ||
      v === -Infinity ||
      v === Infinity ||
      _.isFunction(v)) {
      return;
    }
    if (u.isNode(v)) {
      var id = v.getAttribute('id');
      if (id !== null) {
        obj[k] = id;
      }
      return;
    }
    obj[k] = v;
  });
  return obj;
}

gg.graph.prototype._varlabel = function(aes) {
  // user defined
  var userdefined = this.opts("label-"+aes);
  if (!u.undef(userdefined)) {
    return userdefined;
  }
  // get the name of the variable mapped to this aesthetic
  var varnames = _.chain(this._layers)
           .map(function(l) { return l.map(aes); })
           .filter(u.identity)
           .value();
  if (varnames.length > 0) {
    return varnames[0];
  }
  // if it doesn't exist, return an empty string
  return '';
}

gg.graph.prototype.getLayer = function(idx) {
  return this._layers[idx];
}

gg.graph.prototype.removeLayer = function(layer) {
  var len = this._layers.length;
  // remove the given layer.
  this._layers = _.without(this._layers, layer);
  // is the layers modified?
  return len !== this._layers.length;
}

gg.graph.prototype.numLayers = function() {
  return this._layers.length;
}

gg.graph.prototype.getMapKeys = function() {
  return _.chain(this._layers)
   .map(function(l) { return _.keys(l.getMap()) })
   .flatten().uniq().value();
}

gg.graph.prototype.isMapped = function(aes, includeDerived) {
  if (!includeDerived) {
    return _.any(_.invoke(this._layers, 'map', aes));
  } else {
    aes = u.getBaseAes(aes);
    return _.any(this._layers, function(layer) {
      return _.any(_.keys(layer.getMap()), function(value) {
        return u.getBaseAes(value) === aes;
      });
    });
  }
}

gg.graph.prototype.defaultMin = function(aes) {
  if (this._layers.length === 0) return null;
  var result = _.chain(this._layers).invoke('defaultMin', aes).filter(_.isNumber).min().value();
  if (result != Infinity) return result
  return null;
}

gg.graph.prototype.defaultMax = function(aes) {
  if (this._layers.length === 0) return null;
  var result = _.chain(this._layers).invoke('defaultMax', aes).filter(_.isNumber).max().value();
  if (result != -Infinity) return result
  return null;
}

gg.graph.prototype.opts = u.opts();

gg.graph.prototype.warn = function(code, msg) {
  // this can be overridden for new error messages.
  gg.warn(code, msg);
}

gg.graph.prototype._optsUpdate = function(key, val) {
  if (this._rendered) {
    // bit of hack to re-render labels without re-rendering the entire graph.
    if (key == 'title') {
      this._update_label('_debug_title', val);
    } else if (key == 'label-x') {
      this._update_label('_debug_x_label', val);
    } else if (key == 'label-y') {
      this._update_label('_debug_y_label', val);
    }
  }
  if (key === 'dom') {
    this._clearCache();
  }
}

gg.graph.prototype.layer = function(layer) {
  layer = u.instantiate(layer);
  if (!layer) {
    gg.error(201, "Attempting to add an undefined or malformed layer: "+layer)
  }
  var cloned = u.cloneobj(layer);
  cloned.attach(this);
  this._layers.push(cloned);

  return this;
};

gg.graph.prototype.coord = function(coord) {
  /**
   * Assigns the coordinate for the graph.
   * either pass in an instance of gg.coord.* or
   * a string.
   */
  if (arguments.length === 0) {
    // getter.
    return this._coord;
  }
  coord = u.instantiate(coord);
  var cloned = null;
  cloned = u.cloneobj(coord);
  cloned.attach(this);
  this._coord = cloned;
  return this;
};

gg.graph.prototype.facet = function(facet) {
  if (arguments.length === 0) {
    return this._facet;
  }
  if (facet === null) {
    this._facet = null;
  }
  else {
    facet = u.instantiate(facet);
    if (!facet) {
      gg.error(201, "Attempting to add an undefined or malformed facet: "+facet)
    }

    var cloned = u.cloneobj(facet);
    cloned.attach(this);
    this._facet = cloned;
  }
  this._clearCanvas();
  return this;
}


gg.graph.prototype._update_label = function(cssclass, text) {
  var element = this._doms[cssclass];
  if (element) {
    element.attr('text', text);
  }
}

gg.graph.prototype.dimensions = function() {
  // wrapper around _calculateDims().
  if (!this._dimCache) {
    this._dimCache = this._calculateDims();
  }
  return this._dimCache;
}

gg.graph.prototype._calculateDims = function() {
  /** 
   * Internal method for render().
   * Calculate the required dimensions.
   * This method should NOT be called directly, but dimensions() should be used.
   */
  // TODO(Jeeyoung Kim - Jan 29) - the fact that we can't specify where the scale is being rendered sucks.
  // It must be rendered on the right. it's weird.
  var additionalScales = _.keys(this._scales).length - 2;
  var chartWidth  = (this.opts('width') - this.opts('padding-left') - this.opts('padding-right'));
  var chartHeight = (this.opts('height') - this.opts('padding-top') - this.opts('padding-bottom'));
  u.assertNumber(chartWidth)
  u.assertNumber(chartHeight)
  var ncol = this._facet ? this._facet.ncol() : 1;
  var nrow = this._facet ? this._facet.nrow() : 1;
  var spacingX = ncol == 1 ? 0 : this.opts('spacing-x');
  var spacingY = nrow == 1 ? 0 : this.opts('spacing-y');

  var result = {
    ncol : ncol,
    nrow : nrow,
    chartWidth  : chartWidth,
    chartHeight : chartHeight,
    eachWidth   : (chartWidth - (ncol - 1) * spacingX) / ncol,
    eachHeight  : ((chartHeight - nrow * spacingY) / nrow),
    spacingX    : spacingX,
    spacingY    : spacingY,
    additionalScales: additionalScales
  };
  return result;
}

gg.graph.prototype.getAxisOffset = function(row, col, position) {
  var dims = this.dimensions();
  var xpos = this.xposition(col);
  var ypos = this.yposition(row);
  var width = dims.eachWidth;
  var height = dims.eachHeight;
  var isPolar = (this.coord()._cls_name === 'gg.coord.polar');
  var flip = (this.coord()._flip !== isPolar);
  var y = flip ? 'x' : 'y';
  if (position == 'right') {
    xpos += width;
  } else if (position == 'bottom') {
    ypos += height;
  } else if (position == 'center') { // for polar coord
    xpos += width/2;
    ypos += height/2;
  } else if (position == 'left' && isPolar) {
    xpos -= 9; // shift axis by left a little for polar coord
    ypos += height/2 - this._scales[y].range()[1]
  }
  return {
    x: xpos - 0.5,
    y: ypos - 0.5
  };
}

gg.graph.prototype.createOffsetCoord = function(x, y) {
  var coord = new gg.coord.cart();
  coord.attach(this);
  coord.opts('mouseover_highlight', false);
  return coord.differentOffset(x, y);
}

gg.graph.prototype.makeplot = function(dom) { 
  // TODO - assert for DOM.
  var width = this.opts('width');
  var height = this.opts('height');
  var paper;
  var element;

  if (!dom) {
    gg.error(212, "Invalid dom for .opts('dom') - " + dom)
  } else if (_.isString(dom)) {
    var id = dom[0] == '#' ? dom.substring(1) : dom;
    element = document.getElementById(id);
    if (!element) {
      gg.error(212, "Invalid dom for .opts('dom') - " + dom)
    }
  } else {
    element = dom;
  }
  paper = u.Raphael(element, width, height);
  u.configRaphaelAttributes(paper);

  this.render_branding(element);
  return paper;
}

gg.graph.prototype.setDefaultCoord = function() {
  // base coordinate system is cartesian.
  if(!this._coord){
    this.coord(gg.coord.cart());
  };
  return this;
}

////////////////////////////////////////////////////////////////////////////////
// Data filtering functions.
////////////////////////////////////////////////////////////////////////////////
gg.graph.prototype.filter = function(filter) {
  // set / get the filter
  if (arguments.length === 0) {
    return this.opts('filter')
  }
  this.opts('filter', filter);
  this._filterData();
  return this;
}

gg.graph.prototype._filterData = function() {
  if (this.opts('filter')) {
    this._filteredData = this.data().filter(this.opts('filter'));
  } else {
    this._filteredData = this.data();
  }
}

////////////////////////////////////////////////////////////////////////////////
// Rendering-related functions
////////////////////////////////////////////////////////////////////////////////
gg.graph.prototype._clearCache = function() {
  this._paper = null;
  this._doms = {};
  this._dimCache = null;
  this._rendered = false;
}
gg.graph.prototype._clearCanvas = function() {
  if (this._paper) {
    this._paper.clear();
  }
  this._doms = {};
  this._dimCache = null;
  this._rendered = false;
}

gg.graph.prototype._preRender = function(dom) {
  // Log how much time has elapsed for time.
  this._debugStartTime = new Date();
  if (dom) {
    this.opts('dom', dom);
  }
  if (!this._paper) {
    this._paper = this.makeplot(this.opts('dom'));
  } else {
    this._clearCanvas();
  }
}

gg.graph.prototype._postRender = function() {
  var endTime = new Date();
  var diff = endTime - this._debugStartTime;
  this._rendered = true;
  gg.info("render() took " + diff + " ms.");
  this._renderingTime = diff;
}

// functions to obtain the translation for a given facet.
gg.graph.prototype.xposition = function(col) {
  var c = this.dimensions();
  return this.opts('padding-left') + col * (c.eachWidth + c.spacingX);
};

gg.graph.prototype.yposition = function(row) {
  var c = this.dimensions();
  return this.opts('padding-top') + row * (c.eachHeight + c.spacingY) + c.spacingY;
};

gg.graph.prototype._defaultComputeOptions = function() {
  return {
    defaultScale:this.opts('render-make-default-scale'),
    imputeMapping:this.opts('render-impute-mapping')
  }
}

gg.graph.prototype.compute = function(options) {
  options = options || this._defaultComputeOptions()
  // required computations for render().
  var self = this;
  if (this._facet) { this._facet.prepare(); }

  if (options.imputeMapping) {
    _.invoke(this._layers, 'attachDerivedMappings');
  }

  _.invoke(this._layers, 'resetCalculate');
  _.invoke(this._layers, 'calculate');

  // define necessary scales.
  if (options.defaultScale) {
    _.each(this.makeDefaultScales(), function(scale, aes) { self.scale(aes, scale) });
  }
  this.setDefaultCoord()      // define necessary coords

  // **** ADD RANGES AND RUN MAKE ON EACH SCALES
  this.computeScale();
};

gg.graph.prototype.render = function(dom) {
  /**
   * Function to perform all the rendering.
   */
  this._preRender(dom);
  var timer = u.timer();
  u.raphael_mark();
  // do the required computation.
  if (this.opts('render-compute')) {
    this.compute();
    timer.mark('compute()')
    u.raphael_mark('compute()')
  }
  // derived scale binding should always occur.
  this.bindDerivedScales();
  timer.mark('bindDerivedScales()')
  u.raphael_mark('bindDeriveScales()')

  // Primary elements - grid, axis, and layer.
  var errors = this.checkLayerError();
  this.renderPrimary(errors);
  timer.mark('renderPrimary()')
  u.raphael_mark('renderPrimary()')

  // Labels.
  this.renderAllFacetLabel();
  timer.mark('renderAllFacetLabel()')
  u.raphael_mark('renderAllFacetLabel()')

  this.renderOtherLabel();
  timer.mark('renderOtherLabel()')
  u.raphael_mark('renderOtherLabel()')

  // Legends.
  this.renderLegend();
  timer.mark('renderLegend()')
  u.raphael_mark('renderOtherLabel()')

  this._postRender();
  return this;
}
gg.graph.prototype.checkLayerError = function() {
  // context without cell or facet index.
  var context = {
    rawScales:this._scales,
    coord:this._coord
  }
  return _.invoke(this._layers, 'checkErrors', context);
}

////////////////////////////////////////////////////////////////////////////////
// Embedding
////////////////////////////////////////////////////////////////////////////////
gg.graph.prototype.toCode = function(indent, fnIndent, dataName) {
  // indent: number of spaces to indent in first line
  // fnIndent: number of spaces to indent in subsequent lines
  // dataName: undefined OR string representing name of data
  var params = [];
  if (!indent) indent = 0;
  var newFnIndent = indent+this._cls_name.length+3;
  // first encode the data
  if (dataName) {
    params = [dataName]; // data is already printed and has a name
  } else if (this._data) {
    params = [this._data.toCode(indent, newFnIndent)];
  }
  // now encode the actual object!
  var graphObj = {
    'cls' : this._cls_name,
    'params' : params,
    'funcs' : []
  }
  // add layers
  _.each(this._layers, function(l) {
    graphObj.funcs.push(['layer', l.toCode(indent, newFnIndent)]);
  });
  // add scales
  _.each(this._scales , function(s, k) {
    if (s) { // why is this ever undefined?!?!?
      var keystr = u.qt(k);
      graphObj.funcs.push(['scale', [keystr, s.toCode(indent, newFnIndent+keystr.length+2)]]);
    }
  });
  // coords
  if (this._coord) {
    graphObj.funcs.push(['coord', this._coord.toCode(indent, newFnIndent)]);
  }
  // facets
  if (this._facet) {
    graphObj.funcs.push(['facet', this._facet.toCode(indent, newFnIndent)]);
  }
  // options (i.e. attributes);
  var attr = this.getAttr();
  _.each(attr, function(v, k) {
    if (k.split('-')[0] == 'render') {
      delete attr[k];
    }
  });
  graphObj.funcs.push(['opts', JSON.stringify(attr)]);

  return u.toCode(indent, fnIndent, graphObj);
}

// end of function wrapping.
})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * 
 * Author : Jeeyoung Kim
 *
 * Wrapper around rendering primitives. Performs the following:
 * - x and y offset.
 * - coordinate transformations.
 **/
;(function(gg){
"use strict";

gg.coord = gg.coord || {};

gg.coord.base = u.makeClass('gg.coord.base');

gg.coord.base.prototype.init = function() {
  this._graph = null; // not null when the graph is attached.
  this._detached = true;
  this._offsetX = 0;
  this._offsetY = 0;
  this._attr = _.clone(gg.opts.coord)
};

gg.coord.base.prototype.opts = u.opts();

gg.coord.base.prototype.differentOffset = function(x, y) {
  // clone the object with different offset.
  var clone = u.cloneobj(this);
  clone._offsetX += x; clone._offsetY += y;
  clone._attr = u.cloneobj(this._attr);
  return clone;
}

gg.coord.base.prototype.attach = function(graph) {
  if (!this._detached) {
    gg.error(600, "This coordinate is already attached to a graph. Unexpected behaviour may occur.");
  }
  this._detached = false;
  this._graph = graph;

  return this;
}

gg.coord.base.prototype.getPaper = function() {
  return this._graph._paper;
}

gg.coord.base.prototype.set = function(attr, value){
  this.attr[attr] = value;
  return this;
};

/** Abstract coordinate methods */
gg.coord.base.prototype.configScale = function(dim, scales){
  /**
   * Configure the scales. I.e. set the ranges.
   * dim - {x, y, width, height}
   */
  gg.error(10, "Not implemented.");
};

gg.coord.base.prototype.transX = function(x, y) {
  gg.error(10, "Not implemented.");
}

gg.coord.base.prototype.transY = function(x, y) {
  gg.error(10, "Not implemented.");
}

/** Abstract axis drawing methods. */
gg.coord.base.prototype.drawAxis = function(aes, plot) {
  // draw the given axis.
  gg.error(10, "Not implemented.");
};

/** Abstract drawing methods. */
gg.coord.base.prototype.line = function() {
  gg.error(10, "Not implemented.");
};
gg.coord.base.prototype.vline = function(){
  gg.error(10, "Not implemented.");
};
gg.coord.base.prototype.hline = function(){
  gg.error(10, "Not implemented.");
};
gg.coord.base.prototype.rect = function(){
  gg.error(10, "Not implemented.");
};
gg.coord.base.prototype.point = function() {
  var paper = this.getPaper();
  return paper.gg_point(this);
  // return paper.gg_symbol(this);
};
gg.coord.base.prototype.poly = function() {
  var paper = this.getPaper();
  return paper.gg_path(this);
}

gg.coord.base.prototype.text = function(){
  var paper = this.getPaper();
  return paper.gg_text(this);
}

////////////////////////////////////////////////////////////////////////////////
// Embedding
////////////////////////////////////////////////////////////////////////////////
gg.coord.base.prototype.toCode = u.toCodeBasic;

})(gg);
;/**
 * Date : 1/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

gg.facet = gg.facet || {};

gg.facet.base = u.makeClass('gg.facet.base');

gg.facet.base.prototype.init = function() {
  // inherit from attached graph.
  this._graph = null;
  this._detached = true;
  this._attr = {'free_x': false, 'free_y' : false};
};

gg.facet.base.prototype.attach = function(graph) {
  if (!this._detached) {
    this.warn(700, "This facet is already attached to a graph. Unexpected behaviour may occur.");
  }
  this._graph = graph;
  this._detached = false;
}

gg.facet.base.prototype.opts = u.opts();

gg.facet.base.prototype.warn = function(code, msg) {
  if (!this._detached) {
    this._graph.warn(code, msg);
  } else {
    gg.warn(code, msg);
  }
}

gg.facet.base.prototype.getAttr = u.getAttr;

gg.facet.base.bin = function(obj) {
  // bin the current data.
  // Returns the array [row, col] for the index of the bin.
  gg.error(10, "Not implemented.");
}

gg.facet.base.prototype.ncol = function() {
  /** Returns the # of cols in the given facet. */
  gg.error(10, "Not implemented.");
};

gg.facet.base.prototype.nrow = function() {
  /** Returns the # of rows in the given facet. */
  gg.error(10, "Not implemented.");
};

gg.facet.base.prototype.isValidIndex = function(facetIndex) {
  return true;
};

gg.facet.base.prototype.renderLabel = function(paper, row, col) {
  gg.error(10, "Not implemented.");
};

////////////////////////////////////////////////////////////////////////////////
// Embedding
////////////////////////////////////////////////////////////////////////////////
gg.facet.base.prototype.toCode = u.toCodeBasic;

})(gg);
;/**
 * Date : 2/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author: Lisa Zhang
 **/
;(function(gg) {
"use strict";

gg.guide = gg.guide || {};

gg.guide.base = u.makeClass('gg.guide.base');

gg.guide.base.prototype.init = function() {
  this._attr = { num_ticks: 5 };
}

gg.guide.base.prototype.opts = u.opts();

})(gg);
;/**
 * Date : 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

// if USE_GRAPH is set to data, then data() getter will return from
// the attached graph.
var USE_GRAPH = {};

gg.layer = gg.layer || {};

gg.layer.base = u.makeClass('gg.layer.base');

// private class to represent
var Mapping = function(name, defaultMapping, functionMapping) {
  if (_.isFunction(name)) {
    this.code = name;
    this.functionMapping = true;
  } else {
    this.name = name;
  }
  // coerce the values to boolean.
  // false if the mapping is user-specified.
  this.defaultMapping = !!defaultMapping;
};

gg.layer.base.prototype.init = function(data) {
  // default settings
  this._attr = u.cloneobj(gg.opts.layer);
  // inherit from the attached graph.
  this._graph = null;
  
  // Whe have to apply transformation to the input data.
  // Namely, data -> facet -> statistics transformation.
  this._data = null;
  this._facetedData = null; // stores the faceted data. Contains 2-D array of data.
  this._statData = null; // stored the data after statistic transformation. Contains 2-D array of data.

  // undefined here means that it will be modified by the default statistics.
  this._stats = undefined;
  this._detached = true;
  this._default_stats = gg.stats.id; // default statistics;
  this._calculated = false; // flag to track whether _calculate() was called or not.

  if (data) this.data(data);
}

gg.layer.base.prototype.warn = function(code, msg) {
  if (!this._detached) {
    this._graph.warn(code, msg);
  } else {
    gg.warn(code, msg);
  }
}

// getters / setters.
// standardize under .opts.
gg.layer.base.prototype.opts = u.opts();

gg.layer.base.prototype.data = function(data) {
  if (arguments.length === 0) {
    // getter behavior.
    if (this._data === USE_GRAPH) {
      return this._graph.getFilteredData();
      // return this._graph.data();
    }
    return this._data;
  }
  // setter behavior.
  if (data === USE_GRAPH) {
    // special case for USE_GRAPH.
    this._data = data;
  }
  else {
    if (!data || data._cls_name != 'gg.data') {
      // convert the input to gg.data object.
      data = gg.data(data);
    }
    this._data = data;
  }
  return this;
}

gg.layer.base.prototype.stats = function(stats) {
  /** Getter / setter for stats */
  if (arguments.length === 1) {
    stats = u.instantiate(stats);
    if (!stats) {
      gg.error(304, "Attempting to add an undefined or malformed statistic: "+stats);
    }
    this._stats = stats;
    this.resetCalculate();
    return this;
  }
  if (_.isUndefined(this._stats)) {
    var defaultStats = this._default_stats();
    this._stats = defaultStats;
  }
  return this._stats;
}

gg.layer.base.prototype.attach = function(graph) {
  // attach the graph object.
  if (!this._detached) {
    this.warn(300, "This layer is already attached to a graph. Unexpected behaviour may occur.");
  }
  if (!this.data()) {
    this.data(USE_GRAPH);
    // this.data(graph.data());
  }
  this._detached = false;
  this._graph = graph;

  return this;
}

gg.layer.base.prototype.resetCalculate = function() {
  this._calculated = false;
}

////////////////////////////////////////////////////////////////////////////////
// Abstract default scale method.
////////////////////////////////////////////////////////////////////////////////

// Suggest default min / max value for the given aesthetics mapping.
gg.layer.base.prototype.defaultMin = function(aes) {
  return null;
}

gg.layer.base.prototype.defaultMax = function(aes) {
  return null;
}

gg.layer.base.prototype.requiredMap = function() {
  // Returns the required mapping for the given layer. //
  return null;
};

gg.layer.base.prototype.needDefined = function() {
  // returns the list of aesthetics
  // that must be present in each record of data
  // to be rendered.
  return ['x', 'y'];
};


////////////////////////////////////////////////////////////////////////////////
// statistics computing methods.
////////////////////////////////////////////////////////////////////////////////

gg.layer.base.prototype.calculateStats = function(data) {
  var mapping = this.getMap();
  var attr = this.getAttr();
  var need = _.chain(this.needDefined())
              .map(function(aes) { return mapping[aes] })
              .filter(function(x) { return x; })
              .value();
  // don't pass in "group" mapping, if hasGroup() is false.
  if (!this.hasGroup() && mapping.group) {
    delete mapping.group;
  }
  var context = {
    mapping: mapping,
    attr : attr,
    need : need,
    bin : this.allBin(), // <- good.
    scales : this._graph._scales // bad
  };
  var result = this.stats().calculateStats(data, context);
  return result;
}

gg.layer.base.prototype.hasGroup = function() { return true; }

gg.layer.base.prototype.calculate = function() {
  // calculate ._facetedData, ._statData.
  // To be exact, we only really need facet from the graph.
  if (this._detached) {
    this.warn(301, "Calculating statistics on a detached layer.");
  }
  // short circuit if it's already calculated.
  if (this._calculated) return;
  this.checkStatsRequiredMapping();
  this.checkLayerRequiredMapping();
  this.checkInvalidMapping();

  // step 1. facet.
  this._facetedData = u.calculateFacet(this.data(), this._graph.facet());

  // step 2. statistic computatio on faceted data.
  var calculateStats = _.bind(this.calculateStats, this);
  this._statData = _.map(this._facetedData, calculateStats);

  this._calculated = true;
  return this;
}

gg.layer.base.prototype._map = function(key, variable) {
  // setter for .map() - used internally.
  this._attr[key] = new Mapping(variable);
}
gg.layer.base.prototype.map = function(key, variable) {
  // convenient getter / setter for aesthetics mapping.
  var self = this;
  if (arguments.length === 0) {
    gg.error(12, "Function map() called with less than 1 parameter.")
  }

  if (arguments.length === 1) {
    if (!_.isString(key) && _.keys(key).length > 0) {
      // object is an argument - use the setter behavior.
      _.each(_.keys(key), function(k) { u.assertAes(k); }); //check first
      _.each(key, function(v, k) {
        self._map(k, v);
      });
      this.resetCalculate();
      return this;
    }

    // getter
    u.assertAes(key);
    var val = this._attr[key];
    if (val instanceof Mapping) {
      return val.name;
    }
    return null;
  }

  // setter behavior.
  u.assertAes(key);
  if (_.isUndefined(variable) || variable === null) {
    // unset behavior.
    this.unset(key)
  } else {
    this._map(key, variable);
  }
  this.resetCalculate();
  return this;
}

gg.layer.base.prototype.isDefaultMap = function(key) {
  var m = this._attr[key];
  if (m instanceof Mapping) {
    return m.defaultMapping
  }
  return false;
}

gg.layer.base.prototype.getAttr = function() {
  /** Returns all the attributes mapping. */
  var obj = {};
  _.each(this._attr, function(value, key) {
    if (!(value instanceof Mapping)) {
      obj[key] = value;
    }
  });
  return obj;
}

gg.layer.base.prototype.getMap = function() {
  /** Returns all the aesthetics mapping. */
  var obj = {};
  _.each(this._attr, function(value, key) {
    if (value instanceof Mapping) {
      obj[key] = value.name;
    }
  });
  return obj;
}

gg.layer.base.prototype.unset = function(key) {
  if (_.has(this._attr, key)) {
    delete this._attr[key];
  }
  if (_.has(gg.opts.layer, key)) {
    // reset to default
    // this will NOT work if more options are necessary added!
    this._attr[key] = gg.opts.layer[key];
  }
  return this;
}

gg.layer.base.prototype.getAestheticsGroup = function(aes) {
  // return a group of aesthetics taht belong in the same group.
  var fullname = aes + '_';
  var map = this.getMap();
  var obj = {};
  _.chain(map)
    .keys()
    .filter(function(x) {return x == aes || u.startswith(x, fullname)})
    .map(function(k) {
      obj[k] = map[k];
    });
  return obj;
}

// getters
gg.layer.base.prototype.getData = function(aes, id) {
  /**
   * Return a given data, associated with the given aesthetic mapping.
   */
  if (!this.data()) {
    // no data attached.
    return null;
  }

  var varname = this.map(aes);
  if (!varname) {
    // no aesthetics attached.
    return null;
  }

  return this.data().get(varname, id);
};

gg.layer.base.prototype.getScales = function(context) {
  // Bind the passed in scales, with the aesthetics mapping
  // of the current layer.
  var scales = context.rawScales;
  var s; // tmp variable
  var output = {};
  _.each(this._attr, function(value, key) {
    if (value instanceof Mapping) {
      var scale = scales[key];
      if (scale) {
        output[key] = _.bind(scale.apply, scale, value.name);
        // for debugging.
        // output[key]._debug_context = scales[key];
      }
    } else if (key == 'x' || key == 'y') {
      s = scales[key];
      if (context['free_'+key]) { // change the domain of x and y scales
        if (s._type == 'category') {
          s.make(this._levels(key, null, context.facetId));
        }
        
      }
      // constant value, with scale applied.
      output[key] = u.constfunc(s.apply(value));
    } else {
      // use the constant value.
      output[key] = u.constfunc(value);
    }
  });
  return output;
};


////////////////////////////////////////////////////////////////////////////////
// renderer
////////////////////////////////////////////////////////////////////////////////
gg.layer.base.prototype.renderEntry = function(context) {
  // actual entry point for the rendering.
  // performs some calculations
  this.calculate();

  if (this.hasGroup()) {
    context.computedData = this._statData[context.facetIndex];
  } else {
    context.computedData = this._statData[context.facetIndex][0];
  }
  context.scales = this.getScales(context);
  var width = null;
  if (this._stats.number && this.map('group_stats')) {
    var xClass = context.rawScales.x._cls_name;
    if (xClass == 'gg.scale.continuous' ||
        xClass == 'gg.scale.time') {
      var group_stats = this.map('group_stats');
      var data = this.data();
      var min = data.min(group_stats);
      var max = data.max(group_stats);
      width = context.rawScales.x.distance(min, max) / this._stats.number();
      context.align = 'left';
    }
  }
  if (width === null) {
    width = context.rawScales.x.width();
    context.align = 'center';
  }
  context.width = width;

  if (context.computedData) {
    // false if facetIndex > this._statData.length
    //       if no data point to be plotted
    this.render(context);
  }

  // do some postprocessing.
};

gg.layer.base.prototype.checkErrors = function(context) {
  // check for any errors that might belong in the layer.
  if (_.keys(this.getMap()).length === 0) {
    this.warn(320, "No mapping has been set in layer "+this._cls_name);
    return true;
  }
  return false;
}

gg.layer.base.prototype.render = function(context) {
  // this function should replace render().
  gg.error(10, "Not implemented.");
};
////////////////////////////////////////////////////////////////////////////////
// Min / max / levels / type() calculation
////////////////////////////////////////////////////////////////////////////////

var _empty = [];

var QUERY_AES = 'aes';
var QUERY_KEY = 'key';
var QUERY_AES_GROUP = 'aes_group';
var QUERY_DATA = 'data';

gg.layer.base.prototype.queryData = function(aes, queryType, queryFunc, collectorFunc, facetId) {
  // Implementation behind min(), max().

  // aes(string) - name of the aesthetics we are querying.
  // queryType - data, aes_group, aes or key
  // queryFunc(function(key, data) -> result) - function to be run over all the dataset.
  // collectorFunc(function array of result -> combined result) - function to be run over all the output of the queryFunc.
  // facetId - the facet index to use (empty or -1 => use all facets)

  if (queryType === QUERY_DATA) {
    // no calculate() or collectorFunc required
    return queryFunc(aes, this.data());
  }

  var self = this;
  this.calculate(); // cacculate the statistics.

  // default query type
  queryType = queryType || QUERY_AES_GROUP;
  // default data & map function
  facetId = _.isNumber(facetId) ? facetId : -1;
  if (facetId > self._statData.length) {
    gg.error(-1, "Attempting to access facet id "+facetId+
                 " when there are only "+self._statData.length);
  }
  var mapFunc = facetId == -1 ? u.doubleMap : _.map;
  var data = facetId == -1 ? self._statData : self._statData[facetId];

  // do real work
  var key, keys, tmp1;
  if (queryType === QUERY_AES_GROUP) {
    // run it over multiple keys belonging to the same aes group
    keys = _.values(this.getAestheticsGroup(aes));
    var collection = _.map(keys, function(key) {
      return mapFunc(data, _.bind(queryFunc, null, key));
    })
    tmp1 = u.concat(collection);
  } else {
    // run it over a single key.
    if (queryType === QUERY_KEY) {
      key = aes;
    } else if  (queryType === QUERY_AES) {
      key = this.map(aes);
    } else {
      this.warn(-1, "Should not reach here.");
    }
    tmp1 = mapFunc(data, _.bind(queryFunc, null, key));
  }
  // flatten facet.
  var tmp2 = u.concat(tmp1);
  return collectorFunc(tmp2);
}

gg.layer.base.prototype.min = function(aes, queryType, facetId) {
  var query = function(key, data) { return data.min(key); }
  var type = this.type(aes, queryType);
  var collector = gg.type.fromString(type).min;
  return this.queryData(aes, queryType, query, collector, facetId);
}

gg.layer.base.prototype.max = function(aes, queryType, facetId) {
  var query = function(key, data) { return data.max(key); }
  var type = this.type(aes, queryType);
  var collector = gg.type.fromString(type).max;
  return this.queryData(aes, queryType, query, collector, facetId);
}

gg.layer.base.prototype.levels = function(aes, queryType, facetId) {
  var query = function(key, data) { return data.levels(key); }
  var type = this.type(aes, queryType);
  var typeObj = gg.type.fromString(type);
  var collector = function(x) {
    return u.mergeArrays(x, typeObj.represent);
  };
  return this.queryData(aes, queryType, query, collector, facetId);
}

gg.layer.base.prototype.type = function(aes, queryType, facetId) {
  var query = function(key, data) { return data.type(key); };
  var collector = u.unionType;
  return this.queryData(aes, queryType, query, collector, facetId);
}

////////////////////////////////////////////////////////////////////////////////
// Private methods.
////////////////////////////////////////////////////////////////////////////////
gg.layer.base.prototype.checkStatsRequiredMapping = function() {
  var requiredMap = this.stats().requiredMap() || [];
  var missing = _.difference(requiredMap, _.keys(this.getMap()));
  if (missing.length > 0) {
    gg.error(302, "Variable need to be mapped to the following aesthetics: " + missing.join(', '));
  }
}

gg.layer.base.prototype.checkLayerRequiredMapping = function() {
  var requiredMap = this.stats().requiredMap() || [];
  var missing = _.difference(requiredMap, _.keys(this.getMap()));
  if (missing.length > 0) {
    gg.error(302, "Variable need to be mapped to the following aesthetics: " + missing.join(', '));
  }
}
gg.layer.base.prototype.getInvalidMapping = function() {
  // run assertions against current mapping.
  var self = this;
  var dataKeys = this.data().keys();
  var statsKeys = this.stats().keys();
  var keys = _.union(dataKeys, statsKeys);
  var invalid = {};
  
  _.each(this.getMap(), function(dataKey, aes) {
    // if it's default map, then it SHOULD not be an invalid mapping.
    if (_.include(keys, dataKey)) { return; }

    // add to invalid
    invalid[aes] = dataKey;
  });
  return invalid;
}

gg.layer.base.prototype.checkInvalidMapping = function() {
  var invalid = this.getInvalidMapping();
  if (_.size(invalid) > 0) {
    var message = _.map(invalid, function(dataKey, aes) {
      return "Mapping of aesthetics " + aes + " to variable " + dataKey + " is invalid."
    });
    gg.error(303, message.join('\n'));
  }
}

gg.layer.base.prototype.checkAllMapping = function() {
  this.checkStatsRequiredMapping();
  this.checkInvalidMapping();
}

gg.layer.base.prototype.imputeMapping = function(mapping, opts) {
  var result = {};
  if (!mapping || !opts) { return result }
  var attach = function(k, v) {
    mapping[k] = v;
    result[k] = v; // copy the value.
  }

  _.each(opts, function(imputeFrom, key) {
    if (mapping[key]) { return }

    if (_.isArray(imputeFrom)) {
      for (var i = 0; i < imputeFrom.length; i++) {
        var potential = imputeFrom[i];
        if (mapping[potential]) {
          attach(key, mapping[potential]);
          return;
        }
      }
    } else if (mapping[imputeFrom]) {
      attach(key, mapping[imputeFrom]);
    }
  });

  return result;
}

gg.layer.base.prototype._removePreviousDefaults = function() {
  var self = this;
  _.each(this._attr, function(val, key) {
    if (val instanceof Mapping && val.defaultMapping) {
      delete self._attr[key]
    }
  })
}

gg.layer.base.prototype.bin = function(key, number, strict) {
  return gg.group.binMaker(this, key, number, strict);
};

gg.layer.base.prototype.allBin = function() {
  var self = this;
  var result = {};
  /*
  _.each(this.data().keys(), function(key) {
    result[key] = self.bin(key, 10, false);
  });
  */
  return result;
}

gg.layer.base.prototype._attachImputed = function(key, value) {
  var attr = this._attr[key];
  if (_.isUndefined(attr) || !(attr instanceof Mapping)) {
    // case 1 - no mapping specified.
    this._attr[key] = new Mapping(value, true);
  } else if (attr instanceof Mapping && attr.defaultMapping) {
    // case 2 - _attr mapping is present, and it is default mapping.
    // override the previous default value.
    this._attr[key].value = value;
  }
}

gg.layer.base.prototype.attachDerivedMappings = function() {
  // Obtain the default mapping from the statistics.
  this._removePreviousDefaults();
  var self = this;
  var stats = this.stats();
  var mapping = this.getMap(); // scratch-pad to store mappings.
  var attachImputed = function(v, k) { self._attachImputed(k, v) };

  var layerImputed = this.imputeMapping(mapping); // layer level defaults
  var statsImputed = stats ? stats.imputeMapping(mapping) : {};

  var imputed = _.defaults({}, layerImputed, statsImputed);
  _.each(imputed, attachImputed);
  // return the new mappings that it has attached.
  return imputed;
}

gg.layer.base.prototype.toCode = function(indent, fnIndent) {
  // create the layerObject to pass through to u.toCode
  var layerObj = { 'cls' : this._cls_name }
  // add info about data if exists
  if (this._data && this._data !== USE_GRAPH) {
    var dataFnIndent = indent+this._cls_name.length+3; // Author: Lisa Zhang
    layerObj.params = [this._data.toCode(indent, dataFnIndent)];
  }
  // add function calls to opts, map, and stats
  layerObj.funcs = [ ['opts', JSON.stringify(this.getAttr())] ];
  var mapping = this.getMap();
  _.each(mapping, function(v, k) {
    if (!_.include(gg.opts.aes, k.split('_')[0])) {
      delete mapping[k];
    }
  });
  if (_.keys(mapping).length > 0) {
    layerObj.funcs.push(['map', JSON.stringify(mapping)]);
  }
  if (this._stats) {
    layerObj.funcs.push(['stats', this._stats.toCode()]);
  }
  // yay!
  return u.toCode(indent, fnIndent, layerObj);
}

})(gg);
;/**
 * Date : 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

var TickObject = function(data, pos, label) {
  // Object that represents ticks.
  this.data = data;
  this.label = label;
  this.pos = pos; // position on the <svg>.
}

gg.scale = gg.scale || {};

gg.scale.base = u.makeClass('gg.scale.base');

gg.scale.base.prototype.init = function() {
  // this._aes = aes; // aesthetics that this is mapped to
  this._aes = null;
  this._graph = null; // attached graph
  this._detached = true; // whether it is attached or not
  this._type = null; // date, number, category
  this._attr = {
    "pixel_per_tick_x" : 60,
    "pixel_per_tick_y" : 30,
    "ticks" : null, //override if ticks are predetermined
    "numticks" : null,
    "min": null,
    "max": null,
    "absolute_min": -Infinity,
    "absolute_max": Infinity,
    "domain_low": null,
    "domain_high": null,
    "range_low": null,
    "range_high": null
  }
  this._facetIndex = -1;
}

gg.scale.base.prototype.opts = u.opts();

gg.scale.base.prototype.warn = function(code, msg) {
  if (!this._detached) {
    this._graph.warn(code, msg);
  } else {
    gg.warn(code, msg);
  }
}

gg.scale.base.prototype.CONTINUOUS = false;
gg.scale.base.prototype.DISCRETE = false;

gg.scale.base.prototype.getAttr = u.getAttr

gg.scale.base.prototype.attach = function(graph, aes) {
  if (!this._detached) {
    this.warn(400, "This scale is already attached to a graph. Unexpected behaviour may occur.")
  }
  if (!graph) {
    gg.error(401, "Attempting to attach a scale to an empty graph.")
  }
  if (!aes) { // should also check for validity here!
    gg.error(402, "Scale type " + this._cls_name + " cannot to be attached to aesthetics " + aes + ".")
  }

  this._aes = aes;
  this._graph = graph;
  this._detached = false;
}

gg.scale.base.prototype.min = function(val) {
  var absmin = this._attr.absolute_min;
  if (arguments.length === 1) {
    if (_.isNumber(absmin) && val < absmin) {
      this.warn(403, "Minimum cannot be set below "+absmin+". Using "+absmin+" instead of "+val+".");
      val = absmin;
    }
    this._attr.min = val;
    return this;
  }
  return this._attr.min;
}

gg.scale.base.prototype.max = function(val) {
  var absmax = this._attr.absolute_max;
  if (arguments.length === 1) {
    if (_.isNumber(absmax) && val > absmax) {
      this.warn(403, "Maximum cannot be set above "+absmax+". Using "+absmax+" instead of "+val+".");
      val = absmax;
    }
    this._attr.max = val;
    return this;
  }
  return this._attr.max;
};

gg.scale.base.prototype.rangeSize = function() {
  return Math.abs(this._attr.range_low - this._attr.range_high)
}
gg.scale.base.prototype.type = function() {
  return this._type;
}

gg.scale.base.prototype._saneNumber= function(x){
  return _.isNumber(x) && !isNaN(x) && x != Infinity && x != -Infinity;
}
gg.scale.base.prototype._makeDomain = function(){
  //todo (lisa, 4/22/12): this logic is wrong!
  var aes = this._aes;

  var min = this._graph.min(aes);
  var defaultMin = this._graph.defaultMin(aes);
  var max = this._graph.max(aes)
  var defaultMax = this._graph.defaultMax(aes);

  this._attr.domain_low = _.chain([min, this._attr.min, defaultMin])
                           .filter(_.isNumber).min().value();
  this._attr.domain_high= _.chain([max, this._attr.max, defaultMax])
                           .filter(_.isNumber).max().value();
  return [this._attr.domain_low, this._attr.domain_high];
};

gg.scale.base.prototype.domain = function(domain) {
  if (arguments.length === 1) {
    this._attr.min = domain[0]
    this._attr.max = domain[1]
    return this;
  }
  return [this._attr.min, this._attr.max];
}

gg.scale.base.prototype.range = function(value) {
  if (arguments.length === 1) {
    this._attr.range_low = value[0];
    this._attr.range_high = value[1];
    return this;
  }
  if (!_.isUndefined(this._attr.range_low) && !_.isUndefined(this._attr.range_high)) {
    return [this._attr.range_low, this._attr.range_high];
  } else {
    return null; // range not set.
  }
}

gg.scale.base.prototype.make = function() {
  // do pre-calculations on generating the scale
  gg.error(10, "Not implemented.");
}


gg.scale.base.prototype._apply = function(value) {
  // actual implementaiton of the scale.
  gg.error(10, "Not implemented.");
}

gg.scale.base.prototype.apply = function(varname, dataobj) {
  /** Apply the scale. */
  if (arguments.length == 1) {
    // when there is only one argument, we're actually passing in the dataobj
    // when there are multiple args, we're using binding, so I can't switch
    // varname to the second variable :(
    dataobj = varname;
    varname = undefined;
  }

  if (dataobj && dataobj._cls_name === 'gg.data') {
    // another overriden case - use the first element, in case the input is data frame.
    dataobj = dataobj.getObject(0);
  }

  var input = _.isUndefined(varname) || _.isUndefined(dataobj[varname])
            ? dataobj
            : dataobj[varname];
  return this._apply(input);
}

gg.scale.base.prototype._tickObject = function(data, pos, label) {
  // construct new TickObject.
  var tmp = new TickObject(data, pos, label);
  return tmp
}

gg.scale.base.prototype._getNumticks= function(numticks, flip) {
  if (numticks) {
    this.opts('numticks', numticks);
  } else {
    numticks = this.opts('numticks');
    if (_.isNull(numticks)) {
      var range = this.rangeSize()
      if (range == 2*Math.PI) {
        numticks = 6;
      } else {
        var pixel_per_tick = (this._aes == 'x' == Boolean(flip))
                           ? this.opts('pixel_per_tick_y')
                           : this.opts('pixel_per_tick_x');
        numticks = range/pixel_per_tick;
      }
      this.opts('numticks', numticks)
    }
  }
  return Math.ceil(numticks);
}

gg.scale.base.prototype.ticks = function(numticks) {
  gg.error(10, "Not implemented.");
}

gg.scale.base.prototype.toCode = u.toCodeBasic

})(gg);
;/**
 * Date: 1/25/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Author : Jeeyoung Kim
 * Specifies the statistical transformation done on data.
 *
 * TODO (Jeeyoung Kim) - group function with multiple group keys - this is useful for 2-D histogram.
 */

;(function(gg){
"use strict";
// begin wrapper.

gg.stats = gg.stats || {};

gg.stats.base = u.makeClass('gg.stats.base');

gg.stats.base.prototype.init = function() {
  this._attr = {};
}

// Abstract function
gg.stats.base.prototype.imputeMapping = function(mapping, opts) {
  var result = {};
  if (!mapping || !opts) { return result }
  var attach = function(k, v) {
    mapping[k] = v;
    result[k] = v; // copy the value.
  }

  _.each(opts, function(imputeFrom, key) {
    if (mapping[key]) { return }

    if (_.isArray(imputeFrom)) {
      for (var i = 0; i < imputeFrom.length; i++) {
        var potential = imputeFrom[i];
        if (mapping[potential]) {
          attach(key, mapping[potential]);
          return;
        }
      }
    } else if (mapping[imputeFrom]) {
      attach(key, mapping[imputeFrom]);
    }
  });

  return result;
}

// Abstract function
gg.stats.base.prototype.requiredMap = function() {
  // return the array of required mappings.
  return null;
}

gg.stats.base.prototype.compute = function(data, context) {
  /**
   * Author : Jee
   * A logic that will perform the actual statistics calculations.
   *
   * By default, it applies no transformation to the input data.
   */
  return data;
}

gg.stats.base.prototype.postProcess = function(computed, context) {
  return computed;
}

gg.stats.base.prototype.calculateStats = function(data, context) {
  return this.group(data, context);
}

gg.stats.base.prototype.group = function(data, context) {
  /**
   * Group the given input data, by statistics.
   * context = passed in context. The same unmodified object
   * will be passed to compute() and postProcess()
   * context.groupFunctions (optional) - A function G(.) to apply to determine whether a record of
   * data belongs in the same group. If not specified, X === Y is checked. Otherwise,
   * G(X) == G(Y) will be checked. Useful for binning, etc.
   *
   * This function will return a list of data.
   * */
  var self = this;
  var mapping = context.mapping;

  // First figure out the grouping functions: change it from an {aes: fnc}
  // mapping to a {var: fnc} mapping.
  var groupFuncs = {};
  var groupFunctions = context.groupFunctions || {};

  // figure out the "need" functions
  if (!context.need) context.need = []
  var filterfunc = function(obj) {
    for (var i = 0; i < context.need.length; i++) {
      if (_.isNull(obj[context.need[i]])) {
        // undefined should be bad here too
        return false;
      }
    }
    return true;
  }

  _.each(mapping, function(aes_var, aes_name) {
    // group by ALL grouping parameters...
    var base = u.getBaseAes(aes_name);
    if (base == 'group') {
      groupFuncs[aes_var] = groupFunctions[aes_name] || u.identity;
    }
  });

  // Actually group the data.
  var groupedData = data.group(groupFuncs);

  // Compute the data
  var computed = _.map(groupedData, function(_data) {
    return self.compute(_data, context);
  });

  // Group ONLY by layer-level grouping
  var layerGroupsOnly = {};
  var group_aes = mapping.group;
  if (group_aes && groupFuncs[group_aes]) {
    layerGroupsOnly[group_aes] = groupFuncs[group_aes];
  }
  var regrouped = gg.data.group(computed, layerGroupsOnly, filterfunc);

  return this.postProcess(regrouped, context);
}

gg.stats.base.prototype.createGroupFunction = function(min, max, bins) {
  if (min >= max) {
    gg.error(900, 'Cannot create a grouping function where min is '+min+' and max is '+max);
  }
  if (bins <= 0) {
    gg.error(901, 'Cannot create a grouping function where number of bins is less than 1.');
  }
  var size = (max - min);
  var width = size / bins;
  var func = function groupFunction(x) {
    // value \in [0, 1]
    var value = (x - min) / size;
    var idx = Math.floor(value * bins);
    if (idx == bins) {
       idx = bins - 1;
    }
    return min + idx * size / bins;
  }
  func.width = width;
  return func;
}

gg.stats.base.prototype.createDateGroupFunction = function(minDate, maxDate, bins) {
  var min = minDate.getTime();
  var max = maxDate.getTime();
  if (min >= max) {
    gg.error(900, 'Cannot create a grouping function where min is '+min+' and max is '+max);
  }
  if (bins <= 0) {
    gg.error(901, 'Cannot create a grouping function where number of bins is less than 1.');
  }
  var size = (max - min);
  var width = size / bins;
  var func = function groupFunction(xDate) {
    // value \in [0, 1]
    var x = xDate.getTime();
    var value = (x - min) / size;
    var idx = Math.floor(value * bins);
    if (idx == bins) {
       idx = bins - 1;
    }
    return new Date(min + idx * size / bins);
  }
  func.width = width;
  return func;
}

gg.stats.base.prototype.keys = function() {
  return [];
}

////////////////////////////////////////////////////////////////////////////////
// Embedding
////////////////////////////////////////////////////////////////////////////////
gg.stats.base.prototype.toCode = u.toCodeBasic;

// end wrapper.
})(gg);
;/**
 * Date : 3/12/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

// there are 3 + 1 types in our system.
// discrete
// number
// date
// unknown

;(function(gg) {
"use strict";

gg.type = {};

var _TYPES = null;

var _initCache = function() {
  return {
    'number': new gg.type.number(),
    'category': new gg.type.category(),
    'unknown': new gg.type.unknown(),
    'date': new gg.type.date()
  }
}

gg.type.fromString = function(name) {
  // cache.
  if (_TYPES === null) { _TYPES = _initCache() }
  if (!name) { name =  'unknown' }
  var value = _TYPES[name];
  if (!value) gg.error(800, "No such type " + name + ".");
  return value;
}

gg.type.base = u.makeClass('gg.type.base');

gg.type.base.prototype.min = function(values) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.max = function(values) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.ticks = function(/* figure out what to pass in here */) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.coerce = function(value, context) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.validate = function(value, context) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.defaultScale = function(aes) {
  gg.error(10, "Not implemented.");
}

gg.type.base.prototype.represent = function(value) {
  // return primitive type representation, so that it can be used for sorting.
  gg.error(10, "Not implemented.");
}

// private helper methods.
gg.type.base.prototype._postProcess = function(aes, scale) {
  // sensible defaults for scales.
  if (aes == 'opacity') {
    scale.range([0.2, 0.9]);
  } else if (aes == 'strokewidth') {
    scale.range([0,5])
  } else if (aes == 'radius') {
    scale.range([1,10])
  }
}

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg){
"use strict";
gg.coord.cart = u.makeClass('gg.coord.cart', gg.coord.base);

gg.coord.cart.prototype.init = function(flip) {
  gg.coord.base.prototype.init.call(this);
  this._flip = u.bool(flip);
};

gg.coord.cart.prototype.configScale = function(dim, scales){
  if (!this._flip) {
    scales.x.range([dim.x, dim.width]);
    scales.y.range([dim.height, dim.y]);
  } else {
    scales.x.range([dim.y, dim.height]);
    scales.y.range([dim.x, dim.width]);
  }
};

gg.coord.cart.prototype.transX = function(x, y) {
  return this._flip ? y : x;
}

gg.coord.cart.prototype.transY = function(x, y) {
  return this._flip ? x : y;
}

// Implementation of drawing functions.
gg.coord.cart.prototype.vline = function() {
  var paper = this.getPaper();
  return paper.gg_cart_vline(this);
};
gg.coord.cart.prototype.hline = function() {
  var paper = this.getPaper();
  return paper.gg_cart_hline(this);
};
gg.coord.cart.prototype.line = function() {
  var paper = this.getPaper();
  return paper.gg_cart_line(this);
};
gg.coord.cart.prototype.rect = function() {
  var paper = this.getPaper();
  return paper.gg_cart_rect(this);
};

gg.coord.cart.prototype.toCode = function(indent, fnIndent) {
  return u.toCode(indent, fnIndent, {
    'cls' : this._cls_name,
    'params' : [this._flip.toString()]
  });
}

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg){
"use strict";
gg.coord.polar = u.makeClass('gg.coord.polar', gg.coord.base);

gg.coord.polar.prototype.init = function(flip){
  gg.coord.base.prototype.init.call(this);
  this._flip = u.bool(flip);
  this._configured = false;
};

gg.coord.polar.prototype.configScale = function(dim, scales){
  this._offsetX = dim.x + dim.width/2;
  this._offsetY = dim.y + dim.height/2;
  // var weight = 0.8; // TODO - abstract this out.
  var weight = 1.0;
  var boxSize = (Math.min(dim.width, dim.height)/2) * weight;
  if (!this._flip) {
    scales.x.range([0, boxSize]);
    scales.y.range([0, 2 * Math.PI]);
    scales.y.opts('expand', 0);
  } else {
    scales.y.range([0, boxSize]);
    scales.x.range([0, 2 * Math.PI]);
    scales.x.opts('expand', 0);
  }
  this._configured = true;
};

gg.coord.polar.prototype.transX = function(x, y) {
  if (!this._configured) {
    gg.error(605, "Attempting to use a coordinate that has not been configured.");
  }
  if (!this._flip)
    return (x * Math.cos(y - Math.PI/2));
  return (y * Math.cos(x - Math.PI/2));
}

gg.coord.polar.prototype.transY = function(x, y) {
  if (!this._configured) {
    gg.error(605, "Attempting to use a coordinate that has not been configured.");
  }
  if (!this._flip)
    return (x * Math.sin(y - Math.PI/2));
  return (y * Math.sin(x - Math.PI/2));
}

gg.coord.polar.prototype.vline = function() {
  var paper = this.getPaper();
  return paper.gg_polar_vline(this);
};

gg.coord.polar.prototype.hline = function() {
  var paper = this.getPaper();
  return paper.gg_polar_hline(this);
};

gg.coord.polar.prototype.rect = function() {
  var paper = this.getPaper();
  return paper.gg_polar_rect(this);
}

gg.coord.polar.prototype.toCode = function(indent, fnIndent) {
  return u.toCode(indent, fnIndent, {
    'cls' : this._cls_name,
    'params' : [this._flip.toString()]
  });
}

gg.coord.polar.prototype.poly = function() {
  // calls gg_path, with the own smoothing function to smooth out the line segments.
  var paper = this.getPaper();
  var smoother = _.bind(this._smoother, this);
  return paper.gg_path(this, smoother);
}

// functions that are used in smoother.
gg.coord.polar.prototype._getRange = function() {
  return Math.PI * 2;
}

gg.coord.polar.prototype._getTickSize = function() {
  // sampling rate - between (0, 1] - smaller is finer.
  return 0.01;
}

gg.coord.polar.prototype._smoother = function(xs, ys) {
  // smoothing function.
  var flip = this._flip;
  var length = xs.length;
  var idx = 0;
  var first = true;

  var cx; var cy; // current inputs.
  var px; var py; // previous inputs.
  var rx = []; var ry = [];
  var range = this._getRange();
  var tickSize = this._getTickSize();
  for (idx = 0; idx < length; idx++) {
    cx = xs[idx];
    cy = ys[idx];
    if (!(_.isNumber(cx) && _.isNumber(cy))) { continue; }
    if (first) {
      // first point.
      px = cx; py = cy;
      rx.push(cx); ry.push(cy);
      first = false;
    } else {
      // second and more points.
      var ticks;
      var dx, dy; // delta x and y.
      var tx, ty; // tick x and y.
      dx = cx - px; dy = cy - py;
      if (!flip) {
        ticks = Math.floor(dy / range / tickSize);
      } else {
        ticks = Math.floor(dx / range / tickSize);
      }
      for (var j = 1; j < ticks; j++) {
        // sampled points.
        var delta = j / ticks;
        ty = delta * dy;
        tx = delta * dx;
        rx.push(px + tx);
        ry.push(py + ty);
      }
      px = cx; py = cy;
      // final endpoint.
      rx.push(cx); ry.push(cy);
    }
  }
  return {x: rx, y: ry}
};


})(gg);
;/**
 * Date : 1/10/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Abstraction on top of data.
 *
 * Serves similar purpose as R's Data frame object.
 *
 * Getters with get...() returns a copy.
 **/

;(function(gg) {
"use strict";

var _CACHE_NAMES = [
  'min', 'max', 'levels'
];

var _CACHE_STATS = {
  hit : 0,
  miss : 0
}

gg.data = u.makeClass('gg.data');

gg.data._CACHE_STATS = _CACHE_STATS

////////////////////////////////////////
// "static" methods
////////////////////////////////////////

gg.data.fetch = function(url, callback) {
  // fetch the data asynchronously.
  // sane way to do async.
  d3.text(url, function(text) {
    var data = null;
    if (url.substr(-4) == ".csv") {
      data = gg.data(text);
    } else {
      var js = JSON.parse(text);
      data = gg.data(js);
    }
    callback(data);
  });
}

gg.data.group = function(datas, groupfuncs, filterfunc) {
  // check filterfunc
  if (!filterfunc) filterfunc = function() {return true;}
  // prepare the groupValue() function
  var groupValue;
  if (_.size(groupfuncs) === 0) {
    groupValue = function() { return '' };
  } else {
    groupValue = function(obj) {
      var str = ""; // this will represent the grp of an obj
      _.each(groupfuncs, function(fnc, key) { str += key+":"+fnc(obj[key])+";"; });
      return str;
    }
  }
  // no data
  if (datas.length === 0) return [];
  var keys = datas[0].keys(); // assumed to all be the same... should i check?

  // actual work!
  var groupedRaw = {};
  _.each(datas, function(data) {
    for (var i = 0; i < data.len(); i++) {
      var obj = data._internal[i];
      if (filterfunc(obj)) {
        var grp = groupValue(obj);
        if (!groupedRaw[grp]) groupedRaw[grp] = [];
        groupedRaw[grp].push(obj);
      }
    }
  });
  groupedRaw = _.values(groupedRaw)
  return _.map(groupedRaw, function(d) { return gg.data(d, keys); });
}

////////////////////////////////////////
// Different constructors.
////////////////////////////////////////

gg.data.prototype.fromObject = function(data, keys) {
  // custruct from the data of the form :
  // {
  //   x : [...],
  //   y : [...],
  //   z : [...]
  // }

  keys = keys ? keys : _.keys(data);
  var lengths = _.map(keys, function(key) { return data[key].length; });
  var length = _.max(lengths);
  var processed = [];

  for (var i = 0 ; i < length; i++) {
    var obj = {};
    for(var j = 0 ; j < keys.length; j++) {
      var key = keys[j];
      var cell = data[key][i];
      if (typeof cell === 'undefined') { cell = null; }
      obj[key] = (i < lengths[j]) ? cell : null;
    }
    processed.push(obj);
  }

  this._unparsed = processed;
  this._keys = keys;
};

gg.data.prototype.fromArray = function(data, keys) {
  // constructor from the data of the form:
  // [
  //   {x : ..., y : ..., },
  //   {x : ..., y : ..., },
  //   ...
  // ]
  if (data.length === 0) {
    this._unparsed = [];
    keys = keys ? keys : [];
    this._keys = keys;
    return;
  }

  // should take the max set of keys... oh well (?)
  keys = keys ? keys : _.keys(data[0]);

  // we will want to handle missing data better later.
  for (var i = 1; i < data.length; i++) {
    for (var j = 0; j < keys.length; j++) {
      if (_.isUndefined(data[i][keys[j]])) {
        data[i][keys[j]] = null;
      }
    }
  }

  this._unparsed = data;
  this._keys = keys;
}

gg.data.prototype.fromGrid = function(data, keys, meta) {
  // constructor from the data of the form:
  // [
  //   [x, y, z],
  //   [x, y, z],
  //   ...
  // ]
  if (data.length === 0){
    this._unparsed = [];
    keys = keys ? keys : [];
    this._keys = keys;
    return;
  }
  // if keys don't exist, it's going to be array [0 ... N]
  keys = keys ? keys : _.keys(data[0]);
  var N = keys.length;
  this._unparsed = _.map(data, function(row) {
    var obj = {};
    for (var i = 0; i < N; i++) {
      obj[keys[i]] = _.isUndefined(row[i]) ? null : row[i];
    }
    return obj;
  });
  this._keys = keys;
}

gg.data.prototype.fromCSV = function(data, keys) {
  // construct from data of form:
  // "x,y,z
  //  1,1,1
  //  1,1,1
  //  ..."
  this._unparsed = d3.csv.parse(data);
  this._keys = _.keys(this._unparsed[0])
  for (var i = 0; i < this._unparsed.length; i++) {
    var obj = this._unparsed[i];
    _.each(this._keys, function(k) {
      var num = parseFloat(obj[k]);
      if (num == obj[k]) {
        obj[k] = num;
      }
    });
  }
}

gg.data.prototype.constructData = function(data, meta) {
  var metaProvided = false;
  var keys;
  if (_.isArray(meta)) {
    keys = meta;
    meta = {};
  } else if (!meta) {
    keys = undefined;
    meta = {};
  } else {
    keys = _.keys(meta);
    meta = meta;
    metaProvided = true;
  }
  if (_.isArray(data)) {
    if (data.length > 0 && _.isArray(data[0])) {
      this.fromGrid(data, keys, meta);
    } else {
      this.fromArray(data, keys, meta);
    }
  } else if (_.isString(data)) {
    this.fromCSV(data, keys, meta);
  } else {
    this.fromObject(data, keys, meta);
  }

  if (!metaProvided) {
    this._meta = this.guessMeta();
  } else {
    this._meta = meta;
    // assert the meta.
  }
}

gg.data.prototype.guessMeta = function() {
  var meta = {};
  var self = this;
  _.each(this._keys, function(key) {
    var type = self._guessType(key);
    meta[key] = {
      type: type
    };
  });
  return meta;
}


////////////////////////////////////////
// the REAL constructor
////////////////////////////////////////
gg.data.prototype.init = function(data, meta) {
  var self = this;
  this._unparsed = null;
  this._internal = null;
  this._keys = null;
  this._meta = null;
  // contains cache.
  this._cache = null;

  if (!data) { // no data
    this._unparsed = [];
    this._internal = [];
    this._keys = [];
    this._meta = {};
  } else {
    this.constructData(data, meta);
    this._guessParsers();
    this._applyParsers();
  }
  var keylen = this._keys.length;
  this._clearCache();
};

gg.data.prototype.clone = function(array) {
  array = array || [];
  var data = new gg.data();
  data._keys = _.keys(this._meta);
  data._meta = _.clone(this._meta);
  data._internal = array;
  return data;
}

////////////////////////////////////////
// getters
////////////////////////////////////////

gg.data.prototype.get = function(key, id) {
  if (arguments.length >= 2) {
    // obtains a single cell.
    var val = this._internal[id][key];
    return val;
  }
  // obtains a single column.
  var vals = _.pluck(this._internal, key);
  return vals;
}

gg.data.prototype.getObject = function(id) {
  var i, key;
  var obj = {};
  for(i = 0 ; i < this._keys.length; i++) {
    key = this._keys[i];
    obj[key] = this.get(key, id);
  }
  return obj;
};

gg.data.prototype.getObjects = function() {
  /** Return the list-of-object view of this data frame. */
  var result = [];
  for (var i = 0 ; i < this.len(); i++) {
    result.push(this.getObject(i));
  }
  return result;
}

gg.data.prototype.getBlock = function() {
  var result = [];
  var data = this._internal;
  var i;
  var meta = this._meta;
  var getfunc = function(k) {
    var type = meta[k].type;
    if (type !== 'date') {
      return data[i][k];
    } else {
      return +data[i][k]; // to integer.
    }
  }
  for (i=0; i<this._internal.length; i++) {
    result[i] = _.map(this._keys, getfunc);
  }
  return result;
}

gg.data.prototype.getTypeObj = function(key) {
  return gg.type.fromString(this.type(key));
}

gg.data.prototype.toCode = function(indent, fnIndent) {
  return u.toCode(indent, fnIndent, {
    'cls' : this._cls_name,
    'params' : [JSON.stringify(this.getBlock()), //todo: put this into a SMALLER format!
                JSON.stringify(this._meta)]
    //funcs : ?
  });
}

////////////////////////////////////////
// helpers
////////////////////////////////////////

gg.data.prototype.len = function() {
  // returns the length of the data object.
  return this._internal.length;
}


gg.data.prototype.indices = function() {
  return _.range(this.len());
}

gg.data.prototype.keys = function() {
  return this._keys;
}

gg.data.prototype.metas = function() {
  return _.clone(this._meta);
}

gg.data.prototype.getMeta = function(key) {
  return this._meta[key];
}

var badValues = function(x) {
  // null or undefined.
  return (x === null || typeof x === 'undefined');
}


gg.data.guessType = function(vals) {
  // TODO - what should happen when vals has length 0?
  if (_.all(vals, _.isNumber)) {
    return 'number'
  } else if (_.all(vals, _.isDate)) {
    return 'date'
  } else {
    return 'category'
  }
}

gg.data.prototype._guessType = function(key) {
  var column = _.pluck(this._unparsed, key);
  return gg.data.guessType(_.reject(column, badValues));
}

gg.data.prototype.type = function(key) {
  var meta = this._meta[key];
  return meta ? meta.type : 'unknown';
}

// TODO - handle those values better.
gg.data.prototype.levels = function(key_or_function, sorted) {
  // sorted = always true...
  return this._cached('levels', key_or_function,
    function(key) {
      var type = this.getTypeObj(key);
      var vals = _.chain(this._internal)
        .pluck(key)
        .reject(_.isUndefined)
        .sortBy(type.represent)
        .uniq(true, type.represent)
        .value();
      return vals;
    }
  , []);
}

gg.data.prototype.min = function(key_or_function) {
  return this._cached('min', key_or_function, 
    function(key) {
      var type = this.getTypeObj(key);
      var filter = type.validate;
      var query = type.min;
      return this.query(key, query, filter);
    }, undefined
  );
}

gg.data.prototype.max = function(key_or_function) {
  return this._cached('max', key_or_function,
    function(key) {
      var type = this.getTypeObj(key);
      var filter = type.validate;
      var query = type.max;
      return this.query(key, query, filter);
    }, undefined
  );
}

gg.data.prototype.query = function(key, queryFunction, filterFunction) {
  // query the given colunn of the data.
  return queryFunction(_.filter(this.get(key), filterFunction));
}

gg.data.prototype.remove = function(key) {
  // Removes the given key from the data.
  // returns true iff the removal is successful.
  var index = _.indexOf(this._keys, key)
  if (index === -1) {
    return false;
  }
  this._keys.splice(index, 1);
  delete this._meta[key];
  var i;
  var len = this._internal.length;
  for (i = 0; i < len; i++) {
    var d = this._internal[i];
    delete d[key];
  }
  return true;
}

gg.data.prototype.derive = function(fnString, newvarname, context, dryRun) {
  // fnstring - function or setring.
  if (arguments.length === 1) {
    newvarname = _.uniqueId("var_");
  }
  // default context.
  if (!context) { context = gg.derive; }
  try {
    var compute;
    var hasFnString;
    if (_.isFunction(fnString)) {
      compute = fnString;
      hasFnString = false;
    } else {
      var modifiedFnString = fnString;
      if (fnString === '') {
        var modifiedFnString = '""';
      }
      // TODO - catch the error here.
      compute = new Function('d', 'with(this) { with(d) { return '+ modifiedFnString + ';}}');
      hasFnString = true;
    }
    var len = this.len();
    var values = [];
    for (var i = 0; i < len; i++) {
      var d = this._internal[i];
      var value = compute.call(context, d);
      if (_.isFunction(value)) {
        gg.error(121, 'invalud return value');
      }
      values.push(value);
      if (dryRun) {
        if (i > 10) break;
      } else {
        d[newvarname] = compute.call(context, d);
      }
    }
    if (dryRun) {
      return { success : true, values : values };
    }

    if (!_.include(this._keys, newvarname)) {
      this._keys.push(newvarname);
    }
    this._meta[newvarname] = {
      type: this._guessType(values),
      derived: true,
    };
    if (hasFnString) {
      this._meta[newvarname].formula = fnString;
    }
    // return the generated name.
    return newvarname;
  } catch (err) {
    if (dryRun) {
      return {success:false, error:err};
    }
    gg.warn(121, "Error while generating derived variable "+newvarname+": "+err.toString());
    return false;
  }
}

gg.data.prototype.checkRename = function(from, to) {
  // check whether rename() is possible.
  var fidx = _.indexOf(this._keys, from);
  var tidx = _.indexOf(this._keys, to);
  if (!to) {
    // prevent empty variable name.
    return false;
  } else if (fidx === -1) {
    // from var does not exist.
    return false;
  } else if (tidx !== -1) {
    // to var already exist.
    return false;
  }
  return true;
}
gg.data.prototype.rename = function(from, to) {
  // rename a given variable.
  from = from.toString();
  to = to.toString();
  if (!this.checkRename(from, to)) {
    return false;
  }
  var fidx = _.indexOf(this._keys, from);

  _.each(this._internal, function(obj) {
    obj[to] = obj[from];
    delete obj[from];
  });

  this._keys[fidx] = to;

  this._meta[to] = this._meta[from];
  delete this._meta[from]
  return true;
}

////////////////////////////////////////
// setters
////////////////////////////////////////

gg.data.prototype.push = function(object) {
  /** Push the given object to the data frame. */
  var i, key;
  for(i = 0 ; i < this._keys.length; i++) {
    key = this._keys[i];
    if (!_.has(object, key)) {
      gg.warn(101, "Data is missing key "+key+".");
    }
  }
  // todo - should _unparsed be modified too?
  this._internal.push(object);
  return this;
}

////////////////////////////////////////
// operations on gg.data
////////////////////////////////////////

gg.data.prototype.iterator = function(filterfunc) {
  var self = this;
  var obj = {};
  obj.i = 0;
  obj.next = function() {
    var len = self.len();
    while (obj.i < len && !filterfunc(self._internal[obj.i])) {
      obj.i++;
    }
    if (obj.i == len) {
      return false;
    }
    return self._internal[obj.i++];
  }
  return obj;
}

gg.data.prototype.filter = function(filterfunc) {
  var newdata = [];
  filterfunc = gg.data.makeFilterFunction(filterfunc);
  try {
    _.each(this._internal, function(d) {
      if (filterfunc(d)) {
        newdata.push(d);
      }
    });
  } catch (err) {
    gg.error(122, "Error while filtering data: "+err.toString());
  }
  return this.clone(newdata);
}

gg.data.prototype.sort = function(key, des) {
  /**
   * Sort the given data, by the given key. Returns a new data.
   * des (bool) - if true, sort descending.
   */
  var type = this.getTypeObj(key);
  var newData = _.sortBy(this._internal, function(x) {
    var value = type.represent(x[key]);
    return des ? -value : value;
  });
  return this.clone(newData);
}

gg.data.prototype.group = function(groupfuncs) {
  // groupfuncs = { key : groupping-function, ... }
  return gg.data.group([this], groupfuncs);
}

gg.data.prototype.merge = function(otherData) {
  if (!_.isEqual(this.keys(), otherData.keys())) {
    gg.error(110, "Cannot merge two datasets with unequal keys.");
  }
  this._internal = this._internal.concat(otherData._internal)
  return this;
}

gg.data.prototype.each = function(iterator, sampleSize) {
  if (!sampleSize || sampleSize > this.len()) {
    return _.each(this._internal, iterator);
  } else {
    var shuffled = _.shuffle(this._internal);
    return _.each(shuffled.slice(0, sampleSize), iterator);
  }
}

////////////////////////////////////////
// Caching related functions
////////////////////////////////////////
gg.data.prototype._cached = function(cacheName, key_or_function, computeFunction, defaultValue) {
  // calls the computeFunction with the given key, unless it
  // has been already been called before - in that case, cached value
  // is returned
  var key;
  if (_.isFunction(key_or_function)) {
    var func = key_or_function;
    if (!func._data_key) {
      func._data_key = _.uniqueId('var_');
      // run the derivation.
      this.derive(func, func._data_key);
    }
    key = key_or_function._data_key;
  } else {
    key = key_or_function;
  }
  var idx = _.indexOf(this._keys, key);
  if (idx === -1) {
    // key isn't part of this gg.data object.
    // call the computeFunction without caching.
    return defaultValue;
    // return computeFunction.call(this, key);
  }

  if (_.has(this._cache[cacheName], key)) {
    // cached.
    var cached = this._cache[cacheName][key];
    _CACHE_STATS.hit++;
    return cached
  }
  _CACHE_STATS.miss++;
  // not cached
  var computed = computeFunction.call(this, key);
  this._cache[cacheName][key] = computed;
  return computed;
}

gg.data.prototype._clearCache = function() {
  this._cache = {};
  var cache = this._cache;
  var keylen = this._keys.length;
  _.each(_CACHE_NAMES, function(name) {
    cache[name] = {};
  });
}

////////////////////////////////////////
// Date / parser related functions.
////////////////////////////////////////
gg.data.prototype.parser = function(key, value) {
  if (arguments.length === 1) {
    return this._meta[key].parser;
  }
  this._meta[key].parser = value;
  return this;
}

gg.data.prototype._guessParsers = function() {
  var self = this;
  _.each(this._keys, function(key) {
    var meta = self._meta[key];
    if (self.parser(key)) {
      return; // parser already set.
    } else if (meta.type == 'number') {
      return; // numbers don't need parser.
    } else if (meta.type == 'date' && meta.format) {
      var format = self._meta[key].format;
      meta.parser = gg.data.makeDateParser(format);
    } else {
      var column = _.pluck(self._unparsed, key);
      // check for date
      var format = gg.data.guessDateFormat(column);
      if (format) {
        meta.type = 'date'
        meta.parser = gg.data.makeDateParser(format);
        meta.format = format;
      }
    }
  });
}

gg.data.prototype._applyParsers = function() {
  // apply the parser. Exceptions thrown by parsers are ignored.
  var self = this;
  var keys = this.keys();
  this._internal = _.map(this._unparsed, function(obj) {
    var result = {};
    var idx = 0;
    for (idx = 0; idx < keys.length; idx++) {
      var key = keys[idx];
      var meta = self._meta[key];
      var parser = meta.parser;
      var value = obj[key];
      var parsed;
      if (parser) {
        try { parsed = parser(value); }
        catch (e) { parsed = null; }
      } else {
        parsed = value;
      }
      result[key] = parsed;
    }
    return result;
  });
}

var ISO_FORMAT = '%Y-%m-%d %H:%M:%S';
var common_formats = [
  ISO_FORMAT,
  '%c',
  '%m-%d-%Y',
  '%Y-%m-%d',
  '%m/%d/%Y',
  '%Y/%m/%d',
  '%m%d%Y',
  '%d%m%Y',
  '%Y',
];
gg.data.guessDateFormat = function(column) {
  // STATIC FUNCTION
  // determines whether the given column is a date or not.
  var first = column[0] || "";
  var found = _.find(common_formats, function(format) {
    if (!_.isString(first)) return false;
    return gg.date.parseDate(format, first) !== null;
  });
  return found;
}

gg.data.makeDateParser = function(format) {
  // parse ISO format first.
  var fmt = d3.time.format(format);
  return function(x) {
    if (_.isNumber(x)) { return new Date(x); }
    var result;
    result = fmt.parse(x);
    return result;
  }
}

gg.data.makeFilterFunction = function(string_or_function) {
  if (_.isFunction(string_or_function)) {
    return string_or_function;
  } else if (_.isString(string_or_function)) {
    return new Function('d', 'with(d) { return ' + string_or_function + ';}');
  }
  return function() { return true; };
}


})(gg);
;/**
 * Date: 3/8/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Utility function for date.
 **/
;(function() {
'use strict';
gg.date = {};

gg.date.parseDate = function(format, str) {
  if (!str) return null;
  return d3.time.format(format).parse(str);
}

gg.date.formatDate = function(format, date) {
  if (!date) return '';
  return d3.time.format(format)(date);
}
})();
;;(function(gg) {
"use strict";

// functions used in gg.data.derive() function
gg.derive = {};

gg.derive.year = function(date) {
  return date.getFullYear();
}

gg.derive.month = function(date) {
  return date.getMonth() + 1;
}

gg.derive.day = function(date) {
  return date.getDate();
}

gg.derive.has = function(text, substring) {
  return text.indexOf(substring) > -1;
}

gg.derive.len = function(data) {
  if (_.isString(data)) {
    return data.length;
  }
  return 0;
}

})(gg);
;/**
 * Date : 1/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg){
"use strict";

gg.facet.grid = u.makeClass('gg.facet.grid', gg.facet.base);

gg.facet.grid.prototype.init = function(x, y) {
  gg.facet.base.prototype.init.call(this);
  this.opts('x', x);
  this.opts('y', y);
  this.opts('auto', true);
  // Caches.
};

gg.facet.grid.prototype.x = u.singleOpts('x');
gg.facet.grid.prototype.y = u.singleOpts('y');

gg.facet.grid.prototype.ncol = function(col) {
  // use as getter
  if (arguments.length === 0) {
    return this.opts('col');
  }
  // setter
  u.assertNumber(col);
  this.opts('col', col);
  this.opts('auto', false);
  return this;
};

gg.facet.grid.prototype.nrow = function(row) {
  // use as getter
  if (arguments.length === 0) {
    return this.opts('row');
  }
  // setter
  u.assertNumber(row);
  this.opts('row', row);
  this.opts('auto', false);
  return this;
};

gg.facet.grid.prototype.bin = function(obj) {
  var x = this._func_x.index(obj[this._key_x]);
  var y = this._func_y.index(obj[this._key_y]);

  return y * this._ncol + x;
};

gg.facet.grid.prototype.prepare = function() {
  var key_x = this.x(); var key_y = this.y();
  var nrow, ncol;
  var graph = this._graph;
  var func = function(key) {
    var type = graph.type(key, 'data');
    if (type == 'category') {
      return Math.min(10, graph.levels(key, 'data').length)
    } else if (type == 'number') {
      return 3;
    }
  }
  if (this.opts('auto')) {
    ncol = func(key_x);
    nrow = func(key_y);
    this.nrow(nrow);
    this.ncol(ncol);
  } else {
    ncol = this.ncol();
    nrow = this.nrow();
  }
  this._ncol = ncol;
  this._nrow = nrow;
  this._key_x = key_x;
  this._key_y = key_y;
  this._func_x = this._graph.bin(key_x, ncol, true);
  this._func_y = this._graph.bin(key_y, nrow, true);
  return this;
}

gg.facet.grid.prototype.renderLabel = function(paper, context) {
  var label = 'FOOZLE'
  if (this.x() && context.row === 0) {
    label = this._func_x.label(context.col);
    paper.text()
      .attr("font-size", 12)
      .attr("font-weight","bold")
      .attr("text-anchor", "center")
      .attr("text", label)
      .attr("x", context.xpos + context.eachWidth/2)
      .attr("y", context.ypos - 10);
  }
  if (this.y() && context.col === this.opts('col')-1) {
    label = this._func_y.label(context.row);
    paper.text()
      .attr("font-size", 12)
      .attr("font-weight","bold")
      .attr("text-anchor", "center")
      .attr("text", label)
      .attr("x", context.width + 10)
      .attr("y", context.ypos + context.eachHeight/2)
      .transform('r90');
  }
};

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg) {
"use strict";

gg.facet.wrap = u.makeClass('gg.facet.wrap', gg.facet.base);

gg.facet.wrap.prototype.init = function(x) {
  gg.facet.base.prototype.init.call(this);
  this.opts('x', x);
  // user defined
  this.opts('col', null);
  this.opts('row', null); 
  // cache.
  this._func = null;
  this._key = null;
};

gg.facet.wrap.prototype.x = u.singleOpts('x')

gg.facet.wrap.prototype.ncol = function(col) {
  // use as getter
  if (arguments.length === 0) {
    return this.opts('col');
  }
  // setter
  u.assertNumber(col);
  this.opts('col', col);
  return this;
};

gg.facet.wrap.prototype.nrow = function(row) {
  // use as getter
  if (arguments.length === 0) {
    return this.opts('row');
  }
  // setter
  u.assertNumber(row);
  this.opts('row', row);
  return this;
};

gg.facet.wrap.prototype.sanity = function() {
  var levels = this.levels();
  if (levels.length > 0 && levels.length < this.opts('col')) {
    this.ncol(levels.length);
  } else {
    this.ncol(this.opts('col')); // this is required to set the row corectly...
  }
  return this;
}

gg.facet.wrap.prototype.isValidIndex = function(facetIndex) {
  return (facetIndex < this._graph.levels(this.x(), 'data').length);
};


gg.facet.wrap.prototype.bin = function(obj) {
  return this._func.index(obj[this._key]);
};

gg.facet.wrap.prototype.prepare = function() {
  var key = this.x();
  var type = this._graph.type(key, 'data');
  var nlevels = type == 'category' ? this._graph.levels(key, 'data').length : 9;

  var ncol, nrow;
  if (this.opts('col')) {
    // set the col first
    ncol = this.opts('col') || 3; //default = 3 cols
    nrow = this.opts('row') || Math.ceil(nlevels / ncol);
  } else {
    // set the row first
    nrow = this.opts('row') || 2; /// dfeault = 2 cols
    ncol = this.opts('col') || Math.ceil(nlevels / nrow);
  }
  this.opts('col', ncol);
  this.opts('row', nrow);

  // private variables.
  this._func = this._graph.bin(key, ncol * nrow, true);
  this._key = key;
  return this;
}

gg.facet.wrap.prototype.renderLabel = function(paper, context) { 
  var idx = context.row * this.ncol() + context.col;
  var label = this._func.label(idx);
  if (label === null) return null;

  var elt = paper.text()
    .attr("font-size", 12)
    .attr("font-weight","bold")
    .attr("text", label)

  if (this.opts('col') == 1) {
    // put it on the right
    elt.attr("x", context.width + 10)
       .attr("y", context.ypos + context.eachHeight/2)
       .transform('r90');
  } else {
    // put it at the top
    elt.attr("x", context.xpos + context.eachWidth/2)
       .attr("y", context.ypos - 10);
  }
  return this;
};

})(gg);
;;(function() {
"use strict";

gg.graph.prototype.bin = function(key, number, strict) {
  return gg.group.binMaker(this, key, number, strict);
}

})();
;;(function(gg){
"use strict";

gg.graph.prototype.type = function(key, queryType, facetId) {
  if (this._layers.length === 0 && queryType == 'data') {
    return this.data().type(key);
  }
  var result = _.invoke(this._layers, 'type', key, queryType, facetId);
  return u.unionType(result);
}

gg.graph.prototype.min = function(key, queryType, facetId) {
  if (this._layers.length === 0 && queryType == 'data') {
    return this.data().min(key);
  }
  var result = _.invoke(this._layers, 'min', key, queryType, facetId);
  var type = this.type(key, queryType);
  var typeObj = gg.type.fromString(type);
  return typeObj.min(result);
};

gg.graph.prototype.max = function(key, queryType, facetId) {
  if (this._layers.length === 0 && queryType == 'data') {
    return this.data().max(key);
  }
  var result = _.invoke(this._layers, 'max', key, queryType, facetId);
  var type = this.type(key, queryType);
  var typeObj = gg.type.fromString(type);
  return typeObj.max(result);
};

gg.graph.prototype.levels = function(key, queryType, facetId) {
  if (this._layers.length === 0 && queryType == 'data') {
    return this.data().levels(key);
  }
  var result = _.invoke(this._layers, 'levels', key, queryType, facetId);
  var type = this.type(key, queryType);
  var typeObj = gg.type.fromString(type);
  return u.mergeArrays(result, typeObj.represent);
};

})(gg);
;(function(gg) {
'use strict';

// Brought some rendering-related functions into this file.

gg.graph.prototype._setupGrid = function() {
  var coord = this.coord();
  var scales = this._scales;
  var grid = gg.guide.grid(scales.x, scales.y);
  if (coord._cls_name === 'gg.coord.polar') {
    grid.opts('render-vertical', true);
  }
  _.each(this._attr, function(val, key) {
    if (key.substr(0, 5) == "grid-" && !_.isNull(val))  {
      grid.opts(key.substr(5), val);
    }
  });
  return grid;
}

gg.graph.prototype._setupAxes = function() {
  var coord = this.coord();
  var scales = this._scales;
  // generate the gg.guide.axis objects
  var flip = (coord._flip !== (coord._cls_name === 'gg.coord.polar'));
  var x = flip ? 'y' : 'x';
  var y = flip ? 'x' : 'y';
  // set the x- and y- axis
  var xaxis = gg.guide.axis(this._scales[x], 'x', coord)
  var yaxis = gg.guide.axis(this._scales[y], 'y', coord)
  // change some default options to better default options
  if (coord._cls_name === 'gg.coord.polar') {
    yaxis.opts('line', true);
  }
  // set user options
  _.each(this._attr, function(val, key) {
    var begin = key.substr(0, 7)
    if (begin  == "axis-x-" && !_.isNull(val))  {
      xaxis.opts(key.substr(7), val);
    } else if (begin == "axis-y-" && !_.isNull(val))  {
      yaxis.opts(key.substr(7), val);
    } else if (begin.substr(0, 5) == "axis-") {
      // apply to both!
      xaxis.opts(key.substr(5), val);
      yaxis.opts(key.substr(5), val);
    }
  });
  return {'x': xaxis, 'y': yaxis, 'flip': flip};
}

gg.graph.prototype._renderAxis = function(axes, context) {
  var self = this;
  var paper = this._paper;
  var coord = this.coord();
  var ctx; // used to GIVE context to axis rendering...
  var x = axes.flip ? 'y' : 'x';
  var y = axes.flip ? 'x' : 'y';

  // render y-axis
  var offset;
  var position = this.opts('axis-y');
  if ((position == "left" && context.col === 0) ||
      (position == "right" && context.col === context.ncol-1) ||
      context.free_y) {
    offset = this.getAxisOffset(context.row, context.col, position);
    ctx = {
      position : position,
      coord : coord,
      canvas : self.createOffsetCoord(offset.x, offset.y)
    };
    axes.y.renderLinear(ctx);
  }

  // render x- or circular-axis
  position = this.opts('axis-x')
  if (position == "none") {
    // pass
  } else if (coord._cls_name === 'gg.coord.polar') {
    offset = this.getAxisOffset(context.row, context.col, 'circular');
    ctx = {
      position : 'circular',
      coord : coord.differentOffset(context.xpos, context.ypos),
      radius : this._scales[y].range()[1],
      canvas : self.createOffsetCoord(offset.x, offset.y)
    };
    axes.x.renderCircular(ctx);
  } else {
    offset = this.getAxisOffset(context.row, context.col, position);
    ctx = {
      position : position,
      coord : coord,
      canvas : self.createOffsetCoord(offset.x, offset.y)
    };
    // render x-axis
    if ((position=="bottom" && context.row == context.nrow - 1) ||
        (position=="top" && context.row === 0) ||
        context.free_x) {
      axes.x.renderLinear(ctx);
    } else {
      // render x-axis with line only
      axes.x.renderLinear(ctx, {labels:false});
    }
  }
};

gg.graph.prototype.renderPrimary = function(layerErrors) {
  var dims = this.dimensions();
  var facet = this._facet;
  var ncol = dims.ncol,
      nrow = dims.nrow,
      facetIndex = 0;
  var xpos, ypos; // in pixels
  var coord = this.coord();
  var self = this;

  // SET UP GRIDS AND AXES
  var grid = this._setupGrid();
  var axes = this._setupAxes();

  // STUFF TO DO WITH SCALES THAT MAY NEED TO BE RESET
  var scales = this._scales;
  var free_x = facet ? facet.opts('free_x') : false;
  var free_y = facet ? facet.opts('free_y') : false;

  var resetDomain = function(key, facetIndex) {
    // set domain
    scales[key].make(facetIndex);
    // set grid (is this necessary?)
    grid.opts(key+'scale', scales[key]);
    // set axis (is this necessary?)
    var axisKey = (axes.flip == (key == 'x')) ? 'y' : 'x';
    axes[axisKey].scale(scales[key]);
  }

  // LOOP OVER ALL FACETS:
  for (var i=0; i<nrow; i++) {
    for (var j=0; j<ncol; j++) {
      // break out if there is no more facets to plot:
      if (facet && ! facet.isValidIndex(facetIndex)) { break; }
      // set up positions:
      xpos = this.xposition(j);
      ypos = this.yposition(i);

      // set up scales:
      if (free_x) { resetDomain('x', facetIndex); }
      if (free_y) { resetDomain('y', facetIndex); }
  
      // render grid
      var gridCoord = coord.differentOffset(xpos, ypos).opts('mouseover_highlight', false);
      grid.render(gridCoord);

      // render layer
      for (var k=0; k < this._layers.length; k++) {
        if (layerErrors && layerErrors[k]) continue;
        this.renderLayer(this.getLayer(k), xpos, ypos, scales, facetIndex);
      }

      // render axis
      this._renderAxis(axes, {'col':j, 'row':i, 'ncol':ncol, 'nrow':nrow,
                              'xpos':xpos, 'ypos':ypos,
                              'free_x': free_x, 'free_y': free_y});
      facetIndex++;
    }
  }
}

gg.graph.prototype.renderLayer = function(layer, xOffset, yOffset, scales, facetIndex) {
  // **** RENDER EACH LAYER
  var context = {
    rawScales: scales,
    // generate a new coordinate, with the provided offset.
    coord: this._coord.differentOffset(xOffset, yOffset),
    facetIndex : facetIndex
  };
  layer.renderEntry(context);
}


gg.graph.prototype.renderAllFacetLabel = function() {
  var dims = this.dimensions();
  var ncol = dims.ncol,
      nrow = dims.nrow,
      spacingY    = dims.spacingY;
  if (!(nrow > 1 || ncol > 1)) {
    return;
  }

  var context = {
    eachWidth: dims.eachWidth,
    width: dims.chartWidth + this.opts('padding-left'),
    eachHeight: dims.eachHeight
  }
  for (var i=0; i<nrow; i++) {
    for (var j=0; j<ncol; j++) {
      context.row = i;
      context.col = j;
      context.ypos = this.yposition(i);
      context.xpos = this.xposition(j);
      var label = this._facet.renderLabel(this._paper, context);
    }
  }
};

gg.graph.prototype.renderLegend = function() {
  var position = this.opts("legend-position");
  if (position == "none") {
    return;
  }
  var dims = this.dimensions();
  var chartWidth = dims.chartWidth;
  var chartHeight = dims.chartHeight;
  var xpos, ypos;

  if (position == "left" || position == "right") {
    ypos = this.opts('padding-top');
    xpos = 10;
    if (position=="right") {
      xpos += this.opts('padding-left')+chartWidth+10; // 10 for facet label
    }
  }
  else if (position == "bottom") {
    ypos = chartHeight+this.opts('padding-top')+45 //100; //this.opts('padding-top')+chartHeight; //add some for axis
    xpos = this.opts('padding-left');
  } else {
    gg.error(1000, "Leged position should be left, right, bottom or none. Got "
                   +position+" instead.");
  }

  var context = {
    canvas : this.createOffsetCoord(xpos, ypos),
    position: position,
    chartWidth: chartWidth,
    chartHeight: chartHeight
  };
  gg.guide.legend(this, this._layers, this._scales).render(context)
};

gg.graph.prototype.renderOtherLabel = function() {
  var dims = this.dimensions();
  var chartWidth = dims.chartWidth;
  var chartHeight = dims.chartHeight;
  // y-label
  if (this._coord._name === 'polar') {
    // FIXME(JEE) - THIS IS HACK FOR POLAR COORDINATES. Remove it later.
  } else {
    this.render_y_label();
    this.render_x_label();
  }
  this.render_title();
}

/* @TODO: these should be movd to COORDS */
gg.graph.prototype.render_label = function(text, xpos, ypos, cssclass) {
  var element = this._paper.text(xpos, ypos, text).attr('class', cssclass);
  this._doms[cssclass] = element;
  return element;
}

gg.graph.prototype.render_title = function() {
  var xpos = this.opts("width")/2;
  var ypos = this.opts("padding-top")*0.7;
  this.render_label(this.opts("title"), xpos, ypos, '_debug_title')
        .attr('font-weight', this.opts('title-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('title-size'));
}

gg.graph.prototype.render_x_label = function() {
  var dims = this.dimensions();
  var chartWidth = dims.chartWidth;
  var chartHeight = dims.chartHeight;

  var xpos = this.opts("padding-left")+chartWidth/2;
  var ypos = this.opts("padding-top")+chartHeight+30;

  var key = this._coord._flip ? 'y' : 'x';
  this.render_label(this._varlabel(key), xpos, ypos, '_debug_x_label')
        .attr('font-weight', this.opts('label-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('label-size'));
};

gg.graph.prototype.render_y_label = function() {
  var dims = this.dimensions();
  var chartHeight = dims.chartHeight;

  var xpos = Math.max(this.opts("padding-left")*0.35,
                      this.opts("padding-left")-40);
  var ypos = this.opts("padding-top")+chartHeight/2;
  var key = this._coord._flip ? 'x' : 'y';
  this.render_label(this._varlabel(key), xpos, ypos, '_debug_y_label')
        .transform('r270')
        .attr('font-weight', this.opts('label-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('label-size'));
};

gg.graph.prototype.render_branding = function(elem) {
  elem.setAttribute('style', 'position:relative');
  var img = document.createElement('img')
  img.setAttribute('src', '/s/resources/branding.png');
  img.setAttribute('style', 'position:relative; top:-2px');
  var branding = document.createElement('a')
  branding.appendChild(document.createTextNode("Made with "));
  branding.appendChild(img);
  branding.setAttribute('href', 'http://www.polychart.com')
  branding.setAttribute('target', '_blank')
  branding.setAttribute('style', 'position:absolute; bottom:2px; left:20px; color: #BBB');
  elem.appendChild(branding);
}

})(gg);
;"use strict";
// Author : Jeeyoung Kim
// Scale getter / setter, and other scale related methods
// for gg.graph object.

gg.graph.prototype.getScaleKeys = function() {
  return _.keys(this._scales);
}

gg.graph.prototype.removeScale = function(key) {
  if (_.has(this._scales, key)) {
    delete this._scales[key];
    return true;
  }
  return false;
}

gg.graph.prototype.removeAllScales = function() {
  this._scales = {}
}

gg.graph.prototype.getScale = function(key) {
  return this._scales[key]
}

gg.graph.prototype.scale = function(key, scale) {
  // Setter for the given scale.
  u.assertAes(key);
  scale = u.instantiate(scale);
  if (!scale) {
    gg.error(201, "Attempting to add an undefined or malformed scale: "+scale)
  }

  var cloned = u.cloneobj(scale);
  cloned.attach(this, key);
  this._scales[key] = cloned;

  return this;
}

gg.graph.prototype.resetScale = function(aes) {
  // reset the given scale, with the defautl scale.
  // returns true if the default scale can be generated.
  var defaultScaleMap = this.makeDefaultScales([aes]);
  var scale = defaultScaleMap[aes];
  if (scale) {
    this.scale(aes, scale);
    this.computeScale();
    return true
  } else {
    return false;
  }
}


gg.graph.prototype.makeDefaultScales = function(toMake) {
  // generate missing scales.
  var self = this;
  var scales = this._scales;
  if (!toMake) {
    toMake = _.chain(this._layers)
      .map(function(l) { return _.keys(l.getMap()) })
      .flatten()
      // X and Y scales should always be present.
      .push('x').push('y')
      .uniq()
      // groups & derived aesthetics don't need scales.
      .filter(function(aes) {
        if (u.isDerivedAes(aes)) {
          return false;
        }
        var base = u.getBaseAes(aes);
        if (base == 'group') {
          return false;
        }
        return true;
      })
      // those scales are already set.
      .reject(function(aes) { return _.has(scales, aes); })
      .value()
  }

  var output = {};
  _.each(toMake, function(aes) {
    var type = self.type(aes);
    if (!type) return;
    var typeObj = gg.type.fromString(type);
    var scale = typeObj.defaultScale(aes);
    output[aes] = scale;
  });

  // X and Y should be continuous, if they don't exist.
  if (!this._scales.x && !output.x && _.contains(toMake, 'x')) { output.x = gg.scale.continuous() }
  if (!this._scales.y && !output.y && _.contains(toMake, 'y')) { output.y = gg.scale.continuous() }

  return output;
}

gg.graph.prototype.bindDerivedScales = function() {
  // Scale for X_.* should reference the scale for X.
  var s = this._scales;
  var values = this.getMapKeys();
  _.each(values, function(aes) {
    if (u.isDerivedAes(aes)) {
      s[aes] = s[u.getBaseAes(aes)];
    }
  });
}

gg.graph.prototype.computeScale = function() {
  // compute the domain / range of the scale using the coordinates.
  var scales = this._scales;
  var dims = this.dimensions();
  this._coord.configScale({x:0,y:0,width:dims.eachWidth,height:dims.eachHeight}, scales);
  _.each(scales, function(scale, aes) {
    if (!u.isDerivedAes(aes)) {
      scale.make()
    }
  });
}
;// Author : Jeeyoung kim
// Date: Apr 24, 2012
// various aggregation functions.

gg.group = {};
gg.group.niceBinFunction = function(low, high, m) {
  var span = high - low;
  var step = Math.pow(10, Math.floor(Math.log(span / m) / Math.LN10));
  var err = m / span * step;

  // Filter ticks to get closer to the desired count.
  if (err <= .15) step *= 10;
  else if (err <= .35) step *= 5;
  else if (err <= .75) step *= 2;

  // Round start and stop values to step interval.
  var extent = []; // start, end, step.
  var start = Math.ceil(low / step) * step;
  // var end = Math.floor(high / step) * step + step * .5; // inclusive

  return function(x) {
    // todo - concept of start / end.
    var idx = Math.floor((x - start) / step);
    return start + idx * step
  }
};

gg.group.rawBinFunction = function(low, high, m) {
  var _round = function(x, num) {
    return Math.round(x * num) / num;
  }
  var size = (high - low);
  var width = size / m;
  var index = function(x) {
    var value = (x - low) / size;
    var idx = Math.floor(value * m);
    if (idx >= m) { idx = m - 1; }
    if (idx < 0) { idx = 0 }
    return idx;
  }
  var func = function groupFunction(x) {
    return low + index(x) * size / m;
  }
  var label = function(idx) {
    var start = low + idx * size / m;
    var end = low + (idx + 1) * size / m;
    return _round(start, 100) + " ~ " + _round(end, 100);
  }
  func.index = index;
  func.label = label;

  return func;
}

gg.group.dateBinFunction = function(minDate, maxDate, bins) {
  var min = minDate.getTime();
  var max = maxDate.getTime();
  if (min >= max) {
    gg.error(900, 'Cannot create a grouping function where min is '+min+' and max is '+max);
  }
  if (bins <= 0) {
    gg.error(901, 'Cannot create a grouping function where number of bins is less than 1.');
  }
  var size = (max - min);
  var width = size / bins;
  var func = function groupFunction(xDate) {
    // value \in [0, 1]
    var x = xDate.getTime();
    var value = (x - min) / size;
    var idx = Math.floor(value * bins);
    if (idx == bins) {
       idx = bins - 1;
    }
    return new Date(min + idx * size / bins);
  }
  func.width = width;
  return func;
}

gg.group.binMaker = function(graph_or_layer, key, number, strict) {
  // strict is always true, omg.
  strict = strict || true;
  number = number || 10;
  var min, max;

  // generate grouping function for the given key.
  var type = graph_or_layer.type(key, 'data');
  if (type === 'number') {
    min = graph_or_layer.min(key, 'data');
    max = graph_or_layer.max(key, 'data');
    if (strict) {
      return gg.group.rawBinFunction(min, max, number);
    } else {
      return null;
      // throw "NOT IMPLEMENTED.";
      // return gg.group.niceBinFunction(min, max, number).index;
    }
  } else if (type == 'category') {
    var levels = graph_or_layer.levels(key, 'data');
    var func = function(x) {};

    func.index = function(x) {
      var idx = _.indexOf(levels, x);
      return idx % number;
    };
    func.label = function(index) {
      if (index >= levels.length) return null;
      return levels[index % number];
    }
    return func;
  } else if (type == 'date') {
    min = graph_or_layer.min(key, 'data');
    max = graph_or_layer.max(key, 'data');
    return gg.group.dateBinFunction(min, max, number);
  }
  return null;
}
;/**
 * Date : 2/1/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author: Lisa Zhang
 **/

;(function(gg) {
"use strict";

gg.guide.axis = u.makeClass('gg.guide.axis', gg.guide.base);

gg.guide.axis.prototype.init = function(scale, type, coord) {
  gg.guide.base.prototype.init.call(this);
  this._type = type || scale._aes;
  if (this._type != "x" && this._type != "y") {
    gg.error(500, "Axis can only be created from x- or y- aesthetics, got "+this._type+" instead.");
  }
  this._scale = scale;
  this._coord = coord;
  this._flip = type == 'y' && coord._cls_name == 'gg.coord.polar';

  this._attr = u.cloneobj(gg.opts.axis);
  if (this._type == 'x') {
    _.extend(this._attr, gg.opts.axis_x)
  } else if (this._type == 'y') {
    _.extend(this._attr, gg.opts.axis_y)
  }
}

gg.guide.axis.prototype.scale = function(s) {
  this._scale = s;
  return this;
}

/*
 * Renders an x, y, or r-axis. Basically any axis that is linear.
 *
 * @context.position: should be one of "top", "bottom", "left", "right"
 * @context.canvas: cartesian coordinate with the correct offset transformation applied.
 * @context.coord: original coordinate of the graph.
 */
gg.guide.axis.prototype.renderLinear = function(context, render) {
  var canvas = context.canvas;
  var position = context.position;
  // constants 
  var XAXIS = (position == "top" || position == "bottom");
  var YAXIS = (position == "left" || position == "right");
  var ANCHOR = XAXIS ? "middle" : (position == "left") ? "end" : "start";
  var TEXTX = XAXIS ? 0 : (position == "left") ? -10 : 10;
  var TEXTY = YAXIS ? 0 : (position == "top") ? -5 : 15;
  var TICKLEN = XAXIS ? this.opts('ticklength-x') : this.opts('ticklength-y');
  var FONTSIZE = this.opts('fontsize');
  var COLOR = this.opts('color');
  var STROKEWIDTH = this.opts('strokewidth');
  if (!render) {
    render = {
      line : true,
      ticks : true,
      labels : true
    };
  }
  // check sanity
  if (!(XAXIS || YAXIS)) {
    gg.error(501, "Position should be 'top', 'bottom', 'left', or 'right'. Got "+position+" instead.")
  }
  if ((XAXIS && this._type !="x")) {
    gg.error(501, "Position should be 'top' or 'bottom'. Got "+position+" instead.")
  }
  if ((YAXIS && this._type !="y")) {
    gg.error(501, "Position should be 'left', or 'right'. Got "+position+" instead.")
  }
  // draw the axis line
  var x = [0, 0], y = [0, 0];
  if (XAXIS) {
    x = this._scale.range();
  } else {
    y = this._scale.range();
  }
  if (this.opts('line') && render.line !== false) {
    // we should NOT need coordinate abstraction here
    canvas.line().attr('func', {
      'x1' : x[0], 'x2': x[1],
      'y1' : y[0], 'y2': y[1],
      'stroke': COLOR,
      'stroke-width': STROKEWIDTH
    }).attr('data', {});
  }
  // generate ticks
  var ticks = this._scale.ticks(null, this._flip)
  // the following is a slight hack.
  // it has the effect of flipping the axis, without flipping the text
  if (this._flip) {
    var max = _.max(this._scale.range());
    _.each(ticks, function(t) {
      t.pos = max - t.pos;
    });
  }
  // draw ticks & labels
  if (this.opts('ticks') && render.ticks !== false) {
    _.each(ticks, function(data) {
      canvas.line().attr('func', {
        x1 : function(t) { return XAXIS ? t.pos : 0; },
        x2 : function(t) { return XAXIS ? t.pos : (position=="left" ? -TICKLEN: TICKLEN); },
        y1 : function(t) { return YAXIS ? t.pos : 0; },
        y2 : function(t) { return YAXIS ? t.pos : (position=="top" ? -TICKLEN: TICKLEN); },
        'stroke' : COLOR,
        'stroke-width' : STROKEWIDTH
      }).attr('data', data);
    })
  }
  if (this.opts('labels') && render.labels !== false) {
    _.each(ticks, function(data) {
      canvas.text().attr('func', {
        x : function(t) { return XAXIS ? t.pos : TEXTX; },
        y : function(t) { return YAXIS ? t.pos : TEXTY; },
        text : function(t) { return String(t.label) },
        'font-size' : FONTSIZE,
        'font-color' : COLOR,
        'text-anchor': ANCHOR
      }).attr('data', data);
    })
  }
}

/*
 * Renders a circular axis, i.e. for theta in polar coords
 *
 * @context.position: always 'circular'
 * @context.canvas: cartesian coordinate with the correct offset transformation applied.
 * @context.coord: original coordinate of the graph.
 * @context.radius: radius of the circular axis.
 */

gg.guide.axis.prototype.renderCircular = function(context, render) {
  var coord = context.coord;
  var radius = context.radius;

  var TICKLEN = this.opts('ticklength-y');
  var FONTSIZE = this.opts('fontsize');
  var COLOR = this.opts('color');
  var STROKEWIDTH = this.opts('strokewidth');
  render = render || {
    line: true,
    ticks : true,
    labels : true
  };

  var hline, vline, x, y, x1, x2, y1, y2;
  if (coord._flip) {
    hline = _.bind(coord.vline, coord);
    vline = _.bind(coord.hline, coord);
    x = "y"; y = "x";
    x1 = 'y1'; x2 = 'y2';
    y1 = 'x1'; y2 = 'x2';
  } else {
    hline = _.bind(coord.hline, coord);
    vline = _.bind(coord.vline, coord);
    x = "x"; y = "y";
    x1 = 'x1'; x2 = 'x2';
    y1 = 'y1'; y2 = 'y2';
  }

  if (this.opts('line') && render.line !== false) {
    // draw the axis.
    var func = {
      'stroke': COLOR,
      'stroke-width': STROKEWIDTH
    }
    func[x] = u.constfunc(radius);
    func[y1] = u.constfunc(0);
    func[y2] = u.constfunc(360);
    vline().attr('func', func).attr('data', {});
  }

  var ticks = this._scale.ticks(null)

  if (this.opts('ticks') && render.ticks !== false) {
    var func = {
      'class': 'labeltick',
      'stroke': COLOR,
      'stroke-width': STROKEWIDTH
    };
    func[x1] = u.constfunc(radius);
    func[x2] = u.constfunc(radius + TICKLEN);
    func[y]  = function(t) { return t.pos }
    _.each(ticks, function(tick){
      hline().attr('func', func).attr('data', tick);
    });
  }

  if (this.opts('labels') && render.labels !== false) {
    var func = {
      'text' : function(t) { return t.label; },
      'font-size' : u.constfunc(FONTSIZE),
      'text-anchor' : u.constfunc('middle'),
      'font-color' : u.constfunc(COLOR)
    };
    func[x] = u.constfunc(radius + TICKLEN + 2);
    func[y]  = function(t) { return t.pos }
    _.each(ticks, function(tick) {
      coord.text().attr('func', func).attr('data', tick);
    });
  }
}
})(gg);
;/**
 * Date : 2/8/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author: Lisa Zhang
 **/

;(function(gg) {
"use strict";

gg.guide.grid = u.makeClass('gg.guide.grid', gg.guide.base);

gg.guide.grid.prototype.init = function(xscale, yscale) {
  gg.guide.base.prototype.init.call(this);
  this._attr = u.cloneobj(gg.opts.grid); // defaults
  this.opts('xscale', xscale);
  this.opts('yscale', yscale);
}

/**
 * Render the given guide.
 * @coord - coordinate to render the guides.
 */
gg.guide.grid.prototype.render = function(coord) {
  var self = this;
  var flip = (coord._flip !== (coord._cls_name === 'gg.coord.polar'));

  var xscale = this.opts('xscale')
  var xrange = xscale.range();
  var xmin = _.min(xrange);
  var xmax = _.max(xrange);
  var xticks = xscale.ticks(null, flip);

  var yscale = this.opts('yscale')
  var yrange = yscale.range();
  var ymin = _.min(yrange);
  var ymax = _.max(yrange);
  var yticks = yscale.ticks(null, flip);

  var extractdata = function(t) { return t.data; };

  if (this.opts('render-vertical')) {
    _.each(xticks, function(data) {
      coord.vline().attr('func', {
        "x": function(t) { return xscale.apply(t.data) },
        "y1": u.constfunc(ymin),
        "y2": u.constfunc(ymax),
        "stroke": self.opts('stroke'),
        "stroke-width": self.opts('strokewidth'),
        "stroke-dasharray": self.opts('dasharray'),
        "stroke-dashoffset": self.opts('dashoffset')
      }).attr('data', data);
    });
  }

  if (this.opts('render-horizontal')) {
    _.each(yticks, function(data) {
      coord.hline().attr('func', {
        "y": function(t) { return yscale.apply(t.data) },
        "x1": u.constfunc(xmin),
        "x2": u.constfunc(xmax),
        "stroke": self.opts('stroke'),
        "stroke-width": self.opts('strokewidth'),
        "stroke-dasharray": self.opts('dasharray'),
        "stroke-dashoffset": self.opts('dashoffset')
      }).attr('data', data);
    });
  }
}
})(gg);

;/**
 * Date : 2/1/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author: Lisa Zhang
 **/
;(function(gg) {
"use strict";

// Aesthetics that we do not render legends for.
var NO_LEGEND = ["x", "y", "text", "group", "group2", "grp"]

gg.guide.legend = u.makeClass('gg.guide.legend', gg.guide.base);

gg.guide.legend.prototype.init = function(graph, layers, scales) {
  gg.guide.base.prototype.init.call(this);
  this._graph = graph;
  this._layers = layers;
  this._scales = scales;
  this._aes = _.chain(scales).keys() //all aes with scale attached, except x,y,_
               .reject(function(aes) {
                 return u.isDerivedAes(aes) || _.indexOf(NO_LEGEND, aes) != -1;
               }).value();
  this._mappings = _.map(layers, function(l) { return l.getMap() });
  this._legends = null; // groups of aes, one group = one legend
}

gg.guide.legend.prototype.group = function() {
  // group aes together where they have the SAME var mapping across ALL layers
  // they can be rendered in the same legend
  this._legends = [];
  var keys = _.clone(this._aes); // this SHOULD make a copy
  while (keys.length > 0) {
    var legend = [];
    var aes = keys.pop();
    var current_mapping = _.pluck(this._mappings, aes);
    var new_mapping = null;
    // start new legend grouping
    legend.push(aes);
    // check other keys that have the exact same var mapping across all layers
    var i = 0;
    while (i < keys.length) {
      new_mapping = _.pluck(this._mappings, keys[i]);
      if (_.isEqual(new_mapping, current_mapping)) {
        legend.push(keys.splice(i, 1)[0]);
      } else{
        i++;
      }
    }
    this._legends.push(legend);
  } // all done!
  return this;
}

/**
 * Render the given legend.
 *
 * @context.canvas - Cartesian coordinate to render the legend.
 */
gg.guide.legend.prototype.render = function(context) {
  if (_.isNull(this._legends)) {
    this.group();
  }
  var self = this;
  var shift, xshift = 0, yshift = 0;
  var orientation = context.position == "bottom" ? "h" : "v"
  _.each(this._legends, function(legend) {
    var newContext = {
      aes: legend,
      canvas : context.canvas.differentOffset(xshift, yshift),
      orientation: orientation,
      chartWidth : context.chartWidth,
      chartHeight : context.chartHeight
    };

    shift = self._renderEach(newContext);
    if (orientation == "h") {
      yshift += shift.y + 15;
    } else {
      yshift += shift.y + 10;
    }
  });
}

gg.guide.legend.prototype._renderEach = function(context) {
  var self = this;
  var aes = context.aes;
  var canvas = context.canvas;

  // since every scale maps the same var, we can just use a sample one to
  // do calculations. BUT always use discrete scale if possible!
  var sample_aes = aes[0];
  var sample_scale = this._scales[sample_aes];
  if (sample_scale.type() == "number") {
    for (var i = 1; i < aes.length; i++) {
      if (this._scales[aes[i]].type() == "category") {
        sample_aes = aes[i];
        sample_scale = this._scales[aes[i]];
        break;
      }
    }
  }

  // get a list of layers...
  var layertypes = [];
  var layers = [];
  for (var i=0; i<this._layers.length; i++) {
    if (this._mappings[i][sample_aes]) {
      layers.push(this._layers[i]);
      layertypes.push(this._layers[i]._cls_name.split(".")[2]);
    }
  }
  layertypes = _.uniq(layertypes);

  // use the layers to define the default stuff
  var scales = { // ...sensible defaults if we have no info
    "color": u.constfunc("#000000"),
    "stroke": u.constfunc("#000000"),
    "strokewidth": u.constfunc(0),
    "symbol": u.constfunc(gg.symbol.DIAMOND),
    "radius": u.constfunc(5), 
    "opacity": u.constfunc(1)
    //"linetype" : ???
  }
  if (layertypes.length == 1) { // ...better defaults if only one layer type
    if (layertypes[0] == "point") {
      scales["symbol"] = u.constfunc(gg.symbol.CIRCLE);
    } else if (layertypes[0] == "line" || layertypes[0] == "path") {
      scales["symbol"] = u.constfunc(gg.symbol.CROSS);
      scales["strokewidth"] = u.constfunc(1);
    }
    _.each(_.keys(scales), function(s) { // ...better yet, get it from the layer
      if (s != "radius") {
        var attr = layers[0].opts(s);
        if (_.isString(attr) || _.isNumber(attr)) {
          scales[s] = u.constfunc(attr);
        }
      }
    });
  }

  // overwrite default with actual scales
  _.each(aes, function(a) {
    scales[a] = _.bind(self._scales[a].apply, self._scales[a], 'data');
  });

  // generate "ticks" (this is why we prefer discrete scale)
  var numticks = sample_scale.type() == "category"
               ? this._graph.levels(sample_aes).length
              : 5; // magic constant for default number of ticks
  var ticks = sample_scale.ticks(numticks);

  // rendering functions
  var _render_tick = (layertypes[0] == "line" || layertypes[0] == "path")
                   ? this._render_line_tick
                   : this._render_point_tick;

  //var yFunction = function(d) { return d.index * 18 + 18};
  var xpos = 0, ypos = 0;
  var _update_xpos = function(elt) { xpos += elt.getBBox().width; }
  var _update_ypos = function(elt) { ypos += elt.getBBox().height; }

  // ACTUAL RENDERING: draw title
  var elt = canvas.text().attr('func', {
    'x': 0,
    'y': 0,
    "font-size": "13px",
    "font-weight": "bold",
    "text-anchor": "start",
    'text': u.constfunc(self._graph._varlabel(sample_aes))
  }).attr('data', {})
  _update_ypos(elt);

  // ACTUAL RENDERING FOR REAL
  var pic, text;
  var width = 0, height = 0;
  _.each(ticks, function(tick) {
    pic = _render_tick(tick, canvas, scales, xpos, ypos);
    text = self._render_label(tick, canvas, xpos+20, ypos);

    if (context.orientation == "v") {
      ypos += Math.max(text.getBBox().height, pic.getBBox().height)
      height = Math.max(height, ypos);
    } else {
      xpos += text.getBBox().width + 40; // 20 for the pic + 20 for padding
      width = Math.max(width, xpos);

      if (xpos > context.chartWidth - text.getBBox().width) {
        // add new line when we guess (based on assumption that next label width
        // is the same as this one) that the next label will go over the 
        // chart width
        ypos += Math.max(text.getBBox().height, pic.getBBox().height)
        height = Math.max(height, ypos);
        xpos = 0;
      }
    }
  });

  if (context.orientation == "h") {
    // add an extra line...
    height += Math.max(text.getBBox().height, pic.getBBox().height);
  }

  return {'y': height, 'x': width}; // height used
}

gg.guide.legend.prototype._render_line_tick = function(tick, canvas, scales, xpos, ypos) {
  return canvas.line().attr('func', {
    'x1': u.constfunc(0),
    'x2': u.constfunc(13),
    'y1': u.constfunc(xpos),
    'y2': u.constfunc(ypos),
    'stroke': scales.color,
    'fill-opacity': scales.opacity,
    'stroke-width': scales.strokewidth
  }).attr('data', tick);
}

gg.guide.legend.prototype._render_point_tick = function(tick, canvas, scales, xpos, ypos) {
  return canvas.point().attr('func', {
    'cx': u.constfunc(xpos+7),
    'cy': u.constfunc(ypos),
    'r': scales.radius,
    'symbol': scales.symbol,
    'fill': scales.color,
    'stroke': scales.stroke,
    'fill-opacity': scales.opacity,
    'stroke-width': scales.strokewidth
  }).attr('data', tick);
}

gg.guide.legend.prototype._render_label = function(tick, canvas, xpos, ypos) {
  return canvas.text().attr('func', {
    'x': u.constfunc(xpos),
    'y': u.constfunc(ypos),
    'font-size': '12px',
    "text-anchor": "start",
    'text': function(d) { return String(d.label) }
  }).attr('data', tick);
}

/*
gg.guide.legend.protoytpe._renderDiscrete = function() {
}

gg.guide.legend.protoytpe._renderGradient = function() {
}
*/

})(gg);
;/**
 * Date : 2/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Author : Jeeyoung Kim
 * Stacked area chart.
 */
;(function(gg) {
gg.layer.area = u.makeClass('gg.layer.area', gg.layer.base);

gg.layer.area.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  this.opts('stroke','none')
    .opts('opacity',0.4)
    .opts('color','steelblue')
    .opts('strokewidth',0)
    .opts('padding',0.5)
};

gg.layer.area.prototype.render = function(context) {
  var coord = context.coord;
  var cell = context.cell;
  var s = context.scales;

  // todo(lisa, 4/22/2012): this logic is WRONG, should be using 0
  var originLocation = context.rawScales.y.opts('domain_low');
  var yOrigin = s.y(originLocation);

  var pointModifier = function(x, y) {
    // to make an area plot, two more points must be added to
    // the list of rendered points.
    var len = x.length;
    x.push(x[x.length-1]);
    x.push(x[0]);
    y.push(yOrigin);
    y.push(yOrigin);
  }
  var x, y;
  x = s.x;
  if (s.y_stack) {
    y = s.y_stack;
  } else {
    y = s.y;
  }
  _.each(context.computedData, function(data) {
    coord.poly().attr('func', {
      x: x,
      y: y,
      _sort: x,
      _pointModifier: pointModifier,
      _style: s
    }).attr('data', data);
  });
}


gg.layer.area.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {
      'color' : 'stroke',
      'group' : ['stroke', 'color']});
}

})(gg);
;/**
 * Date : 1/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */
;(function(gg) {
"use strict";

gg.layer.bar = u.makeClass('gg.layer.bar', gg.layer.base);

gg.layer.bar.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  //this._default_stats = gg.stats.bin;
  var padding = 0;
  if (padding < 0) {
    gg.error(310, "Padding should be between 0 and 0.5");
  }
  if (padding > 0.5) {
    this.warn(310, "Padding should be between 0 and 0.5");
  }
  this.opts('padding',padding).opts('strokewidth',0);
};

gg.layer.bar.prototype.defaultMin = function(aes) {
  if (aes == 'y') {
    return 0;
  }
}

gg.layer.bar.prototype.defaultScales = function() {
  return {
    x: gg.scale.discrete('x')
  };
}

gg.layer.bar.prototype.checkErrors = function(context) {
  // check for errors in the context
  var rs = context.rawScales;
  if (rs.y.type() !== 'number') {
    gg.error(311, 'y scale must be numeric.');
    return true;
  }
  return false;
}

gg.layer.bar.prototype.render = function(context) {
  var coord = context.coord;

  var s = context.scales;

  // var width = context.width;
  var width = context.width;
  var padding = (width/2) * (1 - this.opts('padding') * 2);
  // todo(lisa, 4/22/2012): this logic is WRONG, should be using 0
  var originLocation = context.rawScales.y.opts('domain_low');
  if (!_.isNumber(originLocation)) {
    this.warn(-2, "originLocation is numeric.");
  }
  var yOrigin;

  var y2 = null;
  var y1 = null;
  var x1, x2;
  if (context.align == 'center') {
    x2 = u.add(s.x, padding);
    x1 = u.sub(s.x, padding);
  } else if (context.align == 'left') {
    var reversePadding = width / 2 - padding;
    x2 = u.add(s.x, reversePadding + padding * 2);
    x1 = u.add(s.x, reversePadding);
  }

  if (s.y_1 && s.y_2) {
    y1 = s.y_1;
    y2 = s.y_2;
  } else if (s.y_override) {
    // summed bar chart.
    y1 = s.y_override;
    yOrigin = y1(originLocation);
    y2 = yOrigin;
  } else {
    // normal, "identity" bar chart.
    y1 = s.y;
    yOrigin = y1(originLocation);
    y2 = yOrigin;
  }

  context.computedData.each(function(obj) {
    coord.rect()
      .attr('func', {
        x1:x1, x2:x2,
        y1:y1, y2:y2,
        _style:s
      })
      .attr('data', obj);
  });
}

gg.layer.bar.prototype.hasGroup = function() { return false; }

})(gg);
;/**
 * Date : 1/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */

;(function(gg) {
"use strict";
gg.layer.box = u.makeClass('gg.layer.box', gg.layer.base);

gg.layer.box.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  var padding = 0;
  if (padding < 0) {
    gg.error(310, "Padding should be between 0 and 0.5");
  }
  if (padding > 0.5) {
    this.warn(310, "Padding should be between 0 and 0.5");
  }

  // more default stuff
  var self = this;
  _.each(gg.opts.box, function(v, k) { self.opts(k, v); });

  this.opts('padding',padding)
  this._default_stats = gg.stats.box;
};

gg.layer.box.prototype.defaultMin = function(aes) {
  if (aes == 'y') {
    // TODO(Jee) - hack for now - returning 0 for log scale sucks.
    return 0;
  }
}

gg.layer.box.prototype.checkErrors = function(context) {
  // check for any errors that might belong in the layer.
  var mapped = _.keys(this.getMap());
  if (_.include(mapped, 'y')) {
    return false;
  }
  this.warn(320, "No mapping has been set in layer "+this._cls_name);
  return true;
}


gg.layer.box.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;

  var width = context.width;
  var padding = (width/2) * (1 - this.opts('padding') * 2);
  var x1, x2, x;
  if (context.align == 'center') {
    x2 = u.add(s.x, padding);
    x1 = u.sub(s.x, padding);
    x = s.x;
  } else if (context.align == 'left') {
    var reversePadding = width / 2 - padding;
    x2 = u.add(s.x, reversePadding + padding * 2);
    x1 = u.add(s.x, reversePadding);
    x = u.add(s.x, padding);
  }

  if (!s.y_q0) s.y_q0 = s.y;
  if (!s.y_q1) s.y_q1 = s.y;
  if (!s.y_q2) s.y_q2 = s.y;
  if (!s.y_q3) s.y_q3 = s.y;
  if (!s.y_q4) s.y_q4 = s.y;

  context.computedData.each(function(data) {
    coord.vline().attr('func', {
      y1 : s.y_q0, y2 : s.y_q1,
      x : x,
      _style : s
    }).attr('data', data);
    coord.vline().attr('func', {
      y1 : s.y_q3, y2 : s.y_q4,
      x : x,
      _style : s
    }).attr('data', data);
    coord.rect().attr('func', {
      x1 : x1, x2 : x2,
      y1 : s.y_q1,
      y2 : s.y_q3,
      _style : s
    }).attr('data', data);
    coord.hline().attr('func', {
      x1 : x1, x2 : x2,
      y : s.y_q4,
      _style: s
    }).attr('data', data);
    coord.hline().attr('func', {
      x1 : x1, x2 : x2,
      y : s.y_q2,
      _style: s
    }).attr('data', data);
    coord.hline().attr('func', {
      x1 : x1, x2 : x2,
      y : s.y_q0,
      _style: s
    }).attr('data', data);
  });
}

gg.layer.box.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(this, mapping, {'group':'x'});
}

gg.layer.box.prototype.hasGroup = function() { return false; }

gg.layer.box.prototype.checkErrors = function(context) {
  // check for errors in the context
  var rs = context.rawScales;
  if (rs.y.type() !== 'number') {
    gg.error(311, 'y scale must be numeric.');
    return true;
  }
  return false;
}

})(gg);
;/**
 * Date : 2/18/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author : Jeeyoung Kim
 **/
;(function(gg) {
"use strict";

gg.layer.histo = u.makeClass('gg.layer.histo', gg.layer.bar);

gg.layer.histo.prototype.init = function() {
  gg.layer.bar.prototype.init.call(this);
  this._default_stats = gg.stats.bin;
}

})(gg)
;/**
 * Date : 3/14/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg) {
"use strict";
gg.layer.jitter = u.makeClass('gg.layer.jitter', gg.layer.base);

gg.layer.jitter.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  // what are difference between them
  this.opts('radius', 3);
  this.opts('symbol', gg.symbol.CIRCLE);
};

gg.layer.jitter.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;
  // TODO - store them in a variable:w
  var jitterX = 20;
  var jitterY = 20;
  var attr = {
    'cx': function(d){ return s.x(d) + jitterX * (Math.random() - 0.5)},
    'cy': function(d){ return s.y(d) + jitterY * (Math.random() - 0.5)},
    'r' : s.radius,
    'symbol' : s.symbol,
    stroke:s.stroke,
    'stroke-width':s.strokewidth,
    'fill-opacity':s.opacity,
    fill:s.color
  };
  context.computedData.each(function(obj) {
    coord.point()
      .attr('func', attr)
      .attr('data', obj);
  });
}

gg.layer.jitter.prototype.hasGroup = function() { return false; }

})(gg);
;/**
 * Date : 2/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Statistics for line chart.
 */
;(function(gg) {
"use strict";
gg.layer.line = u.makeClass('gg.layer.line', gg.layer.base);

gg.layer.line.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  var self = this;
  _.each(gg.opts.line, function(v, k) { self.opts(k, v); });
};

gg.layer.line.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;

  var y;
  if (s.y_override) {
    y = s.y_override
  } else {
    y = s.y
  }

  _.each(context.computedData, function(data) {
    coord.poly().attr('func', {
      x: s.x,
      y: y,
      _sort: s.x,
      stroke : s.color,
      fill: 'none',
      'stroke-width': s.strokewidth
    }).attr('data', data);
  });
}

gg.layer.line.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {'group' : ['stroke', 'color']});
}

gg.layer.line.prototype.defaultMin = function(aes) {
  if (aes == 'y') {
    return 0;
  }
}

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */
;(function(gg){
"use strict";
gg.layer.path = u.makeClass('gg.layer.path', gg.layer.base);

gg.layer.path.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  var self = this;
  _.each(gg.opts.line, function(v, k) { self.opts(k, v); });
};

gg.layer.path.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;

  _.each(context.computedData, function(data) {
    coord.poly().attr('func', {
      x: s.x,
      y: s.y,
      stroke : s.color,
      fill: 'none',
      'stroke-width': s.strokewidth
    }).attr('data', data);
  });
}

gg.layer.line.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {'group' : ['stroke', 'color']}); }

})(gg)
;/**
 * Date : 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg) {
"use strict";
gg.layer.point = u.makeClass('gg.layer.point', gg.layer.base);

gg.layer.point.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  // what are difference between them
  this.opts('radius', 3);
  this.opts('symbol', gg.symbol.CIRCLE);
};

gg.layer.point.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;
  var attrs = {
    'cx' : s.x,
    'cy' : s.y,
    'r' : s.radius,
    'symbol' : s.symbol,
    _style: s
  }
  // var tooltip = this._graph.opts('tooltip');
  var tooltip = this.opts('tooltip');
  context.computedData.each(function(obj) {
    u.addTooltip(coord.point().attr('func', attrs)
      .attr('data', obj), tooltip);
  }, this.opts('render-max'));
}

gg.layer.point.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {'color' : 'stroke'});

}

gg.layer.point.prototype.hasGroup = function() { return false; }

gg.layer.base.prototype.requiredMap = function() {
  return ['x', 'y'];
};


})(gg);
;/**
 * Date : 2/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Author : Jeeyoung Kim
 * Text
 */

;(function(gg){
"use strict";
gg.layer.text = u.makeClass('gg.layer.text', gg.layer.base);

gg.layer.text.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  var self = this;
  _.each(gg.opts.text, function(v, k) { self.opts(k, v); });
};

gg.layer.text.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;
  context.computedData.each(function(obj) {
    coord.text().attr('func', {
      x: s.x,
      y: s.y,
      text: s.text,
      fill: s.color,
      'fill-opacity': s.opacity,
      'font-size': s.fontsize,
      'font-family': s.font
    }).attr('data', obj);
  });
}

gg.layer.text.prototype.hasGroup = function() { return false; }

})(gg);
;/**
 * Date : 2/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Author : Jeeyoung Kim
 * Tile chart.
 */
;(function(gg){
"use strict";
gg.layer.tile = u.makeClass('gg.layer.tile', gg.layer.base);

gg.layer.tile.prototype.init = function() {
  gg.layer.base.prototype.init.call(this);
  this.opts('stroke','none')
    .opts('padding',0.5)
};

gg.layer.tile.prototype.render = function(context) {
  var s = context.scales;
  var width = context.rawScales.x.width();
  var height = context.rawScales.y.width();
  var paddingWidth = (width/2);
  var paddingHeight = (height/2);
  var coord = context.coord;
  context.computedData.each(function(data, idx) {
    coord.rect().attr('func', {
      'x1': u.sub(s.x, paddingWidth),
      'y1': u.sub(s.y, paddingHeight),
      'x2': u.add(s.x, paddingWidth),
      'y2': u.add(s.y, paddingHeight),
      '_style':s
    }).attr('data', data);

  });
}

gg.layer.tile.prototype.hasGroup = function() { return false; }

})(gg);
;/**
 * Date : 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";
gg.scale.continuous = u.makeClass('gg.scale.continuous', gg.scale.base);

gg.scale.continuous.prototype.init = function(transform, min, max) {
  gg.scale.base.prototype.init.call(this);
  this._type = 'number';
  this._d3scale = null;
  this._attr.min = _.isNumber(min) ? min : null;
  this._attr.max = _.isNumber(max) ? max : null;
  this._useDefault = false;
  this._defaultMin = null;
  this._defaultMax = null;
  this.opts('transform', transform || 'linear')
    .opts('expand', 0.05);
  
  if (this.opts('transform') === 'log') {
    this.opts('absolute_min', 1);
  }
}

gg.scale.continuous.prototype.domain = function(domain) {
  if (arguments.length === 1) {
    this.min(domain[0])
    this.max(domain[1])
    return this;
  }
  return [this._attr.domain_low, this._attr.domain_high];
}

gg.scale.continuous.prototype.width = function() {
  if (!this._attr.width) {
    this._attr.width = this._makeWidth();
  }
  return this._attr.width;
}

gg.scale.continuous.prototype.distance = function(v, w) {
  return Math.abs(this._d3scale(v) - this._d3scale(w));
}

gg.scale.continuous.prototype._makeDefaultMinMax = function() {
  var aes = this._aes;
  this._defaultMin = this._graph.defaultMin(aes);
  this._defaultMax = this._graph.defaultMax(aes);

  if (_.isNumber(this._defaultMin) && this._defaultMin < this._attr.absolute_min) {
    this._defaultMin = this._attr.absolute_min;
  }
  if (_.isNumber(this._defaultMax) && this._defaultMax < this._attr.absolute_max) {
    this._defaultMax = this._attr.absolute_max;
  }
}

gg.scale.continuous.prototype._makeWidth = function() {
  var aes = this._aes;
  var level = this._graph.levels(aes, null, this._facetIndex);
  var len = level.length;
  var width;
  if (len <= 1) {
    width = this.rangeSize();
  } else {
    var scaleFunc = _.bind(this._apply, this);
    width = u.minimumDelta(_.map(level, scaleFunc));
  }
  // at least 1 pixel thick.
  return Math.max(width, 1);
}

gg.scale.continuous.prototype._makeDomain = function(){
  var aes = this._aes;
  var minUser = this._attr.min,
      maxUser = this._attr.max;
  var minData, maxData;
  var min = 0, max = 2;

  if (_.isNumber(minUser) && _.isNumber(maxUser)) {
    // everything is set by user; no work to be done, yay!
    min = minUser;
    max = maxUser;
  } else if (this._graph._layers.length > 0) {
    // need to calculate min & max from data
    if (this._graph.isMapped(aes, true)) {
      minData = this._graph.min(aes, null, this._facetIndex);
      maxData = this._graph.max(aes, null, this._facetIndex);
    } else {
      var vals = _.chain(this._graph._layers)
                  .invoke('opts', aes)
                  .value();
      minData = _.min(vals) - 1;
      maxData = _.max(vals) + 1;
    }
    // expand min & max of DATA by a little bit
    if (this.opts('expand') > 0) { // this is assumeing LINEAR scale
      var expand = (maxData - minData) * this.opts('expand');
      if (!(minData === 0 && this._aes == 'y')) {
        minData -= expand;
      }
      maxData += expand;
    }
    // now see if there is an absolute min & max...
    if (_.isNumber(this._defaultMin) && minData < this._defaultMin) {
      minData = this._defaultMin;
    }
    if (_.isNumber(this._defaultMax) && maxData > this._defaultMax) {
      maxData = this._defaultMax;
    }
    // finally, calculate min and max...
    min = _.isNumber(minUser) ? minUser : minData;
    max = _.isNumber(maxUser) ? maxUser : maxData;
  } else {
    // min = 0; max = 2;
  }
  // make sure it is within the absolute range
  if (_.isNumber(this._attr.absolute_min)) {
    min = Math.max(min, this._attr.absolute_min);
  }
  if (_.isNumber(this._attr.absolute_max)) {
    max = Math.min(max, this._attr.absolute_max);
  }
  // error checking
  if (!this._saneNumber(min)) {
    gg.error(406, "min() calculation returned an invalid number.");
  }
  if (!this._saneNumber(max)) {
    gg.error(406, "max() calculation returned an invalid number.");
  }
  if (min > max) {
    gg.error(408, "min is set to be bigger than max in a continuous scale.");
  }
  this.opts('domain_low', min);
  this.opts('domain_high', max);
  return [min, max];
};

gg.scale.continuous.prototype.make = function(facetIndex) {
  if (!this.range()) {
    gg.error(407, "Continuous scale's range is not set.");
  }
  // use d3scale internally for convenience
  this._d3scale = (this.opts('transform') == "log")
                ? d3.scale.log()
                : d3.scale.linear();
  // calculate
  this._facetIndex = _.isNumber(facetIndex) ? facetIndex : -1;
  var domain = this._makeDomain();
  this._d3scale.domain(domain).range(this.range());
  return this;
}

gg.scale.continuous.prototype._apply = function(input) {
  if (!this._d3scale) {
    this.make();
  }
  var EPSILON = gg.opts.epsilon;
  // for null input, scale returns null.
  if (input === null) { return null }
  if (input < this._attr.domain_low - EPSILON ||
      input > this._attr.domain_high+ EPSILON) {
    this.warn(404, "Continuous scale got value "+input+" that is not in the " +
                 "domain ["+this._attr.domain_low +","+this._attr.domain_high+
                 "]");
  }
  return this._d3scale(input);
}

gg.scale.base.prototype.ticks = function(numticks, flip) {
  // some constants
  var EPSILON = 0, // tolerance for numerical calculation error
      min = this._attr.domain_low,
      max = this._attr.domain_high;
  numticks = this._getNumticks(numticks, flip);
  // word
  if (this.opts('transform') == "log") {
    min = Math.max(Math.log(min) / Math.LN10, 0);
    max = Math.log(max) / Math.LN10;
    EPSILON = gg.opts.epsilon;
  }
  var span = max - min;
  // estimate the steps
  var step = Math.pow(10, Math.floor(Math.log(span / numticks) / Math.LN10))
  var error = numticks / span * step; // = step / (span/numticks)
  if (error <= 0.15) { //these numbers came from d3
    step *= 10;
  } else if (error <= 0.35) {
    step *= 5;
  } else if (error <= 0.75) {
    step *= 2;
  }
  // now construct the ticks
  var tickObjects = [];
  var current = Math.ceil(min/step) * step;
  var minExp = -Math.floor(Math.log(step)/Math.LN10)
  while (current <= max + EPSILON) {
    var num = current;
    var pretty = num;
    if (this.opts('transform') == "log") {
      if (num % 1 > EPSILON) { // make the exponential a nice number
        num = Math.floor(num) + Math.log(10*(num % 1))/Math.LN10;
      }
      num = Math.exp(num*Math.LN10);
      if (num < this._attr.domain_low - EPSILON) {
        current+= step;
        continue;
      }
      if (num > this._attr.domain_high + EPSILON) { break; }
      pretty = u.prettify(num);
    } else {
      pretty = u.prettify(num, minExp);//minExp = order of mag. of smallest tick
    }
    tickObjects.push(this._tickObject(num, this.apply(num), pretty));
    current += step;
  }
  return tickObjects;
}

gg.scale.continuous.prototype.CONTINUOUS = true;

})(gg);
;/**
 * Date : 1/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/

;(function(gg) {
"use strict";

gg.scale.discrete = u.makeClass('gg.scale.discrete', gg.scale.base);

gg.scale.discrete.prototype.init = function() {
  gg.scale.base.prototype.init.call(this);
  this._type = 'category';
  this._levels = null;    // levels of the categorical var
  this._eachWidth = null; // width of each element
  this._padding = 0.02;   // percent OR pixel padding
  this._rangeMin = null;  // min of range
}

gg.scale.discrete.prototype.domain = function(levels) {
  if (arguments.length === 0) {
    return this._levels;
  }
  this._levels = levels;
  return this;
}

gg.scale.discrete.prototype.padding = function(padding) {
  if (arguments.length === 0) { // use as getter
    return this._padding;
  }
  u.assertNumber(padding);
  this._padding = padding;
  return this;
}

gg.scale.discrete.prototype.width = function() {
  if (!this._eachWidth)  {
    this.make();
  }
  return this._eachWidth;
}

/* TODO(lisa, 1/31/12): we'll need some way for the user to 
 * specify how they want the levels to be ordered */

gg.scale.discrete.prototype.make = function(facetIndex) {
  if (!this.range()) {
    gg.error(407, "Discrete scale's range is not set.");
  }
  this._facetIndex = _.isNumber(facetIndex) ? facetIndex : -1;
  var range = this.range();
  var width = Math.abs(range[1] - range[0]); // width of the chart
  this._rangeMin = _.min(range)
  // set the levels
  if (!this._levels) {
    this._levels = this._graph.levels(this._aes, null, facetIndex); // get from graph
  }
  // calculate the width of each thing, then account for padding
  this._eachWidth = width / this._levels.length;
  this._eachWidth = Math.abs(this._eachWidth);
  var padding = this._padding >= 1
              ? this._padding                    // padding already in pixel
              : this._eachWidth * this._padding; // convert into pixels
  this._eachWidth -= padding;
  this._padding = padding;

  return this;
}

gg.scale.discrete.prototype._apply = function(input) {
  if (!this._levels) {
    this.make();
  }
  var idx = _.indexOf(this._levels, input); //TODO(lisa, 3/1/11) this is O(n^2)
  if (idx === -1) {
    // TODO(jee) - better error message?
    this.warn(404, "Discrete scale got value "+input+" that is not in the domain.");
  }
  return (this._rangeMin + idx * (this._eachWidth + this._padding)
          + this._padding/2 + this._eachWidth/2);
}

gg.scale.discrete.prototype.ticks = function(numticks, flip) {
  var numticks = this._getNumticks(numticks, flip)
  var step = Math.max(1, Math.round(this._levels.length / numticks));
  var shift = Math.floor(step/2);
  var tickObjects = [];
  for (var i=shift; i < this._levels.length; i += step) {
    tickObjects.push(this._tickObject(this._levels[i],
                                      this.apply(this._levels[i]),
                                      this._levels[i]));
  }
  return tickObjects;
}

gg.scale.discrete.prototype.toCode = function(indent, fnIndent) {
  var scaleObj = { 'cls' : this._cls_name,
                   'funcs' : [['padding', this._padding],
                              ['opts', JSON.stringify(this.getAttr())]]};
  if (this._levels) {
    scaleObj.funcs.push(['domain', JSON.stringify(this._levels)]);
  }
  return u.toCode(indent, fnIndent, scaleObj);
}

gg.scale.discrete.prototype.DISCRETE = false;

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

gg.scale.gradient = u.makeClass('gg.scale.gradient', gg.scale.continuous);

gg.scale.gradient.prototype.init = function(low, high) {
  gg.scale.continuous.prototype.init.call(this);
  this._attr.range_low = low || gg.opts.gradient.low;
  this._attr.range_high = high || gg.opts.gradient.high;
  this._d3scale = null;
}

gg.scale.gradient.prototype.make = function() {
  if (!this.range()) {
    gg.error(407, "Gradient scale's range is not set.");
  }
  if (!_.isNumber(this._attr.min)) this._attr.min = this._graph.min(this._aes)
  if (!_.isNumber(this._attr.max)) this._attr.max = this._graph.max(this._aes)
  this._d3scale = d3.scale.linear()
    .domain([this._attr.min, this._attr.max])
    .range(this.range());
  return this;
};

gg.scale.gradient.prototype._apply = function(input) {
  if (!this._d3scale) {
    this.make();
  }
  return this._d3scale(input);
}

})(gg);
;/**
 * Date : 2/4/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Identity scale. right now, used for symbol for a very hacky reason.
 **/

;(function(gg) {
"use strict";

gg.scale.id= u.makeClass('gg.scale.id', gg.scale.base);

gg.scale.id.prototype.init = function() {
  gg.scale.base.prototype.init.call(this);
  this._type = null;
}

gg.scale.id.prototype.type = function() {
  if (!this._type) {
    this._type = this._graph.type(this._aes);
  }
  return this._type;
}

gg.scale.id.prototype.domain = function() {
  if (this._type == "number") {
    return [this._graph.min(this._aes), this._graph.max(this._aes)]
  }
  return this._graph.levels(this._aes);
}

gg.scale.id.prototype.range = function() {
  return this.domain();
}

gg.scale.id.prototype.make = function() {
  if (this._type == "number") {
    this._attr.min = this._graph.min(this._aes)
    this._attr.max = this._graph.max(this._aes)
  }
}

gg.scale.id.prototype._apply = function(value) {
  return value;
}

/*
// TODO(lisa, 25FEB2012) - this does NOT work...
gg.scale.id.prototype.contTicks = gg.scale.continuous.prototype.ticks
gg.scale.id.prototype.discTicks = gg.scale.discrete.prototype.ticks

gg.scale.id.prototype.ticks = function(numticks) {
  if (this._type == "continuous") {
    var domain = this.domain()
    return gg.scale.continuous().domain(domain).range(domain).ticks(numticks);
  }
  return this.descTicks(numticks);
}
*/

})(gg);
;/**
 * Author : Lisa Zhang
 * Date : 1/15/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";
gg.scale.palette = u.makeClass('gg.scale.palette', gg.scale.discrete);

gg.scale.palette.prototype.init = function(palette) {
  gg.scale.discrete.prototype.init.call(this);
  this._paletteName = palette;
  this._d3scale = null;
}

gg.scale.palette.prototype.make = function(levels) {
  // set the levels
  if (levels) {
    this._levels = levels; // overridable...
  } else if (!this._levels) {
    this._levels = this._graph.levels(this._aes); // get from graph
  }
  var num_levels = this._levels.length;
  if (this._paletteName && false) { //colorbrewer) {
    // use a colorbrewer pallete if paletteName is given and colorbrewer.js 
    // is included
    this._d3scale = d3.scale.ordinal()
      .domain(this._levels)
      .range(colorbrewer[this.paletteName][num_levels]);
  } else if (num_levels <= 10) {
    this._d3scale = d3.scale.category10()
  } else if (num_levels <= 20) {
    this._d3scale = d3.scale.category20()
  } else {
    //@TODO fix this!
    gg.error(405, "Palette scale cannot handle more than 20 cateogries (there are "+num_levels+").");
  }
  return this;
}

gg.scale.palette.prototype._apply = function(input) {
  if (!this._d3scale) {
    this.make();
  }
  return this._d3scale(input);
}


gg.scale.palette.prototype.toCode = function(indent, fnIndent) {
  var scaleObj = { 'cls' : this._cls_name,
                   'funcs' : [['opts', JSON.stringify(this.getAttr())]] };
  if (this._paletteName) {
    scaleObj.params = [u.qt(this._paletteName)]
  }
  if (this._levels) {
    scaleObj.funcs.push(['domain', JSON.stringify(this._levels)]);
  }
  return u.toCode(indent, fnIndent, scaleObj);
}



})(gg);
;/**
 * Date : 2/7/2012
 * Author : Lisa Zhang
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";
gg.scale.symbol = u.makeClass('gg.scale.symbol', gg.scale.discrete);

gg.scale.symbol.prototype.init = function() {
  gg.scale.discrete.prototype.init.call(this);
  this._symbols = [1,2,3,4,5,6,7,8,9]; //TODO(lisa, 7FEB12): get from symbol.js
  this._numSymbols = this._symbols.length
}

gg.scale.symbol.prototype.make = function(levels) {
  // set the levels
  if (levels) {
    this._levels = levels; // overridable...
  } else if (!this._levels) {
    this._levels = this._graph.levels(this._aes); // get from graph
  }
  this._numLevels = this._levels.length;
  return this;
}

gg.scale.symbol.prototype._apply = function(input) {
  if (!this._d3scale) {
    this.make();
  }
  return this._symbols[_.indexOf(this._levels, input) % this._numSymbols];
}
})(gg);
;/**
 * Date : 1/11/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Time scale.
 * 
 * Author : Jeeyoung Kim
 **/

;(function(gg) {

"use strict";
gg.scale.time = u.makeClass('gg.scale.time', gg.scale.continuous);

gg.scale.time.prototype.init = function() {
  gg.scale.continuous.prototype.init.call(this);
  // date ticks need more space, so we need more spacing.
  this.opts('pixel_per_tick_x', 90);
}
gg.scale.time.prototype.make = function(facetIndex) {
  this._facetIndex = _.isNumber(facetIndex) ? facetIndex : -1;
  this._d3scale = d3.time.scale();
  var domain = this._makeDomain();

  this._d3scale.domain(domain).range(this.range())
}

gg.scale.time.prototype._makeDomain = function(){
  var aes = this._aes;
  var min = this.min(); var max = this.max();

  if (_.isUndefined(min) || min === null) {
    min = this._graph.min(aes, null, this._facetIndex);
    this.min(min);
  }

  if (_.isUndefined(max) || max === null) {
    max = this._graph.max(aes, null, this._facetIndex);
    this.max(max);
  }

  return [min, max];
};

gg.scale.time.prototype.ticks = function(numticks) {
  numticks = this._getNumticks(numticks);
  var self = this;
  var d3ticks = this._d3scale.ticks(numticks);
  var tickFormat = this._d3scale.tickFormat(numticks);
  var tickObjects = _.map(d3ticks, function(d3tick) {
    return self._tickObject(
      d3tick,
      self.apply(d3tick),
      tickFormat(d3tick) // convert to string
    )
  });
  return tickObjects;
}

})(gg);
;/**
 * Date : 1/7/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 **/
;(function(gg) {
"use strict";

gg.scale.time_gradient = u.makeClass('gg.scale.time_gradient', gg.scale.time);

gg.scale.time_gradient.prototype.init = function(low, high) {
  gg.scale.time.prototype.init.call(this);
  this._attr.range_low = low || gg.opts.gradient.low;
  this._attr.range_high = high || gg.opts.gradient.high;
  this._d3scale = null;
}

gg.scale.time.prototype.make = function() {
  this._d3scale = d3.time.scale();
  var domain = this._makeDomain();

  this._d3scale.domain(domain).range(this.range())
}

gg.scale.time_gradient.prototype._apply = function(input) {
  if (!this._d3scale) {
    this.make();
  }
  return this._d3scale(input);
}

})(gg);
;// base class for aggregating stats:
// x - can be continuous (binnned) or discrete
// y - should be continuous.

;(function(gg){
"use strict";

gg.stats.aggregate = u.makeClass('gg.stats.aggregate', gg.stats.base);

gg.stats.aggregate.prototype.init = function() {
  gg.stats.base.prototype.init.call(this);
  this.number(12);
}

// getter;
gg.stats.aggregate.prototype.number = function(value) {
  if (arguments.length === 0) {
    return this._attr.number;
  }
  this._attr.number = value;
  return this;
}

gg.stats.aggregate.prototype.calculateStats = function(data, context) {
  var mapping = context.mapping, scales = context.scales;
  var group_stats = mapping.group_stats;
  var width = null;
  var number = this.number();
  var type = null;
  if (group_stats) { type = data.type(group_stats); }
  var scaleOk = true;
  if (scales.x) {
    scaleOk = scales.x.CONTINUOUS;
  }
  // only generate grouping function for the following reason.
  // 1. continuous scale, or no scale.
  // 2. group_stats set.
  // 3. this.number() is set.
  // 4. data type is number or date.
  if (scaleOk && group_stats && number && (type == 'number' || type == 'date')) {
    var funcFactory;
    if (type == 'number') {
      funcFactory = this.createGroupFunction;
    } else if (type == 'date') {
      funcFactory = this.createDateGroupFunction;
    }
    var func = funcFactory(data.min(group_stats), data.max(group_stats), number);

    context.groupFunctions = {group_stats : func};
    context.hasGroupFunction = true;
    context.width = func.width;
  }
  // construct the context, so that it can be used in compute().
  return this.group(data, context)
}

gg.stats.aggregate.prototype.postProcess = function(computed, context) {
  var mapping = context.mapping;
  if (context.hasGroupFunction) {
    var group_stats = mapping.group_stats;
    var func = context.groupFunctions.group_stats;
    _.each(computed, function(data) { 
      var len = data.len();
      for (var idx = 0 ; idx < len; idx++) {
        var obj = data._internal[idx];
        obj[group_stats] = func(obj[group_stats])
      }
    });
  }
  return computed;
}

})(gg);
;/**
 * Date: 1/25/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Binning statistic.
 *
 * aggregated values are stored in "count" variable.
 */
;(function(gg) {
gg.stats.bin = u.makeClass('gg.stats.bin', gg.stats.aggregate);

gg.stats.bin.prototype.compute = function(data, context) {
  // no cloning necessary, because we're already cloning the data inside.
  var result = data.getObject(0);
  result.$count = data.len();
  return gg.data([result]);
}

gg.stats.bin.prototype.imputeMapping = function(map) {
  // refer to the tests for the behavior.
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats' : ['x', 'group'] } );
  // this is suboptimal.
  return _.extend(mapping, {'y':'$count'});
}

gg.stats.bin.prototype.keys = function() {
  return ['$count'];
}

})(gg);
;/**
 * Date : 2/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Statistics for box plot.
 */

;(function(gg){
"use strict";
gg.stats.box = u.makeClass('gg.stats.box', gg.stats.aggregate);

gg.stats.box.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.aggregate.prototype.imputeMapping.call(
    this, map, {'group_stats' : ['group', 'x'] } );
  return _.extend(mapping, {
    y_q0 : '$q0',
    y_q1 : '$q1',
    y_q2 : '$q2',
    y_q3 : '$q3',
    y_q4 : '$q4'
  });
}

gg.stats.box.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var result = data.getObject(0);
  var yMap = mapping.y;
  var row = data.get(yMap);
  var len = row.length;
  var last = len - 1;
  var sorted = _.sortBy(row, u.identity);

  // calculate 0, 1, 2, 4, 5 quantile
  var min = sorted[0];
  var max = sorted[last];
  var q1 = last / 4;
  var q2 = last / 2;
  var q3 = last / 4 * 3;
  var q1val = (sorted[Math.ceil(q1)] + sorted[Math.floor(q1)]) / 2;
  var q2val = (sorted[Math.ceil(q2)] + sorted[Math.floor(q2)]) / 2;
  var q3val = (sorted[Math.ceil(q3)] + sorted[Math.floor(q3)]) / 2;

  result.$q0 = min;
  result.$q1 = q1val;
  result.$q2 = q2val;
  result.$q3 = q3val;
  result.$q4 = max;

  u.assertNumber(q1val);
  u.assertNumber(q2val);
  u.assertNumber(q3val);
  u.assertNumber(min);
  u.assertNumber(max);
  // TODO - mean, quantile calculation.
  return gg.data([result]);
}

gg.stats.box.prototype.keys = function() {
  return ['$q0','$q1','$q2','$q3','$q4']
}

})(gg);
;/**
 * Date: 2/11/2012
 * Author: Lisa Zhang
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Counting statistic.
 *
 * aggregated values are stored in "count" variable.
 */

gg.stats.count = gg.stats.bin;
;/**
 * Date: 1/25/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Identity statistic.
 */

gg.stats.id = u.makeClass('gg.stats.id', gg.stats.base);
;/**
 * Date: 2/22/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */
;(function(gg){
"use strict";

gg.stats.mean = u.makeClass('gg.stats.mean', gg.stats.aggregate);

gg.stats.mean.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var attr = context.attr;
  var result = data.getObject(0);
  var key = mapping.y;
  if (key) {
    var sum = u.sum.apply(data.get(key));
    var mean = sum / data.len();
    result.$mean = mean;
  } else {
    result.$mean = attr.y;
  }

  return gg.data([result]);
};

gg.stats.mean.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {'y_sum':'$mean'});
}

gg.stats.mean.prototype.keys = function() {
  return ['$mean'];
}

})(gg);
;/**
 * Date: 1/25/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Stacking statistics.
 *
 * partial sums are stored in "partial" variable.
 */
;(function(gg) {
"use strict";
gg.stats.stack = u.makeClass('gg.stats.stack', gg.stats.aggregate);

gg.stats.stack.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var attr = context.attr;
  // required mapping is "stack".
  var y_mapping = mapping.y;
  // todo - sort by Y.
  var result = [];
  var length = data.len();
  var partial = 0;
  if (y_mapping) {
    var represent = data.getTypeObj(y_mapping).represent;
    var sort_by = mapping.group_stats || y_mapping;
    var sorter = function(x) { return represent(x[sort_by]) };
    var sorted = _.sortBy(data.getObjects(), sorter);
    var reverse = true;
    for (var i = 0 ; i < length; i++) {
      var j = reverse ? length - i - 1 : i;
      var obj = sorted[j];
      obj.$partial_1 = partial;
      partial += obj[y_mapping];
      obj.$partial_2 = partial;
      result.push(obj)
    }
  } else {
    // stack bunch of 1's.
    var delta = 1;
    for (var i = 0 ; i < length; i++) {
      var obj = data.getObject(i);
      obj.$partial_1 = partial;
      partial += delta;
      obj.$partial_2 = partial;
      result.push(obj)
    }
  }
  return gg.data(result);
}

gg.stats.stack.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {
    'y_1':'$partial_1',
    'y_2':'$partial_2'});
}

gg.stats.stack.prototype.keys = function() {
  return ['$partial_1','$partial_2']
}

})(gg);
;/**
 * Date: 2/22/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */
;(function(gg){
"use strict";

gg.stats.sum = u.makeClass('gg.stats.sum', gg.stats.aggregate);

gg.stats.sum.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var result = data.getObject(0);
  var key = mapping.y;
  if (key) {
    var sum = u.sum.apply(data.get(key));
    result.$sum = sum;
  } else {
    result.$sum = context.attr.y * data.len();
  }

  return gg.data([result]);
};

gg.stats.sum.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {'y_override':'$sum'});
}

gg.stats.sum.prototype.keys = function() {
  return ['$sum'];
}


})(gg);
;;(function(gg){
"use strict";

gg.stats.tilestat = u.makeClass('gg.stats.tilestat', gg.stats.base);

gg.stats.tilestat.prototype.entry = function(data, mapping, attr) {
  var groupFunctions = {}
  if (mapping.x) {
    var x = mapping.x;
    groupFunctions.group = this.createGroupFunction(data.min(x), data.max(x), 10);
    mapping.group = x;
  }
  if (mapping.y) {
    var y = mapping.y;
    groupFunctions.group2 = this.createGroupFunction(data.min(y), data.may(y), 10);
    mapping.group2 = y;
  }

  return this.group(data, mapping, attr, groupFunctions);
}

gg.stats.tilestat.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats_1' : 'x' , 'group_stats_2' : 'y'} );
  return _.extend(mapping, { 'y':'$count' });
}

})(gg);
;/**
 * Date : 2/4/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Author : Jeeyoung Kim
 **/
;(function(gg){
"use strict";
gg.symbol = gg.symbol || {};
// Properties we want to support
// Stroke Color
// Storke Width
// Fill color
// size
// x
// y

var S2SVG = {};
// some mathematical constants. //
var SQRT_2 = Math.sqrt(2)
var SIN_0 = 0
var SIN_60 = Math.sqrt(3) / 2;
var SIN_120 = Math.sqrt(3) / 2;
var SIN_180 = 0
var SIN_240 = -Math.sqrt(3) / 2;
var SIN_300 = -Math.sqrt(3) / 2;

var COS_0 = 1
var COS_60 = 0.5;
var COS_120 = -0.5;
var COS_180 = -1
var COS_240 = -0.5;
var COS_300 = 0.5;

// math needed for pentagram
var INNER_RADIUS = (Math.sqrt(5) - 1) / 4;

var cos10 = function(theta) {
  return Math.cos(Math.PI / 180 * 36 * theta);
}
var sin10 = function(theta) {
  return Math.sin(Math.PI / 180 * 36 * theta);
}

var COS_1_10 = cos10(1);
var COS_2_10 = cos10(2);
var COS_3_10 = cos10(3);
var COS_4_10 = cos10(4);
var COS_5_10 = cos10(5);
var COS_6_10 = cos10(6);
var COS_7_10 = cos10(7);
var COS_8_10 = cos10(8);
var COS_9_10 = cos10(9);

var SIN_1_10 = sin10(1);
var SIN_2_10 = sin10(2);
var SIN_3_10 = sin10(3);
var SIN_4_10 = sin10(4);
var SIN_5_10 = sin10(5);
var SIN_6_10 = sin10(6);
var SIN_7_10 = sin10(7);
var SIN_8_10 = sin10(8);
var SIN_9_10 = sin10(9);

var CIRCLE = 1;
var BOX = 2;
var DIAMOND = 3;
var HEX = 4;
var TRIANGLE = 5;
var TRIANGLE_REVERSE = 6;
var STAR = 7;
var CROSS = 8;
var X = 9;

gg.symbol.CIRCLE = CIRCLE;
gg.symbol.BOX = BOX;
gg.symbol.DIAMOND = DIAMOND;
gg.symbol.HEX = HEX;
gg.symbol.TRIANGLE = TRIANGLE;
gg.symbol.TRIANGLE_REVERSE = TRIANGLE_REVERSE;
gg.symbol.STAR = STAR;
gg.symbol.CROSS = CROSS;
gg.symbol.X = X;

// end of constants
////////////////////////////////////////////////////////////////////////////////

gg.symbol.makePath = function(shape, x, y, r) {
  // render the given shape, as a SVG path.
  var s; // tmp variable.
  if (shape == CIRCLE) {
    // draw circle using svg path commands.
    return [
      ['M', x, y+r],
      ['A', r, r, 0, 1, 1, x, y - r],
      ['A', r, r, 0, 1, 1, x, y + r],
      ['Z']
    ];
  } else if (shape == BOX) {
    return [
      ['M', x+r, y+r],
      ['L', x-r, y+r],
      ['L', x-r, y-r],
      ['L', x+r, y-r],
      ['Z']
    ];
  } else if (shape == DIAMOND) {
    return [
      ['M', x+r, y],
      ['L', x, y+r],
      ['L', x-r, y],
      ['L', x, y-r],
      ['Z']
    ];
  } else if (shape == HEX) {
    return [
      ['M', x + r * SIN_0,   y + r * COS_0],
      ['L', x + r * SIN_60,  y + r * COS_60],
      ['L', x + r * SIN_120, y + r * COS_120],
      ['L', x + r * SIN_180, y + r * COS_180],
      ['L', x + r * SIN_240, y + r * COS_240],
      ['L', x + r * SIN_300, y + r * COS_300],
      ['Z']
    ];
  } else if (shape == TRIANGLE_REVERSE) {
    return [
      ['M', x + r * SIN_0,   y + r * COS_0],
      ['L', x + r * SIN_120, y + r * COS_120],
      ['L', x + r * SIN_240, y + r * COS_240],
      ['Z']
    ];
  } else if (shape == TRIANGLE) {
    return [
      ['M', x + r * SIN_60,  y + r * COS_60],
      ['L', x + r * SIN_180, y + r * COS_180],
      ['L', x + r * SIN_300, y + r * COS_300],
      ['Z']
    ];
  } else if (shape == STAR) {
    s = r * INNER_RADIUS;
    return [
      ['M', x + s * SIN_0, y + s * COS_0],
      ['L', x + r * SIN_1_10, y + r * COS_1_10],
      ['L', x + s * SIN_2_10, y + s * COS_2_10],
      ['L', x + r * SIN_3_10, y + r * COS_3_10],
      ['L', x + s * SIN_4_10, y + s * COS_4_10],
      ['L', x + r * SIN_5_10, y + r * COS_5_10],
      ['L', x + s * SIN_6_10, y + s * COS_6_10],
      ['L', x + r * SIN_7_10, y + r * COS_7_10],
      ['L', x + s * SIN_8_10, y + s * COS_8_10],
      ['L', x + r * SIN_9_10, y + r * COS_9_10],
      ['Z']
    ];
  } else if (shape == CROSS) {
    return [
      ['M', x+r, y],
      ['L', x, y],
      ['L', x, y+r],
      ['L', x, y],
      ['L', x-r, y],
      ['L', x, y],
      ['L', x, y-r],
      ['L', x, y],
      ['Z']
    ];
  } else if (shape == X) {
    s = r * SQRT_2 / 2;
    return [
      ['M', x+s, y+s],
      ['L', x, y],
      ['L', x+s, y-s],
      ['L', x, y],
      ['L', x-s, y+s],
      ['L', x, y],
      ['L', x-s, y-s],
      ['L', x, y],
      ['Z']
    ];
  }
};

})(gg);
;;(function(gg) {
"use strict";

gg.type.category = u.makeClass('gg.type.category', gg.type.base);

gg.type.category.prototype.min = function(values) {
  gg.error(802, "Invalid operation min() on categorical variable.")
}

gg.type.category.prototype.max = function(values) {
  gg.error(802, "Invalid operation max() on categorical variable.")
}

gg.type.category.prototype.coerce = function(value) {
  return value
}

gg.type.category.prototype.represent = function(value) {
  return value
}

gg.type.category.prototype.validate = function(value) {
  return true;
}

gg.type.category.prototype.defaultScale = function(aes) {
  u.assertAes(aes);
  var scale = null;
  var scaleCls = {
    color: gg.scale.palette,
    opacity: gg.scale.discrete,
    radius: gg.scale.discrete,
    stroke: gg.scale.palette,
    strokewidth: gg.scale.discrete,
    symbol: gg.scale.symbol,
    x: gg.scale.discrete,
    y: gg.scale.discrete
  }[aes];

  if (scaleCls) {
    scale = scaleCls();
  } else {
    scale = gg.scale.id();
  }

  this._postProcess(aes, scale);
  return scale;
}

})(gg);
;;(function(gg) {
"use strict";

gg.type.date = u.makeClass('gg.type.date', gg.type.base);

var _extractTime = function(date) { return date.getTime() };
gg.type.date.prototype.min = function(values) {
  return _.min(_.reject(values, _.isNull), _extractTime);
}

gg.type.date.prototype.max = function(values) {
  return _.max(_.reject(values, _.isNull), _extractTime);
}

gg.type.date.prototype.coerce = function(value) {
  return new Date(value);
}

gg.type.date.prototype.represent = function(value) {
  if(!value) return 0;
  return value.getTime();
}

gg.type.date.prototype.validate = function(value) {
  return _.isDate(value);
}

gg.type.date.prototype.defaultScale = function(aes) {
  u.assertAes(aes);
  var scale = null;
  var scaleCls = {
    color: gg.scale.time_gradient,
    opacity: gg.scale.time,
    radius: gg.scale.time,
    stroke: gg.scale.time_gradient,
    strokewidth: gg.scale.time,
    symbol: gg.scale.symbol,
    x: gg.scale.time,
    y: gg.scale.time
  }[aes];

  if (scaleCls) {
    scale = scaleCls();
  } else {
    scale = gg.scale.id();
  }

  this._postProcess(aes, scale);
  return scale;
}

})(gg);
;;(function(gg) {
"use strict";

gg.type.number = u.makeClass('gg.type.number', gg.type.base);

gg.type.number.prototype.min = function(values) {
  return _.min(_.reject(values, _.isNull));
}

gg.type.number.prototype.max = function(values) {
  return _.max(_.reject(values, _.isNull));
}

gg.type.number.prototype.coerce = function(value) {
  return Number(value);
}

gg.type.number.prototype.represent = function(value) {
  return value;
}

gg.type.number.prototype.validate = function(value) {
  return _.isNumber(value);
}

gg.type.number.prototype.defaultScale = function(aes) {
  u.assertAes(aes);
  var scale = null;
  var scaleCls = {
    color: gg.scale.gradient,
    opacity: gg.scale.continuous,
    radius: gg.scale.continuous,
    stroke: gg.scale.gradient,
    strokewidth: gg.scale.continuous,
    symbol: gg.scale.symbol,
    x: gg.scale.continuous,
    y: gg.scale.continuous
  }[aes];

  if (scaleCls) {
    scale = scaleCls();
  } else {
    scale = gg.scale.id();
  }

  this._postProcess(aes, scale);
  return scale;
}

})(gg);
;;(function(gg) {
"use strict";

gg.type.unknown = u.makeClass('gg.type.unknown', gg.type.base);

gg.type.unknown.prototype.min = function(values) {
  return null;
}

gg.type.unknown.prototype.max = function(values) {
  return null;
}

gg.type.unknown.prototype.coerce = function(value) {
  return value
}

gg.type.unknown.prototype.represent = function(value) {
  return value;
}

gg.type.unknown.prototype.validate = function(value) {
  return true;
}

gg.type.unknown.prototype.defaultScale = function(aes) {
  gg.error(801, "Attempted to call defaultScale() on unknown type.");
}

})(gg);
;/**
 * Date : 2/11/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 */

var packageFunction = function(gg, obj) {
  obj = obj || {};

  var pkg = function(fromObj, names) {
    if (!fromObj) {
      gg.error(1, "Attempting to package an object that does not exist.")
    }
    var len = names.length;
    for (var i = 0; i < len; i++) {
      var name = names[i];
      if (obj[name]) {
        gg.error(3, "gg."+name+" is already set.");
      } else {
        if (!fromObj[name]) {
          gg.error(2, 'Failed while packing ' + name + '.');
        }
        obj[name] = fromObj[name]
      }
    }
  }

  pkg(gg.coord, ['cart', 'polar']);
  pkg(gg.facet, ['grid', 'wrap']);
  pkg(gg.guide, ['axis', 'legend']);
  pkg(gg.layer, ['area', 'bar', 'box', 'line', 'path', 'point', 'text', 'tile']);
  pkg(gg.scale, ['continuous', 'discrete', 'gradient', 'id', 'palette', 'time']);
  pkg(gg.stats, ['bin', 'stack', 'count']);
  return obj;
};

packageFunction(gg, gg);
;/**
 * Date: 3/14/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Partial sum, with ratio between them calculated.
 */
;(function(gg) {
"use strict";
gg.stats.ratio = u.makeClass('gg.stats.ratio', gg.stats.stack);

gg.stats.ratio.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var attr = context.attr;
  var y_mapping = mapping.y;
  // todo - sort by Y.
  var result = [];
  var length = data.len();
  var partial = 0;
  if (y_mapping) {
    var total = u.sum.apply(data.get(y_mapping));
    var represent = data.getTypeObj(y_mapping).represent;
    var sorter = function(x) { return represent(x[y_mapping]) };
    var sorted = _.sortBy(data.getObjects(), sorter);
    var reverse = true;
    for (var i = 0 ; i < length; i++) {
      var j = reverse ? length - i - 1 : i;
      var obj = sorted[j];
      var delta;
      if (total == 0) { delta = 1 / length;
      } else { delta = (obj[y_mapping] / total); }
      obj.$partial_1 = partial;
      partial += delta;
      obj.$partial_2 = partial;
      obj[y_mapping] = delta;
      result.push(obj)
    }
  } else {
    var delta = 1 / length;
    // stack bunch of 1's.
    for (var i = 0 ; i < length; i++) {
      var obj = data.getObject(i);
      obj.$partial_1 = partial;
      partial += delta;
      obj.$partial_2 = partial;
      result.push(obj)
    }
  }
  return gg.data(result);
}

})(gg);
;
return gg;})();
