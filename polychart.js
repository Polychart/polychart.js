/*
GNU GENERAL PUBLIC LICENSE
   Version 3, 29 June 2007
 */
var gg = (function() {
  var gg = gg || {};
  var u = u || {};
  var console = console || {"log":function() {
  }, "assert":function() {
  }};
  (function(gg, u) {
    u.makeClass = function(name, SuperClass) {
      var _key = {};
      var Clazz = function(key, args) {
        if(this instanceof Clazz) {
          if(typeof this.init == "function") {
            this.init.apply(this, key === _key ? args : arguments)
          }
        }else {
          return new Clazz(_key, arguments)
        }
      };
      if(arguments.length >= 2) {
        Clazz.prototype = new SuperClass;
        Clazz.prototype.constructor = Clazz;
        Clazz._super = SuperClass.prototype
      }
      if(!u.undef(name)) {
        Clazz.prototype._cls_name = name
      }
      return Clazz
    };
    u.notImplemented = function() {
      throw"Not implemented.";
    };
    u.undef = function(obj) {
      return typeof obj == "undefined"
    };
    u.constfunc = function(obj) {
      return function() {
        return obj
      }
    };
    u.invertedIndex = function(ary) {
      var result = {};
      _.each(ary, function(v, k) {
        result[v] = k
      });
      return result
    };
    u.translate = function(xpos, ypos) {
      console.assert(typeof xpos == "number", "xpos is number");
      console.assert(typeof ypos == "number", "ypos is number");
      return"translate(" + xpos + "," + ypos + ")"
    };
    u.matrix = function(a, b, c, d, tx, ty) {
      return"matrix(" + [a, b, c, d, tx, ty].join(",") + ")"
    };
    u.identity = function(l) {
      return l
    };
    u.cloneobj = function(obj) {
      var newobj = _.clone(obj);
      newobj.constructor = obj.constructor;
      return newobj
    };
    u.postfix = function(num, pow) {
      var POSTFIXES = {"0":"", 3:"k", 6:"m", 9:"b", 12:"t"};
      if(!_.isUndefined(POSTFIXES[pow])) {
        return num + POSTFIXES[pow]
      }
      return num + "x10^" + pow
    };
    u.prettify = function(num, exp) {
      if(arguments.length == 1) {
        exp = -Math.floor(Math.log(Math.abs(num)) / Math.LN10 - 1);
        if(num > 0 && num < 10) {
          exp = 0
        }
      }
      var exp_rounded = exp;
      if(exp % 3 == 1) {
        exp_rounded -= 1
      }else {
        if(exp % 3 == 2) {
          exp_rounded -= 2
        }else {
          if(exp % 3 == -1) {
            exp_rounded += 1
          }else {
            if(exp % 3 == -2) {
              exp_rounded += 2
            }
          }
        }
      }
      var exp_max = Math.max(exp, exp_rounded);
      var rounded = Math.round(num * Math.pow(10, exp_max)) / Math.pow(10, exp_max - exp_rounded);
      return u.postfix(rounded.toFixed(exp_max - exp_rounded), -exp_rounded)
    };
    u.roundTo = function(numeric, digits) {
      var base = Math.pow(10, digits);
      return Math.round(numeric * base) / base
    };
    u.array = function(length, initializer) {
      var arr = [], i = length;
      var val;
      var hasInit = _.isFunction(initializer);
      while(i--) {
        if(hasInit) {
          val = initializer()
        }else {
          val = initializer
        }
        arr[i] = val
      }
      return arr
    };
    u.grid = function(rows, cols, initializer) {
      var r = 0, c = 0;
      var result = [];
      var hasInit = _.isFunction(initializer);
      for(r = 0;r < rows;r++) {
        var rowAry = [];
        for(c = 0;c < cols;c++) {
          if(hasInit) {
            rowAry.push(initializer())
          }else {
            rowAry.push(initializer)
          }
        }
        result.push(rowAry)
      }
      return result
    };
    u.opts = function() {
      var GetterSetter = function(key, value) {
        var self = this;
        var updateFunction = this._optsUpdate;
        if(!_.isFunction(updateFunction)) {
          updateFunction = function() {
          }
        }else {
          updateFunction = _.bind(updateFunction, this)
        }
        if(arguments.length == 1) {
          if(!_.isString(key) && _.keys(key).length > 0) {
            _.each(key, function(v, k) {
              self._attr[k] = v;
              updateFunction(k, v)
            });
            return this
          }
          var output = this._attr[key];
          return output
        }
        console.assert(_.isString(key));
        this._attr[key] = value;
        updateFunction(key, value);
        return this
      };
      return GetterSetter
    };
    u.dataGetter = function() {
      var data = function(data) {
        if(arguments.length === 0) {
          return this._data
        }
        if(!data || data._cls_name != "gg.data") {
          data = gg.data(data)
        }
        this._data = data;
        return this
      };
      return data
    };
    u.calculateFacet = function(data, facet) {
      if(!facet) {
        return[data]
      }
      var nrow = facet.nrow();
      var ncol = facet.ncol();
      var initializer = function() {
        return gg.data([], data.keys())
      };
      var result = u.array(nrow * ncol, initializer);
      var i, len = data.len();
      for(i = 0;i < len;i++) {
        var obj = data.getObject(i);
        var idx = facet.bin(obj);
        result[idx].push(obj)
      }
      return result
    };
    u.doubleMap = function(square, iterator) {
      return _.map(square, function(line) {
        return _.map(line, iterator)
      })
    };
    u.tripleMap = function(cube, iterator) {
      return _.map(cube, function(square) {
        return _.map(square, function(line) {
          return _.map(line, iterator)
        })
      })
    };
    var _empty = [];
    u.concat = function(arrays) {
      return _empty.concat.apply(_empty, arrays)
    };
    u.add = function(f, g) {
      var fFunc = _.isFunction(f);
      var gFunc = _.isFunction(g);
      if(fFunc && gFunc) {
        return function(d) {
          return f(d) + g(d)
        }
      }else {
        if(fFunc) {
          return function(d) {
            return f(d) + g
          }
        }else {
          if(gFunc) {
            return function(d) {
              return f + g(d)
            }
          }else {
            return f + g
          }
        }
      }
    };
    u.sub = function(f, g) {
      var fFunc = _.isFunction(f);
      var gFunc = _.isFunction(g);
      if(fFunc && gFunc) {
        return function(d) {
          return f(d) - g(d)
        }
      }else {
        if(fFunc) {
          return function(d) {
            return f(d) - g
          }
        }else {
          if(gFunc) {
            return function(d) {
              return f - g(d)
            }
          }else {
            return f - g
          }
        }
      }
    };
    u.evaluate = function(attr, i) {
      if(_.isFunction(attr)) {
        return attr(i)
      }
      return attr
    };
    u.unionType = function(array) {
      if(array.length == 1) {
        return array[0]
      }
      var uniq = _.uniq(array);
      if(uniq.length == 1) {
        return array[0]
      }
      return"discrete"
    };
    u.bool = function(x) {
      return x ? true : false
    };
    u.startswith = function(x, head) {
      if(!(_.isString(head) && _.isString(x))) {
        return false
      }
      var lh = head.length;
      var lx = x.length;
      if(lh > lx) {
        return false
      }
      return x.slice(0, lh) === head
    };
    u.normalizeDom = function(dom) {
      if(_.isString(dom)) {
        return d3.select(dom)
      }
      if(dom.jquery) {
        return d3.select(dom[0])
      }else {
        if(dom.nodeType) {
          return d3.select(dom)
        }else {
          return dom
        }
      }
    };
    u.instantiate = function(cls) {
      if(_.isString(cls)) {
        return gg[cls]()
      }
      if(cls && cls.prototype && cls.prototype._cls_name) {
        return cls()
      }
      return cls
    };
    u.isURL = function(s) {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
      return _.isString(s) && regex.test(s)
    }
  })(gg, u);
  (function(gg) {
    gg.graph = u.makeClass("gg.graph");
    gg.graph.prototype.init = function(data) {
      this._data = null;
      this.data(data);
      this._layers = [];
      this._scales = {};
      this._coord = null;
      this._facet = null;
      this._attr = {"width":300, "height":300, "padding-left":50, "padding-right":50, "padding-top":50, "padding-bottom":50, "legend-position":"right", "legend-width":60, "legend-height":30, "spacing-x":20, "spacing-y":40, "facet-x":20, "title":"", "title-size":15, "title-bold":true, "label-size":12, "label-bold":false, "axis-y":"left", "axis-y-line":null, "axis-y-label":null, "axis-y-ticks":null, "axis-y-ticklength":null, "axis-y-color":null, "axis-y-strokewidth":null, "axis-y-":null, "axis-x":"bottom", 
      "axis-x-line":null, "axis-x-label":null, "axis-x-ticks":null, "axis-x-ticklength":null, "axis-x-color":null, "axis-x-strokewidth":null, "grid-render-vertical":null, "grid-render-horizontal":null, "grid-stroke":null, "grid-strokewidth":null, "grid-dasharray":null, "dom":null};
      this._doms = {};
      this._dimCache = null;
      this._rendered = false
    };
    gg.graph.prototype.data = u.dataGetter();
    gg.graph.prototype._varlabel = function(aes) {
      var userdefined = this.opts("label-" + aes);
      return!u.undef(userdefined) ? userdefined : _.chain(this._layers).map(function(l) {
        return l.map(aes)
      }).filter(u.identity).value()[0]
    };
    var _checkLayer = function(graph) {
      if(!graph._layers) {
        console.log("_checkLayer being called without _layer")
      }
    };
    gg.graph.prototype.type = function(key, isvar) {
      _checkLayer(this);
      var result = _.invoke(this._layers, "type", key, isvar);
      return u.unionType(result)
    };
    gg.graph.prototype.min = function(key, isvar) {
      _checkLayer(this);
      var result = _.invoke(this._layers, "min", key, isvar);
      return _.min(result)
    };
    gg.graph.prototype.max = function(key, isvar) {
      _checkLayer(this);
      var result = _.invoke(this._layers, "max", key, isvar);
      return _.max(result)
    };
    gg.graph.prototype.levels = function(key, isvar) {
      _checkLayer(this);
      var result = _.invoke(this._layers, "levels", key, isvar);
      return _.uniq(_.flatten(result))
    };
    gg.graph.prototype.defaultMin = function(aes) {
      if(this._layers.length === 0) {
        return null
      }
      var result = _.chain(this._layers).invoke("defaultMin", aes).filter(_.isNumber).min().value();
      if(result != Infinity) {
        return result
      }
      return null
    };
    gg.graph.prototype.defaultMax = function(aes) {
      if(this._layers.length === 0) {
        return null
      }
      var result = _.chain(this._layers).invoke("defaultMax", aes).filter(_.isNumber).max().value();
      if(result != -Infinity) {
        return result
      }
      return null
    };
    gg.graph.prototype.dataLevels = function(key) {
      var layerlevels = function(l) {
        return l.data().levels(key)
      };
      return _.chain(this._layers).map(layerlevels).flatten().uniq().value()
    };
    gg.graph.prototype.opts = u.opts();
    gg.graph.prototype._optsUpdate = function(key, val) {
      if(this._rendered) {
        if(key == "title") {
          this._update_label("_debug_title", val)
        }else {
          if(key == "label-x") {
            this._update_label("_debug_x_label", val)
          }else {
            if(key == "label-y") {
              this._update_label("_debug_y_label", val)
            }
          }
        }
      }
    };
    gg.graph.prototype.layer = function(layer) {
      layer = u.instantiate(layer);
      console.assert(layer, "newlayer must be passed in.");
      console.assert(layer._detached, "cannot attach already attached object.");
      var cloned = u.cloneobj(layer);
      cloned.attach(this);
      this._layers.push(cloned);
      return this
    };
    gg.graph.prototype.scale = function(key, scale) {
      console.assert(key, "key must be passed in.");
      console.assert(scale, "scale must be passed in.");
      scale = u.instantiate(scale);
      var cloned = u.cloneobj(scale);
      cloned.attach(this, key);
      this._scales[key] = cloned;
      return this
    };
    gg.graph.prototype.coord = function(coord) {
      if(arguments.length === 0) {
        return this._coord
      }
      coord = u.instantiate(coord);
      var cloned = null;
      cloned = u.cloneobj(coord);
      cloned.attach(this);
      this._coord = cloned;
      return this
    };
    gg.graph.prototype.facet = function(facet) {
      if(arguments.length === 0) {
        return this._facet
      }
      facet = u.instantiate(facet);
      console.assert(facet, "facet must be passed in.");
      var cloned = u.cloneobj(facet);
      cloned.attach(this);
      this._facet = cloned;
      return this
    };
    gg.graph.prototype.render_label = function(plot, text, xpos, ypos, cssclass) {
      var cachedDom = this._doms[cssclass];
      var dom = null;
      if(cachedDom) {
        dom = cachedDom
      }else {
        dom = this.plot.append("svg:g").attr("class", cssclass);
        this._doms[cssclass] = dom
      }
      return dom.attr("transform", u.translate(xpos, ypos)).append("text").attr("text-anchor", "middle").text(text)
    };
    gg.graph.prototype.render_title = function(plot, xpos, ypos) {
      this.render_label(plot, this.opts("title"), xpos, ypos, "_debug_title").style("font-weight", this.opts("title-bold") ? "bold" : "normal").style("font-size", this.opts("title-size"))
    };
    gg.graph.prototype.render_x_label = function(plot, xpos, ypos) {
      this.render_label(plot, this._varlabel("x"), xpos, ypos, "_debug_x_label").style("font-weight", this.opts("label-bold") ? "bold" : "normal").style("font-size", this.opts("label-size"))
    };
    gg.graph.prototype.render_y_label = function(plot, xpos, ypos) {
      this.render_label(plot, this._varlabel("y"), xpos, ypos, "_debug_y_label").attr("transform", "rotate(-90 0 0)").style("font-weight", this.opts("label-bold") ? "bold" : "normal").style("font-size", this.opts("label-size"))
    };
    gg.graph.prototype._update_label = function(cssclass, text) {
      this._doms[cssclass].select("text").text(text)
    };
    gg.graph.prototype._calculateDims = function() {
      var additionalScales = _.keys(this._scales).length - 2;
      var chartWidth = this.opts("width") - this.opts("padding-left") - this.opts("padding-right");
      var chartHeight = this.opts("height") - this.opts("padding-top") - this.opts("padding-bottom");
      console.assert(_.isNumber(chartWidth));
      console.assert(_.isNumber(chartHeight));
      var ncol = this._facet ? this._facet.ncol() : 1;
      var nrow = this._facet ? this._facet.nrow() : 1;
      var spacingX = ncol == 1 ? 0 : this.opts("spacing-x");
      var spacingY = nrow == 1 ? 0 : this.opts("spacing-y");
      var result = {ncol:ncol, nrow:nrow, chartWidth:chartWidth, chartHeight:chartHeight, eachWidth:(chartWidth - (ncol - 1) * spacingX) / ncol, eachHeight:(chartHeight - nrow * spacingY) / nrow, spacingX:spacingX, spacingY:spacingY, additionalScales:additionalScales};
      this._dimCache = result;
      return result
    };
    gg.graph.prototype._renderAxis = function(nrow, ncol, width, height) {
      var row = null, col = null, position = null;
      var self = this;
      var group = this.plot.append("svg:g").attr("class", "axis");
      var flip = this.coord()._flip !== (this.coord()._cls_name === "gg.coord.polar");
      var xscale = flip ? this._scales.y : this._scales.x;
      var yscale = flip ? this._scales.x : this._scales.y;
      var xaxis = gg.guide.axis(xscale, "x");
      var yaxis = this.coord()._cls_name === "gg.coord.polar" ? gg.guide.axis(yscale, "y", null, true) : gg.guide.axis(yscale, "y");
      _.each(this._attr, function(val, key) {
        var begin = key.substr(0, 7);
        if(begin == "axis-x-" && !_.isNull(val)) {
          xaxis.opts(key.substr(7), val)
        }else {
          if(begin == "axis-y-" && !_.isNull(val)) {
            yaxis.opts(key.substr(7), val)
          }else {
            if(begin.substr(0, 5) == "axis-") {
              xaxis.opts(key.substr(5), val);
              yaxis.opts(key.substr(5), val)
            }
          }
        }
      });
      var getGroup = function(row, col, position) {
        var xpos = self.xposition(col);
        var ypos = self.yposition(row);
        if(position == "right") {
          xpos += width
        }else {
          if(position == "bottom") {
            ypos += height
          }else {
            if(position == "center") {
              xpos += width / 2;
              ypos += height / 2
            }
          }
        }
        return group.append("svg:g").attr("class", "_axis_" + position).attr("transform", u.translate(xpos - 0.5, ypos - 0.5))
      };
      for(row = 0;row < nrow;row++) {
        for(col = 0;col < ncol;col++) {
          position = this.opts("axis-y");
          if(position == "left" && col == 0 || position == "right" && col == ncol - 1) {
            yaxis.renderLinear(getGroup(row, col, position), position)
          }
          position = this.opts("axis-x");
          if(position == "none") {
          }else {
            if(this.coord()._cls_name === "gg.coord.polar") {
              xaxis.renderCircular(getGroup(row, col, "circular"), "circular")
            }else {
              if(position == "bottom" && row == nrow - 1 || position == "top" && row == 0) {
                xaxis.renderLinear(getGroup(row, col, position), position)
              }else {
                xaxis.renderLinear(getGroup(row, col, position), position, {"ticks":false, "labels":false})
              }
            }
          }
        }
      }
    };
    gg.graph.prototype._renderGrid = function(nrow, ncol) {
      var group = this.plot.append("svg:g").attr("class", "axis");
      var grid = gg.guide.grid(this._scales.x, this._scales.y, this._coord);
      if(this.coord()._cls_name === "gg.coord.polar") {
        grid.opts("render-vertical", true)
      }
      _.each(this._attr, function(val, key) {
        if(key.substr(0, 5) == "grid-" && !_.isNull(val)) {
          grid.opts(key.substr(5), val)
        }
      });
      for(var row = 0;row < nrow;row++) {
        for(var col = 0;col < ncol;col++) {
          var g = this.plot.append("svg:g").attr("class", "_debug_grid").attr("transform", u.translate(this.xposition(col), this.yposition(row) - 0.5));
          grid.render(g)
        }
      }
    };
    gg.graph.prototype.makeplot = function(dom) {
      if(_.isUndefined(dom)) {
        dom = d3.select(this.opts("dom"))
      }else {
        dom = u.normalizeDom(dom)
      }
      dom.selectAll("svg").remove();
      return dom.append("svg:svg").attr("width", this.opts("width")).attr("height", this.opts("height"))
    };
    gg.graph.prototype.setDefaultScales = function() {
      var toadd = _.chain(this._layers).map(function(l) {
        return _.keys(l.getMap())
      }).flatten().uniq().without(_.keys(this._scales), "group").value();
      var scales = this._scales;
      var self = this;
      _.each(toadd, function(aes) {
        var type = self.type(aes);
        var scale = null;
        if(aes == "x" || aes == "y") {
          scale = type == "continuous" ? gg.scale.continuous() : gg.scale.discrete()
        }else {
          if(aes == "color" || aes == "stroke") {
            scale = type == "continuous" ? gg.scale.gradient() : gg.scale.palette()
          }else {
            if(aes == "symbol") {
              scale = gg.scale.symbol()
            }else {
              scale = gg.scale.id()
            }
          }
        }
        self.scale(aes, scale)
      });
      return this
    };
    gg.graph.prototype.bindDerivedScales = function() {
      var s = this._scales;
      _.each(s, function(scale, key) {
        if(key.indexOf("_") > -1) {
          var splitted = key.split("_", 1);
          var base = splitted[0];
          s[key] = s[base]
        }
      })
    };
    gg.graph.prototype.setDefaultCoord = function() {
      if(!this._coord) {
        this.coord(gg.coord.cart())
      }
      console.assert(this._coord, "Coordinates must be set.");
      return this
    };
    gg.graph.prototype._clearCache = function() {
      this._doms = {};
      this._dimCache = null
    };
    gg.graph.prototype._preRender = function() {
      this._debugStartTime = new Date;
      this._clearCache();
      this._rendered = false
    };
    gg.graph.prototype._postRender = function() {
      var endTime = new Date;
      var diff = endTime - this._debugStartTime;
      this._rendered = true;
      console.log("render() took", diff, " ms.")
    };
    gg.graph.prototype.xposition = function(col) {
      var c = this._dimCache;
      console.assert(c, "_dimCache is required.");
      return this.opts("padding-left") + col * (c.eachWidth + c.spacingX)
    };
    gg.graph.prototype.yposition = function(row) {
      var c = this._dimCache;
      console.assert(c, "_dimCache is required.");
      return this.opts("padding-top") + row * (c.eachHeight + c.spacingY) + c.spacingY
    };
    gg.graph.prototype.renderLayer = function(layer, xOffset, yOffset, facetIndex) {
      var dim = this._calculateDims();
      var ew = dim.eachWidth;
      var eh = dim.eachHeight;
      var g = this.plot.append("svg:g").attr("class", "_debug_layer").attr("transform", u.translate(xOffset, yOffset));
      var context = {cell:g, rawScales:this._scales, coord:this._coord, facetIndex:facetIndex};
      layer.renderEntry(context)
    };
    gg.graph.prototype.render = function(dom) {
      this._preRender();
      var self = this;
      var scales = this._scales;
      var facet = this._facet;
      _.invoke(this._layers, "_dataChanged");
      _.invoke(this._layers, "calculate");
      this.plot = this.makeplot(dom);
      this.setDefaultScales().setDefaultCoord();
      this.bindDerivedScales();
      console.assert(scales.x, "scales.x is required");
      console.assert(scales.y, "scales.y is required");
      var dims = this._calculateDims();
      var ncol = dims.ncol, nrow = dims.nrow, chartWidth = dims.chartWidth, chartHeight = dims.chartHeight, eachWidth = dims.eachWidth, eachHeight = dims.eachHeight, spacingX = dims.spacingX, spacingY = dims.spacingY, additionalScales = dims.additionalScales;
      this._coord.configScale({x:0, y:0, width:eachWidth, height:eachHeight}, scales);
      _.each(scales, function(scale, aes) {
        scale.make()
      });
      this._renderGrid(nrow, ncol);
      var facetIndex = 0;
      for(var i = 0;i < nrow;i++) {
        for(var j = 0;j < ncol;j++) {
          for(var k = 0;k < this._layers.length;k++) {
            var _layer = self._layers[k];
            this.renderLayer(_layer, this.xposition(j), this.yposition(i), facetIndex)
          }
          facetIndex++
        }
      }
      this._renderAxis(nrow, ncol, eachWidth, eachHeight);
      if(nrow > 1 || ncol > 1) {
        for(var i = 0;i < nrow;i++) {
          for(var j = 0;j < ncol;j++) {
            var g = this.plot.append("svg:g").attr("class", "_debug_facet_label").attr("transform", u.translate(this.xposition(j) + eachWidth / 2, this.yposition(i) - spacingY * 0.1));
            this._facet.renderLabel(g, i, j)
          }
        }
      }
      if(this._coord._name === "polar") {
      }else {
        this.render_y_label(this.plot, this.opts("padding-left") * 0.35, this.opts("padding-top") + chartHeight / 2);
        this.render_x_label(this.plot, this.opts("padding-left") + chartWidth / 2, this.opts("padding-top") + chartHeight + 35)
      }
      this.render_title(this.plot, this.opts("width") / 2, this.opts("padding-top") * 0.7);
      if(this.opts("legend-position") != "none") {
        var xpos = this.opts("padding-left") + chartWidth + 10;
        var ypos = this.opts("padding-top");
        var g = this.plot.append("svg:g").attr("class", "_debug_legends").attr("transform", u.translate(xpos, ypos));
        gg.guide.legend(this, this._layers, this._scales).render(g)
      }
      this._postRender();
      return this
    }
  })(gg);
  (function(gg) {
    gg.coord = gg.coord || {};
    gg.coord.base = u.makeClass("gg.coord.base");
    gg.coord.base.prototype.init = function() {
      this._graph = null;
      this._detached = true
    };
    gg.coord.base.prototype.attach = function(graph) {
      console.assert(this._detached);
      this._detached = false;
      this._graph = graph;
      return this
    };
    gg.coord.base.prototype.set = function(attr, value) {
      this.attr[attr] = value;
      return this
    };
    gg.coord.base.prototype.configScale = function(dim, scales) {
      u.notImplemented()
    };
    gg.coord.base.prototype.transX = function(x, y) {
      u.notImplemented()
    };
    gg.coord.base.prototype.transY = function(x, y) {
      u.notImplemented()
    };
    gg.coord.base.prototype.drawAxis = function(aes, plot) {
      u.notImplemented()
    };
    gg.coord.base.prototype.line = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.vline = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.hline = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.rect = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.point = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.poly = function() {
      u.notImplemented()
    };
    gg.coord.base.prototype.text = function() {
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:text");
        this.attachAttr(selector)
      })
    };
    var pairmap = function(arrayA, arrayB, func) {
      var l = arrayA.length;
      var i = 0;
      var result = [];
      for(i = 0;i < l;i++) {
        result.push(func(arrayA[i], arrayB[i]))
      }
      return result
    };
    gg.coord.DataFunc = function(shape) {
      var sort = shape._attrs.sort;
      return function(data) {
        var raw;
        if(sort) {
          raw = _.sortBy(data.rawObjects(), sort)
        }else {
          raw = data.rawObjects()
        }
        var thetaVals = _.map(raw, shape._attrs.x);
        var rVals = _.map(raw, shape._attrs.y);
        return[thetaVals, rVals]
      }
    };
    gg.coord.LineFunc = function(shape) {
      var a = shape._attrs;
      return function(d) {
        var evalf = function(attr) {
          return _.isFunction(attr) ? attr(d) : attr
        };
        var x1, x2, y1, y2;
        if(a.x) {
          x1 = x2 = a.x
        }else {
          x1 = a.x1;
          x2 = a.x2
        }
        if(a.y) {
          y1 = y2 = a.y
        }else {
          y1 = a.y1;
          y2 = a.y2
        }
        var x = _.map([x1, x2], evalf);
        var y = _.map([y1, y2], evalf);
        return[x, y]
      }
    };
    gg.coord.RectFunc = function(shape) {
      var a = shape._attrs;
      return function(d) {
        var evalf = function(attr) {
          return _.isFunction(attr) ? attr(d) : attr
        };
        var x1 = a.x1, x2 = a.x2, y1 = a.y1, y2 = a.y2;
        var x = _.map([x1, x1, x2, x2], evalf);
        var y = _.map([y1, y2, y2, y1], evalf);
        return[x, y]
      }
    };
    gg.coord.base.prototype.points = function(shape, datafunc) {
      var a = shape._attrs;
      var postprocess = a.postprocess;
      var transX = _.bind(this.transX, this);
      var transY = _.bind(this.transY, this);
      return function(data) {
        var raw;
        var length;
        var tmp = datafunc(data);
        var thetaVals = tmp[0];
        var rVals = tmp[1];
        length = thetaVals.length;
        if(_.isFunction(postprocess)) {
          postprocess(thetaVals, rVals)
        }
        var xVals = pairmap(thetaVals, rVals, transX);
        var yVals = pairmap(thetaVals, rVals, transY);
        var result = [];
        console.assert(xVals.length === yVals.length);
        var newLength = xVals.length;
        for(var i = 0;i < newLength;i++) {
          result.push(xVals[i]);
          result.push(yVals[i])
        }
        return result.join(" ")
      }
    };
    gg.coord.AbstractShape = function(coord, callback) {
      console.assert(callback, "callback is required.");
      console.assert(coord, "coord is required.");
      var shape = function(selector) {
        return callback.call(shape, selector)
      };
      shape._attrs = {};
      shape.attr = function(key, value) {
        this._attrs[key] = value;
        return this
      };
      shape.attachAttr = function(selector, exclude, additional) {
        _.each(this._attrs, function(value, key) {
          if(_.indexOf(exclude, key) === -1) {
            if(key === "text") {
              selector.text(value)
            }else {
              selector.attr(key, value)
            }
          }
        });
        _.each(additional, function(value, key) {
          selector.attr(key, value)
        });
        selector.on("mouseover", function(d, i) {
          var self = d3.select(this);
          var fill = self.attr("fill");
          if(fill != "none") {
            d._gg_oldfill = fill;
            self.attr("fill", d3.rgb(fill).darker().toString())
          }else {
            if(self.attr("stroke-width") > 0) {
              d._gg_oldstroke = self.attr("stroke");
              self.attr("stroke", d3.rgb(d._gg_oldstroke).darker().toString())
            }
          }
          self.style("cursor", "pointer");
          self.style("cursor", "hand")
        });
        selector.on("mouseout", function(d, i) {
          var self = d3.select(this);
          var fill = self.attr("fill");
          if(fill != "none") {
            self.attr("fill", d._gg_oldfill)
          }else {
            if(self.attr("stroke-width") > 0) {
              self.attr("stroke", d._gg_oldstroke)
            }
          }
          self.style("cursor", "normal")
        });
        return this
      };
      shape.style = function(s) {
        this.attr("stroke", s.stroke).attr("stroke-width", s.strokewidth).attr("fill-opacity", s.opacity).attr("fill", s.color);
        return this
      };
      return shape
    }
  })(gg);
  (function(gg) {
    gg.facet = gg.facet || {};
    gg.facet.base = u.makeClass("gg.facet.base");
    gg.facet.base.prototype.init = function() {
      this._graph = null;
      this._detached = true;
      this._attr = {}
    };
    gg.facet.base.prototype.attach = function(graph) {
      console.assert(this._detached, "already attached.");
      this._graph = graph;
      this._detached = false
    };
    gg.facet.base.prototype.attr = function(attr, value) {
      if(arguments.length === 1) {
        return this._attr[attr]
      }
      this._attr[attr] = value;
      return this
    };
    gg.facet.base.bin = function(obj) {
      throw"Not implemented";
    };
    gg.facet.base.prototype.ncol = function() {
      throw"Not implemented!";
    };
    gg.facet.base.prototype.nrow = function() {
      throw"Not implemented!";
    };
    gg.facet.base.prototype.renderLabel = function(g, y, x) {
      throw"Not implemented!";
    }
  })(gg);
  (function(gg) {
    gg.guide = gg.guide || {};
    gg.guide.base = u.makeClass("gg.guide.base");
    gg.guide.base.prototype.init = function() {
      this._attr = {num_ticks:5}
    };
    gg.guide.base.prototype.opts = u.opts()
  })(gg);
  (function(gg) {
    gg.layer = gg.layer || {};
    gg.layer.base = u.makeClass("gg.layer.base");
    var Mapping = function(name, defaultMapping) {
      this.name = name;
      this.defaultMapping = defaultMapping ? true : false
    };
    gg.layer.base.prototype.init = function(data) {
      this._attr = {"color":"steelblue", "opacity":0.9, "stroke":"#FFFFFF", "strokewidth":0, "facet":true};
      this._graph = null;
      this._data = null;
      this._facetedData = null;
      this._statData = null;
      this._stats = undefined;
      this._detached = true;
      this._default_stats = gg.stats.id;
      this._calculated = false
    };
    gg.layer.base.prototype.opts = u.opts();
    gg.layer.base.prototype.data = u.dataGetter();
    gg.layer.base.prototype.stats = function(stats) {
      if(arguments.length === 1) {
        if(_.isString(stats)) {
          stats = gg.stats[stats]()
        }
        this._stats = stats;
        this._applyDefaultMappings();
        return this
      }
      if(_.isUndefined(this._stats)) {
        var defaultStats = this._default_stats();
        this._stats = defaultStats
      }
      return this._stats
    };
    gg.layer.base.prototype.attach = function(graph) {
      console.assert(this._detached);
      if(!this.data()) {
        this.data(graph.data())
      }
      this._detached = false;
      this._graph = graph;
      return this
    };
    gg.layer.base.prototype.defaultScales = function() {
      return{}
    };
    gg.layer.base.prototype.defaultMin = function(aes) {
      return null
    };
    gg.layer.base.prototype.defaultMax = function(aes) {
      return null
    };
    gg.layer.base.prototype.requiredMap = function() {
      return null
    };
    gg.layer.base.prototype.calculateStats = function(data) {
      var mapping = this.getMap();
      var result = this.stats().group(data, mapping);
      return result
    };
    gg.layer.base.prototype.calculate = function() {
      console.assert(!this._detached, "Layer must be attached before _calculate()");
      if(this._calculated) {
        return
      }
      this._facetedData = u.calculateFacet(this._data, this._graph.facet());
      var calculateStats = _.bind(this.calculateStats, this);
      this._statData = _.map(this._facetedData, calculateStats);
      this._calculated = true;
      return this
    };
    gg.layer.base.prototype.map = function(key, variable) {
      console.assert(arguments.length > 0);
      if(arguments.length === 1) {
        var val = this._attr[key];
        if(val instanceof Mapping) {
          return val.name
        }
        return null
      }
      this._attr[key] = new Mapping(variable);
      return this
    };
    gg.layer.base.prototype.getMap = function() {
      var obj = {};
      _.each(this._attr, function(value, key) {
        if(value instanceof Mapping) {
          obj[key] = value.name
        }
      });
      return obj
    };
    gg.layer.base.prototype.getAestheticsGroup = function(aes) {
      var fullname = aes + "_";
      var map = this.getMap();
      var obj = {};
      _.chain(map).keys().filter(function(x) {
        return x == aes || u.startswith(x, fullname)
      }).map(function(k) {
        obj[k] = map[k]
      });
      return obj
    };
    gg.layer.base.prototype.getData = function(aes, id) {
      if(!this._data) {
        return null
      }
      var varname = this.map(aes);
      if(!varname) {
        return null
      }
      return this._data.get(varname, id)
    };
    gg.layer.base.prototype.type = function(aes) {
      var varname = this.map(aes);
      if(!varname) {
        return null
      }
      return this._data.type(varname)
    };
    gg.layer.base.prototype.getScales = function(scales) {
      var output = {};
      var self = this;
      _.each(this._attr, function(value, key) {
        if(value instanceof Mapping) {
          var scale = scales[key];
          if(scale) {
            output[key] = _.bind(scale.apply, scale, value.name);
            output[key]._debug_context = scales[key]
          }else {
          }
        }else {
          output[key] = value
        }
      });
      return output
    };
    gg.layer.base.prototype.renderEntry = function(context) {
      this._checkMappings();
      this.calculate();
      context.computedData = this._statData[context.facetIndex];
      context.scales = this.getScales(context.rawScales);
      this.render(context)
    };
    gg.layer.base.prototype.render = function(context) {
      throw"Not implemented";
    };
    var _empty = [];
    var QUERY_AES = 0;
    var QUERY_KEY = 1;
    var QUERY_AES_GROUP = 2;
    gg.layer.base.prototype.queryData = function(aes, queryType, queryFunc, collectorFunc) {
      this.calculate();
      var key;
      var keys;
      var tmp1;
      var self = this;
      if(queryType === QUERY_AES_GROUP) {
        keys = _.values(this.getAestheticsGroup(aes));
        var collection = _.map(keys, function(key) {
          return u.doubleMap(self._statData, _.bind(queryFunc, null, key))
        });
        tmp1 = u.concat(collection)
      }else {
        if(queryType === QUERY_KEY) {
          key = aes
        }else {
          if(queryType === QUERY_AES) {
            key = this.map(aes)
          }else {
            console.assert(false, "Should not reach here - invalid option.")
          }
        }
        tmp1 = u.doubleMap(self._statData, _.bind(queryFunc, null, key))
      }
      var tmp2 = u.concat(tmp1);
      return collectorFunc(tmp2)
    };
    gg.layer.base.prototype.queryAllAesthetics = function(aes, queryFunc, collectorFunc, isNumeric) {
    };
    gg.layer.base.prototype.min = function(aes, isVar) {
      var query = function(key, data) {
        return data.min(key)
      };
      var collector = _.min;
      var queryType = isVar ? QUERY_KEY : QUERY_AES_GROUP;
      return this.queryData(aes, queryType, query, collector)
    };
    gg.layer.base.prototype.max = function(aes, isVar) {
      var query = function(key, data) {
        return data.max(key)
      };
      var collector = _.max;
      var queryType = isVar ? QUERY_KEY : QUERY_AES_GROUP;
      return this.queryData(aes, queryType, query, collector)
    };
    gg.layer.base.prototype.levels = function(aes, isVar) {
      var query = function(key, data) {
        return data.levels(key)
      };
      var collector = function(x) {
        return _.union(u.concat(x))
      };
      var queryType = isVar ? QUERY_KEY : QUERY_AES_GROUP;
      return this.queryData(aes, queryType, query, collector)
    };
    gg.layer.base.prototype.type = function(aes, isVar) {
      var query = function(key, data) {
        return data.type(key)
      };
      var collector = function(ary) {
        var x = _.uniq(ary);
        if(x.length === 1) {
          return x[0]
        }
        return"discrete"
      };
      var queryType = isVar ? QUERY_KEY : QUERY_AES_GROUP;
      return this.queryData(aes, queryType, query, collector)
    };
    gg.layer.base.prototype._checkMappings = function() {
      var requiredMap = this.requiredMap();
      if(_.isArray(requiredMap)) {
        var missing = _.difference(requiredMap, _.keys(this.getMap()));
        if(missing.length > 0) {
          throw"Not all the required mappings are present.";
        }
      }
    };
    gg.layer.base.prototype.imputeMapping = function(data, mapping) {
      var keys = data ? data.keys() : [];
      var imputed = {};
      var i = 0;
      if(!_.has(mapping, "x")) {
        while(i < keys.length && keys[i] === mapping.y) {
          i++
        }
        if(i < keys.length) {
          imputed.x = keys[i]
        }
      }
      if(!_.has(mapping, "y")) {
        while(i < keys.length && (keys[i] === mapping.x || keys[i] === imputed.x)) {
          i++
        }
        if(i < keys.length) {
          imputed.y = keys[i]
        }
      }
      if(!_.has(mapping, "group")) {
        if(_.has(mapping, "x")) {
          imputed.group = mapping.x
        }
        if(_.has(imputed, "x")) {
          imputed.group = imputed.x
        }
      }
      return imputed
    };
    gg.layer.base.prototype._applyDefaultMappings = function() {
      var self = this;
      var data = this._data;
      var stats = this.stats();
      var mapping = this.getMap();
      var layerMapping = this.imputeMapping(data, this.getMap());
      var statsMapping = stats ? stats.imputeMapping(data, mapping) : {};
      var defaultMappings = _.extend(layerMapping, statsMapping);
      if(defaultMappings) {
        _.each(defaultMappings, function(value, key) {
          var attr = self._attr[key];
          if(_.isUndefined(attr)) {
            self._attr[key] = new Mapping(value, true)
          }else {
            if(attr instanceof Mapping && attr.defaultMapping) {
              self._attr[key].value = value
            }
          }
        })
      }
    };
    gg.layer.base.prototype._dataChanged = function() {
      this._applyDefaultMappings()
    }
  })(gg);
  (function(gg) {
    gg.scale = gg.scale || {};
    gg.scale.base = u.makeClass("gg.scale.base");
    gg.scale.base.prototype.init = function() {
      this._aes = null;
      this._graph = null;
      this._detached = true;
      this._range = null;
      this._type = null;
      this._min = null;
      this._max = null;
      this._absoluteMin = -Infinity;
      this._absoluteMax = Infinity;
      this._attr = {"pixel_per_tick":40, "ticks":null, "numticks":null}
    };
    gg.scale.base.prototype.opts = u.opts();
    gg.scale.base.prototype.attach = function(graph, aes) {
      console.assert(aes);
      console.assert(graph);
      console.assert(this._detached);
      this._aes = aes;
      this._graph = graph;
      this._detached = false
    };
    gg.scale.base.prototype.min = function(val) {
      if(arguments.length === 1) {
        if(val < this._absoluteMin) {
          console.log(val, "val is too low.");
          val = this._absoluteMin
        }
        this._min = val;
        return this
      }
      return this._min
    };
    gg.scale.base.prototype.max = function(val) {
      if(arguments.length === 1) {
        if(val > this._absoluteMax) {
          console.log(val, "val is too high.");
          val = this._absoluteMax
        }
        this._max = val;
        return this
      }
      return this._max
    };
    gg.scale.base.prototype.type = function() {
      return this._type
    };
    gg.scale.base.prototype._saneNumber = function(x) {
      return _.isNumber(x) && !isNaN(x) && x != Infinity && x != -Infinity
    };
    gg.scale.base.prototype._makeDomain = function() {
      var aes = this._aes;
      var min = this._graph.min(aes);
      var defaultMin = this._graph.defaultMin(aes);
      var max = this._graph.max(aes);
      var defaultMax = this._graph.defaultMax(aes);
      this._min = _.chain([min, this._min, defaultMin]).filter(_.isNumber).min().value();
      this._max = _.chain([max, this._max, defaultMax]).filter(_.isNumber).max().value();
      return[this._min, this._max]
    };
    gg.scale.base.prototype.domain = function(domain) {
      if(arguments.length === 1) {
        this._min = domain[0];
        this._max = domain[1];
        return this
      }
      return[this._min, this._max]
    };
    gg.scale.base.prototype.range = function(range) {
      if(arguments.length) {
        this._range = range;
        return this
      }
      return this._range
    };
    gg.scale.base.prototype.make = function() {
      u.notImplemented()
    };
    gg.scale.base.prototype._apply = function(value) {
      throw"Not implemented";
    };
    gg.scale.base.prototype.apply = function(varname, dataobj) {
      if(arguments.length == 1) {
        dataobj = varname;
        varname = undefined
      }
      if(dataobj._cls_name === "gg.data") {
        dataobj = dataobj.rawObject(0)
      }
      var input = _.isUndefined(varname) || _.isUndefined(dataobj[varname]) ? dataobj : dataobj[varname];
      return this._apply(input)
    };
    gg.scale.base.prototype._tickObject = function(data, pos, label) {
      return{"data":data, "label":label, "pos":pos}
    };
    gg.scale.base.prototype._getNumticks = function(numticks) {
      if(numticks) {
        this.opts("numticks", numticks)
      }else {
        numticks = this.opts("numticks");
        if(_.isNull(numticks)) {
          var range = Math.abs(this._range[1] - this._range[0]);
          if(range == 2 * Math.PI) {
            numticks = 6
          }else {
            numticks = range / this.opts("pixel_per_tick")
          }
          this.opts("numticks", numticks)
        }
      }
      return numticks
    };
    gg.scale.base.prototype.ticks = function() {
      u.notImplemented()
    }
  })(gg);
  (function(gg) {
    gg.stats = gg.stats || {};
    gg.stats.base = u.makeClass("gg.stats.base");
    gg.stats.base.prototype.init = function() {
    };
    gg.stats.base.prototype.checkMap = function(mapping) {
      var required = this.requiredMap();
      if(required && required.length > 0) {
        var missing = _.intersect(_.keys(mapping), required);
        if(missing.length) {
          console.assert("Missing mappings:", missing)
        }
        return missing
      }
      return null
    };
    gg.stats.base.prototype.imputeMapping = function(data, currentMapping) {
      return null
    };
    gg.stats.base.prototype.requiredMap = function() {
      return null
    };
    gg.stats.base._groupImpl = function(data, group, groupFunction) {
      console.assert(group);
      var hasGroupFunc = _.isFunction(groupFunction);
      var groupKey = group;
      var groupVal = data.get(groupKey);
      var binVal = null;
      if(hasGroupFunc) {
        binVal = _.chain(groupVal).uniq().map(groupFunction).uniq().value()
      }else {
        binVal = _.uniq(groupVal)
      }
      binVal.sort();
      var output = {};
      var result = [];
      var keys = data.keys();
      var _makeGroupData = function() {
        var obj = {};
        _.each(keys, function(key) {
          obj[key] = []
        });
        return obj
      };
      _.each(binVal, function(key) {
        output[key] = _makeGroupData()
      });
      for(var i = 0;i < data.len();i++) {
        var curGroup = data.get(groupKey, i);
        if(hasGroupFunc) {
          curGroup = groupFunction(curGroup)
        }
        var curData = output[curGroup];
        _.each(keys, function(key) {
          var value = data.get(key, i);
          curData[key].push(value)
        })
      }
      _.each(binVal, function(key) {
        var data = gg.data(output[key]);
        result.push(data)
      });
      return result
    };
    gg.stats.base.prototype.group = function(data, mapping, groupFunction) {
      this.checkMap(mapping);
      var self = this;
      var _compute = function(_data) {
        return self.compute(_data, mapping)
      };
      var computed;
      if(_.has(mapping, "group")) {
        var result = gg.stats.base._groupImpl(data, mapping["group"], groupFunction);
        computed = _.map(result, _compute)
      }else {
        computed = [_compute(data)]
      }
      return this.postProcess(computed, mapping)
    };
    gg.stats.base.prototype.compute = function(data, mapping) {
      return data
    };
    gg.stats.base.prototype.postProcess = function(computed, mapping) {
      return computed
    }
  })(gg);
  (function(gg) {
    gg.coord.cart = u.makeClass("gg.coord.cart", gg.coord.base);
    gg.coord.cart.prototype.init = function(flip) {
      gg.coord.base.prototype.init.call(this);
      this._flip = u.bool(flip)
    };
    gg.coord.cart.prototype.configScale = function(dim, scales) {
      if(!this._flip) {
        scales.x.range([dim.x, dim.width]);
        scales.y.range([dim.height, dim.y])
      }else {
        scales.x.range([dim.y, dim.height]);
        scales.y.range([dim.x, dim.height])
      }
    };
    gg.coord.cart.prototype.transX = function(x, y) {
      return this._flip ? y : x
    };
    gg.coord.cart.prototype.transY = function(x, y) {
      return this._flip ? x : y
    };
    gg.coord.cart.prototype.line = function() {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:polyline");
        var excludes = ["x1", "y1", "x2", "y2"];
        var points = self.points(this, gg.coord.LineFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.cart.prototype.vline = function() {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:polyline");
        var excludes = ["x1", "y1", "x2", "y2"];
        var points = self.points(this, gg.coord.LineFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.cart.prototype.hline = function() {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:polyline");
        var excludes = ["x1", "y1", "x2", "y2"];
        var points = self.points(this, gg.coord.LineFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.cart.prototype.rect = function() {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:polygon");
        var excludes = ["x1", "y1", "x2", "y2"];
        var points = self.points(this, gg.coord.RectFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.cart.prototype.point = function() {
      return gg.coord.AbstractShape(this, function(selector) {
        var shapeFunction = this._attrs.symbol;
        gg.symbol.appendSymbol(selector.enter(), shapeFunction);
        var excludes = ["x", "y", "r"];
        this.attachAttr(selector, excludes, gg.symbol.makeAdditionalAttr(this))
      })
    };
    gg.coord.cart.prototype.poly = function(svgShape) {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append(svgShape);
        var excludes = ["x", "y", "sort", "postprocess"];
        var points = self.points(this, gg.coord.DataFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    }
  })(gg);
  (function(gg) {
    gg.coord.polar = u.makeClass("gg.coord.polar", gg.coord.base);
    gg.coord.polar.prototype.init = function(flip) {
      gg.coord.base.prototype.init.call(this);
      this._originX = null;
      this._originY = null;
      this._flip = u.bool(flip)
    };
    gg.coord.polar.prototype.configScale = function(dim, scales) {
      this._originX = (dim.x + dim.width) / 2;
      this._originY = (dim.y + dim.height) / 2;
      var weight = 1;
      if(!this._flip) {
        scales.x.range([0, Math.min(dim.width, dim.height) / 2 * weight]);
        scales.y.range([0, 2 * Math.PI])
      }else {
        scales.y.range([0, Math.min(dim.width, dim.height) / 2 * weight]);
        scales.x.range([0, 2 * Math.PI])
      }
    };
    gg.coord.polar.prototype.transX = function(x, y) {
      if(!this._flip) {
        return this._originX + x * Math.sin(y)
      }
      return this._originX + y * Math.sin(x)
    };
    gg.coord.polar.prototype.transY = function(x, y) {
      if(!this._flip) {
        return this._originY + x * Math.cos(y)
      }
      return this._originY + y * Math.cos(x)
    };
    gg.coord.polar.prototype.line = function() {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:polyline");
        var excludes = ["x1", "y1", "x2", "y2"];
        var points = self.points(this, gg.coord.LineFunc(this));
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.polar.prototype.vline = function() {
      var coord = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:path");
        var a = this._attrs;
        var excludes = ["x", "y", "x1", "x2", "y1", "y2"];
        var d = d3.svg.arc();
        if(!coord._flip) {
          d.innerRadius(a.x).outerRadius(a.x).startAngle(a.y1).endAngle(a.y2)
        }else {
          d.innerRadius(a.y1).outerRadius(a.y2).startAngle(a.x).endAngle(a.x)
        }
        this.attachAttr(selector, excludes, {d:d, transform:u.translate(coord._originX, coord._originY)})
      })
    };
    gg.coord.polar.prototype.hline = function() {
      var coord = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:path");
        var a = this._attrs;
        var excludes = ["x", "y", "x1", "x2", "y1", "y2"];
        var d = d3.svg.arc();
        if(!coord._flip) {
          d.innerRadius(a.x1).outerRadius(a.x2).startAngle(a.y).endAngle(a.y)
        }else {
          d.innerRadius(a.y).outerRadius(a.y).startAngle(a.x1).endAngle(a.x2)
        }
        this.attachAttr(selector, excludes, {d:d, transform:u.translate(coord._originX, coord._originY)})
      })
    };
    gg.coord.polar.prototype.rect = function() {
      var coord = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append("svg:path");
        var a = this._attrs;
        var excludes = ["x", "y", "x1", "x2", "y1", "y2"];
        var d = d3.svg.arc();
        if(!coord._flip) {
          d.innerRadius(a.x1).outerRadius(a.x2).startAngle(a.y1).endAngle(a.y2)
        }else {
          d.innerRadius(a.y1).outerRadius(a.y2).startAngle(a.x1).endAngle(a.x2)
        }
        this.attachAttr(selector, excludes, {d:d, transform:u.translate(coord._originX, coord._originY)})
      })
    };
    gg.coord.polar.prototype.poly = function(svgShape) {
      var self = this;
      return gg.coord.AbstractShape(this, function(selector) {
        var s = selector.enter().append(svgShape);
        var excludes = ["x", "y", "sort", "postprocess", "x1", "x2", "y1", "y2"];
        var points = self.points(this);
        this.attachAttr(selector, excludes, {points:points})
      })
    };
    gg.coord.polar.prototype.point = function() {
      return gg.coord.AbstractShape(this, function(selector) {
        var shapeFunction = this._attrs.symbol;
        var excludes = ["x", "y", "r"];
        gg.symbol.appendSymbol(selector.enter(), shapeFunction);
        this.attachAttr(selector, excludes, gg.symbol.makeAdditionalAttr(this))
      })
    }
  })(gg);
  (function(gg) {
    gg.data = u.makeClass("gg.data");
    gg.data.fetch = function(url, callback) {
      d3.text(url, function(text) {
        var data = null;
        if(url.substr(-4) == ".csv") {
          data = gg.data(text)
        }else {
          var js = JSON.parse(text);
          data = gg.data(js)
        }
        callback(data)
      })
    };
    gg.data.prototype.fromObject = function(data, keys) {
      var _findLength = function(data, keys) {
        if(keys && keys.length) {
          var lengths = _.map(keys, function(key) {
            var ary = data[key];
            return ary ? ary.length : 0
          });
          lengths.sort(function(i) {
            return-i
          });
          if(_.first(lengths) !== _.last(lengths)) {
            console.warn("Not every column contains same # of data.")
          }
          return lengths[0]
        }
        return 0
      };
      keys = keys ? keys : _.keys(data);
      var length = _findLength(data, keys);
      var processed = [];
      for(var i = 0;i < length;i++) {
        var obj = {};
        for(var j = 0;j < keys.length;j++) {
          var key = keys[j];
          obj[key] = data[key][i]
        }
        processed.push(obj)
      }
      this._internal = processed;
      this._keys = keys
    };
    gg.data.prototype.fromArray = function(data, keys) {
      if(data.length === 0) {
        this._internal = [];
        keys = keys ? keys : [];
        this._keys = keys;
        return
      }
      keys = keys ? keys : _.keys(data[0]);
      this._internal = data;
      this._keys = keys
    };
    gg.data.prototype.fromGrid = function(data, keys) {
      if(data.length === 0) {
        this._internal = [];
        keys = keys ? keys : [];
        this._keys = keys;
        return
      }
      keys = keys ? keys : _.keys(data[0]);
      var N = keys.length;
      this._internal = _.map(data, function(row) {
        var obj = {};
        for(var i = 0;i < N;i++) {
          obj[keys[i]] = row[i]
        }
        return obj
      });
      this._keys = keys
    };
    gg.data.prototype.fromCSV = function(data, keys) {
      this._internal = d3.csv.parse(data);
      this._keys = _.keys(this._internal[0]);
      for(var i = 0;i < this._internal.length;i++) {
        var obj = this._internal[i];
        _.each(this._keys, function(k) {
          var num = parseFloat(obj[k]);
          if(num == obj[k]) {
            obj[k] = num
          }
        })
      }
    };
    gg.data.prototype.constructData = function(data, keys) {
      if(_.isArray(data)) {
        if(data.length > 0 && _.isArray(data[0])) {
          this.fromGrid(data, keys)
        }else {
          this.fromArray(data, keys)
        }
      }else {
        if(_.isString(data)) {
          this.fromCSV(data, keys)
        }else {
          this.fromObject(data, keys)
        }
      }
    };
    gg.data.prototype.init = function(data, keys) {
      this._internal = null;
      this._keys = null;
      if(!data) {
        this._internal = [];
        this._keys = []
      }else {
        this.constructData(data, keys)
      }
    };
    gg.data.prototype.len = function() {
      return this._internal.length
    };
    gg.data.prototype.get = function(key, id) {
      if(arguments.length >= 2) {
        return this._internal[id][key]
      }
      return _.pluck(this._internal, key)
    };
    gg.data.prototype.getObject = function(id) {
      var i, key;
      var obj = {};
      for(i = 0;i < this._keys.length;i++) {
        key = this._keys[i];
        obj[key] = this.get(key, id)
      }
      return obj
    };
    gg.data.prototype.rawObject = function(id) {
      return this._internal[id]
    };
    gg.data.prototype.getObjects = function() {
      var result = [];
      for(var i = 0;i < this.len();i++) {
        result.push(this.getObject(i))
      }
      return result
    };
    gg.data.prototype.rawObjects = function() {
      return this._internal
    };
    gg.data.prototype.push = function(object) {
      var i, key;
      for(i = 0;i < this._keys.length;i++) {
        key = this._keys[i];
        if(!_.has(object, key)) {
          console.warn("Missing key:", key)
        }
      }
      this._internal.push(object);
      return this
    };
    gg.data.prototype.indices = function() {
      return _.range(this.len())
    };
    gg.data.prototype.keys = function() {
      return this._keys
    };
    gg.data.prototype.type = function(key) {
      var vals = [];
      var _LENGTH = Math.min(20, this.len());
      for(var i = 0;i < _LENGTH;i++) {
        vals[i] = this._internal[i][key]
      }
      if(_.all(vals, _.isNumber)) {
        return"continuous"
      }
      return"discrete"
    };
    gg.data.prototype.levels = function(key, sorted) {
      var vals = _.chain(this._internal).pluck(key).reject(_.isUndefined).uniq().value();
      if(sorted) {
        vals = vals.sort()
      }
      return vals
    };
    gg.data.prototype.min = function(key) {
      var filter = _.isNumber;
      var query = _.min;
      return this.query(key, query, filter)
    };
    gg.data.prototype.max = function(key) {
      var filter = _.isNumber;
      var query = _.max;
      return this.query(key, query, filter)
    };
    gg.data.prototype.filter = function(filterfunc) {
      var newdata = [];
      _.each(this._internal, function(d) {
        if(filterfunc(d)) {
          newdata.push(d)
        }
      });
      return gg.data(newdata, this._keys)
    };
    gg.data.prototype.query = function(key, queryFunction, filterFunction) {
      return queryFunction(_.filter(this.get(key), filterFunction))
    };
    gg.data.prototype.log = function() {
      console.log()
    }
  })(gg);
  (function(gg) {
    gg.facet.grid = u.makeClass("gg.facet.grid", gg.facet.base);
    gg.facet.grid.prototype.init = function(x, y) {
      gg.facet.base.prototype.init.call(this);
      this._xvar = x;
      this._yvar = y;
      this._xlevels = null;
      this._ylevels = null
    };
    gg.facet.grid.prototype.x = function(variable) {
      if(arguments.length === 0) {
        return this._xvar
      }
      this._xvar = variable;
      return this
    };
    gg.facet.grid.prototype.y = function(variable) {
      if(arguments.length === 0) {
        return this._yvar
      }
      this._yvar = variable;
      return this
    };
    gg.facet.grid.prototype.xlevels = function() {
      if(!this._xlevels) {
        if(!this._xvar || !this._graph) {
          return[]
        }
        this._xlevels = this._graph.dataLevels(this._xvar)
      }
      return this._xlevels
    };
    gg.facet.grid.prototype.ylevels = function() {
      if(!this._ylevels) {
        if(!this._yvar || !this._graph) {
          return[]
        }
        this._ylevels = this._graph.dataLevels(this._yvar)
      }
      return this._ylevels
    };
    gg.facet.grid.prototype.ncol = function() {
      return Math.max(1, this.xlevels().length)
    };
    gg.facet.grid.prototype.nrow = function() {
      return Math.max(1, this.ylevels().length)
    };
    gg.facet.grid.prototype.bin = function(obj) {
      var xLevel = this.xlevels();
      var yLevel = this.ylevels();
      var x = _.indexOf(xLevel, obj[this.x()]);
      var y = _.indexOf(yLevel, obj[this.y()]);
      return y * this.ncol() + x
    };
    gg.facet.grid.prototype.renderLabel = function(g, y, x) {
      var label = "";
      if(this._xvar && this._yvar) {
        label = this.xlevels()[x] + " | " + this.ylevels()[y]
      }else {
        if(this._xvar) {
          label = this.xlevels()[x]
        }else {
          if(this._yvar) {
            label = this.ylevels()[x]
          }
        }
      }
      g.append("text").attr("font-size", 12).attr("font-weight", "bold").attr("text-anchor", "center").text(label)
    }
  })(gg);
  (function(gg) {
    gg.facet.wrap = u.makeClass("gg.facet.wrap", gg.facet.base);
    gg.facet.wrap.prototype.init = function(x) {
      gg.facet.base.prototype.init.call(this);
      this._xvar = x;
      this._col = 3;
      this._row = 2;
      this._levels = null
    };
    gg.facet.wrap.prototype.x = function(variable) {
      this._xvar = variable;
      return this
    };
    gg.facet.wrap.prototype.levels = function() {
      if(!this._levels) {
        if(!this._xvar || !this._graph) {
          return[]
        }
        this._levels = this._graph.dataLevels(this._xvar)
      }
      return this._levels
    };
    gg.facet.wrap.prototype.sanity = function() {
      var levels = this.levels();
      if(levels.length > 0 && levels.length < this._col) {
        this.ncol(levels.length)
      }else {
        this.ncol(this._col)
      }
      return this
    };
    gg.facet.wrap.prototype.ncol = function(col) {
      if(!col) {
        this.sanity();
        return this._col
      }
      this._col = col;
      var l = this.levels();
      if(l.length > 0) {
        this._row = Math.max(1, Math.ceil(l.length / col))
      }
      return this
    };
    gg.facet.wrap.prototype.nrow = function(row) {
      if(!row) {
        this.sanity();
        return this._row
      }
      this._row = row;
      var l = this.levels();
      if(l) {
        this._col = Math.max(1, Math.ceil(l.length / row))
      }
      return this
    };
    gg.facet.wrap.prototype.bin = function(obj) {
      var levels = this.levels();
      var x = _.indexOf(levels, obj[this._xvar]);
      return x
    };
    gg.facet.wrap.prototype.renderLabel = function(g, y, x) {
      var idx = y * this._col + x;
      if(idx < this.levels().length) {
        g.append("text").attr("font-size", 12).attr("font-weight", "bold").text(this.levels()[idx])
      }
    }
  })(gg);
  (function(gg) {
    gg.guide.axis = u.makeClass("gg.guide.axis", gg.guide.base);
    gg.guide.axis.prototype.init = function(scale, type, ticks, flip) {
      gg.guide.base.prototype.init.call(this);
      this._type = type || scale._aes;
      if(this._type != "x" && this._type != "y") {
        throw"Axes can only take discrete and continuous scales";
      }
      this._scale = scale;
      this._flip = flip;
      this._attr = {ticks:true, color:"#000", strokewidth:1, labels:true, fontsize:11, line:this._type == "x", ticklength:this._type == "x" ? 3 : 7}
    };
    gg.guide.axis.prototype.renderLinear = function(group, position, render) {
      var XAXIS = position == "top" || position == "bottom";
      var YAXIS = position == "left" || position == "right";
      var ANCHOR = XAXIS ? "middle" : position == "left" ? "end" : "start";
      var TEXTX = XAXIS ? 0 : position == "left" ? -10 : 10;
      var TEXTY = YAXIS ? 0 : position == "top" ? -5 : 15;
      var TICKLEN = this.opts("ticklength");
      var FONTSIZE = this.opts("fontsize");
      var COLOR = this.opts("color");
      var STROKEWIDTH = this.opts("strokewidth");
      if(!render) {
        render = {}
      }
      if(!(XAXIS || YAXIS)) {
        throw"position should be 'top', 'bottom', 'left', or 'right'.";
      }
      if(XAXIS && this._type != "x") {
        throw"position should be 'top', or 'bottom'.";
      }
      if(YAXIS && this._type != "y") {
        throw"position should be 'left', or 'right'.";
      }
      group.attr("class", "_debug_axis_" + position);
      var x = [0, 0], y = [0, 0];
      if(XAXIS) {
        x = this._scale.range()
      }else {
        y = this._scale.range()
      }
      if(this.opts("line") && !(render["line"] === false)) {
        group.append("svg:line").attr("x1", x[0]).attr("x2", x[1]).attr("y1", y[0]).attr("y2", y[1]).attr("stroke", COLOR).attr("stroke-width", STROKEWIDTH)
      }
      var ticks = this._scale.ticks();
      if(this._flip) {
        var max = _.max(this._scale.range());
        _.each(ticks, function(t) {
          t.pos = max - t.pos
        })
      }
      if(this.opts("ticks") && !(render["ticks"] === false)) {
        group.selectAll("labeltick").data(ticks).enter().append("svg:line").attr("class", "labeltick").attr("x1", function(t) {
          return XAXIS ? t.pos : 0
        }).attr("x2", function(t) {
          return XAXIS ? t.pos : position == "left" ? -TICKLEN : TICKLEN
        }).attr("y1", function(t) {
          return YAXIS ? t.pos : 0
        }).attr("y2", function(t) {
          return YAXIS ? t.pos : position == "top" ? -TICKLEN : TICKLEN
        }).attr("stroke", COLOR).attr("stroke-width", STROKEWIDTH)
      }
      if(this.opts("labels") && !(render["labels"] === false)) {
        group.selectAll("labeltext").data(ticks).enter().append("svg:text").attr("class", "labeltext").attr("x", function(t) {
          return XAXIS ? t.pos : TEXTX
        }).attr("y", function(t) {
          return YAXIS ? t.pos + FONTSIZE / 4 : TEXTY
        }).text(function(t) {
          return t.label
        }).attr("font-size", FONTSIZE).attr("text-anchor", ANCHOR).attr("font-color", COLOR)
      }
    };
    gg.guide.axis.prototype.renderCircular = function(group, radius) {
    }
  })(gg);
  (function(gg) {
    gg.guide.grid = u.makeClass("gg.guide.grid", gg.guide.base);
    gg.guide.grid.prototype.init = function(xscale, yscale, coord) {
      gg.guide.base.prototype.init.call(this);
      this._xscale = xscale;
      this._yscale = yscale;
      this._coord = coord;
      this._attr = {"dasharray":"4,5", "dashoffset":5, "stroke":"#CCC", "strokewidth":1, "render-vertical":false, "render-horizontal":true}
    };
    gg.guide.grid.prototype.render = function(group) {
      var self = this;
      var coord = this._coord;
      var xscale = this._xscale;
      var xrange = xscale.range();
      var xmin = _.min(xrange);
      var xmax = _.max(xrange);
      var xticks = xscale.ticks();
      var yscale = this._yscale;
      var yrange = yscale.range();
      var ymin = _.min(yrange);
      var ymax = _.max(yrange);
      var yticks = yscale.ticks();
      var extractdata = function(t) {
        return t.data
      };
      if(this.opts("render-vertical")) {
        group.selectAll(".vlines").data(xticks).call(coord.vline().attr("x", function(t) {
          return xscale.apply(t.data)
        }).attr("y1", u.constfunc(ymin)).attr("y2", u.constfunc(ymax)).attr("stroke", this.opts("stroke")).attr("stroke-width", this.opts("strokewidth")).attr("stroke-dasharray", this.opts("dasharray")))
      }
      if(this.opts("render-horizontal")) {
        group.selectAll(".hlines").data(yticks).call(coord.hline().attr("y", function(t) {
          return yscale.apply(t.data)
        }).attr("x1", u.constfunc(xmin)).attr("x2", u.constfunc(xmax)).attr("stroke", this.opts("stroke")).attr("stroke-width", this.opts("strokewidth")).attr("stroke-dasharray", this.opts("dasharray")).attr("stroke-dashoffset", this.opts("dashoffset")))
      }
    }
  })(gg);
  (function(gg) {
    gg.guide.legend = u.makeClass("gg.guide.legend", gg.guide.base);
    gg.guide.legend.prototype.init = function(graph, layers, scales) {
      gg.guide.base.prototype.init.call(this);
      var nolegend = ["x", "y", "text"];
      this._graph = graph;
      this._layers = layers;
      this._scales = scales;
      this._coord = gg.coord.cart();
      this._aes = _.chain(scales).keys().reject(function(aes) {
        return aes.indexOf("_") != -1 || nolegend.indexOf(aes) != -1
      }).value();
      this._mappings = _.map(layers, function(l) {
        return l.getMap()
      });
      this._legends = null
    };
    gg.guide.legend.prototype.group = function() {
      this._legends = [];
      var keys = _.clone(this._aes);
      while(keys.length > 0) {
        var legend = [];
        var aes = keys.pop();
        var current_mapping = _.pluck(this._mappings, aes);
        var new_mapping = null;
        legend.push(aes);
        var i = 0;
        while(i < keys.length) {
          new_mapping = _.pluck(this._mappings, keys[i]);
          if(_.isEqual(new_mapping, current_mapping)) {
            legend.push(keys.splice(i, 1)[0])
          }else {
            i++
          }
        }
        this._legends.push(legend)
      }
      return this
    };
    gg.guide.legend.prototype.render = function(group, orientation) {
      if(_.isNull(this._legends)) {
        this.group()
      }
      var self = this;
      var shift = 10;
      _.each(this._legends, function(l) {
        var g = group.append("svg:g").attr("transform", u.translate(0, shift));
        shift += 10 + self._renderEach(g, l, null)
      })
    };
    gg.guide.legend.prototype._renderEach = function(group, aes, orientation) {
      var self = this;
      var sample_aes = aes[0];
      var sample_scale = this._scales[sample_aes];
      if(sample_scale.type() == "continuous") {
        for(var i = 1;i < aes.length;i++) {
          if(this._scales[aes[i]].type() == "discrete") {
            sample_aes = aes[i];
            sample_scale = this._scales[aes[i]];
            break
          }
        }
      }
      var layertypes = [];
      var layers = [];
      for(var i = 0;i < this._layers.length;i++) {
        if(this._mappings[i][sample_aes]) {
          layers.push(this._layers[i]);
          layertypes.push(this._layers[i]._cls_name.split(".")[2])
        }
      }
      layertypes = _.uniq(layertypes);
      var scales = {"color":u.constfunc("#000000"), "stroke":u.constfunc("#000000"), "strokewidth":u.constfunc(0), "symbol":u.constfunc(gg.symbol.DIAMOND), "radius":u.constfunc(5), "opacity":u.constfunc(1)};
      if(layertypes.length == 1) {
        if(layertypes[0] == "point") {
          scales["symbol"] = u.constfunc(gg.symbol.CIRCLE)
        }else {
          if(layertypes[0] == "line" || layertypes[0] == "path") {
            scales["symbol"] = u.constfunc(gg.symbol.CROSS);
            scales["strokewidth"] = u.constfunc(1)
          }
        }
        _.each(_.keys(scales), function(s) {
          if(s != "radius") {
            var attr = layers[0].opts(s);
            if(_.isString(attr) || _.isNumber(attr)) {
              scales[s] = u.constfunc(attr)
            }
          }
        })
      }
      _.each(aes, function(a) {
        scales[a] = _.bind(self._scales[a].apply, self._scales[a], "data")
      });
      var numticks = sample_scale.type() == "discrete" ? this._graph.levels(sample_aes).length : 5;
      var ticks = sample_scale.ticks(numticks);
      group.append("text").attr("x", 0).attr("y", 0).style("font-size", "13px").style("font-weight", "bold").text(self._graph._varlabel(sample_aes));
      var coord = this._coord;
      if(layertypes[0] == "line" || layertypes[0] == "path") {
        group.selectAll(".LegendBox").data(ticks).enter().append("svg:line").attr("x1", u.constfunc(0)).attr("x2", u.constfunc(13)).attr("y1", function(d, i) {
          return i * 18 + 13
        }).attr("y2", function(d, i) {
          return i * 18 + 13
        }).attr("symbol", scales.symbol).attr("fill", scales.color).attr("stroke", scales.stroke).attr("fill-opacity", scales.opacity).attr("stroke-width", scales.strokewidth)
      }else {
        group.selectAll(".LegendBox").data(ticks).call(coord.point().attr("x", u.constfunc(5)).attr("y", function(d, i) {
          return i * 18 + 13
        }).attr("r", scales.radius).attr("symbol", scales.symbol).attr("fill", scales.color).attr("stroke", scales.stroke).attr("fill-opacity", scales.opacity).attr("stroke-width", scales.strokewidth))
      }
      group.selectAll(".LegendText").data(ticks).enter().append("text").style("font-size", "12px").attr("x", 20).attr("y", function(d, i) {
        return 17 + i * 18
      }).text(function(d) {
        return String(d.label)
      });
      return 14 + ticks.length * 18
    }
  })(gg);
  (function(gg) {
    gg.layer.area = u.makeClass("gg.layer.area", gg.layer.base);
    gg.layer.area.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("stroke", "none").opts("opacity", 0.4).opts("color", "steelblue").opts("strokewidth", 0).opts("padding", 0.5)
    };
    gg.layer.area.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      var originLocation = context.rawScales.y.min();
      var yOrigin = s.y(originLocation);
      var postprocess = function(x, y) {
        var len = x.length;
        x.push(x[x.length - 1]);
        x.push(x[0]);
        y.push(yOrigin);
        y.push(yOrigin)
      };
      var x, y;
      x = s.x;
      if(s.y_stack) {
        y = s.y_stack
      }else {
        y = s.y
      }
      _.each(context.computedData, function(data, idx) {
        var clsName = "_debug_area_" + idx;
        cell.selectAll("." + clsName).data([data]).call(coord.poly("svg:polygon").attr("x", x).attr("y", y).attr("sort", x).attr("postprocess", postprocess).attr("class", clsName).style(s))
      })
    };
    gg.layer.area.prototype.imputeMapping = function(data, mapping) {
      var imputed = gg.layer.base.prototype.imputeMapping.call(this, data, mapping);
      if(!_.has(mapping, "group") && _.has(mapping, "stroke")) {
        imputed.group = mapping.stroke
      }else {
        if(!_.has(mapping, "group") && _.has(mapping, "color")) {
          imputed.group = mapping.color
        }else {
          delete imputed.group
        }
      }
      return imputed
    }
  })(gg);
  (function(gg) {
    var gg = gg || {};
    gg.layer = gg.layer || {};
    gg.layer.bar = u.makeClass("gg.layer.bar", gg.layer.base);
    gg.layer.bar.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      var padding = 0;
      console.assert(0 <= padding, "padding should be nonnegative.");
      console.assert(padding < 0.5, "padding should be < 0.5");
      this.opts("padding", padding).opts("strokewidth", 0)
    };
    gg.layer.bar.prototype.defaultMin = function(aes) {
      if(aes == "y") {
        return 0
      }
    };
    gg.layer.bar.prototype.defaultScales = function() {
      return{x:gg.scale.discrete("x")}
    };
    gg.layer.bar.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      var width = context.rawScales.x.width();
      var padding = width / 2 * (1 - this.opts("padding") * 2);
      var originLocation = context.rawScales.y.min();
      console.assert(_.isNumber(originLocation), "originLocation is numeric.");
      var yOrigin = s.y(originLocation);
      var y2 = null;
      var y1 = null;
      var x2 = u.add(s.x, padding);
      var x1 = u.sub(s.x, padding);
      var height = null;
      if(s.y_stack) {
        y1 = s.y_stack;
        height = u.sub(yOrigin, s.y);
        y2 = u.add(y1, height)
      }else {
        y1 = s.y;
        y2 = yOrigin
      }
      _.each(context.computedData, function(data, idx) {
        var objList = data.rawObjects();
        var clsName = "_debug_bar_" + idx;
        cell.selectAll("." + clsName).data(objList).call(coord.rect().attr("x1", x1).attr("x2", x2).attr("y1", y1).attr("y2", y2).style(s).attr("class", clsName))
      })
    }
  })(gg);
  (function(gg) {
    gg.layer.box = u.makeClass("gg.layer.box", gg.layer.base);
    gg.layer.box.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      var padding = 0;
      console.assert(0 <= padding, "padding should be nonnegative.");
      console.assert(padding < 0.5, "padding should be < 0.5");
      this.opts("padding", padding).opts("strokewidth", 0);
      this._default_stats = gg.stats.box
    };
    gg.layer.box.prototype.defaultMin = function(aes) {
      if(aes == "y") {
        return 0
      }
    };
    gg.layer.box.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      var width = context.rawScales.x.width();
      var padding = width / 2 * (1 - this.opts("padding") * 2);
      _.each(context.computedData, function(data, idx) {
        var clsName;
        clsName = "_debug_box_rect_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.rect().attr("x1", u.sub(s.x, padding)).attr("x2", u.add(s.x, padding)).attr("y1", s.y_q1).attr("y2", s.y_q3).attr("class", clsName).style(s));
        clsName = "_debug_bar_a_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.hline().attr("x1", u.sub(s.x, padding)).attr("x2", u.add(s.x, padding)).attr("y", s.y_q4).attr("class", clsName).style(s));
        clsName = "_debug_bar_b_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.hline().attr("x1", u.sub(s.x, padding)).attr("x2", u.add(s.x, padding)).attr("y", s.y_q0).attr("class", clsName).style(s));
        clsName = "_debug_bar_c_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.hline().attr("x1", u.sub(s.x, padding)).attr("x2", u.add(s.x, padding)).attr("y", s.y_q2).attr("class", clsName).style(s));
        clsName = "_debug_bar_d_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.vline().attr("x", s.x).attr("y1", s.y_q4).attr("y2", s.y_q3).attr("class", clsName).style(s));
        clsName = "_debug_bar_e_" + idx;
        cell.selectAll("." + clsName).data(data.rawObjects()).call(coord.vline().attr("x", s.x).attr("y1", s.y_q0).attr("y2", s.y_q1).attr("class", clsName).style(s))
      })
    }
  })(gg);
  (function(gg) {
    gg.layer.line = u.makeClass("gg.layer.line", gg.layer.base);
    gg.layer.line.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("color", "red").opts("strokewidth", 2).opts("padding", 0.5)
    };
    gg.layer.line.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      _.each(context.computedData, function(data, idx) {
        var clsName = "_debug_path_" + idx;
        cell.selectAll("." + clsName).data([data]).call(coord.poly("svg:polyline").attr("x", s.x).attr("y", s.y).attr("sort", s.x).attr("stroke", s.color).attr("stroke-width", s.strokewidth).attr("fill", u.constfunc("none")).attr("class", clsName))
      })
    };
    gg.layer.line.prototype.imputeMapping = function(data, mapping) {
      var imputed = gg.layer.base.prototype.imputeMapping.call(this, data, mapping);
      delete imputed.group;
      if(!_.has(mapping, "group") && _.has(mapping, "stroke")) {
        imputed.group = mapping.stroke
      }else {
        if(!_.has(mapping, "group") && _.has(mapping, "color")) {
          imputed.group = mapping.color
        }
      }
      return imputed
    }
  })(gg);
  (function(gg) {
    gg.layer.path = u.makeClass("gg.layer.path", gg.layer.base);
    gg.layer.path.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("stroke", "red").opts("color", "red").opts("strokewidth", 2)
    };
    gg.layer.path.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      _.each(context.computedData, function(data, idx) {
        var clsName = "_debug_path_" + idx;
        cell.selectAll("." + clsName).data([data]).call(coord.poly("svg:polyline").attr("x", s.x).attr("y", s.y).attr("stroke", s.color).attr("stroke-width", s.strokewidth).attr("fill", u.constfunc("none")).attr("class", clsName))
      })
    };
    gg.layer.path.prototype.imputeMapping = function(data, mapping) {
      var imputed = gg.layer.base.prototype.imputeMapping.call(this, data, mapping);
      delete imputed.group;
      if(!_.has(mapping, "group") && _.has(mapping, "stroke")) {
        imputed.group = mapping.stroke
      }else {
        if(!_.has(mapping, "group") && _.has(mapping, "color")) {
          imputed.group = mapping.color
        }
      }
      return imputed
    }
  })(gg);
  (function(gg) {
    gg.layer.point = u.makeClass("gg.layer.point", gg.layer.base);
    gg.layer.point.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("radius", 3);
      this.opts("symbol", gg.symbol.CIRCLE)
    };
    gg.layer.point.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      _.each(context.computedData, function(data, idx) {
        var objList = data.rawObjects();
        var clsName = "_debug_point_" + idx;
        cell.selectAll("." + clsName).data(objList).call(coord.point().attr("x", s.x).attr("y", s.y).attr("r", s.radius).attr("stroke", s.stroke).attr("stroke-width", s.strokewidth).attr("fill-opacity", s.opacity).attr("fill", s.color).attr("symbol", s.symbol).attr("class", clsName))
      })
    };
    gg.layer.point.prototype.imputeMapping = function(data, mapping) {
      var imputed = gg.layer.base.prototype.imputeMapping.call(this, data, mapping);
      if(imputed.group) {
        delete imputed.group
      }
      return imputed
    }
  })(gg);
  (function(gg) {
    gg.layer.text = u.makeClass("gg.layer.text", gg.layer.base);
    gg.layer.text.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("opacity", 1).opts("fill", "black").opts("font", "Verdana")
    };
    gg.layer.text.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      _.each(context.computedData, function(data, idx) {
        var objList = data.rawObjects();
        var clsName = "_debug_text_" + idx;
        cell.selectAll("." + clsName).data(objList).call(coord.text().attr("x", s.x).attr("y", s.y).attr("text", s.text).attr("font-size", s.fontsize).attr("fill", s.color).attr("fill-opacity", s.opacity).attr("font-family", s.font).attr("class", clsName))
      })
    }
  })(gg);
  (function(gg) {
    gg.layer.tile = u.makeClass("gg.layer.tile", gg.layer.base);
    gg.layer.tile.prototype.init = function() {
      gg.layer.base.prototype.init.call(this);
      this.opts("stroke", "none").opts("opacity", 0.4).opts("color", "green").opts("strokewidth", 0).opts("padding", 0.5)
    };
    gg.layer.base.prototype.requiredMap = function() {
      return["x", "y"]
    };
    gg.layer.tile.prototype.render = function(context) {
      var coord = context.coord;
      var cell = context.cell;
      var s = context.scales;
      var width = context.rawScales.x.width();
      var height = context.rawScales.y.width();
      var paddingWidth = width / 2;
      var paddingHeight = height / 2;
      _.each(context.computedData, function(data, idx) {
        var objList = data.rawObjects();
        var clsName = "_debug_tile_" + idx;
        cell.selectAll("." + clsName).data(objList).call(coord.rect().attr("x1", u.sub(s.x, paddingWidth)).attr("y1", u.sub(s.y, paddingHeight)).attr("x2", u.add(s.x, paddingWidth)).attr("y2", u.add(s.y, paddingHeight)).attr("class", clsName).style(s))
      })
    }
  })(gg);
  (function(gg) {
    gg.scale.continuous = u.makeClass("gg.scale.continuous", gg.scale.base);
    gg.scale.continuous.prototype.init = function(transform, min, max) {
      gg.scale.base.prototype.init.call(this);
      this._type = "continuous";
      this._d3scale = null;
      this._min = _.isNumber(min) ? min : null;
      this._max = _.isNumber(max) ? max : null;
      this._useDefault = false;
      this._defaultMin = null;
      this._defaultMax = null;
      this.opts("transform", transform || "linear").opts("expand", 0);
      if(this.opts("transform") === "log") {
        this._absoluteMin = 1
      }
    };
    gg.scale.continuous.prototype.domain = function(domain) {
      if(arguments.length === 1) {
        this._min = domain[0];
        this._max = domain[1];
        return this
      }
      return[this._min, this._max]
    };
    gg.scale.continuous.prototype.width = function() {
      return 10
    };
    gg.scale.continuous.prototype._makeDomain = function() {
      var aes = this._aes;
      var min = this._graph.min(aes);
      var max = this._graph.max(aes);
      this._defaultMin = this._graph.defaultMin(aes);
      this._defaultMax = this._graph.defaultMax(aes);
      if(_.isNumber(this._defaultMin) && this._defaultMin < this._absoluteMin) {
        this._defaultMin = this._absoluteMin
      }
      if(_.isNumber(this._defaultMax) && this._defaultMax < this._absoluteMax) {
        this._defaultMax = this._absoluteMax
      }
      var newMin = _.chain([min, this._min, this._defaultMin]).filter(_.isNumber).min().value();
      var newMax = _.chain([max, this._max, this._defaultMax]).filter(_.isNumber).max().value();
      console.assert(this._saneNumber(newMin), "_min is not invalid.", newMin);
      console.assert(this._saneNumber(newMax), "_max is not invalid.", newMax);
      this.min(newMin);
      this.max(newMax);
      return[this.min(), this.max()]
    };
    gg.scale.continuous.prototype.make = function() {
      console.assert(this._range, "range is required.");
      this._d3scale = this.opts("transform") == "log" ? d3.scale.log() : d3.scale.linear();
      var domain = _.isNumber(this._min) && _.isNumber(this._max) ? [this._min, this._max] : this._makeDomain();
      if(this.opts("expand") > 0 && this.opts("transform") == "linear") {
        var expand = (_.max(domain) - _.min(domain)) * this.opts("expand");
        var min = 0, max = 1;
        if(domain[0] > domain[1]) {
          min = 1;
          max = 0
        }
        if(!_.isNumber(this._defaultMin) && this._min !== 0) {
          domain[min] -= expand
        }
        if(!_.isNumber(this._defaultMax)) {
          domain[max] += expand
        }
      }
      this._d3scale.domain(domain).range(this._range)
    };
    gg.scale.continuous.prototype._apply = function(input) {
      if(!this._d3scale) {
        this.make()
      }
      return this._d3scale(input)
    };
    gg.scale.base.prototype.ticks = function(numticks) {
      var EPSILON = 0, min = this._min, max = this._max, numticks = this._getNumticks(numticks);
      if(this.opts("transform") == "log") {
        min = Math.max(Math.log(min) / Math.LN10, 0);
        max = Math.log(max) / Math.LN10;
        EPSILON = Math.pow(10, -7)
      }
      var span = max - min;
      var step = Math.pow(10, Math.floor(Math.log(span / numticks) / Math.LN10));
      var error = numticks / span * step;
      if(error <= 0.15) {
        step *= 10
      }else {
        if(error <= 0.35) {
          step *= 5
        }else {
          if(error <= 0.75) {
            step *= 2
          }
        }
      }
      var tickObjects = [];
      var current = Math.ceil(min / step) * step;
      var minExp = -Math.floor(Math.log(step) / Math.LN10);
      while(current <= max + EPSILON) {
        var num = current;
        var pretty = num;
        if(this.opts("transform") == "log") {
          if(num % 1 > EPSILON) {
            num = Math.floor(num) + Math.log(10 * (num % 1)) / Math.LN10
          }
          num = Math.exp(num * Math.LN10);
          if(num > this._max + EPSILON) {
            break
          }
          pretty = u.prettify(num)
        }else {
          pretty = u.prettify(num, minExp)
        }
        tickObjects.push(this._tickObject(num, this.apply(num), pretty));
        current += step
      }
      return tickObjects
    }
  })(gg);
  (function(gg) {
    gg.scale.discrete = u.makeClass("gg.scale.discrete", gg.scale.base);
    gg.scale.discrete.prototype.init = function() {
      gg.scale.base.prototype.init.call(this);
      this._type = "discrete";
      this._levels = null;
      this._eachWidth = null;
      this._padding = 0.02
    };
    gg.scale.discrete.prototype.domain = function(levels) {
      if(arguments.length === 0) {
        return this._levels
      }
      this._levels = levels;
      return this
    };
    gg.scale.discrete.prototype.padding = function(padding) {
      if(arguments.length === 0) {
        return this._padding
      }
      this._padding = padding;
      return this
    };
    gg.scale.discrete.prototype.width = function() {
      if(!this._eachWidth) {
        this.make()
      }
      return this._eachWidth
    };
    gg.scale.discrete.prototype.make = function(input) {
      console.assert(this._range, "range is required.");
      var width = Math.abs(this._range[1] - this._range[0]);
      this._levels = this._graph.levels(this._aes);
      this._eachWidth = width / this._levels.length;
      this._eachWidth = Math.abs(this._eachWidth);
      var padding = this._padding >= 1 ? this._padding : this._eachWidth * this._padding;
      this._eachWidth -= padding;
      this._padding = padding;
      return this
    };
    gg.scale.discrete.prototype._apply = function(input) {
      if(!this._levels) {
        this.make()
      }
      var idx = _.indexOf(this._levels, input);
      if(idx === -1) {
        throw"Discrete Scale got an input that is not in the range";
      }
      return idx * (this._eachWidth + this._padding) + this._padding / 2 + this._eachWidth / 2
    };
    gg.scale.discrete.prototype.ticks = function(numticks) {
      var numticks = this._getNumticks(numticks);
      var step = Math.max(1, Math.round(this._levels.length / numticks));
      var shift = Math.floor(step / 2);
      var tickObjects = [];
      for(var i = shift;i < this._levels.length;i += step) {
        tickObjects.push(this._tickObject(this._levels[i], this.apply(this._levels[i]), this._levels[i]))
      }
      return tickObjects
    }
  })(gg);
  (function(gg) {
    gg.scale.gradient = u.makeClass("gg.scale.gradient", gg.scale.continuous);
    gg.scale.gradient.prototype.init = function(low, high) {
      gg.scale.continuous.prototype.init.call(this);
      this._low = low || "#cccccc";
      this._high = high || "steelblue";
      this._range = [this._low, this._high];
      this._d3scale = null
    };
    gg.scale.gradient.prototype.make = function() {
      console.assert(this._range, "range is required.");
      this._min = this._graph.min(this._aes);
      this._max = this._graph.max(this._aes);
      this._d3scale = d3.scale.linear().domain([this._min, this._max]).range(this._range);
      return this
    };
    gg.scale.gradient.prototype._apply = function(input) {
      if(!this._d3scale) {
        this.make()
      }
      return this._d3scale(input)
    }
  })(gg);
  (function(gg) {
    gg.scale.id = u.makeClass("gg.scale.id", gg.scale.base);
    gg.scale.id.prototype.init = function() {
      gg.scale.base.prototype.init.call(this);
      this._type = null
    };
    gg.scale.id.prototype.type = function() {
      if(!this._type) {
        this._type = this._graph.type(this._aes)
      }
      return this._type
    };
    gg.scale.id.prototype.domain = function() {
      if(this._type == "continuous") {
        return[this._graph.min(this._aes), this._graph.max(this._aes)]
      }
      return this._graph.levels(this._aes)
    };
    gg.scale.id.prototype.range = function() {
      return this.domain()
    };
    gg.scale.id.prototype.make = function() {
    };
    gg.scale.id.prototype._apply = function(value) {
      return value
    }
  })(gg);
  (function(gg) {
    gg.scale.palette = u.makeClass("gg.scale.palette", gg.scale.discrete);
    gg.scale.palette.prototype.init = function(palette) {
      gg.scale.discrete.prototype.init.call(this);
      this._paletteName = palette;
      this._d3scale = null
    };
    gg.scale.palette.prototype.make = function() {
      this._levels = this._graph.levels(this._aes);
      var num_levels = this._levels.length;
      if(this._paletteName && false) {
        this._d3scale = d3.scale.ordinal().domain(this._levels).range(colorbrewer[this.paletteName][num_levels])
      }else {
        if(num_levels <= 10) {
          this._d3scale = d3.scale.category10()
        }else {
          if(num_levels <= 20) {
            this._d3scale = d3.scale.category20()
          }else {
            throw"Too many values. Need to handle this case later...";
          }
        }
      }
      return this
    };
    gg.scale.palette.prototype._apply = function(input) {
      if(!this._d3scale) {
        this.make()
      }
      return this._d3scale(input)
    }
  })(gg);
  (function(gg) {
    gg.scale.symbol = u.makeClass("gg.scale.symbol", gg.scale.discrete);
    gg.scale.symbol.prototype.init = function(symbol) {
      gg.scale.discrete.prototype.init.call(this);
      this._symbols = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      this._numSymbols = this._symbols.length
    };
    gg.scale.symbol.prototype.make = function() {
      this._levels = this._graph.levels(this._aes);
      this._numLevels = this._levels.length;
      return this
    };
    gg.scale.symbol.prototype._apply = function(input) {
      if(!this._d3scale) {
        this.make()
      }
      return this._symbols[this._levels.indexOf(input) % this._numSymbols]
    }
  })(gg);
  (function(gg) {
    gg.scale.time = u.makeClass("gg.scale.time", gg.scale.continuous);
    gg.scale.time.prototype.make = function() {
      console.assert(this._range, "range is required.");
      this.d3scale = d3.time.scale().domain(this._makeDomain()).range(this._range);
      return this
    }
  })(gg);
  gg.stats.bin = u.makeClass("gg.stats.bin", gg.stats.base);
  gg.stats.bin.prototype.compute = function(data) {
    var result = data.getObject(0);
    result.$count = data.len();
    return gg.data([result])
  };
  gg.stats.bin.prototype.imputeMapping = function() {
    return{"y":"$count"}
  };
  (function(gg) {
    gg.stats.box = u.makeClass("gg.stats.box", gg.stats.base);
    gg.stats.box.prototype.imputeMapping = function(data, currentMapping) {
      return{y_q0:"$q0", y_q1:"$q1", y_q2:"$q2", y_q3:"$q3", y_q4:"$q4"}
    };
    gg.stats.box.prototype.requiredMap = function() {
      return["x", "y"]
    };
    gg.stats.box.prototype.compute = function(data, mapping) {
      var result = data.getObject(0);
      var yMap = mapping.y;
      var row = data.get(yMap);
      var len = row.length;
      var sorted = _.sortBy(row, u.identity);
      var min = sorted[0];
      var max = sorted[len - 1];
      var q1 = len / 4;
      var q2 = len / 2;
      var q3 = len / 4 * 3;
      var q1val = (sorted[Math.ceil(q1)] + sorted[Math.floor(q1)]) / 2;
      var q2val = (sorted[Math.ceil(q2)] + sorted[Math.floor(q2)]) / 2;
      var q3val = (sorted[Math.ceil(q3)] + sorted[Math.floor(q3)]) / 2;
      result.$q0 = min;
      result.$q1 = q1val;
      result.$q2 = q2val;
      result.$q3 = q3val;
      result.$q4 = max;
      return gg.data([result])
    }
  })(gg);
  gg.stats.count = gg.stats.bin;
  gg.stats.id = u.makeClass("gg.stats.id", gg.stats.base);
  (function(gg) {
    gg.stats.path = u.makeClass("gg.stats.path", gg.stats.base);
    gg.stats.path.prototype.compute = function(data, mapping) {
      var x = mapping.x;
      var y = mapping.y;
      console.assert(x);
      console.assert(y);
      var obj = data.getObject(0);
      var prevX = obj[x];
      var prevY = obj[y];
      var result = [];
      var length = data.len();
      for(var i = 1;i < length;i++) {
        obj = data.getObject(i);
        obj.prevX = prevX;
        obj.prevY = prevY;
        prevX = obj[x];
        prevY = obj[y];
        result.push(obj)
      }
      return gg.data(result)
    }
  })(gg);
  (function(gg) {
    gg.stats.stack = u.makeClass("gg.stats.stack", gg.stats.base);
    gg.stats.stack.prototype.requiredMap = function() {
      return["y", "group"]
    };
    gg.stats.stack.prototype.compute = function(data, mapping) {
      var stacked = mapping.y;
      console.assert(stacked, "y mapping is required.");
      var result = [];
      var length = data.len();
      var partial = 0;
      for(var i = 0;i < length;i++) {
        var obj = data.getObject(i);
        partial += obj[stacked];
        obj.$partial = partial;
        result[i] = obj
      }
      return gg.data(result)
    };
    gg.stats.stack.prototype.imputeMapping = function(data, currentMapping) {
      var m = {"y_stack":"$partial"};
      return m
    }
  })(gg);
  (function(gg) {
    gg.stats.stackother = u.makeClass("gg.stats.stackother", gg.stats.base);
    gg.stats.stackother.prototype.requiredMap = function() {
      return["y", "group"]
    };
    gg.stats.stackother.prototype.compute = function(data, mapping) {
      return data
    };
    gg.stats.stackother.prototype.defaultMap = function(data, currentMapping) {
      var m = {"y_stack":"$partial"};
      return m
    };
    gg.stats.stackother.prototype.postProcess = function(computed, mapping) {
      var length = computed[0].len();
      for(var idx = 0;idx < length;idx++) {
        var partial = 0;
        for(var groupIdx = 0;groupIdx < computed.length;groupIdx++) {
          var curobj = computed[groupIdx].rawObject(idx);
          partial += curobj[mapping.y];
          curobj.$partial = partial
        }
      }
      return computed
    }
  })(gg);
  (function(gg) {
    gg.symbol = gg.symbol || {};
    var S2SVG = {};
    var SQRT_2 = Math.sqrt(2);
    var SIN_0 = 0;
    var SIN_60 = Math.sqrt(3) / 2;
    var SIN_120 = Math.sqrt(3) / 2;
    var SIN_180 = 0;
    var SIN_240 = -Math.sqrt(3) / 2;
    var SIN_300 = -Math.sqrt(3) / 2;
    var COS_0 = 1;
    var COS_60 = 0.5;
    var COS_120 = -0.5;
    var COS_180 = -1;
    var COS_240 = -0.5;
    var COS_300 = 0.5;
    var INNER_RADIUS = (Math.sqrt(5) - 1) / 4;
    var cos10 = function(theta) {
      return Math.cos(Math.PI / 180 * 36 * theta)
    };
    var sin10 = function(theta) {
      return Math.sin(Math.PI / 180 * 36 * theta)
    };
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
    gg.symbol.appendSymbol = function(d3selector, func) {
      var append = null;
      if(_.isFunction(func)) {
        append = function(d, i) {
          var shape = func(d, i);
          var name = S2SVG[shape];
          return this.appendChild(document.createElementNS(name.space, name.local))
        }
      }else {
        append = function() {
          var name = S2SVG[func];
          return this.appendChild(document.createElementNS(name.space, name.local))
        }
      }
      return d3selector.select(append)
    };
    gg.symbol.makeAdditionalAttr = function(shape) {
      var attr = shape._attrs;
      var e = function(d, i, attrname) {
        var f = attr[attrname];
        if(!_.isFunction(f)) {
          return f
        }
        return f(d, i)
      };
      var obj = {};
      obj.cy = function(d, i) {
        var shape = e(d, i, "symbol");
        if(shape == CIRCLE) {
          return e(d, i, "y")
        }
      };
      obj.cx = function(d, i) {
        var shape = e(d, i, "symbol");
        if(shape == CIRCLE) {
          return e(d, i, "x")
        }
      };
      obj.r = function(d, i) {
        var shape = e(d, i, "symbol");
        if(shape == CIRCLE) {
          return e(d, i, "r")
        }
      };
      obj.points = function(d, i) {
        var shape = e(d, i, "symbol");
        var x = e(d, i, "x");
        var y = e(d, i, "y");
        var r = e(d, i, "r");
        var s;
        if(shape == BOX) {
          return[x + r, y + r, x - r, y + r, x - r, y - r, x + r, y - r].join(",")
        }else {
          if(shape == DIAMOND) {
            return[x + r, y, x, y + r, x - r, y, x, y - r].join(",")
          }else {
            if(shape == HEX) {
              return[x + r * SIN_0, y + r * COS_0, x + r * SIN_60, y + r * COS_60, x + r * SIN_120, y + r * COS_120, x + r * SIN_180, y + r * COS_180, x + r * SIN_240, y + r * COS_240, x + r * SIN_300, y + r * COS_300].join(",")
            }else {
              if(shape == TRIANGLE_REVERSE) {
                return[x + r * SIN_0, y + r * COS_0, x + r * SIN_120, y + r * COS_120, x + r * SIN_240, y + r * COS_240].join(",")
              }else {
                if(shape == TRIANGLE) {
                  return[x + r * SIN_60, y + r * COS_60, x + r * SIN_180, y + r * COS_180, x + r * SIN_300, y + r * COS_300].join(",")
                }else {
                  if(shape == STAR) {
                    s = r * INNER_RADIUS;
                    return[x + s * SIN_0, y + s * COS_0, x + r * SIN_1_10, y + r * COS_1_10, x + s * SIN_2_10, y + s * COS_2_10, x + r * SIN_3_10, y + r * COS_3_10, x + s * SIN_4_10, y + s * COS_4_10, x + r * SIN_5_10, y + r * COS_5_10, x + s * SIN_6_10, y + s * COS_6_10, x + r * SIN_7_10, y + r * COS_7_10, x + s * SIN_8_10, y + s * COS_8_10, x + r * SIN_9_10, y + r * COS_9_10].join(",")
                  }else {
                    if(shape == CROSS) {
                      return[x + r, y, x, y, x, y + r, x, y, x - r, y, x, y, x, y - r, x, y].join(",")
                    }else {
                      if(shape == X) {
                        s = r * SQRT_2 / 2;
                        return[x + s, y + s, x, y, x + s, y - s, x, y, x - s, y + s, x, y, x - s, y - s, x, y].join(",")
                      }
                    }
                  }
                }
              }
            }
          }
        }
      };
      return obj
    };
    S2SVG[CIRCLE] = "svg:circle";
    S2SVG[BOX] = "svg:polygon";
    S2SVG[DIAMOND] = "svg:polygon";
    S2SVG[HEX] = "svg:polygon";
    S2SVG[TRIANGLE] = "svg:polygon";
    S2SVG[TRIANGLE_REVERSE] = "svg:polygon";
    S2SVG[STAR] = "svg:polygon";
    S2SVG[CROSS] = "svg:polyline";
    S2SVG[X] = "svg:polyline";
    gg.symbol.CIRCLE = CIRCLE;
    gg.symbol.BOX = BOX;
    gg.symbol.DIAMOND = DIAMOND;
    gg.symbol.HEX = HEX;
    gg.symbol.TRIANGLE = TRIANGLE;
    gg.symbol.TRIANGLE_REVERSE = TRIANGLE_REVERSE;
    gg.symbol.STAR = STAR;
    gg.symbol.CROSS = CROSS;
    gg.symbol.X = X;
    _.each(S2SVG, function(value, key) {
      S2SVG[key] = d3.ns.qualify(value)
    })
  })(gg);
  var packageFunction = function(gg, obj) {
    obj = obj || {};
    var pkg = function(fromObj, names) {
      console.assert(fromObj);
      var len = names.length;
      for(var i = 0;i < len;i++) {
        var name = names[i];
        if(obj[name]) {
          console.log(name, "is already set.")
        }else {
          console.assert(fromObj[name]);
          obj[name] = fromObj[name]
        }
      }
    };
    pkg(gg.coord, ["cart", "polar"]);
    pkg(gg.facet, ["grid", "wrap"]);
    pkg(gg.guide, ["axis", "grid", "legend"]);
    pkg(gg.layer, ["area", "bar", "box", "line", "path", "point", "text", "tile"]);
    pkg(gg.scale, ["continuous", "discrete", "gradient", "id", "palette", "symbol", "time"]);
    pkg(gg.stats, ["bin", "box", "id", "path", "stack", "stackother"]);
    return obj
  };
  packageFunction(gg, gg);
  return gg
}());

