import Vue from 'vue'
import {
  Pagination,
  Button,
  Form,
  FormModel,
  Input,
  Icon,
  message,
  Space,
  Modal,
  Upload,
  Menu,
  Layout,
  Avatar,
  Dropdown,
  Breadcrumb,
  Table,
  Tag,
  Tooltip,
  Tabs,
  DatePicker,
  Skeleton,
  notification,
} from 'ant-design-vue'

Vue.use(Pagination)
Vue.use(Button)
Vue.use(Form)
Vue.use(FormModel)
Vue.use(Input)
Vue.use(Icon)
Vue.use(Space)
Vue.use(Modal)
Vue.use(Upload)
Vue.use(Menu)
Vue.use(Layout)
Vue.use(Avatar)
Vue.use(Dropdown)
Vue.use(Breadcrumb)
Vue.use(Table)
Vue.use(Tag)
Vue.use(Tooltip)
Vue.use(Tabs)
Vue.use(DatePicker)
Vue.use(Skeleton)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
