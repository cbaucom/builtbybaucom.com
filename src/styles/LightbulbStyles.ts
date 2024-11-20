import { css } from 'styled-components';

export const lightbulbStyles = css`
  .toggle-scene {
    cursor: pointer;
    height: 55px;
    width: 30px;

    @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
      height: 65px;
      width: 35px;
    }
  }

  .toggle-scene__cord {
    fill: none;
    stroke: ${({ theme }) => theme.colors.text};
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-width: 6;
    transition: stroke 0.3s ease;
  }

  .toggle-scene__cord-end {
    fill: ${({ theme }) => theme.colors.text};
    stroke: none;
    transition: fill 0.3s ease;
  }

  .bulb__bulb {
    fill: ${({ theme }) => theme.colors.background};
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: 4;
    transition: all 0.3s ease;
  }

  .bulb__cap {
    fill: ${({ theme }) => theme.colors.text};
    transition: fill 0.3s ease;
  }

  .bulb__cap-shine {
    fill: ${({ theme }) => theme.colors.background};
    transition: fill 0.3s ease;
  }

  .bulb__cap-outline {
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: 4;
  }

  .bulb__filament {
    stroke: ${({ theme }) => theme.colors.text};
    transition: stroke 0.3s ease;
  }

  .bulb__flash {
    fill: none;
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: 4;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 200;
    stroke-dashoffset: 200;
  }

  .bulb__shine {
    stroke: ${({ theme }) => theme.colors.text};
    stroke-width: 8;
    stroke-linecap: round;
    stroke-linejoin: round;
    transition: stroke 0.3s ease;
  }

  .toggle-scene__hit-spot {
    cursor: grab;
    transition: all 0.3s ease;
  }

  .toggle-scene__hit-spot:active {
    cursor: grabbing;
  }

  .toggle-scene__hit-spot-helper {
    fill: ${({ theme }) => theme.colors.text};
    opacity: 0;
    transition: opacity 0.2s ease;
  }

  /* Show helper on hover */
  .toggle-scene__hit-spot:hover + .toggle-scene__hit-spot-helper {
    opacity: 0.1;
  }

  /* Add touch device optimization */
  @media (hover: none) {
    .toggle-scene__hit-spot {
      r: 65; /* Even larger touch target for mobile */
    }
  }

  /* Light theme (bulb on) */
  &[data-theme='light'] {
    .bulb__bulb {
      fill: #ffde63;
      stroke: #ffde63;
    }

    .bulb__filament {
      stroke: #ffde63;
    }

    .bulb__flash {
      animation: flash 0.3s ease-out forwards;
    }
  }

  /* Dark theme (bulb off) */
  &[data-theme='dark'] {
    .bulb__bulb {
      fill: ${({ theme }) => theme.colors.background};
      stroke: ${({ theme }) => theme.colors.text};
    }

    .bulb__filament {
      stroke: ${({ theme }) => theme.colors.text};
    }
  }
`;
