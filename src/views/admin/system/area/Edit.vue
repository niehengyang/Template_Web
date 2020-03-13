<template>
    <div>
        <el-form
                :model="dialogEditForm"
                ref="dialogEditForm"
                :rules="formRules"
                label-position="right"
                label-width="100px"
                v-loading="editLoading"
        >
            <el-form-item :label="$t('lang.area')" prop="name">
                <el-input size="medium"
                          v-model="dialogEditForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-areaName')"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="dialogClose">{{$t('lang.cancel')}}</el-button>
            <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="handleEditConfirm('dialogEditForm')"
            >{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['editData'],
        name: "Edit",
        data(){
            return {
                dialogEditForm: {},
                formRules: {
                    name: [
                        { required: true, validator: validateTrim, trigger: "blur" },
                        {max: 50, message: this.$t('lang.long-area'), trigger: "blur"}
                    ]
                },
                editLoading: false,
            }
        },
        created(){
            this.dialogEditForm = this.editData
        },
        watch: {
            editData(){
                this.dialogEditForm = this.editData
            }
        },
        methods: {
            dialogClose(){
                this.$emit('closeEdit')
            },
            //提交编辑表单
            handleEditConfirm(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.editLoading = true;
                        this.$api.restfulApi.edit('area',this.dialogEditForm.id ,this.dialogEditForm).then(() => {
                            this.editLoading = false;
                            this.$message({
                                message: this.$t('lang.edit-success'),
                                type: "success"
                            });
                            this.$emit('edit')
                        }).catch(err => {
                            this.editLoading = false
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            },
        }
    }
</script>

<style scoped>

</style>