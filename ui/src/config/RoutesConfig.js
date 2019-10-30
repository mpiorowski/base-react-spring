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
    ROLE_ADMIN: {
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
          headerName: 'Admin',
          headerIcon: 'book',
        },
      ],
      redirect: '/forum/categories'
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
      ],
      redirect: '/forum/categories'
    }
  };
