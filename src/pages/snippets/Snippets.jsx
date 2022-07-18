import React from "react";
import IMAGES from "../../Assets/Images"
import WidgetLarge from "../../components/widgetLarge/WidgetLarge";

function Snippets() {
  return (
    <>
      <section className="snippets">
        <div className="snippets__head">
          <h1>Mobicash Services</h1>
          <p className="desktop__text">
          </p>
        </div>
        <div className="snippets__body">
          <div className="snippets__body__img">
            {/* <img src={IMAGES.logo} alt="computers" /> */}
            <WidgetLarge/>
          </div>
          <div className="snippets__body__text">
          <h2>Transactions</h2>
            <h3>Commission</h3>
            <p>
              8,000,000 Rwf
            </p>
            <h3>Available Float</h3>
            <p>67,000,000 Rwf</p>
          </div>
        </div>
      </section>
    </>
  );
}

export default Snippets;
