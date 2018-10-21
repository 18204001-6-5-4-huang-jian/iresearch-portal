/**
 * 用户注册登录相关接口
 */
import request from './request'
import qs from 'querystring'
/**
 * 用户邮箱登录
 */
export function userLogin(userinfo) {
  return request({
    method: 'POST',
    url: '/v1/account/login',
    data: qs.stringify(userinfo) // json
  })
}

/**
 * 用户邮箱注册
 */
export function userRegiste(userinfo) {
  return request({
    method: 'POST',
    url: '/v1/account/register',
    data: qs.stringify(userinfo) // json
  })
}