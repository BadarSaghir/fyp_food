import React from "react";

import background from "../../Assets/images/error-bg.png";
import bgImage from "../../Assets/images/error.png";

function NoPage() {
  return (
    <div
      className="bg-dark py-5 hero-header"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="container px-4 px-lg-5 my-5">
        <div className="text-center">
          <div className="container">
          <h1 className="display-4 fw-bolder f-bold">Oops! sorry we could not find the page</h1>
            {/* <img className="display-4" src={bgImage} alt="error" /> */}
          </div>
          <h4 className="text-center">
            Return to the <a href="/">Homepage</a>
          </h4>
        </div>
      </div>
    </div>
  );
}

export default NoPage;
