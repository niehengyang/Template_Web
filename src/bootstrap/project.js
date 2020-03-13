/* 项目自定义组件 */
//面包屑导航
import Breadcrumb from "../components/global/Breadcrumb"
Vue.component('bread-crumb', Breadcrumb);

//主体内容面板
import MainContent from "../components/global/MainContentWrapper";
Vue.component('main-content', MainContent);

//上传文件
import UploadFile from "../components/global/UploadFile.vue";
Vue.component('upload-file', UploadFile);

//设备类型选择
import TypeSel from "../components/global/TypeSel.vue";
Vue.component('type-select',TypeSel);

//管理域选择
import AreaSel from "../components/global/AreaSelect.vue";
Vue.component('area-select',AreaSel);