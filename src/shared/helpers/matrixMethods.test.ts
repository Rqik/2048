import { RowCells } from '@/components/Board/types';
import { dummyMatrix3 } from './dummy';
import {
  findNearestNonEmptyAndClearStatus,
  getIndexOfDistantEmpty,
  getIndexOfNearestNonEmpty,
  resetStatus,
} from './matrixMethods';

const testRow = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: null,
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: null,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: null,

    status: null,
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: null,
    status: null,
  },
];

const testRow2: RowCells = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: 'stop',
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: null,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: null,
    status: 'moving',
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: null,
    status: 'moving',
  },
];

const testRow3: RowCells = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: 'stop',
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: null,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: 2,
    status: 'moving',
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: null,
    status: 'moving',
  },
  {
    x: 4,
    y: 0,
    id: 4,
    value: 2,
    status: 'moving',
  },
  {
    x: 5,
    y: 0,
    id: 5,
    value: null,
    status: 'moving',
  },
  {
    x: 6,
    y: 0,
    id: 6,
    value: null,
    status: 'moving',
  },
];
const testRow4: RowCells = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: 'stop',
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: null,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: 2,
    status: 'moving',
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: 2,
    status: 'moving',
  },
];

const testRow5: RowCells = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: 'stop',
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: 2,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: 2,
    status: 'moving',
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: 2,
    status: 'moving',
  },
  {
    x: 4,
    y: 0,
    id: 4,
    value: 2,
    status: 'moving',
  },
  {
    x: 5,
    y: 0,
    id: 5,
    value: null,
    status: 'moving',
  },
  {
    x: 6,
    y: 0,
    id: 6,
    value: null,
    status: null,
  },
  {
    x: 6,
    y: 0,
    id: 7,
    value: null,
    status: null,
  },
];

const testRow6: RowCells = [
  {
    x: 0,
    y: 0,
    id: 0,
    value: 2,
    status: 'stop',
  },
  {
    x: 1,
    y: 0,
    id: 1,
    value: null,
    status: null,
  },
  {
    x: 2,
    y: 0,
    id: 2,
    value: 2,
    status: 'moving',
  },
  {
    x: 3,
    y: 0,
    id: 3,
    value: 2,
    status: null,
  },
  {
    x: 4,
    y: 0,
    id: 4,
    value: 2,
    status: null,
  },
  {
    x: 5,
    y: 0,
    id: 5,
    value: null,
    status: null,
  },
  {
    x: 6,
    y: 0,
    id: 6,
    value: null,
    status: null,
  },
];

function sum(a: number, b: number): number {
  return a + b;
}

describe('matrix methods reset status', () => {
  test('testing array not empty', () => {
    expect(testRow2.length).not.toBe(0);
    expect(testRow2.length).toBeGreaterThan(0);
  });

  test('run reset', () => {
    const res = resetStatus(testRow2);
    expect(res).toEqual(testRow);
    expect(res[0].status).toEqual(null);
  });
});

describe('index of nearest non empty', () => {
  test('run getter', () => {
    expect(getIndexOfNearestNonEmpty(testRow2, 3)).toEqual(0);
    expect(getIndexOfNearestNonEmpty(testRow3, 3)).toEqual(2);
    expect(getIndexOfNearestNonEmpty(testRow3, 5)).toEqual(4);
  });
});

describe('index of nearest empty and status clear', () => {
  test('run getIndexOfNearestEmpty', () => {
    expect(getIndexOfDistantEmpty(testRow4, 3)).toEqual(1);
    expect(getIndexOfDistantEmpty(testRow5, 7)).toEqual(6);
    // expect(getIndexOfNearestEmpty(testRow3)).toEqual(4);
  });
});

describe('cell of nearest empty and status clear', () => {
  test('run findNearestNonEmptyAndClearStatus', () => {
    expect(findNearestNonEmptyAndClearStatus(testRow4, 0)).toEqual(null);
    expect(findNearestNonEmptyAndClearStatus(testRow6, 1)).toEqual(testRow6[3]);
    expect(findNearestNonEmptyAndClearStatus(testRow6, 3)).toEqual(testRow6[4]);
    // expect(getIndexOfNearestEmpty(testRow3)).toEqual(4);
  });
});
