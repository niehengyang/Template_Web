<template>
    <div width="100%">
        <div class="reset-box">
            <div
                style="font-size:22px; font-weight: 600; line-height:32px; margin-bottom: 30px;"
            >{{$t('lang.reset-pw')}}</div>
            <el-form
                :model="dataForm"
                :rules="formRules"
                ref="dataForm"
                label-position="right"
                class="dialog-body"
            >
                <el-form-item prop="keyword">
                    <el-input
                        size="medium"
                        v-model="dataForm.keyword"
                        prefix-icon="el-icon-mobile-phone"
                        :placeholder="$t('lang.reset-account')"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="code">
                    <el-input
                        size="medium"
                        prefix-icon="el-icon-chat-dot-square"
                        v-model="dataForm.code"
                        :placeholder="$t('lang.reset-code')"
                        style="width:180px;margin-right:10px"
                    ></el-input>
                    <el-button
                        v-if="noGetCode"
                        plain
                        size="medium"
                        @click="getCode"
                        style="float: right;height:44px"
                    >{{$t('lang.get-code')}}</el-button>
                    <el-button
                        v-if="!noGetCode"
                        type="info"
                        plan
                        size="medium"
                        disabled
                        style="padding:10px 5px;float: right;height:44px;"
                    >{{$t('lang.re-send')}}（{{reTimes}}）</el-button>
                </el-form-item>
                <el-form-item prop="newPwd">
                    <el-input
                        size="medium"
                        v-model="dataForm.newPwd"
                        show-password
                        prefix-icon="el-icon-lock"
                        :placeholder="$t('lang.reset-new')"
                    ></el-input>
                </el-form-item>
                <el-form-item prop="checkPwd">
                    <el-input
                        size="medium"
                        v-model="dataForm.checkPwd"
                        show-password
                        prefix-icon="el-icon-lock"
                        :placeholder="$t('lang.reset-check')"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group">
                <div class="back">
                    <span @click="goLogin">{{$t('lang.back-login')}}</span>
                </div>
                <div>
                    <el-button
                        type="primary"
                        @click="revisePassworld('dataForm')"
                    >{{$t('lang.submit')}}</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        var validatePass = (rule, value, callback) => {
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
            if (value === "") {
                callback(new Error(this.$t("lang.hint-pw")));
            } else if (!reg.test(value)) {
                callback(new Error(i18n.t('lang.tip-password')))
            }else {
                if (this.dataForm.checkPwd !== "") {
                    this.$refs.dataForm.validateField("checkPwd");
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            console.log(value);
            let reg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/
            if (!value) {
                callback(new Error(this.$t("lang.hint-rpw")));
            }else if (!reg.test(value)) {
                callback(new Error(i18n.t('lang.tip-password')))
            }else if (value !== this.dataForm.newPwd) {
                callback(new Error(this.$t("lang.hint-cpw")));
            } else {
                callback();
            }
        };
        return {
            reTimes: 20,
            intervalTimes: "",
            dataForm: {
                keyword: "",
                newPwd: "",
                code: ""
            },
            noGetCode: true,
            validatePass: validatePass,
            validatePass2: validatePass2
        };
    },
    created() {},
    computed: {
        formRules: function() {
            return {
                keyword: [
                    {
                        required: true,
                        message: this.$t("lang.reset-account"),
                        trigger: "blur"
                    }
                ],
                newPwd: [{ validator: this.validatePass, trigger: "blur" }],
                checkPwd: [{ validator: this.validatePass2, trigger: "blur" }],
                code: [
                    {
                        required: true,
                        message: this.$t("lang.reset-code"),
                        trigger: "blur"
                    }
                ]
            };
        }
    },
    components: {},
    methods: {
        //获取验证码
        getCode() {
            let that = this;
            that.noGetCode = false;
            that.intervalTimes = setInterval(function() {
                if (that.reTimes > 0) {
                    that.reTimes -= 1;
                } else {
                    that.cleanCalculagraph(that);
                }
            }, 1000);
            if(!this.dataForm.keyword){
                this.$message({
                    message: this.$t('lang.reset-account'),
                    type: "error"
                })
                this.cleanCalculagraph(this);
            }else{
                axios.post("/api/sendCode",{keyword:this.dataForm.keyword})
                .then(res=>{
                    console.log('发送成功');
                    this.$message({
                            message: this.$t('lang.code-success'),
                            type: "success"
                        })
                }).catch(error => {
                    console.log(error);
                    this.$message({
                        message: error.response.data.message,
                        type: "error"
                    })
                    this.cleanCalculagraph(this);
                })  
            }
            
        },
        //清除计时器
        cleanCalculagraph(that) {
            if (that.intervalTimes) {
                that.noGetCode = true;
                clearInterval(that.intervalTimes);
                that.reTimes = 20;
            }
        },
        //修改密码
        revisePassworld(formName) {
            this.$refs[formName].validate(valid => {
                if(!valid) return;
                this.dataForm.password=this.dataForm.newPwd;
                axios.post("/api/resetPassword",this.dataForm)
                .then(res=>{
                    this.$message({
                        message: this.$t('lang.reset-success'),
                        type: "success"
                    })
                }).catch(error => {
                        console.log(error.response);
                        this.$message({
                            message: error.response.data.message,
                            type: "error"
                        })
                    })
            });
            this.cleanCalculagraph(this);
        },
        //返回登录
        goLogin() {
            this.$router.push({ path: "/" });
        }
    }
};
</script>

<style lang="scss">
.reset-box {
    box-sizing: border-box;
    height: 450px;
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
        .back {
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
</style>