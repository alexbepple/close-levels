import * as React from 'react'
import {render} from 'react-dom'
import s from 's-js'
import * as localForage from 'localforage'
import * as r from 'ramda'

import {CurrentQuotes, quotes} from './quotes'
import {updateQuotes} from './quotes-workflows'
import {CurrentLevels, levels} from './levels'
import {LevelsPasteBox} from './levels-import'

updateQuotes()

const App = () => <div>
  <div>
    <h2>Rates</h2>
    <CurrentQuotes />
  </div>
  <div>
    <h2>Levels</h2>
    <CurrentLevels />
  </div>
  <div>
    <LevelsPasteBox />
  </div>
</div>

s.root(() => {
  s.on(
    // @ts-ignore
    [levels, quotes],
    () => render(<App />, document.getElementById('root'))
  )

  const levelsStorageKey = 'levels'
  localForage.getItem(levelsStorageKey).then(
    r.when(r.complement(r.isNil), levels)
  )
  s(
    () => localForage.setItem(levelsStorageKey, levels())
  )
})
