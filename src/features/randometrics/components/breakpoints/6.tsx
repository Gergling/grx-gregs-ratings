import { BorderCellContainer, ElasticResponseItem } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric6 = () => (
  <ElasticResponseItem breakpoint={6}>
    <BorderCellContainer>
      <BorderCellContainer variant="row">
        <BorderCellContainer>
          <Randometric
            name='blogIdeas'
          />
          <Randometric
            name='blogPublishedLast'
          />
        </BorderCellContainer>
        <BorderCellContainer>
          <Randometric
            name='blogPublishProjected'
          />
          <Randometric
            width={2}
            height={1}
          />
        </BorderCellContainer>
      </BorderCellContainer>
      <BorderCellContainer>
        <Randometric
          width={4}
          height={1}
        />
      </BorderCellContainer>
    </BorderCellContainer>
  </ElasticResponseItem>
  
);
