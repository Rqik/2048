type CellProps = {
  x: number;
  y: number;
  id: number;
  value: number | null;
  status: 'moving' | 'stop' | 'create' | null;
  linkedCellId?: number | null;
};

type RowCells = CellProps[];
type Matrix = RowCells[];

export type { RowCells, Matrix, CellProps };
