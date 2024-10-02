import React from 'react';
import { AddCircle, MinusCirlce } from 'iconsax-react'; // Import the icons from Iconsax

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

const CustomSlider: React.FC<SliderProps> = ({ min, max, value, onChange, step = 1 }) => {
  const handleIncrement = () => {
    if (value < max) {
      onChange(Math.min(value + step, max));
    }
  };

  const handleDecrement = () => {
    if (value > min) {
      onChange(Math.max(value - step, min));
    }
  };

  return (
    <div className="button-slider" style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      <button onClick={handleDecrement} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <MinusCirlce size="24" color="#3b82f6" />
      </button>
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{value}</span>
      <button onClick={handleIncrement} style={{ border: 'none', background: 'none', cursor: 'pointer' }}>
        <AddCircle size="24" color="#3b82f6" />
      </button>
    </div>
  );
};

export default CustomSlider;
