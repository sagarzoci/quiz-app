function Reset({ dispatch }) {
  return (
    <div>
      <button className="btn" onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}

export default Reset;
