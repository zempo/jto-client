import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { JtoSection } from "../Utils/Utils";

const FAQs = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <JtoSection className="jto-faqs">
      <h1 className="animated-h1">FAQs</h1>
      <h2 className="animated-h2">Will jtO remain free?</h2>
      <p>Yes! We will keep jtO open-source.</p>
      <p>We intend to run ads and rely on donations.</p>

      <h2 className="animated-h2">Can others copy my occasions?</h2>
      <p>
        Gallery Occasions can be copied. <br /> Please keep this in mind when using the service.{" "}
      </p>
      <p>However, your private cards will always remain private.</p>
      <h2 className="animated-h2">What do I do with my downloaded card?</h2>
      <p>
        Revisit the{" "}
        <Link to="/guide" title="card assembly instructions">
          getting-started page
        </Link>
        .
      </p>
      <p>Click the "Downloading" section.</p>
      <h2 className="animated-h2">Is my information secure?</h2>
      <p>Yes! Your private cards are private. Your login credentials are secure.</p>
      <p>Information is always collected with your informed consent.</p>
      <h2 className="animated-h2">Is there a privacy policy?</h2>
      <p>There is no privacy policy in place, at this time.</p>
      <p>Once jtO advances to the next stage, we will draft a user agreement.</p>
      <p>The </p>
      <h2 className="animated-h2"></h2>
      <p></p>
      <p>
        <a href="" className="guide-link"></a>
      </p>
      <h3>Vector of Card on Conveyor Belt Assembly Line</h3>
      <h3>How do I download a card?</h3>
      <h3>Why was my card or comment removed?</h3>

      <h3></h3>
    </JtoSection>
  );
};

export default FAQs;
