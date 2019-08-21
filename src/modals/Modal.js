import React from 'react';
import ReactDOM from 'react-dom';
import DeleteCard from '../components/Forms/DeleteCard';
import DeleteUserCard from '../components/Forms/DeleteUserCard';
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
                        action === 'delete-user-card' ?
                            <DeleteUserCard item={item} cancel={hide} /> :
                            action === 'edit-user-card' ?
                                < EditCard item={item} /> :
                                action === 'make-private' ?
                                    <MakePrivate item={item} /> :
                                    action === 'make-public' ?
                                        <MakePublic item={item} /> :
                                        'other modal'}
                </div>
            </div>,
            document.querySelector('#modal'),
        );
    } else {
        return null
    }
};

export default Modal; 