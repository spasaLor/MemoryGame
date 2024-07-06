import '../styles/card.css';

export default function Card({link,name, onClick,clicked, setClicked}){
    return(
        <div className="card" onClick={onClick}>
            <img src={link} alt="" />
            <p className="name">{name}</p>
        </div>
    );
}