import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
  min: number;
  max: number;
  value: number;
  onChange: (value: number) => void;
  step?: number;
}

const CustomSlider: React.FC<SliderProps> = ({ min, max, value, onChange, step = 1 }) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (isDragging && sliderRef.current) {
      const sliderRect = sliderRef.current.getBoundingClientRect();
      const percentage = (event.clientX - sliderRect.left) / sliderRect.width;
      const newValue = Math.round((percentage * (max - min) + min) / step) * step;
      onChange(Math.max(min, Math.min(max, newValue)));
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging]);

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="slider-container" style={{ position: 'relative', width: '100%', height: '20px' }}>
      <div
        ref={sliderRef}
        className="slider-track"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '100%',
          height: '4px',
          backgroundColor: '#e0e0e0',
          borderRadius: '2px',
        }}
      />
      <div
        className="slider-fill"
        style={{
          position: 'absolute',
          top: '50%',
          transform: 'translateY(-50%)',
          height: '4px',
          backgroundColor: '#3b82f6',
          borderRadius: '2px',
          width: `${percentage}%`,
        }}
      />
      <div
        className="slider-thumb"
        style={{
          position: 'absolute',
          top: '50%',
          left: `${percentage}%`,
          transform: 'translate(-50%, -50%)',
          width: '16px',
          height: '16px',
          backgroundColor: '#3b82f6',
          borderRadius: '50%',
          cursor: 'pointer',
        }}
        onMouseDown={handleMouseDown}
      />
    </div>
  );
};

export default CustomSlider;