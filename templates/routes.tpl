
export default [
  {
    name: '{{ name }}',
    path: '{{ name }}',
    loader: () => import('./index'),
    // component: <component>,
    children: [
      // {
      //   name: '',
      //   path: '',
      //   parent: '',
      //   hideBreadcrumb: false,
      //   hideInBreadcrumb: false,
      //   breadcrumbRender: (route, match) => match.params.id
      // },
    ],
  },
]
