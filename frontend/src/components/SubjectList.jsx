import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h2>Subjects</h2>
            <ul>
                {subjects.map(subject => (
                    <li key={subject.id} onClick={() => onSelect(subject.id)}>
                        {subject.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default SubjectList;