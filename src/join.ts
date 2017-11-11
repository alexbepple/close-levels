import * as R from 'ramda'

export const joinRight = R.curry((mapper1, mapper2, t1, t2) => {
  let indexed = R.indexBy(mapper1, t1);
  return t2.map((t2row) => R.merge(t2row, indexed[mapper2(t2row)]));
});

export const joinLeft = R.curry((f1, f2, t1, t2) => joinRight(f2, f1, t2, t1));
