import {assertThat, is} from 'hamjest'
import {getRate} from './levels-import'

describe('Levels parser', () => {
  it('extracts level from line', () => {
    assertThat(getRate('foo at 1,2'), is(1.2))
  })
  it("considers next number following 'at' level rate", () => {
    assertThat(getRate('foo 1,0 bar at 1,1 baz 1,2'), is(1.1))
  })
})
