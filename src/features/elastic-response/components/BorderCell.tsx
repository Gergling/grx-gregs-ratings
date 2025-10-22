import { PropsWithChildren, useMemo } from "react";
import { PrimaryBorder } from "../../../common/components/PrimaryBorder";
import { getRem } from "../utilities/rem-cell";

export type BorderCellProps = PropsWithChildren & {
  size?: {
    width?: number;
    height?: number;
  };
  style?: React.CSSProperties;
};

export const BorderCell = ({
  children,
  size,
  style,
}: BorderCellProps) => {
  const {
    height,
    width,
  } = useMemo(() => {
    const columns = size?.width || 1;
    const rows = size?.height || 1;
    const {
      width: w,
      height: h,
    } = getRem(columns, rows);
    const height = `${h}rem`;
    const width = `${w}rem`;
    return {
      height,
      width,
    };
  }, [size]);
  return (
    <PrimaryBorder style={{
      padding: '0.5rem',
      width,
      height,
      minWidth: width,
      ...style,
    }}>
      {children}
    </PrimaryBorder>
  );
};
