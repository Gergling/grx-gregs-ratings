import { PropsWithChildren, useMemo } from "react";
import { useElasticResponse } from "./ElasticResponse";
import { Pane } from "@gergling/ui-components";
import { ElasticResponsivePanelContainer } from "./ElasticResponsivePaneContainer.style";

export const ElasticResponsivePane = ({
  children,
  offset = 0,
}: PropsWithChildren & {
  offset: number;
}) => {
  const { getWidth } = useElasticResponse();
    const width = useMemo(
    () => getWidth(offset),
    [getWidth, offset]
  );

  return (
    <ElasticResponsivePanelContainer width={width}>
      <Pane>
        {children}
      </Pane>
    </ElasticResponsivePanelContainer>
  );
};
