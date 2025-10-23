import { ElasticCellContainer, ElasticResponseItem } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric6 = () => (
  <ElasticResponseItem breakpoint={6}>
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
      </ElasticCellContainer>
      <ElasticCellContainer>
        <Randometric
          width={4}
          height={1}
        />
      </ElasticCellContainer>
    </ElasticCellContainer>
  </ElasticResponseItem>
  
);
