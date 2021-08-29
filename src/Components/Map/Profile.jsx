import React, { useState, useEffect } from "react";
import InputMask from 'react-input-mask';
import { MCIcon } from 'loft-taxi-mui-theme';
import logo from "../../assets/loft-small-icon.svg";
import classNames from "classnames";
import logoChip from "../../assets/chip-logo.svg";
import { getCardData, setCardData } from "../../middleware/api";
import { useHistory } from "react-router-dom";

const Profile = () => {
    const [initials, setInitials] = useState(""),
          [cardnum, setCardnum] = useState(""),
          [cardterm, setCardterm] = useState(""),
          [cvc, setCvc] = useState(""),
          [cardnumInfo, setCardnumInfo] = useState(""),
          [view, setView] = useState("FORM"),
          history = useHistory();

    function handleChangeField(field) {
        switch(field) {
            case "initials":
                setInitials(window.event.target.value);
                break;
            case "cardnum":
                setCardnum(window.event.target.value);
                let cardNumFormat = formatCurdNum(window.event.target.value);
                setCardnumInfo(cardNumFormat);
                break;
            case "cardterm":
                setCardterm(window.event.target.value);
                break;
            case "cvc":
                setCvc(window.event.target.value);
                break;
        }
    }

    function formatCurdNum(value) {
        let cardNumFormat = value.replace(/\D/g, "");
        cardNumFormat = cardNumFormat.split("");
        cardNumFormat = cardNumFormat.map( (item, index) => {
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
            cardNumber : cardnum,
            expiryDate : cardterm,
            cardName : initials,
            cvc
        };
        const success = await setCardData(payload);
        if (success) {
            setView("SAVED");
        }
    }

    useEffect( async () => {
        const card = await getCardData();
        if (card) { 
            setInitials(card.cardName);
            setCardnum(card.cardNumber);
            setCardterm(card.expiryDate);
            setCvc(card.cvc);
            setCardnumInfo(formatCurdNum(card.cardNumber));
            return;
        }
    }, []);

    const btnClass = classNames({
        "loft__form-button loft__form-button-expanded" : cardterm.length < 4 || cardnum.length < 16 || initials.length === 0 || cvc.length < 3,
        "loft__form-button-filled loft__form-button-expanded" : cardterm.length == 4 || cardnum.length == 16 || initials.length > 0 || cvc.length === 3
    });

    return(
        <>
            <section id = "profile__container">
                {
                    {
                        FORM : <><h2><b>Профиль</b></h2>
                            <p className = "hint">Введите платежные данные</p>
                            <div>
                                <form id = "profile-form">
                                    <input type = "text" name = "initials" id = "initials" data-testid = "initials" className = "loft__form-input" 
                                    value = { initials } onChange = { () => { handleChangeField("initials") } } onFocus = { resetError }/>
                                    <label htmlFor = "initials">Имя Владельца <sup>&#10057;</sup></label>
                                    <InputMask mask = "9999 9999 9999 9999" type = "text" name = "cardnum" id = "cardnum" data-testid = "cardnum" className = "loft__form-input" 
                                    value = { cardnum } onChange = { () => { handleChangeField("cardnum") } } onFocus = { resetError }/>
                                    <label htmlFor = "cardnum">Номер карты <sup>&#10057;</sup></label>
                                    <div id = "cvc_container">
                                        <div>
                                            <InputMask mask = "99/99" type = "text" name = "cardterm" id = "cardterm" data-testid = "cardterm" className = "loft__form-input" 
                                            value = { cardterm } onChange = { () => { handleChangeField("cardterm") } } onFocus = { resetError }/>
                                            <label htmlFor = "cardterm" className = "short-label">MM/YY <sup>&#10057;</sup></label>
                                        </div>
                                        <div>
                                            <InputMask mask = "999" type = "cvc" name = "cvc" id = "cvc" data-testid = "cvc" className = "loft__form-input" 
                                            value = { cvc } onChange = { () => { handleChangeField("cvc") } } onFocus = { resetError }/>
                                            <label htmlFor = "cvc" className = "short-label">CVC <sup>&#10057;</sup></label>
                                        </div>
                                    </div>
                                </form>
                                <div id = "card_container">
                                    <div>
                                        <img src = { logo } alt = "Logotip was not loaded" data-testid = "logo"/>
                                        <p>{ cardterm }</p>
                                    </div>
                                    <div>
                                        <pre>{ cardnumInfo }</pre>
                                    </div>
                                    <div>
                                        <img src = { logoChip } alt = "Logotip was not loaded" data-testid = "logo"/>
                                        <MCIcon />
                                    </div>
                                </div>
                            </div>
                            <button className = { btnClass } type = "button" data-testid = "reg-button" disabled = { (btnClass === "loft__form-button loft__form-button-expanded") ? true : false } 
                            onClick = { setCard }>Сохранить</button></>,
                        SAVED : <><h2><b>Профиль</b></h2>
                                <p className = "hint">Платёжные данные обновлены. Теперь вы можете заказывать такси.</p>
                                <button className = "loft__form-button-filled loft__form-button-expanded" type = "button" onClick = { () => { history.push("/map"); } }>Перейти на карту</button></>
                    }[view]
                }
            </section>
        </>
    );
}

// export const ProfileWithAuth = connect(
//     null,
//     { logOut }
// )(Profile);
export default Profile;