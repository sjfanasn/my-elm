import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'
/**
 * 获取首页默认地址
 */
export const cityGuess = () => fetch('/v1/cities', {
    type: 'guess'
})