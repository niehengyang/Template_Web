<template>
    <div>
        <el-select
            size="medium"
            v-model="selectValue"
            :placeholder="$t('lang.hint-area')"
            @visible-change="initData"
        >
            <el-tree
                default-expand-all
                :data="treeData"
                :props="props"
                node-key="id"
                :expand-on-click-node="false"
                @node-click="selectChange"
            >
                <template slot-scope="{ node, data }">
                    <el-option :label="node.label" :value="data.id" class="sel-option"></el-option>
                </template>
            </el-tree>
        </el-select>
    </div>
</template>

<script>
export default {
    model: {
        prop: "parentValue",
        event: "select-change"
    },
    props: {
        parentValue: Number,
    },
    data() {
        return {
            treeData: [],
            selectValue: this.parentValue,
            props: {
                id: "id",
                parent: "parent",
                city: "city",
                province: "province",
                label: "name",
                children: "children",
            }
        };
    },
    created() {
    },
    methods: {
        //初始加载
        initData(val) {
            if (!val) return;
            this.$api.restfulApi
                .list("area")
                .then(res => {
                    console.log("管理域", res);
                    this.treeData = res.data;
                });
        },
        //选择改变触发
        selectChange(data) {
            this.selectValue = data.id;
            this.$emit("select-change", data.id);
        }
    },
    watch: {
        parentValue: function(newValue, oldValue) {
            if (!this.parentValue) {
                this.selectValue = "";
            }
        }
    }
};
</script>

<style lang="scss">
.el-tree {
    background: transparent;
    position: relative;
    .el-tree-node {
        &:focus {
            & > .el-tree-node__content {
                background-color: transparent;
            }
        }

        .el-tree-node__content {
            &:hover {
                background-color: transparent;
            }

            .sel-option {
                width: 100%;
                height: 26px !important;
                margin-right: 10px;
                line-height: 26px;
                position: absolute;
                z-index: -1;
            }
        }
    }
}
</style>
