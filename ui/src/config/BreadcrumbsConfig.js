import {serviceGetForumBreadcrumbs} from "../services/forum/BreadcrumbsService";

export let breadcrumbNameMap = {
  '/management/users': 'Users Management',
  '/forum/categories': 'Kategorie',
};

export const initForumBreadcrumbs = () => {
  serviceGetForumBreadcrumbs().then(response => {
    console.log(response);
  })
};
