/**
 * A JavaScript implementation of the SHA family of hashes - defined in FIPS PUB 180-4, FIPS PUB 202,
 * and SP 800-185 - as well as the corresponding HMAC implementation as defined in FIPS PUB 198-1.
 *
 * Copyright 2008-2021 Brian Turek, 1998-2009 Paul Johnston & Contributors
 * Distributed under the BSD License
 * See http://caligatio.github.com/jsSHA/ for more information
 */
const t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";function r(t,r,n,i){let e,s,o;const h=r||[0],u=(n=n||0)>>>3,f=-1===i?3:0;for(e=0;e<t.length;e+=1)o=e+u,s=o>>>2,h.length<=s&&h.push(0),h[s]|=t[e]<<8*(f+i*(o%4));return{value:h,binLen:8*t.length+n}}function n(n,i,e){switch(i){case"UTF8":case"UTF16BE":case"UTF16LE":break;default:throw new Error("encoding must be UTF8, UTF16BE, or UTF16LE")}switch(n){case"HEX":return function(t,r,n){return function(t,r,n,i){let e,s,o,h;if(0!=t.length%2)throw new Error("String of HEX type must be in byte increments");const u=r||[0],f=(n=n||0)>>>3,c=-1===i?3:0;for(e=0;e<t.length;e+=2){if(s=parseInt(t.substr(e,2),16),isNaN(s))throw new Error("String of HEX type contains invalid characters");for(h=(e>>>1)+f,o=h>>>2;u.length<=o;)u.push(0);u[o]|=s<<8*(c+i*(h%4))}return{value:u,binLen:4*t.length+n}}(t,r,n,e)};case"TEXT":return function(t,r,n){return function(t,r,n,i,e){let s,o,h,u,f,c,a,w,A=0;const E=n||[0],l=(i=i||0)>>>3;if("UTF8"===r)for(a=-1===e?3:0,h=0;h<t.length;h+=1)for(s=t.charCodeAt(h),o=[],128>s?o.push(s):2048>s?(o.push(192|s>>>6),o.push(128|63&s)):55296>s||57344<=s?o.push(224|s>>>12,128|s>>>6&63,128|63&s):(h+=1,s=65536+((1023&s)<<10|1023&t.charCodeAt(h)),o.push(240|s>>>18,128|s>>>12&63,128|s>>>6&63,128|63&s)),u=0;u<o.length;u+=1){for(c=A+l,f=c>>>2;E.length<=f;)E.push(0);E[f]|=o[u]<<8*(a+e*(c%4)),A+=1}else for(a=-1===e?2:0,w="UTF16LE"===r&&1!==e||"UTF16LE"!==r&&1===e,h=0;h<t.length;h+=1){for(s=t.charCodeAt(h),!0===w&&(u=255&s,s=u<<8|s>>>8),c=A+l,f=c>>>2;E.length<=f;)E.push(0);E[f]|=s<<8*(a+e*(c%4)),A+=2}return{value:E,binLen:8*A+i}}(t,i,r,n,e)};case"B64":return function(r,n,i){return function(r,n,i,e){let s,o,h,u,f,c,a,w=0;const A=n||[0],E=(i=i||0)>>>3,l=-1===e?3:0,p=r.indexOf("=");if(-1===r.search(/^[a-zA-Z0-9=+/]+$/))throw new Error("Invalid character in base-64 string");if(r=r.replace(/=/g,""),-1!==p&&p<r.length)throw new Error("Invalid '=' found in base-64 string");for(o=0;o<r.length;o+=4){for(f=r.substr(o,4),u=0,h=0;h<f.length;h+=1)s=t.indexOf(f.charAt(h)),u|=s<<18-6*h;for(h=0;h<f.length-1;h+=1){for(a=w+E,c=a>>>2;A.length<=c;)A.push(0);A[c]|=(u>>>16-8*h&255)<<8*(l+e*(a%4)),w+=1}}return{value:A,binLen:8*w+i}}(r,n,i,e)};case"BYTES":return function(t,r,n){return function(t,r,n,i){let e,s,o,h;const u=r||[0],f=(n=n||0)>>>3,c=-1===i?3:0;for(s=0;s<t.length;s+=1)e=t.charCodeAt(s),h=s+f,o=h>>>2,u.length<=o&&u.push(0),u[o]|=e<<8*(c+i*(h%4));return{value:u,binLen:8*t.length+n}}(t,r,n,e)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t,n,i){return function(t,n,i,e){return r(new Uint8Array(t),n,i,e)}(t,n,i,e)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t,n,i){return r(t,n,i,e)};default:throw new Error("format must be HEX, TEXT, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}function i(r,n,i,e){switch(r){case"HEX":return function(t){return function(t,r,n,i){const e="0123456789abcdef";let s,o,h="";const u=r/8,f=-1===n?3:0;for(s=0;s<u;s+=1)o=t[s>>>2]>>>8*(f+n*(s%4)),h+=e.charAt(o>>>4&15)+e.charAt(15&o);return i.outputUpper?h.toUpperCase():h}(t,n,i,e)};case"B64":return function(r){return function(r,n,i,e){let s,o,h,u,f,c="";const a=n/8,w=-1===i?3:0;for(s=0;s<a;s+=3)for(u=s+1<a?r[s+1>>>2]:0,f=s+2<a?r[s+2>>>2]:0,h=(r[s>>>2]>>>8*(w+i*(s%4))&255)<<16|(u>>>8*(w+i*((s+1)%4))&255)<<8|f>>>8*(w+i*((s+2)%4))&255,o=0;o<4;o+=1)c+=8*s+6*o<=n?t.charAt(h>>>6*(3-o)&63):e.b64Pad;return c}(r,n,i,e)};case"BYTES":return function(t){return function(t,r,n){let i,e,s="";const o=r/8,h=-1===n?3:0;for(i=0;i<o;i+=1)e=t[i>>>2]>>>8*(h+n*(i%4))&255,s+=String.fromCharCode(e);return s}(t,n,i)};case"ARRAYBUFFER":try{new ArrayBuffer(0)}catch(t){throw new Error("ARRAYBUFFER not supported by this environment")}return function(t){return function(t,r,n){let i;const e=r/8,s=new ArrayBuffer(e),o=new Uint8Array(s),h=-1===n?3:0;for(i=0;i<e;i+=1)o[i]=t[i>>>2]>>>8*(h+n*(i%4))&255;return s}(t,n,i)};case"UINT8ARRAY":try{new Uint8Array(0)}catch(t){throw new Error("UINT8ARRAY not supported by this environment")}return function(t){return function(t,r,n){let i;const e=r/8,s=-1===n?3:0,o=new Uint8Array(e);for(i=0;i<e;i+=1)o[i]=t[i>>>2]>>>8*(s+n*(i%4))&255;return o}(t,n,i)};default:throw new Error("format must be HEX, B64, BYTES, ARRAYBUFFER, or UINT8ARRAY")}}const e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298],s=[3238371032,914150663,812702999,4144912697,4290775857,1750603025,1694076839,3204075428],o=[1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225];function h(t){const r={outputUpper:!1,b64Pad:"=",outputLen:-1},n=t||{},i="Output length must be a multiple of 8";if(r.outputUpper=n.outputUpper||!1,n.b64Pad&&(r.b64Pad=n.b64Pad),n.outputLen){if(n.outputLen%8!=0)throw new Error(i);r.outputLen=n.outputLen}else if(n.shakeLen){if(n.shakeLen%8!=0)throw new Error(i);r.outputLen=n.shakeLen}if("boolean"!=typeof r.outputUpper)throw new Error("Invalid outputUpper formatting option");if("string"!=typeof r.b64Pad)throw new Error("Invalid b64Pad formatting option");return r}function u(t,r){return t>>>r|t<<32-r}function f(t,r){return t>>>r}function c(t,r,n){return t&r^~t&n}function a(t,r,n){return t&r^t&n^r&n}function w(t){return u(t,2)^u(t,13)^u(t,22)}function A(t,r){const n=(65535&t)+(65535&r);return(65535&(t>>>16)+(r>>>16)+(n>>>16))<<16|65535&n}function E(t,r,n,i){const e=(65535&t)+(65535&r)+(65535&n)+(65535&i);return(65535&(t>>>16)+(r>>>16)+(n>>>16)+(i>>>16)+(e>>>16))<<16|65535&e}function l(t,r,n,i,e){const s=(65535&t)+(65535&r)+(65535&n)+(65535&i)+(65535&e);return(65535&(t>>>16)+(r>>>16)+(n>>>16)+(i>>>16)+(e>>>16)+(s>>>16))<<16|65535&s}function p(t){return u(t,7)^u(t,18)^f(t,3)}function R(t){return u(t,6)^u(t,11)^u(t,25)}function U(t){let r;return r="SHA-224"==t?s.slice():o.slice(),r}function d(t,r){let n,i,s,o,h,U,d,y,T,F,b;const m=[];for(n=r[0],i=r[1],s=r[2],o=r[3],h=r[4],U=r[5],d=r[6],y=r[7],b=0;b<64;b+=1)m[b]=b<16?t[b]:E(u(g=m[b-2],17)^u(g,19)^f(g,10),m[b-7],p(m[b-15]),m[b-16]),T=l(y,R(h),c(h,U,d),e[b],m[b]),F=A(w(n),a(n,i,s)),y=d,d=U,U=h,h=A(o,T),o=s,s=i,i=n,n=A(T,F);var g;return r[0]=A(n,r[0]),r[1]=A(i,r[1]),r[2]=A(s,r[2]),r[3]=A(o,r[3]),r[4]=A(h,r[4]),r[5]=A(U,r[5]),r[6]=A(d,r[6]),r[7]=A(y,r[7]),r}export default class extends class{constructor(t,r,n){const i=n||{};if(this.t=r,this.i=i.encoding||"UTF8",this.numRounds=i.numRounds||1,isNaN(this.numRounds)||this.numRounds!==parseInt(this.numRounds,10)||1>this.numRounds)throw new Error("numRounds must a integer >= 1");this.o=t,this.h=[],this.u=0,this.A=!1,this.l=0,this.p=!1,this.R=[],this.U=[]}update(t){let r,n=0;const i=this.T>>>5,e=this.F(t,this.h,this.u),s=e.binLen,o=e.value,h=s>>>5;for(r=0;r<h;r+=i)n+this.T<=s&&(this.m=this.g(o.slice(r,r+i),this.m),n+=this.T);this.l+=n,this.h=o.slice(n>>>5),this.u=s%this.T,this.A=!0}getHash(t,r){let n,e,s=this.B;const o=h(r);if(this.H){if(-1===o.outputLen)throw new Error("Output length must be specified in options");s=o.outputLen}const u=i(t,s,this.v,o);if(this.p&&this.Y)return u(this.Y(o));for(e=this.C(this.h.slice(),this.u,this.l,this.S(this.m),s),n=1;n<this.numRounds;n+=1)this.H&&s%32!=0&&(e[e.length-1]&=16777215>>>24-s%32),e=this.C(e,s,0,this.I(this.o),s);return u(e)}setHMACKey(t,r,i){if(!this.L)throw new Error("Variant does not support HMAC");if(this.A)throw new Error("Cannot set MAC key after calling update");const e=n(r,(i||{}).encoding||"UTF8",this.v);this.M(e(t))}M(t){const r=this.T>>>3,n=r/4-1;let i;if(1!==this.numRounds)throw new Error("Cannot set numRounds with MAC");if(this.p)throw new Error("MAC key already set");for(r<t.binLen/8&&(t.value=this.C(t.value,t.binLen,0,this.I(this.o),this.B));t.value.length<=n;)t.value.push(0);for(i=0;i<=n;i+=1)this.R[i]=909522486^t.value[i],this.U[i]=1549556828^t.value[i];this.m=this.g(this.R,this.m),this.l=this.T,this.p=!0}getHMAC(t,r){const n=h(r);return i(t,this.B,this.v,n)(this.N())}N(){let t;if(!this.p)throw new Error("Cannot call getHMAC without first setting MAC key");const r=this.C(this.h.slice(),this.u,this.l,this.S(this.m),this.B);return t=this.g(this.U,this.I(this.o)),t=this.C(r,this.B,this.T,t,this.B),t}}{constructor(t,r,i){if("SHA-224"!==t&&"SHA-256"!==t)throw new Error("Chosen SHA variant is not supported");super(t,r,i);const e=i||{};this.Y=this.N,this.L=!0,this.v=-1,this.F=n(this.t,this.i,this.v),this.g=d,this.S=function(t){return t.slice()},this.I=U,this.C=function(r,n,i,e){return function(t,r,n,i,e){let s,o;const h=15+(r+65>>>9<<4),u=r+n;for(;t.length<=h;)t.push(0);for(t[r>>>5]|=128<<24-r%32,t[h]=4294967295&u,t[h-1]=u/4294967296|0,s=0;s<t.length;s+=16)i=d(t.slice(s,s+16),i);return o="SHA-224"===e?[i[0],i[1],i[2],i[3],i[4],i[5],i[6]]:i,o}(r,n,i,e,t)},this.m=U(t),this.T=512,this.B="SHA-224"===t?224:256,this.H=!1,e.hmacKey&&this.M(function(t,r,i,e){const s=t+" must include a value and format";if(!r){if(!e)throw new Error(s);return e}if(void 0===r.value||!r.format)throw new Error(s);return n(r.format,r.encoding||"UTF8",i)(r.value)}("hmacKey",e.hmacKey,this.v))}}
