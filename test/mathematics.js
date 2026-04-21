const { describe, test } = require("node:test");
const assert = require("node:assert").strict;

const mathematics = require("../src/mathematics");

describe("Mathematics", () => {
  describe("toMoney", () => {
    test("should convert to money", () => {
      assert.strictEqual(mathematics.toMoney(32.3), 3230000);
    });

    test("should round properly", () => {
      const tricky = 296.99999999999994;
      assert.strictEqual(mathematics.toMoney(tricky), 29700000);
    });
  });

  test("should convert to percentage", () => {
    assert.strictEqual(mathematics.toPercentage(6.3), 6300);
  });

  test("should calculate a percentage", () => {
    const value = mathematics.toMoney(100);
    const perc = mathematics.toPercentage(10);
    assert.strictEqual(mathematics.percentage(value, perc), 1000000);
  });

  test("should calculate percentage with cents", () => {
    assert.strictEqual(mathematics.percentage(50000, 13000), 7000);
  });

  test("should calculate percentage of complex values", () => {
    assert.strictEqual(mathematics.percentage(3930000, 15000), 590000);
  });

  test("should calculate complex value percentages", () => {
    assert.strictEqual(mathematics.percentage(8253000, -50000), -4127000);
  });

  test("should calculate complex value percentages with a rounding policy", () => {
    assert.strictEqual(
      mathematics.percentage(8253000, 50000, { decimals: 2, policy: "default" }),
      4127000
    );
  });

  test("should calculate a ten perc on 4900000 with no dec and default policy", () => {
    assert.strictEqual(
      mathematics.percentage(4900000, 10000, { decimals: 2, policy: "default" }),
      490000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals", () => {
    assert.strictEqual(
      mathematics.percentage(8253000, 50000, { decimals: 0, policy: "default" }),
      4100000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals up", () => {
    assert.strictEqual(
      mathematics.percentage(8253000, 50000, { decimals: 0, policy: "up" }),
      4100000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of two decimals down", () => {
    assert.strictEqual(
      mathematics.percentage(8989000, 50000, { decimals: 2, policy: "down" }),
      4494000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals up", () => {
    assert.strictEqual(
      mathematics.percentage(8989000, 50000, { decimals: 0, policy: "up" }),
      4500000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals default", () => {
    assert.strictEqual(
      mathematics.percentage(3000000, 13000, { decimals: 0, policy: "default" }),
      400000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals up (3000000)", () => {
    assert.strictEqual(
      mathematics.percentage(3000000, 13000, { decimals: 0, policy: "up" }),
      400000
    );
  });

  test("should calculate a percentage of a complex value and given a rounding policy of zero decimals down", () => {
    assert.strictEqual(
      mathematics.percentage(3000000, 13000, { decimals: 0, policy: "down" }),
      300000
    );
  });

  test("should round with no decimals", () => {
    assert.strictEqual(mathematics.roundMoney(100000), "1.00");
  });

  test("should round with decimals", () => {
    assert.strictEqual(mathematics.roundMoney(100000, 3), "1.000");
  });
  test("should round with decimals a round value", () => {
    assert.strictEqual(mathematics.roundMoney(1050000), "10.50");
  });

  test("should round with decimals a less than zero value", () => {
    assert.strictEqual(mathematics.roundMoney(50000), "0.50");
  });

  test("should round with decimals a non round value", () => {
    assert.strictEqual(mathematics.roundMoney(1049567), "10.50");
  });

  test("should round without decimals and down", () => {
    assert.strictEqual(mathematics.roundMoney(1069567, 0, "nocents"), "10.00");
  });

  test("should round without decimals and down (1019567)", () => {
    assert.strictEqual(mathematics.roundMoney(1019567, 0, "nocents"), "10.00");
  });

  test("should round with decimals a less than zero non round value", () => {
    assert.strictEqual(mathematics.roundMoney(49567), "0.50");
  });

  test("should round with precision 2 and default", () => {
    assert.strictEqual(mathematics.round(49567, 2, 100000, "default"), "0.50");
  });

  test("should round 90 cents with precision 2 and default", () => {
    assert.strictEqual(mathematics.round(99567, 2, 100000, "default"), "1.00");
  });

  test("should round 90 cents with precision 2 and up", () => {
    assert.strictEqual(mathematics.round(99567, 2, 100000, "up"), "1.00");
  });

  test("should round 90 cents with precision 2 and down", () => {
    assert.strictEqual(mathematics.round(99567, 2, 100000, "down"), "0.99");
  });

  test("should round 90 cents with precision 0 and down", () => {
    assert.strictEqual(mathematics.round(99567, 0, 100000, "down"), "0.00");
  });

  describe("boder cases for positive and negative zeros", () => {
    test("should round negative zero to 0.00 with precision 0", () => {
      assert.strictEqual(mathematics.round(0.33, 0), "0.00");
    });

    test("should round negative zero to 0.00 with precision 0 (negative)", () => {
      assert.strictEqual(mathematics.round(-0.33, 0), "0.00");
    });

    test("should round to -1.00 with precision 2", () => {
      assert.strictEqual(mathematics.round(-0.9974999999999999, 2), "-1.00");
    });

    test("should round to -2.00 with precision 2", () => {
      assert.strictEqual(mathematics.round(-1.9974999999999999, 2), "-2.00");
    });

    test("should round to -1.10 with precision 2", () => {
      assert.strictEqual(mathematics.round(-1.09725, 2), "-1.10");
    });

    test("should round to -1.01 with precision 2", () => {
      assert.strictEqual(mathematics.round(-1.009725, 2), "-1.01");
    });

    test("should round to 0.00 with precision 2", () => {
      assert.strictEqual(mathematics.round(0.00333, 2), "0.00");
    });

    test("should round negative zero to 0.00 with precision 2", () => {
      assert.strictEqual(mathematics.round(-0.00333, 2), "0.00");
    });

    test("should round to same negative number with 5 digits", () => {
      assert.strictEqual(mathematics.round(-0.02, 5), "-0.02000");
    });
  });
});
