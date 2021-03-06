import { $http, $file } from './index'
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
  },
  getPlayerCensus (params) {
    return $http('post', '/vote/old/playerCensus', params, 0)
  },
  getActiveHost (params) {
    return $http('get', '/host/getActiveHost', params, 0)
  },
  postComplaint (params) {
    return $http('post', '/vote/old/complaint', params, 0)
  },
  getTesting (params) {
    return $http('post', '/vote/old/testing', params, 0)
  },
  postUpload (params) {
    return $file('post', '/upload/qiniu', params, 0)
  },
  getShare (params) {
    return $http('get', '/vote/old/share', params, 0)
  },
  postSginup (params) {
    return $http('post', '/vote/old/signup', params, 0)
  }
}
