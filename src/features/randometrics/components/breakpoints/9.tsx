import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric9 = () => (
  <RandometricsResponseItem breakpoint={9}>
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
            name="dev"
            width={3}
            height={1}
          />
          <ElasticCellContainer variant="row">
            <Randometric
              width={1}
              height={2}
            />
            <Randometric
              width={2}
              height={2}
            />
          </ElasticCellContainer>
        </ElasticCellContainer>
      </ElasticCellContainer>
      <ElasticCellContainer variant="row">
        <Randometric
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
