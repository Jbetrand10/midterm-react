import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import './GuessingGame.css';


function GuessingGame() {

    const [usersguess, setUsersGuess] = useState("");
    const [luckyNumber, setLuckyNumber] = useState(null);
    const [guessesCount, setGuessesCount] = useState(null);
    const [hint, setHint] = useState('Start Guessing');


        useEffect(() => {
         

            if (luckyNumber === null) {
                setLuckyNumber(JSON.parse(localStorage.getItem("randomNum")) || randomLuckyNumber());
            }

            if (guessesCount === null) {
                setGuessesCount(JSON.parse(localStorage.getItem("numberOfGuesses")) || 0);
            }
        }, []);

    function handleChange(event) {
        event.preventDefault()
        setUsersGuess(event.target.value);
    }

    function handleSubmitGuess(e) {
        e.preventDefault();
        setGuessesCount(guessesCount + 1);
        localStorage.setItem("numberOfGuesses", guessesCount)

        let parsedNum = parseInt(usersguess)

        if(usersguess === "") {
            setHint("Please Enter Your Guess!")
        }
        else if(luckyNumber === parsedNum) {
            setHint("Congrats, You win! Come down an get your price!")
        }
        else if (luckyNumber < parsedNum) {
            setHint('Your guess is too High!')
        }
          else{
            setHint("Your guess is too Low!")
        }
    };

    function randomLuckyNumber() {
        let number = Math.floor(Math.random() * 100);
        localStorage.setItem("randomNum", JSON.stringify(number));
        console.log(number);
        return number;
    };

    function resetGame() {
        setGuessesCount(null);
        setLuckyNumber(null);
        setHint('Lets Play Again!');
       localStorage.removeItem("numberOfGuesses");
       localStorage.removeItem("randomNum");
    };

    return (
        <div className="GuessingGame">
            <h4 style={{textAlign: "center"}}>I am thinking of a number between 1 and 100. Guess the Lucky Number!</h4> 
            <p style={{textAlign: "center"}}>You have made {guessesCount} guesses</p>
            <Form>
                <Form.Group className="mb-3" style={{textAlign: "center"}}>
                    <Form.Control type="text" placeholder="Enter Here" style={{width: "400px", margin: "20px auto"}} value={usersguess} onChange={handleChange} name= "usersguess" />
                    <Button type="submit" onClick={handleSubmitGuess}>Guess</Button>
                    <br></br>
                    <br></br>
                    <Button class="btn btn-danger" onClick={resetGame}>Reset</Button>
                </Form.Group>
            </Form>
            <h3 classroom="mb-3" style={{textAlign: "center"}}>{hint}</h3>
            <footer className="Footer">
                © Copyright 2022 Jbetrand @ Digital Innovation Studios LLC - All Rights Reserved. <br></br>
                    <a href="https://github.com/Jbetrand10" style={{color: "rgb(44, 49, 54)"}}>Github Portfolio</a>
            </footer>
        </div>
    )
}

export default GuessingGame