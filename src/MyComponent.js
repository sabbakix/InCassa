export default function MyComponent() {
  function handleclick() {
    alert("Cliccked");
  }

  //jsx
  return (
    <div className="alert" onClick={handleclick}>
      <span>myComponent</span>
    </div>
  );
}
