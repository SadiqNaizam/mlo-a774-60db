import React from 'react';
import { Star } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StarRatingProps {
  /** The current rating value, e.g., 4.5 */
  rating: number;
  /** The total number of stars to display. Defaults to 5. */
  totalStars?: number;
  /** The size of each star icon in pixels. Defaults to 20. */
  size?: number;
  /** If true, the rating cannot be changed. Defaults to false. */
  readonly?: boolean;
  /** Callback function that is fired when the rating is changed. */
  onRatingChange?: (newRating: number) => void;
  /** Optional additional class names. */
  className?: string;
}

const StarRating: React.FC<StarRatingProps> = ({
  rating = 0,
  totalStars = 5,
  size = 20,
  readonly = false,
  onRatingChange,
  className,
}) => {
  const [hoverRating, setHoverRating] = React.useState<number | null>(null);
  console.log('StarRating component loaded');

  const handleRatingClick = (newRating: number) => {
    if (!readonly && onRatingChange) {
      onRatingChange(newRating);
    }
  };

  const handleHover = (hoverIndex: number | null) => {
    if (!readonly) {
      setHoverRating(hoverIndex);
    }
  };

  // The rating to display is the hover state if it exists, otherwise the passed-in rating prop.
  const displayRating = hoverRating !== null ? hoverRating : rating;

  // Calculate the percentage width for the filled stars overlay.
  const fillPercentage = totalStars > 0 ? (displayRating / totalStars) * 100 : 0;
  const fillWidth = `${fillPercentage}%`;

  return (
    <div
      className={cn('relative inline-flex items-center', className)}
      onMouseLeave={() => handleHover(null)}
      aria-label={`Rating: ${rating.toFixed(1)} out of ${totalStars} stars.`}
    >
      {/* Layer 1: Background (empty stars) */}
      <div className="flex items-center" aria-hidden="true">
        {[...Array(totalStars)].map((_, i) => (
          <Star key={`empty-${i}`} size={size} className="text-gray-300" fill="currentColor" />
        ))}
      </div>

      {/* Layer 2: Foreground (filled stars), clipped to the rating percentage */}
      <div
        className="absolute top-0 left-0 h-full overflow-hidden whitespace-nowrap"
        style={{ width: fillWidth }}
        aria-hidden="true"
      >
        <div className="flex items-center">
          {[...Array(totalStars)].map((_, i) => (
            <Star key={`filled-${i}`} size={size} className="text-yellow-400" fill="currentColor" />
          ))}
        </div>
      </div>

      {/* Layer 3: Interaction layer (invisible click/hover targets) */}
      {!readonly && (
        <div className="absolute top-0 left-0 flex h-full w-full">
          {[...Array(totalStars)].map((_, i) => (
            <div
              key={`interactive-${i}`}
              className="h-full flex-1 cursor-pointer"
              onMouseEnter={() => handleHover(i + 1)}
              onClick={() => handleRatingClick(i + 1)}
              aria-label={`Set rating to ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StarRating;