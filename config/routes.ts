export default [
  {
    path: '/user',
    layout: false,
    routes: [
      {name: '登录', path: '/user/login', component: './User/Login'},
      {
        name: '注册账号',
        path: '/user/register',
        component: './User/Register',
      },
      {
        name: '注册账号',
        path: '/user/register/:id',
        component: './User/Register',
        hideInMenu: true,
      },
    ],
  },
  {path: '/:id', name: '欢迎', icon: 'smile', component: './Welcome', hideInMenu: true,},
  {path: '/', name: '欢迎', icon: 'smile', component: './Welcome'},
  {path: '/interface/list', name: '接口广场', icon: 'RedditOutlined', component: './InterfaceSquare'},
  {path: '/recharge/list', icon: "PayCircleOutlined", name: '积分商城', component: './Recharge'},
  {
    path: '/account/center', name: '个人中心', icon: 'UserOutlined', component: './User/UserInfo', hideInMenu: true,
  },
  {
    path: '/interface_info/:id',
    name: '接口详情',
    component: './InterfaceInfo',
    hideInMenu: true,
  },
  {
    path: '/order',
    name: '订单管理',
    icon: 'crown',
    routes: [
      {
        path: '/order/list',
        name: '我的订单',
        icon: 'ProfileOutlined',
        component: './Order/OrderList',
      },
    ],
  },
  // {
  //   path: '/admin',
  //   name: '接口管理',
  //   icon: 'crown',
  //   access: 'canAdmin',
  //   routes: [
  //     {
  //       name: '娱乐接口',
  //       icon: 'ApiOutlined',
  //       path: '/admin/interface/list',
  //       component: './Admin/InterfaceInfoList',
  //     }
  //   ],
  // },
  {
    path: '/admin',
    name: '系统管理',
    icon: 'crown',
    access: 'canAdmin',
    routes: [
      {
        name: '接口管理',
        icon: 'ApiOutlined',
        path: '/admin/interface/list',
        component: './Admin/InterfaceInfoList',
      },
      {
        name: '商品管理',
        icon: 'table',
        path: '/admin/productInfo/list',
        component: './Admin/ProductInfoList',
      },
      {
        name: '用户管理',
        icon: 'TeamOutlined',
        path: '/admin/user/list',
        component: './Admin/UserList',
      },
    ],
  },
  {
    path: '/account',
    name: '个人中心',
    icon: 'TeamOutlined',
    routes: [
      {
        path: '/account/userInfo',
        name: '个人信息',
        icon: 'UserOutlined',
        component: './Order/OrderList',
      },
      {
        path: '/account/keys',
        name: '密钥管理',
        icon: 'KeyOutlined',
        component: './User/KeyList',
      },
    ],
  },
  {
    path: '/order/pay/:id',
    icon: "PayCircleOutlined",
    name: '订单支付',
    component: './Order/PayOrder',
    hideInMenu: true
  }, {
    path: '/order/info/:id', icon: "ProfileOutlined", name: '订单详情', component: './Order/OrderInfo', hideInMenu: true
  },
  {path: '*', layout: false, component: './404'},
];
