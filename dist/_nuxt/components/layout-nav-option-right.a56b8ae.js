(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{978:function(t,e,n){"use strict";n.r(e);var o=n(20),v=(n(64),n(57),{props:{show:{type:Boolean,default:!0}},data:function(){return{infoEvent:{},visible:!1,eventList:[],pageSize:3,current:1}},fetch:function(){var t=this;return Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(0!==t.$store.getters.getEvents.length){e.next=3;break}return e.next=3,t.$store.dispatch("setEvents");case 3:t.showMore();case 4:case"end":return e.stop()}}),e)})))()},computed:{events:function(){return this.$store.getters.getEvents}},methods:{handleShowInfo:function(t){this.infoEvent=t,this.visible=!0},handleCancel:function(){this.infoEvent={}},showMore:function(){var t=this.pageSize*this.current;t>this.events.length?t=this.events.length:this.current+=1,this.eventList=this.events.slice(0,t)}}}),l=n(27),component=Object(l.a)(v,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.show?n("div",{staticClass:"nav-option right"},[n("div",{staticClass:"notification"},[n("div",{staticClass:"title"},[n("nuxt-link",{attrs:{to:"/events"}},[t._v(t._s(t.$t("Thông báo mới")))]),t._v(" "),n("sup",[t._v(t._s(t.eventList.length))])],1),t._v(" "),t.$fetchState.pending?n("a-skeleton",{attrs:{active:"",title:"true"}}):t._l(t.eventList,(function(e,o){return n("div",{key:o,staticClass:"notification__list"},[n("div",{staticClass:"notification__list-item",on:{click:function(n){return t.handleShowInfo(e)}}},[n("div",{staticClass:"status"}),t._v(" "),n("div",{staticClass:"content"},[t._v(t._s(e.title))])])])})),t._v(" "),t.eventList.length<t.events.length?n("p",{staticClass:"show-more",on:{click:t.showMore}},[t._v(t._s(t.$t("Hiển thị thêm")))]):t._e()],2),t._v(" "),n("a-modal",{staticClass:"modal-event",attrs:{title:t.$t("Thông báo"),footer:!1},on:{cancel:t.handleCancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[n("template",{slot:"closeIcon"},[n("i",{staticClass:"fal fa-times icon"})]),t._v(" "),n("div",{staticClass:"top"},[t.infoEvent.image&&0!==t.infoEvent.image.length?n("div",{staticClass:"img-event"},[n("img",{attrs:{src:t.infoEvent.image,alt:"image event"}})]):t._e(),t._v(" "),n("div",{staticClass:"top-right"},[n("p",[t._v(t._s(t.infoEvent.title))]),t._v(" "),t.infoEvent.start?n("span",[t._v(" "+t._s(t.infoEvent.start))]):t._e(),t._v(" "),t.infoEvent.end?n("span",[t._v("- "+t._s(t.infoEvent.end))]):t._e()])]),t._v(" "),n("p",[t._v(t._s(t.infoEvent.description))])],2)],1):t._e()}),[],!1,null,null,null);e.default=component.exports}}]);