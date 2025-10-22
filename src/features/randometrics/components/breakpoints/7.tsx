import { BorderCellContainer, ElasticResponseItem, PrimaryLabelChip } from "../../../elastic-response";
import { Randometric } from "../Randometric";

export const Randometric7 = () => (
  <ElasticResponseItem breakpoint={7}>
    <BorderCellContainer>
      <BorderCellContainer variant="row">
        <PrimaryLabelChip
          label='Breakpoint'
          size={{ width: 5 }}
          value='7'
        />
      </BorderCellContainer>
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
          <BorderCellContainer variant="row">
            <Randometric
              name='blogPublishProjected'
            />
            <Randometric
              width={1}
              height={2}
            />
          </BorderCellContainer>
          <Randometric
            width={3}
            height={1}
          />
        </BorderCellContainer>
        <BorderCellContainer>
        </BorderCellContainer>
      </BorderCellContainer>
      <BorderCellContainer>
        <Randometric
          width={5}
          height={1}
        />
      </BorderCellContainer>
    </BorderCellContainer>
  </ElasticResponseItem>
  
);
