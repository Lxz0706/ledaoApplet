(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["common/main"],{0:function(e,t,n){"use strict";(function(e,t){var o=n(4),r=o(n(11));n(26);var a=o(n(25)),c=o(n(27)),u=o(n(33)),i=o(n(34));function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);t&&(o=o.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,o)}return n}function f(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){(0,r.default)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}e.__webpack_require_UNI_MP_PLUGIN__=n,a.default.config.productionTip=!1,a.default.prototype.$request=u.default,a.default.prototype.$requestSession=i.default,c.default.mpType="app";var p=new a.default(f({},c.default));t(p).$mount()}).call(this,n(1)["default"],n(2)["createApp"])},27:function(e,t,n){"use strict";n.r(t);var o=n(28);for(var r in o)["default"].indexOf(r)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(r);n(30);var a,c,u,i,l=n(32),f=Object(l["default"])(o["default"],a,c,!1,null,null,null,!1,u,i);f.options.__file="App.vue",t["default"]=f.exports},28:function(e,t,n){"use strict";n.r(t);var o=n(29),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},29:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n={onLaunch:function(){console.log("App Launch"),console.log();var t=e.getAccountInfoSync();this.globalData.version=t.miniProgram.envVersion,console.log("编译环境：======",this.globalData.version)},onHide:function(){console.log("App Hide")},globalData:{getTime:1,version:""},onShow:function(){console.log("App Show");var t=e.getUpdateManager();t&&(e.canIUse("getUpdateManager")?t.onCheckForUpdate((function(n){n.hasUpdate&&(t.onUpdateReady((function(){e.showModal({title:"更新提示",content:"新版本已经准备好，是否重启应用？",success:function(e){e.confirm&&t.applyUpdate()}})})),t.onUpdateFailed((function(){e.showModal({title:"已经有新版本了哟~",content:"新版本已经上线啦~，请您删除当前小程序，重新搜索(晒渔人)打开哟~"})})))})):e.showModal({title:"提示",content:"当前微信版本过低，部分功能无法使用，请升级到最新微信版本后重试。"}))}};t.default=n}).call(this,n(2)["default"])},30:function(e,t,n){"use strict";n.r(t);var o=n(31),r=n.n(o);for(var a in o)["default"].indexOf(a)<0&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=r.a},31:function(e,t,n){}},[[0,"common/runtime","common/vendor"]]]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/main.js.map