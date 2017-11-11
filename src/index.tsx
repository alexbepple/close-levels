import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'
import {CurrentQuotes} from './quotes'

const App = () => <div>
  <h2>Rates</h2>
  <CurrentQuotes />
</div>

s.root(() => s(
  () => render(<App />, document.getElementById('root'))
))
