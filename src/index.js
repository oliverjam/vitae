/** @jsx jsx */
import React from "react";
import ReactDOM from "react-dom";
import { Global, jsx } from "@emotion/core";
import snarkdown from "snarkdown";

import "./styles.css";

function App() {
  const [raw, setRaw] = React.useState("Test");
  const [parsed, setParsed] = React.useState("Test");
  const [editing, setEditing] = React.useState(false);
  const inputRef = React.useRef();
  React.useEffect(
    () => {
      if (editing) {
        inputRef.current.focus();
      }
    },
    [editing]
  );
  return (
    <>
      <Global
        styles={{
          "*": {
            margin: 0,
            boxSizing: "border-box"
          },
          "html, body, #root": {
            height: "100%"
          }
        }}
      />
      <div
        css={{
          position: "relative",
          height: "100%",
          padding: "1rem",
          backgroundColor: "hsl(220, 10%, 96%)"
        }}
      >
        {editing && (
          <textarea
            css={{
              position: "absolute",
              top: "1rem",
              left: "1rem",
              right: "1rem",
              bottom: "1rem",
              display: "block",
              width: "100%",
              height: "100%",
              padding: "1rem",
              border: 0,
              fontFamily: "inherit",
              fontSize: "inherit",
              backgroundColor: "white",
              "&:focus": {
                boxShadow: "0 0 0 0.25rem hsl(220, 50%, 60%)"
              },
              "&:disabled": {
                color: "inherit"
              }
            }}
            ref={inputRef}
            value={raw}
            onChange={event => setRaw(event.target.value)}
            disabled={!editing}
          />
        )}
        {!editing && <Markdown>{parsed}</Markdown>}
        <button
          css={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            fontSize: "1.5rem",
            background: "none",
            border: "none"
          }}
          onClick={() => {
            setEditing(prev => !prev);
            const html = snarkdown(raw);
            setParsed(html);
          }}
        >
          {editing ? "🔒" : "🔓"}
        </button>
      </div>
    </>
  );
}

function Markdown({ children }) {
  const [styles, setStyles] = React.useState({
    padding: "1rem",
    fontSize: 14,
    backgroundColor: "white"
  });
  return (
    <div
      css={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        right: "1rem",
        bottom: "1rem"
      }}
    >
      <div
        css={{
          height: "100%",
          ...styles
        }}
        dangerouslySetInnerHTML={{ __html: children }}
      />
      <input
        type="range"
        defaultValue="0"
        min="0"
        step="1"
        max="12"
        onChange={event => {
          const fz = parseInt(event.target.value, 10);
          console.log({ fz });
          setStyles(prev => {
            return {
              ...prev,
              fontSize: 14 + fz
            };
          });
        }}
      />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
