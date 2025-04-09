 import { StarIcon } from '@heroicons/react/20/solid';
 export default function RenderStars(rating) {
   
    const stars = [];
    const fullStars = Math.floor(rating.items);
    const hasHalfStar = rating.items % 1 >= 0.5;

    for (let i = 1; i <= 5; i++) {
      if (i <= fullStars) {
        stars.push(
          <StarIcon
            key={i}
            className="h-5 w-5 text-yellow-400"
            aria-hidden="true"
          />
        );
      } else if (i === fullStars + 1 && hasHalfStar) {
        stars.push(
          <div key={i} className="relative h-5 w-5">
            <StarIcon className="h-5 w-5 text-gray-300" aria-hidden="true" />
            <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
              <StarIcon className="h-5 w-5 text-yellow-400" aria-hidden="true" />
            </div>
          </div>
        );
      } else {
        stars.push(
          <StarIcon
            key={i}
            className="h-5 w-5 text-gray-300"
            aria-hidden="true"
          />
        );
      }
    }

    return stars;
  };