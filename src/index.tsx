import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'
import {CurrentQuotes} from './quotes'
import {CurrentLevels} from './levels'

const App = () => <div>
  <div>
    <h2>Rates</h2>
    <CurrentQuotes />
  </div>
  <div>
    <h2>Levels</h2>
    <CurrentLevels />
  </div>
</div>

s.root(() => s(
  () => render(<App />, document.getElementById('root'))
))
