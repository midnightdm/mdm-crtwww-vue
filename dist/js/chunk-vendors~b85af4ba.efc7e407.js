(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-vendors~b85af4ba"],{a8e9:function(t,r,e){"use strict";(function(t){e.d(r,"a",(function(){return u})),e.d(r,"b",(function(){return C})),e.d(r,"c",(function(){return E})),e.d(r,"d",(function(){return h})),e.d(r,"e",(function(){return f})),e.d(r,"f",(function(){return B})),e.d(r,"g",(function(){return w})),e.d(r,"h",(function(){return M})),e.d(r,"i",(function(){return x})),e.d(r,"j",(function(){return p})),e.d(r,"k",(function(){return v})),e.d(r,"l",(function(){return _})),e.d(r,"m",(function(){return T})),e.d(r,"n",(function(){return y})),e.d(r,"o",(function(){return d})),e.d(r,"p",(function(){return b})),e.d(r,"q",(function(){return S})),e.d(r,"r",(function(){return g})),e.d(r,"s",(function(){return D})),e.d(r,"t",(function(){return j}));var n=e("9ab4"),i=function(t){for(var r=[],e=0,n=0;n<t.length;n++){var i=t.charCodeAt(n);i<128?r[e++]=i:i<2048?(r[e++]=i>>6|192,r[e++]=63&i|128):55296===(64512&i)&&n+1<t.length&&56320===(64512&t.charCodeAt(n+1))?(i=65536+((1023&i)<<10)+(1023&t.charCodeAt(++n)),r[e++]=i>>18|240,r[e++]=i>>12&63|128,r[e++]=i>>6&63|128,r[e++]=63&i|128):(r[e++]=i>>12|224,r[e++]=i>>6&63|128,r[e++]=63&i|128)}return r},o=function(t){var r=[],e=0,n=0;while(e<t.length){var i=t[e++];if(i<128)r[n++]=String.fromCharCode(i);else if(i>191&&i<224){var o=t[e++];r[n++]=String.fromCharCode((31&i)<<6|63&o)}else if(i>239&&i<365){o=t[e++];var s=t[e++],a=t[e++],c=((7&i)<<18|(63&o)<<12|(63&s)<<6|63&a)-65536;r[n++]=String.fromCharCode(55296+(c>>10)),r[n++]=String.fromCharCode(56320+(1023&c))}else{o=t[e++],s=t[e++];r[n++]=String.fromCharCode((15&i)<<12|(63&o)<<6|63&s)}}return r.join("")},s={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:"function"===typeof atob,encodeByteArray:function(t,r){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();for(var e=r?this.byteToCharMapWebSafe_:this.byteToCharMap_,n=[],i=0;i<t.length;i+=3){var o=t[i],s=i+1<t.length,a=s?t[i+1]:0,c=i+2<t.length,h=c?t[i+2]:0,u=o>>2,f=(3&o)<<4|a>>4,p=(15&a)<<2|h>>6,d=63&h;c||(d=64,s||(p=64)),n.push(e[u],e[f],e[p],e[d])}return n.join("")},encodeString:function(t,r){return this.HAS_NATIVE_SUPPORT&&!r?btoa(t):this.encodeByteArray(i(t),r)},decodeString:function(t,r){return this.HAS_NATIVE_SUPPORT&&!r?atob(t):o(this.decodeStringToByteArray(t,r))},decodeStringToByteArray:function(t,r){this.init_();for(var e=r?this.charToByteMapWebSafe_:this.charToByteMap_,n=[],i=0;i<t.length;){var o=e[t.charAt(i++)],s=i<t.length,a=s?e[t.charAt(i)]:0;++i;var c=i<t.length,h=c?e[t.charAt(i)]:64;++i;var u=i<t.length,f=u?e[t.charAt(i)]:64;if(++i,null==o||null==a||null==h||null==f)throw Error();var p=o<<2|a>>4;if(n.push(p),64!==h){var d=a<<4&240|h>>2;if(n.push(d),64!==f){var l=h<<6&192|f;n.push(l)}}}return n},init_:function(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(var t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},a=function(t){var r=i(t);return s.encodeByteArray(r,!0)},c=function(t){return a(t).replace(/\./g,"")},h=function(t){try{return s.decodeString(t,!0)}catch(r){console.error("base64Decode failed: ",r)}return null};
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var u=function(){function t(){var t=this;this.reject=function(){},this.resolve=function(){},this.promise=new Promise((function(r,e){t.resolve=r,t.reject=e}))}return t.prototype.wrapCallback=function(t){var r=this;return function(e,n){e?r.reject(e):r.resolve(n),"function"===typeof t&&(r.promise.catch((function(){})),1===t.length?t(e):t(e,n))}},t}();
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function f(t,r){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');var e={alg:"none",type:"JWT"},i=r||"demo-project",o=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");var a=Object(n["a"])({iss:"https://securetoken.google.com/"+i,aud:i,iat:o,exp:o+3600,auth_time:o,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t),h="";return[c(JSON.stringify(e)),c(JSON.stringify(a)),h].join(".")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function p(){return"undefined"!==typeof navigator&&"string"===typeof navigator["userAgent"]?navigator["userAgent"]:""}function d(){return"undefined"!==typeof window&&!!(window["cordova"]||window["phonegap"]||window["PhoneGap"])&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(p())}function l(){try{return"[object process]"===Object.prototype.toString.call(t.process)}catch(r){return!1}}function v(){var t="object"===typeof chrome?chrome.runtime:"object"===typeof browser?browser.runtime:void 0;return"object"===typeof t&&void 0!==t.id}function b(){return"object"===typeof navigator&&"ReactNative"===navigator["product"]}function _(){return p().indexOf("Electron/")>=0}function y(){var t=p();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function g(){return p().indexOf("MSAppHost/")>=0}function S(){return!l()&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var A="FirebaseError",E=function(t){function r(e,n,i){var o=t.call(this,n)||this;return o.code=e,o.customData=i,o.name=A,Object.setPrototypeOf(o,r.prototype),Error.captureStackTrace&&Error.captureStackTrace(o,C.prototype.create),o}return Object(n["c"])(r,t),r}(Error),C=function(){function t(t,r,e){this.service=t,this.serviceName=r,this.errors=e}return t.prototype.create=function(t){for(var r=[],e=1;e<arguments.length;e++)r[e-1]=arguments[e];var n=r[0]||{},i=this.service+"/"+t,o=this.errors[t],s=o?m(o,n):"Error",a=this.serviceName+": "+s+" ("+i+").",c=new E(i,a,n);return c},t}();function m(t,r){return t.replace(O,(function(t,e){var n=r[e];return null!=n?String(n):"<"+e+"?>"}))}var O=/\{\$([^}]+)}/g;
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function T(t){for(var r in t)if(Object.prototype.hasOwnProperty.call(t,r))return!1;return!0}function w(t,r){if(t===r)return!0;for(var e=Object.keys(t),n=Object.keys(r),i=0,o=e;i<o.length;i++){var s=o[i];if(!n.includes(s))return!1;var a=t[s],c=r[s];if(k(a)&&k(c)){if(!w(a,c))return!1}else if(a!==c)return!1}for(var h=0,u=n;h<u.length;h++){s=u[h];if(!e.includes(s))return!1}return!0}function k(t){return null!==t&&"object"===typeof t}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */function D(t){for(var r=[],e=function(t,e){Array.isArray(e)?e.forEach((function(e){r.push(encodeURIComponent(t)+"="+encodeURIComponent(e))})):r.push(encodeURIComponent(t)+"="+encodeURIComponent(e))},n=0,i=Object.entries(t);n<i.length;n++){var o=i[n],s=o[0],a=o[1];e(s,a)}return r.length?"&"+r.join("&"):""}function j(t){var r={},e=t.replace(/^\?/,"").split("&");return e.forEach((function(t){if(t){var e=t.split("="),n=e[0],i=e[1];r[decodeURIComponent(n)]=decodeURIComponent(i)}})),r}function M(t){var r=t.indexOf("?");if(!r)return"";var e=t.indexOf("#",r);return t.substring(r,e>0?e:void 0)}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */(function(){function t(){this.chain_=[],this.buf_=[],this.W_=[],this.pad_=[],this.inbuf_=0,this.total_=0,this.blockSize=64,this.pad_[0]=128;for(var t=1;t<this.blockSize;++t)this.pad_[t]=0;this.reset()}t.prototype.reset=function(){this.chain_[0]=1732584193,this.chain_[1]=4023233417,this.chain_[2]=2562383102,this.chain_[3]=271733878,this.chain_[4]=3285377520,this.inbuf_=0,this.total_=0},t.prototype.compress_=function(t,r){r||(r=0);var e=this.W_;if("string"===typeof t)for(var n=0;n<16;n++)e[n]=t.charCodeAt(r)<<24|t.charCodeAt(r+1)<<16|t.charCodeAt(r+2)<<8|t.charCodeAt(r+3),r+=4;else for(n=0;n<16;n++)e[n]=t[r]<<24|t[r+1]<<16|t[r+2]<<8|t[r+3],r+=4;for(n=16;n<80;n++){var i=e[n-3]^e[n-8]^e[n-14]^e[n-16];e[n]=4294967295&(i<<1|i>>>31)}var o,s,a=this.chain_[0],c=this.chain_[1],h=this.chain_[2],u=this.chain_[3],f=this.chain_[4];for(n=0;n<80;n++){n<40?n<20?(o=u^c&(h^u),s=1518500249):(o=c^h^u,s=1859775393):n<60?(o=c&h|u&(c|h),s=2400959708):(o=c^h^u,s=3395469782);i=(a<<5|a>>>27)+o+f+s+e[n]&4294967295;f=u,u=h,h=4294967295&(c<<30|c>>>2),c=a,a=i}this.chain_[0]=this.chain_[0]+a&4294967295,this.chain_[1]=this.chain_[1]+c&4294967295,this.chain_[2]=this.chain_[2]+h&4294967295,this.chain_[3]=this.chain_[3]+u&4294967295,this.chain_[4]=this.chain_[4]+f&4294967295},t.prototype.update=function(t,r){if(null!=t){void 0===r&&(r=t.length);var e=r-this.blockSize,n=0,i=this.buf_,o=this.inbuf_;while(n<r){if(0===o)while(n<=e)this.compress_(t,n),n+=this.blockSize;if("string"===typeof t){while(n<r)if(i[o]=t.charCodeAt(n),++o,++n,o===this.blockSize){this.compress_(i),o=0;break}}else while(n<r)if(i[o]=t[n],++o,++n,o===this.blockSize){this.compress_(i),o=0;break}}this.inbuf_=o,this.total_+=r}},t.prototype.digest=function(){var t=[],r=8*this.total_;this.inbuf_<56?this.update(this.pad_,56-this.inbuf_):this.update(this.pad_,this.blockSize-(this.inbuf_-56));for(var e=this.blockSize-1;e>=56;e--)this.buf_[e]=255&r,r/=256;this.compress_(this.buf_);var n=0;for(e=0;e<5;e++)for(var i=24;i>=0;i-=8)t[n]=this.chain_[e]>>i&255,++n;return t}})();function B(t,r){var e=new N(t,r);return e.subscribe.bind(e)}var N=function(){function t(t,r){var e=this;this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=r,this.task.then((function(){t(e)})).catch((function(t){e.error(t)}))}return t.prototype.next=function(t){this.forEachObserver((function(r){r.next(t)}))},t.prototype.error=function(t){this.forEachObserver((function(r){r.error(t)})),this.close(t)},t.prototype.complete=function(){this.forEachObserver((function(t){t.complete()})),this.close()},t.prototype.subscribe=function(t,r,e){var n,i=this;if(void 0===t&&void 0===r&&void 0===e)throw new Error("Missing Observer.");n=W(t,["next","error","complete"])?t:{next:t,error:r,complete:e},void 0===n.next&&(n.next=V),void 0===n.error&&(n.error=V),void 0===n.complete&&(n.complete=V);var o=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then((function(){try{i.finalError?n.error(i.finalError):n.complete()}catch(t){}})),this.observers.push(n),o},t.prototype.unsubscribeOne=function(t){void 0!==this.observers&&void 0!==this.observers[t]&&(delete this.observers[t],this.observerCount-=1,0===this.observerCount&&void 0!==this.onNoObservers&&this.onNoObservers(this))},t.prototype.forEachObserver=function(t){if(!this.finalized)for(var r=0;r<this.observers.length;r++)this.sendOne(r,t)},t.prototype.sendOne=function(t,r){var e=this;this.task.then((function(){if(void 0!==e.observers&&void 0!==e.observers[t])try{r(e.observers[t])}catch(n){"undefined"!==typeof console&&console.error&&console.error(n)}}))},t.prototype.close=function(t){var r=this;this.finalized||(this.finalized=!0,void 0!==t&&(this.finalError=t),this.task.then((function(){r.observers=void 0,r.onNoObservers=void 0})))},t}();function W(t,r){if("object"!==typeof t||null===t)return!1;for(var e=0,n=r;e<n.length;e++){var i=n[e];if(i in t&&"function"===typeof t[i])return!0}return!1}function V(){}
/**
 * @license
 * Copyright 2017 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * @license
 * Copyright 2021 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function x(t){return t&&t._delegate?t._delegate:t}}).call(this,e("c8ba"))}}]);
//# sourceMappingURL=chunk-vendors~b85af4ba.efc7e407.js.map