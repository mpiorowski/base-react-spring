import {authNotificationConfig} from "./AuthNotificationsConfig";

export const notificationConfig = {
  serverError: {
    type: 'error',
    message: "Wystąpił problem",
    description: "Wystąpił problem przy połączeniu z serwerem. Proszę spróbować ponownie.",
    duration: 3
  },
  serverAccess: {
    type: 'error',
    message: "Nie udało się połączyć z serwerem",
    description: "Proszę spróbować ponownie później",
    duration: 3
  },
  ...authNotificationConfig
};

