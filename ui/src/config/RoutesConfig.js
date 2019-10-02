import ContactComponent from "../pages/main/ContactComponent";
import TestComponent from "../pages/test/TestComponent";
import Test2Component from "../pages/test/Test2Component";

export const routes =
    {
      'main': {
        'paths': [
          {
            url: '/contact',
            component: ContactComponent
          },
        ]
      },
      'ADMIN': {
        'redirect': '/test1',
        'paths': [
          {
            url: '/test1',
            component: TestComponent
          },
          {
            url: '/test2',
            component: Test2Component
          },
        ]
      }
    };
