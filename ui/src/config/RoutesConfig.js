import ContactComponent from "../pages/contact/ContactComponent";
import ForumComponent from "../pages/forum/ForumComponent";
import TestComponent from "../pages/test/TestComponent";
import HomeComponent from "../pages/home/HomeComponent";

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
      headerIcon: 'reload',
    }
  },
  home: {
    key: 3,
    path: {
      url: '/',
      component: HomeComponent,
      exact: true
    },
    header: {
      url: '/',
      headerName: '',
      headerIcon: 'home',
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
        pathsData.home,
        pathsData.forum,
        pathsData.clean,
      ],
      redirect: '/'
    },
    ROLE_USER: {
      paths: [
        pathsData.forum,
      ],
      redirect: '/forum/categories'
    }
  };

