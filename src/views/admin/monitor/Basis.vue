<template>
    <div>
        <el-row class="b-write">
            <el-tabs v-model="exActiveName" @tab-click="exTabClick">
                <el-tab-pane
                    v-for="(item,index) in externalList"
                    :key="index"
                    :label="item.name"
                    :name="''+item.id+''"
                    :lazy="true"
                >
                    <ex-list :param-list="ex_params"></ex-list>
                </el-tab-pane>
            </el-tabs>
            <div>
                <img src="@/assets/images/noData.png" v-if="externalList.length==0" style="margin:0 auto;display:block"/>
            </div>
        </el-row>
        <el-row class="b-write">
            <el-tabs v-model="inActiveName" @tab-click="inTabClick">
                <el-tab-pane
                    v-for="(item,index) in internalList"
                    :key="index"
                    :label="item.name"
                    :name="''+item.id+''"
                    :lazy="true"
                >
                    <el-row>
                        <el-col :span="10">
                            <in-list :param-list="in_params"></in-list>
                        </el-col>
                        <el-col :span="1" class="line-box">
                            <div class="line"></div>
                        </el-col>
                        <el-col :span="13">
                            <time-list :internal-id="item.id"></time-list>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
            <div>
                <img src="@/assets/images/noData.png" v-if="internalList.length==0" style="margin:0 auto;display:block"/>
            </div>
        </el-row>
    </div>
</template>
<script>
import ExternalList from "./external/List";
import InternalList from "./internal/List";
import TimeList from "./internal/TimeList";
export default {
    data() {
        return {
            exActiveName: "",
            inActiveName: "",
            in_params: {},
            ex_params: {},
            externalList: [],
            internalList: [],
            list: []
        };
    },
    components: {
        "ex-list": ExternalList,
        "in-list": InternalList,
        "time-list": TimeList
    },
    created() {
        this.getExternal();
        this.getInternal();
    },
    methods: {
        //获取外机数据
        getExternal() {
            this.$api.restfulApi
                .list("external", { device_id: this.$route.params.device_id })
                .then(res => {
                    console.log("external", res);
                    this.externalList = res.data;
                    if (this.externalList.length > 0) {
                        if (this.$route.query.exId == undefined) {
                            // console.log(0)
                            this.exActiveName =
                                "" + this.externalList[0].id + "";
                            this.getExParams(0);
                        } else {
                            // console.log(1)
                            this.exActiveName =
                                "" + this.$route.query.exId + "";
                            this.getExParams();
                        }
                    }
                });
        },
        //获取内机数据
        getInternal() {
            this.$api.restfulApi
                .list("internals", {
                    pageSize: 100,
                    device_id: this.$route.params.device_id
                })
                .then(res => {
                    console.log("internal", res);
                    this.internalList = res.data;
                    //展示第一条内机数据
                    if (this.internalList.length > 0) {
                        if (this.$route.query.inId == undefined) {
                            // console.log(0)
                            this.inActiveName =
                                "" + this.internalList[0].id + "";
                            this.getInParams(0);
                        } else {
                            // console.log(1)
                            this.inActiveName =
                                "" + this.$route.query.inId + "";
                            this.getInParams();
                        }
                    }
                });
        },
        //获取内机参数
        getInParams(index) {
            let url;
            if (index != undefined) {
                url = "internal/" + this.internalList[index].id;
            } else if (this.$route.query.inId != undefined) {
                url = "internal/" + this.$route.query.inId;
            }
            this.$api.restfulApi.list(url).then(res => {
                console.log("in_params", res);
                this.in_params = res;
            });
        },
        //获取外机参数
        getExParams(index) {
            let url;
            if (index != undefined) {
                url = "external/" + this.externalList[index].id;
            } else if (this.$route.query.exId != undefined) {
                url = "external/" + this.$route.query.exId;
            }
            this.$api.restfulApi.list(url).then(res => {
                console.log("ex_params", res);
                this.ex_params = res;
            });
        },
        //点击内机Tab
        inTabClick(tab) {
            console.log(tab);
            this.getInParams(tab.index);
        },
        //点击外机Tab
        exTabClick(tab) {
            this.getExParams(tab.index);
        }
    }
};
</script>
<style lang="scss">
.b-write {
    width: 100%;
    min-width: 1024px;
    background: #ffffff;
    padding: 20px 30px;
    margin-top: 20px;
    .el-tabs {
        min-width: 964px;
    }
    .line-box {
        margin-top: 30px;
        .line {
            width: 2px;
            height: 600px;
            background: #e4e4e4;
        }
    }
}
</style>