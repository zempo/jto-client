import React from 'react'

const Download = ({ item, cancel }) => {
    return (
        <div>
            <h2>Download Card</h2>
            <h2>Email Card</h2>
            <h2>Share Link</h2>
            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default Download
