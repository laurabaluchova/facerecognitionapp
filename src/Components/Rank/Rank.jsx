import React, { Fragment } from "react";

const Rank = ({ name, module }) => {
  let isGoogleUserLocalStorage =
    window.localStorage.getItem("isGoogleUser") === "true";

  if (isGoogleUserLocalStorage) {
    return (
      <Fragment>
        <div className="white f2 pa1 ma4">
          {`${name}, detect ${module.name} in your pictures with this Magic Brain App`}
        </div>
      </Fragment>
    );
  } else {
    let savedName = window.localStorage.getItem("name");
    let savedEntries = window.localStorage.getItem("entries");
    return (
      <Fragment>
        <div className="white f2 pa1 ma4">
          {`${savedName}, your current detected images count is...`}
        </div>
        <div className="f1">{savedEntries}</div>
      </Fragment>
    );
  }
};

export default Rank;
