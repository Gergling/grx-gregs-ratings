import { Typography } from "@mui/material";
import { useMemo } from "react";
import { BlockChip } from "../../../common/components/BlockChip.style";
import { BorderCell } from "./BorderCell";
import { PrimaryLabelChipProps, RequiredBorderCellPropsSize } from "../types";

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
  const flexedSize = useMemo((): Required<RequiredBorderCellPropsSize> => {
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
