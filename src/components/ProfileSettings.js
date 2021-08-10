import React, {useEffect, useState} from "react";
import ReactModal from 'react-modal'
import {Button} from "react-bootstrap";
import {Form, Field} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import {
    fetchProfileDataRequest,
    hideSettings, updateAvatarRequest,
    updateNameRequest,
    updatePasswordRequest
} from "../redux/profileSettings/actionCreator";

const ProfileSettings = ({isShowSettings}) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const operatorEmail = useSelector((state) => state.auth.email)
    const operatorPassword = useSelector((state) => state.auth.password)
    const profileData = useSelector((state) => state.profileSettings.profileData)
    const isAuthorized = useSelector((state) => state.auth.successful)
    const isProfileUpdated = useSelector((state) => state.profileSettings.isProfileUpdated)

    const [avatarIcon, setAvatarIcon] = useState("https://diora.pro/assets/img/staff/kontakt.jpg")
    const [avatarUrl, setAvatarUrl] = useState('')

    const operatorID = window.btoa(operatorEmail)

    const handleHideSettings = event => {
        dispatch(hideSettings())
    }

    const onSubmit = (values) => {
        const name = values.name
        const password = values.password
        if (name) {
            dispatch(updateNameRequest({id: operatorID, name}))
        }
        if (password) {
            dispatch(updatePasswordRequest({id: operatorID, newPassword: password, oldPassword: operatorPassword}))
        }
        if (avatarUrl) {
            dispatch(updateAvatarRequest({id: operatorID, avatar: avatarUrl}))
        }
    }

    const handleChangeUrl = event => {
        setAvatarUrl(event.target.value)
    }

    const handleChangeAvatar = event => {
        setAvatarIcon(avatarUrl)
    }

    useEffect(() => {
        dispatch(fetchProfileDataRequest(operatorID))
    }, [])

    useEffect(() => {
        if (profileData.data) {
            if (profileData.data.avatar)
                setAvatarIcon(profileData.data.avatar)
        }
    }, [profileData])

    useEffect(() => {
        if (isProfileUpdated) {
            alert("Профиль успешно обновлен.")
        }
        if (profileData.data) {
            if (profileData.data.avatar) {
                setAvatarIcon(profileData.data.avatar)
            }
        }
        handleHideSettings()
    }, [isProfileUpdated])

    useEffect(() => {
        if (!isAuthorized) {
            history.push('/')
        }
    }, [isAuthorized])

    return (
        <ReactModal
            isOpen={isShowSettings}
            contentLabel={"Настройки диалогов"}
            portalClassName={"ReactModalPortal"}
        >
            <h2>Настройки профиля</h2>
            <Form onSubmit={onSubmit}
                  validate={values => {
                      const errors = {}
                      if (values.password !== values.passwordConfirm) {
                          errors.passwordConfirm = 'Пароли не совпадают'
                      }
                      if (values.password && values.password.length < 6) {
                          errors.password = "Пароль должен содержать не менее 6 символов"
                      }
                      return errors
                  }}
                  render={({form, handleSubmit, submitting, pristine, values}) => (
                      <form onSubmit={handleSubmit}>
                          <Field name="name">
                              {({input, meta}) => (
                                  <div>
                                      <p>Ваше имя: <span>{profileData.data.name}</span></p>
                                      <label>Изменить имя: </label>
                                      <input
                                          {...input}
                                          type="text"
                                      />
                                  </div>
                              )}
                          </Field>
                          <Field name="avatar">
                              {({input, meta}) => (
                                  <div>
                                      <label>Аватар: </label>
                                      <img alt="avatar"
                                           src={avatarIcon}
                                           style={{
                                               height: "80px",
                                               width: "80px",
                                               objectFit: "cover",
                                               borderRadius: "50%"
                                           }}/>
                                      <br/>
                                      <label>Новый аватар: </label>
                                      <input
                                          {...input}
                                          type="url"
                                          value={avatarUrl}
                                          onChange={handleChangeUrl}
                                      />
                                      <button type="button" onClick={handleChangeAvatar}>Загрузить новый</button>
                                  </div>
                              )}
                          </Field>
                          <h3>Изменить пароль</h3>
                          <Field name="oldPassword">
                              {({input, meta}) => (
                                  <div>
                                      <label>Старый пароль: </label>
                                      <input
                                          {...input}
                                          type="password"
                                      />
                                  </div>
                              )}
                          </Field>
                          <Field name="password">
                              {({input, meta}) => (
                                  <div>
                                      <label>Пароль: </label>
                                      <input
                                          {...input}
                                          type="password"
                                      />
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>
                          <Field name="passwordConfirm">
                              {({input, meta}) => (
                                  <div>
                                      <label>Подтверждение пароля: </label>
                                      <input
                                          {...input}
                                          type="password"
                                      />
                                      {meta.error && meta.touched && <span>{meta.error}</span>}
                                  </div>
                              )}
                          </Field>
                          <button type="submit">Обновить профиль</button>
                          <button type="button" onClick={form.reset}>Очистить форму</button>
                      </form>
                  )}/>
            <Button onClick={handleHideSettings} style={{marginTop: "50px"}}>Закрыть</Button>
        </ReactModal>
    )
}

export {ProfileSettings}
