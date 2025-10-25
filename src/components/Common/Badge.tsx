import React from 'react';

interface BadgeProps {
  text: string;
}

const Badge: React.FC<BadgeProps> = ({ text }) => {
  return (
    <span className="badge">
      {text}
    </span>
  );
};

export default Badge;