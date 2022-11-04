type CellProps = {
  x: number;
  y: number;
  id: number;
  value: number | null;
  status: 'moving' | 'moving-start' | 'inner' | null | string;
};

type RowCells = CellProps[];
type Matrix = RowCells[];

export type { RowCells, Matrix, CellProps };
