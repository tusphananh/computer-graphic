import "./App.css";
import React from "react";
import Unity, { UnityContext } from "react-unity-webgl";
import styles from "./style.module.scss";
import AceEditor from "react-ace";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay, faSyncAlt } from "@fortawesome/free-solid-svg-icons";
import { motion, useAnimation } from "framer-motion";
import "ace-builds/src-noconflict/mode-javascript";
import "ace-builds/src-noconflict/theme-monokai";
import { Lesson } from "./Lesson";

const unityContext = new UnityContext({
  loaderUrl: "./web/Build/web.loader.js",
  dataUrl: "./web/Build/web.data",
  frameworkUrl: "./web/Build/web.framework.js",
  codeUrl: "./web/Build/web.wasm",
});

window.moveForward = async () => {
  unityContext.send("Character", "moveForward");
};
window.rotateLeft = async () => {
  unityContext.send("Character", "rotateLeft");
};
window.rotateRight = async () => {
  unityContext.send("Character", "rotateRight");
};

const resetGame = () => {
  unityContext.send("GameController", "loadCurScene");
};

const executeCode = (editorValue) => {
  try {
    eval(
      "try { " + editorValue + " } catch(err) { console.log(err.message); }"
    );
  } catch (error) {
    console.log(error);
  }
};

function App() {
  const [isVictory, setIsVictory] = React.useState(false);
  const [isScreenLoaded, setIsScreenLoaded] = React.useState(false);
  const [sceneIdx, setSceneIdx] = React.useState(0);
  const [progression, setProgression] = React.useState(0);
  const animationControls = useAnimation();
  const mainAnimationControls = useAnimation();

  const playTransition = () => {
    mainAnimationControls.start("mainShow");
    animationControls.start("show");
  };

  React.useEffect(function () {
    unityContext.on("GameOver", function (isVictory, isScreenLoaded, sceneIdx) {
      setIsVictory(isVictory === 1);
      setIsScreenLoaded(isScreenLoaded === 1);
      setSceneIdx(sceneIdx);
    });

    unityContext.on("progress", function (progression) {
      setProgression(progression);
    });
  }, []);
  React.useEffect(
    function () {
      isVictory && isScreenLoaded && playTransition();
    },
    [isVictory, isScreenLoaded]
  );

  return (
    <div className={styles["container"]}>
      <Transition
        animationControls={animationControls}
        mainAnimationControls={mainAnimationControls}
      />

      <div className={styles["background"]}></div>
      <div className={styles["content"]}>
        <GameController
          sceneIdx={sceneIdx}
          playTransition={() => {
            playTransition();
          }}
        />
        <div className={styles["game-layout"]}>
          <p className={styles["happy-coding"]}>Happy Coding</p>
          <div className={styles["game-container"]}>
            {progression < 1 && <ProgressPanel progression={progression} />}
            <Unity
              doNotCaptureKeyboard={true}
              className={styles["game"]}
              unityContext={unityContext}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const ProgressPanel = ({ progression }) => {
  return (
    //ClasName = "progress-bar blue stripes"
    <div className={styles["progress-panel"]}>
      <p>Loading {parseInt(progression * 100)}%</p>
      <div
        className={
          styles["progress-bar"] +
          " " +
          styles["blue"] +
          " " +
          styles["stripes"]
        }
      >
        <span style={{ width: progression * 100 + "%" }}></span>
      </div>
    </div>
  );
};

const Transition = ({ animationControls, mainAnimationControls }) => {
  const variants = {
    mainShow: {
      display: "block",
      width: ["0%", "110%", "110%", "110%", "110%", "110%", "110%", "0%"],
      transition: {
        duration: 4,
        ease: "easeInOut",
      },
      transitionEnd: {
        display: "none",
      },
    },
    show: {
      width: ["0vw", "0vw", "0vw", "20vw", "30vw", "300vw", "110vw", "0vw"],
      height: ["0vw", "0vw", "0vw", "20vw", "30vw", "300vw", "110vw", "0vw"],
      top: [
        "-0vw",
        "-0vw",
        "-0vw",
        "-10vw",
        "-30vw",
        "-50vw",
        "-30vw",
        "-10vw",
      ],
      left: [
        "-0vw",
        "-0vw",
        "-0vw",
        "-10vw",
        "-30vw",
        "-50vw",
        "-30vw",
        "-10vw",
      ],
      transition: {
        duration: 4,
        ease: "easeInOut",
      },
    },
  };
  return (
    <motion.div
      className={styles["transition"]}
      variants={variants}
      animate={mainAnimationControls}
    >
      <motion.div
        className={styles["transition__circle"]}
        animate={animationControls}
        variants={variants}
      ></motion.div>
    </motion.div>
  );
};
const GameController = ({ sceneIdx, playTransition }) => {
  const [editorValue, setEditorValue] = React.useState("");
  const [lessonValue, setLessonValue] = React.useState("");
  const [lessonTitle, setLessonTitle] = React.useState("");
  function onChange(newValue) {
    setEditorValue(newValue);
  }

  function onRun() {
    executeCode(editorValue);
  }
  function onReset() {
    resetGame();
    playTransition();
  }

  React.useEffect(
    function () {
      setLessonValue(Lesson[sceneIdx].content);
      setLessonTitle(Lesson[sceneIdx].title);
    },
    [sceneIdx]
  );
  return (
    <div className={styles["game-controller"]}>
      <div className={styles["game-controller__header"]}>
        <button
          className={styles["game-controller__reset-btn"]}
          onClick={onReset}
        >
          <FontAwesomeIcon icon={faSyncAlt} />
        </button>
        <p className={styles["game-controller-header__title"]}>{lessonTitle}</p>
        <button className={styles["game-controller__run-btn"]} onClick={onRun}>
          <FontAwesomeIcon icon={faPlay} />
        </button>
      </div>
      <div className={styles["lesson-container"]}>{lessonValue}</div>
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
