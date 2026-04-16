import React from 'react'

function Testimonial(props){
  const reviewText = props.content.review || props.content.content;
  const reviewerName = props.content.reviewerName || props.content.author?.name;
  const reviewerTitle =
    props.content.reviewerTitle ||
    props.content.author?.designation ||
    "";
  const officeName = props.content.officeName || "";

  return (
    <div className="mi-testimonial-slideritem">
      <div className="mi-testimonial">
        <div className="mi-testimonial-content">
          <p>
            {reviewText}
          </p>
        </div>
        <div className="mi-testimonial-author">
          <h5>{reviewerName}</h5>
          <h6>{[reviewerTitle, officeName].filter(Boolean).join(", ")}</h6>
        </div>
      </div>
    </div>
  )
}

export default Testimonial;
