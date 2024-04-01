import React, { useState, useEffect } from 'react';
import Loading from '../../Assets/Images/loading.svg';
import Edit from '../../Assets/Images/edit.svg';
import Delete from '../../Assets/Images/delete.svg';
import Modal from '../Modal/Modal';

function List({ students, loading, setStudents }) {
    const [showModal, setShowModal] = useState(false);
    const [deleteShowModal, setDeleteShowModal] = useState(false);
    const [updateValue, setUpdateValue] = useState('');
    const [updateId, setUpdateId] = useState(null);
    const [deleteId, setDeleteId] = useState(null);

    const handleUpdate = (id) => {
        setShowModal(true);
        setUpdateId(id);
        const data = students.find(item => item.id === id);
        if (data) {
            setUpdateValue(data);
        }
    };

    const updateForm = (e) => {
        e.preventDefault();
        const updatedStudents = students.map(item => {
            if (item.id === updateId) {
                return { ...item, ...updateValue };
            }
            return item;
        });
        setStudents(updatedStudents);
        setShowModal(false);
    };

    const deleteBtn = (id) => {
        setDeleteShowModal(true);
        setDeleteId(id);
    };

    const handleDelete = () => {
        const updatedStudents = students.filter(item => item.id !== deleteId);
        setStudents(updatedStudents);
        setDeleteShowModal(false);
    };

    useEffect(() => {
        localStorage.setItem('students', JSON.stringify(students));
    }, [students]);

    return (
        <>
            <div className='container'>
                <table className='w-full mt-5'>
                    <thead>
                        <tr>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>#</th>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>First name</th>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>Last name</th>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>Group</th>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>Does work</th>
                            <th className='font-[500] p-y border-b-[1px] border-slate-200 text-[18px]'>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr>
                                <td>
                                    <img src={Loading} alt='loading' className='w-[50px] h-[50px]' />
                                </td>
                            </tr>
                        ) : (
                            students.length > 0 && students.map((item, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'even:bg-gray-100' : 'odd:bg-gray-100'}>
                                    <td className='text-center py-2 px-2 font-[500] rounded-tl-lg rounded-bl-lg'>{`${index + 1}`}</td>
                                    <td className='py-2 text-center'>{item.firstName}</td>
                                    <td className='py-2 text-center'>{item.lastName}</td>
                                    <td className='py-2 text-center'>
                                        {item.groupId === '1' ? 'React n48' : item.groupId === '2' ? 'React n49' : item.groupId === '3' ? 'React n50' : ''}
                                    </td>
                                    <td className='py-2 text-center'>
                                        {item.doesWork === 'true' ? 'Ha' : 'Yo\'q'}
                                    </td>
                                    <td className='py-2 flex items-center justify-center space-x-3'>
                                        <button id={item.id} onClick={() => handleUpdate(item.id)}>
                                            <img src={Edit} alt='edit' />
                                        </button>
                                        <button id={item.id} onClick={() => deleteBtn(item.id)}>
                                            <img src={Delete} alt='delete' />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            <Modal showModal={showModal} setShowModal={setShowModal}>
                <form onSubmit={updateForm} className='flex flex-col px-5 space-y-6'>
                    <label className='flex flex-col'>
                        First Name:
                        <input className='p-2 rounded-md placeholder:first name' value={updateValue.firstName} onChange={(e) => setUpdateValue({ ...updateValue, firstName: e.target.value })} />
                    </label>
                    <label className='flex flex-col'>
                        Last Name:
                        <input className='p-2 rounded-md placeholder:last name' value={updateValue.lastName} onChange={(e) => setUpdateValue({ ...updateValue, lastName: e.target.value })} />
                    </label>
                    <div className='flex items-center justify-between'>
                    <label className='flex flex-col w-[45%]'>
                        Group:
                        <select className='p-2 rounded-md ' value={updateValue.groupId} onChange={(e) => setUpdateValue({ ...updateValue, groupId: e.target.value })}>
                            <option value='1'>React n48</option>
                            <option value='2'>React n49</option>
                            <option value='3'>React n50</option>
                        </select>
                    </label>
                    <label className='flex flex-col w-[45%]'>
                        Does Work:
                        <select className='p-2 rounded-md ' value={updateValue.doesWork} onChange={(e) => setUpdateValue({ ...updateValue, doesWork: e.target.value })}>
                            <option value="true">Ha</option>
                            <option value="false">Yo'q</option>
                        </select>
                    </label>
                    </div>
                    <div className='text-center'>
                        <button className='bg-blue-500 text-white font-[500] p-2 rounded-md w-[100px] ' type="submit">Update</button>
                    </div>
                </form>
            </Modal>

            <Modal showModal={deleteShowModal} setShowModal={setDeleteShowModal}>
                <div className='flex items-center flex-col'>
                    <span className='font-[500] text-[18px] text-white mb-1'>Are you sure you want to delete this item?</span>
                    <div className='flex items-center space-x-10 mt-5'>
                        <button className='p-2 rounded-md bg-red-500 w-[100px] text-white' onClick={handleDelete}>Yes</button>
                        <button className='p-2 rounded-md bg-green-500 w-[100px] text-white' onClick={() => setDeleteShowModal(false)}>No</button>
                    </div>
                </div>
            </Modal>
        </>
    );
}

export default List;
