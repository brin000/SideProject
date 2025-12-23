"use client";

import { ItemStyles, Rating as ReactRating } from '@smastrom/react-rating';
import '@smastrom/react-rating/style.css';

interface RatingProps {
  value?: number;
  onChange?: (value: number) => void;
  readOnly?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  className?: string;
  style?: React.CSSProperties;
  itemStyles?: ItemStyles;
}

const Rating = ({
  value = 0,
  onChange,
  readOnly = false,
  isDisabled = false,
  isRequired = false,
  className,
  itemStyles,
  style
}: RatingProps) => {  

  return (
    <ReactRating
      value={value}
      onChange={onChange}
      readOnly={readOnly}
      isDisabled={isDisabled}
      isRequired={isRequired}
      className={className}
      itemStyles={itemStyles}
      style={style}
    />
  );
};

export { Rating };
