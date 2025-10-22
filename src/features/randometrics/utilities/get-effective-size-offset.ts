export const getEffectiveSizeOffset = (
  horizontal: boolean,
) => ({
  width: horizontal ? 1 : 0,
  height: horizontal ? 0 : 1,
});
