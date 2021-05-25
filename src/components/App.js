import React, { useState, useEffect  } from 'react';

/*
 *  TODO LISTA:
 * Bestämma vilka komponenter vi ska ha?
 *  - färgknappskomponent (4st)
 *  - Körknappskomponent
 *  - Räknare
 * Hur spelet ska implementeras? 
 *  - en lista med vad man ska trycka
 *  - en lista med vad man tryckt
 *  - poäng = längden på listan man ska trycka
 *  - kör = lägg till i ska listan, låt användaren trycka
 *  - färg == sträng "blue", "green", "red", "yellow"
 */


function App() {

    const [challengeButtons, setChallengeButtons] = useState([]);
    const [pressedButtons, setPressedButtons] = useState([]);

    const colorButtonOnClick = (color) => {
        setPressedButtons([...pressedButtons, color]);
    }

    useEffect(() => {
        setChallengeButtons([...challengeButtons, "blue"]);

    }, [pressedButtons]);

    useEffect(() => {
        pressedButtons.forEach((pressedColor, index) => {
            const corButtonThatShouldHaveBeenPressed = challengeButtons[index];
            if (corButtonThatShouldHaveBeenPressed != pressedColor) {
                alert(`Game Over, du fick ${pressedButtons.length-1}`);
                window.location.reload();
            }
        });

    }, [challengeButtons]);

    return (
        <div>
            <h1>Simon Says!</h1>
            <ColorButton color={"blue"} onClick={colorButtonOnClick}/>
            <ColorButton color={"green"} onClick={colorButtonOnClick}/>
            <ColorButton color={"red"} onClick={colorButtonOnClick}/>
            <ColorButton color={"yellow"} onClick={colorButtonOnClick}/>
            <Status pressedButtons={pressedButtons} challengeButtons={challengeButtons} />
        </div>
    );
}

const ColorButton = (props) => {
    return(
        <div>
            <button style={{backgroundColor: `${props.color}`}} className="color_button" onClick={() => props.onClick(props.color)} >
            {props.color}
            </button>
        </div>
    );

}

const Status = (props) => {
    return(
        <div>
            Mål:
            <ul>
            {props.challengeButtons.map(color => <li>{color}</li>)}
            </ul>
            Tryckta:
            <ul>
            {props.pressedButtons.map(color => <li>{color}</li>)}
            </ul>
            <p>Poäng: {props.pressedButtons.length}</p>
        </div>
    );

}

export default App;