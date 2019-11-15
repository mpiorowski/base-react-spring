import ContactComponent from "../pages/header/ContactComponent";
import ForumComponent from "../pages/forum/ForumComponent";
import TestComponent from "../pages/test/TestComponent";

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
        {
          url: '/test/clean',
          component: TestComponent,
          exact: true
        },
      ],
      headers: [
        {
          url: '/forum/categories',
          headerName: 'Admin',
          headerIcon: 'book',
        },
        {
          url: '/test/clean',
          headerName: 'Clean',
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
