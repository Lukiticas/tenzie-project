export function Score({ turns, holds }) {
  const score = Math.ceil((holds * 10) / (turns + 1));
  return (
    <div className="score-wrapper">
      <span>
        score: <div className="score-points">{score}</div> turns:
        <div className="score-points">{turns}</div>
      </span>
    </div>
  );
}
