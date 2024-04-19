import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faOtter, faDog, faFish, faDragon, faSpider, faDove, faHippo } from "@fortawesome/free-solid-svg-icons";

// import { toPng } from 'html-to-image'; // Does not support divs/ sections


export default function CardMaker() {
    // Store user text to put on card
    const [userData, setUserData] = React.useState({
        firstName: "",
        lastName: "",
        image: "",
        role: "",
        location: "",
        icon: ""
    })

    // Create URL for image for it to be displayed
    function loadFile(event) {
        var image = document.getElementById('business__card-image');
        image.src = URL.createObjectURL(event.target.files[0]);
    };

    // 'Listens' for change in user input
    function HandleChange(event) {
        const { name, value } = event.target
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }))
    }

    // Change icon colour
    // Style components including card
    window.addEventListener("load", startup, false);

    function startup() {
        let headerStyle = document.getElementById("headerBgColour")
        headerStyle.addEventListener("input", UpdateCardHeader, false);

        let backgroundStyle = document.getElementById("cardBgColour")
        backgroundStyle.addEventListener("input", UpdateCardBody, false);

        let imageBorderStyle = document.getElementById("imageBorderColour")
        imageBorderStyle.addEventListener("input", UpdateImageBorderColour, false)
    }

    function UpdateCardHeader(event) {
        const cardHeader = document.getElementById("business__card-header");
        if (cardHeader) {
            cardHeader.style.backgroundColor = event.target.value;
        }
    }

    function UpdateCardBody(event) {
        const cardBody = document.getElementById("business__card")
        if (cardBody) {
            cardBody.style.backgroundColor = event.target.value;
        }
    }

    function UpdateImageBorderColour(event) {
        const imageBorder = document.getElementById("business__card-image")
        if (imageBorder) {
            imageBorder.style.border = `thick solid ${event.target.value}`
        }
    }

    return (
        <main className="col">
            {/* Form section */}
            <section className="form">
                <div id="firstNameLastNameEntry"className="col">
                    <div className="col">
                        <label htmlFor="firstName">First Name</label>
                        <input
                            id="firstName"
                            type="text"
                            className="form__input"
                            placeholder="John"
                            value={userData.firstName}
                            name="firstName"
                            onChange={HandleChange} />
                    </div>
                    <div className="col">
                        <label htmlFor="lastName">Last Name</label>
                        <input
                            id="lastName"
                            type="text"
                            className="form__input"
                            placeholder="Doe"
                            value={userData.lastName}
                            name="lastName"
                            onChange={HandleChange} />
                    </div>
                </div>

                <div className="col">
                    <label htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        className="form__input"
                        placeholder="London, United Kingdom"
                        value={userData.location}
                        name="location"
                        onChange={HandleChange} />
                </div>

                <div className="col">
                    <label htmlFor="image">Upload Headshot Image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        className="form__input-image"
                        accept="image/png, image/jpeg"
                        onChange={loadFile} />
                </div>

                <div className="col">
                    <label htmlFor="role">Current Role</label>
                    <input
                        id="role"
                        type="text"
                        className="form__input"
                        placeholder="Engineer at X"
                        value={userData.role}
                        name="role"
                        onChange={HandleChange} />
                </div>

                <div className="col">
                    <label htmlFor="icon">Icon</label>
                    <select id="icon"
                        value={userData.icon}
                        onChange={HandleChange}
                        className="form__input-dropdown"
                        name="icon">
                        <option value="">--</option>
                        <option value="otter">Otter</option>
                        <option value="dog">Dog</option>
                        <option value="hippo">Hippo</option>
                        <option value="fish">Fish</option>
                        <option value="dove">Dove</option>
                        <option value="dragon">Dragon</option>
                        <option value="spider">Spider</option>
                    </select>
                </div>

                <div id="colourSelection" className="col">
                    <div className="col">
                        <label htmlFor="cardBgColour">Card Background Colour</label>
                        <input
                            id="cardBgColour"
                            type="color"
                            className="form__input-colour"
                            name="cardBgColour" />
                    </div>
                    <div className="col">
                        <label htmlFor="headerBgColour">Header Background Colour</label>
                        <input
                            id="headerBgColour"
                            type="color"
                            className="form__input-colour"
                            name="headerBgColour" />
                    </div>

                    <div className="col">
                        <label htmlFor="imageBorderColour">Image Border Colour</label>
                        <input
                            id="imageBorderColour"
                            type="color"
                            className="form__input-colour"
                            name="imageBorderColour" />
                    </div>

                </div>
            </section>

            {/* Output section */}
            <section className="col">
                <h2 id="outputTitle">Profile Card Output</h2>
                <div className="col" id="business__card">
                    <div id="business__card-header" className="col">
                        <img src={userData.image} id="business__card-image" />
                    </div>

                    <div id="business__card-body" className="col">
                        <h2 className="business__card-text" id="cardName">{userData.firstName} {userData.lastName}</h2>
                        <h3 className="business__card-text" id="cardLocation">{userData.location}</h3>
                        <p className="business__card-text" id="cardRole">{userData.role}</p>
                        {userData.icon === "otter" && <FontAwesomeIcon icon={faOtter} size="2x"/>}
                        {userData.icon === "dog" && <FontAwesomeIcon icon={faDog} size="2x" />}
                        {userData.icon === "fish" && <FontAwesomeIcon icon={faFish} size="2x" />}
                        {userData.icon === "dragon" && <FontAwesomeIcon icon={faDragon} size="2x" />}
                        {userData.icon === "spider" && <FontAwesomeIcon icon={faSpider} size="2x" />}
                        {userData.icon === "hippo" && <FontAwesomeIcon icon={faHippo} size="2x" />}
                        {userData.icon === "dove" && <FontAwesomeIcon icon={faDove} size="2x" />}
                    </div>
                </div>
            </section>
        </main>

    )
}