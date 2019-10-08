import ContactComponent from "../pages/header/ContactComponent";
import Test1Component from "../pages/test/Test1Component";
import Test2Component from "../pages/test/Test2Component";
import AdminHomeComponent from "../pages/admin/AdminHomeComponent";

export const routes =
  {
    'main': {
      'paths': [
        {
          url: '/contact',
          component: ContactComponent,
        },
      ]
    },
    'ROLE_ADMIN': {
      'paths': [
        {
          url: '/home',
          component: AdminHomeComponent,
          headerName: 'Strona Główna',
          headerIcon: 'book'
        }, {
          url: '/test1',
          component: Test1Component,
          headerName: 'Ksiazka',
          headerIcon: 'book'
        },
        {
          url: '/test2',
          component: Test2Component,
          headerName: 'Forum',
          headerIcon: 'user'
        },
      ]
    },
    'ROLE_USER': {
      'paths': [
        {
          url: '/home',
          component: AdminHomeComponent,
          headerName: 'Strona Główna',
          headerIcon: 'book'
        }, {
          url: '/test1',
          component: Test1Component,
          headerName: 'Ksiazka',
          headerIcon: 'book'
        },
        {
          url: '/test2',
          component: Test2Component,
          headerName: 'Forum',
          headerIcon: 'user'
        },
      ]
    }
  };
