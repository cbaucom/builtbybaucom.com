import * as React from 'react';
import styled from 'styled-components';
import { useTheme } from '@/context/ThemeContext';
import { lightbulbStyles } from '@/styles/LightbulbStyles';
import gsap from 'gsap';
import { Draggable } from 'gsap/dist/Draggable';

// Register Draggable plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(Draggable);
}

const StyledLightbulb = styled.div`
  ${lightbulbStyles}
`;

export const Lightbulb = () => {
  const { theme, toggleTheme } = useTheme();
  const cordRef = React.useRef<SVGPathElement>(null);
  const hitSpotRef = React.useRef<SVGCircleElement>(null);
  const proxyRef = React.useRef<HTMLDivElement>(null);
  const bulbRef = React.useRef<SVGGElement>(null);

  const handleBulbClick = (e: React.MouseEvent) => {
    // Prevent click from triggering when dragging ends
    if (e.target === hitSpotRef.current) return;

    toggleTheme();
    // Flash animation
    gsap.fromTo(
      '.bulb__flash',
      { strokeDashoffset: 200 },
      { duration: 0.3, strokeDashoffset: 0 }
    );
  };

  React.useEffect(() => {
    if (typeof window === 'undefined') return;

    const cord = cordRef.current;
    const hitSpot = hitSpotRef.current;
    const proxy = proxyRef.current;

    if (!cord || !hitSpot || !proxy) return;

    let startY = 0;

    // Initialize draggable
    Draggable.create(proxy, {
      onDrag: function () {
        // Animate cord while dragging
        gsap.to(cord, {
          attr: { d: `M98.725 35v${380 + this.y}` },
          duration: 0.1
        });
      },
      onDragEnd: function () {
        const travelled = Math.abs(this.y - startY);

        // Update the reset position to match initial path
        gsap.to(cord, {
          attr: { d: 'M98.725 35v380' },
          duration: 0.3,
          ease: 'power2.out'
        });

        // If pulled far enough, trigger the theme toggle
        if (travelled > 50) {
          toggleTheme();
          gsap.fromTo(
            '.bulb__flash',
            { strokeDashoffset: 200 },
            { duration: 0.3, strokeDashoffset: 0 }
          );
        }
      },
      onDragStart: function () {
        startY = this.y;
      },
      trigger: hitSpot,
      type: 'y'
    });

    // Cleanup
    return () => {
      Draggable.get(proxy)?.kill();
    };
  }, [toggleTheme]);

  return (
    <StyledLightbulb data-theme={theme}>
      <div ref={proxyRef} style={{ display: 'none' }} />
      <svg
        className="toggle-scene"
        onClick={handleBulbClick}
        viewBox="0 0 197.451 481.081"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <marker id="a" orient="auto" overflow="visible">
            <path
              className="toggle-scene__cord-end"
              d="M.98 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"
              fillRule="evenodd"
              strokeWidth={0.267}
            />
          </marker>
        </defs>
        <g className="toggle-scene__cords">
          <path
            className="toggle-scene__cord"
            d="M98.725 35v380"
            fill="none"
            markerEnd="url(#a)"
            ref={cordRef}
            strokeLinecap="square"
            strokeWidth={6}
          />
          <circle
            className="toggle-scene__hit-spot-helper"
            cx={98.725}
            cy={380}
            fill="transparent"
            r={60}
          />
          <circle
            className="toggle-scene__hit-spot"
            cx={98.725}
            cy={380}
            fill="transparent"
            r={60}
            ref={hitSpotRef}
            style={{ cursor: 'pointer' }}
          />
        </g>
        <g
          className="toggle-scene__bulb bulb"
          ref={bulbRef}
          transform="translate(844.069 -645.213)"
        >
          <path
            className="bulb__cap"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
          />
          <path
            className="bulb__cap-shine"
            clipPath="url(#b)"
            d="M-778.379 802.873h25.512v118.409h-25.512z"
            transform="matrix(.52452 0 0 .90177 -368.282 82.976)"
          />
          <path
            className="bulb__cap"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412s-8.439 10.115-28.817 10.115c-21.673 0-29.59-10.115-29.59-10.115z"
          />
          <path
            className="bulb__cap-outline"
            d="M-774.546 827.629s12.917-13.473 29.203-13.412c16.53.062 29.203 13.412 29.203 13.412v53.6s-8.825 16-29.203 16c-21.674 0-29.203-16-29.203-16z"
            fill="none"
          />
          <g
            className="bulb__filament"
            fill="none"
            strokeLinecap="round"
            strokeWidth={5}
          >
            <path d="m-752.914 823.875-8.858-33.06M-737.772 823.875l8.858-33.06" />
            <path d="M-737.772 823.875l8.858-33.06" />
          </g>
          <path
            className="bulb__bulb"
            d="M-783.192 803.855c5.251 8.815 5.295 21.32 13.272 27.774 12.299 8.045 36.46 8.115 49.127 0 7.976-6.454 8.022-18.96 13.273-27.774 3.992-6.7 14.408-19.811 14.408-19.811 8.276-11.539 12.769-24.594 12.769-38.699 0-35.898-29.102-65-65-65-35.899 0-65 29.102-65 65 0 13.667 4.217 26.348 12.405 38.2 0 0 10.754 13.61 14.746 20.31z"
          />
          <path
            className="bulb__shine"
            d="M-789.19 757.501a45.897 45.897 0 0 1 3.915-36.189 45.897 45.897 0 0 1 29.031-21.957"
            fill="none"
          />
        </g>
      </svg>
    </StyledLightbulb>
  );
};