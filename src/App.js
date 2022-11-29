import React, { useState, useCallback, useEffect, createContext } from 'react';
import './App.css';

const keys = [
  "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z",
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
  "0", "1", "2", "3", "4", "5", "6", "7", "8", "9"
]

const generateWord = (len) => {
  let result = ""
  for (let i = 0; i < len; i++) {
    result += keys[Math.floor(Math.random() * keys.length)]
  }
  return result
}

const App = () => {
  const [word, setWord] = useState("")
  const [answers, setAnswers] = useState(["Aboba"])

  const onBackspace = () => {
    if (word.length === 0) return;
    setWord(word.slice(0, -1))
  }

  const onEnter = () => {
    let k = [...answers]
    if (k.includes(word)) {
      k = k.filter((item) => {
        return item !== word
      })
      k.push(generateWord(Math.floor(Math.random() * 9) + 1) )
      setAnswers(k)
      setWord("")
    }
  }

  const onType = (val) => {
    setWord(word + val)
  }

  const handleKeyboard = useCallback((event) => {
    if (event.key === "Enter") {
      onEnter()
      return;
    }
    if (event.key === "Backspace") {
      onBackspace()
      return;
    }

    if (word.length > 20) return;
    keys.forEach(key => {
      if (event.key === key) {
        onType(key)
      }
    })
  })

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboard)

    return () => {
      document.removeEventListener("keydown", handleKeyboard)
    }
  }, [handleKeyboard])

  return (
    <div onKeyDown={handleKeyboard} className='app'>
      <div className='answers'>
        {answers.map(el => (
          <div key={el}>{el}</div>
        ))}
      </div>
      <div className='type'>
        {word}
      </div>
    </div>
  );
}

export default App;
