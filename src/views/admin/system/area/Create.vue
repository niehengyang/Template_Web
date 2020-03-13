<template>
    <div>
        <el-form
                :model="dialogForm"
                ref="dialogForm"
                :rules="formRules"
                label-position="right"
                label-width="100px"
                v-loading="submitLoading"
        >
            <el-form-item :label="$t('lang.area')" prop="name">
                <el-input size="medium"
                          v-model="dialogForm.name"
                          onkeyup="this.value=this.value.replace(/\s+/g,'')"
                          :placeholder="$t('lang.hint-areaName')"></el-input>
            </el-form-item>
            <el-form-item :label="$t('lang.area-site')" v-if="formAbled">
                <el-select class="area"
                           size="medium"
                           :disabled="provinceAbled"
                           @visible-change="getProvince"
                           :placeholder="$t('lang.hint-province')"
                           :loading="provinceLoading"
                           v-model="dialogForm.province">
                    <el-option class="option" v-for="item in province"
                               :label="item.region_name"
                               :value="item.region_id"
                               :key="item.region_id"></el-option>
                </el-select>
                <el-select class="area"
                           size="medium"
                           :placeholder="$t('lang.hint-city')"
                           @visible-change="getCity"
                           :loading="cityLoading"
                           :disabled="cityAbled"
                           v-model="dialogForm.city">
                    <el-option class="option"
                               v-for="item in cityOptions"
                               :label="item.region_name"
                               :value="item.region_id"
                               :key="item.region_id"
                    ></el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <el-divider></el-divider>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn"
                       size="medium"
                       :disabled="submitLoading"
                       @click="dialogClose('dialogForm')">{{$t('lang.cancel')}}</el-button>
            <el-button
                    class="blue-btn"
                    size="medium"
                    type="primary"
                    :disabled="submitLoading"
                    @click="handleDialogConfirm('dialogForm')"
            >{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['areaParent'],
        data(){
            return {
                formRules: {
                    name: [
                        { required: true, validator: validateTrim, trigger: "blur" },
                        {max: 50, message: this.$t('lang.long-area'), trigger: "blur"}
                    ]
                },
                dialogForm: {
                    area_parent: "",
                },
                submitLoading: false,
                provinceLoading: false,
                cityLoading: false,
                cityOptions: [],
                province: [],
                provinceAbled: false,
                cityAbled: false,
                formAbled: true,
            }
        },
        watch: {
            areaParent: {
                handler(){
                    this.isDisabled()
                },
                deep: true
            }
        },

        created(){
            this.isDisabled()
            this.$api.restfulApi.list('region', 0).then(res => {
                console.log(res)
                this.province = res.data
            })
        },
        methods: {
            //判断禁用省
            isDisabled(){
                if(this.areaParent.parent == 0){
                    this.formAbled = true
                    this.provinceAbled = false
                    this.cityAbled = true
                }else{
                    if(this.areaParent.city != null || (this.areaParent.province == null && this.areaParent.city == null)){
                        this.formAbled = false
                    }else{
                        this.formAbled = true
                    }
                }
                if(this.areaParent.province != null && this.areaParent.city == null){
                    this.provinceAbled = true
                    this.cityAbled = false
                    this.dialogForm.province = this.areaParent.province
                }
            },
            // 点击取消按钮
            dialogClose(formName){
                this.resetForm(formName)
                this.$emit('close')
            },
            // 获取省
            getProvince(){
                if(this.areaParent.province == null){
                    this.provinceLoading = true
                    let province = this.areaParent.province || 0
                    let params = {parent: province}
                    this.$api.restfulApi.list('region', params).then(res => {
                        //console.log(res)
                        this.province = res.data
                        this.provinceLoading = false
                    }).catch(err => {
                        this.provinceLoading = false
                    })
                }
            },
            // 获取市
            getCity(){
                this.cityLoading = true
                let parentId = this.dialogForm.province ? this.dialogForm.province : this.areaParent.province
                let params = {parent: parentId}
                this.$api.restfulApi.list('region', params).then(res => {
                    //console.log(res)
                    this.cityOptions = res.data
                    this.cityLoading = false
                }).catch(err => {
                    this.cityLoading = false
                })
            },
            // 点击确认按钮
            handleDialogConfirm(formName){
                this.$refs[formName].validate(valid => {
                    if (valid) {
                        this.submitLoading = true;
                        console.log(this.dialogForm);
                        this.dialogForm.area_parent = this.areaParent.id
                        this.$api.restfulApi.create('area', this.dialogForm).then((res) => {
                            this.submitLoading = false;
                            this.$message({
                                message: this.$t('lang.add-success'),
                                type: "success"
                            });
                            this.$emit('create')
                            this.resetForm(formName)
                        }).catch(err => {
                            this.submitLoading = false
                        })
                    } else {
                        console.log("error submit!!");
                        return false;
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
    .area{
        width: 140px;
        .el-input{
            width: 140px;
        }
    }
</style>