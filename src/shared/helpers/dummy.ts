import { Matrix } from '@/components/Board/types';

const dummyMatrix: Matrix = [
  [
    {
      x: 0,
      y: 0,
      id: 0,
      value: 4,
      status: null,
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
  ],
  [
    {
      x: 0,
      y: 1,
      id: 10,
      value: 2,
      status: null,
    },
    {
      x: 1,
      y: 1,
      id: 11,
      value: null,
      status: null,
    },
    {
      x: 2,
      y: 1,
      id: 12,
      value: 2,
      status: null,
    },
    {
      x: 3,
      y: 1,
      id: 13,
      value: null,
      status: null,
    },
  ],
  [
    {
      x: 0,
      y: 2,
      id: 20,
      value: null,
      status: null,
    },
    {
      x: 1,
      y: 2,
      id: 21,
      value: null,
      status: null,
    },
    {
      x: 2,
      y: 2,
      id: 22,
      value: null,
      status: null,
    },
    {
      x: 3,
      y: 2,
      id: 23,
      value: 2,
      status: null,
    },
  ],
  [
    {
      x: 0,
      y: 3,
      id: 30,
      value: 4,
      status: null,
    },
    {
      x: 1,
      y: 3,
      id: 31,
      value: null,
      status: null,
    },
    {
      x: 2,
      y: 3,
      id: 32,
      value: null,
      status: null,
    },
    {
      x: 3,
      y: 3,
      id: 33,
      value: null,
      status: null,
    },
  ],
];

const dummyMatrix2 = [
  [
    {
      x: 0,
      y: 0,
      id: 0,
      value: 2,
    },
    {
      x: 1,
      y: 0,
      id: 1,
      value: 2,
    },
    {
      x: 2,
      y: 0,
      id: 2,
      value: null,
    },
    {
      x: 3,
      y: 0,
      id: 3,
      value: null,
    },
  ],
  [
    {
      x: 0,
      y: 1,
      id: 10,
      value: 2,
    },
    {
      x: 1,
      y: 1,
      id: 11,
      value: null,
    },
    {
      x: 2,
      y: 1,
      id: 12,
      value: 2,
    },
    {
      x: 3,
      y: 1,
      id: 13,
      value: null,
    },
  ],
  [
    {
      x: 0,
      y: 2,
      id: 20,
      value: null,
    },
    {
      x: 1,
      y: 2,
      id: 21,
      value: null,
    },
    {
      x: 2,
      y: 2,
      id: 22,
      value: null,
    },
    {
      x: 3,
      y: 2,
      id: 23,
      value: 2,
    },
  ],
  [
    {
      x: 0,
      y: 3,
      id: 30,
      value: 4,
    },
    {
      x: 1,
      y: 3,
      id: 31,
      value: null,
    },
    {
      x: 2,
      y: 3,
      id: 32,
      value: 2,
    },
    {
      x: 3,
      y: 3,
      id: 33,
      value: 2,
    },
  ],
];

const dummyMatrix3: Matrix = [
  [
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
  ],
  [
    {
      x: 0,
      y: 1,
      id: 10,
      value: 2,
      status: null,
    },
    {
      x: 1,
      y: 1,
      id: 11,
      value: 2,
      status: null,
    },
    {
      x: 2,
      y: 1,
      id: 12,
      value: 2,
      status: null,
    },
    {
      x: 3,
      y: 1,
      id: 13,
      value: 2,
      status: null,
    },
  ],
  [
    {
      x: 0,
      y: 2,
      id: 20,
      value: null,
      status: null,
    },
    {
      x: 1,
      y: 2,
      id: 21,
      value: null,
      status: null,
    },
    {
      x: 2,
      y: 2,
      id: 22,
      value: null,
      status: null,
    },
    {
      x: 3,
      y: 2,
      id: 23,
      value: 2,
      status: null,
    },
  ],
  [
    {
      x: 0,
      y: 3,
      id: 30,
      value: 2,
      status: null,
    },
    {
      x: 1,
      y: 3,
      id: 31,
      value: null,
      status: null,
    },
    {
      x: 2,
      y: 3,
      id: 32,
      value: null,
      status: null,
    },
    {
      x: 3,
      y: 3,
      id: 33,
      value: null,
      status: null,
    },
  ],
];

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

const testRow2 = [
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
    value: 2,
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
export { dummyMatrix, dummyMatrix2, dummyMatrix3, testRow, testRow2 };
