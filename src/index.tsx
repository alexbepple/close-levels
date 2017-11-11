import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'

const a = s.data('Hello World!')

const App = () => <p>{a()}</p>

s.root(() => s(
  () => render(<App />, document.getElementById('root'))
))
