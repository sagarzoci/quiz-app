import Next from "./Next";

function Question({ questions, answer, dispatch, index }) {
  const { question, correctOption, points, options, numQuestion } = questions;
  const hasAnswered = answer !== null;
  return (
    <div>
      <h4>{question}</h4>
      <div className="options">
        {options.map((options, index) => (
          <button
            className={`btn btn-option ${answer === index ? "answer" : ""} ${hasAnswered ? (index === correctOption ? "correct" : "wrong") : ""}`}
            key={options}
            disabled={hasAnswered}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
          >
            {options}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Question;
