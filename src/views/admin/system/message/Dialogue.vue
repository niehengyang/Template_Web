<template>
    <div class='wrap' v-loading="historyLoading">
<!--        <Time></Time>-->
        <div class='content'>
            <ul>
                <li v-for="(item, index) in chatArrays" :key="index">
                    <el-row v-if="item.type == 'text'">
                        <el-col :span='24'>
                           <div :class="item.from != loginUser.id ? 'left' : 'right'">
                               <div v-if="item.from != loginUser.id">
                                   <el-avatar
                                           style='vertical-align: top;'
                                           src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                   </el-avatar>
                                   <p class='info'>{{item.content}}</p>
                               </div>
                               <div v-else>
                                   <i v-if="item.isSuccess == 1" class="el-icon-loading"></i>
                                   <i v-if="item.isSuccess == 3"
                                      style="cursor: pointer"
                                      :title="$t('lang.resend')"
                                      @click="reSend(index)"
                                      class="el-icon-warning color-red"></i>
                                   <p class='info'>{{item.content}}</p>
                                   <el-avatar  style='vertical-align: top;' :src="loginUser.avatar_path" @error="true">
                                       <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                   </el-avatar>
                               </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="item.type == 'card_device'">
                        <el-col :span='24'>
                           <div class="left">
                               <el-avatar
                                    style='vertical-align: top;'
                                    src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                               </el-avatar>
                               <div class="card" @click="clickCard(item.content.id)">
                                    <div class='clearfix'>
                                        <div class="left">
                                            <img src="@/assets/images/icon/internal.png" alt="">
                                        </div>
                                        <div class="card_info">
                                            <p>设备序列号</p>
                                            <p class='serial'>{{item.content.serialno}}</p>
                                        </div>
                                    </div>
                                    <p class='title'>设备名片</p>
                               </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="item.type == 'image'">
                        <el-col :span='24'>
                            <div class="left">
                                <el-avatar
                                        style='vertical-align: top;'
                                        src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png">
                                </el-avatar>
                                <div class="image">
                                    <el-image
                                            style="width: 200px; height: 200px"
                                            :src="item.content"
                                            fit="contain"
                                            :preview-src-list="[item.content]"
                                    >
                                        <div slot="error" class="image-slot">
                                            <i class="el-icon-picture-outline"></i>
                                        </div>
                                    </el-image>
                                </div>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-if="item.type == 'divider'">
                        <el-col :span='24'>
                            <div class='time'>
                                <span>{{item.content}}</span>
                            </div>
                        </el-col>
                    </el-row>
                </li>
            </ul>

        </div>
        <div class='bottom'>
            <div class="group">
                <el-button size='small' @click="back" style='vertical-align: top;'>返回消息中心</el-button>
                <el-input
                    class="text"
                    type="textarea"
                    size='medium'
                    @keyup.enter.native="send"
                    :autosize="{ minRows: 2, maxRows: 3}"
                    placeholder="请输入内容"
                    v-model="message">
                </el-input>
                <el-button type="primary" class="btn" size='small' @click='send'>发送</el-button>

            </div>
        </div>
    </div>
</template>

<script>
    import Time from './component/time'
    export default {
        name: "Dialogue",
        data(){
            return {
                message: '',
                historyLoading: false,
                chatArrays: [
                    // {type: 'text', from: 3, to: 2, content: '你好！', read: '0', send_at: 12323},
                    // {type: 'image', from: 3, to: 2, content: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg', read: '0', send_at: 12323},
                    // {type: 'divider', from: 3, to: 2, content: '11月22日 下午18:15', read: '0', send_at: 12323},
                    // {type: 'card_device', from: 3, to: 2, content: {id: 1, serialno: 'SD42172356'}, read: '0', send_at: 12323},
                    // {type: 'image', from: 3, to: 2, content: 'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg', read: '0', send_at: 12323},
                ]
            }
        },
        created(){
            this.getMessage()
            this.listen()
            this.updateStatus()
        },
        mounted(){
            this.scrollToBottom()
        },
        updated(){
            this.scrollToBottom()
        },
        methods: {
            //监听数据
            listen(){
                this.$doudou.listen("IM_chat", data => {
                    console.log("----------listen-----------");
                    console.log(data);
                    //判断是否给自己发消息
                    if(data.to != this.loginUser.id) return
                    if(data.type == 'card_device'){
                        data.content = JSON.parse(data.content)
                    }
                    this.chatArrays.push(data)
                })
            },
            // 获取历史消息
            getMessage(){
                console.log(this.$route.params.uid)
                this.historyLoading = true  //to_uid为对方账号的id
                this.$api.restfulApi.list('im/history', {to_uid: this.$route.params.uid}).then((res) => {
                    console.log('历史消息', res)
                    res.data.forEach(item => {
                        if(item.type == 'card_device'){
                            item.content = JSON.parse(item.content)
                        }
                    })
                    this.chatArrays = res.data
                    this.historyLoading = false
                }).catch(err => {
                    this.historyLoading = false
                    this.$message.error(this.$t("lang.fail-message"))
                })
            },
            //发送文本消息
            send(){
                let re = new RegExp("^[ ]+$")
                let regbool = re.test(this.message)
                if(this.message == '' || regbool == true) {
                    this.$message({
                        message: this.$t("lang.content-warning"),
                        type: 'warning'
                    })
                    return
                }
                let params = {
                    to_uid: this.$route.params.uid,
                    text: this.message
                }
                console.log(this.chatArrays)
                this.chatArrays.push({type: 'text', from: this.loginUser.id, to: this.$route.params.uid, content: this.message, isSuccess: 1})
                this.message = ''
                this.$api.restfulApi.post('im/send/text', params).then(() => {
                    console.log('发送成功')
                    this.chatArrays[this.chatArrays.length - 1].isSuccess = 2
                }).catch(err => {
                    //发送失败
                    console.log('发送失败')
                    this.chatArrays[this.chatArrays.length - 1].isSuccess = 3
                })

            },
            // 失败重新发送
            reSend(index){
                console.log(index)
                this.chatArrays[index].isSuccess = 1
                let params = {
                    to_uid: this.$route.params.uid,
                    text: this.chatArrays[index].content
                }
                this.$api.restfulApi.post('im/send/text', params).then(() => {
                    console.log('发送成功')
                    this.chatArrays[this.chatArrays.length - 1].isSuccess = 2
                }).catch(err => {
                    //发送失败
                    console.log('发送失败')
                    this.chatArrays[this.chatArrays.length - 1].isSuccess = 3
                })

            },
            //更新会话状态
            updateStatus(){
                this.$api.restfulApi.post('im/update', {to_uid: this.$route.params.uid}).then(res => {
                    console.log('状态修改成功')
                }).catch(err => {

                })
            },
            //点击卡片
            clickCard(id){
                this.$api.restfulApi.post('device/receive', {deviceId: id}).then(res => {
                    console.log('领取设备成功')
                    this.$router.push('/device/' + id)
                }).catch(err => {

                })
            },
            //返回消息列表
            back(){
                this.updateStatus()
                this.$router.push('/message')
            },
            // 将滚动条保持在底部
            scrollToBottom(){
                this.$nextTick(() => {
                    let container = document.getElementsByClassName('wrap')[0]
                    //console.log(container)
                    container.scrollTop = container.scrollHeight
                })
            }
        },
        components: {
            Time
        }
    }
</script>

<style lang='scss'>
.wrap{
    position: relative;
    overflow: auto;
    margin: 120px auto;
    padding: 40px;
    background: #fff;
    width: 960px;
    height: 700px;
    .el-image-viewer__close{
        top: 130px;
    }
    .content{
        .el-row{
            margin-top: 20px;
        }
        .left{
            .info{
                 background: #F7F7F7;
            }
        }
        .right{
            float: right;
            .info{
                 background: #ADD3FF;
            }
        }
        .info{
            display: inline-block;
            padding: 10px;
            margin: 0 8px;
            width: auto;
            max-width: 360px;
            border-radius: 7px;
            word-wrap: break-word;
        }
        .time{
            margin: 0 auto;
            margin-bottom: 20px;
            width: 126px;
            font-size: 12px;
            font-weight: 400;
            color: #999;
        }
        .image{
            display: inline-block;
        }
        .card{
            display: inline-block;
            padding: 10px;
            margin: 0 8px;
            width: auto;
            border: 1px solid #B2B2B2;
            border-radius:4px;
            cursor: pointer;
            user-select: none;
            .title{
                font-size: 16px;
                font-weight: 400;
                color: #999;
            }
            .left{
                float: left;
            }
            .card_info{
                margin-left: 90px;
                .serial{
                    color: #333;
                    font-size: 17px;
                    font-weight: bold;
                }
            }
        }
    }
    .bottom{
        position: fixed;
        left: 0;
        bottom: 36px;
        width: 100%;
        z-index: -100;
        .group{
            width: 600px;
            margin: 0 auto;
            position: relative;
            .text{
                width: 460px;
                margin-left: 10px;
            }
            .btn{
                position: absolute;
                bottom: 3px;
                margin-left: 8px;
            }
        }
    }
}
</style>