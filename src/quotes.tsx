import * as React from 'react'
import s from 's-js'
import * as r from 'ramda'

export const quotes = s.data([])

interface Quote {
  readonly symbol: string
  readonly price: number
  readonly bid: number
  readonly ask: number
  readonly timestamp: number
}

const renderQuote = (q: Quote) => <li key={q.symbol}>{q.symbol + ': ' + q.price}</li>

export const CurrentQuotes = () => <ul>{r.map(renderQuote, quotes())}</ul>

fetch('https://wt-05c9272e8038f4b0552a40c8559e0b07-0.run.webtask.io/fx-rates')
  .then(x => x.json())
  .then(quotes)
