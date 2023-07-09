import { useNavigate } from "react-router-dom"

type buttonType = {
    join ?: boolean,
}

function GetStartedButton({join} : buttonType){
    const navigate = useNavigate()

    return(
        <button className="getStarted" onClick={()=>{navigate("/signup")}} >{join ? "Join Chatter" : "Get Started"}</button>
    )
}

export default GetStartedButton