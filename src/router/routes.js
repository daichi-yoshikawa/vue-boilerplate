//import authRoutes from '@router/auth-routes'
//import entryRoutes from '@router/entry-routes'
//import legalRoutes from '@router/legal-routes'
import NotFoundView from '@error/not-found-view'
import privateRoutes from '@router/private-routes'
import publicRoutes from '@router/public-routes'

const appName = 'frontend'
const titleDelimiter = ' | '

/*
authRoutes.forEach((route, index) => {
  if (route.meta.title.length > 0) {
    route.meta.title = appName + titleDelimiter + route.meta.title;
  } else {
    route.meta.title = appName;
  }
});

privateRoutes.forEach((route, index) => {
  if (route.meta.title.length > 0) {
    route.meta.title = appName + '.app' + titleDelimiter + route.meta.title;
  } else {
    route.meta.title = appName + '.app';
  }
});

entryRoutes.forEach((route, index) => {
  if (route.meta.title.length > 0) {
    route.meta.title = appName + titleDelimiter + route.meta.title;
  } else {
    route.meta.title = appName;
  }
});
*/

const routes = [
  ...privateRoutes,
  ...publicRoutes,
  {
    path: '/404',
    name: '404',
    component: NotFoundView,
    meta: {
      title: 'Not Found',
      requireAuth: false,
    },
  },
  {
    path: '*',
    redirect: '/404',
    meta: {
      title: 'Not Found',
    }
  },
];

routes.forEach((route, index) => {
  if (route.meta === undefined || route.meta.title === undefined) {
    return;
  }

  if (route.meta.title.length > 0) {
    route.meta.title = appName + titleDelimiter + route.meta.title;
  } else {
    route.meta.title = appName;
  }
});

export default routes;
export { appName };
