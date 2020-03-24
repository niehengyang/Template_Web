/**
 * 统一登录监测
 */

import TokenFactory from '@/utils/tokenfactory'

if (!TokenFactory.getToken()) {
  window.location.href = '/login/'
}
