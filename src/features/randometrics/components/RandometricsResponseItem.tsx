import { ElasticResponseItem } from "../../elastic-response";
import { ElasticResponseItemProps } from "../../elastic-response/types";
import { RandometricsProvider } from "../context";

export const RandometricsResponseItem = (props: ElasticResponseItemProps) => {
  return (
    <RandometricsProvider>
      <ElasticResponseItem {...props} />
    </RandometricsProvider>
  );
};
