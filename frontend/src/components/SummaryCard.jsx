import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SummaryCard.css'


function SummaryCard({ pdfUrls, board, subject, topicIds, paperFilter, selectedYears }) {
    const [questions, setQuestions] = useState([])
    useEffect(() => {
        if (topicIds.length > 0) {
            axios.post('/api/questions/filter', {
                topic_ids: topicIds.map(t => t.id),
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
        <div className='summary-card'>
            <h3>Summary</h3>
            <p><strong>Board:</strong> {board?.name || 'Not selected'}</p>
            <p><strong>Subject:</strong> {subject?.name || 'Not selected'}</p>
            <p><strong>Paper:</strong> {paperFilter || 'All papers'}</p>
            <p><strong>Years:</strong> {selectedYears.length > 0 ? selectedYears.join(', ') : 'All years'}</p>
            <p><strong>Topics:</strong> {topicIds.length > 0 ? topicIds.map((t) => t.name).join(', ') : 'None'}</p>

            <div className='summary-actions'>
                {pdfUrls.questionsUrl && (
                    <a href={pdfUrls.questionsUrl} download='questions.pdf' className="download-link">
                        Download questions pdf
                    </a>
                )}
                {pdfUrls.markschemeUrl && (
                    <a href={pdfUrls.markschemeUrl} download='markscheme.pdf' className="download-link">
                        Download markscheme
                    </a>
                )}
            </div>
        </div>
    )
}


export default SummaryCard