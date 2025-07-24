import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

function TopicList({ subjectId, onSelect }) {
    const [topics, setTopics] = useState([]);

    useEffect(() => {
        if (!subjectId) return;
        axios.get(`http://localhost:5000/api/topics/${subjectId}`)
        .then(response => {
            setTopics(response.data);
        })
        .catch(error => {
            console.error('Error fetching topics:', error);
        });
    }, [subjectId]);

    
    return (
        <div>
            <DropdownButton id='topics' title='Topics'>
                <Dropdown.Item>
                    <ul>
                        {topics.map(topic => (
                            <li key={topic.id} onClick={() => onSelect(topic.id)}>
                                {topic.name}
                            </li>
                        ))}
                    </ul>
                </Dropdown.Item>
            </DropdownButton>    
        </div>
    );
}

export default TopicList;