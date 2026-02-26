function StartScreen({ numQuestion, dispatch }) {
  return (
    <div className="start">
      <h2>Welcome to the Cricket Quiz!</h2>
      <h3>{numQuestion} questions to test your Cricket mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Let's Start
      </button>
    </div>
  );
}

export default StartScreen;
