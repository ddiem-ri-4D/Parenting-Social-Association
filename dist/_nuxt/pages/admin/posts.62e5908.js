(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{974:function(t,e,n){},982:function(t,e,n){"use strict";n(974)},996:function(t,e,n){"use strict";n.r(e);var o=n(20),c=(n(57),n(87),n(33),n(172),{layout:"admin",data:function(){return{decks:[],pagination:{pageSize:10,current:1,total:""}}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){var n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$axios.$get("/decks?pageSize=".concat(t.pagination.pageSize,"&pageNumber=").concat(t.pagination.current));case 2:(n=e.sent).success&&(t.decks=n.decks,t.pagination.total=n.meta.total);case 4:case"end":return e.stop()}}),e)})))()},head:function(){return{title:"".concat(this.$t("Bài viết")," | Admin")}},computed:{columns:function(){var t=[{title:this.$t("Người đăng"),dataIndex:"owner.userName",key:"owner.userName",sorter:function(a,b){return a.owner.userName.toString().localeCompare(b.owner.userName.toString())}},{title:this.$t("Nội dung"),dataIndex:"content",key:"content",scopedSlots:{customRender:"content"}},{title:this.$t("Hình ảnh"),dataIndex:"image",key:"image",width:"300px",scopedSlots:{customRender:"image"}},{title:this.$t("Ngày đăng"),dataIndex:"date",key:"date"},{title:this.$t("Thao tác"),key:"action",align:"center",scopedSlots:{customRender:"action"}}];return t}},methods:{onSelectChange:function(t,e){},fetcDataPost:function(t){var e=this;return Object(o.a)(regeneratorRuntime.mark((function n(){var o;return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,e.$axios.$get("/decks?pageSize=".concat(e.pagination.pageSize,"&pageNumber=").concat(t));case 2:(o=n.sent).success&&(e.decks=o.decks,e.pagination.current=o.meta.pageNumber);case 4:case"end":return n.stop()}}),n)})))()},handleTableChange:function(t){this.fetcDataPost(t.current)}}}),r=(n(982),n(27)),component=Object(r.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.$fetchState.pending?n("LoadingView"):n("div",{staticClass:"admin-content"},[n("div",{staticClass:"options"},[n("div",{staticClass:"left"},[n("a-breadcrumb",[n("a-breadcrumb-item",[n("nuxt-link",{attrs:{to:"/admin/dashboard"}},[t._v(t._s(t.$t("Trang chủ")))])],1),t._v(" "),n("a-breadcrumb-item",[t._v(t._s(t.$t("Bài viết")))])],1)],1)]),t._v(" "),n("a-table",{attrs:{bordered:"","row-selection":{onChange:t.onSelectChange},columns:t.columns,"data-source":t.decks,pagination:t.pagination},on:{change:t.handleTableChange},scopedSlots:t._u([{key:"content",fn:function(content){return[n("div",{domProps:{innerHTML:t._s(content)}})]}},{key:"image",fn:function(image){return[n("div",{staticClass:"contain-img"},t._l(image,(function(t,e){return n("img",{key:e,staticClass:"show-img",attrs:{src:t,alt:"image post"}})})),0)]}}])},[t._v(" "),t._v(" "),n("template",{slot:"action"},[n("span",{staticClass:"action"},[n("a-tooltip",{attrs:{placement:"bottom"}},[n("template",{slot:"title"},[n("span",[t._v(t._s(t.$t("Sửa")))])]),t._v(" "),n("a-icon",{attrs:{type:"edit"}})],2)],1),t._v(" "),n("span",{staticClass:"action"},[n("a-tooltip",{attrs:{placement:"bottom"}},[n("template",{slot:"title"},[n("span",[t._v(t._s(t.$t("Xóa")))])]),t._v(" "),n("a-icon",{attrs:{type:"delete"}})],2)],1)])],2)],1)}),[],!1,null,"cea83842",null);e.default=component.exports}}]);