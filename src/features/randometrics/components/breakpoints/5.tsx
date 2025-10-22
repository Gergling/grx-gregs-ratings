import { BorderCellContainer, ElasticResponseItem } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric5 = () => (
  <ElasticResponseItem breakpoint={5}>
    <BorderCellContainer>
      <BorderCellContainer variant="row">
        <BorderCellContainer>
          <Randometric
            name='blogIdeas'
          />
          <Randometric
            name='blogPublishProjected'
          />
        </BorderCellContainer>
        <BorderCellContainer>
          <Randometric
            height={3}
            width={1}
          />
        </BorderCellContainer>
      </BorderCellContainer>
      <BorderCellContainer variant="row">
        <Randometric
          height={2}
          width={3}
        />
      </BorderCellContainer>
    </BorderCellContainer>
  </ElasticResponseItem>
);
