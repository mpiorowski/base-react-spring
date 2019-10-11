import {notification} from 'antd';
import {notificationConfig} from "../../config/NotificationsConfig";

export const openNotification = (type) => {

  notification[notificationConfig[type].type]({
    message: notificationConfig[type].message,
    description: notificationConfig[type].description,
    duration: notificationConfig[type].duration,
  });
};
