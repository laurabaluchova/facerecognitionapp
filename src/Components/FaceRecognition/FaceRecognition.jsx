import ParticlesBg from "particles-bg";
import React, { Fragment } from "react";
import ImageLinkForm from "../ImageLInkForm/ImageLinkForm";
import Rank from "../Rank/Rank";
import "./FaceRecognition.css";

const FaceRecognition = ({
  imageUrl,
  box,
  module,
  user,
  onInputChange,
  onSubmit,
  input,
  validateUrl,
}) => {
  return (
    <Fragment>
      <ParticlesBg type="cobweb" bg={true} color="#FFB700" />
      <Rank name={user.name} module={module} />
      <ImageLinkForm
        onInputChange={onInputChange}
        onSubmit={onSubmit}
        module={module}
        input={input}
      />
      <div className="center ma ">
        <div className="absolute mt4">
          {validateUrl(imageUrl) && (
            <img
              id="inputimage"
              alt=""
              src={imageUrl}
              width="500px"
              height="auto"
            ></img>
          )}
          {box.map((item) => (
            <div
              key={`box${item.topRow}${item.rightCol}`}
              className="bounding_box"
              style={{
                top: item.topRow,
                right: item.rightCol,
                bottom: item.bottomRow,
                left: item.leftCol,
              }}
            ></div>
          ))}
        </div>
        {!validateUrl(imageUrl) && (
          <p className="gold">Enter valid URL with ending jpg, jpeg or png</p>
        )}
      </div>
    </Fragment>
  );
};

export default FaceRecognition;
