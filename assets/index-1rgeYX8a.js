var vn=Object.defineProperty;var xn=(r,e,o)=>e in r?vn(r,e,{enumerable:!0,configurable:!0,writable:!0,value:o}):r[e]=o;var _=(r,e,o)=>xn(r,typeof e!="symbol"?e+"":e,o);import{c as wn,r as L,u as Pt,j as d,a as $i,b as Ao,C as yn,P as bn,A as _n,E as Sn,B as Tn,D as Cn,V as Mn,d as kn,R as En}from"./r3f-B9fvU4VK.js";import{h as q,c as pt,d as ir,w as Do,Q as qi,j as Zi,X as Fo,Y as dt,x as Ro,f as Ki,Z as so,_ as Pn,I as Ct,$ as zn,o as An,J as Dn,a0 as Fn,a1 as No,a2 as ao,R as Rn,a3 as Nn}from"./three-CzjNjYOe.js";import{g as ci,m as jn}from"./motion-BMU4bwRX.js";(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))t(i);new MutationObserver(i=>{for(const n of i)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function o(i){const n={};return i.integrity&&(n.integrity=i.integrity),i.referrerPolicy&&(n.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?n.credentials="include":i.crossOrigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(i){if(i.ep)return;i.ep=!0;const n=o(i);fetch(i.href,n)}})();const vr=[{id:"midnight-sakura",label:"Midnight Sakura",dataTheme:"dark",sceneId:"snow-mountain",fonts:{display:"'Yuji Syuku', serif",body:"'Shippori Mincho', serif",mono:"'Fira Code', monospace"},vars:{"--bg":"#0C0D14","--bg-2":"#13141E","--card":"rgba(20, 22, 32, 0.62)","--card-solid":"#141620","--text":"#B9BDCB","--bright":"#F3F1EC","--gold":"#E2C488","--gold-deep":"#C0A062","--gold-2":"#9C8049","--glow":"rgba(226, 196, 136, 0.16)","--maple":"#C24A3E","--border":"rgba(243, 241, 236, 0.11)","--shadow":"0 26px 70px rgba(0, 0, 0, 0.55)"}},{id:"dawn",label:"Dawn",dataTheme:"light",sceneId:"snow-mountain",fonts:{display:"'Yuji Syuku', serif",body:"'Shippori Mincho', serif",mono:"'Fira Code', monospace"},vars:{"--bg":"#F6F2EA","--bg-2":"#EDE6D9","--card":"rgba(255, 255, 255, 0.74)","--card-solid":"#FFFFFF","--text":"#574F45","--bright":"#2A2620","--gold":"#B0884B","--gold-deep":"#9A7440","--gold-2":"#866536","--glow":"rgba(176, 136, 75, 0.18)","--maple":"#A8392D","--border":"rgba(42, 38, 32, 0.1)","--shadow":"0 26px 70px rgba(42, 38, 32, 0.12)"}}];function jo(r){return vr.find(e=>e.id===r)||vr[0]}function Wo(r){if(typeof document>"u")return;const e=jo(r),o=document.documentElement;Object.entries(e.vars).forEach(([t,i])=>o.style.setProperty(t,i)),o.style.setProperty("--fh",e.fonts.display),o.style.setProperty("--fb",e.fonts.body),o.style.setProperty("--fm",e.fonts.mono),o.setAttribute("data-theme",e.dataTheme)}const Wn=typeof localStorage<"u"&&localStorage.getItem("theme")||vr[0].id,Ht=wn((r,e)=>({theme:Wn,sceneId:"wind-field",setTheme:o=>{typeof localStorage<"u"&&localStorage.setItem("theme",o),Wo(o),r({theme:o})},cycleTheme:()=>{const o=vr.findIndex(t=>t.id===e().theme);e().setTheme(vr[(o+1)%vr.length].id)},setScene:o=>r({sceneId:o}),progress:0,setProgress:o=>r({progress:o})})),Oo=Math.sqrt(3),On=.5*(Oo-1),Er=(3-Oo)/6,lo=r=>Math.floor(r)|0,co=new Float64Array([1,1,-1,1,1,-1,-1,-1,1,0,-1,0,1,0,-1,0,0,1,0,-1,0,1,0,-1]);function Ln(r=Math.random){const e=In(r),o=new Float64Array(e).map(i=>co[i%12*2]),t=new Float64Array(e).map(i=>co[i%12*2+1]);return function(n,s){let a=0,f=0,m=0;const w=(n+s)*On,v=lo(n+w),h=lo(s+w),u=(v+h)*Er,p=v-u,W=h-u,E=n-p,P=s-W;let O,G;E>P?(O=1,G=0):(O=0,G=1);const M=E-O+Er,ie=P-G+Er,Y=E-1+2*Er,T=P-1+2*Er,me=v&255,ye=h&255;let b=.5-E*E-P*P;if(b>=0){const be=me+e[ye],$=o[be],oe=t[be];b*=b,a=b*b*($*E+oe*P)}let Q=.5-M*M-ie*ie;if(Q>=0){const be=me+O+e[ye+G],$=o[be],oe=t[be];Q*=Q,f=Q*Q*($*M+oe*ie)}let S=.5-Y*Y-T*T;if(S>=0){const be=me+1+e[ye+1],$=o[be],oe=t[be];S*=S,m=S*S*($*Y+oe*T)}return 70*(a+f+m)}}function In(r){const o=new Uint8Array(512);for(let t=0;t<512/2;t++)o[t]=t;for(let t=0;t<512/2-1;t++){const i=t+~~(r()*(256-t)),n=o[t];o[t]=o[i],o[i]=n}for(let t=256;t<512;t++)o[t]=o[t-256];return o}const Ci=Ln(),Lo=4,Bn=3,y={time:0,dirX:1,dirY:0,strength:.6,cursorX:0,cursorZ:0,cursorVX:0,cursorVZ:0,cursorActive:0,ndcX:0,ndcY:0,progress:0,gusts:[]};function Io(r,e){y.gusts.push({x:r,z:e,t0:y.time}),y.gusts.length>Lo&&y.gusts.shift()}function Hn(r,e,o){y.cursorVX=r-y.cursorX,y.cursorVZ=e-y.cursorZ,y.cursorX=r,y.cursorZ=e}function Gn(r,e){y.ndcX=r,y.ndcY=e}function Yn(r){y.progress=Math.min(1,Math.max(0,r))}function Xn(r){y.time=r;const e=Ci(r*.015,0)*.6;y.dirX+=(Math.cos(e)-y.dirX)*.02,y.dirY+=(Math.sin(e)*.5-y.dirY)*.02;const o=.5+.5*Ci(r*.12,5),t=.5+.5*Ci(r*.45,20),i=Math.min(1.5,Math.hypot(y.cursorVX,y.cursorVZ)*4);y.strength=.45+o*.7+t*.25+i*.3,y.cursorVX*=.86,y.cursorVZ*=.86,y.cursorActive*=.94,y.gusts=y.gusts.filter(n=>r-n.t0<Bn)}function Bo(){const r=[];for(let e=0;e<Lo;e++){const o=y.gusts[e];r.push(o?[o.x,o.z,y.time-o.t0]:[0,0,-1])}return r}const J={zenith:new q("#1b1730"),horizon:new q("#e89a52"),haze:new q("#caa074"),sun:new q("#ffe6b8"),sunDir:new pt(-.55,.18,-.82).normalize(),fog:new q("#b98a64"),grassBase:new q("#2c2a16"),grassTip:new q("#d8b25a"),grassDry:new q("#b98a3e"),grassGreen:new q("#586a30"),ground:new q("#211d12"),maple:new q("#c0392b"),sakura:new q("#f3c6d6"),moon:new q("#cdd6f0"),star:new q("#e8ecff"),cloud:new q("#d8a878"),fujiSnow:new q("#e6e2f0"),fujiRock:new q("#46435f"),firefly:new q("#ffcf7a")},Un=`
  varying vec3 vDir;
  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Vn=`
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  uniform vec3 uSun;
  uniform vec3 uSunDir;
  uniform vec3 uMoon;
  uniform vec3 uMoonDir;
  uniform vec3 uStar;
  uniform vec3 uCloud;
  uniform float uTime;
  uniform vec2 uWind;
  varying vec3 vDir;

  float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float hash31(vec3 p){ p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3)); p *= 17.0; return fract(p.x * p.y * p.z * (p.x + p.y + p.z)); }
  float vnoise2(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1,0)), c = hash21(i + vec2(0,1)), d = hash21(i + vec2(1,1));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm2(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*vnoise2(p); p*=2.0; a*=0.5; } return v; }

  void main() {
    vec3 dir = normalize(vDir);
    float up = clamp(dir.y, 0.0, 1.0);

    // base gradient: warm band hugging the horizon, indigo above
    float horizonBand = pow(1.0 - up, 2.4);
    vec3 col = mix(uZenith, uHorizon, horizonBand);

    // azimuthal scattering: warm forward glow toward the sun, cool anti-sun wash
    float sa = max(dot(dir, normalize(uSunDir)), 0.0);
    col += uHorizon * pow(sa, 3.0) * 0.35 * (1.0 - up);
    float anti = pow(max(dot(dir, -normalize(uSunDir)), 0.0), 2.0) * 0.28 * (1.0 - up);
    col = mix(col, col * vec3(0.84, 0.9, 1.12), anti);

    // sun disc + bloom halo
    col += uSun * pow(sa, 320.0) * 1.6;
    col += uSun * pow(sa, 8.0) * 0.18;

    // moon disc + soft cool halo
    float ma = max(dot(dir, normalize(uMoonDir)), 0.0);
    col += uMoon * pow(ma, 1400.0) * 1.2;
    col += uMoon * pow(ma, 40.0) * 0.05;

    // stars: fade in toward the zenith, gentle twinkle
    float starMask = smoothstep(0.18, 0.62, dir.y);
    vec3 sq = floor(dir * 230.0);
    float sp = hash31(sq);
    float star = smoothstep(0.992, 1.0, sp);
    float tw = 0.6 + 0.4 * sin(uTime * 3.0 + sp * 100.0);
    col += uStar * star * starMask * tw * 0.9;

    // drifting cloud band just above the horizon, backlit by the sun
    float band = smoothstep(0.34, 0.02, abs(dir.y - 0.13));
    vec2 cuv = vec2(atan(dir.z, dir.x) * 1.6, dir.y * 3.0)
             + vec2(uTime * 0.012, 0.0) + uWind * uTime * 0.004;
    float clouds = fbm2(cuv * 2.0);
    clouds = smoothstep(0.52, 0.92, clouds) * band;
    vec3 cloudCol = mix(uCloud, uSun, pow(sa, 2.0) * 0.7);
    col = mix(col, cloudCol, clouds * 0.7);

    // darken below the horizon line
    col *= smoothstep(-0.28, 0.04, dir.y) * 0.55 + 0.45;

    gl_FragColor = vec4(col, 1.0);
  }
`;function $n(){const r=L.useRef(),e=L.useMemo(()=>({uZenith:{value:J.zenith},uHorizon:{value:J.horizon},uSun:{value:J.sun},uSunDir:{value:J.sunDir},uMoon:{value:J.moon},uMoonDir:{value:new pt(.55,.5,.82).normalize()},uStar:{value:J.star},uCloud:{value:J.cloud},uTime:{value:0},uWind:{value:new ir(1,0)}}),[]);return Pt(()=>{if(!r.current)return;const o=r.current.uniforms;o.uTime.value=y.time,o.uWind.value.set(y.dirX,y.dirY)}),d.jsxs("mesh",{renderOrder:-10,frustumCulled:!1,children:[d.jsx("sphereGeometry",{args:[320,48,24]}),d.jsx("shaderMaterial",{ref:r,uniforms:e,vertexShader:Un,fragmentShader:Vn,side:Do,depthWrite:!1,fog:!1,toneMapped:!1})]})}const qn=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Zn=`
  uniform vec3 uHaze;
  uniform vec3 uFar;
  uniform vec3 uNear;
  uniform vec3 uSun;
  varying vec2 vUv;

  float hash(float n){ return fract(sin(n) * 43758.5453123); }
  float vnoise(float x){
    float i = floor(x); float f = fract(x);
    float u = f*f*(3.0-2.0*f);
    return mix(hash(i), hash(i+1.0), u);
  }
  float fbm(float x){
    float v = 0.0, a = 0.5;
    for(int i=0;i<5;i++){ v += a*vnoise(x); x*=2.0; a*=0.5; }
    return v;
  }

  void main() {
    float ang = vUv.x;
    float y = vUv.y;
    float horizon = 0.44;
    vec3 col = vec3(0.0);
    float alpha = 0.0;

    // five ridge layers, far (hazy/low, cool) → near (taller, warmer)
    for (int k = 0; k < 5; k++){
      float fk = float(k);
      float freq = 11.0 + fk * 13.0;
      float amp  = 0.15 - fk * 0.02;
      float off  = fk * 7.3;
      float ridge = horizon + (fbm(ang * freq + off) - 0.5) * 2.0 * amp - fk * 0.016;
      if (y < ridge) {
        float depth = clamp((ridge - y) / max(amp, 0.001), 0.0, 1.0);
        vec3 layerCol = mix(uFar, uNear, fk * 0.25);
        float rim = smoothstep(0.72, 1.0, ang) * smoothstep(0.0, 0.1, ridge - y) * (fk * 0.2);
        layerCol += uSun * rim * 0.2;
        // heavy aerial perspective — distant ridges wash into haze
        layerCol = mix(uHaze, layerCol, smoothstep(0.0, 0.62, depth) * (0.5 + fk * 0.12));
        col = layerCol;
        alpha = 1.0;
      }
    }
    if (alpha < 0.5) discard;
    col = mix(uHaze, col, smoothstep(0.14, 0.44, y));
    gl_FragColor = vec4(col, 1.0);
  }
`;function Kn(){const r=L.useMemo(()=>({uHaze:{value:J.haze},uFar:{value:new q("#6b6f8c")},uNear:{value:new q("#40405c")},uSun:{value:J.sun}}),[]);return d.jsxs("mesh",{position:[0,14,0],renderOrder:-9,frustumCulled:!1,children:[d.jsx("cylinderGeometry",{args:[200,200,120,96,1,!0]}),d.jsx("shaderMaterial",{uniforms:r,vertexShader:qn,fragmentShader:Zn,side:Do,transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1})]})}const Jn=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Qn=`
  uniform sampler2D uTex;
  uniform vec3 uHaze;
  uniform vec3 uZenith;
  uniform vec3 uHorizon;
  varying vec2 vUv;

  void main() {
    // flip x so the photo's warm sunset glow sits on our sun side (left); crop
    // the vertical band to sky + mountain + town (drop the lake foreground)
    vec2 t = vec2(1.0 - vUv.x, mix(0.34, 0.96, vUv.y));
    vec3 c = texture2D(uTex, t).rgb;

    // Replace the photo's own sky (ABOVE the snowy summit only, so the peak
    // stays crisp) with OUR sky tones, so the matte flows seamlessly into the
    // procedural sky (no tone clash / edge).
    vec3 skyTone = mix(uHorizon, uZenith, smoothstep(0.55, 1.0, vUv.y));
    float sky = smoothstep(0.70, 0.86, vUv.y);
    c = mix(c, skyTone, sky * 0.9);

    // aerial perspective: wash the base into haze, mild overall for distance
    float base = smoothstep(0.0, 0.5, vUv.y);
    c = mix(uHaze, c, 0.5 + 0.5 * base);
    c = mix(c, uHaze, 0.1);

    // feather every edge widely so the card has no visible border: top (above the
    // summit) → the procedural sky takes over; bottom → the grass field covers it
    float aTop  = smoothstep(1.0, 0.76, vUv.y);
    float aBot  = smoothstep(0.0, 0.18, vUv.y);
    float aSide = smoothstep(0.0, 0.22, vUv.x) * smoothstep(1.0, 0.78, vUv.x);
    float a = aTop * aBot * aSide;
    gl_FragColor = vec4(c, a);
  }
`;function es(){const r=$i(qi,"/scenery/fuji.jpg");r.colorSpace=Zi;const e=L.useMemo(()=>({uTex:{value:r},uHaze:{value:J.haze},uZenith:{value:J.zenith},uHorizon:{value:J.horizon}}),[r]);return d.jsxs("mesh",{position:[0,30,-196],renderOrder:-9,frustumCulled:!1,children:[d.jsx("planeGeometry",{args:[236,122]}),d.jsx("shaderMaterial",{uniforms:e,vertexShader:Jn,fragmentShader:Qn,transparent:!0,depthWrite:!1,fog:!1,toneMapped:!1})]})}function ts(){return d.jsxs(d.Fragment,{children:[d.jsx(es,{}),d.jsx(Kn,{})]})}const rs=`
  varying vec3 vWorld;
  void main() {
    vec4 w = modelMatrix * vec4(position, 1.0);
    vWorld = w.xyz;
    gl_Position = projectionMatrix * viewMatrix * w;
  }
`,is=`
  uniform vec3 uNear;
  uniform vec3 uFar;
  uniform vec3 uFog;
  varying vec3 vWorld;

  float hash21(vec2 p){ p = fract(p * vec2(123.34, 456.21)); p += dot(p, p + 45.32); return fract(p.x * p.y); }
  float vnoise(vec2 p){
    vec2 i = floor(p), f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    float a = hash21(i), b = hash21(i + vec2(1,0)), c = hash21(i + vec2(0,1)), d = hash21(i + vec2(1,1));
    return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
  }
  float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i=0;i<5;i++){ v += a*vnoise(p); p*=2.03; a*=0.5; } return v; }

  void main() {
    float d = length(vWorld.xz);
    vec3 col = mix(uNear, uFar, smoothstep(8.0, 90.0, d));

    // soil mottling so the ground under the grass isn't a flat wash
    float n = fbm(vWorld.xz * 0.12);
    col *= 0.82 + n * 0.4;

    // a faint trodden path winding through the field toward the camera line
    float path = abs(vWorld.x - sin(vWorld.z * 0.05) * 3.0);
    float trod = smoothstep(2.6, 0.6, path) * smoothstep(40.0, -6.0, vWorld.z);
    col = mix(col, col * 1.18 + uNear * 0.06, trod * 0.5);

    // radial darkening + ground haze near the horizon
    col = mix(col, uFog, smoothstep(60.0, 160.0, d));
    gl_FragColor = vec4(col, 1.0);
  }
`;function os(){const r=L.useMemo(()=>({uNear:{value:J.ground},uFar:{value:new q("#34291b")},uFog:{value:J.fog}}),[]);return d.jsxs("mesh",{rotation:[-Math.PI/2,0,0],position:[0,-.05,0],renderOrder:-5,children:[d.jsx("planeGeometry",{args:[400,400,1,1]}),d.jsx("shaderMaterial",{uniforms:r,vertexShader:rs,fragmentShader:is,fog:!1,toneMapped:!1})]})}const Mi=6;function ns(){const r=[],e=[],o=[];for(let i=0;i<=Mi;i++){const n=i/Mi;r.push(-.5,n,0),e.push(0,n),r.push(.5,n,0),e.push(1,n)}for(let i=0;i<Mi;i++){const n=i*2,s=i*2+1,a=i*2+2,f=i*2+3;o.push(n,s,a,a,s,f)}const t=new Ki;return t.setAttribute("position",new so(r,3)),t.setAttribute("uv",new so(e,2)),t.setIndex(o),t}const ss=`
  attribute vec3 iOffset;
  attribute float iRot;
  attribute float iScale;
  attribute float iTint;
  attribute float iGreen;
  attribute float iPhase;
  attribute float iLean;

  uniform float uTime;
  uniform vec2 uWindDir;
  uniform float uWindStr;
  uniform vec3 uCursor;
  uniform float uCursorAct;
  uniform float uWidth;
  uniform float uFogNear;
  uniform float uFogFar;

  varying float vY;
  varying float vTint;
  varying float vGreen;
  varying float vFog;
  varying vec3 vNormal;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vY = uv.y;
    vTint = iTint;
    vGreen = iGreen;
    float t = uv.y;
    float h = iScale;
    // tapered, feathered blade — widest at base, point at the tip
    float w = uWidth * (1.0 - t * t * 0.92);

    // local blade in its own facing frame
    vec3 local = vec3((uv.x - 0.5) * w, t * h, 0.0);
    vec2 xz = rot(iRot) * local.xz;
    vec3 world = iOffset + vec3(xz.x, local.y, xz.y);

    // forward arc + gusty wind lean, quadratic in height (stiff base, loose tip)
    float sway = sin(uTime * 1.6 + iPhase + iOffset.x * 0.25 + iOffset.z * 0.2);
    float bend = (iLean * 0.5) + (uWindStr * 0.5 + 0.18) * (0.6 + 0.4 * sway);
    vec2 wd = normalize(uWindDir + 0.0001);
    float arc = bend * h * t * t;
    world.xz += wd * arc;

    // analytic normal from the curved blade surface (height tangent × width tangent)
    vec3 Th = normalize(vec3(wd.x * bend * h * 2.0 * t, h, wd.y * bend * h * 2.0 * t));
    vec3 Tw = vec3(cos(iRot), 0.0, sin(iRot));
    vNormal = normalize(cross(Th, Tw));

    // cursor parts the grass: push the tip away + press down within a radius
    vec2 toC = world.xz - uCursor.xz;
    float cd = length(toC);
    float infl = smoothstep(3.4, 0.0, cd) * uCursorAct;
    world.xz += normalize(toC + 0.0001) * infl * 1.3 * t;
    world.y -= infl * 0.55 * t;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    vFog = smoothstep(uFogNear, uFogFar, length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`,as=`
  uniform vec3 uBase;
  uniform vec3 uTip;
  uniform vec3 uDry;
  uniform vec3 uGreen;
  uniform vec3 uFog;
  uniform vec3 uSunDir;
  uniform vec3 uSunCol;
  varying float vY;
  varying float vTint;
  varying float vGreen;
  varying float vFog;
  varying vec3 vNormal;

  void main(){
    vec3 nrm = normalize(vNormal);
    if (!gl_FrontFacing) nrm = -nrm;

    // tip colour: gold↔dry per blade, shifted toward green for some blades
    vec3 tip = mix(uTip, uDry, vTint);
    tip = mix(tip, uGreen, vGreen);
    vec3 base = mix(uBase, uGreen * 0.6, vGreen);
    vec3 g = mix(base, tip, vY);
    g *= 0.5 + 0.5 * vY;                       // base ambient occlusion

    // sun lighting + sky ambient
    float diff = clamp(dot(nrm, uSunDir), 0.0, 1.0);
    float ambient = 0.4 + 0.22 * vY;
    vec3 lit = g * (ambient + diff * 0.7 * uSunCol);

    // backlit translucency — tips glow when the sun is behind the blade (susuki)
    float back = clamp(dot(-nrm, uSunDir), 0.0, 1.0);
    lit += tip * uSunCol * back * vY * vY * 0.7;

    vec3 col = mix(lit, uFog, vFog);
    gl_FragColor = vec4(col, 1.0);
  }
`;function ls({count:r=6e4,radius:e=72}){const o=L.useRef(),t=L.useMemo(()=>{const n=ns(),s=new Fo;s.index=n.index,s.attributes.position=n.attributes.position,s.attributes.uv=n.attributes.uv;const a=new Float32Array(r*3),f=new Float32Array(r),m=new Float32Array(r),w=new Float32Array(r),v=new Float32Array(r),h=new Float32Array(r),u=new Float32Array(r),p=Math.max(1,Math.floor(r/7)),W=new Float32Array(p),E=new Float32Array(p);for(let P=0;P<p;P++){const O=Math.random()*Math.PI*2,G=Math.pow(Math.random(),.7)*e;W[P]=Math.cos(O)*G,E[P]=Math.sin(O)*G}for(let P=0;P<r;P++){const O=P%p,G=Math.pow(Math.random(),.5)*.7,M=Math.random()*Math.PI*2,ie=W[O]+Math.cos(M)*G,Y=E[O]+Math.sin(M)*G;a[P*3]=ie,a[P*3+1]=0,a[P*3+2]=Y;const T=Math.min(1,Math.hypot(ie,Y)/e);f[P]=Math.random()*Math.PI,m[P]=(.7+Math.random()*1)*(1+(1-T)*.35)*(1-G*.3),w[P]=Math.random(),v[P]=Math.random()<.28?.5+Math.random()*.5:0,h[P]=Math.random()*Math.PI*2,u[P]=.1+Math.random()*.5}return s.setAttribute("iOffset",new dt(a,3)),s.setAttribute("iRot",new dt(f,1)),s.setAttribute("iScale",new dt(m,1)),s.setAttribute("iTint",new dt(w,1)),s.setAttribute("iGreen",new dt(v,1)),s.setAttribute("iPhase",new dt(h,1)),s.setAttribute("iLean",new dt(u,1)),s.instanceCount=r,s},[r,e]),i=L.useMemo(()=>({uTime:{value:0},uWindDir:{value:new ir(1,0)},uWindStr:{value:.6},uCursor:{value:new pt},uCursorAct:{value:0},uWidth:{value:.1},uFogNear:{value:24},uFogFar:{value:120},uBase:{value:J.grassBase},uTip:{value:J.grassTip},uDry:{value:J.grassDry},uGreen:{value:J.grassGreen},uFog:{value:J.fog},uSunDir:{value:J.sunDir},uSunCol:{value:J.sun}}),[]);return Pt(()=>{if(!o.current)return;const n=o.current.uniforms;n.uTime.value=y.time,n.uWindDir.value.set(y.dirX,y.dirY),n.uWindStr.value=y.strength,n.uCursor.value.set(y.cursorX,0,y.cursorZ),n.uCursorAct.value=y.cursorActive}),d.jsx("mesh",{geometry:t,frustumCulled:!1,children:d.jsx("shaderMaterial",{ref:o,uniforms:i,vertexShader:ss,fragmentShader:as,side:Ro})})}const cs=`
  attribute vec3 iHome;
  attribute float iSeed;
  attribute float iScale;
  attribute vec3 iColor;

  uniform float uTime;
  uniform vec2 uWindDir;
  uniform float uWindStr;
  uniform vec3 uCam;
  uniform vec3 uCursor;
  uniform float uCursorAct;
  uniform vec3 uGusts[4];   // x, z, age
  uniform float uFogNear;
  uniform float uFogFar;

  varying vec2 vUv;
  varying vec3 vColor;
  varying float vFog;
  varying float vSpin;

  mat2 rot(float a){ float c=cos(a), s=sin(a); return mat2(c,-s,s,c); }

  void main(){
    vUv = uv;
    vColor = iColor;
    float t = uTime;

    // drift along the wind + slow curl wander + bob
    vec3 c = iHome;
    float sp = 1.1 + iScale * 1.5;
    c.x += uWindDir.x * t * sp + sin(t * 0.6 + iSeed * 6.28) * 1.6;
    c.z += uWindDir.y * t * sp + cos(t * 0.5 + iSeed * 6.28) * 1.6;
    c.y += sin(t * 0.8 + iSeed * 10.0) * 0.8;

    // recycle around the moving camera so leaves always surround it
    c.x = mod(c.x - uCam.x + 55.0, 110.0) - 55.0 + uCam.x;
    c.z = mod(c.z - uCam.z + 55.0, 110.0) - 55.0 + uCam.z;
    c.y = mod(c.y, 13.0) + 0.4;

    // cursor force field: repel + swirl + lift
    vec2 toC = c.xz - uCursor.xz;
    float cd = length(toC);
    float infl = smoothstep(4.5, 0.0, cd) * uCursorAct;
    vec2 dir = normalize(toC + 0.0001);
    vec2 tang = vec2(-dir.y, dir.x);
    c.xz += dir * infl * 3.2 + tang * infl * 2.4;
    c.y += infl * 1.6;

    // gust rings push leaves outward
    for (int i = 0; i < 4; i++){
      vec3 g = uGusts[i];
      if (g.z < 0.0) continue;
      vec2 d = c.xz - g.xy;
      float dl = length(d);
      float radius = g.z * 8.0;
      float ring = smoothstep(2.4, 0.0, abs(dl - radius));
      float fade = smoothstep(3.0, 0.0, g.z);
      c.xz += normalize(d + 0.0001) * ring * fade * 4.0;
    }

    // spin faster when disturbed
    vSpin = 0.5 + infl * 4.0 + uWindStr * 0.3;
    float ang = t * (0.6 + iSeed) * (1.0 + infl * 3.0) + iSeed * 6.28;

    // camera-facing billboard with in-plane flutter
    vec3 right = vec3(viewMatrix[0][0], viewMatrix[1][0], viewMatrix[2][0]);
    vec3 up    = vec3(viewMatrix[0][1], viewMatrix[1][1], viewMatrix[2][1]);
    vec2 corner = rot(ang) * position.xy;
    // foreshorten one axis for a fluttering leaf feel
    corner.x *= 0.6 + 0.4 * sin(t * 3.0 + iSeed * 6.28);
    vec3 world = c + (right * corner.x + up * corner.y) * iScale;

    vec4 mv = viewMatrix * vec4(world, 1.0);
    vFog = smoothstep(uFogNear, uFogFar, length(mv.xyz));
    gl_Position = projectionMatrix * mv;
  }
`,us=`
  uniform sampler2D uTex;
  uniform vec3 uFog;
  varying vec2 vUv;
  varying vec3 vColor;
  varying float vFog;
  void main(){
    vec4 tex = texture2D(uTex, vUv);
    if (tex.a < 0.35) discard;
    vec3 col = mix(vColor * (0.6 + tex.r * 0.6), uFog, vFog);
    float a = (1.0 - vFog * 0.6);
    gl_FragColor = vec4(col, a);
  }
`;function fs({count:r=1400}){const e=L.useRef(),o=$i(qi,"/scenery/leaf.svg");o.colorSpace=Zi;const t=L.useMemo(()=>{const n=new Pn(1,1),s=new Fo;s.index=n.index,s.attributes.position=n.attributes.position,s.attributes.uv=n.attributes.uv;const a=new Float32Array(r*3),f=new Float32Array(r),m=new Float32Array(r),w=new Float32Array(r*3),v=new q,h=["#c0392b","#d2622c","#e0902e","#a8402f","#bf7a30"],u=["#f3c6d6","#f6d7e2","#eab3c6"];for(let p=0;p<r;p++){a[p*3]=(Math.random()*2-1)*55,a[p*3+1]=Math.random()*13,a[p*3+2]=(Math.random()*2-1)*55,f[p]=Math.random();const W=Math.random()<.22;m[p]=W?.16+Math.random()*.18:.28+Math.random()*.4;const E=W?u:h;v.set(E[Math.random()*E.length|0]),w[p*3]=v.r,w[p*3+1]=v.g,w[p*3+2]=v.b}return s.setAttribute("iHome",new dt(a,3)),s.setAttribute("iSeed",new dt(f,1)),s.setAttribute("iScale",new dt(m,1)),s.setAttribute("iColor",new dt(w,3)),s.instanceCount=r,s},[r]),i=L.useMemo(()=>({uTime:{value:0},uWindDir:{value:new ir(1,0)},uWindStr:{value:.6},uCam:{value:new pt},uCursor:{value:new pt},uCursorAct:{value:0},uGusts:{value:[0,1,2,3].map(()=>new pt(0,0,-1))},uFogNear:{value:24},uFogFar:{value:120},uTex:{value:o},uFog:{value:J.fog}}),[o]);return Pt(n=>{if(!e.current)return;const s=e.current.uniforms;s.uTime.value=y.time,s.uWindDir.value.set(y.dirX,y.dirY),s.uWindStr.value=y.strength,s.uCam.value.copy(n.camera.position),s.uCursor.value.set(y.cursorX,0,y.cursorZ),s.uCursorAct.value=y.cursorActive;const a=Bo();for(let f=0;f<4;f++)s.uGusts.value[f].set(a[f][0],a[f][1],a[f][2])}),d.jsx("mesh",{geometry:t,frustumCulled:!1,renderOrder:2,children:d.jsx("shaderMaterial",{ref:e,uniforms:i,vertexShader:cs,fragmentShader:us,transparent:!0,depthWrite:!1,side:Ro})})}const ds=`
  attribute vec3 iBase;
  attribute float iPhase;
  attribute float iSize;
  uniform float uTime;
  uniform vec2 uWind;
  uniform float uPixelRatio;
  varying float vTw;

  void main(){
    float ph = iPhase;
    vec3 p = iBase;
    // gentle local wander + a bounded push along the wind
    p.x += sin(uTime * 0.30 + ph) * 2.0 + uWind.x * sin(uTime * 0.10 + ph) * 3.0;
    p.z += cos(uTime * 0.25 + ph) * 2.0 + uWind.y * sin(uTime * 0.10 + ph) * 3.0;
    p.y += sin(uTime * 0.70 + ph * 1.3) * 0.6 + 0.35 * sin(uTime * 0.5 + ph);

    vTw = 0.45 + 0.55 * sin(uTime * 4.0 + ph * 10.0);
    vec4 mv = viewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = iSize * uPixelRatio * (60.0 / max(-mv.z, 1.0));
  }
`,hs=`
  uniform vec3 uColor;
  varying float vTw;
  void main(){
    vec2 d = gl_PointCoord - 0.5;
    float r = length(d);
    if (r > 0.5) discard;
    float glow = smoothstep(0.5, 0.0, r);
    glow *= glow;
    gl_FragColor = vec4(uColor * glow * vTw * 1.6, glow * vTw);
  }
`;function ps({count:r=220}){const e=L.useRef(),o=L.useMemo(()=>{const i=new Ki,n=new Float32Array(r*3),s=new Float32Array(r),a=new Float32Array(r);for(let f=0;f<r;f++)n[f*3]=(Math.random()-.5)*80,n[f*3+1]=.4+Math.random()*4,n[f*3+2]=-40+Math.random()*60,s[f]=Math.random()*Math.PI*2,a[f]=4+Math.random()*6;return i.setAttribute("position",new Ct(n,3)),i.setAttribute("iBase",new Ct(n,3)),i.setAttribute("iPhase",new Ct(s,1)),i.setAttribute("iSize",new Ct(a,1)),i},[r]),t=L.useMemo(()=>({uTime:{value:0},uWind:{value:new ir(1,0)},uColor:{value:J.firefly},uPixelRatio:{value:typeof window<"u"?Math.min(window.devicePixelRatio,2):1}}),[]);return Pt(()=>{if(!e.current)return;const i=e.current.uniforms;i.uTime.value=y.time,i.uWind.value.set(y.dirX,y.dirY)}),d.jsx("points",{geometry:o,frustumCulled:!1,renderOrder:5,children:d.jsx("shaderMaterial",{ref:e,uniforms:t,vertexShader:ds,fragmentShader:hs,transparent:!0,depthWrite:!1,blending:zn,toneMapped:!1})})}function ms({tier:r=2}){const e=r===0?26e3:r===1?52e3:9e4,o=r===0?650:r===1?1100:1600,t=r===0?90:r===1?160:260;return d.jsxs(d.Fragment,{children:[d.jsx($n,{}),d.jsx(ts,{}),d.jsx(os,{}),d.jsx(ls,{count:e}),d.jsx(fs,{count:o}),d.jsx(ps,{count:t})]})}const Wi={id:"wind-field",label:"Wind Field",backdrop:null,World:ms},Jt={name:"Akhil Shukla",role:"Data Scientist & AI/ML Engineer",blurb:"Data Scientist III at Walmart Global Tech · Kaggle Expert · IIT Kanpur alumnus. I build forecasting systems, predictive models, and open-source data tools.",socials:[{label:"LinkedIn",url:"https://linkedin.com/in/akhil14shukla"},{label:"GitHub",url:"https://github.com/akhil14shukla"},{label:"Kaggle",url:"https://kaggle.com/akhil14shukla"}]},gi=[{id:"forecasting",label:"Forecasting & Time-Series",color:"#C99A53",accent:"#E9C886",center:[-7.4,1.6,1],count:440,spread:1.95,summary:"Time-series forecasting from macro-finance to crypto, with rigorous validation.",items:[{title:"MacroFinancial Forecasting",desc:"Automated workflow at 2% MAPE for financial indicators.",tags:["Forecasting","Airflow"],repo:null},{title:"Cryptocurrency-Price-Prediction",desc:"Differencing for stationarity + LSTM in TensorFlow; documented report.",tags:["TensorFlow","LSTM","Jupyter"],repo:"https://github.com/akhil14shukla/Cryptocurrency-Price-Prediction"},{title:"forecasting_cpp",desc:"Forecasting routines implemented in C++ for speed.",tags:["C++","Time-Series"],repo:"https://github.com/akhil14shukla/forecasting_cpp"}]},{id:"competitive",label:"Competitive ML & Open-Source",color:"#B08D57",accent:"#D9B47E",center:[6.8,2.2,-2.2],count:420,spread:1.9,summary:"Kaggle Expert & Codeforces Specialist — predictive modeling, shipped as open-source.",items:[{title:"ppscore · pps-python",desc:"Predictive Power Score library on PyPI — finds linear & non-linear patterns beyond correlation.",tags:["Python","PyPI","scikit-learn"],repo:"https://github.com/akhil14shukla/ppscore"},{title:"Tabular-Playground",desc:"Kaggle competition solutions and practice notebooks.",tags:["Kaggle","Jupyter"],repo:"https://github.com/akhil14shukla/Tabular-Playground"},{title:"Competitive-Programming",desc:"Data structures & ready-to-use C++ templates; Codeforces Specialist (max 1429).",tags:["C++","Algorithms"],repo:"https://github.com/akhil14shukla/Competitive-Programming"}]},{id:"analytics",label:"Analytics & Insights",color:"#A98248",accent:"#CBA56B",center:[.6,-3.8,2.6],count:400,spread:1.9,summary:"Predictive analytics that turn messy business data into decisions.",items:[{title:"Personalization PoC @ Walmart",desc:"Advanced user-specific insight generation; turned complex requests into custom analytics.",tags:["Analytics","Personalization"],repo:null},{title:"Loan-Default Prediction",desc:"IME672A course project: predict whether an applicant defaults on a loan.",tags:["Classification","Jupyter"],repo:"https://github.com/akhil14shukla/IME672A-Course-Project"},{title:"Telco Customer Churn",desc:"Churn modeling and retention analysis on telecom data.",tags:["Churn","EDA"],repo:"https://github.com/akhil14shukla/IME672A-Extras"}]},{id:"projects",label:"Projects & Tooling",color:"#9C7944",accent:"#C09A5E",center:[-2.6,4.4,-3.6],count:380,spread:1.85,summary:"Things I build for myself — from image tooling to cross-device data sync.",items:[{title:"image_renamer",desc:"Renames images in a folder based on their visual content.",tags:["Python","CV"],repo:"https://github.com/akhil14shukla/image_renamer"},{title:"Galaxy Watch ↔ iOS Sync",desc:"WearOS app + local server to sync Galaxy Watch data to iOS.",tags:["Kotlin","JavaScript"],repo:"https://github.com/akhil14shukla/iOSGalaxyWatchSync_wearOS"},{title:"ghostty_mac_setup",desc:"Reproducible Ghostty terminal setup for macOS.",tags:["Shell","Dotfiles"],repo:"https://github.com/akhil14shukla/ghostty_mac_setup"}]}],Ho=[{id:"home",label:"Home",p:0,kind:"home"},{id:"forecasting",label:"Forecasting & Time-Series",p:.16,kind:"cluster"},{id:"competitive",label:"Competitive ML & Open-Source",p:.31,kind:"cluster"},{id:"analytics",label:"Analytics & Insights",p:.46,kind:"cluster"},{id:"projects",label:"Projects & Tooling",p:.61,kind:"cluster"},{id:"experience",label:"Experience",p:.76,kind:"experience"},{id:"education",label:"Education",p:.88,kind:"education"},{id:"connect",label:"Connect",p:.99,kind:"cta"}],gs=[{role:"Data Scientist III",org:"Walmart Global Tech",date:"Aug 2024 — Present",points:["Led a PoC advancing user-specific personalization and insight generation.","Engineered an autonomous insight workflow turning complex user requests into custom analytics.","Built retrieval and data-extraction tooling over business context."]},{role:"Analyst II",org:"Walmart Global Tech",date:"Jun 2022 — Aug 2024",points:["Developed a natural-language-to-SQL service with logical-correctness checks.","Automated multi-step summarization of financial reports.","Built a macro-financial forecasting workflow achieving 2% MAPE.","Associate of the Quarter (Bravo) + Team Award for Delivery Excellence."]}],Pr={school:"Indian Institute of Technology Kanpur",year:"Class of 2022",degree:"B.Tech in Chemical Engineering",minor:"Minor in Industrial & Management Engineering",points:["Manager, Design | Antaragni’19 — led 15 designers, revamped app UI (+30% YoY).","Academic Mentor — mentored 300+ students in PHY103: Electrodynamics."]},vs=[{token:"collaborate",cta:"Let's collaborate",href:"mailto:akhil14shukla@gmail.com"},{token:"hire",cta:"Get in touch",href:"mailto:akhil14shukla@gmail.com"},{token:"connect",cta:"Connect on LinkedIn",href:"https://linkedin.com/in/akhil14shukla"}],xs=3,fr=gi.length*xs,xr={x:18,y:11,z:5},ws=`
  uniform float uTime;
  uniform float uSize;
  uniform float uWindStr;
  uniform float uGather;
  uniform float uSelected;
  uniform vec2 uWindDir;
  uniform vec2 uPointer;
  uniform vec4 uGusts[4];
  attribute float aCluster;
  attribute float aScale;
  attribute float aSeed;
  attribute vec3 aColor;
  varying vec3 vColor;
  varying float vGlow;
  varying float vRot;

  void main() {
    vec3 p = position;

    // slow fall + recycle
    float boxH = ${(xr.y*2).toFixed(1)};
    float spd = 0.35 + aScale * 0.22;
    p.y = position.y - mod(uTime * spd + aSeed * boxH, boxH);
    p.y = mod(p.y + ${xr.y.toFixed(1)}, boxH) - ${xr.y.toFixed(1)};

    // wind drift + sway
    float sway = sin(uTime * 0.5 + aSeed * 6.2831);
    p.x += uWindDir.x * uWindStr * 2.0 + sway * 0.7;
    p.z += uWindDir.y * uWindStr * 1.2 + cos(uTime * 0.4 + aSeed * 6.2831) * 0.4;

    // pointer parts the snow
    vec2 toP = p.xy - uPointer;
    float pd = length(toP);
    p.xy += (pd > 0.001 ? toP / pd : vec2(0.0)) * smoothstep(5.0, 0.0, pd) * 2.0;

    // gust rings
    for (int i = 0; i < 4; i++) {
      vec4 g = uGusts[i];
      if (g.w < 0.0) continue;
      float radius = g.w * 6.5;
      vec3 d = p - g.xyz;
      float dl = length(d);
      float ring = smoothstep(2.0, 0.0, abs(dl - radius));
      float fade = smoothstep(3.0, 0.0, g.w);
      p += (dl > 0.001 ? d / dl : vec3(0.0)) * ring * fade * 3.5;
    }

    // selection: pool the chosen cluster onto a focal shell
    float sel = step(0.0, uSelected) * (1.0 - step(0.5, abs(aCluster - uSelected)));
    vec3 focal = vec3(0.0, 1.0, 3.5);
    vec3 shell = focal + normalize(p - focal + 0.0001) * 3.0;
    p = mix(p, shell, sel * uGather * 0.7);

    float anySel = step(0.0, uSelected);
    vGlow = mix(0.85, mix(0.3, 1.0, sel), anySel);
    vColor = mix(vec3(0.93, 0.95, 1.0), aColor, sel * 0.6);
    vRot = uTime * (0.12 + aSeed * 0.28) + aSeed * 6.2831;

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    float size = aScale * uSize * (1.0 + sel * 0.6 * uGather);
    size *= mix(1.0, mix(0.62, 1.25, sel), anySel); // shrink the unselected
    gl_PointSize = size * (160.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`,ys=`
  uniform sampler2D uTex;
  varying vec3 vColor;
  varying float vGlow;
  varying float vRot;
  void main() {
    vec2 uv = gl_PointCoord - 0.5;
    float c = cos(vRot), s = sin(vRot);
    uv = mat2(c, -s, s, c) * uv; // rotate the crystal
    vec2 tuv = uv + 0.5;
    if (tuv.x < 0.0 || tuv.x > 1.0 || tuv.y < 0.0 || tuv.y > 1.0) discard;
    vec4 tex = texture2D(uTex, tuv);
    float a = tex.a * (0.55 + vGlow * 0.45);
    if (a < 0.02) discard;
    vec3 col = vColor * (0.6 + vGlow * 0.5);
    gl_FragColor = vec4(col, a);
  }
`;function bs(){const r=L.useRef(),e=L.useRef(0),o=$i(qi,"/scenery/snowflake.svg");o.colorSpace=Zi,o.minFilter=An;const t=L.useMemo(()=>{const n=new Float32Array(fr*3),s=new Float32Array(fr*3),a=new Float32Array(fr),f=new Float32Array(fr),m=new Float32Array(fr),w=new q;for(let h=0;h<fr;h++){n[h*3]=(Math.random()*2-1)*xr.x,n[h*3+1]=(Math.random()*2-1)*xr.y,n[h*3+2]=(Math.random()*2-1)*xr.z;const u=h%gi.length;w.set(gi[u].accent),s[h*3]=w.r,s[h*3+1]=w.g,s[h*3+2]=w.b,a[h]=u,f[h]=.8+Math.random()*.7,m[h]=Math.random()}const v=new Ki;return v.setAttribute("position",new Ct(n,3)),v.setAttribute("aColor",new Ct(s,3)),v.setAttribute("aCluster",new Ct(a,1)),v.setAttribute("aScale",new Ct(f,1)),v.setAttribute("aSeed",new Ct(m,1)),v},[]),i=L.useMemo(()=>({uTime:{value:0},uSize:{value:6},uWindStr:{value:.6},uGather:{value:0},uSelected:{value:-1},uWindDir:{value:new ir(1,0)},uPointer:{value:new ir(0,0)},uGusts:{value:[0,1,2,3].map(()=>new Dn(0,0,0,-1))},uTex:{value:o}}),[o]);return Pt((n,s)=>{if(!r.current)return;const a=r.current.uniforms,{selectedIndex:f}=Ht.getState();a.uTime.value=n.clock.elapsedTime,a.uWindStr.value=y.strength,a.uWindDir.value.set(y.dirX,y.dirY),a.uPointer.value.set(y.pointerX,y.pointerY),a.uSelected.value=f;const m=f>=0?1:0;e.current=No.damp(e.current,m,3,s),a.uGather.value=e.current;const w=Bo();for(let v=0;v<4;v++)a.uGusts.value[v].set(w[v][0],w[v][1],w[v][2],w[v][3])}),d.jsx("points",{geometry:t,frustumCulled:!1,children:d.jsx("shaderMaterial",{ref:r,uniforms:i,vertexShader:ws,fragmentShader:ys,transparent:!0,depthWrite:!1,blending:Fn})})}const _s=`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,Ss=`
  precision highp float;
  uniform float uTime;
  uniform float uWind;     // signed wind (dir.x * strength)
  uniform vec3 uBase;
  uniform vec3 uTip;
  varying vec2 vUv;

  float hash(float n) { return fract(sin(n) * 43758.5453123); }

  void main() {
    float NB = 210.0;
    // gentle wind shear toward the tip + a fine shimmer (kept subtle so blades
    // read as a dense upright field, not diagonal streaks)
    float bend = uWind * 0.018 * pow(vUv.y, 2.0)
               + sin(uTime * 1.6 + vUv.x * 60.0) * 0.004 * vUv.y;
    float x = vUv.x + bend;
    float bi = floor(x * NB);
    float fx = fract(x * NB);
    float h = 0.62 + hash(bi) * 0.34;                // per-blade height (low variance)
    float center = 0.5 + (hash(bi + 7.0) - 0.5) * 0.5;
    float w = 0.95 - vUv.y * 0.6;                    // wide base, taper to a point
    float inside = step(abs(fx - center), w * 0.5) * step(vUv.y, h);
    if (inside < 0.5) discard;
    float up = clamp(vUv.y / h, 0.0, 1.0);
    float shade = mix(0.32, 1.0, up) * (0.7 + hash(bi + 3.0) * 0.3);
    vec3 col = mix(uBase, uTip, up) * shade;
    gl_FragColor = vec4(col, 1.0);
  }
`;function Ts(){const r=L.useRef(),e=L.useMemo(()=>({uTime:{value:0},uWind:{value:0},uBase:{value:new q("#4a360f")},uTip:{value:new q("#e8bb55")}}),[]);return Pt(o=>{r.current&&(r.current.uniforms.uTime.value=o.clock.elapsedTime,r.current.uniforms.uWind.value=y.dirX*y.strength)}),d.jsxs("mesh",{position:[0,-3.6,8],renderOrder:2,children:[d.jsx("planeGeometry",{args:[60,5.5,1,1]}),d.jsx("shaderMaterial",{ref:r,uniforms:e,vertexShader:_s,fragmentShader:Ss,transparent:!0,depthWrite:!1})]})}const uo={id:"snow-mountain",label:"Snow Mountain",backdrop:"/scenery/snow-mountain.svg",Particles:bs,Foreground:Ts,fog:{color:"#0C0D14",near:16,far:52}},Cs={[Wi.id]:Wi,[uo.id]:uo};function Ms(r){return Cs[r]||Wi}const ks=[[0,11,46],[7,5.5,28],[-5,1.9,12],[4,1.4,-4],[-3,2.2,-20],[0,7,-34]],Es=[[0,3,16],[2,2,4],[0,1.3,-2],[0,1.1,-14],[0,2.2,-28],[0,9,-82]];function Ps(){const{camera:r}=Ao(),e=L.useRef(0),o=L.useRef(new pt(0,3,16)),{camCurve:t,lookCurve:i}=L.useMemo(()=>({camCurve:new ao(ks.map(n=>new pt(...n))),lookCurve:new ao(Es.map(n=>new pt(...n)))}),[]);return Pt((n,s)=>{e.current=No.damp(e.current,y.progress,4,s);const a=Math.min(1,Math.max(0,e.current)),f=t.getPoint(a),m=i.getPoint(a);f.x+=y.ndcX*.8,f.y+=y.ndcY*.5,r.position.copy(f),o.current.lerp(m,.2),r.lookAt(o.current)}),null}function zs(){return Pt(r=>Xn(r.clock.elapsedTime)),null}function As(){const{camera:r,gl:e}=Ao(),o=L.useMemo(()=>new Rn,[]),t=L.useMemo(()=>new Nn(new pt(0,1,0),0),[]),i=L.useMemo(()=>new pt,[]),n=L.useRef(new ir(0,0));return L.useEffect(()=>{const s=e.domElement,a=m=>{const w=s.getBoundingClientRect(),v=(m.clientX-w.left)/w.width*2-1,h=-((m.clientY-w.top)/w.height*2-1);n.current.set(v,h),Gn(v,h),y.cursorActive=1},f=()=>Io(y.cursorX,y.cursorZ);return s.addEventListener("pointermove",a),s.addEventListener("pointerdown",f),()=>{s.removeEventListener("pointermove",a),s.removeEventListener("pointerdown",f)}},[e]),Pt(()=>{o.setFromCamera(n.current,r),o.ray.intersectPlane(t,i)&&Hn(i.x,i.z)}),null}function Ds(){const r=Ht(n=>n.sceneId),o=Ms(r).World,[t,i]=L.useState(2);return d.jsx("div",{className:"scene-fixed",children:d.jsxs(yn,{dpr:[1,2],gl:{antialias:!0,powerPreference:"high-performance"},camera:{position:[0,11,46],fov:50,near:.1,far:400},onCreated:({scene:n})=>n.background=J.zenith.clone(),children:[d.jsx(bn,{onDecline:()=>i(n=>Math.max(0,n-1)),flipflops:3}),d.jsx(zs,{}),d.jsx(As,{}),d.jsx(Ps,{}),o&&d.jsx(o,{tier:t}),d.jsx(_n,{pixelated:!1}),d.jsxs(Sn,{disableNormalPass:!0,children:[d.jsx(Tn,{intensity:.32,luminanceThreshold:.6,luminanceSmoothing:.9,mipmapBlur:!0,radius:.5}),t>=1?d.jsx(Cn,{focusDistance:.012,focalLength:.04,bokehScale:2.2,height:480}):d.jsx(d.Fragment,{}),d.jsx(Mn,{eskil:!1,offset:.28,darkness:.62})]})]})})}var Fs="1.1.18";function Go(r,e,o){return Math.max(r,Math.min(e,o))}function Rs(r,e,o){return(1-o)*r+o*e}function Ns(r,e,o,t){return Rs(r,e,1-Math.exp(-o*t))}function js(r,e){return(r%e+e)%e}var Ws=class{constructor(){_(this,"isRunning",!1);_(this,"value",0);_(this,"from",0);_(this,"to",0);_(this,"currentTime",0);_(this,"lerp");_(this,"duration");_(this,"easing");_(this,"onUpdate")}advance(r){if(!this.isRunning)return;let e=!1;if(this.duration&&this.easing){this.currentTime+=r;const o=Go(0,this.currentTime/this.duration,1);e=o>=1;const t=e?1:this.easing(o);this.value=this.from+(this.to-this.from)*t}else this.lerp?(this.value=Ns(this.value,this.to,this.lerp*60,r),Math.round(this.value)===this.to&&(this.value=this.to,e=!0)):(this.value=this.to,e=!0);e&&this.stop(),this.onUpdate?.(this.value,e)}stop(){this.isRunning=!1}fromTo(r,e,{lerp:o,duration:t,easing:i,onStart:n,onUpdate:s}){this.from=this.value=r,this.to=e,this.lerp=o,this.duration=t,this.easing=i,this.currentTime=0,this.isRunning=!0,n?.(),this.onUpdate=s}};function Os(r,e){let o;return function(...t){let i=this;clearTimeout(o),o=setTimeout(()=>{o=void 0,r.apply(i,t)},e)}}var Ls=class{constructor(r,e,{autoResize:o=!0,debounce:t=250}={}){_(this,"width",0);_(this,"height",0);_(this,"scrollHeight",0);_(this,"scrollWidth",0);_(this,"debouncedResize");_(this,"wrapperResizeObserver");_(this,"contentResizeObserver");_(this,"resize",()=>{this.onWrapperResize(),this.onContentResize()});_(this,"onWrapperResize",()=>{this.wrapper instanceof Window?(this.width=window.innerWidth,this.height=window.innerHeight):(this.width=this.wrapper.clientWidth,this.height=this.wrapper.clientHeight)});_(this,"onContentResize",()=>{this.wrapper instanceof Window?(this.scrollHeight=this.content.scrollHeight,this.scrollWidth=this.content.scrollWidth):(this.scrollHeight=this.wrapper.scrollHeight,this.scrollWidth=this.wrapper.scrollWidth)});this.wrapper=r,this.content=e,o&&(this.debouncedResize=Os(this.resize,t),this.wrapper instanceof Window?window.addEventListener("resize",this.debouncedResize,!1):(this.wrapperResizeObserver=new ResizeObserver(this.debouncedResize),this.wrapperResizeObserver.observe(this.wrapper)),this.contentResizeObserver=new ResizeObserver(this.debouncedResize),this.contentResizeObserver.observe(this.content)),this.resize()}destroy(){this.wrapperResizeObserver?.disconnect(),this.contentResizeObserver?.disconnect(),this.wrapper===window&&this.debouncedResize&&window.removeEventListener("resize",this.debouncedResize,!1)}get limit(){return{x:this.scrollWidth-this.width,y:this.scrollHeight-this.height}}},Yo=class{constructor(){_(this,"events",{})}emit(r,...e){let o=this.events[r]||[];for(let t=0,i=o.length;t<i;t++)o[t]?.(...e)}on(r,e){return this.events[r]?.push(e)||(this.events[r]=[e]),()=>{this.events[r]=this.events[r]?.filter(o=>e!==o)}}off(r,e){this.events[r]=this.events[r]?.filter(o=>e!==o)}destroy(){this.events={}}},fo=100/6,Wt={passive:!1},Is=class{constructor(r,e={wheelMultiplier:1,touchMultiplier:1}){_(this,"touchStart",{x:0,y:0});_(this,"lastDelta",{x:0,y:0});_(this,"window",{width:0,height:0});_(this,"emitter",new Yo);_(this,"onTouchStart",r=>{const{clientX:e,clientY:o}=r.targetTouches?r.targetTouches[0]:r;this.touchStart.x=e,this.touchStart.y=o,this.lastDelta={x:0,y:0},this.emitter.emit("scroll",{deltaX:0,deltaY:0,event:r})});_(this,"onTouchMove",r=>{const{clientX:e,clientY:o}=r.targetTouches?r.targetTouches[0]:r,t=-(e-this.touchStart.x)*this.options.touchMultiplier,i=-(o-this.touchStart.y)*this.options.touchMultiplier;this.touchStart.x=e,this.touchStart.y=o,this.lastDelta={x:t,y:i},this.emitter.emit("scroll",{deltaX:t,deltaY:i,event:r})});_(this,"onTouchEnd",r=>{this.emitter.emit("scroll",{deltaX:this.lastDelta.x,deltaY:this.lastDelta.y,event:r})});_(this,"onWheel",r=>{let{deltaX:e,deltaY:o,deltaMode:t}=r;const i=t===1?fo:t===2?this.window.width:1,n=t===1?fo:t===2?this.window.height:1;e*=i,o*=n,e*=this.options.wheelMultiplier,o*=this.options.wheelMultiplier,this.emitter.emit("scroll",{deltaX:e,deltaY:o,event:r})});_(this,"onWindowResize",()=>{this.window={width:window.innerWidth,height:window.innerHeight}});this.element=r,this.options=e,window.addEventListener("resize",this.onWindowResize,!1),this.onWindowResize(),this.element.addEventListener("wheel",this.onWheel,Wt),this.element.addEventListener("touchstart",this.onTouchStart,Wt),this.element.addEventListener("touchmove",this.onTouchMove,Wt),this.element.addEventListener("touchend",this.onTouchEnd,Wt)}on(r,e){return this.emitter.on(r,e)}destroy(){this.emitter.destroy(),window.removeEventListener("resize",this.onWindowResize,!1),this.element.removeEventListener("wheel",this.onWheel,Wt),this.element.removeEventListener("touchstart",this.onTouchStart,Wt),this.element.removeEventListener("touchmove",this.onTouchMove,Wt),this.element.removeEventListener("touchend",this.onTouchEnd,Wt)}},Bs=class{constructor({wrapper:r=window,content:e=document.documentElement,eventsTarget:o=r,smoothWheel:t=!0,syncTouch:i=!1,syncTouchLerp:n=.075,touchInertiaMultiplier:s=35,duration:a,easing:f=ie=>Math.min(1,1.001-Math.pow(2,-10*ie)),lerp:m=.1,infinite:w=!1,orientation:v="vertical",gestureOrientation:h="vertical",touchMultiplier:u=1,wheelMultiplier:p=1,autoResize:W=!0,prevent:E,virtualScroll:P,overscroll:O=!0,autoRaf:G=!1,__experimental__naiveDimensions:M=!1}={}){_(this,"_isScrolling",!1);_(this,"_isStopped",!1);_(this,"_isLocked",!1);_(this,"_preventNextNativeScrollEvent",!1);_(this,"_resetVelocityTimeout",null);_(this,"__rafID",null);_(this,"isTouching");_(this,"time",0);_(this,"userData",{});_(this,"lastVelocity",0);_(this,"velocity",0);_(this,"direction",0);_(this,"options");_(this,"targetScroll");_(this,"animatedScroll");_(this,"animate",new Ws);_(this,"emitter",new Yo);_(this,"dimensions");_(this,"virtualScroll");_(this,"onPointerDown",r=>{r.button===1&&this.reset()});_(this,"onVirtualScroll",r=>{if(typeof this.options.virtualScroll=="function"&&this.options.virtualScroll(r)===!1)return;const{deltaX:e,deltaY:o,event:t}=r;if(this.emitter.emit("virtual-scroll",{deltaX:e,deltaY:o,event:t}),t.ctrlKey||t.lenisStopPropagation)return;const i=t.type.includes("touch"),n=t.type.includes("wheel");this.isTouching=t.type==="touchstart"||t.type==="touchmove";const s=e===0&&o===0;if(this.options.syncTouch&&i&&t.type==="touchstart"&&s&&!this.isStopped&&!this.isLocked){this.reset();return}const f=this.options.gestureOrientation==="vertical"&&o===0||this.options.gestureOrientation==="horizontal"&&e===0;if(s||f)return;let m=t.composedPath();m=m.slice(0,m.indexOf(this.rootElement));const w=this.options.prevent;if(m.find(E=>E instanceof HTMLElement&&(typeof w=="function"&&w?.(E)||E.hasAttribute?.("data-lenis-prevent")||i&&E.hasAttribute?.("data-lenis-prevent-touch")||n&&E.hasAttribute?.("data-lenis-prevent-wheel"))))return;if(this.isStopped||this.isLocked){t.preventDefault();return}if(!(this.options.syncTouch&&i||this.options.smoothWheel&&n)){this.isScrolling="native",this.animate.stop(),t.lenisStopPropagation=!0;return}let h=o;this.options.gestureOrientation==="both"?h=Math.abs(o)>Math.abs(e)?o:e:this.options.gestureOrientation==="horizontal"&&(h=e),(!this.options.overscroll||this.options.infinite||this.options.wrapper!==window&&(this.animatedScroll>0&&this.animatedScroll<this.limit||this.animatedScroll===0&&o>0||this.animatedScroll===this.limit&&o<0))&&(t.lenisStopPropagation=!0),t.preventDefault();const u=i&&this.options.syncTouch,W=i&&t.type==="touchend"&&Math.abs(h)>5;W&&(h=this.velocity*this.options.touchInertiaMultiplier),this.scrollTo(this.targetScroll+h,{programmatic:!1,...u?{lerp:W?this.options.syncTouchLerp:1}:{lerp:this.options.lerp,duration:this.options.duration,easing:this.options.easing}})});_(this,"onNativeScroll",()=>{if(this._resetVelocityTimeout!==null&&(clearTimeout(this._resetVelocityTimeout),this._resetVelocityTimeout=null),this._preventNextNativeScrollEvent){this._preventNextNativeScrollEvent=!1;return}if(this.isScrolling===!1||this.isScrolling==="native"){const r=this.animatedScroll;this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity,this.velocity=this.animatedScroll-r,this.direction=Math.sign(this.animatedScroll-r),this.isStopped||(this.isScrolling="native"),this.emit(),this.velocity!==0&&(this._resetVelocityTimeout=setTimeout(()=>{this.lastVelocity=this.velocity,this.velocity=0,this.isScrolling=!1,this.emit()},400))}});_(this,"raf",r=>{const e=r-(this.time||r);this.time=r,this.animate.advance(e*.001),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))});window.lenisVersion=Fs,(!r||r===document.documentElement||r===document.body)&&(r=window),this.options={wrapper:r,content:e,eventsTarget:o,smoothWheel:t,syncTouch:i,syncTouchLerp:n,touchInertiaMultiplier:s,duration:a,easing:f,lerp:m,infinite:w,gestureOrientation:h,orientation:v,touchMultiplier:u,wheelMultiplier:p,autoResize:W,prevent:E,virtualScroll:P,overscroll:O,autoRaf:G,__experimental__naiveDimensions:M},this.dimensions=new Ls(r,e,{autoResize:W}),this.updateClassName(),this.targetScroll=this.animatedScroll=this.actualScroll,this.options.wrapper.addEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.addEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll=new Is(o,{touchMultiplier:u,wheelMultiplier:p}),this.virtualScroll.on("scroll",this.onVirtualScroll),this.options.autoRaf&&(this.__rafID=requestAnimationFrame(this.raf))}destroy(){this.emitter.destroy(),this.options.wrapper.removeEventListener("scroll",this.onNativeScroll,!1),this.options.wrapper.removeEventListener("pointerdown",this.onPointerDown,!1),this.virtualScroll.destroy(),this.dimensions.destroy(),this.cleanUpClassName(),this.__rafID&&cancelAnimationFrame(this.__rafID)}on(r,e){return this.emitter.on(r,e)}off(r,e){return this.emitter.off(r,e)}setScroll(r){this.isHorizontal?this.rootElement.scrollLeft=r:this.rootElement.scrollTop=r}resize(){this.dimensions.resize(),this.animatedScroll=this.targetScroll=this.actualScroll,this.emit()}emit(){this.emitter.emit("scroll",this)}reset(){this.isLocked=!1,this.isScrolling=!1,this.animatedScroll=this.targetScroll=this.actualScroll,this.lastVelocity=this.velocity=0,this.animate.stop()}start(){this.isStopped&&(this.reset(),this.isStopped=!1)}stop(){this.isStopped||(this.reset(),this.isStopped=!0)}scrollTo(r,{offset:e=0,immediate:o=!1,lock:t=!1,duration:i=this.options.duration,easing:n=this.options.easing,lerp:s=this.options.lerp,onStart:a,onComplete:f,force:m=!1,programmatic:w=!0,userData:v}={}){if(!((this.isStopped||this.isLocked)&&!m)){if(typeof r=="string"&&["top","left","start"].includes(r))r=0;else if(typeof r=="string"&&["bottom","right","end"].includes(r))r=this.limit;else{let h;if(typeof r=="string"?h=document.querySelector(r):r instanceof HTMLElement&&r?.nodeType&&(h=r),h){if(this.options.wrapper!==window){const p=this.rootElement.getBoundingClientRect();e-=this.isHorizontal?p.left:p.top}const u=h.getBoundingClientRect();r=(this.isHorizontal?u.left:u.top)+this.animatedScroll}}if(typeof r=="number"){if(r+=e,r=Math.round(r),this.options.infinite?w&&(this.targetScroll=this.animatedScroll=this.scroll):r=Go(0,r,this.limit),r===this.targetScroll){a?.(this),f?.(this);return}if(this.userData=v??{},o){this.animatedScroll=this.targetScroll=r,this.setScroll(this.scroll),this.reset(),this.preventNextNativeScrollEvent(),this.emit(),f?.(this),this.userData={};return}w||(this.targetScroll=r),this.animate.fromTo(this.animatedScroll,r,{duration:i,easing:n,lerp:s,onStart:()=>{t&&(this.isLocked=!0),this.isScrolling="smooth",a?.(this)},onUpdate:(h,u)=>{this.isScrolling="smooth",this.lastVelocity=this.velocity,this.velocity=h-this.animatedScroll,this.direction=Math.sign(this.velocity),this.animatedScroll=h,this.setScroll(this.scroll),w&&(this.targetScroll=h),u||this.emit(),u&&(this.reset(),this.emit(),f?.(this),this.userData={},this.preventNextNativeScrollEvent())}})}}}preventNextNativeScrollEvent(){this._preventNextNativeScrollEvent=!0,requestAnimationFrame(()=>{this._preventNextNativeScrollEvent=!1})}get rootElement(){return this.options.wrapper===window?document.documentElement:this.options.wrapper}get limit(){return this.options.__experimental__naiveDimensions?this.isHorizontal?this.rootElement.scrollWidth-this.rootElement.clientWidth:this.rootElement.scrollHeight-this.rootElement.clientHeight:this.dimensions.limit[this.isHorizontal?"x":"y"]}get isHorizontal(){return this.options.orientation==="horizontal"}get actualScroll(){return this.isHorizontal?this.rootElement.scrollLeft:this.rootElement.scrollTop}get scroll(){return this.options.infinite?js(this.animatedScroll,this.limit):this.animatedScroll}get progress(){return this.limit===0?1:this.scroll/this.limit}get isScrolling(){return this._isScrolling}set isScrolling(r){this._isScrolling!==r&&(this._isScrolling=r,this.updateClassName())}get isStopped(){return this._isStopped}set isStopped(r){this._isStopped!==r&&(this._isStopped=r,this.updateClassName())}get isLocked(){return this._isLocked}set isLocked(r){this._isLocked!==r&&(this._isLocked=r,this.updateClassName())}get isSmooth(){return this.isScrolling==="smooth"}get className(){let r="lenis";return this.isStopped&&(r+=" lenis-stopped"),this.isLocked&&(r+=" lenis-locked"),this.isScrolling&&(r+=" lenis-scrolling"),this.isScrolling==="smooth"&&(r+=" lenis-smooth"),r}updateClassName(){this.cleanUpClassName(),this.rootElement.className=`${this.rootElement.className} ${this.className}`.trim()}cleanUpClassName(){this.rootElement.className=this.rootElement.className.replace(/lenis(-\w+)?/g,"").trim()}};function Hs(r,e){for(var o=0;o<e.length;o++){var t=e[o];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(r,t.key,t)}}function Gs(r,e,o){return e&&Hs(r.prototype,e),r}/*!
 * Observer 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var Ee,ui,Qe,Lt,It,wr,Xo,Zt,Wr,Uo,kt,ft,Vo,$o=function(){return Ee||typeof window<"u"&&(Ee=window.gsap)&&Ee.registerPlugin&&Ee},qo=1,gr=[],N=[],yt=[],Or=Date.now,Oi=function(e,o){return o},Ys=function(){var e=Wr.core,o=e.bridge||{},t=e._scrollers,i=e._proxies;t.push.apply(t,N),i.push.apply(i,yt),N=t,yt=i,Oi=function(s,a){return o[s](a)}},Bt=function(e,o){return~yt.indexOf(e)&&yt[yt.indexOf(e)+1][o]},Lr=function(e){return!!~Uo.indexOf(e)},Ie=function(e,o,t,i,n){return e.addEventListener(o,t,{passive:i!==!1,capture:!!n})},Le=function(e,o,t,i){return e.removeEventListener(o,t,!!i)},Kr="scrollLeft",Jr="scrollTop",Li=function(){return kt&&kt.isPressed||N.cache++},vi=function(e,o){var t=function i(n){if(n||n===0){qo&&(Qe.history.scrollRestoration="manual");var s=kt&&kt.isPressed;n=i.v=Math.round(n)||(kt&&kt.iOS?1:0),e(n),i.cacheID=N.cache,s&&Oi("ss",n)}else(o||N.cache!==i.cacheID||Oi("ref"))&&(i.cacheID=N.cache,i.v=e());return i.v+i.offset};return t.offset=0,e&&t},Ye={s:Kr,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:vi(function(r){return arguments.length?Qe.scrollTo(r,we.sc()):Qe.pageXOffset||Lt[Kr]||It[Kr]||wr[Kr]||0})},we={s:Jr,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:Ye,sc:vi(function(r){return arguments.length?Qe.scrollTo(Ye.sc(),r):Qe.pageYOffset||Lt[Jr]||It[Jr]||wr[Jr]||0})},Ve=function(e,o){return(o&&o._ctx&&o._ctx.selector||Ee.utils.toArray)(e)[0]||(typeof e=="string"&&Ee.config().nullTargetWarn!==!1?console.warn("Element not found:",e):null)},Gt=function(e,o){var t=o.s,i=o.sc;Lr(e)&&(e=Lt.scrollingElement||It);var n=N.indexOf(e),s=i===we.sc?1:2;!~n&&(n=N.push(e)-1),N[n+s]||Ie(e,"scroll",Li);var a=N[n+s],f=a||(N[n+s]=vi(Bt(e,t),!0)||(Lr(e)?i:vi(function(m){return arguments.length?e[t]=m:e[t]})));return f.target=e,a||(f.smooth=Ee.getProperty(e,"scrollBehavior")==="smooth"),f},Ii=function(e,o,t){var i=e,n=e,s=Or(),a=s,f=o||50,m=Math.max(500,f*3),w=function(p,W){var E=Or();W||E-s>f?(n=i,i=p,a=s,s=E):t?i+=p:i=n+(p-n)/(E-a)*(s-a)},v=function(){n=i=t?0:i,a=s=0},h=function(p){var W=a,E=n,P=Or();return(p||p===0)&&p!==i&&w(p),s===a||P-a>m?0:(i+(t?E:-E))/((t?P:s)-W)*1e3};return{update:w,reset:v,getVelocity:h}},zr=function(e,o){return o&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},ho=function(e){var o=Math.max.apply(Math,e),t=Math.min.apply(Math,e);return Math.abs(o)>=Math.abs(t)?o:t},Zo=function(){Wr=Ee.core.globals().ScrollTrigger,Wr&&Wr.core&&Ys()},Ko=function(e){return Ee=e||$o(),!ui&&Ee&&typeof document<"u"&&document.body&&(Qe=window,Lt=document,It=Lt.documentElement,wr=Lt.body,Uo=[Qe,Lt,It,wr],Ee.utils.clamp,Vo=Ee.core.context||function(){},Zt="onpointerenter"in wr?"pointer":"mouse",Xo=le.isTouch=Qe.matchMedia&&Qe.matchMedia("(hover: none), (pointer: coarse)").matches?1:"ontouchstart"in Qe||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?2:0,ft=le.eventTypes=("ontouchstart"in It?"touchstart,touchmove,touchcancel,touchend":"onpointerdown"in It?"pointerdown,pointermove,pointercancel,pointerup":"mousedown,mousemove,mouseup,mouseup").split(","),setTimeout(function(){return qo=0},500),Zo(),ui=1),ui};Ye.op=we;N.cache=0;var le=function(){function r(o){this.init(o)}var e=r.prototype;return e.init=function(t){ui||Ko(Ee)||console.warn("Please gsap.registerPlugin(Observer)"),Wr||Zo();var i=t.tolerance,n=t.dragMinimum,s=t.type,a=t.target,f=t.lineHeight,m=t.debounce,w=t.preventDefault,v=t.onStop,h=t.onStopDelay,u=t.ignore,p=t.wheelSpeed,W=t.event,E=t.onDragStart,P=t.onDragEnd,O=t.onDrag,G=t.onPress,M=t.onRelease,ie=t.onRight,Y=t.onLeft,T=t.onUp,me=t.onDown,ye=t.onChangeX,b=t.onChangeY,Q=t.onChange,S=t.onToggleX,be=t.onToggleY,$=t.onHover,oe=t.onHoverEnd,Ne=t.onMove,U=t.ignoreCheck,ce=t.isNormalizer,ue=t.onGestureStart,l=t.onGestureEnd,ge=t.onWheel,Yt=t.onEnable,zt=t.onDisable,et=t.onClick,bt=t.scrollSpeed,je=t.capture,fe=t.allowClicks,We=t.lockAxis,Pe=t.onLockAxis;this.target=a=Ve(a)||It,this.vars=t,u&&(u=Ee.utils.toArray(u)),i=i||1e-9,n=n||0,p=p||1,bt=bt||1,s=s||"wheel,touch,pointer",m=m!==!1,f||(f=parseFloat(Qe.getComputedStyle(wr).lineHeight)||22);var At,Oe,nt,H,ne,Ue,$e,c=this,qe=0,_t=0,Dt=t.passive||!w,de=Gt(a,Ye),Ft=Gt(a,we),Xt=de(),ar=Ft(),_e=~s.indexOf("touch")&&!~s.indexOf("pointer")&&ft[0]==="pointerdown",Rt=Lr(a),se=a.ownerDocument||Lt,st=[0,0,0],tt=[0,0,0],St=0,Sr=function(){return St=Or()},he=function(k,X){return(c.event=k)&&u&&~u.indexOf(k.target)||X&&_e&&k.pointerType!=="touch"||U&&U(k,X)},$r=function(){c._vx.reset(),c._vy.reset(),Oe.pause(),v&&v(c)},Nt=function(){var k=c.deltaX=ho(st),X=c.deltaY=ho(tt),g=Math.abs(k)>=i,D=Math.abs(X)>=i;Q&&(g||D)&&Q(c,k,X,st,tt),g&&(ie&&c.deltaX>0&&ie(c),Y&&c.deltaX<0&&Y(c),ye&&ye(c),S&&c.deltaX<0!=qe<0&&S(c),qe=c.deltaX,st[0]=st[1]=st[2]=0),D&&(me&&c.deltaY>0&&me(c),T&&c.deltaY<0&&T(c),b&&b(c),be&&c.deltaY<0!=_t<0&&be(c),_t=c.deltaY,tt[0]=tt[1]=tt[2]=0),(H||nt)&&(Ne&&Ne(c),nt&&(O(c),nt=!1),H=!1),Ue&&!(Ue=!1)&&Pe&&Pe(c),ne&&(ge(c),ne=!1),At=0},lr=function(k,X,g){st[g]+=k,tt[g]+=X,c._vx.update(k),c._vy.update(X),m?At||(At=requestAnimationFrame(Nt)):Nt()},cr=function(k,X){We&&!$e&&(c.axis=$e=Math.abs(k)>Math.abs(X)?"x":"y",Ue=!0),$e!=="y"&&(st[2]+=k,c._vx.update(k,!0)),$e!=="x"&&(tt[2]+=X,c._vy.update(X,!0)),m?At||(At=requestAnimationFrame(Nt)):Nt()},jt=function(k){if(!he(k,1)){k=zr(k,w);var X=k.clientX,g=k.clientY,D=X-c.x,C=g-c.y,z=c.isDragging;c.x=X,c.y=g,(z||Math.abs(c.startX-X)>=n||Math.abs(c.startY-g)>=n)&&(O&&(nt=!0),z||(c.isDragging=!0),cr(D,C),z||E&&E(c))}},Ut=c.onPress=function(A){he(A,1)||A&&A.button||(c.axis=$e=null,Oe.pause(),c.isPressed=!0,A=zr(A),qe=_t=0,c.startX=c.x=A.clientX,c.startY=c.y=A.clientY,c._vx.reset(),c._vy.reset(),Ie(ce?a:se,ft[1],jt,Dt,!0),c.deltaX=c.deltaY=0,G&&G(c))},R=c.onRelease=function(A){if(!he(A,1)){Le(ce?a:se,ft[1],jt,!0);var k=!isNaN(c.y-c.startY),X=c.isDragging,g=X&&(Math.abs(c.x-c.startX)>3||Math.abs(c.y-c.startY)>3),D=zr(A);!g&&k&&(c._vx.reset(),c._vy.reset(),w&&fe&&Ee.delayedCall(.08,function(){if(Or()-St>300&&!A.defaultPrevented){if(A.target.click)A.target.click();else if(se.createEvent){var C=se.createEvent("MouseEvents");C.initMouseEvent("click",!0,!0,Qe,1,D.screenX,D.screenY,D.clientX,D.clientY,!1,!1,!1,!1,0,null),A.target.dispatchEvent(C)}}})),c.isDragging=c.isGesturing=c.isPressed=!1,v&&X&&!ce&&Oe.restart(!0),P&&X&&P(c),M&&M(c,g)}},Vt=function(k){return k.touches&&k.touches.length>1&&(c.isGesturing=!0)&&ue(k,c.isDragging)},at=function(){return(c.isGesturing=!1)||l(c)},lt=function(k){if(!he(k)){var X=de(),g=Ft();lr((X-Xt)*bt,(g-ar)*bt,1),Xt=X,ar=g,v&&Oe.restart(!0)}},ct=function(k){if(!he(k)){k=zr(k,w),ge&&(ne=!0);var X=(k.deltaMode===1?f:k.deltaMode===2?Qe.innerHeight:1)*p;lr(k.deltaX*X,k.deltaY*X,0),v&&!ce&&Oe.restart(!0)}},$t=function(k){if(!he(k)){var X=k.clientX,g=k.clientY,D=X-c.x,C=g-c.y;c.x=X,c.y=g,H=!0,v&&Oe.restart(!0),(D||C)&&cr(D,C)}},ur=function(k){c.event=k,$(c)},Tt=function(k){c.event=k,oe(c)},Tr=function(k){return he(k)||zr(k,w)&&et(c)};Oe=c._dc=Ee.delayedCall(h||.25,$r).pause(),c.deltaX=c.deltaY=0,c._vx=Ii(0,50,!0),c._vy=Ii(0,50,!0),c.scrollX=de,c.scrollY=Ft,c.isDragging=c.isGesturing=c.isPressed=!1,Vo(this),c.enable=function(A){return c.isEnabled||(Ie(Rt?se:a,"scroll",Li),s.indexOf("scroll")>=0&&Ie(Rt?se:a,"scroll",lt,Dt,je),s.indexOf("wheel")>=0&&Ie(a,"wheel",ct,Dt,je),(s.indexOf("touch")>=0&&Xo||s.indexOf("pointer")>=0)&&(Ie(a,ft[0],Ut,Dt,je),Ie(se,ft[2],R),Ie(se,ft[3],R),fe&&Ie(a,"click",Sr,!0,!0),et&&Ie(a,"click",Tr),ue&&Ie(se,"gesturestart",Vt),l&&Ie(se,"gestureend",at),$&&Ie(a,Zt+"enter",ur),oe&&Ie(a,Zt+"leave",Tt),Ne&&Ie(a,Zt+"move",$t)),c.isEnabled=!0,A&&A.type&&Ut(A),Yt&&Yt(c)),c},c.disable=function(){c.isEnabled&&(gr.filter(function(A){return A!==c&&Lr(A.target)}).length||Le(Rt?se:a,"scroll",Li),c.isPressed&&(c._vx.reset(),c._vy.reset(),Le(ce?a:se,ft[1],jt,!0)),Le(Rt?se:a,"scroll",lt,je),Le(a,"wheel",ct,je),Le(a,ft[0],Ut,je),Le(se,ft[2],R),Le(se,ft[3],R),Le(a,"click",Sr,!0),Le(a,"click",Tr),Le(se,"gesturestart",Vt),Le(se,"gestureend",at),Le(a,Zt+"enter",ur),Le(a,Zt+"leave",Tt),Le(a,Zt+"move",$t),c.isEnabled=c.isPressed=c.isDragging=!1,zt&&zt(c))},c.kill=c.revert=function(){c.disable();var A=gr.indexOf(c);A>=0&&gr.splice(A,1),kt===c&&(kt=0)},gr.push(c),ce&&Lr(a)&&(kt=c),c.enable(W)},Gs(r,[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}]),r}();le.version="3.12.5";le.create=function(r){return new le(r)};le.register=Ko;le.getAll=function(){return gr.slice()};le.getById=function(r){return gr.filter(function(e){return e.vars.id===r})[0]};$o()&&Ee.registerPlugin(le);/*!
 * ScrollTrigger 3.12.5
 * https://gsap.com
 *
 * @license Copyright 2008-2024, GreenSock. All rights reserved.
 * Subject to the terms at https://gsap.com/standard-license or for
 * Club GSAP members, the agreement issued with that membership.
 * @author: Jack Doyle, jack@greensock.com
*/var x,pr,B,te,ht,Z,Jo,xi,Ur,Ir,Dr,Qr,Fe,Si,Bi,He,po,mo,mr,Qo,ki,en,Be,Hi,tn,rn,Ot,Gi,Ji,yr,Qi,wi,Yi,Ei,ei=1,Re=Date.now,Pi=Re(),ot=0,Fr=0,go=function(e,o,t){var i=Je(e)&&(e.substr(0,6)==="clamp("||e.indexOf("max")>-1);return t["_"+o+"Clamp"]=i,i?e.substr(6,e.length-7):e},vo=function(e,o){return o&&(!Je(e)||e.substr(0,6)!=="clamp(")?"clamp("+e+")":e},Xs=function r(){return Fr&&requestAnimationFrame(r)},xo=function(){return Si=1},wo=function(){return Si=0},xt=function(e){return e},Rr=function(e){return Math.round(e*1e5)/1e5||0},on=function(){return typeof window<"u"},nn=function(){return x||on()&&(x=window.gsap)&&x.registerPlugin&&x},or=function(e){return!!~Jo.indexOf(e)},sn=function(e){return(e==="Height"?Qi:B["inner"+e])||ht["client"+e]||Z["client"+e]},an=function(e){return Bt(e,"getBoundingClientRect")||(or(e)?function(){return mi.width=B.innerWidth,mi.height=Qi,mi}:function(){return Mt(e)})},Us=function(e,o,t){var i=t.d,n=t.d2,s=t.a;return(s=Bt(e,"getBoundingClientRect"))?function(){return s()[i]}:function(){return(o?sn(n):e["client"+n])||0}},Vs=function(e,o){return!o||~yt.indexOf(e)?an(e):function(){return mi}},wt=function(e,o){var t=o.s,i=o.d2,n=o.d,s=o.a;return Math.max(0,(t="scroll"+i)&&(s=Bt(e,t))?s()-an(e)()[n]:or(e)?(ht[t]||Z[t])-sn(i):e[t]-e["offset"+i])},ti=function(e,o){for(var t=0;t<mr.length;t+=3)(!o||~o.indexOf(mr[t+1]))&&e(mr[t],mr[t+1],mr[t+2])},Je=function(e){return typeof e=="string"},Xe=function(e){return typeof e=="function"},Nr=function(e){return typeof e=="number"},Kt=function(e){return typeof e=="object"},Ar=function(e,o,t){return e&&e.progress(o?0:1)&&t&&e.pause()},zi=function(e,o){if(e.enabled){var t=e._ctx?e._ctx.add(function(){return o(e)}):o(e);t&&t.totalTime&&(e.callbackAnimation=t)}},dr=Math.abs,ln="left",cn="top",eo="right",to="bottom",er="width",tr="height",Br="Right",Hr="Left",Gr="Top",Yr="Bottom",pe="padding",rt="margin",_r="Width",ro="Height",xe="px",it=function(e){return B.getComputedStyle(e)},$s=function(e){var o=it(e).position;e.style.position=o==="absolute"||o==="fixed"?o:"relative"},yo=function(e,o){for(var t in o)t in e||(e[t]=o[t]);return e},Mt=function(e,o){var t=o&&it(e)[Bi]!=="matrix(1, 0, 0, 1, 0, 0)"&&x.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),i=e.getBoundingClientRect();return t&&t.progress(0).kill(),i},yi=function(e,o){var t=o.d2;return e["offset"+t]||e["client"+t]||0},un=function(e){var o=[],t=e.labels,i=e.duration(),n;for(n in t)o.push(t[n]/i);return o},qs=function(e){return function(o){return x.utils.snap(un(e),o)}},io=function(e){var o=x.utils.snap(e),t=Array.isArray(e)&&e.slice(0).sort(function(i,n){return i-n});return t?function(i,n,s){s===void 0&&(s=.001);var a;if(!n)return o(i);if(n>0){for(i-=s,a=0;a<t.length;a++)if(t[a]>=i)return t[a];return t[a-1]}else for(a=t.length,i+=s;a--;)if(t[a]<=i)return t[a];return t[0]}:function(i,n,s){s===void 0&&(s=.001);var a=o(i);return!n||Math.abs(a-i)<s||a-i<0==n<0?a:o(n<0?i-e:i+e)}},Zs=function(e){return function(o,t){return io(un(e))(o,t.direction)}},ri=function(e,o,t,i){return t.split(",").forEach(function(n){return e(o,n,i)})},Ce=function(e,o,t,i,n){return e.addEventListener(o,t,{passive:!i,capture:!!n})},Te=function(e,o,t,i){return e.removeEventListener(o,t,!!i)},ii=function(e,o,t){t=t&&t.wheelHandler,t&&(e(o,"wheel",t),e(o,"touchmove",t))},bo={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},oi={toggleActions:"play",anticipatePin:0},bi={top:0,left:0,center:.5,bottom:1,right:1},fi=function(e,o){if(Je(e)){var t=e.indexOf("="),i=~t?+(e.charAt(t-1)+1)*parseFloat(e.substr(t+1)):0;~t&&(e.indexOf("%")>t&&(i*=o/100),e=e.substr(0,t-1)),e=i+(e in bi?bi[e]*o:~e.indexOf("%")?parseFloat(e)*o/100:parseFloat(e)||0)}return e},ni=function(e,o,t,i,n,s,a,f){var m=n.startColor,w=n.endColor,v=n.fontSize,h=n.indent,u=n.fontWeight,p=te.createElement("div"),W=or(t)||Bt(t,"pinType")==="fixed",E=e.indexOf("scroller")!==-1,P=W?Z:t,O=e.indexOf("start")!==-1,G=O?m:w,M="border-color:"+G+";font-size:"+v+";color:"+G+";font-weight:"+u+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return M+="position:"+((E||f)&&W?"fixed;":"absolute;"),(E||f||!W)&&(M+=(i===we?eo:to)+":"+(s+parseFloat(h))+"px;"),a&&(M+="box-sizing:border-box;text-align:left;width:"+a.offsetWidth+"px;"),p._isStart=O,p.setAttribute("class","gsap-marker-"+e+(o?" marker-"+o:"")),p.style.cssText=M,p.innerText=o||o===0?e+"-"+o:e,P.children[0]?P.insertBefore(p,P.children[0]):P.appendChild(p),p._offset=p["offset"+i.op.d2],di(p,0,i,O),p},di=function(e,o,t,i){var n={display:"block"},s=t[i?"os2":"p2"],a=t[i?"p2":"os2"];e._isFlipped=i,n[t.a+"Percent"]=i?-100:0,n[t.a]=i?"1px":0,n["border"+s+_r]=1,n["border"+a+_r]=0,n[t.p]=o+"px",x.set(e,n)},F=[],Xi={},Vr,_o=function(){return Re()-ot>34&&(Vr||(Vr=requestAnimationFrame(Et)))},hr=function(){(!Be||!Be.isPressed||Be.startX>Z.clientWidth)&&(N.cache++,Be?Vr||(Vr=requestAnimationFrame(Et)):Et(),ot||sr("scrollStart"),ot=Re())},Ai=function(){rn=B.innerWidth,tn=B.innerHeight},jr=function(){N.cache++,!Fe&&!en&&!te.fullscreenElement&&!te.webkitFullscreenElement&&(!Hi||rn!==B.innerWidth||Math.abs(B.innerHeight-tn)>B.innerHeight*.25)&&xi.restart(!0)},nr={},Ks=[],fn=function r(){return Te(j,"scrollEnd",r)||Qt(!0)},sr=function(e){return nr[e]&&nr[e].map(function(o){return o()})||Ks},Ke=[],dn=function(e){for(var o=0;o<Ke.length;o+=5)(!e||Ke[o+4]&&Ke[o+4].query===e)&&(Ke[o].style.cssText=Ke[o+1],Ke[o].getBBox&&Ke[o].setAttribute("transform",Ke[o+2]||""),Ke[o+3].uncache=1)},oo=function(e,o){var t;for(He=0;He<F.length;He++)t=F[He],t&&(!o||t._ctx===o)&&(e?t.kill(1):t.revert(!0,!0));wi=!0,o&&dn(o),o||sr("revert")},hn=function(e,o){N.cache++,(o||!Ge)&&N.forEach(function(t){return Xe(t)&&t.cacheID++&&(t.rec=0)}),Je(e)&&(B.history.scrollRestoration=Ji=e)},Ge,rr=0,So,Js=function(){if(So!==rr){var e=So=rr;requestAnimationFrame(function(){return e===rr&&Qt(!0)})}},pn=function(){Z.appendChild(yr),Qi=!Be&&yr.offsetHeight||B.innerHeight,Z.removeChild(yr)},To=function(e){return Ur(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(o){return o.style.display=e?"none":"block"})},Qt=function(e,o){if(ot&&!e&&!wi){Ce(j,"scrollEnd",fn);return}pn(),Ge=j.isRefreshing=!0,N.forEach(function(i){return Xe(i)&&++i.cacheID&&(i.rec=i())});var t=sr("refreshInit");Qo&&j.sort(),o||oo(),N.forEach(function(i){Xe(i)&&(i.smooth&&(i.target.style.scrollBehavior="auto"),i(0))}),F.slice(0).forEach(function(i){return i.refresh()}),wi=!1,F.forEach(function(i){if(i._subPinOffset&&i.pin){var n=i.vars.horizontal?"offsetWidth":"offsetHeight",s=i.pin[n];i.revert(!0,1),i.adjustPinSpacing(i.pin[n]-s),i.refresh()}}),Yi=1,To(!0),F.forEach(function(i){var n=wt(i.scroller,i._dir),s=i.vars.end==="max"||i._endClamp&&i.end>n,a=i._startClamp&&i.start>=n;(s||a)&&i.setPositions(a?n-1:i.start,s?Math.max(a?n:i.start+1,n):i.end,!0)}),To(!1),Yi=0,t.forEach(function(i){return i&&i.render&&i.render(-1)}),N.forEach(function(i){Xe(i)&&(i.smooth&&requestAnimationFrame(function(){return i.target.style.scrollBehavior="smooth"}),i.rec&&i(i.rec))}),hn(Ji,1),xi.pause(),rr++,Ge=2,Et(2),F.forEach(function(i){return Xe(i.vars.onRefresh)&&i.vars.onRefresh(i)}),Ge=j.isRefreshing=!1,sr("refresh")},Ui=0,hi=1,Xr,Et=function(e){if(e===2||!Ge&&!wi){j.isUpdating=!0,Xr&&Xr.update(0);var o=F.length,t=Re(),i=t-Pi>=50,n=o&&F[0].scroll();if(hi=Ui>n?-1:1,Ge||(Ui=n),i&&(ot&&!Si&&t-ot>200&&(ot=0,sr("scrollEnd")),Dr=Pi,Pi=t),hi<0){for(He=o;He-- >0;)F[He]&&F[He].update(0,i);hi=1}else for(He=0;He<o;He++)F[He]&&F[He].update(0,i);j.isUpdating=!1}Vr=0},Vi=[ln,cn,to,eo,rt+Yr,rt+Br,rt+Gr,rt+Hr,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],pi=Vi.concat([er,tr,"boxSizing","max"+_r,"max"+ro,"position",rt,pe,pe+Gr,pe+Br,pe+Yr,pe+Hr]),Qs=function(e,o,t){br(t);var i=e._gsap;if(i.spacerIsNative)br(i.spacerState);else if(e._gsap.swappedIn){var n=o.parentNode;n&&(n.insertBefore(e,o),n.removeChild(o))}e._gsap.swappedIn=!1},Di=function(e,o,t,i){if(!e._gsap.swappedIn){for(var n=Vi.length,s=o.style,a=e.style,f;n--;)f=Vi[n],s[f]=t[f];s.position=t.position==="absolute"?"absolute":"relative",t.display==="inline"&&(s.display="inline-block"),a[to]=a[eo]="auto",s.flexBasis=t.flexBasis||"auto",s.overflow="visible",s.boxSizing="border-box",s[er]=yi(e,Ye)+xe,s[tr]=yi(e,we)+xe,s[pe]=a[rt]=a[cn]=a[ln]="0",br(i),a[er]=a["max"+_r]=t[er],a[tr]=a["max"+ro]=t[tr],a[pe]=t[pe],e.parentNode!==o&&(e.parentNode.insertBefore(o,e),o.appendChild(e)),e._gsap.swappedIn=!0}},ea=/([A-Z])/g,br=function(e){if(e){var o=e.t.style,t=e.length,i=0,n,s;for((e.t._gsap||x.core.getCache(e.t)).uncache=1;i<t;i+=2)s=e[i+1],n=e[i],s?o[n]=s:o[n]&&o.removeProperty(n.replace(ea,"-$1").toLowerCase())}},si=function(e){for(var o=pi.length,t=e.style,i=[],n=0;n<o;n++)i.push(pi[n],t[pi[n]]);return i.t=e,i},ta=function(e,o,t){for(var i=[],n=e.length,s=t?8:0,a;s<n;s+=2)a=e[s],i.push(a,a in o?o[a]:e[s+1]);return i.t=e.t,i},mi={left:0,top:0},Co=function(e,o,t,i,n,s,a,f,m,w,v,h,u,p){Xe(e)&&(e=e(f)),Je(e)&&e.substr(0,3)==="max"&&(e=h+(e.charAt(4)==="="?fi("0"+e.substr(3),t):0));var W=u?u.time():0,E,P,O;if(u&&u.seek(0),isNaN(e)||(e=+e),Nr(e))u&&(e=x.utils.mapRange(u.scrollTrigger.start,u.scrollTrigger.end,0,h,e)),a&&di(a,t,i,!0);else{Xe(o)&&(o=o(f));var G=(e||"0").split(" "),M,ie,Y,T;O=Ve(o,f)||Z,M=Mt(O)||{},(!M||!M.left&&!M.top)&&it(O).display==="none"&&(T=O.style.display,O.style.display="block",M=Mt(O),T?O.style.display=T:O.style.removeProperty("display")),ie=fi(G[0],M[i.d]),Y=fi(G[1]||"0",t),e=M[i.p]-m[i.p]-w+ie+n-Y,a&&di(a,Y,i,t-Y<20||a._isStart&&Y>20),t-=t-Y}if(p&&(f[p]=e||-.001,e<0&&(e=0)),s){var me=e+t,ye=s._isStart;E="scroll"+i.d2,di(s,me,i,ye&&me>20||!ye&&(v?Math.max(Z[E],ht[E]):s.parentNode[E])<=me+1),v&&(m=Mt(a),v&&(s.style[i.op.p]=m[i.op.p]-i.op.m-s._offset+xe))}return u&&O&&(E=Mt(O),u.seek(h),P=Mt(O),u._caScrollDist=E[i.p]-P[i.p],e=e/u._caScrollDist*h),u&&u.seek(W),u?e:Math.round(e)},ra=/(webkit|moz|length|cssText|inset)/i,Mo=function(e,o,t,i){if(e.parentNode!==o){var n=e.style,s,a;if(o===Z){e._stOrig=n.cssText,a=it(e);for(s in a)!+s&&!ra.test(s)&&a[s]&&typeof n[s]=="string"&&s!=="0"&&(n[s]=a[s]);n.top=t,n.left=i}else n.cssText=e._stOrig;x.core.getCache(e).uncache=1,o.appendChild(e)}},mn=function(e,o,t){var i=o,n=i;return function(s){var a=Math.round(e());return a!==i&&a!==n&&Math.abs(a-i)>3&&Math.abs(a-n)>3&&(s=a,t&&t()),n=i,i=s,s}},ai=function(e,o,t){var i={};i[o.p]="+="+t,x.set(e,i)},ko=function(e,o){var t=Gt(e,o),i="_scroll"+o.p2,n=function s(a,f,m,w,v){var h=s.tween,u=f.onComplete,p={};m=m||t();var W=mn(t,m,function(){h.kill(),s.tween=0});return v=w&&v||0,w=w||a-m,h&&h.kill(),f[i]=a,f.inherit=!1,f.modifiers=p,p[i]=function(){return W(m+w*h.ratio+v*h.ratio*h.ratio)},f.onUpdate=function(){N.cache++,s.tween&&Et()},f.onComplete=function(){s.tween=0,u&&u.call(h)},h=s.tween=x.to(e,f),h};return e[i]=t,t.wheelHandler=function(){return n.tween&&n.tween.kill()&&(n.tween=0)},Ce(e,"wheel",t.wheelHandler),j.isTouch&&Ce(e,"touchmove",t.wheelHandler),n},j=function(){function r(o,t){pr||r.register(x)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),Gi(this),this.init(o,t)}var e=r.prototype;return e.init=function(t,i){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!Fr){this.update=this.refresh=this.kill=xt;return}t=yo(Je(t)||Nr(t)||t.nodeType?{trigger:t}:t,oi);var n=t,s=n.onUpdate,a=n.toggleClass,f=n.id,m=n.onToggle,w=n.onRefresh,v=n.scrub,h=n.trigger,u=n.pin,p=n.pinSpacing,W=n.invalidateOnRefresh,E=n.anticipatePin,P=n.onScrubComplete,O=n.onSnapComplete,G=n.once,M=n.snap,ie=n.pinReparent,Y=n.pinSpacer,T=n.containerAnimation,me=n.fastScrollEnd,ye=n.preventOverlaps,b=t.horizontal||t.containerAnimation&&t.horizontal!==!1?Ye:we,Q=!v&&v!==0,S=Ve(t.scroller||B),be=x.core.getCache(S),$=or(S),oe=("pinType"in t?t.pinType:Bt(S,"pinType")||$&&"fixed")==="fixed",Ne=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],U=Q&&t.toggleActions.split(" "),ce="markers"in t?t.markers:oi.markers,ue=$?0:parseFloat(it(S)["border"+b.p2+_r])||0,l=this,ge=t.onRefreshInit&&function(){return t.onRefreshInit(l)},Yt=Us(S,$,b),zt=Vs(S,$),et=0,bt=0,je=0,fe=Gt(S,b),We,Pe,At,Oe,nt,H,ne,Ue,$e,c,qe,_t,Dt,de,Ft,Xt,ar,_e,Rt,se,st,tt,St,Sr,he,$r,Nt,lr,cr,jt,Ut,R,Vt,at,lt,ct,$t,ur,Tt;if(l._startClamp=l._endClamp=!1,l._dir=b,E*=45,l.scroller=S,l.scroll=T?T.time.bind(T):fe,Oe=fe(),l.vars=t,i=i||t.animation,"refreshPriority"in t&&(Qo=1,t.refreshPriority===-9999&&(Xr=l)),be.tweenScroll=be.tweenScroll||{top:ko(S,we),left:ko(S,Ye)},l.tweenTo=We=be.tweenScroll[b.p],l.scrubDuration=function(g){Vt=Nr(g)&&g,Vt?R?R.duration(g):R=x.to(i,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:Vt,paused:!0,onComplete:function(){return P&&P(l)}}):(R&&R.progress(1).kill(),R=0)},i&&(i.vars.lazy=!1,i._initted&&!l.isReverted||i.vars.immediateRender!==!1&&t.immediateRender!==!1&&i.duration()&&i.render(0,!0,!0),l.animation=i.pause(),i.scrollTrigger=l,l.scrubDuration(v),jt=0,f||(f=i.vars.id)),M&&((!Kt(M)||M.push)&&(M={snapTo:M}),"scrollBehavior"in Z.style&&x.set($?[Z,ht]:S,{scrollBehavior:"auto"}),N.forEach(function(g){return Xe(g)&&g.target===($?te.scrollingElement||ht:S)&&(g.smooth=!1)}),At=Xe(M.snapTo)?M.snapTo:M.snapTo==="labels"?qs(i):M.snapTo==="labelsDirectional"?Zs(i):M.directional!==!1?function(g,D){return io(M.snapTo)(g,Re()-bt<500?0:D.direction)}:x.utils.snap(M.snapTo),at=M.duration||{min:.1,max:2},at=Kt(at)?Ir(at.min,at.max):Ir(at,at),lt=x.delayedCall(M.delay||Vt/2||.1,function(){var g=fe(),D=Re()-bt<500,C=We.tween;if((D||Math.abs(l.getVelocity())<10)&&!C&&!Si&&et!==g){var z=(g-H)/de,Se=i&&!Q?i.totalProgress():z,I=D?0:(Se-Ut)/(Re()-Dr)*1e3||0,ae=x.utils.clamp(-z,1-z,dr(I/2)*I/.185),ze=z+(M.inertia===!1?0:ae),re,K,V=M,ut=V.onStart,ee=V.onInterrupt,Ze=V.onComplete;if(re=At(ze,l),Nr(re)||(re=ze),K=Math.round(H+re*de),g<=ne&&g>=H&&K!==g){if(C&&!C._initted&&C.data<=dr(K-g))return;M.inertia===!1&&(ae=re-z),We(K,{duration:at(dr(Math.max(dr(ze-Se),dr(re-Se))*.185/I/.05||0)),ease:M.ease||"power3",data:dr(K-g),onInterrupt:function(){return lt.restart(!0)&&ee&&ee(l)},onComplete:function(){l.update(),et=fe(),i&&(R?R.resetTo("totalProgress",re,i._tTime/i._tDur):i.progress(re)),jt=Ut=i&&!Q?i.totalProgress():l.progress,O&&O(l),Ze&&Ze(l)}},g,ae*de,K-g-ae*de),ut&&ut(l,We.tween)}}else l.isActive&&et!==g&&lt.restart(!0)}).pause()),f&&(Xi[f]=l),h=l.trigger=Ve(h||u!==!0&&u),Tt=h&&h._gsap&&h._gsap.stRevert,Tt&&(Tt=Tt(l)),u=u===!0?h:Ve(u),Je(a)&&(a={targets:h,className:a}),u&&(p===!1||p===rt||(p=!p&&u.parentNode&&u.parentNode.style&&it(u.parentNode).display==="flex"?!1:pe),l.pin=u,Pe=x.core.getCache(u),Pe.spacer?Ft=Pe.pinState:(Y&&(Y=Ve(Y),Y&&!Y.nodeType&&(Y=Y.current||Y.nativeElement),Pe.spacerIsNative=!!Y,Y&&(Pe.spacerState=si(Y))),Pe.spacer=_e=Y||te.createElement("div"),_e.classList.add("pin-spacer"),f&&_e.classList.add("pin-spacer-"+f),Pe.pinState=Ft=si(u)),t.force3D!==!1&&x.set(u,{force3D:!0}),l.spacer=_e=Pe.spacer,cr=it(u),Sr=cr[p+b.os2],se=x.getProperty(u),st=x.quickSetter(u,b.a,xe),Di(u,_e,cr),ar=si(u)),ce){_t=Kt(ce)?yo(ce,bo):bo,c=ni("scroller-start",f,S,b,_t,0),qe=ni("scroller-end",f,S,b,_t,0,c),Rt=c["offset"+b.op.d2];var Tr=Ve(Bt(S,"content")||S);Ue=this.markerStart=ni("start",f,Tr,b,_t,Rt,0,T),$e=this.markerEnd=ni("end",f,Tr,b,_t,Rt,0,T),T&&(ur=x.quickSetter([Ue,$e],b.a,xe)),!oe&&!(yt.length&&Bt(S,"fixedMarkers")===!0)&&($s($?Z:S),x.set([c,qe],{force3D:!0}),$r=x.quickSetter(c,b.a,xe),lr=x.quickSetter(qe,b.a,xe))}if(T){var A=T.vars.onUpdate,k=T.vars.onUpdateParams;T.eventCallback("onUpdate",function(){l.update(0,0,1),A&&A.apply(T,k||[])})}if(l.previous=function(){return F[F.indexOf(l)-1]},l.next=function(){return F[F.indexOf(l)+1]},l.revert=function(g,D){if(!D)return l.kill(!0);var C=g!==!1||!l.enabled,z=Fe;C!==l.isReverted&&(C&&(ct=Math.max(fe(),l.scroll.rec||0),je=l.progress,$t=i&&i.progress()),Ue&&[Ue,$e,c,qe].forEach(function(Se){return Se.style.display=C?"none":"block"}),C&&(Fe=l,l.update(C)),u&&(!ie||!l.isActive)&&(C?Qs(u,_e,Ft):Di(u,_e,it(u),he)),C||l.update(C),Fe=z,l.isReverted=C)},l.refresh=function(g,D,C,z){if(!((Fe||!l.enabled)&&!D)){if(u&&g&&ot){Ce(r,"scrollEnd",fn);return}!Ge&&ge&&ge(l),Fe=l,We.tween&&!C&&(We.tween.kill(),We.tween=0),R&&R.pause(),W&&i&&i.revert({kill:!1}).invalidate(),l.isReverted||l.revert(!0,!0),l._subPinOffset=!1;var Se=Yt(),I=zt(),ae=T?T.duration():wt(S,b),ze=de<=.01,re=0,K=z||0,V=Kt(C)?C.end:t.end,ut=t.endTrigger||h,ee=Kt(C)?C.start:t.start||(t.start===0||!h?0:u?"0 0":"0 100%"),Ze=l.pinnedContainer=t.pinnedContainer&&Ve(t.pinnedContainer,l),mt=h&&Math.max(0,F.indexOf(l))||0,Me=mt,ke,Ae,qt,qr,De,ve,gt,Ti,no,Cr,vt,Mr,Zr;for(ce&&Kt(C)&&(Mr=x.getProperty(c,b.p),Zr=x.getProperty(qe,b.p));Me--;)ve=F[Me],ve.end||ve.refresh(0,1)||(Fe=l),gt=ve.pin,gt&&(gt===h||gt===u||gt===Ze)&&!ve.isReverted&&(Cr||(Cr=[]),Cr.unshift(ve),ve.revert(!0,!0)),ve!==F[Me]&&(mt--,Me--);for(Xe(ee)&&(ee=ee(l)),ee=go(ee,"start",l),H=Co(ee,h,Se,b,fe(),Ue,c,l,I,ue,oe,ae,T,l._startClamp&&"_startClamp")||(u?-.001:0),Xe(V)&&(V=V(l)),Je(V)&&!V.indexOf("+=")&&(~V.indexOf(" ")?V=(Je(ee)?ee.split(" ")[0]:"")+V:(re=fi(V.substr(2),Se),V=Je(ee)?ee:(T?x.utils.mapRange(0,T.duration(),T.scrollTrigger.start,T.scrollTrigger.end,H):H)+re,ut=h)),V=go(V,"end",l),ne=Math.max(H,Co(V||(ut?"100% 0":ae),ut,Se,b,fe()+re,$e,qe,l,I,ue,oe,ae,T,l._endClamp&&"_endClamp"))||-.001,re=0,Me=mt;Me--;)ve=F[Me],gt=ve.pin,gt&&ve.start-ve._pinPush<=H&&!T&&ve.end>0&&(ke=ve.end-(l._startClamp?Math.max(0,ve.start):ve.start),(gt===h&&ve.start-ve._pinPush<H||gt===Ze)&&isNaN(ee)&&(re+=ke*(1-ve.progress)),gt===u&&(K+=ke));if(H+=re,ne+=re,l._startClamp&&(l._startClamp+=re),l._endClamp&&!Ge&&(l._endClamp=ne||-.001,ne=Math.min(ne,wt(S,b))),de=ne-H||(H-=.01)&&.001,ze&&(je=x.utils.clamp(0,1,x.utils.normalize(H,ne,ct))),l._pinPush=K,Ue&&re&&(ke={},ke[b.a]="+="+re,Ze&&(ke[b.p]="-="+fe()),x.set([Ue,$e],ke)),u&&!(Yi&&l.end>=wt(S,b)))ke=it(u),qr=b===we,qt=fe(),tt=parseFloat(se(b.a))+K,!ae&&ne>1&&(vt=($?te.scrollingElement||ht:S).style,vt={style:vt,value:vt["overflow"+b.a.toUpperCase()]},$&&it(Z)["overflow"+b.a.toUpperCase()]!=="scroll"&&(vt.style["overflow"+b.a.toUpperCase()]="scroll")),Di(u,_e,ke),ar=si(u),Ae=Mt(u,!0),Ti=oe&&Gt(S,qr?Ye:we)(),p?(he=[p+b.os2,de+K+xe],he.t=_e,Me=p===pe?yi(u,b)+de+K:0,Me&&(he.push(b.d,Me+xe),_e.style.flexBasis!=="auto"&&(_e.style.flexBasis=Me+xe)),br(he),Ze&&F.forEach(function(kr){kr.pin===Ze&&kr.vars.pinSpacing!==!1&&(kr._subPinOffset=!0)}),oe&&fe(ct)):(Me=yi(u,b),Me&&_e.style.flexBasis!=="auto"&&(_e.style.flexBasis=Me+xe)),oe&&(De={top:Ae.top+(qr?qt-H:Ti)+xe,left:Ae.left+(qr?Ti:qt-H)+xe,boxSizing:"border-box",position:"fixed"},De[er]=De["max"+_r]=Math.ceil(Ae.width)+xe,De[tr]=De["max"+ro]=Math.ceil(Ae.height)+xe,De[rt]=De[rt+Gr]=De[rt+Br]=De[rt+Yr]=De[rt+Hr]="0",De[pe]=ke[pe],De[pe+Gr]=ke[pe+Gr],De[pe+Br]=ke[pe+Br],De[pe+Yr]=ke[pe+Yr],De[pe+Hr]=ke[pe+Hr],Xt=ta(Ft,De,ie),Ge&&fe(0)),i?(no=i._initted,ki(1),i.render(i.duration(),!0,!0),St=se(b.a)-tt+de+K,Nt=Math.abs(de-St)>1,oe&&Nt&&Xt.splice(Xt.length-2,2),i.render(0,!0,!0),no||i.invalidate(!0),i.parent||i.totalTime(i.totalTime()),ki(0)):St=de,vt&&(vt.value?vt.style["overflow"+b.a.toUpperCase()]=vt.value:vt.style.removeProperty("overflow-"+b.a));else if(h&&fe()&&!T)for(Ae=h.parentNode;Ae&&Ae!==Z;)Ae._pinOffset&&(H-=Ae._pinOffset,ne-=Ae._pinOffset),Ae=Ae.parentNode;Cr&&Cr.forEach(function(kr){return kr.revert(!1,!0)}),l.start=H,l.end=ne,Oe=nt=Ge?ct:fe(),!T&&!Ge&&(Oe<ct&&fe(ct),l.scroll.rec=0),l.revert(!1,!0),bt=Re(),lt&&(et=-1,lt.restart(!0)),Fe=0,i&&Q&&(i._initted||$t)&&i.progress()!==$t&&i.progress($t||0,!0).render(i.time(),!0,!0),(ze||je!==l.progress||T||W)&&(i&&!Q&&i.totalProgress(T&&H<-.001&&!je?x.utils.normalize(H,ne,0):je,!0),l.progress=ze||(Oe-H)/de===je?0:je),u&&p&&(_e._pinOffset=Math.round(l.progress*St)),R&&R.invalidate(),isNaN(Mr)||(Mr-=x.getProperty(c,b.p),Zr-=x.getProperty(qe,b.p),ai(c,b,Mr),ai(Ue,b,Mr-(z||0)),ai(qe,b,Zr),ai($e,b,Zr-(z||0))),ze&&!Ge&&l.update(),w&&!Ge&&!Dt&&(Dt=!0,w(l),Dt=!1)}},l.getVelocity=function(){return(fe()-nt)/(Re()-Dr)*1e3||0},l.endAnimation=function(){Ar(l.callbackAnimation),i&&(R?R.progress(1):i.paused()?Q||Ar(i,l.direction<0,1):Ar(i,i.reversed()))},l.labelToScroll=function(g){return i&&i.labels&&(H||l.refresh()||H)+i.labels[g]/i.duration()*de||0},l.getTrailing=function(g){var D=F.indexOf(l),C=l.direction>0?F.slice(0,D).reverse():F.slice(D+1);return(Je(g)?C.filter(function(z){return z.vars.preventOverlaps===g}):C).filter(function(z){return l.direction>0?z.end<=H:z.start>=ne})},l.update=function(g,D,C){if(!(T&&!C&&!g)){var z=Ge===!0?ct:l.scroll(),Se=g?0:(z-H)/de,I=Se<0?0:Se>1?1:Se||0,ae=l.progress,ze,re,K,V,ut,ee,Ze,mt;if(D&&(nt=Oe,Oe=T?fe():z,M&&(Ut=jt,jt=i&&!Q?i.totalProgress():I)),E&&u&&!Fe&&!ei&&ot&&(!I&&H<z+(z-nt)/(Re()-Dr)*E?I=1e-4:I===1&&ne>z+(z-nt)/(Re()-Dr)*E&&(I=.9999)),I!==ae&&l.enabled){if(ze=l.isActive=!!I&&I<1,re=!!ae&&ae<1,ee=ze!==re,ut=ee||!!I!=!!ae,l.direction=I>ae?1:-1,l.progress=I,ut&&!Fe&&(K=I&&!ae?0:I===1?1:ae===1?2:3,Q&&(V=!ee&&U[K+1]!=="none"&&U[K+1]||U[K],mt=i&&(V==="complete"||V==="reset"||V in i))),ye&&(ee||mt)&&(mt||v||!i)&&(Xe(ye)?ye(l):l.getTrailing(ye).forEach(function(qt){return qt.endAnimation()})),Q||(R&&!Fe&&!ei?(R._dp._time-R._start!==R._time&&R.render(R._dp._time-R._start),R.resetTo?R.resetTo("totalProgress",I,i._tTime/i._tDur):(R.vars.totalProgress=I,R.invalidate().restart())):i&&i.totalProgress(I,!!(Fe&&(bt||g)))),u){if(g&&p&&(_e.style[p+b.os2]=Sr),!oe)st(Rr(tt+St*I));else if(ut){if(Ze=!g&&I>ae&&ne+1>z&&z+1>=wt(S,b),ie)if(!g&&(ze||Ze)){var Me=Mt(u,!0),ke=z-H;Mo(u,Z,Me.top+(b===we?ke:0)+xe,Me.left+(b===we?0:ke)+xe)}else Mo(u,_e);br(ze||Ze?Xt:ar),Nt&&I<1&&ze||st(tt+(I===1&&!Ze?St:0))}}M&&!We.tween&&!Fe&&!ei&&lt.restart(!0),a&&(ee||G&&I&&(I<1||!Ei))&&Ur(a.targets).forEach(function(qt){return qt.classList[ze||G?"add":"remove"](a.className)}),s&&!Q&&!g&&s(l),ut&&!Fe?(Q&&(mt&&(V==="complete"?i.pause().totalProgress(1):V==="reset"?i.restart(!0).pause():V==="restart"?i.restart(!0):i[V]()),s&&s(l)),(ee||!Ei)&&(m&&ee&&zi(l,m),Ne[K]&&zi(l,Ne[K]),G&&(I===1?l.kill(!1,1):Ne[K]=0),ee||(K=I===1?1:3,Ne[K]&&zi(l,Ne[K]))),me&&!ze&&Math.abs(l.getVelocity())>(Nr(me)?me:2500)&&(Ar(l.callbackAnimation),R?R.progress(1):Ar(i,V==="reverse"?1:!I,1))):Q&&s&&!Fe&&s(l)}if(lr){var Ae=T?z/T.duration()*(T._caScrollDist||0):z;$r(Ae+(c._isFlipped?1:0)),lr(Ae)}ur&&ur(-z/T.duration()*(T._caScrollDist||0))}},l.enable=function(g,D){l.enabled||(l.enabled=!0,Ce(S,"resize",jr),$||Ce(S,"scroll",hr),ge&&Ce(r,"refreshInit",ge),g!==!1&&(l.progress=je=0,Oe=nt=et=fe()),D!==!1&&l.refresh())},l.getTween=function(g){return g&&We?We.tween:R},l.setPositions=function(g,D,C,z){if(T){var Se=T.scrollTrigger,I=T.duration(),ae=Se.end-Se.start;g=Se.start+ae*g/I,D=Se.start+ae*D/I}l.refresh(!1,!1,{start:vo(g,C&&!!l._startClamp),end:vo(D,C&&!!l._endClamp)},z),l.update()},l.adjustPinSpacing=function(g){if(he&&g){var D=he.indexOf(b.d)+1;he[D]=parseFloat(he[D])+g+xe,he[1]=parseFloat(he[1])+g+xe,br(he)}},l.disable=function(g,D){if(l.enabled&&(g!==!1&&l.revert(!0,!0),l.enabled=l.isActive=!1,D||R&&R.pause(),ct=0,Pe&&(Pe.uncache=1),ge&&Te(r,"refreshInit",ge),lt&&(lt.pause(),We.tween&&We.tween.kill()&&(We.tween=0)),!$)){for(var C=F.length;C--;)if(F[C].scroller===S&&F[C]!==l)return;Te(S,"resize",jr),$||Te(S,"scroll",hr)}},l.kill=function(g,D){l.disable(g,D),R&&!D&&R.kill(),f&&delete Xi[f];var C=F.indexOf(l);C>=0&&F.splice(C,1),C===He&&hi>0&&He--,C=0,F.forEach(function(z){return z.scroller===l.scroller&&(C=1)}),C||Ge||(l.scroll.rec=0),i&&(i.scrollTrigger=null,g&&i.revert({kill:!1}),D||i.kill()),Ue&&[Ue,$e,c,qe].forEach(function(z){return z.parentNode&&z.parentNode.removeChild(z)}),Xr===l&&(Xr=0),u&&(Pe&&(Pe.uncache=1),C=0,F.forEach(function(z){return z.pin===u&&C++}),C||(Pe.spacer=0)),t.onKill&&t.onKill(l)},F.push(l),l.enable(!1,!1),Tt&&Tt(l),i&&i.add&&!de){var X=l.update;l.update=function(){l.update=X,H||ne||l.refresh()},x.delayedCall(.01,l.update),de=.01,H=ne=0}else l.refresh();u&&Js()},r.register=function(t){return pr||(x=t||nn(),on()&&window.document&&r.enable(),pr=Fr),pr},r.defaults=function(t){if(t)for(var i in t)oi[i]=t[i];return oi},r.disable=function(t,i){Fr=0,F.forEach(function(s){return s[i?"kill":"disable"](t)}),Te(B,"wheel",hr),Te(te,"scroll",hr),clearInterval(Qr),Te(te,"touchcancel",xt),Te(Z,"touchstart",xt),ri(Te,te,"pointerdown,touchstart,mousedown",xo),ri(Te,te,"pointerup,touchend,mouseup",wo),xi.kill(),ti(Te);for(var n=0;n<N.length;n+=3)ii(Te,N[n],N[n+1]),ii(Te,N[n],N[n+2])},r.enable=function(){if(B=window,te=document,ht=te.documentElement,Z=te.body,x&&(Ur=x.utils.toArray,Ir=x.utils.clamp,Gi=x.core.context||xt,ki=x.core.suppressOverwrites||xt,Ji=B.history.scrollRestoration||"auto",Ui=B.pageYOffset,x.core.globals("ScrollTrigger",r),Z)){Fr=1,yr=document.createElement("div"),yr.style.height="100vh",yr.style.position="absolute",pn(),Xs(),le.register(x),r.isTouch=le.isTouch,Ot=le.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),Hi=le.isTouch===1,Ce(B,"wheel",hr),Jo=[B,te,ht,Z],x.matchMedia?(r.matchMedia=function(f){var m=x.matchMedia(),w;for(w in f)m.add(w,f[w]);return m},x.addEventListener("matchMediaInit",function(){return oo()}),x.addEventListener("matchMediaRevert",function(){return dn()}),x.addEventListener("matchMedia",function(){Qt(0,1),sr("matchMedia")}),x.matchMedia("(orientation: portrait)",function(){return Ai(),Ai})):console.warn("Requires GSAP 3.11.0 or later"),Ai(),Ce(te,"scroll",hr);var t=Z.style,i=t.borderTopStyle,n=x.core.Animation.prototype,s,a;for(n.revert||Object.defineProperty(n,"revert",{value:function(){return this.time(-.01,!0)}}),t.borderTopStyle="solid",s=Mt(Z),we.m=Math.round(s.top+we.sc())||0,Ye.m=Math.round(s.left+Ye.sc())||0,i?t.borderTopStyle=i:t.removeProperty("border-top-style"),Qr=setInterval(_o,250),x.delayedCall(.5,function(){return ei=0}),Ce(te,"touchcancel",xt),Ce(Z,"touchstart",xt),ri(Ce,te,"pointerdown,touchstart,mousedown",xo),ri(Ce,te,"pointerup,touchend,mouseup",wo),Bi=x.utils.checkPrefix("transform"),pi.push(Bi),pr=Re(),xi=x.delayedCall(.2,Qt).pause(),mr=[te,"visibilitychange",function(){var f=B.innerWidth,m=B.innerHeight;te.hidden?(po=f,mo=m):(po!==f||mo!==m)&&jr()},te,"DOMContentLoaded",Qt,B,"load",Qt,B,"resize",jr],ti(Ce),F.forEach(function(f){return f.enable(0,1)}),a=0;a<N.length;a+=3)ii(Te,N[a],N[a+1]),ii(Te,N[a],N[a+2])}},r.config=function(t){"limitCallbacks"in t&&(Ei=!!t.limitCallbacks);var i=t.syncInterval;i&&clearInterval(Qr)||(Qr=i)&&setInterval(_o,i),"ignoreMobileResize"in t&&(Hi=r.isTouch===1&&t.ignoreMobileResize),"autoRefreshEvents"in t&&(ti(Te)||ti(Ce,t.autoRefreshEvents||"none"),en=(t.autoRefreshEvents+"").indexOf("resize")===-1)},r.scrollerProxy=function(t,i){var n=Ve(t),s=N.indexOf(n),a=or(n);~s&&N.splice(s,a?6:2),i&&(a?yt.unshift(B,i,Z,i,ht,i):yt.unshift(n,i))},r.clearMatchMedia=function(t){F.forEach(function(i){return i._ctx&&i._ctx.query===t&&i._ctx.kill(!0,!0)})},r.isInViewport=function(t,i,n){var s=(Je(t)?Ve(t):t).getBoundingClientRect(),a=s[n?er:tr]*i||0;return n?s.right-a>0&&s.left+a<B.innerWidth:s.bottom-a>0&&s.top+a<B.innerHeight},r.positionInViewport=function(t,i,n){Je(t)&&(t=Ve(t));var s=t.getBoundingClientRect(),a=s[n?er:tr],f=i==null?a/2:i in bi?bi[i]*a:~i.indexOf("%")?parseFloat(i)*a/100:parseFloat(i)||0;return n?(s.left+f)/B.innerWidth:(s.top+f)/B.innerHeight},r.killAll=function(t){if(F.slice(0).forEach(function(n){return n.vars.id!=="ScrollSmoother"&&n.kill()}),t!==!0){var i=nr.killAll||[];nr={},i.forEach(function(n){return n()})}},r}();j.version="3.12.5";j.saveStyles=function(r){return r?Ur(r).forEach(function(e){if(e&&e.style){var o=Ke.indexOf(e);o>=0&&Ke.splice(o,5),Ke.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),x.core.getCache(e),Gi())}}):Ke};j.revert=function(r,e){return oo(!r,e)};j.create=function(r,e){return new j(r,e)};j.refresh=function(r){return r?jr():(pr||j.register())&&Qt(!0)};j.update=function(r){return++N.cache&&Et(r===!0?2:0)};j.clearScrollMemory=hn;j.maxScroll=function(r,e){return wt(r,e?Ye:we)};j.getScrollFunc=function(r,e){return Gt(Ve(r),e?Ye:we)};j.getById=function(r){return Xi[r]};j.getAll=function(){return F.filter(function(r){return r.vars.id!=="ScrollSmoother"})};j.isScrolling=function(){return!!ot};j.snapDirectional=io;j.addEventListener=function(r,e){var o=nr[r]||(nr[r]=[]);~o.indexOf(e)||o.push(e)};j.removeEventListener=function(r,e){var o=nr[r],t=o&&o.indexOf(e);t>=0&&o.splice(t,1)};j.batch=function(r,e){var o=[],t={},i=e.interval||.016,n=e.batchMax||1e9,s=function(m,w){var v=[],h=[],u=x.delayedCall(i,function(){w(v,h),v=[],h=[]}).pause();return function(p){v.length||u.restart(!0),v.push(p.trigger),h.push(p),n<=v.length&&u.progress(1)}},a;for(a in e)t[a]=a.substr(0,2)==="on"&&Xe(e[a])&&a!=="onRefreshInit"?s(a,e[a]):e[a];return Xe(n)&&(n=n(),Ce(j,"refresh",function(){return n=e.batchMax()})),Ur(r).forEach(function(f){var m={};for(a in t)m[a]=t[a];m.trigger=f,o.push(j.create(m))}),o};var Eo=function(e,o,t,i){return o>i?e(i):o<0&&e(0),t>i?(i-o)/(t-o):t<0?o/(o-t):1},Fi=function r(e,o){o===!0?e.style.removeProperty("touch-action"):e.style.touchAction=o===!0?"auto":o?"pan-"+o+(le.isTouch?" pinch-zoom":""):"none",e===ht&&r(Z,o)},li={auto:1,scroll:1},ia=function(e){var o=e.event,t=e.target,i=e.axis,n=(o.changedTouches?o.changedTouches[0]:o).target,s=n._gsap||x.core.getCache(n),a=Re(),f;if(!s._isScrollT||a-s._isScrollT>2e3){for(;n&&n!==Z&&(n.scrollHeight<=n.clientHeight&&n.scrollWidth<=n.clientWidth||!(li[(f=it(n)).overflowY]||li[f.overflowX]));)n=n.parentNode;s._isScroll=n&&n!==t&&!or(n)&&(li[(f=it(n)).overflowY]||li[f.overflowX]),s._isScrollT=a}(s._isScroll||i==="x")&&(o.stopPropagation(),o._gsapAllow=!0)},gn=function(e,o,t,i){return le.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:o,onWheel:i=i&&ia,onPress:i,onDrag:i,onScroll:i,onEnable:function(){return t&&Ce(te,le.eventTypes[0],zo,!1,!0)},onDisable:function(){return Te(te,le.eventTypes[0],zo,!0)}})},oa=/(input|label|select|textarea)/i,Po,zo=function(e){var o=oa.test(e.target.tagName);(o||Po)&&(e._gsapAllow=!0,Po=o)},na=function(e){Kt(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var o=e,t=o.normalizeScrollX,i=o.momentum,n=o.allowNestedScroll,s=o.onRelease,a,f,m=Ve(e.target)||ht,w=x.core.globals().ScrollSmoother,v=w&&w.get(),h=Ot&&(e.content&&Ve(e.content)||v&&e.content!==!1&&!v.smooth()&&v.content()),u=Gt(m,we),p=Gt(m,Ye),W=1,E=(le.isTouch&&B.visualViewport?B.visualViewport.scale*B.visualViewport.width:B.outerWidth)/B.innerWidth,P=0,O=Xe(i)?function(){return i(a)}:function(){return i||2.8},G,M,ie=gn(m,e.type,!0,n),Y=function(){return M=!1},T=xt,me=xt,ye=function(){f=wt(m,we),me=Ir(Ot?1:0,f),t&&(T=Ir(0,wt(m,Ye))),G=rr},b=function(){h._gsap.y=Rr(parseFloat(h._gsap.y)+u.offset)+"px",h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(h._gsap.y)+", 0, 1)",u.offset=u.cacheID=0},Q=function(){if(M){requestAnimationFrame(Y);var ce=Rr(a.deltaY/2),ue=me(u.v-ce);if(h&&ue!==u.v+u.offset){u.offset=ue-u.v;var l=Rr((parseFloat(h&&h._gsap.y)||0)-u.offset);h.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+l+", 0, 1)",h._gsap.y=l+"px",u.cacheID=N.cache,Et()}return!0}u.offset&&b(),M=!0},S,be,$,oe,Ne=function(){ye(),S.isActive()&&S.vars.scrollY>f&&(u()>f?S.progress(1)&&u(f):S.resetTo("scrollY",f))};return h&&x.set(h,{y:"+=0"}),e.ignoreCheck=function(U){return Ot&&U.type==="touchmove"&&Q()||W>1.05&&U.type!=="touchstart"||a.isGesturing||U.touches&&U.touches.length>1},e.onPress=function(){M=!1;var U=W;W=Rr((B.visualViewport&&B.visualViewport.scale||1)/E),S.pause(),U!==W&&Fi(m,W>1.01?!0:t?!1:"x"),be=p(),$=u(),ye(),G=rr},e.onRelease=e.onGestureStart=function(U,ce){if(u.offset&&b(),!ce)oe.restart(!0);else{N.cache++;var ue=O(),l,ge;t&&(l=p(),ge=l+ue*.05*-U.velocityX/.227,ue*=Eo(p,l,ge,wt(m,Ye)),S.vars.scrollX=T(ge)),l=u(),ge=l+ue*.05*-U.velocityY/.227,ue*=Eo(u,l,ge,wt(m,we)),S.vars.scrollY=me(ge),S.invalidate().duration(ue).play(.01),(Ot&&S.vars.scrollY>=f||l>=f-1)&&x.to({},{onUpdate:Ne,duration:ue})}s&&s(U)},e.onWheel=function(){S._ts&&S.pause(),Re()-P>1e3&&(G=0,P=Re())},e.onChange=function(U,ce,ue,l,ge){if(rr!==G&&ye(),ce&&t&&p(T(l[2]===ce?be+(U.startX-U.x):p()+ce-l[1])),ue){u.offset&&b();var Yt=ge[2]===ue,zt=Yt?$+U.startY-U.y:u()+ue-ge[1],et=me(zt);Yt&&zt!==et&&($+=et-zt),u(et)}(ue||ce)&&Et()},e.onEnable=function(){Fi(m,t?!1:"x"),j.addEventListener("refresh",Ne),Ce(B,"resize",Ne),u.smooth&&(u.target.style.scrollBehavior="auto",u.smooth=p.smooth=!1),ie.enable()},e.onDisable=function(){Fi(m,!0),Te(B,"resize",Ne),j.removeEventListener("refresh",Ne),ie.kill()},e.lockAxis=e.lockAxis!==!1,a=new le(e),a.iOS=Ot,Ot&&!u()&&u(1),Ot&&x.ticker.add(xt),oe=a._dc,S=x.to(a,{ease:"power4",paused:!0,inherit:!1,scrollX:t?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:mn(u,u(),function(){return S.pause()})},onUpdate:Et,onComplete:oe.vars.onComplete}),a};j.sort=function(r){return F.sort(r||function(e,o){return(e.vars.refreshPriority||0)*-1e6+e.start-(o.start+(o.vars.refreshPriority||0)*-1e6)})};j.observe=function(r){return new le(r)};j.normalizeScroll=function(r){if(typeof r>"u")return Be;if(r===!0&&Be)return Be.enable();if(r===!1){Be&&Be.kill(),Be=r;return}var e=r instanceof le?r:na(r);return Be&&Be.target===e.target&&Be.kill(),or(e.target)&&(Be=e),e};j.core={_getVelocityProp:Ii,_inputObserver:gn,_scrollers:N,_proxies:yt,bridge:{ss:function(){ot||sr("scrollStart"),ot=Re()},ref:function(){return Fe}}};nn()&&x.registerPlugin(j);ci.registerPlugin(j);let _i=null;function sa(r){if(!_i)return;const e=document.documentElement.scrollHeight-window.innerHeight;_i.scrollTo(Math.max(0,Math.min(1,r))*e,{duration:1.6})}function aa(){L.useEffect(()=>{const r=new Bs({duration:1.2,easing:t=>Math.min(1,1.001-Math.pow(2,-10*t)),smoothWheel:!0,touchMultiplier:1.4});_i=r;const e=Ht.getState().setProgress;r.on("scroll",t=>{j.update();const i=t.limit||1,n=Math.min(1,Math.max(0,t.scroll/i));Yn(n),e(n),document.documentElement.style.setProperty("--progress",n.toFixed(4))});const o=t=>r.raf(t*1e3);return ci.ticker.add(o),ci.ticker.lagSmoothing(0),()=>{ci.ticker.remove(o),r.destroy(),_i=null}},[])}const Ri=Ho.filter(r=>r.kind!=="cta");function la(){const r=Ht(t=>t.progress);let e=Ri[0].id,o=1;for(const t of Ri){const i=Math.abs(r-t.p);i<o&&(o=i,e=t.id)}return d.jsxs(jn.nav,{className:"navbar",initial:{opacity:0,y:30},animate:{opacity:1,y:0},transition:{delay:.8,duration:.8,ease:[.16,1,.3,1]},children:[d.jsx("span",{className:"navbar-label",children:"ride the wind"}),Ri.map(t=>d.jsx("button",{className:"chip"+(e===t.id?" active":""),onClick:()=>{sa(t.p),Io(y.cursorX,y.cursorZ)},children:t.label.split(" & ")[0]},t.id))]})}function ca(r,e,o=.075){const t=Math.abs(r-e);return Math.max(0,1-t/o*(t/o))}function ua({tags:r}){return r?d.jsx("div",{className:"tags",children:r.map(e=>d.jsx("span",{className:"tag",children:e},e))}):null}function Ni({items:r}){return d.jsx("div",{className:"cards",children:r.map(e=>d.jsxs("div",{className:"card",children:[d.jsx("h3",{children:e.repo?d.jsxs("a",{href:e.repo,target:"_blank",rel:"noopener noreferrer",children:[e.title," ↗"]}):e.title}),d.jsx("p",{children:e.desc}),d.jsx(ua,{tags:e.tags})]},e.title))})}function fa(){return d.jsxs("div",{className:"home",children:[d.jsx("div",{className:"kicker",children:"the guiding wind · a field of work"}),d.jsxs("h1",{children:[Jt.name,"."]}),d.jsx("div",{className:"role",children:Jt.role}),d.jsx("p",{className:"blurb",children:Jt.blurb}),d.jsx("div",{className:"socials",children:Jt.socials.map(r=>d.jsx("a",{href:r.url,target:"_blank",rel:"noopener noreferrer",children:r.label},r.label))}),d.jsx("div",{className:"hint",children:"scroll to ride the wind through the field ↓"})]})}function da(){const r=vs[0];return d.jsxs("div",{className:"home cta",children:[d.jsx("div",{className:"kicker",children:"the wind settles"}),d.jsx("h1",{children:"Let’s build something."}),d.jsxs("p",{className:"blurb",children:[Jt.name," · ",Jt.role," · IIT Kanpur · Kaggle Expert"]}),d.jsx("a",{className:"verdict-cta",href:r.href,target:"_blank",rel:"noopener noreferrer",children:r.cta}),d.jsx("div",{className:"socials",children:Jt.socials.map(e=>d.jsx("a",{href:e.url,target:"_blank",rel:"noopener noreferrer",children:e.label},e.label))})]})}function ha({station:r}){if(r.kind==="home")return d.jsx(fa,{});if(r.kind==="cta")return d.jsx(da,{});if(r.kind==="experience")return d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:"panel-head",children:[d.jsx("span",{className:"ord",children:"history"}),d.jsx("h2",{children:"Experience"})]}),d.jsx("div",{className:"panel-sub",children:"// where the work was forged"}),d.jsx(Ni,{items:gs.map(o=>({title:o.role,desc:"@ "+o.org+" · "+o.date,tags:o.points}))})]});if(r.kind==="education")return d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:"panel-head",children:[d.jsx("span",{className:"ord",children:"roots"}),d.jsx("h2",{children:"Education"})]}),d.jsxs("div",{className:"panel-sub",children:["// ",Pr.year]}),d.jsx(Ni,{items:[{title:Pr.school,desc:Pr.degree+" · "+Pr.minor,tags:Pr.points}]})]});const e=gi.find(o=>o.id===r.id);return d.jsxs(d.Fragment,{children:[d.jsxs("div",{className:"panel-head",children:[d.jsx("span",{className:"ord",style:{color:e.accent},children:"field"}),d.jsx("h2",{children:e.label})]}),d.jsxs("div",{className:"panel-sub",children:["// ",e.summary]}),d.jsx(Ni,{items:e.items})]})}function pa(){const r=Ht(e=>e.progress);return d.jsx("div",{className:"stage",children:Ho.map(e=>{const o=ca(r,e.p);if(o<=.001)return null;const t=e.kind==="home"||e.kind==="cta"?"is-home":"topic";return d.jsx("div",{className:"panel "+t,style:{opacity:o},children:d.jsx(ha,{station:e})},e.id)})})}const ji=["loading weights","building embeddings","warming attention","ready"];function ma({onDone:r}){const[e,o]=L.useState(0),[t,i]=L.useState(!1);L.useEffect(()=>{let s=0;const a=setInterval(()=>{s=Math.min(100,s+Math.random()*18+6),o(Math.round(s)),s>=100&&(clearInterval(a),setTimeout(()=>{i(!0),r?.()},450))},180);return()=>clearInterval(a)},[r]);const n=ji[Math.min(ji.length-1,Math.floor(e/100*ji.length))];return d.jsx("div",{className:"loader",style:{opacity:t?0:1,pointerEvents:t?"none":"auto"},children:d.jsxs("div",{className:"inner",children:[d.jsxs("div",{className:"pct",children:[e,"%"]}),d.jsx("div",{className:"msg",children:n}),d.jsx("div",{className:"track",children:d.jsx("i",{style:{width:`${e}%`}})})]})})}function ga(){const[,r]=L.useState(!1),e=Ht(i=>i.theme),o=Ht(i=>i.cycleTheme);aa(),L.useEffect(()=>{Wo(e)},[e]);const t=jo(e).dataTheme==="dark";return d.jsxs(d.Fragment,{children:[d.jsx(ma,{onDone:()=>r(!0)}),d.jsx(L.Suspense,{fallback:null,children:d.jsx(Ds,{})}),d.jsx("div",{className:"grade"}),d.jsx("button",{className:"toggle",onClick:o,"aria-label":"Cycle theme",children:t?"☀":"☾"}),d.jsx(pa,{}),d.jsx(la,{}),d.jsx("div",{className:"scroll-spacer","aria-hidden":"true"})]})}document.documentElement.setAttribute("data-theme",Ht.getState().theme);kn.createRoot(document.getElementById("root")).render(d.jsx(En.StrictMode,{children:d.jsx(ga,{})}));
