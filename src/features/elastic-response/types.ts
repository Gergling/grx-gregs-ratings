import { CSSProperties } from "@mui/material";
import { PropsWithChildren, ReactNode } from "react";

export type BorderCellProps = PropsWithChildren & {
  size?: {
    width?: number;
    height?: number;
  };
  style?: React.CSSProperties;
};

export type RequiredBorderCellPropsSize = Required<BorderCellProps>['size'];

export type PrimaryLabelChipProps = {
  label: ReactNode;
  value: ReactNode;
  horizontal?: boolean;
  size?: RequiredBorderCellPropsSize;
  grow?: {
    label?: CSSProperties['flexGrow'];
    value?: CSSProperties['flexGrow'];
  }
};
