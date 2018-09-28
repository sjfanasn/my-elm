import fetch from '../config/fetch'
import { getStore } from '../config/mUtils'
import axios from 'axios';

const baseUri = 'http://cangdu.org:8001/'
/**
 * 获取首页默认地址
 */
export const cityGuess = () => { return axios.get(baseUri + 'v1/cities?type=guess') }
/**
 * 获取首页热门城市
 */
export const hotcity = () => { return axios.get(baseUri + 'v1/cities?type=hot') }
/**
 * 获取首页所有城市
 */
export const groupcity = () => { return axios.get(baseUri + 'v1/cities?type=group') }
/**
 * 获取当前所在城市
 */
export const currentcity = (number) => { return axios.get(baseUri + 'v1/cities/' + number) }
/**
 * 搜索
 */
export const searchplace = (cityId, value) => { return axios.get(baseUri + 'v1/pois?type=search&city_id=' + cityId + '&keyword=' + value) }