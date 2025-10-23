import { localFireDepartment } from "../../../common/icons";

export const FACETOMETRICS = {
  eot: {
    configs: [
      {
        size: { width: 2 },
      },
    ],
    label: 'Entropy Over Time (EOT)',
    value: 'Inferior',
  },
  brx: {
    configs: [
      {
        size: { width: 3 },
      },
    ],
    label: 'Blog Rating (BRX)',
    value: 'None of your business',
  },
  ppc: {
    configs: [
      {
        size: { width: 2 },
      },
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 3 },
      },
    ],
    label: 'People Per Capita (PPC)',
    value: '100%',
  },
  pi: {
    configs: [
      {
        size: { width: 3 },
      },
    ],
    label: 'Current Value Of Pi (Pi)',
    value: `${Math.PI.toString()}...`,
  },
  wsv: {
    configs: [
      {
        size: { width: 1, height: 2 },
      },
    ],
    label: 'Words Stacked Erect (WSE)',
    value: '3',
  },
  rnd: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        // size: { width: 1, height: 1 },
      }
    ],
    label: 'Randomness (RND)',
    value: '4',
  },
  wtf: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 3, height: 1 },
      }
    ],
    label: 'Widespread Truncation Failure (WTF)',
    value: '418',
  },
  fom0: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 3, height: 1 },
      }
    ],
    label: 'Fear Of Missing Out (FOM0)',
    value: '£0.00',
  },
  tldr: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 3, height: 1 },
      }
    ],
    label: 'Too Long; Didn\'t Read (TLDR)',
    value: '0',
  },
  lgtm: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 2, height: 1 },
      }
    ],
    label: 'Looks Good To Me',
    value: localFireDepartment,
  },
  afk: {
    configs: [
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 1, height: 2 },
      }
    ],
    label: 'Away From Keyboard (AFK)',
    value: 'AFK',
  },
  sos: {
    configs: [
      {
        grow: { value: 0 },
        size: { width: 2, height: 1 },
      },
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 1, height: 1 },
      },
    ],
    label: 'Size of Screen (SOS)',
    value: 'Too small',
  },
  upm: {
    configs: [
      {
        grow: { value: 0 },
        size: { width: 2, height: 1 },
      },
      {
        horizontal: true,
        grow: { value: 0 },
        size: { width: 1, height: 1 },
      },
    ],
    label: 'Unused Priority Metrics (UPM)',
    value: 'None',
  },
  bug: {
    configs: [
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Is This a Bug? (BUG)',
    value: 'Feature',
  },
  eta: {
    configs: [
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Estimated Time to Answer (ETA)',
    value: 'NaN',
  },
  dep: {
    configs: [
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Dependency Count (DPX)',
    value: 'Too Many',
  },
  prod: {
    configs: [
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Production Status (PRD)',
    value: 'Fine',
  },
  yag: {
    configs: [
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 4, height: 1 },
      },
    ],
    label: 'You Aren\'t Gonna Need It (YAG)',
    value: 'Needed',
  },
ok: {
    configs: [
      {
        size: { width: 3, height: 1 },
      },
    ],
    label: 'Overall Knowledge (OK)',
    value: '¯\\_(ツ)_/¯',
  },
  idx: {
    configs: [
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 2, height: 1 },
      },
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Identity (IDX)',
    value: 'Guest',
  },
  gox: {
    configs: [
      {
        size: { width: 2, height: 1 },
      },
      {
        horizontal: true,
        size: { width: 1, height: 1 },
      },
    ],
    label: 'Go',
    value: 'Stopped',
  },
  nix: {
    configs: [
      {
        size: { width: 1, height: 1 },
      },
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 1, height: 1 },
      },
    ],
    label: '$nice',
    value: '69',
  },
  lox: {
    configs: [
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 2, height: 1 },
      },
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Low Score (LOX)',
    value: '-1',
  },
  iox: {
    configs: [
      {
        grow: { value: 0.5 },
        horizontal: true,
        size: { width: 3, height: 1 },
      },
      {
        size: { width: 3, height: 1 },
      },
      {
        size: { width: 2, height: 1 },
      },
    ],
    label: 'Input/Output (IOX)',
    value: 'Echo',
  },
  ipx: {
    configs: [
      {
        grow: { value: 0 },
        horizontal: true,
        size: { width: 3, height: 1 },
      },
    ],
    label: 'Intellectual Property (IPX)',
    value: 'MINE',
  },
  msx: {
    configs: [
      {
        size: { width: 4, height: 1 },
      },
    ],
    label: 'Dev Team Mood Status (MSX)',
    value: 'Rage-quitting... please wait.',
  },
  prx: {
    configs: [
      {
        grow: { label: 0.5 },
        size: { width: 2, height: 2 },
      },
      {
        size: { width: 4, height: 1 },
      },
    ],
    label: 'Procrastination Rating (PRX)',
    value: '// TODO: Implement this',
  },
};

  }
};
