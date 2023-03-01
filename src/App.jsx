import "./App.css";
import MapNode from "./components/MapNode";
import Button from "./components/Button";
import { useState } from "react";
import { nanoid } from "nanoid";
import { getStateFromLocalStorage , saveStateToLocalStorage } from "./utils";

function App() {
  const localStorageKey = "roadmapState";
  const [downloadLink, setDownloadLink] = useState("");
  const [roadmapState, setRoadmapState] = useState(() => {
    const localState = getStateFromLocalStorage(localStorageKey);
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

  function save() {
    saveStateToLocalStorage(localStorageKey, roadmapState);
  }


  function createBackup() {
    let json = JSON.stringify(roadmapState);
    let blob = new Blob([json], { type: "application/json" });
    let url = URL.createObjectURL(blob);
    let link = (
      <a download={"backup.json"} href={url}>
        Download backup.json
      </a>
    );
    setDownloadLink(link);
  }

  return (
    <div className="App">
      <Button onClick={save} text="save to localStorage" />
      <Button onClick={createBackup} text="save to JSON" />
      <br />
      {elems}
      <br />
      {downloadLink}
    </div>
  );
}

export default App;
