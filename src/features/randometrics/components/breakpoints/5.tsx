import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric5 = () => (
  <RandometricsResponseItem breakpoint={5}>
    <ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <ElasticCellContainer>
          <Randometric
            name='blogIdeas'
          />
          <Randometric
            name='blogPublishProjected'
          />
        </ElasticCellContainer>
        <ElasticCellContainer>
          <Randometric
            height={3}
            width={1}
          />
        </ElasticCellContainer>
      </ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <Randometric
          height={2}
          width={3}
        />
      </ElasticCellContainer>
    </ElasticCellContainer>
  </RandometricsResponseItem>
);
