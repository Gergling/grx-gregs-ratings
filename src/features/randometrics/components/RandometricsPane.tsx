import { ElasticResponsivePane } from "../../elastic-response/components/ElasticResponsivePaneContainer";
import {
  Randometric10,
  Randometric11,
  Randometric12,
  Randometric5,
  Randometric6,
  Randometric7,
  Randometric8,
  Randometric9,
} from "./breakpoints";

export const RandometricsPane = () => {
  return (
    <ElasticResponsivePane offset={7}>

      <Randometric5 />
      <Randometric6 />
      <Randometric7 />
      <Randometric8 />
      <Randometric9 />
      <Randometric10 />
      <Randometric11 />
      <Randometric12 />

    </ElasticResponsivePane>
  );
}