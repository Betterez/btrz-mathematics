"use strict";

describe("Mathematics", function () {

  let mathematics = require("../src/mathematics");
  let expect = require("chai").expect;

  it("should convert to money", function () {
    expect(mathematics.toMoney(32.30)).to.eql(3230000);
  });

  it("should convert to percentage", function () {
    expect(mathematics.toPercentage(6.3)).to.eql(6300);
  });

  it("should calculate a percentage", function () {
    let value = mathematics.toMoney(100);
    let perc = mathematics.toPercentage(10);
    expect(mathematics.percentage(value, perc)).to.eql(1000000);
  });

  it("should calculate percentage with cents", function () {
    expect(mathematics.percentage(50000, 13000)).to.eql(7000);
  });

  it("should calculate percentage of complex values", function () {
    expect(mathematics.percentage(3930000, 15000)).to.eql(590000);
  });

  it("should calculate complex value percentages", function () {
    expect(mathematics.percentage(8253000, -50000)).to.eql(-4127000);
  });

  it("should calculate complex value percentages with a rounding policy", function () {
    expect(mathematics.percentage(8253000, 50000, {decimals: 2, policy: "default"})).to.eql(4127000);
  });

  it("should calculate a ten perc on 4900000 with no dec and default policy", function () {
    expect(mathematics.percentage(4900000, 10000, {decimals: 2, policy: "default"})).to.eql(490000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals", function () {
    expect(mathematics.percentage(8253000, 50000, {decimals: 0, policy: "default"})).to.eql(4100000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals up", function () {
    expect(mathematics.percentage(8253000, 50000, {decimals: 0, policy: "up"})).to.eql(4100000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of two decimals down", function () {
    expect(mathematics.percentage(8989000, 50000, {decimals: 2, policy: "down"})).to.eql(4494000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals up", function () {
    expect(mathematics.percentage(8989000, 50000, {decimals: 0, policy: "up"})).to.eql(4500000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals default", function () {
    expect(mathematics.percentage(3000000, 13000, {decimals: 0, policy: "default"})).to.be.eql(400000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals up", function () {
    expect(mathematics.percentage(3000000, 13000, {decimals: 0, policy: "up"})).to.be.eql(400000);
  });

  it("should calculate a percentage of a complex value and given a rounding policy of zero decimals down", function () {
    expect(mathematics.percentage(3000000, 13000, {decimals: 0, policy: "down"})).to.be.eql(300000);
  });

  it("should round with no decimals", function () {
    expect(mathematics.roundMoney(100000)).to.be.eql("1.00");
  });

  it("should round with decimals", function () {
    expect(mathematics.roundMoney(100000, 3)).to.be.eql("1.000");
  });
  it("should round with decimals a round value", function () {
    expect(mathematics.roundMoney(1050000)).to.be.eql("10.50");
  });

  it("should round with decimals a less than zero value", function () {
    expect(mathematics.roundMoney(50000)).to.be.eql("0.50");
  });

  it("should round with decimals a non round value", function () {
    expect(mathematics.roundMoney(1049567)).to.be.eql("10.50");
  });

  it("should round with decimals a less than zero non round value", function () {
    expect(mathematics.roundMoney(49567)).to.be.eql("0.50");
  });

  it("should round with precision 2 and default", function () {
    expect(mathematics.round(49567, 2, 100000, "default")).to.be.eql("0.50");
  });

  it("should round 90 cents with precision 2 and default", function () {
    expect(mathematics.round(99567, 2, 100000, "default")).to.be.eql("1.00");
  });

  it("should round 90 cents with precision 2 and up", function () {
    expect(mathematics.round(99567, 2, 100000, "up")).to.be.eql("1.00");
  });

  it("should round 90 cents with precision 2 and down", function () {
    expect(mathematics.round(99567, 2, 100000, "down")).to.be.eql("0.99");
  });

  it("should round 90 cents with precision 0 and down", function () {
    expect(mathematics.round(99567, 0, 100000, "down")).to.be.eql("0.00");
  });
});