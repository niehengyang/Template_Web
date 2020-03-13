<template>
    <div class="history">
        <main-content>
            <el-row>
                <el-col :span="24">
                    <el-select
                        clearable
                        v-model="params.deviceType"
                        :placeholder="$t('lang.sel-inEx')"
                        @change="changeSel"
                    >
                        <el-option
                            v-for="item in inExList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                    <el-select
                        clearable
                        v-if="params.deviceType=='internal'"
                        :placeholder="$t('lang.sel-oneIn')"
                        v-model="params.attachDevId"
                        @visible-change="getInList"
                        :loading="inLoading"
                    >
                        <el-option
                            v-for="item in inList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                    <el-select
                        v-if="params.deviceType=='external'"
                        :placeholder="$t('lang.sel-oneEx')"
                        v-model="params.attachDevId"
                        @visible-change="getExList"
                        clearable
                        :loading="exLoading"
                    >
                        <el-option
                            v-for="item in exList"
                            :key="item.id"
                            :value="item.id"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                    <el-select
                        clearable
                        v-if="params.deviceType=='internal'"
                        :placeholder="$t('lang.sel-oneData')"
                        v-model="params.dataFlow"
                        :loading="inLoading"
                    >
                        <el-option
                            v-for="item in inDataList"
                            :key="item.value"
                            :value="item.value"
                            :label="item.name"
                        ></el-option>
                    </el-select>
                    <el-cascader
                        v-model="params.dataFlow"
                        :placeholder="$t('lang.sel-oneData')"
                        v-if="params.deviceType=='external'"
                        :options="exDataList"
                        :show-all-levels="false"
                    ></el-cascader>
                </el-col>
                <el-col :span="24">
                    <el-date-picker
                            v-model="params.date"
                            size="medium"
                            type="datetimerange"
                            :range-separator="$t('lang.to')"
                            :start-placeholder="$t('lang.startT')"
                            value-format="yyyy/MM/dd HH:mm:ss"
                            :end-placeholder="$t('lang.endT')">
                    </el-date-picker>
                </el-col>
                <el-col :span="24">
                    <el-button
                        type="primary"
                        size="medium"
                        style="float:left;margin:10px 0;"
                        @click="produce"
                    >{{$t('lang.produce')}}</el-button>
                </el-col>
            </el-row>
            <el-row>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane :label="$t('lang.table')" name="first">
                        <table-data :tableParams="paramsList"></table-data>
                    </el-tab-pane>
                    <el-tab-pane :label="$t('lang.view')" name="second" :key="activeName">
                        <view-data :viewParams="viewData" v-if="key='activeName'"></view-data>
                    </el-tab-pane>
                </el-tabs>
            </el-row>
        </main-content>
    </div>
</template>
<script>
import Table from "./table";
import View from "./view";
export default {
    data() {
        return {
            params: {},
            activeName: "first",
            inExList: [
                { name: this.$t("lang.internal"), value: "internal" },
                { name: this.$t("lang.external"), value: "external" }
            ],
            inList: [],
            exList: [],
            inDataList: [
                { value: "temperature2A", name: this.$t('lang.temperature2A') },
                { value: "temperature2B", name: this.$t('lang.temperature2B') },
                { value: "temperature3", name: this.$t('lang.temperature3') },
                { value: "current", name: this.$t('lang.current') },
                { value: "frequency", name: this.$t('lang.frequency') },
                { value: "expansion1", name: this.$t('lang.expansion1') },
                { value: "expansion2", name: this.$t('lang.expansion2') },
                { value: "temperature", name: this.$t('lang.temperature') }
            ],
            exDataList: [
                { value: "temperature3", label: this.$t('lang.temperature') },
                { value: "highVoltage", label: this.$t('lang.highVoltage') },
                { value: "lowVoltage", label: this.$t('lang.lowVoltage') },
                { value: "expansion1", label: this.$t('lang.expansion1') },
                { value: "expansion2", label: this.$t('lang.expansion2') },
                {
                    value: "inverterCompressor",
                    label: this.$t('lang.inverterCompressor'),
                    children: [
                        {
                            value: "temperatureA1",
                            label: this.$t('lang.temperatureA1')
                        },
                        {
                            value: "temperatureA2",
                            label: this.$t('lang.temperatureA2')
                        },
                        {
                            value: "temperatureB1",
                            label: this.$t('lang.temperatureB1')
                        },
                        {
                            value: "temperatureB2",
                            label: this.$t('lang.temperatureB2')
                        },
                        {
                            value: "currentA",
                            label: this.$t('lang.currentA')
                        },
                        {
                            value: "currentB",
                            label: this.$t('lang.currentB')
                        },
                        {
                            value: "frequencyA",
                            label: this.$t('lang.frequencyA')
                        },
                        {
                            value: "frequencyB",
                            label: this.$t('lang.frequencyB')
                        }
                    ]
                }
            ],
            paramsList: [],
            exLoading: false,
            inLoading: false,
            viewData: []
        };
    },
    components: {
        "table-data": Table,
        "view-data": View
    },
    created() {
        //提示用户选择数据
        this.$message({
            showClose: true,
            message: this.$t("lang.hint-queryData"),
            offset: 70
        });
    },
    methods: {
        //监听数据
        // getListen() {
        //     this.$doudou.listen("internal_up", data => {
        //         console.log('listen',data)
        //     });
        // },
        //标签被选中
        handleClick(tab, event) {
            console.log(tab, event);
        },
        //生成
        produce() {
            //console.log(this.params)
            this.paramsList = this.params
            this.$api.restfulApi.list("device/history", this.params).then(res => {
                console.log(res)
                this.viewData = res.data
            })
            this.params = {}
        },
        //获取内机列表
        getInList() {
            this.inLoading = true;
            this.$api.restfulApi
                .list("internals", { device_id: this.$route.params.device_id })
                .then(res => {
                    this.inList = res.data;
                    this.inLoading = false;
                }).catch(err => {
                    this.inLoading = false
            })
        },
        //获取外机列表
        getExList() {
            this.exLoading = true;
            this.$api.restfulApi
                .list("external", this.$route.params.device_id)
                .then(res => {
                    this.exList = res.data;
                    this.exLoading = false;
                }).catch(err => {
                    this.exLoading = false
            })
        },

        //内外机选择改变
        changeSel() {
            // this.params.data = "";
        }
    }
};
</script>
<style lang="scss">
.history {
    .el-select {
        width: 200px;
        margin-right: 10px;
        margin-bottom: 5px;
    }
    .el-date-editor.el-input,
    .el-date-editor.el-input__inner {
        width: 384px;
        margin-right: 10px;
        margin-bottom: 5px;
    }
    .el-tabs {
        min-width: auto;
    }
}
</style>