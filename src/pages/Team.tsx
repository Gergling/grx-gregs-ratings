import { Seo } from "../common/components/Seo";
import { PageContainer } from "../common/components/styles";
import { Team } from "../features/team";

export const TeamPage: React.FC = () => {
  return (
    <PageContainer>
      <Seo
        title="Meet The Team"
        description="Meet the Team at Gregory, Michael & Davies' cruel and unusual measurements, ratings and categorisations."
      />
      <Team />
    </PageContainer>
  );
};
