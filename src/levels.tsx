import * as React from 'react'
import s from 's-js'
import * as r from 'ramda'

interface Level {
  symbol: string
  price: number
}

const initialLevels: Level[] = [
  { symbol: 'EURUSD', price: 1.18 },
  { symbol: 'EURUSD', price: 1.19 }
]
const levels = s.data(initialLevels)

const renderLevel = (q: Level) => <li key={q.symbol+q.price}>{q.symbol + ': ' + q.price}</li>

export const CurrentLevels = () => <ul>{r.map(renderLevel, levels())}</ul>
