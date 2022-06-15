import { useState, useEffect } from "react";
import { Die } from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";
export function App() {
  const [dices, setDices] = useState(generateTenDices());
  const [tenzie, setTenzie] = useState(false);

  useEffect(() => {
    const heldDices = dices.filter((die) => die.isHeld === true);
    const isAllTheSame = heldDices.every(
      (die) => die.value === heldDices[0].value
    );
    const isAllHeld = dices.every((die) => die.isHeld === true);
    isAllHeld && isAllTheSame && setTenzie(true);
  }, [dices]);

  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }

  function generateNewDie() {
    return {
      value: getRandomNumber(),
      isHeld: false,
      id: nanoid(),
    };
  }
  function generateTenDices() {
    const dices = [];
    for (let number = 0; number < 10; number++) {
      dices.push(generateNewDie());
    }
    return dices;
  }

  function rollDice() {
    setDices((oldDice) =>
      oldDice.map((die) => {
        return die.isHeld ? die : generateNewDie();
      })
    );
  }

  function holdDice(id) {
    setDices((oldDice) =>
      oldDice.map((dice) => {
        return dice.id === id ? { ...dice, isHeld: !dice.isHeld } : dice;
      })
    );
  }

  function reset() {
    setDices(generateTenDices());
    setTenzie(false);
  }
  const dicesElements = dices.map((die) => (
    <Die
      key={die.id}
      id={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main className="app">
      {tenzie && <Confetti />}
      <div className="description">
        <h1>Tenzies</h1>
        <p>
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls
        </p>
      </div>
      <div className="dies-wrapper">{dicesElements}</div>
      <button
        onClick={() => (tenzie ? reset() : rollDice())}
        className="dice-button"
      >
        {tenzie ? "Restart the game" : "Roll"}
      </button>
    </main>
  );
}
