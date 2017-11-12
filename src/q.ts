import * as r from 'ramda'
import * as _frac from 'fraction.js'
const frac = _frac as FractionMethod

export type FractionInput = string | number | Fraction
export interface FractionMethod { (x: FractionInput): Fraction }
export interface FractionF { (a: FractionInput, b: FractionInput): Fraction}

export type Sign = -1 | 1
export interface Fraction {
  s: Sign
  n: number
  d: number

  add: FractionMethod
  sub: FractionMethod
  div: FractionMethod
  mul: FractionMethod
  compare(x: FractionInput): number

  ceil(places: number): Fraction
  floor(places: number): Fraction
  round(places: number): Fraction

  valueOf(): number
  abs(): Fraction
}

// functional equivalents
export const add: FractionF = r.curry((a, b) => frac(a).add(b))
export const sum = r.reduce(add, 0)
export const sub: FractionF = r.curry((a, b) => frac(a).sub(b))
export const div: FractionF = r.curry((a, b) => frac(a).div(b))
export const mul: FractionF = r.curry((a, b) => frac(a).mul(b))
export const compare = r.curry((a: FractionInput, b: FractionInput) => frac(a).compare(b))
export const valueOf = x => frac(x).valueOf()

export const floor = r.curry((places: number, x: FractionInput) => frac(x).floor(places))
export const round = r.curry((places: number, x: FractionInput) => frac(x).round(places))

export const abs: FractionMethod = x => frac(x).abs()

// additions
export const avg = r.converge(div, [sum, r.length])
export const wAvg = (weights: FractionInput[], values: FractionInput[]) => div(
  r.binary(r.pipe(r.binary(r.zip), r.map(r.apply(mul)), sum))(weights, values),
  sum(weights)
)
export const toPercent = mul(r.__, 100)

export const gt = r.curry((a: FractionInput, b: FractionInput) => compare(a, b) > 0)
