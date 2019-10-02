export const notificationConfig = {
  success: {
    type: 'success',
    message: "Zapisano",
    description: "Pomyślnie zapisano dane"
  },
  delete: {
    type: 'success',
    message: "Usunięto",
    description: "Pomyślnie usunięto dane"
  },
  error: {
    type: 'error',
    message: "Błąd zapisu",
    description: "Wystąpił problem z zapisaniem danych"
  },

  serverAccess: {
    type: 'error',
    message: "Nie udało się połączyć z serwerem",
    description: "Proszę spróbować ponownie później"
  },

  authSuccess: {
    type: 'success',
    message: "Zalogowani pomyślnie",
    description: "Witamy w dzienniczku PBS"
  },
  authError: {
    type: 'error',
    message: "Niepoprawny login lub hasło",
    description: "Proszę sprawdź dane logowania"
  },
};

