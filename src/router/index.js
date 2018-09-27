import App from '../App'
const home = r => require.ensure([], () => r(require('../pages/home')), 'home')
const profile = r => require.ensure([], () => r(require('../pages/profile')), 'profile')
const login = r => require.ensure([], () => r(require('../pages/login')), 'login')

export default [
    {
        path: '/',
        component: App,
        children: [
            {
                path: '',
                redirect: '/home'
            },
            {
                path: '/home',
                component: home
            },
            {
                path: '/profile',
                component: profile
            },
            {
                path: '/login',
                component: login
            },

        ]
    }
]