import React, { useState, useEffect } from 'react'
import axios from 'axios'


function QuestionList({ topicIds }) {
    const [questions, setQuestions] = useState([])

    useEffect(() => {
        if (topicIds.length > 0) {
            axios.post('/api/questions/filter', { topic_ids: topicIds }).then((res) => {
                setQuestions(res.data)
            })
        } else {
            setQuestions([])
        }
    }, [topicIds])

    return (
        <div>
            <h3>Filtered Questions</h3>
            {questions.length === 0 ? (
                <p>No questions selected.</p>
            ) : (
                <ul>
                    {questions.map((q) => (
                        <li key={q.id}>
                            <img src='{q.image_url' alt={`Question ${q.number}`} width='300' />
                            <p>Year: {q.year}, Paper: {q.paper}, Question: {q.number}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default QuestionList