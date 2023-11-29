import React, { useState, useEffect, useReducer } from "react";

import {
  FirstBand,
  SecondBand,
  ThirdBand,
  MultiplierBand,
  ToleranceBand,
} from "./colorBands";
import {colors} from "./colors.js"
import "./Resistor.css";
import AppFooter from "./AppFooter";

const initialState = {
  first: { name: "", value: "" },
  second: { name: "", value: "" },
  third: { name: "", value: "" },
  multiplier: { name: "", value: "" },
  tolerance: { name: "", value: "" },
};

const UPDATE_VALUE = "UPDATE_VALUE";
const reducer = (state, action) => {
  switch (action.type) {
    case UPDATE_VALUE:
      return {
        ...state,
        [action.payload.field]: {
          ...state[action.payload.field],
          name: action.payload.name,
          value: action.payload.value,
        },
      };
    default:
      return state;
  }
};

const updateValue = (field, name, value, flipp) => ({
  type: UPDATE_VALUE,
  payload: { field, name, value, flipp },
});

const Resistor = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [band, setBand] = useState(false);
  const [result, setResult] = useState(0);

  useEffect(() => {
    let first = state.first.value.toString();
    let second = state.second.value.toString();
    let third = state.third.value.toString();
    let res = first + second + (band ? third : "");

    setResult(res * Math.pow(10, state.multiplier.value));
  }, [state, band]);

  function pickColor(show, hide, pick) {
    document.getElementById(show).style.display = "";
    document.getElementById(hide).style.display = "none";
    document.getElementById(
      show
    ).style.background = `linear-gradient(${pick} 53%, black 100%)`;
  }

  const handleChange = (field, name, value) => {
    dispatch(updateValue(field, name, value));
  };

  useEffect(() => {
    if (band === true) {
      pickColor("third-band", "third-band-colors", state.third.name);
    }
  }, [band]);

  function switchTo() {
    setBand(!band);
  }

  const [flipped, setFlipped] = useState(false);

  //!   5
  function switchToFive(e) {
    e.preventDefault();
    setFlipped(true);
    setBand(true);
  }

  //!   4
  function switchToFour(e) {
    e.preventDefault();
    setFlipped(false);
    setBand(false);
  }

  let percentages = (state.tolerance.value / 100) * result;
  let min = result - percentages;
  let max = result + percentages;

  const final = (results) => {
    let output =
      results < 1000
        ? results
        : results < 1000000
        ? results / 1000
        : results < 1000000000
        ? results / 1000000
        : results < 1000000000000
        ? results / 1000000000
        : results;

    return output;
  };

  const ohmMark = (results) => {
    let ohms =
      results < 1000
        ? ` Ω `
        : results < 1000000
        ? ` kΩ `
        : results < 1000000000
        ? ` MΩ `
        : results < 100000000000
        ? ` GΩ `
        : ` Ω `;
    return ohms;
  };

  let finalRes = final(result);
  let finalOhms = ohmMark(result);

  let minRes = final(min);
  let minOhms = ohmMark(min);

  let maxRes = final(max);
  let maxOhms = ohmMark(max);

  let resMin =
    minRes.toFixed(4).at(-1) == 0
      ? minRes.toFixed(3).at(-1) == 0
        ? minRes.toFixed(2).at(-1) == 0
          ? minRes.toFixed(1).at(-1) == 0
            ? minRes.toFixed(0)
            : minRes.toFixed(1)
          : minRes.toFixed(2)
        : minRes.toFixed(3)
      : minRes.toFixed(4);

  let resMax =
    maxRes.toFixed(4).at(-1) == 0
      ? maxRes.toFixed(3).at(-1) == 0
        ? maxRes.toFixed(2).at(-1) == 0
          ? maxRes.toFixed(1).at(-1) == 0
            ? maxRes.toFixed(0)
            : maxRes.toFixed(1)
          : maxRes.toFixed(2)
        : maxRes.toFixed(3)
      : maxRes.toFixed(4);

  let resFinal =
    finalRes.toFixed(4).at(-1) == 0
      ? finalRes.toFixed(3).at(-1) == 0
        ? finalRes.toFixed(2).at(-1) == 0
          ? finalRes.toFixed(1).at(-1) == 0
            ? finalRes.toFixed(0)
            : finalRes.toFixed(1)
          : finalRes.toFixed(2)
        : finalRes.toFixed(3)
      : finalRes.toFixed(4);

  return (
    <>
      <div className="interactive-div">
        <div className="button-container">
          <div className="two-buttons">
            <label onClick={switchToFour} id="label-btn">
              <div id="input-btn" />
              <span
                id={flipped === false ? `span-btn-after` : `span-btn`}
              ></span>
              <a
                href="#"
                id={flipped === false ? `number-active` : `number-inactive`}
              >
                4
              </a>
            </label>

            <label onClick={switchToFive} id="label-btn">
              <div id="div-btn" />
              <span
                id={flipped === true ? `span-btn-after` : `span-btn`}
              ></span>
              <a
                href="#"
                id={flipped === true ? `number-active` : `number-inactive`}
              >
                5
              </a>
            </label>
          </div>

          <div className="result-div">
            <span id="result-box">
              res: {resFinal} {finalOhms} +/-{state.tolerance.value}%
            </span>
            <span id="result-box">
              min: {resMin} {minOhms}
            </span>
            <span id="result-box">
              max: {resMax} {maxOhms}
            </span>
          </div>
        </div>

        <div className="textual-outuput">
          <div className="name-color-divs">
            <div className="name-div">1st band</div>
            <button
              id="color-div"
              onClick={() => pickColor("first-band-colors", "first-band")}
              style={{
                color: `${state.first.name}`,
              }}
            >
              {state.first.name.slice(0, 6)}
            </button>
          </div>

          <div className="name-color-divs">
            <div className="name-div">2nd band</div>

            <button
              id="color-div"
              onClick={() => pickColor("second-band-colors", "second-band")}
              style={{
                color: `${state.second.name}`,
              }}
            >
              {state.second.name.slice(0, 6)}
            </button>
          </div>

          <div
            className={
              band === true ? "name-color-divs" : "name-color-disabled"
            }
          >
            <div className="name-div">3rd band</div>

            <button
              disabled={band === true ? false : true}
              id="color-div"
              onClick={() => pickColor("third-band-colors", "third-band")}
              style={{
                color: `${state.third.name}`,
              }}
            >
              {state.third.name.slice(0, 6)}
            </button>
          </div>

          <div className="name-color-divs">
            <div className="name-div">multiplier</div>

            <button
              id="color-div"
              onClick={() =>
                pickColor("multiplay-band-colors", "multiplay-band")
              }
              style={{
                color: `${state.multiplier.name}`,
              }}
            >
              {state.multiplier.name.slice(0, 6)}
            </button>
          </div>

          <div className="name-color-divs">
            <div className="name-div">tolerance</div>

            <button
              id="color-div"
              onClick={() =>
                pickColor("tolerance-band-colors", "tolerance-band")
              }
              style={{
                color: `${state.tolerance.name}`,
              }}
            >
              {state.tolerance.name.slice(0, 6)}
            </button>
          </div>
        </div>
      </div>

      <div className="resistor-container">
        <div id="wire-left"></div>

        <div id="oval-left">
          <div
            id="first-band-colors"
            style={{ display: "none", position: "absolute" }}
          >
            <FirstBand
              colors={colors}
              handleChange={handleChange}
              pickColor={pickColor}
            />
          </div>

          <div
            id="first-band"
            style={{
              opacity: `${state.first.name ? "100%" : "20%"}`,
            }}
          ></div>
        </div>

        <div id="three-mid-divs">
          <div style={{ width: "40px" }}>
            <div
              id="second-band-colors"
              style={{ display: "none", position: "" }}
            >
              <SecondBand
                colors={colors}
                handleChange={handleChange}
                pickColor={pickColor}
              />
            </div>

            <div
              id="second-band"
              style={{
                opacity: `${state.second.name ? "100%" : "20%"}`,
              }}
            ></div>
          </div>

          {band && (
            <div style={{ width: "40px" }}>
              <div id="third-band-colors" style={{ display: "none" }}>
                <ThirdBand
                  colors={colors}
                  handleChange={handleChange}
                  pickColor={pickColor}
                />
              </div>

              <div
                id="third-band"
                style={{
                  opacity: `${state.third.name ? "100%" : "20%"}`,
                }}
              ></div>
            </div>
          )}

          <div style={{ width: "40px" }}>
            <div id="multiplay-band-colors" style={{ display: "none" }}>
              <MultiplierBand
                colors={colors}
                handleChange={handleChange}
                pickColor={pickColor}
              />
            </div>

            <div
              id="multiplay-band"
              style={{
                opacity: `${state.multiplier.name ? "100%" : "20%"}`,
              }}
            ></div>
          </div>
        </div>

        <div id="oval-right">
          <div id="tolerance-band-colors" style={{ display: "none" }}>
            <ToleranceBand
              colors={colors}
              handleChange={handleChange}
              pickColor={pickColor}
            />
          </div>

          <div
            id="tolerance-band"
            style={{
              opacity: `${state.tolerance.name ? "100%" : "20%"}`,
            }}
          ></div>
        </div>

        <div id="wire-right"></div>
      </div>
      <AppFooter />
    </>
  );
};

export default Resistor;
