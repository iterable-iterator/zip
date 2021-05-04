import test from 'ava';

import {list} from '@iterable-iterator/list';
import {range} from '@iterable-iterator/range';

import {_zip2} from '../../src/index.js';

import {repr} from './_fixtures.js';

const macro = (t, first, second, out) => {
	t.deepEqual(list(_zip2(first, second)), out);
};

macro.title = (title, first, second, out) =>
	title ?? `_zip2(${repr(first)}, ${repr(second)}) is ${repr(out)}`;

test(
	macro,
	[1, 2, 3],
	[4, 5, 6],
	[
		[1, 4],
		[2, 5],
		[3, 6],
	],
);
test(
	macro,
	[4, 5, 6],
	[7, 8, 9, 10],
	[
		[4, 7],
		[5, 8],
		[6, 9],
	],
);
test(
	macro,
	[1, 2, 3, 4],
	[4, 5, 6],
	[
		[1, 4],
		[2, 5],
		[3, 6],
	],
);

test(macro, 'abcd', range(1, 4), [
	['a', 1],
	['b', 2],
	['c', 3],
]);
