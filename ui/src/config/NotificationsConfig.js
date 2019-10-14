export const notificationConfig = {
  success: {
    type: 'success',
    message: "Zapisano",
    description: "Pomyślnie zapisano dane",
    duration: 2
  },
  delete: {
    type: 'success',
    message: "Usunięto",
    description: "Pomyślnie usunięto dane",
    duration: 2
  },
  error: {
    type: 'error',
    message: "Błąd zapisu",
    description: "Wystąpił problem z zapisaniem danych",
    duration: 2
  },

  serverAccess: {
    type: 'error',
    message: "Nie udało się połączyć z serwerem",
    description: "Proszę spróbować ponownie później",
    duration: 2
  },

  authSuccess: {
    type: 'success',
    message: "Zalogowani pomyślnie",
    description: "Witamy w dzienniczku PBS",
    duration: 2
  },
  authError: {
    type: 'error',
    message: "Niepoprawny login lub hasło",
    description: "Proszę sprawdź dane logowania",
    duration: 2
  },

  registerSuccess: {
    type: 'success',
    message: "Pozytywnie dodano konto!",
    description: "Zaloguj się do systemu",
    duration: 2
  },

  recoverSuccess: {
    type: 'success',
    message: "Pozytywnie zmieniono hasło!",
    description: "Zaloguj się ponownie do systemu",
    duration: 2
  },

  validationCode: {
    type: "warning",
    message: "Wysłano kod",
    description: "Na podany email został wysłany kod weryfikacyjny.",
    duration: 4
  },
};

