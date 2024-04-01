import React from 'react';
import cancelImg from '../../Assets/Images/cancel.svg';

function Modal({ children, setShowModal, showModal, bg }) {
  const closeModal = (evt) => {
    if (evt.target.id === 'wrapper') {
      setShowModal(false);
    }
  };

  const handleCancelClick = (evt) => {
    evt.stopPropagation()
    setShowModal(false);
  };

  return (
    <div onClick={closeModal} id='wrapper' className={`fixed z-10 inset-0 backdrop-blur-sm transition-[0.5s] ${showModal ? '' : 'scale-0'}`}>
      <div className={`w-[650px] ${bg ? bg : 'bg-blue-300'} relative p-5 rounded-lg mx-auto mt-[120px]`}>
        <button className='cursor-pointer absolute top-2 right-2' onClick={handleCancelClick}>
          <img src={cancelImg} alt='cancel' width={22} height={22} />
        </button>
        {children}
      </div>
    </div>
  );
}

export default Modal;
