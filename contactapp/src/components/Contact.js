import React from 'react'
import { Link } from 'react-router-dom'
import { deleteContact } from '../api/ContactService';
import { toastError, toastSuccess } from '../api/ToastService';
import Swal from 'sweetalert2';

function Contact({ contact, onDelete, deleteContactFromList }) {

    const handleDelete = (contactId) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this contact!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
        }).then(async (result) => {
            if (result.isConfirmed) {
                try {
                    await deleteContact(contactId);
                    Swal.fire('Deleted!', 'Your contact has been deleted.', 'success');
                } catch (error) {
                    console.error('Error deleting contact:', error);
                    Swal.fire('Error!', 'An error occurred while deleting the contact.', 'error');
                }
            }
        });
    };
    return (
        <>
            <div className="contact__item">
                <div className="contact__header">
                    <div className="contact__image">
                        <img src={contact.photoUrl} alt={contact.name} />
                    </div>
                    <div className="contact__details">
                        <p className="contact_name">{contact.name.substring(0, 15)} </p>
                        <p className="contact_title">{contact.title}</p>
                    </div>
                </div>
                <div className="contact__body">
                    <p><i className="bi bi-envelope"></i> {contact.email.substring(0, 20)} </p>
                    <p><i className="bi bi-geo"></i> {contact.address}</p>
                    <p><i className="bi bi-telephone"></i> {contact.phone}</p>
                    <p>{contact.status === 'Active' ? <i className='bi bi-check-circle'></i> :
                        <i className='bi bi-x-circle'></i>} {contact.status}</p>
                    <u><Link to={`/contacts/${contact.id}`} className="contact__item">details</Link></u>
                    <button onClick={() => handleDelete(contact.id)} className="red-button"><u>Delete</u></button>
                </div>
            </div>

        </>

    )
}

export default Contact