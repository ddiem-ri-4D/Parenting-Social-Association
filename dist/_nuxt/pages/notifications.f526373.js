(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{990:function(t,n,o){"use strict";o.r(n);o(64);var e={data:function(){return{pageSize:10,current:1,loadMore:!1,notis:[]}},head:function(){return{title:this.$t("Thông báo của bạn")+" | PSA "}},computed:{noti:function(){return this.$auth.user.userNotification.slice().reverse()}},mounted:function(){this.showMore()},methods:{showMore:function(){var t=this.pageSize*this.current;t>this.noti.length?(t=this.noti.length,this.loadMore=!0):this.current+=1,this.notis=this.noti.slice(0,t)}}},r=o(27),component=Object(r.a)(e,(function(){var t=this,n=t.$createElement,o=t._self._c||n;return o("main",{staticClass:"main-wrapper notification"},[o("div",{staticClass:"container"},[o("h1",[t._v(t._s(t.$t("Thông báo của bạn")))]),t._v(" "),o("ul",{staticClass:"notifications"},t._l(t.notis,(function(n,e){return o("li",{key:e,staticClass:"notifications__item"},["post"===n.type&&n.groupId?o("nuxt-link",{attrs:{to:"/groups/"+n.groupId._id+"/"+n.postId}},[o("i",{staticClass:"fal fa-users icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("vừa đăng bài viết mới vào"))+" "),o("b",[t._v(t._s(n.groupName))])])]):"post"!==n.type||n.groupId?"like"===n.type&&n.groupId?o("nuxt-link",{attrs:{to:"/groups/"+n.groupId._id+"/"+n.postId}},[o("i",{staticClass:"fas fa-heart-circle icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("và người khác đã thích bài viết của bạn",{count:n.userLike.length-1}))+"\n          ")])]):"like"!==n.type||n.groupId?"comment"===n.type&&n.groupId?o("nuxt-link",{attrs:{to:"/groups/"+n.groupId._id+"/"+n.postId}},[o("i",{staticClass:"fal fa-comment-alt icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("đã bình luận trong bài viết của bạn"))+"\n          ")])]):"comment"!==n.type||n.groupId?t._e():o("nuxt-link",{attrs:{to:"/post/"+n.postId}},[o("i",{staticClass:"fal fa-comment-alt icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("đã bình luận trong bài viết của bạn"))+"\n          ")])]):o("nuxt-link",{attrs:{to:"/post/"+n.postId}},[o("i",{staticClass:"fas fa-heart-circle icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("và người khác đã thích bài viết của bạn",{count:n.userLike.length-1}))+"\n          ")])]):o("nuxt-link",{attrs:{to:"/post/"+n.postId}},[o("i",{staticClass:"fal fa-users icon"}),t._v(" "),o("p",[o("b",[t._v(t._s(n.creator))]),t._v(" "+t._s(t.$t("vừa đăng bài viết mới vào"))+" "),o("b",[t._v(t._s(n.groupName))])])])],1)})),0),t._v(" "),t.notis.length<t.noti.length?o("p",{staticClass:"show-more",on:{click:t.showMore}},[t._v(t._s(t.$t("Hiển thị thêm")))]):t._e()])])}),[],!1,null,null,null);n.default=component.exports}}]);