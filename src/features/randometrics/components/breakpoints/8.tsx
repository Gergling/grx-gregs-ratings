import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric8 = () => (
  <RandometricsResponseItem breakpoint={8}>
    <ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <ElasticCellContainer>
          <Randometric
            name='blogIdeas'
          />
          <Randometric
            name='blogPublishedLast'
          />
        </ElasticCellContainer>
        <ElasticCellContainer>
          <Randometric
            name='blogPublishProjected'
          />
          <Randometric
            width={2}
            height={1}
          />
        </ElasticCellContainer>
        <ElasticCellContainer>
          <Randometric
            width={2}
            height={3}
          />
        </ElasticCellContainer>
      </ElasticCellContainer>
      <ElasticCellContainer>
        <Randometric
          name="blogUpcoming"
          width={6}
          height={2}
        />
      </ElasticCellContainer>
    </ElasticCellContainer>
  </RandometricsResponseItem>
  
);
