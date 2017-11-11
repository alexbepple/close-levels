import * as r from 'ramda'
import { levels } from './levels'

const pastedLevels = `EURUSD-1	BUY	EURUSD			at	1,1992	STOP	GTC		S -> L	AKTIV	AGG
EURUSD-2	BUY	EURUSD			at	1,1938	STOP	GTC		S -> L	AKTIV	AGG
EURUSD-3	SELL	EURUSD			at	1,0434	STOP	GTC		L -> N	AKTIV	AGG

EURJPY-1	SELL	EURJPY			at	120,2218	STOP	OCO		L -> N	AKTIV	AGG
EURJPY-2	SELL	EURJPY			at	47,0765	STOP	OCO		L -> S	AKTIV	AGG

EURCAD-1	SELL	EURCAD			at	1,4736	STOP	OCO		L -> S	AKTIV	AGG
EURCAD-2	SELL	EURCAD			at	1,4111	STOP	OCO		L -> N	AKTIV	AGG

EURCHF-1	BUY	EURCHF			at	1,1871	STOP	OCO		S -> N	AKTIV	AGG
EURCHF-2	BUY	EURCHF			at	1,136	LIMIT	OCO		S -> L	AKTIV	AGG

EURCHF-3	SELL	EURCHF			at	1,06	STOP	GTC		L -> N	AKTIV	AGG`

const getAssetName = r.take(6)
const getRate = r.pipe(
  r.match(/\d+,\d+/),
  r.head,
  r.replace(',', '.'),
  parseFloat
)

const parseLevels = r.pipe(
  r.split('\n'),
  r.reject(r.isEmpty),
  r.map(r.applySpec({
    asset: getAssetName,
    rate: getRate
  }))
)

levels(parseLevels(pastedLevels))
