import { useTheme } from "@gergling/ui-components";
import { Check, ThumbDown, ThumbUp, Close, SentimentVeryDissatisfied } from "@mui/icons-material";
import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import { ReactNode, useMemo } from "react";

// icon: <Check /> }, { icon: <ThumbUp />, text: "Great!" }, { icon: <ThumbDown />, text: "Sucks." }],
//   [{ icon: <Close /> }, { icon: <SentimentVeryDissatisfied color="secondary" strokeWidth={1} />, text: "Also sucks." }, { icon: <Check />, text: "Fine." }],

type Stuff = OverridableComponent<SvgIconTypeMap<{}, "svg">> & {
  muiName: string;
};
type Params<T extends Stuff> = Parameters<T>[0];
type IconComponent<T extends Stuff> = (props: Params<T>) => ReactNode;
const iconFactory = (Icon: Stuff): IconComponent<typeof Icon> => (props: Params<typeof Icon>) => <Icon {...props} />;
const entries = {
  check: Check,
  thumbDown: ThumbDown,
  thumbUp: ThumbUp,
  close: Close,
  unhappy: SentimentVeryDissatisfied,
};
type IconEntries = typeof entries;
type IconKey = keyof IconEntries;
type IconComponents = {
  [K in IconKey]: IconComponent<IconEntries[K]>;
};
const icons = Object.entries(entries).reduce(
  (icons, [name, Icon]) => ({
    ...icons,
    [name]: iconFactory(Icon),
  }),
  {} as IconComponents
);
const IconComp = (
  {
    iconKey,
    ...props
  }: Params<IconEntries[IconKey]> & { iconKey:IconKey }
) => {
  const Icon = icons[iconKey];
  return <Icon {...props} />;
};

const left = 300;
const width = 200;
const top = 0;
const bottom = 200;
const rowHeadingWidth = 80;
const columnHeadingHeight = 80;
const dataRows = 2;
const dataColumns = 2;
const margin = 2;

const dataCellHeight = (bottom - columnHeadingHeight) / dataRows;
const dataCellWidth = (width - rowHeadingWidth) / dataColumns;
const dataCellDivisionPositionY = columnHeadingHeight + dataCellHeight; // Hard-coded to 2 rows.
const xRowLabelLine = rowHeadingWidth + left;
const xColumnLine = dataCellWidth + xRowLabelLine;
const desiredIconSize = Math.floor(bottom / 4);
const iconScale = desiredIconSize / 24;
const textPositionX: number[] = [left, xRowLabelLine, xColumnLine];
const textPositionY: number[] = [top, columnHeadingHeight, dataCellDivisionPositionY];

type CellProps = {
  icon?: {
    key: IconKey;
    props?: Params<IconEntries[IconKey]>;
  };
  text?: string[] | ReactNode;
  x: number;
  y: number;
};

const Cell = ({
  icon,
  text,
  x,
  y,
}: CellProps) => {
  const columnHeader = y === 0;
  const rowHeader = x === 0;
  // const positionX = left + ()  
  const cellWidth = rowHeader ? rowHeadingWidth : dataCellWidth;
  const cellHeight = columnHeader ? columnHeadingHeight : dataCellHeight;
  const cellCenterX = cellWidth / 2;
  const cellCenterY = cellHeight / 2;
  const cellPositionX = textPositionX[x];
  const cellPositionY = textPositionY[y];
  const cellContentOffsetY = columnHeader ? 0 : dataCellHeight / 3;
  const iconOffsetX = rowHeader ? -rowHeadingWidth : -dataCellWidth * 3;
  const iconOffsetY = rowHeader ? -columnHeadingHeight / 4 : columnHeadingHeight;
  const textMultiline = Array.isArray(text);
  const textMultilineHeight = bottom / 12;
  const textMultilineOffsetY = textMultiline ? -textMultilineHeight : cellCenterY / 4;
  const textMetaOffsetY = columnHeader ? (columnHeadingHeight / 4) : 0;
  const textHeaderRowDataOffsetY = columnHeader && !rowHeader ? 15 : 0;
  const textIconOffsetY = icon ? -cellCenterY / 4 : 0;
  const textOffsetY = textMetaOffsetY + textMultilineOffsetY + textIconOffsetY + textHeaderRowDataOffsetY;
  const {
    theme: {
      colors: {
        primary,
        
        // secondary: { main: secondary },
      },
      // typography: { body2: { fontFamily, fontSize, fontWeight } }
    }
  } = useTheme();
  const { backgroundColour, fontColour } = useMemo(
    () => {
      const isHeader = columnHeader || rowHeader;
      const backgroundColour = isHeader ? primary.main : 'white';
      const fontColour = isHeader ? primary.on : primary.main;
      return { backgroundColour, fontColour };
    },
    [primary]
  );
  return (
    <g
      transform={`translate(${cellPositionX}, ${cellPositionY})`}
    >
      <rect
        x={margin}
        y={margin}
        width={cellWidth - (margin * 2)}
        height={cellHeight - (margin * 2)}
        fill={backgroundColour}
        stroke={primary.main}
        strokeWidth={1}
      />

      <g
        transform={`translate(0, ${cellContentOffsetY})`}
      >

        <g
          transform={`scale(${iconScale / 16}) translate(${iconOffsetX}, ${iconOffsetY})`}
        >
          {icon && <IconComp
            iconKey={icon.key}
            // This colour is needed when viewing it in the sandbox.
            htmlColor={fontColour}
            // This colour is needed when viewing it as an SVG.
            fill={fontColour}
            {...icon.props}
          />}
        </g>
        <text
          // fontFamily={fontFamily}
          x={cellCenterX}
          y={textOffsetY}
          // dominantBaseline="middle"
          fontSize="0.75rem"
          fontWeight='normal'
          textAnchor="middle"
          fill={fontColour}
        >{textMultiline ? text.map((t,key) => <tspan key={key} x={cellCenterX} dy={textMultilineHeight}>{t}</tspan>) : text}</text>

      </g>
    </g>
  );
};

const cellData: CellProps[][] = [
  [{ text: ['Minefield','Navigation','Preference','(MNP)'] }, { text: 'Asked' }, { text: ['Not', 'asked'] }],
  [{ icon: { key: 'check' } }, { icon: { key: 'thumbUp' }, text: "Great!" }, { icon: { key: 'thumbDown' }, text: "Sucks." }],
  [{ icon: { key: 'close' } }, { icon: { key: 'unhappy' }, text: ["Also", "sucks."] }, { icon: { key: 'check' }, text: "Fine." }],
].map((row, y) => row.map((cellProps, x) => ({
  ...cellProps,
  icon: 'icon' in cellProps ? {
    ...cellProps?.icon,
    key: cellProps.icon.key as IconKey
  } : undefined,
  x,
  y,
})));

export const TableMnp = () => {
  // const { theme: { colors: { primary: { main: primary } } } } = useTheme();

  // TODO: Text fill colour can be themed.
  // TODO: SVG tag can be standardised, probably.
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="800"
      height="200"
      viewBox="0 0 800 200"
      fill="black"
      stroke="currentColor"
      strokeWidth="0"
      // stroke-linecap="round"
      // stroke-linejoin="round"
    >
      <rect x={left} y={top} width={width} height={bottom} fill='white' stroke='rgba(255, 255, 255, 0.5)' />
      {/* <text x="5" y="30" fill="none" stroke="red" font-size="35">I love SVG!</text> */}

      {/* <HorizontalLine {...props} y={columnHeadingHeight} stroke={primary} />
      <HorizontalLine {...props} y={dataCellDivisionPositionY} stroke={primary} />
      <VerticalLine {...props} x={xRowLabelLine} stroke={primary} />
      <VerticalLine {...props} x={xColumnLine} stroke={primary} /> */}

      {cellData.map(
        (
          row,
          rowIdx
        ) => row.map(
          (
            cellProps,
            columnIdx
          ) => (
            <Cell key={`${rowIdx}-${columnIdx}`} {...cellProps} />
            // <g
            //   key={`${rowIdx}-${columnIdx}`}
            //   transform={`translate(${textPositionX[columnIdx]}, ${textPositionY[rowIdx] + (columnHeadingHeight / 4)})`}
            // >
            // </g>
          )
        )
      )}
    </svg>
  );
};
