import React from 'react';
import ReactDOM from 'react-dom';
import DeleteCard from '../components/Forms/DeleteCard';
import EditCard from '../components/Forms/EditCard';

const Modal = ({ item, action, isShowing, hide }) => {
    // const renderAction = () => {
    //     if (action === 'delete-card') {
    //         console.log('modal worked')
    //         return < DeleteCard item={item} />;
    //     } else if (action === '/edit') {
    //         return < EditCard />;
    //     } else {
    //         // eventually return info component that displays a title and content.
    //         return null
    //     }
    // };

    if (isShowing) {
        return ReactDOM.createPortal(
            <div onClick={hide} className='Modal'>
                <div onClick={e => e.stopPropagation()} className='Modal__inner'>
                    {action === 'delete-card' ?
                        <DeleteCard item={item} /> :
                        action === 'edit-card' ?
                            <EditCard item={item} /> :
                            'other modal'}
                    modal
                </div>
            </div>,
            document.querySelector('#modal'),
        );
    } else {
        return null
    }
};

export default Modal; 