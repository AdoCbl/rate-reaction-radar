
import React from 'react';
import { ArrowUp, ArrowRight, ArrowDown } from 'lucide-react';

export type Direction = 'hike' | 'hold' | 'cut';

type DirectionButtonProps = {
  direction: Direction;
  selected: boolean;
  onClick: (direction: Direction) => void;
};

export const DirectionButton: React.FC<DirectionButtonProps> = ({
  direction,
  selected,
  onClick,
}) => {
  const getIcon = () => {
    switch (direction) {
      case 'hike':
        return <ArrowUp size={32} />;
      case 'hold':
        return <ArrowRight size={32} />;
      case 'cut':
        return <ArrowDown size={32} />;
      default:
        return null;
    }
  };

  const getLabel = () => {
    switch (direction) {
      case 'hike':
        return 'Hike';
      case 'hold':
        return 'Hold';
      case 'cut':
        return 'Cut';
      default:
        return '';
    }
  };

  const getStyles = () => {
    const baseStyle = "direction-button";
    
    switch (direction) {
      case 'hike':
        return selected
          ? `${baseStyle} bg-direction-up bg-opacity-20 border-direction-up text-direction-up`
          : `${baseStyle} bg-white border-gray-200 text-gray-700 hover:border-direction-up hover:text-direction-up`;
      case 'hold':
        return selected
          ? `${baseStyle} bg-direction-neutral bg-opacity-20 border-direction-neutral text-direction-neutral`
          : `${baseStyle} bg-white border-gray-200 text-gray-700 hover:border-direction-neutral hover:text-direction-neutral`;
      case 'cut':
        return selected
          ? `${baseStyle} bg-direction-down bg-opacity-20 border-direction-down text-direction-down`
          : `${baseStyle} bg-white border-gray-200 text-gray-700 hover:border-direction-down hover:text-direction-down`;
      default:
        return baseStyle;
    }
  };

  return (
    <button
      className={getStyles()}
      onClick={() => onClick(direction)}
      type="button"
      aria-pressed={selected}
    >
      <div className="mb-2">{getIcon()}</div>
      <span className="text-lg">{getLabel()}</span>
    </button>
  );
};
