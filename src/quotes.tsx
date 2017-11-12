import * as React from 'react'
import s, {DataSignal} from 's-js'
import * as r from 'ramda'

import {Quote} from './Quote'

export const quotes = s.data([])

const renderQuote = (q: Quote) => <li key={q.symbol}>{q.symbol + ': ' + q.price}</li>

export const CurrentQuotes = () => <ul>{r.map(renderQuote, quotes())}</ul>
