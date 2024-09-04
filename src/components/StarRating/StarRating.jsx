import React, { useState } from "react";
import { FaStar } from "react-icons/fa";
import './StarRating.css'

const StarRating = ({ noOfStars = 5 }) => {
    const [rating,setRating] = useState(0);
    const [hover,setHover] = useState(0);

    const handleOnClick = (getCurrentIndex)=>{
        setRating(getCurrentIndex)
    }

    const handleOnMouseMove = (getCurrentIndex)=>{
        setHover(getCurrentIndex)
    }

    const handleOnMouseLeave = ()=>{
        setHover(rating)
    }
  return (
    <div>
      <h1>Star Rating</h1>
      {[...Array(noOfStars)].map((_, index) => {
        index = index + 1;
        return <FaStar 
        className={index <= hover ? "active":"inactive"}
        key={index}
        onClick={()=>handleOnClick(index)}
        onMouseMove={()=>handleOnMouseMove(index)}
        onMouseLeave={()=>handleOnMouseLeave(index)}
        size={40}
        />;
      })}
    </div>
  );
};

export default StarRating;
