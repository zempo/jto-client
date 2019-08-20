import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import { listCards } from '../../services/endpoints-service'

const DeleteCard = ({ item, cancel }) => {

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

    const handleDelete = async (e) => {
        console.log('deleted')
        try {
            console.log('try')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <button onClick={handleDelete}>Delete</button>
            <button onClick={cancel}>Cancel</button>
        </>
    )
}

export default DeleteCard
