import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const profile = r => require.ensure([], () => r(require('../pages/profile')), 'profile')
const login = r => require.ensure([], () => r(require('../pages/login')), 'login')
const city = r => require.ensure([], () => r(require('../pages/city')), 'city')
const msite = r => require.ensure([], () => r(require('../pages/msite')), 'msite')

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '/login',
                component: login
            },
            {
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                component: home
            },
            // 当前选择城市页
            {
                path: 'city/:cityId',
                component:city
            },
            // 所有商铺列表页
            {
                path: '/msite',
                component: msite,
                meta: {keepAlive:true}
            },
            
            {
                path: '/profile',
                component: profile
            },
           
        ]
    }
]