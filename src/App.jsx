import "./App.css";
import MapNode from "./components/MapNode";
import Button from "./components/Button";
import { useState } from "react";
import { nanoid } from "nanoid";
import { _ } from "lodash";

function App() {
  const [downloadLink, setDownloadLink] = useState("");
  const [roadmapState, setRoadmapState] = useState(() => [
    {
      text: "lalala",
      id: nanoid(),
      connections: [],
    },
  ]);

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

  function saveToLocalStorage() {
    let json = JSON.stringify(roadmapState);
    localStorage.setItem("roadmapState", json);
    if (
      _.isEqual(JSON.parse(localStorage.getItem("roadmapState")), roadmapState)
    )
      console.log("saved to localStorage");
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
      <Button onClick={saveToLocalStorage} text="save to localStorage" />
      <Button onClick={createBackup} text="save to JSON" />
      <br />
      {elems}
      <br />
      {downloadLink}
    </div>
  );
}

export default App;
