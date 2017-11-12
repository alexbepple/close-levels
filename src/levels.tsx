import * as React from 'react'
import s from 's-js'
import * as r from 'ramda'

import {joinRight} from './join'

import {quotes} from './quotes'

interface Level {
  asset: string
  rate: number
}

export const levels = s.data([])

interface ContextualizedLevel extends Level {
  distanceInPercent: number
}

const renderLevel = (q: ContextualizedLevel) => <li key={q.asset+q.rate}>{`${q.asset}: ${q.rate} (${q.distanceInPercent})`}</li>

const getDistanceInPercent = x => Math.abs(x.rate / x.price - 1)

const sortByDistanceFromPrice = r.pipe(
  joinRight(r.prop('symbol'), r.prop('asset')),
  r.map(r.converge(r.assoc('distanceInPercent'), [getDistanceInPercent, r.identity])),
  r.sortBy(r.prop('distanceInPercent'))
)

export const CurrentLevels = () => <ul>{r.map(renderLevel, sortByDistanceFromPrice(quotes(), levels()))}</ul>
