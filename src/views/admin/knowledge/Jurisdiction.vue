<template>
    <div>
       <el-row>
           <el-col :span="24">
               <el-checkbox
                       :indeterminate="isIndeterminate"
                       v-model="checkAll"
                       class="title"
                       @change="handleCheckAllChange">{{$t('lang.vendor')}}</el-checkbox>
               <div style="margin: 15px 0;"></div>
               <el-checkbox-group class="group" v-model="checkedCities" @change="handleCheckedCitiesChange">
                   <el-checkbox class="item" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
               </el-checkbox-group>
           </el-col>
       </el-row>
        <el-row style="margin-top: 20px;">
            <el-col :span="24">
                <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        class="title"
                        @change="handleCheckAllChange">{{$t('lang.customer-manager')}}</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group class="group" v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox class="item" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <el-row style="margin: 20px 0; border-bottom: 1px solid #ccc; padding-bottom: 18px">
            <el-col :span="24">
                <el-checkbox
                        :indeterminate="isIndeterminate"
                        v-model="checkAll"
                        class="title"
                        @change="handleCheckAllChange">{{$t('lang.client')}}</el-checkbox>
                <div style="margin: 15px 0;"></div>
                <el-checkbox-group class="group" v-model="checkedCities" @change="handleCheckedCitiesChange">
                    <el-checkbox class="item" v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
                </el-checkbox-group>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer dialog-btn-group" style="text-align: right;">
            <el-button class="white-btn" size="medium" @click="closeDialog()">{{$t('lang.cancel')}}</el-button>
            <el-button class="blue-btn" size="medium" type="primary" @click="submit()">{{$t('lang.submit')}}</el-button>
        </div>
    </div>
</template>

<script>
    const cityOptions = ['上海', '北京', '广州', '深圳'];
    export default {
        name: "Jurisdiction",
        data(){
            return {
                cities: cityOptions,
                checkAll: false,
                isIndeterminate: true,
                checkedCities: ['上海', '北京'],
            }
        },
        methods: {
            handleCheckAllChange(val) {
                this.checkedCities = val ? cityOptions : [];
                this.isIndeterminate = false;
            },
            handleCheckedCitiesChange(value) {
                let checkedCount = value.length;
                this.checkAll = checkedCount === this.cities.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
            },
            closeDialog(){
                this.$emit('closeJuris')
            },
            //提交
            submit(){

            }
        }

    }
</script>

<style scoped lang="scss">
    .title{
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding-left: 6px;
        border: 1px solid rgba(220, 235, 254, 1);
        border-radius: 2px;
        background: #DCEBFE;
    }
    .group{
        padding-left: 20px;
        .item{
            margin-right: 8px;
        }
    }
</style>