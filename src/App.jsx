import "./App.css";
import MapNode from "./components/MapNode";
import Button from "./components/Button";
import { useState } from "react";
import { nanoid } from "nanoid";
import { getStateFromLocalStorage, saveStateToLocalStorage, createBackupLink } from "./utils";

function App() {
  const localStorageKey = "roadmapState";
  const [downloadLink, setDownloadLink] = useState("");
  const [roadmapState, setRoadmapState] = useState(() => {
    const localState = getStateFromLocalStorage(localStorageKey);
    // при загрузке страницы, проверяем есть ли сохраненные данные, если нет, создаем новый roadmap с одним объектом
    return (
      localState || [
        {
          text: "",
          id: nanoid(),
          connections: [],
        },
      ]
    );
  });

  const elems = roadmapState.map((elem) => (
    <MapNode mapNodeObj={elem} onChange={onTextAreaTextChange} key={elem.id} />
  ));

  function onTextAreaTextChange(e) {
    setRoadmapState((prev) => {
      return prev.map((elem) => {
        return {
          ...elem,
          text: e.target.value,
        };
      });
    });
  } 

  return (
    <div className="App">
      <Button
        onClick={() => saveStateToLocalStorage(localStorageKey, roadmapState)}
        text="save to localStorage"
      />
      <Button onClick={() => setDownloadLink(createBackupLink(roadmapState))} text="save to JSON" />
      <br />
      {elems}
      <br />
      {downloadLink}
    </div>
  );
}

export default App;
