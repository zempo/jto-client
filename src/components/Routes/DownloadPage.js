import React, { useContext } from "react";
import Doc from "../../services/exports/download-service";
import { UserContext } from "../../contexts/UserContext";
import { ThemeStyles } from "../Utils/Store/Themes";
import DownloadContainer from "../Utils/Card/DownloadContainer";

const DownloadPage = (props) => {
  console.log(Doc.forcePageBreak);
  const createPdf = (html) => {
    Doc.createPdf(html);
  };
  const { theme, front_message, front_image, inside_message, inside_image, user } = props.location.state.payload;
  const {
    value: { user: card_user }
  } = useContext(UserContext);

  return (
    <div>
      <h1 className="animated-h1">Download an Occasion</h1>
      <h2 className="animated-h2">From {card_user.user_name === user.user_name ? "You" : user.user_name}</h2>

      <DownloadContainer
        createPdf={createPdf}
        forcePageBreak={Doc.forcePageBreak}
        style={theme ? ThemeStyles[`${theme}`].all : null}
      >
        <div className="export-pg export-front">
          <h3>{front_message}</h3>
          <img src={front_image} alt="download-cover" />
        </div>
        <div className="export-pg export-inside-left">
          <p>{inside_message}</p>
        </div>
        <div className="export-pg export-inside-right">
          <img src={inside_image} alt="download-inside-figure" />
        </div>
      </DownloadContainer>
    </div>
  );
};

export default DownloadPage;
