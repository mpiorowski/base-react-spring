import {serviceGetForumBreadcrumbs} from "../services/forum/BreadcrumbsService";

export let breadcrumbNameMap = {
  '/management/users': 'Users Management',
  '/forum/categories': 'Kategorie',
  '/hello': 'Witamy'
};

export const initForumBreadcrumbs = () => {
  return new Promise((resolve, reject) => {
    serviceGetForumBreadcrumbs().then(response => {
      let breadcrumbs = {};
      response.forEach(response => {
        breadcrumbs['/forum/categories/' + response.categoryUid + '/topics'] = response.categoryTitle;
        breadcrumbs['/forum/categories/' + response.categoryUid + '/topics/' + response.topicUid +'/posts'] = response.topicTitle;
      });
      let tempBreadcrumbs = {...breadcrumbNameMap, ...breadcrumbs};
      resolve(tempBreadcrumbs);
    });
  });
};
