import React, { useState, useSyncExternalStore } from 'react';
import SubjectList from './components/SubjectList';
import TopicList from './components/TopicList';


function App() {
  const [selectedSubjectId, setSelectedSubjectId] = useState(null);
  const [selectedTopicId, setSelectedTopicId] = useState(null);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>PastPapers</h1>
      
      <SubjectList onSelect={setSelectedSubjectId} />

      {selectedSubjectId && (
        <TopicList subjectId={selectedSubjectId} onSelect={setSelectedTopicId} />
      )}

      {selectedTopicId && (
        <p>Selected topic ID: {selectedTopicId}</p>
      )}
    </div>
  );
}

export default App;