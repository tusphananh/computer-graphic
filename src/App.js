import "./App.css";
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styles from "./style.module.css";
const unityContext = new UnityContext({
  loaderUrl: "./web/Build/web.loader.js",
  dataUrl: "./web/Build/web.data",
  frameworkUrl: "./web/Build/web.framework.js",
  codeUrl: "./web/Build/web.wasm",
});

function App() {
  function MoveForward() {
    unityContext.send("Character", "moveForward");
  }
  return (
    <div className={styles["container"]}>
      <div className={styles["background"]}></div>
      <div className={styles["content"]}>
        <GameController />
        <div className={styles["game-layout"]}>
          <p className={styles["happy-coding"]}>Happy Coding</p>
          <Unity
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

  
  return (
    <div className={styles["game-controller"]}>
      <div className={styles["editor-container"]}>
        <textarea
          className={styles["editor-area"]}
          onChange={(e) => {
            setEditorValue(e.target.value);
          }}
        >
          {editorValue}
        </textarea>
        <div className={styles["preview"]}></div>
      </div>
    </div>
  );
};

export default App;
