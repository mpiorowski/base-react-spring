import ContactComponent from "../pages/contact/ContactComponent";
import ForumComponent from "../pages/forum/ForumComponent";
import TestComponent from "../pages/test/TestComponent";
import HelloComponent from "../pages/hello/HelloComponent";

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
  },
  hello: {
    key: 3,
    path: {
      url: '/hello',
      component: HelloComponent,
      exact: true
    },
    header: {
      url: '/hello',
      headerName: 'Hello',
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
        pathsData.hello,
        pathsData.forum,
        pathsData.clean
      ],
      redirect: '/hello'
    },
    ROLE_USER: {
      paths: [
        pathsData.forum,
      ],
      redirect: '/forum/categories'
    }
  };

