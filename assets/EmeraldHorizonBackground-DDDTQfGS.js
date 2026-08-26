import{c as e,f as t,g as n,h as r,u as i,v as a,y as o}from"./three.module-xqLZnUmu.js";import{n as s,r as c,t as l}from"./index-JfJ4xEID.js";var u=c(s(),1),d=l(),f=`
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`,p=`
uniform float u_time;
uniform vec2 u_resolution;
uniform float u_wave_scale;
uniform float u_variation;
uniform float u_glow;
uniform float u_vignette;
varying vec2 vUv;
float hash(float n) { return fract(sin(n) * 1e4); }
float noise(float x) {
  float i = floor(x);
  float f = fract(x);
  float u = f * f * (3.0 - 2.0 * f);
  return mix(hash(i), hash(i + 1.0), u);
}
void main() {
  vec2 st = gl_FragCoord.xy / u_resolution.xy;
  float yPos = st.y;
  float wave1 = sin(st.x * 3.0 + u_time * 0.5) * 0.1 * u_wave_scale;
  float wave2 = sin(st.x * 5.0 - u_time * 0.3) * 0.05 * u_wave_scale;
  float combinedWave = wave1 + wave2;
  float intensity = smoothstep(0.4, -0.1, yPos + combinedWave);
  float variation = noise(st.x * 2.0 + u_time * 0.1) * 0.5 + 0.5;
  intensity *= variation * 1.5 * u_variation;
  vec3 color = vec3(0.0, 0.02, 0.0);
  vec3 glowColor1 = vec3(0.05, 0.8, 0.2);
  vec3 glowColor2 = vec3(0.0, 1.0, 0.5);
  vec3 finalGlow = mix(glowColor1, glowColor2, st.x + sin(u_time*0.2)*0.5);
  color += finalGlow * pow(intensity, 1.5) * 1.2 * u_glow;
  float vignette = mix(1.0, smoothstep(1.2, 0.5, length(st - vec2(0.5, 0.0))), u_vignette);
  color *= vignette;
  gl_FragColor = vec4(color, 1.0);
}
`,m={speed:1,waveScale:1,variation:1,glow:1,vignette:1,hue:0};function h({className:s=``,...c}){let l=(0,u.useRef)(null),h=(0,u.useRef)(null),g=(0,u.useRef)({...m,...c});return g.current={...m,...c},(0,u.useEffect)(()=>{let s=l.current,c=h.current;if(!s||!c)return;let u=new r,d=new i(-1,1,1,-1,0,1),m=new o({canvas:c,alpha:!0,antialias:!0});m.setPixelRatio(Math.min(window.devicePixelRatio,2));let _={u_time:{value:0},u_resolution:{value:new a(1,1)},u_wave_scale:{value:1},u_variation:{value:1},u_glow:{value:1},u_vignette:{value:1}},v=new n({vertexShader:f,fragmentShader:p,uniforms:_,depthWrite:!1,depthTest:!1}),y=new t(2,2);u.add(new e(y,v));let b=0,x=!0,S=performance.now(),C=()=>{let e=s.getBoundingClientRect();m.setSize(e.width,e.height,!1),_.u_resolution.value.set(e.width,e.height)},w=e=>{let t=g.current;_.u_time.value=(e-S)*.001*t.speed,_.u_wave_scale.value=t.waveScale,_.u_variation.value=t.variation,_.u_glow.value=t.glow,_.u_vignette.value=t.vignette,m.render(u,d),b=x&&!document.hidden?requestAnimationFrame(w):0},T=new ResizeObserver(C),E=new IntersectionObserver(([e])=>{x=e?.isIntersecting??!0,x&&!b&&(b=requestAnimationFrame(w)),!x&&b&&(cancelAnimationFrame(b),b=0)});return T.observe(s),E.observe(s),C(),b=requestAnimationFrame(w),()=>{b&&cancelAnimationFrame(b),T.disconnect(),E.disconnect(),y.dispose(),v.dispose(),m.dispose()}},[]),(0,d.jsx)(`div`,{ref:l,className:`threeui-background emerald-horizon${s?` ${s}`:``}`,children:(0,d.jsx)(`canvas`,{ref:h,style:{filter:`hue-rotate(${g.current.hue}deg)`}})})}export{h as EmeraldHorizonBackground};