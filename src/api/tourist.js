import request from '@/utils/request'

const api_name = `/tourist`

export default {
    // 获取评论
    getpinlun(cid) {
        return request({
            url: `${api_name}/getComment/` + cid,
            method: `get`,
        })
    },
    //获取所有分类
    getCategoryList() {
        return request({
            url: `/music/categoryList`,
            method: `get`,
        })
    },
    //获取消息盒子内容集合
    getContent(contentVo) {
        return request({
            url: `/music/contentList`,
            method: `get`,
            params: contentVo
        })
    },
    //获取消息盒子内容集合
    getContentById(id) {
        return request({
            url: `/music/getContent`,
            method: `get`,
            params: { id }
        })
    },
    //获取一级评论
    getOneLevelComment(CommentEntity) {
        return request({
            url: `/music/getOneLevelComment`,
            method: `get`,
            params: CommentEntity
        })
    },
    //获取子评论
    getCommentChildren(CommentEntity) {
        return request({
            url: `/music/getCommentChildren`,
            method: `get`,
            params: CommentEntity
        })
    },
    //查询简单热门帖子内容列表
    getSimpleHotContent() {
        return request({
            url: `/music/simpleHotContent`,
            method: `get`
        })
    }

}
