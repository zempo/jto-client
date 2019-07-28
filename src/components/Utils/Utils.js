import React from 'react'
import { format as formatDate } from 'date-fns'
import './css/Utils.css'

export const jtoNotification = ({ className, msg }) => {
    return (
        <div className={['jto-notification', className].join(' ')}>
            <h2>{msg}</h2>
        </div>
    )
}