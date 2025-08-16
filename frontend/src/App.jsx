import React, { useState } from 'react'
import './App.css'
import SelectionPanel from './components/SelectionPanel'
import QuestionList from './components/QuestionList'
import axios from 'axios'


function App() {
  const [selectedTopics, setSelectedTopics] = useState([])
  const [paperFilter, setPaperFilter] = useState('')
  const [selectedYears, setSelectedYears] = useState([])

  const toggleYear = (year) => {
    setSelectedYears((prevYears) => 
     prevYears.includes(year)
      ? prevYears.filter((y) => y !== year)
      : [...prevYears, year]
    )
  }

  const generatePDF = async () => {
    if (selectedTopics.length === 0) {
      alert('Please select topics first.')
      return
    }

    try {
      // questions
      const qRes = await axios.post('/api/generate_pdf', {
        topic_ids: selectedTopics,
        paper: paperFilter,
        years: selectedYears
      }, { responseType: 'blob' })

      const qBlob = new Blob([qRes.data], { type: 'application/pdf' })
      const qUrl = window.URL.createObjectURL(qBlob)

      const qLink = document.createElement('a')
      qLink.href = qUrl
      qLink.setAttribute('download', 'questions.pdf')
      document.body.appendChild(qLink)
      qLink.click()
      qLink.remove()

      // markscheme
      const mRes = await axios.post('/api/generate_markscheme', {
        topic_ids: selectedTopics,
        paper: paperFilter,
        years: selectedYears
      }, { responseType: 'blob' })

      const mBlob = new Blob([mRes.data], { type: 'application/pdf' })
      const mUrl = window.URL.createObjectURL(mBlob)

      const mLink = document.createElement('a')
      mLink.href = mUrl
      mLink.setAttribute('download', 'markscheme.pdf')
      document.body.appendChild(mLink)
      mLink.click()
      mLink.remove()

    } catch (err) {
      console.error(err)
      alert('Failed to generate PDF.')
    }
  }

  return (
    <div className='App'>
      <div className='left-panel'>
        <h1>PastPapers</h1>
        <SelectionPanel onTopicsChange={({ topics, paper }) => {
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

          <button className='generate-button' onClick={generatePDF}>Generate PDF</button>
      </div>

      <div className='right-panel'>
        <QuestionList
          topicIds={selectedTopics}
          paperFilter={paperFilter}
          selectedYears={selectedYears}
        />
      </div>
    </div>
  )
}


export default App