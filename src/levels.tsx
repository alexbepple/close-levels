import * as React from 'react'
import s from 's-js'
import * as r from 'ramda'
import * as q from './q'

import {joinRight} from './join'

import {quotes} from './quotes'
import {Quote} from './Quote'

interface Level {
  readonly asset: string
  readonly rate: number
}

export const levels = s.data([])

interface ContextualizedLevel extends Level, Quote {
  distanceInPercent: number
}

const renderLevel = (q: ContextualizedLevel) => <li key={q.asset+q.rate}>{`${q.asset}: ${q.rate} (${q.distanceInPercent})`}</li>

const getDistanceInPercent = r.pipe(
  x => q.div(x.rate, x.price),
  q.sub(r.__, 1),
  q.abs,
  q.valueOf
)

const contextualize = joinRight((x: Quote) => x.symbol, (x: Level) => x.asset)

const sortByDistanceFromPrice = r.pipe(
  contextualize,
  r.map(r.converge(r.assoc('distanceInPercent'), [getDistanceInPercent, r.identity])),
  r.sortBy(r.prop('distanceInPercent'))
)

export const CurrentLevels = () => <ul>{r.map(renderLevel, sortByDistanceFromPrice(quotes(), levels()))}</ul>
