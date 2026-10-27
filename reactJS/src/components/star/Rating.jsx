

import React, { useState } from 'react'

const Rating = () => {
  const [hover, setHover] = useState(0);
  const [rating, setRating] = useState(0);

  const ratingContainer  = new Array(5).fill(0);
  return (
    <div className='container'>
      {
       ratingContainer.map((rates,index)=>(
        <span 
        className={
          index < hover || index < rating && hover==0 ? "color":"uncolor"
        }
        onMouseEnter={()=>setHover(index+1)}
        onClick={()=>setRating(index+1)}
        onMouseLeave={()=>setHover(0)}
        key={index}>&#9733;</span>
       ))
      }
    </div>
  )
}

export default Rating
