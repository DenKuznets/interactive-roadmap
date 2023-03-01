import "./App.css";
import MapNode from "./components/MapNode";
import Button from "./components/Button";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {

  const [downloadLink, setDownloadLink] = useState('');
  const [mapNodesState, setMapNodesState] = useState(() => [{
    text: "lalala",
    id: nanoid(),
    connections: [],
  }]);

  const elems = mapNodesState.map(elem => <MapNode mapNodeObj={elem} onChange={onTextAreaTextChange} key={elem.id} />);


  function onTextAreaTextChange(e) {
    setMapNodesState(prev => {
      return prev.map(elem => {
        return {
          ...elem,
          text: e.target.value,
        }
      })
    })
  }

  function saveToLocalStorage() {
    // найти все textfield
    const textFields = document.querySelectorAll("textarea");
    // считать текст из них
    for (let tf of textFields) {
      let text = tf.value;
      localStorage.setItem('textfieldId1', text);
      console.log(localStorage.getItem("textfieldId1"));
    }
  }

  function createBackup() {
    
  }

  function saveToJSON() {
    // найти все textfield
    const textFields = document.querySelectorAll("textarea");
    
    // считать текст из них
    for (let tf of textFields) {
      let userText = tf.value;
      let obj = {
        text: userText,
      }
      let json = JSON.stringify(obj);
      let blob = new Blob([json], { type: 'application/json' });
      let url = URL.createObjectURL(blob);
      let link = (
        <a download={"backup.json"} href={url}>
          Download backup.json
        </a>
      );
      console.log(downloadLink);
      setDownloadLink(link);
    }
  }


  return (
    <div className="App">
      <Button onClick={saveToLocalStorage} text="save to localStorage" />
      <Button onClick={saveToJSON} text="save to JSON" />
      <br />
      {elems}
      <br />
      {downloadLink}
    </div>
  );
}

export default App;
