// src/MyApp.jsx
import React, { useState } from "react";
import Table from "./Table";
import Form from "./Form";

function MyApp() {
  const [characters, setCharacters] = useState([]);

  // remove the character at the index from the button clicked
  function removeOneCharacter(index) {
    // filter the array to remove the character at the index given
    const updated = characters.filter((character, i) => {
      return i !== index;
    });
    // update the array to the new array
    setCharacters(updated);
  }

  // add the current form information to the characters array
  function updateList(person) {
    setCharacters([...characters, person]);
  }

  return (
    <div className="container">
      <Table characterData={characters} removeCharacter={removeOneCharacter} />
      <Form handleSubmit={updateList}/>
    </div>
  );
}

export default MyApp;
