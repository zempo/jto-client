import React, { useState, useRef, useEffect } from 'react'
import {
    validateFrontMessage,
    validateTheme,
    validateInsideMessage
} from "../../../services/validation/card-validation";
import { useForm } from '../../../hooks/get-files'
import Lock from '../../../images/Lock'
import { Required, Loader, ThemesList } from "../../Utils/Utils";

const Demo = ({ cancel }) => {
    const { values, files, errors, handleChange, reset } = useForm(
        { frontMessage: "", insideMessage: "", theme: "" },
        { 1: [], 3: [], 5: [] },
        { frontImage: "", insideImage: "" },
        { 1: validateFrontMessage, 2: "", 3: validateInsideMessage, 4: "", 5: validateTheme }
    );
    const [validReq, setValidReq] = useState(false);
    const [loading, setLoading] = useState(false);
    const frontMsgRef = useRef();
    const insideMsgRef = useRef();
    const themeRef = useRef();

    useEffect(() => {
        if (errors["1"].length > 0 || errors["3"].length > 0) {
            return setValidReq(false);
        } else {
            return setValidReq(true);
        }
    }, [errors]);

    const handleSubmit = () => {
        const { frontMessage, insideMessage, theme } = values
        console.log(frontMessage, insideMessage, theme)
    }

    return (
        <>
            <form className="jto-form add-card-form" onSubmit={handleSubmit}>
                <fieldset>
                    <label htmlFor="frontMessage">
                        <Required met={values.frontMessage.length === 0 ? false : true} />
                        What's the Occassion?
              </label>
                    <ul>
                        {errors["1"].map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                    <input
                        ref={frontMsgRef}
                        type="text"
                        placeholder="Happy Occasion Day!"
                        id={1}
                        name="frontMessage"
                        onChange={handleChange}
                        value={values.frontMessage}
                    />
                    <br />
                    <label htmlFor="frontImage">Does your Occasion need a Cover Image?</label>
                    <div>
                        <Lock /> Sign up to use this feature!
                    </div>
                    <br />
                    <label htmlFor="insideMessage">
                        <Required met={values.insideMessage.length === 0 ? false : true} />
                        What do you want to say inside the card?
              </label>
                    <ul>
                        {errors["3"].map((err, i) => (
                            <li key={i}>{err}</li>
                        ))}
                    </ul>
                    <textarea
                        ref={insideMsgRef}
                        placeholder="From yours, truly!"
                        name="insideMessage"
                        onChange={handleChange}
                        id={3}
                        value={values.insideMessage}
                    />
                    <br />
                    <label htmlFor="frontImage">Do you want a picture inside the card?</label>
                    <div>
                        <Lock /> Sign up to use this feature!
                    </div>
                    <br />
                    <Required met={values.theme.length === 0 ? false : true} />
                    <select
                        ref={themeRef}
                        className="themes"
                        value={values.theme}
                        name="theme"
                        id={5}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>
                            Please Choose Font...
                </option>
                        <ThemesList />
                    </select>
                </fieldset>
                <button
                    disabled={
                        !validReq ||
                        frontMsgRef.current.value.length === 0 ||
                        insideMsgRef.current.value.length === 0 ||
                        themeRef.current.value.length === 0
                    }
                    type="submit"
                >
                    Create Occasion
            </button>
            </form>
            <button onClick={cancel}>Cancel</button>
            {loading ? <Loader loading={true} /> : <Loader loading={false} />}
        </>
    );
}

export default Demo