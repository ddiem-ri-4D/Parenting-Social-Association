(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{959:function(t,e,n){},965:function(t,e,n){"use strict";n(959)},969:function(t,e,n){"use strict";n.r(e);var l=n(20);n(57),n(33),n(198),n(50),n(629);function o(t){return new Promise((function(e,n){var l=new FileReader;l.readAsDataURL(t),l.onload=function(){return e(l.result)},l.onerror=function(t){return n(t)}}))}var r={props:{api:{type:String,default:"/decks"}},data:function(){return{visibleModal:!1,disableBtn:!0,previewVisible:!1,previewImage:"",fileList:[],showEmoji:!1,btnLoading:!1}},methods:{handleOpenModal:function(){this.visibleModal=!0},handleCloseModal:function(){this.visibleModal=!1,this.fileList=[],this.$refs.contentPost.innerHTML="",this.showEmoji=!1,this.disableBtn=!0},handleEmoji:function(){this.showEmoji=!this.showEmoji},handleCancel:function(){this.previewVisible=!1},changeText:function(t){""!==t.target.innerHTML||0!==this.fileList.length?this.disableBtn=!1:this.disableBtn=!0},selectEmoji:function(t){var e=document.createTextNode(t.data);this.$refs.contentPost.appendChild(e),this.disableBtn=!1},dummyRequest:function(t){setTimeout((function(){t.onSuccess("ok")}),0)},handlePreview:function(t){var e=this;return Object(l.a)(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(t.url||t.preview){n.next=4;break}return n.next=3,o(t.originFileObj);case 3:t.preview=n.sent;case 4:e.previewImage=t.url||t.preview,e.previewVisible=!0;case 6:case"end":return n.stop()}}),n)})))()},handleChange:function(t){var e=this;this.fileList=t.fileList,"done"===t.file.status&&t.fileList.forEach((function(t,n){t.size/1024/1024>2&&(e.fileList.splice(n,1),e.$message.error("Ảnh phải bé hơn 2MB!"))})),"removed"===t.file.status&&(this.fileList=t.fileList),0!==this.fileList.length||""!==this.$refs.contentPost.innerHTML?this.disableBtn=!1:this.disableBtn=!0},handleSubmit:function(){var t=this;this.btnLoading=!0;var e=new FormData;e.append("content",this.$refs.contentPost.innerHTML),this.fileList.forEach((function(t){e.append("image",t.originFileObj)})),this.$axios.$post(this.api,e).then((function(e){e.success&&(t.$emit("fetchData"),t.btnLoading=!1,t.handleCloseModal())})).catch((function(e){console.error(e),t.btnLoading=!1}))}}},c=(n(965),n(27)),component=Object(c.a)(r,(function(){var t=this,e=t.$createElement,l=t._self._c||e;return l("div",{staticClass:"write-post",on:{click:t.handleOpenModal}},[l("div",{staticClass:"avatar"},[t.$auth.user.avatar?l("img",{attrs:{src:t.$auth.user.avatar,alt:"avatar"}}):l("img",{attrs:{src:n(338),alt:"avatar"}})]),t._v(" "),l("div",{staticClass:"placeholder"},[t._v(t._s(t.$t("Hôm nay bạn ổn không")))]),t._v(" "),t._m(0),t._v(" "),l("a-modal",{staticClass:"modal-post",attrs:{title:t.$t("Bài viết mới"),width:"670px",footer:!1},on:{cancel:t.handleCloseModal},model:{value:t.visibleModal,callback:function(e){t.visibleModal=e},expression:"visibleModal"}},[l("template",{slot:"closeIcon"},[l("i",{staticClass:"fal fa-times icon"})]),t._v(" "),l("div",{staticClass:"user"},[l("div",{staticClass:"user__avt"},[t.$auth.user.avatar?l("img",{attrs:{src:t.$auth.user.avatar,alt:"avatar"}}):l("img",{attrs:{src:n(338),alt:"avatar"}})]),t._v(" "),l("div",{staticClass:"user__name"},[t._v(t._s(t.$auth.user.userName))])]),t._v(" "),l("div",{staticClass:"content"},[l("div",{ref:"contentPost",staticClass:"content__text",attrs:{contenteditable:"true","data-place":t.$t("Bạn đang nghĩ gì")},on:{input:t.changeText}}),t._v(" "),l("div",{staticClass:"more"},[l("div",{staticClass:"img",on:{click:function(e){return t.$refs.image.click()}}},[l("i",{staticClass:"fas fa-images icon"})]),t._v(" "),l("div",{on:{click:t.handleEmoji}},[l("i",{staticClass:"fas fa-smile icon"})]),t._v(" "),t.showEmoji?l("VEmojiPicker",{on:{select:t.selectEmoji}}):t._e()],1)]),t._v(" "),l("a-upload",{attrs:{"list-type":"picture-card",accept:".png, .jpg, .jpeg",multiple:!0,"custom-request":t.dummyRequest,"file-list":t.fileList},on:{preview:t.handlePreview,change:t.handleChange}},[l("button",{ref:"image"},[t._v("click")])]),t._v(" "),l("a-modal",{attrs:{visible:t.previewVisible,footer:null},on:{cancel:t.handleCancel}},[l("template",{slot:"closeIcon"},[l("i",{staticClass:"fal fa-times icon"})]),t._v(" "),l("img",{staticStyle:{width:"100%"},attrs:{alt:"example",src:t.previewImage}})],2),t._v(" "),l("a-button",{key:"submit",attrs:{block:"",size:"large",type:"primary",loading:t.btnLoading,disabled:t.disableBtn},on:{click:t.handleSubmit}},[t._v("\n      "+t._s(t.$t("Đăng bài"))+"\n    ")])],2)],1)}),[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"emoji"},[n("i",{staticClass:"fas fa-images icon"}),t._v(" "),n("i",{staticClass:"fas fa-smile icon"})])}],!1,null,"3d99a7ae",null);e.default=component.exports}}]);