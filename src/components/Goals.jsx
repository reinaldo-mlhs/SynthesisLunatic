const Goals = ({ goals }) => {


    return (
        <div className="goal">
            <div>Achivements</div>
            <ul>
                {goals.map(goal => (
                    <li>
                        <span>{goal["goal"]}</span>&nbsp;
                        {goal["completed"] ?
                            <span>&#10003;</span>
                            :
                            <span>&#10007;</span>
                        }
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Goals;