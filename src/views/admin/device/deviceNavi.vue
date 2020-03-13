<template>
    <div class="query" :style="ispull?'left:-160px;':'left:0'">
        <div class="title">
            <span>{{$t('lang.device-navi')}}</span>
        </div>
        <div class="area-list">
            <!-- <el-tree :data="treeData" :props="props" highlight-current></el-tree> -->

            <el-tree
                :data="treeData"
                :props="props"
                node-key="id"
                @node-click="handleNodeClick"
                :default-expanded-keys="[treeData[0].id]"
                :expand-on-click-node="false"
                :highlight-current="true"
            ></el-tree>
        </div>
        <div
            class="pull"
            :style="ispull ? 'transform: rotateY(180deg); right: -17px;' : 'transform: rotateY(0deg);'"
        >
            <img src="@/assets/images/icon/pull.png" @click="pullNavi" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            treeData: [
                {
                    id: ""
                }
            ],
            selAreaId: "",
            props: {
                id: "id",
                parent: "parent",
                city: "city",
                province: "province",
                label: "name",
                children: "children"
            },
            ispull: false
        };
    },
    created() {
        this.initData();
    },
    methods: {
        //初始加载
        initData() {
            this.$api.restfulApi.list("area").then(res => {
                console.log("AreaTree数据", res);
                this.treeData = res.data;
            });
        },

        //点击节点
        handleNodeClick(data) {
            this.selAreaId = data.id;
            this.$emit("area-click", this.selAreaId);
        },
        // 收起设备导航
        pullNavi() {
            this.ispull = !this.ispull;
            this.$emit("change-pull", this.ispull);
        }
    }
};
</script>

<style lang="scss">
@media screen {
    .query {
        height: 100%;
        padding: 0 10px !important;
        background: #1a202e !important;
        position: relative;
        transition: 0.5s;
        top: 90px;
        // z-index: 10000;
        @media (max-width: 1280px) {
            top: 130px;
        }
        .title {
            color: #fff;
            padding: 40px 0 10px 0;
            font-size: 16px;
            letter-spacing: 2px;
            border-bottom: 1px solid #fff;
        }
        .area-list {
            margin-top: 15px;
            width: 140px;
            .el-tree--highlight-current
                .el-tree-node.is-current
                > .el-tree-node__content {
                background: #606266;
            }
            .el-tree {
                background: #1a202e;

                .el-tree-node {
                    .el-tree-node__content {
                        color: #fff;
                        &:hover {
                            background: #606266;
                        }
                        & > .el-tree-node__expand-icon {
                            font-size: 16px;
                        }

                        .el-tree-node__label {
                            width: 100px;
                            overflow-x: hidden;
                            overflow-y: hidden;
                            font-size: 14px;
                            &:hover {
                                overflow-x: auto;
                            }

                            &::-webkit-scrollbar {
                                width: 5px;
                                height: 5px;
                                background-color: #f5f5f5;
                            }

                            &::-webkit-scrollbar-thumb {
                                border-radius: 20px;
                                -webkit-box-shadow: inset 0 0 8px
                                    rgba(0, 0, 0, 0.4);
                                background-color: #f5f5f5;
                            }

                            &::-webkit-scrollbar-track {
                                -webkit-box-shadow: inset 0 0 6px
                                    rgba(0, 0, 0, 0.3);
                                border-radius: 20px;
                                background-color: #f5f5f5;
                            }
                        }
                    }
                }
            }
        }
        .pull {
            position: absolute;
            right: 0;
            top: 150px;
            cursor: pointer;
            transition: 0.5s;
        }
    }
}
</style>