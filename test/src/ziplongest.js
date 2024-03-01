import test from 'ava';

import {len} from '@functional-abstraction/operator';
import {list} from '@iterable-iterator/list';
import {map} from '@iterable-iterator/map';
import {max} from '@iterable-iterator/reduce';
import {chain} from '@iterable-iterator/chain';
import {nrepeat} from '@iterable-iterator/repeat';
import {increasing} from '@total-order/primitive';

import {repr} from './_fixtures.js';
import {ziplongest} from '#module';

const macro = (t, fillvalue, iterables, out) => {
	t.deepEqual(list(ziplongest(fillvalue, ...iterables)), out);

	const extend = function* (fillvalue, iterables) {
		// Makes all the inputs have the same length
		// (max length among all iterables)

		if (len(iterables) === 0) {
			return;
		}

		const n = max(increasing, map(len, iterables));

		for (const iterable of iterables) {
			yield chain(iterable, nrepeat(fillvalue, n - iterable.length));
		}
	};

	const unzipped = list(map(list, extend(fillvalue, iterables)));

	t.deepEqual(list(ziplongest(fillvalue, ...out)), unzipped);
};

macro.title = (title, fillvalue, iterables, out) =>
	title ?? `ziplongest(${fillvalue}, ...${repr(iterables)}) is ${repr(out)}`;

const w = Math.random();

test(macro, w, [], []);
test(macro, w, [[1]], [[1]]);
test(macro, w, [[1, 2, 3]], [[1], [2], [3]]);
test(
	macro,
	w,
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
	w,
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
	w,
	[
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9, 10],
	],
	[
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[w, w, 10],
	],
);
test(
	macro,
	w,
	[
		[1, 2, 3, 4],
		[4, 5, 6],
		[7, 8, 9],
	],
	[
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[4, w, w],
	],
);
