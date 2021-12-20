import test from 'ava';

import {list} from '@iterable-iterator/list';
import {enumerate} from '../../src/index.js';
import {repr} from './_fixtures.js';

const macro = (t, iterable, expected) => {
	t.deepEqual(list(enumerate(iterable)), expected);
};

macro.title = (title, iterable, expected) =>
	title ?? `enumerate(${repr(iterable)}) is ${repr(expected)}`;

test(macro, [], []);
test(macro, [1], [[0, 1]]);
test(
	macro,
	[1, 4, 9],
	[
		[0, 1],
		[1, 4],
		[2, 9],
	],
);
test(
	macro,
	[1, 4, 9, 16, 25, 36],
	[
		[0, 1],
		[1, 4],
		[2, 9],
		[3, 16],
		[4, 25],
		[5, 36],
	],
);
test(
	macro,
	[1, 4, 9, 16, 25, 36, 49, 64, 81],
	[
		[0, 1],
		[1, 4],
		[2, 9],
		[3, 16],
		[4, 25],
		[5, 36],
		[6, 49],
		[7, 64],
		[8, 81],
	],
);
