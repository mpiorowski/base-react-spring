export const authNotificationConfig = {
  authError: {
    type: 'error',
    message: 'Niepoprawny login lub hasło',
    description: 'Proszę sprawdź dane logowania',
    duration: 3
  },
  registerSuccess: {
    type: 'success',
    message: 'Konto zostało dodane',
    description: 'Zaloguj się do systemu',
    duration: 3
  },
  validationCodeSend: {
    type: 'warning',
    message: 'Wysłano kod',
    description: 'Na podany email został wysłany kod weryfikacyjny.',
    duration: 4
  },
  validationCodeError: {
    type: 'error',
    message: 'Niepoprawny kod',
    description: 'Sprawdź kod weryfikacyjny',
    duration: 4
  },
  recoverEmail: {
    type: 'error',
    message: 'Niepoprawny email',
    description: 'Podany email nie znajduje się w systemie',
    duration: 3
  },
  recoverSuccess: {
    type: 'success',
    message: 'Hasło zostało zmienione',
    description: 'Zaloguj się ponownie do systemu',
    duration: 3
  },
};

