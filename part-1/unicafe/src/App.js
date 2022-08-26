import { useState } from 'react';

const Button = (props) => {
  return <button onClick={props.handleClick}>{props.text}</button>;
};

const StatisticLine = ({ name, value }) => {
  return (
    <tr>
      <td>{name}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = (props) => {
  return (
    <div>
      <h1>statistics</h1>
      {props.good + props.neutral + props.bad > 0 ? (
        <table>
          <tbody>
            <StatisticLine name="good" value={props.good} />
            <StatisticLine name="neutral" value={props.neutral} />
            <StatisticLine name="bad" value={props.bad} />
            <StatisticLine name="all" value={props.getTotalFeedbackNumber()} />
            <StatisticLine name="average" value={props.getAverage()} />
            <StatisticLine
              name="positive"
              value={`${props.getPositivePercentage()}%`}
            />
          </tbody>
        </table>
      ) : (
        <p>No feedback given</p>
      )}
    </div>
  );
};

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleGoodClick = () => setGood((prev) => prev + 1);
  const handleNeutralClick = () => setNeutral((prev) => prev + 1);
  const handleBadClick = () => setBad((prev) => prev + 1);

  const getTotalFeedbackNumber = () => good + neutral + bad;
  const getAverage = () => {
    const number = getTotalFeedbackNumber();
    const total = good - bad;
    return number > 0 ? (total / getTotalFeedbackNumber()).toFixed(2) : 0;
  };
  const getPositivePercentage = () => {
    const number = getTotalFeedbackNumber();
    const ratio = number > 0 ? good / getTotalFeedbackNumber() : 0;
    return (ratio * 100).toFixed(2);
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button text="good" handleClick={handleGoodClick} />
      <Button text="neutral" handleClick={handleNeutralClick} />
      <Button text="bad" handleClick={handleBadClick} />
      <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        getTotalFeedbackNumber={getTotalFeedbackNumber}
        getAverage={getAverage}
        getPositivePercentage={getPositivePercentage}
      />
    </div>
  );
};

export default App;
