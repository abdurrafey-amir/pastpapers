import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function SubjectList({ onSelect }) {
    const [subjects, setSubjects] = useState([]);


    useEffect(() => {
        axios.get(`http://localhost:5000/api/subjects`)
        .then(response => {
            setSubjects(response.data);
        })
        .catch(error => {
            console.error('Error fetching subjects:', error);
        });
    }, []);

    return (
        <div>
            <DropdownButton id='drop' title='Subjects'>
                <Dropdown.Item>
                    <ul>
                    {subjects.map(subject => (
                        <li key={subject.id} onClick={() => onSelect(subject.id)}>
                            {subject.name}
                        </li>
                    ))}
                    </ul>
                </Dropdown.Item>
            </DropdownButton>
        </div>
    );
}

export default SubjectList;