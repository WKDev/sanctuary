import React from "react";
import { createContext, useReducer, useEffect } from "react";
import {
  UPDATE,
  CHART_TYPE,
  UPDATE_METADATA,
  UPDATE_CSV,
  UPDATE_VIEW_OPTIONS,
} from "./actionTypes";

// initial state
const initialState = {
  record: {
    MetaData: [{ name: "tomato", price: 10 }],
    _csv: [0, 0, 0],
  },
  viewOptions: {
    enableApexChart: false,
    referenceLevel: {
      LRDiff: 0, // lrdiff
      Smooth: [0, 0], // 평면성
      HL: [0, 0], // 고저
      Flatness: 0, // 평탄성
      InnerDist: 0, // 안내레일내측거리
      Straightness: [0, 0], // 직진도
      gap: 0,
    },
    aggregation: 0,
    range: [0, 0],
    globalRange: [0, 0],
  },

  // viewOptions: {
  //   enableApexChart: false,
  //   referenceLevel: {
  //     LRDiff: 4, // lrdiff
  //     Smooth: [3, 3], // 평면성
  //     HL: [3, 3], // 고저
  //     Flatness: 1.2, // 평탄성
  //     InnerDist: 10, // 안내레일내측거리
  //     Straightness: [3, 3], // 직진도
  //     gap: 0.5,
  //   },
  //   aggregation: 1,
  //   range: [0, 1],
  // },
};

// create context
const Context = createContext({});

// create reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE:
      return {
        ...state,
        record: {
          MetaData: action.payload.MetaData,
          _csv: action.payload._csv,
        },
      };

    case UPDATE_METADATA:
      return {
        ...state,
        record: {
          MetaData: action.payload.MetaData,
          _csv: state.record._csv,
        },
      };

    case UPDATE_CSV:
      return {
        ...state,
        record: {
          MetaData: state.record.MetaData,
          _csv: action.payload._csv,
        },
      };

    case CHART_TYPE:
      return {
        ...state,
        viewOptions: {
          ...state.viewOptions,
          enableApexChart: action.payload.enableApexChart,
        },
      };
    case UPDATE_VIEW_OPTIONS:
      return {
        ...state,
        viewOptions: action.payload.viewOptions,
      };

    default:
      return state;
  }
};

// create Provider component (High order component)
function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };

  useEffect(() => {
    console.log("viewOptions", state.viewOptions);

    return () => {};
  }, [state.viewOptions]);

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export { Context, Provider };
