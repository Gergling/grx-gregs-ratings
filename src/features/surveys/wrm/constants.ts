import { ARCHETYPE_KEYS } from "./config";
import { WRMArchetypeReadableMapping } from "./types";

const TOTAL_INITIAL_QUESTIONS_PER_ARCHETYPE = 3;

export const TOTAL_INITIAL_QUESTIONS = ARCHETYPE_KEYS.length * TOTAL_INITIAL_QUESTIONS_PER_ARCHETYPE;

export const WRM_ARCHETYPE_LABELS: WRMArchetypeReadableMapping = {
  mage: 'Mage',
  rogue: 'Rogue',
  warrior: 'Warrior',
};
