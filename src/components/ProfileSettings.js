import React, { useEffect, useState } from 'react'
import ReactModal from 'react-modal'
import {
    Button,
    Input,
    Label,
    InputGroup,
    Row,
    Col,
    Container,
} from 'reactstrap'
import { Form, Field } from 'react-final-form'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import {
    fetchProfileDataRequest,
    hideSettings,
    resetProfileUpdatedState,
    updateAvatarRequest,
    updateNameRequest,
    updatePasswordRequest,
} from '../redux/profileSettings/actionCreator'

export const ProfileSettings = ({ isShowSettings }) => {
    const dispatch = useDispatch()

    const history = useHistory()

    const operatorEmail = useSelector((state) => state.auth.email)
    const operatorPassword = useSelector((state) => state.auth.password)
    const profileData = useSelector(
        (state) => state.profileSettings.profileData,
    )
    const isAuthorized = useSelector((state) => state.auth.successful)
    const isNameUpdated = useSelector(
        (state) => state.profileSettings.isNameUpdated,
    )
    const isAvatarUpdated = useSelector(
        (state) => state.profileSettings.isAvatarUpdated,
    )
    const isPasswordUpdated = useSelector(
        (state) => state.profileSettings.isPasswordUpdated,
    )

    const [avatarIcon, setAvatarIcon] = useState(
        'https://diora.pro/assets/img/staff/kontakt.jpg',
    )
    const [avatarUrl, setAvatarUrl] = useState('')
    const [isProfileUpdated, setIsProfileUpdated] = useState(false)

    const operatorID = window.btoa(operatorEmail)

    const handleHideSettings = (event) => {
        dispatch(hideSettings())
        dispatch(resetProfileUpdatedState())
        dispatch(fetchProfileDataRequest(operatorID))
        setIsProfileUpdated(false)
    }

    const onSubmit = (values) => {
        const name = values.name
        const password = values.password
        if (name) {
            dispatch(updateNameRequest({ id: operatorID, name }))
        }
        if (password) {
            dispatch(
                updatePasswordRequest({
                    id: operatorID,
                    newPassword: password,
                    oldPassword: operatorPassword,
                }),
            )
        }
        if (avatarUrl) {
            dispatch(updateAvatarRequest({ id: operatorID, avatar: avatarUrl }))
        }
    }

    const handleChangeUrl = (event) => {
        setAvatarUrl(event.target.value)
    }

    const handleChangeAvatar = (event) => {
        setAvatarIcon(avatarUrl)
    }

    useEffect(() => {
        dispatch(fetchProfileDataRequest(operatorID))
    }, [])

    useEffect(() => {
        if (profileData.data) {
            if (profileData.data.avatar) setAvatarIcon(profileData.data.avatar)
        }
    }, [profileData])

    useEffect(() => {
        setIsProfileUpdated(
            isNameUpdated || isPasswordUpdated || isAvatarUpdated,
        )
    }, [isAvatarUpdated, isNameUpdated, isPasswordUpdated])

    useEffect(() => {
        if (isNameUpdated || isPasswordUpdated || isAvatarUpdated) {
            toast.success('Профиль успешно обновлен')
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
            contentLabel={'Настройки диалогов'}
            portalClassName={'ReactModalPortal'}
            style={{
                content: {
                    background:
                        'https://i.pinimg.com/originals/d4/79/35/d479359444438e53a87e3fcd7a752b0e.png',
                    paddingTop: '50px',
                },
            }}
        >
            <Form
                onSubmit={onSubmit}
                validate={(values) => {
                    const errors = {}
                    if (values.password !== values.passwordConfirm) {
                        errors.passwordConfirm = 'Пароли не совпадают'
                    }
                    if (values.password && values.password.length < 6) {
                        errors.password =
                            'Пароль должен содержать не менее 6 символов'
                    }
                    return errors
                }}
                render={({
                             form,
                             handleSubmit,
                             submitting,
                             pristine,
                             values,
                         }) => (
                    <Container>
                        <form onSubmit={handleSubmit}>
                            <Row>
                                <Col>
                                    <h3>Настройки профиля</h3>
                                </Col>
                            </Row>
                            <Row className='form-item'>
                                <Col>
                                    <p>
                                        Ваше имя:{' '}
                                        <span>{profileData.data.name}</span>
                                    </p>
                                </Col>
                            </Row>
                            <Row className='form-input'>
                                <Field name='name'>
                                    {({ input, meta }) => (
                                        <InputGroup>
                                            <Col md={3}>
                                                <Label>Изменить имя: </Label>
                                            </Col>
                                            <Col>
                                                <Input {...input} type='text' />
                                            </Col>
                                        </InputGroup>
                                    )}
                                </Field>
                            </Row>
                            <Row className='form-input'>
                                <Col md={3}>
                                    <Label>Аватар: </Label>
                                </Col>
                                <Col>
                                    <img
                                        alt='avatar'
                                        src={avatarIcon}
                                        style={{
                                            height: '80px',
                                            width: '80px',
                                            objectFit: 'cover',
                                            borderRadius: '50%',
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Field name='avatar'>
                                {({ input, meta }) => (
                                    <Row className='form-input'>
                                        <Col md={3}>
                                            <Label>Новый аватар: </Label>
                                        </Col>
                                        <Col>
                                            <Input
                                                {...input}
                                                type='url'
                                                value={avatarUrl}
                                                onChange={handleChangeUrl}
                                            />
                                        </Col>
                                        <Col>
                                            <Button
                                                className='form-button uploadAvatar-btn'
                                                color='info'
                                                onClick={handleChangeAvatar}
                                            >
                                                Загрузить новый
                                            </Button>
                                        </Col>
                                    </Row>
                                )}
                            </Field>
                            <Row>
                                <Col>
                                    <h3>Изменить пароль</h3>
                                </Col>
                            </Row>
                            <Row className='form-input'>
                                <Field name='oldPassword'>
                                    {({ input, meta }) => (
                                        <InputGroup>
                                            <Col md={3}>
                                                <Label>Старый пароль: </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    {...input}
                                                    type='password'
                                                />
                                            </Col>
                                        </InputGroup>
                                    )}
                                </Field>
                            </Row>
                            <Row className='form-input'>
                                <Field name='password'>
                                    {({ input, meta }) => (
                                        <InputGroup>
                                            <Col md={3}>
                                                <Label>Пароль: </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    {...input}
                                                    type='password'
                                                />
                                            </Col>
                                            {meta.error && meta.touched && (
                                                <span>{meta.error}</span>
                                            )}
                                        </InputGroup>
                                    )}
                                </Field>
                            </Row>
                            <Row className='form-input'>
                                <Field name='passwordConfirm'>
                                    {({ input, meta }) => (
                                        <InputGroup>
                                            <Col md={3}>
                                                <Label>
                                                    Подтверждение пароля:{' '}
                                                </Label>
                                            </Col>
                                            <Col>
                                                <Input
                                                    {...input}
                                                    type='password'
                                                />
                                            </Col>
                                            {meta.error && meta.touched && (
                                                <span>{meta.error}</span>
                                            )}
                                        </InputGroup>
                                    )}
                                </Field>
                            </Row>
                            <Row className='justify-content-center'>
                                <Col md={3}>
                                    <Button
                                        type='submit'
                                        className='form-button'
                                        color='info'
                                    >
                                        Сохранить
                                    </Button>
                                </Col>
                                <Col md={3}>
                                    <Button
                                        onClick={handleHideSettings}
                                        className='form-button'
                                        color='info'
                                    >
                                        Закрыть
                                    </Button>
                                </Col>
                            </Row>
                        </form>
                    </Container>
                )}
            />
        </ReactModal>
    )
}
