function Next({ dispatch, answer, index, numQuestion }) {
  if (answer === null) return null;

  if (numQuestion - 1 > index) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "next" })}
        >
          Next
        </button>
      </div>
    );
  }
  if (numQuestion - 1 === index) {
    return (
      <div>
        <button
          className="btn btn-ui"
          onClick={() => dispatch({ type: "finished" })}
        >
          Finished
        </button>
      </div>
    );
  }
}

export default Next;
