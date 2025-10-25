import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric11 = () => (
  <RandometricsResponseItem breakpoint={11}>
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
          <Randometric
            width={2}
            height={1}
          />

        </ElasticCellContainer>
        <ElasticCellContainer variant="row">
          <Randometric
            name="blogUpcoming"
            width={5}
            height={2}
          />
        </ElasticCellContainer>
      </ElasticCellContainer>
    </ElasticCellContainer>
  </RandometricsResponseItem>
  
);
