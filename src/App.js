import { useEffect, useReducer } from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Loader from "./Loader.js";
import Error from "./Error.js";
import StartScreen from "./StartScreen.js";
import Question from "./Question.js";
import Finished from "./Finished.js";
import Progression from "./Progression.js";
import Next from "./Next.js";
import Reset from "./Reset.js";

const initialState = {
  questions: [],
  currentIndex: 0,
  answer: null,
  points: 0,
  // loading , error, ready, active , finished
  statuss: "loading",
};

function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, statuss: "ready" };
    case "dataFailed":
      return { ...state, statuss: "error" };
    case "start":
      return {
        ...state,

        statuss: "active",
      };
    case "newAnswer":
      const question = state.questions.at(state.currentIndex);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    case "next":
      return {
        ...state,
        currentIndex: state.currentIndex + 1,
        answer: (state.answer = null),
      };
    case "finished":
      return { ...state, statuss: "finished" };
    case "reset":
      return {
        ...initialState,
        questions: state.questions,
        statuss: "ready",
      };
    default:
      throw new Error("unknown case");
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, statuss, currentIndex, answer, points } = state;
  const numQuestion = questions.length;
  const MaxPoints = questions.reduce((prev, cur) => prev + cur.points, 0) || 0;

  useEffect(function () {
    async function FetchQuestions() {
      try {
        const res = await fetch("http://localhost:8000/questions");
        const data = await res.json();

        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed", payload: error });
      }
    }
    FetchQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {statuss === "loading" && <Loader />}
        {statuss === "error" && <Error />}
        {statuss === "ready" && (
          <StartScreen numQuestion={numQuestion} dispatch={dispatch} />
        )}
        {statuss === "active" && (
          <>
            <Progression
              index={currentIndex}
              questions={questions}
              points={points}
              maxPoints={MaxPoints}
              answer={answer}
            />
            <Question
              questions={questions[currentIndex]}
              dispatch={dispatch}
              answer={answer}
              index={currentIndex}
              numQuestion={numQuestion}
            />
            <Next
              dispatch={dispatch}
              answer={answer}
              index={currentIndex}
              numQuestion={numQuestion}
            />
          </>
        )}
        {statuss === "finished" && (
          <>
            <Finished points={points} total={MaxPoints} />
            <Reset dispatch={dispatch} />
          </>
        )}
      </Main>
    </div>
  );
}
