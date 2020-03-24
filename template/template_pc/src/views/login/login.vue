<template>
    <div class="login">
        <div class="login-box">
            <div
                style="font-size:22px; font-weight: 600; line-height:32px; margin-bottom: 30px;"
            >{{$t('lang.login-in')}}</div>
            <el-form
                class="login-form"
                :rules="formRules"
                ref="loginForm"
                :model="loginForm"
                label-position="right"
            >
                <el-form-item prop="username">
                    <el-input
                        size="medium"
                        prefix-icon="el-icon-user"
                        v-model="loginForm.username"
                        :placeholder="$t('lang.login-account')"
                    ></el-input>
                    <div class="el-form-item__error">{{nameErrorMsg}}</div>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input
                        size="medium"
                        prefix-icon="el-icon-lock"
                        v-model="loginForm.password"
                        show-password
                        :placeholder="$t('lang.login-pw')"
                    ></el-input>
                    <div class="el-form-item__error" style="width:150%">{{pwdErrorMsg}}</div>
                </el-form-item>
                <div class="dialog-footer dialog-btn-group">
                    <div class="reset">
                        <span @click="goReset">{{$t('lang.forgot-pw')}}</span>
                    </div>
                    <el-button
                        type="primary"
                        @click="handleLoginSubmit"
                        :loading="loginLoading"
                    >{{loginText}}</el-button>
                </div>
            </el-form>
        </div>
    </div>
</template>

<script>
import TokenFactory from "@/utils/tokenfactory";

export default {
    data() {
        return {
            loginForm: {},
            nameErrorMsg: "",
            pwdErrorMsg: "",
            nameError: false,
            pwdError: false,
            loginLoading: false,
            //处理有默认值的语言转换
            newLoginText: ""
        };
    },
    computed: {
        formRules: function() {
            return {
                username: [
                    {
                        required: true,
                        message: this.$t("lang.login-account"),
                        trigger: "blur"
                    }
                ],
                password: [
                    {
                        required: true,
                        message: this.$t("lang.login-pw"),
                        trigger: "blur"
                    }
                ]
            };
        },
        loginText: {
            get: function() {
                return this.newLoginText == ""
                    ? this.$t("lang.login-in")
                    : this.newLoginText;
            },
            set: function(newVal) {
                this.newLoginText = newVal;
            }
        }
    },
    created() {
        
    },
    methods: {
        //处理登陆表单提交
        handleLoginSubmit() {
            this.$refs.loginForm.validate(valid => {
                if (!valid) return;
                console.log("---------");
                this.loginLoading = true;
                this.loginText = this.$t("lang.be-logging-in");
                axios
                    .post("/api/auth/login", {
                        loginname: this.loginForm.username,
                        password: this.loginForm.password,
                        lang:this.$i18n.locale,
                    })
                    .then(res => {
                        console.log(res)
                        if(res.data.websocket_url){
                            localStorage.setItem("websocket_url",res.data.websocket_url)
                        }
                        TokenFactory.setToken(res.data.token);
                        window.location.href = "/admin/";
                    })
                    .catch(error => {
                        console.log(error);
                        this.pwdErrorMsg = error.response.data.code
                        if(error.response.data.code==4007){
                            this.pwdErrorMsg = this.$t("lang.no-login")
                        }
                        
                        if(error.response.data.code == 4001){
                            this.pwdErrorMsg = this.$t("lang.wrong-pw")
                        }
                        this.nameError = true;
                        this.pwdError = true;
                    })
                    .finally(() => {
                        this.loginLoading = false;
                        this.loginText = this.$t("lang.login-in");
                    });
            });
        },
        //跳转重置密码
        goReset() {
            this.$router.push({ path: "/reset" });
        }
    }
};
</script>

<style lang="scss" rel="stylesheet/sass">
.login {
    width:100%;
    height:100%;
    align-items: center;
    .login-box {
        box-sizing: border-box;
        width: 416px;
        height: 360px;
        padding: 30px 48px 57px;
        background: #fff;
        margin: 50px auto;
        border: 1px solid transparent;
        border-radius: 10px;
        box-shadow: 0 2px 10px 0 rgba(72, 129, 243, 0.2);
        .el-form-item {
            margin-bottom: 22px;
            .el-form-item__content {
                width: inherit;
                .el-input--medium .el-input__inner {
                    height: 44px !important;
                }
                .el-input--medium .el-input__icon {
                    line-height: 44px;
                    font-size: 18px;
                }
            }
        }
        .dialog-footer {
            padding: 0;
            margin: 0;
            .reset {
                text-align: right;
                color: #4674c9;
                cursor: pointer;
                margin-bottom: 15px;
            }
            .el-button {
                width: 100%;
            }
        }
    }
}
</style>