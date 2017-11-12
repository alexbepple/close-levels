import * as React from 'react'
import * as r from 'ramda'

import { levels } from './levels'

const getAssetName = r.take(6)
export const getRate = r.pipe(
  r.match(/at.*/), r.head,
  r.match(/\d+,\d+/), r.head,
  r.replace(',', '.'),
  parseFloat
)

const parseLevels = r.pipe(
  r.split('\n'),
  r.reject(r.isEmpty),
  r.map(r.applySpec({
    asset: getAssetName,
    rate: getRate
  }))
)

export const LevelsPasteBox = () =>
  <textarea onChange={e => levels(parseLevels(e.target.value))} />
