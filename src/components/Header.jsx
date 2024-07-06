import '../styles/header.css';

export default function Header({score,best}){
    return(
        <div className="header">
            <h2 className="title">The Memory Game</h2>
            <div className="scoreboard">
                <p className="desc">Get points by clicking on an image but don't click on any more than once!</p>
                <p className="current">Current Score: {score}</p>
                <p className="best">Best Score: {best}</p>
            </div>
        </div>
    );
}