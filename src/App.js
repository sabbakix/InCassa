import MyComponent from "./MyComponent";
import { useState } from "react";
import "./styles.css";

export default function App() {
  /* create message variable */
  const [message, setMessage] = useState("");
  const people = [
    { name: "Stefy", age: 39, pets: [{ name: "mimi" }, { name: "tony" }] },
    { name: "Lor", age: 65, pets: [{ name: "youyou" }, { name: "maxi" }] }
  ];

  //jsx
  return (
    <div className="App">
      <h1>Test</h1>
      {/** show message */}
      <p>{message}</p>

      <MyComponent />

      {people.map((person) => (
        <div key={person.name}>
          <h2>{person.name}</h2>
          {person.pets.map((pet) => (
            <span>{pet.name} &nbsp;</span>
          ))}
        </div>
      ))}
    </div>
  );
}
