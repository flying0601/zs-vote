import { $http } from './index'
export default {
  getConfig (params) {
    return $http('post', '/wechat/getConfig', params, 0)
  },
  getUrl (params) {
    return $http('get', '/wechat/getRedirect', params, 0)
  },
  getOpenId (params) {
    return $http('post', '/wechat/getOpenId', params, 0)
  },
  getVoteInfo (params) {
    return $http('get', '/vote/old/info', params, 0)
  },
  getVotePlayer (params) {
    return $http('get', '/vote/old/player', params, 0)
  },
  getVotePlayerInfo (params) {
    return $http('get', '/vote/old/playerInfo', params, 0)
  },
  getCensus (params) {
    return $http('get', '/vote/old/census', params, 0)
  },
  postHelp (params) {
    return $http('post', '/vote/old/help', params, 0)
  },
  postGive (params) {
    return $http('post', '/vote/old/give', params, 0)
  }
}
