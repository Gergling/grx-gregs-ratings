import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric12 = () => (
  <RandometricsResponseItem breakpoint={12}>
    <ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <Randometric
          name="dev"
          width={3}
          height={1}
        />
        <Randometric
          width={4}
          height={1}
        />
        <Randometric
          width={3}
          height={1}
        />
      </ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <Randometric
          name='blogIdeas'
          width={1}
          height={2}
        />
        <Randometric
          name='blogPublishedLast'
          width={2}
          height={2}
        />
        <Randometric
          name='blogPublishProjected'
          width={2}
          height={2}
        />
        <Randometric
          name="blogUpcoming"
          width={5}
          height={2}
        />
      </ElasticCellContainer>
    </ElasticCellContainer>
  </RandometricsResponseItem>
  
);
