import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { MCIcon } from 'loft-taxi-mui-theme';
import logo from "../../assets/loft-small-icon.svg";
import classNames from "classnames";
import logoChip from "../../assets/chip-logo.svg";
import { setCardData } from "../../api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { getCard } from "../../store/actions";

const Profile = (props) => {
    const [initials, setInitialsValue] = useState(""),
        [cardnum, setCardnumValue] = useState(""),
        [cardterm, setCardtermValue] = useState(""),
        [cvc, setCvcValue] = useState(""),
        [cardnumInfo, setCardnumInfoValue] = useState(""),
        [view, setView] = useState("FORM"),
        history = useHistory();

    function handleChangeField(field) {
        switch (field) {
            case "initials":
                setInitialsValue(window.event.target.value);
                break;
            case "cardnum":
                setCardnumValue(window.event.target.value);
                let cardNumFormat = formatCardNum(window.event.target.value);
                setCardnumInfoValue(cardNumFormat);
                break;
            case "cardterm":
                setCardtermValue(window.event.target.value);
                break;
            case "cvc":
                setCvcValue(window.event.target.value);
                break;
        }
    }

    function formatCardNum(value) {
        let cardNumFormat = value.replace(/\D/g, "");
        cardNumFormat = cardNumFormat.split("");
        cardNumFormat = cardNumFormat.map((item, index) => {
            return (index % 4 === 3 && index !== 15) ? `${item}  ` : item;
        });
        return cardNumFormat.join("");
    }

    function resetError(event) {
        const input = document.querySelector(`#${event.target.name}`);
        input.style.setProperty("border-color", "black");
    }

    async function setCard() {
        const payload = {
            cardNumber: cardnum,
            expiryDate: cardterm,
            cardName: initials,
            cvc: cvc
        };
        const success = await setCardData(payload);
        if (success) {
            setView("SAVED");
        }
    }

    useEffect(async () => {
        props.getCard();
        setInitialsValue(props.initials);
        setCardnumValue(props.cardnum);
        setCardtermValue(props.cardterm);
        setCvcValue(props.cvc);
        setCardnumInfoValue(formatCardNum(props.cardnum));
        return;
    }, [props.initials, props.cardnum, props.cardterm, props.cvc]);

    const btnClass = classNames({
        "loft__form-button loft__form-button-expanded": cardterm.length < 4 || cardnum.length < 16 || initials.length === 0 || cvc.length < 3,
        "loft__form-button-filled loft__form-button-expanded": cardterm.length == 4 || cardnum.length == 16 || initials.length > 0 || cvc.length === 3
    });

    return (
        <>
            <section id="profile__container">
                {
                    {
                        FORM: <><h2><b>Профиль</b></h2>
                            <p className="hint">Введите платежные данные</p>
                            <div>
                                <form id="profile-form">
                                    <input type="text" name="initials" id="initials" data-testid="initials" className="loft__form-input"
                                        value={initials} onChange={() => { handleChangeField("initials") }} onFocus={resetError} />
                                    <label htmlFor="initials">Имя Владельца <sup>&#10057;</sup></label>
                                    <InputMask mask="9999 9999 9999 9999" type="text" name="cardnum" id="cardnum" data-testid="cardnum" className="loft__form-input"
                                        value={cardnum} onChange={() => { handleChangeField("cardnum") }} onFocus={resetError} />
                                    <label htmlFor="cardnum">Номер карты <sup>&#10057;</sup></label>
                                    <div id="cvc_container">
                                        <div>
                                            <InputMask mask="99/99" type="text" name="cardterm" id="cardterm" data-testid="cardterm" className="loft__form-input"
                                                value={cardterm} onChange={() => { handleChangeField("cardterm") }} onFocus={resetError} />
                                            <label htmlFor="cardterm" className="short-label">MM/YY <sup>&#10057;</sup></label>
                                        </div>
                                        <div>
                                            <InputMask mask="999" type="cvc" name="cvc" id="cvc" data-testid="cvc" className="loft__form-input"
                                                value={cvc} onChange={() => { handleChangeField("cvc") }} onFocus={resetError} />
                                            <label htmlFor="cvc" className="short-label">CVC <sup>&#10057;</sup></label>
                                        </div>
                                    </div>
                                </form>
                                <div id="card_container">
                                    <div>
                                        <img src={logo} alt="Logotip was not loaded" data-testid="logo" />
                                        <p>{cardterm}</p>
                                    </div>
                                    <div>
                                        <pre data-testid = "cardnumInfo">{cardnumInfo}</pre>
                                    </div>
                                    <div>
                                        <img src={logoChip} alt="Logotip was not loaded" data-testid="logo" />
                                        <MCIcon />
                                    </div>
                                </div>
                            </div>
                            <button className={btnClass} type="button" data-testid="reg-button" disabled={(btnClass === "loft__form-button loft__form-button-expanded") ? true : false}
                                onClick={setCard}>Сохранить</button></>,
                        SAVED: <><h2><b>Профиль</b></h2>
                            <p className="hint">Платёжные данные обновлены. Теперь вы можете заказывать такси.</p>
                            <button className="loft__form-button-filled loft__form-button-expanded" type="button" onClick={() => { history.push("/map"); }}>Перейти на карту</button></>
                    }[view]
                }
            </section>
        </>
    );
}

export const ProfileWithAuth = connect(
    (state) => ({
        initials: state.profile.initials,
        cardnum: state.profile.cardnum,
        cardterm: state.profile.cardterm,
        cvc: state.profile.cvc
    }),
    { getCard }
)(Profile);
export default Profile;