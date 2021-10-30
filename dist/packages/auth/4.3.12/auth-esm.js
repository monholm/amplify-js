var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined")
    return require.apply(this, arguments);
  throw new Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "../../node_modules/base64-js/index.js"(exports) {
    "use strict";
    exports.byteLength = byteLength;
    exports.toByteArray = toByteArray;
    exports.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code.length; i < len; ++i) {
      lookup[i] = code[i];
      revLookup[code.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// ../../node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "../../node_modules/ieee754/index.js"(exports) {
    exports.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// ../../node_modules/isarray/index.js
var require_isarray = __commonJS({
  "../../node_modules/isarray/index.js"(exports, module) {
    var toString = {}.toString;
    module.exports = Array.isArray || function(arr) {
      return toString.call(arr) == "[object Array]";
    };
  }
});

// ../../node_modules/buffer/index.js
var require_buffer = __commonJS({
  "../../node_modules/buffer/index.js"(exports) {
    "use strict";
    var base64 = require_base64_js();
    var ieee754 = require_ieee754();
    var isArray = require_isarray();
    exports.Buffer = Buffer5;
    exports.SlowBuffer = SlowBuffer;
    exports.INSPECT_MAX_BYTES = 50;
    Buffer5.TYPED_ARRAY_SUPPORT = window.TYPED_ARRAY_SUPPORT !== void 0 ? window.TYPED_ARRAY_SUPPORT : typedArraySupport();
    exports.kMaxLength = kMaxLength();
    function typedArraySupport() {
      try {
        var arr = new Uint8Array(1);
        arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function() {
          return 42;
        } };
        return arr.foo() === 42 && typeof arr.subarray === "function" && arr.subarray(1, 1).byteLength === 0;
      } catch (e) {
        return false;
      }
    }
    function kMaxLength() {
      return Buffer5.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
    }
    function createBuffer(that, length) {
      if (kMaxLength() < length) {
        throw new RangeError("Invalid typed array length");
      }
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        that = new Uint8Array(length);
        that.__proto__ = Buffer5.prototype;
      } else {
        if (that === null) {
          that = new Buffer5(length);
        }
        that.length = length;
      }
      return that;
    }
    function Buffer5(arg, encodingOrOffset, length) {
      if (!Buffer5.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer5)) {
        return new Buffer5(arg, encodingOrOffset, length);
      }
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new Error("If encoding is specified then the first argument must be a string");
        }
        return allocUnsafe(this, arg);
      }
      return from(this, arg, encodingOrOffset, length);
    }
    Buffer5.poolSize = 8192;
    Buffer5._augment = function(arr) {
      arr.__proto__ = Buffer5.prototype;
      return arr;
    };
    function from(that, value, encodingOrOffset, length) {
      if (typeof value === "number") {
        throw new TypeError('"value" argument must not be a number');
      }
      if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
        return fromArrayBuffer(that, value, encodingOrOffset, length);
      }
      if (typeof value === "string") {
        return fromString(that, value, encodingOrOffset);
      }
      return fromObject(that, value);
    }
    Buffer5.from = function(value, encodingOrOffset, length) {
      return from(null, value, encodingOrOffset, length);
    };
    if (Buffer5.TYPED_ARRAY_SUPPORT) {
      Buffer5.prototype.__proto__ = Uint8Array.prototype;
      Buffer5.__proto__ = Uint8Array;
      if (typeof Symbol !== "undefined" && Symbol.species && Buffer5[Symbol.species] === Buffer5) {
        Object.defineProperty(Buffer5, Symbol.species, {
          value: null,
          configurable: true
        });
      }
    }
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be a number');
      } else if (size < 0) {
        throw new RangeError('"size" argument must not be negative');
      }
    }
    function alloc(that, size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(that, size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(that, size).fill(fill, encoding) : createBuffer(that, size).fill(fill);
      }
      return createBuffer(that, size);
    }
    Buffer5.alloc = function(size, fill, encoding) {
      return alloc(null, size, fill, encoding);
    };
    function allocUnsafe(that, size) {
      assertSize(size);
      that = createBuffer(that, size < 0 ? 0 : checked(size) | 0);
      if (!Buffer5.TYPED_ARRAY_SUPPORT) {
        for (var i = 0; i < size; ++i) {
          that[i] = 0;
        }
      }
      return that;
    }
    Buffer5.allocUnsafe = function(size) {
      return allocUnsafe(null, size);
    };
    Buffer5.allocUnsafeSlow = function(size) {
      return allocUnsafe(null, size);
    };
    function fromString(that, string, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer5.isEncoding(encoding)) {
        throw new TypeError('"encoding" must be a valid string encoding');
      }
      var length = byteLength(string, encoding) | 0;
      that = createBuffer(that, length);
      var actual = that.write(string, encoding);
      if (actual !== length) {
        that = that.slice(0, actual);
      }
      return that;
    }
    function fromArrayLike(that, array) {
      var length = array.length < 0 ? 0 : checked(array.length) | 0;
      that = createBuffer(that, length);
      for (var i = 0; i < length; i += 1) {
        that[i] = array[i] & 255;
      }
      return that;
    }
    function fromArrayBuffer(that, array, byteOffset, length) {
      array.byteLength;
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError("'offset' is out of bounds");
      }
      if (array.byteLength < byteOffset + (length || 0)) {
        throw new RangeError("'length' is out of bounds");
      }
      if (byteOffset === void 0 && length === void 0) {
        array = new Uint8Array(array);
      } else if (length === void 0) {
        array = new Uint8Array(array, byteOffset);
      } else {
        array = new Uint8Array(array, byteOffset, length);
      }
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        that = array;
        that.__proto__ = Buffer5.prototype;
      } else {
        that = fromArrayLike(that, array);
      }
      return that;
    }
    function fromObject(that, obj) {
      if (Buffer5.isBuffer(obj)) {
        var len = checked(obj.length) | 0;
        that = createBuffer(that, len);
        if (that.length === 0) {
          return that;
        }
        obj.copy(that, 0, 0, len);
        return that;
      }
      if (obj) {
        if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || "length" in obj) {
          if (typeof obj.length !== "number" || isnan(obj.length)) {
            return createBuffer(that, 0);
          }
          return fromArrayLike(that, obj);
        }
        if (obj.type === "Buffer" && isArray(obj.data)) {
          return fromArrayLike(that, obj.data);
        }
      }
      throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
    }
    function checked(length) {
      if (length >= kMaxLength()) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + kMaxLength().toString(16) + " bytes");
      }
      return length | 0;
    }
    function SlowBuffer(length) {
      if (+length != length) {
        length = 0;
      }
      return Buffer5.alloc(+length);
    }
    Buffer5.isBuffer = function isBuffer(b) {
      return !!(b != null && b._isBuffer);
    };
    Buffer5.compare = function compare(a, b) {
      if (!Buffer5.isBuffer(a) || !Buffer5.isBuffer(b)) {
        throw new TypeError("Arguments must be Buffers");
      }
      if (a === b)
        return 0;
      var x = a.length;
      var y = b.length;
      for (var i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer5.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer5.concat = function concat(list, length) {
      if (!isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer5.alloc(0);
      }
      var i;
      if (length === void 0) {
        length = 0;
        for (i = 0; i < list.length; ++i) {
          length += list[i].length;
        }
      }
      var buffer = Buffer5.allocUnsafe(length);
      var pos = 0;
      for (i = 0; i < list.length; ++i) {
        var buf = list[i];
        if (!Buffer5.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        }
        buf.copy(buffer, pos);
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string, encoding) {
      if (Buffer5.isBuffer(string)) {
        return string.length;
      }
      if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
        return string.byteLength;
      }
      if (typeof string !== "string") {
        string = "" + string;
      }
      var len = string.length;
      if (len === 0)
        return 0;
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
          case void 0:
            return utf8ToBytes(string).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string).length;
          default:
            if (loweredCase)
              return utf8ToBytes(string).length;
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer5.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      var loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer5.prototype._isBuffer = true;
    function swap(b, n, m) {
      var i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer5.prototype.swap16 = function swap16() {
      var len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (var i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer5.prototype.swap32 = function swap32() {
      var len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (var i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer5.prototype.swap64 = function swap64() {
      var len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (var i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer5.prototype.toString = function toString() {
      var length = this.length | 0;
      if (length === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length);
      return slowToString.apply(this, arguments);
    };
    Buffer5.prototype.equals = function equals(b) {
      if (!Buffer5.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer5.compare(this, b) === 0;
    };
    Buffer5.prototype.inspect = function inspect() {
      var str = "";
      var max = exports.INSPECT_MAX_BYTES;
      if (this.length > 0) {
        str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
        if (this.length > max)
          str += " ... ";
      }
      return "<Buffer " + str + ">";
    };
    Buffer5.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (!Buffer5.isBuffer(target)) {
        throw new TypeError("Argument must be a Buffer");
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      var x = thisEnd - thisStart;
      var y = end - start;
      var len = Math.min(x, y);
      var thisCopy = this.slice(thisStart, thisEnd);
      var targetCopy = target.slice(start, end);
      for (var i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (isNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer5.from(val, encoding);
      }
      if (Buffer5.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (Buffer5.TYPED_ARRAY_SUPPORT && typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      var indexSize = 1;
      var arrLength = arr.length;
      var valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      var i;
      if (dir) {
        var foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          var found = true;
          for (var j = 0; j < valLength; j++) {
            if (read(arr, i + j) !== read(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer5.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer5.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer5.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string, offset, length) {
      offset = Number(offset) || 0;
      var remaining = buf.length - offset;
      if (!length) {
        length = remaining;
      } else {
        length = Number(length);
        if (length > remaining) {
          length = remaining;
        }
      }
      var strLen = string.length;
      if (strLen % 2 !== 0)
        throw new TypeError("Invalid hex string");
      if (length > strLen / 2) {
        length = strLen / 2;
      }
      for (var i = 0; i < length; ++i) {
        var parsed = parseInt(string.substr(i * 2, 2), 16);
        if (isNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string, offset, length) {
      return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
    }
    function asciiWrite(buf, string, offset, length) {
      return blitBuffer(asciiToBytes(string), buf, offset, length);
    }
    function latin1Write(buf, string, offset, length) {
      return asciiWrite(buf, string, offset, length);
    }
    function base64Write(buf, string, offset, length) {
      return blitBuffer(base64ToBytes(string), buf, offset, length);
    }
    function ucs2Write(buf, string, offset, length) {
      return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
    }
    Buffer5.prototype.write = function write(string, offset, length, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length = this.length;
        offset = 0;
      } else if (length === void 0 && typeof offset === "string") {
        encoding = offset;
        length = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset | 0;
        if (isFinite(length)) {
          length = length | 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length;
          length = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      var remaining = this.length - offset;
      if (length === void 0 || length > remaining)
        length = remaining;
      if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      var loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string, offset, length);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string, offset, length);
          case "ascii":
            return asciiWrite(this, string, offset, length);
          case "latin1":
          case "binary":
            return latin1Write(this, string, offset, length);
          case "base64":
            return base64Write(this, string, offset, length);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string, offset, length);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer5.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base64.fromByteArray(buf);
      } else {
        return base64.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      var res = [];
      var i = start;
      while (i < end) {
        var firstByte = buf[i];
        var codePoint = null;
        var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          var secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      var len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      var res = "";
      var i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      var ret = "";
      end = Math.min(buf.length, end);
      for (var i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      var len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      var out = "";
      for (var i = start; i < end; ++i) {
        out += toHex(buf[i]);
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      var bytes = buf.slice(start, end);
      var res = "";
      for (var i = 0; i < bytes.length; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer5.prototype.slice = function slice(start, end) {
      var len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      var newBuf;
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        newBuf = this.subarray(start, end);
        newBuf.__proto__ = Buffer5.prototype;
      } else {
        var sliceLen = end - start;
        newBuf = new Buffer5(sliceLen, void 0);
        for (var i = 0; i < sliceLen; ++i) {
          newBuf[i] = this[i + start];
        }
      }
      return newBuf;
    };
    function checkOffset(offset, ext, length) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer5.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer5.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      var val = this[offset + --byteLength2];
      var mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer5.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer5.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer5.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer5.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer5.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer5.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var val = this[offset];
      var mul = 1;
      var i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer5.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      var i = byteLength2;
      var mul = 1;
      var val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer5.prototype.readInt8 = function readInt8(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer5.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer5.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      var val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer5.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer5.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer5.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer5.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer5.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer5.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer5.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer5.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var mul = 1;
      var i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer5.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      byteLength2 = byteLength2 | 0;
      if (!noAssert) {
        var maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer5.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      if (!Buffer5.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      this[offset] = value & 255;
      return offset + 1;
    };
    function objectWriteUInt16(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 65535 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
        buf[offset + i] = (value & 255 << 8 * (littleEndian ? i : 1 - i)) >>> (littleEndian ? i : 1 - i) * 8;
      }
    }
    Buffer5.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer5.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    function objectWriteUInt32(buf, value, offset, littleEndian) {
      if (value < 0)
        value = 4294967295 + value + 1;
      for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
        buf[offset + i] = value >>> (littleEndian ? i : 3 - i) * 8 & 255;
      }
    }
    Buffer5.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset + 3] = value >>> 24;
        this[offset + 2] = value >>> 16;
        this[offset + 1] = value >>> 8;
        this[offset] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer5.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    Buffer5.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = 0;
      var mul = 1;
      var sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer5.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert) {
        var limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      var i = byteLength2 - 1;
      var mul = 1;
      var sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer5.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (!Buffer5.TYPED_ARRAY_SUPPORT)
        value = Math.floor(value);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer5.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
      } else {
        objectWriteUInt16(this, value, offset, true);
      }
      return offset + 2;
    };
    Buffer5.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 8;
        this[offset + 1] = value & 255;
      } else {
        objectWriteUInt16(this, value, offset, false);
      }
      return offset + 2;
    };
    Buffer5.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value & 255;
        this[offset + 1] = value >>> 8;
        this[offset + 2] = value >>> 16;
        this[offset + 3] = value >>> 24;
      } else {
        objectWriteUInt32(this, value, offset, true);
      }
      return offset + 4;
    };
    Buffer5.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset | 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      if (Buffer5.TYPED_ARRAY_SUPPORT) {
        this[offset] = value >>> 24;
        this[offset + 1] = value >>> 16;
        this[offset + 2] = value >>> 8;
        this[offset + 3] = value & 255;
      } else {
        objectWriteUInt32(this, value, offset, false);
      }
      return offset + 4;
    };
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer5.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer5.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer5.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer5.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer5.prototype.copy = function copy(target, targetStart, start, end) {
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("sourceStart out of bounds");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      var len = end - start;
      var i;
      if (this === target && start < targetStart && targetStart < end) {
        for (i = len - 1; i >= 0; --i) {
          target[i + targetStart] = this[i + start];
        }
      } else if (len < 1e3 || !Buffer5.TYPED_ARRAY_SUPPORT) {
        for (i = 0; i < len; ++i) {
          target[i + targetStart] = this[i + start];
        }
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
      }
      return len;
    };
    Buffer5.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (val.length === 1) {
          var code = val.charCodeAt(0);
          if (code < 256) {
            val = code;
          }
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer5.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
      } else if (typeof val === "number") {
        val = val & 255;
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      var i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        var bytes = Buffer5.isBuffer(val) ? val : utf8ToBytes(new Buffer5(val, encoding).toString());
        var len = bytes.length;
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = stringtrim(str).replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function stringtrim(str) {
      if (str.trim)
        return str.trim();
      return str.replace(/^\s+|\s+$/g, "");
    }
    function toHex(n) {
      if (n < 16)
        return "0" + n.toString(16);
      return n.toString(16);
    }
    function utf8ToBytes(string, units) {
      units = units || Infinity;
      var codePoint;
      var length = string.length;
      var leadSurrogate = null;
      var bytes = [];
      for (var i = 0; i < length; ++i) {
        codePoint = string.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      var c, hi, lo;
      var byteArray = [];
      for (var i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base64.toByteArray(base64clean(str));
    }
    function blitBuffer(src, dst, offset, length) {
      for (var i = 0; i < length; ++i) {
        if (i + offset >= dst.length || i >= src.length)
          break;
        dst[i + offset] = src[i];
      }
      return i;
    }
    function isnan(val) {
      return val !== val;
    }
  }
});

// (disabled):crypto
var require_crypto = __commonJS({
  "(disabled):crypto"() {
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/core.js
var require_core = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/core.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.CryptoJS = factory();
      }
    })(exports, function() {
      var CryptoJS3 = CryptoJS3 || function(Math2, undefined2) {
        var crypto2;
        if (typeof window !== "undefined" && window.crypto) {
          crypto2 = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto2 = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto2 = globalThis.crypto;
        }
        if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
          crypto2 = window.msCrypto;
        }
        if (!crypto2 && typeof window !== "undefined" && window.crypto) {
          crypto2 = window.crypto;
        }
        if (!crypto2 && typeof __require === "function") {
          try {
            crypto2 = require_crypto();
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt2 = function() {
          if (crypto2) {
            if (typeof crypto2.getRandomValues === "function") {
              try {
                return crypto2.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto2.randomBytes === "function") {
              try {
                return crypto2.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray2 = C_lib.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt2());
            }
            return new WordArray2.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray2.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray2.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function() {
            this._data = new WordArray2.init();
            this._nDataBytes = 0;
          },
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          _process: function(doFlush) {
            var processedWords;
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray2.init(processedWords, nBytesReady);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS3;
    });
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/lib-typedarrays.js
var require_lib_typedarrays = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/lib-typedarrays.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        if (typeof ArrayBuffer != "function") {
          return;
        }
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray2 = C_lib.WordArray;
        var superInit = WordArray2.init;
        var subInit = WordArray2.init = function(typedArray) {
          if (typedArray instanceof ArrayBuffer) {
            typedArray = new Uint8Array(typedArray);
          }
          if (typedArray instanceof Int8Array || typeof Uint8ClampedArray !== "undefined" && typedArray instanceof Uint8ClampedArray || typedArray instanceof Int16Array || typedArray instanceof Uint16Array || typedArray instanceof Int32Array || typedArray instanceof Uint32Array || typedArray instanceof Float32Array || typedArray instanceof Float64Array) {
            typedArray = new Uint8Array(typedArray.buffer, typedArray.byteOffset, typedArray.byteLength);
          }
          if (typedArray instanceof Uint8Array) {
            var typedArrayByteLength = typedArray.byteLength;
            var words = [];
            for (var i = 0; i < typedArrayByteLength; i++) {
              words[i >>> 2] |= typedArray[i] << 24 - i % 4 * 8;
            }
            superInit.call(this, words, typedArrayByteLength);
          } else {
            superInit.apply(this, arguments);
          }
        };
        subInit.prototype = WordArray2;
      })();
      return CryptoJS3.lib.WordArray;
    });
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/sha256.js
var require_sha256 = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/sha256.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray2 = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n2) {
            var sqrtN = Math2.sqrt(n2);
            for (var factor = 2; factor <= sqrtN; factor++) {
              if (!(n2 % factor)) {
                return false;
              }
            }
            return true;
          }
          function getFractionalBits(n2) {
            return (n2 - (n2 | 0)) * 4294967296 | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
              }
              K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA2562 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray2.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H2 = this._hash.words;
            var a = H2[0];
            var b = H2[1];
            var c = H2[2];
            var d = H2[3];
            var e = H2[4];
            var f = H2[5];
            var g = H2[6];
            var h = H2[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H2[0] = H2[0] + a | 0;
            H2[1] = H2[1] + b | 0;
            H2[2] = H2[2] + c | 0;
            H2[3] = H2[3] + d | 0;
            H2[4] = H2[4] + e | 0;
            H2[5] = H2[5] + f | 0;
            H2[6] = H2[6] + g | 0;
            H2[7] = H2[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA2562);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA2562);
      })(Math);
      return CryptoJS3.SHA256;
    });
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/hmac.js
var require_hmac = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/hmac.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var Base = C_lib.Base;
        var C_enc = C.enc;
        var Utf8 = C_enc.Utf8;
        var C_algo = C.algo;
        var HMAC = C_algo.HMAC = Base.extend({
          init: function(hasher, key) {
            hasher = this._hasher = new hasher.init();
            if (typeof key == "string") {
              key = Utf8.parse(key);
            }
            var hasherBlockSize = hasher.blockSize;
            var hasherBlockSizeBytes = hasherBlockSize * 4;
            if (key.sigBytes > hasherBlockSizeBytes) {
              key = hasher.finalize(key);
            }
            key.clamp();
            var oKey = this._oKey = key.clone();
            var iKey = this._iKey = key.clone();
            var oKeyWords = oKey.words;
            var iKeyWords = iKey.words;
            for (var i = 0; i < hasherBlockSize; i++) {
              oKeyWords[i] ^= 1549556828;
              iKeyWords[i] ^= 909522486;
            }
            oKey.sigBytes = iKey.sigBytes = hasherBlockSizeBytes;
            this.reset();
          },
          reset: function() {
            var hasher = this._hasher;
            hasher.reset();
            hasher.update(this._iKey);
          },
          update: function(messageUpdate) {
            this._hasher.update(messageUpdate);
            return this;
          },
          finalize: function(messageUpdate) {
            var hasher = this._hasher;
            var innerHash = hasher.finalize(messageUpdate);
            hasher.reset();
            var hmac = hasher.finalize(this._oKey.clone().concat(innerHash));
            return hmac;
          }
        });
      })();
    });
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/hmac-sha256.js
var require_hmac_sha256 = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/hmac-sha256.js"(exports, module) {
    (function(root, factory, undef) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core(), require_sha256(), require_hmac());
      } else if (typeof define === "function" && define.amd) {
        define(["./core", "./sha256", "./hmac"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      return CryptoJS3.HmacSHA256;
    });
  }
});

// ../amazon-cognito-identity-js/node_modules/crypto-js/enc-base64.js
var require_enc_base64 = __commonJS({
  "../amazon-cognito-identity-js/node_modules/crypto-js/enc-base64.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray2 = C_lib.WordArray;
        var C_enc = C.enc;
        var Base643 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray2.create(words, nBytes);
        }
      })();
      return CryptoJS3.enc.Base64;
    });
  }
});

// ../../node_modules/unfetch/dist/unfetch.js
var require_unfetch = __commonJS({
  "../../node_modules/unfetch/dist/unfetch.js"(exports, module) {
    module.exports = function(e, n) {
      return n = n || {}, new Promise(function(t, r) {
        var s = new XMLHttpRequest(), o = [], u = [], i = {}, a = function() {
          return { ok: (s.status / 100 | 0) == 2, statusText: s.statusText, status: s.status, url: s.responseURL, text: function() {
            return Promise.resolve(s.responseText);
          }, json: function() {
            return Promise.resolve(s.responseText).then(JSON.parse);
          }, blob: function() {
            return Promise.resolve(new Blob([s.response]));
          }, clone: a, headers: { keys: function() {
            return o;
          }, entries: function() {
            return u;
          }, get: function(e2) {
            return i[e2.toLowerCase()];
          }, has: function(e2) {
            return e2.toLowerCase() in i;
          } } };
        };
        for (var l in s.open(n.method || "get", e, true), s.onload = function() {
          s.getAllResponseHeaders().replace(/^(.*?):[^\S\n]*([\s\S]*?)$/gm, function(e2, n2, t2) {
            o.push(n2 = n2.toLowerCase()), u.push([n2, t2]), i[n2] = i[n2] ? i[n2] + "," + t2 : t2;
          }), t(a());
        }, s.onerror = r, s.withCredentials = n.credentials == "include", n.headers)
          s.setRequestHeader(l, n.headers[l]);
        s.send(n.body || null);
      });
    };
  }
});

// ../../node_modules/isomorphic-unfetch/browser.js
var require_browser = __commonJS({
  "../../node_modules/isomorphic-unfetch/browser.js"(exports, module) {
    module.exports = self.fetch || (self.fetch = require_unfetch().default || require_unfetch());
  }
});

// ../../node_modules/js-cookie/src/js.cookie.js
var require_js_cookie = __commonJS({
  "../../node_modules/js-cookie/src/js.cookie.js"(exports, module) {
    (function(factory) {
      var registeredInModuleLoader;
      if (typeof define === "function" && define.amd) {
        define(factory);
        registeredInModuleLoader = true;
      }
      if (typeof exports === "object") {
        module.exports = factory();
        registeredInModuleLoader = true;
      }
      if (!registeredInModuleLoader) {
        var OldCookies = window.Cookies;
        var api = window.Cookies = factory();
        api.noConflict = function() {
          window.Cookies = OldCookies;
          return api;
        };
      }
    })(function() {
      function extend() {
        var i = 0;
        var result = {};
        for (; i < arguments.length; i++) {
          var attributes = arguments[i];
          for (var key in attributes) {
            result[key] = attributes[key];
          }
        }
        return result;
      }
      function decode(s) {
        return s.replace(/(%[0-9A-Z]{2})+/g, decodeURIComponent);
      }
      function init(converter) {
        function api() {
        }
        function set2(key, value, attributes) {
          if (typeof document === "undefined") {
            return;
          }
          attributes = extend({
            path: "/"
          }, api.defaults, attributes);
          if (typeof attributes.expires === "number") {
            attributes.expires = new Date(new Date() * 1 + attributes.expires * 864e5);
          }
          attributes.expires = attributes.expires ? attributes.expires.toUTCString() : "";
          try {
            var result = JSON.stringify(value);
            if (/^[\{\[]/.test(result)) {
              value = result;
            }
          } catch (e) {
          }
          value = converter.write ? converter.write(value, key) : encodeURIComponent(String(value)).replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent);
          key = encodeURIComponent(String(key)).replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent).replace(/[\(\)]/g, escape);
          var stringifiedAttributes = "";
          for (var attributeName in attributes) {
            if (!attributes[attributeName]) {
              continue;
            }
            stringifiedAttributes += "; " + attributeName;
            if (attributes[attributeName] === true) {
              continue;
            }
            stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
          }
          return document.cookie = key + "=" + value + stringifiedAttributes;
        }
        function get2(key, json) {
          if (typeof document === "undefined") {
            return;
          }
          var jar = {};
          var cookies = document.cookie ? document.cookie.split("; ") : [];
          var i = 0;
          for (; i < cookies.length; i++) {
            var parts = cookies[i].split("=");
            var cookie = parts.slice(1).join("=");
            if (!json && cookie.charAt(0) === '"') {
              cookie = cookie.slice(1, -1);
            }
            try {
              var name = decode(parts[0]);
              cookie = (converter.read || converter)(cookie, name) || decode(cookie);
              if (json) {
                try {
                  cookie = JSON.parse(cookie);
                } catch (e) {
                }
              }
              jar[name] = cookie;
              if (key === name) {
                break;
              }
            } catch (e) {
            }
          }
          return key ? jar[key] : jar;
        }
        api.set = set2;
        api.get = function(key) {
          return get2(key, false);
        };
        api.getJSON = function(key) {
          return get2(key, true);
        };
        api.remove = function(key, attributes) {
          set2(key, "", extend(attributes, {
            expires: -1
          }));
        };
        api.defaults = {};
        api.withConverter = init;
        return api;
      }
      return init(function() {
      });
    });
  }
});

// ../../node_modules/url/node_modules/punycode/punycode.js
var require_punycode = __commonJS({
  "../../node_modules/url/node_modules/punycode/punycode.js"(exports, module) {
    (function(root) {
      var freeExports = typeof exports == "object" && exports && !exports.nodeType && exports;
      var freeModule = typeof module == "object" && module && !module.nodeType && module;
      var freeGlobal = typeof window == "object" && window;
      if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal || freeGlobal.self === freeGlobal) {
        root = freeGlobal;
      }
      var punycode, maxInt = 2147483647, base = 36, tMin = 1, tMax = 26, skew = 38, damp = 700, initialBias = 72, initialN = 128, delimiter = "-", regexPunycode = /^xn--/, regexNonASCII = /[^\x20-\x7E]/, regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g, errors = {
        "overflow": "Overflow: input needs wider integers to process",
        "not-basic": "Illegal input >= 0x80 (not a basic code point)",
        "invalid-input": "Invalid input"
      }, baseMinusTMin = base - tMin, floor = Math.floor, stringFromCharCode = String.fromCharCode, key;
      function error(type) {
        throw RangeError(errors[type]);
      }
      function map(array, fn) {
        var length = array.length;
        var result = [];
        while (length--) {
          result[length] = fn(array[length]);
        }
        return result;
      }
      function mapDomain(string, fn) {
        var parts = string.split("@");
        var result = "";
        if (parts.length > 1) {
          result = parts[0] + "@";
          string = parts[1];
        }
        string = string.replace(regexSeparators, ".");
        var labels = string.split(".");
        var encoded = map(labels, fn).join(".");
        return result + encoded;
      }
      function ucs2decode(string) {
        var output = [], counter = 0, length = string.length, value, extra;
        while (counter < length) {
          value = string.charCodeAt(counter++);
          if (value >= 55296 && value <= 56319 && counter < length) {
            extra = string.charCodeAt(counter++);
            if ((extra & 64512) == 56320) {
              output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
            } else {
              output.push(value);
              counter--;
            }
          } else {
            output.push(value);
          }
        }
        return output;
      }
      function ucs2encode(array) {
        return map(array, function(value) {
          var output = "";
          if (value > 65535) {
            value -= 65536;
            output += stringFromCharCode(value >>> 10 & 1023 | 55296);
            value = 56320 | value & 1023;
          }
          output += stringFromCharCode(value);
          return output;
        }).join("");
      }
      function basicToDigit(codePoint) {
        if (codePoint - 48 < 10) {
          return codePoint - 22;
        }
        if (codePoint - 65 < 26) {
          return codePoint - 65;
        }
        if (codePoint - 97 < 26) {
          return codePoint - 97;
        }
        return base;
      }
      function digitToBasic(digit, flag) {
        return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
      }
      function adapt(delta, numPoints, firstTime) {
        var k = 0;
        delta = firstTime ? floor(delta / damp) : delta >> 1;
        delta += floor(delta / numPoints);
        for (; delta > baseMinusTMin * tMax >> 1; k += base) {
          delta = floor(delta / baseMinusTMin);
        }
        return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
      }
      function decode(input) {
        var output = [], inputLength = input.length, out, i = 0, n = initialN, bias = initialBias, basic, j, index, oldi, w, k, digit, t, baseMinusT;
        basic = input.lastIndexOf(delimiter);
        if (basic < 0) {
          basic = 0;
        }
        for (j = 0; j < basic; ++j) {
          if (input.charCodeAt(j) >= 128) {
            error("not-basic");
          }
          output.push(input.charCodeAt(j));
        }
        for (index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
          for (oldi = i, w = 1, k = base; ; k += base) {
            if (index >= inputLength) {
              error("invalid-input");
            }
            digit = basicToDigit(input.charCodeAt(index++));
            if (digit >= base || digit > floor((maxInt - i) / w)) {
              error("overflow");
            }
            i += digit * w;
            t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
            if (digit < t) {
              break;
            }
            baseMinusT = base - t;
            if (w > floor(maxInt / baseMinusT)) {
              error("overflow");
            }
            w *= baseMinusT;
          }
          out = output.length + 1;
          bias = adapt(i - oldi, out, oldi == 0);
          if (floor(i / out) > maxInt - n) {
            error("overflow");
          }
          n += floor(i / out);
          i %= out;
          output.splice(i++, 0, n);
        }
        return ucs2encode(output);
      }
      function encode(input) {
        var n, delta, handledCPCount, basicLength, bias, j, m, q, k, t, currentValue, output = [], inputLength, handledCPCountPlusOne, baseMinusT, qMinusT;
        input = ucs2decode(input);
        inputLength = input.length;
        n = initialN;
        delta = 0;
        bias = initialBias;
        for (j = 0; j < inputLength; ++j) {
          currentValue = input[j];
          if (currentValue < 128) {
            output.push(stringFromCharCode(currentValue));
          }
        }
        handledCPCount = basicLength = output.length;
        if (basicLength) {
          output.push(delimiter);
        }
        while (handledCPCount < inputLength) {
          for (m = maxInt, j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue >= n && currentValue < m) {
              m = currentValue;
            }
          }
          handledCPCountPlusOne = handledCPCount + 1;
          if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
            error("overflow");
          }
          delta += (m - n) * handledCPCountPlusOne;
          n = m;
          for (j = 0; j < inputLength; ++j) {
            currentValue = input[j];
            if (currentValue < n && ++delta > maxInt) {
              error("overflow");
            }
            if (currentValue == n) {
              for (q = delta, k = base; ; k += base) {
                t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                if (q < t) {
                  break;
                }
                qMinusT = q - t;
                baseMinusT = base - t;
                output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                q = floor(qMinusT / baseMinusT);
              }
              output.push(stringFromCharCode(digitToBasic(q, 0)));
              bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
              delta = 0;
              ++handledCPCount;
            }
          }
          ++delta;
          ++n;
        }
        return output.join("");
      }
      function toUnicode(input) {
        return mapDomain(input, function(string) {
          return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
        });
      }
      function toASCII(input) {
        return mapDomain(input, function(string) {
          return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
        });
      }
      punycode = {
        "version": "1.3.2",
        "ucs2": {
          "decode": ucs2decode,
          "encode": ucs2encode
        },
        "decode": decode,
        "encode": encode,
        "toASCII": toASCII,
        "toUnicode": toUnicode
      };
      if (typeof define == "function" && typeof define.amd == "object" && define.amd) {
        define("punycode", function() {
          return punycode;
        });
      } else if (freeExports && freeModule) {
        if (module.exports == freeExports) {
          freeModule.exports = punycode;
        } else {
          for (key in punycode) {
            punycode.hasOwnProperty(key) && (freeExports[key] = punycode[key]);
          }
        }
      } else {
        root.punycode = punycode;
      }
    })(exports);
  }
});

// ../../node_modules/url/util.js
var require_util = __commonJS({
  "../../node_modules/url/util.js"(exports, module) {
    "use strict";
    module.exports = {
      isString: function(arg) {
        return typeof arg === "string";
      },
      isObject: function(arg) {
        return typeof arg === "object" && arg !== null;
      },
      isNull: function(arg) {
        return arg === null;
      },
      isNullOrUndefined: function(arg) {
        return arg == null;
      }
    };
  }
});

// ../../node_modules/url/node_modules/querystring/decode.js
var require_decode = __commonJS({
  "../../node_modules/url/node_modules/querystring/decode.js"(exports, module) {
    "use strict";
    function hasOwnProperty(obj, prop) {
      return Object.prototype.hasOwnProperty.call(obj, prop);
    }
    module.exports = function(qs, sep, eq, options) {
      sep = sep || "&";
      eq = eq || "=";
      var obj = {};
      if (typeof qs !== "string" || qs.length === 0) {
        return obj;
      }
      var regexp = /\+/g;
      qs = qs.split(sep);
      var maxKeys = 1e3;
      if (options && typeof options.maxKeys === "number") {
        maxKeys = options.maxKeys;
      }
      var len = qs.length;
      if (maxKeys > 0 && len > maxKeys) {
        len = maxKeys;
      }
      for (var i = 0; i < len; ++i) {
        var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
        if (idx >= 0) {
          kstr = x.substr(0, idx);
          vstr = x.substr(idx + 1);
        } else {
          kstr = x;
          vstr = "";
        }
        k = decodeURIComponent(kstr);
        v = decodeURIComponent(vstr);
        if (!hasOwnProperty(obj, k)) {
          obj[k] = v;
        } else if (Array.isArray(obj[k])) {
          obj[k].push(v);
        } else {
          obj[k] = [obj[k], v];
        }
      }
      return obj;
    };
  }
});

// ../../node_modules/url/node_modules/querystring/encode.js
var require_encode = __commonJS({
  "../../node_modules/url/node_modules/querystring/encode.js"(exports, module) {
    "use strict";
    var stringifyPrimitive = function(v) {
      switch (typeof v) {
        case "string":
          return v;
        case "boolean":
          return v ? "true" : "false";
        case "number":
          return isFinite(v) ? v : "";
        default:
          return "";
      }
    };
    module.exports = function(obj, sep, eq, name) {
      sep = sep || "&";
      eq = eq || "=";
      if (obj === null) {
        obj = void 0;
      }
      if (typeof obj === "object") {
        return Object.keys(obj).map(function(k) {
          var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
          if (Array.isArray(obj[k])) {
            return obj[k].map(function(v) {
              return ks + encodeURIComponent(stringifyPrimitive(v));
            }).join(sep);
          } else {
            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
          }
        }).join(sep);
      }
      if (!name)
        return "";
      return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
    };
  }
});

// ../../node_modules/url/node_modules/querystring/index.js
var require_querystring = __commonJS({
  "../../node_modules/url/node_modules/querystring/index.js"(exports) {
    "use strict";
    exports.decode = exports.parse = require_decode();
    exports.encode = exports.stringify = require_encode();
  }
});

// ../../node_modules/url/url.js
var require_url = __commonJS({
  "../../node_modules/url/url.js"(exports) {
    "use strict";
    var punycode = require_punycode();
    var util = require_util();
    exports.parse = urlParse;
    exports.resolve = urlResolve;
    exports.resolveObject = urlResolveObject;
    exports.format = urlFormat;
    exports.Url = Url;
    function Url() {
      this.protocol = null;
      this.slashes = null;
      this.auth = null;
      this.host = null;
      this.port = null;
      this.hostname = null;
      this.hash = null;
      this.search = null;
      this.query = null;
      this.pathname = null;
      this.path = null;
      this.href = null;
    }
    var protocolPattern = /^([a-z0-9.+-]+:)/i;
    var portPattern = /:[0-9]*$/;
    var simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/;
    var delims = ["<", ">", '"', "`", " ", "\r", "\n", "	"];
    var unwise = ["{", "}", "|", "\\", "^", "`"].concat(delims);
    var autoEscape = ["'"].concat(unwise);
    var nonHostChars = ["%", "/", "?", ";", "#"].concat(autoEscape);
    var hostEndingChars = ["/", "?", "#"];
    var hostnameMaxLen = 255;
    var hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/;
    var hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/;
    var unsafeProtocol = {
      "javascript": true,
      "javascript:": true
    };
    var hostlessProtocol = {
      "javascript": true,
      "javascript:": true
    };
    var slashedProtocol = {
      "http": true,
      "https": true,
      "ftp": true,
      "gopher": true,
      "file": true,
      "http:": true,
      "https:": true,
      "ftp:": true,
      "gopher:": true,
      "file:": true
    };
    var querystring = require_querystring();
    function urlParse(url, parseQueryString, slashesDenoteHost) {
      if (url && util.isObject(url) && url instanceof Url)
        return url;
      var u = new Url();
      u.parse(url, parseQueryString, slashesDenoteHost);
      return u;
    }
    Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
      if (!util.isString(url)) {
        throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
      }
      var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
      uSplit[0] = uSplit[0].replace(slashRegex, "/");
      url = uSplit.join(splitter);
      var rest = url;
      rest = rest.trim();
      if (!slashesDenoteHost && url.split("#").length === 1) {
        var simplePath = simplePathPattern.exec(rest);
        if (simplePath) {
          this.path = rest;
          this.href = rest;
          this.pathname = simplePath[1];
          if (simplePath[2]) {
            this.search = simplePath[2];
            if (parseQueryString) {
              this.query = querystring.parse(this.search.substr(1));
            } else {
              this.query = this.search.substr(1);
            }
          } else if (parseQueryString) {
            this.search = "";
            this.query = {};
          }
          return this;
        }
      }
      var proto = protocolPattern.exec(rest);
      if (proto) {
        proto = proto[0];
        var lowerProto = proto.toLowerCase();
        this.protocol = lowerProto;
        rest = rest.substr(proto.length);
      }
      if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
        var slashes = rest.substr(0, 2) === "//";
        if (slashes && !(proto && hostlessProtocol[proto])) {
          rest = rest.substr(2);
          this.slashes = true;
        }
      }
      if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
        var hostEnd = -1;
        for (var i = 0; i < hostEndingChars.length; i++) {
          var hec = rest.indexOf(hostEndingChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            hostEnd = hec;
        }
        var auth, atSign;
        if (hostEnd === -1) {
          atSign = rest.lastIndexOf("@");
        } else {
          atSign = rest.lastIndexOf("@", hostEnd);
        }
        if (atSign !== -1) {
          auth = rest.slice(0, atSign);
          rest = rest.slice(atSign + 1);
          this.auth = decodeURIComponent(auth);
        }
        hostEnd = -1;
        for (var i = 0; i < nonHostChars.length; i++) {
          var hec = rest.indexOf(nonHostChars[i]);
          if (hec !== -1 && (hostEnd === -1 || hec < hostEnd))
            hostEnd = hec;
        }
        if (hostEnd === -1)
          hostEnd = rest.length;
        this.host = rest.slice(0, hostEnd);
        rest = rest.slice(hostEnd);
        this.parseHost();
        this.hostname = this.hostname || "";
        var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
        if (!ipv6Hostname) {
          var hostparts = this.hostname.split(/\./);
          for (var i = 0, l = hostparts.length; i < l; i++) {
            var part = hostparts[i];
            if (!part)
              continue;
            if (!part.match(hostnamePartPattern)) {
              var newpart = "";
              for (var j = 0, k = part.length; j < k; j++) {
                if (part.charCodeAt(j) > 127) {
                  newpart += "x";
                } else {
                  newpart += part[j];
                }
              }
              if (!newpart.match(hostnamePartPattern)) {
                var validParts = hostparts.slice(0, i);
                var notHost = hostparts.slice(i + 1);
                var bit = part.match(hostnamePartStart);
                if (bit) {
                  validParts.push(bit[1]);
                  notHost.unshift(bit[2]);
                }
                if (notHost.length) {
                  rest = "/" + notHost.join(".") + rest;
                }
                this.hostname = validParts.join(".");
                break;
              }
            }
          }
        }
        if (this.hostname.length > hostnameMaxLen) {
          this.hostname = "";
        } else {
          this.hostname = this.hostname.toLowerCase();
        }
        if (!ipv6Hostname) {
          this.hostname = punycode.toASCII(this.hostname);
        }
        var p = this.port ? ":" + this.port : "";
        var h = this.hostname || "";
        this.host = h + p;
        this.href += this.host;
        if (ipv6Hostname) {
          this.hostname = this.hostname.substr(1, this.hostname.length - 2);
          if (rest[0] !== "/") {
            rest = "/" + rest;
          }
        }
      }
      if (!unsafeProtocol[lowerProto]) {
        for (var i = 0, l = autoEscape.length; i < l; i++) {
          var ae = autoEscape[i];
          if (rest.indexOf(ae) === -1)
            continue;
          var esc = encodeURIComponent(ae);
          if (esc === ae) {
            esc = escape(ae);
          }
          rest = rest.split(ae).join(esc);
        }
      }
      var hash = rest.indexOf("#");
      if (hash !== -1) {
        this.hash = rest.substr(hash);
        rest = rest.slice(0, hash);
      }
      var qm = rest.indexOf("?");
      if (qm !== -1) {
        this.search = rest.substr(qm);
        this.query = rest.substr(qm + 1);
        if (parseQueryString) {
          this.query = querystring.parse(this.query);
        }
        rest = rest.slice(0, qm);
      } else if (parseQueryString) {
        this.search = "";
        this.query = {};
      }
      if (rest)
        this.pathname = rest;
      if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
        this.pathname = "/";
      }
      if (this.pathname || this.search) {
        var p = this.pathname || "";
        var s = this.search || "";
        this.path = p + s;
      }
      this.href = this.format();
      return this;
    };
    function urlFormat(obj) {
      if (util.isString(obj))
        obj = urlParse(obj);
      if (!(obj instanceof Url))
        return Url.prototype.format.call(obj);
      return obj.format();
    }
    Url.prototype.format = function() {
      var auth = this.auth || "";
      if (auth) {
        auth = encodeURIComponent(auth);
        auth = auth.replace(/%3A/i, ":");
        auth += "@";
      }
      var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
      if (this.host) {
        host = auth + this.host;
      } else if (this.hostname) {
        host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
        if (this.port) {
          host += ":" + this.port;
        }
      }
      if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
        query = querystring.stringify(this.query);
      }
      var search = this.search || query && "?" + query || "";
      if (protocol && protocol.substr(-1) !== ":")
        protocol += ":";
      if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
        host = "//" + (host || "");
        if (pathname && pathname.charAt(0) !== "/")
          pathname = "/" + pathname;
      } else if (!host) {
        host = "";
      }
      if (hash && hash.charAt(0) !== "#")
        hash = "#" + hash;
      if (search && search.charAt(0) !== "?")
        search = "?" + search;
      pathname = pathname.replace(/[?#]/g, function(match) {
        return encodeURIComponent(match);
      });
      search = search.replace("#", "%23");
      return protocol + host + pathname + search + hash;
    };
    function urlResolve(source, relative) {
      return urlParse(source, false, true).resolve(relative);
    }
    Url.prototype.resolve = function(relative) {
      return this.resolveObject(urlParse(relative, false, true)).format();
    };
    function urlResolveObject(source, relative) {
      if (!source)
        return relative;
      return urlParse(source, false, true).resolveObject(relative);
    }
    Url.prototype.resolveObject = function(relative) {
      if (util.isString(relative)) {
        var rel = new Url();
        rel.parse(relative, false, true);
        relative = rel;
      }
      var result = new Url();
      var tkeys = Object.keys(this);
      for (var tk = 0; tk < tkeys.length; tk++) {
        var tkey = tkeys[tk];
        result[tkey] = this[tkey];
      }
      result.hash = relative.hash;
      if (relative.href === "") {
        result.href = result.format();
        return result;
      }
      if (relative.slashes && !relative.protocol) {
        var rkeys = Object.keys(relative);
        for (var rk = 0; rk < rkeys.length; rk++) {
          var rkey = rkeys[rk];
          if (rkey !== "protocol")
            result[rkey] = relative[rkey];
        }
        if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
          result.path = result.pathname = "/";
        }
        result.href = result.format();
        return result;
      }
      if (relative.protocol && relative.protocol !== result.protocol) {
        if (!slashedProtocol[relative.protocol]) {
          var keys = Object.keys(relative);
          for (var v = 0; v < keys.length; v++) {
            var k = keys[v];
            result[k] = relative[k];
          }
          result.href = result.format();
          return result;
        }
        result.protocol = relative.protocol;
        if (!relative.host && !hostlessProtocol[relative.protocol]) {
          var relPath = (relative.pathname || "").split("/");
          while (relPath.length && !(relative.host = relPath.shift()))
            ;
          if (!relative.host)
            relative.host = "";
          if (!relative.hostname)
            relative.hostname = "";
          if (relPath[0] !== "")
            relPath.unshift("");
          if (relPath.length < 2)
            relPath.unshift("");
          result.pathname = relPath.join("/");
        } else {
          result.pathname = relative.pathname;
        }
        result.search = relative.search;
        result.query = relative.query;
        result.host = relative.host || "";
        result.auth = relative.auth;
        result.hostname = relative.hostname || relative.host;
        result.port = relative.port;
        if (result.pathname || result.search) {
          var p = result.pathname || "";
          var s = result.search || "";
          result.path = p + s;
        }
        result.slashes = result.slashes || relative.slashes;
        result.href = result.format();
        return result;
      }
      var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
      if (psychotic) {
        result.hostname = "";
        result.port = null;
        if (result.host) {
          if (srcPath[0] === "")
            srcPath[0] = result.host;
          else
            srcPath.unshift(result.host);
        }
        result.host = "";
        if (relative.protocol) {
          relative.hostname = null;
          relative.port = null;
          if (relative.host) {
            if (relPath[0] === "")
              relPath[0] = relative.host;
            else
              relPath.unshift(relative.host);
          }
          relative.host = null;
        }
        mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
      }
      if (isRelAbs) {
        result.host = relative.host || relative.host === "" ? relative.host : result.host;
        result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
        result.search = relative.search;
        result.query = relative.query;
        srcPath = relPath;
      } else if (relPath.length) {
        if (!srcPath)
          srcPath = [];
        srcPath.pop();
        srcPath = srcPath.concat(relPath);
        result.search = relative.search;
        result.query = relative.query;
      } else if (!util.isNullOrUndefined(relative.search)) {
        if (psychotic) {
          result.hostname = result.host = srcPath.shift();
          var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
          if (authInHost) {
            result.auth = authInHost.shift();
            result.host = result.hostname = authInHost.shift();
          }
        }
        result.search = relative.search;
        result.query = relative.query;
        if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
          result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
        }
        result.href = result.format();
        return result;
      }
      if (!srcPath.length) {
        result.pathname = null;
        if (result.search) {
          result.path = "/" + result.search;
        } else {
          result.path = null;
        }
        result.href = result.format();
        return result;
      }
      var last = srcPath.slice(-1)[0];
      var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
      var up = 0;
      for (var i = srcPath.length; i >= 0; i--) {
        last = srcPath[i];
        if (last === ".") {
          srcPath.splice(i, 1);
        } else if (last === "..") {
          srcPath.splice(i, 1);
          up++;
        } else if (up) {
          srcPath.splice(i, 1);
          up--;
        }
      }
      if (!mustEndAbs && !removeAllDots) {
        for (; up--; up) {
          srcPath.unshift("..");
        }
      }
      if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
        srcPath.unshift("");
      }
      if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
        srcPath.push("");
      }
      var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
      if (psychotic) {
        result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
        var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
        if (authInHost) {
          result.auth = authInHost.shift();
          result.host = result.hostname = authInHost.shift();
        }
      }
      mustEndAbs = mustEndAbs || result.host && srcPath.length;
      if (mustEndAbs && !isAbsolute) {
        srcPath.unshift("");
      }
      if (!srcPath.length) {
        result.pathname = null;
        result.path = null;
      } else {
        result.pathname = srcPath.join("/");
      }
      if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
      }
      result.auth = relative.auth || result.auth;
      result.slashes = result.slashes || relative.slashes;
      result.href = result.format();
      return result;
    };
    Url.prototype.parseHost = function() {
      var host = this.host;
      var port = portPattern.exec(host);
      if (port) {
        port = port[0];
        if (port !== ":") {
          this.port = port.substr(1);
        }
        host = host.substr(0, host.length - port.length);
      }
      if (host)
        this.hostname = host;
    };
  }
});

// node_modules/crypto-js/core.js
var require_core2 = __commonJS({
  "node_modules/crypto-js/core.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory();
      } else if (typeof define === "function" && define.amd) {
        define([], factory);
      } else {
        root.CryptoJS = factory();
      }
    })(exports, function() {
      var CryptoJS3 = CryptoJS3 || function(Math2, undefined2) {
        var crypto2;
        if (typeof window !== "undefined" && window.crypto) {
          crypto2 = window.crypto;
        }
        if (typeof self !== "undefined" && self.crypto) {
          crypto2 = self.crypto;
        }
        if (typeof globalThis !== "undefined" && globalThis.crypto) {
          crypto2 = globalThis.crypto;
        }
        if (!crypto2 && typeof window !== "undefined" && window.msCrypto) {
          crypto2 = window.msCrypto;
        }
        if (!crypto2 && typeof window !== "undefined" && window.crypto) {
          crypto2 = window.crypto;
        }
        if (!crypto2 && typeof __require === "function") {
          try {
            crypto2 = require_crypto();
          } catch (err) {
          }
        }
        var cryptoSecureRandomInt2 = function() {
          if (crypto2) {
            if (typeof crypto2.getRandomValues === "function") {
              try {
                return crypto2.getRandomValues(new Uint32Array(1))[0];
              } catch (err) {
              }
            }
            if (typeof crypto2.randomBytes === "function") {
              try {
                return crypto2.randomBytes(4).readInt32LE();
              } catch (err) {
              }
            }
          }
          throw new Error("Native crypto module could not be used to get secure random number.");
        };
        var create = Object.create || function() {
          function F() {
          }
          return function(obj) {
            var subtype;
            F.prototype = obj;
            subtype = new F();
            F.prototype = null;
            return subtype;
          };
        }();
        var C = {};
        var C_lib = C.lib = {};
        var Base = C_lib.Base = function() {
          return {
            extend: function(overrides) {
              var subtype = create(this);
              if (overrides) {
                subtype.mixIn(overrides);
              }
              if (!subtype.hasOwnProperty("init") || this.init === subtype.init) {
                subtype.init = function() {
                  subtype.$super.init.apply(this, arguments);
                };
              }
              subtype.init.prototype = subtype;
              subtype.$super = this;
              return subtype;
            },
            create: function() {
              var instance = this.extend();
              instance.init.apply(instance, arguments);
              return instance;
            },
            init: function() {
            },
            mixIn: function(properties) {
              for (var propertyName in properties) {
                if (properties.hasOwnProperty(propertyName)) {
                  this[propertyName] = properties[propertyName];
                }
              }
              if (properties.hasOwnProperty("toString")) {
                this.toString = properties.toString;
              }
            },
            clone: function() {
              return this.init.prototype.extend(this);
            }
          };
        }();
        var WordArray2 = C_lib.WordArray = Base.extend({
          init: function(words, sigBytes) {
            words = this.words = words || [];
            if (sigBytes != undefined2) {
              this.sigBytes = sigBytes;
            } else {
              this.sigBytes = words.length * 4;
            }
          },
          toString: function(encoder) {
            return (encoder || Hex).stringify(this);
          },
          concat: function(wordArray) {
            var thisWords = this.words;
            var thatWords = wordArray.words;
            var thisSigBytes = this.sigBytes;
            var thatSigBytes = wordArray.sigBytes;
            this.clamp();
            if (thisSigBytes % 4) {
              for (var i = 0; i < thatSigBytes; i++) {
                var thatByte = thatWords[i >>> 2] >>> 24 - i % 4 * 8 & 255;
                thisWords[thisSigBytes + i >>> 2] |= thatByte << 24 - (thisSigBytes + i) % 4 * 8;
              }
            } else {
              for (var j = 0; j < thatSigBytes; j += 4) {
                thisWords[thisSigBytes + j >>> 2] = thatWords[j >>> 2];
              }
            }
            this.sigBytes += thatSigBytes;
            return this;
          },
          clamp: function() {
            var words = this.words;
            var sigBytes = this.sigBytes;
            words[sigBytes >>> 2] &= 4294967295 << 32 - sigBytes % 4 * 8;
            words.length = Math2.ceil(sigBytes / 4);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone.words = this.words.slice(0);
            return clone;
          },
          random: function(nBytes) {
            var words = [];
            for (var i = 0; i < nBytes; i += 4) {
              words.push(cryptoSecureRandomInt2());
            }
            return new WordArray2.init(words, nBytes);
          }
        });
        var C_enc = C.enc = {};
        var Hex = C_enc.Hex = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var hexChars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              hexChars.push((bite >>> 4).toString(16));
              hexChars.push((bite & 15).toString(16));
            }
            return hexChars.join("");
          },
          parse: function(hexStr) {
            var hexStrLength = hexStr.length;
            var words = [];
            for (var i = 0; i < hexStrLength; i += 2) {
              words[i >>> 3] |= parseInt(hexStr.substr(i, 2), 16) << 24 - i % 8 * 4;
            }
            return new WordArray2.init(words, hexStrLength / 2);
          }
        };
        var Latin1 = C_enc.Latin1 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var latin1Chars = [];
            for (var i = 0; i < sigBytes; i++) {
              var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              latin1Chars.push(String.fromCharCode(bite));
            }
            return latin1Chars.join("");
          },
          parse: function(latin1Str) {
            var latin1StrLength = latin1Str.length;
            var words = [];
            for (var i = 0; i < latin1StrLength; i++) {
              words[i >>> 2] |= (latin1Str.charCodeAt(i) & 255) << 24 - i % 4 * 8;
            }
            return new WordArray2.init(words, latin1StrLength);
          }
        };
        var Utf8 = C_enc.Utf8 = {
          stringify: function(wordArray) {
            try {
              return decodeURIComponent(escape(Latin1.stringify(wordArray)));
            } catch (e) {
              throw new Error("Malformed UTF-8 data");
            }
          },
          parse: function(utf8Str) {
            return Latin1.parse(unescape(encodeURIComponent(utf8Str)));
          }
        };
        var BufferedBlockAlgorithm = C_lib.BufferedBlockAlgorithm = Base.extend({
          reset: function() {
            this._data = new WordArray2.init();
            this._nDataBytes = 0;
          },
          _append: function(data) {
            if (typeof data == "string") {
              data = Utf8.parse(data);
            }
            this._data.concat(data);
            this._nDataBytes += data.sigBytes;
          },
          _process: function(doFlush) {
            var processedWords;
            var data = this._data;
            var dataWords = data.words;
            var dataSigBytes = data.sigBytes;
            var blockSize = this.blockSize;
            var blockSizeBytes = blockSize * 4;
            var nBlocksReady = dataSigBytes / blockSizeBytes;
            if (doFlush) {
              nBlocksReady = Math2.ceil(nBlocksReady);
            } else {
              nBlocksReady = Math2.max((nBlocksReady | 0) - this._minBufferSize, 0);
            }
            var nWordsReady = nBlocksReady * blockSize;
            var nBytesReady = Math2.min(nWordsReady * 4, dataSigBytes);
            if (nWordsReady) {
              for (var offset = 0; offset < nWordsReady; offset += blockSize) {
                this._doProcessBlock(dataWords, offset);
              }
              processedWords = dataWords.splice(0, nWordsReady);
              data.sigBytes -= nBytesReady;
            }
            return new WordArray2.init(processedWords, nBytesReady);
          },
          clone: function() {
            var clone = Base.clone.call(this);
            clone._data = this._data.clone();
            return clone;
          },
          _minBufferSize: 0
        });
        var Hasher = C_lib.Hasher = BufferedBlockAlgorithm.extend({
          cfg: Base.extend(),
          init: function(cfg) {
            this.cfg = this.cfg.extend(cfg);
            this.reset();
          },
          reset: function() {
            BufferedBlockAlgorithm.reset.call(this);
            this._doReset();
          },
          update: function(messageUpdate) {
            this._append(messageUpdate);
            this._process();
            return this;
          },
          finalize: function(messageUpdate) {
            if (messageUpdate) {
              this._append(messageUpdate);
            }
            var hash = this._doFinalize();
            return hash;
          },
          blockSize: 512 / 32,
          _createHelper: function(hasher) {
            return function(message, cfg) {
              return new hasher.init(cfg).finalize(message);
            };
          },
          _createHmacHelper: function(hasher) {
            return function(message, key) {
              return new C_algo.HMAC.init(hasher, key).finalize(message);
            };
          }
        });
        var C_algo = C.algo = {};
        return C;
      }(Math);
      return CryptoJS3;
    });
  }
});

// node_modules/crypto-js/sha256.js
var require_sha2562 = __commonJS({
  "node_modules/crypto-js/sha256.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core2());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function(Math2) {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray2 = C_lib.WordArray;
        var Hasher = C_lib.Hasher;
        var C_algo = C.algo;
        var H = [];
        var K = [];
        (function() {
          function isPrime(n2) {
            var sqrtN = Math2.sqrt(n2);
            for (var factor = 2; factor <= sqrtN; factor++) {
              if (!(n2 % factor)) {
                return false;
              }
            }
            return true;
          }
          function getFractionalBits(n2) {
            return (n2 - (n2 | 0)) * 4294967296 | 0;
          }
          var n = 2;
          var nPrime = 0;
          while (nPrime < 64) {
            if (isPrime(n)) {
              if (nPrime < 8) {
                H[nPrime] = getFractionalBits(Math2.pow(n, 1 / 2));
              }
              K[nPrime] = getFractionalBits(Math2.pow(n, 1 / 3));
              nPrime++;
            }
            n++;
          }
        })();
        var W = [];
        var SHA2562 = C_algo.SHA256 = Hasher.extend({
          _doReset: function() {
            this._hash = new WordArray2.init(H.slice(0));
          },
          _doProcessBlock: function(M, offset) {
            var H2 = this._hash.words;
            var a = H2[0];
            var b = H2[1];
            var c = H2[2];
            var d = H2[3];
            var e = H2[4];
            var f = H2[5];
            var g = H2[6];
            var h = H2[7];
            for (var i = 0; i < 64; i++) {
              if (i < 16) {
                W[i] = M[offset + i] | 0;
              } else {
                var gamma0x = W[i - 15];
                var gamma0 = (gamma0x << 25 | gamma0x >>> 7) ^ (gamma0x << 14 | gamma0x >>> 18) ^ gamma0x >>> 3;
                var gamma1x = W[i - 2];
                var gamma1 = (gamma1x << 15 | gamma1x >>> 17) ^ (gamma1x << 13 | gamma1x >>> 19) ^ gamma1x >>> 10;
                W[i] = gamma0 + W[i - 7] + gamma1 + W[i - 16];
              }
              var ch = e & f ^ ~e & g;
              var maj = a & b ^ a & c ^ b & c;
              var sigma0 = (a << 30 | a >>> 2) ^ (a << 19 | a >>> 13) ^ (a << 10 | a >>> 22);
              var sigma1 = (e << 26 | e >>> 6) ^ (e << 21 | e >>> 11) ^ (e << 7 | e >>> 25);
              var t1 = h + sigma1 + ch + K[i] + W[i];
              var t2 = sigma0 + maj;
              h = g;
              g = f;
              f = e;
              e = d + t1 | 0;
              d = c;
              c = b;
              b = a;
              a = t1 + t2 | 0;
            }
            H2[0] = H2[0] + a | 0;
            H2[1] = H2[1] + b | 0;
            H2[2] = H2[2] + c | 0;
            H2[3] = H2[3] + d | 0;
            H2[4] = H2[4] + e | 0;
            H2[5] = H2[5] + f | 0;
            H2[6] = H2[6] + g | 0;
            H2[7] = H2[7] + h | 0;
          },
          _doFinalize: function() {
            var data = this._data;
            var dataWords = data.words;
            var nBitsTotal = this._nDataBytes * 8;
            var nBitsLeft = data.sigBytes * 8;
            dataWords[nBitsLeft >>> 5] |= 128 << 24 - nBitsLeft % 32;
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 14] = Math2.floor(nBitsTotal / 4294967296);
            dataWords[(nBitsLeft + 64 >>> 9 << 4) + 15] = nBitsTotal;
            data.sigBytes = dataWords.length * 4;
            this._process();
            return this._hash;
          },
          clone: function() {
            var clone = Hasher.clone.call(this);
            clone._hash = this._hash.clone();
            return clone;
          }
        });
        C.SHA256 = Hasher._createHelper(SHA2562);
        C.HmacSHA256 = Hasher._createHmacHelper(SHA2562);
      })(Math);
      return CryptoJS3.SHA256;
    });
  }
});

// node_modules/crypto-js/enc-base64.js
var require_enc_base642 = __commonJS({
  "node_modules/crypto-js/enc-base64.js"(exports, module) {
    (function(root, factory) {
      if (typeof exports === "object") {
        module.exports = exports = factory(require_core2());
      } else if (typeof define === "function" && define.amd) {
        define(["./core"], factory);
      } else {
        factory(root.CryptoJS);
      }
    })(exports, function(CryptoJS3) {
      (function() {
        var C = CryptoJS3;
        var C_lib = C.lib;
        var WordArray2 = C_lib.WordArray;
        var C_enc = C.enc;
        var Base643 = C_enc.Base64 = {
          stringify: function(wordArray) {
            var words = wordArray.words;
            var sigBytes = wordArray.sigBytes;
            var map = this._map;
            wordArray.clamp();
            var base64Chars = [];
            for (var i = 0; i < sigBytes; i += 3) {
              var byte1 = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
              var byte2 = words[i + 1 >>> 2] >>> 24 - (i + 1) % 4 * 8 & 255;
              var byte3 = words[i + 2 >>> 2] >>> 24 - (i + 2) % 4 * 8 & 255;
              var triplet = byte1 << 16 | byte2 << 8 | byte3;
              for (var j = 0; j < 4 && i + j * 0.75 < sigBytes; j++) {
                base64Chars.push(map.charAt(triplet >>> 6 * (3 - j) & 63));
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              while (base64Chars.length % 4) {
                base64Chars.push(paddingChar);
              }
            }
            return base64Chars.join("");
          },
          parse: function(base64Str) {
            var base64StrLength = base64Str.length;
            var map = this._map;
            var reverseMap = this._reverseMap;
            if (!reverseMap) {
              reverseMap = this._reverseMap = [];
              for (var j = 0; j < map.length; j++) {
                reverseMap[map.charCodeAt(j)] = j;
              }
            }
            var paddingChar = map.charAt(64);
            if (paddingChar) {
              var paddingIndex = base64Str.indexOf(paddingChar);
              if (paddingIndex !== -1) {
                base64StrLength = paddingIndex;
              }
            }
            return parseLoop(base64Str, base64StrLength, reverseMap);
          },
          _map: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="
        };
        function parseLoop(base64Str, base64StrLength, reverseMap) {
          var words = [];
          var nBytes = 0;
          for (var i = 0; i < base64StrLength; i++) {
            if (i % 4) {
              var bits1 = reverseMap[base64Str.charCodeAt(i - 1)] << i % 4 * 2;
              var bits2 = reverseMap[base64Str.charCodeAt(i)] >>> 6 - i % 4 * 2;
              var bitsCombined = bits1 | bits2;
              words[nBytes >>> 2] |= bitsCombined << 24 - nBytes % 4 * 8;
              nBytes++;
            }
          }
          return WordArray2.create(words, nBytes);
        }
      })();
      return CryptoJS3.enc.Base64;
    });
  }
});

// src/types/Auth.ts
var CognitoHostedUIIdentityProvider;
(function(CognitoHostedUIIdentityProvider2) {
  CognitoHostedUIIdentityProvider2["Cognito"] = "COGNITO";
  CognitoHostedUIIdentityProvider2["Google"] = "Google";
  CognitoHostedUIIdentityProvider2["Facebook"] = "Facebook";
  CognitoHostedUIIdentityProvider2["Amazon"] = "LoginWithAmazon";
  CognitoHostedUIIdentityProvider2["Apple"] = "SignInWithApple";
})(CognitoHostedUIIdentityProvider || (CognitoHostedUIIdentityProvider = {}));
function isFederatedSignInOptions(obj) {
  const keys = ["provider"];
  return obj && !!keys.find((k) => obj.hasOwnProperty(k));
}
function isFederatedSignInOptionsCustom(obj) {
  const keys = ["customProvider"];
  return obj && !!keys.find((k) => obj.hasOwnProperty(k));
}
function hasCustomState(obj) {
  const keys = ["customState"];
  return obj && !!keys.find((k) => obj.hasOwnProperty(k));
}
function isCognitoHostedOpts(oauth) {
  return oauth.redirectSignIn !== void 0;
}
var AuthErrorTypes;
(function(AuthErrorTypes2) {
  AuthErrorTypes2["NoConfig"] = "noConfig";
  AuthErrorTypes2["MissingAuthConfig"] = "missingAuthConfig";
  AuthErrorTypes2["EmptyUsername"] = "emptyUsername";
  AuthErrorTypes2["InvalidUsername"] = "invalidUsername";
  AuthErrorTypes2["EmptyPassword"] = "emptyPassword";
  AuthErrorTypes2["EmptyCode"] = "emptyCode";
  AuthErrorTypes2["SignUpError"] = "signUpError";
  AuthErrorTypes2["NoMFA"] = "noMFA";
  AuthErrorTypes2["InvalidMFA"] = "invalidMFA";
  AuthErrorTypes2["EmptyChallengeResponse"] = "emptyChallengeResponse";
  AuthErrorTypes2["NoUserSession"] = "noUserSession";
  AuthErrorTypes2["Default"] = "default";
  AuthErrorTypes2["DeviceConfig"] = "deviceConfig";
  AuthErrorTypes2["NetworkError"] = "networkError";
})(AuthErrorTypes || (AuthErrorTypes = {}));
function isUsernamePasswordOpts(obj) {
  return !!obj.username;
}

// src/Auth.ts
import {
  Amplify,
  ConsoleLogger as Logger3,
  Credentials,
  Hub as Hub2,
  StorageHelper as StorageHelper2,
  Parser,
  JS as JS2,
  UniversalStorage,
  urlSafeDecode
} from "http://localhost:8080/packages/core/4.3.4/core-esm.js";

// ../amazon-cognito-identity-js/es/AuthenticationDetails.js
var AuthenticationDetails = /* @__PURE__ */ function() {
  function AuthenticationDetails2(data) {
    var _ref = data || {}, ValidationData = _ref.ValidationData, Username = _ref.Username, Password = _ref.Password, AuthParameters = _ref.AuthParameters, ClientMetadata = _ref.ClientMetadata;
    this.validationData = ValidationData || {};
    this.authParameters = AuthParameters || {};
    this.clientMetadata = ClientMetadata || {};
    this.username = Username;
    this.password = Password;
  }
  var _proto = AuthenticationDetails2.prototype;
  _proto.getUsername = function getUsername() {
    return this.username;
  };
  _proto.getPassword = function getPassword() {
    return this.password;
  };
  _proto.getValidationData = function getValidationData() {
    return this.validationData;
  };
  _proto.getAuthParameters = function getAuthParameters() {
    return this.authParameters;
  };
  _proto.getClientMetadata = function getClientMetadata() {
    return this.clientMetadata;
  };
  return AuthenticationDetails2;
}();

// ../amazon-cognito-identity-js/es/AuthenticationHelper.js
var import_buffer = __toModule(require_buffer());
var import_core = __toModule(require_core());
var import_lib_typedarrays = __toModule(require_lib_typedarrays());
var import_sha256 = __toModule(require_sha256());
var import_hmac_sha256 = __toModule(require_hmac_sha256());

// ../amazon-cognito-identity-js/es/utils/cryptoSecureRandomInt.js
var crypto;
if (typeof window !== "undefined" && window.crypto) {
  crypto = window.crypto;
}
if (!crypto && typeof window !== "undefined" && window.msCrypto) {
  crypto = window.msCrypto;
}
if (!crypto && typeof window !== "undefined" && window.crypto) {
  crypto = window.crypto;
}
if (!crypto && typeof __require === "function") {
  try {
    crypto = require_crypto();
  } catch (err) {
  }
}
function cryptoSecureRandomInt() {
  if (crypto) {
    if (typeof crypto.getRandomValues === "function") {
      try {
        return crypto.getRandomValues(new Uint32Array(1))[0];
      } catch (err) {
      }
    }
    if (typeof crypto.randomBytes === "function") {
      try {
        return crypto.randomBytes(4).readInt32LE();
      } catch (err) {
      }
    }
  }
  throw new Error("Native crypto module could not be used to get secure random number.");
}

// ../amazon-cognito-identity-js/es/utils/WordArray.js
function hexStringify(wordArray) {
  var words = wordArray.words;
  var sigBytes = wordArray.sigBytes;
  var hexChars = [];
  for (var i = 0; i < sigBytes; i++) {
    var bite = words[i >>> 2] >>> 24 - i % 4 * 8 & 255;
    hexChars.push((bite >>> 4).toString(16));
    hexChars.push((bite & 15).toString(16));
  }
  return hexChars.join("");
}
var WordArray = /* @__PURE__ */ function() {
  function WordArray2(words, sigBytes) {
    words = this.words = words || [];
    if (sigBytes != void 0) {
      this.sigBytes = sigBytes;
    } else {
      this.sigBytes = words.length * 4;
    }
  }
  var _proto = WordArray2.prototype;
  _proto.random = function random(nBytes) {
    var words = [];
    for (var i = 0; i < nBytes; i += 4) {
      words.push(cryptoSecureRandomInt());
    }
    return new WordArray2(words, nBytes);
  };
  _proto.toString = function toString() {
    return hexStringify(this);
  };
  return WordArray2;
}();

// ../amazon-cognito-identity-js/es/BigInteger.js
var BigInteger_default = BigInteger;
function BigInteger(a, b) {
  if (a != null)
    this.fromString(a, b);
}
function nbi() {
  return new BigInteger(null);
}
var dbits;
var canary = 244837814094590;
var j_lm = (canary & 16777215) == 15715070;
function am1(i, x, w, j, c, n) {
  while (--n >= 0) {
    var v = x * this[i++] + w[j] + c;
    c = Math.floor(v / 67108864);
    w[j++] = v & 67108863;
  }
  return c;
}
function am2(i, x, w, j, c, n) {
  var xl = x & 32767, xh = x >> 15;
  while (--n >= 0) {
    var l = this[i] & 32767;
    var h = this[i++] >> 15;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 32767) << 15) + w[j] + (c & 1073741823);
    c = (l >>> 30) + (m >>> 15) + xh * h + (c >>> 30);
    w[j++] = l & 1073741823;
  }
  return c;
}
function am3(i, x, w, j, c, n) {
  var xl = x & 16383, xh = x >> 14;
  while (--n >= 0) {
    var l = this[i] & 16383;
    var h = this[i++] >> 14;
    var m = xh * l + h * xl;
    l = xl * l + ((m & 16383) << 14) + w[j] + c;
    c = (l >> 28) + (m >> 14) + xh * h;
    w[j++] = l & 268435455;
  }
  return c;
}
var inBrowser = typeof navigator !== "undefined";
if (inBrowser && j_lm && navigator.appName == "Microsoft Internet Explorer") {
  BigInteger.prototype.am = am2;
  dbits = 30;
} else if (inBrowser && j_lm && navigator.appName != "Netscape") {
  BigInteger.prototype.am = am1;
  dbits = 26;
} else {
  BigInteger.prototype.am = am3;
  dbits = 28;
}
BigInteger.prototype.DB = dbits;
BigInteger.prototype.DM = (1 << dbits) - 1;
BigInteger.prototype.DV = 1 << dbits;
var BI_FP = 52;
BigInteger.prototype.FV = Math.pow(2, BI_FP);
BigInteger.prototype.F1 = BI_FP - dbits;
BigInteger.prototype.F2 = 2 * dbits - BI_FP;
var BI_RM = "0123456789abcdefghijklmnopqrstuvwxyz";
var BI_RC = new Array();
var rr;
var vv;
rr = "0".charCodeAt(0);
for (vv = 0; vv <= 9; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "a".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
rr = "A".charCodeAt(0);
for (vv = 10; vv < 36; ++vv) {
  BI_RC[rr++] = vv;
}
function int2char(n) {
  return BI_RM.charAt(n);
}
function intAt(s, i) {
  var c = BI_RC[s.charCodeAt(i)];
  return c == null ? -1 : c;
}
function bnpCopyTo(r) {
  for (var i = this.t - 1; i >= 0; --i) {
    r[i] = this[i];
  }
  r.t = this.t;
  r.s = this.s;
}
function bnpFromInt(x) {
  this.t = 1;
  this.s = x < 0 ? -1 : 0;
  if (x > 0)
    this[0] = x;
  else if (x < -1)
    this[0] = x + this.DV;
  else
    this.t = 0;
}
function nbv(i) {
  var r = nbi();
  r.fromInt(i);
  return r;
}
function bnpFromString(s, b) {
  var k;
  if (b == 16)
    k = 4;
  else if (b == 8)
    k = 3;
  else if (b == 2)
    k = 1;
  else if (b == 32)
    k = 5;
  else if (b == 4)
    k = 2;
  else
    throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
  this.t = 0;
  this.s = 0;
  var i = s.length, mi = false, sh = 0;
  while (--i >= 0) {
    var x = intAt(s, i);
    if (x < 0) {
      if (s.charAt(i) == "-")
        mi = true;
      continue;
    }
    mi = false;
    if (sh == 0)
      this[this.t++] = x;
    else if (sh + k > this.DB) {
      this[this.t - 1] |= (x & (1 << this.DB - sh) - 1) << sh;
      this[this.t++] = x >> this.DB - sh;
    } else
      this[this.t - 1] |= x << sh;
    sh += k;
    if (sh >= this.DB)
      sh -= this.DB;
  }
  this.clamp();
  if (mi)
    BigInteger.ZERO.subTo(this, this);
}
function bnpClamp() {
  var c = this.s & this.DM;
  while (this.t > 0 && this[this.t - 1] == c) {
    --this.t;
  }
}
function bnToString(b) {
  if (this.s < 0)
    return "-" + this.negate().toString(b);
  var k;
  if (b == 16)
    k = 4;
  else if (b == 8)
    k = 3;
  else if (b == 2)
    k = 1;
  else if (b == 32)
    k = 5;
  else if (b == 4)
    k = 2;
  else
    throw new Error("Only radix 2, 4, 8, 16, 32 are supported");
  var km = (1 << k) - 1, d, m = false, r = "", i = this.t;
  var p = this.DB - i * this.DB % k;
  if (i-- > 0) {
    if (p < this.DB && (d = this[i] >> p) > 0) {
      m = true;
      r = int2char(d);
    }
    while (i >= 0) {
      if (p < k) {
        d = (this[i] & (1 << p) - 1) << k - p;
        d |= this[--i] >> (p += this.DB - k);
      } else {
        d = this[i] >> (p -= k) & km;
        if (p <= 0) {
          p += this.DB;
          --i;
        }
      }
      if (d > 0)
        m = true;
      if (m)
        r += int2char(d);
    }
  }
  return m ? r : "0";
}
function bnNegate() {
  var r = nbi();
  BigInteger.ZERO.subTo(this, r);
  return r;
}
function bnAbs() {
  return this.s < 0 ? this.negate() : this;
}
function bnCompareTo(a) {
  var r = this.s - a.s;
  if (r != 0)
    return r;
  var i = this.t;
  r = i - a.t;
  if (r != 0)
    return this.s < 0 ? -r : r;
  while (--i >= 0) {
    if ((r = this[i] - a[i]) != 0)
      return r;
  }
  return 0;
}
function nbits(x) {
  var r = 1, t;
  if ((t = x >>> 16) != 0) {
    x = t;
    r += 16;
  }
  if ((t = x >> 8) != 0) {
    x = t;
    r += 8;
  }
  if ((t = x >> 4) != 0) {
    x = t;
    r += 4;
  }
  if ((t = x >> 2) != 0) {
    x = t;
    r += 2;
  }
  if ((t = x >> 1) != 0) {
    x = t;
    r += 1;
  }
  return r;
}
function bnBitLength() {
  if (this.t <= 0)
    return 0;
  return this.DB * (this.t - 1) + nbits(this[this.t - 1] ^ this.s & this.DM);
}
function bnpDLShiftTo(n, r) {
  var i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + n] = this[i];
  }
  for (i = n - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r.t = this.t + n;
  r.s = this.s;
}
function bnpDRShiftTo(n, r) {
  for (var i = n; i < this.t; ++i) {
    r[i - n] = this[i];
  }
  r.t = Math.max(this.t - n, 0);
  r.s = this.s;
}
function bnpLShiftTo(n, r) {
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << cbs) - 1;
  var ds = Math.floor(n / this.DB), c = this.s << bs & this.DM, i;
  for (i = this.t - 1; i >= 0; --i) {
    r[i + ds + 1] = this[i] >> cbs | c;
    c = (this[i] & bm) << bs;
  }
  for (i = ds - 1; i >= 0; --i) {
    r[i] = 0;
  }
  r[ds] = c;
  r.t = this.t + ds + 1;
  r.s = this.s;
  r.clamp();
}
function bnpRShiftTo(n, r) {
  r.s = this.s;
  var ds = Math.floor(n / this.DB);
  if (ds >= this.t) {
    r.t = 0;
    return;
  }
  var bs = n % this.DB;
  var cbs = this.DB - bs;
  var bm = (1 << bs) - 1;
  r[0] = this[ds] >> bs;
  for (var i = ds + 1; i < this.t; ++i) {
    r[i - ds - 1] |= (this[i] & bm) << cbs;
    r[i - ds] = this[i] >> bs;
  }
  if (bs > 0)
    r[this.t - ds - 1] |= (this.s & bm) << cbs;
  r.t = this.t - ds;
  r.clamp();
}
function bnpSubTo(a, r) {
  var i = 0, c = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] - a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c -= a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c -= a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c -= a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c < -1)
    r[i++] = this.DV + c;
  else if (c > 0)
    r[i++] = c;
  r.t = i;
  r.clamp();
}
function bnpMultiplyTo(a, r) {
  var x = this.abs(), y = a.abs();
  var i = x.t;
  r.t = i + y.t;
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < y.t; ++i) {
    r[i + x.t] = x.am(0, y[i], r, i, 0, x.t);
  }
  r.s = 0;
  r.clamp();
  if (this.s != a.s)
    BigInteger.ZERO.subTo(r, r);
}
function bnpSquareTo(r) {
  var x = this.abs();
  var i = r.t = 2 * x.t;
  while (--i >= 0) {
    r[i] = 0;
  }
  for (i = 0; i < x.t - 1; ++i) {
    var c = x.am(i, x[i], r, 2 * i, 0, 1);
    if ((r[i + x.t] += x.am(i + 1, 2 * x[i], r, 2 * i + 1, c, x.t - i - 1)) >= x.DV) {
      r[i + x.t] -= x.DV;
      r[i + x.t + 1] = 1;
    }
  }
  if (r.t > 0)
    r[r.t - 1] += x.am(i, x[i], r, 2 * i, 0, 1);
  r.s = 0;
  r.clamp();
}
function bnpDivRemTo(m, q, r) {
  var pm = m.abs();
  if (pm.t <= 0)
    return;
  var pt = this.abs();
  if (pt.t < pm.t) {
    if (q != null)
      q.fromInt(0);
    if (r != null)
      this.copyTo(r);
    return;
  }
  if (r == null)
    r = nbi();
  var y = nbi(), ts = this.s, ms = m.s;
  var nsh = this.DB - nbits(pm[pm.t - 1]);
  if (nsh > 0) {
    pm.lShiftTo(nsh, y);
    pt.lShiftTo(nsh, r);
  } else {
    pm.copyTo(y);
    pt.copyTo(r);
  }
  var ys = y.t;
  var y0 = y[ys - 1];
  if (y0 == 0)
    return;
  var yt = y0 * (1 << this.F1) + (ys > 1 ? y[ys - 2] >> this.F2 : 0);
  var d1 = this.FV / yt, d2 = (1 << this.F1) / yt, e = 1 << this.F2;
  var i = r.t, j = i - ys, t = q == null ? nbi() : q;
  y.dlShiftTo(j, t);
  if (r.compareTo(t) >= 0) {
    r[r.t++] = 1;
    r.subTo(t, r);
  }
  BigInteger.ONE.dlShiftTo(ys, t);
  t.subTo(y, y);
  while (y.t < ys) {
    y[y.t++] = 0;
  }
  while (--j >= 0) {
    var qd = r[--i] == y0 ? this.DM : Math.floor(r[i] * d1 + (r[i - 1] + e) * d2);
    if ((r[i] += y.am(0, qd, r, j, 0, ys)) < qd) {
      y.dlShiftTo(j, t);
      r.subTo(t, r);
      while (r[i] < --qd) {
        r.subTo(t, r);
      }
    }
  }
  if (q != null) {
    r.drShiftTo(ys, q);
    if (ts != ms)
      BigInteger.ZERO.subTo(q, q);
  }
  r.t = ys;
  r.clamp();
  if (nsh > 0)
    r.rShiftTo(nsh, r);
  if (ts < 0)
    BigInteger.ZERO.subTo(r, r);
}
function bnMod(a) {
  var r = nbi();
  this.abs().divRemTo(a, null, r);
  if (this.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
    a.subTo(r, r);
  return r;
}
function bnpInvDigit() {
  if (this.t < 1)
    return 0;
  var x = this[0];
  if ((x & 1) == 0)
    return 0;
  var y = x & 3;
  y = y * (2 - (x & 15) * y) & 15;
  y = y * (2 - (x & 255) * y) & 255;
  y = y * (2 - ((x & 65535) * y & 65535)) & 65535;
  y = y * (2 - x * y % this.DV) % this.DV;
  return y > 0 ? this.DV - y : -y;
}
function bnEquals(a) {
  return this.compareTo(a) == 0;
}
function bnpAddTo(a, r) {
  var i = 0, c = 0, m = Math.min(a.t, this.t);
  while (i < m) {
    c += this[i] + a[i];
    r[i++] = c & this.DM;
    c >>= this.DB;
  }
  if (a.t < this.t) {
    c += a.s;
    while (i < this.t) {
      c += this[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += this.s;
  } else {
    c += this.s;
    while (i < a.t) {
      c += a[i];
      r[i++] = c & this.DM;
      c >>= this.DB;
    }
    c += a.s;
  }
  r.s = c < 0 ? -1 : 0;
  if (c > 0)
    r[i++] = c;
  else if (c < -1)
    r[i++] = this.DV + c;
  r.t = i;
  r.clamp();
}
function bnAdd(a) {
  var r = nbi();
  this.addTo(a, r);
  return r;
}
function bnSubtract(a) {
  var r = nbi();
  this.subTo(a, r);
  return r;
}
function bnMultiply(a) {
  var r = nbi();
  this.multiplyTo(a, r);
  return r;
}
function bnDivide(a) {
  var r = nbi();
  this.divRemTo(a, r, null);
  return r;
}
function Montgomery(m) {
  this.m = m;
  this.mp = m.invDigit();
  this.mpl = this.mp & 32767;
  this.mph = this.mp >> 15;
  this.um = (1 << m.DB - 15) - 1;
  this.mt2 = 2 * m.t;
}
function montConvert(x) {
  var r = nbi();
  x.abs().dlShiftTo(this.m.t, r);
  r.divRemTo(this.m, null, r);
  if (x.s < 0 && r.compareTo(BigInteger.ZERO) > 0)
    this.m.subTo(r, r);
  return r;
}
function montRevert(x) {
  var r = nbi();
  x.copyTo(r);
  this.reduce(r);
  return r;
}
function montReduce(x) {
  while (x.t <= this.mt2) {
    x[x.t++] = 0;
  }
  for (var i = 0; i < this.m.t; ++i) {
    var j = x[i] & 32767;
    var u0 = j * this.mpl + ((j * this.mph + (x[i] >> 15) * this.mpl & this.um) << 15) & x.DM;
    j = i + this.m.t;
    x[j] += this.m.am(0, u0, x, i, 0, this.m.t);
    while (x[j] >= x.DV) {
      x[j] -= x.DV;
      x[++j]++;
    }
  }
  x.clamp();
  x.drShiftTo(this.m.t, x);
  if (x.compareTo(this.m) >= 0)
    x.subTo(this.m, x);
}
function montSqrTo(x, r) {
  x.squareTo(r);
  this.reduce(r);
}
function montMulTo(x, y, r) {
  x.multiplyTo(y, r);
  this.reduce(r);
}
Montgomery.prototype.convert = montConvert;
Montgomery.prototype.revert = montRevert;
Montgomery.prototype.reduce = montReduce;
Montgomery.prototype.mulTo = montMulTo;
Montgomery.prototype.sqrTo = montSqrTo;
function bnModPow(e, m, callback) {
  var i = e.bitLength(), k, r = nbv(1), z = new Montgomery(m);
  if (i <= 0)
    return r;
  else if (i < 18)
    k = 1;
  else if (i < 48)
    k = 3;
  else if (i < 144)
    k = 4;
  else if (i < 768)
    k = 5;
  else
    k = 6;
  var g = new Array(), n = 3, k1 = k - 1, km = (1 << k) - 1;
  g[1] = z.convert(this);
  if (k > 1) {
    var g2 = nbi();
    z.sqrTo(g[1], g2);
    while (n <= km) {
      g[n] = nbi();
      z.mulTo(g2, g[n - 2], g[n]);
      n += 2;
    }
  }
  var j = e.t - 1, w, is1 = true, r2 = nbi(), t;
  i = nbits(e[j]) - 1;
  while (j >= 0) {
    if (i >= k1)
      w = e[j] >> i - k1 & km;
    else {
      w = (e[j] & (1 << i + 1) - 1) << k1 - i;
      if (j > 0)
        w |= e[j - 1] >> this.DB + i - k1;
    }
    n = k;
    while ((w & 1) == 0) {
      w >>= 1;
      --n;
    }
    if ((i -= n) < 0) {
      i += this.DB;
      --j;
    }
    if (is1) {
      g[w].copyTo(r);
      is1 = false;
    } else {
      while (n > 1) {
        z.sqrTo(r, r2);
        z.sqrTo(r2, r);
        n -= 2;
      }
      if (n > 0)
        z.sqrTo(r, r2);
      else {
        t = r;
        r = r2;
        r2 = t;
      }
      z.mulTo(r2, g[w], r);
    }
    while (j >= 0 && (e[j] & 1 << i) == 0) {
      z.sqrTo(r, r2);
      t = r;
      r = r2;
      r2 = t;
      if (--i < 0) {
        i = this.DB - 1;
        --j;
      }
    }
  }
  var result = z.revert(r);
  callback(null, result);
  return result;
}
BigInteger.prototype.copyTo = bnpCopyTo;
BigInteger.prototype.fromInt = bnpFromInt;
BigInteger.prototype.fromString = bnpFromString;
BigInteger.prototype.clamp = bnpClamp;
BigInteger.prototype.dlShiftTo = bnpDLShiftTo;
BigInteger.prototype.drShiftTo = bnpDRShiftTo;
BigInteger.prototype.lShiftTo = bnpLShiftTo;
BigInteger.prototype.rShiftTo = bnpRShiftTo;
BigInteger.prototype.subTo = bnpSubTo;
BigInteger.prototype.multiplyTo = bnpMultiplyTo;
BigInteger.prototype.squareTo = bnpSquareTo;
BigInteger.prototype.divRemTo = bnpDivRemTo;
BigInteger.prototype.invDigit = bnpInvDigit;
BigInteger.prototype.addTo = bnpAddTo;
BigInteger.prototype.toString = bnToString;
BigInteger.prototype.negate = bnNegate;
BigInteger.prototype.abs = bnAbs;
BigInteger.prototype.compareTo = bnCompareTo;
BigInteger.prototype.bitLength = bnBitLength;
BigInteger.prototype.mod = bnMod;
BigInteger.prototype.equals = bnEquals;
BigInteger.prototype.add = bnAdd;
BigInteger.prototype.subtract = bnSubtract;
BigInteger.prototype.multiply = bnMultiply;
BigInteger.prototype.divide = bnDivide;
BigInteger.prototype.modPow = bnModPow;
BigInteger.ZERO = nbv(0);
BigInteger.ONE = nbv(1);

// ../amazon-cognito-identity-js/es/AuthenticationHelper.js
function randomBytes(nBytes) {
  return import_buffer.Buffer.from(new WordArray().random(nBytes).toString(), "hex");
}
var HEX_MSB_REGEX = /^[89a-f]/i;
var initN = "FFFFFFFFFFFFFFFFC90FDAA22168C234C4C6628B80DC1CD129024E088A67CC74020BBEA63B139B22514A08798E3404DDEF9519B3CD3A431B302B0A6DF25F14374FE1356D6D51C245E485B576625E7EC6F44C42E9A637ED6B0BFF5CB6F406B7EDEE386BFB5A899FA5AE9F24117C4B1FE649286651ECE45B3DC2007CB8A163BF0598DA48361C55D39A69163FA8FD24CF5F83655D23DCA3AD961C62F356208552BB9ED529077096966D670C354E4ABC9804F1746C08CA18217C32905E462E36CE3BE39E772C180E86039B2783A2EC07A28FB5C55DF06F4C52C9DE2BCBF6955817183995497CEA956AE515D2261898FA051015728E5A8AAAC42DAD33170D04507A33A85521ABDF1CBA64ECFB850458DBEF0A8AEA71575D060C7DB3970F85A6E1E4C7ABF5AE8CDB0933D71E8C94E04A25619DCEE3D2261AD2EE6BF12FFA06D98A0864D87602733EC86A64521F2B18177B200CBBE117577A615D6C770988C0BAD946E208E24FA074E5AB3143DB5BFCE0FD108E4B82D120A93AD2CAFFFFFFFFFFFFFFFF";
var newPasswordRequiredChallengeUserAttributePrefix = "userAttributes.";
var AuthenticationHelper = /* @__PURE__ */ function() {
  function AuthenticationHelper2(PoolName) {
    this.N = new BigInteger_default(initN, 16);
    this.g = new BigInteger_default("2", 16);
    this.k = new BigInteger_default(this.hexHash("" + this.padHex(this.N) + this.padHex(this.g)), 16);
    this.smallAValue = this.generateRandomSmallA();
    this.getLargeAValue(function() {
    });
    this.infoBits = import_buffer.Buffer.from("Caldera Derived Key", "utf8");
    this.poolName = PoolName;
  }
  var _proto = AuthenticationHelper2.prototype;
  _proto.getSmallAValue = function getSmallAValue() {
    return this.smallAValue;
  };
  _proto.getLargeAValue = function getLargeAValue(callback) {
    var _this = this;
    if (this.largeAValue) {
      callback(null, this.largeAValue);
    } else {
      this.calculateA(this.smallAValue, function(err, largeAValue) {
        if (err) {
          callback(err, null);
        }
        _this.largeAValue = largeAValue;
        callback(null, _this.largeAValue);
      });
    }
  };
  _proto.generateRandomSmallA = function generateRandomSmallA() {
    var hexRandom = randomBytes(128).toString("hex");
    var randomBigInt = new BigInteger_default(hexRandom, 16);
    return randomBigInt;
  };
  _proto.generateRandomString = function generateRandomString() {
    return randomBytes(40).toString("base64");
  };
  _proto.getRandomPassword = function getRandomPassword() {
    return this.randomPassword;
  };
  _proto.getSaltDevices = function getSaltDevices() {
    return this.SaltToHashDevices;
  };
  _proto.getVerifierDevices = function getVerifierDevices() {
    return this.verifierDevices;
  };
  _proto.generateHashDevice = function generateHashDevice(deviceGroupKey, username, callback) {
    var _this2 = this;
    this.randomPassword = this.generateRandomString();
    var combinedString = "" + deviceGroupKey + username + ":" + this.randomPassword;
    var hashedString = this.hash(combinedString);
    var hexRandom = randomBytes(16).toString("hex");
    this.SaltToHashDevices = this.padHex(new BigInteger_default(hexRandom, 16));
    this.g.modPow(new BigInteger_default(this.hexHash(this.SaltToHashDevices + hashedString), 16), this.N, function(err, verifierDevicesNotPadded) {
      if (err) {
        callback(err, null);
      }
      _this2.verifierDevices = _this2.padHex(verifierDevicesNotPadded);
      callback(null, null);
    });
  };
  _proto.calculateA = function calculateA(a, callback) {
    var _this3 = this;
    this.g.modPow(a, this.N, function(err, A) {
      if (err) {
        callback(err, null);
      }
      if (A.mod(_this3.N).equals(BigInteger_default.ZERO)) {
        callback(new Error("Illegal paramater. A mod N cannot be 0."), null);
      }
      callback(null, A);
    });
  };
  _proto.calculateU = function calculateU(A, B) {
    this.UHexHash = this.hexHash(this.padHex(A) + this.padHex(B));
    var finalU = new BigInteger_default(this.UHexHash, 16);
    return finalU;
  };
  _proto.hash = function hash(buf) {
    var str = buf instanceof import_buffer.Buffer ? import_core.default.lib.WordArray.create(buf) : buf;
    var hashHex = (0, import_sha256.default)(str).toString();
    return new Array(64 - hashHex.length).join("0") + hashHex;
  };
  _proto.hexHash = function hexHash(hexStr) {
    return this.hash(import_buffer.Buffer.from(hexStr, "hex"));
  };
  _proto.computehkdf = function computehkdf(ikm, salt) {
    var infoBitsWordArray = import_core.default.lib.WordArray.create(import_buffer.Buffer.concat([this.infoBits, import_buffer.Buffer.from(String.fromCharCode(1), "utf8")]));
    var ikmWordArray = ikm instanceof import_buffer.Buffer ? import_core.default.lib.WordArray.create(ikm) : ikm;
    var saltWordArray = salt instanceof import_buffer.Buffer ? import_core.default.lib.WordArray.create(salt) : salt;
    var prk = (0, import_hmac_sha256.default)(ikmWordArray, saltWordArray);
    var hmac = (0, import_hmac_sha256.default)(infoBitsWordArray, prk);
    return import_buffer.Buffer.from(hmac.toString(), "hex").slice(0, 16);
  };
  _proto.getPasswordAuthenticationKey = function getPasswordAuthenticationKey(username, password, serverBValue, salt, callback) {
    var _this4 = this;
    if (serverBValue.mod(this.N).equals(BigInteger_default.ZERO)) {
      throw new Error("B cannot be zero.");
    }
    this.UValue = this.calculateU(this.largeAValue, serverBValue);
    if (this.UValue.equals(BigInteger_default.ZERO)) {
      throw new Error("U cannot be zero.");
    }
    var usernamePassword = "" + this.poolName + username + ":" + password;
    var usernamePasswordHash = this.hash(usernamePassword);
    var xValue = new BigInteger_default(this.hexHash(this.padHex(salt) + usernamePasswordHash), 16);
    this.calculateS(xValue, serverBValue, function(err, sValue) {
      if (err) {
        callback(err, null);
      }
      var hkdf = _this4.computehkdf(import_buffer.Buffer.from(_this4.padHex(sValue), "hex"), import_buffer.Buffer.from(_this4.padHex(_this4.UValue), "hex"));
      callback(null, hkdf);
    });
  };
  _proto.calculateS = function calculateS(xValue, serverBValue, callback) {
    var _this5 = this;
    this.g.modPow(xValue, this.N, function(err, gModPowXN) {
      if (err) {
        callback(err, null);
      }
      var intValue2 = serverBValue.subtract(_this5.k.multiply(gModPowXN));
      intValue2.modPow(_this5.smallAValue.add(_this5.UValue.multiply(xValue)), _this5.N, function(err2, result) {
        if (err2) {
          callback(err2, null);
        }
        callback(null, result.mod(_this5.N));
      });
    });
  };
  _proto.getNewPasswordRequiredChallengeUserAttributePrefix = function getNewPasswordRequiredChallengeUserAttributePrefix() {
    return newPasswordRequiredChallengeUserAttributePrefix;
  };
  _proto.padHex = function padHex(bigInt) {
    if (!(bigInt instanceof BigInteger_default)) {
      throw new Error("Not a BigInteger");
    }
    var isNegative = bigInt.compareTo(BigInteger_default.ZERO) < 0;
    var hexStr = bigInt.abs().toString(16);
    hexStr = hexStr.length % 2 !== 0 ? "0" + hexStr : hexStr;
    hexStr = HEX_MSB_REGEX.test(hexStr) ? "00" + hexStr : hexStr;
    if (isNegative) {
      var invertedNibbles = hexStr.split("").map(function(x) {
        var invertedNibble = ~parseInt(x, 16) & 15;
        return "0123456789ABCDEF".charAt(invertedNibble);
      }).join("");
      var flippedBitsBI = new BigInteger_default(invertedNibbles, 16).add(BigInteger_default.ONE);
      hexStr = flippedBitsBI.toString(16);
      if (hexStr.toUpperCase().startsWith("FF8")) {
        hexStr = hexStr.substring(2);
      }
    }
    return hexStr;
  };
  return AuthenticationHelper2;
}();

// ../amazon-cognito-identity-js/es/CognitoJwtToken.js
var import_buffer2 = __toModule(require_buffer());
var CognitoJwtToken = /* @__PURE__ */ function() {
  function CognitoJwtToken2(token) {
    this.jwtToken = token || "";
    this.payload = this.decodePayload();
  }
  var _proto = CognitoJwtToken2.prototype;
  _proto.getJwtToken = function getJwtToken() {
    return this.jwtToken;
  };
  _proto.getExpiration = function getExpiration() {
    return this.payload.exp;
  };
  _proto.getIssuedAt = function getIssuedAt() {
    return this.payload.iat;
  };
  _proto.decodePayload = function decodePayload() {
    var payload = this.jwtToken.split(".")[1];
    try {
      return JSON.parse(import_buffer2.Buffer.from(payload, "base64").toString("utf8"));
    } catch (err) {
      return {};
    }
  };
  return CognitoJwtToken2;
}();

// ../amazon-cognito-identity-js/es/CognitoAccessToken.js
function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf(subClass, superClass);
}
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf4(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf(o, p);
}
var CognitoAccessToken = /* @__PURE__ */ function(_CognitoJwtToken) {
  _inheritsLoose(CognitoAccessToken2, _CognitoJwtToken);
  function CognitoAccessToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, AccessToken = _ref.AccessToken;
    return _CognitoJwtToken.call(this, AccessToken || "") || this;
  }
  return CognitoAccessToken2;
}(CognitoJwtToken);

// ../amazon-cognito-identity-js/es/CognitoIdToken.js
function _inheritsLoose2(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf2(subClass, superClass);
}
function _setPrototypeOf2(o, p) {
  _setPrototypeOf2 = Object.setPrototypeOf || function _setPrototypeOf4(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf2(o, p);
}
var CognitoIdToken = /* @__PURE__ */ function(_CognitoJwtToken) {
  _inheritsLoose2(CognitoIdToken2, _CognitoJwtToken);
  function CognitoIdToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, IdToken = _ref.IdToken;
    return _CognitoJwtToken.call(this, IdToken || "") || this;
  }
  return CognitoIdToken2;
}(CognitoJwtToken);

// ../amazon-cognito-identity-js/es/CognitoRefreshToken.js
var CognitoRefreshToken = /* @__PURE__ */ function() {
  function CognitoRefreshToken2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, RefreshToken = _ref.RefreshToken;
    this.token = RefreshToken || "";
  }
  var _proto = CognitoRefreshToken2.prototype;
  _proto.getToken = function getToken() {
    return this.token;
  };
  return CognitoRefreshToken2;
}();

// ../amazon-cognito-identity-js/es/CognitoUser.js
var import_buffer3 = __toModule(require_buffer());
var import_core2 = __toModule(require_core());
var import_lib_typedarrays2 = __toModule(require_lib_typedarrays());
var import_enc_base64 = __toModule(require_enc_base64());
var import_hmac_sha2562 = __toModule(require_hmac_sha256());

// ../amazon-cognito-identity-js/es/CognitoUserSession.js
var CognitoUserSession = /* @__PURE__ */ function() {
  function CognitoUserSession2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, IdToken = _ref.IdToken, RefreshToken = _ref.RefreshToken, AccessToken = _ref.AccessToken, ClockDrift = _ref.ClockDrift;
    if (AccessToken == null || IdToken == null) {
      throw new Error("Id token and Access Token must be present.");
    }
    this.idToken = IdToken;
    this.refreshToken = RefreshToken;
    this.accessToken = AccessToken;
    this.clockDrift = ClockDrift === void 0 ? this.calculateClockDrift() : ClockDrift;
  }
  var _proto = CognitoUserSession2.prototype;
  _proto.getIdToken = function getIdToken() {
    return this.idToken;
  };
  _proto.getRefreshToken = function getRefreshToken() {
    return this.refreshToken;
  };
  _proto.getAccessToken = function getAccessToken() {
    return this.accessToken;
  };
  _proto.getClockDrift = function getClockDrift() {
    return this.clockDrift;
  };
  _proto.calculateClockDrift = function calculateClockDrift() {
    var now = Math.floor(new Date() / 1e3);
    var iat = Math.min(this.accessToken.getIssuedAt(), this.idToken.getIssuedAt());
    return now - iat;
  };
  _proto.isValid = function isValid() {
    var now = Math.floor(new Date() / 1e3);
    var adjusted = now - this.clockDrift;
    return adjusted < this.accessToken.getExpiration() && adjusted < this.idToken.getExpiration();
  };
  return CognitoUserSession2;
}();

// ../amazon-cognito-identity-js/es/DateHelper.js
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
var weekNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var DateHelper = /* @__PURE__ */ function() {
  function DateHelper2() {
  }
  var _proto = DateHelper2.prototype;
  _proto.getNowString = function getNowString() {
    var now = new Date();
    var weekDay = weekNames[now.getUTCDay()];
    var month = monthNames[now.getUTCMonth()];
    var day = now.getUTCDate();
    var hours = now.getUTCHours();
    if (hours < 10) {
      hours = "0" + hours;
    }
    var minutes = now.getUTCMinutes();
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    var seconds = now.getUTCSeconds();
    if (seconds < 10) {
      seconds = "0" + seconds;
    }
    var year = now.getUTCFullYear();
    var dateNow = weekDay + " " + month + " " + day + " " + hours + ":" + minutes + ":" + seconds + " UTC " + year;
    return dateNow;
  };
  return DateHelper2;
}();

// ../amazon-cognito-identity-js/es/CognitoUserAttribute.js
var CognitoUserAttribute = /* @__PURE__ */ function() {
  function CognitoUserAttribute2(_temp) {
    var _ref = _temp === void 0 ? {} : _temp, Name = _ref.Name, Value = _ref.Value;
    this.Name = Name || "";
    this.Value = Value || "";
  }
  var _proto = CognitoUserAttribute2.prototype;
  _proto.getValue = function getValue() {
    return this.Value;
  };
  _proto.setValue = function setValue(value) {
    this.Value = value;
    return this;
  };
  _proto.getName = function getName() {
    return this.Name;
  };
  _proto.setName = function setName(name) {
    this.Name = name;
    return this;
  };
  _proto.toString = function toString() {
    return JSON.stringify(this);
  };
  _proto.toJSON = function toJSON() {
    return {
      Name: this.Name,
      Value: this.Value
    };
  };
  return CognitoUserAttribute2;
}();

// ../amazon-cognito-identity-js/es/StorageHelper.js
var dataMemory = {};
var MemoryStorage = /* @__PURE__ */ function() {
  function MemoryStorage2() {
  }
  MemoryStorage2.setItem = function setItem(key, value) {
    dataMemory[key] = value;
    return dataMemory[key];
  };
  MemoryStorage2.getItem = function getItem(key) {
    return Object.prototype.hasOwnProperty.call(dataMemory, key) ? dataMemory[key] : void 0;
  };
  MemoryStorage2.removeItem = function removeItem(key) {
    return delete dataMemory[key];
  };
  MemoryStorage2.clear = function clear() {
    dataMemory = {};
    return dataMemory;
  };
  return MemoryStorage2;
}();
var StorageHelper = /* @__PURE__ */ function() {
  function StorageHelper3() {
    try {
      this.storageWindow = window.localStorage;
      this.storageWindow.setItem("aws.cognito.test-ls", 1);
      this.storageWindow.removeItem("aws.cognito.test-ls");
    } catch (exception) {
      this.storageWindow = MemoryStorage;
    }
  }
  var _proto = StorageHelper3.prototype;
  _proto.getStorage = function getStorage() {
    return this.storageWindow;
  };
  return StorageHelper3;
}();

// ../amazon-cognito-identity-js/es/CognitoUser.js
var isBrowser = typeof navigator !== "undefined";
var userAgent = isBrowser ? navigator.userAgent : "nodejs";
var CognitoUser = /* @__PURE__ */ function() {
  function CognitoUser2(data) {
    if (data == null || data.Username == null || data.Pool == null) {
      throw new Error("Username and Pool information are required.");
    }
    this.username = data.Username || "";
    this.pool = data.Pool;
    this.Session = null;
    this.client = data.Pool.client;
    this.signInUserSession = null;
    this.authenticationFlowType = "USER_SRP_AUTH";
    this.storage = data.Storage || new StorageHelper().getStorage();
    this.keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    this.userDataKey = this.keyPrefix + "." + this.username + ".userData";
  }
  var _proto = CognitoUser2.prototype;
  _proto.setSignInUserSession = function setSignInUserSession(signInUserSession) {
    this.clearCachedUserData();
    this.signInUserSession = signInUserSession;
    this.cacheTokens();
  };
  _proto.getSignInUserSession = function getSignInUserSession() {
    return this.signInUserSession;
  };
  _proto.getUsername = function getUsername() {
    return this.username;
  };
  _proto.getAuthenticationFlowType = function getAuthenticationFlowType() {
    return this.authenticationFlowType;
  };
  _proto.setAuthenticationFlowType = function setAuthenticationFlowType(authenticationFlowType) {
    this.authenticationFlowType = authenticationFlowType;
  };
  _proto.initiateAuth = function initiateAuth(authDetails, callback) {
    var _this = this;
    var authParameters = authDetails.getAuthParameters();
    authParameters.USERNAME = this.username;
    var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
    var jsonReq = {
      AuthFlow: "CUSTOM_AUTH",
      ClientId: this.pool.getClientId(),
      AuthParameters: authParameters,
      ClientMetadata: clientMetaData
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("InitiateAuth", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      var challengeName = data.ChallengeName;
      var challengeParameters = data.ChallengeParameters;
      if (challengeName === "CUSTOM_CHALLENGE") {
        _this.Session = data.Session;
        return callback.customChallenge(challengeParameters);
      }
      _this.signInUserSession = _this.getCognitoUserSession(data.AuthenticationResult);
      _this.cacheTokens();
      return callback.onSuccess(_this.signInUserSession);
    });
  };
  _proto.authenticateUser = function authenticateUser(authDetails, callback) {
    if (this.authenticationFlowType === "USER_PASSWORD_AUTH") {
      return this.authenticateUserPlainUsernamePassword(authDetails, callback);
    } else if (this.authenticationFlowType === "USER_SRP_AUTH" || this.authenticationFlowType === "CUSTOM_AUTH") {
      return this.authenticateUserDefaultAuth(authDetails, callback);
    }
    return callback.onFailure(new Error("Authentication flow type is invalid."));
  };
  _proto.authenticateUserDefaultAuth = function authenticateUserDefaultAuth(authDetails, callback) {
    var _this2 = this;
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    var dateHelper = new DateHelper();
    var serverBValue;
    var salt;
    var authParameters = {};
    if (this.deviceKey != null) {
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    authParameters.USERNAME = this.username;
    authenticationHelper.getLargeAValue(function(errOnAValue, aValue) {
      if (errOnAValue) {
        callback.onFailure(errOnAValue);
      }
      authParameters.SRP_A = aValue.toString(16);
      if (_this2.authenticationFlowType === "CUSTOM_AUTH") {
        authParameters.CHALLENGE_NAME = "SRP_A";
      }
      var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
      var jsonReq = {
        AuthFlow: _this2.authenticationFlowType,
        ClientId: _this2.pool.getClientId(),
        AuthParameters: authParameters,
        ClientMetadata: clientMetaData
      };
      if (_this2.getUserContextData(_this2.username)) {
        jsonReq.UserContextData = _this2.getUserContextData(_this2.username);
      }
      _this2.client.request("InitiateAuth", jsonReq, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        var challengeParameters = data.ChallengeParameters;
        _this2.username = challengeParameters.USER_ID_FOR_SRP;
        _this2.userDataKey = _this2.keyPrefix + "." + _this2.username + ".userData";
        serverBValue = new BigInteger_default(challengeParameters.SRP_B, 16);
        salt = new BigInteger_default(challengeParameters.SALT, 16);
        _this2.getCachedDeviceKeyAndPassword();
        authenticationHelper.getPasswordAuthenticationKey(_this2.username, authDetails.getPassword(), serverBValue, salt, function(errOnHkdf, hkdf) {
          if (errOnHkdf) {
            callback.onFailure(errOnHkdf);
          }
          var dateNow = dateHelper.getNowString();
          var message = import_core2.default.lib.WordArray.create(import_buffer3.Buffer.concat([import_buffer3.Buffer.from(_this2.pool.getUserPoolId().split("_")[1], "utf8"), import_buffer3.Buffer.from(_this2.username, "utf8"), import_buffer3.Buffer.from(challengeParameters.SECRET_BLOCK, "base64"), import_buffer3.Buffer.from(dateNow, "utf8")]));
          var key = import_core2.default.lib.WordArray.create(hkdf);
          var signatureString = import_enc_base64.default.stringify((0, import_hmac_sha2562.default)(message, key));
          var challengeResponses = {};
          challengeResponses.USERNAME = _this2.username;
          challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK = challengeParameters.SECRET_BLOCK;
          challengeResponses.TIMESTAMP = dateNow;
          challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;
          if (_this2.deviceKey != null) {
            challengeResponses.DEVICE_KEY = _this2.deviceKey;
          }
          var respondToAuthChallenge = function respondToAuthChallenge2(challenge, challengeCallback) {
            return _this2.client.request("RespondToAuthChallenge", challenge, function(errChallenge, dataChallenge) {
              if (errChallenge && errChallenge.code === "ResourceNotFoundException" && errChallenge.message.toLowerCase().indexOf("device") !== -1) {
                challengeResponses.DEVICE_KEY = null;
                _this2.deviceKey = null;
                _this2.randomPassword = null;
                _this2.deviceGroupKey = null;
                _this2.clearCachedDeviceKeyAndPassword();
                return respondToAuthChallenge2(challenge, challengeCallback);
              }
              return challengeCallback(errChallenge, dataChallenge);
            });
          };
          var jsonReqResp = {
            ChallengeName: "PASSWORD_VERIFIER",
            ClientId: _this2.pool.getClientId(),
            ChallengeResponses: challengeResponses,
            Session: data.Session,
            ClientMetadata: clientMetaData
          };
          if (_this2.getUserContextData()) {
            jsonReqResp.UserContextData = _this2.getUserContextData();
          }
          respondToAuthChallenge(jsonReqResp, function(errAuthenticate, dataAuthenticate) {
            if (errAuthenticate) {
              return callback.onFailure(errAuthenticate);
            }
            return _this2.authenticateUserInternal(dataAuthenticate, authenticationHelper, callback);
          });
          return void 0;
        });
        return void 0;
      });
    });
  };
  _proto.authenticateUserPlainUsernamePassword = function authenticateUserPlainUsernamePassword(authDetails, callback) {
    var _this3 = this;
    var authParameters = {};
    authParameters.USERNAME = this.username;
    authParameters.PASSWORD = authDetails.getPassword();
    if (!authParameters.PASSWORD) {
      callback.onFailure(new Error("PASSWORD parameter is required"));
      return;
    }
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    this.getCachedDeviceKeyAndPassword();
    if (this.deviceKey != null) {
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    var clientMetaData = Object.keys(authDetails.getValidationData()).length !== 0 ? authDetails.getValidationData() : authDetails.getClientMetadata();
    var jsonReq = {
      AuthFlow: "USER_PASSWORD_AUTH",
      ClientId: this.pool.getClientId(),
      AuthParameters: authParameters,
      ClientMetadata: clientMetaData
    };
    if (this.getUserContextData(this.username)) {
      jsonReq.UserContextData = this.getUserContextData(this.username);
    }
    this.client.request("InitiateAuth", jsonReq, function(err, authResult) {
      if (err) {
        return callback.onFailure(err);
      }
      return _this3.authenticateUserInternal(authResult, authenticationHelper, callback);
    });
  };
  _proto.authenticateUserInternal = function authenticateUserInternal(dataAuthenticate, authenticationHelper, callback) {
    var _this4 = this;
    var challengeName = dataAuthenticate.ChallengeName;
    var challengeParameters = dataAuthenticate.ChallengeParameters;
    if (challengeName === "SMS_MFA") {
      this.Session = dataAuthenticate.Session;
      return callback.mfaRequired(challengeName, challengeParameters);
    }
    if (challengeName === "SELECT_MFA_TYPE") {
      this.Session = dataAuthenticate.Session;
      return callback.selectMFAType(challengeName, challengeParameters);
    }
    if (challengeName === "MFA_SETUP") {
      this.Session = dataAuthenticate.Session;
      return callback.mfaSetup(challengeName, challengeParameters);
    }
    if (challengeName === "SOFTWARE_TOKEN_MFA") {
      this.Session = dataAuthenticate.Session;
      return callback.totpRequired(challengeName, challengeParameters);
    }
    if (challengeName === "CUSTOM_CHALLENGE") {
      this.Session = dataAuthenticate.Session;
      return callback.customChallenge(challengeParameters);
    }
    if (challengeName === "NEW_PASSWORD_REQUIRED") {
      this.Session = dataAuthenticate.Session;
      var userAttributes = null;
      var rawRequiredAttributes = null;
      var requiredAttributes = [];
      var userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();
      if (challengeParameters) {
        userAttributes = JSON.parse(dataAuthenticate.ChallengeParameters.userAttributes);
        rawRequiredAttributes = JSON.parse(dataAuthenticate.ChallengeParameters.requiredAttributes);
      }
      if (rawRequiredAttributes) {
        for (var i = 0; i < rawRequiredAttributes.length; i++) {
          requiredAttributes[i] = rawRequiredAttributes[i].substr(userAttributesPrefix.length);
        }
      }
      return callback.newPasswordRequired(userAttributes, requiredAttributes);
    }
    if (challengeName === "DEVICE_SRP_AUTH") {
      this.Session = dataAuthenticate.Session;
      this.getDeviceResponse(callback);
      return void 0;
    }
    this.signInUserSession = this.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
    this.challengeName = challengeName;
    this.cacheTokens();
    var newDeviceMetadata = dataAuthenticate.AuthenticationResult.NewDeviceMetadata;
    if (newDeviceMetadata == null) {
      return callback.onSuccess(this.signInUserSession);
    }
    authenticationHelper.generateHashDevice(dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey, function(errGenHash) {
      if (errGenHash) {
        return callback.onFailure(errGenHash);
      }
      var deviceSecretVerifierConfig = {
        Salt: import_buffer3.Buffer.from(authenticationHelper.getSaltDevices(), "hex").toString("base64"),
        PasswordVerifier: import_buffer3.Buffer.from(authenticationHelper.getVerifierDevices(), "hex").toString("base64")
      };
      _this4.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
      _this4.deviceGroupKey = newDeviceMetadata.DeviceGroupKey;
      _this4.randomPassword = authenticationHelper.getRandomPassword();
      _this4.client.request("ConfirmDevice", {
        DeviceKey: newDeviceMetadata.DeviceKey,
        AccessToken: _this4.signInUserSession.getAccessToken().getJwtToken(),
        DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
        DeviceName: userAgent
      }, function(errConfirm, dataConfirm) {
        if (errConfirm) {
          return callback.onFailure(errConfirm);
        }
        _this4.deviceKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
        _this4.cacheDeviceKeyAndPassword();
        if (dataConfirm.UserConfirmationNecessary === true) {
          return callback.onSuccess(_this4.signInUserSession, dataConfirm.UserConfirmationNecessary);
        }
        return callback.onSuccess(_this4.signInUserSession);
      });
      return void 0;
    });
    return void 0;
  };
  _proto.completeNewPasswordChallenge = function completeNewPasswordChallenge(newPassword, requiredAttributeData, callback, clientMetadata) {
    var _this5 = this;
    if (!newPassword) {
      return callback.onFailure(new Error("New password is required."));
    }
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    var userAttributesPrefix = authenticationHelper.getNewPasswordRequiredChallengeUserAttributePrefix();
    var finalUserAttributes = {};
    if (requiredAttributeData) {
      Object.keys(requiredAttributeData).forEach(function(key) {
        finalUserAttributes[userAttributesPrefix + key] = requiredAttributeData[key];
      });
    }
    finalUserAttributes.NEW_PASSWORD = newPassword;
    finalUserAttributes.USERNAME = this.username;
    var jsonReq = {
      ChallengeName: "NEW_PASSWORD_REQUIRED",
      ClientId: this.pool.getClientId(),
      ChallengeResponses: finalUserAttributes,
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(errAuthenticate, dataAuthenticate) {
      if (errAuthenticate) {
        return callback.onFailure(errAuthenticate);
      }
      return _this5.authenticateUserInternal(dataAuthenticate, authenticationHelper, callback);
    });
    return void 0;
  };
  _proto.getDeviceResponse = function getDeviceResponse(callback, clientMetadata) {
    var _this6 = this;
    var authenticationHelper = new AuthenticationHelper(this.deviceGroupKey);
    var dateHelper = new DateHelper();
    var authParameters = {};
    authParameters.USERNAME = this.username;
    authParameters.DEVICE_KEY = this.deviceKey;
    authenticationHelper.getLargeAValue(function(errAValue, aValue) {
      if (errAValue) {
        callback.onFailure(errAValue);
      }
      authParameters.SRP_A = aValue.toString(16);
      var jsonReq = {
        ChallengeName: "DEVICE_SRP_AUTH",
        ClientId: _this6.pool.getClientId(),
        ChallengeResponses: authParameters,
        ClientMetadata: clientMetadata,
        Session: _this6.Session
      };
      if (_this6.getUserContextData()) {
        jsonReq.UserContextData = _this6.getUserContextData();
      }
      _this6.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        var challengeParameters = data.ChallengeParameters;
        var serverBValue = new BigInteger_default(challengeParameters.SRP_B, 16);
        var salt = new BigInteger_default(challengeParameters.SALT, 16);
        authenticationHelper.getPasswordAuthenticationKey(_this6.deviceKey, _this6.randomPassword, serverBValue, salt, function(errHkdf, hkdf) {
          if (errHkdf) {
            return callback.onFailure(errHkdf);
          }
          var dateNow = dateHelper.getNowString();
          var message = import_core2.default.lib.WordArray.create(import_buffer3.Buffer.concat([import_buffer3.Buffer.from(_this6.deviceGroupKey, "utf8"), import_buffer3.Buffer.from(_this6.deviceKey, "utf8"), import_buffer3.Buffer.from(challengeParameters.SECRET_BLOCK, "base64"), import_buffer3.Buffer.from(dateNow, "utf8")]));
          var key = import_core2.default.lib.WordArray.create(hkdf);
          var signatureString = import_enc_base64.default.stringify((0, import_hmac_sha2562.default)(message, key));
          var challengeResponses = {};
          challengeResponses.USERNAME = _this6.username;
          challengeResponses.PASSWORD_CLAIM_SECRET_BLOCK = challengeParameters.SECRET_BLOCK;
          challengeResponses.TIMESTAMP = dateNow;
          challengeResponses.PASSWORD_CLAIM_SIGNATURE = signatureString;
          challengeResponses.DEVICE_KEY = _this6.deviceKey;
          var jsonReqResp = {
            ChallengeName: "DEVICE_PASSWORD_VERIFIER",
            ClientId: _this6.pool.getClientId(),
            ChallengeResponses: challengeResponses,
            Session: data.Session
          };
          if (_this6.getUserContextData()) {
            jsonReqResp.UserContextData = _this6.getUserContextData();
          }
          _this6.client.request("RespondToAuthChallenge", jsonReqResp, function(errAuthenticate, dataAuthenticate) {
            if (errAuthenticate) {
              return callback.onFailure(errAuthenticate);
            }
            _this6.signInUserSession = _this6.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
            _this6.cacheTokens();
            return callback.onSuccess(_this6.signInUserSession);
          });
          return void 0;
        });
        return void 0;
      });
    });
  };
  _proto.confirmRegistration = function confirmRegistration(confirmationCode, forceAliasCreation, callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      ConfirmationCode: confirmationCode,
      Username: this.username,
      ForceAliasCreation: forceAliasCreation,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ConfirmSignUp", jsonReq, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
  };
  _proto.sendCustomChallengeAnswer = function sendCustomChallengeAnswer(answerChallenge, callback, clientMetadata) {
    var _this7 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.ANSWER = answerChallenge;
    var authenticationHelper = new AuthenticationHelper(this.pool.getUserPoolId().split("_")[1]);
    this.getCachedDeviceKeyAndPassword();
    if (this.deviceKey != null) {
      challengeResponses.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ChallengeName: "CUSTOM_CHALLENGE",
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return _this7.authenticateUserInternal(data, authenticationHelper, callback);
    });
  };
  _proto.sendMFACode = function sendMFACode(confirmationCode, callback, mfaType, clientMetadata) {
    var _this8 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.SMS_MFA_CODE = confirmationCode;
    var mfaTypeSelection = mfaType || "SMS_MFA";
    if (mfaTypeSelection === "SOFTWARE_TOKEN_MFA") {
      challengeResponses.SOFTWARE_TOKEN_MFA_CODE = confirmationCode;
    }
    if (this.deviceKey != null) {
      challengeResponses.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ChallengeName: mfaTypeSelection,
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, dataAuthenticate) {
      if (err) {
        return callback.onFailure(err);
      }
      var challengeName = dataAuthenticate.ChallengeName;
      if (challengeName === "DEVICE_SRP_AUTH") {
        _this8.getDeviceResponse(callback);
        return void 0;
      }
      _this8.signInUserSession = _this8.getCognitoUserSession(dataAuthenticate.AuthenticationResult);
      _this8.cacheTokens();
      if (dataAuthenticate.AuthenticationResult.NewDeviceMetadata == null) {
        return callback.onSuccess(_this8.signInUserSession);
      }
      var authenticationHelper = new AuthenticationHelper(_this8.pool.getUserPoolId().split("_")[1]);
      authenticationHelper.generateHashDevice(dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey, dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey, function(errGenHash) {
        if (errGenHash) {
          return callback.onFailure(errGenHash);
        }
        var deviceSecretVerifierConfig = {
          Salt: import_buffer3.Buffer.from(authenticationHelper.getSaltDevices(), "hex").toString("base64"),
          PasswordVerifier: import_buffer3.Buffer.from(authenticationHelper.getVerifierDevices(), "hex").toString("base64")
        };
        _this8.verifierDevices = deviceSecretVerifierConfig.PasswordVerifier;
        _this8.deviceGroupKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceGroupKey;
        _this8.randomPassword = authenticationHelper.getRandomPassword();
        _this8.client.request("ConfirmDevice", {
          DeviceKey: dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey,
          AccessToken: _this8.signInUserSession.getAccessToken().getJwtToken(),
          DeviceSecretVerifierConfig: deviceSecretVerifierConfig,
          DeviceName: userAgent
        }, function(errConfirm, dataConfirm) {
          if (errConfirm) {
            return callback.onFailure(errConfirm);
          }
          _this8.deviceKey = dataAuthenticate.AuthenticationResult.NewDeviceMetadata.DeviceKey;
          _this8.cacheDeviceKeyAndPassword();
          if (dataConfirm.UserConfirmationNecessary === true) {
            return callback.onSuccess(_this8.signInUserSession, dataConfirm.UserConfirmationNecessary);
          }
          return callback.onSuccess(_this8.signInUserSession);
        });
        return void 0;
      });
      return void 0;
    });
  };
  _proto.changePassword = function changePassword(oldUserPassword, newUserPassword, callback, clientMetadata) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("ChangePassword", {
      PreviousPassword: oldUserPassword,
      ProposedPassword: newUserPassword,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.enableMFA = function enableMFA(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    var mfaOptions = [];
    var mfaEnabled = {
      DeliveryMedium: "SMS",
      AttributeName: "phone_number"
    };
    mfaOptions.push(mfaEnabled);
    this.client.request("SetUserSettings", {
      MFAOptions: mfaOptions,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.setUserMfaPreference = function setUserMfaPreference(smsMfaSettings, softwareTokenMfaSettings, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("SetUserMFAPreference", {
      SMSMfaSettings: smsMfaSettings,
      SoftwareTokenMfaSettings: softwareTokenMfaSettings,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.disableMFA = function disableMFA(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    var mfaOptions = [];
    this.client.request("SetUserSettings", {
      MFAOptions: mfaOptions,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.deleteUser = function deleteUser(callback, clientMetadata) {
    var _this9 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("DeleteUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      _this9.clearCachedUser();
      return callback(null, "SUCCESS");
    });
    return void 0;
  };
  _proto.updateAttributes = function updateAttributes(attributes, callback, clientMetadata) {
    var _this10 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("UpdateUserAttributes", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      UserAttributes: attributes,
      ClientMetadata: clientMetadata
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return _this10.getUserData(function() {
        return callback(null, "SUCCESS");
      }, {
        bypassCache: true
      });
    });
    return void 0;
  };
  _proto.getUserAttributes = function getUserAttributes(callback) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err, userData) {
      if (err) {
        return callback(err, null);
      }
      var attributeList = [];
      for (var i = 0; i < userData.UserAttributes.length; i++) {
        var attribute = {
          Name: userData.UserAttributes[i].Name,
          Value: userData.UserAttributes[i].Value
        };
        var userAttribute = new CognitoUserAttribute(attribute);
        attributeList.push(userAttribute);
      }
      return callback(null, attributeList);
    });
    return void 0;
  };
  _proto.getMFAOptions = function getMFAOptions(callback) {
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err, userData) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, userData.MFAOptions);
    });
    return void 0;
  };
  _proto.createGetUserRequest = function createGetUserRequest() {
    return this.client.promisifyRequest("GetUser", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    });
  };
  _proto.refreshSessionIfPossible = function refreshSessionIfPossible(options) {
    var _this11 = this;
    if (options === void 0) {
      options = {};
    }
    return new Promise(function(resolve) {
      var refresh = _this11.signInUserSession.getRefreshToken();
      if (refresh && refresh.getToken()) {
        _this11.refreshSession(refresh, resolve, options.clientMetadata);
      } else {
        resolve();
      }
    });
  };
  _proto.getUserData = function getUserData(callback, params) {
    var _this12 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.clearCachedUserData();
      return callback(new Error("User is not authenticated"), null);
    }
    var userData = this.getUserDataFromCache();
    if (!userData) {
      this.fetchUserData().then(function(data) {
        callback(null, data);
      })["catch"](callback);
      return;
    }
    if (this.isFetchUserDataAndTokenRequired(params)) {
      this.fetchUserData().then(function(data) {
        return _this12.refreshSessionIfPossible(params).then(function() {
          return data;
        });
      }).then(function(data) {
        return callback(null, data);
      })["catch"](callback);
      return;
    }
    try {
      callback(null, JSON.parse(userData));
      return;
    } catch (err) {
      this.clearCachedUserData();
      callback(err, null);
      return;
    }
  };
  _proto.getUserDataFromCache = function getUserDataFromCache() {
    var userData = this.storage.getItem(this.userDataKey);
    return userData;
  };
  _proto.isFetchUserDataAndTokenRequired = function isFetchUserDataAndTokenRequired(params) {
    var _ref = params || {}, _ref$bypassCache = _ref.bypassCache, bypassCache = _ref$bypassCache === void 0 ? false : _ref$bypassCache;
    return bypassCache;
  };
  _proto.fetchUserData = function fetchUserData() {
    var _this13 = this;
    return this.createGetUserRequest().then(function(data) {
      _this13.cacheUserData(data);
      return data;
    });
  };
  _proto.deleteAttributes = function deleteAttributes(attributeList, callback) {
    var _this14 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      return callback(new Error("User is not authenticated"), null);
    }
    this.client.request("DeleteUserAttributes", {
      UserAttributeNames: attributeList,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback(err, null);
      }
      return _this14.getUserData(function() {
        return callback(null, "SUCCESS");
      }, {
        bypassCache: true
      });
    });
    return void 0;
  };
  _proto.resendConfirmationCode = function resendConfirmationCode(callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ClientMetadata: clientMetadata
    };
    this.client.request("ResendConfirmationCode", jsonReq, function(err, result) {
      if (err) {
        return callback(err, null);
      }
      return callback(null, result);
    });
  };
  _proto.getSession = function getSession(callback, options) {
    if (options === void 0) {
      options = {};
    }
    if (this.username == null) {
      return callback(new Error("Username is null. Cannot retrieve a new session"), null);
    }
    if (this.signInUserSession != null && this.signInUserSession.isValid()) {
      return callback(null, this.signInUserSession);
    }
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var idTokenKey = keyPrefix + ".idToken";
    var accessTokenKey = keyPrefix + ".accessToken";
    var refreshTokenKey = keyPrefix + ".refreshToken";
    var clockDriftKey = keyPrefix + ".clockDrift";
    if (this.storage.getItem(idTokenKey)) {
      var idToken = new CognitoIdToken({
        IdToken: this.storage.getItem(idTokenKey)
      });
      var accessToken = new CognitoAccessToken({
        AccessToken: this.storage.getItem(accessTokenKey)
      });
      var refreshToken = new CognitoRefreshToken({
        RefreshToken: this.storage.getItem(refreshTokenKey)
      });
      var clockDrift = parseInt(this.storage.getItem(clockDriftKey), 0) || 0;
      var sessionData = {
        IdToken: idToken,
        AccessToken: accessToken,
        RefreshToken: refreshToken,
        ClockDrift: clockDrift
      };
      var cachedSession = new CognitoUserSession(sessionData);
      if (cachedSession.isValid()) {
        this.signInUserSession = cachedSession;
        return callback(null, this.signInUserSession);
      }
      if (!refreshToken.getToken()) {
        return callback(new Error("Cannot retrieve a new session. Please authenticate."), null);
      }
      this.refreshSession(refreshToken, callback, options.clientMetadata);
    } else {
      callback(new Error("Local storage is missing an ID Token, Please authenticate"), null);
    }
    return void 0;
  };
  _proto.refreshSession = function refreshSession(refreshToken, callback, clientMetadata) {
    var _this15 = this;
    var wrappedCallback = this.pool.wrapRefreshSessionCallback ? this.pool.wrapRefreshSessionCallback(callback) : callback;
    var authParameters = {};
    authParameters.REFRESH_TOKEN = refreshToken.getToken();
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var lastUserKey = keyPrefix + ".LastAuthUser";
    if (this.storage.getItem(lastUserKey)) {
      this.username = this.storage.getItem(lastUserKey);
      var deviceKeyKey = keyPrefix + "." + this.username + ".deviceKey";
      this.deviceKey = this.storage.getItem(deviceKeyKey);
      authParameters.DEVICE_KEY = this.deviceKey;
    }
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      AuthFlow: "REFRESH_TOKEN_AUTH",
      AuthParameters: authParameters,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("InitiateAuth", jsonReq, function(err, authResult) {
      if (err) {
        if (err.code === "NotAuthorizedException") {
          _this15.clearCachedUser();
        }
        return wrappedCallback(err, null);
      }
      if (authResult) {
        var authenticationResult = authResult.AuthenticationResult;
        if (!Object.prototype.hasOwnProperty.call(authenticationResult, "RefreshToken")) {
          authenticationResult.RefreshToken = refreshToken.getToken();
        }
        _this15.signInUserSession = _this15.getCognitoUserSession(authenticationResult);
        _this15.cacheTokens();
        return wrappedCallback(null, _this15.signInUserSession);
      }
      return void 0;
    });
  };
  _proto.cacheTokens = function cacheTokens() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var idTokenKey = keyPrefix + "." + this.username + ".idToken";
    var accessTokenKey = keyPrefix + "." + this.username + ".accessToken";
    var refreshTokenKey = keyPrefix + "." + this.username + ".refreshToken";
    var clockDriftKey = keyPrefix + "." + this.username + ".clockDrift";
    var lastUserKey = keyPrefix + ".LastAuthUser";
    this.storage.setItem(idTokenKey, this.signInUserSession.getIdToken().getJwtToken());
    this.storage.setItem(accessTokenKey, this.signInUserSession.getAccessToken().getJwtToken());
    this.storage.setItem(refreshTokenKey, this.signInUserSession.getRefreshToken().getToken());
    this.storage.setItem(clockDriftKey, "" + this.signInUserSession.getClockDrift());
    this.storage.setItem(lastUserKey, this.username);
  };
  _proto.cacheUserData = function cacheUserData(userData) {
    this.storage.setItem(this.userDataKey, JSON.stringify(userData));
  };
  _proto.clearCachedUserData = function clearCachedUserData() {
    this.storage.removeItem(this.userDataKey);
  };
  _proto.clearCachedUser = function clearCachedUser() {
    this.clearCachedTokens();
    this.clearCachedUserData();
  };
  _proto.cacheDeviceKeyAndPassword = function cacheDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    this.storage.setItem(deviceKeyKey, this.deviceKey);
    this.storage.setItem(randomPasswordKey, this.randomPassword);
    this.storage.setItem(deviceGroupKeyKey, this.deviceGroupKey);
  };
  _proto.getCachedDeviceKeyAndPassword = function getCachedDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    if (this.storage.getItem(deviceKeyKey)) {
      this.deviceKey = this.storage.getItem(deviceKeyKey);
      this.randomPassword = this.storage.getItem(randomPasswordKey);
      this.deviceGroupKey = this.storage.getItem(deviceGroupKeyKey);
    }
  };
  _proto.clearCachedDeviceKeyAndPassword = function clearCachedDeviceKeyAndPassword() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId() + "." + this.username;
    var deviceKeyKey = keyPrefix + ".deviceKey";
    var randomPasswordKey = keyPrefix + ".randomPasswordKey";
    var deviceGroupKeyKey = keyPrefix + ".deviceGroupKey";
    this.storage.removeItem(deviceKeyKey);
    this.storage.removeItem(randomPasswordKey);
    this.storage.removeItem(deviceGroupKeyKey);
  };
  _proto.clearCachedTokens = function clearCachedTokens() {
    var keyPrefix = "CognitoIdentityServiceProvider." + this.pool.getClientId();
    var idTokenKey = keyPrefix + "." + this.username + ".idToken";
    var accessTokenKey = keyPrefix + "." + this.username + ".accessToken";
    var refreshTokenKey = keyPrefix + "." + this.username + ".refreshToken";
    var lastUserKey = keyPrefix + ".LastAuthUser";
    var clockDriftKey = keyPrefix + "." + this.username + ".clockDrift";
    this.storage.removeItem(idTokenKey);
    this.storage.removeItem(accessTokenKey);
    this.storage.removeItem(refreshTokenKey);
    this.storage.removeItem(lastUserKey);
    this.storage.removeItem(clockDriftKey);
  };
  _proto.getCognitoUserSession = function getCognitoUserSession(authResult) {
    var idToken = new CognitoIdToken(authResult);
    var accessToken = new CognitoAccessToken(authResult);
    var refreshToken = new CognitoRefreshToken(authResult);
    var sessionData = {
      IdToken: idToken,
      AccessToken: accessToken,
      RefreshToken: refreshToken
    };
    return new CognitoUserSession(sessionData);
  };
  _proto.forgotPassword = function forgotPassword(callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ForgotPassword", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      if (typeof callback.inputVerificationCode === "function") {
        return callback.inputVerificationCode(data);
      }
      return callback.onSuccess(data);
    });
  };
  _proto.confirmPassword = function confirmPassword(confirmationCode, newPassword, callback, clientMetadata) {
    var jsonReq = {
      ClientId: this.pool.getClientId(),
      Username: this.username,
      ConfirmationCode: confirmationCode,
      Password: newPassword,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("ConfirmForgotPassword", jsonReq, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
  };
  _proto.getAttributeVerificationCode = function getAttributeVerificationCode(attributeName, callback, clientMetadata) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GetUserAttributeVerificationCode", {
      AttributeName: attributeName,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      ClientMetadata: clientMetadata
    }, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      if (typeof callback.inputVerificationCode === "function") {
        return callback.inputVerificationCode(data);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.verifyAttribute = function verifyAttribute(attributeName, confirmationCode, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("VerifyUserAttribute", {
      AttributeName: attributeName,
      Code: confirmationCode,
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.getDevice = function getDevice(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GetDevice", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey
    }, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess(data);
    });
    return void 0;
  };
  _proto.forgetSpecificDevice = function forgetSpecificDevice(deviceKey, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("ForgetDevice", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: deviceKey
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.forgetDevice = function forgetDevice(callback) {
    var _this16 = this;
    this.forgetSpecificDevice(this.deviceKey, {
      onFailure: callback.onFailure,
      onSuccess: function onSuccess(result) {
        _this16.deviceKey = null;
        _this16.deviceGroupKey = null;
        _this16.randomPassword = null;
        _this16.clearCachedDeviceKeyAndPassword();
        return callback.onSuccess(result);
      }
    });
  };
  _proto.setDeviceStatusRemembered = function setDeviceStatusRemembered(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("UpdateDeviceStatus", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey,
      DeviceRememberedStatus: "remembered"
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.setDeviceStatusNotRemembered = function setDeviceStatusNotRemembered(callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("UpdateDeviceStatus", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      DeviceKey: this.deviceKey,
      DeviceRememberedStatus: "not_remembered"
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.listDevices = function listDevices(limit, paginationToken, callback) {
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    var requestParams = {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
      Limit: limit
    };
    if (paginationToken) {
      requestParams.PaginationToken = paginationToken;
    }
    this.client.request("ListDevices", requestParams, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      return callback.onSuccess(data);
    });
    return void 0;
  };
  _proto.globalSignOut = function globalSignOut(callback) {
    var _this17 = this;
    if (this.signInUserSession == null || !this.signInUserSession.isValid()) {
      return callback.onFailure(new Error("User is not authenticated"));
    }
    this.client.request("GlobalSignOut", {
      AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
    }, function(err) {
      if (err) {
        return callback.onFailure(err);
      }
      _this17.clearCachedUser();
      return callback.onSuccess("SUCCESS");
    });
    return void 0;
  };
  _proto.signOut = function signOut(revokeTokenCallback) {
    var _this18 = this;
    if (!revokeTokenCallback || typeof revokeTokenCallback !== "function") {
      this.cleanClientData();
      return;
    }
    this.getSession(function(error, _session) {
      if (error) {
        return revokeTokenCallback(error);
      }
      _this18.revokeTokens(function(err) {
        _this18.cleanClientData();
        revokeTokenCallback(err);
      });
    });
  };
  _proto.revokeTokens = function revokeTokens(revokeTokenCallback) {
    if (revokeTokenCallback === void 0) {
      revokeTokenCallback = function revokeTokenCallback2() {
      };
    }
    if (typeof revokeTokenCallback !== "function") {
      throw new Error("Invalid revokeTokenCallback. It should be a function.");
    }
    var tokensToBeRevoked = [];
    if (!this.signInUserSession) {
      var error = new Error("User is not authenticated");
      return revokeTokenCallback(error);
    }
    if (!this.signInUserSession.getAccessToken()) {
      var _error = new Error("No Access token available");
      return revokeTokenCallback(_error);
    }
    var refreshToken = this.signInUserSession.getRefreshToken().getToken();
    var accessToken = this.signInUserSession.getAccessToken();
    if (this.isSessionRevocable(accessToken)) {
      if (refreshToken) {
        return this.revokeToken({
          token: refreshToken,
          callback: revokeTokenCallback
        });
      }
    }
    revokeTokenCallback();
  };
  _proto.isSessionRevocable = function isSessionRevocable(token) {
    if (token && typeof token.decodePayload === "function") {
      try {
        var _token$decodePayload = token.decodePayload(), origin_jti = _token$decodePayload.origin_jti;
        return !!origin_jti;
      } catch (err) {
      }
    }
    return false;
  };
  _proto.cleanClientData = function cleanClientData() {
    this.signInUserSession = null;
    this.clearCachedUser();
  };
  _proto.revokeToken = function revokeToken(_ref2) {
    var token = _ref2.token, callback = _ref2.callback;
    this.client.requestWithRetry("RevokeToken", {
      Token: token,
      ClientId: this.pool.getClientId()
    }, function(err) {
      if (err) {
        return callback(err);
      }
      callback();
    });
  };
  _proto.sendMFASelectionAnswer = function sendMFASelectionAnswer(answerChallenge, callback) {
    var _this19 = this;
    var challengeResponses = {};
    challengeResponses.USERNAME = this.username;
    challengeResponses.ANSWER = answerChallenge;
    var jsonReq = {
      ChallengeName: "SELECT_MFA_TYPE",
      ChallengeResponses: challengeResponses,
      ClientId: this.pool.getClientId(),
      Session: this.Session
    };
    if (this.getUserContextData()) {
      jsonReq.UserContextData = this.getUserContextData();
    }
    this.client.request("RespondToAuthChallenge", jsonReq, function(err, data) {
      if (err) {
        return callback.onFailure(err);
      }
      _this19.Session = data.Session;
      if (answerChallenge === "SMS_MFA") {
        return callback.mfaRequired(data.ChallengeName, data.ChallengeParameters);
      }
      if (answerChallenge === "SOFTWARE_TOKEN_MFA") {
        return callback.totpRequired(data.ChallengeName, data.ChallengeParameters);
      }
      return void 0;
    });
  };
  _proto.getUserContextData = function getUserContextData() {
    var pool = this.pool;
    return pool.getUserContextData(this.username);
  };
  _proto.associateSoftwareToken = function associateSoftwareToken(callback) {
    var _this20 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.client.request("AssociateSoftwareToken", {
        Session: this.Session
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        _this20.Session = data.Session;
        return callback.associateSecretCode(data.SecretCode);
      });
    } else {
      this.client.request("AssociateSoftwareToken", {
        AccessToken: this.signInUserSession.getAccessToken().getJwtToken()
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        return callback.associateSecretCode(data.SecretCode);
      });
    }
  };
  _proto.verifySoftwareToken = function verifySoftwareToken(totpCode, friendlyDeviceName, callback) {
    var _this21 = this;
    if (!(this.signInUserSession != null && this.signInUserSession.isValid())) {
      this.client.request("VerifySoftwareToken", {
        Session: this.Session,
        UserCode: totpCode,
        FriendlyDeviceName: friendlyDeviceName
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        _this21.Session = data.Session;
        var challengeResponses = {};
        challengeResponses.USERNAME = _this21.username;
        var jsonReq = {
          ChallengeName: "MFA_SETUP",
          ClientId: _this21.pool.getClientId(),
          ChallengeResponses: challengeResponses,
          Session: _this21.Session
        };
        if (_this21.getUserContextData()) {
          jsonReq.UserContextData = _this21.getUserContextData();
        }
        _this21.client.request("RespondToAuthChallenge", jsonReq, function(errRespond, dataRespond) {
          if (errRespond) {
            return callback.onFailure(errRespond);
          }
          _this21.signInUserSession = _this21.getCognitoUserSession(dataRespond.AuthenticationResult);
          _this21.cacheTokens();
          return callback.onSuccess(_this21.signInUserSession);
        });
        return void 0;
      });
    } else {
      this.client.request("VerifySoftwareToken", {
        AccessToken: this.signInUserSession.getAccessToken().getJwtToken(),
        UserCode: totpCode,
        FriendlyDeviceName: friendlyDeviceName
      }, function(err, data) {
        if (err) {
          return callback.onFailure(err);
        }
        return callback.onSuccess(data);
      });
    }
  };
  return CognitoUser2;
}();

// ../amazon-cognito-identity-js/es/Client.js
var import_isomorphic_unfetch = __toModule(require_browser());

// ../amazon-cognito-identity-js/es/Platform/version.js
var version = "5.0.4";

// ../amazon-cognito-identity-js/es/Platform/index.js
var BASE_USER_AGENT = "aws-amplify/" + version;
var Platform = {
  userAgent: BASE_USER_AGENT + " js",
  product: "",
  navigator: null,
  isReactNative: false
};
if (typeof navigator !== "undefined" && navigator.product) {
  Platform.product = navigator.product || "";
  Platform.navigator = navigator || null;
  switch (navigator.product) {
    case "ReactNative":
      Platform.userAgent = BASE_USER_AGENT + " react-native";
      Platform.isReactNative = true;
      break;
    default:
      Platform.userAgent = BASE_USER_AGENT + " js";
      Platform.isReactNative = false;
      break;
  }
}
var getUserAgent = function getUserAgent2() {
  return Platform.userAgent;
};

// ../amazon-cognito-identity-js/es/UserAgent.js
function UserAgent() {
}
UserAgent.prototype.userAgent = getUserAgent();
var appendToCognitoUserAgent = function appendToCognitoUserAgent2(content) {
  if (!content) {
    return;
  }
  if (UserAgent.prototype.userAgent && !UserAgent.prototype.userAgent.includes(content)) {
    UserAgent.prototype.userAgent = UserAgent.prototype.userAgent.concat(" ", content);
  }
  if (!UserAgent.prototype.userAgent || UserAgent.prototype.userAgent === "") {
    UserAgent.prototype.userAgent = content;
  }
};
var UserAgent_default = UserAgent;

// ../amazon-cognito-identity-js/es/Client.js
function _inheritsLoose3(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  _setPrototypeOf3(subClass, superClass);
}
function _wrapNativeSuper(Class) {
  var _cache = typeof Map === "function" ? new Map() : void 0;
  _wrapNativeSuper = function _wrapNativeSuper2(Class2) {
    if (Class2 === null || !_isNativeFunction(Class2))
      return Class2;
    if (typeof Class2 !== "function") {
      throw new TypeError("Super expression must either be null or a function");
    }
    if (typeof _cache !== "undefined") {
      if (_cache.has(Class2))
        return _cache.get(Class2);
      _cache.set(Class2, Wrapper);
    }
    function Wrapper() {
      return _construct(Class2, arguments, _getPrototypeOf(this).constructor);
    }
    Wrapper.prototype = Object.create(Class2.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });
    return _setPrototypeOf3(Wrapper, Class2);
  };
  return _wrapNativeSuper(Class);
}
function _construct(Parent, args, Class) {
  if (_isNativeReflectConstruct()) {
    _construct = Reflect.construct;
  } else {
    _construct = function _construct2(Parent2, args2, Class2) {
      var a = [null];
      a.push.apply(a, args2);
      var Constructor = Function.bind.apply(Parent2, a);
      var instance = new Constructor();
      if (Class2)
        _setPrototypeOf3(instance, Class2.prototype);
      return instance;
    };
  }
  return _construct.apply(null, arguments);
}
function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct)
    return false;
  if (Reflect.construct.sham)
    return false;
  if (typeof Proxy === "function")
    return true;
  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function() {
    }));
    return true;
  } catch (e) {
    return false;
  }
}
function _isNativeFunction(fn) {
  return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function _setPrototypeOf3(o, p) {
  _setPrototypeOf3 = Object.setPrototypeOf || function _setPrototypeOf4(o2, p2) {
    o2.__proto__ = p2;
    return o2;
  };
  return _setPrototypeOf3(o, p);
}
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf2(o2) {
    return o2.__proto__ || Object.getPrototypeOf(o2);
  };
  return _getPrototypeOf(o);
}
var CognitoError = /* @__PURE__ */ function(_Error) {
  _inheritsLoose3(CognitoError2, _Error);
  function CognitoError2(message, code, name, statusCode) {
    var _this;
    _this = _Error.call(this, message) || this;
    _this.code = code;
    _this.name = name;
    _this.statusCode = statusCode;
    return _this;
  }
  return CognitoError2;
}(/* @__PURE__ */ _wrapNativeSuper(Error));
var Client = /* @__PURE__ */ function() {
  function Client2(region, endpoint, fetchOptions) {
    this.endpoint = endpoint || "https://cognito-idp." + region + ".amazonaws.com/";
    var _ref = fetchOptions || {}, credentials = _ref.credentials;
    this.fetchOptions = credentials ? {
      credentials
    } : {};
  }
  var _proto = Client2.prototype;
  _proto.promisifyRequest = function promisifyRequest(operation, params) {
    var _this2 = this;
    return new Promise(function(resolve, reject) {
      _this2.request(operation, params, function(err, data) {
        if (err) {
          reject(new CognitoError(err.message, err.code, err.name, err.statusCode));
        } else {
          resolve(data);
        }
      });
    });
  };
  _proto.requestWithRetry = function requestWithRetry(operation, params, callback) {
    var _this3 = this;
    var MAX_DELAY_IN_MILLIS = 5 * 1e3;
    jitteredExponentialRetry(function(p) {
      return new Promise(function(res, rej) {
        _this3.request(operation, p, function(error, result) {
          if (error) {
            rej(error);
          } else {
            res(result);
          }
        });
      });
    }, [params], MAX_DELAY_IN_MILLIS).then(function(result) {
      return callback(null, result);
    })["catch"](function(error) {
      return callback(error);
    });
  };
  _proto.request = function request(operation, params, callback) {
    var headers = {
      "Content-Type": "application/x-amz-json-1.1",
      "X-Amz-Target": "AWSCognitoIdentityProviderService." + operation,
      "X-Amz-User-Agent": UserAgent_default.prototype.userAgent
    };
    var options = Object.assign({}, this.fetchOptions, {
      headers,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      body: JSON.stringify(params)
    });
    var response;
    var responseJsonData;
    fetch(this.endpoint, options).then(function(resp) {
      response = resp;
      return resp;
    }, function(err) {
      if (err instanceof TypeError) {
        throw new Error("Network error");
      }
      throw err;
    }).then(function(resp) {
      return resp.json()["catch"](function() {
        return {};
      });
    }).then(function(data) {
      if (response.ok)
        return callback(null, data);
      responseJsonData = data;
      var code = (data.__type || data.code).split("#").pop();
      var error = new Error(data.message || data.Message || null);
      error.name = code;
      error.code = code;
      return callback(error);
    })["catch"](function(err) {
      if (response && response.headers && response.headers.get("x-amzn-errortype")) {
        try {
          var code = response.headers.get("x-amzn-errortype").split(":")[0];
          var error = new Error(response.status ? response.status.toString() : null);
          error.code = code;
          error.name = code;
          error.statusCode = response.status;
          return callback(error);
        } catch (ex) {
          return callback(err);
        }
      } else if (err instanceof Error && err.message === "Network error") {
        err.code = "NetworkError";
      }
      return callback(err);
    });
  };
  return Client2;
}();
var logger = {
  debug: function debug() {
  }
};
var isNonRetryableError = function isNonRetryableError2(obj) {
  var key = "nonRetryable";
  return obj && obj[key];
};
function retry(functionToRetry, args, delayFn, attempt) {
  if (attempt === void 0) {
    attempt = 1;
  }
  if (typeof functionToRetry !== "function") {
    throw Error("functionToRetry must be a function");
  }
  logger.debug(functionToRetry.name + " attempt #" + attempt + " with args: " + JSON.stringify(args));
  return functionToRetry.apply(void 0, args)["catch"](function(err) {
    logger.debug("error on " + functionToRetry.name, err);
    if (isNonRetryableError(err)) {
      logger.debug(functionToRetry.name + " non retryable error", err);
      throw err;
    }
    var retryIn = delayFn(attempt, args, err);
    logger.debug(functionToRetry.name + " retrying in " + retryIn + " ms");
    if (retryIn !== false) {
      return new Promise(function(res) {
        return setTimeout(res, retryIn);
      }).then(function() {
        return retry(functionToRetry, args, delayFn, attempt + 1);
      });
    } else {
      throw err;
    }
  });
}
function jitteredBackoff(maxDelayMs) {
  var BASE_TIME_MS = 100;
  var JITTER_FACTOR = 100;
  return function(attempt) {
    var delay = Math.pow(2, attempt) * BASE_TIME_MS + JITTER_FACTOR * Math.random();
    return delay > maxDelayMs ? false : delay;
  };
}
var MAX_DELAY_MS = 5 * 60 * 1e3;
function jitteredExponentialRetry(functionToRetry, args, maxDelayMs) {
  if (maxDelayMs === void 0) {
    maxDelayMs = MAX_DELAY_MS;
  }
  return retry(functionToRetry, args, jitteredBackoff(maxDelayMs));
}

// ../amazon-cognito-identity-js/es/CognitoUserPool.js
var USER_POOL_ID_MAX_LENGTH = 55;
var CognitoUserPool = /* @__PURE__ */ function() {
  function CognitoUserPool2(data, wrapRefreshSessionCallback) {
    var _ref = data || {}, UserPoolId = _ref.UserPoolId, ClientId = _ref.ClientId, endpoint = _ref.endpoint, fetchOptions = _ref.fetchOptions, AdvancedSecurityDataCollectionFlag = _ref.AdvancedSecurityDataCollectionFlag;
    if (!UserPoolId || !ClientId) {
      throw new Error("Both UserPoolId and ClientId are required.");
    }
    if (UserPoolId.length > USER_POOL_ID_MAX_LENGTH || !/^[\w-]+_[0-9a-zA-Z]+$/.test(UserPoolId)) {
      throw new Error("Invalid UserPoolId format.");
    }
    var region = UserPoolId.split("_")[0];
    this.userPoolId = UserPoolId;
    this.clientId = ClientId;
    this.client = new Client(region, endpoint, fetchOptions);
    this.advancedSecurityDataCollectionFlag = AdvancedSecurityDataCollectionFlag !== false;
    this.storage = data.Storage || new StorageHelper().getStorage();
    if (wrapRefreshSessionCallback) {
      this.wrapRefreshSessionCallback = wrapRefreshSessionCallback;
    }
  }
  var _proto = CognitoUserPool2.prototype;
  _proto.getUserPoolId = function getUserPoolId() {
    return this.userPoolId;
  };
  _proto.getClientId = function getClientId() {
    return this.clientId;
  };
  _proto.signUp = function signUp(username, password, userAttributes, validationData, callback, clientMetadata) {
    var _this = this;
    var jsonReq = {
      ClientId: this.clientId,
      Username: username,
      Password: password,
      UserAttributes: userAttributes,
      ValidationData: validationData,
      ClientMetadata: clientMetadata
    };
    if (this.getUserContextData(username)) {
      jsonReq.UserContextData = this.getUserContextData(username);
    }
    this.client.request("SignUp", jsonReq, function(err, data) {
      if (err) {
        return callback(err, null);
      }
      var cognitoUser = {
        Username: username,
        Pool: _this,
        Storage: _this.storage
      };
      var returnData = {
        user: new CognitoUser(cognitoUser),
        userConfirmed: data.UserConfirmed,
        userSub: data.UserSub,
        codeDeliveryDetails: data.CodeDeliveryDetails
      };
      return callback(null, returnData);
    });
  };
  _proto.getCurrentUser = function getCurrentUser() {
    var lastUserKey = "CognitoIdentityServiceProvider." + this.clientId + ".LastAuthUser";
    var lastAuthUser = this.storage.getItem(lastUserKey);
    if (lastAuthUser) {
      var cognitoUser = {
        Username: lastAuthUser,
        Pool: this,
        Storage: this.storage
      };
      return new CognitoUser(cognitoUser);
    }
    return null;
  };
  _proto.getUserContextData = function getUserContextData(username) {
    if (typeof AmazonCognitoAdvancedSecurityData === "undefined") {
      return void 0;
    }
    var amazonCognitoAdvancedSecurityDataConst = AmazonCognitoAdvancedSecurityData;
    if (this.advancedSecurityDataCollectionFlag) {
      var advancedSecurityData = amazonCognitoAdvancedSecurityDataConst.getData(username, this.userPoolId, this.clientId);
      if (advancedSecurityData) {
        var userContextData = {
          EncodedData: advancedSecurityData
        };
        return userContextData;
      }
    }
    return {};
  };
  return CognitoUserPool2;
}();

// ../amazon-cognito-identity-js/es/CookieStorage.js
var Cookies = __toModule(require_js_cookie());
var CookieStorage = /* @__PURE__ */ function() {
  function CookieStorage2(data) {
    if (data.domain) {
      this.domain = data.domain;
    } else {
      throw new Error("The domain of cookieStorage can not be undefined.");
    }
    if (data.path) {
      this.path = data.path;
    } else {
      this.path = "/";
    }
    if (Object.prototype.hasOwnProperty.call(data, "expires")) {
      this.expires = data.expires;
    } else {
      this.expires = 365;
    }
    if (Object.prototype.hasOwnProperty.call(data, "secure")) {
      this.secure = data.secure;
    } else {
      this.secure = true;
    }
    if (Object.prototype.hasOwnProperty.call(data, "sameSite")) {
      if (!["strict", "lax", "none"].includes(data.sameSite)) {
        throw new Error('The sameSite value of cookieStorage must be "lax", "strict" or "none".');
      }
      if (data.sameSite === "none" && !this.secure) {
        throw new Error("sameSite = None requires the Secure attribute in latest browser versions.");
      }
      this.sameSite = data.sameSite;
    } else {
      this.sameSite = null;
    }
  }
  var _proto = CookieStorage2.prototype;
  _proto.setItem = function setItem(key, value) {
    var options = {
      path: this.path,
      expires: this.expires,
      domain: this.domain,
      secure: this.secure
    };
    if (this.sameSite) {
      options.sameSite = this.sameSite;
    }
    Cookies.set(key, value, options);
    return Cookies.get(key);
  };
  _proto.getItem = function getItem(key) {
    return Cookies.get(key);
  };
  _proto.removeItem = function removeItem(key) {
    var options = {
      path: this.path,
      expires: this.expires,
      domain: this.domain,
      secure: this.secure
    };
    if (this.sameSite) {
      options.sameSite = this.sameSite;
    }
    return Cookies.remove(key, options);
  };
  _proto.clear = function clear() {
    var cookies = Cookies.get();
    var numKeys = Object.keys(cookies).length;
    for (var index = 0; index < numKeys; ++index) {
      this.removeItem(Object.keys(cookies)[index]);
    }
    return {};
  };
  return CookieStorage2;
}();

// src/Auth.ts
var import_url2 = __toModule(require_url());

// src/OAuth/OAuth.ts
var import_url = __toModule(require_url());

// src/OAuth/urlOpener.ts
var SELF = "_self";
var launchUri = (url) => {
  const windowProxy = window.open(url, SELF);
  if (windowProxy) {
    return Promise.resolve(windowProxy);
  } else {
    return Promise.reject();
  }
};

// src/OAuth/oauthStorage.ts
var setState = (state) => {
  window.sessionStorage.setItem("oauth_state", state);
};
var getState = () => {
  const oauth_state = window.sessionStorage.getItem("oauth_state");
  window.sessionStorage.removeItem("oauth_state");
  return oauth_state;
};
var setPKCE = (private_key) => {
  window.sessionStorage.setItem("ouath_pkce_key", private_key);
};
var getPKCE = () => {
  const ouath_pkce_key = window.sessionStorage.getItem("ouath_pkce_key");
  window.sessionStorage.removeItem("ouath_pkce_key");
  return ouath_pkce_key;
};

// src/OAuth/OAuth.ts
var import_sha2562 = __toModule(require_sha2562());
var import_enc_base642 = __toModule(require_enc_base642());
import { ConsoleLogger as Logger, Hub, urlSafeEncode } from "http://localhost:8080/packages/core/4.3.4/core-esm.js";
var AMPLIFY_SYMBOL = typeof Symbol !== "undefined" && typeof Symbol.for === "function" ? Symbol.for("amplify_default") : "@@amplify_default";
var dispatchAuthEvent = (event, data, message) => {
  Hub.dispatch("auth", { event, data, message }, "Auth", AMPLIFY_SYMBOL);
};
var logger2 = new Logger("OAuth");
var OAuth = class {
  constructor({
    config,
    cognitoClientId,
    scopes = []
  }) {
    this._urlOpener = config.urlOpener || launchUri;
    this._config = config;
    this._cognitoClientId = cognitoClientId;
    if (!this.isValidScopes(scopes))
      throw Error("scopes must be a String Array");
    this._scopes = scopes;
  }
  isValidScopes(scopes) {
    return Array.isArray(scopes) && scopes.every((scope) => typeof scope === "string");
  }
  oauthSignIn(responseType = "code", domain, redirectSignIn, clientId, provider = CognitoHostedUIIdentityProvider.Cognito, customState) {
    const generatedState = this._generateState(32);
    const state = customState ? `${generatedState}-${urlSafeEncode(customState)}` : generatedState;
    setState(state);
    const pkce_key = this._generateRandom(128);
    setPKCE(pkce_key);
    const code_challenge = this._generateChallenge(pkce_key);
    const code_challenge_method = "S256";
    const scopesString = this._scopes.join(" ");
    const queryString = Object.entries({
      redirect_uri: redirectSignIn,
      response_type: responseType,
      client_id: clientId,
      identity_provider: provider,
      scope: scopesString,
      state,
      ...responseType === "code" ? { code_challenge } : {},
      ...responseType === "code" ? { code_challenge_method } : {}
    }).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
    const URL = `https://${domain}/oauth2/authorize?${queryString}`;
    logger2.debug(`Redirecting to ${URL}`);
    this._urlOpener(URL, redirectSignIn);
  }
  async _handleCodeFlow(currentUrl) {
    const { code } = ((0, import_url.parse)(currentUrl).query || "").split("&").map((pairings) => pairings.split("=")).reduce((accum, [k, v]) => ({ ...accum, [k]: v }), { code: void 0 });
    const currentUrlPathname = (0, import_url.parse)(currentUrl).pathname || "/";
    const redirectSignInPathname = (0, import_url.parse)(this._config.redirectSignIn).pathname || "/";
    if (!code || currentUrlPathname !== redirectSignInPathname) {
      return;
    }
    const oAuthTokenEndpoint = "https://" + this._config.domain + "/oauth2/token";
    dispatchAuthEvent("codeFlow", {}, `Retrieving tokens from ${oAuthTokenEndpoint}`);
    const client_id = isCognitoHostedOpts(this._config) ? this._cognitoClientId : this._config.clientID;
    const redirect_uri = isCognitoHostedOpts(this._config) ? this._config.redirectSignIn : this._config.redirectUri;
    const code_verifier = getPKCE();
    const oAuthTokenBody = {
      grant_type: "authorization_code",
      code,
      client_id,
      redirect_uri,
      ...code_verifier ? { code_verifier } : {}
    };
    logger2.debug(`Calling token endpoint: ${oAuthTokenEndpoint} with`, oAuthTokenBody);
    const body = Object.entries(oAuthTokenBody).map(([k, v]) => `${encodeURIComponent(k)}=${encodeURIComponent(v)}`).join("&");
    const {
      access_token,
      refresh_token,
      id_token,
      error
    } = await (await fetch(oAuthTokenEndpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      body
    })).json();
    if (error) {
      throw new Error(error);
    }
    return {
      accessToken: access_token,
      refreshToken: refresh_token,
      idToken: id_token
    };
  }
  async _handleImplicitFlow(currentUrl) {
    const { id_token, access_token } = ((0, import_url.parse)(currentUrl).hash || "#").substr(1).split("&").map((pairings) => pairings.split("=")).reduce((accum, [k, v]) => ({ ...accum, [k]: v }), {
      id_token: void 0,
      access_token: void 0
    });
    dispatchAuthEvent("implicitFlow", {}, `Got tokens from ${currentUrl}`);
    logger2.debug(`Retrieving implicit tokens from ${currentUrl} with`);
    return {
      accessToken: access_token,
      idToken: id_token,
      refreshToken: null
    };
  }
  async handleAuthResponse(currentUrl) {
    try {
      const urlParams = currentUrl ? {
        ...((0, import_url.parse)(currentUrl).hash || "#").substr(1).split("&").map((entry) => entry.split("=")).reduce((acc, [k, v]) => (acc[k] = v, acc), {}),
        ...((0, import_url.parse)(currentUrl).query || "").split("&").map((entry) => entry.split("=")).reduce((acc, [k, v]) => (acc[k] = v, acc), {})
      } : {};
      const { error, error_description } = urlParams;
      if (error) {
        throw new Error(error_description);
      }
      const state = this._validateState(urlParams);
      logger2.debug(`Starting ${this._config.responseType} flow with ${currentUrl}`);
      if (this._config.responseType === "code") {
        return { ...await this._handleCodeFlow(currentUrl), state };
      } else {
        return { ...await this._handleImplicitFlow(currentUrl), state };
      }
    } catch (e) {
      logger2.error(`Error handling auth response.`, e);
      throw e;
    }
  }
  _validateState(urlParams) {
    if (!urlParams) {
      return;
    }
    const savedState = getState();
    const { state: returnedState } = urlParams;
    if (savedState && savedState !== returnedState) {
      throw new Error("Invalid state in OAuth flow");
    }
    return returnedState;
  }
  async signOut() {
    let oAuthLogoutEndpoint = "https://" + this._config.domain + "/logout?";
    const client_id = isCognitoHostedOpts(this._config) ? this._cognitoClientId : this._config.oauth.clientID;
    const signout_uri = isCognitoHostedOpts(this._config) ? this._config.redirectSignOut : this._config.returnTo;
    oAuthLogoutEndpoint += Object.entries({
      client_id,
      logout_uri: encodeURIComponent(signout_uri)
    }).map(([k, v]) => `${k}=${v}`).join("&");
    dispatchAuthEvent("oAuthSignOut", { oAuth: "signOut" }, `Signing out from ${oAuthLogoutEndpoint}`);
    logger2.debug(`Signing out from ${oAuthLogoutEndpoint}`);
    return this._urlOpener(oAuthLogoutEndpoint, signout_uri);
  }
  _generateState(length) {
    let result = "";
    let i = length;
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    for (; i > 0; --i)
      result += chars[Math.round(Math.random() * (chars.length - 1))];
    return result;
  }
  _generateChallenge(code) {
    return this._base64URL((0, import_sha2562.default)(code));
  }
  _base64URL(string) {
    return string.toString(import_enc_base642.default).replace(/=/g, "").replace(/\+/g, "-").replace(/\//g, "_");
  }
  _generateRandom(size) {
    const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
    const buffer = new Uint8Array(size);
    if (typeof window !== "undefined" && !!window.crypto) {
      window.crypto.getRandomValues(buffer);
    } else {
      for (let i = 0; i < size; i += 1) {
        buffer[i] = Math.random() * CHARSET.length | 0;
      }
    }
    return this._bufferToString(buffer);
  }
  _bufferToString(buffer) {
    const CHARSET = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const state = [];
    for (let i = 0; i < buffer.byteLength; i += 1) {
      const index = buffer[i] % CHARSET.length;
      state.push(CHARSET[index]);
    }
    return state.join("");
  }
};

// src/urlListener.ts
import { JS } from "http://localhost:8080/packages/core/4.3.4/core-esm.js";
var urlListener_default = (callback) => {
  if (JS.browserOrNode().isBrowser && window.location) {
    const url = window.location.href;
    callback({ url });
  } else if (JS.browserOrNode().isNode) {
    () => {
    };
  } else {
    throw new Error("Not supported");
  }
};

// src/Errors.ts
import { ConsoleLogger as Logger2 } from "http://localhost:8080/packages/core/4.3.4/core-esm.js";

// src/common/AuthErrorStrings.ts
var AuthErrorStrings;
(function(AuthErrorStrings2) {
  AuthErrorStrings2["DEFAULT_MSG"] = "Authentication Error";
  AuthErrorStrings2["EMPTY_EMAIL"] = "Email cannot be empty";
  AuthErrorStrings2["EMPTY_PHONE"] = "Phone number cannot be empty";
  AuthErrorStrings2["EMPTY_USERNAME"] = "Username cannot be empty";
  AuthErrorStrings2["INVALID_USERNAME"] = "The username should either be a string or one of the sign in types";
  AuthErrorStrings2["EMPTY_PASSWORD"] = "Password cannot be empty";
  AuthErrorStrings2["EMPTY_CODE"] = "Confirmation code cannot be empty";
  AuthErrorStrings2["SIGN_UP_ERROR"] = "Error creating account";
  AuthErrorStrings2["NO_MFA"] = "No valid MFA method provided";
  AuthErrorStrings2["INVALID_MFA"] = "Invalid MFA type";
  AuthErrorStrings2["EMPTY_CHALLENGE"] = "Challenge response cannot be empty";
  AuthErrorStrings2["NO_USER_SESSION"] = "Failed to get the session because the user is empty";
  AuthErrorStrings2["NETWORK_ERROR"] = "Network Error";
  AuthErrorStrings2["DEVICE_CONFIG"] = "Device tracking has not been configured in this User Pool";
})(AuthErrorStrings || (AuthErrorStrings = {}));

// src/Errors.ts
var logger3 = new Logger2("AuthError");
var AuthError = class extends Error {
  constructor(type) {
    const { message, log } = authErrorMessages[type];
    super(message);
    this.constructor = AuthError;
    Object.setPrototypeOf(this, AuthError.prototype);
    this.name = "AuthError";
    this.log = log || message;
    logger3.error(this.log);
  }
};
var NoUserPoolError = class extends AuthError {
  constructor(type) {
    super(type);
    this.constructor = NoUserPoolError;
    Object.setPrototypeOf(this, NoUserPoolError.prototype);
    this.name = "NoUserPoolError";
  }
};
var authErrorMessages = {
  noConfig: {
    message: AuthErrorStrings.DEFAULT_MSG,
    log: `
            Error: Amplify has not been configured correctly.
            This error is typically caused by one of the following scenarios:

            1. Make sure you're passing the awsconfig object to Amplify.configure() in your app's entry point
                See https://aws-amplify.github.io/docs/js/authentication#configure-your-app for more information
            
            2. There might be multiple conflicting versions of amplify packages in your node_modules.
				Refer to our docs site for help upgrading Amplify packages (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js)
        `
  },
  missingAuthConfig: {
    message: AuthErrorStrings.DEFAULT_MSG,
    log: `
            Error: Amplify has not been configured correctly. 
            The configuration object is missing required auth properties.
            This error is typically caused by one of the following scenarios:

            1. Did you run \`amplify push\` after adding auth via \`amplify add auth\`?
                See https://aws-amplify.github.io/docs/js/authentication#amplify-project-setup for more information

            2. This could also be caused by multiple conflicting versions of amplify packages, see (https://docs.amplify.aws/lib/troubleshooting/upgrading/q/platform/js) for help upgrading Amplify packages.
        `
  },
  emptyUsername: {
    message: AuthErrorStrings.EMPTY_USERNAME
  },
  invalidUsername: {
    message: AuthErrorStrings.INVALID_USERNAME
  },
  emptyPassword: {
    message: AuthErrorStrings.EMPTY_PASSWORD
  },
  emptyCode: {
    message: AuthErrorStrings.EMPTY_CODE
  },
  signUpError: {
    message: AuthErrorStrings.SIGN_UP_ERROR,
    log: "The first parameter should either be non-null string or object"
  },
  noMFA: {
    message: AuthErrorStrings.NO_MFA
  },
  invalidMFA: {
    message: AuthErrorStrings.INVALID_MFA
  },
  emptyChallengeResponse: {
    message: AuthErrorStrings.EMPTY_CHALLENGE
  },
  noUserSession: {
    message: AuthErrorStrings.NO_USER_SESSION
  },
  deviceConfig: {
    message: AuthErrorStrings.DEVICE_CONFIG
  },
  networkError: {
    message: AuthErrorStrings.NETWORK_ERROR
  },
  default: {
    message: AuthErrorStrings.DEFAULT_MSG
  }
};

// src/Auth.ts
var logger4 = new Logger3("AuthClass");
var USER_ADMIN_SCOPE = "aws.cognito.signin.user.admin";
var OAUTH_FLOW_MS_TIMEOUT = 10 * 1e3;
var AMPLIFY_SYMBOL2 = typeof Symbol !== "undefined" && typeof Symbol.for === "function" ? Symbol.for("amplify_default") : "@@amplify_default";
var dispatchAuthEvent2 = (event, data, message) => {
  Hub2.dispatch("auth", { event, data, message }, "Auth", AMPLIFY_SYMBOL2);
};
var MAX_DEVICES = 60;
var AuthClass = class {
  constructor(config) {
    this.userPool = null;
    this.user = null;
    this.oAuthFlowInProgress = false;
    this.Credentials = Credentials;
    this.wrapRefreshSessionCallback = (callback) => {
      const wrapped = (error, data) => {
        if (data) {
          dispatchAuthEvent2("tokenRefresh", void 0, `New token retrieved`);
        } else {
          dispatchAuthEvent2("tokenRefresh_failure", error, `Failed to retrieve new token`);
        }
        return callback(error, data);
      };
      return wrapped;
    };
    this.configure(config);
    this.currentCredentials = this.currentCredentials.bind(this);
    this.currentUserCredentials = this.currentUserCredentials.bind(this);
    Hub2.listen("auth", ({ payload }) => {
      const { event } = payload;
      switch (event) {
        case "signIn":
          this._storage.setItem("amplify-signin-with-hostedUI", "false");
          break;
        case "signOut":
          this._storage.removeItem("amplify-signin-with-hostedUI");
          break;
        case "cognitoHostedUI":
          this._storage.setItem("amplify-signin-with-hostedUI", "true");
          break;
      }
    });
  }
  getModuleName() {
    return "Auth";
  }
  configure(config) {
    if (!config)
      return this._config || {};
    logger4.debug("configure Auth");
    const conf = Object.assign({}, this._config, Parser.parseMobilehubConfig(config).Auth, config);
    this._config = conf;
    const {
      userPoolId,
      userPoolWebClientId,
      cookieStorage,
      oauth,
      region,
      identityPoolId,
      mandatorySignIn,
      refreshHandlers,
      identityPoolRegion,
      clientMetadata,
      endpoint
    } = this._config;
    if (!this._config.storage) {
      if (cookieStorage)
        this._storage = new CookieStorage(cookieStorage);
      else {
        this._storage = config.ssr ? new UniversalStorage() : new StorageHelper2().getStorage();
      }
    } else {
      if (!this._isValidAuthStorage(this._config.storage)) {
        logger4.error("The storage in the Auth config is not valid!");
        throw new Error("Empty storage object");
      }
      this._storage = this._config.storage;
    }
    this._storageSync = Promise.resolve();
    if (typeof this._storage["sync"] === "function") {
      this._storageSync = this._storage["sync"]();
    }
    if (userPoolId) {
      const userPoolData = {
        UserPoolId: userPoolId,
        ClientId: userPoolWebClientId,
        endpoint
      };
      userPoolData.Storage = this._storage;
      this.userPool = new CognitoUserPool(userPoolData, this.wrapRefreshSessionCallback);
    }
    this.Credentials.configure({
      mandatorySignIn,
      region: identityPoolRegion || region,
      userPoolId,
      identityPoolId,
      refreshHandlers,
      storage: this._storage
    });
    const cognitoHostedUIConfig = oauth ? isCognitoHostedOpts(this._config.oauth) ? oauth : oauth.awsCognito : void 0;
    if (cognitoHostedUIConfig) {
      const cognitoAuthParams = Object.assign({
        cognitoClientId: userPoolWebClientId,
        UserPoolId: userPoolId,
        domain: cognitoHostedUIConfig["domain"],
        scopes: cognitoHostedUIConfig["scope"],
        redirectSignIn: cognitoHostedUIConfig["redirectSignIn"],
        redirectSignOut: cognitoHostedUIConfig["redirectSignOut"],
        responseType: cognitoHostedUIConfig["responseType"],
        Storage: this._storage,
        urlOpener: cognitoHostedUIConfig["urlOpener"],
        clientMetadata
      }, cognitoHostedUIConfig["options"]);
      this._oAuthHandler = new OAuth({
        scopes: cognitoAuthParams.scopes,
        config: cognitoAuthParams,
        cognitoClientId: cognitoAuthParams.cognitoClientId
      });
      const usedResponseUrls = {};
      urlListener_default(({ url }) => {
        if (usedResponseUrls[url]) {
          return;
        }
        usedResponseUrls[url] = true;
        this._handleAuthResponse(url);
      });
    }
    dispatchAuthEvent2("configured", null, `The Auth category has been configured successfully`);
    return this._config;
  }
  signUp(params, ...restOfAttrs) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    let username = null;
    let password = null;
    const attributes = [];
    let validationData = null;
    let clientMetadata;
    if (params && typeof params === "string") {
      username = params;
      password = restOfAttrs ? restOfAttrs[0] : null;
      const email = restOfAttrs ? restOfAttrs[1] : null;
      const phone_number = restOfAttrs ? restOfAttrs[2] : null;
      if (email)
        attributes.push(new CognitoUserAttribute({ Name: "email", Value: email }));
      if (phone_number)
        attributes.push(new CognitoUserAttribute({
          Name: "phone_number",
          Value: phone_number
        }));
    } else if (params && typeof params === "object") {
      username = params["username"];
      password = params["password"];
      if (params && params.clientMetadata) {
        clientMetadata = params.clientMetadata;
      } else if (this._config.clientMetadata) {
        clientMetadata = this._config.clientMetadata;
      }
      const attrs = params["attributes"];
      if (attrs) {
        Object.keys(attrs).map((key) => {
          attributes.push(new CognitoUserAttribute({ Name: key, Value: attrs[key] }));
        });
      }
      const validationDataObject = params["validationData"];
      if (validationDataObject) {
        validationData = [];
        Object.keys(validationDataObject).map((key) => {
          validationData.push(new CognitoUserAttribute({
            Name: key,
            Value: validationDataObject[key]
          }));
        });
      }
    } else {
      return this.rejectAuthError(AuthErrorTypes.SignUpError);
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (!password) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }
    logger4.debug("signUp attrs:", attributes);
    logger4.debug("signUp validation data:", validationData);
    return new Promise((resolve, reject) => {
      this.userPool.signUp(username, password, attributes, validationData, (err, data) => {
        if (err) {
          dispatchAuthEvent2("signUp_failure", err, `${username} failed to signup`);
          reject(err);
        } else {
          dispatchAuthEvent2("signUp", data, `${username} has signed up successfully`);
          resolve(data);
        }
      }, clientMetadata);
    });
  }
  confirmSignUp(username, code, options) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (!code) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    const user = this.createCognitoUser(username);
    const forceAliasCreation = options && typeof options.forceAliasCreation === "boolean" ? options.forceAliasCreation : true;
    let clientMetadata;
    if (options && options.clientMetadata) {
      clientMetadata = options.clientMetadata;
    } else if (this._config.clientMetadata) {
      clientMetadata = this._config.clientMetadata;
    }
    return new Promise((resolve, reject) => {
      user.confirmRegistration(code, forceAliasCreation, (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }, clientMetadata);
    });
  }
  resendSignUp(username, clientMetadata = this._config.clientMetadata) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    const user = this.createCognitoUser(username);
    return new Promise((resolve, reject) => {
      user.resendConfirmationCode((err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }, clientMetadata);
    });
  }
  signIn(usernameOrSignInOpts, pw, clientMetadata = this._config.clientMetadata) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    let username = null;
    let password = null;
    let validationData = {};
    if (typeof usernameOrSignInOpts === "string") {
      username = usernameOrSignInOpts;
      password = pw;
    } else if (isUsernamePasswordOpts(usernameOrSignInOpts)) {
      if (typeof pw !== "undefined") {
        logger4.warn("The password should be defined under the first parameter object!");
      }
      username = usernameOrSignInOpts.username;
      password = usernameOrSignInOpts.password;
      validationData = usernameOrSignInOpts.validationData;
    } else {
      return this.rejectAuthError(AuthErrorTypes.InvalidUsername);
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    const authDetails = new AuthenticationDetails({
      Username: username,
      Password: password,
      ValidationData: validationData,
      ClientMetadata: clientMetadata
    });
    if (password) {
      return this.signInWithPassword(authDetails);
    } else {
      return this.signInWithoutPassword(authDetails);
    }
  }
  authCallbacks(user, resolve, reject) {
    const that = this;
    return {
      onSuccess: async (session) => {
        logger4.debug(session);
        delete user["challengeName"];
        delete user["challengeParam"];
        try {
          await this.Credentials.clear();
          const cred = await this.Credentials.set(session, "session");
          logger4.debug("succeed to get cognito credentials", cred);
        } catch (e) {
          logger4.debug("cannot get cognito credentials", e);
        } finally {
          try {
            const currentUser = await this.currentUserPoolUser();
            that.user = currentUser;
            dispatchAuthEvent2("signIn", currentUser, `A user ${user.getUsername()} has been signed in`);
            resolve(currentUser);
          } catch (e) {
            logger4.error("Failed to get the signed in user", e);
            reject(e);
          }
        }
      },
      onFailure: (err) => {
        logger4.debug("signIn failure", err);
        dispatchAuthEvent2("signIn_failure", err, `${user.getUsername()} failed to signin`);
        reject(err);
      },
      customChallenge: (challengeParam) => {
        logger4.debug("signIn custom challenge answer required");
        user["challengeName"] = "CUSTOM_CHALLENGE";
        user["challengeParam"] = challengeParam;
        resolve(user);
      },
      mfaRequired: (challengeName, challengeParam) => {
        logger4.debug("signIn MFA required");
        user["challengeName"] = challengeName;
        user["challengeParam"] = challengeParam;
        resolve(user);
      },
      mfaSetup: (challengeName, challengeParam) => {
        logger4.debug("signIn mfa setup", challengeName);
        user["challengeName"] = challengeName;
        user["challengeParam"] = challengeParam;
        resolve(user);
      },
      newPasswordRequired: (userAttributes, requiredAttributes) => {
        logger4.debug("signIn new password");
        user["challengeName"] = "NEW_PASSWORD_REQUIRED";
        user["challengeParam"] = {
          userAttributes,
          requiredAttributes
        };
        resolve(user);
      },
      totpRequired: (challengeName, challengeParam) => {
        logger4.debug("signIn totpRequired");
        user["challengeName"] = challengeName;
        user["challengeParam"] = challengeParam;
        resolve(user);
      },
      selectMFAType: (challengeName, challengeParam) => {
        logger4.debug("signIn selectMFAType", challengeName);
        user["challengeName"] = challengeName;
        user["challengeParam"] = challengeParam;
        resolve(user);
      }
    };
  }
  signInWithPassword(authDetails) {
    if (this.pendingSignIn) {
      throw new Error("Pending sign-in attempt already in progress");
    }
    const user = this.createCognitoUser(authDetails.getUsername());
    this.pendingSignIn = new Promise((resolve, reject) => {
      user.authenticateUser(authDetails, this.authCallbacks(user, (value) => {
        this.pendingSignIn = null;
        resolve(value);
      }, (error) => {
        this.pendingSignIn = null;
        reject(error);
      }));
    });
    return this.pendingSignIn;
  }
  signInWithoutPassword(authDetails) {
    const user = this.createCognitoUser(authDetails.getUsername());
    user.setAuthenticationFlowType("CUSTOM_AUTH");
    return new Promise((resolve, reject) => {
      user.initiateAuth(authDetails, this.authCallbacks(user, resolve, reject));
    });
  }
  getMFAOptions(user) {
    return new Promise((res, rej) => {
      user.getMFAOptions((err, mfaOptions) => {
        if (err) {
          logger4.debug("get MFA Options failed", err);
          rej(err);
          return;
        }
        logger4.debug("get MFA options success", mfaOptions);
        res(mfaOptions);
        return;
      });
    });
  }
  getPreferredMFA(user, params) {
    const that = this;
    return new Promise((res, rej) => {
      const clientMetadata = this._config.clientMetadata;
      const bypassCache = params ? params.bypassCache : false;
      user.getUserData((err, data) => {
        if (err) {
          logger4.debug("getting preferred mfa failed", err);
          rej(err);
          return;
        }
        const mfaType = that._getMfaTypeFromUserData(data);
        if (!mfaType) {
          rej("invalid MFA Type");
          return;
        } else {
          res(mfaType);
          return;
        }
      }, { bypassCache, clientMetadata });
    });
  }
  _getMfaTypeFromUserData(data) {
    let ret = null;
    const preferredMFA = data.PreferredMfaSetting;
    if (preferredMFA) {
      ret = preferredMFA;
    } else {
      const mfaList = data.UserMFASettingList;
      if (!mfaList) {
        const MFAOptions = data.MFAOptions;
        if (MFAOptions) {
          ret = "SMS_MFA";
        } else {
          ret = "NOMFA";
        }
      } else if (mfaList.length === 0) {
        ret = "NOMFA";
      } else {
        logger4.debug("invalid case for getPreferredMFA", data);
      }
    }
    return ret;
  }
  _getUserData(user, params) {
    return new Promise((res, rej) => {
      user.getUserData((err, data) => {
        if (err) {
          logger4.debug("getting user data failed", err);
          rej(err);
          return;
        } else {
          res(data);
          return;
        }
      }, params);
    });
  }
  async setPreferredMFA(user, mfaMethod) {
    const clientMetadata = this._config.clientMetadata;
    const userData = await this._getUserData(user, {
      bypassCache: true,
      clientMetadata
    });
    let smsMfaSettings = null;
    let totpMfaSettings = null;
    switch (mfaMethod) {
      case "TOTP":
      case "SOFTWARE_TOKEN_MFA":
        totpMfaSettings = {
          PreferredMfa: true,
          Enabled: true
        };
        break;
      case "SMS":
      case "SMS_MFA":
        smsMfaSettings = {
          PreferredMfa: true,
          Enabled: true
        };
        break;
      case "NOMFA":
        const mfaList = userData["UserMFASettingList"];
        const currentMFAType = await this._getMfaTypeFromUserData(userData);
        if (currentMFAType === "NOMFA") {
          return Promise.resolve("No change for mfa type");
        } else if (currentMFAType === "SMS_MFA") {
          smsMfaSettings = {
            PreferredMfa: false,
            Enabled: false
          };
        } else if (currentMFAType === "SOFTWARE_TOKEN_MFA") {
          totpMfaSettings = {
            PreferredMfa: false,
            Enabled: false
          };
        } else {
          return this.rejectAuthError(AuthErrorTypes.InvalidMFA);
        }
        if (mfaList && mfaList.length !== 0) {
          mfaList.forEach((mfaType) => {
            if (mfaType === "SMS_MFA") {
              smsMfaSettings = {
                PreferredMfa: false,
                Enabled: false
              };
            } else if (mfaType === "SOFTWARE_TOKEN_MFA") {
              totpMfaSettings = {
                PreferredMfa: false,
                Enabled: false
              };
            }
          });
        }
        break;
      default:
        logger4.debug("no validmfa method provided");
        return this.rejectAuthError(AuthErrorTypes.NoMFA);
    }
    const that = this;
    return new Promise((res, rej) => {
      user.setUserMfaPreference(smsMfaSettings, totpMfaSettings, (err, result) => {
        if (err) {
          logger4.debug("Set user mfa preference error", err);
          return rej(err);
        }
        logger4.debug("Set user mfa success", result);
        logger4.debug("Caching the latest user data into local");
        user.getUserData((err2, data) => {
          if (err2) {
            logger4.debug("getting user data failed", err2);
            return rej(err2);
          } else {
            return res(result);
          }
        }, {
          bypassCache: true,
          clientMetadata
        });
      });
    });
  }
  disableSMS(user) {
    return new Promise((res, rej) => {
      user.disableMFA((err, data) => {
        if (err) {
          logger4.debug("disable mfa failed", err);
          rej(err);
          return;
        }
        logger4.debug("disable mfa succeed", data);
        res(data);
        return;
      });
    });
  }
  enableSMS(user) {
    return new Promise((res, rej) => {
      user.enableMFA((err, data) => {
        if (err) {
          logger4.debug("enable mfa failed", err);
          rej(err);
          return;
        }
        logger4.debug("enable mfa succeed", data);
        res(data);
        return;
      });
    });
  }
  setupTOTP(user) {
    return new Promise((res, rej) => {
      user.associateSoftwareToken({
        onFailure: (err) => {
          logger4.debug("associateSoftwareToken failed", err);
          rej(err);
          return;
        },
        associateSecretCode: (secretCode) => {
          logger4.debug("associateSoftwareToken sucess", secretCode);
          res(secretCode);
          return;
        }
      });
    });
  }
  verifyTotpToken(user, challengeAnswer) {
    logger4.debug("verification totp token", user, challengeAnswer);
    return new Promise((res, rej) => {
      user.verifySoftwareToken(challengeAnswer, "My TOTP device", {
        onFailure: (err) => {
          logger4.debug("verifyTotpToken failed", err);
          rej(err);
          return;
        },
        onSuccess: (data) => {
          dispatchAuthEvent2("signIn", user, `A user ${user.getUsername()} has been signed in`);
          logger4.debug("verifyTotpToken success", data);
          res(data);
          return;
        }
      });
    });
  }
  confirmSignIn(user, code, mfaType, clientMetadata = this._config.clientMetadata) {
    if (!code) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    const that = this;
    return new Promise((resolve, reject) => {
      user.sendMFACode(code, {
        onSuccess: async (session) => {
          logger4.debug(session);
          try {
            await this.Credentials.clear();
            const cred = await this.Credentials.set(session, "session");
            logger4.debug("succeed to get cognito credentials", cred);
          } catch (e) {
            logger4.debug("cannot get cognito credentials", e);
          } finally {
            that.user = user;
            dispatchAuthEvent2("signIn", user, `A user ${user.getUsername()} has been signed in`);
            resolve(user);
          }
        },
        onFailure: (err) => {
          logger4.debug("confirm signIn failure", err);
          reject(err);
        }
      }, mfaType, clientMetadata);
    });
  }
  completeNewPassword(user, password, requiredAttributes = {}, clientMetadata = this._config.clientMetadata) {
    if (!password) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }
    const that = this;
    return new Promise((resolve, reject) => {
      user.completeNewPasswordChallenge(password, requiredAttributes, {
        onSuccess: async (session) => {
          logger4.debug(session);
          try {
            await this.Credentials.clear();
            const cred = await this.Credentials.set(session, "session");
            logger4.debug("succeed to get cognito credentials", cred);
          } catch (e) {
            logger4.debug("cannot get cognito credentials", e);
          } finally {
            that.user = user;
            dispatchAuthEvent2("signIn", user, `A user ${user.getUsername()} has been signed in`);
            resolve(user);
          }
        },
        onFailure: (err) => {
          logger4.debug("completeNewPassword failure", err);
          dispatchAuthEvent2("completeNewPassword_failure", err, `${this.user} failed to complete the new password flow`);
          reject(err);
        },
        mfaRequired: (challengeName, challengeParam) => {
          logger4.debug("signIn MFA required");
          user["challengeName"] = challengeName;
          user["challengeParam"] = challengeParam;
          resolve(user);
        },
        mfaSetup: (challengeName, challengeParam) => {
          logger4.debug("signIn mfa setup", challengeName);
          user["challengeName"] = challengeName;
          user["challengeParam"] = challengeParam;
          resolve(user);
        },
        totpRequired: (challengeName, challengeParam) => {
          logger4.debug("signIn mfa setup", challengeName);
          user["challengeName"] = challengeName;
          user["challengeParam"] = challengeParam;
          resolve(user);
        }
      }, clientMetadata);
    });
  }
  sendCustomChallengeAnswer(user, challengeResponses, clientMetadata = this._config.clientMetadata) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    if (!challengeResponses) {
      return this.rejectAuthError(AuthErrorTypes.EmptyChallengeResponse);
    }
    const that = this;
    return new Promise((resolve, reject) => {
      user.sendCustomChallengeAnswer(challengeResponses, this.authCallbacks(user, resolve, reject), clientMetadata);
    });
  }
  deleteUserAttributes(user, attributeNames) {
    const that = this;
    return new Promise((resolve, reject) => {
      that.userSession(user).then((session) => {
        user.deleteAttributes(attributeNames, (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        });
      });
    });
  }
  updateUserAttributes(user, attributes, clientMetadata = this._config.clientMetadata) {
    const attributeList = [];
    const that = this;
    return new Promise((resolve, reject) => {
      that.userSession(user).then((session) => {
        for (const key in attributes) {
          if (key !== "sub" && key.indexOf("_verified") < 0) {
            const attr = {
              Name: key,
              Value: attributes[key]
            };
            attributeList.push(attr);
          }
        }
        user.updateAttributes(attributeList, (err, result) => {
          if (err) {
            return reject(err);
          } else {
            return resolve(result);
          }
        }, clientMetadata);
      });
    });
  }
  userAttributes(user) {
    return new Promise((resolve, reject) => {
      this.userSession(user).then((session) => {
        user.getUserAttributes((err, attributes) => {
          if (err) {
            reject(err);
          } else {
            resolve(attributes);
          }
        });
      });
    });
  }
  verifiedContact(user) {
    const that = this;
    return this.userAttributes(user).then((attributes) => {
      const attrs = that.attributesToObject(attributes);
      const unverified = {};
      const verified = {};
      if (attrs["email"]) {
        if (attrs["email_verified"]) {
          verified["email"] = attrs["email"];
        } else {
          unverified["email"] = attrs["email"];
        }
      }
      if (attrs["phone_number"]) {
        if (attrs["phone_number_verified"]) {
          verified["phone_number"] = attrs["phone_number"];
        } else {
          unverified["phone_number"] = attrs["phone_number"];
        }
      }
      return {
        verified,
        unverified
      };
    });
  }
  currentUserPoolUser(params) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    return new Promise((res, rej) => {
      this._storageSync.then(async () => {
        if (this.isOAuthInProgress()) {
          logger4.debug("OAuth signIn in progress, waiting for resolution...");
          await new Promise((res2) => {
            const timeoutId = setTimeout(() => {
              logger4.debug("OAuth signIn in progress timeout");
              Hub2.remove("auth", hostedUISignCallback);
              res2();
            }, OAUTH_FLOW_MS_TIMEOUT);
            Hub2.listen("auth", hostedUISignCallback);
            function hostedUISignCallback({ payload }) {
              const { event } = payload;
              if (event === "cognitoHostedUI" || event === "cognitoHostedUI_failure") {
                logger4.debug(`OAuth signIn resolved: ${event}`);
                clearTimeout(timeoutId);
                Hub2.remove("auth", hostedUISignCallback);
                res2();
              }
            }
          });
        }
        const user = this.userPool.getCurrentUser();
        if (!user) {
          logger4.debug("Failed to get user from user pool");
          rej("No current user");
          return;
        }
        const clientMetadata = this._config.clientMetadata;
        user.getSession(async (err, session) => {
          if (err) {
            logger4.debug("Failed to get the user session", err);
            rej(err);
            return;
          }
          const bypassCache = params ? params.bypassCache : false;
          if (bypassCache) {
            await this.Credentials.clear();
          }
          const clientMetadata2 = this._config.clientMetadata;
          const { scope = "" } = session.getAccessToken().decodePayload();
          if (scope.split(" ").includes(USER_ADMIN_SCOPE)) {
            user.getUserData((err2, data) => {
              if (err2) {
                logger4.debug("getting user data failed", err2);
                if (err2.message === "User is disabled." || err2.message === "User does not exist." || err2.message === "Access Token has been revoked") {
                  rej(err2);
                } else {
                  res(user);
                }
                return;
              }
              const preferredMFA = data.PreferredMfaSetting || "NOMFA";
              const attributeList = [];
              for (let i = 0; i < data.UserAttributes.length; i++) {
                const attribute = {
                  Name: data.UserAttributes[i].Name,
                  Value: data.UserAttributes[i].Value
                };
                const userAttribute = new CognitoUserAttribute(attribute);
                attributeList.push(userAttribute);
              }
              const attributes = this.attributesToObject(attributeList);
              Object.assign(user, { attributes, preferredMFA });
              return res(user);
            }, { bypassCache, clientMetadata: clientMetadata2 });
          } else {
            logger4.debug(`Unable to get the user data because the ${USER_ADMIN_SCOPE} is not in the scopes of the access token`);
            return res(user);
          }
        }, { clientMetadata });
      }).catch((e) => {
        logger4.debug("Failed to sync cache info into memory", e);
        return rej(e);
      });
    });
  }
  isOAuthInProgress() {
    return this.oAuthFlowInProgress;
  }
  async currentAuthenticatedUser(params) {
    logger4.debug("getting current authenticated user");
    let federatedUser = null;
    try {
      await this._storageSync;
    } catch (e) {
      logger4.debug("Failed to sync cache info into memory", e);
      throw e;
    }
    try {
      const federatedInfo = JSON.parse(this._storage.getItem("aws-amplify-federatedInfo"));
      if (federatedInfo) {
        federatedUser = {
          ...federatedInfo.user,
          token: federatedInfo.token
        };
      }
    } catch (e) {
      logger4.debug("cannot load federated user from auth storage");
    }
    if (federatedUser) {
      this.user = federatedUser;
      logger4.debug("get current authenticated federated user", this.user);
      return this.user;
    } else {
      logger4.debug("get current authenticated userpool user");
      let user = null;
      try {
        user = await this.currentUserPoolUser(params);
      } catch (e) {
        if (e === "No userPool") {
          logger4.error("Cannot get the current user because the user pool is missing. Please make sure the Auth module is configured with a valid Cognito User Pool ID");
        }
        logger4.debug("The user is not authenticated by the error", e);
        return Promise.reject("The user is not authenticated");
      }
      this.user = user;
      return this.user;
    }
  }
  currentSession() {
    const that = this;
    logger4.debug("Getting current session");
    if (!this.userPool) {
      return Promise.reject();
    }
    return new Promise((res, rej) => {
      that.currentUserPoolUser().then((user) => {
        that.userSession(user).then((session) => {
          res(session);
          return;
        }).catch((e) => {
          logger4.debug("Failed to get the current session", e);
          rej(e);
          return;
        });
      }).catch((e) => {
        logger4.debug("Failed to get the current user", e);
        rej(e);
        return;
      });
    });
  }
  userSession(user) {
    if (!user) {
      logger4.debug("the user is null");
      return this.rejectAuthError(AuthErrorTypes.NoUserSession);
    }
    const clientMetadata = this._config.clientMetadata;
    return new Promise((resolve, reject) => {
      logger4.debug("Getting the session from this user:", user);
      user.getSession((err, session) => {
        if (err) {
          logger4.debug("Failed to get the session from user", user);
          reject(err);
          return;
        } else {
          logger4.debug("Succeed to get the user session", session);
          resolve(session);
          return;
        }
      }, { clientMetadata });
    });
  }
  async currentUserCredentials() {
    logger4.debug("Getting current user credentials");
    try {
      await this._storageSync;
    } catch (e) {
      logger4.debug("Failed to sync cache info into memory", e);
      throw e;
    }
    let federatedInfo = null;
    try {
      federatedInfo = JSON.parse(this._storage.getItem("aws-amplify-federatedInfo"));
    } catch (e) {
      logger4.debug("failed to get or parse item aws-amplify-federatedInfo", e);
    }
    if (federatedInfo) {
      return this.Credentials.refreshFederatedToken(federatedInfo);
    } else {
      return this.currentSession().then((session) => {
        logger4.debug("getting session success", session);
        return this.Credentials.set(session, "session");
      }).catch((error) => {
        logger4.debug("getting session failed", error);
        return this.Credentials.set(null, "guest");
      });
    }
  }
  currentCredentials() {
    logger4.debug("getting current credentials");
    return this.Credentials.get();
  }
  verifyUserAttribute(user, attr, clientMetadata = this._config.clientMetadata) {
    return new Promise((resolve, reject) => {
      user.getAttributeVerificationCode(attr, {
        onSuccess(success) {
          return resolve(success);
        },
        onFailure(err) {
          return reject(err);
        }
      }, clientMetadata);
    });
  }
  verifyUserAttributeSubmit(user, attr, code) {
    if (!code) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    return new Promise((resolve, reject) => {
      user.verifyAttribute(attr, code, {
        onSuccess(data) {
          resolve(data);
          return;
        },
        onFailure(err) {
          reject(err);
          return;
        }
      });
    });
  }
  verifyCurrentUserAttribute(attr) {
    const that = this;
    return that.currentUserPoolUser().then((user) => that.verifyUserAttribute(user, attr));
  }
  verifyCurrentUserAttributeSubmit(attr, code) {
    const that = this;
    return that.currentUserPoolUser().then((user) => that.verifyUserAttributeSubmit(user, attr, code));
  }
  async cognitoIdentitySignOut(opts, user) {
    try {
      await this._storageSync;
    } catch (e) {
      logger4.debug("Failed to sync cache info into memory", e);
      throw e;
    }
    const isSignedInHostedUI = this._oAuthHandler && this._storage.getItem("amplify-signin-with-hostedUI") === "true";
    return new Promise((res, rej) => {
      if (opts && opts.global) {
        logger4.debug("user global sign out", user);
        const clientMetadata = this._config.clientMetadata;
        user.getSession((err, result) => {
          if (err) {
            logger4.debug("failed to get the user session", err);
            return rej(err);
          }
          user.globalSignOut({
            onSuccess: (data) => {
              logger4.debug("global sign out success");
              if (isSignedInHostedUI) {
                this.oAuthSignOutRedirect(res, rej);
              } else {
                return res();
              }
            },
            onFailure: (err2) => {
              logger4.debug("global sign out failed", err2);
              return rej(err2);
            }
          });
        }, { clientMetadata });
      } else {
        logger4.debug("user sign out", user);
        user.signOut(() => {
          if (isSignedInHostedUI) {
            this.oAuthSignOutRedirect(res, rej);
          } else {
            return res();
          }
        });
      }
    });
  }
  oAuthSignOutRedirect(resolve, reject) {
    const { isBrowser: isBrowser2 } = JS2.browserOrNode();
    if (isBrowser2) {
      this.oAuthSignOutRedirectOrReject(reject);
    } else {
      this.oAuthSignOutAndResolve(resolve);
    }
  }
  oAuthSignOutAndResolve(resolve) {
    this._oAuthHandler.signOut();
    resolve();
  }
  oAuthSignOutRedirectOrReject(reject) {
    this._oAuthHandler.signOut();
    setTimeout(() => reject("Signout timeout fail"), 3e3);
  }
  async signOut(opts) {
    try {
      await this.cleanCachedItems();
    } catch (e) {
      logger4.debug("failed to clear cached items");
    }
    if (this.userPool) {
      const user = this.userPool.getCurrentUser();
      if (user) {
        await this.cognitoIdentitySignOut(opts, user);
      } else {
        logger4.debug("no current Cognito user");
      }
    } else {
      logger4.debug("no Congito User pool");
    }
    dispatchAuthEvent2("signOut", this.user, `A user has been signed out`);
    this.user = null;
  }
  async cleanCachedItems() {
    await this.Credentials.clear();
  }
  changePassword(user, oldPassword, newPassword, clientMetadata = this._config.clientMetadata) {
    return new Promise((resolve, reject) => {
      this.userSession(user).then((session) => {
        user.changePassword(oldPassword, newPassword, (err, data) => {
          if (err) {
            logger4.debug("change password failure", err);
            return reject(err);
          } else {
            return resolve(data);
          }
        }, clientMetadata);
      });
    });
  }
  forgotPassword(username, clientMetadata = this._config.clientMetadata) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    const user = this.createCognitoUser(username);
    return new Promise((resolve, reject) => {
      user.forgotPassword({
        onSuccess: () => {
          resolve();
          return;
        },
        onFailure: (err) => {
          logger4.debug("forgot password failure", err);
          dispatchAuthEvent2("forgotPassword_failure", err, `${username} forgotPassword failed`);
          reject(err);
          return;
        },
        inputVerificationCode: (data) => {
          dispatchAuthEvent2("forgotPassword", user, `${username} has initiated forgot password flow`);
          resolve(data);
          return;
        }
      }, clientMetadata);
    });
  }
  forgotPasswordSubmit(username, code, password, clientMetadata = this._config.clientMetadata) {
    if (!this.userPool) {
      return this.rejectNoUserPool();
    }
    if (!username) {
      return this.rejectAuthError(AuthErrorTypes.EmptyUsername);
    }
    if (!code) {
      return this.rejectAuthError(AuthErrorTypes.EmptyCode);
    }
    if (!password) {
      return this.rejectAuthError(AuthErrorTypes.EmptyPassword);
    }
    const user = this.createCognitoUser(username);
    return new Promise((resolve, reject) => {
      user.confirmPassword(code, password, {
        onSuccess: (success) => {
          dispatchAuthEvent2("forgotPasswordSubmit", user, `${username} forgotPasswordSubmit successful`);
          resolve(success);
          return;
        },
        onFailure: (err) => {
          dispatchAuthEvent2("forgotPasswordSubmit_failure", err, `${username} forgotPasswordSubmit failed`);
          reject(err);
          return;
        }
      }, clientMetadata);
    });
  }
  async currentUserInfo() {
    const source = this.Credentials.getCredSource();
    if (!source || source === "aws" || source === "userPool") {
      const user = await this.currentUserPoolUser().catch((err) => logger4.error(err));
      if (!user) {
        return null;
      }
      try {
        const attributes = await this.userAttributes(user);
        const userAttrs = this.attributesToObject(attributes);
        let credentials = null;
        try {
          credentials = await this.currentCredentials();
        } catch (e) {
          logger4.debug("Failed to retrieve credentials while getting current user info", e);
        }
        const info = {
          id: credentials ? credentials.identityId : void 0,
          username: user.getUsername(),
          attributes: userAttrs
        };
        return info;
      } catch (err) {
        logger4.error("currentUserInfo error", err);
        return {};
      }
    }
    if (source === "federated") {
      const user = this.user;
      return user ? user : {};
    }
  }
  async federatedSignIn(providerOrOptions, response, user) {
    if (!this._config.identityPoolId && !this._config.userPoolId) {
      throw new Error(`Federation requires either a User Pool or Identity Pool in config`);
    }
    if (typeof providerOrOptions === "undefined") {
      if (this._config.identityPoolId && !this._config.userPoolId) {
        throw new Error(`Federation with Identity Pools requires tokens passed as arguments`);
      }
    }
    if (isFederatedSignInOptions(providerOrOptions) || isFederatedSignInOptionsCustom(providerOrOptions) || hasCustomState(providerOrOptions) || typeof providerOrOptions === "undefined") {
      const options = providerOrOptions || {
        provider: CognitoHostedUIIdentityProvider.Cognito
      };
      const provider = isFederatedSignInOptions(options) ? options.provider : options.customProvider;
      const customState = isFederatedSignInOptions(options) ? options.customState : options.customState;
      if (this._config.userPoolId) {
        const client_id = isCognitoHostedOpts(this._config.oauth) ? this._config.userPoolWebClientId : this._config.oauth.clientID;
        const redirect_uri = isCognitoHostedOpts(this._config.oauth) ? this._config.oauth.redirectSignIn : this._config.oauth.redirectUri;
        this._oAuthHandler.oauthSignIn(this._config.oauth.responseType, this._config.oauth.domain, redirect_uri, client_id, provider, customState);
      }
    } else {
      const provider = providerOrOptions;
      try {
        const loggedInUser = JSON.stringify(JSON.parse(this._storage.getItem("aws-amplify-federatedInfo")).user);
        if (loggedInUser) {
          logger4.warn(`There is already a signed in user: ${loggedInUser} in your app.
																	You should not call Auth.federatedSignIn method again as it may cause unexpected behavior.`);
        }
      } catch (e) {
      }
      const { token, identity_id, expires_at } = response;
      const credentials = await this.Credentials.set({ provider, token, identity_id, user, expires_at }, "federation");
      const currentUser = await this.currentAuthenticatedUser();
      dispatchAuthEvent2("signIn", currentUser, `A user ${currentUser.username} has been signed in`);
      logger4.debug("federated sign in credentials", credentials);
      return credentials;
    }
  }
  async _handleAuthResponse(URL) {
    if (this.oAuthFlowInProgress) {
      logger4.debug(`Skipping URL ${URL} current flow in progress`);
      return;
    }
    try {
      this.oAuthFlowInProgress = true;
      if (!this._config.userPoolId) {
        throw new Error(`OAuth responses require a User Pool defined in config`);
      }
      dispatchAuthEvent2("parsingCallbackUrl", { url: URL }, `The callback url is being parsed`);
      const currentUrl = URL || (JS2.browserOrNode().isBrowser ? window.location.href : "");
      const hasCodeOrError = !!((0, import_url2.parse)(currentUrl).query || "").split("&").map((entry) => entry.split("=")).find(([k]) => k === "code" || k === "error");
      const hasTokenOrError = !!((0, import_url2.parse)(currentUrl).hash || "#").substr(1).split("&").map((entry) => entry.split("=")).find(([k]) => k === "access_token" || k === "error");
      if (hasCodeOrError || hasTokenOrError) {
        this._storage.setItem("amplify-redirected-from-hosted-ui", "true");
        try {
          const {
            accessToken,
            idToken,
            refreshToken,
            state
          } = await this._oAuthHandler.handleAuthResponse(currentUrl);
          const session = new CognitoUserSession({
            IdToken: new CognitoIdToken({ IdToken: idToken }),
            RefreshToken: new CognitoRefreshToken({
              RefreshToken: refreshToken
            }),
            AccessToken: new CognitoAccessToken({
              AccessToken: accessToken
            })
          });
          let credentials;
          if (this._config.identityPoolId) {
            credentials = await this.Credentials.set(session, "session");
            logger4.debug("AWS credentials", credentials);
          }
          const isCustomStateIncluded = /-/.test(state);
          const currentUser = this.createCognitoUser(session.getIdToken().decodePayload()["cognito:username"]);
          currentUser.setSignInUserSession(session);
          if (window && typeof window.history !== "undefined") {
            window.history.replaceState({}, null, this._config.oauth.redirectSignIn);
          }
          dispatchAuthEvent2("signIn", currentUser, `A user ${currentUser.getUsername()} has been signed in`);
          dispatchAuthEvent2("cognitoHostedUI", currentUser, `A user ${currentUser.getUsername()} has been signed in via Cognito Hosted UI`);
          if (isCustomStateIncluded) {
            const customState = state.split("-").splice(1).join("-");
            dispatchAuthEvent2("customOAuthState", urlSafeDecode(customState), `State for user ${currentUser.getUsername()}`);
          }
          return credentials;
        } catch (err) {
          logger4.debug("Error in cognito hosted auth response", err);
          if (window && typeof window.history !== "undefined") {
            window.history.replaceState({}, null, this._config.oauth.redirectSignIn);
          }
          dispatchAuthEvent2("signIn_failure", err, `The OAuth response flow failed`);
          dispatchAuthEvent2("cognitoHostedUI_failure", err, `A failure occurred when returning to the Cognito Hosted UI`);
          dispatchAuthEvent2("customState_failure", err, `A failure occurred when returning state`);
        }
      }
    } finally {
      this.oAuthFlowInProgress = false;
    }
  }
  essentialCredentials(credentials) {
    return {
      accessKeyId: credentials.accessKeyId,
      sessionToken: credentials.sessionToken,
      secretAccessKey: credentials.secretAccessKey,
      identityId: credentials.identityId,
      authenticated: credentials.authenticated
    };
  }
  attributesToObject(attributes) {
    const obj = {};
    if (attributes) {
      attributes.map((attribute) => {
        if (attribute.Name === "email_verified" || attribute.Name === "phone_number_verified") {
          obj[attribute.Name] = this.isTruthyString(attribute.Value) || attribute.Value === true;
        } else {
          obj[attribute.Name] = attribute.Value;
        }
      });
    }
    return obj;
  }
  isTruthyString(value) {
    return typeof value.toLowerCase === "function" && value.toLowerCase() === "true";
  }
  createCognitoUser(username) {
    const userData = {
      Username: username,
      Pool: this.userPool
    };
    userData.Storage = this._storage;
    const { authenticationFlowType } = this._config;
    const user = new CognitoUser(userData);
    if (authenticationFlowType) {
      user.setAuthenticationFlowType(authenticationFlowType);
    }
    return user;
  }
  _isValidAuthStorage(obj) {
    return !!obj && typeof obj.getItem === "function" && typeof obj.setItem === "function" && typeof obj.removeItem === "function" && typeof obj.clear === "function";
  }
  noUserPoolErrorHandler(config) {
    if (config) {
      if (!config.userPoolId || !config.identityPoolId) {
        return AuthErrorTypes.MissingAuthConfig;
      }
    }
    return AuthErrorTypes.NoConfig;
  }
  rejectAuthError(type) {
    return Promise.reject(new AuthError(type));
  }
  rejectNoUserPool() {
    const type = this.noUserPoolErrorHandler(this._config);
    return Promise.reject(new NoUserPoolError(type));
  }
  async rememberDevice() {
    let currUser;
    try {
      currUser = await this.currentUserPoolUser();
    } catch (error) {
      logger4.debug("The user is not authenticated by the error", error);
      return Promise.reject("The user is not authenticated");
    }
    currUser.getCachedDeviceKeyAndPassword();
    return new Promise((res, rej) => {
      currUser.setDeviceStatusRemembered({
        onSuccess: (data) => {
          res(data);
        },
        onFailure: (err) => {
          if (err.code === "InvalidParameterException") {
            rej(new AuthError(AuthErrorTypes.DeviceConfig));
          } else if (err.code === "NetworkError") {
            rej(new AuthError(AuthErrorTypes.NetworkError));
          } else {
            rej(err);
          }
        }
      });
    });
  }
  async forgetDevice() {
    let currUser;
    try {
      currUser = await this.currentUserPoolUser();
    } catch (error) {
      logger4.debug("The user is not authenticated by the error", error);
      return Promise.reject("The user is not authenticated");
    }
    currUser.getCachedDeviceKeyAndPassword();
    return new Promise((res, rej) => {
      currUser.forgetDevice({
        onSuccess: (data) => {
          res(data);
        },
        onFailure: (err) => {
          if (err.code === "InvalidParameterException") {
            rej(new AuthError(AuthErrorTypes.DeviceConfig));
          } else if (err.code === "NetworkError") {
            rej(new AuthError(AuthErrorTypes.NetworkError));
          } else {
            rej(err);
          }
        }
      });
    });
  }
  async fetchDevices() {
    let currUser;
    try {
      currUser = await this.currentUserPoolUser();
    } catch (error) {
      logger4.debug("The user is not authenticated by the error", error);
      throw new Error("The user is not authenticated");
    }
    currUser.getCachedDeviceKeyAndPassword();
    return new Promise((res, rej) => {
      const cb = {
        onSuccess(data) {
          const deviceList = data.Devices.map((device) => {
            const deviceName = device.DeviceAttributes.find(({ Name }) => Name === "device_name") || {};
            const deviceInfo = {
              id: device.DeviceKey,
              name: deviceName.Value
            };
            return deviceInfo;
          });
          res(deviceList);
        },
        onFailure: (err) => {
          if (err.code === "InvalidParameterException") {
            rej(new AuthError(AuthErrorTypes.DeviceConfig));
          } else if (err.code === "NetworkError") {
            rej(new AuthError(AuthErrorTypes.NetworkError));
          } else {
            rej(err);
          }
        }
      };
      currUser.listDevices(MAX_DEVICES, null, cb);
    });
  }
};
var Auth = new AuthClass(null);
Amplify.register(Auth);

// src/index.ts
var src_default = Auth;
export {
  Auth,
  AuthErrorStrings,
  CognitoHostedUIIdentityProvider,
  CognitoUser,
  CookieStorage,
  appendToCognitoUserAgent,
  src_default as default
};
/*!
 * Copyright 2016 Amazon.com,
 * Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Amazon Software License (the "License").
 * You may not use this file except in compliance with the
 * License. A copy of the License is located at
 *
 *     http://aws.amazon.com/asl/
 *
 * or in the "license" file accompanying this file. This file is
 * distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, express or implied. See the License
 * for the specific language governing permissions and
 * limitations under the License.
 */
/*!
 * JavaScript Cookie v2.2.1
 * https://github.com/js-cookie/js-cookie
 *
 * Copyright 2006, 2015 Klaus Hartl & Fagner Brack
 * Released under the MIT license
 */
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <http://feross.org>
 * @license  MIT
 */
/*! https://mths.be/punycode v1.3.2 by @mathias */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
