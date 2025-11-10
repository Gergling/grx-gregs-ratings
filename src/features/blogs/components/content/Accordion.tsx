import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary, Typography } from "@mui/material";
import { Accordion as AccordionProps } from "../../../../libs/sanity";
import { BlogRendererBlockContent } from "./BlockContent";
import { useMemo } from "react";

export const BlogRendererAccordion = ({ value }: { value: AccordionProps; }) => {
  const { headerText, hiddenContent, initialState } = value;
  const defaultExpanded = useMemo(() => initialState === 'open', [initialState]);

  return (
    <Accordion defaultExpanded={defaultExpanded}>
      <AccordionSummary expandIcon={<ExpandMore />}>
        <Typography component="h6">{headerText}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        <BlogRendererBlockContent value={hiddenContent} />
      </AccordionDetails>
    </Accordion>
  );
};
