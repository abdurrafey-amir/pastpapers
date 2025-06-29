import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
            <h2>Topics</h2>
            <ul>
                {topics.map(topic => (
                    <li key={topic.id} onClick={() => onSelect(topic.id)}>
                        {topic.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TopicList;