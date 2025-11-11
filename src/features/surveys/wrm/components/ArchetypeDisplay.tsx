import { useMemo } from "react";
import { Typography } from "@mui/material";
import { ArchetypeScores } from "../types";
import { getArchetype } from "../utilities";
import { ARCHETYPE_KEYS } from "../config";
import { WRM_ARCHETYPE_LABELS } from "../constants";

export const WRMArchetypeDisplay = ({scores}: {scores: ArchetypeScores}) => {
  const { adjective, noun } = useMemo(() => getArchetype(scores), [scores]);
  const breakdown = useMemo(() => ARCHETYPE_KEYS
    .map((archetypeKey) => ({
      key: archetypeKey,
      label: WRM_ARCHETYPE_LABELS[archetypeKey],
      score: scores[archetypeKey]
    })),
    [scores]
  );
  return (
    <div>
      <Typography variant="h6">
        You got... <b>{adjective} {noun}</b>
      </Typography>
      <div>
        {breakdown.map(({ key, label, score }) => <div key={key}>{label}: {score}</div>)}
      </div>
    </div>
  );
};
