import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';

function Input({ setStudents, students, setLoading }) {
    const [showModal, setShowModal] = useState(false);

    const handleAddStudent = (evt) => {
        evt.preventDefault();
        setLoading(true);
        const studentObj = {
            id: students.length ? students[students.length - 1].id + 1 : 1,
            firstName: evt.target.firstName.value,
            lastName: evt.target.lastName.value,
            groupId: evt.target.group.value,
            doesWork: evt.target.checkbox.checked,
        }
        setStudents([...students, studentObj]);
        setShowModal(false);
        evt.target.reset();
        setTimeout(() => {
            setLoading(false);
        }, 2000);
        updateLocalStorage([...students, studentObj]);
    }

    const handleSelectChange = (evt) => {
        setLoading(true);
        const group = evt.target.value;
        let filteredStudents = [];
        if (group === "0") {
            filteredStudents = JSON.parse(window.localStorage.getItem('allStudents'));
        } else {
            filteredStudents = JSON.parse(window.localStorage.getItem('allStudents')).filter(item => item.groupId === group);
        }
        setStudents(filteredStudents);
        setTimeout(() => {
            setLoading(false);
        }, 1000);
    }

    const handleSearchChange = (evt) => {
        setLoading(true);
        const searchQuery = evt.target.value.toLowerCase();
        const filteredStudents = JSON.parse(window.localStorage.getItem('allStudents')).filter(item => item.firstName.toLowerCase().includes(searchQuery));
        setStudents(filteredStudents);
        setTimeout(() => {
            setLoading(false);
        }, 2000);
    }

    const updateLocalStorage = (updatedStudents) => {
        window.localStorage.setItem('allStudents', JSON.stringify(updatedStudents));
    }

    useEffect(() => {
        if (!localStorage.getItem('allStudents')) {
            localStorage.setItem('allStudents', JSON.stringify(students));
        }
    }, []);

    return (
        <div className='container'>
            <div className='input-group my-3 flex items-center justify-between bg-gray-100'>
                <input onChange={handleSearchChange} type="text" className="w-[79%] p-3 border border-gray-300 rounded-l-md" placeholder="Searching" aria-label="Searching" />
                <select onChange={handleSelectChange} className='w-[9%] mx-[15px] p-[6px] rounded-md border'>
                    <option value={"0"}>All</option>
                    <option value={"1"}>React N48</option>
                    <option value={"2"}>React N49</option>
                    <option value={"3"}>React N50</option>
                </select>
                <button onClick={() => setShowModal(true)} className='w-[9%] border border-green-600 bg-white rounded-r-md p-3 text-green-600'>Add student</button>
            </div>
            <Modal showModal={showModal}
                setShowModal={setShowModal}>
                <form onSubmit={handleAddStudent} className='flex flex-col px-5 space-y-6'>
                    <span className='font-[500] text-[18px] text-black opacity-70 mb-1'> Adding Student</span>
                    <hr style={{ marginTop: '0' }} />
                    <label className='flex flex-col'>
                        <span className='font-[500] text-[18px] text-white mb-1'>
                            First name
                        </span>
                        <input required name='firstName' className='p-2 rounded-md placeholder:Fast name' />
                    </label>
                    <label className='flex flex-col'>
                        <span className='font-[500] text-[18px] text-white mb-1'>
                            Last name
                        </span>
                        <input required name='lastName' className='p-2 rounded-md placeholder:Last name' />
                    </label>
                    <label className='flex flex-col'>
                        <span className='font-[500] text-[18px] text-white mb-1'>
                            Select group
                        </span>
                        <select required name='group' className='p-2 rounded-md '>
                            <option value={"1"}>React N48</option>
                            <option value={"2"}>React N49</option>
                            <option value={"3"}>React N50</option>
                        </select>
                    </label>
                    <label className='flex items-center space-x-2'>
                        <input name='checkbox' type='checkbox' />
                        <span className='font-[500] text-[18px] text-white mb-1'>Does work?</span>
                    </label>
                    <div className='flex items-center justify-between'>
                        <button className='bg-red-500 text-white font-[500] p-3 rounded-md w-[45%]'>Cancel</button>
                        <button type='submit' className='bg-green-500 text-white font-[500] p-3 rounded-md w-[45%]'>Add</button>
                    </div>
                </form>
            </Modal>
        </div>
    );
}

export default Input;
