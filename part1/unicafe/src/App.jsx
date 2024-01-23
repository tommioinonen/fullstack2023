import { useState } from 'react'

const Button = (props) => <button onClick={props.handleClick}> {props.text} </button>
const StatisticLine = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>
const Statistic = (props) =>  {
  if (props.total == 0) {
    return <tbody><tr><td colSpan="2">No feedback given</td></tr></tbody>
  }
  return (
    <tbody>
        <StatisticLine text="good" value={props.good} />
        <StatisticLine text="neutral" value={props.neutral} />
        <StatisticLine text="bad" value={props.bad} />
        <StatisticLine text="all" value={props.total} />
        <StatisticLine text="average" value={props.average.toFixed(1)} />
        <StatisticLine text="positive" value={props.positive.toFixed(1) + " %"} />
      </tbody>
  )
}

const App = () => {

  const [ good, setGood ] = useState(0)
  const [ neutral, setNeutral ] = useState(0)
  const [ bad, setBad ] = useState(0)
  const [ total, setTotal ] = useState(0)
  const [ average, setAverage ] = useState(0)
  const [ positive, setPositive] = useState(0)

  const goodValue = () => {
    console.log('value now', good + 1)
    setGood(good + 1)
    setTotal(total + 1)
    calcAverage(1)
    const newGood = good + 1
    const newTotal = total + 1
    calcPositive(newGood, newTotal)
  }
  const neutralValue = () => {
    console.log('value now', neutral + 1)
    setNeutral(neutral + 1)
    setTotal(total + 1)
    const newTotal = total + 1
    calcAverage(0)
    calcPositive(good, newTotal)
  }
  const badValue = () => {
    console.log('value now', bad + 1)
    setBad(bad + 1)
    setTotal(total + 1)
    const newTotal = total + 1
    calcAverage(-1)
    calcPositive(good, newTotal)
  }

  const calcAverage = (newValue) => {
    const newAverage = ((good * 1 + bad * -1 + newValue) / (total + 1))
    setAverage(newAverage)
  }

  const calcPositive = (newGood, newTotal) => {
    const newPositive = (newGood / newTotal) * 100
    setPositive(newPositive)
  }

  return (
    <div>
      <h1>Please give us feedback!</h1>
      <Button handleClick={goodValue} text="good" />
      <Button handleClick={neutralValue} text="neutral" />
      <Button handleClick={badValue} text="bad" />
      <h2>Statistics</h2>
      <table>
      <Statistic 
          good={good}
          neutral={neutral}
          bad={bad}
          total={total}
          average={average}
          positive={positive} />  
      </table>
    </div>
  )
}

export default App
