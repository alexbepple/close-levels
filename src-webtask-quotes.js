require('isomorphic-fetch')

module.exports = function(context, cb) {
  fetch(
    'https://forex.1forge.com/1.0.2/quotes?pairs=EURUSD,EURGBP,EURJPY,EURCAD,EURCHF,EURHKD,GBPJPY,GBPUSD&api_key=xyz'
  )
    .then((response) => response.json())
    .then((response) => {
      console.log(response)
      cb(null, response)
    })
}
