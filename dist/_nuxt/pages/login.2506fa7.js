(window.webpackJsonp=window.webpackJsonp||[]).push([[27],{963:function(t,e,r){t.exports=r.p+"img/banner-login.2a14836.png"},988:function(t,e,r){"use strict";r.r(e);var n=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"banner"},[n("div",{staticClass:"banner__top"},[n("div",{staticClass:"banner__top-logo"},[n("img",{attrs:{src:r(340),alt:"PSA"}})]),t._v(" "),n("div",{staticClass:"banner__top-title"},[t._v("Parenting Social Association")])]),t._v(" "),n("div",{staticClass:"banner__bottom"},[n("img",{attrs:{src:r(963),alt:"PSA login banner"}})])])}],o=r(20),l=(r(57),{layout:"auth",data:function(){return{form:{userID:"",password:""},rules:{userID:{required:!0,message:this.$t("Vui lòng nhập mã số học sinh")},password:{required:!0,message:this.$t("Vui lòng nhập mật khẩu")}}}},head:function(){return{title:this.$t("Đăng nhập PSA")+" | PSA "}},beforeCreate:function(){this.$auth.loggedIn&&this.$router.push("/")},methods:{handleSubmit:function(){var t=this;this.$refs.ruleForm.validate(function(){var e=Object(o.a)(regeneratorRuntime.mark((function e(r){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=13;break}return e.prev=1,t.$nuxt.$loading.start(),e.next=5,t.$auth.loginWith("local",{data:{userID:t.form.userID,password:t.form.password}});case 5:e.sent.data.success?(t.$nuxt.$loading.finish(),t.$router.push("/")):t.$nuxt.$loading.finish(),e.next=13;break;case 9:e.prev=9,e.t0=e.catch(1),t.$nuxt.$loading.finish(),t.$message.error("Incorred ID or password");case 13:case"end":return e.stop()}}),e,null,[[1,9]])})));return function(t){return e.apply(this,arguments)}}())}}}),c=l,m=r(27),component=Object(m.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"login"},[r("div",{staticClass:"login-contain container"},[t._m(0),t._v(" "),r("div",{staticClass:"form-contain"},[r("h1",{staticClass:"title"},[t._v(t._s(t.$t("Đăng nhập PSA")))]),t._v(" "),r("a-form-model",{ref:"ruleForm",staticClass:"form",attrs:{model:t.form,rules:t.rules}},[r("a-form-model-item",{ref:"userID",staticClass:"form__item",attrs:{label:t.$t("Mã số học sinh"),prop:"userID"}},[r("a-input",{on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSubmit()}},model:{value:t.form.userID,callback:function(e){t.$set(t.form,"userID",e)},expression:"form.userID"}})],1),t._v(" "),r("a-form-model-item",{ref:"password",staticClass:"form__item",attrs:{label:t.$t("Mật khẩu"),prop:"password"}},[r("a-input-password",{on:{keypress:function(e){return!e.type.indexOf("key")&&t._k(e.keyCode,"enter",13,e.key,"Enter")?null:t.handleSubmit()}},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),t._v(" "),r("a-form-model-item",{staticClass:"form-forgot"},[r("nuxt-link",{attrs:{to:"/forgot-password"}},[t._v("\n            "+t._s(t.$t("Quên mật khẩu"))+"\n          ")])],1),t._v(" "),r("a-form-model-item",[r("a-button",{staticClass:"form-btn",attrs:{type:"primary"},on:{click:function(e){return t.handleSubmit()}}},[t._v("\n            "+t._s(t.$t("Đăng nhập"))+"\n          ")])],1)],1)],1)])])}),n,!1,null,null,null);e.default=component.exports}}]);