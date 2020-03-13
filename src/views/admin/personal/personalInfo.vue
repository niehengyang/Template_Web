<template>
    <div>
        <bread-crumb :crumb-array="[{name:$t('lang.MSconfig')}, {name: $t('lang.personal')}]"></bread-crumb>
        <main-content>
            <div class="main" :loading="mainLoading">
                <div class="up-img-title">{{$t('lang.upload-img')}}</div>
                <div class="upload">
                    <div class="left">
                        <el-avatar :size="60" :src="avatarPath" @error="errorHandler">
                            <img
                                src="https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png"
                            />
                        </el-avatar>
                    </div>
                    <div class="right">
                        <el-upload
                            class="upload-demo"
                            action="/api/update/avatar"
                            :headers="{'X-Requested-With': 'XMLHttpRequest', 'authorization': token}"
                            :limit="1"
                            :on-exceed="handleUpExceed"
                            :on-success="upSuccess"
                            :on-error="upError"
                            :file-list="fileList"
                            :show-file-list="false"
                        >
                            <el-button size="small" plain>{{$t('lang.upload-Newimg')}}</el-button>
                        </el-upload>
                    </div>
                </div>
                <el-form
                    class="form"
                    ref="form"
                    :model="form"
                    :rules="formRules"
                    label-width="100px"
                    label-position="right"
                >
                    <el-form-item :label="$t('lang.user-name')" prop="username">
                        <el-input v-model="form.username" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.user-account')" prop="loginname">
                        <el-input v-model="form.loginname" :disabled="true" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.bind-phone')" prop="cellphone">
                        <el-input v-model="form.cellphone" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                    </el-form-item>
                    <el-form-item :label="$t('lang.bind-email')" prop="email">
                        <el-input v-model="form.email" onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right">
                    <el-button
                        class="blue-btn"
                        size="medium"
                        type="primary"
                        @click="createFormSubmit"
                    >{{$t('lang.sure-alter')}}</el-button>
                </div>
            </div>
        </main-content>
    </div>
</template>

<script>
import tokenFactory from "@/utils/tokenfactory";
export default {
    name: "personalInfo",
    data() {
        return {
            form: {},
            fileList: [],
            token: "",
            avatarPath: "",
            formRules: {
                username: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 50, message: this.$t('lang.long-username'), trigger: "blur"}
                ],
                loginname: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-loginname'), trigger: "blur"}
                ],
                cellphone: [
                    {required: true, validator: validatePhone, trigger: "blur"}
                ],
                email: [
                    { required: false, type: 'email', message: this.$t('lang.email-address'), trigger: 'blur' }
                ]
            },
            mainLoading: false
        };
    },
    mounted() {
        this.token = tokenFactory.getToken();
    },
    created() {
        this.getInfo();
    },
    methods: {
        getInfo() {
            this.mainLoading = true;

            this.$api.restfulApi.item("admin", this.loginUser.id).then(res => {
                console.log(res);
                this.form = res;
                this.avatarPath = res.avatar_path;
                this.mainLoading = false;

                console.log(this.avatarPath);
            }).catch(err => {
                this.mainLoading = false
            })
        },

        //提交表单
        createFormSubmit() {
            // this.mainLoading=true;
            this.$refs.form.validate(valid => {
                if (!valid) return;
                this.$api.restfulApi
                    .edit("admin", this.loginUser.id, this.form)
                    .then(() => {
                        this.$message({
                            message: this.$t("lang.edit-success"),
                            type: "success"
                        });
                        // this.mainLoading=false;
                        window.location.reload();
                        this.getInfo();
                    });
            });
        },
        //文件超出个数限制
        handleUpExceed(files, fileList) {
            this.$message.warning(
                this.$t("lang.limit-fileNum") +
                    `1，` +
                    this.$t("lang.current-fileNum") +
                    `${files.length} ，` +
                    this.$t("lang.all-fileNum") +
                    `${files.length + fileList.length} `
            );
        },
        //文件上传成功
        upSuccess(response, file, files) {
            console.log(files);
            let res = files[0].response;
            this.avatarPath=res.avatar_path
            this.fileList=[];
        },
        //文件上传失败
        upError(err, file, fileList) {
            // this.form.avatar = "";
            this.fileList=[];
        },
        errorHandler() {
            return true;
        }
    }
};
</script>

<style  lang="scss">
.main {
    margin: 50px auto 150px;
    width: 350px;
    .up-img-title {
        width: 100px;
        text-align: right;
        padding-right: 12px;
    }
    .upload {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-top: 10px;
        height: 80px;
        .left {
            width: 100px;
            text-align: right;
            padding-right: 12px;
        }
        .right {
            margin-right: -10px;
            .upload-file {
                .el-upload {
                    width: auto;
                }
            }
        }
    }
    .form {
        margin-top: 10px;
        width: 100%;
        .el-form-item {
            .el-input__inner {
                width: 260px;
            }
        }
    }
}
</style>