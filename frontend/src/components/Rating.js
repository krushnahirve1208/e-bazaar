import React from "react";

const Rating = ({ value, text }) => {
  return (
    <div className="rating">
      <span>
        {value >= 1 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 0.5 ? (
          <i className="fa-solid fa-star-half"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span>
        {value >= 2 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 1.5 ? (
          <i className="fa-solid fa-star-half"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span>
        {value >= 3 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 2.5 ? (
          <i className="fa-solid fa-star-half"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span>
        {value >= 4 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 3.5 ? (
          <i className="fa-solid fa-star-half"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span>
        {value >= 5 ? (
          <i className="fa-solid fa-star"></i>
        ) : value >= 4.5 ? (
          <i className="fa-solid fa-star-half"></i>
        ) : (
          <i className="fa-regular fa-star"></i>
        )}
      </span>
      <span className="rating-text">{text && text}</span>
    </div>
  );
};

export default Rating;
