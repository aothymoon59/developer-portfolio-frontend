import React from 'react';
import LineIcon from "react-lineicons";
import { Image } from "./common/Image";

function Service(props){
  return (
    <div className="mi-service">
      {props.content.imageUrl ? (
        <span className="mi-service-icon">
          <Image
            src={props.content.imageUrl}
            placeholder="/images/portfolio-image-placeholder.png"
            alt={props.content.title}
          />
        </span>
      ) : (
        <span className="mi-service-icon">
          <LineIcon name={props.content.icon} />
        </span>
      )}
      <h5>{props.content.title}</h5>
      <p>{props.content.description || props.content.details}</p>
    </div>
  )
}

export default Service;
