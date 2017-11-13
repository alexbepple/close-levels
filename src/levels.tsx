import * as React from 'react'
import s, {DataSignal} from 's-js'
import * as r from 'ramda'
import * as q from './q'
import ReactTable from 'react-table'

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

export const getDistanceInPercent = r.pipe((x: ContextualizedLevel) =>
  q.relativeDistanceFrom(r.defaultTo(x.rate, x.price), x.rate),
  q.toPercent,
  q.round(1),
  q.valueOf
)

const contextualize = joinRight((x: Quote) => x.symbol, (x: Level) => x.asset)

const sortByDistanceFromPrice = r.pipe(
  contextualize,
  r.map(r.converge(r.assoc('distanceInPercent'), [getDistanceInPercent, r.identity])),
  r.sortBy(r.prop('distanceInPercent'))
)

const columns = [
  { Header: 'Asset', accessor: 'asset' },
  { Header: 'Level', accessor: 'rate' },
  { Header: 'Current', accessor: 'price' },
  { Header: 'Distance', accessor: 'distanceInPercent', Cell: props => props.value + '%'}
]

const danger = { color: 'red' }
const getStyle = r.ifElse(x => q.gt(1, x.distanceInPercent), r.always(danger), r.always(null))

export const CurrentLevels = () => <ReactTable
  data={sortByDistanceFromPrice(quotes(), levels())}
  columns={columns}
  showPagination={false}
  pageSize={r.length(levels())}
  getTrProps={(state, rowinfo) => ({ style: getStyle(rowinfo.original) })}
/>
