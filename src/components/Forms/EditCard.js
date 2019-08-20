// import React, { useEffect, useState, useContext } from "react";
// // import { CardContext, CardContextProvider } from "../../contexts/CardContext";
// import { listCards, listCardComments, listReactions, listHearts, listShares } from "../../services/endpoints-service";
// // create back-button
// import { JtoSection, Loader, DotMenuOption, TimeStamp, CardPages, PaginateCardFaces } from "../Utils/Utils";
// import "./css/Card.css";
import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../../contexts/UserContext";
import { validateFrontMessage, validateTheme, validateInsideMessage } from "../../services/validation/card-validation";
import { useForm } from "../../hooks/get-files";
import { listCards, updateCard, newImages } from "../../services/endpoints-service";
import { JtoNotification, Required, Loader, ThemesList } from "../Utils/Utils";
import "./css/Forms.css";

const EditCard = ({ item, cancel }) => {
    const {
        value: { user }
    } = useContext(UserContext);
    const { values, files, errors, handleChange, reset } = useForm(
        { frontMessage: "", insideMessage: "", theme: "" },
        { 1: [], 3: [], 5: [] },
        { frontImage: "", insideImage: "" },
        { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
    );
    const [cardId, setCardId] = useState(0);
    const [card, setCard] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [resMsg, setResMsg] = useState("");
    const [resStatus, setResStatus] = useState(0);

    useEffect(() => {
        if (item) {
            // const { item } = props.location.state;
            console.log(item);
            // setCardId(item);

            const cardFound = async () => {
                // setLoading(true);
                try {
                    const cardResult = await listCards.get(`/${item}`);
                    // setCard(cardResult.data);
                    console.log(cardResult.data)
                } catch (err) {
                    // setError(true);
                    // setResStatus(err.response.status);
                    // setResMsg(Object.values(err.response.data.error));
                }
            };

            cardFound();
        }
        // eslint-disable-next-line
    }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);

        let formData = new FormData();
        setResStatus(0);
        setResMsg("");
        try {
            formData.append("front", files.frontImage);
            formData.append("inside", files.insideImage);

            let sendImageData = await newImages.post("/", formData);
            // sendImageData returns an array of the urls. conditionally add them to the img data
            if (!sendImageData) return "Sorry, no dice :/";
            setLoading(false);

            const { theme, insideMessage, frontMessage } = values;
            let fullData = { theme };
            if (sendImageData.data[0]) {
                fullData.front_image = sendImageData.data[0];
            }
            if (sendImageData.data[1]) {
                fullData.inside_image = sendImageData.data[1];
            }
            fullData.front_message = frontMessage;
            fullData.inside_message = insideMessage;
            let sendFullData = await updateCard.post(`/${cardId}`, fullData);

            setResStatus(sendFullData.status);
            setResMsg("New Occasion Created");
            // resetFrontMessage();
            reset();
        } catch (error) {
            setLoading(false);
            setResStatus(error.response.status);
            setResMsg(Object.values(error.response.data.error));
        }
    };

    return (
        <>
            <form className="jto-form add-card-form" onSubmit={handleSubmit}>
                {resStatus === 0 ? null : <JtoNotification type={resStatus} msg={resMsg} />}
                <fieldset>
                    <label htmlFor="frontMessage">
                        <Required met={values.frontMessage.length === 0 ? false : true} />
                        Want to Change the Occasion?
              </label>
                    <ul>
                        {errors["1"].map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                    <input
                        type="text"
                        placeholder="Happy Occasion Day!"
                        id={1}
                        name="frontMessage"
                        onChange={handleChange}
                        value={values.insideMessage}
                    />
                    <br />
                    <label htmlFor="frontImage">Want a new Cover?</label>
                    <input
                        type="file"
                        placeholder="URL for image that can be stretched/shrunk to 400px width and 500px height"
                        name="frontImage"
                        id={2}
                        onChange={handleChange}
                    />
                    <br />
                    <label htmlFor="insideMessage">
                        <Required met={values.insideMessage.length === 0 ? false : true} />
                        Want to change the Inside?
              </label>
                    <ul>
                        {errors["3"].map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                    <textarea
                        placeholder="From yours, truly!"
                        name="insideMessage"
                        onChange={handleChange}
                        id={3}
                        value={values.insideMessage}
                    />
                    <br />
                    <label htmlFor="frontImage">Want a new inside picture?</label>
                    <input type="file" placeholder="choose file" name="insideImage" id={4} onChange={handleChange} />
                    <br />
                    <Required met={values.theme.length === 0 ? false : true} />
                    <select
                        className="themes"
                        value={values.theme}
                        name="theme"
                        id={5}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Want a new font?
                </option>
                        <ThemesList />
                    </select>
                </fieldset>
                <button
                    disabled={errors['1'].length > 0 || errors['2'].length > 0 || errors['3'].length > 0}
                    type="submit"
                >
                    Edit Occasion
            </button>
            </form>
            {loading ? <Loader loading={true} /> : <Loader loading={false} />}
        </>
    );
};

export default EditCard;
