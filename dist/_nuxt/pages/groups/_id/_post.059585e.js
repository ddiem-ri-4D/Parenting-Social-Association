(window.webpackJsonp=window.webpackJsonp||[]).push([[22],{1007:function(e,t,n){"use strict";n.r(t);var r=n(20),c=(n(198),n(64),n(57),{components:{ThreeDot:n(342).default},data:function(){return{deck:{},postComments:[],body:"",current:1,pageSize:3}},fetch:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.$get("/groups/deck/"+e.$route.params.post);case 3:(n=t.sent).success&&(e.deck=n.deck,e.showMore()),t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},created:function(){var e=this;this.socket.emit("Created",{user:this.$auth.user.userName}),this.socket.on("user-comment",(function(data){data.idPost===e.deck._id&&e.deck.reviews.push({body:data.bd,user:{_id:data.id,userName:data.user,avatar:data.avatar}})}))},mounted:function(){var e=this,t=setInterval((function(){void 0!==e.$refs.comments&&(e.$refs.comments.style.paddingBottom="".concat(e.$refs.fixedBar.clientHeight+8,"px"),clearInterval(t))}),500);this.$nextTick((function(){document.addEventListener("click",(function(t){e.$refs.menu&&(t.preventDefault(),e.$refs.menu.classList.remove("active"))}))}))},methods:{handleLike:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,(data=new FormData).append("groupId",e.$route.params.id),t.next=5,e.$axios.$post("/decks/group/"+e.$route.params.post,data);case 5:t.sent.success&&e.fetchLike(),t.next=12;break;case 9:t.prev=9,t.t0=t.catch(0),console.error(t.t0);case 12:case"end":return t.stop()}}),t,null,[[0,9]])})))()},fetchLike:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return t.prev=0,t.next=3,e.$axios.$get("/groups/deck/"+e.$route.params.post);case 3:n=t.sent,e.deck.like=n.deck.like,t.next=10;break;case 7:t.prev=7,t.t0=t.catch(0),console.error(t.t0);case 10:case"end":return t.stop()}}),t,null,[[0,7]])})))()},onAddReview:function(){var e=this;return Object(r.a)(regeneratorRuntime.mark((function t(){var data;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(!e.body){t.next=15;break}return t.prev=1,e.socket.emit("user-comment",{bd:e.body,user:e.$auth.user.userName,avatar:e.$auth.user.avatar,id:e.$auth.user._id,idPost:e.deck._id}),(data=new FormData).append("body",e.body),data.append("groupId",e.$route.params.id),t.next=8,e.$axios.$post("/reviews/group/".concat(e.deck._id),data);case 8:t.sent.success&&(e.body=null),t.next=15;break;case 12:t.prev=12,t.t0=t.catch(1),console.error(t.t0);case 15:case"end":return t.stop()}}),t,null,[[1,12]])})))()},handleMenu:function(){event.stopPropagation(),this.$refs.menu.classList.toggle("active")},showMore:function(){var e=this.pageSize*this.current;e>this.deck.reviews.length?e=this.deck.reviews.length:this.current+=1,this.postComments=this.deck.reviews.slice(0,e)}}}),o=n(27),component=Object(o.a)(c,(function(){var e=this,t=e.$createElement,r=e._self._c||t;return e.$fetchState.pending?r("LoadingView"):r("main",{staticClass:"post-detail"},[r("div",{staticClass:"container"},[r("div",{staticClass:"post",style:0===e.deck.image.length&&"grid-template-columns: 1fr"},[e.deck.image.length>0?r("div",{staticClass:"post__img"},[r("client-only",[r("Lightbox",{attrs:{cells:3,items:e.deck.image}})],1)],1):e._e(),e._v(" "),r("div",{staticClass:"post__content"},[r("div",{staticClass:"post__content-info"},[r("div",{staticClass:"avt"},[e.deck.owner.avatar?r("img",{attrs:{src:e.deck.owner.avatar,alt:"avatar"}}):r("img",{attrs:{src:n(338),alt:"avatar"}})]),e._v(" "),r("div",{staticClass:"name-time"},[e.deck.owner._id===e.$auth.user._id?r("nuxt-link",{attrs:{to:"/profile"}},[e._v(e._s(e.deck.owner.userName))]):r("nuxt-link",{attrs:{to:"/profile/"+e.deck.owner._id}},[e._v(e._s(e.deck.owner.userName))]),e._v(" "),r("p",[e._v(e._s(e.deck.date))])],1),e._v(" "),r("div",{staticClass:"option"},[r("ThreeDot",{nativeOn:{click:function(t){return e.handleMenu.apply(null,arguments)}}}),e._v(" "),r("div",{ref:"menu",staticClass:"menu"},[e.deck.owner._id===e.$auth.user._id?r("div",{staticClass:"menu__item"},[r("a-icon",{attrs:{type:"edit"}}),e._v("\n                "+e._s(e.$t("Chỉnh sửa"))+"\n              ")],1):e._e(),e._v(" "),e.deck.owner._id===e.$auth.user._id?r("div",{staticClass:"menu__item"},[r("a-icon",{attrs:{type:"delete"}}),e._v("\n                "+e._s(e.$t("Xóa bài viết"))+"\n              ")],1):e._e(),e._v(" "),r("div",{staticClass:"menu__item"},[r("a-icon",{attrs:{type:"alert"}}),e._v("\n                "+e._s(e.$t("Báo cáo vi phạm"))+"\n              ")],1)])],1)]),e._v(" "),r("div",{staticClass:"post__content-content"},[r("client-only",[r("vue-show-more-text",{attrs:{text:e.deck.content,lines:8,"more-text":e.$t("Xem thêm"),"less-text":e.$t("Thu gọn"),"additional-anchor-css":"color: #EA4C89","additional-container-css":"padding: initial"}})],1)],1),e._v(" "),e.deck.reviews.length>0?r("div",{ref:"comments",staticClass:"comments"},[e._l(e.postComments,(function(t,c){return r("div",{key:c,staticClass:"comments__item"},[r("div",{staticClass:"comments__item-avt"},[t.user.avatar?r("img",{attrs:{src:t.user.avatar,alt:"avatar"}}):r("img",{attrs:{src:n(338),alt:"avatar"}})]),e._v(" "),r("div",{staticClass:"comments__item-content"},[t.user._id===e.$auth.user._id?r("nuxt-link",{staticClass:"name",attrs:{to:"/profile"}},[e._v("\n                "+e._s(t.user.userName)+"\n              ")]):r("nuxt-link",{staticClass:"name",attrs:{to:"/profile/"+t.user._id}},[e._v(e._s(t.user.userName))]),e._v(" "),r("div",{staticClass:"body",domProps:{innerHTML:e._s(t.body)}})],1)])})),e._v(" "),e.postComments.length<e.deck.reviews.length?r("p",{staticClass:"comments__btn",on:{click:e.showMore}},[e._v("Hiển thị thêm")]):e._e()],2):e._e(),e._v(" "),r("div",{ref:"fixedBar",staticClass:"post__content-fixed"},[r("div",{staticClass:"bar"},[r("div",{staticClass:"bar__item",on:{click:function(t){return e.handleLike()}}},[-1===e.deck.like.indexOf(e.$auth.user._id)?r("a-icon",{staticClass:"bar__item-icon",attrs:{type:"heart"}}):r("a-icon",{staticClass:"bar__item-icon",staticStyle:{color:"#d7443e"},attrs:{type:"heart",theme:"filled"}}),e._v(" "),r("p",[e._v(e._s(e.deck.like.length)+" "+e._s(e.$t("Yêu thích")))])],1),e._v(" "),r("div",{staticClass:"bar__item"},[r("a-icon",{staticClass:"bar__item-icon",attrs:{type:"message"}}),e._v(" "),r("p",[e._v(e._s(e.deck.reviews.length)+" "+e._s(e.$t("Bình luận")))])],1),e._v(" "),r("div",{staticClass:"bar__item"},[r("a-icon",{staticClass:"bar__item-icon",attrs:{type:"save"}}),e._v(" "),-1===e.$auth.user.deckShare.map((function(e){return e._id})).indexOf(e.deck._id)?r("p",[e._v(e._s(e.$t("Lưu bài viết")))]):r("p",[e._v(e._s(e.$t("Bỏ lưu")))])],1)]),e._v(" "),r("div",{staticClass:"comment"},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.body,expression:"body"}],staticClass:"comment__input",attrs:{type:"text",placeholder:e.$t("Viết bình luận")},domProps:{value:e.body},on:{input:function(t){t.target.composing||(e.body=t.target.value)}}}),e._v(" "),r("i",{staticClass:"fas fa-paper-plane icon",on:{click:e.onAddReview}})])])])])])])}),[],!1,null,null,null);t.default=component.exports}}]);