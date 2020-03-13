<template>
    <div class="monitor">
        <el-tabs class="tab-style" type="card" v-model="tabActiveName" @tab-click="tabClick">
            <el-tab-pane
                v-for="(tab,index) in tabArray"
                :label="tab.label"
                :name="tab.name"
                :key="index"
            ></el-tab-pane>
        </el-tabs>

        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tabActiveName: "monitorBasis",
            device_id: "",
            tabArray: [
                {
                    label: this.$t("lang.monitor-basis"),
                    name: "monitorBasis",
                    path: "/monitor/" + this.$route.params.device_id + ""
                },
                {
                    label: this.$t("lang.monitor-history"),
                    name: "monitorHistory",
                    path:
                        "/monitor/" + this.$route.params.device_id + "/history/"
                }
            ]
        };
    },
    created() {
        this.device_id = this.$route.params.device_id;
        //头部tabs刷新刷新处理
        if (this.$route.name == "device_monitorHistory") {
            this.tabActiveName = "monitorHistory";
        } else if (this.$route.name == "device_monitorBasis") {
            this.tabActiveName = "monitorBasis";
        }
    },
    methods: {
        tabClick(tab) {
            //切换页面
            this.tabArray.forEach(item => {
                if (this.tabActiveName == item.name) {
                    this.$router.push({ path: item.path });
                }
            });
        }
    }
};
</script>

<style lang="scss">
.monitor {
    .el-tabs {
        min-width: 1024px;
    }
    .el-tabs--card > .el-tabs__header .el-tabs__item.is-active {
        background: #6caffe;
        color: #ffffff;
        border-bottom-color: none;
    }
}
</style>