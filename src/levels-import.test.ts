import {assertThat, is} from 'hamjest'
import {getRate} from './levels-import'

describe('Levels parser', () => {
  it('extracts level from line', () => {
    assertThat(getRate('foo at 1,2'), is(1.2))
  })
})
