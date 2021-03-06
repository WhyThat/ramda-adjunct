import * as R from 'ramda';

import * as RA from '../src';
import MAX_SAFE_INTEGER from '../src/internal/polyfills/Number.MAX_SAFE_INTEGER';
import MIN_SAFE_INTEGER from '../src/internal/polyfills/Number.MIN_SAFE_INTEGER';
import eq from './shared/eq';
import polyfill from '../src/internal/polyfills/Number.isInteger';

describe('isInteger', function() {
  it('should test value for an `integer`', function() {
    eq(RA.isInteger(0), true);
    eq(RA.isInteger(1), true);
    eq(RA.isInteger(-100000), true);
    eq(RA.isInteger(MAX_SAFE_INTEGER), true);
    eq(RA.isInteger(MIN_SAFE_INTEGER), true);
    eq(RA.isInteger(5), true);

    eq(RA.isInteger(0.1), false);
    eq(RA.isInteger(Math.PI), false);
    eq(RA.isInteger(5.56789), false);

    eq(RA.isInteger(NaN), false);
    eq(RA.isInteger(Infinity), false);
    eq(RA.isInteger(-Infinity), false);
    eq(RA.isInteger('10'), false);
    eq(RA.isInteger(true), false);
    eq(RA.isInteger(false), false);
    eq(RA.isInteger([1]), false);
  });

  it('should test polyfill for an `integer', function() {
    eq(polyfill(0), true);
    eq(polyfill(1), true);
    eq(polyfill(-100000), true);
    eq(polyfill(MAX_SAFE_INTEGER), true);
    eq(polyfill(MIN_SAFE_INTEGER), true);

    eq(polyfill(0.1), false);
    eq(polyfill(Math.PI), false);
    eq(polyfill(5.56789), false);

    eq(polyfill(NaN), false);
    eq(polyfill(Infinity), false);
    eq(polyfill(-Infinity), false);
    eq(polyfill('10'), false);
    eq(polyfill(true), false);
    eq(polyfill(false), false);
    eq(polyfill([1]), false);
  });

  context('given a number that looks like a float number', function() {
    specify('should treat the number as integer', function() {
      eq(RA.isInteger(1.0), true);
    });
  });

  it('should support placeholder to specify "gaps"', function() {
    const isInteger = RA.isInteger(R.__);

    eq(isInteger(1), true);
  });
});
