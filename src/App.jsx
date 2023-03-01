import "./App.css";
import Textfield from "./components/Textfield";
import Button from "./components/Button";

function App() {
  function saveToLocalStorage() {
    // найти все textfield
    const textFields = document.querySelectorAll("textarea");
    // считать текст из них
    for (let tf of textFields) {
      localStorage.setItem('textfieldId1', tf.value);
      console.log(localStorage.getItem("textfieldId1"));
    }
  }

  function saveToJSON() {
    
  }

  return (
    <div className="App">
      <Button onClick={saveToLocalStorage} text="save to localStorage" />
      <Button onClick={saveToLocalStorage} text="save to JSON" />
      <br />
      <Textfield />
    </div>
  );
}

export default App;
