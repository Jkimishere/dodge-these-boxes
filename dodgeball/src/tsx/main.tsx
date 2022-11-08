import React, { useEffect, useState, useRef, RefObject } from 'react';
import 'D:/___WebDev/Real projects/dodge balls/dodgeball/dodgeball/src/App.css';
import playerImg from  'D:/___WebDev/Real projects/dodge balls/dodgeball/dodgeball/src/img/bigFaceThick.png';
export const MainUI = () => {
    let playButton:HTMLElement;
    let game:HTMLElement;
    const [isPlaying, setIsPlaying] = useState(false);
    const [playerPos, setPlayerPos] = useState(50);
    const [invis, setInvis] = useState(2);
    const score = useRef<HTMLDivElement>(null);
    const one = useRef<HTMLDivElement>(null)!;
    const two = useRef<HTMLDivElement>(null)!;
    const three = useRef<HTMLDivElement>(null)!;
    const four = useRef<HTMLDivElement>(null)!;
    const five = useRef<HTMLDivElement>(null)!;
    const player = useRef<HTMLDivElement>(null)!;
    let boxes:React.RefObject<HTMLDivElement>[] = [];
    let points:number = 0;
    useEffect (() => {
        playButton = document.getElementById("play-button") as HTMLElement;
        game = document.getElementById("game") as HTMLElement;
        boxes = [one,two,three,four,five]
    });
    useEffect(() => {
    }, [isPlaying]);
    const clickPlayButton = ()=>{
        playButton.classList.add('clicked');
        setTimeout(()=>{
            setIsPlaying(true);
            setTimeout(() => {
                changeInvis();
            }, 1200);
        },1000);
    };
    return(
    <div className="App">
        {!isPlaying &&
        <div>
            <h1>Dodge These Boxes</h1>
            <h2>Avoid all the boxes coming to hit you.</h2>
            <h3>Click to move right.</h3>
            <button className="play-button" id = "play-button" onClick={clickPlayButton}>Play!</button>
        </div>
        }
        {isPlaying &&
        <div>
            <div className= 'game' id = "game" onClick={moveRight}>
                <h1 ref = {score} className = "score">0</h1>
                <div className = 'player' ref = {player}>
                    <img src = {playerImg}></img>
                </div>
                <div className = 'box one' id = "one" ref = {one}></div>
                <div className = 'box two' id = "two" ref = {two}></div>
                <div className = 'box three invis' id = "three" ref = {three}></div>
                <div className = 'box four' id = "four" ref = {four}></div>
                <div className = 'box five'  id = "five" ref = {five}></div>
            </div>
        </div>
        }
    </div>
    );
    function moveRight(){
        if (playerPos < 70){
            document.documentElement.style.setProperty('--player', playerPos + 10 + '%')
            setPlayerPos(playerPos + 10)
        }
        else if(playerPos === 70){
            document.documentElement.style.setProperty('--player', 30 + '%')
            setPlayerPos(30)
        }
    }
    function changeInvis(){
        points++;
        score.current!.innerText = String(points);
        setTimeout(() => {
            touchPlayerCheck();
        }, 1170);
        setTimeout(() => {
            changeInvis();
        }, 1200);
        removeAll();
        addTo();
    }
    function removeAll(){
        boxes.forEach(
            element => element.current?.classList.remove('invis')
        )
    }
    function addTo(){
        let rand = Math.random() * 5;
        rand = Math.floor(rand);
        boxes[rand].current?.classList.add('invis');
        setInvis(rand);
    }
    function touchPlayerCheck(){
        const playerRect:DOMRect = player.current!.getBoundingClientRect();
        boxes.forEach(element => {
            const elementRect:DOMRect = element.current!.getBoundingClientRect();
            if(!element.current?.classList.contains('invis') && playerRect.left === elementRect.left){
                alert('You Lost! Your final score is ' + points);
                window.location.reload();
            }
        });
        let temp = false;
        
    }
    function switchPlayer(){
        switch (invis) {
            case 0:
                if(playerPos === 30){
                    return true;
                }
                else{
                    return false;
                }
            case 1:
                if(playerPos === 40){
                    return true;
                }
                else{
                    return false;
                }
            case 2:
                if(playerPos === 50){
                    return true;
                }
                else{
                    return false;
                }
            case 3:
                if(playerPos === 60){
                    return true;
                }
                else{
                    return false;
                }
            case 4:
                if(playerPos === 70){
                    return true;
                }
                else{
                    return false;
                }
            default:
                return false;
        }
    }

}
