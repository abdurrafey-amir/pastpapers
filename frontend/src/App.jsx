import React, { use, useState } from 'react'
import './App.css'
import SelectionPanel from './components/SelectionPanel'
import SummaryCard from './components/SummaryCard'
import axios from 'axios'


function App() {
  const [selectedBoard, setSelectedBoard] = useState(null)
  const [selectedSubject, setSelectedSubject] = useState(null)
  const [selectedTopics, setSelectedTopics] = useState([])
  const [paperFilter, setPaperFilter] = useState('')
  const [selectedYears, setSelectedYears] = useState([])
  const [pdfUrls, setPdfUrls] = useState({
    questionsUrl: null,
    markschemeUrl: null
  })

  const toggleYear = (year) => {
    setSelectedYears((prevYears) => 
     prevYears.includes(year)
      ? prevYears.filter((y) => y !== year)
      : [...prevYears, year]
    )
  }

  const generatePDFs = async () => {
    try {
      // questions
      console.log(selectedTopics)
      const qRes = await axios.post('/api/generate_pdf', {
        topic_ids: selectedTopics.map(t => t.id),
        paper: paperFilter,
        years: selectedYears,
        type: 'questions',
      }, { responseType: 'blob' })

      // markscheme
      const mRes = await axios.post('/api/generate_markscheme', {
        topic_ids: selectedTopics.map(t => t.id),
        paper: paperFilter,
        years: selectedYears,
        type: 'markscheme',
      }, { responseType: 'blob' })
    
    const questionsUrl = window.URL.createObjectURL(new Blob([qRes.data]))
    const markschemeUrl = window.URL.createObjectURL(new Blob([mRes.data]))

    setPdfUrls({
      questionsUrl,
      markschemeUrl
    })
    } catch (err) {
      console.error('Error generating pdfs:', err)
    }
  }

  return (
    <div className='App'>
      <div className='left-panel'>
        <h1>PastPapers</h1>
        <SelectionPanel onSelectionChange={({ board, subject, topics, paper }) => {
          setSelectedBoard(board)
          setSelectedSubject(subject)
          setSelectedTopics(topics)
          setPaperFilter(paper)
        }} />

        <div className='year-selector'>
          <p>Select Years:</p>
          {[2018, 2019, 2020, 2021, 2022, 2023, 2024].map((year) => (
            <label key={year} style={{ marginRight: '1rem' }}>
              <input 
                type='checkbox'
                checked={selectedYears.includes(year)}
                onChange={() => toggleYear(year)}
              />
              {year}
            </label>
          ))}
        </div>

          <button className='generate-button' onClick={generatePDFs}>Generate PDFs</button>
      </div>

      <div className='right-panel'>
        <SummaryCard
          pdfUrls={pdfUrls}
          board={selectedBoard}
          subject={selectedSubject}
          topicIds={selectedTopics}
          paperFilter={paperFilter}
          selectedYears={selectedYears}
        />
      </div>
    </div>
  )
}


export default App