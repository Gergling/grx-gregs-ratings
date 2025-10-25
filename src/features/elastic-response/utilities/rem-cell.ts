const CONSTANT_OFFSET = -2;
const HORIZONTAL_SCALAR = 5;
const VERTICAL_SCALAR = 4;

export const getRem = (columns: number, rows: number) => ({
  width: (columns * HORIZONTAL_SCALAR) + CONSTANT_OFFSET,
  height: (rows * VERTICAL_SCALAR) + CONSTANT_OFFSET,
});

export const getSize = (width: number, height: number) => ({
  columns: (width - CONSTANT_OFFSET) / HORIZONTAL_SCALAR,
  rows: (height - CONSTANT_OFFSET) / VERTICAL_SCALAR,
});
