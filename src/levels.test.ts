import {assertThat, is} from 'hamjest'
import {getDistanceInPercent} from './levels'

describe('Levels presenter', () => {
  it('shows relative distance in percent', () => {
    assertThat(getDistanceInPercent({price: 100, rate: 99}), is(1))
  })
})
