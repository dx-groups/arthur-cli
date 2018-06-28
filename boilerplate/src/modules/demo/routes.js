// router configuration for module

export default [
  {
    name: 'demo',
    path: '/demo',
    loader: () => import('./'),
    // component: <component>,
    children: [
      {
        name: 'page',
        path: '/demo/page',
        // parent: '',
        // hideBreadcrumb: false,
        // hideInBreadcrumb: false,
        // breadcrumbRender: (route, match) => match.params.id
      },
    ],
  },
];
