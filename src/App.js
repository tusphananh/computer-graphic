import "./App.css";
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styles from "./style.module.scss";
import AceEditor from "react-ace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";

import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";

const unityContext = new UnityContext({
  loaderUrl: "./web/Build/web.loader.js",
  dataUrl: "./web/Build/web.data",
  frameworkUrl: "./web/Build/web.framework.js",
  codeUrl: "./web/Build/web.wasm",
});

function moveForward() {
  unityContext.send("Character", "moveForward");
}

function App() {
  return (
    <div className={styles["container"]}>
      <div className={styles["background"]}></div>
      <div className={styles["content"]}>
        <GameController />
        <div className={styles["game-layout"]}>
          <p className={styles["happy-coding"]}>Happy Coding</p>
          <Unity
            doNotCaptureKeyboard={true}
            className={styles["game-container"]}
            unityContext={unityContext}
          />
        </div>
      </div>
    </div>
  );
}

const GameController = () => {
  const [editorValue, setEditorValue] = React.useState("");

  function onChange(newValue) {
    setEditorValue(newValue);
  }

  function onRun() {

    moveForward();
    try {
      console.log(editorValue);
      eval(editorValue);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className={styles["game-controller"]}>
      <div className={styles["game-controller__header"]}>
        <p className={styles["game-controller-header__title"]}>
          Game Controller
        </p>
        <button className={styles["game-controller__run-btn"]} onClick={onRun}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      <div className={styles["lesson-container"]}></div>
      <div className={styles["editor-container"]}>
        <AceEditor
          placeholder="Type your code here"
          mode="javascript"
          theme="monokai"
          className={styles["ace-editor"]}
          onChange={onChange}
          value={editorValue}
          name="ace-editor"
          editorProps={{ $blockScrolling: true }}
          height="100%"
          width="100%"
          highlightActiveLine={false}
          showGutter={false}
          showPrintMargin={false}
        />
      </div>
    </div>
  );
};

export default App;
