import React, {useEffect} from "react";
import ReactModal from 'react-modal'
import {Button} from "react-bootstrap";
import {Form, Field} from "react-final-form";
import {useDispatch, useSelector} from "react-redux";
import {
    fetchProfileDataRequest,
    hideSettings,
    updateNameRequest,
    updatePasswordRequest
} from "../redux/profileSettings/actionCreator";
import {useHistory} from "react-router-dom";

const ProfileSettings = (props) => {

    const dispatch = useDispatch()

    const history = useHistory()

    const operatorEmail = useSelector((state) => state.auth.email)
    const operatorPassword = useSelector((state) => state.auth.password)
    const profileData = useSelector((state) => state.profileSettings.profileData)
    const isNameUpdated = useSelector((state) => state.profileSettings.isNameUpdated)
    const successful = useSelector((state) => state.auth.successful)

    const operatorID = operatorEmail.split('.')[0]

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
            dispatch(updatePasswordRequest({id: operatorID, newPassword:password, oldPassword: operatorPassword}))
        }
    }

    useEffect(() => {
        dispatch(fetchProfileDataRequest(operatorID))
    },[])

    useEffect(() => {
        if (isNameUpdated) {
            alert("Профиль успешно обновлен")
        }
    }, [isNameUpdated])

    useEffect(() => {
        if (!successful) {
            history.push('/')
        }
    }, [successful])

    return (
        <ReactModal
            isOpen={props.isShowSettings}
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
                                      <img alt="no avatar" src={profileData.data.avatar} style={{height: "80px"}}/>
                                      <button>Загрузить новый</button>
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
