"use strict";

const DOLLAR_MULTIPLIER = 100000;
const PERCENTAGE_MULTIPLIER = 1000;

function getCorrectedPercentile(percentile) {
  if (Math.abs(percentile) > 100) {
    return (percentile / PERCENTAGE_MULTIPLIER);
  }
  return percentile;
}

function addZeroes(value, size) {
  let parts = String(value).split('.');
  let whole = parts[0] || '';
  let cents = parts[1] || '';
  size = size - cents.length;
  let pad = '';
  let i = 0;
  if (whole === '0') {
      whole = '';
  }
  for (i = 0; i < size; (i += 1)) {
      pad += '0';
  }
  return Number(whole + cents + pad);
}

function isNegativeZero(x) {
  return ( 1 / x ) === -Infinity;
}

function addOne(whole) {
  const numWhole = Number(whole);
  if (numWhole !== 0) {
    return numWhole > 0 ? numWhole + 1 : numWhole - 1;
  }
  return isNegativeZero(whole) ? numWhole - 1 : numWhole + 1;
}

function wholePlusDigits(whole, digits = '00') {
  if (Number(whole) !== 0) {
    return `${whole}.${digits}`
  }
  return isNegativeZero(whole) && digits != 0 ? `-0.${digits}` : `0.${digits}`;
}

function hundredCents(digits) {
  let zeroes = "";
  while (zeroes.length < digits) {
    zeroes += "0";
  }
  return Number(`1${zeroes}`);
}
class Mathematics {

  static toPercentage(value) {
    return addZeroes(this.round(value, 3), 3);
  }

  static toMoney(value) {
    return addZeroes(this.round(value, 5), 5);
  }

  static percentage(base, percentile, rounding) {
    if (!rounding) { rounding = {decimals: 2, policy: 'default'}; }
    let fixedPercentile = getCorrectedPercentile(percentile);
    let calculated = (base * (fixedPercentile / (100 * DOLLAR_MULTIPLIER)));
    let rounded = this.round(calculated, rounding.decimals, null, rounding.policy);
    return Number(this.toMoney(rounded));
  }

  static roundMoney(value, digits, roundingPolicy) {
    if (digits === undefined || digits === null || digits === '') { digits = 2; }
    return this.round(value, digits, DOLLAR_MULTIPLIER, roundingPolicy);
  }

  static round(value, digits, divisor, roundingPolicy) {
    if (digits === undefined || digits === null) { digits = 2; }
    if (!divisor) { divisor = 1; }
    if (!roundingPolicy) { roundingPolicy = 'default'; }
    let simplified = (value / divisor);
    let parts = String(simplified).split('.');
    let whole = parts[0] || '0';
    let cents = parts[1] || '';
    let centsLength = 0;
    let roundedCents = '';
    let flip;
    let i = 0;
    let d = 0;

    if (cents) {
      centsLength = cents.length;
    }

    if (roundingPolicy === "nocents") {
      return wholePlusDigits(whole);
    }

    if (digits == 0) {
      flip = cents.substr((digits), 1);
      if ((flip < 5) || roundingPolicy === 'down') { return wholePlusDigits(whole); }
      if ((flip > 4) || roundingPolicy === 'up') {
        whole = addOne(whole);
        return wholePlusDigits(whole);
      }
    }

    if (centsLength > digits) {
      flip = cents.substr((digits), 1);
      roundedCents = cents.substr(0, (digits));
      if (flip > 4 && (roundingPolicy !== 'down')) {
        roundedCents = Number(roundedCents) + 1;
      }
      if (String(roundedCents).length < digits) {
        let zeroes = "";
        for (d = 0; d < (digits - String(roundedCents).length); (d += 1)) {
          zeroes += "0";
        }
        roundedCents = zeroes + roundedCents;
      }
      if (roundedCents === hundredCents(digits)){
        whole = addOne(whole);
        return wholePlusDigits(whole);
      }
    } 
    else {
      roundedCents = cents;
      for (i = centsLength; i < digits; (i += 1)) {
        roundedCents += '0';
      }
    }

    return wholePlusDigits(whole, roundedCents);
  }
}

try {
  module.exports = Mathematics;
} catch (e) {
}