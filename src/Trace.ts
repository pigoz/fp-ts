import { HKT, HKTS, HKT2S, HKTAs, HKT2As } from './HKT'
import { Applicative } from './Applicative'
import { Lazy } from './function'
import { Monad } from './Monad'

// Adapted from https://github.com/garyb/purescript-debug

/**
 * Log any value to the console for debugging purposes and then
 * return a value. This will log the value's underlying representation for
 * low-level debugging
 * @function
 */
export const trace = <A>(message: any, out: Lazy<A>): A => {
  console.log(message)
  return out()
}

/**
 * Log any value and return it
 * @function
 */
export const spy = <A>(a: A): A => {
  return trace(a, () => a)
}

/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 */
export function traceA<F extends HKT2S>(F: Applicative<F>): <L>(message: any) => HKT2As<F, L, void>
export function traceA<F extends HKTS>(F: Applicative<F>): (message: any) => HKTAs<F, void>
export function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void>
/**
 * Log a message to the console for debugging purposes and then return the unit value of the Applicative `F`
 * @function
 */
export function traceA<F>(F: Applicative<F>): (message: any) => HKT<F, void> {
  return x => trace(x, () => F.of(undefined))
}

/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 */
export function traceM<F extends HKT2S>(F: Monad<F>): <L, A>(a: A) => HKT2As<F, L, A>
export function traceM<F extends HKTS>(F: Monad<F>): <A>(a: A) => HKTAs<F, A>
/**
 * Log any value to the console and return it in `Monad` useful when one has monadic chains
 * @function
 */
export function traceM<F>(F: Monad<F>): <A>(a: A) => HKT<F, A> {
  return a => trace(a, () => F.of(a))
}
