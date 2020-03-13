<template>
    <div>
        <el-form class="device-form" :model="createForm" ref="createForm" :rules="createFormRules" label-position="right" label-width="100px"
                 v-loading="dialogAddLoading"
        >
            <el-form-item :label="$t('lang.msg-title')" prop="msg_name">
                <el-input size="medium" v-model="createForm.msg_name" :placeholder="$t('lang.hint-Msgtitle')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.msg-type')" prop="msg_type" >
                <el-select size="medium" v-model="createForm.msg_type" :placeholder="$t('lang.hint-Msgtype')">
                    <el-option v-for="item in typeArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.recipients')" prop="msg_receiver">
                <el-select size="medium" v-model="createForm.msg_receiver" :placeholder="$t('lang.hint-Msggroup')">
                    <el-option v-for="item in receiverArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.device-type')" prop="device_type">
                <el-select size="medium" v-model="createForm.device_type" :placeholder="$t('lang.hint-Dtype')">
                    <el-option v-for="item in receiverArray" :key="item.value" :label="item.label" :value="item.value"></el-option>
                </el-select>
            </el-form-item>
            <el-form-item :label="$t('lang.msg-content')" prop="msg_content">
                <el-input type="textarea" size="medium" v-model="createForm.msg_content" :placeholder="$t('lang.hint-Msgcon')"></el-input>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog('createForm')" :disabled="dialogAddLoading?true:false">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="create()" :disabled="dialogAddLoading?true:false">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Create",
        data(){
            return {
                createForm: {},
                createFormRules: {
                    msg_name: [
                        {required: true, message: "请输入消息标题", trigger: "blur"}
                    ],
                    msg_type: [
                        {required: true, message: "请选择消息类型", trigger: "change"}
                    ],
                    msg_receiver: [
                        {required: true, message: "请选择消息接收群体", trigger: "change"}
                    ],
                    device_type: [
                        {required: true, message: "请选择设备类型", trigger: "change"}
                    ],
                    msg_content: [
                        {required: true, message: "请输入消息内容", trigger: "blur"}
                    ],
                },
                dialogAddLoading: false,
                typeArray: [
                    {label: '工单消息', value: '0'},
                    {label: '维保提醒', value: '1'},
                    {label: '告警消息', value: '2'},
                    {label: '会话消息', value: '3'}
                ],
                receiverArray: [
                    {label: '产品群发', value: '0'},
                    {label: '管理域群发', value: '1'},
                    {label: '用户', value: '2'},
                ]
            }
        },
        components: {

        },
        methods: {
            closeDialog(formName){
                //this.resetForm(formName)
                this.$emit('closeCreate')
            },
            //创建
            create() {
                this.$refs["createForm"].validate(valid => {
                    if (!valid) return;
                    this.dialogAddLoading = true;
                    this.$api.restfulApi.create("device", this.createForm).then(() => {
                        this.$message.success("角色添加成功！");
                        this.dialogAddLoading = false;
                        this.resetForm("createForm");
                        this.$emit('create')
                    }).catch(err => {
                        this.dialogAddLoading = false
                    })
                });
            }
        }
    }
</script>

<style scoped>

</style>