export default {
    authRequiredMsg: {
        severity: 'error',
        summary: 'Please Log In',
        detail: 'Requested page is available only for Logged in users.',
        life: 3000,
    },
    signupFailedMsg: {
        severity: 'error',
        summary: 'Failed to Sign Up',
        detail: 'Please enter correct details and try again later.',
        life: 3000,
    },
    pswdMatchFaileddMsg: {
        severity: 'error',
        summary: 'Passwords didn\'t match',
        detail: 'Please make corrections and try again.',
        life: 3000,
    },
    loginFailedMsg: {
        severity: 'error',
        summary: 'Invalid Credentials',
        detail: 'Please enter correct details and try again later.',
        life: 3000,
    },
    formSavedMsg: {
        severity: 'success',
        summary: 'Form Saved',
        detail: 'Your details have been saved.',
        life: 3000,
    },
    resetFormMsg: {
        severity: 'info',
        summary: 'Form has been reset',
        detail: 'Please enter the latest details.',
        life: 3000,
    },

    sentRequestMsg: {
        severity: 'success',
        summary: 'Request Sent',
        detail: 'Hiring request sent to worker.',
        life: 3000,
    },

    lastSavedConfirmMsg: {
        severity: 'info',
        summary: 'Confirmed',
        detail: 'Please make necessary changes where required.',
        life: 3000,
    },

    registeredWorkerConfirmMsg: {
        severity: 'success',
        summary: 'Confirmed',
        detail: 'Congratulations!! You have been registered as a Worker.',
        life: 3000,
    },
}


