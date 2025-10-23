import { ElasticCellContainer, ElasticResponseItem } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric7 = () => (
  <ElasticResponseItem breakpoint={7}>
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
  </ElasticResponseItem>
  
);
