import test from 'ava';

import {len} from '@functional-abstraction/operator';
import {list} from '@iterable-iterator/list';
import {map} from '@iterable-iterator/map';
import {min} from '@iterable-iterator/reduce';
import {take} from '@iterable-iterator/slice';
import {increasing} from '@total-order/primitive';

import {repr} from './_fixtures.js';

import {zip} from '#module';

const macro = (t, iterables, out) => {
	t.deepEqual(list(zip(...iterables)), out);

	const strip = function* (iterables) {
		// Makes all the inputs have the same length
		// (min length among all iterables)

		if (len(iterables) === 0) {
			return;
		}

		const n = min(increasing, map(len, iterables));

		for (const iterable of iterables) {
			yield take(iterable, n);
		}
	};

	const unzipped = list(map(list, strip(iterables)));

	t.deepEqual(list(zip(...out)), unzipped);
};

macro.title = (title, iterables, out) =>
	title ?? `zip(...${repr(iterables)}) is ${repr(out)}`;

test(macro, [], []);
test(macro, [[1]], [[1]]);
test(macro, [[1, 2, 3]], [[1], [2], [3]]);
test(
	macro,
	[
		[1, 2, 3],
		[4, 5, 6],
	],
	[
		[1, 4],
		[2, 5],
		[3, 6],
	],
);
test(
	macro,
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
	],
	[
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	],
);
test(
	macro,
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9, 10],
	],
	[
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	],
);
test(
	macro,
	[
		[1, 2, 3, 4],
		[4, 5, 6],
		[7, 8, 9],
	],
	[
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
	],
);
