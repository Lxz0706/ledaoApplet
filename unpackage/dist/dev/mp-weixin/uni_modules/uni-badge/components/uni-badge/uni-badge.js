(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["uni_modules/uni-badge/components/uni-badge/uni-badge"],{850:function(t,e,n){"use strict";n.r(e);var i=n(851),r=n(853);for(var u in r)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return r[t]}))}(u);n(855);var o,a=n(32),s=Object(a["default"])(r["default"],i["render"],i["staticRenderFns"],!1,null,null,null,!1,i["components"],o);s.options.__file="uni_modules/uni-badge/components/uni-badge/uni-badge.vue",e["default"]=s.exports},851:function(t,e,n){"use strict";n.r(e);var i=n(852);n.d(e,"render",(function(){return i["render"]})),n.d(e,"staticRenderFns",(function(){return i["staticRenderFns"]})),n.d(e,"recyclableRender",(function(){return i["recyclableRender"]})),n.d(e,"components",(function(){return i["components"]}))},852:function(t,e,n){"use strict";var i;n.r(e),n.d(e,"render",(function(){return r})),n.d(e,"staticRenderFns",(function(){return o})),n.d(e,"recyclableRender",(function(){return u})),n.d(e,"components",(function(){return i}));var r=function(){var t=this,e=t.$createElement,n=(t._self._c,t.text?t.__get_style([t.positionStyle,t.customStyle,t.dotStyle]):null);t.$mp.data=Object.assign({},{$root:{s0:n}})},u=!1,o=[];r._withStripped=!0},853:function(t,e,n){"use strict";n.r(e);var i=n(854),r=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},854:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i={name:"UniBadge",emits:["click"],props:{type:{type:String,default:"error"},inverted:{type:Boolean,default:!1},isDot:{type:Boolean,default:!1},maxNum:{type:Number,default:99},absolute:{type:String,default:""},offset:{type:Array,default:function(){return[0,0]}},text:{type:[String,Number],default:""},size:{type:String,default:"small"},customStyle:{type:Object,default:function(){return{}}}},data:function(){return{}},computed:{width:function(){return 8*String(this.text).length+12},classNames:function(){var t=this.inverted,e=this.type,n=this.size,i=this.absolute;return[t?"uni-badge--"+e+"-inverted":"","uni-badge--"+e,"uni-badge--"+n,i?"uni-badge--absolute":""].join(" ")},positionStyle:function(){if(!this.absolute)return{};var t=this.width/2,e=10;this.isDot&&(t=5,e=5);var n="".concat(-t+this.offset[0],"px"),i="".concat(-e+this.offset[1],"px"),r={rightTop:{right:n,top:i},rightBottom:{right:n,bottom:i},leftBottom:{left:n,bottom:i},leftTop:{left:n,top:i}},u=r[this.absolute];return u||r["rightTop"]},dotStyle:function(){return this.isDot?{width:"10px",minWidth:"0",height:"10px",padding:"0",borderRadius:"10px"}:{}},displayValue:function(){var t=this.isDot,e=this.text,n=this.maxNum;return t?"":Number(e)>n?"".concat(n,"+"):e}},methods:{onClick:function(){this.$emit("click")}}};e.default=i},855:function(t,e,n){"use strict";n.r(e);var i=n(856),r=n.n(i);for(var u in i)["default"].indexOf(u)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(u);e["default"]=r.a},856:function(t,e,n){}}]);
//# sourceMappingURL=../../../../../.sourcemap/mp-weixin/uni_modules/uni-badge/components/uni-badge/uni-badge.js.map
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'uni_modules/uni-badge/components/uni-badge/uni-badge-create-component',
    {
        'uni_modules/uni-badge/components/uni-badge/uni-badge-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('2')['createComponent'](__webpack_require__(850))
        })
    },
    [['uni_modules/uni-badge/components/uni-badge/uni-badge-create-component']]
]);
