const BoardGameForm = ({onSave}) => {

    const onSubmit = (event) => {
        event.preventDefault();
        const formData = new FormData(event.target);
        const entries = [...formData.entries()];

        const boardGame = entries.reduce((acc, entry) => {
            const [k, v] = entry;
            acc[k] = v;
            return acc;
        }, {});

        return onSave(boardGame);
    }

    return (
        <form onSubmit={onSubmit}>
            <div className="control">
                <label htmlFor="name">Name:</label>
                <input
                    name="name"
                    id="name"
                />
            </div>

            <div className="control">
                <label htmlFor="maxPlayers">Number of maximum players:</label>
                <input
                    name="maxPlayers"
                    id="maxPlayers"
                />
            </div>

            <div className="buttons">
                <button type="submit">Create board game</button>
            </div>
        </form>

    )
};

export default BoardGameForm;