import { useEffect, useRef, useState } from 'react';
import './App.css';
import 'react-toastify/dist/ReactToastify.css'
import { getContacts, saveContact, udpatePhoto } from './api/ContactService';
import Header from './components/Header';
import ContactList from './components/ContactList';
import ContactDetail from './components/ContactDetail';
import { Navigate, Route, Routes } from 'react-router-dom';
import { toastError, toastSuccess } from './api/ToastService';
import { ToastContainer } from 'react-toastify';

function App() {
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const modalRef = useRef();
  const fileRef = useRef();
  const [file, setFile] = useState(undefined);
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    title: '',
    status: '',
  });

  //get all contacts
  const getAllContacts = async (page = 0, size = 8) => {
    try {
      setCurrentPage(page);
      const { data } = await getContacts(page, size);
      setData(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // save new contact
  const handleNewContact = async (event) => {
    event.preventDefault();
    try {
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append('file', file, file.name);
      formData.append('id', data.id);
      const { data: photoUrl } = await udpatePhoto(formData);
      console.log(photoUrl);
      toggleModal(false);
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        title: '',
        status: '',
      })
      getAllContacts();
      toastSuccess('Contact added succesfuly');
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };

  // set the values on the state when the inputs are changing
  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
    console.log(values)
  };

  // show or close the modale
  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close();

  useEffect(() => {
    getAllContacts();
  }, []);



  //update the image when i click... in the cotactDetails component
  const updateImage = async (formData) => {
    try {
      const { data: photoUrl } = await udpatePhoto(formData);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };


  //update contact when i click save (submite the form) in the contactDetails component
  const updateContact = async (contact) => {
    try {
      const { data } = await saveContact(contact);
      console.log(data);
    } catch (error) {
      console.log(error);
      toastError(error.message);
    }
  };


  // Define the function to update a contact in the list
  const updateContactInList = (updatedContact) => {
    // Find the contact in the list and update its details
    const updatedData = data.content.map(contact => {
      if (contact.id === updatedContact.id) {
        return updatedContact; // Update the contact with the new details
      }
      return contact;
    });

    // Set the new data state
    setData({ ...data, content: updatedData });
  };
  

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.totalElements} />
      <main className='main'>
        <div className='container'>
          <Routes>
            <Route path='/' element={<Navigate to={'/contacts'} />} />
            <Route path="/contacts" element={<ContactList data={data} currentPage={currentPage} getAllContacts={getAllContacts} />} />
            <Route path="/contacts/:id" element={<ContactDetail updateContact={updateContact} updateImage={updateImage} updateContactInList={updateContactInList} />} />
          </Routes>
        </div>
      </main>


      {/* modal */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Title</span>
                <input type="text" value={values.title} onChange={onChange} name='title' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => { setFile(event.target.files[0]); console.log(file) }} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
      {/* end modal */}

      <ToastContainer />
    </>
  );
}

export default App;
