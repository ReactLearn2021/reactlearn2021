import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { MCIcon } from 'loft-taxi-mui-theme';
import logo from "../../assets/loft-small-icon.svg";
import logoChip from "../../assets/chip-logo.svg";
import { setCardData } from "../../api";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import { GET_CARD } from "../../store/actions";
import classNames from "classnames";
import propTypes from "prop-types";

const Profile = ({getCard, initials, cardnum, cardterm, cvc}) => {
    const [userInitials, setInitialsValue] = useState(""),
        [userCardnum, setCardnumValue] = useState(""),
        [userCardterm, setCardtermValue] = useState(""),
        [userCvc, setCvcValue] = useState(""),
        [cardnumInfo, setCardnumInfoValue] = useState(""),
        [view, setView] = useState("FORM"),
        history = useHistory();

    function handleChangeField(field) {
        switch (field) {
            case "userInitials":
                setInitialsValue(window.event.target.value);
                break;
            case "userCardnum":
                setCardnumValue(window.event.target.value);
                let cardNumFormat = formatCardNum(window.event.target.value);
                setCardnumInfoValue(cardNumFormat);
                break;
            case "userCardterm":
                setCardtermValue(window.event.target.value);
                break;
            case "userCvc":
                setCvcValue(window.event.target.value);
                break;
        }
    }

    function formatCardNum(value) {
        if (!value) return;
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

    function setCard() {
        const payload = {
            cardNumber: userCardnum,
            expiryDate: userCardterm,
            cardName: userInitials,
            cvc: userCvc
        };
        const success = setCardData(payload);
        if (success) {
            setView("SAVED");
        }
    }

    useEffect( () => {
        getCard();
        setInitialsValue(initials);
        setCardnumValue(cardnum);
        setCardtermValue(cardterm);
        setCvcValue(cvc);
        setCardnumInfoValue(formatCardNum(cardnum));
        return;
    }, [initials, cardnum, cardterm, cvc]);

    const btnClass = classNames({
        "loft__form-button loft__form-button-expanded": !userCardterm || userCardterm.length < 4 || !userCardnum || userCardnum.length < 16
        || !userInitials || userInitials.length === 0 || !userCvc || userCvc.length < 3,
        "loft__form-button-filled loft__form-button-expanded": (userCardterm && userCardterm.length == 4) || (userCardnum && userCardnum.length == 16) 
        || (userInitials && userInitials.length > 0) || (userCvc && userCvc.length === 3)
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
                                    <input type="text" name="userInitials" id="userInitials" data-testid="initials" className="loft__form-input"
                                        value={ userInitials } onChange={() => { handleChangeField("userInitials") }} onFocus={resetError} />
                                    <label htmlFor="userInitials">Имя Владельца <sup>&#10057;</sup></label>
                                    <InputMask mask="9999 9999 9999 9999" type="text" name="userCardnum" id="userCardnum" data-testid="cardnum" className="loft__form-input"
                                        value={ userCardnum } onChange={() => { handleChangeField("userCardnum") }} onFocus={resetError} />
                                    <label htmlFor="userCardnum">Номер карты <sup>&#10057;</sup></label>
                                    <div id="cvc_container">
                                        <div>
                                            <InputMask mask="99/99" type="text" name="userCardterm" id="userCardterm" data-testid="cardterm" className="loft__form-input"
                                                value={ userCardterm } onChange={() => { handleChangeField("userCardterm") }} onFocus={resetError} />
                                            <label htmlFor="userCardterm" className="short-label">MM/YY <sup>&#10057;</sup></label>
                                        </div>
                                        <div>
                                            <InputMask mask="999" type="text" name="userCvc" id="userCvc" data-testid="cvc" className="loft__form-input"
                                                value={ userCvc } onChange={() => { handleChangeField("userCvc") }} onFocus={resetError} />
                                            <label htmlFor="userCvc" className="short-label">CVC <sup>&#10057;</sup></label>
                                        </div>
                                    </div>
                                </form>
                                <div id="card_container">
                                    <div>
                                        <img src={logo} alt="Logotip was not loaded" data-testid="logo" />
                                        <p>{ userCardterm }</p>
                                    </div>
                                    <div>
                                        <pre data-testid = "cardnumInfo">{cardnumInfo}</pre>
                                    </div>
                                    <div>
                                        <img src={ logoChip } alt="Logotip was not loaded" data-testid="logo" />
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

Profile.propTypes = {
    getCard : propTypes.func,
    initials : propTypes.string,
    cardnum : propTypes.string,
    cardterm : propTypes.string,
    cvc : propTypes.string
};

export const ProfileWithAuth = connect(
    (state) => ({
        initials: state.profile.initials,
        cardnum: state.profile.cardnum,
        cardterm: state.profile.cardterm,
        cvc: state.profile.cvc
    }),
    { getCard : GET_CARD }
)(Profile);
export default Profile;