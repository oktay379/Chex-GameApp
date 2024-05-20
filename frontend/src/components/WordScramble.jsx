import React, { useState, useEffect, useContext } from "react";
import Timer from "./Timer";
import { FaStar } from "react-icons/fa";
import { PiArrowCounterClockwiseBold } from "react-icons/pi";
import { userContext } from "../App";
import { useTranslation } from "react-i18next";

const WordScramble = () => {
    const { beeWords } = useContext(userContext);
    const { i18n } = useTranslation();

    const wordsArray = Object.values(beeWords);

    const [isPlayOn, setIsPlayOn] = useState(false);
    const [inputValue, setInputValue] = useState("");
    const [correctWord, setCorrectWord] = useState("");
    const [scrambledWord, setScrambledWord] = useState("");
    const [message, setMessage] = useState("");
    const [timer, setTimer] = useState(60);
    const [score, setScore] = useState(0);
    const [over, setOver] = useState(false);
    const [words, setWords] = useState(0);

    const handleInputChange = (event) => {
        setInputValue(event.target.value.toUpperCase());
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleButtonClick();
        }
    };

    const selectWord = () => {
        const randomIndex = Math.floor(Math.random() * wordsArray.length);
        return wordsArray[randomIndex].toUpperCase();
    };

    const handleButtonClick = () => {
        if (inputValue !== "") {
            if (correctWord === inputValue) {
                setMessage("Correct Answer");
                setScore((prevScore) => prevScore + correctWord.length);
                setTimer((prevTimer) => prevTimer + 15);
                const newWord = selectWord();
                setCorrectWord(newWord);
                setScrambledWord(constructScrambledWord(newWord));
                setInputValue("");
                setWords((prevWords) => prevWords + 1)
            } else {
                setMessage("Wrong Answer");
            }
        } else {
            setMessage("Enter Value");
        }
    };

    const handleStartGame = () => {
        setIsPlayOn(true);
        setInputValue("");
        setMessage("");
        setScore(0);
        setTimer(10);
        setOver(false);

        const word = selectWord();
        setCorrectWord(word);
        setScrambledWord(constructScrambledWord(word));
    };

    const constructScrambledWord = (word) => {
        let shuffledArray = word.split("");
        const extraLetters = ["F", "G", "R"];
        shuffledArray = [...shuffledArray, ...extraLetters];
        
        for (let i = shuffledArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
        }
        return shuffledArray.join("");
    };

    useEffect(() => {
        let clearMessage;
        if (message) {
            clearMessage = setTimeout(() => setMessage(""), 500);
        }

        return () => {
            if (clearMessage) {
                clearTimeout(clearMessage);
            }
        };
    }, [message]);

    useEffect(() => {
        if (timer === 0) {
            setOver(true);
            setIsPlayOn(false);
        }
    }, [timer]);

    return (
        <>
            <div className="fixed top-4 right-4 mt-20 bg-gray-800 text-white p-20 rounded-lg shadow-lg flex items-center justify-center">
                <Timer timer={timer} setTimer={setTimer} isPlayOn={isPlayOn} />
            </div>

            {over && (
                <div style={{marginTop:"5rem"}} className="fixed top-4 left-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg flex flex-col items-center justify-center">

                    <div className="flex">
                        <PiArrowCounterClockwiseBold color="yellow" size={20}/>
                        <p className="ml-3">Total Number of Known Words: {words}</p>
                    </div>
                    <div className="flex">
                        <FaStar color="yellow" size={20}/>
                        <p className="ml-3">Total Score: {score}</p>
                    </div>
                </div>
            )}

            <div className="min-h-screen bg-gray-900 flex flex-col items-center justify-center text-white">
                <div className="flex items-center justify-center gap-10">
                    <img
                        className="mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
                        src="https://www.montgomeryschoolsmd.org/contentassets/bba1b4cf3da947b4a152ce2ec8132a66/spelling-bee.png"
                        alt="bee"
                    />
                    <img
                        className="mb-5 h-40 w-40 rounded-md shadow-lg hover:shadow-2xl transform hover:scale-105 transition duration-300"
                        src="https://media.licdn.com/dms/image/D4D0BAQFP06KIT9w-HQ/company-logo_200_200/0/1702301357329/chexplease_logo?e=2147483647&v=beta&t=Lo1cywqBHwlSUTUG2ui5VCFv-MeRQlBgjQttkr5R22k"
                        alt="chex"
                    />
                </div>
                {message && (
                    <div className={`${message === "Wrong Answer" || message === "Enter Value" ? "bg-red-600" : "bg-green-600"} text-white p-4 rounded-md shadow-lg mb-4`}>
                        <p>{message}</p>
                    </div>
                )}
                <h1 className="text-4xl mb-8">Spelling Bee</h1>
                <div className="w-full max-w-md p-8 bg-gray-800 rounded-lg shadow-lg">
                    {isPlayOn ? (
                        <>
                            <div className="flex justify-center mb-4 space-x-2">
                                {correctWord.split("").map((el, i) => (
                                    <span
                                        key={i}
                                        className="bg-gray-700 w-12 h-16 flex items-center justify-center text-2xl font-bold rounded-md"
                                    >
                                        {inputValue[i] || "_"}
                                    </span>
                                ))}
                            </div>
                            <p className="text-center text-2xl mb-4 tracking-widest">
                                {scrambledWord}
                            </p>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    className="flex-1 p-2 rounded-md text-black"
                                    onChange={handleInputChange}
                                    onKeyDown={handleKeyDown}
                                    value={inputValue}
                                />
                                <button
                                    type="button"
                                    className="p-2 bg-blue-500 rounded-md text-white font-bold hover:bg-blue-700"
                                    onClick={handleButtonClick}
                                >
                                    Enter
                                </button>
                            </div>
                        </>
                    ) : ( <>
                        <button
                            className="w-full p-2 bg-green-500 rounded-md text-white font-bold hover:bg-green-700"
                            type="button"
                            onClick={handleStartGame}
                        >
                            Start Game
                        </button>
                        <button
                            className="w-full mt-5 p-2 bg-yellow-500 rounded-md text-white font-bold hover:bg-yellow-700"
                            type="button"
                            onClick={() => i18n.changeLanguage('tr')}
                        >
                            TR
                        </button>
                        <button
                            className="w-full mt-5 p-2 bg-yellow-500 rounded-md text-white font-bold hover:bg-yellow-700"
                            type="button"
                            onClick={() => i18n.changeLanguage('en')}
                        >
                            EN
                        </button>
                        <div className="bg-gradient-to-r from-yellow-400 via-orange-500 to-red-500 mt-4 rounded-lg text-white font-bold w-full p-4 shadow-2xl transform hover:scale-105 transition duration-300 ease-in-out text-center flex items-center justify-center gap-5">
                            <span> Current Language: {i18n.language}</span>
                        </div>
                    </>
                    )}

                    {isPlayOn && (
                        <button
                            className="mt-4 w-full p-2 bg-yellow-500 rounded-md text-white font-bold hover:bg-yellow-700"
                            type="button"
                            onClick={handleStartGame}
                        >
                            New Game
                        </button>
                    )}
                </div>
                {isPlayOn && (
                    <div className="fixed bottom-4 right-4 bg-gray-800 text-white p-4 rounded-lg shadow-lg">
                        <p>Score: {score}</p>
                    </div>
                )}
            </div>
        </>
    );
};

export default WordScramble;
