/** @jsx jsx */
import React from "react";
import ReactDOM from "react-dom";
import { Global, jsx } from "@emotion/core";
import snarkdown from "snarkdown";

const INPUT_RESET = {
  border: 0,
  fontSize: "inherit",
  fontFamily: "inherit",
  color: "inherit",
  background: "none",
};

function App() {
  const [raw, setRaw] = React.useState("Test");
  const [parsed, setParsed] = React.useState("Test");
  const [editing, setEditing] = React.useState(false);
  const [styles, setStyles] = React.useState({
    padding: "1rem",
    fontSize: "1rem",
    backgroundColor: "white",
  });
  const inputRef = React.useRef();
  React.useEffect(() => {
    if (editing) {
      inputRef.current.focus();
    }
  }, [editing]);
  return (
    <>
      <Global
        styles={{
          "*": {
            margin: 0,
            boxSizing: "border-box",
          },
          "html, body, #root": {
            height: "100%",
          },
        }}
      />
      <div
        css={{
          position: "relative",
          height: "100%",
          padding: "1rem",
          backgroundColor: "hsl(220, 10%, 96%)",
        }}
      >
        {editing && (
          <textarea
            css={{
              ...INPUT_RESET,
              position: "absolute",
              top: "1rem",
              left: "1rem",
              right: "1rem",
              bottom: "1rem",
              display: "block",
              width: "100%",
              height: "100%",
              padding: "1rem",
              backgroundColor: "white",
              "&:focus": {
                boxShadow: "0 0 0 0.25rem hsl(220, 50%, 60%)",
              },
              "&:disabled": {
                color: "inherit",
              },
            }}
            ref={inputRef}
            value={raw}
            onChange={event => setRaw(event.target.value)}
            disabled={!editing}
          />
        )}
        {!editing && <Markdown styles={styles}>{parsed}</Markdown>}

        <div
          css={{
            position: "absolute",
            top: "1rem",
            right: "1rem",
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "0.5rem",
          }}
        >
          <StylePicker styles={styles} setStyles={setStyles} />
          <button
            css={{
              ...INPUT_RESET,

              fontSize: "1.5rem",
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
      </div>
    </>
  );
}

function Markdown({ styles, children }) {
  return (
    <div
      css={{
        position: "absolute",
        top: "1rem",
        left: "1rem",
        right: "1rem",
        bottom: "1rem",
      }}
    >
      <div
        css={{
          height: "100%",
          ...styles,
        }}
        dangerouslySetInnerHTML={{ __html: children }}
      />
    </div>
  );
}

function StylePicker({ styles, setStyles }) {
  const FAMILIES = {
    georgia: "Georgia, serif",
    system: "system-ui, -apple-system, BlinkMacSystemFont, Arial, sans-serif",
  };
  const [open, setOpen] = React.useState(false);
  const formRef = React.useRef();
  React.useState(() => {
    if (open && formRef.current) {
      formRef.current.focus();
    }
  }, [open]);
  return (
    <div css={{ position: "relative" }}>
      <button
        css={{ ...INPUT_RESET, textAlign: "right", fontSize: "1.5rem" }}
        onClick={() => setOpen(prev => !prev)}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label="Edit styles"
      >
        💄
      </button>
      {open && (
        <form
          ref={formRef}
          css={{
            position: "absolute",
            top: "2.25rem",
            right: 0,
            width: "max-content",
            padding: "1rem",
            boxShadow: "0 2px 4px hsla(220, 10%, 20%, 0.5)",
          }}
        >
          <label htmlFor="fontFamily">
            Font family
            <select
              id="fontFamily"
              value={styles.fontFamily}
              onChange={event => {
                const { value } = event.target;
                setStyles(prev => ({ ...prev, fontFamily: value }));
              }}
            >
              {Object.entries(FAMILIES).map(([name, css]) => (
                <option value={css}>{name}</option>
              ))}
            </select>
          </label>
          <fieldset css={{ border: 0, padding: 0 }}>
            <legend>Font size</legend>
            <label htmlFor="xs">
              ×0.75
              <input
                type="radio"
                id="xs"
                name="xs"
                value="0.75rem"
                checked={styles.fontSize === "0.75rem"}
                onChange={event => {
                  const { value } = event.target;
                  setStyles(prev => ({ ...prev, fontSize: value }));
                }}
              />
            </label>
            <label htmlFor="s">
              x1
              <input
                type="radio"
                id="s"
                name="s"
                value="1rem"
                checked={styles.fontSize === "1rem"}
                onChange={event => {
                  const { value } = event.target;
                  setStyles(prev => ({ ...prev, fontSize: value }));
                }}
              />
            </label>
            <label htmlFor="m">
              ×1.25
              <input
                type="radio"
                id="m"
                name="m"
                value="1.25rem"
                checked={styles.fontSize === "1.25rem"}
                onChange={event => {
                  const { value } = event.target;
                  setStyles(prev => ({ ...prev, fontSize: value }));
                }}
              />
            </label>
            <label htmlFor="l">
              ×1.5
              <input
                type="radio"
                id="l"
                name="l"
                value="1.5rem"
                checked={styles.fontSize === "1.5rem"}
                onChange={event => {
                  const { value } = event.target;
                  setStyles(prev => ({ ...prev, fontSize: value }));
                }}
              />
            </label>
            <label htmlFor="xl">
              ×1.75
              <input
                type="radio"
                id="xl"
                name="xl"
                value="1.75rem"
                checked={styles.fontSize === "1.75rem"}
                onChange={event => {
                  const { value } = event.target;
                  setStyles(prev => ({ ...prev, fontSize: value }));
                }}
              />
            </label>
          </fieldset>
        </form>
      )}
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
