import React, { useState, useSyncExternalStore } from 'react';
import SubjectList from './components/SubjectList';
import TopicList from './components/TopicList';
import QuestionList from './components/QuestionList';
import './App.css';



function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  return (
    <div>
      <h1>PastPapers</h1>
      
      <SubjectList onSelect={setSelectedSubjectId} />

      {selectedSubjectId && (
        <TopicList subjectId={selectedSubjectId} onSelect={setSelectedTopicId} />
      )}

      {selectedTopicId && (
        <QuestionList topicId={selectedTopicId} />
      )}
    </div>
  );
}

export default App;