import React, { useEffect } from "react";
import { JtoSection } from "../Utils/Utils";

const FAQs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <JtoSection className="jto-faqs">
      <h1 className="animated-h1">Need Help?</h1>
      <h2 className="animated-h2">Creating a Card</h2>
      <h3>Might do separate section called 'guide'</h3>
      <h2 className="animated-h2">FAQs</h2>
      <p>
        Do a "Cascade animation" using the "flipInY" just add water css animation. Offset the animation children to
        create cascade effect
      </p>
      <h3>Vector of Card on Conveyor Belt Assembly Line</h3>
      <h3>How do I download a card?</h3>
      <h3>Why was my card or comment removed?</h3>

      <h2 className="animated-h2">Contact Us</h2>

      <h2 className="animated-h2">Solomon Zelenko</h2>

      <h3>Feedback Form</h3>
    </JtoSection>
  );
};

export default FAQs;
