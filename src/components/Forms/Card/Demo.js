import React from 'react'
import Lock from '../../../images/Lock'

const Demo = ({ cancel }) => {
    return (
        <div>
            <h3>Use lock icon with image fields</h3>
            <Lock />
            <br />
            <Lock />
            <br />
            <Lock />

            <button onClick={cancel}>Cancel</button>
        </div>
    )
}

export default Demo
