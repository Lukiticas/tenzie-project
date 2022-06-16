export function Die({ id, value, isHeld, holdDice }) {
  const style = {
    backgroundColor: isHeld ? "#59E391" : "#ffff",
  };

  return (
    <div style={style} onClick={holdDice} className="die-square">
      <div className="dots">{"•".repeat(value)}</div>
    </div>
  );
}
