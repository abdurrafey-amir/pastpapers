import React, { useState, useEffect } from 'react'
import axios from 'axios'


function SelectionPanel({ onTopicsChange }) {
    const [boards, setBoards] = useState([])
    const [subjects, setSubjects] = useState([])
    const [topics, setTopics] = useState([])

    const [selectedBoard, setSelectedBoard] = useState(null)
    const [selectedSubject, setSelectedSubject] = useState(null)
    const [selectedTopics, setSelectedTopics] = useState([])

    useEffect(() => {
        axios.get('/api/boards').then((res) => {
            console.log('Boards response:', res.data)
            setBoards(res.data)
        })
    }, [])

    useEffect(() => {
        if (selectedBoard) {
            axios.get(`/api/subjects/${selectedBoard}`).then((res) => {
                setSubjects(res.data)
                setSelectedSubject(null)
                setTopics([])
                setSelectedTopics([])
            })
        }
    }, [selectedBoard])

    useEffect(() => {
        if (selectedSubject) {
            axios.get(`/api/topics/${selectedSubject}`).then((res) => {
                setTopics(res.data)
                setSelectedTopics([])
            })
        }
    }, [selectedSubject])

    useEffect(() => {
        onTopicsChange(selectedTopics)
    }, [selectedTopics])

    const toggleTopic = (topicId) => {
        setSelectedTopics((prev) =>
         prev.includes(topicId)
          ? prev.filter((id) => id !== topicId)
          : [...prev, topicId]
        )
    }

    return (
        <div>
            <h3>Select Board</h3>
            <select onChange={(e) => setSelectedBoard(parseInt(e.target.value))}>
                <option value=''>-- Select Board --</option>
                {boards.map((board) => (
                    <option key={board.id} value={board.id}>{board.name}</option>
                ))}
            </select>

            {subjects.length > 0 && (
                <>
                    <h3>Select Subject</h3>
                    <select onChange={(e) => setSelectedSubject(parseInt(e.target.value))}>
                        <option value="">-- Select Subject --</option>
                        {subjects.map((subject) => (
                            <option key={subject.id} value={subject.id}>{subject.name}</option>
                        ))}
                    </select>
                </>
            )}

            {topics.length > 0 && (
                <>
                    <h3>Select Topics</h3>
                    {topics.map((topic) => (
                        <div key={topic.id}>
                            <label>
                                <input
                                    type='checkbox'
                                    value={topic.id}
                                    checked={selectedTopics.includes(topic.id)}
                                    onChange={() => toggleTopic(topic.id)}
                                />
                                {topic.name}
                            </label>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}


export default SelectionPanel