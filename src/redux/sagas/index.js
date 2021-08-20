import { all } from 'redux-saga/effects'
import AuthSaga from '../auth/sagas/authSaga'
import SearchInUsersSaga from '../searchInUsers/searchInUsersSaga'
import SearchInMessagesSaga from '../searchInMessages/searchInMessagesSaga'
import FetchDialogsSaga from '../dialogs/fetchDialogsSaga'
import DeleteDialogSaga from '../deleteDialog/deleteDialogsSaga'
import EnterDialogSaga from '../enterDialog/enterDialogsSaga'
import SaveDialogSaga from '../saveDialog/saveDialogsSaga'
import FetchCurrentDialogSaga from '../currentDialog/fetchCurrentDialogSaga'
import FetchProfileDataSaga from '../profileSettings/sagas/profileSettingsSaga'
import UpdateNameSaga from '../profileSettings/sagas/updateNameSaga'
import UpdatePasswordSaga from '../profileSettings/sagas/updatePasswordSaga'
import UpdateAvatarSaga from '../profileSettings/sagas/updateAvatarSaga'
import SendMessageSaga from '../sendMessage/sendMessageSaga'
import FetchDialogsSettingsSaga from '../dialogsSettings/sagas/fetchDialogsSettingsSaga'
import UpdatePhrasesSaga from '../dialogsSettings/sagas/updatePhrasesSaga'
import UpdateGreetingSaga from '../dialogsSettings/sagas/updateGreetingSaga'
import SMAuthSaga from '../auth/sagas/smAuthSaga'
import RegistrationSaga from '../registration/registrationSaga'
import SendResetEmailSaga from '../forgotPassword/sendResetEmailSaga'
import ResetPasswordSaga from '../resetPassword/resetPasswordSaga'

export default function* rootSaga() {
    yield all([
        AuthSaga,
        SearchInUsersSaga,
        SearchInMessagesSaga,
        FetchDialogsSaga,
        DeleteDialogSaga,
        EnterDialogSaga,
        SaveDialogSaga,
        FetchCurrentDialogSaga,
        FetchProfileDataSaga,
        UpdateNameSaga,
        UpdatePasswordSaga,
        UpdateAvatarSaga,
        SendMessageSaga,
        FetchDialogsSettingsSaga,
        UpdatePhrasesSaga,
        UpdateGreetingSaga,
        SMAuthSaga,
        RegistrationSaga,
        SendResetEmailSaga,
        ResetPasswordSaga,
    ])
}
