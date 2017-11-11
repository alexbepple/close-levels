import * as React from 'react'
import s from 's-js'
import * as r from 'ramda'

import {joinRight} from './join'

import {quotes} from './quotes'

interface Level {
  asset: string
  rate: number
}

const initialLevels: Level[] = [
  { asset: 'EURUSD', rate: 1.19 },
  { asset: 'EURUSD', rate: 1.18 }
]
const levels = s.data(initialLevels)

interface ContextualizedLevel extends Level {
  distanceInPercent: number
}

const renderLevel = (q: ContextualizedLevel) => <li key={q.asset+q.rate}>{`${q.asset}: ${q.rate} (${q.distanceInPercent})`}</li>

const getDistanceInPercent = x => Math.abs(x.price / x.rate - 1)

const sortByDistanceFromPrice = r.pipe(
  joinRight(r.prop('symbol'), r.prop('asset')),
  r.map(r.converge(r.assoc('distanceInPercent'), [getDistanceInPercent, r.identity])),
  r.sortBy(r.prop('distanceInPercent'))
)

export const CurrentLevels = () => <ul>{r.map(renderLevel, sortByDistanceFromPrice(quotes(), levels()))}</ul>
