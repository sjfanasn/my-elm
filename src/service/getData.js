import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'
import axios from 'axios';
/**
 * 获取首页默认地址
 */
export const cityGuess = () => { return axios.get('http://cangdu.org:8001/v1/cities?type=guess') }
/**
 * 获取首页热门城市
 */
export const hotcity = () => { return axios.get('http://cangdu.org:8001/v1/cities?type=hot') }
/**
 * 获取首页所有城市
 */
export const groupcity = () => { return axios.get('http://cangdu.org:8001/v1/cities?type=group') }