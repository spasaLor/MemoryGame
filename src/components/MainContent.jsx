import { useEffect, useState } from "react";
import Card from "./Card";
import '../styles/mainContent.css';

function shuffleList(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

export default function MainContent({score,best,setScore,setBest}){
    const init=["ditto","pikachu","bulbasaur","squirtle","charmander","eevee","flareon","vaporeon","jolteon","mew","raichu","charmeleon"]
    const url= 'https://pokeapi.co/api/v2/pokemon/';
    const [cardInfo,setCardInfo]=useState([]);
    const [isGameOver,setIsGameOver]=useState(false);

    const fetchData = async () => {
        const list = await Promise.all(
            init.map(async (item) => {
                const response = await fetch(url + item);
                const info = await response.json();
                return { name: info.name, imgLink: info.sprites.front_default, clicked: false };
            })
        );
        return list;
    };

    useEffect(()=>{
        const getCards = async ()=>{
            const cards=await fetchData();
            setCardInfo(cards);
        }
        getCards();
    },[]);

    const resetGame = () => {
        setIsGameOver(false);
        setScore(0);
        const resetCards = cardInfo.map(card => ({ ...card, clicked: false }));
        const shuffledResetCards = shuffleList(resetCards);
        setCardInfo(shuffledResetCards);
    };

    const updateScores = ()=>{
        setScore((prev)=>{
        const newScore = prev + 1;
        if (newScore > best) {
            setBest(newScore);
        }
        return newScore;
    });
};

    const onCardClick = (index) =>{        
        if (!isGameOver){
            updateScores();
        }
        setCardInfo((prevCardInfo) => {
            const clickedCard = prevCardInfo[index];

            if(clickedCard.clicked){
                setIsGameOver(true);
                return prevCardInfo;
            }
            else{
                const updated = prevCardInfo.map((card, i) => {
                    if (index === i) {
                        return { ...card, clicked: true };
                    }
                    return card;
                });
                const shuffled = shuffleList(updated);                
                return shuffled;
            }
        });
    };

    return(
        <>
        {isGameOver ?
        <div className="game-over-modal">
            <div className="content">
                <p>You clicked twice on the same card!</p>
                <p>Your final score is: {score}</p>
                <button type="button" onClick={resetGame}>Restart</button>
            </div>
        </div>: null}
        <div className="card-container"> 
            {cardInfo.map((item,index)=>{
                return <Card key={index} link={item.imgLink} name={item.name} onClick={()=>onCardClick(index)}/>
            })}
        </div>
        </>
    );
}