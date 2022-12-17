// ** Icons Import
import { Home, Circle, Grid, User, Book } from 'react-feather'

export default [
  // {
  //   id: 'dashboards',
  //   title: 'Dashboards',
  //   icon: <Home size={20} />,
  //   badge: 'light-warning',
  //   badgeText: '2',
  //   children: [
  //     {
  //       id: 'analyticsDash',
  //       title: 'Analytics',
  //       icon: <Circle size={12} />,
  //       navLink: '/dashboard/analytics'
  //     },
  //     {
  //       id: 'eCommerceDash',
  //       title: 'eCommerce',
  //       icon: <Circle size={12} />,
  //       navLink: '/dashboard/ecommerce'
  //     }
  //   ]
  // },
  {
    id: 'blog',
    title: 'Blog',
    icon: <Book size={20} />,
    action: 'read',
    resource: 'ACL',
    navLink: '/apps/blog/list'
  },
  {
    id: 'tour',
    title: 'Tour',
    icon: <Grid size={20} />,
    action: 'read',
    resource: 'ACL',
    children: [
      {
        id: 'inCountryTour',
        title: 'In Country Tour',
        icon: <Circle size={12} />,
        action: 'read',
        resource: 'ACL',
        navLink: '/apps/tour/inCountryTour'
      },
      {
        id: 'outCountryTour',
        title: 'Out Country Tour',
        icon: <Circle size={12} />,
        action: 'read',
        resource: 'ACL',
        navLink: '/apps/tour/outCountryTour'
      }
      // ,
      // {
      //   id: 'monitoring',
      //   title: 'Monitoring',
      //   icon: <Circle size={12} />,
      //   action: 'read',
      //   resource: 'ACL',
      //   navLink: '/apps/vict/monitoring'
      // },
      // {
      //   id: 'location',
      //   title: 'Location',
      //   icon: <Circle size={12} />,
      //   action: 'read',
      //   resource: 'ACL',
      //   navLink: '/apps/vict/location'
      // },
      // {
      //   id: 'RFMTinventory',
      //   title: 'RF MT inventory',
      //   icon: <Circle size={12} />,
      //   action: 'read',
      //   resource: 'ACL',
      //   navLink: '/apps/vict/RFMTinventory'
      // }
    ]
  },
  {
    id: 'users',
    title: 'User',
    icon: <User size={20} />,
    navLink: '/apps/user/list'
  }
]
