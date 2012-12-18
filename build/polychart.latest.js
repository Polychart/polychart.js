/** Generated on 2012-12-18T17:04:24.658989 */
;/**
 * @license Copyright 2012 Beta Cubed. All rights reserved.
 * Polychart.js charting library. 
 * This library uses the following projects.
 *
 * JSON2.js
 * d3.js
 * underscore.js
 * underscore.string.js
 * raphael.js
 */
var gg = (function(){
;/**
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

u.strlenToPixel = function(l, type) {
  // 6 = approximate pixel per word
  // this is VERY crude
  if (type == 'bold') {
    return Math.max(7*l, 0);
  }
  return Math.max(6*l, 0);
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
  var sign = pow > 0 ? '+' : '-'
  return num+'e'+sign+Math.abs(pow);
} 

/* This function will insert a comma at every third position in large numbers */
function formatNumber(n) {
    if (!isFinite(n)) {
        return n;
    }
    var s = ""+n, abs = Math.abs(n), _, i;
    if (abs >= 1000) {
        _  = (""+abs).split(/\./);
        i  = _[0].length % 3 || 3;
        _[0] = s.slice(0,i + (n < 0)) +
               _[0].slice(i).replace(/(\d{3})/g,',$1');
        s = _.join('.');
    }
    return s;
}

/* Round a number and prettify it */
u.prettify = function(num, exp) {
  // figure out the order of mangitude to round things to
  var exp_fixed = 0, exp_precision = 0;
  if (arguments.length == 1) {
    exp = Math.floor(Math.log(Math.abs(num ? num : 1))/Math.LN10);
  } else {
    exp = -exp;
  }

  /*if (arguments.length == 2 && exp == 0) {
    return(formatNumber(num));
  }*/

  if (arguments.length == 2 && (exp == 2 || exp == 5 || exp == 8 || exp == 11)) {
    exp_fixed = exp + 1;
    exp_precision = 1;
  } else if (exp == -1) {
    exp_fixed = 0;
    exp_precision = arguments.length == 2 ? 1 : 2;
  } else if (exp == -2) {
    exp_fixed = 0;
    exp_precision = arguments.length == 2 ? 2 : 3;
  } else if (exp == 1 || exp == 2) {
    exp_fixed = 0;
  } else if (exp > 3 && exp < 6) {
    exp_fixed = 3;
  } else if (exp > 6 && exp < 9) {
    exp_fixed = 6;
  } else if (exp > 9 && exp < 12) {
    exp_fixed = 9;
  } else if (exp > 12 && exp < 15) {
    exp_fixed = 12;
  } else {
    exp_fixed = exp;
    exp_precision = arguments.length == 2 ? 0 : 1;
  }

  var rounded = Math.round(num / Math.pow(10, exp_fixed-exp_precision));
  rounded /= Math.pow(10, exp_precision);
  rounded = rounded.toFixed(exp_precision);
  return u.postfix(formatNumber(rounded), exp_fixed)
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

// create a comparator for comparing objects by multiple keys.
u.compareBy = function(keys) {
  var baseSort = function(a, b) { return (a == b) ? 0 : (a < b) ? -1 : 1; }
  var sortFunc = function(a, b) {
    var i, k, cmp
    for (i = 0; i < keys.length; i++) {
      k = keys[i]
      cmp = baseSort(a[k], b[k]);
      if (cmp !== 0) return cmp;
    }
    return 0;
  }
  return sortFunc;
}

// sort by multiple keys in an array of objs. wrapper for compareBy.
u.sortByMultiple = function(array, keys) {
  return array.sort(u.compareBy(keys));
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
  x.sort();
  if (x.length === 0) {
    return null;
  } else if (x.length === 1) {
    return x[0];
  }
  if (_.isEqual(x, ['date','number'])) {
    return 'date';
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

u.getRandomColor = function() {
  function c() {
    return Math.floor(Math.random()*256).toString(16)
  }
  return "#"+c()+c()+c();
}

})(gg, u);
;
u.isDerivedAes = function(aes) {
  // aes is String, so .indexOf() exists in all browsers.
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
 * Date: 1/5/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * jQuery related functions
 **/

var gg = gg || {};
var u = u || {};

;(function(gg, u) {
  u.jQuery = function() {
    if (!jQuery) {
      gg.error(4, "jQuery is required, but is not found.")
    }
    return jQuery;
  }
})(gg, u);
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

var ggTooltip = function(scales) {
  // this = raphael element
  if (scales.tooltip) {
    var tooltip = scales.tooltip;
    u.addTooltip(this, tooltip);
  }
  return this; // for chaining.
};

var ggDoubleClick = function(handler, layer) {
  // this = raphael element
  if (handler) {
    var handlerWrapper = function() {
      var data = this.attr('data');
      handler.call(this, data, layer);
    }
    this.dblclick(handlerWrapper);
  }
  return this;
}

var _gg_decorate = function(element) {
  // add polychart specific methods.
  element.ggTooltip = ggTooltip;
  element.ggDoubleClick = ggDoubleClick;
};

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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
    return u.d3_arc(ox, oy, r0, r1, a0, a1)
  }
};

u.d3_arc = function(ox, oy, r0, r1, a0, a1) {
  // expose the arc calculation function.
  if (r1 < r0) {
    // swap r0 and r1.
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
  _gg_decorate(elem);
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
    if (!(_.isNumber(rawT) && _.isNumber(rawR)) ||
        (_.isNaN(rawT) || _.isNaN(rawR))) { continue }
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
  _gg_decorate(elem);
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

u.Raphael = Raphael;

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

var _target = function(event) {
  // extract the target of the given DOM event.
  // srcElement is only available in chrome.
  return (event.originalTarget || event.srcElement)
}

var _addTooltip_mouseover = function(event) {
  // this - context passed from u.addTooltip
  var tooltipFn = this.tooltipFn;
  var element = this.element;
  var title = tooltipFn(element.attr('data'));
  if (!title) { return };
  $(_target(event)).tooltip({
    title: title,
    helper: $('#polychart-helper'),
    // helper: $('body'),
    trigger: 'manual',
    placement: 'left'
  }).tooltip('show');
};
var _addTooltip_mouseout = function(event) {
  $(_target(event)).tooltip('hide');
};

u.addTooltip = function(element, tooltipFn) {
  if (tooltipFn) {
    var ctx = {tooltipFn:tooltipFn, element:element};
    element.hover(_addTooltip_mouseover, _addTooltip_mouseout, ctx, ctx);
  }
  return element;
}

u.unbindAll = function(element) {
  // prepare the raphael object for destruction.
  if (element.events) {
    var events = element.events;
    for (var i = 0; i < events.length; i++) {
      var event = events[i];
      event.unbind();
    }
  }

  // free all the data.
  element.removeData();

  // free all the member object.
  for (var key in element) {
    delete element[key]
  }
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
  /*
  // add the stack trace - chrome only.
  if (console && console.trace) { this.stack = console.trace() }
  */
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

gg.opts.pivot = {
  // default width and height
  'width' : 300,
  'height' : 300,
  'stat' : 'sum',
  'columnFormatter' : null,
  'rowFormatter': null,
  'title' : null,
  'title-column' : null,
  'title-row' :  null,
  'title-all': 'all'
}

gg.opts.graph = {
  // default width and height
  'width' : 300,
  'height' : 300,
  'padding-left': null,
  'padding-right': null,
  'padding-top': null,
  'padding-bottom': null,
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
  // -- branding.
  'branding' : true,
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
  'tooltip' : null,

  // -- callback supports.
  'callback-warn' : null
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
  'tooltip',
  'x',
  'y'
];

gg.opts.aes.sort(); // sort the input

gg.opts.mainFill = 'steelblue';
gg.opts.mainColor = 'black';

gg.opts.layer = {
  'x' : '',
  'y' : 1,
  'color' : gg.opts.mainFill,
  'opacity' : 0.9,
  'stroke': "#FFFFFF",
  'strokewidth': 0,
  'facet' : true,
  'radius' : 3,
  // renders graph or not.
  'visible' : true,
  // maximum # of artifacts to render per layer.
  'render-max' : 400
};

gg.opts.point= {
  'stroke' : gg.opts.mainColor,
  'strokewidth' : 1,
  'radius' : 6,
  'padding' : 0
}

gg.opts.box = {
  'stroke' : gg.opts.mainColor,
  'strokewidth' : 1,
  'padding' : 0.1,
  'width' : 1,
  'align' : 'center'
}

gg.opts.bar = {
  'stroke' : gg.opts.mainColor,
  'strokewidth' : 1,
  'width' : 1,
  'align' : 'center'
}

gg.opts.line = {
  'color' : gg.opts.mainColor,
  'strokewidth' : 2,
  'padding' : 0.5,
  'radius' : 6 
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
  // legend
  this._legend = {}
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
      // returns null on many browser, "" on IE.
      if (id !== null && id !== '') {
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

gg.graph.prototype.getLayerIndex = function(layer) {
  for (var i = 0 ; i < this._layers.length; i++) {
    if (layer == this._layers[i]) {
      return i;
    }
  }
  return -1;
}

gg.graph.prototype.removeLayer = function(layer) {
  var len = this._layers.length;
  // remove the given layer.
  this._layers = _.without(this._layers, layer);
  // is the layers modified?
  return len !== this._layers.length;
}

gg.graph.prototype.addLayer = function(layer, index) {
  layer = u.instantiate(layer);
  if (!layer) {
    gg.error(201, "Attempting to add an undefined or malformed layer: "+layer)
  }
  var cloned = u.cloneobj(layer);
  cloned.attach(this);

  if (index === null) {
    this._layers.push(cloned);
  } else {
    this._layers.splice(index, 0, cloned);
  }
  return this;
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

gg.graph.prototype.defaultMin = function(aes, provided) {
  if (this._layers.length === 0) return null;
  var result = _.chain(this._layers).invoke('defaultMin', aes, provided).filter(_.isNumber).min().value();
  if (result != Infinity) return result
  return null;
}

gg.graph.prototype.defaultMax = function(aes, provided) {
  if (this._layers.length === 0) return null;
  var result = _.chain(this._layers).invoke('defaultMax', aes, provided).filter(_.isNumber).max().value();
  if (result != -Infinity) return result
  return null;
}

gg.graph.prototype.opts = u.opts();

gg.graph.prototype.warn = function(code, msg) {
  // this can be overridden for new error messages.
  var callback = this.opts('callback-warn');
  if (!callback) {
    // default fallback.
    gg.warn(code, msg);
  } else {
    callback({code:code, message:msg});
  }
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
  this._clearDimCache();
}

gg.graph.prototype.layer = function(layer) {
  return this.addLayer(layer, null);
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

gg.graph.prototype.dimensions = function(flush) {
  // wrapper around _calculateDims().
  if (!this._dimCache || flush === true) {
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

  // facet
  var ncol = this._facet ? this._facet.ncol() : 1;
  var nrow = this._facet ? this._facet.nrow() : 1;
  var hasFacet = nrow*ncol > 1;

  // calculate paddings
  var pLeftDefault = 50,
      pRightDefault = 50,
      pTopDefault = 20,
      pBottomDefault = 50,
      axisWidth = 0,
      legendWidth = 0,
      legendHeight = 0;

  var pTop =   this.opts('padding-top')    == null ? pTopDefault :    this.opts('padding-top'),
      pLeft =  this.opts('padding-left')   == null ? pLeftDefault :   this.opts('padding-left'),
      pRight = this.opts('padding-right')  == null ? pRightDefault :  this.opts('padding-right'),
      pBottom= this.opts('padding-bottom') == null ? pBottomDefault : this.opts('padding-bottom');
  if (this._legend && this._legend._aes) {
    legendWidth = this._legend.width();
    legendHeight = this._legend.height();
  }
  if (this._axes && this._axes.y) {
    axisWidth = this._axes.y.width()
  }

  var yAxisPos = this.opts('axis-y'),
      xAxisPos = this.opts('axis-x'),
      legendPos = this.opts('legend-position');

  pTop = Math.max(
           pTop,
           30+(xAxisPos=="top")*25 - hasFacet*this.opts('spacing-x')
         );
  pBottom = Math.max(
              pBottom,
              30+(xAxisPos=="bottom")*20+legendHeight
            );
  pLeft = Math.max(
            Math.min(
              30+(yAxisPos=='left')*axisWidth+(legendPos=="left")*legendWidth,
              this.opts('width') * 0.25
            ), pLeft
          );
  pRight = Math.max(
            Math.min(
              15+(yAxisPos=='right')*axisWidth+(legendPos=='right')*legendWidth,
              this.opts('width')*0.25
            ), pRight
          );

  // calculate chart width/height
  var chartWidth  = (this.opts('width') - pLeft - pRight);
  var chartHeight = (this.opts('height') - pTop - pBottom);
  u.assertNumber(chartWidth)
  u.assertNumber(chartHeight)

  var spacingX = hasFacet ? this.opts('spacing-x') : 0;
  var spacingY = hasFacet ? this.opts('spacing-y') : 0;

  // calculate xlab and ylab position
  var xLabelY, yLabelX;
  if (xAxisPos=='bottom') {
    xLabelY = pTop + chartHeight + 30;  
  } else {
    xLabelY = 30;
  }

  if (yAxisPos=='left') {
    yLabelX = 15
  } else {
    yLabelX = pLeft + chartWidth + pRight - 5
  }

  var result = {
    ncol : ncol,
    nrow : nrow,
    paddingLeft : pLeft,
    paddingRight : pRight,
    paddingTop : pTop,
    paddingBottom : pBottom,
    chartWidth  : chartWidth,
    chartHeight : chartHeight,
    eachWidth   : (chartWidth - (ncol - 1) * spacingX) / ncol,
    eachHeight  : ((chartHeight - nrow * spacingY) / nrow),
    spacingX    : spacingX,
    spacingY    : spacingY,
    xLabelY : xLabelY,
    yLabelX : yLabelX,
    additionalScales: !!this._legend && !!this._legend._aes
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
    // truncate the first character.
    var id = (dom.charAt(0) == '#') ? dom.substring(1) : dom;
    element = document.getElementById(id);
    if (!element) {
      gg.error(212, "Invalid dom for .opts('dom') - " + dom)
    }
  } else {
    element = dom;
  }
  paper = u.Raphael(element, width, height);
  u.configRaphaelAttributes(paper);

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
var _clearPaper = function(paper) {
  // clear the raphael paper.
  // this should be called whenever we lose reference to raphael paper object
  // to ensure memory is being cleared correctly.
  if (paper) {
    // unbind all the event handlers.
    paper.forEach(function(el) {
      u.unbindAll(el);
    });
    paper.clear();
  }
}
gg.graph.prototype._clearCache = function() {
  _clearPaper(this._paper);
  this._paper = null;
  this._doms = {};
  this._dimCache = null;
  this._rendered = false;
}

gg.graph.prototype._clearCanvas = function() {
  _clearPaper(this._paper);
  this._doms = {};
  this._dimCache = null;
  this._rendered = false;
}

gg.graph.prototype._clearDimCache = function() {
  this._dimCache = null;
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
    var width = this.opts('width');
    var height = this.opts('height');
    this._paper.setSize(width, height);
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
  return c.paddingLeft + col * (c.eachWidth + c.spacingX);
};

gg.graph.prototype.yposition = function(row) {
  var c = this.dimensions();
  return c.paddingTop + row * (c.eachHeight + c.spacingY) + c.spacingY;
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

  // set up the axes before computeScale, since axes dimensions affects
  // graph dimensions, which in turn affect scales
  this._setupAxes();
  // set up legends before computeScale, for the same reason as above
  var position = this.opts("legend-position");
  this._legend = (position != 'none')
               ? gg.guide.legend(this, this._layers, this._scales, position)
               : null;

  this.dimensions(true);

  // **** ADD RANGES AND RUN MAKE ON EACH SCALES
  this.computeScale();
};

gg.graph.prototype.render = function(dom) {
  /**
   * Function to perform all the rendering.
   */
  this._preRender(dom);
  var timer = u.timer();
  this._timer = timer;
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
  // timer.mark('renderPrimary()')
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

  // Branding.
  if (this.opts('branding')) {
    this.render_branding();
  }

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
  this._flip = null;
};

gg.coord.base.prototype.flip = function() {
  this._flip = !this._flip;
}

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
  //return paper.gg_point(this);
  return paper.gg_symbol(this);
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

gg.facet.base.prototype.calculate = function(data) {
  var initializer = function() {
    return data.clone();
  };
  var size = this.nrow() * this.ncol();
  var result = u.array(size, initializer);
  var i, len = data.len();

  for(i = 0; i < len; i++) {
    // Bin each item into result grid.
    var obj = data.getObject(i);
    var idx = this.bin(obj);
    if (idx < size) {
      result[idx].push(obj);
    } else {
      gg.warn(702, "Facet number of cells is too small, "+
                   "ignoring data row number "+i);
    }
  }
  return result;
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
var Mapping = function(value, defaultMapping) {
  if (_.isFunction(value)) {
    if (value._name) {
      this.val = value._name
    } else {
     this.val = _.uniqueId('$func:');
    }
    this.code = value;
    // if the mapping value is a function.
    this.functionMapping = true;
  } else {
    this.val = value;
  }
  // coerce the values to boolean.
  // false if the mapping is user-specified.
  this.defaultMapping = u.bool(defaultMapping);
};

Mapping.prototype.val = null;
Mapping.prototype.code = null;
Mapping.prototype.defaultMapping = false;
Mapping.prototype.functionMapping = false;

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

  this.opts('domain', null);
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
  /*
  if (aes == 'y') {
    return 0;
  }
  */
}

gg.layer.base.prototype.defaultMax = function(aes) {
}

gg.layer.base.prototype.requiredMap = function() {
  // Returns the required mapping for the given layer. //
  return null;
};

gg.layer.base.prototype.calculatePartials = function() {
  // Returns whether statistics should run partial calculation. //
  return false;
}


gg.layer.base.prototype.layerGroup = function() {
  // Returns the natural groupings of data for this layer. //
  return [];
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
    layer_group_aes : this.layerGroup(),
    no_partials : !this.calculatePartials()
    // scales : this._graph._scales // bad
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
  var facet = this._getFacet();
  this._facetedData = facet ? facet.calculate(this.data()) : [this.data()];
  // step 2. statistic computatio on faceted data.
  var calculateStats = _.bind(this.calculateStats, this);
  this._statData = _.map(this._facetedData, calculateStats);
  // step 3. calculate layer-derived values.
  var bindFunctionMapping = _.bind(this._bindFunctionMapping, this);
  _.each(this._statData, function(datas) {
    _.each(datas, bindFunctionMapping);
  });

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
      return val.val;
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
      obj[key] = value.val;
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
  // make y_override ACTUALLY override y...
  if (obj.y && obj.y_override) {
    delete obj.y;
  }
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
        output[key] = _.bind(scale.apply, scale, value.val);
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
  if (true /* width === null */) {
    // for discrete scales.
    width = context.rawScales.x.width();
    context.align = 'center';
  }
  context.width = width;

  if (context.computedData) {
    // false if facetIndex > this._statData.length
    //       if no data point to be plotted
    if (this.opts('visible')) {
      // 'visible' option can be used to disable rendering.
      this.render(context);
    }
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
};

gg.layer.base.prototype._bindFunctionMapping = function(data) {
  var functionMappings = this._getFunctionMappings();
  _.each(functionMappings, function(mapping) {
    var dataKey = mapping.val;
    if (data.hasKey(dataKey)) {
      return
    }
    var fn = mapping.code;
    data.derive(fn, dataKey);
  });
};

gg.layer.base.prototype._getFunctionMappings = function() {
  var result = [];
  _.each(this._attr, function(value, key) {
    if (value instanceof Mapping && value.functionMapping) {
      result.push(value);
    }
  });
  return result;
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
    // omit function mapping.
    if (self.opts(aes).functionMapping) { return; }

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

gg.layer.base.prototype._getFacet = function() {
  if (this._graph) {
    return this._graph.facet()
  }
  return null;
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
    if (k == 'tooltip') {
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

gg.layer.base.prototype.fillZero = function(data, context, vars) {
  var xKey = this.map('x');
  var domain = this.opts('domain');
  var levels = data.levels(xKey);
  var result = data.getRaw().slice();
  var min = context.rawScales.x.opts('domain_low');
  var max = context.rawScales.x.opts('domain_high');
  var value = min;
  var obj = {};
  var setZero = function(v) { obj[v] = 0 };
  while(value <= max) {
    if (!_.include(levels, value)) {
      obj = {};
      obj[xKey] = value;
      _.each(vars, setZero);
      result.push(obj);
    }
    value = domain(value);
  }
  return data.clone(result);
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
    // user set values of min / max
    "min": null,
    "max": null,
    // scale custom absolute min / max.
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
  var defaultMin = this._graph.defaultMin(aes, min);
  var max = this._graph.max(aes)
  var defaultMax = this._graph.defaultMax(aes, max);

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

gg.scale.base.prototype._suggestNumticks = function(numticks, flip, pixelPerTick) {
  /*
  returns a good # of ticks to be used.

  This method follows the following logic:

  1. if numtics is provided, use that.
  2. if opts('numticks') is provided, use that.
  3. if pixelPerTick is provided, guess the number by (range / pixelPerTick).
  4. use opts('pixel_per_tick_x|y') instead for the above formula.
  */
  if (!_.isNumber(numticks)) {
    numticks = null;
  }

  if (numticks === null) {
    // guess the good # of ticks.
    numticks = this.opts('numticks');
    if (_.isNull(numticks)) {
      var range = this.rangeSize()
      if (!(_.isNumber(pixelPerTick) && pixelPerTick > 0)) {
        pixelPerTick = (this._aes == 'x' == Boolean(flip))
                           ? this.opts('pixel_per_tick_y')
                           : this.opts('pixel_per_tick_x');
      }
      numticks = range / pixelPerTick;
    }
  }
  return Math.ceil(numticks);
}

gg.scale.base.prototype.ticks = function(numticks) {
  gg.error(10, "Not implemented.");
}

gg.scale.base.prototype.maxLabelWidth = function() {
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

  // PostProcess -- i.e. calculation of partials
  if (!context.no_partials) {
    var pp_aes = context.mapping.x;
    var regrouped;
    var ppGroup = {};
    if (pp_aes) { // rebucket by pp_aes
      ppGroup[pp_aes] = groupFuncs[pp_aes] || u.identity;
    } 
    regrouped = gg.data.group(computed, ppGroup, filterfunc);

    var levels = {}
    _.each(mapping, function(aes_var, aes_name) {
      var base = u.getBaseAes(aes_name);
      if (base == 'group' && aes_name !== 'group_stats'
            && !levels[aes_name]) {
        levels[aes_var] = data.levels(aes_var);
      }
    });

    computed = this.postProcess(regrouped, context, levels);
  }

  // Group ONLY by layer-level grouping
  var group_aes = context.layer_group_aes || ['group'];
  if (group_aes) {
    var layerGroupsOnly = {};
    _.each(group_aes, function(a) {
      var v = mapping[a];
      if (v) {
        layerGroupsOnly[v] = groupFunctions[v] || u.identity;
      }
    });
    computed = gg.data.group(computed, layerGroupsOnly, filterfunc);
  }
  return computed
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

gg.type.base.prototype.init = function() {
  _.bindAll(this, 'min', 'max');
}

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
    scale.range([0,5]);
  } else if (aes == 'radius') {
    scale.opts('transform', 'sqrt');
    scale.range([0.5,10]);
    scale.min(0);
  }
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
}

gg.stats.aggregate.prototype.calculateStats = function(data, context) {
  var mapping = context.mapping;
  return this.group(data, context)
}

gg.stats.aggregate.prototype.imputeMapping = function(map, opts) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(this, map, opts);
  return mapping;
}

gg.stats.aggregate.prototype.keys = function() {
  return [];
}

gg.stats.aggregate.prototype.makeMeta = function(data) {
  var metas = data.metas();
  var keys = this.keys();
  _.each(keys, function(key) {
    if (!_.contains(metas, key)) {
      metas[key] = {
        type: 'number'
      };
    }
  });
  return metas;
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
  var len = data.len()
  var y_mapping = mapping.y;

  var result = data.getObject(0);
  if (y_mapping) {
    var i = 1; // hack for "need" calculation
    while (i < len &&_.isNull(result[y_mapping])) {
      result = data.getObject(i);
      i++;
    }
    var sum = u.sum.apply(data.get(y_mapping));
    result.$sum = sum;
  } else {
    result.$sum = context.attr.y * data.len();
  }
  var metas = this.makeMeta(data);
  return gg.data([result], metas);
};

gg.stats.sum.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.aggregate.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {
    'y_override': "$sum",
    'y_1':'$partial_1',
    'y_2':'$partial_2'});
}


gg.stats.sum.prototype.keys = function() {
  var sup = gg.stats.aggregate.prototype.keys.call(this);
  return sup.concat(['$sum','$partial_1','$partial_2']);
};

gg.stats.sum.prototype.postProcess = function(computed, context, levels) {
  var result = []      // temporary array to store the processed elts
  var regrouped;       // the final array with $partials calculated
  var keys = _.keys(levels); // keys to sort by
  var offset = { 'plus' : 0, 'minus' : 0 } // separate store for + and - values
  var grp = '';        // either 'plus' or 'minus' (which offset to use)
  var sampleObj = {}   // a sample object from the same x-grouping. used for
                       // new object creation so all aesthetics are not undef
  var pushObj = function(row) {
    // helper function clalculate partials and push to result[]
    grp = row.$sum >= 0 ? 'plus' : 'minus';
    row.$partial_1 = offset[grp];
    row.$partial_2 = row.$partial_1 + row.$sum;
    offset[grp] += row.$sum;
    result.push(row);
  }
  var pushNewItem = function(current) {
    // helper function to add a new object with $sum=0 and push to result[]
    var newItem = _.clone(sampleObj);
    newItem.$partial_1 = offset.plus;
    newItem.$partial_2 = offset.plus;
    newItem.$sum = 0;
    _.each(keys, function(k) {
      newItem[k] = current[k];
    });
    result.push(newItem);
  }

  if (!levels || keys.length === 0) {
    // if no levels are given, then we don't need to worry about filling in new
    // objects with $sum=0. Instead we can just calculate partials for existing
    // objects only. Easy!
    regrouped = _.map(computed, function(data) {
      // reset some vars
      result = [];
      offset = { 'plus' : 0, 'minus' : 0 }
      // do actual calculation
      _.each(data._internal, pushObj);
      return data.clone(result)
    });
  } else {
    // levels are given. we do need to worry about there being an object for
    // every elt in the cartesian product of levels. so
    var dataIndex = 0;   // index of already existing data points
    var obj;             // temporary storage of existing data obj
    var indices = {}     // current multi-index for each level[key]
    var current = {}     // current value of keys represented by the multi-index
    var maxindices = {}  // max index for each level[key], calculated below:
    _.each(levels, function(val, key) {
      maxindices[key] = val.length;
    });

    // some helper functions
    var comparator = u.compareBy(keys); // compares 2 objs and gives -1, 0, or 1
    var setCurrent = function() {
      // figure out the current value of keys represented by current multi-index
      _.each(indices, function(v, k) {
        current[k] = levels[k][v];
      });
    }
    var incrementIndex = function() {
      // increment the multi-index and returns:
      //    true : if incrementation succeeded (more elements to go through)
      //   false : otherwise (no more elts to go through)
      for (var j = keys.length-1; j >= 0; j--) {
        var k = keys[j];
        indices[k]++;
        if (indices[k] < maxindices[k]) {
          return true;
        }
        indices[k] = 0;
      }
      return false;
    }

    // actual calculation!
    regrouped = _.map(computed, function(dataobj) { // for each x
      // reset things;
      _.each(keys, function(k) { indices[k] = 0; });
      result = [];
      offset = { 'plus' : 0, 'minus' : 0 }
      dataIndex = 0;
      // sort the data using the comparator
      var internal = dataobj._internal.sort(comparator);
      sampleObj = internal[0];
      var moreVars = true;
      // ACTUAL actual calculation
      while (moreVars || dataIndex < internal.length) {
        setCurrent();
        if (dataIndex < internal.length &&
            comparator(internal[dataIndex], current) === 0) {
          pushObj(internal[dataIndex]); // item exists!
          dataIndex ++;
        } else {
          pushNewItem(current); // item does not exist!
        }
        moreVars = incrementIndex();
      }
      return dataobj.clone(result);
    });
  }
  return regrouped;
};

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
    scales.x.range([dim.height, dim.y]);
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
// Metadata related methods
////////////////////////////////////////

var META_FIELDS = ['type','parser','format'];
// type - type of the variable.
// parser - javascript function responsible for parsing.
// format - string to generate parser from. different behavior depending on
//   type.

var copyMeta = function(metas) {
  var obj = {};
  _.each(metas, function(value, key) {
    obj[key] = copySingleMeta(value);
  });
  return obj;
}

var copySingleMeta = function(meta) {
  // if meta is a single string, then interpret it as a TYPE.
  if (_.isString(meta)) {
    return {
      type: meta,
      format: null,
      parser: null
    }
  }
  var obj = {};
  for (var idx = 0; idx < META_FIELDS.length; idx++) {
    var field = META_FIELDS[idx];
    var value = meta[field];
    if (value) { obj[field] = value; }
  }
  return obj;
}

var makeMeta = function(type, parser, format) {
  var obj = {};
  if (type) obj.type = type;
  if (parser) obj.parser = parser;
  if (format) obj.format = format;
  return obj;
}

////////////////////////////////////////
// "static" methods
////////////////////////////////////////
gg.data.fetch = function(url, callback, meta) {
  // fetch the data asynchronously.
  // sane way to do async.
  d3.text(url, function(text) {
    var data = null;
    if (/\.csv/.test(url)) {
      // csv parser.
      data = gg.data(text, meta);
    } else {
      var js = JSON.parse(text);
      data = gg.data(js, meta);
    }
    callback(data);
  });
};

gg.data.group = function(datas, groupfuncs, filterfunc) {
  // check filterfunc
  var self = this;
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
  // var keys = datas[0].keys(); // assumed to all be the same... should i check?

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
  return _.map(groupedRaw, function(d) { return datas[0].clone(d); });
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

  var providedKeys = _.keys(data[0]);
  keys = keys ? _.union(keys, providedKeys) : providedKeys;

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
  /*
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
  */
  var masterArray = d3.csv.parseRows(data);
  var topRow = masterArray[0];
  var currentInt = 0;
  var currentDigits = 0;
  var done = false;
    
  for (var i = 0;i < topRow.length; i++) {
    if (topRow[i] == "") {
      topRow[i] = "untitled";
    }
  }
  while (!done) {
    for (var i = 0;i < topRow.length; i++) {
      for (var j = 0;j < topRow.length; j++) {
        if (topRow[i] === topRow[j] && i != j) {
          if (!_.isNull(topRow[j].match(new RegExp("[_][1234567890]*$")))) {
            for (var k = topRow[j].length-1; topRow[j].charAt(k) >= 0 && topRow[j].charAt(k) <= 9; k--) {
              currentInt += topRow[j].charAt(k) * Math.pow(10, topRow[j].length-k-1);
              currentDigits++;
            }
            currentInt++;
            topRow[j] = topRow[j].substring(0, topRow[j].length-currentDigits) + "" + currentInt;
            currentInt = 0;
            currentDigits = 0;
          } else {
            topRow[j] = topRow[j] + "_1";
          }
        }
      }
    }
    done = true;
    for (var i = 0;i < topRow.length; i++) {
      for (var j = 0;j < topRow.length; j++) {
        if (topRow[i] === topRow[j] && i != j) {
          done = false;
        }
      }
    }
  }
  /*
  var nameSet = {}; // remembers the names that it's seen till now.
  var newNames = []; // mapping to new names.
  var MAX = topRow.length + 1;
  for (var i = 0; i < topRow.length; i++) {
    var key = topRow[i];
    if (nameSet[key]) {
      for (var number = 1;number<MAX;number++) {
        var newName = key + "_" + number;
        if (nameSet[newName]) {
          continue
        } else {
          nameSet[newName] = true;
          newNames[i] = newName;
          break;
        }
      }
    } else {
      nameSet[key] = true;
      newNames[i] = key;
    }
  }
  */
  this._unparsed = d3.csv.parse(d3.csv.format(masterArray));
  /*
  this._unparsed = []
  for (var i = 1; i < masterArray.length; i++) {
    var curRow = masterArray[i];
    var obj = {}
    for (var j = 0; j < topRow.length; j++) {
      var curCell = curRow[j];
      var curKey = newNames[j];
      if (!curCell) {
        curCell = null;
      }
      obj[curKey] = curCell;
    }
    this._unparsed.push(obj)
  }
  this._keys = newNames;*/
  this._keys = _.keys(this._unparsed[0])
  for (var i = 0; i < this._unparsed.length; i++) {
    // convert values to float.
    var obj = this._unparsed[i];
    _.each(this._keys, function(k) {
      var num = parseFloat(obj[k]);
      if (num == obj[k]) {
        obj[k] = num;
      }
    });
  }
};

gg.data.prototype.constructData = function(data, meta) {
  var metaProvided = false;
  var keys;
  if (_.isArray(meta)) {
    // meta is array of keys - type information still needs to be guessed.
    keys = _.clone(meta);
    meta = {};
  } else if (!meta) {
    // meta not provided - do the guessing.
    keys = null;
    meta = {};
  } else {
    keys = _.keys(meta);
    meta = copyMeta(meta);
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
    this._meta = {}
  } else {
    this._meta = meta;
    // assert the meta.
  }
  this.guessMeta();
}

gg.data.prototype.guessMeta = function() {
  var meta = this._meta;
  var self = this;
  _.each(this._keys, function(key) {
    if (meta[key] && meta[key].type) {
      return;
    }
    var type = self._guessType(key);
    meta[key] = makeMeta(type);
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
  // clone the current gg.data's metadata.
  array = array || [];
  var data = new gg.data();
  data._keys = _.keys(this._meta);
  data._meta = _.clone(this._meta);
  data._internal = array;
  return data;
}

gg.data.prototype.copy = function() {
  return this.clone(this._internal);
}

gg.data.prototype.transform = function(key, transformation) {
  // transform the input to the given value.
  var output = _.map(this._internal, function(record) {
    var cRecord = _.clone(record);
    cRecord[key] = transformation(cRecord[key]);
    return cRecord;
  });
  return this.clone(output);
}

gg.data.prototype.niceNumber = function(key, rounding) {
  return this.transform(key, function(value) {
    return Math.floor(value / rounding) * rounding;
  });
}

gg.data.prototype.niceDate = function(key, rounding) {
  if (!_.isArray(rounding)) {
    rounding = [rounding];
  }
  return this.transform(key, function(value) {
    var v = new Date(0);
    if (_.isNumber(value)) {
      value = new Date(value)
    }
    _.each(rounding, function(name) {
      // getter
      var c = value['get' + name]();
      // setter
      v['set' + name](c);
    });
    return v - 0;
  });
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

gg.data.prototype.getRaw = function() {
  return this._internal;
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
    'params' : [JSON.stringify(this.getBlock(), null, ' '),
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

gg.data.prototype.hasKey = function(key) {
  return _.indexOf(this._keys, key) > -1;
}

gg.data.prototype.metas = function() {
  return _.clone(this._meta);
}

gg.data.prototype.getMeta = function(key) {
  return this._meta[key];
}

var badValues = function(x) {
  // null or undefined, or an empty string.
  return (x === null || typeof x === 'undefined' || x === '');
}

var isNumber = function(x) {
  return (
    _.isNumber(x) ||
    !_.isNaN(Number(x))
  )
}

gg.data.guessType = function(rawVals) {
  // this function should NEVER guess 'unknown',
  // because it screws things up.
  var vals = _.reject(rawVals, badValues);
  if (vals.length === 0) {
    return 'category';
  } else if (_.all(vals, _.isDate)) {
    return 'date'
  } else if (_.all(vals, isNumber)) {
    return 'number'
  } else {
    return 'category'
  }
}

gg.data.prototype._guessType = function(key) {
  var column = _.pluck(this._unparsed, key);
  return gg.data.guessType(column);
}

gg.data.prototype.type = function(key) {
  var meta = this._meta[key];
  return meta ? meta.type : 'unknown';
}

gg.data.prototype.levels = function(key_or_function) {
  return this._cached('levels', key_or_function,
    function(key) {
      var type = this.getTypeObj(key);
      var vals = _.chain(this._internal)
        .pluck(key)
        .reject(_.isUndefined)
        .reject(_.isNull)
        // .sortBy(type.represent)
        .sortBy(type.represent)
        .uniq(false, type.represent)
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

gg.data.prototype.derive = function(fnString, newvarname, options) {
  // fnstring - function or setring.
  // options - dictionary of the following
  //   dryrun - (boolean) true if the new variable isn't going to be added for real.
  //   type - (string) type of the derived column.
  //   context - (object) context of global functions available for the derivation function.
  options = options || {};
  var dryrun = options.dryrun;
  var context = options.context;
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
      if (dryrun) {
        if (i > 10) break;
      } else {
        d[newvarname] = compute.call(context, d);
      }
    }
    if (dryrun) {
      return { success : true, values : values };
    }

    if (!_.include(this._keys, newvarname)) {
      this._keys.push(newvarname);
    }
    var type = null;
    if (options.type) { type = options.type; }
    else { type = gg.data.guessType(values); }

    this._meta[newvarname] = {
      type: type,
      derived: true
    };
    if (hasFnString) {
      this._meta[newvarname].formula = fnString;
    }
    // return the generated name.
    return newvarname;
  } catch (err) {
    if (dryrun) {
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

gg.data.prototype.renameMany = function(_map) {
  // TODO - run assertion.
  var self = this;
  var map = {};
  var failed = false;
  _.each(_map, function(to, from) {
    var toStr = to.toString();
    if (toStr == from) return
    if (!self.checkRename(from, to)) {
      failed = true;
    } else {
      map[from] = toStr;
    }
  });

  if (failed) {
    // rename fails.
    return false;
  }
  var vs = _.values(map);
  if (_.uniq(vs).length != vs.length) {
    // duplicate keys.
    return false;
  }

  _.each(this._internal, function(obj) {
    _.each(map, function(to, from) {
      obj[to] = obj[from];
      delete obj[from];
    });
  });

  _.each(map, function(to, from) {
    var fidx = _.indexOf(self._keys, from);
    self._keys[fidx] = to;
    self._meta[to] = self._meta[from];
    delete self._meta[from]
  });

  return true;
}
gg.data.prototype.copyColumnDefinition = function(from, key) {
  if (_.indexOf(this._keys, from) === -1 && _.indexOf(this._keys, key) !== -1) {
    return false; //from key doesn't exist.
  }
  data._keys.push(x_end);
  data._meta[x_end] = _.clone(data._meta[x]);
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
  var newData;

  // multiple cases.
  if (!type.sort) {
    // 1. type has .sort(a, b) undefined - use _.sortBy() by type.represent.
    newData = _.sortBy(this._internal, function(x) {
      var value = type.represent(x[key]);
      return value;
    });
  } else {
    // 1. type has .sort(a, b) defined - use it to sort the array.
    var cloned = _.clone(this._internal);
    newData = cloned.sort(function(a,b) {
      var va = type.represent(a[key]);
      var vb = type.represent(b[key]);
      return type.sort(va, vb);
    });
  }
  if (des) {
    newData.reverse();
  }
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

var numberParser = function(format) {
  var regex = new RegExp(format);
  return function(x) {
    var value = regex.exec(x);
    var elem = value[1];
    return numberCoercer(elem);
  };
}

var numberCoercer = function(x) {
  var result = Number(x);
  if (x === null || (typeof x == 'undefined')) {
    return null;
  } if (x === '') {
    return null;
  }
  if (_.isNaN(result)) {
    return null;
  }
  return result;
}

gg.data.prototype._guessParsers = function() {
  var self = this;
  _.each(this._keys, function(key) {
    var meta = self._meta[key];

    if (self.parser(key)) {
      return; // parser already set.
    } else if (meta.type == 'number') {
      if (meta.format) {
        meta.parser = numberParser(meta.format);
      } else {
        meta.parser = numberCoercer;
      }
    } else if (meta.type == 'date') {
      if (meta.format) {
        var format = self._meta[key].format;
        meta.parser = gg.data.makeDateParser(format);
      } else {
        var column = _.pluck(self._unparsed, key);
        var format = gg.data.guessDateFormat(column);
        if (format) {
          meta.parser = gg.data.makeDateParser(format);
          meta.format = format;
        } else {
          meta.type = 'date'
          meta.parser = function(x) {
            return x;
            if (x && x.getTime) {
              return x.getTime();
            }
            return null;
          }
          meta.format = null;
        }
      }
    } else if (meta.type == 'category' && meta.format === null) {
      // coerce the given input to "category"
      meta.parser = gg.type.category.prototype.represent;
    } else {
      // coerce the given input to "category"
      meta.parser = gg.type.category.prototype.represent;
      // TODO(Jeeyoung Kim) - automatically guessing the type of the column is ... dangerous.
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
  // '%m%d%Y',
  // '%d%m%Y',
  // '%Y',
  "%m/%d/%Y %I:%M %p"
];
gg.data.guessDateFormat = function(column) {
  // STATIC FUNCTION
  // determines whether the given column is a date or not.
  // var first = column[0] || "";
  var found = _.find(common_formats, function(format) {
    var good = true;
    var bad = true;
    for (var i = 0; i < column.length; i++) {
      var value = column[i];
      if (!value) {
        continue;
      } if (value && !_.isString(value)) {
        return false;
      }
      if (gg.date.parseDate(format, value) !== null)  {
        bad = false;
      } else {
        good = false;
        break;
      }
    }
    return good && !bad;
  });
  return found;
}

gg.data.makeDateParser = function(format) {
  // parse ISO format first.
  var fmt = d3.time.format.utc(format);
  return function(x) {
    // if (_.isNumber(x)) { return new Date(x); }
    if (_.isNumber(x)) { return x }
    var result;
    result = fmt.parse(x);
    if (result != null) {
      return result.getTime();
    }
    return null;
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

// nice functions.
gg.data.prettify = u.prettify;

gg.data.numberRounder = function(rounding) {
  return function(value) {
    return Math.floor(value / rounding) * rounding;
  };
};

gg.data.dateRounder = function(rounding) {
  if (!_.isArray(rounding)) {
    rounding = [rounding];
  }
  return function(unnormalized) {
    var normalized = new Date(0);
    unnormalized = new Date(unnormalized)
    _.each(rounding, function(name_or_function) {
      if (_.isString(name_or_function)) {
        // assume name for name_or_function.
        var name = name_or_function;
        // getter
        var c = unnormalized['get' + name]();
        // setter
        normalized['set' + name](c);
      } else {
        // assume function for name_or_function.
        var func = name_or_function;
        func(normalized, unnormalized);
      }
    });
    return normalized - 0;
  }
}

// expose some of the functionality in d3.csv
gg.data.parseCSV = d3.csv.parseRows

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
  return d3.time.format.utc(format).parse(str);
}

gg.date.formatDate = function(format, date) {
  if (!date) return '';
  if (_.isNumber(date)) {
    date = new Date(date);
  }
  return d3.time.format.utc(format)(date);
}
})();
;;(function(gg) {
"use strict";

// functions used in gg.data.derive() function
gg.derive = {};

gg.derive.year = function(date) {
  date = new Date(date);
  return date.getUTCFullYear();
}

gg.derive.month = function(date) {
  date = new Date(date);
  return date.getUTCMonth() + 1;
}

gg.derive.day = function(date) {
  date = new Date(date);
  return date.getUTCDate();
}

gg.derive.has = function(text, substring) {
  // convert to string.
  text = "" + text;
  substring = "" + substring;
  return _.indexOf(text, substring) > -1;
}

gg.derive.len = function(data) {
  if (_.isString(data)) {
    return data.length;
  }
  return 0;
}

/**
 * Count the # of occurance of "input".
 */
gg.derive.count = function(data, input) {
  if (!_.isString(data)) {
    return 0
  }
  var result = 0;
  for (var i = 0; i < data.length; i++) {
    if (data.charAt(i) == input) {
      result++;
    }
  }
  return result;
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

  this.opts('col', null);
  this.opts('row', null); 
  // Caches.
  this._xlevels = null;
  this._ylevels = null;
  this._key_x;
  this._key_y;
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
  return this;
};

gg.facet.grid.prototype.isValidIndex = function(facetIndex) {
  return true;
};

gg.facet.grid.prototype.bin = function(obj) {
  return (
    _.indexOf(this._ylevels, obj[this._key_y]) * this.opts('col') +
    _.indexOf(this._xlevels, obj[this._key_x])
  );
};

gg.facet.grid.prototype.prepare = function() {
  var key_x = this.x(); var key_y = this.y();
  if (!key_x && !key_y) {
    gg.error(701, "There are no variables to facet on.")
  }
  var nrow, ncol;


  var xlevels = this._graph.levels(key_x, 'data')
  var ylevels = this._graph.levels(key_y, 'data')

  this.opts('col', xlevels.length)
  this.opts('row', ylevels.length)

  this._xlevels = xlevels;
  this._ylevels = ylevels;
  this._key_x = key_x;
  this._key_y = key_y;

  return this;
}

gg.facet.grid.prototype.renderLabel = function(paper, context) {
  var labelX = this._xlevels[context.col];
  var labelY = this._ylevels[context.row];
  var label = labelX + " " + labelY;

  var elt = paper.text();

  elt.attr("font-size", 12)
  elt.attr("font-weight","bold")
  elt.attr("text", label)

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
  this.opts('formatter', null);
  // cache.
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

gg.facet.wrap.prototype.isValidIndex = function(facetIndex) {
  return (facetIndex < this._graph.levels(this.x(), 'data').length);
};


gg.facet.wrap.prototype.bin = function(obj) {
  return _.indexOf(this._levels, obj[this._key]);
};

gg.facet.wrap.prototype.prepare = function() {
  var key = this.x();
  if(!key) {
    gg.error(701, "There are no variables to facet on.")
  }
  var levels = this._graph.levels(key, 'data')
  var nlevels = levels.length;

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
  this._levels = levels;
  this._key = key;
  return this;
}

gg.facet.wrap.prototype.renderLabel = function(paper, context) { 
  var idx = context.row * this.ncol() + context.col;
  var label = this._levels[idx];
  if (label === null || _.isUndefined(label)) return this;
  var formatter = this.opts('formatter');
  if (!formatter) {
    formatter = function(x) { return x + ""; }
  }

  var elt = paper.text();

  elt.attr("font-size", 12)
  elt.attr("font-weight","bold")
  elt.attr("text", formatter(label))

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
;;;(function(gg){
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
    if (key.substring(0, 5) == "grid-" && !_.isNull(val))  {
      grid.opts(key.substring(5), val);
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
    var begin = key.substring(0, 7)
    if (begin  == "axis-x-" && !_.isNull(val))  {
      xaxis.opts(key.substring(7), val);
    } else if (begin == "axis-y-" && !_.isNull(val))  {
      yaxis.opts(key.substring(7), val);
    } else if (begin.substring(0, 5) == "axis-") {
      // apply to both!
      xaxis.opts(key.substring(5), val);
      yaxis.opts(key.substring(5), val);
    }
  });
  var result = {'x': xaxis, 'y': yaxis, 'flip': flip};
  this._axes = result;
  return result;
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
  var axes = this._axes;

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

    if (this._timer) this._timer.mark('renderPrimary - pre-rendering()')
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
      if (this._timer) this._timer.mark('renderGrid()')

      // render layer
      for (var k=0; k < this._layers.length; k++) {
        if (layerErrors && layerErrors[k]) continue;
        this.renderLayer(this.getLayer(k), xpos, ypos, scales, facetIndex);
        if (this._timer) this._timer.mark('renderLayer()')
      }

      // render axis
      this._renderAxis(axes, {'col':j, 'row':i, 'ncol':ncol, 'nrow':nrow,
                              'xpos':xpos, 'ypos':ypos,
                              'free_x': free_x, 'free_y': free_y});
      if (this._timer) this._timer.mark('renderAxis()')
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
    width: dims.chartWidth + dims.paddingLeft,
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
    ypos = dims.paddingTop;
    xpos = 10;
    if (position=="right") {
      xpos += dims.paddingLeft +chartWidth+10; // 10 for facet label
    }
  }
  else if (position == "bottom") {
    ypos = chartHeight+dims.paddingTop+45 //100; //dims.paddingTop+chartHeight; //add some for axis
    xpos = dims.paddingLeft;
  } else {
    gg.error(1000, "Leged position should be left, right, bottom or none. Got "
                   +position+" instead.");
  }

  var context = {
    canvas : this.createOffsetCoord(xpos, ypos),
    chartWidth: chartWidth,
    chartHeight: chartHeight
  };
  this._legend.render(context)
};

gg.graph.prototype.renderOtherLabel = function() {
  var dims = this.dimensions();
  var chartWidth = dims.chartWidth;
  var chartHeight = dims.chartHeight;
  // y-label
  if (this._coord._name === 'polar') {
    // FIXME(JEE) - THIS IS HACK FOR POLAR COORDINATES. Remove it later.
  }
  else {
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
  var dims = this.dimensions();
  var xpos = this.opts("width")/2;
  var ypos = 15;
  this.render_label(this.opts("title"), xpos, ypos, '_debug_title')
        .attr('font-weight', this.opts('title-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('title-size'));
}

gg.graph.prototype.render_x_label = function() {
  var dims = this.dimensions();
  var xpos = dims.paddingLeft + dims.chartWidth/2;
  var ypos = dims.xLabelY;
  if (this.coord()._cls_name === 'gg.coord.polar') {
    var key = this._coord._flip ? 'x' : 'y';
  }
  else {
    var key = this._coord._flip ? 'y' : 'x';
  }
  this.render_label(this._varlabel(key), xpos, ypos, '_debug_x_label')
        .attr('font-weight', this.opts('label-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('label-size'));
};

gg.graph.prototype.render_y_label = function() {
  var dims = this.dimensions();
  var chartHeight = dims.chartHeight;
  var xpos = dims.yLabelX
  var ypos = dims.paddingTop+chartHeight/2;
  if (this.coord()._cls_name === 'gg.coord.polar') {
    var key = this._coord._flip ? 'y' : 'x';
  }
  else {
    var key = this._coord._flip ? 'x' : 'y';
  }
  this.render_label(this._varlabel(key), xpos, ypos, '_debug_y_label')
        .transform('r270')
        .attr('font-weight', this.opts('label-bold') ? 'bold' : 'normal')
        .attr('font-size', this.opts('label-size'));
};

gg.graph.prototype.render_branding = function() {
  var elem = this._paper;

// will not currently display with pivot tables -- part of the reason may be no canvas exists
  var ypos = this.opts('height') - 6;
  var xpos = 65

  var a = elem.path(u.d3_arc(xpos+17,ypos+1,0,4,-Math.PI / 2,Math.PI * 1 / 6))
    .attr("fill", "#F89E34")
    .attr("stroke", "#F89E34");

  var b = elem.path(u.d3_arc(xpos+17,ypos+1,0,5,Math.PI * 1 / 6,Math.PI * 5 / 6))
    .attr("fill", "#FFF425")
    .attr("stroke", "#FFF425");

  var c = elem.path(u.d3_arc(xpos+17,ypos+1,0,6.5,Math.PI * 5 / 6 ,Math.PI * 9 / 6))
    .attr("fill", "#6DBB58")
    .attr("stroke", "#6DBB58");

  var t = elem.text(xpos, ypos, "Made With P o lychart")
    .attr({"font-size": 12, "font-weight": "bold", "font-family": "Arial, sans-serif"})
    .attr("fill", "#AAA")
	.toBack();
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
    var typeObj = gg.type.fromString(type);
    var scale;
    if (!type) return;
    if (type === 'unknown') {
      scale = gg.scale.id();
    } else {
      scale = typeObj.defaultScale(aes);
    }
    output[aes] = scale;
  });

  // X and Y should be continuous, if they don't exist.
  if (!this._scales.x && !output.x && _.contains(toMake, 'x')) { output.x = gg.scale.discrete() }
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
;;/**
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

gg.guide.axis.prototype.width = function() {
  return this._scale.maxLabelWidth()
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
  var TEXTY = YAXIS ? 0 : (position == "top") ? -10 : 15;
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
    x = "y"; x1 = 'y1'; x2 = 'y2';
    y = "x"; y1 = 'x1'; y2 = 'x2';
    
  } else {
    hline = _.bind(coord.hline, coord);
    vline = _.bind(coord.vline, coord);
    x = "x"; x1 = 'x1'; x2 = 'x2';
    y = "y"; y1 = 'y1'; y2 = 'y2';
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
  if (this._scale.CONTINUOUS) {
    ticks.pop() // remove the last element. this is because last elt and first
                // elt are in the same place...
  }

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
    func[x] = u.constfunc(radius + TICKLEN + 10);
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
  var xticknum = null, yticknum = null;

  // special logic for polar coordinate.
  if (coord._cls_name == 'gg.coord.polar') {
    if (coord._flip) { xticknum = 6 }
    else { yticknum = 6 }
  }

  var xscale = this.opts('xscale')
  var xrange = xscale.range();
  var xmin = _.min(xrange);
  var xmax = _.max(xrange);
  var xticks = xscale.ticks(xticknum, flip);

  var yscale = this.opts('yscale')
  var yrange = yscale.range();
  var ymin = _.min(yrange);
  var ymax = _.max(yrange);
  var yticks = yscale.ticks(yticknum, flip);

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
;
// Aesthetics that we do not render legends for.
var NO_LEGEND = ["x", "y", "text", "group", "group2", "grp", 'tooltip']

gg.guide.legend = u.makeClass('gg.guide.legend', gg.guide.base);

gg.guide.legend.prototype.init = function(graph, layers, scales, position) {
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

  this._position = position;
}

gg.guide.legend.prototype.width = function() {
  this.group();
  var self = this;

  if (this._position != "bottom") {
    var items =  _.chain(this._legends)
                  .map(function(legend) {
                    return legend.sample_scale.maxLabelWidth();
                  })
                  .max()
                  .value() + 30;
    var label =  _.chain(this._legends)
                  .map(function(legend) {
                    return u.strlenToPixel(
                      self._graph._varlabel(legend.sample_aes).length,
                      'bold'
                    );
                  })
                  .max()
                  .value() + 30;
    return Math.max(items, label, 0)
  }
  return 0;
}

gg.guide.legend.prototype.height = function() {
  if (this._position == "bottom") {
    // TODO(Lisa, 7/30/12): do this better
    return 100;
  }
  return 0;
}

gg.guide.legend.prototype.group = function() {
  var self = this;
  // group aes together where they have the SAME var mapping across ALL layers
  // they can be rendered in the same legend
  this._legends = [];
  var keys = _.clone(this._aes); // this SHOULD make a copy

  // helper function to push a new aes into a legend group
  var newscale = ''
  var pushItem = function(legend, aes) {
    legend.aes.push(aes);
    if (!legend.sample_scale_categorical) {
      newscale = self._scales[aes]
      legend.sample_aes = aes;
      legend.sample_scale = newscale;
      legend.sample_scale_categorical = newscale.DISCRETE;
    }
  };
  var getType = function(layertypes) {
    for (var i = 0; i < layertypes.length; i++) {
      if (layertypes[i] =="line" || layertypes[i]=="path") {
        return 'line';
      }
    }
    return 'point';
  }

  while (keys.length > 0) {
    var aes = keys.pop();
    var current_mapping = _.pluck(this._mappings, aes);
    var new_mapping = null;

    var legend = {
      aes : [],
      mapping : current_mapping,
      sample_aes : null,
      sample_scale : null,
      sample_scale_categorical : false,
      layers : [],
      type : 'point'
    };

    // start new legend grouping
    pushItem(legend, aes)
    // check other keys that have the exact same var mapping across all layers
    var i = 0;
    while (i < keys.length) {
      new_mapping = _.pluck(this._mappings, keys[i]);
      if (_.isEqual(new_mapping, current_mapping)) {
        pushItem(legend, keys.splice(i, 1)[0]);
      } else{
        i++;
      }
    }
    // check that there IS actually a layer attached to this
    var layertypes = [];
    var layers = [];
    for (i  =0; i<this._layers.length; i++) {
      if (this._mappings[i][legend.sample_aes]) {
        layers.push(this._layers[i]);
        layertypes.push(this._layers[i]._cls_name.split(".")[2]);
      }
    }
    if (layers.length === 0)  {
      continue; // break out!
    }
    legend.layers = layers;
    legend.type = getType(layertypes);


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
  if (_.isNull(this._legends)) { this.group(); }
  var self = this;
  var shift, xshift = 0, yshift = 0;
  var orientation = this._position == "bottom" ? "h" : "v"
  _.each(this._legends, function(legend) {
    var newContext = {
      legend: legend,
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
  var legend = context.legend;
  var canvas = context.canvas;

  // since every scale maps the same var, we can just use a sample one to
  // do calculations. BUT always use discrete scale if possible!
  var sample_aes = legend.sample_aes;
  var sample_scale = legend.sample_scale;
  var layers = legend.layers;

  // use the layers to define the default stuff
  var scales = { // ...sensible defaults if we have no info
    "color": u.constfunc("#000000"),
    "stroke": u.constfunc("#000000"),
    "strokewidth": u.constfunc(0),
    "symbol": u.constfunc(gg.symbol.CIRCLE),
    "radius": u.constfunc(5), 
    "opacity": u.constfunc(1)
    //"linetype" : ???
  }

  if (legend.type == 'line') {
    scales.symbol = u.constfunc(gg.symbol.CROSS);
    scales.strokewidth = u.constfunc(1);
  } else {
    scales.symbol = u.constfunc(gg.symbol.CIRCLE);
  }
  _.each(_.keys(scales), function(s) { // ...better yet, get it from the layer
    if (s != "radius") {
      var attr = layers[0].opts(s);
      if (_.isString(attr) || _.isNumber(attr)) {
        scales[s] = u.constfunc(attr);
      }
    }
  });

  // overwrite default with actual scales
  _.each(legend.aes, function(a) {
    scales[a] = _.bind(self._scales[a].apply, self._scales[a], 'data');
  });

  // generate "ticks" (this is why we prefer discrete scale)
  var numticks = sample_scale.type() == "category"
               ? this._graph.levels(sample_aes).length
              : 5; // magic constant for default number of ticks
  var ticks = sample_scale.ticks(numticks);

  // rendering functions
  var _render_tick = legend.type == "line"
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
    'x1': u.constfunc(xpos),
    'x2': u.constfunc(xpos+14),
    'y1': u.constfunc(ypos),
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

gg.layer.area.prototype.calculatePartials = function() {
  // Returns whether statistics should run partial calculation. //
  return true;
}

gg.layer.area.prototype.layerGroup = function() {
  return ['group', 'group_color', 'group_opacity']
}

gg.layer.area.prototype.defaultMin = function(aes, provided) {
  if (_.isDate(provided)) {
    provided = provided.getTime()
  }
  if (aes == 'y') {
    return 0;
  }
  return gg.layer.base.prototype.defaultMin.call(this, aes, provided);
}

gg.layer.area.prototype.render = function(context) {
  var coord = context.coord;
  var cell = context.cell;
  var s = context.scales;

  var originLocation = context.rawScales.y.opts('domain_low');
  //if (originLocation < 0) { originLocation = 0; }
  var yOrigin = s.y(originLocation);

  var pointModifier = function(points) {
    return function(xs, ys) {
      // to make an area plot, two more points must be added to
      // the list of rendered points.
      _.each(points, function(p) {
        xs.push(x(p.x));
        ys.push(y(p.y));
      });
    }
  }

  var x, y;
  x = s.x;
  y = s.y_2 || s.y_override || s.y;

  var self = this;
  var computed = context.computedData;
  var grpVar= this.map('group')
  if (grpVar) {
    computed = _.sortBy(computed, function(d) {
      return d._internal[0][grpVar];
    });
  }
  computed.reverse()

  var bottomPoints = [];
  var xvar = this.map('x');
  _.each(computed, function(data) {
    if (self.opts('domain')) {
      data = self.fillZero(data, context, ['$sum', '$partial_1', '$partial_2']);
    }
    bottomPoints = _.chain(data._internal)
                    .map(function(p) {
                      return {
                        x: xvar ? p[xvar] : 1,
                        y: p.$partial_1 || 0
                      }
                    })
                    .sortBy(function(p) { return p.x })
                    .value();
    bottomPoints.reverse();
    coord.poly().attr('func', {
      x: x,
      y: y,
      _sort: x,
      _pointModifier: pointModifier(bottomPoints),
      _style: s
    }).attr('data', data);
  });
}

gg.layer.area.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {'group' : ['stroke', 'color']});
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
  var self = this;
  _.each(gg.opts.bar, function(v, k) { self.opts(k, v); });

  //this._default_stats = gg.stats.bin;
  var padding = 0;
  if (padding < 0) {
    gg.error(310, "Padding should be between 0 and 0.5");
  }
  if (padding > 0.5) {
    this.warn(310, "Padding should be between 0 and 0.5");
  }
  this.opts('padding',padding)
};

gg.layer.bar.prototype.calculatePartials = function() {
  // Returns whether statistics should run partial calculation. //
  return true;
}

gg.layer.bar.prototype.layerGroup = function() {
  return ['x']
}

gg.layer.bar.prototype.defaultMin = function(aes, provided) {
  if (_.isDate(provided)) {
    provided = provided.getTime()
  }
  if (aes == 'y') {
    return 0;
  }
  if (aes == 'x') {
    var align = this.opts('align');
    var width = this.opts('width');
    if (align == 'center') {
      return provided - width / 2;
    } else if (align == 'right') {
      return provided - width;
    }
  }
  return gg.layer.base.prototype.defaultMin.call(this, aes, provided);
}

gg.layer.bar.prototype.defaultMax = function(aes, provided) {
  if (aes == 'x') {
    var align = this.opts('align');
    var width = this.opts('width');
    if (align == 'center') {
      // force numerical operation - this is useful when provided is date.
      return provided - (-width / 2);
    } else if (align == 'left') {
      return provided - (-width);
    }
  }
  return gg.layer.base.prototype.defaultMax.call(this, aes, provided);
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
  var optWidth = this.opts('width');
  var width;

  if (context.rawScales.x.DISCRETE) {
    width = context.width;
  } else {
    // calculate the width.
    width = (context.rawScales.x.apply(optWidth) - context.rawScales.x.apply(0));
  }

  var padding = (width/2) * (1 - this.opts('padding') * 2);
  // todo(lisa, 4/22/2012): this logic is WRONG, should be using 0
  var originLocation = context.rawScales.y.opts('domain_low');
  if (!_.isNumber(originLocation)) {
    this.warn(-2, "originLocation is numeric.");
  }
  if (originLocation < 0) {
    originLocation = 0
  }
  var yOrigin;

  var y2 = null;
  var y1 = null;
  var x1, x2;

  var align = this.opts('align');
  if (align == 'left' || align == 'right') {
    var reversePadding = width / 2 - padding;
    if (align == 'right') {
      x1 = u.sub(s.x, reversePadding);
      x2 = u.sub(s.x, reversePadding + padding * 2);
    } else {
      x1 = u.add(s.x, reversePadding);
      x2 = u.add(s.x, reversePadding + padding * 2);
    }
  } else if (align == 'center') {
    x1 = u.sub(s.x, padding);
    x2 = u.add(s.x, padding);
  } else {
    // invalid option for align.
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

  var self = this;
  var onDoubleclick = this.opts('onDoubleclick');
  _.each(context.computedData, function(datas) {
    datas.each(function(obj) {
      coord.rect()
        .ggTooltip(s)
        .ggDoubleClick(onDoubleclick, self)
        .attr('func', {
          x1:x1, x2:x2,
          y1:y1, y2:y2,
          _style:s
        })
      .attr('data', obj);
    });
  });
}

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
  /*
  var padding = 0.1;
  if (padding < 0) {
    gg.error(310, "Padding should be between 0 and 0.5");
  }
  if (padding > 0.5) {
    this.warn(310, "Padding should be between 0 and 0.5");
  }
  */

  // more default stuff
  var self = this;
  _.each(gg.opts.box, function(v, k) { self.opts(k, v); });

  // this.opts('padding',padding)
  this._default_stats = gg.stats.box;
};

gg.layer.area.prototype.calculatePartials = function() {
  // Returns whether statistics should run partial calculation. //
  return true;
}

gg.layer.box.prototype.layerGroup = function() {
  return ['x']
}

gg.layer.box.prototype.defaultMin = function(aes, provided) {
  if (_.isDate(provided)) {
    provided = provided.getTime()
  }
  if (aes == 'y') {
    // TODO(Jee) - hack for now - returning 0 for log scale sucks.
    return 0;
  }
  if (aes == 'x') {
    var align = this.opts('align');
    var width = this.opts('width');
    if (align == 'center') {
      return provided - width / 2;
    } else if (align == 'right') {
      return provided - width;
    }
  }
}
gg.layer.box.prototype.defaultMax = function(aes, provided) {
  if (aes == 'x') {
    var align = this.opts('align');
    var width = this.opts('width');
    if (align == 'center') {
      // force numerical operation - this is useful when provided is date.
      return provided - (-width / 2);
    } else if (align == 'left') {
      return provided - (-width);
    }
  }
  return gg.layer.base.prototype.defaultMax.call(this, aes, provided);
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

  var optWidth = this.opts('width');
  var width;
  if (context.rawScales.x.DISCRETE) {
    width = context.width;
  } else {
    // calculate the width.
    width = (context.rawScales.x.apply(optWidth) - context.rawScales.x.apply(0));
  }
  var padding = (width/2) * (1 - this.opts('padding') * 2);
  var x1, x2, x;
  var align = this.opts('align');
  var self = this;
  if (align == 'left' || align == 'right') {
    var reversePadding = width / 2 - padding;
    if (align == 'right') {
      x = u.sub(s.x, padding)
      x1 = u.sub(s.x, width / 2);
      x2 = u.sub(s.x, reversePadding + padding * 2);
    } else {
      x = u.add(s.x, width / 2)
      x1 = u.add(s.x, reversePadding);
      x2 = u.add(s.x, reversePadding + padding * 2);
    }
  } else if (align == 'center') {
    x1 = u.sub(s.x, padding);
    x = s.x
    x2 = u.add(s.x, padding);
  } else {
    // invalid option for align.
  }
  if (!s.y_q0) s.y_q0 = s.y;
  if (!s.y_q1) s.y_q1 = s.y;
  if (!s.y_q2) s.y_q2 = s.y;
  if (!s.y_q3) s.y_q3 = s.y;
  if (!s.y_q4) s.y_q4 = s.y;

  var onDoubleclick = this.opts('onDoubleclick');
  _.each(context.computedData, function(datas) {
    datas.each(function(data) {
      if (!_.isNull(data.$q0) && !_.isNull(data.$q3)) {
        // this is an actual BOX
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
        coord.rect()
          .ggDoubleClick(onDoubleclick, self)
          .attr('func', {
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
      } else {
        // this is an OUTLIER
        coord.point().ggTooltip(s).attr('func', {
          'cx': x, // instead of 's.x'
          'cy' : s.y,
          'r' : s.radius,
          'symbol' : u.constfunc(gg.symbol.CIRCLE),
          _style: s
        }).attr('data', data);
      }
    });
  });
}

gg.layer.box.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(this, mapping, {'group':'x'});
}

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

  this.opts('symbol', gg.symbol.CIRCLE);
  var self = this;
  _.each(gg.opts.line, function(v, k) { self.opts(k, v); });
};

gg.layer.line.prototype.layerGroup = function() {
  return ['group', 'group_color', 'group_strokewidth']
}

gg.layer.line.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;

  var y = s.y_override || s.y;
  var xKey = this.map('x');
  var yKey = this.map('y');
  var smoother = null;
  var self = this;

  _.each(context.computedData, function(data) {
    var interpolated;
    // interpolate the zeros.
    if (self.opts('domain')) {
      interpolated = self.fillZero(data, context, ['$sum', '$partial_1', '$partial_2']);
    } else {
      interpolated = data;
    }
    coord.poly().attr('func', {
      x: s.x,
      y: y,
      _sort: s.x,
      stroke : s.color,
      fill: 'none',
      'stroke-width': s.strokewidth
    }).attr('data', interpolated);

    if (data.len() < 100) {
      // add points for things without that many points
      var attrs = {
        'cx' : s.x,
        'cy' : y,
        'r' : s.strokewidth,
        'stroke' : '#FFFFFF',
        'fill':    s.color,
        'symbol' : s.symbol,
        'stroke-width' : 0
      }
      data.each(function(obj) {
        coord.point().ggTooltip(s).attr('func', attrs).attr('data', obj);
      });
    }

  });
}

gg.layer.line.prototype.imputeMapping = function(mapping) {
  return gg.layer.base.prototype.imputeMapping.call(
    this, mapping, {'group' : ['strokewidth', 'stroke', 'color']});
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

  var y = s.y_override || s.y;
  _.each(context.computedData, function(data) {
    coord.poly().attr('func', {
      x: s.x,
      y: y,
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
  var self = this;
  _.each(gg.opts.point, function(v, k) { self.opts(k, v); });

  this.opts('symbol', gg.symbol.CIRCLE);
};

gg.layer.point.prototype.render = function(context) {
  var coord = context.coord;
  var s = context.scales;

  var y = s.y_override || s.y;
  var attrs = {
    'cx' : s.x,
    'cy' : y,
    'r' : s.radius,
    'symbol' : s.symbol,
    _style: s
  }
  // var tooltip = this._graph.opts('tooltip');
  context.computedData.each(function(obj) {
    coord.point().ggTooltip(s).attr('func', attrs).attr('data', obj);
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
  var y = s.y_override || s.y;
  context.computedData.each(function(obj) {
    coord.text().attr('func', {
      x: s.x,
      y: y,
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
 * Date : 5/6/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 * Author : Lisa Zhang
 **/
;(function(gg) {
"use strict";

gg.pivot = u.makeClass('gg.pivot');

gg.pivot.prototype.init = function(data) {
  this._data = data;
  this._statData = {};
  this._attr = u.cloneobj(gg.opts.pivot);

  this._mapping = {};
  this._levels = {};

  this._stats = null;
  this._calculated = false;

  this._scales = {};
}

gg.pivot.prototype.data = u.dataGetter();

gg.pivot.prototype.map = function(key, val) {
  if (arguments.length === 1) {
    return this._mapping[key];
  }
  if (val) {
    this._mapping[key] = val;
  } else {
    delete this._mapping[key]
  }
  this.resetCalculate();
  return this;
}

gg.pivot.prototype.levels = function(key, val) {
  if (arguments.length === 1) {
    if (this._levels[key]) {
      return this._levels[key];
    }
    return this.callData('levels', key);
  }
  if (val) {
    this._levels[key] = val;
  } else {
    delete this._levels[key]
  }
  return this;
}

gg.pivot.prototype.getMap = function() {
  // translate mapping to what is typically used in gg.graph
  var mapping = {}
  if (this._mapping.column) {
    mapping.group_c = this._mapping.column;
  }
  if (this._mapping.row) {
    mapping.group_r = this._mapping.row;
  }
  if (this._mapping.value) {
    mapping.y = this._mapping.value;
  }
  return mapping;
}

gg.pivot.prototype.getScale = function(key) {
  return this._scales[key];
}

gg.pivot.prototype.scale = function(key, scale) {
  // Setter for the given scale.
  if (key != 'column' && key != 'row') {
    return;
  }
  scale = u.instantiate(scale);
  if (!scale) {
    gg.error(201, "Attempting to add an undefined or malformed scale: "+scale)
  }
  var cloned = u.cloneobj(scale);
  cloned.attach(this, key);
  this._scales[key] = cloned;
  return this;
}

gg.pivot.prototype.opts = u.opts();

gg.pivot.prototype.stats = function(stats) {
  /** Getter / setter for stats */
  if (arguments.length === 1) {
    stats = u.instantiate(stats);
    if (!stats) {
      gg.error(304, "Attempting to add an undefined or malformed statistic: "+stats);
    }
    this._stats = stats;
    this.resetCalculate(); // do this later
    return this;
  }
  if (this._stats) {
    return this._stats;
  }
  // calculate default stats
  var valueVar = this._mapping.value;
  var type = (valueVar ? this._data.type(valueVar) : "");

  if (type == "category" || !valueVar) {
    return gg.stats.count();
  } else if (type == "date") {
    return gg.stats.mean();
  } else {
    return gg.stats.sum();
  }
}

gg.pivot.prototype.callData = function(fn, key, queryType) {
  if (!queryType || queryType == 'data') {
    return this._data[fn](key);
  } else if (queryType == 'aes') {
    return this._data[fn](this.map(key));
  }
  gg.error(-1, "not supported "+queryType);
}

gg.pivot.prototype.type = function(key, queryType) {
  return this.callData('type', key, queryType);
}

gg.pivot.prototype.min= function(key, queryType) {
  return this.callData('min', key, queryType);
}

gg.pivot.prototype.max = function(key, queryType) {
  return this.callData('max', key, queryType);
}

gg.pivot.prototype.calculateStats = function(stat, context) {
  // translate scales to what is typically used in gg.graph
  // generate context
  return stat.calculateStats(this._data, context)[0];
}

gg.pivot.prototype.calculate = function() {
  if (this._calculated) return; // short circuit

  // stats:
  var stats = this.stats()
  // scales:
  var scales = {}
  if (this._scales.column) { scales.group_c = this._scales.column; }
  if (this._scales.row) { scales.group_r = this._scales.row; }
  // mappings:
  var mapping = this.getMap();
  // set up context
  var context = {
    scales : scales,
    mapping : mapping,
    group_aes : [],
    attr: {
      y: this.opts('y'),
      x: this.opts('x')
    },
    no_partials : true
  }
  // now actually run stuff: we need to aggregate by different
  // groupings: by col*row, col only, row only, and overall
  this._statData = {};
  // col * row.
  if (mapping.group_c && mapping.group_r) {
    context.group_aes = ['group_c', 'group_r']
    this._statData.cr = this.calculateStats(stats, context);
  }

  // col
  if (mapping.group_c) {
    // temporarily remove group_r from mappings
    var tmp = context.mapping.group_r;
    delete context.mapping.group_r;
    // run it
    context.group_aes = ['group_c']
    this._statData.c = this.calculateStats(stats, context);
    // add back group_r and remove group_c for the next calculation
    context.mapping.group_r = tmp;
    delete context.mapping.group_c;
  }
  // row
  if (mapping.group_r) {
    context.group_aes = ['group_r']
    this._statData.r = this.calculateStats(stats, context);
    // remove group_r for the rest of the calculation
    delete context.mapping.group_r;
  }
  this._statData.none = this.calculateStats(stats, context);
  return this;
}

gg.pivot.prototype.resetCalculate = function() {
  this._calculated = false;
  this._default_stats = gg.stats.sum;
  return this;
}

gg.pivot.prototype._getPrettifyFunction = function(statData, valVar) {
  // calculate max & min
  var max = -Infinity, min = Infinity, allInt = true;
  _.each(statData, function(data, key) {
    _.each(data.get(valVar), function(x) {
      if (x > max) max = x;
      if (allInt && x % 1 !== 0) allInt = false; // this seems inefficient...
    });
  });
  // logic: if allInt or exp=log_10(max) >= 3, then use rounding
  //        else use 3 sig figs
  var exp = Math.log(Math.abs(max))/Math.LN10;
  if (allInt || exp >= 3) { return function(x) { return u.prettify(x,0) } }
  return function(x) { return u.prettify(x,-Math.floor(exp-2)) } // was exp-3 which caused use of 4 sig figs
}

var toString = function(x) { return x.toString() };

gg.pivot.prototype._getColumnFormatter = function() {
  if (!this.opts('colFormatter')) {
    return toString;
  }
  return this.opts('colFormatter');
}

gg.pivot.prototype._getRowFormatter = function() {
  if (!this.opts('rowFormatter')) {
    return toString;
  }
  return this.opts('rowFormatter');
}


gg.pivot.prototype._makeTableArray = function() {
  var colVar = this.map('column'),
      rowVar = this.map('row');
  // valVar is harder. this is somewhat of a hack?
  var statMapping = this.stats().imputeMapping({})
  var valVar = statMapping.y || statMapping.y_override ;

  var cols = colVar ? this.levels(colVar) : [],
      rows = rowVar ? this.levels(rowVar) : [];
  var rowFormatter = this._getRowFormatter();
  var colFormatter = this._getColumnFormatter();

  cols = _.map(cols, colFormatter);
  rows = _.map(rows, rowFormatter);

  var ncol = cols.length, nrow = rows.length;

  // get the prettify function
  var prettyFunc = this._getPrettifyFunction(this._statData, valVar);

  var table = new Array(nrow+2); // array of arrays representing tables
  var allLabel = this.opts('title-all')
  table[0] = [''].concat(cols).concat([allLabel]);  // first row = col names
  var i, j; //tmp variables for i = ROW, j = COL
  for (j=1; j<nrow+2; j++) {
    table[j] = new Array(ncol+2); // instantiate the other rows
    table[j][0] = (j == nrow+1) ? allLabel : rows[j-1]; // first col = row name
  }

  // populate table with col*row aggregate
  if (this._statData.cr) {
    _.each(this._statData.cr.getRaw(), function(d) {
      j = colVar ? _.indexOf(cols, colFormatter(d[colVar])) : -1;
      i = rowVar ? _.indexOf(rows, rowFormatter(d[rowVar])) : -1;
      if (i !== -1 && j !== -1) {
        table[i+1][j+1] = prettyFunc(d[valVar]);
      }
    });
  }
  // populate table with col aggregate
  if (this._statData.c) {
    _.each(this._statData.c.getRaw(), function(d) {
      j = colVar ? _.indexOf(cols, colFormatter(d[colVar])) : 0;
      if (j !== -1) {
        table[nrow+1][j+1] = prettyFunc(d[valVar]);
      }

    });
  }
  // populate table with rowaggregate
  if (this._statData.r) {
    _.each(this._statData.r.getRaw(), function(d) {
      i = rowVar ? _.indexOf(rows, rowFormatter(d[rowVar])) : 0;
      if (i !== -1) {
        table[i+1][ncol+1] = prettyFunc(d[valVar]);
      }
    });
  }
  // populate table with overall aggregate
  if (this._statData.none) {
    _.each(this._statData.none.getRaw(), function(d) {
      table[nrow+1][ncol+1] = prettyFunc(d[valVar]);
    });
  }

  return table;
}

gg.pivot.prototype.makeTableDom = function(dom) {
  if (!dom) {
    gg.error(212, "Invalid dom for .opts('dom') - " + dom)
  }

  var $ = jQuery;
  var element = $(dom);
  if (!element) {
    gg.error(212, "Invalid dom for .opts('dom') - " + dom)
  }

  var paddingleft = this.opts('padding-left')
  var paddingright = this.opts('padding-right')
  var paddingtop = this.opts('padding-top')
  var paddingbottom = this.opts('padding-bottom')
  //var tableheight = this.opts('height')
  var tablewidth = this.opts('width')

  // clear everything
  element.empty()

  // add the table
  var table = $('<table></table>');
  table.css('color','black');
  //table.width(this.opts('width'));
  //table.height(this.opts('height'));
  //table.css('height', tableheight);
  table.css('width', tablewidth);
  table.css('margin-top', paddingtop);
  table.css('margin-bottom', paddingbottom);
  table.css('margin-right', paddingright);
  table.css('margin-left', paddingleft);

  var tbo = $('<tbody></tbody>');
  table.append(tbo);
  element.append(table);
  return tbo;
}

gg.pivot.prototype.render = function(dom) {
  // todo: add scale imputation
  this.calculate();
  var array = this._makeTableArray();
  // now adding stuff...
  dom = dom || this.opts('dom');
  var tbo = this.makeTableDom(dom);
  var row, rowArray, elt, innerText;

  // labels
  var titleColspan = array[0] ? array[0].length+2 : 2;
  var rowColspan = array[0] ? array[0].length : 1;
  var colRowspan = array[0] ? array.length : 1;

  // title
  var title = this.opts('title');
  row  = $('<tr></tr>');
  elt = $('<th></th>').attr("colspan",titleColspan);
  elt.text(_.isUndefined(title) ? ' ' : title);
  elt.css('textAlign', 'center');
  elt.css('paddingBottom', '5px');
  //elt.css('border','1px solid black');
  row.append(elt);
  tbo.append(row);

  // column title
  var colname = this.opts('title-column') || this.map('column');
  row  = $('<tr></tr>');
  row.append($('<th></th>'));
  row.append($('<th></th>'));

  elt = $('<th></th>').attr("colspan",rowColspan);
  elt.text(colname);
  elt.css('textAlign', 'center');
  elt.css('paddingBottom', '5px');
  elt.css('font-weight', 'normal');
  if (colname) { elt.css('border','1px solid black');}
  row.append(elt);
  tbo.append(row);

  // body
  var i, j;
  for (i = 0; i < array.length; i++) {
    rowArray = array[i];
    row = $('<tr></tr>')
    if (i === 0) {
      row.append($('<th></th>'));
    } else if (i == 1) {
      // row title
      var rowname = this.opts('title-row') || this.map('row');
      elt = $('<th></th>').attr("rowspan",colRowspan);

      var innerelt = $('<div></div>')
      innerelt.text(rowname);
      innerelt.css('-webkit-transform', 'rotate(270deg)');
      innerelt.css('-moz-transform', 'rotate(270deg)');
      innerelt.css('-ms-transform', 'rotate(270deg)');
      innerelt.css('-o-transform', 'rotate(270deg)');
      elt.css('paddingBottom', '5px');
      elt.css('font-weight', 'normal');
      if (rowname) { elt.css('border','1px solid black'); }
      elt.css('textAlign', 'center');
      elt.css('verticalAlign', 'middle');
      elt.append(innerelt);
      row.append(elt);
    }
    for (j = 0; j < rowArray.length; j++) {
      innerText = rowArray[j];
      elt = $((i*j === 0) ? '<th></th>' : '<td></td>');

      elt.text(_.isUndefined(innerText) ? ' \u00A0' : innerText);
      row.append(elt);

      elt.css('minWidth', '50px');
      elt.css('width', 100/rowArray.length  + "%");
      elt.css('minHeight', '22px');
      elt.css('height', 100/array.length  + "%");
      elt.css('padding', '2px');
      if (i == 0 && j == 0) {
        // top left cell. no style.
      } else if (i == 0 || j == 0) {
        // header style.
        elt.css('border', '1px solid black');
      } else {
        // normal style
        elt.css('border', '1px solid gray');
        elt.css('textAlign', 'right');
      }
    }
    tbo.append(row);
  }

  return this;
}

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
  this.opts('transform', transform || 'linear');
  // this.opts('expand', 0.05);
  this.opts('expand', 0);
  if (this.opts('transform') === 'log') {
    this.opts('absolute_min', 0.1);
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

gg.scale.continuous.prototype.maxLabelWidth = function() {
  var max = this._graph.max(this._aes);
  var min = this._graph.min(this._aes);
  var exp = Math.floor(Math.log((max - min)/ 10) / Math.LN10)
  return max ? u.strlenToPixel(u.prettify(max, -exp).length) : 15;
}

gg.scale.continuous.prototype.distance = function(v, w) {
  return Math.abs(this._d3scale(v) - this._d3scale(w));
}

gg.scale.continuous.prototype._makeDefaultMinMax = function() {
  if (!this._graph) {
    // run only if the graph is attached.
    return;
  }
  var aes = this._aes;
  var min = this._graph.min(aes);
  var max = this._graph.max(aes);
  this._defaultMin = this._graph.defaultMin(aes, min);
  this._defaultMax = this._graph.defaultMax(aes, max);

  if (_.isNumber(this._defaultMin) && this._defaultMin < this._attr.absolute_min) {
    this._defaultMin = this._attr.absolute_min;
  }
  if (_.isNumber(this._defaultMax) && this._defaultMax > this._attr.absolute_max) {
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
  this._makeDefaultMinMax();
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
      if (minData === maxData) {
        // if minData == maxData, the resulting graph looks ugly,
        // because guides aren't generated correctly.
        minData = minData - 1;
        maxData = maxData + 1;
      }
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
    if (_.isNumber(this._defaultMin) && minData > this._defaultMin) {
      minData = this._defaultMin;
    }
    if (_.isNumber(this._defaultMax) && maxData < this._defaultMax) {
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
  var transform = this.opts('transform')
  this._d3scale = transform == "log"
                ? d3.scale.log()
                : (transform == "sqrt" ? d3.scale.sqrt() : d3.scale.linear());
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
  /*
  if (input < this._attr.domain_low - EPSILON ||
      input > this._attr.domain_high+ EPSILON) {
    this.warn(404, "Continuous scale got value "+input+" that is not in the " +
                 "domain ["+this._attr.domain_low +","+this._attr.domain_high+
                 "]");
  }
  */

  if (input === 0 && this.opts('transform')=='log') {
    input = this._attr.domain_low;
  }
  return this._d3scale(input);
}

gg.scale.continuous.prototype.ticks = function(numticksSuggested, flip) {
  // some constants
  var EPSILON = 0, // tolerance for numerical calculation error
      min = this._attr.domain_low,
      max = this._attr.domain_high,
      isLog = this.opts('transform') == "log";
  var numticks = this._suggestNumticks(numticksSuggested, flip);
  // word
  if (isLog) {
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
  if (isLog) { current -= 1 }
  var minExp = -Math.floor(Math.log(step)/Math.LN10);
  while (current <= max + EPSILON) {
    var num = current;
    var pretty = num;
    if (isLog) {
      if (num % 1 !== 0 && num % 1 <= 0.1) {
        current += step;
        continue;
      }

      if (num % 1 > EPSILON) { // make the exponential a nice number
        num = Math.floor(num) + Math.log(10*(num % 1))/Math.LN10;
        if (num % 1 == 0) {
          current += step;
          continue;
        }
      }
      num = Math.exp(num*Math.LN10);

      if (num > this._attr.domain_high + EPSILON) { break; }
      if (num < this._attr.domain_low - EPSILON) {
        current+= step;
        continue;
      }
      pretty = u.prettify(num) //, Math.ceil(current));
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

gg.scale.discrete.prototype.maxLabelWidth = function() {
  var levels = this._graph.levels(this._aes);
  if (!levels) { return 0 }
  return u.strlenToPixel(_.chain(levels)
                          .map(function(x) { return String(x).length })
                          .max()
                          .value());
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
    if (this._levels.length == 0) {
      this._levels = [''];
    }
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

gg.scale.discrete.prototype.ticks = function(suggestedNumticks, flip) {
  var numticks = this._suggestNumticks(suggestedNumticks, flip)
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

gg.scale.discrete.prototype.DISCRETE = true;

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
  if (!_.isNumber(this._attr.domain_low)) this._attr.domain_low = this._graph.min(this._aes)
  if (!_.isNumber(this._attr.domain_high)) this._attr.domain_high = this._graph.max(this._aes)
  this._d3scale = d3.scale.linear()
    .domain([this._attr.domain_low, this._attr.domain_high])
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
  if (this.type() == "number") {
    this._attr.domain_low = this._graph.min(this._aes)
    this._attr.domain_high = this._graph.max(this._aes)
  }
}

gg.scale.id.prototype._apply = function(value) {
  return value;
}

gg.scale.id.prototype.maxLabelWidth = function() {
  var levels = this._graph.levels(this._aes);
  if (!levels) { return 0 }
  return u.strlenToPixel(_.chain(levels)
                          .map(function(x) { return String(x).length })
                          .max()
                          .value());
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
  this._colorTable = {};
  this._made = false;
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
    this._colorTable = {};
    var i;
    for (i = 0; i < num_levels; i++) {
      this._colorTable[this._levels[i]] = u.getRandomColor();
    }
  }

  this._made = true;
  return this;
}

gg.scale.palette.prototype._apply = function(input) {
  if (!this._made) {
    this.make();
  }
  if (this._d3scale) { // normal case, <= 20 inputs
    return this._d3scale(input);
  }
  // > 20 inputs
  if (this._colorTable[input]) {
    return this._colorTable[input];
  }
  this.warn(404, "Palette scale got value "+input+" that is not in the domain.");
  return null;
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
  this._d3scale = d3.time.scale();
  //this._facetIndex = -1;
}
gg.scale.time.prototype.make = function(facetIndex) {
  this._facetIndex = _.isNumber(facetIndex) ? facetIndex : -1;
  var domain = this._makeDomain();

  this._d3scale.domain(domain).range(this.range())
}

gg.scale.time.prototype.ticks = function(suggestedNumticks) {
  var numticks = this._suggestNumticks(suggestedNumticks);
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

gg.scale.time.prototype.maxLabelWidth = function() {
  var range;
  try {
    var domain = this._makeDomain()
    range = domain[1] - domain[0]
  } catch (e) {
    var min = this._graph.min(this._aes);
    var max = this._graph.max(this._aes);
    range = max - min
  }
  var guessNumTicks = 20; // oh what the hell...
  range /= guessNumTicks;

  // going to do some CRAZY heuristics
  if (range <= 1000 * 60 * 60) {
    return u.strlenToPixel(15) // minute level (< an hour)
  }
  if (range <= 1000 *  60 * 60 * 24) {
    return u.strlenToPixel(15) // hour level (< day)
  }
  if (range <= 1000 *  60 * 60 * 24 * 15) {
    return u.strlenToPixel(9) // day level (< half mo)
  }
  if (range <= 1000 *  60 * 60 * 24 * 30 * 4) {
    return u.strlenToPixel(9) // month level OR quarter! (< half year)
  }
  return u.strlenToPixel(4)
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
;/**
 * Date: 1/25/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Binning statistic.
 *
 * aggregated values are stored in "count" variable.
 */
;(function(gg) {
gg.stats.bin = u.makeClass('gg.stats.bin', gg.stats.sum);

gg.stats.bin.prototype.compute = function(data, context) {
  // no cloning necessary, because we're already cloning the data inside.
  var result = data.getObject(0);
  var len = data.len()
  var y_mapping = context.mapping.y;
  if (y_mapping) {
    var i = 1; // hack for "need" calculation
    while (i < len && _.isNull(result[y_mapping])) {
      result = data.getObject(i);
      i++;
    }
  }

  var metas = this.makeMeta(data);
  result.$sum = data.len();
  return gg.data([result], metas);
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

  // STEP1: CALCULATE THE BOX ... 
  var q1 = last / 4;
  var q2 = last / 2;
  var q3 = last / 4 * 3;
  var q1val = (sorted[Math.ceil(q1)] + sorted[Math.floor(q1)]) / 2;
  var q2val = (sorted[Math.ceil(q2)] + sorted[Math.floor(q2)]) / 2;
  var q3val = (sorted[Math.ceil(q3)] + sorted[Math.floor(q3)]) / 2;
  // now calculating q0 and q4 
  var IQR = q3val - q1val;
  var q0 = 0; // min point
  while (sorted[q0] < q2val - 1.5*IQR) { q0++; }
  var q0val = sorted[q0]
  var q4 = last; // max point
  while (sorted[q4] > q2val + 1.5*IQR) { q4--; }
  var q4val = sorted[q4]

  result.$q0 = q0val;
  result.$q1 = q1val;
  result.$q2 = q2val;
  result.$q3 = q3val;
  result.$q4 = q4val;
  u.assertNumber(q0val);
  u.assertNumber(q1val);
  u.assertNumber(q2val);
  u.assertNumber(q3val);
  u.assertNumber(q4val);

  result = [result]

  // STEP 2: ADD ALL THE OUTLIERS
  for (var i = 0; i < row.length; i++) {
    if (row[i] > q4val || row[i] < q0val) {
      result.push(data.getObject(i));
    }
  }
  var metas = this.makeMeta(data);
  return gg.data(result, metas);
}

gg.stats.box.prototype.keys = function() {
  var sup = gg.stats.aggregate.prototype.keys.call(this);
  return sup.concat(['$q0','$q1','$q2','$q3','$q4']);
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

gg.stats.mean = u.makeClass('gg.stats.mean', gg.stats.sum);

gg.stats.mean.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var result = data.getObject(0);
  var len = data.len()
  var y_mapping = mapping.y;

  if (y_mapping) {
    var i = 1; // hack for "need" calculation
    while (i < len && _.isNull(result[y_mapping])) {
      result = data.getObject(i);
      i++;
    }
    var sum = u.sum.apply(data.get(y_mapping));
    var mean = sum / data.len();
    result.$sum = mean;
  } else {
    result.$sum = context.attr.y;
  }
  var metas = this.makeMeta(data);
  return gg.data([result], metas);
};

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
  var partial_negative = 0;
  if (y_mapping) {
    var represent = data.getTypeObj(y_mapping).represent;
    var sort_by = mapping.group_stats || y_mapping;
    var sorter = function(x) { return represent(x[sort_by]) };
    var sorted = _.sortBy(data.getObjects(), sorter);
    var reverse = true;
    for (var i = 0 ; i < length; i++) {
      var j = reverse ? length - i - 1 : i;
      var obj = sorted[j];
      var value = obj[y_mapping];
      // skip the negative values.
      if (value < 0) {
        obj.$partial_1 = partial_negative;
        partial_negative += value;
        obj.$partial_2 = partial_negative;
      } else {
        obj.$partial_1 = partial;
        partial += value;
        obj.$partial_2 = partial;
      }
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
  var metas = this.makeMeta(data);
  return gg.data(result, metas);
}

gg.stats.stack.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.aggregate.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {
    'y_1':'$partial_1',
    'y_2':'$partial_2'});
}

gg.stats.stack.prototype.keys = function() {
  var sup = gg.stats.aggregate.prototype.keys.call(this);
  return sup.concat(['$partial_1','$partial_2']);
}

})(gg);
;;(function(gg){
"use strict";

gg.stats.tilestat = u.makeClass('gg.stats.tilestat', gg.stats.base);

gg.stats.tilestat.prototype.entry = function(data, mapping, attr) {
  var groupFunctions = {}
  if (mapping.x) {
    var x = mapping.x;
    groupFunctions.group = createGroupFunction(data.min(x), data.max(x), 10);
    mapping.group = x;
  }
  if (mapping.y) {
    var y = mapping.y;
    groupFunctions.group2 = createGroupFunction(data.min(y), data.may(y), 10);
    mapping.group2 = y;
  }

  return this.group(data, mapping, attr, groupFunctions);
}

var createGroupFunction = function(min, max, bins) {
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
};

gg.stats.tilestat.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.base.prototype.imputeMapping.call(
    this, map, {'group_stats_1' : 'x' , 'group_stats_2' : 'y'} );
  return _.extend(mapping, { 'y':'$count' });
}

})(gg);
;/**
 * Date: 6/21/2012
 * Copyright 2012 Beta Cubed. All rights reserved.
 *
 * Useful statistics in categorical variable
 * Returns how many unique categorical values there are per group.
 */

;(function(gg){
"use strict";
gg.stats.unique = u.makeClass('gg.stats.unique', gg.stats.aggregate);

gg.stats.unique.prototype.compute = function(data, context) {
  var mapping = context.mapping;
  var attr = context.attr;
  var result = data.getObject(0);
  var key = mapping.y;
  if (key) {
    result.$unique = data.levels(key).length;
  } else {
    result.$unique = 0;
  }

  var metas = this.makeMeta(data);
  return gg.data([result], metas);
};

gg.stats.unique.prototype.imputeMapping = function(map) {
  var mapping = gg.stats.aggregate.prototype.imputeMapping.call(
    this, map, {'group_stats' : 'x' } );
  return _.extend(mapping, {'y_override':'$unique'});
}

gg.stats.unique.prototype.keys = function() {
  var sup = gg.stats.aggregate.prototype.keys.call(this);
  return sup.concat(['$unique']);
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
  return gg.type.category.prototype.represent(value);
}

/**
 * Convert the given value to String.
 */
gg.type.category.prototype.represent = function(value) {
  if (_.isString(value)) {
    return value;
  } else if (value == null) {
    // null or undefined;
    return "";
  } else if (_.isNumber(value)) {
    return value.toString();
  }
  return "" + value;
}

gg.type.category.prototype.sort = function(a, b) {
  if (a === b) {
    return 0;
  }
  if (!_.isString(a)) a = "" + a;
  if (!_.isString(b)) b = "" + b;

  var al = a.toLowerCase(), bl = b.toLowerCase();

  if (al === bl) {
    if (a < b) return -1;
    if (a > b) return 1;
    return 0;
  } else {
    if (al < bl) return -1;
    if (al > bl) return 1;
    return 0;
  }
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

var _extractTime = function(date) {
  if (_.isNumber(date)) {
    return date;
  }
  return date.getTime();
};

gg.type.date.prototype.min = function(values) {
  return this.coerce(
    _.min(_.reject(values, _.isNull), _extractTime)
  );
}

gg.type.date.prototype.max = function(values) {
  return this.coerce(
    _.max(_.reject(values, _.isNull), _extractTime)
  );
}

gg.type.date.prototype.coerce = function(value) {
  if (_.isDate(value)) {
    return value.getTime();
  } else if (_.isNumber(value)) {
    return value;
  }
  return Number(value);
}

gg.type.date.prototype.represent = function(value) {
  if (_.isNumber(value)) {
    return value;
  } if (_.isDate(value)) {
    return value.getTime();
  }
  return null;
}

gg.type.date.prototype.validate = function(value) {
  return _.isNumber(value) || _.isDate(value);
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

gg.type.number.prototype.min = gg.type.date.prototype.min;

gg.type.number.prototype.max = gg.type.date.prototype.max;

gg.type.number.prototype.coerce = function(value) {
  if (_.isDate(value)) {
    return value.getTime();
  } else if (_.isNumber(value)) {
    return value;
  }
  return Number(value);
}

gg.type.number.prototype.represent = gg.type.date.prototype.represent;

gg.type.number.prototype.validate = function(value) {
  return _.isNumber(value);
}

gg.type.number.prototype.sort = function(a, b) {
  if (a === b) {
    return 0;
  }

  if (a == null) {
    return -1;
  } else if (b == null) {
    return 1
  }

  if (a < b) {
    return -1;
  } else if (a > b) {
    return 1;
  }
  return 0;
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
  var metas = this.makeMeta(data);
  return gg.data(result, metas);
}

})(gg);
;// capture other libraries.
var _ = window._;
var d3 = window.d3;
;
return gg;})();
