import ContactComponent from "../pages/header/ContactComponent";
import ForumComponent from "../pages/forum/ForumComponent";

export const routes =
  {
    main: {
      paths: [
        {
          url: '/contact',
          component: ContactComponent,
        },
      ]
    },
    ROLE_USER: {
      paths: [
        {
          url: '/forum',
          component: ForumComponent,
          exact: false
        },
      ],
      headers: [
        {
          url: '/forum/categories',
          headerName: 'Forum',
          headerIcon: 'book',
        },
      ]
    }
  };
