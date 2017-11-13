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
interface ContextualizedLevel extends Level, Quote {}

export const levels = s.data([])

export const getDistanceInPercent = r.pipe((x: ContextualizedLevel) =>
  q.relativeDistanceFrom(r.defaultTo(x.rate, x.price), x.rate),
  q.toPercent,
  q.round(1),
  q.valueOf
)

const contextualize = joinRight((x: Quote) => x.symbol, (x: Level) => x.asset)

const columnIdDistance = 'distance'
const columns = [
  { Header: 'Asset', accessor: 'asset' },
  { Header: 'Level', accessor: 'rate' },
  { Header: 'Current', accessor: 'price' },
  { Header: 'Distance', id: columnIdDistance, accessor: getDistanceInPercent,
    Cell: props => props.value + '%'}
]

const danger = { color: 'red' }
const getStyle = r.ifElse(
  x => q.gt(1, getDistanceInPercent(x)), r.always(danger), r.always(null))

export const CurrentLevels = () => <ReactTable
  data={contextualize(quotes(), levels())}
  columns={columns}
  defaultSorted={[{id: columnIdDistance, asc: true}]}
  showPagination={false}
  pageSize={r.length(levels())}
  getTrProps={(state, rowinfo) => ({ style: getStyle(rowinfo.original) })}
/>
