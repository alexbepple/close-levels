import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'

const a = s.data([])

const renderQuote = q => <li key={q.symbol}>{q.symbol + ': ' + q.price}</li>

const App = ({quotes}) => <ul>
    {quotes.map(renderQuote)}
</ul>

s.root(() => s(
  () => render(<App quotes={a()} />, document.getElementById('root'))
))

interface Quote {
  symbol: string
  price: number
  bid: number
  ask: number
  timestamp: number
}

const toJson = x => x.json()
const log = console.log.bind(console)

fetch('https://wt-05c9272e8038f4b0552a40c8559e0b07-0.run.webtask.io/fx-rates')
.then(toJson)
.then(a)
