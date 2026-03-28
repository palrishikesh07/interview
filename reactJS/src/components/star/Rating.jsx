import React, { useState } from "react";
const Rating = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const ratingContainer = new Array(5).fill(0);
  console.log("rating is ", rating);
  console.log("hover is ", hover);

  return (
    <div className="container">
      {ratingContainer.map((_, index) => (
        <span
          className={
            index < hover || (index < rating && hover == 0)
              ? "color"
              : "unColor"
          }
          onClick={() => setRating(index + 1)}
          onMouseEnter={() => setHover(index + 1)}
          onMouseLeave={() => setHover(0)}
          key={index}
        >
          &#9733;
        </span>
      ))}
    </div>
  );
};

export default Rating;
