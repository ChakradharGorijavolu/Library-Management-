import { Typography } from "@mui/material";
import React, { useReducer } from "react";

const initialState = { count: 0 };


function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    default:
      return state;
  }
}

export default function UserReducerDemo() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div >
      <Typography>
      useReducer Demo
      </Typography>
      <Typography>
      Count: {state.count}
      </Typography>

      <button onClick={() => dispatch({ type: "INCREMENT" })}>
        + Increase
      </button>

      <button onClick={() => dispatch({ type: "DECREMENT" })}>
        - Decrease
      </button>

      <button onClick={() => dispatch({ type: "RESET" })}>
        🔄 Reset
      </button>
    </div>
  );
}
