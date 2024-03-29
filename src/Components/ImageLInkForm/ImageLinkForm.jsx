import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./ImageLinkForm.css";
import LoadingContext from "../../store/loading-context";

const ImageLinkForm = ({ onInputChange, onSubmit, module, input }) => {
  let isGoogleUserLocalStorage =
    window.localStorage.getItem("isGoogleUser") === "true";

  const ctx = useContext(LoadingContext);

  return (
    <div style={{ cursor: ctx.cursor }}>
      {isGoogleUserLocalStorage ? (
        <p className="f4">
          To count your detected images&nbsp;
          <Link to="/register" className="white">
            create account here
          </Link>
        </p>
      ) : (
        <p className="f4">
          {`Detect ${module.name} in your pictures with this Magic Brain App`}
        </p>
      )}
      <div className="center ">
        <div className="form center pa4 br3 shadow-5">
          <input
            className="f4 pa2 w-70 center"
            type="text"
            placeholder="Insert image URL here"
            value={input}
            onChange={onInputChange}
          />
          <button
            className="button w-30 grow f4 link ph3 pv2 dib white bg-purple pointer"
            onClick={onSubmit}
          >
            {ctx.isLoading ? "Loading..." : "Detect"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
