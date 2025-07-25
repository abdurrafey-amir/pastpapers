import React, { useState } from 'react'
import './App.css'
import SelectionPanel from './components/SelectionPanel'
import QuestionList from './components/QuestionList'


function App() {
  const [selectedTopics, setSelectedTopics] = useState([])

  return (
    <div className='App'>
      <h1>PastPapers</h1>
      <SelectionPanel onTopicsChange={setSelectedTopics} />
      <QuestionList topicIds={selectedTopics} />
    </div>
  )
}

export default App