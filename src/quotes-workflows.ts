import {quotes} from './quotes'

export const updateQuotes = () =>
  fetch('https://wt-05c9272e8038f4b0552a40c8559e0b07-0.run.webtask.io/fx-rates')
    .then(x => x.json())
    .then(quotes)
