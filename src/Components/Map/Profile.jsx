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
import { Formik, ErrorMessage, Form, Field } from "formik";

const templateDateMessage = `Введена 
некорректная дата`,
      templateCVCMessage = `Введен некорректный 
секретный код`;

const Profile = ({ getCard, initials, cardnum, cardterm, cvc }) => {
    const [userInitials, setInitialsValue] = useState(""),
        [userCardnum, setCardnumValue] = useState(""),
        [userCardterm, setCardtermValue] = useState(""),
        [userCvc, setCvcValue] = useState(""),
        [cardnumInfo, setCardnumInfoValue] = useState(""),
        [view, setView] = useState("FORM"),
        history = useHistory();

    function formatCardNum(value) {
        if (!value) return;
        let cardNumFormat = value.replace(/\D/g, "");
        cardNumFormat = cardNumFormat.split("");
        cardNumFormat = cardNumFormat.map((item, index) => {
            return (index % 4 === 3 && index !== 15) ? `${item}  ` : item;
        });
        return cardNumFormat.join("");
    }

    function setCard(values) {
        const payload = {
            cardNumber: values.userCardnum,
            expiryDate: values.userCardterm,
            cardName: values.userInitials,
            cvc: values.userCvc
        };
        const success = setCardData(payload);
        if (success) {
            setView("SAVED");
        }
    }

    useEffect( () => {
        if (getCard) {
            getCard();
        }
        setInitialsValue(initials);
        setCardnumValue(cardnum);
        setCardtermValue(cardterm);
        setCvcValue(cvc);
        setCardnumInfoValue(formatCardNum(cardnum));
        return;
    }, [initials, cardnum, cardterm, cvc]);

    return (
        <>
            <section id="profile__container">
                {
                    {
                        FORM: <><h2><b>Профиль</b></h2>
                            <p className="hint">Введите платежные данные</p>
                            <div>
                                <Formik onSubmit = { (values) => { return setCard(values) } }
                                enableReinitialize
                                initialValues = { { userInitials, userCardnum, userCardterm, userCvc } }
                                validate = { (values) => {
                                    const errors = {};

                                    if (values.userInitials.length < 1) {
                                        errors.userInitials = "Введены некорректные инициалы";
                                    }

                                    if (/_/.test(values.userCardnum) === true) {
                                        errors.userCardnum = "Введен некорректный номер карты";
                                    }

                                    if (/_/.test(values.userCardterm) === true) {
                                        errors.userCardterm = templateDateMessage;
                                    }

                                    if (/_/.test(values.userCvc) === true) {
                                        errors.userCvc = templateCVCMessage;
                                    }

                                    return errors;
                                } }
                                >{ ({ handleChange, handleBlur, values, errors }) => {
                                    const btnClass = classNames({
                                        "loft__form-button": Object.keys(errors).length > 0 || Object.values(values).some( (item) => item === ""),
                                        "loft__form-button-filled": !errors || Object.keys(errors).length === 0
                                    });

                                    return(
                                        <Form id = "profile-form">
                                            <Field type = "text" 
                                            name = "userInitials" 
                                            id = "userInitials" 
                                            data-testid = "initials" 
                                            className = "loft__form-input"
                                            autoComplete = "off" 
                                            onBlur = { handleBlur }
                                            onChange = { handleChange }
                                            value = { values.userInitials }/>
                                            <label htmlFor = "userInitials">Имя Владельца <sup>&#10057;</sup></label>
                                            <ErrorMessage name = "userInitials" id = "#error__initials" component = "p" className = "error-message" />
                                            <InputMask mask = "9999 9999 9999 9999" 
                                            type = "text" 
                                            name = "userCardnum" 
                                            id = "userCardnum" 
                                            data-testid = "cardnum" 
                                            className = "loft__form-input"
                                            autoComplete = "off" 
                                            onBlur = { handleBlur }
                                            onChange = { handleChange }
                                            value = { values.userCardnum } />
                                            <label htmlFor = "userCardnum">Номер карты <sup>&#10057;</sup></label>
                                            <ErrorMessage name = "userCardnum" id = "error__userCardNum" component = "p" className = "error-message" />
                                            <div id="cvc_container">
                                                <div>
                                                    <InputMask mask = "99/99" 
                                                    type = "text"
                                                    name = "userCardterm" 
                                                    id = "userCardterm" 
                                                    data-testid = "cardterm" 
                                                    className = "loft__form-input"
                                                    autoComplete = "off" 
                                                    onBlur = { handleBlur }
                                                    onChange = { handleChange }
                                                    value = { values.userCardterm } />
                                                    <label htmlFor = "userCardterm" className = "short-label">MM/YY <sup>&#10057;</sup></label>
                                                    <ErrorMessage name = "userCardterm" component = "pre" className = "error-message" />
                                                </div>
                                                <div>
                                                    <InputMask mask="999" 
                                                    type = "text" 
                                                    name = "userCvc" 
                                                    id="userCvc" 
                                                    data-testid = "cvc"
                                                    className = "loft__form-input"
                                                    autoComplete = "off" 
                                                    onBlur = { handleBlur }
                                                    onChange = { handleChange }
                                                    value = { values.userCvc }/>
                                                    <label htmlFor = "userCvc" className = "short-label">CVC <sup>&#10057;</sup></label>
                                                    <ErrorMessage name = "userCvc" component = "pre" className = "error-message" />
                                                </div>
                                            </div>                         
                                            <button className = {btnClass} 
                                            type = "submit" 
                                            data-testid = "reg-button" 
                                            disabled = {(btnClass === "loft__form-button loft__form-button-expanded") ? true : false}>Сохранить</button>
                                        </Form>
                                    );
                                }}
                                </Formik>
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
                            </div></>,
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