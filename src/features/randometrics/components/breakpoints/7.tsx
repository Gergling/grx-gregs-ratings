import { ElasticCellContainer } from "../../../elastic-response";
import { Randometric } from "../Randometric";
import { RandometricsResponseItem } from "../RandometricsResponseItem";

export const Randometric7 = () => (
  <RandometricsResponseItem breakpoint={7}>
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
          <ElasticCellContainer variant="row">
            <Randometric
              name='blogPublishProjected'
            />
            <Randometric
              width={1}
              height={2}
            />
          </ElasticCellContainer>
          <Randometric
            width={3}
            height={1}
          />
        </ElasticCellContainer>
        <ElasticCellContainer>
        </ElasticCellContainer>
      </ElasticCellContainer>
      <ElasticCellContainer>
        <Randometric
          name="blogUpcoming"
          width={5}
          height={2}
        />
      </ElasticCellContainer>
    </ElasticCellContainer>
  </RandometricsResponseItem>
  
);
