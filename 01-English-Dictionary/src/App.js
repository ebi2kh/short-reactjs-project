import React, { useState } from 'react'
import './App.css' // Import the external CSS file

const App = () => {
  const [word, setWord] = useState('')
  const [meaning, setMeaning] = useState('')
  const [audioSrc, setAudioSrc] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const fetchAPI = async () => {
    try {
      setIsLoading(true)
      setError('')
      const url = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
      const response = await fetch(url)
      const result = await response.json()

      if (result.title) {
        setMeaning('N/A')
        setAudioSrc('')
      } else {
        setMeaning(result[0].meanings[0].definitions[0].definition)
        setAudioSrc(result[0].phonetics[0].audio)
      }

      setIsLoading(false)
    } catch (error) {
      setIsLoading(false)
      setError('An error occurred, try again later')
    }
  }

  const handleInputChange = (e) => {
    setWord(e.target.value)
  }

  const handleInputKeyPress = (e) => {
    if (e.key === 'Enter') {
      fetchAPI()
    }
  }

  return (
    <div className='container'>
      <h1 className='heading'>English Dictionary</h1>
      <input
        placeholder='Search a word'
        type='text'
        className='input'
        value={word}
        onChange={handleInputChange}
        onKeyPress={handleInputKeyPress}
      />
      {isLoading && <div className='loader' />}
      {error && <p className='info-text error-text'>{error}</p>}
      {!isLoading && !error && !meaning && (
        <p className='info-text'>Type a word and press enter</p>
      )}
      {!isLoading && !error && meaning && (
        <div className={`meaning-container ${meaning ? 'show' : ''}`}>
          <p>
            Word Title: <span className='title'>{word}</span>
          </p>
          <p>
            Meaning: <span className='meaning'>{meaning}</span>
          </p>
          {audioSrc && <audio src={audioSrc} controls />}
        </div>
      )}
    </div>
  )
}

export default App
