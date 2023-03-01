import { _ } from "lodash";

// type = localStorage / sessionStorage
function storageAvailable(type) {
  try {
    let storage = window[type],
      x = "__storage_test__";
    storage.setItem(x, x);
    storage.removeItem(x);
    return true;
  } catch (e) {
    return false;
  }
}

export function getStateFromLocalStorage(localStorageKey) {
  if (storageAvailable("localStorage")) {
    const json = localStorage.getItem(localStorageKey);
    const localState = JSON.parse(json);
    return localState;
  } else {
    console.log("local storage is not available");
  }
}

export function saveStateToLocalStorage(localStorageKey, state) {
  if (storageAvailable) {
    let json = JSON.stringify(state);
    localStorage.setItem(localStorageKey, json);
    if (_.isEqual(JSON.parse(localStorage.getItem(localStorageKey)), state))
      console.log("saved to localStorage");
  } else {
    console.log('local storage is not available');
  }
}

export function createBackupLink(state) {
  let json = JSON.stringify(state);
  let blob = new Blob([json], { type: "application/json" });
  let url = URL.createObjectURL(blob);
  let link = (
    <a download={"backup.json"} href={url}>
      Download backup.json
    </a>
  );
  return link;
}
