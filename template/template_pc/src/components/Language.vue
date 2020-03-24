<template>
    <div class="sel-language">
        <span @click="openSel" class="lang-switch">
            {{$t('lang.lang-switch')}}
            <i :class="isSel?'el-icon-caret-top':'el-icon-caret-bottom'"></i>
        </span>
        <div v-show="isSel" class="sel-box">
            <ul>
                <li
                    v-for="item in localList"
                    :key="item.value"
                    @click="selValue(item.value)"
                    :class="item.isActive?'active':''"
                >{{item.label}}</li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "language",
    data() {
        return {
            lang: localStorage.getItem("lang")
                ? localStorage.getItem("lang")
                : "cn",
            isSel: false
        };
    },
    computed: {
        localList: function() {
            return [
                {
                    value: "cn",
                    label: "中文",
                    isActive: this.lang == "cn" ? true : false
                },
                {
                    value: "en",
                    label: "English",
                    isActive: this.lang == "en" ? true : false
                }
            ];
        }
    },
    methods: {
        openSel() {
            this.isSel = !this.isSel;
        },
        selValue(value) {
            this.$i18n.locale = value;
            localStorage.lang = value;
            //传入后台
            //....
            this.lang = value;
            this.isSel = !this.isSel;
        }
    }
};
</script>
<style scoped lang="scss">
.sel-language {
    position: relative;
    cursor: pointer;
    .lang-switch {
        color: #507cd9;
    }
    .sel-box {
        width: 140px;
        position: absolute;
        right: 0px;
        top: 30px;
        background: #ffffff;
        border: 1px solid #e4e7ed;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        border-radius: 4px;
        .active {
            color: #507cd9;
            font-weight: 600;
        }
        ul {
            li {
                padding: 0 20px;
                position: relative;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                color: #606266;
                height: 34px;
                line-height: 34px;
                box-sizing: border-box;
                cursor: pointer;
                &:hover {
                    color: #507cd9;
                }
            }
        }
    }
}
</style>