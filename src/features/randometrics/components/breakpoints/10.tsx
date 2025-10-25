import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric10 = () => (
  <RandometricsResponseItem breakpoint={10}>
    <ElasticCellContainer variant="row">
      <ElasticCellContainer>
        <Randometric
          name='blogIdeas'
          width={2}
          height={1}
        />
        <Randometric
          name='blogPublishedLast'
          width={2}
          height={2}
        />
      </ElasticCellContainer>
      <ElasticCellContainer>
        <Randometric
          name='blogPublishProjected'
          width={2}
          height={2}
        />
        <Randometric
          width={2}
          height={1}
        />
      </ElasticCellContainer>
      <ElasticCellContainer>
        <ElasticCellContainer variant="row">
          <Randometric
            name="dev"
            width={3}
            height={1}
          />
        </ElasticCellContainer>
        <ElasticCellContainer variant="row">
          <Randometric
            width={3}
            height={2}
          />
        </ElasticCellContainer>
      </ElasticCellContainer>
        <Randometric
          width={1}
          height={3}
        />
    </ElasticCellContainer>
  </RandometricsResponseItem>
  
);
