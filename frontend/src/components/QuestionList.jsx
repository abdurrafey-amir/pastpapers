import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './QuestionList.css'


function QuestionList({ topicIds, paperFilter, selectedYears }) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        if (topicIds.length > 0) {
            axios.post('/api/questions/filter', {
                topic_ids: topicIds,
                paper: paperFilter,
                years: selectedYears,
            }).then((res) => {
                setQuestions(res.data)
            })
        } else {
            setQuestions([])
        }
    }, [topicIds, paperFilter, selectedYears])

    return (
        <div className='question-list'>
            <h3 className='question-list-title'>Filtered Questions</h3>
            {questions.length === 0 ? (
                <p className='no-questions'>No questions selected.</p>
            ) : (
                <ul className='question-items'>
                    {questions.map((q) => (
                        <li className='question-item' key={q.id}>
                            <img src={q.image_url} alt={`Question ${q.number}`} className='question-image' />
                            <p className='question-meta'>Year: {q.year}, Paper: {q.paper}, Question: {q.number}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}


export default QuestionList