import {iter} from '@iterable-iterator/iter';

/**
 * Zips exactly two iterables together. Yields a tuple containing the first
 * element of each iterable, then a tuple containing the second element of each
 * iterable, etc. Stops when one of the two iterables runs out of elements.
 *
 * @example
 * // returns [ [ 'a' , 1 ] , [ 'b' , 2 ] , [ 'c' , 3 ] ]
 * list( _zip2( 'abcd' , range(1, 4) ) ) ;
 *
 * @param {Iterable} A - The first iterable.
 * @param {Iterable} B - The second iterable.
 * @returns {IterableIterator}
 *
 */
export default function* _zip2(A, B) {
	const iA = iter(A);
	const iB = iter(B);

	while (true) {
		const a = iA.next();
		if (a.done) {
			return;
		}

		const b = iB.next();
		if (b.done) {
			return;
		}

		yield [a.value, b.value];
	}
}
