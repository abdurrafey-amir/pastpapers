import React, { useState, useEffect } from 'react'
import axios from 'axios'
import './SelectionPanel.css'


function SelectionPanel({ onSelectionChange }) {
    const [boards, setBoards] = useState([])
    const [subjects, setSubjects] = useState([])
    const [topics, setTopics] = useState([])
    const [paperNumbers, setPaperNumbers] = useState([])

    const [selectedBoard, setSelectedBoard] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedTopics, setSelectedTopics] = useState([])
    const [selectedPaper, SetSelectedPaper] = useState('')

    useEffect(() => {
        axios.get('/api/boards').then((res) => {
            console.log('Boards response:', res.data)
            setBoards(res.data)
        })
    }, [])

    useEffect(() => {
        if (selectedBoard) {
            axios.get(`/api/subjects/${selectedBoard.id}`).then((res) => {
                setSubjects(res.data)
                setSelectedSubject(null)
                setTopics([])
                setSelectedTopics([])
            })
        }
    }, [selectedBoard])

    useEffect(() => {
        if (selectedSubject) {
            axios.get(`/api/topics/${selectedSubject.id}`).then((res) => {
                setTopics(res.data)
                setSelectedTopics([])
            })
            axios.get(`/api/papers/${selectedSubject.id}`).then((res) => {
                setPaperNumbers(res.data)
                SetSelectedPaper('')
            })
        }
    }, [selectedSubject])

    useEffect(() => {
        onSelectionChange({
            board: selectedBoard,
            subject: selectedSubject,
            topics: selectedTopics,
            paper: selectedPaper
        })
    }, [selectedBoard, selectedSubject, selectedTopics, selectedPaper])

    const toggleTopic = (topicId) => {
        setSelectedTopics((prev) =>
         prev.includes(topicId)
          ? prev.filter((id) => id !== topicId)
          : [...prev, topicId]
        )
    }

    return (
        <div className='selection-panel'>
            <div className='dropdown-group'>
                <h3 className='dropdown-label'>Select Board</h3>
                <select className='dropdown' onChange={(e) => {
                    const board = boards.find((b) => b.id === parseInt(e.target.value))
                    setSelectedBoard(board || null)
                }}>
                    <option value=''>-- Select Board --</option>
                    {boards.map((board) => (
                        <option key={board.id} value={board.id}>{board.name}</option>
                    ))}
                </select>
            </div>

            {subjects.length > 0 && (
                <div className='dropdown-group'>
                    <h3 className='dropdown-label'>Select Subject</h3>
                    <select className='dropdown' onChange={(e) => {
                        const subject = subjects.find((s) => s.id === parseInt(e.target.value))
                        setSelectedSubject(subject || null)
                    }}>
                        <option value="">-- Select Subject --</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </div>
            )}

            {topics.length > 0 && (
                <div className='topics-group'>
                    <h3 className='dropdown-label'>Select Topics</h3>
                    {topics.map((topic) => (
                        <div className='topic-checkbox' key={topic.id}>
                            <label>
                                <input
                                    type='checkbox'
                                    value={topic.id}
                                    checked={selectedTopics.some((t) => t.id === topic.id)}
                                    onChange={() => toggleTopic(topic)}
                                />
                                {topic.name}
                            </label>
                        </div>
                    ))}
                </div>
            )}

            {paperNumbers.length > 0 && (
                <div className='dropdown-group'>
                    <h3 className='dropdown-label'>Select Paper Number</h3>
                    <select className='dropdown' value={selectedPaper} onChange={(e) => SetSelectedPaper(e.target.value)}>
                        <option value=''>-- Any Paper --</option>
                        {paperNumbers.map((p) => (
                            <option key={p} value={p}>{p}</option>
                        ))}
                    </select>
                </div>
            )}
        </div>
    )
}


export default SelectionPanel