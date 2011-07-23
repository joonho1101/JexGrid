(function(){var array_extension = {};
(function() {
  var c = Array.prototype;
  if(!c.indexOf) {
    c.indexOf = function(c) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var d = Object(this), b = d.length >>> 0;
      if(b === 0) {
        return-1
      }
      var a = 0;
      arguments.length > 0 && (a = Number(arguments[1]), a !== a ? a = 0 : a !== 0 && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))));
      if(a >= b) {
        return-1
      }
      for(a = a >= 0 ? a : Math.max(b - Math.abs(a), 0);a < b;a++) {
        if(a in d && d[a] === c) {
          return a
        }
      }
      return-1
    }
  }
  if(!c.lastIndexOf) {
    c.lastIndexOf = function(c) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var d = Object(this), b = d.length >>> 0;
      if(b === 0) {
        return-1
      }
      var a = b;
      arguments.length > 1 && (a = Number(arguments[1]), a !== a ? a = 0 : a !== 0 && a !== 1 / 0 && a !== -(1 / 0) && (a = (a > 0 || -1) * Math.floor(Math.abs(a))));
      for(b = a >= 0 ? Math.min(a, b - 1) : b - Math.abs(a);b >= 0;b--) {
        if(b in d && d[b] === c) {
          return b
        }
      }
      return-1
    }
  }
  if(!c.filter) {
    c.filter = function(c, d) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var b = Object(this), a = b.length >>> 0;
      if(typeof c !== "function") {
        throw new TypeError;
      }
      for(var e = [], g = 0;g < a;g++) {
        if(g in b) {
          var h = b[g];
          c.call(d, h, g, b) && e.push(h)
        }
      }
      return e
    }
  }
  if(!c.forEach) {
    c.forEach = function(c, d) {
      var b, a = Object(this), e = a.length >>> 0, g = 0;
      if(!c || !c.call) {
        throw new TypeError;
      }
      for(d && (b = d);g < e;) {
        var h = String(g);
        a.hasOwnProperty(h) && (h = a[h], c.call(b, h, g, a));
        g++
      }
    }
  }
  if(!c.every) {
    c.every = function(c, d) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var b = Object(this), a = b.length >>> 0;
      if(typeof c !== "function") {
        throw new TypeError;
      }
      for(var e = 0;e < a;e++) {
        if(e in b && !c.call(d, b[e], e, b)) {
          return!1
        }
      }
      return!0
    }
  }
  if(!c.map) {
    c.map = function(c, d) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var b = Object(this), a = b.length >>> 0;
      if(typeof c !== "function") {
        throw new TypeError;
      }
      for(var e = Array(a), g = 0;g < a;g++) {
        g in b && (e[g] = c.call(d, b[g], g, b))
      }
      return e
    }
  }
  if(!c.some) {
    c.some = function(c, d) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var b = Object(this), a = b.length >>> 0;
      if(typeof c !== "function") {
        throw new TypeError;
      }
      for(var e = 0;e < a;e++) {
        if(e in b && c.call(d, b[e], e, b)) {
          return!0
        }
      }
      return!1
    }
  }
  if(!c.reduce) {
    c.reduce = function(c) {
      var d, b = this.length, a;
      if(typeof c !== "function") {
        throw new TypeError("First argument is not callable");
      }
      if((b == 0 || b === null) && arguments.length <= 1) {
        throw new TypeError("Array length is 0 and no second argument");
      }
      arguments.length <= 1 ? (a = this[0], d = 1) : a = arguments[1];
      for(d = d || 0;d < b;++d) {
        d in this && (a = c.call(void 0, a, this[d], d, this))
      }
      return a
    }
  }
  if(!c.reduceRight) {
    c.reduceRight = function(c) {
      if(this === void 0 || this === null) {
        throw new TypeError;
      }
      var d = Object(this), b = d.length >>> 0;
      if(typeof c !== "function") {
        throw new TypeError;
      }
      if(b === 0 && arguments.length === 1) {
        throw new TypeError;
      }
      b -= 1;
      var a;
      if(arguments.length >= 2) {
        a = arguments[1]
      }else {
        do {
          if(b in this) {
            a = this[b--];
            break
          }
          if(--b < 0) {
            throw new TypeError;
          }
        }while(1)
      }
      for(;b >= 0;) {
        b in d && (a = c.call(void 0, a, d[b], b, d)), b--
      }
      return a
    }
  }
})();
var engine_extension = {};
(function() {
  var c = Number.prototype, f = String.prototype, d = Array.prototype;
  if(!c.toFixedFloat) {
    c.toFixedFloat = function(b) {
      return parseFloat(this.toFixed(b))
    }
  }
  if(!f.toInt) {
    f.toInt = function() {
      var b;
      if((b = this.replace(/[^\d\.\-]/g, "")).length === 0) {
        return NaN
      }
      for(var a, e = 0, g = 0, h = b.length, d = 0, l = !1;d < h;d++) {
        if(a = b.charAt(d), a === ".") {
          if(++e === 2) {
            l = !0;
            break
          }
        }else {
          if(a === "-" && ++g === 2) {
            l = !0;
            break
          }
        }
      }
      return l === !0 && (b = b.replace(/[\.\-]/g, "")).length === 0 ? NaN : /^-*0*\./.test(b) || (b = b.replace(/^-0+/, "-")).length === 0 || (b = b.replace(/^0+/, "")).length === 0 ? 0 : parseInt(b, 10)
    }
  }
  if(!f.toFloat) {
    f.toFloat = function() {
      var b;
      if((b = this.replace(/[^-\d\.]/g, "")).length === 0) {
        return NaN
      }
      for(var a = 0, e = b.length, g, h = 0, d = 0;a < e;a++) {
        if(g = b.charAt(a), g === ".") {
          if(h !== 0) {
            return NaN
          }else {
            h++
          }
        }else {
          if(g === "-") {
            if(d !== 0) {
              return NaN
            }else {
              d++
            }
          }
        }
      }
      return parseFloat(b)
    }
  }
  if(!d.remove) {
    d.remove = function(b) {
      if(this.length === 0) {
        return-1
      }
      b = this.indexOf(b);
      b !== -1 && this.splice(b, 1);
      return b
    }
  }
  if(!d.removeAll) {
    d.removeAll = function(b) {
      if(this.length === 0) {
        return this
      }
      for(var a = this.length;(a = this.lastIndexOf(b, a - 1)) !== -1;) {
        if(this.splice(a, 1), a === 0) {
          break
        }
      }
      return this
    }
  }
  if(!d.removeList) {
    d.removeList = function(b) {
      if(this.length === 0 || b.length === 0) {
        return this
      }
      for(var a = b.length, e = 0, g;e < a;e++) {
        (g = this.indexOf(b[e])) !== -1 && this.splice(g, 1)
      }
      return this
    }
  }
  if(!d.removeAt) {
    d.removeAt = function(b) {
      if(this.length !== 0 && (b < 0 && (b = this.length + b), b < 0 && (b = 0), this.hasOwnProperty(b) && b < this.length)) {
        return this.splice(b, 1)[0]
      }
    }
  }
  if(!d.addAt) {
    d.addAt = function(b, a) {
      this.splice(b, 0, a);
      return a
    }
  }
  if(!d.pushList) {
    d.pushList = function(b) {
      return b.length === 0 ? this.length : d.push.apply(this, b)
    }
  }
  if(!d.pushListAt) {
    d.pushListAt = function(b, a) {
      if(a.length === 0) {
        return this.length
      }
      var e = [b, 0];
      d.push.apply(e, a);
      d.splice.apply(this, e);
      return this.length
    }
  }
})();
var COMPILED = !0, goog = goog || {};
goog.global = window;
window.goog = goog;
goog.DEBUG = !0;
goog.LOCALE = "en";
goog.provide = function(c) {
  if(!COMPILED) {
    if(goog.isProvided_(c)) {
      throw Error('Namespace "' + c + '" already declared.');
    }
    delete goog.implicitNamespaces_[c];
    for(var f = c;f = f.substring(0, f.lastIndexOf("."));) {
      if(goog.getObjectByName(f)) {
        break
      }
      goog.implicitNamespaces_[f] = !0
    }
  }
  goog.exportSymbol_(c)
};
goog.setTestOnly = function(c) {
  if(COMPILED && !goog.DEBUG) {
    throw c = c || "", Error("Importing test-only code into non-debug environment" + c ? ": " + c : ".");
  }
};
if(!COMPILED) {
  goog.isProvided_ = function(c) {
    return!goog.implicitNamespaces_[c] && !!goog.getObjectByName(c)
  }, goog.implicitNamespaces_ = {}
}
goog.exportSymbol_ = function(c, f, d) {
  c = c.split(".");
  d = d || goog.global;
  !(c[0] in d) && d.execScript && d.execScript("var " + c[0]);
  for(var b;c.length && (b = c.shift());) {
    !c.length && goog.isDef(f) ? d[b] = f : d = d[b] ? d[b] : d[b] = {}
  }
};
goog.getObjectByName = function(c, f) {
  for(var d = c.split("."), b = f || goog.global, a;a = d.shift();) {
    if(goog.isDefAndNotNull(b[a])) {
      b = b[a]
    }else {
      return null
    }
  }
  return b
};
goog.globalize = function(c, f) {
  var d = f || goog.global, b;
  for(b in c) {
    d[b] = c[b]
  }
};
goog.addDependency = function(c, f, d) {
  if(!COMPILED) {
    for(var b, c = c.replace(/\\/g, "/"), a = goog.dependencies_, e = 0;b = f[e];e++) {
      a.nameToPath[b] = c, c in a.pathToNames || (a.pathToNames[c] = {}), a.pathToNames[c][b] = !0
    }
    for(b = 0;f = d[b];b++) {
      c in a.requires || (a.requires[c] = {}), a.requires[c][f] = !0
    }
  }
};
goog.ENABLE_DEBUG_LOADER = !0;
goog.require = function(c) {
  if(!COMPILED && !goog.isProvided_(c)) {
    if(goog.ENABLE_DEBUG_LOADER) {
      var f = goog.getPathFromDeps_(c);
      if(f) {
        goog.included_[f] = !0;
        goog.writeScripts_();
        return
      }
    }
    c = "goog.require could not find: " + c;
    goog.global.console && goog.global.console.error(c);
    throw Error(c);
  }
};
goog.basePath = "";
goog.nullFunction = function() {
};
goog.identityFunction = function(c) {
  return c
};
goog.abstractMethod = function() {
  throw Error("unimplemented abstract method");
};
goog.addSingletonGetter = function(c) {
  c.getInstance = function() {
    return c.instance_ || (c.instance_ = new c)
  }
};
if(!COMPILED && goog.ENABLE_DEBUG_LOADER) {
  goog.included_ = {}, goog.dependencies_ = {pathToNames:{}, nameToPath:{}, requires:{}, visited:{}, written:{}}, goog.inHtmlDocument_ = function() {
    var c = goog.global.document;
    return typeof c != "undefined" && "write" in c
  }, goog.findBasePath_ = function() {
    if(goog.global.CLOSURE_BASE_PATH) {
      goog.basePath = goog.global.CLOSURE_BASE_PATH
    }else {
      if(goog.inHtmlDocument_()) {
        for(var c = goog.global.document.getElementsByTagName("script"), f = c.length - 1;f >= 0;--f) {
          var d = c[f].src, b = d.lastIndexOf("?"), b = b == -1 ? d.length : b;
          if(d.substr(b - 7, 7) == "base.js") {
            goog.basePath = d.substr(0, b - 7);
            break
          }
        }
      }
    }
  }, goog.importScript_ = function(c) {
    var f = goog.global.CLOSURE_IMPORT_SCRIPT || goog.writeScriptTag_;
    !goog.dependencies_.written[c] && f(c) && (goog.dependencies_.written[c] = !0)
  }, goog.writeScriptTag_ = function(c) {
    return goog.inHtmlDocument_() ? (goog.global.document.write('<script type="text/javascript" src="' + c + '"><\/script>'), !0) : !1
  }, goog.writeScripts_ = function() {
    function c(a) {
      if(!(a in b.written)) {
        if(!(a in b.visited) && (b.visited[a] = !0, a in b.requires)) {
          for(var g in b.requires[a]) {
            if(!goog.isProvided_(g)) {
              if(g in b.nameToPath) {
                c(b.nameToPath[g])
              }else {
                throw Error("Undefined nameToPath for " + g);
              }
            }
          }
        }
        a in d || (d[a] = !0, f.push(a))
      }
    }
    var f = [], d = {}, b = goog.dependencies_, a;
    for(a in goog.included_) {
      b.written[a] || c(a)
    }
    for(a = 0;a < f.length;a++) {
      if(f[a]) {
        goog.importScript_(goog.basePath + f[a])
      }else {
        throw Error("Undefined script input");
      }
    }
  }, goog.getPathFromDeps_ = function(c) {
    return c in goog.dependencies_.nameToPath ? goog.dependencies_.nameToPath[c] : null
  }, goog.findBasePath_()
}
goog.typeOf = function(c) {
  var f = typeof c;
  if(f == "object") {
    if(c) {
      if(c instanceof Array) {
        return"array"
      }else {
        if(c instanceof Object) {
          return f
        }
      }
      var d = Object.prototype.toString.call(c);
      if(d == "[object Window]") {
        return"object"
      }
      if(d == "[object Array]" || typeof c.length == "number" && typeof c.splice != "undefined" && typeof c.propertyIsEnumerable != "undefined" && !c.propertyIsEnumerable("splice")) {
        return"array"
      }
      if(d == "[object Function]" || typeof c.call != "undefined" && typeof c.propertyIsEnumerable != "undefined" && !c.propertyIsEnumerable("call")) {
        return"function"
      }
    }else {
      return"null"
    }
  }else {
    if(f == "function" && typeof c.call == "undefined") {
      return"object"
    }
  }
  return f
};
goog.propertyIsEnumerableCustom_ = function(c, f) {
  if(f in c) {
    for(var d in c) {
      if(d == f && Object.prototype.hasOwnProperty.call(c, f)) {
        return!0
      }
    }
  }
  return!1
};
goog.propertyIsEnumerable_ = function(c, f) {
  return c instanceof Object ? Object.prototype.propertyIsEnumerable.call(c, f) : goog.propertyIsEnumerableCustom_(c, f)
};
goog.isDef = function(c) {
  return c !== void 0
};
goog.isNull = function(c) {
  return c === null
};
goog.isDefAndNotNull = function(c) {
  return c != null
};
goog.isArray = function(c) {
  return goog.typeOf(c) == "array"
};
goog.isArrayLike = function(c) {
  var f = goog.typeOf(c);
  return f == "array" || f == "object" && typeof c.length == "number"
};
goog.isDateLike = function(c) {
  return goog.isObject(c) && typeof c.getFullYear == "function"
};
goog.isString = function(c) {
  return typeof c == "string"
};
goog.isBoolean = function(c) {
  return typeof c == "boolean"
};
goog.isNumber = function(c) {
  return typeof c == "number"
};
goog.isFunction = function(c) {
  return goog.typeOf(c) == "function"
};
goog.isObject = function(c) {
  c = goog.typeOf(c);
  return c == "object" || c == "array" || c == "function"
};
goog.getUid = function(c) {
  return c[goog.UID_PROPERTY_] || (c[goog.UID_PROPERTY_] = ++goog.uidCounter_)
};
goog.removeUid = function(c) {
  "removeAttribute" in c && c.removeAttribute(goog.UID_PROPERTY_);
  try {
    delete c[goog.UID_PROPERTY_]
  }catch(f) {
  }
};
goog.UID_PROPERTY_ = "closure_uid_" + Math.floor(Math.random() * 2147483648).toString(36);
goog.uidCounter_ = 0;
goog.getHashCode = goog.getUid;
goog.removeHashCode = goog.removeUid;
goog.cloneObject = function(c) {
  var f = goog.typeOf(c);
  if(f == "object" || f == "array") {
    if(c.clone) {
      return c.clone()
    }
    var f = f == "array" ? [] : {}, d;
    for(d in c) {
      f[d] = goog.cloneObject(c[d])
    }
    return f
  }
  return c
};
goog.bindNative_ = function(c, f, d) {
  return c.call.apply(c.bind, arguments)
};
goog.bindJs_ = function(c, f, d) {
  if(!c) {
    throw Error();
  }
  if(arguments.length > 2) {
    var b = Array.prototype.slice.call(arguments, 2);
    return function() {
      var a = Array.prototype.slice.call(arguments);
      Array.prototype.unshift.apply(a, b);
      return c.apply(f, a)
    }
  }else {
    return function() {
      return c.apply(f, arguments)
    }
  }
};
goog.bind = function(c, f, d) {
  goog.bind = Function.prototype.bind && Function.prototype.bind.toString().indexOf("native code") != -1 ? goog.bindNative_ : goog.bindJs_;
  return goog.bind.apply(null, arguments)
};
goog.partial = function(c, f) {
  var d = Array.prototype.slice.call(arguments, 1);
  return function() {
    var b = Array.prototype.slice.call(arguments);
    b.unshift.apply(b, d);
    return c.apply(this, b)
  }
};
goog.mixin = function(c, f) {
  for(var d in f) {
    c[d] = f[d]
  }
};
goog.now = Date.now || function() {
  return+new Date
};
goog.globalEval = function(c) {
  if(goog.global.execScript) {
    goog.global.execScript(c, "JavaScript")
  }else {
    if(goog.global.eval) {
      if(goog.evalWorksForGlobals_ == null) {
        goog.global.eval("var _et_ = 1;"), typeof goog.global._et_ != "undefined" ? (delete goog.global._et_, goog.evalWorksForGlobals_ = !0) : goog.evalWorksForGlobals_ = !1
      }
      if(goog.evalWorksForGlobals_) {
        goog.global.eval(c)
      }else {
        var f = goog.global.document, d = f.createElement("script");
        d.type = "text/javascript";
        d.defer = !1;
        d.appendChild(f.createTextNode(c));
        f.body.appendChild(d);
        f.body.removeChild(d)
      }
    }else {
      throw Error("goog.globalEval not available");
    }
  }
};
goog.evalWorksForGlobals_ = null;
goog.getCssName = function(c, f) {
  var d = function(a) {
    return goog.cssNameMapping_[a] || a
  }, b;
  b = goog.cssNameMapping_ ? goog.cssNameMappingStyle_ == "BY_WHOLE" ? d : function(a) {
    for(var a = a.split("-"), e = [], g = 0;g < a.length;g++) {
      e.push(d(a[g]))
    }
    return e.join("-")
  } : function(a) {
    return a
  };
  return f ? c + "-" + b(f) : b(c)
};
goog.setCssNameMapping = function(c, f) {
  goog.cssNameMapping_ = c;
  goog.cssNameMappingStyle_ = f
};
goog.getMsg = function(c, f) {
  var d = f || {}, b;
  for(b in d) {
    var a = ("" + d[b]).replace(/\$/g, "$$$$"), c = c.replace(RegExp("\\{\\$" + b + "\\}", "gi"), a)
  }
  return c
};
goog.exportSymbol = function(c, f, d) {
  goog.exportSymbol_(c, f, d)
};
goog.exportProperty = function(c, f, d) {
  c[f] = d
};
goog.inherits = function(c, f) {
  function d() {
  }
  d.prototype = f.prototype;
  c.superClass_ = f.prototype;
  c.prototype = new d;
  c.prototype.constructor = c
};
goog.base = function(c, f, d) {
  var b = arguments.callee.caller;
  if(b.superClass_) {
    return b.superClass_.constructor.apply(c, Array.prototype.slice.call(arguments, 1))
  }
  for(var a = Array.prototype.slice.call(arguments, 2), e = !1, g = c.constructor;g;g = g.superClass_ && g.superClass_.constructor) {
    if(g.prototype[f] === b) {
      e = !0
    }else {
      if(e) {
        return g.prototype[f].apply(c, a)
      }
    }
  }
  if(c[f] === b) {
    return c.constructor.prototype[f].apply(c, a)
  }else {
    throw Error("goog.base called from a method of one name to a method of a different name");
  }
};
goog.scope = function(c) {
  c.call(goog.global)
};
var jx = {util:{}}, Util = {}, echo = {};
(function() {
  var c = window.console, f = [], d;
  d = c && c.log ? function(b) {
    c.log.apply(c, arguments)
  } : function(b) {
    f.push.apply(f, arguments)
  };
  goog.exportSymbol("jx.util", Util);
  goog.exportSymbol("echo", d);
  Util.isNull = function(b) {
    return b == null
  };
  Util.isNotNull = function(b) {
    return b != null
  };
  Util.isNullAnd = function() {
    for(var b = 0, a = arguments.length;b < a;b++) {
      if(arguments[b] != null) {
        return!1
      }
    }
    return!0
  };
  Util.isNullOr = function() {
    for(var b = 0, a = arguments.length;b < a;b++) {
      if(arguments[b] == null) {
        return!0
      }
    }
    return!1
  };
  Util.isNotNullAnd = function() {
    for(var b = 0, a = arguments.length;b < a;b++) {
      if(arguments[b] == null) {
        return!1
      }
    }
    return!0
  };
  Util.isNotNullOr = function() {
    for(var b = 0, a = arguments.length;b < a;b++) {
      if(arguments[b] != null) {
        return!0
      }
    }
    return!1
  };
  Util.ifNull = function(b, a, e) {
    return b == null ? a : e === void 0 ? b : e
  };
  Util.ifTrue = function(b, a, e) {
    return b === !0 ? a : e === void 0 ? b : e
  };
  Util.isFunction = function(b) {
    return typeof b == "function"
  };
  Util.isString = function(b) {
    return typeof b == "string"
  };
  Util.isNumber = function(b) {
    return typeof b == "number"
  };
  Util.isObject = function(b) {
    return typeof b == "object"
  };
  Util.isArray = function(b) {
    var a = Array.isArray;
    return b && typeof b == "object" && (a && a(b) || typeof b.length == "number" && b.hasOwnProperty("length") && !b.propertyIsEnumerable("length"))
  };
  Util.split = function(b, a, e, g) {
    if(typeof b !== "string") {
      return[]
    }
    a = a === void 0 ? /\s+/ : a;
    e = e === void 0 ? function(a) {
      return!!a
    } : e;
    g = g === void 0 ? function(a) {
      return $.trim(a)
    } : g;
    b = b.split(a);
    g && (b = b.map(g));
    e && (b = b.filter(e));
    return b
  };
  Util.isEmpty = function(b) {
    if(!b) {
      return!0
    }
    if(typeof b != "object") {
      return!1
    }
    for(var a in b) {
      if(b.hasOwnProperty(a)) {
        return!1
      }
    }
    return!0
  };
  Util.isEmptyObj = function(b) {
    if(b == null) {
      return!0
    }
    if(typeof b != "object") {
      return!1
    }
    for(var a in b) {
      if(b.hasOwnProperty(a)) {
        return!1
      }
    }
    return!0
  };
  Util.isNotEmptyObj = function(b) {
    if(b == null || typeof b != "object") {
      return!1
    }
    for(var a in b) {
      if(b.hasOwnProperty(a)) {
        return!0
      }
    }
    return!1
  };
  Util.isEmptyString = function(b) {
    return b == null || b === ""
  };
  Util.isEmptyArray = function(b) {
    if(b == null) {
      return!0
    }
    if(!Util.isArray(b)) {
      return!1
    }
    for(var a = 0, e = b.length;a < e;a++) {
      if(b.hasOwnProperty(a)) {
        return!1
      }
    }
    return!0
  };
  Util.emptyObject = function(b) {
    if(!b || typeof b != "object") {
      return b
    }
    if(Util.isArray(b)) {
      return b.length = 0, b
    }
    for(var a in b) {
      b.hasOwnProperty(a) && delete b[a]
    }
    return b
  };
  Util.deleteUndefined = function(b) {
    if(!b || typeof b != "object") {
      return b
    }
    var a;
    if(Util.isArray(b)) {
      for(a = b.length - 1;a > -1;a--) {
        b.hasOwnProperty(a) && b[a] === void 0 && b.splice(a, 1)
      }
      return b
    }
    for(a in b) {
      b.hasOwnProperty(a) && b[a] === void 0 && delete b[a]
    }
    return b
  };
  Util.deepClone = function(b) {
    if(!b) {
      return b
    }
    switch(typeof b) {
      case "boolean":
      ;
      case "number":
      ;
      case "string":
      ;
      case "function":
        return b
    }
    if(Util.isArray(b)) {
      for(var a = [], e = 0, g = b.length;e < g;e++) {
        e in b && (a[e] = Util.deepClone(b[e]))
      }
      return a
    }
    a = {};
    for(e in b) {
      b.hasOwnProperty(e) && (a[e] = Util.deepClone(b[e]))
    }
    return a
  };
  Util.clone = function(b, a, e) {
    if(!b) {
      return b
    }
    switch(typeof b) {
      case "boolean":
      ;
      case "number":
      ;
      case "string":
      ;
      case "function":
        return b
    }
    if(Util.isArray(b)) {
      if(e === 1) {
        return Array.prototype.slice.call(b)
      }
      for(var g = [], h = b.length, d = 0, e = e !== void 0 ? e - 1 : void 0;d < h;d++) {
        d in b && (g[d] = Util.clone(b[d], a, e))
      }
      return g
    }
    g = {};
    h = Util.isEmptyObj(a);
    if(e === 1) {
      if(h) {
        for(d in b) {
          b.hasOwnProperty(d) && (g[d] = b[d])
        }
      }else {
        for(d in a) {
          a.hasOwnProperty(d) && b.hasOwnProperty(d) && (g[d] = b[d])
        }
      }
    }else {
      if(e = e !== void 0 ? e - 1 : void 0, h) {
        for(d in b) {
          b.hasOwnProperty(d) && (g[d] = Util.clone(b[d], void 0, e))
        }
      }else {
        for(d in a) {
          a.hasOwnProperty(d) && b.hasOwnProperty(d) && (g[d] = Util.clone(b[d], void 0, e))
        }
      }
    }
    return g
  };
  Util.toArray = function(b) {
    var a = [], e;
    for(e in b) {
      b.hasOwnProperty(e) && a.push(b[e])
    }
    return a
  };
  Util.toArrayWithKey = function(b) {
    var a = [], e;
    for(e in b) {
      b.hasOwnProperty(e) && a.push({key:e, val:b[e]})
    }
    return a
  };
  Util.random = function(b) {
    return Math.floor(b * Math.random())
  };
  Util.bound = function(b, a, e) {
    isNaN(e) || (b = Math.min(b, e));
    isNaN(a) || (b = Math.max(b, a));
    return b
  };
  Util.callFn = function() {
    return arguments.length <= 3 ? arguments[1].call(arguments[0], arguments[2]) : arguments[1].apply(arguments[0], Array.prototype.slice.call(arguments, 2))
  };
  Util.formatNumber = function(b, a, e, g, h) {
    var e = e === void 0 ? "&#8361; " : e, a = isNaN(a) ? 0 : a, g = g === void 0 ? "." : g, h = h === void 0 ? "," : h, d = b < 0 ? "-" : "", l = parseInt(b = Math.abs(+b || 0).toFixed(a), 10) + "", c = l.length, c = c > 3 ? c % 3 : 0;
    return e + d + (c ? l.substr(0, c) + h : "") + l.substr(c).replace(/(\d{3})(?=\d)/g, "$1" + h) + (a ? g + Math.abs(b - l).toFixed(a).slice(2) : "")
  };
  Util.getBodyScroll = function() {
    var b = 0, a = 0;
    if(typeof window.pageYOffset === "number") {
      a = window.pageYOffset, b = window.pageXOffset
    }else {
      if(document.body && (document.body.scrollLeft || document.body.scrollTop)) {
        a = document.body.scrollTop, b = document.body.scrollLeft
      }else {
        if(document.documentElement && (document.documentElement.scrollLeft || document.documentElement.scrollTop)) {
          a = document.documentElement.scrollTop, b = document.documentElement.scrollLeft
        }
      }
    }
    return[b, a]
  };
  Util.hasClass = function(b, a) {
    if(b == null || a == null) {
      return!1
    }
    if(b.className === a) {
      return!0
    }
    if(b.className) {
      for(var e = b.classList ? b.classList : Util.split(b.className), g = 0, h = e.length;g < h;g++) {
        if(e[g] === a) {
          return!0
        }
      }
    }
    return!1
  };
  Util.hasTagAndClass = function(b, a, e) {
    if(b == null || a == null || e == null) {
      return!1
    }
    if(b.tagName === a) {
      if(b.className === e) {
        return!0
      }
      if(b.className && b.className.length >= e.length) {
        for(var b = b.classList ? b.classList : Util.split(b.className), a = 0, g = b.length;a < g;a++) {
          if(b[a] === e) {
            return!0
          }
        }
      }
    }
    return!1
  };
  Util.closest = function(b, a, e) {
    if(Util.hasClass(b, a)) {
      return b
    }
    for(b = b.parentNode;Util.isNotNull(b) && b !== e;b = b.parentNode) {
      if(Util.hasClass(b, a)) {
        return b
      }
    }
  };
  Util.closestWithTag = function(b, a, e, g) {
    if(Util.hasTagAndClass(b, a, e)) {
      return b
    }
    for(b = b.parentNode;Util.isNotNull(b) && b !== g;b = b.parentNode) {
      if(Util.hasTagAndClass(b, a, e)) {
        return b
      }
    }
  };
  Util.findFirstByClass = function(b, a) {
    if(b != null) {
      if(Util.hasClass(b, a)) {
        return b
      }
      for(var e = 0, g = b.childNodes, h = g.length, d;e < h;e++) {
        if(Util.isNotNull(g[e]) && (d = Util.findFirstByClass(g[e], a)) !== void 0) {
          return d
        }
      }
    }
  };
  Util.findFirstByTagAndClass = function(b, a, e) {
    if(b != null) {
      if(Util.hasTagAndClass(b, a, e)) {
        return b
      }
      for(var g = 0, b = b.childNodes, h = b.length, d;g < h;g++) {
        if(Util.isNotNull(b[g]) && (d = Util.findFirstByTagAndClass(b[g], a, e)) !== void 0) {
          return d
        }
      }
    }
  };
  Util.findByClass = function(b, a, e) {
    e === void 0 && (e = []);
    if(b == null) {
      return e
    }
    Util.hasClass(b, a) && e.push(b);
    for(var g = 0, b = b.childNodes, h = b.length;g < h;g++) {
      Util.isNotNull(b[g]) && Util.findByClass(b[g], a, e)
    }
    return e
  };
  Util.findByTagAndClass = function(b, a, e, g) {
    g === void 0 && (g = []);
    if(b == null) {
      return g
    }
    Util.hasTagAndClass(b, a, e) && g.push(b);
    for(var h = 0, b = b.childNodes, d = b.length;h < d;h++) {
      Util.isNotNull(b[h]) && Util.findByTagAndClass(b[h], a, e, g)
    }
    return g
  };
  Util.getHead = function() {
    return document.head ? document.head : document.getElementsByTagName("head")[0]
  };
  Util.appendTag = function(b, a) {
    return b.appendChild(document.createElement(a))
  };
  Util.appendHTML = function(b, a) {
    var e = document.createElement("div"), g, h = 0, d = [];
    e.innerHTML = a;
    for(g = e.childNodes.length;h < g;h++) {
      d.push(b.appendChild(e.firstChild))
    }
    return d
  };
  Util.createStyle = function(b) {
    b == null && (b = "");
    var a = document.createElement("style");
    a.type = "text/css";
    a.rel = "stylesheet";
    a.styleSheet ? a.styleSheet.cssText = b : a.appendChild(document.createTextNode(b));
    Util.getHead().appendChild(a);
    return a
  };
  Util.removeStyle = function(b) {
    b != null && b.parentNode != null && Util.getHead().removeChild(b)
  };
  Util.setStyle = function(b, a) {
    return b == null ? "" : b.styleSheet ? b.styleSheet.cssText = a : b.childNodes[0].nodeValue = a
  };
  Util.appendStyle = function(b, a) {
    return b == null ? "" : b.styleSheet ? b.styleSheet.cssText += a : b.childNodes[0].nodeValue += a
  };
  Util.getStyle = function(b) {
    return b == null ? "" : b.styleSheet ? b.styleSheet.cssText : b.childNodes[0].nodeValue
  };
  Util.appendScript = function(b) {
    var a = document.createElement("script");
    a.type = "text/javascript";
    a.text ? a.text = b : a.innerHTML = b;
    Util.getHead().appendChild(a);
    return a
  };
  Util.appendScriptFile = function(b) {
    document.write('<script type="text/javascript" src="' + b + '"><\/script>')
  };
  Util.outerHTML = function(b) {
    if(b.outerHTML === void 0) {
      var a = document.createElement("div");
      a.appendChild(b.cloneNode(!0));
      return a.innerHTML
    }
    return b.outerHTML
  };
  Util.index = function(b) {
    for(var a = 0;(b = b.previousSibling) != null;) {
      ++a
    }
    return a
  };
  Util.contains = function(b, a, e) {
    for(;a != null;) {
      if(a === b) {
        return!0
      }
      if(a === e) {
        break
      }
      a = a.parentNode
    }
    return!1
  };
  Util.areEqualArrays = function(b, a) {
    if(b == null || a == null) {
      return!1
    }
    if(b === a) {
      return!0
    }
    if(b.length !== a.length) {
      return!1
    }
    for(var e = 0, g = b.length;e < g;e++) {
      if(b.hasOwnProperty(e) && !a.hasOwnProperty(e) || a.hasOwnProperty(e) && !b.hasOwnProperty(e) || b[e] !== a[e]) {
        return!1
      }
    }
    return!0
  };
  Util.areEqualObjects = function(b, a) {
    if(b == null || a == null) {
      return!1
    }
    if(b === a) {
      return!0
    }
    if(typeof b !== "object" || typeof a !== "object") {
      return!1
    }
    for(var e in b) {
      if(b.hasOwnProperty(e) && (!a.hasOwnProperty(e) || b[e] !== a[e])) {
        return!1
      }
    }
    for(e in a) {
      if(a.hasOwnProperty(e) && (!b.hasOwnProperty(e) || b[e] !== a[e])) {
        return!1
      }
    }
    return!0
  };
  Util.areEqualComplex = function(b, a, e) {
    if(b == null || a == null) {
      return!1
    }
    if(b === a) {
      return!0
    }
    var g = e.length, h = e[0];
    if(g === 1) {
      return h === "array" ? Util.areEqualArrays(b, a) : Util.areEqualObjects(b, a)
    }
    if(g > 1) {
      e = e.slice(1);
      g = 0;
      if(h === "array") {
        if(b.length !== a.length) {
          return!1
        }
        for(h = b.length;g < h;g++) {
          if(!a.hasOwnProperty(g) || !Util.areEqualComplex(b[g], a[g], e)) {
            return!1
          }
        }
      }else {
        for(g in b) {
          if(b.hasOwnProperty(g) && (!a.hasOwnProperty(g) || !Util.areEqualComplex(b[g], a[g], e))) {
            return!1
          }
        }
        for(g in a) {
          if(a.hasOwnProperty(g) && (!b.hasOwnProperty(g) || !Util.areEqualComplex(b[g], a[g], e))) {
            return!1
          }
        }
      }
      return!0
    }
  };
  Util.typeCheck = function(b, a, e, g, h) {
    if(e && a === void 0 || g && a === null) {
      return!0
    }
    switch(typeof b) {
      case "string":
        if(typeof a === b) {
          return!0
        }
        break;
      case "function":
        if(a instanceof b) {
          return!0
        }
    }
    if(h) {
      return!1
    }
    throw new TypeError("object is not a " + b + ", but is a " + typeof a);
  };
  Util.sprint = function(b, a, e, g) {
    Util.typeCheck("string", b);
    Util.typeCheck("object", a);
    Util.typeCheck("string", e, !0);
    Util.typeCheck("string", g, !0);
    var h;
    e === void 0 && (e = "%");
    g === void 0 && (g = "%");
    for(h in a) {
      a.hasOwnProperty(h) && (b = b.replace(RegExp(e + h + g, "gm"), a[h]))
    }
    return b
  };
  Util.tagReplaces = {"&":"&amp;", "<":"&lt;", ">":"&gt;"};
  Util.replaceTag = function(b) {
    return Util.tagReplaces[b] || b
  };
  Util.escapeHtmlTags = function(b) {
    return b.replace(/[&<>]/g, Util.replaceTag)
  };
  Util.escapeRegExp = function(b) {
    return b.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&")
  };
  Util.strReplace = function(b, a) {
    var e, g = [];
    for(e in a) {
      a.hasOwnProperty(e) && g.push(Util.escapeRegExp(e))
    }
    return b.replace(RegExp("(" + g.join("|") + ")", "gm"), function(e) {
      return a[e]
    })
  };
  Util.calCheckSize = function() {
    var b = {}, a = document.createElement("div");
    document.body.appendChild(a);
    a.innerHTML = "<input type='checkbox' style='margin:0;padding:0;overflow:hidden'/>";
    b.checkboxW = a.childNodes[0].offsetWidth;
    b.checkboxH = a.childNodes[0].offsetHeight;
    a.innerHTML = "<input type='radio' style='margin:0;padding:0;overflow:hidden'/>";
    b.radioW = a.childNodes[0].offsetWidth;
    b.radioH = a.childNodes[0].offsetHeight;
    document.body.removeChild(a);
    return b
  };
  Util.which = function(b) {
    for(var a = {}, e = 0, g;e < b.length;e++) {
      if(g = b[e].toLowerCase(), g === "number") {
        for(g = 48;g <= 57;g++) {
          a[g] = !0
        }
        for(g = 96;g <= 105;g++) {
          a[g] = !0
        }
      }else {
        if(g === "alphabet") {
          for(g = 65;g <= 90;g++) {
            a[g] = !0
          }
        }else {
          if(g === "arrow") {
            for(g = 37;g <= 40;g++) {
              a[g] = !0
            }
          }else {
            g.length > 1 && (g = g.replace(/\s/g, "")), g.length >= 3 && (g = g.replace(/numpad|num/g, "n").replace(/korean|kor/g, "kr")), a[Util.keyMapKeydown[g]] = !0
          }
        }
      }
    }
    return a
  };
  Util.keyMapKeydown = {backspace:8, tab:9, enter:13, shift:16, control:17, ctrl:17, alt:18, pause:19, "break":19, capslock:20, escape:27, esc:27, space:32, " ":32, pageup:33, pgup:33, pagedown:34, pgdown:34, pgdn:34, end:35, home:36, leftarrow:37, left:37, uparrow:38, up:38, rightarrow:39, right:39, downarrow:40, down:40, insert:45, ins:45, "delete":46, del:46, 0:48, ")":48, 1:49, "!":49, 2:50, "@":50, 3:51, "#":51, 4:52, $:52, 5:53, "%":53, 6:54, "^":54, 7:55, "&":55, 8:56, "*":56, 9:57, "(":57, 
  a:65, b:66, c:67, d:68, e:69, f:70, g:71, h:72, i:73, j:74, k:75, l:76, m:77, n:78, o:79, p:80, q:81, r:82, s:83, t:84, u:85, v:86, w:87, x:88, y:89, z:90, n0:96, n1:97, n2:98, n3:99, n4:100, n5:101, n6:102, n7:103, n8:104, n9:105, "n*":106, "n+":107, "n-":109, "n.":110, "n/":111, f1:112, f2:113, f3:114, f4:115, f5:116, f6:117, f7:118, f8:119, f9:120, f10:121, f11:122, f12:123, numlock:144, scrolllock:145, mute:173, volumedown:174, volumeup:175, ":":186, ";":186, "=":187, "+":187, ",":188, "<":188, 
  "-":189, _:189, ".":190, ">":190, "/":191, "?":191, "`":192, "~":192, "[":219, "{":219, "\\":220, "|":220, "]":221, "}":221, "'":222, '"':222, kr:229};
  Util.printEventPos = function(b) {
    Util.print("client: (" + b.clientX + ", " + b.clientY + "), layer: (" + b.layerX + ", " + b.layerY + "), offset: (" + b.offsetX + ", " + b.offsetY + "), page: (" + b.pageX + ", " + b.pageY + "), screen: (" + b.screenX + ", " + b.screenY + "), xy: (" + b.x + ", " + b.y + ")")
  };
  Util.print = function(b) {
    if(d) {
      if(arguments.length === 1) {
        d(arguments[0])
      }else {
        for(var a = 0, e = arguments.length;a < e;a++) {
          d(arguments[a])
        }
      }
    }
  };
  Util.open = function(b) {
    var a = {url:"about:blank", name:"_blank", channelmode:"no", directories:"yes", fullscreen:"no", height:void 0, left:void 0, location:"yes", menubar:"yes", resizable:"yes", scrollbars:"yes", status:"yes", titlebar:"yes", toolbar:"yes", top:void 0, width:void 0, replace:void 0}, e;
    if(Util.isNotNull(b)) {
      for(e in a) {
        a.hasOwnProperty(e) && (a[e] = b[e])
      }
    }
    b = Util.ifNull(a.height, "", "height=" + a.height + ", ") + Util.ifNull(a.left, "", "left=" + a.left + ", ") + Util.ifNull(a.top, "", "top=" + a.top + ", ") + Util.ifNull(a.width, "", "width=" + a.width + ", ") + "channelmode=" + a.channelmode + ", directories=" + a.directories + ", fullscreen=" + a.fullscreen + ", location=" + a.location + ", menubar=" + a.menubar + ", resizable=" + a.resizable + ", scrollbars=" + a.scrollbars + ", status=" + a.status + ", titlebar=" + a.titlebar + ", toolbar=" + 
    a.toolbar;
    return Util.isNull(a.replace) ? window.open(a.url, a.name, b) : window.open(a.url, a.name, b, a.replace)
  }
})();
var Tracer = {};
(function() {
  function c() {
    this.stack = "";
    this.timers = {}
  }
  var f = goog.getObjectByName("jx.util");
  goog.exportSymbol("Tracer", c);
  var d = c.prototype;
  d.print = function(b, a, e) {
    b === void 0 && (b = "");
    a === void 0 && (a = "timer");
    e === void 0 && (e = !0);
    var g = this.timers[a], h = (new Date).getTime(), g = f.isNull(g) ? 0 : h - g;
    f.print((this.stack.length > 0 ? this.stack + " :: " : "") + b + ", Time elapsed since last update: " + g + "ms");
    e && (this.timers[a] = h)
  };
  d.addStack = function(b) {
    this.stack = this.stack + " > " + b
  };
  d.removeStack = function() {
    this.stack = this.stack.substring(0, this.stack.lastIndexOf(" > "))
  };
  d.clearStack = function() {
    this.stack = ""
  }
})();
jx.util$ = {};
var Util$ = {};
(function() {
  goog.exportSymbol("jx.util$", Util$);
  Util$.is$ = function(c) {
    return c instanceof jQuery ? !0 : !1
  };
  Util$.safe$ = function(c) {
    return c instanceof jQuery ? c : $(c)
  };
  Util$.unbindRemove = function(c) {
    c.unbind().remove()
  };
  jQuery.fn.getBoundingRect = function() {
    var c = this.offset();
    return{left:c.left, top:c.top, width:this.outerWidth(), height:this.outerHeight()}
  };
  jQuery.fn.containsEvent = function(c) {
    if(this.length === 0) {
      return!1
    }
    var f, d, b, a;
    if(this.length <= 1) {
      return f = this.getBoundingRect(), b = c.pageX, a = c.pageY, b >= f.left && b <= f.left + f.width && a >= f.top && a <= f.top + f.height
    }
    d = !1;
    this.each(function() {
      f = $(this).getBoundingRect();
      b = c.pageX;
      a = c.pageY;
      if(b >= f.left && b <= f.left + f.width && a >= f.top && a <= f.top + f.height) {
        return d = !0, !1
      }
    });
    return d
  };
  Util$.baseurlOfHeadScript = function(c) {
    var f = $(document.getElementsByTagName("head")[0]).find("script[src$='" + c + "']").attr("src");
    return f.substring(0, f.indexOf(c))
  };
  Util$.calScrollbarDims = function(c) {
    if(Util.isNotNull(window._SCROLLBAR)) {
      return window._SCROLLBAR
    }
    if(Util.isNotNull(window.opener) && Util.isNotNull(window.opener._SCROLLBAR)) {
      return window.opener._SCROLLBAR
    }
    var c = Util$.safe$(c), f;
    c[0].innerHTML = "<div id='scrollbardim' style='position:absolute;top:-10000px;left:-10000px;width:100px;height:100px;overflow:scroll;'></div>";
    f = $(document.getElementById("scrollbardim"));
    f = {w:f.width() - f[0].clientWidth, h:f.height() - f[0].clientHeight};
    c[0].innerHTML = "";
    return window._SCROLLBAR = f
  }
})();
jx.grid = {};
var JGM = {};
(function() {
  var c = goog.getObjectByName("jx.util"), f = goog.getObjectByName("jx.util$");
  goog.exportSymbol("JGM", JGM);
  goog.exportSymbol("jx.grid", JGM);
  JGM.version = "1.2.3";
  JGM._map = {ArrayExtIE:{cacheModule:!1}, Cache:{cacheModule:!0}, Cell:{cacheModule:!1}, CheckManager:{cacheModule:!0}, ColDefManager:{cacheModule:!0}, ColGroup:{cacheModule:!0}, ColHeader:{cacheModule:!0}, Collapser:{cacheModule:!0}, DataManager:{cacheModule:!0}, DataCreator:{cacheModule:!0}, EditManager:{cacheModule:!0}, Editor:{cacheModule:!0}, EngineExt:{cacheModule:!1}, EventManager:{cacheModule:!0}, Footer:{cacheModule:!0}, HeaderTree:{cacheModule:!0}, Grid:{cacheModule:!0}, GridManager:{cacheModule:!1}, 
  MenuBar:{cacheModule:!0}, ViewportManager:{cacheModule:!0}, SelectionManager:{cacheModule:!0}, SearchManager:{cacheModule:!0}, TooltipManager:{cacheModule:!0}, Tracer:{cacheModule:!1}, Tree:{cacheModule:!0}, TreeNode:{cacheModule:!1}, Util:{cacheModule:!1}, Util$:{cacheModule:!1}};
  JGM.create = function(d, b) {
    c.isNull(b) && (b = {});
    if(!this.hasOwnProperty(d)) {
      throw Error("cannot find a grid module: name=" + d);
    }
    if(this._map.hasOwnProperty(d)) {
      if(this._map[d].cacheModule) {
        var a = b.mid = "JGM" + this.m.length++, e = new this[d](b);
        this.m.hasOwnProperty(d) || (this.m[d] = {});
        this.m[d][a] = e;
        d === "Grid" && e.name && (this.gridMap[e.name] = e);
        return e
      }else {
        return new this[d](b)
      }
    }else {
      return new this[d](b)
    }
  };
  JGM._destroy = function(d, b) {
    var a, e, g, h;
    for(e in b) {
      if(b.hasOwnProperty(e)) {
        switch(e) {
          case "map":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                JGM._deleteMap(d, a[g])
              }
            }else {
              if(a instanceof Array) {
                h = a.length;
                for(g = 0;g < h;g++) {
                  c.emptyObject(a[g])
                }
              }else {
                c.emptyObject(a)
              }
            }
            break;
          case "array":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                JGM._deleteArray(d, a[g])
              }
            }else {
              a.length = 0
            }
            break;
          case "$":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                JGM._delete$(d, a[g])
              }
            }else {
              if(a instanceof Array) {
                h = a.length;
                for(g = 0;g < h;g++) {
                  f.unbindRemove(a[g])
                }
              }else {
                f.unbindRemove(a)
              }
            }
            break;
          case "style":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                JGM._deleteStyle(d, a[g])
              }
            }else {
              if(a instanceof Array) {
                h = a.length;
                for(g = 0;g < h;g++) {
                  c.removeStyle(a[g])
                }
              }else {
                c.removeStyle(a)
              }
            }
            break;
          case "property":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                delete d[a[g]]
              }
            }else {
              if(a instanceof Array) {
                h = a.length;
                for(g = 0;g < h;g++) {
                  delete d[a[g]]
                }
              }
            }
            break;
          case "module":
            a = b[e];
            if(c.isString(a)) {
              a = c.split(a);
              h = a.length;
              for(g = 0;g < h;g++) {
                JGM._deleteModule(d, a[g])
              }
            }else {
              if(a instanceof Array) {
                h = a.length;
                for(g = 0;g < h;g++) {
                  a[g].destroy()
                }
              }else {
                a.destroy()
              }
            }
            break;
          case "name":
            d.hasOwnProperty("mid") && (JGM._remove(b[e], d.mid), delete d.mid);
            break;
          case "path":
            d.hasOwnProperty("grid") && d.grid.hasOwnProperty(b[e]) && (delete d.grid[b[e]], delete d.grid)
        }
      }
    }
    c.emptyObject(d)
  };
  JGM._deleteMap = function(d, b) {
    d.hasOwnProperty(b) && (c.emptyObject(d[b]), delete d[b])
  };
  JGM._deleteArray = function(d, b) {
    if(d.hasOwnProperty(b)) {
      d[b].length = 0, delete d[b]
    }
  };
  JGM._delete$ = function(d, b) {
    d.hasOwnProperty(b) && (f.unbindRemove(d[b]), delete d[b])
  };
  JGM._deleteStyle = function(d, b) {
    d.hasOwnProperty(b) && (c.removeStyle(d[b]), delete d[b])
  };
  JGM._deleteModule = function(d, b) {
    d.hasOwnProperty(b) && (d[b].destroy(), delete d[b])
  };
  JGM._remove = function(d, b) {
    delete this.m[d][b]
  };
  JGM.grid = function(d) {
    return this.create("Grid", d)
  };
  JGM.gridMap = {};
  JGM.getGrid = function(d) {
    if(this.gridMap.hasOwnProperty(d)) {
      return this.gridMap[d]
    }
  };
  JGM._add = function(d, b) {
    this[d] = b
  };
  JGM._extend = function(d, b) {
    var a = c.ifNull(b, {});
    $.extend(!0, d, a);
    $.extend(!0, a, d);
    return a
  };
  JGM.m = {length:0};
  JGM._CONST = {_cssUnselectable:"-webkit-user-select:none;-khtml-user-select:none;-moz-user-select:none;-o-user-select:none;user-select:none;", _cssUnselectable:"-webkit-user-drag:none;-moz-user-drag:none;user-drag:none;", _checkboxWidth:void 0, _checkboxHeight:void 0, _radioWidth:void 0, _radioHeight:void 0};
  JGM._globalEventsBound = !1;
  JGM._globalEvents = {_mousemove:function(d) {
    var b, a = JGM.m.Grid;
    for(b in a) {
      a.hasOwnProperty(b) && a[b]._mousemove(d)
    }
  }, _mouseup:function(d) {
    var b, a = JGM.m.Grid;
    for(b in a) {
      a.hasOwnProperty(b) && a[b]._mouseup(d)
    }
  }, _resize:function(d) {
    var b, a = JGM.m.Grid;
    for(b in a) {
      a.hasOwnProperty(b) && a[b]._resize(d)
    }
  }};
  JGM._bindGlobalEvents = function() {
    if(!this._globalEventsBound) {
      $(document).bind({mousemove:this._globalEvents._mousemove, mouseup:this._globalEvents._mouseup}), $(window).resize(this._globalEvents._resize), this._globalEventsBound = !0
    }
  };
  JGM._unbindGlobalEvents = function() {
    if(this._globalEventsBound) {
      $(document).unbind({mousemove:this._globalEvents._mousemove, mouseup:this._globalEvents._mouseup}), $(window).unbind("resize", this._globalEvents._resize), this._globalEventsBound = !1
    }
  };
  JGM.error = {LENGTH_NOT_EQUAL:"Lengths are not equal", NOT_MODIFIABLE:"Cannot modify value for '%0'.", KEY_UNDEFINED:"Column '%0' is undefined.", BAD_NULL:"Column '%0' cannot be null.", DUP_KEY:"Duplicate column key '%0'.", DUP_ENTRY:"Duplicate entry '%0' for '%1'.", KEY_NOT_FOUND:"'%0' for '%1' doesn't exist in table.", PARSE_ERROR:"Cannot parse '%0' for '%1'.", INVALID_DEFAULT:"Invalid default value '%0' for '%1'.", MULTIPLE_PRI_KEY:"Multiple primary key defined.", DATA_TOO_LONG:"Data '%0' too long for column '%1'. Maximum is %2.", 
  DATA_TOO_SHORT:"Data '%0' too short for column '%1'. Minimum is %2.", WRONG_LENGTH:"Length of data '%0' is not '%1' characters long for column '%2'.", BIGGER_THAN:"Data '%0' too big for column '%1'. Maximum is %2.", SMALLER_THAN:"Data '%0' too small for column '%1'. Minimum is %2.", WRONG_VALUE:"Incorrect value: '%0' for '%1'."}
})();
jx.grid.renderer = {};
(function() {
  var c = goog.getObjectByName("jx.grid");
  goog.getObjectByName("jx.util");
  goog.exportSymbol("jx.grid.renderer", f);
  var f = c.renderer = jx.grid.renderer;
  f.selectBox = function(d) {
    var b = d.mapping, a = d.attr, e = d["default"], g = d.style, h = d.callback, i, l, c, f = 0, j = [], o = [], n = "<select";
    if(a) {
      for(c in a) {
        a.hasOwnProperty(c) && (n += " " + c + '="' + a[c] + '"')
      }
    }
    if(g) {
      n += ' style="';
      for(c in g) {
        g.hasOwnProperty(c) && (n += c + ":" + g[c] + ";")
      }
      n += '"'
    }
    n += ">";
    for(i in b) {
      b.hasOwnProperty(i) && (d = b[i], j.push(i), o.push(d), e == d && (l = f), f++)
    }
    return function(a) {
      var e, g, b = n;
      for(g = 0;g < f;g++) {
        if(a == o[g]) {
          e = g;
          break
        }
      }
      e === void 0 && (e = l);
      for(g = 0;g < f;g++) {
        b += '<option value="' + o[g] + '"', g === e && (b += ' selected="selected"'), b += ">" + j[g] + "</option>"
      }
      b += "</select>";
      h && (e = [], e.push(b), Array.prototype.push.apply(e, arguments), b = h.apply(this, e));
      return b
    }
  }
})();
jx.lang = {};
jx.lang.Disposable = {};
(function() {
  function c() {
  }
  function f(a, e) {
    var a = a || 0, g, h;
    if(a !== 0) {
      for(g in this) {
        if(this.hasOwnProperty(g)) {
          if(h = this[g]) {
            if(h.dispose) {
              h.dispose(a - 1, e)
            }else {
              if(e && typeof h == "object") {
                b(h) ? h.length = 0 : f.call(h, a - 1, e)
              }
            }
          }
          delete this[g]
        }
      }
    }else {
      for(g in this) {
        this.hasOwnProperty(g) && delete this[g]
      }
    }
  }
  var d = goog.getObjectByName("jx.util");
  goog.exportSymbol("jx.lang.Disposable", c);
  goog.exportProperty(c.prototype, "dispose", f);
  var b = d.isArray
})();
jx.events = {};
jx.events.EventDispatcher = {};
(function() {
  function c() {
  }
  goog.getObjectByName("jx.grid");
  goog.getObjectByName("jx.util");
  var f = goog.getObjectByName("jx.lang.Disposable");
  goog.exportSymbol("jx.events.EventDispatcher", c);
  goog.inherits(c, f);
  var f = c.prototype, d = f.dispose;
  f.dispose = function() {
    d.call(this, -1, !0)
  };
  f.addEventListener = function(b, a) {
    if(!b) {
      throw Error("Invalid event type: " + b);
    }
    if(typeof a != "function") {
      throw Error("Event listener must be a function");
    }
    if(!this._handlers) {
      this._handlers = {}
    }
    var e = this._handlers, b = (b + "").toLowerCase();
    e.hasOwnProperty(b) || (e[b] = []);
    e = e[b];
    e.indexOf(a) === -1 && e.push(a)
  };
  f.removeEventListener = function(b, a) {
    if(this._handlers) {
      var b = (b + "").toLowerCase(), e = this._handlers;
      if(e.hasOwnProperty(b)) {
        for(var g = e[b], h = -1;(h = g.indexOf(a, h + 1)) !== -1;) {
          g.splice(h, 1)
        }
        g.length === 0 && delete e[b]
      }
    }
  };
  f.dispatchEvent = function(b) {
    if(!b || !b.type) {
      throw Error("Invalid event");
    }
    if(!this._handlers) {
      if(b.cancelable && b.defaultPrevented) {
        return!1
      }
      b.defaultAction && b.defaultAction(this);
      return!0
    }
    var a = this._handlers, e = (b.type + "").toLowerCase();
    b.target = this;
    if(a.hasOwnProperty(e)) {
      for(var a = a[e], e = 0, g = a.length, h;e < g && !b.stopPropagation;e++) {
        h = a[e], h.handleEvent ? h.handleEvent(b) : h.call(this, b)
      }
    }
    if(b.cancelable && b.defaultPrevented) {
      return!1
    }
    b.defaultAction && b.defaultAction(this);
    return!0
  }
})();
jx.grid.Column = {};
(function() {
  function c(d) {
    if(!(d.manager && typeof d.manager == "object")) {
      throw Error("Column needs a valid manager!");
    }
    this.manager = d.manager;
    this.key = d.key + "";
    if(!this.key) {
      throw Error("Column needs a non-empty key!");
    }
    var b = "column key=" + this.key;
    if(this.manager.hasKey(this.key)) {
      throw Error("Duplicate column key!" + b);
    }
    this.name = d.name ? d.name + "" : "";
    this.title = d.title ? d.title + "" : "";
    this.noName = !!d.noName;
    this.noTitle = !!d.noTitle;
    this.type = d.type + "" || null;
    this.defaultValue = d.defaultValue;
    this.inputOnCreate = !!d.inputOnCreate;
    this.width = (this.width = Number(d.width)) || 90;
    this.minW = (this.minW = Number(d.minW)) || 30;
    this.maxW = Number(d.maxW) || null;
    this.resizable = !!d.resizable;
    this.hidden = !!d.hidden;
    this.noSearch = !!d.noSearch;
    this.tooltipEnabled = !!d.tooltipEnabled;
    this.colClass = d.colClass + "" || null;
    this.style = d.style + "" || null;
    this.headerStyle = d.headerStyle + "" || null;
    if(d.parser && typeof d.parser != "function") {
      throw Error("Invalid parser!" + b);
    }
    this.parser = d.parser || null;
    if(d.validator && typeof d.validator != "function") {
      throw Error("Invalid validator!" + b);
    }
    this.validator = d.validator || null;
    if(d.renderer && typeof d.renderer != "function") {
      throw Error("Invalid renderer!" + b);
    }
    this.renderer = d.renderer || null;
    if(d.sumRenderer && typeof d.sumRenderer != "function") {
      throw Error("Invalid sum renderer!" + b);
    }
    this.sumRenderer = d.sumRenderer || null;
    if(d.editor && typeof d.editor != "object") {
      throw Error("Invalid editor!" + b);
    }
    this.editor = d.editor || null;
    this.sorter = d.sorter || null;
    this.filter = d.filter || null
  }
  var f = goog.getObjectByName("jx.events.EventDispatcher");
  goog.exportSymbol("jx.grid.Column", c);
  goog.inherits(c, f);
  f = c.prototype;
  f.show = function() {
    return this.hidden ? (this.hidden = !1, this.dispatchEvent({type:"hidden", value:!1}), !0) : !1
  };
  f.hide = function() {
    return!this.hidden ? (this.hidden = !0, this.dispatchEvent({type:"hidden", value:!0}), !0) : !1
  };
  f.setHidden = function(d) {
    return d ? this.hide() : this.show()
  };
  f.setWidth = function(d) {
    return(d = Number(d)) && this.width !== d ? (this.width = d, this.dispatchEvent({type:"width", value:d}), d) : !1
  };
  f.setRenderer = function(d) {
    if(this.renderer !== d) {
      if(d && typeof d != "function") {
        throw Error("Invalid renderer!column key=" + this.key);
      }
      this.renderer = d || null;
      this.dispatchEvent({type:"renderer", value:d})
    }
  }
})();
jx.grid.BaseModule = {};
(function() {
  function c(b) {
    if(b) {
      if(b.mid != null) {
        this.mid = b.mid
      }
      if(b.grid) {
        this.grid = b.grid
      }
    }
    var a = this._defaultOptions && this._defaultOptions(), e = b && b.options;
    if(e || a) {
      a || (a = {}), e && $.extend(!0, a, e), this._options = a
    }
    this._init && (this.dispatchEvent({type:"beforeinit"}), this._init(b), this.dispatchEvent({type:"afterinit"}));
    var g = this, h = this.grid;
    h && ["dispose", "createcss", "createdynamiccss", "render", "keydown", "keyup", "keypress", "mousein", "mouseout", "mouseenter", "mouseleave", "mousemove", "mouseover", "mousedown", "mouseup", "click", "dblclick", "resize", "resizewidth", "resizeheight", "scroll", "scrollh", "scrollv"].forEach(function(a) {
      var e = "_before" + a, b = "_after" + a;
      g[e] && h.addEventListener(e, function(a) {
        return g[e](a)
      });
      g[b] && h.addEventListener(b, function(a) {
        return g[b](a)
      })
    });
    this._bindEvents && (this.dispatchEvent({type:"beforebindevents"}), this._bindEvents(b), this.dispatchEvent({type:"afterbindevents"}));
    this.dispatchEvent({type:"complete"})
  }
  var f = goog.getObjectByName("jx.events.EventDispatcher");
  goog.exportSymbol("jx.grid.BaseModule", c);
  goog.inherits(c, f);
  var f = c.prototype, d = f.dispose;
  f._beforedispose = function() {
    this.dispose()
  };
  f.dispose = function() {
    delete this.grid;
    this.dispatchEvent({type:"beforedispose"});
    d.call(this);
    this.dispatchEvent({type:"afterdispose"})
  }
})();
jx.data = {};
jx.data.DataManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.dataMgr = this;
    this.all = [];
    this.datalist = [];
    this.failed = [];
    this._options = f._extend({idKey:void 0, idColKeys:[], uniqueKeys:[]}, a.options);
    this._consts = {_auto:0, _given:1, _composite:2, _notReal:this.mid + "@NR" + d.random(1E4), _add:0, _addList:1, _update:2, _updateList:3, _remove:4, _removeList:5, unknown:0, number:1, string:2, "boolean":3, date:4, "enum":5};
    d.isNotNull(this._options.idKey) ? (this._idMode = this._consts._given, this.idKey = this._options.idKey) : (this._idMode = this._options.idColKeys.length !== 0 ? this._consts._composite : this._consts._auto, this.idKey = "J@I" + this.mid + "@" + d.random(1E4));
    this._increment = 0;
    this.keyToType = {};
    this._idToIdx = {};
    this._idToData = {};
    this._filters = [];
    this._history = [];
    this._redoHistory = [];
    this.uniqueMap = {};
    this.__init(a)
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.data.DataManager", c);
  f._add("DataManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function(a) {
    for(var e = 0, g = this._options.uniqueKeys, b, i = this.uniqueMap, l = g.length, c = this.keyToType, f = this.grid.colDefMgr.getAll();e < l;e++) {
      b = g[e], typeof b === "string" && (i[b] = {})
    }
    l = f.length;
    for(e = 0;e < l;e++) {
      g = f[e], b = g.key, g.hasOwnProperty("unique") && g.unique === !0 && !i.hasOwnProperty(b) && (i[b] = {}), c[b] = this.mapDatatype(g.type)
    }
    d.ifNull(a.datalist, []);
    this.bindEvents();
    this.set(a.datalist)
  };
  b.mapDatatype = function(a) {
    if(typeof a === "string") {
      switch(a = a.toLowerCase(), a) {
        case "number":
          return this._consts.number;
        case "string":
          return this._consts.string;
        case "boolean":
          return this._consts["boolean"];
        case "date":
          return this._consts.date;
        case "enum":
          return this._consts["enum"]
      }
    }
    return this._consts.unknown
  };
  b.bindEvents = function() {
    this.grid.event.bind({onDestroy:this._destroy, keydownCanvas:this._keydownCanvas}, this)
  };
  b._destroy = function() {
    this.cleanList(this.all);
    f._destroy(this, {name:"DataManager", path:"dataMgr", property:"all _idMode _increment idKey _sorter", map:"consts _idToIdx _idToData _options", array:"datalist failed _history _redoHistory _filters"})
  };
  b.addUniqueIndex = function(a, e, g, b) {
    if(b !== !0 && (d.isNull(a) || d.isEmptyString(e) || d.isNull(g))) {
      return!1
    }
    if(g.hasOwnProperty(e) === !1) {
      return this.grid.error("KEY_UNDEFINED", e)
    }
    if(d.isEmptyString(b = g[e])) {
      return this.grid.error("BAD_NULL", e)
    }
    if(a.hasOwnProperty(b)) {
      return a[b] === g ? !1 : this.grid.error("DUP_ENTRY", b, e)
    }
    a[b] = g;
    return!0
  };
  b.addUniqueIndices = function(a, e, g, b) {
    if(b !== !0 && (d.isNull(a) || d.isEmptyString(e) || d.isEmptyArray(g))) {
      return!1
    }
    for(var i = g.length, l = [], c, f, b = 0;b < i;b++) {
      if(!d.isNull(f = g[b])) {
        if(f.hasOwnProperty(e) === !1) {
          return this.removeUniqueIndices(a, e, l), this.grid.error("KEY_UNDEFINED", e)
        }
        if(d.isEmptyString(c = f[e])) {
          return this.removeUniqueIndices(a, e, l), this.grid.error("BAD_NULL", e)
        }
        if(a.hasOwnProperty(c)) {
          if(a[c] === f) {
            continue
          }
          this.removeUniqueIndices(a, e, l);
          return this.grid.error("DUP_ENTRY", c, e)
        }
        l.push(a[c] = f)
      }
    }
    return l.length > 0
  };
  b.updateUniqueIndex = function(a, e, g, b, i, l) {
    if(l !== !0 && (d.isEmptyObj(a) || d.isEmptyString(e) || d.isNullOr(g, i) || d.isEmptyObj(b))) {
      return!1
    }
    if(b.hasOwnProperty(e) === !1) {
      return!1
    }
    if(i.hasOwnProperty(e) === !1 || g.hasOwnProperty(e) === !1) {
      return this.grid.error("KEY_UNDEFINED", e)
    }
    if(a.hasOwnProperty(i = i[e]) === !1) {
      return this.grid.error("KEY_NOT_FOUND", i, e)
    }
    if(d.isEmptyString(b = b[e])) {
      return this.grid.error("BAD_NULL", e)
    }
    if(a.hasOwnProperty(b)) {
      return a[b] === g ? !1 : this.grid.error("DUP_ENTRY", b, e)
    }
    a[b] = g;
    delete a[i];
    return i
  };
  b.updateUniqueIndices = function(a, e, g, b, i, l) {
    if(l !== !0) {
      if(d.isEmptyObj(a) || d.isEmptyString(e) || d.isEmptyArray(g) || d.isEmptyArray(b) || d.isEmptyArray(i)) {
        return!1
      }
      if(g.length !== b.length || g.length !== i.length) {
        return this.grid.error("LENGTH_NOT_EQUAL")
      }
    }
    for(var l = 0, c = g.length, f, j, o, n = [], q = [], p = [], r, s;l < c;l++) {
      if(!d.isNull(f = g[l])) {
        if((o = b[l]).hasOwnProperty(e) !== !1) {
          j = i[l];
          if(j.hasOwnProperty(e) === !1 || f.hasOwnProperty(e) === !1) {
            return this.updateUniqueIndices(a, e, n, p, q), this.grid.error("KEY_UNDEFINED", e)
          }
          if(a.hasOwnProperty(s = j[e]) === !1) {
            return this.updateUniqueIndices(a, e, n, p, q), this.grid.error("KEY_NOT_FOUND", s, e)
          }
          if(d.isEmptyString(r = o[e])) {
            return this.updateUniqueIndices(a, e, n, p, q), this.grid.error("BAD_NULL", e)
          }
          if(a.hasOwnProperty(r)) {
            if(a[r] === f) {
              continue
            }
            this.updateUniqueIndices(a, e, n, p, q);
            return this.grid.error("DUP_ENTRY", r, e)
          }
          a[r] = f;
          delete a[s];
          n.push(f);
          q.push(o);
          p.push(j)
        }
      }
    }
    return n.length === 0 ? !1 : {datalist:n, changes:q, befores:p}
  };
  b.removeUniqueIndex = function(a, e, g, b) {
    if(!(b !== !0 && (d.isEmptyObj(a) || d.isEmptyString(e) || d.isEmptyObj(g)))) {
      var i;
      g.hasOwnProperty(e) && a.hasOwnProperty(i = g[e]) && delete a[i]
    }
  };
  b.removeUniqueIndices = function(a, e, g, b) {
    if(!(b !== !0 && (d.isEmptyObj(a) || d.isEmptyString(e) || d.isEmptyArray(g)))) {
      for(var i = g.length, l, c, b = 0;b < i;b++) {
        c = g[b], c.hasOwnProperty(e) && a.hasOwnProperty(l = c[e]) && delete a[l]
      }
    }
  };
  b.addToUniqueMap = function(a) {
    if(d.isEmptyObj(a) || d.isEmptyObj(this.uniqueMap)) {
      return!1
    }
    var e = [], g, b = this.uniqueMap, i;
    for(g in b) {
      if(b.hasOwnProperty(g)) {
        if(i = this.addUniqueIndex(b[g], g, a), i === !0) {
          e.push(g)
        }else {
          if(i instanceof Error) {
            g = 0;
            for(var l = e.length;g < l;g++) {
              this.removeUniqueIndex(b[e[g]], e[g], a)
            }
            return i
          }
        }
      }
    }
    return e.length > 0
  };
  b.addListToUniqueMap = function(a) {
    if(d.isEmptyArray(a) || d.isEmptyObj(this.uniqueMap)) {
      return!1
    }
    var e = this.uniqueMap, g = [], b, i;
    for(b in e) {
      if(e.hasOwnProperty(b)) {
        if(i = this.addUniqueIndices(e[b], b, a), i === !0) {
          g.push(b)
        }else {
          if(i instanceof Error) {
            b = 0;
            for(var l = g.length;b < l;b++) {
              this.removeUniqueIndices(e[g[b]], g[b], a)
            }
            return i
          }
        }
      }
    }
    return g.length > 0
  };
  b.updateUniqueMap = function(a, e, g) {
    if(d.isNullOr(a, e, g) || d.isEmptyObj(this.uniqueMap)) {
      return!1
    }
    var b, i = this.uniqueMap, l = [], c;
    for(b in i) {
      if(i.hasOwnProperty(b)) {
        c = this.updateUniqueIndex(i[b], b, a, e, g);
        if(c instanceof Error) {
          b = 0;
          for(var f = l.length;b < f;b++) {
            this.updateUniqueIndex(i[l[b]], l[b], a, g, e)
          }
          return c
        }
        c !== !1 && l.push(b)
      }
    }
    return l.length > 0
  };
  b.updateListUniqueMap = function(a, e, g) {
    if(d.isEmptyArray(a) || d.isEmptyArray(e) || d.isEmptyArray(g) || d.isEmptyObj(this.uniqueMap)) {
      return!1
    }
    if(a.length !== e.length || a.length !== g.length) {
      return this.grid.error("LENGTH_NOT_EQUAL")
    }
    var b, i = this.uniqueMap, c = [], f;
    for(b in i) {
      if(i.hasOwnProperty(b)) {
        f = this.updateUniqueIndices(i[b], b, a, e, g);
        if(f instanceof Error) {
          b = 0;
          for(var m = c.length;b < m;b++) {
            this.updateUniqueIndices(i[c[b]], c[b], a, g, e)
          }
          return f
        }
        f !== !1 && c.push(b)
      }
    }
    return c.length > 0
  };
  b.removeFromUniqueMap = function(a) {
    if(!d.isEmptyObj(a) && !d.isEmptyObj(this.uniqueMap)) {
      var e, g = this.uniqueMap;
      for(e in g) {
        g.hasOwnProperty(e) && this.removeUniqueIndex(g[e], e, a)
      }
    }
  };
  b.removeListFromUniqueMap = function(a) {
    if(!d.isEmptyArray(a) && !d.isEmptyObj(this.uniqueMap)) {
      var e, g = this.uniqueMap;
      for(e in g) {
        g.hasOwnProperty(e) && this.removeUniqueIndices(g[e], e, a)
      }
    }
  };
  b.addToIdMap = function(a) {
    if(d.isNull(a)) {
      return!1
    }
    var e = this.idKey;
    switch(this._idMode) {
      case this._consts._auto:
        a.hasOwnProperty(e) === !1 && (a[e] = this._increment++);
      case this._consts._given:
      ;
      case this._consts._composite:
        return this.addUniqueIndex(this._idToData, e, a)
    }
    return!1
  };
  b.addListToIdMap = function(a) {
    if(d.isEmptyArray(a)) {
      return!1
    }
    var e = this.idKey;
    switch(this._idMode) {
      case this._consts._auto:
        for(var g = 0, b, i = a.length;g < i;g++) {
          if((b = a[g]).hasOwnProperty(e) === !1) {
            b[e] = this._increment++
          }
        }
      ;
      case this._consts._given:
      ;
      case this._consts._composite:
        return this.addUniqueIndices(this._idToData, e, a)
    }
    return!1
  };
  b.updateIdMap = function(a, e, g) {
    if(d.isNullOr(a, g) || d.isEmptyObj(e)) {
      return!1
    }
    var b = this.idKey;
    switch(this._idMode) {
      case this._consts._auto:
        if(e.hasOwnProperty(b)) {
          return this.grid.error("NOT_MODIFIABLE", b)
        }
      ;
      case this._consts._given:
        return this.updateUniqueIndex(this._idToData, b, a, e, g);
      case this._consts._composite:
        if(e.hasOwnProperty(b)) {
          return this.grid.error("NOT_MODIFIABLE", b)
        }
        for(var g = this._options.idColKeys, i = g.length, c = 0;c < i;c++) {
          if(e.hasOwnProperty(g[c])) {
            for(var f = "", m = 0, j, o, n = {}, q = {}, c = q[b] = a[b];m < i;m++) {
              if(j = g[m], e.hasOwnProperty(j)) {
                if(d.isEmptyString(o = e[j])) {
                  return this.grid.error("BAD_NULL", j)
                }
                f += "&" + o
              }else {
                f += "&" + a[j]
              }
            }
            a[b] = n[b] = f;
            if(c === f) {
              break
            }
            e = this.updateUniqueIndex(this._idToData, b, a, n, q);
            e instanceof Error && (a[b] = c);
            return e
          }
        }
    }
    return!1
  };
  b.updateListIdMap = function(a, e, g) {
    if(d.isEmptyArray(a) || d.isEmptyArray(e) || d.isEmptyArray(g)) {
      return!1
    }
    var b = this.idKey, i = a.length, c = 0;
    switch(this._idMode) {
      case this._consts._auto:
        for(;c < i;c++) {
          if(e[c].hasOwnProperty(b)) {
            return this.grid.error("NOT_MODIFIABLE", b)
          }
        }
      ;
      case this._consts._given:
        return this.updateUniqueIndices(this._idToData, b, a, e, g);
      case this._consts._composite:
        for(var f = this._idToData, m, j, o = this._options.idColKeys, n = o.length, q, g = [], p = [], r = [], s = [], t, u, v, w;c < i;c++) {
          m = a[c];
          j = e[c];
          if(j.hasOwnProperty(b)) {
            t = 0;
            for(i = g.length;t < i;t++) {
              p[t][b] = g[t]
            }
            return this.grid.error("NOT_MODIFIABLE", b)
          }
          for(t = 0;t < n;t++) {
            if(j.hasOwnProperty(o[t])) {
              q = "";
              for(u = 0;u < n;u++) {
                if(v = o[u], j.hasOwnProperty(v)) {
                  if(d.isEmptyString(w = j[v])) {
                    t = 0;
                    for(i = g.length;t < i;t++) {
                      p[t][b] = g[t]
                    }
                    return this.grid.error("BAD_NULL", v)
                  }
                  q += "&" + w
                }else {
                  q += "&" + m[v]
                }
              }
              m[b] !== q && (p.push(m), r.push({}), s.push({}), g.push(m[b]), m[b] = q)
            }
          }
        }
        if(p.length === 0) {
          break
        }
        a = this.updateUniqueIndices(f, b, p, r, s);
        if(a instanceof Error) {
          t = 0;
          for(i = g.length;t < i;t++) {
            p[t][b] = g[t]
          }
        }
        return a
    }
    return!1
  };
  b.removeFromIdMap = function(a) {
    var e = this.idKey, g = this._idToData, b;
    d.isNotNull(a) && a.hasOwnProperty(e) && g.hasOwnProperty(b = a[e]) && delete g[b]
  };
  b.removeListFromIdMap = function(a) {
    if(!d.isEmptyArray(a)) {
      for(var e = this.idKey, g = a.length, b = this._idToData, i, c, f = 0;f < g;f++) {
        c = a[f], c.hasOwnProperty(e) && b.hasOwnProperty(i = c[e]) && delete b[i]
      }
    }
  };
  b.fillTemp = function(a, e) {
    if(!d.isNull(a)) {
      var b = this.grid.colDefMgr.getAll(), h = b.length, i, c, f = 0;
      if(e !== void 0 && e.isNew) {
        for(;f < h;f++) {
          c = b[f], i = c.key, c.nullOnCreate && d.isNull(a[i]) && (a[i] = "J@H" + this._increment++)
        }
      }
    }
  };
  b.fillTempList = function(a, e) {
    if(!d.isEmptyArray(a)) {
      var b = this.grid.colDefMgr.getAll(), h = b.length, i = a.length, c, f, m = 0;
      if(e !== void 0 && e.isNew) {
        for(;m < h;m++) {
          if(f = b[m], c = f.key, f.nullOnCreate) {
            for(f = 0;i;f++) {
              a[f][c] = "J@H" + this._increment++
            }
          }
        }
      }
    }
  };
  b.query = function(a) {
    if(typeof a === "string" && (a = $.trim(a), a.length !== 0)) {
      var e, b, h, d, c;
      e = a.toLowerCase();
      b = a.indexOf(" ");
      if(b !== -1 && (h = e.substring(0, b), e = e.indexOf(" where "), d = e > -1, b = $.trim(d ? a.substring(b + 1, e) : a.substring(b + 1)), b.length !== 0)) {
        switch(d && (c = $.trim(a.substring(e + 7))), h) {
          case "select":
            return this.executeSelect(b, c);
          case "insert":
            return this.executeInsert(b, c);
          case "update":
            return this.executeUpdate(b, c);
          case "delete":
            return this.executeDelete(b, c)
        }
      }
    }
  };
  b.parseWhere = function(a) {
    typeof a === "string" && $.trim(a)
  };
  b.executeSelect = function(a) {
    var a = d.split(a, /[\s,]+/), e = a.length, b = 0, h = {}, i = this.all, c = [];
    if(e === 0) {
      return c
    }
    for(;b < e;b++) {
      if(a[b] === "*") {
        break
      }
      h[a[b]] = !0
    }
    b = 0;
    for(e = i.length;b < e;b++) {
      c.push(d.clone(i[b], h))
    }
    return c
  };
  b.parse = function(a, e) {
    if(d.isNull(a)) {
      return!1
    }
    for(var b = this.grid.colDefMgr.getAll(), h = b.length, i, c, f = e !== void 0 && e.isNew, m = 0;m < h;m++) {
      if(c = b[m], !f || !c.nullOnCreate) {
        if(d.isFunction(i = c.parser)) {
          if(c = c.key, a.hasOwnProperty(c)) {
            try {
              a[c] = i(a[c], a)
            }catch(j) {
              return d.isNull(a) ? this.grid.error("PARSE_ERROR", a, c) : this.grid.error("PARSE_ERROR", a[c], c)
            }
          }
        }
      }
    }
    return!0
  };
  b.parseList = function(a, e) {
    if(d.isNull(a)) {
      return!1
    }
    if(a.length === 0) {
      return!0
    }
    for(var b = this.grid.colDefMgr.getAll(), h = b.length, i = a.length, c, f, m = 0, j, o = e !== void 0 && e.isNew, n;m < h;m++) {
      if(f = b[m], !o || !f.nullOnCreate) {
        if(d.isFunction(c = f.parser)) {
          f = f.key;
          try {
            for(j = 0;j < i;j++) {
              n = a[j], n.hasOwnProperty(f) && (n[f] = c(n[f], n))
            }
          }catch(q) {
            return d.isNull(n) ? this.grid.error("PARSE_ERROR", n, f) : this.grid.error("PARSE_ERROR", n[f], f)
          }
        }
      }
    }
    return!0
  };
  b.validate = function(a, e) {
    if(d.isNull(a)) {
      return!1
    }
    for(var b = this.grid.colDefMgr.getAll(), h = b.length, i, c, f, m, j, o, n, q = e !== void 0 && e.isNew, p = 0;p < h;p++) {
      if(i = b[p], c = i.key, j = void 0, m = f = !1, !q || !i.nullOnCreate) {
        if(i.notNull === !0) {
          if(a.hasOwnProperty(c) === !1 || d.isEmptyString(j = a[c])) {
            return this.grid.error("BAD_NULL", c)
          }
          o = j.toString()
        }else {
          a.hasOwnProperty(c) === !1 || d.isNull(j = a[c]) ? m = f = !0 : j === "" && (m = !0), o = f === !1 ? j.toString() : ""
        }
        if(f === !1) {
          if(d.isNotNull(n = i.max) && m === !1 && j > n) {
            return this.grid.error("BIGGER_THAN", j, c, n)
          }
          if(d.isNotNull(n = i.min) && m === !1 && j < n) {
            return this.grid.error("SMALLER_THAN", j, c, n)
          }
          if(d.isNotNull(n = i.length)) {
            if(m === !0 || o.length !== n) {
              return this.grid.error("WRONG_LENGTH", o, n, c)
            }
          }else {
            if(d.isNotNull(n = i.maxlength) && m === !1 && o.length > n) {
              return this.grid.error("DATA_TOO_LONG", o, c, n)
            }
            if(d.isNotNull(n = i.minlength)) {
              if(m === !0 || o.length < n) {
                return this.grid.error("DATA_TOO_SHORT", o, c, n)
              }
            }
          }
        }
        if(d.isFunction(i = i.validator)) {
          try {
            if(i(j, a, o, f, m) !== !0) {
              return this.grid.error("WRONG_VALUE", o, c)
            }
          }catch(r) {
            return this.grid.error("WRONG_VALUE", o, c)
          }
        }
      }
    }
    return!0
  };
  b.validateList = function(a, e) {
    if(d.isNull(a)) {
      return!1
    }
    if(a.length === 0) {
      return!0
    }
    for(var b = this.grid.colDefMgr.getAll(), h = b.length, i = a.length, c, f, m = 0, j, o, n, q, p, r = e !== void 0 && e.isNew, s = [], t = [];m < h;m++) {
      if(c = b[m], f = c.key, o = {}, n = {}, s.length = 0, t.length = 0, !r || !c.nullOnCreate) {
        if(c.notNull === !0) {
          for(j = 0;j < i;j++) {
            if(a[j].hasOwnProperty(f) === !1 || d.isEmptyString(q = a[j][f])) {
              return this.grid.error("BAD_NULL", f)
            }
            s.push(q);
            t.push(q.toString())
          }
        }else {
          for(j = 0;j < i;j++) {
            q = void 0, a[j].hasOwnProperty(f) === !1 || d.isNull(q = a[j][f]) ? (o[j] = !0, n[j] = !0) : q === "" && (n[j] = !0), s.push(q), o.hasOwnProperty(j) ? t.push("") : t.push(q.toString())
          }
        }
        if(d.isNotNull(p = c.max)) {
          for(j = 0;j < i;j++) {
            if(n.hasOwnProperty(j) === !1 && s[j] > p) {
              return this.grid.error("BIGGER_THAN", s[j], f, p)
            }
          }
        }
        if(d.isNotNull(p = c.min)) {
          for(j = 0;j < i;j++) {
            if(n.hasOwnProperty(j) === !1 && s[j] < p) {
              return this.grid.error("SMALLER_THAN", s[j], f, p)
            }
          }
        }
        if(d.isNotNull(p = c.length)) {
          for(j = 0;j < i;j++) {
            if(o.hasOwnProperty(j) === !1 && (n.hasOwnProperty(j) || t[j].length !== p)) {
              return this.grid.error("WRONG_LENGTH", t[j], p, f)
            }
          }
        }else {
          if(d.isNotNull(p = c.maxlength)) {
            for(j = 0;j < i;j++) {
              if(n.hasOwnProperty(j) === !1 && t[j].length > p) {
                return this.grid.error("DATA_TOO_LONG", t[j], f, p)
              }
            }
          }
          if(d.isNotNull(p = c.minlength)) {
            for(j = 0;j < i;j++) {
              if(o.hasOwnProperty(j) === !1 && (n.hasOwnProperty(j) || t[j].length < p)) {
                return this.grid.error("DATA_TOO_SHORT", t[j], f, p)
              }
            }
          }
        }
        if(d.isFunction(c = c.validator)) {
          try {
            for(j = 0;j < i;j++) {
              if(c(s[j], a[j], t[j], o.hasOwnProperty(j), n.hasOwnProperty(j)) !== !0) {
                return this.grid.error("WRONG_VALUE", t[j], f)
              }
            }
          }catch(u) {
            return this.grid.error("WRONG_VALUE", t[j], f)
          }
        }
      }
    }
    return!0
  };
  b.makeCompositeKey = function(a, e) {
    if(!(this._idMode !== this._consts._composite || d.isNull(a))) {
      if(e === !0 || a.hasOwnProperty(this.idKey) === !1) {
        for(var b = this._options.idColKeys, h = b.length, i = 0, c = "";i < h;i++) {
          c += "&" + a[b[i]]
        }
        a[this.idKey] = c
      }
    }
  };
  b.makeCompositeKeyList = function(a, e) {
    if(!(this._idMode !== this._consts._composite || a.length === 0)) {
      var b = this.idKey, h = a.length, d = this._options.idColKeys, c = d.length, f, m = 0, j, o;
      if(e === !0) {
        for(;m < h;m++) {
          f = a[m];
          o = "";
          for(j = 0;j < c;j++) {
            o += "&" + f[d[j]]
          }
          f[b] = o
        }
      }else {
        for(;m < h;m++) {
          if((f = a[m]).hasOwnProperty(b) === !1) {
            o = "";
            for(j = 0;j < c;j++) {
              o += "&" + f[d[j]]
            }
            f[b] = o
          }
        }
      }
    }
  };
  b.map = function(a) {
    if(!d.isNull(a)) {
      var e = this._idToData, b = this.idKey, h;
      this.makeCompositeKey(a);
      if(a.hasOwnProperty(b) && e.hasOwnProperty(h = a[b])) {
        return e[h]
      }
    }
  };
  b.mapList = function(a) {
    if(d.isEmptyArray(a)) {
      return{mapped:[], unmapped:[]}
    }
    this.makeCompositeKeyList(a);
    for(var e = [], b = [], h = this.idKey, i = this._idToData, c = a.length, f = 0, m, j;f < c;f++) {
      (m = a[f]).hasOwnProperty(h) && i.hasOwnProperty(j = m[h]) ? e.push(i[j]) : b.push(m)
    }
    return{mapped:e, unmapped:b}
  };
  b.getById = function(a) {
    if(d.isNotNull(a) && this._idToData.hasOwnProperty(a)) {
      return this._idToData[a]
    }
  };
  b.getByIdx = function(a) {
    if(d.isNotNull(a) && this.datalist.hasOwnProperty(a)) {
      return this.datalist[a]
    }
  };
  b.getByNode = function(a) {
    return this.getById(this.getIdByNode(a))
  };
  b.getIdx = function(a) {
    return this.getIdxById(this.getId(a))
  };
  b.getIdxById = function(a) {
    return d.isNotNull(a) && this._idToIdx.hasOwnProperty(a) ? this._idToIdx[a] : -1
  };
  b.getIdxByNode = function(a) {
    return this.getIdxById(this.getIdByNode(a))
  };
  b.getId = function(a) {
    if(d.isNotNull(a) && a.hasOwnProperty(this.idKey)) {
      return a[this.idKey]
    }
  };
  b.getIdByIdx = function(a) {
    return this.getId(this.getByIdx(a))
  };
  b.getIdByNode = function(a) {
    if(d.isNotNull(a)) {
      return a.getAttribute("i")
    }
  };
  b._reidxFrom = function(a) {
    d.isNull(a) && (a = 0);
    for(var e = this.datalist, b = e.length, h = this.idKey, i = this._idToIdx;a < b;a++) {
      i[e[a][h]] = a
    }
  };
  b._reidx = function() {
    this._idToIdx = {};
    this._reidxFrom()
  };
  b.has = function(a) {
    return this.hasById(this.getId(a))
  };
  b.hasById = function(a) {
    return d.isNotNull(a) ? this._idToIdx.hasOwnProperty(a) : !1
  };
  b.contains = function(a) {
    return this.containsById(this.getId(a))
  };
  b.containsById = function(a) {
    return d.isNotNull(a) ? this._idToData.hasOwnProperty(a) : !1
  };
  b.set = function(a) {
    if(this.all === a || d.isEmptyArray(a) && this.all === 0) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.grid.event.trigger("onBeforeSetDatalist", [this.all, a]);
    this.cleanList(this.all);
    var e, b = this.uniqueMap;
    for(e in b) {
      b.hasOwnProperty(e) && (b[e] = {})
    }
    this._idToData = {};
    this.all = [];
    this._history.length = 0;
    this._redoHistory.length = 0;
    d.isNull(a) && (a = []);
    if((e = this.parseList(a)) instanceof Error) {
      return e
    }
    if((e = this.validateList(a)) instanceof Error) {
      return e
    }
    if((e = this.addListToUniqueMap(a)) instanceof Error) {
      return e
    }
    this.makeCompositeKeyList(a, !0);
    if((e = this.addListToIdMap(a)) instanceof Error) {
      return e
    }
    this.all = a;
    this.grid.event.trigger("onAfterSetDatalist", [a]);
    this.grid.event.trigger("onDataChange");
    this.refresh();
    return!0
  };
  b.add = function(a, e) {
    if(d.isNull(a) || d.isNotNull(this.map(a))) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.fillTemp(a, e);
    var b;
    if((b = this.parse(a, e)) instanceof Error) {
      return b
    }
    if((b = this.validate(a, e)) instanceof Error) {
      return b
    }
    if((b = this.addToUniqueMap(a)) instanceof Error) {
      return b
    }
    if((b = this.addToIdMap(a)) instanceof Error) {
      return b
    }
    this.all.push(a);
    if(d.isNull(e) || e.undo !== !0) {
      this._history.push({_action:this._consts._add, _target:a}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onAddDatarow", [a, e]);
    this.grid.event.trigger("onDataChange");
    (e === void 0 || e.noRefresh !== !0) && this.refresh(e);
    return!0
  };
  b.addList = function(a, e) {
    if(d.isEmptyArray(a)) {
      return!1
    }
    var b = this.mapList(a).unmapped;
    if(b.length === 0) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.fillTempList(a, e);
    var h;
    if((h = this.parseList(b, e)) instanceof Error) {
      return h
    }
    if((h = this.validateList(b, e)) instanceof Error) {
      return h
    }
    if((h = this.addListToUniqueMap(b)) instanceof Error) {
      return h
    }
    if((h = this.addListToIdMap(b)) instanceof Error) {
      return h
    }
    this.all.pushList(b);
    if(d.isNull(e) || e.undo !== !0) {
      this._history.push({_action:this._consts._addList, _target:b}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onAddDatalist", [b, e]);
    this.grid.event.trigger("onDataChange");
    (e === void 0 || e.noRefresh !== !0) && this.refresh(e);
    return!0
  };
  b.updateByKey = function(a, e, b, h) {
    var d = {};
    d[e] = b;
    return this.update(a, d, h)
  };
  b.update = function(a, e, b) {
    if(d.isNullOr(a, e)) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.grid.event.trigger("onBeforeUpdateDatarow", [a, e]);
    var h = {}, i;
    for(i in e) {
      e.hasOwnProperty(i) && (a[i] === e[i] ? delete e[i] : (h[i] = a[i], a[i] = e[i]))
    }
    if(d.isEmptyObj(h)) {
      return!1
    }
    if((i = this.parse(a, b)) instanceof Error) {
      return this._rollback(a, h), i
    }
    if((i = this.validate(a, b)) instanceof Error) {
      return this._rollback(a, h), i
    }
    if((i = this.updateUniqueMap(a, e, h)) instanceof Error) {
      return this._rollback(a, h), i
    }
    if((i = this.updateIdMap(a, e, h)) instanceof Error) {
      return this._rollback(a, h), i
    }
    i !== !1 && this.grid.event.trigger("onIdChange", [a, i, a[this.idKey]]);
    if(d.isNull(b) || b.undo !== !0) {
      this._history.push({_action:this._consts._update, _target:a, _before:h, _change:e}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onUpdateDatarow", [a, e, h, b]);
    this.grid.event.trigger("onDataChange");
    (b === void 0 || b.noRefresh !== !0) && this.refresh(b);
    return!0
  };
  b.updateList = function(a, e) {
    if(d.isEmptyArray(a)) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.grid.event.trigger("onBeforeUpdateDatalist", [a]);
    for(var b = [], h = [], i = [], c, f, m, j = a.length, o = 0, n;o < j;o++) {
      f = {};
      c = a[o].datarow;
      m = a[o].change;
      for(n in m) {
        m.hasOwnProperty(n) && (c[n] === m[n] ? delete m[n] : (f[n] = c[n], c[n] = m[n]))
      }
      d.isNotEmptyObj(f) && (b.push(c), h.push(f), i.push(m))
    }
    if(b.length === 0) {
      return!1
    }
    if((c = this.parseList(b, e)) instanceof Error) {
      return this._rollbackList(b, h), c
    }
    if((c = this.validateList(b, e)) instanceof Error) {
      return this._rollbackList(b, h), c
    }
    if((c = this.updateListUniqueMap(b, i, h)) instanceof Error) {
      return this._rollbackList(b, h), c
    }
    if((c = this.updateListIdMap(b, i, h)) instanceof Error) {
      return this._rollbackList(b, h), c
    }
    c !== !1 && this.grid.event.trigger("onIdListChange", [c.list, c.befores, this.idKey]);
    if(d.isNull(e) || e.undo !== !0) {
      this._history.push({_action:this._consts._updateList, _target:b, _before:h, _change:i}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onUpdateDatalist", [b, i, h, e]);
    this.grid.event.trigger("onDataChange");
    (e === void 0 || e.noRefresh !== !0) && this.refresh(e);
    return!0
  };
  b._rollback = function(a, e) {
    for(var b in e) {
      e.hasOwnProperty(b) && (a[b] = e[b])
    }
  };
  b._rollbackList = function(a, e) {
    for(var b = a.length, h = 0, d, c, f;h < b;h++) {
      for(f in d = a[h], c = e[h], c) {
        c.hasOwnProperty(f) && (d[f] = c[f])
      }
    }
  };
  b.remove = function(a, e) {
    if(d.isNull(a)) {
      return!1
    }
    var b = this.map(a);
    if(d.isNull(b)) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.removeFromIdMap(b);
    this.removeFromUniqueMap(b);
    this.all.remove(b);
    this.removeId(b);
    if(d.isNull(e) || e.undo !== !0) {
      this._history.push({_action:this._consts._remove, _target:b}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onRemoveDatarow", [b, e]);
    this.grid.event.trigger("onDataChange");
    (e === void 0 || e.noRefresh !== !0) && this.refresh(e);
    return!0
  };
  b.removeList = function(a, e) {
    if(d.isEmptyArray(a)) {
      return!1
    }
    var b = this.mapList(a).mapped;
    if(b.length === 0) {
      return!1
    }
    this.grid.event.trigger("onBeforeDataChange");
    this.removeListFromIdMap(b);
    this.removeListFromUniqueMap(b);
    this.all.removeList(b);
    this.cleanList(b);
    if(d.isNull(e) || e.undo !== !0) {
      this._history.push({_action:this._consts._removeList, _target:b}), this._redoHistory.length = 0
    }
    this.grid.event.trigger("onRemoveDatalist", [b, e]);
    this.grid.event.trigger("onDataChange");
    (e === void 0 || e.noRefresh !== !0) && this.refresh(e);
    return!0
  };
  b._keydownCanvas = function(a) {
    if(a.ctrlKey) {
      switch(a.which) {
        case "Z".charCodeAt(0):
          this.undo();
          break;
        case "Y".charCodeAt(0):
          this.redo()
      }
    }
  };
  b.undo = function() {
    if(this._history.length === 0) {
      return!1
    }
    var a = this._history.pop();
    this._redoHistory.push(a);
    var e = a._target, b = a._before;
    switch(a._action) {
      case this._consts._add:
        return this.remove(e, {undo:!0});
      case this._consts._addList:
        return this.removeList(e, {undo:!0});
      case this._consts._update:
        return this.update(e, b, {undo:!0});
      case this._consts._updateList:
        for(var a = [], h = 0, d = e.length;h < d;h++) {
          a.push({datarow:e[h], change:b[h]})
        }
        return this.updateList(a, {undo:!0});
      case this._consts._remove:
        return this.add(e, {undo:!0});
      case this._consts._removeList:
        return this.addList(e, {undo:!0})
    }
  };
  b.redo = function() {
    if(this._redoHistory.length === 0) {
      return!1
    }
    var a = this._redoHistory.pop();
    this._history.push(a);
    var e = a._target, b = a._change;
    switch(a._action) {
      case this._consts._add:
        return this.add(e, {undo:!0});
      case this._consts._addList:
        return this.addList(e, {undo:!0});
      case this._consts._update:
        return this.update(e, b, {undo:!0});
      case this._consts._updateList:
        for(var a = [], h = 0, d = e.length;h < d;h++) {
          a.push({datarow:e[h], change:b[h]})
        }
        return this.updateList(a, {undo:!0});
      case this._consts._remove:
        return this.remove(e, {undo:!0});
      case this._consts._removeList:
        return this.removeList(e, {undo:!0})
    }
  };
  b.equals = function(a, e) {
    if(d.isNullOr(a, e)) {
      return!1
    }
    if(a === e) {
      return!0
    }
    this._idMode === this._consts._composite && (this.makeCompositeKey(a), this.makeCompositeKey(e));
    var b = this.idKey;
    return d.isNull(a[b]) || d.isNull(e[b]) ? !1 : a[b] === e[b]
  };
  b.getReal = function() {
    var a = this._consts._notReal;
    return this.all.filter(function(e) {
      return e.hasOwnProperty(a) === !1
    })
  };
  b.filterReal = function(a) {
    var e = this._consts._notReal;
    return a.filter(function(a) {
      return a.hasOwnProperty(e) === !1
    })
  };
  b.isReal = function(a) {
    return d.isNotNull(a) && a.hasOwnProperty(this._consts._notReal) === !1
  };
  b.dropNonReal = function(a) {
    if(!d.isEmptyArray(a)) {
      for(var e = this._consts._notReal, b = a.length - 1;b >= 0;b--) {
        a[b].hasOwnProperty(e) && (delete a[b][e], a.removeAt(b))
      }
    }
  };
  b.removeIdCol = function(a) {
    if(!(this._idMode === this._consts._given || d.isEmptyArray(a))) {
      for(var e = this.idKey, b = 0, h = a.length;b < h;b++) {
        a[b].hasOwnProperty(e) && delete a[b][e]
      }
    }
  };
  b.removeId = function(a) {
    d.isNotNull(a) && this._idMode !== this._consts._given && a.hasOwnProperty(this.idKey) && delete a[this.idKey]
  };
  b.cleanList = function(a) {
    d.isEmptyArray(a) || (this.removeIdCol(a), this.dropNonReal(a))
  };
  b.purify = function(a) {
    if(a !== void 0) {
      a = this.all
    }
    if(d.isEmptyArray(a)) {
      return[]
    }
    for(var e = [], b = a.length, h = 0, c, f, k = this._consts._notReal;h < b;h++) {
      if((f = a[h]).hasOwnProperty(k) === !1) {
        for(c in e.push({}), f) {
          f.hasOwnProperty(c) && f.hasOwnProperty(c) && c.substring(0, 3)
        }
      }
    }
    return e
  };
  b.setSorter = function(a) {
    this.grid.event.trigger("onChangeSorter", [this._sorter, a]);
    this._sorter = a
  };
  b._sort = function(a) {
    d.isNull(a) ? a = this._sorter : this.setSorter(a);
    if(!d.isNull(a)) {
      var e = this.all;
      this.grid.event.trigger("onBeforeSort", [e]);
      d.isNotNull(a.comparator) ? (e.sort(a.comparator), a.desc && e.reverse()) : d.isNotNull(a.lexi) && this.constructor._lexi(e, a.lexi, a.desc);
      this.grid.event.trigger("onAfterSort", [e])
    }
  };
  b.addFilter = function(a) {
    this._filters.push(a);
    this.refresh()
  };
  b.removeFilter = function(a) {
    var e = this._filters.length;
    this._filters.remove(a);
    e !== this._filters.length && this.refresh()
  };
  b._filter = function() {
    var a = this.datalist, e = this.failed, b = 0, h = this._filters.length, d, c;
    this.grid.event.trigger("onBeforeFilter", [a, e]);
    a.length = 0;
    a.pushList(this.all);
    for(e.length = 0;b < h;b++) {
      d = this._filters[b];
      for(c = a.length - 1;c >= 0;c--) {
        d(a[c]) || (e.push(a[c]), a.removeAt(c))
      }
    }
    this.grid.event.trigger("onFilter", [a, e]);
    this.grid.event.trigger("onAfterFilter", [a, e])
  };
  b._finish = function(a) {
    this._reidx();
    this.grid.event.trigger("onAfterRefresh", [a])
  };
  b.refresh = function(a) {
    this.grid.event.trigger("onBeforeRefresh");
    a === void 0 ? this._sort() : a.noSort !== !0 && this._sort(a.sorter);
    (a === void 0 || a.noFilter !== !0) && this._filter();
    this._finish(a)
  };
  b.exportRowToArray = function(a, e) {
    if(!(a in this.datalist)) {
      return null
    }
    e || (e = this.grid.colDefMgr.getKeys());
    for(var b = this.datalist[a], h = [], d, c = 0, f = e.length;c < f;c++) {
      d = e[c], h.push(d in b ? b[d] : null)
    }
    return h
  };
  b.exportToArray = function(a, e, b) {
    a || (a = this.grid.colDefMgr.getKeys());
    for(var e = this.datalist.slice(e, b), d = [], c, f, k = 0, m = e.length, j, o = a.length;k < m;k++) {
      c = e[k];
      j = 0;
      for(b = [];j < o;j++) {
        f = a[j], b.push(f in c ? c[f] : null)
      }
      d.push(b)
    }
    return d
  };
  c._lexi = function(a, e, b) {
    var h = Object.prototype.toString;
    Object.prototype.toString = d.isFunction(e) ? e : function() {
      return this[e]
    };
    a.sort();
    Object.prototype.toString = h;
    b && a.reverse()
  }
})();
jx.grid.EventManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    a.grid.event = this;
    this._map = {}
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.EventManager", c);
  f._add("EventManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.destroy = function() {
    var a, e = this._map;
    for(a in e) {
      e.hasOwnProperty(a) && f._deleteArray(e, a)
    }
    f._destroy(this, {name:"EventManager", path:"event", map:"map"})
  };
  b.register = function(a, e, b) {
    if(d.isString(a)) {
      this._parseAndAdd(a, e, b)
    }else {
      if(d.isNotNull(a.e)) {
        this._parseAndAdd(a.e, a.f, a.t)
      }else {
        for(var h, e = a.length, c;h < e;h++) {
          d.isNotNull(c = a[h]) && this._parseAndAdd(c.e, c.f, c.t)
        }
      }
    }
  };
  b.bind = function(a, e, b) {
    if(d.isString(a)) {
      this._parseAndAdd(a, e, b)
    }else {
      for(var h in a) {
        a.hasOwnProperty(h) && this._parseAndAdd(h, a[h], e)
      }
    }
  };
  b._parseAndAdd = function(a, e, b) {
    d.isNull(b) && (b = window);
    var a = d.split(a), h = a.length, c = 0;
    if(d.isFunction(e)) {
      for(;c < h;c++) {
        this._addHandler(a[c], e, b)
      }
    }else {
      if(d.isString(e)) {
        for(var e = d.split(e), f = e.length, k, m;c < h;c++) {
          k = a[c];
          for(m = 0;m < f;m++) {
            this._addHandler(k, b[e[m]], b)
          }
        }
      }else {
        for(f = e.length;c < h;c++) {
          k = a[c];
          for(m = 0;m < f;m++) {
            this._addHandler(k, e[m], b)
          }
        }
      }
    }
  };
  b._addHandler = function(a, e, b) {
    this._map.hasOwnProperty(a) || (this._map[a] = []);
    this._map[a].push({fn:e, target:b})
  };
  b.unregister = function(a, e) {
    var b = this._map;
    if(b.hasOwnProperty(a)) {
      var h = b[a];
      if(d.isNull(e)) {
        h.length = 0, delete b[a]
      }else {
        for(var c = 0, f = h.length;c < f;c++) {
          if(h[c].fn === e) {
            h.removeAt(c);
            h.length === 0 && delete b[a];
            break
          }
        }
      }
    }
  };
  b.trigger = function(a, e, b) {
    for(var h, c, f = this._map, k = [], a = d.split(a), m = a.length, j = d.isEmptyArray(e), o = d.isFunction(b), n, q = 0;q < m;q++) {
      if(h = a[q], f.hasOwnProperty(h) && (h = f[h], c = h.length, c !== 0)) {
        if(n = 0, o) {
          var p;
          if(j) {
            for(;n < c;n++) {
              p = h[n].fn.call(h[n].target), b(p) && k.push(p)
            }
          }else {
            for(;n < c;n++) {
              p = h[n].fn.apply(h[n].target, e), b(p) && k.push(p)
            }
          }
        }else {
          if(j) {
            for(;n < c;n++) {
              k.push(h[n].fn.call(h[n].target))
            }
          }else {
            for(;n < c;n++) {
              k.push(h[n].fn.apply(h[n].target, e))
            }
          }
        }
      }
    }
    return k
  };
  b.triggerInvalid = function(a, e) {
    return this.trigger(a, e, function(a) {
      return a === !1
    }).length !== 0
  };
  b.sendToBack = function(a, e) {
    for(var b = this._map[a], d = b.length, c, f = -1, k = 0;k < d;k++) {
      if(b[k].fn === e) {
        f = k;
        c = b[k];
        break
      }
    }
    f > -1 && (b.removeAt(k), b.push(c))
  };
  b.sendToFront = function(a, e) {
    for(var b = this._map[a], d = b.length, c, f = -1, k = 0;k < d;k++) {
      if(b[k].fn === e) {
        f = k;
        c = b[k];
        break
      }
    }
    f > -1 && (b.removeAt(k), b.unshift(c))
  }
})();
jx.grid.ColumnManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.colDefMgr = this;
    this._options = f._extend({colDef:{key:void 0, name:"", colClass:void 0, defaultValue:void 0, inputOnCreate:void 0, style:"", headerStyle:"", width:80, minW:30, maxW:void 0, editor:void 0, sorter:void 0, hidden:!1, sumRenderer:void 0, tooltipEnabled:!1, resizable:!1, renderer:f.ViewportManager._renderer, rendererInput:!1, noTitle:!1, noName:!1, title:void 0, noSearch:!1, filter:void 0, parser:void 0, validator:void 0}}, a.options);
    this._colDefs = [];
    this._filtered = [];
    this._keyToDef = {};
    this._keyToIdx = {};
    this.__init(a)
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.getObjectByName("jx.grid.Column");
  goog.exportSymbol("jx.grid.ColumnManager", c);
  f._add("ColDefManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function(a) {
    this.grid.event.bind("onDestroy", this._destroy, this);
    this.set(a.colDefs)
  };
  b._destroy = function() {
    f._destroy(this, {name:"ColDefManager", path:"colDefMgr", property:"colDefs", map:"keyToIdx _keyToDef _options", array:"filtered"})
  };
  b.getAll = function() {
    return this._colDefs
  };
  b.set = function(a) {
    if(this._colDefs === a || d.areEqualArrays(this._colDefs, a)) {
      return a
    }
    if(d.isNull(a)) {
      a = []
    }else {
      var e = a.filter(function(a) {
        return d.isNotNull(a)
      });
      a.length = 0;
      a.pushList(e)
    }
    this.grid.event.trigger("onBeforeSetColDefs", [this._colDefs, a]);
    this._colDefs = [];
    this._filtered.length = 0;
    this._keyToIdx = {};
    this._keyToDef = {};
    this.grid.event.trigger("onEmptyColDefs");
    for(var e = 0, b = a.length, h = this._keyToDef, c, f;e < b;e++) {
      c = a[e];
      if(!c.hasOwnProperty("key")) {
        return this._keyToDef = {}, this.grid.error("KEY_UNDEFINED", e)
      }
      f = c.key;
      if(d.isEmptyString(f)) {
        return this._keyToDef = {}, this.grid.error("BAD_NULL", e)
      }
      if(h.hasOwnProperty(f)) {
        return this._keyToDef = {}, this.grid.error("DUP_KEY", f)
      }
      h[f] = c
    }
    this._colDefs = a;
    for(e = 0;e < b;e++) {
      this._extend(a[e])
    }
    this.grid.event.trigger("onAfterSetColDefs", [a, this._filter()]);
    return a
  };
  b.push = function(a) {
    return this.addAt(this._filtered.length, a)
  };
  b.addAt = function(a, e) {
    if(!d.isNull(e)) {
      var b = e.key, h = this._keyToDef, c = this._filtered;
      d.isNull(a) || a > c.length ? a = c.length : a < 0 && (a += c.length);
      this.grid.event.trigger("onBeforeAddColDef", [e]);
      if(d.isNull(b)) {
        return this.grid.error("KEY_UNDEFINED")
      }
      if(h.hasOwnProperty(b)) {
        return this.grid.error("DUP_KEY", b)
      }
      this._colDefs.addAt(a, this._extend(h[b] = e));
      e.hidden !== !0 && (c.addAt(a, e), this._reidx());
      this.grid.event.trigger("onAfterAddColDef", [e, a]);
      return c.length
    }
  };
  b._extend = function(a) {
    if(!d.isNull(a)) {
      var e = {};
      $.extend(!0, e, this._options.colDef);
      $.extend(!0, e, a);
      $.extend(!0, a, e);
      a.sorter = e = c.sorter(a.sorter, a.key);
      if(d.isNotNull(e)) {
        e.key = a.key
      }
      return a
    }
  };
  b.hide = function(a) {
    var e = this._filtered[a];
    if(!d.isNull(e)) {
      return e.hidden = !0, this._filtered.removeAt(a), this._reidx(), this.grid.event.trigger("onHideCol", [e, a]), e
    }
  };
  b.show = function(a) {
    if(!d.isNull(a)) {
      if(!d.isString(a)) {
        if(!d.isObject(a)) {
          return
        }
        a = a.key
      }
      var e = this._keyToDef;
      if(e.hasOwnProperty(a)) {
        if(this._keyToIdx.hasOwnProperty(a)) {
          return e[a]
        }
        e = e[a];
        e.hidden = !1;
        this._filter();
        this._reidx();
        this.grid.event.trigger("onShowCol", [e, this._keyToIdx[a]]);
        return e
      }
    }
  };
  b._filter = function() {
    this._filtered = this._colDefs.filter(function(a) {
      return a.hidden !== !0
    });
    this._reidx();
    return this._filtered
  };
  b._reidx = function() {
    this._keyToIdx = {};
    return this._reidxFrom()
  };
  b._reidxFrom = function(a) {
    d.isNull(a) && (a = 0);
    for(var e = this._filtered, b = e.length, h = this._keyToIdx;a < b;a++) {
      h[e[a].key] = a
    }
    return h
  };
  b.get = function(a) {
    if(d.isNull(a)) {
      return this._filtered
    }
    if(this._filtered.hasOwnProperty(a)) {
      return this._filtered[a]
    }
  };
  b.getByKey = function(a) {
    if(d.isNotNull(a) && this._keyToDef.hasOwnProperty(a)) {
      return this._keyToDef[a]
    }
  };
  b.length = function() {
    return this._filtered.length
  };
  b.getIdxByKey = function(a) {
    return this._keyToIdx.hasOwnProperty(a) ? this._keyToIdx[a] : -1
  };
  b.getIdx = function(a) {
    return d.isNotNull(a) && this._keyToIdx.hasOwnProperty(a.key) ? this._keyToIdx[a.key] : -1
  };
  b.sortByKey = function(a) {
    this._filtered.length = 0;
    this._keyToIdx = {};
    for(var e = 0, b = a.length, d = this._filtered, c = this._keyToIdx, f = this._keyToDef;e < b;e++) {
      d.push(f[a[e]]), c[a[e]] = e
    }
    this.grid.event.trigger("onReorderCols", a);
    return this._filtered
  };
  b.getKeys = function() {
    return this._filtered.map(function(a) {
      return a.key
    })
  };
  c.sorter = function(a, e, b) {
    b = b ? !0 : !1;
    if(a === "text") {
      return{lexi:e, on:b, key:e}
    }
    if(a === "int") {
      return{on:b, comparator:function(a, b) {
        var g = a[e], c = b[e];
        d.isNull(g) ? g = Number.MAX_VALUE : typeof g === "string" && (g = g.toInt());
        d.isNull(c) ? c = Number.MAX_VALUE : typeof c === "string" && (c = c.toInt());
        return g - c
      }, key:e}
    }
    if(a === "float 한국 tehu") {
      return{on:b, comparator:function(a, b) {
        var g = a[e], c = b[e];
        d.isNull(g) ? g = Number.MAX_VALUE : typeof g === "string" && (g = g.toFloat());
        d.isNull(c) ? c = Number.MAX_VALUE : typeof c === "string" && (c = c.toFloat());
        return g - c
      }, key:e}
    }
  }
})();
jx.struct = {};
jx.struct.TreeNode = {};
jx.struct.Tree = {};
var TreeNode = {}, Tree = {};
(function() {
  function c(a) {
    this.tree = a.tree;
    this.data = a.data;
    this.nodeId = a.nodeId;
    this.childrenMap = {};
    this.children = []
  }
  function f(a) {
    this.list = a.list;
    this._options = JGM._extend({nodeKey:"nodeId", parentKey:"parentId"}, a.options);
    this.map = {};
    this.root = new c({tree:this});
    this.infants = {}
  }
  var d = goog.getObjectByName("jx.util");
  goog.exportSymbol("jx.struct.TreeNode", c);
  goog.exportSymbol("jx.struct.Tree", f);
  goog.exportSymbol("TreeNode", c);
  goog.exportSymbol("Tree", f);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.destroy = function() {
    this.detach();
    delete this.tree;
    delete this.data;
    delete this.nodeId;
    delete this.childrenMap;
    delete this.children
  };
  b.destroyCompletely = function() {
    this.detachCompletely();
    delete this.tree;
    delete this.data;
    delete this.nodeId;
    delete this.childrenMap;
    delete this.children
  };
  b.destroyDown = function() {
    d.isNotNull(this.parent) && this.parent.removeChild(this);
    this.traverse({post:!0, fn:function() {
      this.destroy()
    }})
  };
  b.detach = function() {
    delete this.parent;
    delete this.level;
    this.children.length = 0;
    this.childrenMap = {}
  };
  b.detachCompletely = function() {
    d.isNotNull(this.parent) && this.parent.removeChild(this);
    this.removeAllChildren();
    delete this.parent;
    delete this.level
  };
  b.detachDown = function() {
    d.isNotNull(this.parent) && this.parent.removeChild(this);
    this.traverse({post:!0, fn:function() {
      this.detach()
    }})
  };
  b.isRoot = function() {
    return d.isNull(this.parent)
  };
  b.getRoot = function() {
  };
  b.isLeaf = function() {
    return this.children.length === 0
  };
  b.setParent = function(a) {
    if(this.parent !== a) {
      d.isNotNull(this.parent) && this.parent.removeChild(this), this.parent = a, delete this.level, d.isNotNull(a) && a.addChild(this)
    }
  };
  b.hasChild = function(a) {
    return this.childrenMap.hasOwnProperty(a.nodeId)
  };
  b.addChild = function(a) {
    this.hasChild(a) || (this.children.push(a), this.childrenMap[a.nodeId] = this.children.length - 1, a.setParent(this))
  };
  b.addChildAt = function(a, e) {
    var b;
    if(this.hasChild(e)) {
      b = this.childrenMap[e.nodeId];
      if(b === a) {
        return
      }
      this.children.removeAt(b)
    }
    this.children.addAt(a, e);
    d.isNotNull(b) && b < a ? this.resetChildIdx(b) : this.resetChildIdx(a);
    e.setParent(this)
  };
  b.removeChild = function(a) {
    if(this.hasChild(a)) {
      var e = this.childrenMap[a.nodeId];
      this.children.removeAt(e);
      delete this.childrenMap[a.nodeId];
      this.resetChildIdx(e);
      delete a.parent;
      delete a.level
    }
  };
  b.removeChildAt = function(a) {
    var e = this.children[a];
    this.children.removeAt(a);
    delete this.childrenMap[e.nodeId];
    this.resetChildIdx(a);
    delete e.parent;
    delete e.level
  };
  b.resetChildIdx = function(a) {
    d.isNull(a) && (a = 0);
    for(var e = this.children, b = e.length, h = this.childrenMap;a < b;a++) {
      h[e[a].nodeId] = a
    }
  };
  b.removeAllChildren = function() {
    for(var a = 0, e = this.children, b = e.length;a < b;a++) {
      delete e[a].parent, delete e[a].level
    }
    e.length = 0;
    this.childrenMap = {}
  };
  b.getSiblings = function() {
    if(this.isRoot()) {
      return[]
    }
    var a = this.parent.children.slice();
    a.removeAt(this.parent.getChildIdx(this));
    return a
  };
  b.getChildIdx = function(a) {
    return this.childrenMap[a.nodeId]
  };
  b.getIdx = function() {
    return this.isRoot() ? -1 : this.parent.getChildIdx(this)
  };
  b.getPath = function() {
    return this.traverse({res:[], up:!0, post:!0, fn:function(a) {
      this.isRoot() || a.res.push(this.getIdx())
    }}).res
  };
  b.getAncestors = function() {
    var a = {res:[], up:!0, post:!0, fn:function(a) {
      a.res.push(this)
    }};
    this.traverse(a);
    a.res.pop();
    return a.res
  };
  b.getDescendents = function() {
    var a = {res:[], fn:function(a) {
      a.res.push(this)
    }};
    this.traverse(a);
    a.res.shift();
    return a.res
  };
  b.getLevel = function() {
    return this.isRoot() ? this.level = -1 : this.level = this.parent.getLevel() + 1
  };
  b.find = function(a) {
    return this.traverse({fn:function(e) {
      if(this.data === a) {
        e.res = this, e.stop = !0
      }
    }}).res
  };
  b.traverse = function(a, e) {
    if(a.stop) {
      return a
    }
    if(a.up) {
      this.isRoot() ? this.callFn(a) : a.post ? (this.parent.traverse(a), this.callFn(a)) : (this.callFn(a), this.parent.traverse(a))
    }else {
      var b = 0, d = this.children, c = d.length;
      if(a.post) {
        for(;b < c;b++) {
          d[b].traverse(a, b)
        }
        this.callFn(a, e)
      }else {
        if(this.callFn(a, e), a.propagate === !1) {
          delete a.propagate
        }else {
          for(;!a.stop && b < c;b++) {
            d[b].traverse(a, b)
          }
        }
      }
    }
    return a
  };
  b.traverseChildren = function(a) {
    for(var e = 0, b = this.children, d = b.length;e < d;e++) {
      b[e].traverse(a, e)
    }
  };
  b.traverseParent = function(a) {
    d.isNotNull(this.parent) && this.parent.traverse(a)
  };
  b.callFn = function(a, e) {
    if(!a.stop) {
      d.isNull(a.target) ? d.callFn(this, a.fn, a, e) : (a.node = this, d.callFn(a.target, a.fn, a, e))
    }
  };
  f.getInstance = function(a) {
    return new f(a)
  };
  b = f.prototype;
  b.__init = function() {
    this.makeTree()
  };
  b.destroy = function() {
    this.root.destroyDown();
    this.map = {};
    this.emptyInfants();
    delete this.list;
    delete this._options;
    delete this.map;
    delete this.root;
    delete this.infants;
    delete this.mid
  };
  b.detach = function() {
    this.root.detachDown();
    this.emptyInfants()
  };
  b.emptyInfants = function() {
    var a, e = this.infants;
    for(a in e) {
      if(e.hasOwnProperty(a)) {
        e[a].length = 0
      }
    }
    this.infants = {}
  };
  b.reattach = function(a) {
    this.detach();
    if(d.isNull(a)) {
      a = this.list
    }
    for(var e = this._options.nodeKey, b = this.map, h = a.length, c = 0;c < h;c++) {
      this.attachNode(b[a[c][e]])
    }
  };
  b.makeTree = function(a) {
    if(d.isNull(a)) {
      a = this.list
    }
    for(var e = 0, b = a.length;e < b;e++) {
      this.createNode(a[e])
    }
  };
  b.hasNode = function(a) {
    return d.isNotNull(a) && this.map.hasOwnProperty(a[this._options.nodeKey])
  };
  b.getNode = function(a) {
    return this.map[a[this._options.nodeKey]]
  };
  b.getNodeByNodeId = function(a) {
    return this.map[a]
  };
  b.createNode = function(a) {
    if(!this.hasNode()) {
      var e = a[this._options.nodeKey], a = new c({tree:this, data:a, nodeId:e});
      this.map[e] = a;
      this.attachNode(a);
      return a
    }
  };
  b.adoptInfants = function(a, e) {
    if(this.infants.hasOwnProperty(e)) {
      for(var b = this.infants[e], d = 0, c = b.length;d < c;d++) {
        a.addChild(b[d])
      }
      b.length = 0;
      delete this.infants[e]
    }
  };
  b.attachNode = function(a) {
    var e = a.nodeId, b = a.data[this._options.parentKey];
    this.adoptInfants(a, e);
    if(d.isNull(b) || b == e) {
      return this.root.addChild(a), !0
    }
    if(this.map.hasOwnProperty(b)) {
      return this.map[b].addChild(a), !0
    }
    this.addToInfants(a, b);
    return!1
  };
  b.changeNodeId = function(a, e, b) {
    if(e !== b) {
      delete this.map[e], this.map[b] = a, this.removeChildren(a), a.nodeId = a.data[this._options.nodeKey] = b, d.isNotNull(a.parent) && (a.parent.childrenMap[b] = a.parent.childrenMap[e], delete a.parent.childrenMap[e]), this.adoptInfants(a, b)
    }
  };
  b.changeParentId = function(a, e, b) {
    e !== b && (d.isNull(a.parent) && this.removeFromInfants(a, e), e = this.map[b], a.setParent(e), a.data[this._options.parentKey] = b, d.isNull(e) && this.addToInfants(a, b))
  };
  b.destroyNodeByData = function(a) {
    this.destroyNode(this.getNode(a))
  };
  b.destroyNode = function(a) {
    this.removeChildren(a);
    this.removeFromInfants(a);
    this.removeFromMap(a);
    a.destroyCompletely()
  };
  b.removeFromMap = function(a) {
    delete this.map[a.nodeId]
  };
  b.addToInfants = function(a, e) {
    this.infants.hasOwnProperty(e) || (this.infants[e] = []);
    this.infants[e].push(a)
  };
  b.removeFromInfants = function(a, e) {
    d.isNull(e) && (e = a.data[this._options.parentKey]);
    this.infants.hasOwnProperty(e) && (this.infants[e].remove(a), this.infants[e].length === 0 && delete this.infants[e])
  };
  b.removeChildren = function(a) {
    a.children.length !== 0 && (this.infants.hasOwnProperty(a.nodeId) || (this.infants[a.nodeId] = []), this.infants[a.nodeId].pushList(a.children), a.removeAllChildren())
  };
  b.sortList = function(a) {
    d.isNull(a) ? a = [] : a.length = 0;
    this.root.traverseChildren({fn:function() {
      a.push(this.data)
    }})
  }
})();
jx.grid.Grid = {};
(function() {
  function c(a) {
    b.call(this, a)
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util"), b = goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.Grid", c);
  f._add("Grid", c);
  goog.inherits(c, b);
  c.getInstance = function(a) {
    return new c(a)
  };
  var a = c.prototype;
  a._defaultOptions = function() {
    return{classGrid:"jgrid", border:"1px solid #868686", width:void 0, font:"15px Arial,Helvetica,sans-serif", style:"", borderSide:!0, imageUrl:"../images/", links:{data:"dataMgr.all", datalen:"dataMgr.all.length", shown:"dataMgr.datalist", set:"dataMgr.set", add:"dataMgr.add", addList:"dataMgr.addList", update:"dataMgr.update", updateByKey:"dataMgr.updateByKey", updateList:"dataMgr.updateList", remove:"dataMgr.remove", removeList:"dataMgr.removeList", select:"dataMgr.executeSelect", undo:"dataMgr.undo", 
    redo:"dataMgr.redo", addFilter:"dataMgr.addFilter", removeFilter:"dataMgr.removeFilter", check:"collapser.checkMgr.checkList checkMgr.checkList", checked:"collapser.checkMgr.getCheckList checkMgr.getCheckList", removeChecked:"collapser.checkMgr.removeChecked checkMgr.removeChecked", register:"event.register", trigger:"event.trigger", bind:"event.bind", unregister:"event.unregister", unbind:"event.unregister", collen:"colDefMgr.length"}, autoWidth:!1, showMessage:!1}
  };
  a._init = function(a) {
    this._ctnr = a.container;
    this.name = this._options.name;
    this._vars = {drag:!1, scrollbarDim:void 0, lastW:void 0, lastH:void 0};
    this._ctnr = $("<div id='" + this.mid + "' class='" + this._options.classGrid + "' " + (d.isNull(this._options.width) ? "" : "style='width:" + this._options.width + "px' ") + "tabIndex='0'>").appendTo(Util$.safe$(this._ctnr));
    this._vars.scrollbarDim = Util$.calScrollbarDims(this._ctnr);
    this.event = f.create("EventManager", {grid:this, options:this._options.EventManager});
    delete this._options.EventManager;
    this.colDefMgr = f.create("ColDefManager", {grid:this, colDefs:a.colDefs, options:this._options.ColDefManager});
    delete this._options.ColDefManager;
    this.dataMgr = f.create("DataManager", {grid:this, datalist:a.datalist, options:this._options.DataManager});
    delete this._options.DataManager;
    if(this._options.CheckManager) {
      this.checkMgr = f.create("CheckManager", {grid:this, options:this._options.CheckManager}), delete this._options.CheckManager
    }
    for(var a = 10, b = this.colDefMgr.getAll(), h = b.length;a < h;a++) {
      if(colDef = b[a], colDef.CheckManager) {
        colDef.CheckManager.colDef = colDef, colDef.checkMgr = f.create("CheckManager", {grid:this, options:colDef.CheckManager})
      }
    }
    if(this._options.Collapser) {
      this.collapser = f.create("Collapser", {grid:this, options:this._options.Collapser}), this.collapser.__init(), delete this._options.Collapser
    }
    if(this._options.ColGroup) {
      this.colGroup = f.create("ColGroup", {grid:this, options:this._options.ColGroup}), delete this._options.ColGroup
    }
    if(this._options.SelectionManager) {
      this.selMgr = f.create("SelectionManager", {grid:this, options:this._options.SelectionManager}), delete this._options.SelectionManager
    }
    if(this._options.EditManager) {
      this.editMgr = f.create("EditManager", {grid:this, options:this._options.EditManager}), delete this._options.EditManager
    }
    if(this._options.ColHeader) {
      this.header = f.create("ColHeader", {grid:this, container:this._ctnr, options:this._options.ColHeader}), delete this._options.ColHeader
    }
    if(this._options.SearchManager) {
      this.search = f.create("SearchManager", {grid:this, container:this._ctnr, options:this._options.SearchManager}), delete this._options.SearchManager
    }
    if(this._options.MenuBar) {
      this.menubar = f.create("MenuBar", {grid:this, container:this._ctnr, options:this._options.MenuBar}), delete this._options.MenuBar
    }
    this.view = f.create("ViewportManager", {grid:this, container:this._ctnr, options:this._options.ViewportManager});
    delete this._options.ViewportManager;
    if(this._options.TooltipManager) {
      this.tooltip = f.create("TooltipManager", {grid:this, container:this._ctnr, options:this._options.TooltipManager}), delete this._options.TooltipManager
    }
    if(this._options.DataCreator) {
      this.creator = f.create("DataCreator", {grid:this, container:this._ctnr, options:this._options.DataCreator}), delete this._options.DataCreator
    }
    if(this._options.Footer) {
      this.footer = f.create("Footer", {grid:this, container:this._ctnr, options:this._options.Footer}), delete this._options.Footer
    }
    this._options.autoWidth && this.event.bind("onResizeCanvasWidth", this.width, this);
    this._createCss();
    this.event.trigger("onBeforeRenderModules onRenderModules onAfterRenderModules");
    this.msg = $("<div id='" + this.mid + "msg' class='msg' onmousedown='$(this).hide(1000)' style='position:relative;padding-left:4px;overflow:hidden;z-index:100;font-size:12px;height:21px;line-height:21px'></div>").appendTo(this._ctnr).hide();
    this._vars.lastW = this._ctnr[0].clientWidth;
    this._vars.lastH = this._ctnr[0].clientHeight;
    this._registerLinks(this._options.links)
  };
  a._bindEvents = function() {
    f._bindGlobalEvents();
    var a = this;
    this._ctnr.bind({keydown:function(b) {
      a._keydown(b)
    }, keyup:function(b) {
      a._keyup(b)
    }, keypress:function(b) {
      a._keypress(b)
    }, mousein:function(b) {
      a._mousein(b)
    }, mouseout:function(b) {
      a._mouseout(b)
    }, mouseenter:function(b) {
      a._mouseenter(b)
    }, mouseleave:function(b) {
      a._mouseleave(b)
    }, mouseover:function(b) {
      a._mouseover(b)
    }, mousedown:function(b) {
      a._mousedown(b)
    }, click:function(b) {
      a._click(b)
    }, dblclick:function(b) {
      a._dblclick(b)
    }})
  };
  a.destroy = function() {
    try {
      d.isEmptyObj(f.m.Grid) && f._unbindGlobalEvents(), this.event.trigger("onDestroy"), f._destroy(this, {name:"Grid", module:"event", $:"ctnr", map:"vars _options", style:"style _dynStyle"})
    }catch(a) {
      return a
    }
  };
  a._registerLinks = function(a) {
    var b, h, c, f, k, m, j, o, n, q;
    a:for(b in a) {
      if(a.hasOwnProperty(b) && !(b in this)) {
        h = d.split(a[b]);
        c = h.length;
        f = 0;
        b:for(;f < c;f++) {
          if(k = h[f].split("."), m = k.length, !(m < 1)) {
            j = this;
            o = this;
            n = "";
            for(q = 0;q < m;q++) {
              if(k[q] in j) {
                o = j, j = j[n = k[q]]
              }else {
                continue b
              }
            }
            this._registerLink(b, j, o, n);
            continue a
          }
        }
      }
    }
  };
  a._registerLink = function(a, b, h, c) {
    if(this.hasOwnProperty(a)) {
      return!1
    }
    this[a] = d.isFunction(b) ? function() {
      return b.apply(h, arguments)
    } : function() {
      return h[c]
    };
    return!0
  };
  a._createCss = function() {
    var a = d.sprint("%selector%{overflow:hidden;font:%font%;%border%%style%}%submodule%", {selector:"#" + this.mid, font:this._options.font, border:this._options.borderSide ? "border:" + this._options.border + ";" : "border-top:" + this._options.border + ";border-bottom:" + this._options.border + ";", style:this._options.style, submodule:this.event.trigger("onCreateCss").join("")});
    this._style = d.createStyle(a);
    this._dynStyle = d.createStyle(this.event.trigger("onCreateDynamicCss").join(""))
  };
  a._recreateDynamicCss = function() {
    d.setStyle(this._dynStyle, this.event.trigger("onCreateDynamicCss").join(""))
  };
  a._keydown = function(a) {
    this.event.triggerInvalid("onBeforeKeydown", [a]) || this.event.trigger("keydown_" + a.which + " keydown", [a])
  };
  a._keyup = function(a) {
    this.event.triggerInvalid("onBeforeKeyup", [a]) || this.event.trigger("keyup_" + a.which + " keyup", [a])
  };
  a._keypress = function(a) {
    this.event.triggerInvalid("onBeforeKeypress", [a]) || this.event.trigger("keypress_" + a.which + " keypress", [a])
  };
  a._mousein = function(a) {
    this.event.triggerInvalid("onBeforeMousein", [a]) || (this._vars.drag ? this.event.trigger("dragin mousein", [a]) : this.event.trigger("mousein", [a]))
  };
  a._mouseout = function(a) {
    this.event.triggerInvalid("onBeforeMouseout", [a]) || (this._vars.drag ? this.event.trigger("dragout mouseout", [a]) : this.event.trigger("mouseout", [a]))
  };
  a._mouseenter = function(a) {
    this.event.triggerInvalid("onBeforeMouseenter", [a]) || (this._vars.drag ? this.event.trigger("dragenter mouseenter", [a]) : this.event.trigger("mouseenter", [a]))
  };
  a._mouseleave = function(a) {
    this.event.triggerInvalid("onBeforeMouseleave", [a]) || (this._vars.drag ? this.event.trigger("dragleave mouseleave", [a]) : this.event.trigger("mouseleave", [a]))
  };
  a._mousemove = function(a) {
    this.event.triggerInvalid("onBeforeMousemove", [a]) || (this._vars.drag ? this.event.trigger("dragmove mousemove", [a]) : this.event.trigger("mousemove", [a]))
  };
  a._mouseover = function(a) {
    this.event.triggerInvalid("onBeforeMouseover", [a]) || (this._vars.drag ? this.event.trigger("dragover mouseover", [a]) : this.event.trigger("mouseover", [a]))
  };
  a._mousedown = function(a) {
    this._vars.drag = !0;
    this.event.triggerInvalid("onBeforeMousedown", [a]) || this.event.trigger("mousedown", [a])
  };
  a._mouseup = function(a) {
    this._vars.drag = !1;
    this.event.trigger("unsetDrag");
    this.containsEvent(a) && (this.event.triggerInvalid("onBeforeMouseup", [a]) || this.event.trigger("mouseup", [a]))
  };
  a._click = function(a) {
    this.event.triggerInvalid("onBeforeClick", [a]) || this.event.trigger("click", [a])
  };
  a._dblclick = function(a) {
    this.event.triggerInvalid("onBeforeDblclick", [a]) || this.event.trigger("dblclick", [a])
  };
  a._resize = function(a) {
    var b = !1, d = this._ctnr[0].clientWidth;
    if(d >= 1 && this._vars.lastW !== d) {
      this.event.trigger("resizeWidth", [d, this._vars.lastW]), this._vars.lastW = d, b = !0
    }
    d = this._ctnr[0].clientHeight;
    if(d >= 1 && this._vars.lastH !== d) {
      this.event.trigger("resizeHeight", [d, this._vars.lastH]), this._vars.lastH = d, b = !0
    }
    b && this.event.trigger("resize", [a])
  };
  a.width = function(a) {
    a = parseInt(a);
    if(d.isNull(a) || isNaN(a) || a < 1 || a === this._ctnr[0].clientWidth) {
      return this._ctnr[0].clientWidth
    }
    this._ctnr[0].style.width = a + "px";
    this.event.trigger("resizeWidth", [a, this._vars.lastW]);
    this._vars.lastW = a;
    this.event.trigger("resize");
    return a
  };
  a.height = function(a) {
    a = parseInt(a);
    if(d.isNull(a) || isNaN(a) || a < 1 || a === this._ctnr[0].clientHeight) {
      return this._ctnr[0].clientHeight
    }
    this._ctnr[0].style.height = a + "px";
    this.event.trigger("resizeHeight", [a, this._vars.lastH]);
    this._vars.lastH = a;
    this.event.trigger("resize");
    return a
  };
  a.getCellByIdAndKey = function(a, b) {
    return f.create("Cell", {grid:this, datarow:this.dataMgr.getById(a), colDef:this.colDefMgr.getByKey(b)})
  };
  a.getCellByIdx = function(a, b) {
    return f.create("Cell", {grid:this, row:a, col:b})
  };
  a.error = function(a) {
    for(var b = f.error[a], d = 1, c = arguments.length;d < c;d++) {
      b = b.replace(RegExp("%" + (d - 1), "g"), arguments[d])
    }
    b = Error(b);
    b.code = a;
    this.printError(b.message);
    this.event.trigger("onError", [b]);
    return b
  };
  a.printError = function(a) {
    if(this._options.showMessage) {
      var b = this.msg;
      b[0].innerHTML = a;
      b[0].style.width = this._ctnr[0].clientWidth + "px";
      b[0].style.background = "#ffebe8";
      b[0].style.color = "#333";
      b.show();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        b.hide(1E3)
      }, 5E3)
    }
  };
  a.printMessage = function(a) {
    if(this._options.showMessage) {
      var b = this.msg;
      b[0].innerHTML = a;
      b[0].style.width = this._ctnr[0].clientWidth + "px";
      b[0].style.background = "#dfdfdf";
      b[0].style.color = "#6f6f6f";
      b.show();
      clearTimeout(this.timeout);
      this.timeout = setTimeout(function() {
        b.hide(1E3)
      }, 5E3)
    }
  };
  a.containsEvent = function(a) {
    return d.contains(this._ctnr[0], a.target)
  }
})();
jx.grid.MenuBar = {};
(function() {
  function c(a) {
    b.call(this, a);
    this.grid.menubar = this
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util"), b = goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.MenuBar", c);
  f._add("MenuBar", c);
  goog.inherits(c, b);
  c.getInstance = function(a) {
    return new c(a)
  };
  var a = c.prototype;
  a._defaultOptions = function() {
    return{background:"url(" + this.grid._options.imageUrl + "menubar-bg.png) repeat-x scroll center", borderThickness:1, border:"solid #b6bac0", height:27, classMenuBar:"menubar", classIcon:"menu-icon", iconBorderThickness:1, iconBorder:"solid transparent", iconBorderHover:"solid #d4d4d4", iconBorderActive:"solid #9a9a9a", iconMargin:2, iconBackground:"", iconBackgroundHover:"url(" + this.grid._options.imageUrl + "menu-icon-hover.png) repeat-x scroll center", iconBackgroundActive:"url(" + this.grid._options.imageUrl + 
    "menu-icon-active.png) repeat-x scroll center", iconHeight:21, iconWidth:21, iconBorderRadius:4, iconBorderFocus:"solid #5f5f5f"}
  };
  a._init = function(a) {
    this._ctnr = a.container;
    this._menubar = $("<div class='" + this._options.classMenuBar + "'></div>").prependTo(this._ctnr)
  };
  a._bindEvents = function() {
    this.grid.event.bind({onCreateCss:this._onCreateCss, onDestroy:this._destroy}, this)
  };
  a._destroy = function() {
    f._destroy(this, {name:"MenuBar", path:"menubar", $:"menubar", property:"ctnr", map:"options"})
  };
  a._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, d = [];
    d.push(a + b.classMenuBar + "{" + f._CONST._cssUnselectable + "overflow:hidden;width:100%;background:" + b.background + ";border-bottom:" + (b.borderThickness + "px " + b.border) + ";height:" + b.height + "px}");
    d.push(a + b.classIcon + "{float:left;height:" + b.iconHeight + "px;width:" + b.iconWidth + "px;border:" + b.iconBorderThickness + "px " + b.iconBorder + ";margin:" + b.iconMargin + "px 0 0 " + b.iconMargin + "px;background:" + b.iconBackground + ";border-radius:" + b.iconBorderRadius + "px;-moz-border-radius:" + b.iconBorderRadius + "px}");
    d.push(a + b.classIcon + ":hover," + a + b.classIcon + ":focus{background:" + b.iconBackgroundHover + ";border:" + b.iconBorderThickness + "px " + b.iconBorderHover + "}");
    d.push(a + b.classIcon + ":active," + a + b.classIcon + ".active{cursor:default;background:" + b.iconBackgroundActive + ";border:" + b.iconBorderThickness + "px " + b.iconBorderActive + "}");
    d.push(a + b.classIcon + ".active:focus{border:" + b.iconBorderThickness + "px " + b.iconBorderFocus + "}");
    return d.join("")
  };
  a.addIcon = function(a, b, h, c, f) {
    return $("<div class='" + this._options.classIcon + "' tabIndex='0' title='" + b + "'><div class='" + a + "' style='margin-top:" + (this._options.iconHeight - c) / 2 + "px;margin-left:" + (this._options.iconWidth - h) / 2 + "px'></div></div>").appendTo(this._menubar).click(function(a) {
      f();
      $(this).toggleClass("active");
      a.preventDefault()
    }).keydown(function(a) {
      if(a.which === d.keyMapKeydown.enter || a.which === d.keyMapKeydown.space) {
        f(), $(this).toggleClass("active"), a.preventDefault()
      }
    })
  }
})();
jx.grid.TooltipManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.tooltip = this;
    this._ctnr = a.container;
    this._options = f._extend({classTooltip:"jgrid-tooltip", tooltipSyncEnabled:!0, offsetX:0, offsetY:18, background:"#F5F5F5", border:"1px solid #868686", padding:"2px 10px", font:"14px Arial,Helvetica,sans-serif", color:"#333"}, a.options);
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.TooltipManager", c);
  f._add("TooltipManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this.grid.event.bind({onCreateCss:this._onCreateCss, onDestroy:this._destroy, mouseoutCanvas:this._mouseoutCanvas, mousemoveCanvas:this._mousemoveCanvas, mouseoverCanvas:this._mouseoverCanvas}, this)
  };
  b._destroy = function() {
    f._destroy(this, {name:"TooltipManager", path:"tooltip", $:"tooltip", property:"ctnr", map:"options"})
  };
  b._onCreateCss = function() {
    var a = this._options, b = [];
    b.push("#" + this.grid.mid + " ." + a.classTooltip + "{position:absolute;z-index:10;background:" + a.background + ";border:" + a.border + ";padding:" + a.padding + ";color:" + a.color + ";font:" + a.font + "}");
    return b.join("")
  };
  b._mouseoutCanvas = function() {
    d.isNotNull(this._tooltip) && (this._ctnr[0].removeChild(this._tooltip[0]), delete this._tooltip)
  };
  b._mousemoveCanvas = function(a) {
    var b = this._options;
    b.tooltipSyncEnabled && d.isNotNull(this._tooltip) && this._tooltip.css({left:a.pageX + b.offsetX + "px", top:a.pageY + b.offsetY + "px"})
  };
  b._mouseoverCanvas = function(a, b) {
    if(b.getColDef().tooltipEnabled && d.isNull(this._tooltip)) {
      var g = this._options, h = document.createElement("div");
      h.innerHTML = "<div class='" + g.classTooltip + "' style='left:" + (a.pageX + g.offsetX) + "px;top:" + (a.pageY + g.offsetY) + "px'>" + b.getValue() + "</div>";
      this._tooltip = $(h.firstChild);
      this._ctnr[0].appendChild(this._tooltip[0])
    }
  }
})();
jx.grid.Footer = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = a.container;
    this.grid = a.grid;
    this.grid.footer = this;
    this._options = f._extend({classCell:"footer-cell", background:"#F1F5FB", border:"0px solid #CCD9EA", color:"#000", fontSize:"13px", fontWeight:"normal", cellHeight:25, cellPadding:40, countTemplate:"현재 <span name='shownCount'></span> 건 / 총 <span name='totalCount'></span> 건", titleColor:"#5A6779", titleFontSize:"12px", titleFontWeight:"normal", contentColor:"#1E395B", contentFontSize:"12px", contentFontWeight:"normal", classFooter:"jgrid-footer", classTitle:"footer-title", classContent:"footer-content", 
    style:"", cellStyle:"", titleStyle:"", contentStyle:""}, a.options);
    this._sumMap = {};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.Footer", c);
  f._add("Footer", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this._foot = $("<div class='" + this._options.classFooter + "'>").appendTo(this._ctnr);
    this.getNextCell().html(this._options.countTemplate);
    this._updateTotalCount();
    this._updateShownCount();
    this._initSumCells();
    this.bindEvents()
  };
  b.bindEvents = function() {
    this.grid.event.bind({onCreateCss:this._onCreateCss, onDestroy:this._destroy, onDataChange:[this._updateTotalCount, this._updateSums], onAfterRefresh:this._updateShownCount}, this)
  };
  b._destroy = function() {
    var a, b = this._sumMap;
    for(a in b) {
      b.hasOwnProperty(a) && b[a].remove()
    }
    f._destroy(this, {name:"Footer", path:"footer", $:"foot", property:"ctnr", map:"sumMap _options"})
  };
  b._onCreateCss = function() {
    var a = this._options, b = "#" + this.grid.mid + " ." + a.classFooter, g = [];
    g.push(b + "{float:left;cursor:default;width:100%;" + f._CONST._cssUnselectable + "background:" + a.background + ";border-top:" + a.border + ";border-collapse:collapse;color:" + a.color + ";font-size:" + a.fontSize + ";font-weight:" + a.fontWeight + ";padding-left:8px;" + a.style + "}");
    g.push(b + " ." + a.classCell + "{float:left;white-space:nowrap;line-height:" + a.cellHeight + "px;padding-right:" + a.cellPadding + "px;" + a.cellStyle + "}");
    g.push(b + " ." + a.classTitle + "{text-align:right;color:" + a.titleColor + ";font-size:" + a.titleFontSize + ";font-weight:" + a.titleFontWeight + ";" + a.titleStyle + "}");
    g.push(b + " ." + a.classContent + "{color:" + a.contentColor + ";font-size:" + a.contentFontSize + ";font-weight:" + a.contentFontWeight + ";" + a.contentStyle + "}");
    return g.join("")
  };
  b._updateTotalCount = function() {
    this._foot.find("[name=totalCount]")[0].innerHTML = this.grid.dataMgr.getReal().length
  };
  b._updateShownCount = function() {
    this._foot.find("[name=shownCount]")[0].innerHTML = this.grid.dataMgr.filterReal(this.grid.dataMgr.datalist).length
  };
  b._initSumCells = function() {
    for(var a = this.grid.dataMgr.getReal(), b = this.grid.colDefMgr.get(), g = b.length, h, i, f, k, m = c._calSum, j = this._sumMap, o, n = 0;n < g;n++) {
      if(h = b[n], i = h.sumRenderer, d.isNotNull(i)) {
        if(f = h.key, h = h.name, k = m(a, f), f = j[f] = this.getNextCell(), o = f[0], d.isFunction(i)) {
          o.innerHTML = i(h, k)
        }else {
          if(d.isString(i)) {
            if(f = i.toLowerCase(), f === "krw" || i === "\\") {
              o.innerHTML = this._sumRenderer(h, d.formatNumber(k))
            }else {
              if(f === "usd" || i === "$") {
                o.innerHTML = this._sumRenderer(h, d.formatNumber(k, 2, "$ "))
              }
            }
          }else {
            o.innerHTML = this._sumRenderer(h, k)
          }
        }
      }
    }
  };
  b._updateSums = function() {
    var a = this.grid.dataMgr.getReal(), b, g = this._sumMap, h = this.grid.colDefMgr, i, f, k, m = c._calSum, j, o, n = this._options.classContent;
    for(b in g) {
      if(g.hasOwnProperty(b)) {
        if(i = h.getByKey(b), f = i.sumRenderer, k = m(a, b), j = g[b], o = j[0], d.isFunction(f)) {
          o.innerHTML = f(i.name, k)
        }else {
          if(d.isString(f)) {
            if(i = f.toLowerCase(), i === "krw" || f === "\\") {
              j.find("span." + n)[0].innerHTML = d.formatNumber(k)
            }else {
              if(i === "usd" || f === "$") {
                j.find("span." + n)[0].innerHTML = d.formatNumber(k, 2, "$ ")
              }
            }
          }else {
            j.find("span." + n)[0].innerHTML = k
          }
        }
      }
    }
  };
  b.getNextCell = function() {
    return $("<div class='" + this._options.classCell + "'/>").appendTo(this._foot)
  };
  b._sumRenderer = function(a, b) {
    return"<span class='" + this._options.classTitle + "'>" + a + " 합계: </span><span class='" + this._options.classContent + "'>" + b + "</span>"
  };
  c._calSum = function(a, b) {
    for(var g = 0, d, c = a.length, f = 0;f < c;f++) {
      if(typeof(d = a[f][b]) === "string") {
        d = d.toFloat()
      }
      g += isNaN(d) ? 0 : d
    }
    return g
  }
})();
jx.grid.Cell = {};
(function() {
  function c(b) {
    this.grid = b.grid;
    this._datarow = b.datarow;
    this._colDef = b.colDef;
    this.__init(b)
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.exportSymbol("jx.grid.Cell", c);
  f._add("Cell", c);
  c.getInstance = function(b) {
    return new c(b)
  };
  f = c.prototype;
  f.__init = function(b) {
    if(d.isNull(this._datarow)) {
      if(d.isNotNull(b.row)) {
        this._datarow = this.grid.dataMgr.getByIdx(b.row)
      }else {
        if(d.isNotNull(b.node)) {
          this._datarow = this.grid.dataMgr.getByNode(b.node.parentNode)
        }else {
          if(d.isNotNull(b.$)) {
            this._datarow = this.grid.dataMgr.getByNode(b.$[0].parentNode)
          }
        }
      }
    }
    if(d.isNull(this._colDef)) {
      if(d.isNotNull(b.col)) {
        this._colDef = this.grid.colDefMgr.get(b.col)
      }else {
        if(d.isNotNull(b.node)) {
          this._colDef = this.grid.colDefMgr.get(d.index(b.node))
        }else {
          if(d.isNotNull(b.$)) {
            this._colDef = this.grid.colDefMgr.get(d.index(b.$[0]))
          }
        }
      }
    }
    if(d.isNullOr(this._datarow, this._colDef) && d.isNotNull(b.event) && (b = this.grid.view._getClosestCell(b.event.target), d.isNotNull(b))) {
      this._datarow = this.grid.dataMgr.getByNode(b.parentNode), this._colDef = this.grid.colDefMgr.get(d.index(b))
    }
  };
  f.destroy = function() {
    delete this.grid;
    delete this._datarow;
    delete this._colDef
  };
  f.getRowIdx = function() {
    if(d.isNotNull(this._datarow)) {
      return this.grid.dataMgr.getIdx(this._datarow)
    }
  };
  f.getColIdx = function() {
    if(d.isNotNull(this._colDef)) {
      return this.grid.colDefMgr.getIdx(this._colDef)
    }
  };
  f.getNode = function() {
    if(d.isNotNullAnd(this._datarow, this._colDef)) {
      return this.grid.view.getCellByIdAndKey(this.grid.dataMgr.getId(this._datarow), this._colDef.key)
    }
  };
  f.getRowNode = function() {
    return this.grid.view.getRow(this._datarow)
  };
  f.get$ = function() {
    var b = this.getNode();
    return b !== void 0 ? $(b) : $([])
  };
  f.getDatarow = function() {
    return this._datarow
  };
  f.getColDef = function() {
    return this._colDef
  };
  f.getKey = function() {
    if(d.isNotNull(this._colDef)) {
      return this._colDef.key
    }
  };
  f.getId = function() {
    return this.grid.dataMgr.getId(this._datarow)
  };
  f.getValue = function() {
    if(d.isNotNullAnd(this._datarow, this._colDef)) {
      return this._datarow[this._colDef.key]
    }
  };
  f.isValid = function() {
    return d.isNotNull(this.getNode())
  };
  f.isInvalid = function() {
    return d.isNull(this.getNode())
  };
  f.isEmpty$ = function() {
    return this.get$().length === 0
  };
  f.has$ = function() {
    return this.get$().length !== 0
  };
  f.equals = function(b) {
    return d.isNotNull(b) && d.isNotNull(this._datarow) && this._datarow === b.getDatarow() && d.isNotNull(this._colDef) && this._colDef === b.getColDef()
  }
})();
jx.grid.SelectionManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.selMgr = this;
    this._options = f._extend({rowSelKey:this.grid.dataMgr.idKey, bgColorSelection:"#DCEBFE", bgColorLast:"#f1ca7f", bgColorRange:"#D9D9D9", classSelection:"jgrid-selection", classLast:"selection-last", classRange:"selection-range", multiSelectEnabled:!1, classRowSelected:"rowSelected", highlightRowEnabled:!0, bgColorRowSelected:"#d8dfea"}, a.options);
    this._consts = {_UP:1, _DOWN:2, _LEFT:3, _RIGHT:4, _PGDN:5, _PGUP:6, _HOME:7, _END:8, _NAVKEYS:{}};
    this._consts._NAVKEYS = d.which(["enter", "tab", "arrow", "pgdn", "pgup", "home", "end"]);
    this._rows = {length:0};
    this._cols = {length:0};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.SelectionManager", c);
  f._add("SelectionManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this.bindEvents()
  };
  b.bindEvents = function() {
    this.grid.event.bind({onGetCellClass:this._onGetCellClass, onCreateCss:this._onCreateCss, onDestroy:this._destroy, keydownCanvas:this._keydownCanvas, dragoverCanvas:this._dragoverCanvas, mousedownCanvas:this._mousedownCanvas, onBeforeRerender:this._onBeforeRerender, onAfterRerender:this.onAfterRerender, onBeforeDataChange:this.onBeforeDataChange}, this)
  };
  b._destroy = function() {
    f._deleteMap(this._consts, "_NAVKEYS");
    var a, b = this._rows, g = this._cols;
    for(a in b) {
      b.hasOwnProperty(a) && a !== "length" && f._deleteMap(b, a)
    }
    for(a in g) {
      g.hasOwnProperty(a) && a !== "length" && f._deleteMap(g, a)
    }
    f._destroy(this, {name:"SelectionManager", path:"selMgr", map:"rows _cols _range _last _consts _options"})
  };
  b._onCreateCss = function() {
    var a = this.grid.event.trigger("onBeforeCreateSelCss"), b = "#" + this.grid.mid + " .", g = this._options;
    g.highlightRowEnabled === !0 && a.push(b + g.classRowSelected + " > *{background:" + g.bgColorRowSelected + "}");
    g.multiSelectEnabled === !0 && (a.push(b + g.classSelection + "{background:" + g.bgColorSelection + "}"), a.push(b + g.classRange + "{background:" + g.bgColorRange + "}"));
    a.push(b + g.classLast + "{background:" + g.bgColorLast + "}");
    return a.join("\n")
  };
  b._onGetCellClass = function(a, b, g, h) {
    var c = "", f = this._last, k = this._range, m = this._rows, j = this._options;
    d.isNotNull(f) && f.getDatarow() === g && f.getColDef() === h && (c += j.classLast);
    j.multiSelectEnabled === !0 && (d.isNotNull(k) && k.getDatarow() === g && k.getColDef() === h && (c += " " + j.classRange), m.hasOwnProperty(a) && m[a].hasOwnProperty(b) && (c += " " + j.classSelection));
    return c
  };
  b._mousedownCanvas = function(a, b) {
    if(!d.isNotNull(this._last) || !this._last.equals(b)) {
      this.grid.event.trigger("onBeforeSelect", [a, b]), this._options.multiSelectEnabled === !1 ? this.selectCell(b) : a.shiftKey && d.isNotNullAnd(this._last, this._range) ? this.selectRange(b) : a.ctrlKey ? b.getKey() === this._options.rowSelKey ? this.addRow(b) : this.addCell(b) : this.selectCell(b)
    }
  };
  b._dragoverCanvas = function(a, b) {
    this._options.multiSelectEnabled === !1 ? this.selectCell(b) : d.isNotNullAnd(this._last, this._range) && this.selectRange(b)
  };
  b._keydownCanvas = function(a) {
    if(d.isNullOr(this._last, this._range)) {
      this._consts._NAVKEYS[a.which] && this.selectCell(f.create("Cell", {grid:this.grid, row:this.grid.view._getFirstSafeVisibleRow(), col:this.grid.view._getFirstSafeVisibleCol()}))
    }else {
      if(this._consts._NAVKEYS[a.which]) {
        if(!this.grid.event.triggerInvalid("onBeforeNavigate", [a])) {
          var b;
          a.preventDefault();
          switch(a.which) {
            case d.keyMapKeydown.tab:
              b = a.shiftKey ? this._idxToCell(this._consts._LEFT, this._last) : this._idxToCell(this._consts._RIGHT, this._last);
              this.selectCell(b);
              break;
            case d.keyMapKeydown.enter:
              b = a.shiftKey ? this._idxToCell(this._consts._UP, this._last) : this._idxToCell(this._consts._DOWN, this._last);
              this.selectCell(b);
              break;
            case d.keyMapKeydown.up:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._UP, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._UP, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.down:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._DOWN, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._DOWN, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.left:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._LEFT, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._LEFT, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.right:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._RIGHT, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._RIGHT, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.pgup:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._PGUP, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._PGUP, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.pgdn:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._PGDN, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._PGDN, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.space:
              b = a.shiftKey ? this._idxToCell(this._consts._PGUP, this._last) : this._idxToCell(this._consts._PGDN, this._last);
              this.selectCell(b);
              break;
            case d.keyMapKeydown.home:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._HOME, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._HOME, this._last), this.selectCell(b));
              break;
            case d.keyMapKeydown.end:
              this._options.multiSelectEnabled && a.shiftKey ? (b = this._idxToCell(this._consts._END, this._range), this.selectRange(b)) : (b = this._idxToCell(this._consts._END, this._last), this.selectCell(b))
          }
          this.grid.event.trigger("onAfterNavigate", [b])
        }
      }else {
        if(this._cols.length === 1) {
          var g = this.grid.colDefMgr, c, i = this._cols;
          for(c in i) {
            if(i.hasOwnProperty(c) && c !== "length") {
              b = g.get(c).key, this.grid.event.trigger("keydownColSel_" + b + "_" + a.which + " keydownColSel_" + b, [a, i[c], this._last])
            }
          }
        }
        if(this._rows.length === 1) {
          var l;
          c = this._rows;
          for(l in c) {
            c.hasOwnProperty(l) && l !== "length" && this.grid.event.trigger("keydownRowSel_" + a.which + " keydownRowSel", [a, c[l], this._last])
          }
        }
        this.grid.event.trigger("keydownSel_" + a.which + " keydownSel", [a, this._rows, this._cols])
      }
    }
  };
  b.getCell = function() {
    if(d.isNotNull(this._last)) {
      return this._last
    }
  };
  b._isSelected = function(a) {
    return d.isNotNull(this._last) && this._last.equals(a)
  };
  f.Cell.prototype.isSelected = function() {
    return this.grid.selMgr._isSelected(this)
  };
  b._getCellIdxToNavigate = function(a, b, g) {
    switch(a) {
      case this._consts._RIGHT:
        g < this.grid.colDefMgr.length() - 1 && g++;
        break;
      case this._consts._LEFT:
        g > 0 && g--;
        break;
      case this._consts._DOWN:
        b < this.grid.dataMgr.datalist.length - 1 && b++;
        break;
      case this._consts._UP:
        b > 0 && b--;
        break;
      case this._consts._PGDN:
        b += this.grid.view._options.rowsPerPage;
        b > this.grid.dataMgr.datalist.length - 1 && (b = this.grid.dataMgr.datalist.length - 1);
        break;
      case this._consts._PGUP:
        b -= this.grid.view._options.rowsPerPage;
        b < 0 && (b = 0);
        break;
      case this._consts._HOME:
        b = 0;
        break;
      case this._consts._END:
        b = this.grid.dataMgr.datalist.length - 1
    }
    return[b, g]
  };
  b._idxToCell = function(a, b) {
    var g = this._getCellIdxToNavigate(a, b.getRowIdx(), b.getColIdx());
    return f.create("Cell", {grid:this.grid, row:g[0], col:g[1]})
  };
  b.selectRow = function(a) {
    var b = a.getRowIdx(), g = a.getColIdx();
    this._setRange(b, g, a);
    this._setLast(b, g, a);
    this._setSelMap(this._getRowMap(b, g, a))
  };
  b.selectCell = function(a, b) {
    this.grid.event.trigger("onBeforeSelectCell", [a]);
    if(this._options.multiSelectEnabled && a.getKey() === this._options.rowSelKey) {
      this.selectRow(a)
    }else {
      var g = a.getRowIdx(), d = a.getColIdx();
      this._setRange(g, d, a, b);
      this._setLast(g, d, a);
      this._setSelMap(this._getCellMap(g, d, a))
    }
    this.grid.event.trigger("onAfterSelectCell", [a])
  };
  b.onBeforeDataChange = function() {
  };
  b._onBeforeRerender = function() {
    if(d.isNotNull(this._last)) {
      this.toSelect = this._last
    }
    this.empty()
  };
  b.onAfterRerender = function() {
    d.isNotNull(this.toSelect) && (this.selectCell(this.toSelect, !0), this.grid.view.scrollToRowLazy(this.toSelect.getRowIdx()))
  };
  b.addRow = function(a) {
    var b = a.getRowIdx(), g = a.getColIdx();
    this._setRange(b, g, a);
    this._setLast(b, g, a);
    this._addSelMap(this._getRowMap(b, g, a))
  };
  b.addCell = function(a) {
    var b = a.getRowIdx(), g = a.getColIdx();
    this._setRange(b, g, a);
    this._setLast(b, g, a);
    this._addSelMap(this._getCellMap(b, g, a))
  };
  b.selectRange = function(a) {
    var b = a.getRowIdx(), g = a.getColIdx(), d = this._last.getRowIdx(), c = this._last.getColIdx(), f = d < b ? d : b, d = d < b ? b : d, k;
    this._setRange(b, g, a);
    a.getKey() === this._options.rowSelKey ? (k = 0, c = this.grid.colDefMgr.length() - 1) : (k = c < g ? c : g, c = c < g ? g : c);
    this._setSelMap(this._getRangeMap(f, k, d, c, b, g, a));
    return{minRow:f, minCol:k, maxRow:d, maxCol:c}
  };
  b._setLast = function(a, b, g) {
    var b = this._last, c;
    d.isNotNull(b) && (c = b.getRowIdx(), a !== c && d.isNotNull(this._range) && c !== this._range.getRowIdx() && this.grid.view.unlockRowById(b.getId()), b.get$().removeClass(this._options.classLast), this._options.highlightRowEnabled === !0 && $(b.getRowNode()).removeClass(this._options.classRowSelected), d.isNull(g) && delete this._last);
    if(!d.isNull(g)) {
      (this._last = g).get$().addClass(this._options.classLast), this._options.highlightRowEnabled === !0 && $(g.getRowNode()).addClass(this._options.classRowSelected), this.grid.view.lockRowByIdx(a)
    }
  };
  b._setRange = function(a, b, g, c) {
    var f = this._range;
    if(d.isNotNull(f)) {
      var l = f.getRowIdx();
      if(a === l && b === f.getColIdx()) {
        return
      }
      a !== l && d.isNotNull(this._last) && l !== this._last.getRowIdx() && this.grid.view.unlockRowById(f.getId());
      f.get$().removeClass(this._options.classRange);
      d.isNull(g) && delete this._range
    }
    if(!d.isNull(g)) {
      (this._range = g).get$().addClass(this._options.classRange), g = this.grid.view, g.lockRowByIdx(a), c || g.scrollToLazy(a, b)
    }
  };
  b._addSelMap = function(a) {
    var b = this._rows, g, d, c, l;
    for(c in a) {
      if(a.hasOwnProperty(c) && (d = a[c], b.hasOwnProperty(c))) {
        for(l in g = b[c], d) {
          d.hasOwnProperty(l) && g.hasOwnProperty(l) && (d[l] instanceof f.Cell && (g[l] = d[l]), delete d[l])
        }
      }
    }
    this.addOrRemoveCss({}, !0);
    this._addToMaps(a)
  };
  b._setSelMap = function(a) {
    var b = this._rows, g, d, c, l, k = {};
    for(c in b) {
      if(b.hasOwnProperty(c) && c !== "length") {
        if(g = b[c], a.hasOwnProperty(c)) {
          for(l in d = a[c], g) {
            g.hasOwnProperty(l) && l !== "length" && (d.hasOwnProperty(l) ? (d[l] instanceof f.Cell && (g[l] = d[l]), delete d[l]) : (k.hasOwnProperty(c) || (k[c] = {}), k[c][l] = !0))
          }
        }else {
          for(l in d = k[c] = {}, g) {
            g.hasOwnProperty(l) && l !== "length" && (d[l] = !0)
          }
        }
      }
    }
    this._removeFromMaps(k);
    this.addOrRemoveCss({}, !1);
    this._addSelMap(a)
  };
  b.addOrRemoveCss = function(a, b) {
    var g = [], c, i, l, k = this.grid.view;
    for(c in a) {
      if(a.hasOwnProperty(c)) {
        for(i in l = a[c], l) {
          l.hasOwnProperty(i) && (l[i] instanceof f.Cell ? g.push(l[i].getNode()) : g.push(k.getCell(c, i)))
        }
      }
    }
    g = g.filter(function(a) {
      return d.isNotNull(a)
    });
    b ? $(g).addClass(this._options.classSelection) : $(g).removeClass(this._options.classSelection)
  };
  b._addToMaps = function(a) {
    var b, g, c, f = this._rows, l = this._cols, k;
    for(b in a) {
      if(a.hasOwnProperty(b)) {
        for(g in k = a[b], k) {
          k.hasOwnProperty(g) && (c = d.isNull(c = k[g]) ? !0 : c, f.hasOwnProperty(b) ? f[b].length++ : (f[b] = {length:1}, f.length++), f[b][g] = c, l.hasOwnProperty(g) ? l[g].length++ : (l[g] = {length:1}, l.length++), l[g][b] = c)
        }
      }
    }
  };
  b._removeFromMaps = function(a) {
    var b, g, d = this._rows, c = this._cols, f;
    for(b in a) {
      if(a.hasOwnProperty(b)) {
        for(g in f = a[b], f) {
          f.hasOwnProperty(g) && (--d[b].length === 0 ? (delete d[b], d.length--) : delete d[b][g], --c[g].length === 0 ? (delete c[g], c.length--) : delete c[g][b])
        }
      }
    }
  };
  b._getCellMap = function(a, b, g) {
    var d = {};
    d[a] = {};
    d[a][b] = g;
    return d
  };
  b._getRowMap = function(a, b, g) {
    var d = {}, c = this.grid.colDefMgr.length(), f = 0;
    for(d[a] = {};f < c;f++) {
      d[a][f] = !0
    }
    d[a][b] = g;
    return d
  };
  b._getRangeMap = function(a, b, g, d, c, f, k) {
    for(var m = {}, j;a <= g;a++) {
      m[a] = {};
      for(j = b;j <= d;j++) {
        m[a][j] = !0
      }
    }
    m[c][f] = k;
    return m
  };
  b.empty = function() {
    this._setLast();
    this._setRange();
    this._setSelMap({})
  }
})();
jx.grid.EditManager = {};
jx.grid.Editor = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.editMgr = this;
    this._options = d._extend({classEdit:"jgrid-edit", classCellEditable:"jgrid-editable", classCellNotEditable:"jgrid-notEditable", editableBgEnabled:!1, notEditableBgEnabled:!1, editableBg:"#FFF", notEditableBg:"#F6F6F6", deleteEnabled:!1, editIconEnabled:!0, urlEditIcon:this.grid._options.imageUrl + "editable-small.png", classEditIcon:"edit-icon", editIconWidth:12, editIconPadding:3, basicBackground:"#FFF9D7", classSuccess:"edit-success", successBackground:"#cdf7b6", classFailure:"edit-failure", 
    failureBackground:"#ffcec5"}, a.options);
    this._beginEditKeys = b.which(["number", "alphabet", "del", "backspace"]);
    this.__init()
  }
  function f(a) {
    for(var b in a) {
      a.hasOwnProperty(b) && (this[b] = a[b])
    }
  }
  var d = goog.getObjectByName("jx.grid"), b = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.EditManager", c);
  goog.exportSymbol("jx.grid.Editor", f);
  d._add("EditManager", c);
  d._add("Editor", f);
  c.getInstance = function(a) {
    return new c(a)
  };
  var a = c.prototype;
  a.__init = function() {
    this.bindEvents()
  };
  a.bindEvents = function() {
    var a = {onGetColCellClass:this._onGetColCellClass, keydownCanvas:this._keydownCanvas, onDestroy:this._destroy, dblclickCanvas:this._dblclickCanvas, onCreateDynamicCss:this.onCreateDynamicCss, "onBeforeNavigate onBeforeRefresh onBeforeSelect":this.commit, onBeforeFocusCanvas:this.notActive};
    b.isNull(this.grid.selMgr) ? a.onCreateCss = this._onBeforeCreateSelCss : a.onBeforeCreateSelCss = this._onBeforeCreateSelCss;
    if(this._options.deleteEnabled) {
      a["keydownSel_" + b.keyMapKeydown.del] = this._deleteContents
    }
    if(this._options.editIconEnabled) {
      for(var g = this.grid.colDefMgr.get(), d = g.length, c = 0;c < d;c++) {
        if(b.isNotNull(g[c].editor)) {
          a["onRenderHeader_" + g[c].key + "_prepend"] = this._onRenderHeader
        }
      }
    }
    this.grid.event.bind(a, this)
  };
  a._destroy = function() {
    this._deleteEditor();
    d._destroy(this, {name:"EditManager", path:"editMgr", map:"beginEditKeys _options"})
  };
  a._onBeforeCreateSelCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, d = [], c = this.grid.view._getRowInnerHeight();
    d.push(this.grid.view._getCellSelector() + "." + b.classEdit + "{background:" + b.basicBackground + "}");
    d.push(a + b.classEdit + " input{position:absolute;z-index:10;top:0;padding:0;border:0;margin:0;background:" + b.basicBackground + ";height:" + c + "px;line-height:" + c + "px}");
    b.editableBgEnabled && d.push(a + b.classCellEditable + "{background:" + b.editableBg + "}");
    b.notEditableBgEnabled && d.push(a + b.classCellNotEditable + "{background:" + b.notEditableBg + "}");
    b.editIconEnabled && d.push(a + b.classEditIcon + "{float:left;position:absolute;left:0;top:0;padding:0 " + b.editIconPadding + "px;width:" + b.editIconWidth + "px;height:" + c + "px;background:url(" + b.urlEditIcon + ") no-repeat center transparent}");
    d.push(a + b.classSuccess + "{background:" + b.successBackground + "}");
    d.push(a + b.classFailure + "{background:" + b.failureBackground + "}");
    return d.join("")
  };
  a.onCreateDynamicCss = function() {
    for(var a = this.grid.view._getCellSelector(), g = this.grid.view._getPadding(), d = this.grid.colDefMgr.get(), c = 0, f = "";c < d.length;c++) {
      b.isNotNull(d[c].editor) && (f += a + ".k_" + d[c].key + " .basic-editor{width:" + (d[c].width - 2 * g) + "px}")
    }
    return f
  };
  a._onRenderHeader = function(a) {
    a.push("<span class='" + this._options.classEditIcon + "'></span>")
  };
  a._onRenderCell = function(a, b, d, c, f) {
    this.grid.dataMgr.isReal(d) && f.push("<span class='" + this._options.classEditIcon + "' title='클릭하여 에디팅을 시작합니다' onclick='JGM.m.EditManager." + this.mid + '.beginEdit("' + d[this.grid.dataMgr.idKey] + '","' + c.key + "\")'></span>")
  };
  a.cancelMouseEvent = function(a) {
    return!b.hasTagAndClass(a.target, "DIV", this._options.classEditIcon)
  };
  a.beginEdit = function(a, b) {
    this.begin(d.create("Cell", {grid:this.grid, datarow:this.grid.dataMgr.getById(a), colDef:this.grid.colDefMgr.getByKey(b)}))
  };
  a._dblclickCanvas = function(a, b) {
    b.isEdited() || this.begin(b)
  };
  a._keydownCanvas = function(a) {
    this.active() ? a.which === b.keyMapKeydown.esc && this.cancel() : !a.ctrlKey && !a.altKey && b.isNotNull(this.grid.selMgr) && (a.which === b.keyMapKeydown.del && this._options.deleteEnabled ? this._deleteContent(this.grid.selMgr.getCell()) : this._beginEditKeys[a.which] ? this.begin(this.grid.selMgr.getCell()) : a.which === b.keyMapKeydown.f2 && (a.preventDefault(), this.begin(this.grid.selMgr.getCell())))
  };
  a.active = function() {
    return b.isNotNull(this.editor)
  };
  a.notActive = function() {
    return b.isNull(this.editor)
  };
  a._isEdited = function(a) {
    return this.active() && this.editor.cell.equals(a)
  };
  a._onGetColCellClass = function(a) {
    return b.isNotNull(a.editor) ? this._options.classCellEditable : this._options.classCellNotEditable
  };
  d.Cell.prototype.isEdited = function() {
    return this.grid.editMgr._isEdited(this)
  };
  d.Cell.prototype.setValue = function(a) {
    var g = this.getDatarow(), d = this.getKey(), c;
    b.isNotNullAnd(g, d) && (c = this.grid.dataMgr.updateByKey(g, d, a, {noSort:!0, noFilter:!0, noRerender:!0}), c === !0 && this.grid.view.rerenderRow(g));
    return c
  };
  a.isEditable = function(a) {
    return b.isNotNull(a) && b.isNotNull(a.getColDef().editor) && this.grid.dataMgr.isReal(a.getDatarow())
  };
  a.begin = function(a) {
    this.active() && this.commit();
    if(this.isEditable(a)) {
      this.editor = a.getColDef().editor;
      this.editor.cell = a;
      this.editor.grid = this.grid;
      var b = a.getNode();
      this.editor.before = b.innerHTML;
      b.innerHTML = this.editor.edit(a.getValue());
      a.get$().addClass(this._options.classEdit);
      this.editor.focus()
    }
  };
  a.cancel = function() {
    if(this.active()) {
      var a = this.editor.cell;
      a.getNode().innerHTML = this.editor.before;
      this._deleteEditor();
      a.get$().removeClass(this._options.classEdit);
      this.grid.view.focus()
    }
  };
  a._deleteEditor = function() {
    b.isNotNull(this.editor) && (delete this.editor.grid, delete this.editor.cell, delete this.editor.before, delete this.editor)
  };
  a.commit = function() {
    if(!this.beingCommitted && this.active()) {
      this.beingCommitted = !0;
      var a = this.editor.cell, b = this.editor.value(a.getNode()), d;
      if(b == a.getValue()) {
        this.cancel()
      }else {
        var b = a.setValue(b), c;
        d = a.get$();
        b instanceof Error ? (this.cancel(), c = this._options.classFailure) : (this._deleteEditor(), this.grid.view.focus(), c = this._options.classSuccess, this.grid.printMessage("Successfully Updated."));
        d.addClass(c);
        setTimeout(function() {
          d.removeClass(c)
        }, 1E3)
      }
      a.get$().removeClass(this._options.classEdit);
      this.beingCommitted = !1
    }
  };
  a._deleteContent = function(a) {
    if(!this.active() && this.isEditable(a)) {
      var b = a.getColDef();
      a.getValue() !== b.defaultValue && a.setValue(b.defaultValue)
    }
  };
  a._deleteContents = function(a, g, d) {
    if(!this.active()) {
      var a = {}, g = {}, c = [], f, k, m, j, o, n, q;
      a:for(f in d) {
        if(d.hasOwnProperty(f) && f !== "length") {
          for(q in j = m = k = void 0, n = d[f], n) {
            if(n.hasOwnProperty(q) && !(q === "length" || g.hasOwnProperty(q))) {
              o = n[q].cell;
              if(b.isNull(k) && (k = o.getColDef(), m = k.defaultValue, j = k.key, b.isNull(k.editor))) {
                continue a
              }
              o = b.isNotNull(a[q]) ? a[q].datarow : o.getDatarow();
              this.grid.dataMgr.isReal(o) ? m !== o[j] && (b.isNull(a[q]) && (a[q] = {datarow:o, change:{}}, c.push(a[q])), a[q].change[j] = m) : g[q] = !0
            }
          }
        }
      }
      c.length !== 0 && this.grid.dataMgr.updateList(c)
    }
  };
  f.getInstance = function(a) {
    return new f(a)
  };
  a = f.prototype;
  a.edit = function(a) {
    return"<input type='text' class='basic-editor' value='" + b.ifNull(a, "") + "' style='position:relative'/>"
  };
  a.focus = function() {
    var a = this.cell.getNode().childNodes[0];
    if(b.isFunction(a.setActive)) {
      try {
        a.setActive()
      }catch(g) {
      }
    }
    a.focus();
    document.activeElement !== a && this.cell.get$().children(":eq(0)").focus()
  };
  a.value = function(a) {
    return a.childNodes[0].value
  };
  a.path = function() {
    return"JGM.m.Editor." + this.mid
  };
  f.numberKeys = b.which(["number", "del", "backspace"]);
  f.isNumberKey = function(a) {
    return this.numberKeys[a] ? !0 : !1
  };
  f.numberEdit = function(a) {
    a = a.getValue();
    return"<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isNumberKey(event.which)) return false;' value='" + b.ifNull(a, "") + "'/>"
  };
  f.floatKeys = b.which(["number", ".", "del", "backspace"]);
  f.isFloatKey = function(a) {
    return this.floatKeys[a] ? !0 : !1
  };
  f.floatEdit = function(a) {
    a = a.getValue();
    return"<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isFloatKey(event.which)) return false;' value='" + b.ifNull(a, "") + "'/>"
  };
  f.alphabetKeys = b.which(["alphabet", "del", "backspace", "space"]);
  f.isAlphabet = function(a) {
    return this.alphabetKeys[a] ? !0 : !1
  };
  f.alphabetEdit = function(a) {
    a = a.getValue();
    return"<input type='text' class='basic-editor' onkeydown='if (!JGM.Editor.isAlphabet(event.which)) return false;' value='" + b.ifNull(a, "") + "'/>"
  }
})();
jx.grid.PrintManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = Util$.safe$(a.container);
    this.grid = a.grid;
    this._options = f._extend({title:"Print Preview", font:"15px arial,sans-serif", headerFontColor:"#27413E", headerBackgroundColor:"#DCDEDE", tableBorderColor:"#6E7174", headerBorderColor:"#909192", cellBorderColor:"#D0D7E5", winOptions:{name:"Print Preview", width:800, height:600, directories:"no", location:"no", menubar:"no", status:"no", toolbar:"no"}}, a.options);
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.PrintManager", c);
  f._add("PrintManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    var a = this;
    this._ctnr[0].innerHTML = "<button type='button'>Print</button>";
    this._ctnr.click(function() {
      a.print()
    })
  };
  b.print = function() {
    var a = this.getPrintHtml(this.grid.colDefMgr.get(), this.grid.dataMgr.datalist), b = d.open(this._options.winOptions);
    b.document.write(a);
    b.document.close()
  };
  b.getPrintHtml = function(a, b) {
    var g = this._options, d = g.tableBorderColor, c = g.headerBorderColor, f = g.cellBorderColor, k = [], m = a.length, j = m - 1, o = b.length, n = o - 1, q = 0, p;
    k.push("<html><head>");
    k.push("<title>" + g.title + "</title>");
    k.push("</head><body onload='window.print();'>");
    k.push("<table width='100%' cellspacing='0' cellpadding='0'><tbody><tr><td align='left'>");
    k.push("<table width='100%' cellspacing='0' cellpadding='2' style='border-collapse:collapse'>");
    k.push("<tbody style='font:" + g.font + ";'>");
    for(k.push("<tr style='background-color:" + g.headerBackgroundColor + ";color:" + g.headerFontColor + ";text-align:center'>");q < m;q++) {
      k.push("<td style='border:solid 1px " + c + ";'>" + a[q].name + "</td>")
    }
    k.push("</tr>");
    for(q = 0;q < o;q++) {
      g = b[q];
      k.push("<tr>");
      if(q === 0) {
        for(p = 0;p < m;p++) {
          p === 0 ? k.push("<td style='border:solid 1px " + f + ";border-top:solid 1px " + c + ";border-left:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : p === j ? k.push("<td style='border:solid 1px " + f + ";border-top:solid 1px " + c + ";border-right:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : k.push("<td style='border:solid 1px " + f + ";border-top:solid 1px " + c + "'>" + g[a[p].key] + "</td>")
        }
      }else {
        if(q < n) {
          for(p = 0;p < m;p++) {
            p === 0 ? k.push("<td style='border:solid 1px " + f + ";border-left:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : p === j ? k.push("<td style='border:solid 1px " + f + ";border-right:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : k.push("<td style='border:solid 1px " + f + "'>" + g[a[p].key] + "</td>")
          }
        }else {
          for(p = 0;p < m;p++) {
            p === 0 ? k.push("<td style='border:solid 1px " + f + ";border-bottom:solid 1px " + d + ";border-left:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : p === j ? k.push("<td style='border:solid 1px " + f + ";border-bottom:solid 1px " + d + ";border-right:solid 1px " + d + "'>" + g[a[p].key] + "</td>") : k.push("<td style='border:solid 1px " + f + ";border-bottom:solid 1px " + d + "'>" + g[a[p].key] + "</td>")
          }
        }
      }
      k.push("</tr>")
    }
    k.push("</tbody></table></td></tr></tbody></table></body></html>");
    return k.join("")
  }
})();
jx.grid.ColumnHeader = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = a.container;
    this.grid = a.grid;
    this.grid.header = this;
    this._options = f._extend({reorderEnabled:!1, reorderSyncEnabled:!0, background:"url(" + this.grid._options.imageUrl + "column-headers-bg.png) repeat-x scroll center", backgroundHover:"url(" + this.grid._options.imageUrl + "column-headers-over-bg.png) repeat-x scroll center", backgroundPlaceholder:"#646464", sortBackground:this.grid._options.imageUrl + "sort.png", sortRight:4, sortWidth:7, sortBackgroundAsc:this.grid._options.imageUrl + "sort-asc.png", sortBackgroundDesc:this.grid._options.imageUrl + 
    "sort-desc.png", font:"15px Arial,Helvetica,sans-serif", height:21, borderThickness:1, border:"solid #909192", classHeaderMask:"jgrid-header-mask", classHeader:"jgrid-header", classColHeader:"jgrid-colheader", classColHeaderActive:"jgrid-colheader-active", classColHeaderPlaceholder:"jgrid-colheader-placeholder", classInteractive:"interactive", classColHeaderSorted:"jgrid-colheader-sorted", classSort:"jgrid-sort", classSortAsc:"jgrid-sort-asc", classSortDesc:"jgrid-sort-desc", classResizeHandle:"jgrid-resize-handle", 
    resizeHandleWidth:11, style:"", headerStyle:"", scrollerLeft:1E4, scrollerWidth:1E5, classResizeGuide:"resize-guide", resizeGuideWidth:1, resizeBackground:"black;filter:alpha(opacity=40);opacity:0.4", syncResize:!1, resizeHandleBackground:"black;filter:alpha(opacity=5);opacity:0.05"}, a.options);
    this._map = {};
    this._resizeMap = {};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.ColumnHeader", c);
  f._add("ColHeader", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this._mask = $("<div class='" + this._options.classHeaderMask + "'>").prependTo(this._ctnr);
    this._head = $("<div class='" + this._options.classHeader + "'>").appendTo(this._mask);
    c._disableSel(this._head);
    this.bindEvents()
  };
  b.bindEvents = function() {
    var a, b = this.grid.colDefMgr.get(), g = b.length, c = 0;
    for(a = {onRenderModules:this._onRenderModules, onAfterRenderModules:this._onAfterRenderModules, onCreateCss:this._onCreateCss, onDestroy:this._destroy, mousedown:this._mousedown, mouseup:this._mouseup, dragmove:this._dragmove, onScrollViewportH:this._onScrollViewportH, onScrollViewportV:this._onScrollViewportV, onChangeSorter:this._onChangeSorter, click:this._click, onResizeCol:this._setWidthByKey};c < g;c++) {
      if(d.isNotNull(b[c].sorter)) {
        a["clickHeader_" + b[c].key] = this._sort
      }
    }
    this.grid.event.bind(a, this)
  };
  b._destroy = function() {
    this._head.sortable && this._head.sortable("destroy");
    this._destroyResizeHandles();
    f._destroy(this, {name:"ColHeader", path:"header", $:"resizeGuide _mask _head", property:"ctnr _resizeMap", map:"map _options"})
  };
  b._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, g = b.borderThickness + "px " + b.border, d = [], c = this.grid.colDefMgr.get(), f = c.length, k = 0;
    d.push(a + b.classHeaderMask + "{position:relative;overflow:hidden;width:100%;font:" + b.font + ";background:" + b.background + ";border-bottom:" + g + ";" + b.style + "}");
    d.push(a + b.classHeader + "{position:relative;overflow:hidden;white-space:nowrap;cursor:default;left:" + -b.scrollerLeft + "px;width:" + b.scrollerWidth + "px;line-height:" + b.height + "px}");
    d.push(a + b.classColHeader + "{position:relative;overflow:hidden;float:left;text-overflow:ellipsis;text-align:center;height:" + b.height + "px;left:" + (b.scrollerLeft - this.grid.view.getScrollLeft()) + "px;border-right:" + g + ";" + b.headerStyle + "}");
    d.push(a + b.classColHeader + "." + b.classInteractive + ":hover, " + a + b.classColHeaderActive + "{background:" + b.backgroundHover + "}");
    d.push(a + b.classColHeaderActive + "{border-left:" + g + "}");
    d.push(a + b.classColHeader + "." + b.classColHeaderPlaceholder + "{background:" + b.backgroundPlaceholder + "!important}");
    d.push(a + b.classSort + "{position:absolute;height:" + b.height + "px;right:" + b.sortRight + "px;width:" + b.sortWidth + "px;background:url(" + b.sortBackground + ") no-repeat center transparent}");
    d.push(a + b.classSortAsc + "{background:url(" + b.sortBackgroundAsc + ") no-repeat center transparent}");
    d.push(a + b.classSortDesc + "{background:url(" + b.sortBackgroundDesc + ") no-repeat center transparent}");
    d.push(a + b.classResizeHandle + "{z-index:10;background:" + b.resizeHandleBackground + ";cursor:e-resize;position:absolute;height:" + b.height + "px;width:" + b.resizeHandleWidth + "px}");
    for(d.push(a + b.classResizeGuide + "{z-index:10;position:absolute;background:" + b.resizeBackground + ";width:" + b.resizeGuideWidth + "px}");k < f;k++) {
      d.push(a + b.classColHeader + "#" + this.mid + "h" + c[k].key + "{" + c[k].headerStyle + "}")
    }
    return d.join("")
  };
  b._widthPlus = function() {
    return this._options.borderThickness
  };
  b._onScrollViewportH = function(a) {
    this._head[0].style.left = -this._options.scrollerLeft - a + "px"
  };
  b._onRenderModules = function() {
    for(var a = this.grid.colDefMgr.get(), b = a.length, g = 0, d, c = [];g < b;g++) {
      (d = a[g]).hidden || this._render(c, d, g)
    }
    this._head[0].innerHTML = c.join("");
    this.grid.event.trigger("onRenderHeadersComplete")
  };
  b._onAfterRenderModules = function() {
    this._options.reorderEnabled && this._initReorder();
    this._initResizeHandles();
    this._resizeGuide = $("<div class='" + this._options.classResizeGuide + "'>").appendTo(this.grid.view._mask);
    this._resizeGuide[0].style.top = "0px";
    this._resizeGuide[0].style.height = "0px"
  };
  b._render = function(a, b, g) {
    if(!d.isNull(b)) {
      var c = b.noName ? "" : b.name || b.key, f = this._widthPlus();
      a.push("<div id='" + this.mid + "h" + b.key + "' class='" + this._options.classColHeader + " " + (this._options.reorderEnabled || d.isNotNull(b.sorter) ? " " + this._options.classInteractive : "") + "' " + (b.noTitle ? "" : "title='" + (b.title || c) + "' ") + "style='width:" + (this.grid.view._getColOuterWidth(g) - f) + "px;' colKey='" + b.key + "'>");
      this.grid.event.trigger("onRenderHeader_" + b.key + "_prepend", [a]);
      a.push(c);
      this.grid.event.trigger("onRenderHeader_" + b.key + "_append", [a]);
      d.isNotNull(b.sorter) && a.push("<span class='" + this._options.classSort + "'></span>");
      a.push("</div>")
    }
  };
  c._disableSel = function(a) {
    Util$.safe$(a).attr("unselectable", "on").css("MozUserSelect", "none").bind("selectstart.ui", function() {
      return!1
    })
  };
  b.get = function(a) {
    if(this._map.hasOwnProperty(a)) {
      return this._map[a]
    }
    var b = document.getElementById(this.mid + "h" + a);
    return d.isNull(b) ? $([]) : this._map[a] = $(b)
  };
  b._updateIndicator = function(a, b) {
    var g = this.get(a);
    if(g.length !== 0) {
      var d = this._options, c = g.find("." + d.classSort);
      b === 0 ? (g.removeClass(d.classColHeaderSorted), c.removeClass(d.classSortAsc + " " + d.classSortDesc)) : (g.addClass(d.classColHeaderSorted), b === 1 ? c.addClass(d.classSortAsc).removeClass(d.classSortDesc) : b === 2 && c.addClass(d.classSortDesc).removeClass(d.classSortAsc))
    }
  };
  b._closest = function(a) {
    return Util$.safe$(a).closest("div." + this._options.classColHeader, this._head)
  };
  b._getDef = function(a) {
    return this.grid.colDefMgr.getByKey(a.attr("colKey"))
  };
  b._sort = function(a, b, g) {
    a = g.sorter;
    if(!d.isNull(a)) {
      this.grid.event.trigger("onBeforeColSort_" + g.key + " onBeforeColSort"), a.desc = a.desc === !1 ? !0 : !1, this.grid.dataMgr.refresh({sorter:a}), this.grid.view._scroll()
    }
  };
  b._onChangeSorter = function(a, b) {
    a !== b && d.isNotNull(a) && this._updateIndicator(a.key, 0);
    d.isNotNull(b) && this._updateIndicator(b.key, b.desc ? 2 : 1)
  };
  b._initReorder = function() {
    var a = this, b = this._options, g = this.grid.colDefMgr, d = this._head, c = this.mid.length + 1, f = function(a, b) {
      for(var e = $(d).sortable("toArray"), f = e.length, l, q = 0;q < f;q++) {
        l = e[q], e[q] = l === "" ? b.item.attr("id").substring(c) : l.substring(c)
      }
      g.sortByKey(e)
    };
    d.sortable({items:"." + b.classColHeader, axis:"x", forcePlaceholderSize:!0, placeholder:b.classColHeaderPlaceholder + " " + b.classColHeader, tolerance:"pointer", start:function(b, e) {
      e.item.addClass(a._options.classColHeaderActive)
    }, stop:function(b, e) {
      e.item.removeClass(a._options.classColHeaderActive);
      a._syncResizeHandles()
    }, update:f});
    b.reorderSyncEnabled && d.sortable("option", "change", f)
  };
  b._getDx = function(a, b) {
    var g = a.clientX - this._resizeInitX, c = b.minW, f = d.ifNull(b.maxW, Number.MAX_VALUE), l = this._resizeInitWidth;
    l + g < c && (g = c - l);
    l + g > f && (g = f - l);
    return g
  };
  b._click = function(a) {
    var b = this._closest(a.target);
    if(b.length !== 0) {
      var g = this._getDef(b);
      this.grid.event.triggerInvalid("clickHeaderValid_" + g.key, [a, b, g]) || this.grid.event.trigger("clickHeader_" + g.key + " clickHeader", [a, b, g])
    }
  };
  b._mousedown = function(a) {
    if(d.hasTagAndClass(a.target, "DIV", this._options.classResizeHandle)) {
      this._resizeKey = a.target.getAttribute("key"), this._resizeInitWidth = this.get(this._resizeKey)[0].clientWidth, this._resizeInitColWidth = this.grid.colDefMgr.getByKey(this._resizeKey).width, this._resizeInitX = a.clientX, this._resizeHandleInitX = this._resizeMap[this._resizeKey][0].offsetLeft, this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + (this._options.resizeHandleWidth - this._options.resizeGuideWidth) / 2 - this._options.scrollerLeft) + "px", this._resizeGuide[0].style.height = 
      this.grid.view.getInnerHeight() + "px"
    }else {
      var b = this._closest(a.target);
      if(b.length !== 0) {
        this.grid.event.trigger("mousedownHeader", [a, b]);
        var g = this._getDef(b);
        this.grid.event.trigger("mousedownHeader_" + g.key, [a, b, g])
      }
    }
  };
  b._dragmove = function(a) {
    if(!d.isNull(this._resizeKey) && (a = this._getDx(a, this.grid.colDefMgr.getByKey(this._resizeKey)), !(Math.abs(a) < 1))) {
      this.get(this._resizeKey)[0].style.width = this._resizeInitWidth + a + "px", this._moveResizeHandles(this._resizeHandleInitX + a - this._resizeMap[this._resizeKey][0].offsetLeft, this.grid.colDefMgr.getIdxByKey(this._resizeKey)), this._resizeGuide[0].style.left = Math.floor(this._resizeHandleInitX + a + (this._options.resizeHandleWidth - this._options.resizeGuideWidth) / 2 - this._options.scrollerLeft) + "px", this._options.syncResize && this.grid.view.setWidthByKey(this._resizeKey, this._resizeInitColWidth + 
      a)
    }
  };
  b._mouseup = function(a) {
    if(!d.isNull(this._resizeKey)) {
      this._resizeGuide[0].style.height = "0px", a = this._getDx(a, this.grid.colDefMgr.getByKey(this._resizeKey)), Math.abs(a) >= 1 && this.grid.view.setWidthByKey(this._resizeKey, this._resizeInitColWidth + a), delete this._resizeKey, delete this._resizeInitX, delete this._resizeHandleInitX, delete this._resizeInitWidth, delete this._resizeInitColWidth
    }
  };
  b._setWidthByKey = function(a, b) {
    this.get(a)[0].style.width = b + this.grid.view._colWidthPlus() - this._widthPlus() + "px";
    this._syncResizeHandles(this.grid.colDefMgr.getIdxByKey(a))
  };
  b._syncResizeHandles = function(a) {
    d.isNull(a) && (a = 0);
    for(var b = this.grid.view._getColLefts(), g = this.grid.colDefMgr.get(), c = g.length, f = this._resizeMap, l;a < c;a++) {
      if(l = g[a].key, f.hasOwnProperty(l)) {
        f[l][0].style.left = b[a + 1] + this._resizeHandleOffset + "px"
      }
    }
  };
  b._moveResizeHandles = function(a, b) {
    d.isNull(b) && (b = 0);
    for(var g = this.grid.colDefMgr.get(), c = g.length, f = this._resizeMap, l;b < c;b++) {
      if(l = g[b].key, f.hasOwnProperty(l)) {
        l = f[l][0], l.style.left = l.offsetLeft + a + "px"
      }
    }
  };
  b._onScrollViewportV = function() {
    this._resizeGuide[0].style.top = this.grid.view.getScrollTop() + "px"
  };
  b._destroyResizeHandles = function() {
    var a = this._resizeMap, b;
    for(b in a) {
      a.hasOwnProperty(b) && (a[b].remove(), delete a[b])
    }
    delete this._resizeKey;
    delete this._resizeInitX;
    delete this._resizeHandleInitX;
    delete this._resizeInitWidth;
    delete this._resizeInitColWidth
  };
  b._initResizeHandles = function() {
    for(var a = this.grid.colDefMgr.get(), b = a.length, g = this.grid.view._getColLefts(), d = this._options, c = this._resizeMap, f, k = 0, m = this._resizeHandleOffset = Math.floor(d.scrollerLeft - d.resizeHandleWidth / 2), j = this.grid.view.mid, o = d.classResizeHandle, n = this._head;k < b;k++) {
      if(d = a[k], d.resizable) {
        f = d.key, c[f] = $("<div class='" + o + "' key='" + f + "' ondblclick='JGM.m.ViewportManager." + j + '._autoColWidth("' + f + "\")' style='left:" + (m + g[k + 1]) + "px' title='" + d.name + " 컬럼의 폭을 조절합니다.'>").appendTo(n)
      }
    }
  }
})();
jx.grid.CheckManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this._options = f._extend({colDef:{key:"checkbox", width:20, name:" ", noTitle:!0, resizable:!1, sorter:null, filter:null, noSearch:!0, editor:null, inputOnCreate:!1}, colIdx:0, name:void 0, classCheck:"checkmg", classMasterCheck:"checkm", master:!0, isRadio:!1}, a.options);
    if(this._options.isRadio) {
      d.isNull(this._options.name) && (this._options.name = "radio" + this.mid), this._options.master = !1
    }
    this._map = {};
    this.disabledmap = {};
    this._count = 0;
    this._disabled = !1;
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.CheckManager", c);
  f._add("CheckManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    var a = this._options, b = f._CONST;
    this.grid.colDefMgr.getByKey(a.colDef.key) === void 0 && this.grid.colDefMgr.addAt(a.colIdx, a.colDef);
    if(d.isNull(b._checkboxWidth)) {
      a = d.calCheckSize(), b._checkboxWidth = a.checkboxW, b._checkboxHeight = a.checkboxH, b._radioWidth = a.radioW, b._radioHeight = a.radioH
    }
    this.bindEvents()
  };
  b.bindEvents = function() {
    var a = this._options, b = a.colDef.key, g;
    g = {onCreateCss:this._onCreateCss, onDestroy:this._destroy, onAfterSetDatalist:this.uncheckAll, onIdChange:this._onIdChange, onIdListChange:this._onIdListChange, onRemoveDatarow:this._onRemoveDatarow, onRemoveDatalist:this._onRemoveDatalist};
    g["onRenderCell_" + b + "_prepend"] = this._onRenderCell;
    g["keydownColSel_" + b + "_" + d.keyMapKeydown.space] = this._keydownColSel;
    if(a.master) {
      g["onRenderHeader_" + b + "_prepend"] = this._onRenderHeader, g.onRenderHeadersComplete = this._getMaster
    }
    this.grid.event.bind(g, this)
  };
  b._destroy = function() {
    f._destroy(this, {name:"CheckManager", path:"checkMgr", $:"master", property:"count _disabled", map:"map _options"})
  };
  b._onCreateCss = function() {
    var a, b, g;
    this._options.isRadio ? (a = f._CONST._radioWidth, b = f._CONST._radioHeight) : (a = f._CONST._checkboxWidth, b = f._CONST._checkboxHeight);
    g = "*overflow:hidden;padding:0;width:" + a + "px;height:" + b + "px;";
    return this.grid.view._getCellSelector() + " ." + this._options.classCheck + "[mid='" + this.mid + "']{" + g + "margin:" + (this.grid.view._getRowInnerHeight() - b) / 2 + "px 0 0 " + (this._options.colDef.width - this.grid.view._getPadding() - a) / 2 + "px}#" + this.mid + "h{" + g + "margin:" + (this.grid.header._options.height - b) / 2 + "px 0 0 0}"
  };
  b.checkList = function(a, b) {
    if(!b) {
      a = this.grid.dataMgr.mapList(a).mapped
    }
    for(var g = 0, d = a.length;g < d;g++) {
      this.check(a[g], !0)
    }
  };
  b.setCheckList = function(a, b) {
    this.uncheckAll();
    this.checkList(a, b)
  };
  b.getCheckList = function() {
    return d.toArray(this._map)
  };
  b.getDisableds = function() {
    return d.toArray(this.disabledmap)
  };
  b.toggleCheckAll = function() {
    this.isCheckedAll() ? this.uncheckAll() : this.checkAll()
  };
  b.checkAll = function() {
    this._options.master && c._check(this._master);
    c._check(this.getCheckboxes());
    for(var a = this.grid.dataMgr.all, b = a.length, d = this.grid.dataMgr.idKey, f = this._map, i = 0;i < b;i++) {
      f[a[i][d]] = a[i]
    }
    this._count = b
  };
  b.uncheckAll = function() {
    this._options.master && c._uncheck(this._master);
    c._uncheck(this.getCheckboxes());
    this._map = {};
    this._count = 0
  };
  b.toggleCheck = function(a, b) {
    b || (a = this.grid.dataMgr.map(a));
    this.isChecked(a, !0) && !this._options.isRadio ? this.uncheck(a, !0) : this.check(a, !0)
  };
  b.toggleDisable = function(a, b) {
    b || (a = this.grid.dataMgr.map(a));
    this.isDisabled(a, !0) ? this.enable(a, !0) : this.disable(a, !0)
  };
  b.toggleById = function(a) {
    this.toggleCheck(this.grid.dataMgr.getById(a), !0)
  };
  b.check = function(a, b) {
    b || (a = this.grid.dataMgr.map(a));
    this._add(a) && (c._check(this.getCheckbox(a)), this._updateMaster(), this.grid.event.trigger("onCheckChange", [a, !0]))
  };
  b.uncheck = function(a, b) {
    b || (a = this.grid.dataMgr.map(a));
    this._remove(a) && (c._uncheck(this.getCheckbox(a)), this._options.master && c._uncheck(this._master), this.grid.event.trigger("onCheckChange", [a, !1]))
  };
  b.disable = function(a, b) {
    var d = this.grid.dataMgr;
    b || (a = d.map(a));
    var d = d.getId(a), f = this.disabledmap;
    f.hasOwnProperty(d) || (f[d] = a, c.disableNode(this.getCheckbox(a)), this.grid.event.trigger("onDisableCheck", [a]))
  };
  b.enable = function(a, b) {
    var d = this.grid.dataMgr;
    b || (a = this.grid.dataMgr.map(a));
    var d = d.getId(a), f = this.disabledmap;
    f.hasOwnProperty(d) && (delete f[d], c.enableNode(this.getCheckbox(a)), this.grid.event.trigger("onEnableCheck", [a]))
  };
  b._updateMaster = function() {
    this._options.master && c._setCheck(this._master, this.isCheckedAll())
  };
  b._add = function(a) {
    var b = a[this.grid.dataMgr.idKey];
    if(this._map.hasOwnProperty(b)) {
      return!1
    }
    if(this._options.isRadio === !0) {
      this._map = {}, this._count = 0
    }
    this._map[b] = a;
    this._count++;
    return!0
  };
  b._remove = function(a) {
    var a = a[this.grid.dataMgr.idKey], b = this._map;
    if(!b.hasOwnProperty(a)) {
      return!1
    }
    delete b[a];
    this._count--;
    return!0
  };
  b.isChecked = function(a, b) {
    var d = this.grid.dataMgr;
    b || (a = d.map(a));
    return this._map.hasOwnProperty(d.getId(a))
  };
  b.isDisabled = function(a, b) {
    var d = this.grid.dataMgr;
    b || (a = d.map(a));
    return this.disabledmap.hasOwnProperty(d.getId(a))
  };
  b.splitChecked = function(a, b) {
    if(!b) {
      a = this.grid.dataMgr.mapList(a).mapped
    }
    for(var d = [], c = [], f = 0, l = a.length, k = this.grid.dataMgr.idKey, m, j = this._map;f < l;f++) {
      j.hasOwnProperty((m = a[f])[k]) ? d.push(m) : c.push(m)
    }
    return{checked:d, unchecked:c}
  };
  b.isCheckedAll = function() {
    return this._count !== 0 && this._count === this.grid.dataMgr.all.length ? !0 : !1
  };
  b.removeChecked = function() {
    return this.grid.dataMgr.removeList(this.getCheckList())
  };
  b._getMaster = function() {
    this._master = $(document.getElementById(this.mid + "h"))
  };
  b._getChecks = function(a) {
    for(var b = a.length, d = [], c = 0, f = this.grid.colDefMgr.getIdxByKey(this._options.colDef.key);c < b;c++) {
      d.push(a[c].childNodes[f].childNodes[0])
    }
    return d
  };
  b.getCheckboxes = function() {
    return this._getChecks(this.grid.view.getRenderedRows())
  };
  b.getCheckboxById = function(a) {
    a = this.grid.view.getRowById(a);
    if(d.isNotNull(a)) {
      return a.childNodes[this.grid.colDefMgr.getIdxByKey(this._options.colDef.key)].childNodes[0]
    }
  };
  b.getCheckbox = function(a) {
    return this.getCheckboxById(this.grid.dataMgr.getId(a))
  };
  b.getCheckboxByIdx = function(a) {
    return this.getCheckboxById(this.grid.dataMgr.getIdByIdx(a))
  };
  b._onRemoveDatarow = function(a) {
    this.uncheck(a, !0);
    this.enable(a, !0)
  };
  b._onRemoveDatalist = function(a) {
    for(var b = 0, d = a.length;b < d;b++) {
      this.uncheck(a[b], !0), this.enable(a[b], !0)
    }
  };
  b._onIdChange = function(a, b, d) {
    var c = this._map, f = this.disabledmap;
    c.hasOwnProperty(b) && (delete c[b], c[d] = a);
    f.hasOwnProperty(b) && (delete f[b], f[d] = a)
  };
  b._onIdListChange = function(a, b, d) {
    for(var c = 0, f = a.length, l = this._map, k = this.disabledmap, m, j;c < f;c++) {
      m = a[c], j = b[c], l.hasOwnProperty(j) && (delete l[j], l[m[d]] = m), k.hasOwnProperty(j) && (delete k[j], k[m[d]] = m)
    }
  };
  b._keydownColSel = function(a, b, g) {
    a.preventDefault();
    if(d.isNotNullAnd(b, g)) {
      var a = this.isChecked(g.getDatarow(), !0), c, g = this.grid.dataMgr.datalist;
      if(this._options.isRadio) {
        for(c in b) {
          if(b.hasOwnProperty(c) && c !== "length") {
            this.check(g[c], !0);
            break
          }
        }
      }else {
        for(c in b) {
          b.hasOwnProperty(c) && c !== "length" && (a ? this.uncheck(g[c], !0) : this.check(g[c], !0))
        }
      }
    }
  };
  b._onRenderHeader = function(a) {
    a.push("<input id='" + this.mid + "h' type='checkbox' tabIndex='-1' onclick='JGM.m.CheckManager." + this.mid + ".toggleCheckAll();' class='" + this._options.classCheck + " " + this._options.classMasterCheck + "' mid='" + this.mid + "'");
    this.isCheckedAll() && a.push(" checked='checked'");
    this._disabled && a.push(" disabled='disabled'");
    a.push("/>")
  };
  b._onRenderCell = function(a, b, g, c, f) {
    f.push("<input tabIndex='-1' onclick=\"JGM.m.CheckManager." + this.mid + ".toggleById('" + g[this.grid.dataMgr.idKey] + "')\" type='" + (this._options.isRadio ? "radio" : "checkbox") + "' class='" + this._options.classCheck + "' mid='" + this.mid + "'");
    d.isNotNull(this._options.name) && f.push(" name='" + this._options.name + "'");
    this.isChecked(g, !0) && f.push(" checked='checked'");
    (this._disabled || this.isDisabled(g, !0)) && f.push(" disabled='disabled'");
    f.push("/>")
  };
  b.disableAll = function() {
    if(!this._disabled) {
      this._disabled = !0, this._options.master && this._master.attr("disabled", "disabled"), $(this.getCheckboxes()).attr("disabled", "disabled")
    }
  };
  b.enableAll = function() {
    if(this._disabled) {
      this._disabled = !1, this._options.master && this._master.removeAttr("disabled"), $(this.getCheckboxes()).removeAttr("disabled")
    }
  };
  c._check = function(a) {
    d.isNotNull(a) && Util$.safe$(a).attr("checked", "checked")
  };
  c._uncheck = function(a) {
    d.isNotNull(a) && Util$.safe$(a).removeAttr("checked")
  };
  c.disableNode = function(a) {
    d.isNotNull(a) && Util$.safe$(a).attr("disabled", "disabled")
  };
  c.enableNode = function(a) {
    d.isNotNull(a) && Util$.safe$(a).removeAttr("disabled")
  };
  c._setCheck = function(a, b) {
    b ? c._check(a) : c._uncheck(a)
  }
})();
jx.grid.Collapser = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.collapser = this;
    this._options = f._extend({key:void 0, colDef:{key:"collapser", width:120, name:" ", noSearch:!0}, colIdx:0, urlCollapsed:this.grid._options.imageUrl + "collapsed.png", urlCollapsedHover:this.grid._options.imageUrl + "collapsed-hover.png", urlExpanded:this.grid._options.imageUrl + "expanded.png", urlExpandedHover:this.grid._options.imageUrl + "expanded-hover.png", width:6, padding:5, classCollapser:"jgrid-collapser", classCollapsed:"collapsed", classExpanded:"expanded", classIndent:"indent", 
    classMasterCollapser:"master", indentSize:12, beginCollapsed:!1, CheckManager:void 0, Tree:void 0}, a.options);
    if(this._options.CheckManager) {
      this.checkMgr = f.create("CheckManager", {grid:this.grid, options:this._options.CheckManager}), delete this._options.CheckManager, d.isNull(this._options.key) && this._options.colIdx++
    }
    this._tree = new b({list:this.grid.dataMgr.all, options:this._options.Tree})
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  var b = goog.getObjectByName("jx.struct.Tree");
  goog.exportSymbol("JGM.module.Collapser", c);
  f._add("Collapser", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var a = c.prototype;
  a.__init = function() {
    d.isNull(this._options.key) && this.grid.colDefMgr.addAt(this._options.colIdx, this._options.colDef);
    this._makeTree();
    this._filterRefresh();
    this.key = d.isNull(this._options.key) ? this._options.colDef.key : this._options.key;
    this.bindEvents()
  };
  a.bindEvents = function() {
    var a = this.key, b;
    b = {onAfterFilter:this._onAfterFilter, onCreateCss:this._onCreateCss, onDestroy:this._destroy, onAfterSetDatalist:this._onAfterSetDatalist, onAddDatarow:this._onAddDatarow, onAddDatalist:this._onAddDatalist, onUpdateDatarow:this._onUpdateDatarow, onUpdateDatalist:this._onUpdateDatalist, onRemoveDatarow:this._onRemoveDatarow, onRemoveDatalist:this._onRemoveDatalist, onRenderHeadersComplete:this._getMaster};
    b["onRenderHeader_" + a + "_prepend"] = this._onRenderHeader;
    b["clickHeaderValid_" + a] = this._clickHeaderValid;
    b["onRenderCell_" + a + "_prepend"] = this._onRenderCell;
    b["dblclickCanvas_" + a] = this._dblclickCanvas;
    b["keydownColSel_" + a + "_" + d.keyMapKeydown.space] = this._keydownColSel;
    if(d.isNotNull(this.checkMgr)) {
      b.onCheckChange = this._onCheckChange
    }
    this.grid.event.bind(b, this)
  };
  a._destroy = function() {
    f._destroy(this, {name:"Collapser", path:"collapser", module:"tree", $:"master", property:"checkMgr", map:"options"})
  };
  a._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, c = a + this.grid.view._options.classRow + " .", f = a + b.classCollapser, l = f + "." + b.classExpanded, k = f + "." + b.classCollapsed, m = this.grid.view._getRowInnerHeight(), j = [], o = this.grid.header;
    j.push(a + b.classIndent + "{height:" + m + "px;float:left;}");
    j.push(f + "{width:" + b.width + "px;float:left;padding:0 " + b.padding + "px}");
    j.push(c + b.classCollapser + "{height:" + m + "px}");
    j.push(l + "{background:url(" + b.urlExpanded + ") no-repeat center transparent}");
    j.push(l + ":hover{background:url(" + b.urlExpandedHover + ") no-repeat center transparent}");
    j.push(k + "{background:url(" + b.urlCollapsed + ") no-repeat center transparent}");
    j.push(k + ":hover{background:url(" + b.urlCollapsedHover + ") no-repeat center transparent}");
    d.isNotNull(o) && j.push(a + o._options.classColHeader + " ." + b.classCollapser + "{height:" + o._options.height + "px}");
    return j.join("")
  };
  a._onAfterSetDatalist = function() {
    this._tree.destroy();
    this._tree = new b({list:this.grid.dataMgr.all, options:this._options.Tree});
    this._makeTree()
  };
  a._onAddDatarow = function(a) {
    a = this._tree.createNode(a);
    a._collapsed = this._options.beginCollapsed;
    a._shown = d.isNotNull(a.parent) && (a.parent === a.tree.root || a.parent._shown && !a.parent._collapsed) ? !0 : !1;
    d.isNotNull(a.parent) && a.parent.children.length === 1 && this.grid.view.rerenderCellByIdAndKey(this.grid.dataMgr.getId(a.parent.data), this.key);
    a._collapsed === !0 || a._shown === !1 ? a.traverseChildren({fn:function() {
      this._shown = !1
    }}) : a.traverseChildren({fn:function(a) {
      d.isNotNull(this.parent) && (this.parent === this.tree.root || this.parent._shown && !this.parent._collapsed) ? this._shown = !0 : (a.propagate = !1, this.traverse({fn:function() {
        this._shown = !1
      }}))
    }});
    this.grid.event.trigger("onCollapserTreeChange")
  };
  a._onAddDatalist = function(a) {
    for(var b = 0, c = a.length, f = this._tree, l = f.root, k = this._options.beginCollapsed, m = this.key, j = this.grid.view, o = this.grid.dataMgr, n, q = [], p;b < c;b++) {
      n = f.createNode(a[b]), n._collapsed = k, d.isNotNull(n.parent) && n.parent.children.length === 1 && q.push(n.parent.data)
    }
    if(j !== void 0) {
      b = 0;
      for(c = q.length;b < c;b++) {
        j.rerenderCellByIdAndKey(o.getId(q[b]), m)
      }
    }
    l.traverseChildren({fn:function(a) {
      p = this.parent;
      d.isNotNull(p) && (p === l || p._shown && !p._collapsed) ? this._shown = !0 : (a.propagate = !1, this.traverse({fn:function() {
        this._shown = !1
      }}))
    }});
    this.grid.event.trigger("onCollapserTreeChange")
  };
  a._onUpdateDatarow = function(a, b, c) {
    var f = this._tree, l = f._options.nodeKey, k = f._options.parentKey, m;
    b.hasOwnProperty(l) && (m = f.getNodeByNodeId(c[l]), f.changeNodeId(m, c[l], b[l]), this.grid.event.trigger("onCollapserTreeChange"));
    b.hasOwnProperty(k) && (d.isNull(m) && (m = f.getNode(a)), f.changeParentId(m, c[k], b[k]), this.grid.event.trigger("onCollapserTreeChange"))
  };
  a._onUpdateDatalist = function(a, b, c) {
    for(var b = this._tree, f = b._options.nodeKey, l = b._options.parentKey, k, m, j, o = [], n = [], q = 0, p = a.length;q < p;q++) {
      k = c[q], m = a[q], j = void 0, k.hasOwnProperty(f) && (d.isNull(j) && (j = b.getNodeByNodeId(k[f])), o.push({node:j, before:k[f], newId:m[f]})), k.hasOwnProperty(l) && (d.isNull(j) && (j = b.getNode(m)), n.push({node:j, before:k[l], newId:m[l]}))
    }
    a = o.length;
    c = n.length;
    if(a + c !== 0) {
      if(a + c > 10) {
        b.reattach()
      }else {
        for(q = 0;q < a;q++) {
          f = o[q], b.changeNodeId(f.node, f.before, f.newId)
        }
        for(q = 0;q < c;q++) {
          f = n[q], b.changeParentId(f.node, f.before, f.newId)
        }
      }
      this.grid.event.trigger("onCollapserTreeChange")
    }
  };
  a._onRemoveDatarow = function(a) {
    this._tree.destroyNodeByData(a);
    this.grid.event.trigger("onCollapserTreeChange")
  };
  a._onRemoveDatalist = function(a) {
    for(var b = 0, d = a.length, c = this._tree;b < d;b++) {
      c.destroyNodeByData(a[b])
    }
    this.grid.event.trigger("onCollapserTreeChange")
  };
  a._onAfterFilter = function(a, b) {
    var c = this._tree;
    if(b.length > 0) {
      var f = this.grid.dataMgr, l = a.length, k = f._idToIdx, m = f.idKey, j, o = 0, n = function(c) {
        d.isNotNull(this.parent) ? (j = this.parent.data, d.isNotNull(j) && !f.has(j) && (a.push(j), b.remove(j), k[j[m]] = -1)) : c.stop = !0
      };
      f._reidx();
      for(c.reattach();o < l;o++) {
        c.getNode(a[o]).traverse({up:!0, fn:n})
      }
      c.reattach(a);
      c.sortList(a);
      this.grid.event.trigger("onCollapserTreeChange")
    }else {
      c.reattach(a), this.grid.event.trigger("onCollapserTreeChange"), this._filter(a, b)
    }
  };
  a._filter = function(a, b) {
    a.length = 0;
    this._tree.root.traverseChildren({fn:function() {
      this._shown ? a.push(this.data) : b.push(this.data)
    }})
  };
  a.toggleById = function(a) {
    if(d.isNotNull(a)) {
      return this.toggleCollapse(this._tree.getNode(this.grid.dataMgr.getById(a)))
    }
  };
  a.toggle = function(a) {
    return this.toggleById(this.grid.dataMgr.getId(a))
  };
  a.toggleByIdx = function(a) {
    return this.toggleById(this.grid.dataMgr.getIdByIdx(a))
  };
  a._clickHeaderValid = function(a) {
    if(d.hasTagAndClass(a.target, "DIV", this._options.classCollapser)) {
      return!1
    }
  };
  a._dblclickCanvas = function(a, b) {
    d.hasTagAndClass(a.target, "DIV", this._options.classCollapser) || this.toggleCollapse(this._tree.getNode(b.getDatarow()))
  };
  a._keydownColSel = function(a, b, c) {
    a.preventDefault();
    if(d.isNotNullAnd(b, c)) {
      var a = this._tree, c = a.getNode(c.getDatarow())._collapsed, f = this.grid.dataMgr.datalist, l, k;
      for(k in b) {
        b.hasOwnProperty(k) && k !== "length" && (l = a.getNode(f[k]), c ? this.expand(l) : this.collapse(l))
      }
      this._filterRefresh()
    }
  };
  a._makeTree = function() {
    var a = this._tree, b, d;
    a.__init();
    d = a.map;
    a = a.root;
    if(this._options.beginCollapsed) {
      for(b in d) {
        if(d.hasOwnProperty(b)) {
          d[b]._collapsed = !0, d[b]._shown = !1
        }
      }
      d = a.children;
      var c = d.length;
      for(b = 0;b < c;b++) {
        d[b]._shown = !0
      }
      a._collapsed = !0
    }else {
      for(b in d) {
        if(d.hasOwnProperty(b)) {
          d[b]._collapsed = !1, d[b]._shown = !0
        }
      }
      a._collapsed = !1
    }
    this.grid.event.trigger("onCollapserTreeChange")
  };
  a._onRenderHeader = function(a) {
    a.push("<div id='" + this.mid + "h' onmousedown='JGM.m.Collapser." + this.mid + ".toggleMaster();' class='" + this._options.classCollapser + " " + this._options.classMasterCollapser);
    this._tree.root._collapsed ? a.push(" " + this._options.classCollapsed) : a.push(" " + this._options.classExpanded);
    a.push("'></div>")
  };
  a._onRenderCell = function(a, b, c, f, l) {
    a = this._tree.getNode(c);
    if(d.isNull(a)) {
      return null
    }
    c = this.grid.dataMgr.getId(c);
    b = this._options;
    l.push("<div class='" + b.classIndent + "' style='width:" + b.indentSize * a.getLevel() + "px;'></div><div ");
    a.isLeaf() ? l.push("class='" + b.classCollapser) : (l.push('onmousedown="JGM.m.Collapser.' + this.mid + ".toggleById('" + c + "');\" class='" + b.classCollapser), a._collapsed ? l.push(" " + b.classCollapsed) : l.push(" " + b.classExpanded));
    l.push("'></div>")
  };
  a.getLevel = function(a) {
    a = this._tree.getNode(a);
    return d.isNull(a) ? null : a.getLevel()
  };
  a.collapse = function(a, b) {
    if(!(a._collapsed === !0 || a.isLeaf())) {
      a._collapsed = !0;
      a.traverseChildren({fn:function(a) {
        this._shown = !1;
        this._collapsed && (a.propagate = !1)
      }});
      var d = this._getCollapser(a.data);
      d.length > 0 && this._setClass(d, !0);
      if(!b && a.parent === this._tree.root && this._tree.root._collapsed === !1) {
        this._setClass(this._master, this._tree.root._collapsed = !0)
      }
    }
  };
  a.expand = function(a, b) {
    if(!(a._collapsed === !1 || a.isLeaf())) {
      a._collapsed = !1;
      a.traverseChildren({fn:function(a) {
        this._shown = !0;
        this._collapsed && (a.propagate = !1)
      }});
      var d = this._getCollapser(a.data), c = this._tree;
      d.length > 0 && this._setClass(d, !1);
      if(!b && a.parent === c.root) {
        for(var d = c.root.children, f = d.length, k = 0;k < f;k++) {
          if(d[k]._collapsed) {
            return
          }
        }
        this._setClass(this._master, c.root._collapsed = !1)
      }
    }
  };
  a._setClass = function(a, b) {
    if(!d.isNull(a)) {
      var c = this._options;
      b ? a.addClass(c.classCollapsed).removeClass(c.classExpanded) : a.addClass(c.classExpanded).removeClass(c.classCollapsed)
    }
  };
  a.toggleMaster = function() {
    var a = this._tree.root, b = a.children, d = b.length, c = 0;
    if(a._collapsed) {
      for(;c < d;c++) {
        this.expand(b[c], !0)
      }
      this._setClass(this._master, a._collapsed = !1)
    }else {
      for(;c < d;c++) {
        this.collapse(b[c], !0)
      }
      this._setClass(this._master, a._collapsed = !0)
    }
    this._filterRefresh()
  };
  a.toggleCollapse = function(a) {
    a = a._collapsed ? this.expand(a) : this.collapse(a);
    this._filterRefresh();
    return a
  };
  a._onCheckChange = function(a, b) {
    var c = this._tree.getNode(a), i = this.checkMgr, l = [], k;
    b ? (c.traverseChildren({fn:function(a) {
      i.isChecked(this.data) ? a.propagate = !1 : (i._add(this.data), d.isNotNull(k = i.getCheckbox(this.data)) && l.push(k))
    }}), c.traverseParent({up:!0, fn:function(a) {
      d.isNull(this.data) || i.isChecked(this.data) ? a.stop = !0 : (i._add(this.data), d.isNotNull(k = i.getCheckbox(this.data)) && l.push(k))
    }}), f.CheckManager._check($(l)), i._updateMaster()) : (c.traverseChildren({fn:function(a) {
      i.isChecked(this.data) ? (i._remove(this.data), d.isNotNull(k = i.getCheckbox(this.data)) && l.push(k)) : a.propagate = !1
    }}), c.traverseParent({up:!0, fn:function(a) {
      if(d.isNull(this.data) || !i.isChecked(this.data)) {
        a.stop = !0
      }else {
        for(var b = 0, e = this.children, c = e.length;b < c;b++) {
          if(i.isChecked(e[b].data)) {
            a.stop = !0;
            return
          }
        }
        i._remove(this.data);
        d.isNotNull(k = i.getCheckbox(this.data)) && l.push(k)
      }
    }}), f.CheckManager._uncheck($(l)))
  };
  a._filterRefresh = function() {
    this._filter(this.grid.dataMgr.datalist, this.grid.dataMgr.failed);
    this.grid.dataMgr._finish()
  };
  a._getCollapser = function(a) {
    if(d.isNull(a)) {
      return $([])
    }
    a = d.findFirstByTagAndClass(this.grid.view.getCell(this.grid.dataMgr.getIdx(a), this.grid.colDefMgr.getIdxByKey(this.key)), "DIV", this._options.classCollapser);
    return a === void 0 ? $([]) : $(a)
  };
  a._getMaster = function() {
    this._master = $(document.getElementById(this.mid + "h"))
  }
})();
jx.grid.ColumnGroup = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this.grid = a.grid;
    this.grid.colGroup = this;
    this._options = f._extend({key:void 0, padColKeys:[], sumColKeys:[], prefix:"합계: ", Collapser:{indentSize:0}}, a.options);
    this._options.Collapser.key = this._options.key;
    this._parentMap = {};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.getObjectByName("jx.grid.Collapser");
  goog.exportSymbol("jx.grid.ColumnGroup", c);
  f._add("ColGroup", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    var a = this.grid, b = a.dataMgr, d = this._options;
    this.bindEvents();
    a = this.collapser = f.create("Collapser", {grid:a, options:d.Collapser});
    delete d.Collapser;
    this._processData(b.all);
    a.__init();
    b.refresh()
  };
  b.bindEvents = function() {
    var a;
    a = {onBeforeSetDatalist:this._removeAll, "onAfterSetDatalist onAddDatalist":this._processData, onAddDatarow:this._onAddDatarow, onUpdateDatarow:this._onUpdateDatarow, onUpdateDatalist:this._onUpdateDatalist, onRemoveDatarow:this._onRemoveDatarow, onRemoveDatalist:this._onRemoveDatalist, onDestroy:this._destroy};
    if(this._options.sumColKeys.length !== 0) {
      var b = this.mid, d = this.grid.dataMgr._consts._notReal, c = 0, f, l = this._options.sumColKeys, k = this._options.prefix, m = l.length;
      for(f = function(a, c, f, h, i) {
        f[d] === b && i.push(k)
      };c < m;c++) {
        a["onRenderCell_" + l[c] + "_prepend"] = f
      }
      a.onCollapserTreeChange = this._onCollapserTreeChange
    }
    this.grid.event.bind(a, this)
  };
  b._destroy = function() {
    f._destroy(this, {name:"ColGroup", path:"colGroup", property:"collapser", map:"parentMap _options"})
  };
  b._processData = function(a) {
    for(var b = a.length, c = this._options.key, f = this._options.padColKeys, i = this.grid.dataMgr, l = i._consts._notReal, k = i.idKey, m = this.collapser, j = m._tree._options.nodeKey, o = m._tree._options.parentKey, n = [], q = 0;q < b;q++) {
      this._addData(a[q], c, k, l, j, o, f, n)
    }
    n.length !== 0 && (i.all.pushList(n), i.makeCompositeKeyList(n, !0), i.addListToIdMap(n), d.isNotNull(m) && m._onAddDatalist(n));
    return n
  };
  b._addData = function(a, b, d, c, f, l, k, m) {
    var j = a[b], o = this._parentMap;
    o.hasOwnProperty(j) || (b = this._makeParent(a, b, d, j, c, f, k), m.push(b), o[j] = b);
    a[f] = a[d];
    a[l] = this.mid + j
  };
  b._makeParent = function(a, b, d, c, f, l, k) {
    var m = {}, j = 0, o = k.length;
    m[f] = this.mid;
    m[l] = this.mid + c;
    m[b] = c;
    for(m[d] = (this.grid.colDefMgr.getByKey(b).name || b) + ": " + c;j < o;j++) {
      m[k[j]] = a[k[j]]
    }
    return m
  };
  b._isParent = function(a) {
    return a[this.grid.dataMgr._consts._notReal] === this.mid
  };
  b._removeAll = function() {
    this._parentMap = {}
  };
  b._onAddDatarow = function(a) {
    var b = [], d = this._options, c = this.grid.dataMgr, f = this.collapser, l = f._tree._options;
    this._addData(a, d.key, c.idKey, c._consts._notReal, l.nodeKey, l.parentKey, d.padColKeys, b);
    b.length !== 0 && (a = b[0], c.all.push(a), c.makeCompositeKey(a, !0), c.addToIdMap(a), f._onAddDatarow(a))
  };
  b._onUpdateDatarow = function(a, b, d) {
    if(b.hasOwnProperty(this._options.key)) {
      var c = this._options.key, b = b[c], d = d[c], f = this.mid, c = this.collapser, l = c._tree, k = l._options.parentKey, m = {}, j = {}, o = this._parentMap;
      o.hasOwnProperty(b) || this._onAddDatarow(a);
      m[k] = f + b;
      j[k] = f + d;
      c._onUpdateDatarow(a, m, j);
      a = l.getNode(o[d]);
      a.children.length === 0 && (this.grid.dataMgr.all.remove(a.data), delete o[d], c._onRemoveDatarow(a.data))
    }
  };
  b._onUpdateDatalist = function(a, b, d) {
    var c = this._options.key, f = this.mid, l = this.collapser, k = l._tree, m = k._options.parentKey, j, o = {};
    j = {};
    for(var n = [], q = [], p = [], r = 0, s = a.length;r < s;r++) {
      j = b[r], j.hasOwnProperty(c) && (o = {}, o[m] = f + j[c], n.push(o), j = {}, j[m] = f + d[r][c], q.push(j), p.push(a[r]))
    }
    if(p.length !== 0) {
      a = this._parentMap;
      b = [];
      this._processData(p);
      l._onUpdateDatalist(p, n, q);
      r = 0;
      for(s = q.length;r < s;r++) {
        n = q[r][m], a.hasOwnProperty(n) && (p = k.getNode(a[n]), p.children.length === 0 && (delete a[n], b.push(p.data)))
      }
      b.length !== 0 && (l._onRemoveDatalist(b), this.grid.dataMgr.all.removeList(b))
    }
  };
  b._onRemoveDatarow = function(a) {
    this._isParent(a) ? delete this._parentMap[a[this._options.key]] : (a = this.collapser._tree.getNode(a).parent, a.children.length === 1 && this.grid.dataMgr.remove(a.data))
  };
  b._onRemoveDatalist = function(a) {
    for(var b = 0, d = a.length;b < d;b++) {
      this._onRemoveDatarow(a[b])
    }
  };
  b._onCollapserTreeChange = function() {
    for(var a = {}, b = this._options.sumColKeys, d = b.length, c = 0, f = this.grid.dataMgr._consts._notReal, l = this.mid, k, m, j;c < d;c++) {
      a[b[c]] = 0
    }
    this.collapser._tree.root.traverseChildren({post:!0, fn:function() {
      k = this.data;
      c = 0;
      if(k[f] === l) {
        for(;c < d;c++) {
          m = b[c], k[m] = a[m], a[m] = 0
        }
      }else {
        if(!k.hasOwnProperty(f)) {
          for(;c < d;c++) {
            if(typeof(j = k[b[c]]) === "string") {
              j = j.toFloat()
            }
            a[b[c]] += isNaN(j) ? 0 : j
          }
        }
      }
    }})
  }
})();
jx.grid.ViewportManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = a.container;
    this.grid = a.grid;
    this.grid.view = this;
    this._options = f._extend({attrRowIdx:"r", appendThreshold:3, renderThreshold:10, bufferSize:6, rowsPerPage:10, rowH:21, borderThickness:1, border:"solid #D0D7E5", padding:1, evenOddRows:!1, oddRowsBackground:"#F4F4F4", style:"", canvasStyle:"", rowStyle:"", cellStyle:"", classRow:"jgrid-row", classCell:"jgrid-cell", classView:"jgrid-viewport", classCanvas:"jgrid-canvas", focusBackground:"#FFF", focusOutline:"2px solid #f1ca7f", autoHeight:!1, autoWidth:!1}, a.options);
    this._vars = {drag:!1, _lastScrollTop:0, _lastScrollLeft:0, _lastRowLen:0};
    this._renderedRows = {};
    this._lockedRows = {};
    this._colLefts = [0];
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.ViewportManager", c);
  f._add("ViewportManager", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this._mask = $("<div class='" + this._options.classView + "' tabIndex='0' onscroll='JGM.m.ViewportManager." + this.mid + "._scroll()'>").appendTo(this._ctnr);
    this._canvas = $("<div class='" + this._options.classCanvas + "'>").appendTo(this._mask);
    this._mask.bind("selectstart.ui", function(a) {
      return $(a.target).is("input, textarea")
    });
    this._setColLefts();
    this._vars._lastRowLen = this.grid.dataMgr.datalist.length;
    this.grid.event.bind({canvasFind:this._canvasFind, onCreateCss:this._onCreateCss, onCreateDynamicCss:this._onCreateDynamicCss, onDestroy:this._onDestroy, keydown:this._keydown, keyup:this._keyup, keypress:this._keypress, mousein:this._mousein, mouseout:this._mouseout, mouseenter:this._mouseenter, mouseleave:this._mouseleave, mousemove:this._mousemove, mouseover:this._mouseover, mousedown:this._mousedown, mouseup:this._mouseup, click:this._click, dblclick:this._dblclick, resizeWidth:this._setWidth, 
    "resizeWidth onResizeCol onResizeCanvasHeight":this._resizeWidth, onAfterRefresh:this.onAfterRefresh, onRenderModules:this._render, onReorderCols:this._onReorderCols, onResizeCanvasWidth:this._scroll, onUpdateDatarow:this.onUpdateDatarow, onUpdateDatalist:this.onUpdateDatalist, onRemoveDatarow:this.onRemoveDatarow, onRemoveDatalist:this.onRemoveDatalist, onIdChange:this.onIdChange, onIdListChange:this.onIdListChange, unsetDrag:this.unsetDrag}, this)
  };
  b.unsetDrag = function() {
    this._vars.drag = !1
  };
  b._onDestroy = function() {
    f._destroy(this, {name:"ViewportManager", path:"view", $:"canvas _mask", property:"ctnr", map:"vars _lockedRows _renderedRows _options"})
  };
  b._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, d = a + b.classCell, c = a + b.classRow, f = b.borderThickness + "px " + b.border, l = c + "[" + b.attrRowIdx, k = this.grid.colDefMgr.get(), m = k.length, j = 0, o = [];
    o.push(a + b.classView + "{height:" + this._calHeight() + "px;outline:0;position:relative;white-space:nowrap;overflow:auto;line-height:" + b.rowH + "px;cursor:default;-moz-user-select:none;-webkit-user-select:none;" + b.style + "}");
    o.push(a + b.classView + ":focus{background:" + b.focusBackground + ";outline:" + b.focusOutline + "}");
    o.push(a + b.classCanvas + "{height:" + this._calCanvasHeight() + "px;" + b.canvasStyle + ";background:#fff}");
    o.push(c + "{position:absolute;" + b.rowStyle + "}");
    o.push(d + "{height:" + b.rowH + "px;border-bottom:" + f + ";display:inline-block;white-space:nowrap;overflow:hidden;float:left;text-overflow:ellipsis;padding-left:" + b.padding + "px;border-right:" + f + ";" + b.cellStyle + "}");
    for(b.evenOddRows && o.push(l + "$='1']," + l + "$='3']," + l + "$='5']," + l + "$='7']," + l + "$='9']{background:" + b.oddRowsBackground + "}");j < m;j++) {
      o.push(d + ".k_" + k[j].key + "{" + k[j].style + "}")
    }
    return o.join("")
  };
  b._onCreateDynamicCss = function() {
    for(var a = "#" + this.grid.mid + " ." + this._options.classCell, b = this._getRowSelector() + "{width:" + this._calCanvasWidth() + "px}", d = this.grid.colDefMgr.get(), c = d.length, f = 0;f < c;f++) {
      b += a + ".k_" + d[f].key + "{width:" + d[f].width + "px}"
    }
    return b
  };
  b.onUpdateDatarow = function(a) {
    this.isRendered(a) && this.rerenderRow(a)
  };
  b.onUpdateDatalist = function(a) {
    for(var b, d = a.length, c = 0;c < d;c++) {
      b = a[c], this.isRendered(b) && this.rerenderRow(b)
    }
  };
  b.onRemoveDatarow = function(a) {
    this.destroyRow(a)
  };
  b.onRemoveDatalist = function(a) {
    for(var b = a.length, d = 0;d < b;d++) {
      this.destroyRow(a[d])
    }
  };
  b.onIdChange = function(a, b, d) {
    this.isRowLockedById(b) && (this._lockedRows[d] = this._lockedRows[b], delete this._lockedRows[b]);
    this.isRenderedById(b) && ((this._renderedRows[d] = this._renderedRows[b]).setAttribute("i", d), delete this._renderedRows[b])
  };
  b.onIdListChange = function(a, b, d) {
    for(var c = a.length, f = 0, l = this._lockedRows, k = this._renderedRows, m, j;f < c;f++) {
      m = b[f], j = a[f][d], l.hasOwnProperty(m) && (l[j] = l[m], delete l[m]), k.hasOwnProperty(m) && ((k[j] = k[m]).setAttribute("i", j), delete k[m])
    }
  };
  b._getCellSelector = function() {
    return"#" + this.grid.mid + " ." + this._options.classCell
  };
  b._getRowSelector = function() {
    return"#" + this.grid.mid + " ." + this._options.classRow
  };
  b.scrollTo = function(a, b) {
    this.scrollToRow(a);
    this.scrollToCol(b)
  };
  b.scrollToRowLazy = function(a) {
    var b = this.getScrollTop();
    return d.isNull(a) ? b : this._getLastSafeVisibleRow() < a ? this.scrollToRow(this._getFirstRowForSafe(a)) : this._getFirstSafeVisibleRow() > a ? this.scrollToRow(a) : b
  };
  b.scrollToColLazy = function(a) {
    var b = this.getScrollLeft();
    if(d.isNull(a)) {
      return b
    }
    if(this._getLastSafeVisibleCol() < a) {
      return this.setScrollLeft(this.getScrollHForSafe(a))
    }else {
      if(this._getFirstSafeVisibleCol() > a) {
        return this.scrollToCol(a)
      }
    }
    return b
  };
  b.scrollToLazy = function(a, b) {
    this.scrollToRowLazy(a);
    this.scrollToColLazy(b)
  };
  b.scrollToRow = function(a) {
    return d.isNotNull(a) ? this.setScrollTop(this._getRowOuterHeight() * a) : this.getScrollTop()
  };
  b.scrollToCol = function(a) {
    return this.setScrollLeft(this.getColLeft(a))
  };
  b._getColInnerWidth = function(a) {
    return this.grid.colDefMgr.get(a).width
  };
  b._getColInnerWidthByKey = function(a) {
    return this.grid.colDefMgr.getByKey(a).width
  };
  b.getColWidth = function(a) {
    return this.grid.colDefMgr.get(a).width + this._options.padding
  };
  b.getColWidthByKey = function(a) {
    return this.grid.colDefMgr.getByKey(a).width + this._options.padding
  };
  b._getColOuterWidth = function(a) {
    return this.grid.colDefMgr.get(a).width + this._options.padding + this._options.borderThickness
  };
  b._getColOuterWidthByKey = function(a) {
    return this.grid.colDefMgr.getByKey(a).width + this._options.padding + this._options.borderThickness
  };
  b._getPadding = function() {
    return this._options.padding
  };
  b._colWidthPlus = function() {
    return this._options.padding + this._options.borderThickness
  };
  b._getRowOuterHeight = function() {
    return this._options.rowH + this._options.borderThickness
  };
  b._getRowInnerHeight = function() {
    return this._options.rowH
  };
  b._calHeight = function() {
    return this._options.autoHeight ? this._calCanvasHeight() + (this.grid.width() < this._calCanvasWidth() ? this.grid._vars.scrollbarDim.h : 0) : this._getRowOuterHeight() * this._options.rowsPerPage
  };
  b.getHeight = function() {
    return this._mask[0].offsetHeight
  };
  b.getInnerHeight = function() {
    return this._mask[0].clientHeight
  };
  b._getWidth = function() {
    return this._mask[0].offsetWidth
  };
  b.getInnerWidth = function() {
    return this._mask[0].clientWidth
  };
  b._calCanvasHeight = function() {
    return this._getRowOuterHeight() * this.grid.dataMgr.datalist.length
  };
  b.getCanvasHeight = function() {
    return this._canvas[0].clientHeight
  };
  b._setCanvasHeight = function(a) {
    a = parseInt(a);
    if(!(isNaN(a) || a < 1)) {
      var b = this.getCanvasHeight();
      if(a != b) {
        this._canvas[0].style.height = a + "px", this.grid.event.trigger("onResizeCanvasHeight", [a, b])
      }
    }
  };
  b._calCanvasWidth = function() {
    return this._colLefts[this.grid.colDefMgr.length()]
  };
  b.getCanvasWidth = function() {
    return this._canvas[0].clientWidth
  };
  b._setCanvasWidth = function(a) {
    a = parseInt(a);
    if(!(isNaN(a) || a < 1)) {
      var b = this.getCanvasWidth();
      if(a != b) {
        this._canvas[0].style.width = a + "px", this.grid.event.trigger("onResizeCanvasWidth", [a, b])
      }
    }
  };
  b.getColLeft = function(a) {
    return this._colLefts[a]
  };
  b._getColLefts = function() {
    return this._colLefts
  };
  b._setColLefts = function(a, b) {
    d.isNull(a) && (a = 0);
    var c = this.grid.colDefMgr.get(), f = this._colWidthPlus();
    if(d.isNull(b)) {
      b = c.length
    }
    for(;a < b;a++) {
      this._colLefts[a + 1] = this._colLefts[a] + c[a].width + f
    }
    return this._colLefts
  };
  b._onReorderCols = function() {
    this._setColLefts();
    this._rerender()
  };
  b.setWidthByKey = function(a, b) {
    var c = this.grid.colDefMgr.getByKey(a), b = d.bound(b, c.minW, c.maxW);
    if(b !== c.width) {
      var f = c.width;
      c.width = b;
      this._setCanvasWidth(this._setColLefts(this.grid.colDefMgr.getIdxByKey(a))[this.grid.colDefMgr.length()]);
      this.grid._recreateDynamicCss();
      this.grid.event.trigger("onResizeCol_" + a + " onResizeCol", [a, b, f])
    }
  };
  b._autoColWidth = function(a) {
    for(var b = this._canvasFind(".k_" + a), d = Number.MIN_VALUE, c = b.length, f = 0;f < c;f++) {
      if(d < b[f].scrollWidth) {
        d = b[f].scrollWidth
      }
    }
    d -= this._getPadding();
    this.setWidthByKey(a, d)
  };
  b._setWidth = function(a) {
    a = parseInt(a);
    if(!(isNaN(a) || a < 1)) {
      this._mask[0].style.width = a + "px"
    }
  };
  b.getScrollTop = function() {
    return this._mask[0].scrollTop
  };
  b.getScrollLeft = function() {
    return this._mask[0].scrollLeft
  };
  b.setScrollTop = function(a) {
    var b = this.getScrollTop();
    return d.isNotNull(a) && b != a ? this._mask[0].scrollTop = a : b
  };
  b.setScrollLeft = function(a) {
    var b = this.getScrollLeft();
    return d.isNotNull(a) && b != a ? this._mask[0].scrollLeft = a : b
  };
  b._hasHScrollbar = function() {
    return this._mask[0].offsetHeight > this._mask[0].clientHeight
  };
  b._hasVScrollbar = function() {
    return this._mask[0].offsetWidth > this._mask[0].clientWidth
  };
  b._heightPlus = function() {
    return this._mask[0].offsetHeight - this._mask[0].clientHeight
  };
  b._widthPlus = function() {
    return this._mask[0].offsetWidth - this._mask[0].clientWidth
  };
  b._getFirstVisibleRow = function() {
    return Math.floor(this.getScrollTop() / this._getRowOuterHeight())
  };
  b._getFirstSafeVisibleRow = function() {
    return Math.ceil(this.getScrollTop() / this._getRowOuterHeight())
  };
  b._getLastVisibleRow = function() {
    return Math.ceil((this.getScrollTop() + this._mask[0].clientHeight) / this._getRowOuterHeight()) - 1
  };
  b._getLastSafeVisibleRow = function() {
    return Math.floor((this.getScrollTop() + this._mask[0].clientHeight) / this._getRowOuterHeight()) - 1
  };
  b._getFirstRowForSafe = function(a) {
    return a - Math.floor(this._mask[0].clientHeight / this._getRowOuterHeight()) + 1
  };
  b._getFirstVisibleCol = function() {
    for(var a = this.getScrollLeft(), b = this._colLefts, d = 0, c = b.length;d < c;d++) {
      if(b[d] > a) {
        return d - 1
      }
      if(b[d] === a) {
        return d
      }
    }
    return c - 2
  };
  b._getFirstSafeVisibleCol = function() {
    for(var a = this.getScrollLeft(), b = this._colLefts, d = 0, c = b.length;d < c;d++) {
      if(b[d] >= a) {
        return d
      }
    }
    return c - 2
  };
  b._getLastVisibleCol = function() {
    for(var a = this.getScrollLeft() + this._mask[0].clientWidth, b = this._colLefts, d = 0, c = b.length;d < c;d++) {
      if(b[d] >= a) {
        return d - 1
      }
    }
    return c - 2
  };
  b._getLastSafeVisibleCol = function() {
    for(var a = this.getScrollLeft() + this._mask[0].clientWidth, b = this._colLefts, d = 0, c = b.length;d < c;d++) {
      if(b[d] > a) {
        return d - 2
      }
    }
    return c - 2
  };
  b._getFirstColForSafe = function(a) {
    var b = this._colLefts, d = b[a + 1] - this._mask[0].clientWidth, c = a;
    if(d <= 0) {
      return 0
    }
    for(;c >= 0;c--) {
      if(c === a && b[c] <= d || b[c] === d) {
        return c
      }
      if(b[c] < d) {
        return c + 1
      }
    }
    return 0
  };
  b.getScrollHForSafe = function(a) {
    var b = this._colLefts, d = b[a + 1] - this._mask[0].clientWidth;
    return b[a] <= d ? b[a] : d
  };
  b._getRenderRange = function() {
    if(this._options.autoHeight) {
      return{start:0, end:this.grid.dataMgr.datalist.length - 1}
    }
    var a, b = this.grid.dataMgr.datalist.length - 1;
    return{start:(a = this._getFirstVisibleRow() - this._options.bufferSize) < 0 ? 0 : a, end:(a = this._getLastVisibleRow() + this._options.bufferSize) > b ? b : a}
  };
  b._fitHeight = function() {
    this._mask[0].style.height = this.getCanvasHeight() + this._heightPlus() + "px"
  };
  b._resizeWidth = function() {
    this._options.autoHeight && this._fitHeight()
  };
  b.onAfterRefresh = function(a) {
    a !== void 0 && a.noRerender === !0 || this._rerender()
  };
  b._rerender = function() {
    var a = this.getScrollTop(), b = this.getScrollLeft();
    this.grid.event.trigger("onBeforeRerender");
    this.unlockAllRows();
    this._removeRows();
    var d = this.grid.dataMgr.datalist.length;
    if(this._vars._lastRowLen !== d) {
      this._vars._lastRowLen = d, this._setCanvasHeight(this._calCanvasHeight())
    }
    this._render();
    this.setScrollTop(a);
    this.setScrollLeft(b);
    this.grid.event.trigger("onAfterRerender")
  };
  b._render = function(a) {
    this._removeAndRenderRows(a)
  };
  b._renderShift = function(a) {
    d.isNull(a) && (a = this._getRenderRange());
    this._removeRowsExcept(a);
    this._appendRows(a)
  };
  b._removeRows = function(a) {
    var b = this._canvas[0], c = this._renderedRows, f = this._lockedRows, i;
    if(d.isNull(a)) {
      if(this._lockExist()) {
        for(i in c) {
          c.hasOwnProperty(i) && f.hasOwnProperty(i) && (b.removeChild(c[i]), delete c[i])
        }
      }else {
        this._renderedRows = {}, b.innerHTML = ""
      }
    }else {
      for(var l = a.start, a = a.end, k = this.grid.dataMgr;l <= a;l++) {
        if(!f.hasOwnProperty(i = k.getIdByIdx(l)) && c.hasOwnProperty(i)) {
          b.removeChild(c[i]), delete c[i]
        }
      }
    }
  };
  b._removeRowsExcept = function(a) {
    var b = this._canvas[0], c = this._renderedRows, f = this._lockedRows, i;
    if(d.isNull(a)) {
      if(this._lockExist()) {
        for(i in c) {
          c.hasOwnProperty(i) && f.hasOwnProperty(i) === !1 && (b.removeChild(c[i]), delete c[i])
        }
      }else {
        this._renderedRows = {}, b.innerHTML = ""
      }
    }else {
      var l = a.start, a = a.end, k = this.grid.dataMgr, m;
      for(i in c) {
        if(c.hasOwnProperty(i) && !(f.hasOwnProperty(i) || l <= (m = k.getIdxById(i)) && m <= a)) {
          b.removeChild(c[i]), delete c[i]
        }
      }
    }
  };
  b.destroyRow = function(a) {
    return this.destroyRowById(this.grid.dataMgr.getId(a))
  };
  b.destroyRowById = function(a) {
    d.isNotNull(a) && (this.unlockRowById(a), this._renderedRows.hasOwnProperty(a) && (this._canvas[0].removeChild(this._renderedRows[a]), delete this._renderedRows[a]))
  };
  b.destroyRowByIdx = function(a) {
    return this.destroyRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b._lockExist = function() {
    return d.isNotEmptyObj(this._lockedRows)
  };
  b.isRowLockedById = function(a) {
    return d.isNotNull(a) ? this._lockedRows.hasOwnProperty(a) : !1
  };
  b.isRowLocked = function(a) {
    return this.isRowLockedById(this.grid.dataMgr.getId(a))
  };
  b.isRowLockedByIdx = function(a) {
    return this.isRowLockedById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.lockRowById = function(a) {
    d.isNotNull(a) && this.grid.dataMgr.hasById(a) && (this._lockedRows[a] = !0)
  };
  b.lockRow = function(a) {
    return this.lockRowById(this.grid.dataMgr.getId(a))
  };
  b.lockRowByIdx = function(a) {
    return this.lockRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.unlockRowById = function(a) {
    this.isRowLockedById(a) && delete this._lockedRows[a]
  };
  b.unlockRow = function(a) {
    return this.unlockRowById(this.grid.dataMgr.getId(a))
  };
  b.unlockRowByIdx = function(a) {
    return this.unlockRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.unlockAllRows = function() {
    this._lockedRows = {}
  };
  b.rerenderRowById = function(a) {
    if(this.grid.dataMgr.containsById(a)) {
      var b = this._renderedRows, c = this._canvas[0], f = this.grid.dataMgr, i = f.getIdxById(a), f = f.getById(a), l = this.grid.colDefMgr.get(), k = this._getColCellClasses(l), m = this._getRowOuterHeight(), j = [];
      b.hasOwnProperty(a) && (c.removeChild(b[a]), this.grid.event.trigger("onBeforeRenderRows", [[i]]), this._renderRow(j, i, f, l, k, m), b[a] = d.appendHTML(c, j.join(""))[0], this.grid.event.trigger("onAppendRows", [[i]]))
    }
  };
  b.rerenderRow = function(a) {
    return this.rerenderRowById(this.grid.dataMgr.getId(a))
  };
  b.rerenderRowByIdx = function(a) {
    return this.rerenderRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.rerenderCellByIdAndKey = function(a, b) {
    var d = this.getCellByIdAndKey(a, b);
    if(d !== void 0) {
      var c = this.grid.dataMgr, f = this.grid.colDefMgr, l = c.getById(a), k = f.getByKey(b), c = c.getIdxById(a), f = f.getIdxByKey(b);
      d.innerHTML = this._renderCell([], c, f, l, k).join("")
    }
  };
  b.rerenderCellByIdx = function(a, b) {
    return this.rerenderCellByIdAndKey(this.grid.dataMgr.getIdByIdx(a), this.grid.colDefMgr.getKeyByIdx(b))
  };
  b._appendRows = function(a) {
    this.grid.event.trigger("onBeforeRenderRows", [a]);
    for(var b = [], c = a.start, f = a.end, i = this.grid.dataMgr.datalist, l = this.grid.dataMgr.idKey, k = this.grid.colDefMgr.get(), m = this._getColCellClasses(k), j = this._renderedRows, o = this._getRowOuterHeight(), n = this._canvas[0], q, p, r = [];c <= f;c++) {
      if(q = i[c], !j.hasOwnProperty(p = q[l])) {
        this._renderRow(b, c, q, k, m, o), r.push(p)
      }
    }
    b = d.appendHTML(n, b.join(""));
    c = 0;
    for(f = r.length;c < f;c++) {
      j[r[c]] = b[c]
    }
    this.grid.event.trigger("onAppendRows", [a])
  };
  b._removeAndRenderRows = function(a) {
    d.isNull(a) && (a = this._getRenderRange());
    this.grid.event.trigger("onBeforeRenderRows", [a]);
    for(var b = [], c = a.start, f = a.end, i = this.grid.dataMgr, l = i.datalist, k = i.idKey, m = this.grid.colDefMgr.get(), j = this._getColCellClasses(m), i = this._canvas[0], o = this._getRowOuterHeight(), n, q = [], p = {};c <= f;c++) {
      n = l[c], this._renderRow(b, c, n, m, j, o), q.push(n[k])
    }
    i.innerHTML = b.join("");
    c = 0;
    for(b = q.length;c < b;c++) {
      p[q[c]] = i.childNodes[c]
    }
    this._renderedRows = p;
    this.grid.event.trigger("onAppendRows", [a])
  };
  b._getColCellClass = function(a) {
    var b = this._options.classCell + " k_" + a.key;
    d.isNotNull(a.colClass) && (b += " " + a.colClass);
    b += " " + this.grid.event.trigger("onGetColCellClass", [a]).join(" ");
    return b
  };
  b._getColCellClasses = function(a) {
    var b = [], c = 0, f = a.length;
    for(d.isNull(a) && (a = this.grid.colDefMgr.get());c < f;c++) {
      b.push(this._getColCellClass(a[c]))
    }
    return b
  };
  b._renderRow = function(a, b, d, c, f, l) {
    a.push("<div class='" + this._options.classRow + "' i='" + d[this.grid.dataMgr.idKey] + "' " + this._options.attrRowIdx + "='" + b + "' style='top:" + l * b + "px'>");
    for(var l = 0, k = c.length;l < k;l++) {
      a.push("<div class='" + f[l] + " " + this.grid.event.trigger("onGetCellClass", [b, l, d, c[l]]).join(" ") + "'>"), this._renderCell(a, b, l, d, c[l]), a.push("</div>")
    }
    a.push("</div>");
    return a
  };
  b._renderCell = function(a, b, d, c, i) {
    this.grid.event.trigger("onRenderCell_" + i.key + "_prepend", [b, d, c, i, a]);
    var l = c[i.key];
    if(typeof l !== "string" || l.substring(0, 3) !== "J@H") {
      i.rendererInput ? a.push(i.renderer(f.create("Cell", {grid:this.grid, row:b, col:d, datarow:c, colDef:i}))) : a.push(i.renderer(l, b, d, c, i, this))
    }
    this.grid.event.trigger("onRenderCell_" + i.key + "_append", [b, d, c, i, a]);
    return a
  };
  f.Cell.prototype.rerender = function() {
    return this.grid.view.rerenderCellByIdAndKey(this.getId(), this.getKey())
  };
  f.Cell.prototype.scrollTo = function() {
    this.grid.view.scrollTo(this.getRowIdx(), this.getColIdx())
  };
  b._keydown = function(a) {
    d.contains(this._mask[0], document.activeElement, this._ctnr[0]) && this.grid.event.trigger("keydownCanvas_" + a.which + " keydownCanvas", [a])
  };
  b._keyup = function(a) {
    d.contains(this._mask[0], document.activeElement, this._ctnr[0]) && this.grid.event.trigger("keyupCanvas_" + a.which + " keyupCanvas", [a])
  };
  b._keypress = function(a) {
    d.contains(this._mask[0], document.activeElement, this._ctnr[0]) && this.grid.event.trigger("keypressCanvas_" + a.which + " keypressCanvas", [a])
  };
  b._mousein = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"draginCanvas mouseinCanvas"}) : this._triggerMouseEvent(a, {event:"mouseinCanvas"})
  };
  b._mouseout = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"dragoutCanvas mouseoutCanvas"}) : this._triggerMouseEvent(a, {event:"mouseoutCanvas"})
  };
  b._mouseenter = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"dragenterCanvas mouseenterCanvas"}) : this._triggerMouseEvent(a, {event:"mouseenterCanvas"})
  };
  b._mouseleave = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"dragleaveCanvas mouseleaveCanvas"}) : this._triggerMouseEvent(a, {event:"mouseleaveCanvas"})
  };
  b._mousemove = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"dragmoveCanvas mousemoveCanvas"}) : this._triggerMouseEvent(a, {event:"mousemoveCanvas"})
  };
  b._mouseover = function(a) {
    this._vars.drag ? this._triggerMouseEvent(a, {event:"dragoverCanvas mouseoverCanvas"}) : this._triggerMouseEvent(a, {event:"mouseoverCanvas"})
  };
  b._mousedown = function(a) {
    if(this._triggerMouseEvent(a, {event:"mousedownCanvas"})) {
      this._vars.drag = !0, this.focus(a)
    }
  };
  b._mouseup = function(a) {
    this._vars.drag = !1;
    this._triggerMouseEvent(a, {event:"mouseupCanvas"}) && this.focus(a)
  };
  b._click = function(a) {
    this._triggerMouseEvent(a, {event:"clickCanvas"})
  };
  b._dblclick = function(a) {
    this._triggerMouseEvent(a, {event:"dblclickCanvas"})
  };
  b._triggerMouseEvent = function(a, b) {
    var c = this._getClosestCell(a.target), h, i, l;
    if(c === void 0) {
      return!1
    }
    b.cell = f.create("Cell", {grid:this.grid, node:c});
    c = d.split(b.event);
    l = c.length;
    h = [];
    for(i = 0;i < l;i++) {
      h.push(c[i] + "_" + b.cell.getKey()), h.push(c[i])
    }
    this.grid.event.trigger(h.join(" "), [a, b.cell]);
    return!0
  };
  b._scroll = function() {
    var a = this.getScrollTop(), b = a - this._vars._lastScrollTop, d = this.getScrollLeft(), c = d - this._vars._lastScrollLeft;
    if(!(b === 0 && c === 0)) {
      this.grid.event.trigger("onScrollViewport");
      if(c !== 0) {
        this._vars._lastScrollLeft = d, this.grid.event.trigger("onScrollViewportH", [d])
      }
      if(!(Math.abs(b / this._getRowOuterHeight()) < this._options.appendThreshold)) {
        this._vars._lastScrollTop = a, this._render(), this.grid.event.trigger("onScrollViewportV")
      }
    }
  };
  b.focus = function(a) {
    if((!d.isNotNull(a) || !this.grid.event.triggerInvalid("onBeforeFocusCanvas", [a])) && this._mask[0] !== document.activeElement) {
      if(d.isFunction(this._mask[0].setActive)) {
        try {
          this._mask[0].setActive()
        }catch(b) {
        }
      }
      this._mask[0].focus();
      document.activeElement !== this._mask[0] && this._mask.focus()
    }
  };
  b.isRenderedById = function(a) {
    return d.isNotNull(a) ? this._renderedRows.hasOwnProperty(a) : !1
  };
  b.isRendered = function(a) {
    return this.isRenderedById(this.grid.dataMgr.getId(a))
  };
  b.isRenderedByIdx = function(a) {
    return this.isRenderedById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.getRowById = function(a) {
    if(this.isRenderedById(a)) {
      return this._renderedRows[a]
    }
  };
  b.getRow = function(a) {
    return this.getRowById(this.grid.dataMgr.getId(a))
  };
  b.getRowByIdx = function(a) {
    return this.getRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.getRenderedRowById = function(a) {
    if(this.isRenderedById(a)) {
      return this._renderedRows[a]
    }
  };
  b.getRenderedRow = function(a) {
    return this.getRenderedRowById(this.grid.dataMgr.getId(a))
  };
  b.getRenderedRowByIdx = function(a) {
    return this.getRenderedRowById(this.grid.dataMgr.getIdByIdx(a))
  };
  b.getRenderedRows = function() {
    return d.toArray(this._renderedRows)
  };
  b.getCell = function(a, b) {
    var c = this.getRowByIdx(a);
    if(d.isNotNull(c, b)) {
      return c.childNodes[b]
    }
  };
  b.getCellByIdAndKey = function(a, b) {
    var c = this.getRowById(a), f = this.grid.colDefMgr.getIdxByKey(b);
    if(d.isNotNullAnd(c, f)) {
      return c.childNodes[f]
    }
  };
  b.getRenderedCell = function(a, b) {
    var c = this.getRenderedRowByIdx(a);
    if(d.isNotNull(c)) {
      return c.childNodes[b]
    }
  };
  b.getRenderedCellByIdAndKey = function(a, b) {
    var c = this.getRenderedRowById(a), f = this.grid.colDefMgr.getIdxByKey(b);
    if(d.isNotNullAnd(c, f)) {
      return c.childNodes[f]
    }
  };
  b._getClosestCell = function(a) {
    return d.closestWithTag(a, "DIV", this._options.classCell, this._canvas[0])
  };
  b._getClosestRow = function(a) {
    return d.closestWithTag(a, "DIV", this._options.classRow, this._canvas[0])
  };
  b._getClosestRowIdx = function(a) {
    return this.grid.dataMgr.getIdxByNode(this._getClosestRow(a))
  };
  b._canvasFind = function(a) {
    return this._canvas.find(a)
  };
  c._renderer = function(a) {
    return d.ifNull(a, "")
  }
})();
jx.grid.DataCreator = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = a.container;
    this.grid = a.grid;
    this.grid.creator = this;
    this._options = f._extend({background:"#dfdfdf", borderThickness:0, border:"solid #D6D6D6", inputBorder:"solid #A7A7A7", inputBorderThickness:1, inputHeight:18, inputMargin:8, nameMargin:2, font:"12px Arial,Helvetica,sans-serif", height:28, padding:3, classCreatorIcon:"creator-icon", creatorIconUrl:this.grid._options.imageUrl + "data-creator-icon.png", creatorIconWidth:13, creatorIconHeight:13, classCreator:"data-creator", classColName:"data-creator-name", inputBorderRadius:3}, a.options);
    this._inputMap = {};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.DataCreator", c);
  f._add("DataCreator", c);
  c.getInstance = function(a) {
    return new c(a)
  };
  var b = c.prototype;
  b.__init = function() {
    this._creator = $("<div class='" + this._options.classCreator + "'>").appendTo(this._ctnr);
    this.bindEvents()
  };
  b.bindEvents = function() {
    this.grid.event.bind({onRenderModules:this._onRenderModules, onCreateCss:this._onCreateCss, onDestroy:this._destroy}, this)
  };
  b._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, c = [];
    c.push(a + b.classCreator + "{" + f._CONST._cssUnselectable + "float:left;width:100%;padding-left:8px;background:" + b.background + ";border-top:" + (b.borderThickness + "px " + b.border) + ";font:" + b.font + "}");
    c.push(a + b.classCreator + " button{float:left;margin:" + b.padding + "px " + b.padding + "px 0 0;height:" + (b.height - 2 * b.padding) + "px}");
    c.push(a + b.classCreator + " input{float:left;padding:0;margin-top:" + (b.height - b.inputHeight - 2 * b.inputBorderThickness) / 2 + "px;height:" + b.inputHeight + "px;border:" + b.inputBorderThickness + "px " + b.inputBorder + ";border-radius:" + b.inputBorderRadius + "px;-moz-border-radius:" + b.inputBorderRadius + "px}");
    c.push(a + b.classCol + "{float:left;overflow:hidden;white-space:nowrap;line-height:" + b.height + "px;margin-right:" + b.inputMargin + "px}");
    c.push(a + b.classColName + "{float:left;margin-right:" + b.nameMargin + "px}");
    c.push(a + b.classCreatorIcon + "{background:url(" + b.creatorIconUrl + ") no-repeat center;width:" + b.creatorIconWidth + "px;height:" + b.creatorIconHeight + "px}");
    return c.join("")
  };
  b._onRenderModules = function() {
    for(var a = [], b = this.grid.colDefMgr.getAll(), c = b.length, f, i = this._options, l = i.classCol, k = i.classColName, m = this, j = this._creator, o = this._inputMap, n = 0, q = function(a) {
      a.which === d.keyMapKeydown.enter && m._addData()
    };n < c;n++) {
      f = b[n], f.inputOnCreate === !0 && a.push("<div key='" + f.key + "' class='" + l + "'><div class='" + k + "'>" + f.name + "</div><input type='text' value='" + d.ifNull(f.defaultValue, "") + "' style='width:" + f.width + "px'/></div>")
    }
    j[0].innerHTML = a.join("") + "<button type='button' onclick='JGM.m.DataCreator." + this.mid + "._addData()'>등록</button><button type='button' onclick='JGM.m.DataCreator." + this.mid + "._reset()'>초기화</button>";
    for(n = 0;n < c;n++) {
      f = b[n], f.inputOnCreate === !0 && (o[f.key] = j.find("div[key='" + f.key + "'] input").keyup(q))
    }
    d.isNotNull(this.grid.menubar) && (this.grid.menubar.addIcon(i.classCreatorIcon, "데이터 로우를 추가합니다.", i.creatorIconWidth, i.creatorIconHeight, function() {
      j.toggle("fast")
    }), j.hide())
  };
  b._addData = function() {
    var a, b = this._inputMap, c = this.grid.colDefMgr, d = {}, f = c.getAll(), l = f.length, k = 0;
    for(a in b) {
      b.hasOwnProperty(a) && c.getByKey(a)
    }
    for(;k < l;k++) {
      c = f[k], a = c.key, b.hasOwnProperty(a) ? d[a] = b[a][0].value : c.defaultValue !== void 0 && (d[a] = c.defaultValue)
    }
    this.grid.event.trigger("onAfterDataCreate", [d]);
    this.grid.dataMgr.add(d, {isNew:!0})
  };
  b._reset = function() {
    var a, b = this.grid.colDefMgr, c, d = this._inputMap;
    for(a in d) {
      if(d.hasOwnProperty(a) && (c = b.getByKey(a), c.defaultValue !== void 0)) {
        d[a][0].value = c.defaultValue
      }
    }
  };
  b._destroy = function() {
    var a, b = this._inputMap;
    for(a in b) {
      b.hasOwnProperty(a) && f._delete$(b, a)
    }
    f._destroy(this, {name:"DataCreator", path:"creator", $:"creator", map:"inputMap _options"})
  }
})();
jx.grid.SearchManager = {};
(function() {
  function c(a) {
    this.mid = a.mid;
    this._ctnr = a.container;
    this.grid = a.grid;
    this.grid.search = this;
    this._options = f._extend({background:"#f0f0f0", borderThickness:1, border:"solid #d6d6d6", inputBorder:"1px solid #A7A7A7", inputPadding:0, searchbarAlign:"center", searchbarMargin:3, searchbarWidth:"99%", searchbarHeight:20, tagsHeight:26, tagsPadding:2, tagsBorderRadius:3, advButtonColor:"#123272", advButtonFont:"bold 12px Arial,Helvetica,sans-serif", advButtonPadding:5, advButtonBg:"", advButtonBgHover:"url(" + this.grid._options.imageUrl + "more-options-bg-hover.png) repeat-x scroll center", 
    advButtonBgActive:"url(" + this.grid._options.imageUrl + "more-options-bg-active.png) repeat-x scroll center", advButtonBgOpened:"url(" + this.grid._options.imageUrl + "more-options-bg-opened.png) repeat-x scroll center", advButtonBorderThickness:1, advButtonBorder:"solid transparent", advButtonBorderHover:"solid #a4a4a4", advButtonBorderActive:"solid #c5c5c5", advButtonBorderOpened:"solid #bfbfbf", advButtonIconWidth:9, advButtonIconMargin:2, advButtonIconUrl:this.grid._options.imageUrl + "more-options.png", 
    advButtonIconCloseUrl:this.grid._options.imageUrl + "more-options-close.png", tagPadding:2, tagBorder:"solid #93979D", tagBorderThickness:1, tagFont:"bold 13px Arial", tagColor:"#282853", tagBackground:"url(" + this.grid._options.imageUrl + "tag-background.png) repeat-x scroll center", tagRemoveIconWidth:12, tagRemoveIconUrl:this.grid._options.imageUrl + "tag-close.png", tagRemoveIconHoverUrl:this.grid._options.imageUrl + "tag-close-hover.png", advFont:"11px Arial", advInputWidth:30, classMask:"search-mask", 
    classSearchbar:"search-bar", classAdvButtonName:"more-option-name", classAdvButton:"more-options", classAdvButtonIcon:"more-icon", classClearTags:"clear-tags", classTagbar:"search-tags", classTag:"search-tag", classTagName:"search-tag-name", classRemoveTag:"search-tag-remove", classAdvanced:"search-advanced", classOptionCol:"search-option-col", classOption:"search-option", classSearchIcon:"search-icon", searchIconUrl:this.grid._options.imageUrl + "search-icon.png", searchIconWidth:15, searchIconHeight:15, 
    keyMap:void 0, tagRemoveIconActiveUrl:this.grid._options.imageUrl + "tag-close-active.png", syncMaster:!1}, a.options);
    this._filterMap = {};
    this._tagMap = {};
    this._nameMap = {};
    this._codeMap = {};
    this._global = [];
    this._globalMap = {};
    this._keyToName = {};
    this.__init()
  }
  var f = goog.getObjectByName("jx.grid"), d = goog.getObjectByName("jx.util");
  goog.getObjectByName("jx.grid.BaseModule");
  goog.exportSymbol("jx.grid.SearchManager", c);
  f._add("SearchManager", c);
  var b = c.prototype;
  b._onCreateCss = function() {
    var a = "#" + this.grid.mid + " .", b = this._options, c = b.borderThickness + "px " + b.border, d = "border-radius:" + b.tagsBorderRadius + "px;-moz-border-radius:" + b.tagsBorderRadius + "px", e = b.advButtonBorderThickness + "px " + b.advButtonBorder, g = b.advButtonBorderThickness + "px " + b.advButtonBorderHover, h = b.advButtonBorderThickness + "px " + b.advButtonBorderActive, i = b.advButtonBorderThickness + "px " + b.advButtonBorderOpened, j = b.tagsHeight - 2 * b.tagsPadding, l = j - 
    2 * b.advButtonBorderThickness, k = j - 2 * b.tagBorderThickness, m = a + b.classMask, n = a + b.classSearchbar, o = a + b.classAdvButton, q = a + b.classRemoveTag, p = [];
    p.push(m + "{" + f._CONST._cssUnselectable + "overflow:hidden;width:100%;background:" + b.background + "}");
    p.push(m + " button{margin:0;padding:0 3px}");
    p.push(m + " input{border:" + b.inputBorder + ";padding:" + b.inputPadding + "}");
    p.push(n + "{text-align:" + b.searchbarAlign + ";border-bottom:" + c + "}");
    p.push(n + " input{width:" + b.searchbarWidth + ";margin:" + b.searchbarMargin + "px 0;height:" + b.searchbarHeight + "px;" + d + "}");
    p.push(a + b.classTagbar + "{cursor:default;height:" + (b.tagsHeight - b.tagsPadding) + "px;padding:" + b.tagsPadding + "px 0 0 " + b.tagsPadding + "px;border-bottom:" + c + "}");
    p.push(o + "{float:left;margin-right:" + b.tagsPadding + "px;background:" + b.advButtonBg + ";border:" + e + ";padding:0 " + b.advButtonPadding + "px;" + d + "}");
    p.push(o + ":hover{background:" + b.advButtonBgHover + ";border:" + g + "}");
    p.push(o + ".opened{background:" + b.advButtonBgOpened + ";border:" + i + "}");
    p.push(o + ":active{background:" + b.advButtonBgActive + ";border:" + h + "}");
    p.push(a + b.classAdvButtonName + "{float:left;color:" + b.advButtonColor + ";font:" + b.advButtonFont + ";line-height:" + l + "px}");
    p.push(a + b.classAdvButtonIcon + "{float:left;height:" + l + "px;margin-left:" + b.advButtonIconMargin + "px;background:url(" + b.advButtonIconUrl + ") no-repeat center;width:" + b.advButtonIconWidth + "px}");
    p.push(o + ".opened ." + b.classAdvButtonIcon + "{background:url(" + b.advButtonIconCloseUrl + ") no-repeat center}");
    p.push(a + b.classTag + "{float:left;border:" + b.tagBorderThickness + "px " + b.tagBorder + ";margin:0 " + b.tagsPadding + "px " + b.tagsPadding + "px 0;padding:0 " + b.tagPadding + "px;background:" + b.tagBackground + ";" + d + "}");
    p.push(a + b.classTagName + "{float:left;color:" + b.tagColor + ";font:" + b.tagFont + ";line-height:" + k + "px}");
    p.push(q + "{float:left;margin-left:" + b.tagPadding + "px;background:url(" + b.tagRemoveIconUrl + ") no-repeat center;width:" + b.tagRemoveIconWidth + "px;height:" + k + "px}");
    p.push(q + ":hover{background:url(" + b.tagRemoveIconHoverUrl + ") no-repeat center}");
    p.push(q + ":active{background:url(" + b.tagRemoveIconActiveUrl + ") no-repeat center}");
    p.push(a + b.classClearTags + "{height:" + j + "px}");
    p.push(a + b.classAdvanced + "{cursor:default;font:" + b.advFont + ";border-bottom:" + c + "}");
    p.push(a + b.classOptionCol + "{display:inline-block;vertical-align:top}");
    p.push(a + b.classOptionCol + " input{width:" + b.advInputWidth + "px;margin-right:2px;" + d + "}");
    p.push(a + b.classSearchIcon + "{background:url(" + b.searchIconUrl + ") no-repeat center;width:" + b.searchIconWidth + "px;height:" + b.searchIconHeight + "px}");
    return p.join("")
  };
  c.getInstance = function(a) {
    return new c(a)
  };
  b.__init = function() {
    var a = this._options, b = this, c, e, f;
    c = this._mask = $("<div class='" + a.classMask + "'>").prependTo(this._ctnr);
    this._search = $("<div class='" + a.classSearchbar + "'><input type='text'/></div>").appendTo(c);
    this._masterInput = this._search.children(":eq(0)").keyup(function(a) {
      a.which === d.keyMapKeydown.enter ? b._parse($(this)[0].value) : a.which === d.keyMapKeydown.esc && b._removeAllOptions()
    });
    e = this._hasFilter = this.grid.colDefMgr.get().some(function(a) {
      return d.isNotNull(a.filter)
    });
    f = this._tag = $("<div class='" + a.classTagbar + "'>" + (e ? "<div class='" + a.classAdvButton + "'><div class='" + a.classAdvButtonName + "'>추가 옵션</div><div class='" + a.classAdvButtonIcon + "'></div></div>" : "") + "<button type='button' class='" + a.classClearTags + "' onclick='JGM.m.SearchManager." + this.mid + "._removeAllOptions()'>모든 필터 제거</button></div>").appendTo(c);
    if(e) {
      var g = this._adv = $("<div class='" + a.classAdvanced + "'>").appendTo(c).hide().keyup(function(a) {
        if(a.which === d.keyMapKeydown.enter) {
          var c = a.target.getAttribute("key");
          b._registerOption(c, b._keyToName[c], a.target.getAttribute("tag"), a.target.value);
          a.target.value = ""
        }
      });
      this._advButton = f.children(":eq(0)").click(function() {
        $(this).toggleClass("opened");
        g.toggle("fast")
      })
    }
    this.grid.event.bind({onRenderModules:this._onRenderModules, onCreateCss:this._onCreateCss, onFilter:this._onFilter, onDestroy:this._destroy, onAfterRenderModules:this._onAfterRenderModules}, this)
  };
  b._onRenderModules = function() {
    var a = [], b = this._options, c = this._mask;
    if(this._hasFilter) {
      for(var e = this.grid.colDefMgr.get(), f = e.length, g = b.keyMap, h = this._nameMap, i = this._keyToName, j, l, k, m = 0;m < f;m++) {
        if(j = e[m], d.isNotNull(j.filter)) {
          k = j.key, l = d.isNull(g) || !g.hasOwnProperty(k) ? j.name || k : g[k], h[l] = k, i[k] = l, a.push("<div class='" + b.classOptionCol + "'>"), this._registerFilter(k, l, j.name, j.filter, a), a.push("</div>")
        }
      }
      this._adv[0].innerHTML = a.join("")
    }
    d.isNotNull(this.grid.menubar) && (this.grid.menubar.addIcon(b.classSearchIcon, "데이터 검색을 합니다.", b.searchIconWidth, b.searchIconHeight, function() {
      c.toggle("fast")
    }), c.hide())
  };
  b._onAfterRenderModules = function() {
    var a = this._filterMap, b, c, d, e, f = this._adv;
    for(c in a) {
      if(a.hasOwnProperty(c)) {
        for(d in b = a[c], b) {
          if(b.hasOwnProperty(d) && d !== "andor" && d !== "parser" && d !== "validator") {
            (e = b[d]).input = f.find("#" + c + e.option.name)
          }
        }
      }
    }
  };
  b._destroy = function() {
    var a, b, c, d = this._globalMap, e = this._filterMap, g = this._tagMap;
    for(a in d) {
      d.hasOwnProperty(a) && (f._delete$(d[a], "tag"), f._deleteArray(d[a], "list"))
    }
    for(a in e) {
      if(e.hasOwnProperty(a)) {
        d = e[a];
        for(b in d) {
          d.hasOwnProperty(b) && (b !== "andor" && b !== "parser" && b !== "validator" && f._delete$(d[b], "input"), f._deleteMap(d, b))
        }
        f._deleteMap(e, a)
      }
    }
    for(a in g) {
      if(g.hasOwnProperty(a)) {
        e = g[a];
        for(b in e) {
          if(e.hasOwnProperty(b)) {
            d = e[b];
            for(c in d) {
              d.hasOwnProperty(c) && (f._delete$(d[c], "tag"), f._deleteMap(d, c))
            }
            f._deleteMap(e, b)
          }
        }
        f._deleteMap(g, a)
      }
    }
    f._destroy(this, {name:"SearchManager", path:"search", $:"masterInput _advButton _mask _search _tag _adv", property:"ctnr _hasFilter", array:"global", map:"globalMap _filterMap _tagMap _codeMap _nameMap _options _keyToName"})
  };
  b._onFilter = function(a, b) {
    if(!(this._global.length === 0 && d.isEmptyObj(this._codeMap))) {
      var c, e = this._tagMap, f, g, h = a.length, i, j = this._filterMap, l = this.constructor.CONST.and, k, m = this._global.length > 0, n, o;
      if(m) {
        var p = this._global, q;
        i = this.grid.colDefMgr.get().filter(function(a) {
          return!a.noSearch
        });
        var r = i.length, s = [];
        for(n = 0;n < r;n++) {
          s.push(i[n].key)
        }
      }
      n = h - 1;
      a:for(;n >= 0;n--) {
        h = a[n];
        if(m) {
          i = p.slice();
          c = 0;
          for(;i.length !== 0 && c < r;c++) {
            if(!d.isNull(q = h[s[c]])) {
              d.isString(q) || (q = q.toString());
              for(o = i.length - 1;o >= 0;o--) {
                q.indexOf(i[o]) !== -1 && i.removeAt(o)
              }
            }
          }
          if(i.length !== 0) {
            a.removeAt(n);
            b.push(h);
            continue a
          }
        }
        for(f in e) {
          if(e.hasOwnProperty(f)) {
            if(o = e[f], c = j[f].andor, i = h[f], c === l) {
              for(g in o) {
                if(o.hasOwnProperty(g)) {
                  for(k in c = o[g], c) {
                    if(c.hasOwnProperty(k) && !c[k].fn(i)) {
                      a.removeAt(n);
                      b.push(h);
                      continue a
                    }
                  }
                }
              }
            }else {
              for(g in o) {
                if(o.hasOwnProperty(g)) {
                  for(k in c = o[g], c) {
                    if(c.hasOwnProperty(k) && c[k].fn(i)) {
                      continue a
                    }
                  }
                }
              }
              a.removeAt(n);
              b.push(h);
              continue a
            }
          }
        }
      }
    }
  };
  b._registerFilter = function(a, b, c, d, e) {
    if(!this._filterMap.hasOwnProperty(a)) {
      if(d === "number") {
        d = this.constructor._numberFilter
      }else {
        if(d === "string") {
          d = this.constructor._stringFilter
        }
      }
      var f, g = d.length, h = 0, i = this.mid, j = this._options.classOption, k, l, m, n;
      k = this._filterMap[a] = {andor:this.constructor.CONST.and};
      l = this._tagMap[a] = {};
      for(e.push("<table>");h < g;h++) {
        f = d[h], n = f.name, n === "parser" ? k.parser = f.fn : n === "validator" ? k.validator = f.fn : (m = f.tag, k[m] = {option:f}, l[m] = {}, e.push("<tr title='" + f.comment(c, "입력값") + "'><td><div class='" + j + "'>" + c + " " + m + "</td><td><input id='" + a + n + "' key='" + a + "' tag='" + m + "' type='text'><button type='button' onclick=\"JGM.m.SearchManager." + i + "._registerOption('" + a + "','" + b + "','" + m + "',this.previousSibling.value)\">등록</button></div></td></tr>"))
      }
      e.push("</table>")
    }
  };
  b._parse = function(a) {
    for(var b, c, e, f, g = d.split(a), h = g.length, i = 2, j = !1, k = [], l = this._nameMap, m = this._filterMap, n = 0;n < h;n++) {
      if(a = g[n], a !== "") {
        switch(i) {
          case 0:
            m[b].hasOwnProperty(a) && (e = a, i = 1);
            break;
          case 1:
            f = a;
            i = 2;
            break;
          case 2:
            a.charAt(0) === "@" ? (a = a.substring(1), l.hasOwnProperty(a) ? (d.isNotNullAnd(b, c, e, f) && this._registerOption(b, c, e, f, !0) && (j = !0), b = l[a], c = a, f = e = void 0, i = 0) : d.isNull(b) ? k.push(a) : f += " " + a) : d.isNull(b) ? k.push(a) : f += " " + a
        }
      }
    }
    d.isNotNullAnd(b, c, e, f) && this._registerOption(b, c, e, f, !0) && (j = !0);
    this._registerGlobal(k) && (j = !0);
    this._syncMasterInput();
    j && this.grid.dataMgr.refresh()
  };
  b._syncMasterInput = function() {
    if(this._options.syncMaster) {
      var a = this._global.join(" "), b = this._tagMap, c = this._keyToName, d, e, f, g, h;
      for(d in b) {
        if(b.hasOwnProperty(d)) {
          for(e in g = b[d], g) {
            if(g.hasOwnProperty(e)) {
              for(f in h = g[e], h) {
                h.hasOwnProperty(f) && (a += " @" + c[d] + " " + e + " " + f)
              }
            }
          }
        }
      }
      this._masterInput[0].value = $.trim(a)
    }else {
      this._masterInput[0].value = ""
    }
  };
  b._registerGlobal = function(a) {
    for(var b = 0, c = a.length, d = this._global;b < c;b++) {
      d.indexOf(a[b]) !== -1 ? a.removeAt(b--) : d.push(a[b])
    }
    if(a.length === 0) {
      return!1
    }
    b = this._options;
    this._globalMap[a[0]] = {tag:$("<div class='" + b.classTag + "' title='" + a.join(", ") + " 를 포함하는'><div class='" + b.classTagName + "'>" + a.join(" ") + "</div><div class='" + b.classRemoveTag + "' title='필터 제거' onclick=\"JGM.m.SearchManager." + this.mid + "._removeGlobal('" + a[0] + "')\"></div></div>").appendTo(this._tag), list:a};
    return!0
  };
  b._removeGlobal = function(a) {
    var b = this._globalMap;
    if(b.hasOwnProperty(a)) {
      var c = b[a];
      c.tag.remove();
      delete c.tag;
      this._global.removeList(c.list);
      c.list.length = 0;
      delete c.list;
      delete b[a];
      this._syncMasterInput();
      this.grid.dataMgr.refresh()
    }
  };
  b._registerOption = function(a, b, e, f, g) {
    var h = this._filterMap, i, j = this._codeMap;
    if(h.hasOwnProperty(a) && (i = h[a]).hasOwnProperty(e)) {
      h = i[e];
      if(d.isNull(f)) {
        var k = h.input, f = $.trim(k.val());
        k.val("")
      }else {
        f = $.trim(f)
      }
      if(f.length === 0) {
        return!1
      }
      d.isNotNull(i.parser) && (f = i.parser(f));
      if(j.hasOwnProperty(a + "@T" + e + "@B" + f)) {
        return!1
      }
      if(d.isNotNull(i.validator) && !i.validator(f)) {
        return!1
      }
      h = h.option;
      i = i.andor
    }else {
      return!1
    }
    k = this._tagMap[a];
    if(k[e].hasOwnProperty(f)) {
      return!1
    }
    var l, m, n, o, q = this._filterMap[a], p;
    for(n in k) {
      if(k.hasOwnProperty(n)) {
        for(o in l = k[n], l) {
          l.hasOwnProperty(o) && (p = l[o], m = d.isNotNull(q.parser) ? q.parser(o) : o, c._checkDisable(h.type, p.option.type, i, f, m) && (delete j[a + "@T" + p.option.tag + "@B" + m], p.tag.remove(), delete p.tag, delete p.option, delete p.fn, delete l[o]))
        }
      }
    }
    j[a + "@T" + e + "@B" + f] = !0;
    this._createTag(a, h, f, b);
    g || (this._syncMasterInput(), this.grid.dataMgr.refresh());
    return!0
  };
  b._removeOption = function(a, b, c) {
    var d = this._tagMap, e, f;
    if(d.hasOwnProperty(a) && (e = d[a]).hasOwnProperty(b) && (f = e[b]).hasOwnProperty(c)) {
      d = f[c], d.tag.remove(), delete d.tag, delete d.option, delete d.fn, delete f[c], delete this._codeMap[a + "@T" + b + "@B" + c], this._syncMasterInput(), this.grid.dataMgr.refresh()
    }
  };
  b._removeAllOptions = function() {
    var a, b = this._globalMap, c, d = this._tagMap, e, f, g;
    for(a in b) {
      if(b.hasOwnProperty(a)) {
        c = b[a], c.tag.remove(), delete c.tag, c.list.length = 0, delete c.list, delete b[a]
      }
    }
    this._global.length = 0;
    for(a in d) {
      if(d.hasOwnProperty(a)) {
        for(e in b = d[a], b) {
          if(b.hasOwnProperty(e)) {
            for(f in c = b[e], c) {
              c.hasOwnProperty(f) && (g = c[f], g.tag.remove(), delete g.tag, delete g.option, delete g.fn, delete c[f])
            }
          }
        }
      }
    }
    this._codeMap = {};
    this._syncMasterInput();
    this.grid.dataMgr.refresh()
  };
  b._createTag = function(a, b, c, d) {
    var e = this._options;
    return this._tagMap[a][b.tag][c] = {tag:$("<div class='" + e.classTag + "' title='" + b.comment(d, c) + "'><div class='" + e.classTagName + "'>@" + d + " " + b.tag + " " + c + "</div><div class='" + e.classRemoveTag + "' title='필터 제거' onclick=\"JGM.m.SearchManager." + this.mid + "._removeOption('" + a + "','" + b.tag + "','" + c + "')\"></div></div>").appendTo(this._tag), option:b, fn:b.fn(c)}
  };
  var a = c.CONST = {lt:0, lte:1, eq:2, neq:3, gt:4, gte:5, and:6, or:7, T:8, F:9}, b = a.lt, e = a.gt, g = a.eq, h = a.neq, i = a.and, l = a.or, k = a.T, a = a.F, m = c._comparator = {}, j = m[b] = function(a, b) {
    return a <= b
  }, o = m[e] = function(a, b) {
    return a >= b
  }, n = m[g] = function(a, b) {
    return a === b
  }, k = m[k] = function() {
    return!0
  }, q = c._disableMap = {}, p = q[b] = {}, r = q[e] = {}, s = q[g] = {}, q = q[h] = {};
  m[a] = function() {
    return!1
  };
  p[b] = {};
  p[b][i] = k;
  p[b][l] = k;
  p[e] = {};
  p[e][i] = j;
  p[e][l] = o;
  p[g] = {};
  p[g][i] = k;
  p[g][l] = o;
  p[h] = {};
  p[h][i] = j;
  p[h][l] = k;
  r[b] = {};
  r[b][i] = o;
  r[b][l] = j;
  r[e] = {};
  r[e][i] = k;
  r[e][l] = k;
  r[g] = {};
  r[g][i] = k;
  r[g][l] = j;
  r[h] = {};
  r[h][i] = o;
  r[h][l] = k;
  s[b] = {};
  s[b][i] = k;
  s[b][l] = j;
  s[e] = {};
  s[e][i] = k;
  s[e][l] = o;
  s[g] = {};
  s[g][i] = k;
  s[g][l] = n;
  s[h] = {};
  s[h][i] = k;
  s[h][l] = k;
  q[b] = {};
  q[b][i] = o;
  q[b][l] = k;
  q[e] = {};
  q[e][i] = j;
  q[e][l] = k;
  q[g] = {};
  q[g][i] = k;
  q[g][l] = k;
  q[h] = {};
  q[h][i] = n;
  q[h][l] = k;
  c._checkDisable = function(a, b, c, d, e) {
    try {
      return this._disableMap[a][b][c](d, e)
    }catch(f) {
      return!1
    }
  };
  c._numberFilter = [{name:"gt", tag:">", type:e, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 큰"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b > a
    }
  }}, {name:"gte", tag:">=", type:e, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 크거나 같은"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b >= a
    }
  }}, {name:"lt", tag:"<", type:b, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 작은"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b < a
    }
  }}, {name:"lte", tag:"<=", type:b, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 작거나 같은"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b <= a
    }
  }}, {name:"eq", tag:"=", type:g, comment:function(a, b) {
    return a + " 이(가) " + b + "인"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b === a
    }
  }}, {name:"neq", tag:"!=", type:h, comment:function(a, b) {
    return a + " 이(가) " + b + "이(가) 아닌"
  }, fn:function(a) {
    d.isString(a) && (a = a.toFloat());
    return function(b) {
      return b !== a
    }
  }}, {name:"contains", tag:"*=", comment:function(a, b) {
    return a + " 이(가) 숫자 " + b + "를 포함하는"
  }, fn:function(a) {
    a = d.isNumber(a) ? a.toString() : $.trim(a);
    return function(b) {
      return b.toString().indexOf(a) !== -1
    }
  }}, {name:"parser", fn:function(a) {
    return a.toFloat()
  }}, {name:"validator", fn:function(a) {
    return!isNaN(a)
  }}];
  c._stringFilter = [{name:"to", tag:"<=", type:b, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 사전에서 이전인"
  }, fn:function(a) {
    a = $.trim(a).toLowerCase();
    return function(b) {
      return b.toLowerCase() <= a
    }
  }}, {name:"from", tag:">=", type:e, comment:function(a, b) {
    return a + " 이(가) " + b + "보다 사전에서 이후인"
  }, fn:function(a) {
    a = $.trim(a).toLowerCase();
    return function(b) {
      return b.toLowerCase() >= a
    }
  }}, {name:"equals", tag:"=", type:g, comment:function(a, b) {
    return a + " 이(가) " + b + "와(과) 같은"
  }, fn:function(a) {
    a = $.trim(a).toLowerCase();
    return function(b) {
      return b.toLowerCase() === a
    }
  }}, {name:"notEquals", tag:"!=", type:h, comment:function(a, b) {
    return a + " 이(가) " + b + "이(가) 아닌"
  }, fn:function(a) {
    a = $.trim(a).toLowerCase();
    return function(b) {
      return b.toLowerCase() !== a
    }
  }}, {name:"startsWith", tag:"^=", comment:function(a, b) {
    return a + " 이(가) " + b + "(으)로 시작하는"
  }, fn:function(a) {
    var a = $.trim(a).toLowerCase(), b = a.length;
    return function(c) {
      return c.substr(0, b).toLowerCase() === a
    }
  }}, {name:"endsWith", tag:"$=", comment:function(a, b) {
    return a + " 이(가) " + b + "(으)로 끝나는"
  }, fn:function(a) {
    var a = $.trim(a).toLowerCase(), b = a.length;
    return function(c) {
      return c.substr(c.length - b, c.length).toLowerCase() === a
    }
  }}, {name:"contains", tag:"*=", comment:function(a, b) {
    return a + " 이(가) " + b + "을(를) 포함하는"
  }, fn:function(a) {
    a = $.trim(a).toLowerCase();
    return function(b) {
      return b.toLowerCase().indexOf(a) !== -1
    }
  }}, {name:"containsAny", tag:"|=", comment:function(a, b) {
    return a + " 이(가) " + b + "들 중 하나 이상을 포함하는"
  }, fn:function(a) {
    var a = a.toLowerCase(), b = d.split(a), c = b.length;
    return c <= 1 ? function(b) {
      return b.toLowerCase().indexOf(a) !== -1
    } : function(a) {
      for(var a = a.toLowerCase(), d = 0;d < c;d++) {
        if(a.indexOf(b[d]) !== -1) {
          return!0
        }
      }
      return!1
    }
  }}, {name:"containsAll", tag:"&=", comment:function(a, b) {
    return a + " 이(가) " + b + "들 모두를 포함하는"
  }, fn:function(a) {
    var a = a.toLowerCase(), b = d.split(a), c = b.length;
    return c <= 1 ? function(b) {
      return b.toLowerCase().indexOf(a) !== -1
    } : function(a) {
      for(var a = a.toLowerCase(), d = 0;d < c;d++) {
        if(a.indexOf(b[d]) === -1) {
          return!1
        }
      }
      return!0
    }
  }}]
})();
})();
