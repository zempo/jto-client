import React from 'react';
import ReactDOM from 'react-dom';
import DeleteCard from '../components/Forms/DeleteCard';
import EditCard from '../components/Forms/EditCard'
import MakePrivate from '../components/Forms/MakePrivate';
import MakePublic from '../components/Forms/MakePublic';
// import DeleteComment from '../components/Forms/DeleteComment'
// import EditComment from '../components/Forms/EditComment'
import './css/Modal.css'

const Modal = ({ item, action, isShowing, hide }) => {
    if (isShowing) {
        return ReactDOM.createPortal(
            <div onClick={hide} className='Modal'>
                <div onClick={e => e.stopPropagation()} className='Modal__inner'>
                    {action === 'delete-card' ?
                        <DeleteCard item={item} cancel={hide} /> :
                        action === 'edit-card' ?
                            < EditCard item={item} /> :
                            action === 'make-private' ?
                                <MakePrivate item={item} /> :
                                action === 'make-public' ?
                                    <MakePublic item={item} /> :
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