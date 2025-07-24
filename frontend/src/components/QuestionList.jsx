import React, { useEffect , useState } from 'react';
import axios from 'axios';

function QuestionList({ topicId, onSelect }) {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        if (!topicId) return;
        axios.get(`http://localhost:5000/api/questions/${topicId}`)
        .then(response => {
            setQuestions(response.data);
        })
        .catch(error => {
            console.error('Error fetching questions:', error);
        });
    }, [topicId]);


    return (
        <div>
            <h2>Questions</h2>
            <ul>
                {questions.map(question => (
                    <li key={question.id} onClick={() => onSelect(question.id)}>
                        {question.image_link}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default QuestionList