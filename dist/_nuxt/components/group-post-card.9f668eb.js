(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{976:function(t,e,r){"use strict";r.r(e);var n=r(20),o=(r(64),r(57),{props:{deck:{type:Object,default:function(){return{}}}},data:function(){return{post:this.deck,like:this.deck.like,body:"",postComments:[],current:1,pageSize:3}},watch:{deck:function(t){this.post=t}},created:function(){var t=this;this.socket.emit("Created",{user:this.$auth.user.userName}),this.socket.on("user-comment",(function(data){data.idPost===t.post._id&&t.post.reviews.push({body:data.bd,user:{_id:data.id,userName:data.user,avatar:data.avatar}})})),this.showMore()},methods:{handleMenu:function(){event.stopPropagation(),this.$refs.menu.classList.toggle("active")},handleDelete:function(){},handleLike:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var data;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,(data=new FormData).append("groupId",e.$route.params.id),r.next=5,e.$axios.$post("/decks/group/"+t,data);case 5:r.sent.success&&e.fetchLike(t),r.next=12;break;case 9:r.prev=9,r.t0=r.catch(0),console.error(r.t0);case 12:case"end":return r.stop()}}),r,null,[[0,9]])})))()},fetchLike:function(t){var e=this;return Object(n.a)(regeneratorRuntime.mark((function r(){var n;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,e.$axios.$get("/groups/deck/"+t);case 3:n=r.sent,e.like=n.deck.like,r.next=10;break;case 7:r.prev=7,r.t0=r.catch(0),console.error(r.t0);case 10:case"end":return r.stop()}}),r,null,[[0,7]])})))()},onAddReview:function(){var t=this;return Object(n.a)(regeneratorRuntime.mark((function e(){var data;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!t.body){e.next=15;break}return e.prev=1,t.socket.emit("user-comment",{bd:t.body,user:t.$auth.user.userName,avatar:t.$auth.user.avatar,id:t.$auth.user._id,idPost:t.post._id}),(data=new FormData).append("body",t.body),data.append("groupId",t.$route.params.id),e.next=8,t.$axios.$post("/reviews/group/".concat(t.deck._id),data);case 8:e.sent.success&&(t.body=null),e.next=15;break;case 12:e.prev=12,e.t0=e.catch(1),console.error(e.t0);case 15:case"end":return e.stop()}}),e,null,[[1,12]])})))()},showMore:function(){var t=this.pageSize*this.current;t>this.post.reviews.length?t=this.post.reviews.length:this.current+=1,this.postComments=this.post.reviews.slice(0,t)}}}),c=r(27),component=Object(c.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"post-card"},[n("div",{staticClass:"actor"},[n("div",{staticClass:"actor__avt"},[t.post.owner.avatar?n("img",{attrs:{src:t.post.owner.avatar,alt:"Avatar"}}):n("img",{attrs:{src:r(338),alt:""}})]),t._v(" "),n("div",{staticClass:"actor__name"},[n("div",{staticClass:"actor__name-text"},[t.post.owner._id===t.$auth.user._id?n("nuxt-link",{attrs:{to:"/profile"}},[t._v(t._s(t.post.owner.userName))]):n("nuxt-link",{attrs:{to:"/profile/"+t.post.owner._id}},[t._v(t._s(t.post.owner.userName))])],1),t._v(" "),n("div",{staticClass:"actor__name-time"},[t._v(t._s(t.post.date))])]),t._v(" "),n("div",{staticClass:"actor__action"},[n("ThreeDot",{nativeOn:{click:function(e){return t.handleMenu.apply(null,arguments)}}}),t._v(" "),n("div",{ref:"menu",staticClass:"menu"},[t.deck.owner._id===t.$auth.user._id?n("div",{staticClass:"menu__item"},[n("a-icon",{attrs:{type:"edit"}}),t._v("\n          "+t._s(t.$t("Chỉnh sửa"))+"\n        ")],1):t._e(),t._v(" "),t.deck.owner._id===t.$auth.user._id?n("div",{staticClass:"menu__item",on:{click:t.handleDelete}},[n("a-icon",{attrs:{type:"delete"}}),t._v("\n          "+t._s(t.$t("Xóa bài viết"))+"\n        ")],1):t._e(),t._v(" "),n("div",{staticClass:"menu__item"},[n("a-icon",{attrs:{type:"alert"}}),t._v("\n          "+t._s(t.$t("Báo cáo vi phạm"))+"\n        ")],1)])],1)]),t._v(" "),n("div",{staticClass:"image"},[n("client-only",[n("Lightbox",{attrs:{cells:3,items:t.post.image}})],1)],1),t._v(" "),n("div",{staticClass:"content"},[n("client-only",[n("vue-show-more-text",{attrs:{text:t.post.content,lines:4,"more-text":t.$t("Xem thêm"),"less-text":t.$t("Thu gọn"),"additional-anchor-css":"color: #EA4C89","additional-container-css":"padding: initial"}})],1)],1),t._v(" "),n("div",{staticClass:"bar"},[n("div",{staticClass:"bar__item",on:{click:function(e){return t.handleLike(t.post._id)}}},[-1===t.like.indexOf(t.$auth.user._id)?n("a-icon",{staticClass:"bar__item-icon",attrs:{type:"heart"}}):n("a-icon",{staticClass:"bar__item-icon",staticStyle:{color:"#d7443e"},attrs:{type:"heart",theme:"filled"}}),t._v(" "),n("p",[t._v(t._s(t.like.length)+" "+t._s(t.$t("Yêu thích")))])],1),t._v(" "),n("nuxt-link",{staticClass:"bar__item",attrs:{to:"/groups/"+t.$route.params.id+"/"+t.post._id}},[n("a-icon",{staticClass:"bar__item-icon",attrs:{type:"message"}}),t._v(" "),n("p",[t._v(t._s(t.post.reviews.length)+" "+t._s(t.$t("Bình luận")))])],1),t._v(" "),n("div",{staticClass:"bar__item"},[n("a-icon",{staticClass:"bar__item-icon",attrs:{type:"save"}}),t._v(" "),n("p",[t._v(t._s(t.$t("Lưu bài viết")))])],1)],1),t._v(" "),t.post.reviews.length>0?n("div",{staticClass:"comments"},[t._l(t.postComments,(function(e,o){return n("div",{key:o,staticClass:"comments__item"},[n("div",{staticClass:"comments__item-avt"},[e.user.avatar?n("img",{attrs:{src:e.user.avatar,alt:"avatar"}}):n("img",{attrs:{src:r(338),alt:"avatar"}})]),t._v(" "),n("div",{staticClass:"comments__item-content"},[e.user._id===t.$auth.user._id?n("nuxt-link",{staticClass:"name",attrs:{to:"/profile"}},[t._v(t._s(e.user.userName))]):n("nuxt-link",{staticClass:"name",attrs:{to:"/profile/"+e.user._id}},[t._v(t._s(e.user.userName))]),t._v(" "),n("div",{staticClass:"body",domProps:{innerHTML:t._s(e.body)}})],1)])})),t._v(" "),t.postComments.length<t.post.reviews.length?n("p",{staticClass:"comments__btn",on:{click:t.showMore}},[t._v(t._s(t.$t("Hiển thị thêm")))]):t._e()],2):t._e(),t._v(" "),n("div",{staticClass:"comment"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.body,expression:"body"}],staticClass:"comment__input",attrs:{type:"text",placeholder:t.$t("Viết bình luận")},domProps:{value:t.body},on:{input:function(e){e.target.composing||(t.body=e.target.value)}}}),t._v(" "),n("i",{staticClass:"fas fa-paper-plane icon",on:{click:t.onAddReview}})])])}),[],!1,null,null,null);e.default=component.exports}}]);