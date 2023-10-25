"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, _toPropertyKey(descriptor.key), descriptor); } }
function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }
function _toPropertyKey(arg) { var key = _toPrimitive(arg, "string"); return _typeof(key) === "symbol" ? key : String(key); }
function _toPrimitive(input, hint) { if (_typeof(input) !== "object" || input === null) return input; var prim = input[Symbol.toPrimitive]; if (prim !== undefined) { var res = prim.call(input, hint || "default"); if (_typeof(res) !== "object") return res; throw new TypeError("@@toPrimitive must return a primitive value."); } return (hint === "string" ? String : Number)(input); }
var DOLLAR_MULTIPLIER = 100000;
var PERCENTAGE_MULTIPLIER = 1000;
function getCorrectedPercentile(percentile) {
  if (Math.abs(percentile) > 100) {
    return percentile / PERCENTAGE_MULTIPLIER;
  }
  return percentile;
}
function addZeroes(value, size) {
  var parts = String(value).split('.');
  var whole = parts[0] || '';
  var cents = parts[1] || '';
  size = size - cents.length;
  var pad = '';
  var i = 0;
  if (whole === '0') {
    whole = '';
  }
  for (i = 0; i < size; i += 1) {
    pad += '0';
  }
  return Number(whole + cents + pad);
}
function isNegativeZero(x) {
  return 1 / x === -Infinity;
}
function addOne(whole) {
  var numWhole = Number(whole);
  if (numWhole !== 0) {
    return numWhole > 0 ? numWhole + 1 : numWhole - 1;
  }
  return isNegativeZero(whole) ? numWhole - 1 : numWhole + 1;
}
function wholePlusDigits(whole) {
  var digits = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '00';
  if (Number(whole) !== 0) {
    return "".concat(whole, ".").concat(digits);
  }
  return isNegativeZero(whole) && digits != 0 ? "-0.".concat(digits) : "0.".concat(digits);
}
function hundredCents(digits) {
  var zeroes = "";
  while (zeroes.length < digits) {
    zeroes += "0";
  }
  return Number("1".concat(zeroes));
}
var Mathematics = /*#__PURE__*/function () {
  function Mathematics() {}
  _createClass(Mathematics, null, [{
    key: "toPercentage",
    value: function toPercentage(value) {
      return addZeroes(this.round(value, 3), 3);
    }
  }, {
    key: "toMoney",
    value: function toMoney(value) {
      return addZeroes(this.round(value, 5), 5);
    }
  }, {
    key: "percentage",
    value: function percentage(base, percentile, rounding) {
      if (!rounding) {
        rounding = {
          decimals: 2,
          policy: 'default'
        };
      }
      var fixedPercentile = getCorrectedPercentile(percentile);
      var calculated = base * (fixedPercentile / (100 * DOLLAR_MULTIPLIER));
      var rounded = this.round(calculated, rounding.decimals, null, rounding.policy);
      return Number(this.toMoney(rounded));
    }
  }, {
    key: "roundMoney",
    value: function roundMoney(value, digits, roundingPolicy) {
      if (digits === undefined || digits === null || digits === '') {
        digits = 2;
      }
      return this.round(value, digits, DOLLAR_MULTIPLIER, roundingPolicy);
    }
  }, {
    key: "round",
    value: function round(value, digits, divisor, roundingPolicy) {
      if (digits === undefined || digits === null) {
        digits = 2;
      }
      if (!divisor) {
        divisor = 1;
      }
      if (!roundingPolicy) {
        roundingPolicy = 'default';
      }
      var simplified = value / divisor;
      var parts = String(simplified).split('.');
      var whole = parts[0] || '0';
      var cents = parts[1] || '';
      var centsLength = 0;
      var roundedCents = '';
      var flip;
      var i = 0;
      var d = 0;
      if (cents) {
        centsLength = cents.length;
      }
      if (roundingPolicy === "nocents") {
        return wholePlusDigits(whole);
      }
      if (digits == 0) {
        flip = cents.substr(digits, 1);
        if (flip < 5 || roundingPolicy === 'down') {
          return wholePlusDigits(whole);
        }
        if (flip > 4 || roundingPolicy === 'up') {
          whole = addOne(whole);
          return wholePlusDigits(whole);
        }
      }
      if (centsLength > digits) {
        flip = cents.substr(digits, 1);
        roundedCents = cents.substr(0, digits);
        if (flip > 4 && roundingPolicy !== 'down') {
          roundedCents = Number(roundedCents) + 1;
        }
        if (String(roundedCents).length < digits) {
          var zeroes = "";
          for (d = 0; d < digits - String(roundedCents).length; d += 1) {
            zeroes += "0";
          }
          roundedCents = zeroes + roundedCents;
        }
        if (roundedCents === hundredCents(digits)) {
          whole = addOne(whole);
          return wholePlusDigits(whole);
        }
      } else {
        roundedCents = cents;
        for (i = centsLength; i < digits; i += 1) {
          roundedCents += '0';
        }
      }
      return wholePlusDigits(whole, roundedCents);
    }
  }]);
  return Mathematics;
}();
try {
  module.exports = Mathematics;
} catch (e) {}