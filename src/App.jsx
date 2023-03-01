import "./App.css";
import Textfield from "./components/Textfield";
import Button from "./components/Button";
import { useState } from "react";
import { nanoid } from "nanoid";

function App() {

  const [downloadLink, setDownloadLink] = useState('');

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
      let a = document.createElement('a');
      a.download = 'backup.json';
      a.href = url;
      a.textContent = 'Download backup.json';
      let link = (
        <a download={"backup.json"} href={url}>
          Download backup.json
        </a>
      );
      setDownloadLink(link);
      // console.log(a);
      console.log(downloadLink);
    }
  }

  return (
    <div className="App">
      <Button onClick={saveToLocalStorage} text="save to localStorage" />
      <Button onClick={saveToJSON} text="save to JSON" />
      <br />
      <Textfield />
      <br />
      {downloadLink}
    </div>
  );
}

export default App;
