import { useState } from 'react'

const Display = (props) => 
  <div>{props.text} {props.value}</div>


const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)

  const goodValue = newValue => {
    console.log('value now', newValue)
    setGood(newValue)
  }
  const neutralValue = newValue => {
    console.log('value now', newValue)
    setNeutral(newValue)
  }
  const badValue = newValue => {
    console.log('value now', newValue)
    setBad(newValue)
  }

  return(
    <div>
      <h1>Please give us feedback!</h1>
      <button onClick={() => goodValue(good + 1)}>
        good
      </button>
      <button onClick={() => neutralValue(neutral + 1)}>
        neutral
      </button>
      <button onClick={() => badValue(bad + 1)}>
        bad
      </button>
      <h2>Statistics</h2>
      <Display text="good" value={good} />
      <Display text="neutral" value={neutral} />
      <Display text="bad" value={bad} />
    </div>
  )
}

export default App
