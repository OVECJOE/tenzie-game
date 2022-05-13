import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import Confetti from 'react-confetti';

export default function Main() {
    const generateDie = () => {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid(16)
        }
    }

    const generateDice = () => {
        const dice = []

        for (let i = 0; i < 10; i++) {
            dice.push(generateDie())
        }
        return dice;
    }

    const [dice, setDice] = React.useState(generateDice());
    const [tenzies, setTenzies] = React.useState(false);

    React.useEffect(() => {
        const expectedValue = dice[0].value;
        const flag = dice.every(
            die => die.isHeld && die.value === expectedValue);
        flag && setTenzies(true);
    }, [dice])

    function toggleDieState(id) {
        setDice(prevDice => {
            return prevDice.map((die) => {
                return die.id === id ?
                    { ...die, isHeld: !die.isHeld } :
                    die
            })
        })
    }

    const diceElements = dice.map((dieObj) => {
        return <Die key={dieObj.id}
            {...dieObj}
            toggle={() => toggleDieState(dieObj.id)}
        />
    })

    function rollDice() {
        if (tenzies) {
            setTenzies(false);
            setDice(generateDice());
        } else {
            setDice((prevDice) => {
                return prevDice.map((die) => {
                    return die.isHeld ? die :
                        generateDie()
                })
            })
        }
    }

    return (
        <main>
            {tenzies && <Confetti />}
            <div className='game-info'>
                <h1>Tenzies</h1>
                <p>
                    Roll until all dice are the same. Click each
                    die to freeze it at its current value between
                    rolls.
                </p>
            </div>
            <div className="dice-collection">
                {diceElements}
            </div>
            <button type="button" className='roll-btn' onClick={rollDice}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}