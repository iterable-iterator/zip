import {iter} from '@iterable-iterator/iter';
import {list} from '@iterable-iterator/list';
import {_next} from '@iterable-iterator/next';
import {map} from '@iterable-iterator/map';

/**
 * Zips iterables together. Yields a tuple containing the first element of each
 * iterable, then a tupe containing the second element of each iterable, etc.
 * Stops when one of the iterables runs out of elements.
 *
 * @example
 * // returns [ [ 'a' , 1 ] , [ 'b' , 2 ] , [ 'c' , 3 ] ]
 * list( _zip( [ 'abcd' , range(3) ] ) ) ;
 *
 * @param {Iterable[]} iterables - The iterables to zip.
 * @returns {IterableIterator}
 *
 */
export default function* _zip(iterables) {
	const iterators = list(map(iter, iterables));

	if (iterators.length === 0) {
		return;
	}

	while (true) {
		const buffer = [];

		for (const result of map(_next, iterators)) {
			if (result.done) {
				return;
			}

			buffer.push(result.value);
		}

		yield buffer;
	}
}
