import request from '@/utils/request'


export default {
     // 删除发表的评论
     delOwnComment(commentId) {
        return request({
            url: `music/delOwnComment`,
            method: `post`,
            params: {commentId}
        })
    },
    // 删除发布的信息
    deleteContent(cid) {
        return request({
            url: `music/delContent/`+cid,
            method: `delete`,
        })
    },
    //提交点赞信息
    zanContent(cid) {
        return request({
            url: `music/zan/` + cid,
            method: `get`,
        })
    },
    // 发布评论
    toComment(toCommentVo) {
        return request({
            url: `music/toComment`,
            method: `post`,
            data: toCommentVo
        })
    },
    //发布内容
    publishContent(sendContentVo) {
        return request({
            url: `music/sendContent`,
            method: 'post',
            data: sendContentVo
        })
    },
    //获取自己发的信息
    ownContents(contentVo) {
        return request({
            url: `music/ownContents`,
            method: 'post',
            params: contentVo
        })
    },

}
