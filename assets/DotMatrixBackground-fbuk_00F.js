import{c as e,f as t,g as n,h as r,u as i,v as a,y as o}from"./three.module-xqLZnUmu.js";import{n as s,r as c,t as l}from"./index-DOWxH64p.js";var u=c(s(),1),d=l(),f=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`,p=`
uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uGridScale;
uniform float uMouseAmount;
uniform float uPulseSpeed;
uniform float uRadius;
uniform float uOpacity;
varying vec2 vUv;
void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy;
  float aspect = uResolution.x / uResolution.y;
  uv.x *= aspect;
  uv += uMouse * uMouseAmount;
  vec2 grid = fract(uv * uGridScale);
  vec2 id = floor(uv * uGridScale);
  float dist = length(grid - vec2(0.5));
  float pulse = sin(uTime * uPulseSpeed + id.x * 0.05 + id.y * 0.05) * 0.5 + 0.5;
  float radius = 0.08 + pulse * uRadius;
  float alpha = smoothstep(radius, radius - 0.05, dist);
  vec2 center = vec2(0.5 * aspect, 0.5);
  float depthFade = smoothstep(1.2, 0.1, length(uv - center));
  vec3 color = vec3(0.0, 0.9, 1.0) * pulse;
  gl_FragColor = vec4(color, alpha * depthFade * uOpacity);
}
`,m={speed:1,gridScale:60,mouseAmount:.04,pulseSpeed:.4,radius:.15,opacity:.35,hue:0};function h({className:s=``,...c}){let l=(0,u.useRef)(null),h=(0,u.useRef)(null),g=(0,u.useRef)({...m,...c});return g.current={...m,...c},(0,u.useEffect)(()=>{let s=l.current,c=h.current;if(!s||!c)return;let u=new o({canvas:c,antialias:!0,alpha:!0});u.setPixelRatio(Math.min(window.devicePixelRatio,2));let d=new r,m=new i(-1,1,1,-1,.1,10);m.position.z=1;let _={uTime:{value:0},uResolution:{value:new a},uMouse:{value:new a},uGridScale:{value:60},uMouseAmount:{value:.04},uPulseSpeed:{value:.4},uRadius:{value:.15},uOpacity:{value:.35}},v=new t(2,2),y=new n({uniforms:_,vertexShader:f,fragmentShader:p,transparent:!0,depthWrite:!1});d.add(new e(v,y));let b=new a,x=new a,S=0,C=!0,w=performance.now(),T=e=>{let t=c.getBoundingClientRect();x.x=(e.clientX-t.left)/Math.max(1,t.width)*2-1,x.y=-((e.clientY-t.top)/Math.max(1,t.height)*2-1)},E=()=>{let e=s.getBoundingClientRect();u.setSize(e.width,e.height,!1),_.uResolution.value.set(e.width,e.height)},D=e=>{let t=g.current;b.lerp(x,.05),_.uTime.value=(e-w)*.001*t.speed,_.uMouse.value=b,_.uGridScale.value=t.gridScale,_.uMouseAmount.value=t.mouseAmount,_.uPulseSpeed.value=t.pulseSpeed,_.uRadius.value=t.radius,_.uOpacity.value=t.opacity,u.render(d,m),S=C&&!document.hidden?requestAnimationFrame(D):0},O=new ResizeObserver(E),k=new IntersectionObserver(([e])=>{C=e?.isIntersecting??!0,C&&!S&&(S=requestAnimationFrame(D)),!C&&S&&(cancelAnimationFrame(S),S=0)});return O.observe(s),k.observe(s),c.addEventListener(`pointermove`,T,{passive:!0}),E(),S=requestAnimationFrame(D),()=>{S&&cancelAnimationFrame(S),O.disconnect(),k.disconnect(),c.removeEventListener(`pointermove`,T),v.dispose(),y.dispose(),u.dispose()}},[]),(0,d.jsx)(`div`,{ref:l,className:`threeui-background dot-matrix${s?` ${s}`:``}`,children:(0,d.jsx)(`canvas`,{ref:h,style:{filter:`hue-rotate(${g.current.hue}deg)`}})})}export{h as DotMatrixBackground};