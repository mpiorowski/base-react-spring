export let breadcrumbNameMap = {
  '/management/users': 'Users Management',
  '/forum/categories': 'Kategorie',
  '/hello': 'Witamy'
};

// todo - delete
// export const initForumBreadcrumbs = () => {
//   return new Promise((resolve, reject) => {
//     serviceGetForumBreadcrumbs().then(response => {
//       let breadcrumbs = {};
//       response.forEach(breadcrumb => {
//         breadcrumbs['/forum/categories/' + breadcrumb.categoryUid + '/topics'] = breadcrumb.categoryTitle;
//         breadcrumbs['/forum/categories/' + breadcrumb.categoryUid + '/topics/' + breadcrumb.topicUid +'/posts'] = breadcrumb.topicTitle;
//       });
//       let tempBreadcrumbs = {...breadcrumbNameMap, ...breadcrumbs};
//       resolve(tempBreadcrumbs);
//     });
//   });
// };
