import { PropsWithChildren } from "react";
import { StyledPanelContainer } from "./styles";
import { Pane } from "@gergling/ui-components";

export const PaneContainer = ({ children }: PropsWithChildren) => (
  <StyledPanelContainer>
    <Pane>
      {children}
    </Pane>
  </StyledPanelContainer>
);
