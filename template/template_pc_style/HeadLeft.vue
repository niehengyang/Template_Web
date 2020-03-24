<template>
    <div style="position:fixed;top:0;width:100%;z-index:2001">
        <div class="head">
            <div class="head-logo">
                <div class="logo-img">
                    <img src="@/assets/images/head/logo.png" class="logo" alt />
                    <div v-if="lang=='cn'" class="text">{{$t('lang.login-title')}}</div>
                </div>
                <!-- <div class="logo-title">
                <p style="letter-spacing: 3px;">GCHV {{$t('lang.zhigao')}}</p>
                <p style="font-weight: 800; font-size: 16px; letter-spacing: 6px;">{{$t('lang.login-title')}}</p>
                </div>-->
            </div>
            <div class="head-nav">
                <div class="nav-group">
                    <el-menu
                        :default-active="navLeftActive"
                        class="el-menu-demo"
                        mode="horizontal"
                        :router="true"
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        background-color="#1A202E"
                    >
                        <el-menu-item index="/home/" v-if="permissionList['home']">
                            <img src="@/assets/images/head/sy_v.png" v-if="pathUrl == '/home/'" alt />
                            <img src="@/assets/images/head/sy_n.png" v-else alt />
                            <span>{{$t('lang.home')}}</span>
                        </el-menu-item>
                        <el-submenu index="/device/" v-if="permissionList['device']">
                            <template slot="title">
                                <img
                                    src="@/assets/images/head/sbgl_v.png"
                                    alt
                                    v-if="pathUrl == '/device/'"
                                />
                                <img src="@/assets/images/head/sbgl_n.png" v-else alt />
                                <span>{{$t('lang.device-manage')}}</span>
                            </template>
                            <el-menu-item
                                index="/device/"
                                v-if="permissionList['deviceList']"
                            >{{$t('lang.device-list')}}</el-menu-item>
                            <el-menu-item
                                index="/devicetype/"
                                v-if="permissionList['deviceType']"
                            >{{$t('lang.device-type')}}</el-menu-item>
                            <!-- <el-menu-item
                                index="/devicegroup/"
                                v-if="permissionList['deviceGroup']"
                            >{{$t('lang.device-group')}}</el-menu-item> -->
                        </el-submenu>
                        <el-submenu index="/alarm/" v-if="permissionList['alarm']">
                            <template slot="title">
                                <img
                                    src="@/assets/images/head/gjgz_v.png"
                                    alt
                                    v-if="pathUrl == '/alarm/'"
                                />
                                <img src="@/assets/images/head/gjgz_n.png" alt v-else />
                                <span>{{$t('lang.alarm-fault')}}</span>
                            </template>
                            <el-menu-item
                                index="/alarm/"
                                v-if="permissionList['alarmList']"
                            >{{$t('lang.fault-alarm')}}</el-menu-item>
                            <el-menu-item
                                index="/rule/"
                                v-if="permissionList['alarmRule']"
                            >{{$t('lang.alarm-rule')}}</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/knowledge/" v-if="permissionList['knowledge']">
                            <template slot="title">
                                <img
                                    src="@/assets/images/head/zsk_v.png"
                                    alt
                                    v-if="pathUrl == '/knowledge/'"
                                />
                                <img src="@/assets/images/head/zsk_n.png" alt v-else />
                                <span>{{$t('lang.knowledge')}}</span>
                            </template>
                            <el-menu-item
                                index="/knowledge/"
                                v-if="permissionList['deviceFile']"
                            >{{$t('lang.device-data')}}</el-menu-item>
                            <el-menu-item
                                index="/knowledge_info/"
                                v-if="permissionList['faultFile']"
                            >{{$t('lang.fault-data')}}</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/data/" v-if="permissionList['data']">
                            <template slot="title">
                                <img
                                    src="@/assets/images/head/sjfx_v.png"
                                    alt
                                    v-if="pathUrl == '/data/'"
                                />
                                <img src="@/assets/images/head/sjfx_n.png" alt v-else />
                                <span>{{$t('lang.data-analyst')}}</span>
                            </template>
                            <el-menu-item
                                index="/data/"
                                v-if="permissionList['dataUser']"
                            >{{$t('lang.user-stats')}}</el-menu-item>
                            <el-menu-item
                                index="/data/device"
                                v-if="permissionList['dataDevice']"
                            >{{$t('lang.air-stats')}}</el-menu-item>
                        </el-submenu>
                        <el-submenu index="/sys/" v-if="permissionList['system']">
                            <template slot="title">
                                <img
                                    src="@/assets/images/head/xtpz_v.png"
                                    alt
                                    v-if="pathUrl == '/sys/'"
                                />
                                <img src="@/assets/images/head/xtpz_n.png" alt v-else />
                                <span>{{$t('lang.MSconfig')}}</span>
                            </template>
                            <el-menu-item
                                index="/sys/"
                                v-if="permissionList['user']"
                            >{{$t('lang.users-manage')}}</el-menu-item>
                            <el-menu-item
                                index="/area"
                                v-if="permissionList['area']"
                            >{{$t('lang.area-manage')}}</el-menu-item>
                            <el-menu-item
                                index="/message/"
                                v-if="permissionList['message']"
                            >{{$t('lang.message-center')}}</el-menu-item>
                            <el-menu-item
                                index="/log/system"
                                v-if="permissionList['log']"
                            >{{$t('lang.syslog')}}</el-menu-item>
                            <el-menu-item
                                index="/version/android"
                                v-if="permissionList['version']"
                            >{{$t('lang.version-manage')}}</el-menu-item>
<!--                            <el-menu-item-->
<!--                                index="/tools"-->
<!--                                v-if="permissionList['tools']"-->
<!--                            >{{$t('lang.small-tools')}}</el-menu-item>-->
<!--                            <el-menu-item-->
<!--                                index="/faultManage"-->
<!--                                v-if="permissionList['dataDevice']"-->
<!--                            >{{$t('lang.fault-manage')}}</el-menu-item>-->
                            <el-menu-item
                                    index="/ota"
                                    v-if="loginType == '1' || loginType == '2'"
                            >{{$t('lang.ota')}}</el-menu-item>
                        </el-submenu>
                    </el-menu>
                </div>
            </div>
            <div class="head-user">
                <el-menu>
                    <el-menu
                        text-color="#fff"
                        active-text-color="#ffd04b"
                        background-color="#1A202E"
                        :default-active="activeIndex"
                        :router="true"
                        mode="horizontal"
                    >
                        <el-menu-item :title="$t('lang.message')" @click="dialogMsgVisible = true">
                            <el-badge :value="badgeValue" :max="99">
                                <i class="el-icon-message-solid badge-msg"></i>
                            </el-badge>
                        </el-menu-item>
                        <el-submenu index="me">
                            <template slot="title">{{$t('lang.hello')}}{{loginUser.loginname}}</template>
                            <el-menu-item index="/personal">{{$t('lang.infos-person')}}</el-menu-item>
                            <el-menu-item @click="logoutConfirm">{{$t('lang.logout')}}</el-menu-item>
                        </el-submenu>
                        <el-menu-item>
                            <div class="head-photo">
                                <el-avatar :src="loginUser.avatar_path" @error="true">
                                    <img src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"/>
                                </el-avatar>
                            </div>
                        </el-menu-item>
                    </el-menu>
                </el-menu>
            </div>
        </div>
        <el-dialog
                class="dialog-msg"
                :title="$t('lang.notify')"
                :visible.sync="dialogMsgVisible"
                center
                :modal="false"
                width="300px"
        >
            <div class="msg-ul" v-if="messages != 0">
                <ul>
                    <li v-for="(message, index) in messages" :key="index">
                        <div class="li-item-header">
                            <span>{{message.name}}</span>
                            <span>【{{msgType[message.type]}}】</span>
                        </div>
                        <div class="li-item-footer">
                            <span>{{message.created_at}}</span>
                        </div>
                    </li>
                </ul>
            </div>
            <div v-else style="text-align: center">{{$t('lang.no-data')}}</div>
            <div
                    slot="footer"
                    class="dialog-footer dialog-btn-group"
                    v-if="messages.length != 0"
            >
                <p @click="close" style="color: #409EFF;margin-bottom: 10px;cursor: pointer;">{{$t('lang.see-more')}}</p>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import TokenFactory from "@/utils/tokenfactory";
export default {
    props: ["currentRoute"],
    data() {
        return {
            permissionList: window.__permission_list__,
            activeIndex: "2",
            //消息条数
            badgeValue: 0,
            logoutVisible: false,
            dialogMsgVisible: false,
            messages: [
                // {name: '小梦发来', type: '1', created_at: '2019.11.22 12:19'},
                // {name: '温度过高', type: '0', created_at: '2019.11.22 12:19'}
            ],
            msgType: [this.$t('lang.alarm-msg'),this.$t('lang.msg-inter')],
        };
    },
    computed: {
        //处理菜单切换，对应样式变动
        lang: function() {
            return this.$i18n.locale;
        },
        navLeftActive: function() {
            if (this.currentRoute.name) {
                return "/" + this.currentRoute.name.split("_")[0] + "/";
            }
        },
        pathUrl: function() {
            if (this.currentRoute.name) {
                return "/" + this.currentRoute.name.split("_")[0] + "/";
            }
        }
    },

    created() {
        this.listen()
        this.getMessage()
    },
    methods: {
       
        //监听数据
        listen(){
            this.$doudou.listen("message_notify", data => {
                console.log("----------listen-----------");
                console.log('监听数据',data);
                if(data.type == '1'){//判断为会话消息
                    if(this.$route.path == '/message/dialogue'){//如果为聊天界面
                        if(data.from == this.$route.params.uid) return
                        this.messages.unshift(data)
                        if(this.messages.length > 4){
                            this.messages.pop()
                        }
                        this.badgeValue = data.unreadNum
                    }
                }else{
                    this.messages.unshift(data)
                    if(this.messages.length > 4){
                        this.messages.pop()
                    }
                    this.badgeValue = data.unreadNum 
                }
            })
        },
        //关闭弹窗
        close(){
            this.$router.push('/message')
            this.dialogMsgVisible = false
        },
        // 获取未读信息
        getMessage(){
            this.$api.restfulApi.list("message",{
                pageSize: 4,
                unRead: 1
            }).then((res) => {
                console.log('获取未读消息', res);
                if(res.data.length > 0){
                    this.badgeValue = res.data[0].unreadNum;
                }else{
                    this.badgeValue = 0
                }
                this.messages = res.data
            })
        },
        //退出
        logoutConfirm() {
            this.$confirm(this.$t("lang.affirm-logout"), this.$t("lang.tip"), {
                confirmButtonText: this.$t("lang.submit"),
                cancelButtonText: this.$t("lang.cancel"),
                type: "warning"
            }).then(() => {
                TokenFactory.clearToken();
                localStorage.removeItem('websocket_url');
                window.location.href = "/login/";
            });
        }
    }
};
</script>

<style lang="scss">
.el-menu--popup-bottom-start {
    background: #fff !important;

    li {
        background: #fff !important;
        color: #666666 !important;
        &:hover {
            color: #333333 !important;
            background: #f1f1f1 !important;
        }
    }
}
/*消息通知弹窗*/
.dialog-msg{
    .el-dialog{
        position: absolute;
        right: 100px;
        top: 70px;
        margin-top: 0 !important;
        .el-dialog__header{
            padding: 10px 20px 10px;
            background: #cdcdcd;
            .el-dialog__headerbtn{
                top: 10px;
            }
        }
        .el-dialog__body{
            padding: 10px 25px 10px;
            .msg-ul{
                li{
                    padding-bottom: 10px;
                    border-bottom: 1px solid #ebeef5;
                }
                li:last-child{
                    border-bottom: none;
                }
                .li-item-header{
                    line-height: 25px;
                    span:first-child{
                        float: left;
                        color: #ff0000;
                    }
                    span:last-child{
                        float: right;
                        color: #909399;
                    }
                }
                .li-item-footer{
                    clear: both;
                    line-height: 25px;
                    color: #303133;
                }
            }
        }
        .el-dialog__footer{
            padding: 0 0 10px;
        }
    }
}
.dialog-form{
    .el-dialog__footer{
        .dialog-footer{
            display: flex;
            justify-content: flex-end;
        }
    }
}
@media screen {
    .head {
        height: 70px;
        background: #1a202e;
        display: flex;
        flex-wrap: wrap;
        position: relative;
        @media (max-width: 1280px) {
            height: 130px;
        }
        .head-logo {
            display: flex;
            align-items: center;
            width: 120px;
            height: 70px;
            margin-left:50px;
            justify-content: center;
            margin-right: 30px;
            .logo-img {
                .text {
                    color: #ffffff;
                    font-size: 13px;
                    font-weight: 300;
                    margin-top: 2px;
                }
                img {
                    width: 120px;
                    height: 30px;
                }
            }
            .logo-title {
                width: 160px;
                height: 40px;
                color: #fff;
            }
        }

        .head-nav {
           @media (max-width: 1280px) {
                width: 100%;
            }
            .nav-group {
                background:#1a202e;
                margin: 0 auto;
                height: 60px;
                display: flex;
                align-items: center;
                justify-content: center;
                ul {
                    max-width:840px;
                    display: flex;
                    border: none;
                }
            }
            img {
                width: 24px;
                height: 24px;
                vertical-align: middle;
                margin-right: 10px;
            }
        }
        .head-user {
            position: absolute;
            right: 50px;
            .el-menu.el-menu--horizontal {
                border-bottom: none;
            }
            .el-badge {
                width: 30px;
                height: 24px;
                z-index:100;
                .badge-msg {
                    font-size: 20px;
                    position: absolute;
                    top: 3px;
                    &:hover {
                        color: #5687ec;
                    }
                }
                .el-badge__content {
                    right: 20px;
                    top: 3px;
                }
            }
            ul {
                border: none;
                display: flex;
            }
            li {
                padding: 0px;
            }
        }
    }
}
</style>