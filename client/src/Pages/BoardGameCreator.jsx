import { useNavigate } from "react-router-dom";
import BoardGameForm from "../Components/BoardGameForm"

const BoardGameCreator = () => {
    const navigate = useNavigate();

    const createBoardGame = (boardGame) => {
        fetch("/api/boardGames/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(boardGame)
        });
        navigate("/");
    };

    const handleCancel = () => {
        navigate("/");
    }

    return (
        <BoardGameForm onSave={createBoardGame} onCancel={handleCancel}/>
    )
};

export default BoardGameCreator;