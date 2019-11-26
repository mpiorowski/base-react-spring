import ContactComponent from "../pages/header/ContactComponent";
import ForumComponent from "../pages/forum/ForumComponent";
import TestComponent from "../pages/test/TestComponent";

const pathsData = {
  forum: {
    key: 1,
    path: {
      url: '/forum',
      component: ForumComponent,
      exact: false
    },
    header: {
      url: '/forum/categories',
      headerName: 'Forum',
      headerIcon: 'book',
    }
  },
  clean: {
    key: 2,
    path: {
      url: '/test/clean',
      component: TestComponent,
      exact: true
    },
    header: {
      url: '/test/clean',
      headerName: 'Clean',
      headerIcon: 'book',
    }
  }
};

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
        pathsData.forum,
        pathsData.clean
      ],
      redirect: '/forum/categories'
    },
    ROLE_USER: {
      paths: [
        pathsData.forum,
      ],
      redirect: '/forum/categories'
    }
  };

