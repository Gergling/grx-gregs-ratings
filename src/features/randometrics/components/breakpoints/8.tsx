import { BorderCellContainer, ElasticResponseItem } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric8 = () => (
  <ElasticResponseItem breakpoint={8}>
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
        <BorderCellContainer>
          <Randometric
            width={2}
            height={3}
          />
        </BorderCellContainer>
      </BorderCellContainer>
      <BorderCellContainer>
        <Randometric
          name="blogUpcoming"
          width={6}
          height={2}
        />
      </BorderCellContainer>
    </BorderCellContainer>
  </ElasticResponseItem>
  
);
