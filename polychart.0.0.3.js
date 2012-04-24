/** Generated on 2012-04-24T11:39:02.320381 */
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
