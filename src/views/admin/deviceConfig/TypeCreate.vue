<template>
    <div>
        <el-dialog
            class="dialog-form"
            :title="$t('lang.type-add')"
            :visible.sync="visible"
            :before-close="close"
            @close="close"
        >
            <el-form
                :rules="formRules"
                ref="createForm"
                :model="createForm"
                label-position="right"
                label-width="150px"
                v-loading="loading"
            >
                <el-form-item :label="$t('lang.type-name')" prop="name">
                    <el-input v-model="createForm.name" :placeholder="$t('lang.hint-Tname')"  onkeyup="this.value=this.value.replace(/\s+/g,'')"></el-input>
                </el-form-item>
                <el-form-item :label="$t('lang.product')" prop="prodtype">
                    <el-select v-model="createForm.prodtype" :placeholder="$t('lang.hint-product')">
                        <el-option
                            v-for="item in proList"
                            :key="item.value"
                            :label="item.name"
                            :value="item.value"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item :label="$t('lang.type-descript')" prop="describe">
                    <el-input
                        type="textarea"
                        :rows="3"
                        :placeholder="$t('lang.hint-Tdesc')"
                        v-model="createForm.describe"
                        onkeyup="this.value=this.value.replace(/\s+/g,'')"
                    ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
                <el-button
                    class="white-btn"
                    size="medium"
                    @click="close()"
                    :disabled="loading?true:false"
                >{{$t('lang.cancel')}}</el-button>
                <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    @click="create()"
                    :disabled="loading?true:false"
                >{{$t('lang.submit')}}</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    props: ["dialogVisible"],
    data() {
        return {
            createForm: {
                name: "",
                describe: ""
            },
            formRules: {
                name: [
                    {required: true, validator: validateTrim, trigger: "blur"},
                    {max: 20, message: this.$t('lang.long-airtype'), trigger: "blur"}
                ],
                prodtype:[
                    {required:true, message: this.$t("lang.hint-product"), trigger:"blur"}
                ],
                describe: [
                    {required: false, max: '200', message: this.$t("lang.long-descript"), trigger: "blur"}
                ]
            },
            proList:[
                {name:this.$t('lang.multi-split'),value:'0'},
                {name:this.$t('lang.water-machine'),value:'1'},
            ],
            loading: false,
            visible: false
        };
    },
    watch: {
        dialogVisible: function(newVal, oldVal) {
            this.visible = newVal;
        }
    },
    methods: {
        //关闭
        close() {
            this.resetForm("createForm");
            this.$emit("dialog-close");
        },
        //提交添加类型表单
        create() {
            this.$refs.createForm.validate(valid => {
                if (!valid) return;
                this.loading = true;
                this.$api.restfulApi
                    .create("devicetype", this.createForm)
                    .then(() => {
                        this.$message({
                            message: this.$t("lang.add-success"),
                            type: "success"
                        });
                        this.loading = false;
                        this.$emit("refresh");
                    }).catch(err => {
                        this.loading = false;
                });
            });
        }
    }
};
</script>

<style scoped>
</style>