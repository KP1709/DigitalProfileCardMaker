import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy, faDownload, faOtter, faDog, faFish, faDragon, faSpider, faDove, faHippo } from "@fortawesome/free-solid-svg-icons";
import styles from "../styles/CardMaker.module.css";
import ColourControl from "./ColourControl.jsx";
import useCardImage from "../hooks/useCardImage.js";

const CardMaker = () => {
    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        image: "",
        role: "",
        location: "",
        icon: ""
    });

    const [colourCustomise, setColourCustomise] = useState({
        headerBgColour: "#ffffff",
        cardBgColour: "#ffffff",
        imageBorderColour: "#ffffff"
    });
    const { cardRef, copyImage, downloadImage, isBusy, status } = useCardImage();

    const loadFile = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setUserData(prevData => ({
            ...prevData,
            image: URL.createObjectURL(file)
        }));
    };

    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const displayIcon = () => {
        switch (userData.icon) {
            case "otter": return faOtter;
            case "dog": return faDog;
            case "fish": return faFish;
            case "dragon": return faDragon;
            case "spider": return faSpider;
            case "hippo": return faHippo;
            case "dove": return faDove;
            default: return "";
        }
    };

    return (
        <main className={styles.layout}>
            {/* Form section */}
            <form className={styles.form}>
                <h2 className={styles.sectionTitle}>Profile details</h2>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="firstName">First Name</label>
                    <input
                        id="firstName"
                        type="text"
                        className={styles.input}
                        placeholder="John"
                        value={userData.firstName}
                        name="firstName"
                        onChange={handleChange} />
                </div>
                <div className={styles.field}>
                    <label className={styles.label} htmlFor="lastName">Last Name</label>
                    <input
                        id="lastName"
                        type="text"
                        className={styles.input}
                        placeholder="Doe"
                        value={userData.lastName}
                        name="lastName"
                        onChange={handleChange} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="location">Location</label>
                    <input
                        id="location"
                        type="text"
                        className={styles.input}
                        placeholder="London, United Kingdom"
                        value={userData.location}
                        name="location"
                        onChange={handleChange} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="image">Upload Headshot Image</label>
                    <input
                        id="image"
                        type="file"
                        name="image"
                        className={`${styles.input} ${styles.fileInput}`}
                        accept="image/png, image/jpeg"
                        onChange={loadFile} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="role">Current Role</label>
                    <input
                        id="role"
                        type="text"
                        className={styles.input}
                        placeholder="Engineer at X"
                        value={userData.role}
                        name="role"
                        onChange={handleChange} />
                </div>

                <div className={styles.field}>
                    <label className={styles.label} htmlFor="icon">Icon</label>
                    <select
                        id="icon"
                        value={userData.icon}
                        onChange={handleChange}
                        className={styles.input}
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

                <section className={styles.colourSection} aria-label="Card colours">
                    <h3 className={styles.groupTitle}>Card colours</h3>
                    <ColourControl
                        id="cardBgColour"
                        label="Card Background Colour"
                        value={colourCustomise.cardBgColour}
                        onChange={(value) => setColourCustomise(prevData => ({ ...prevData, cardBgColour: value }))}
                    />
                    <ColourControl
                        id="headerBgColour"
                        label="Header Background Colour"
                        value={colourCustomise.headerBgColour}
                        onChange={(value) => setColourCustomise(prevData => ({ ...prevData, headerBgColour: value }))}
                    />
                    <ColourControl
                        id="imageBorderColour"
                        label="Image Border Colour"
                        value={colourCustomise.imageBorderColour}
                        onChange={(value) => setColourCustomise(prevData => ({ ...prevData, imageBorderColour: value }))}
                    />
                </section>
            </form>

            {/* Output section */}
            <section className={styles.output}>
                <h2 className={styles.sectionTitle}>Profile Card Output</h2>
                <div className={styles.card} ref={cardRef}>
                    <div className={styles.cardHeader} style={{ backgroundColor: colourCustomise.headerBgColour }}>
                        {userData.image != '' && <img src={userData.image} className={styles.portrait} alt="Profile Picture" style={{ borderColor: colourCustomise.imageBorderColour }} />}
                    </div>

                    <div className={styles.cardBody} style={{ backgroundColor: colourCustomise.cardBgColour }}>
                        <span className={`${styles.cardText} ${styles.cardName}`}>{userData.firstName} {userData.lastName}</span>
                        <span className={`${styles.cardText} ${styles.cardLocation}`}>{userData.location}</span>
                        <p className={`${styles.cardText} ${styles.cardRole}`}>{userData.role}</p>
                        {userData.icon !== "" && <FontAwesomeIcon className={styles.cardIcon} icon={displayIcon()} size="1x" />}
                    </div>
                </div>
                <div className={styles.exportActions}>
                    <button type="button" onClick={downloadImage} disabled={isBusy}>
                        <FontAwesomeIcon icon={faDownload} aria-hidden="true" />
                        Download PNG
                    </button>
                    <button type="button" onClick={copyImage} disabled={isBusy}>
                        <FontAwesomeIcon icon={faCopy} aria-hidden="true" />
                        Copy photo
                    </button>
                </div>
                <p className={styles.exportStatus} role="status" aria-live="polite">
                    {status}
                </p>
            </section>
        </main>
    );
};

export default CardMaker;
