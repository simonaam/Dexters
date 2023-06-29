import "./Contact.css" 


export const Contact = () => {

    return(
        <div className="contact">

            <div className="ime">
                <h3>Ime</h3>
                <input></input>
            </div>
            
            <div className="prezime">
                <h3>Prezime</h3>
                <input></input>
            </div>
            <div className="tel">
                <h3>tel</h3>
                <input></input>
            </div>
            <div className="poruka">
                <h3>poruka</h3>
                <input></input>
            </div>
            <button className="send">Send</button>
        </div>
    )
}