import { Typography } from "@mui/material";
import { CSSProperties, ReactNode, useMemo } from "react";
import { BlockChip } from "./BlockChip.style";
import { BorderCell, BorderCellProps } from "../../features/elastic-response/components/BorderCell";

type Size = Required<BorderCellProps>['size'];

export type PrimaryLabelChipProps = {
  label: ReactNode;
  value: ReactNode;
  horizontal?: boolean;
  size?: Size;
  grow?: {
    label?: CSSProperties['flexGrow'];
    value?: CSSProperties['flexGrow'];
  }
};

export const PrimaryLabelChip = ({
  grow,
  horizontal = false,
  label,
  size,
  value,
}: PrimaryLabelChipProps) => {
  const {
    label: labelGrow,
    value: valueGrow
  } = {
    label: 1,
    value: 1,
    ...grow,
  };
  const flexedSize = useMemo((): Required<Size> => {
    const width = (size?.width || 1) + (horizontal ? 1 : 0);
    const height = (size?.height || 1) + (horizontal ? 0 : 1);
    return {
      height,
      width,
    };
  }, [size, horizontal]);
  return (
    <BorderCell size={flexedSize} style={{
      display: 'flex',
      flexDirection: horizontal ? 'row' : 'column',
      gap: '0.5rem',
    }}>
      <Typography
        variant="body1"
        style={{
          alignItems: 'center',
          display: 'flex',
          justifyContent: horizontal ? 'right' : 'center',
          flex: labelGrow,
          textAlign: 'center',
        }}
      >
        {label}
      </Typography>
      <BlockChip
        color='primary'
        label={<Typography variant="body1">{value}</Typography>}
        sx={{
          display: 'flex',
          justifyContent: horizontal ? 'left' : 'center',
          flex: valueGrow,
          borderRadius: '0.5rem',
          height: '100%',
          '& .MuiChip-label': {
            textAlign: 'center',
            whiteSpace: 'normal',
          },
        }}
      />
    </BorderCell>
  );
};
