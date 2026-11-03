import React from 'react';
import {AbsoluteFill, Audio, interpolate, Sequence, spring, staticFile, useCurrentFrame, useVideoConfig} from 'remotion';

const clamp = {extrapolateLeft: 'clamp' as const, extrapolateRight: 'clamp' as const};
const fade = (f:number, start:number, end:number) => interpolate(f,[start,start+20,end-20,end],[0,1,1,0],clamp);
const ease = (f:number,a:number,b:number) => interpolate(f,[a,b],[0,1],clamp);
const bg = '#10141b';
const panel = 'rgba(31,35,43,.96)';
const font = '-apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Arial, sans-serif';

export function MacWindow({title,children,opacity=1,scale=1,top=430,width=890}:{title:string;children:React.ReactNode;opacity?:number;scale?:number;top?:number;width?:number}){
 return <div style={{position:'absolute',left:'50%',top,width,transform:`translateX(-50%) scale(${scale})`,transformOrigin:'top center',opacity,borderRadius:25,background:panel,boxShadow:'0 35px 90px #000a,0 0 0 1px #ffffff20',overflow:'hidden'}}>
  <div style={{height:72,background:'#252a33',display:'flex',alignItems:'center',padding:'0 28px',gap:13,borderBottom:'1px solid #ffffff13'}}>
   {['#ff6058','#febc2e','#28c840'].map(c=><div key={c} style={{width:17,height:17,borderRadius:99,background:c}}/>)}
   <div style={{position:'absolute',left:0,right:0,textAlign:'center',fontSize:24,fontWeight:600,color:'#e8e9ed',pointerEvents:'none'}}>{title}</div>
  </div>
  {children}
 </div>;
}
export function FinderWindow({children,project=false,scale=1}:{children:React.ReactNode;project?:boolean;scale?:number}){
 return <MacWindow title={project?'Finder — Мой проект':'Finder — Мои планы'} top={project?430:440} scale={scale}>{children}</MacWindow>;
}
export function NotesWindow({children}:{children:React.ReactNode}){return <MacWindow title="Заметки" top={460}>{children}</MacWindow>}
export function RemindersWindow({children,scale=1}:{children:React.ReactNode;scale?:number}){return <MacWindow title="Напоминания" top={480} scale={scale}>{children}</MacWindow>}
export function MacNotification({title,body}:{title:string;body?:string}){return <div style={{position:'absolute',top:350,left:100,right:100,borderRadius:27,background:'#343943ee',border:'1px solid #ffffff2a',padding:30,boxShadow:'0 22px 70px #0007'}}><div style={{fontSize:29,fontWeight:700}}>{title}</div>{body&&<div style={{fontSize:25,color:'#c5c8d0',marginTop:10}}>{body}</div>}</div>}
export function AnimatedCursor({x,y,click=false}:{x:number;y:number;click?:boolean}){
 return <svg width="44" height="57" viewBox="0 0 44 57" style={{position:'absolute',left:x,top:y,filter:'drop-shadow(2px 4px 2px #0009)',transform:`scale(${click?.89:1})`,zIndex:50}}><path d="M4 3L4 48L16 36L24 53L32 49L24 32L40 32Z" fill="#fff" stroke="#111" strokeWidth="3" strokeLinejoin="round"/></svg>;
}
export function MacMenuBar(){return <div style={{position:'absolute',top:0,left:0,right:0,height:57,background:'#0a0b0ec9',display:'flex',alignItems:'center',padding:'0 32px',gap:25,fontSize:19,color:'#f1f1f4',zIndex:2}}><span style={{fontSize:26}}>●</span><b>Finder</b><span>Файл</span><span>Правка</span><span>Вид</span><span>Окно</span><span style={{marginLeft:'auto',opacity:.7}}>◉  ▰  Wi-Fi</span><span style={{fontSize:17}}>9:41</span></div>}
export function MacDock(){return <div style={{position:'absolute',bottom:65,left:'50%',transform:'translateX(-50%)',height:84,border:'1px solid #ffffff38',borderRadius:25,background:'#d8dbe125',backdropFilter:'blur(20px)',display:'flex',alignItems:'center',gap:18,padding:'0 24px',zIndex:2}}>{['◉','▣','▤','☷','⚙','◷'].map((s,i)=><div key={i} style={{width:53,height:53,borderRadius:14,display:'grid',placeItems:'center',fontSize:32,color:'#f5f5f8',background:['#5c86c8','#7b8aaf','#e0ae52','#547a7d','#747b89','#a4768b'][i],boxShadow:'0 3px 10px #0006'}}>{s}</div>)}</div>}
export function MacDesktop(){
 return <>
  <AbsoluteFill style={{background:'radial-gradient(ellipse at 70% 18%,#31405a 0%,transparent 45%),radial-gradient(ellipse at 22% 80%,#302a47 0%,transparent 45%),linear-gradient(150deg,#111622,#0a0d13 75%)'}}/>
  <MacMenuBar/><MacDock/>
  <div style={{position:'absolute',right:35,top:104,color:'#ffffffb3',fontSize:16}}>Пн, 3 ноября</div>
 </>;
}
const lines=['Когда появится время…','Когда узнаю больше…','Когда буду готов…'];
const items=['Талант','Идеальные знания','Подходящий момент','Действие'];
export const MacOSJustStart:React.FC=()=>{
 const frame=useCurrentFrame(); const {fps}=useVideoConfig();
 const inScene=(a:number,b:number)=>frame>=a&&frame<b;
 const progress = spring({fps,frame:Math.max(0,frame-1200),config:{damping:20,stiffness:120}});
 const cursorX=interpolate(frame,[0,100,240,450,540,870,900,1160,1200,1370],[670,580,520,720,650,680,705,137,137,520],clamp);
 const cursorY=interpolate(frame,[0,100,240,450,540,870,900,1160,1200,1370],[1120,820,720,900,750,1140,1170,1079,1079,790],clamp);
 return <AbsoluteFill style={{background:bg,color:'#f5f5f7',fontFamily:font,overflow:'hidden'}}>
  <MacDesktop/>
  {inScene(0,250)&&<div style={{opacity:fade(frame,0,250)}}>
   <FinderWindow scale={.94+ease(frame,0,50)*.06}>
    <div style={{padding:36,minHeight:510}}><div style={{fontSize:24,color:'#b8bdc7',marginBottom:32}}>Избранное  /  Мои планы</div>{['Мой проект','Новая жизнь','Большая цель'].map((s)=><div key={s} style={{height:102,borderBottom:'1px solid #ffffff14',display:'flex',alignItems:'center',gap:22,fontSize:29}}><span style={{fontSize:42,color:'#74b7ff'}}>▣</span><span>{s}</span><span style={{marginLeft:'auto',fontSize:20,color:'#aeb4c0'}}>Не начато</span></div>)}</div>
   </FinderWindow><div style={{position:'absolute',top:1180,width:'100%',textAlign:'center',fontSize:66,fontWeight:800,letterSpacing:-2,opacity:ease(frame,95,125)}}>ЧЕГО ТЫ ЖДЁШЬ?</div>
  </div>}
  {inScene(235,540)&&<div style={{opacity:fade(frame,235,540)}}><NotesWindow>
   <div style={{padding:'44px 52px',height:570}}><div style={{fontSize:30,fontWeight:700,color:'#e8e9ed',marginBottom:38}}>Почему я ещё не начал</div>{lines.map((s,i)=>{const start=275+i*72;const chars=Math.floor(ease(frame,start,start+50)*s.length);return <div key={s} style={{fontSize:36,height:88,color:'#e9e9ec',textDecoration:frame>start+62?'line-through':'none',textDecorationColor:'#e26b72',opacity:frame>start+62?.56:1}}>{s.slice(0,chars)}{frame>=start&&frame<start+50?'▏':''}</div>})}</div>
  </NotesWindow><div style={{position:'absolute',top:120,left:410,right:70,borderRadius:20,padding:24,background:'#343943ee',border:'1px solid #ffffff24',fontSize:26,opacity:ease(frame,470,500),boxShadow:'0 18px 55px #0008'}}>Ты говорил это год назад.</div></div>}
  {inScene(540,1300)&&<div style={{opacity:frame<570?.7+.3*ease(frame,540,570):frame>1240?1-ease(frame,1240,1300):1}}>
   <RemindersWindow scale={frame>=900?1+ease(frame,900,1200)*.07:1}>
    <div style={{padding:'40px 50px 50px',minHeight:590}}><div style={{fontSize:39,fontWeight:800,marginBottom:40}}>Что нужно для успеха?</div>
     {items.map((s,i)=>{const visible=frame>=575+i*70;const active=i===3&&frame>=1200;return <div key={s} style={{display:'flex',alignItems:'center',gap:25,height:105,borderBottom:'1px solid #ffffff12',opacity:visible?(frame>=1200&&i<3?.23:1):0,transform:`translateY(${visible?0:12}px)`,fontSize:active?48:34,fontWeight:active?800:500}}>
      <span style={{width:49,height:49,borderRadius:50,border:active?'none':i<3?'3px solid #ee6b72':'3px solid #adb4bf',background:active?'#3fc47c':'transparent',color:active?'#092a1a':'#ee6b72',display:'grid',placeItems:'center',fontSize:33,fontWeight:800,transform:active?`scale(${.7+progress*.3})`:undefined}}>{active?'✓':i<3?'×':''}</span>
      <span style={{color:active?'#72e7a3':'#f2f2f5'}}>{s}</span>
     </div>})}
    </div>
   </RemindersWindow>
   {inScene(900,1200)&&<div style={{position:'absolute',top:1280,left:60,right:60,textAlign:'center',fontSize:53,fontWeight:800,letterSpacing:-1.3,opacity:ease(frame,950,1010)}}>ТЫ НЕ ОБЯЗАН БЫТЬ ГОТОВЫМ.</div>}
   {inScene(1200,1300)&&<div style={{position:'absolute',top:1300,left:80,right:80,textAlign:'center',transform:`scale(${.95+.05*progress})`}}><div style={{fontSize:86,lineHeight:1.2,fontWeight:900,color:'#7ae4a7'}}>ДЕЙСТВИЕ.</div><div style={{fontSize:26,marginTop:18,color:'#d7dbe2',opacity:ease(frame,1210,1240)}}>Единственное, что изменит результат.</div></div>}
  </div>}
  {inScene(1300,1500)&&<div style={{opacity:ease(frame,1300,1330)*(1-ease(frame,1460,1500))}}><FinderWindow project>
    <div style={{padding:'40px 48px',height:650}}><div style={{fontSize:25,color:'#aeb4c0'}}>Мои планы / Мой проект</div><div style={{display:'flex',alignItems:'center',justifyContent:'space-between',fontSize:37,fontWeight:700,marginTop:46}}><span>Мой проект</span><span style={{fontSize:23,color:'#7be2a7'}}>В работе</span></div><div style={{background:'#171b22',border:'1px solid #ffffff22',borderRadius:16,padding:32,marginTop:42,height:270}}><div style={{fontSize:22,color:'#aeb4c0',marginBottom:28}}>Новый документ</div><div style={{fontSize:38,fontWeight:600}}>{'Первый шаг'.slice(0,Math.floor(ease(frame,1380,1460)*11))}{frame>=1380&&frame<1470?'▏':''}</div></div></div>
  </FinderWindow></div>}
  <Sequence from={1500} durationInFrames={300} layout="none"><div>
   <MacNotification title="✓ Первый шаг сделан" body="Всё начинается сегодня."/>
   <div style={{position:'absolute',top:900,width:'100%',textAlign:'center',fontSize:81,fontWeight:900,letterSpacing:-3,opacity:ease(frame,1570,1630)}}>ПРОСТО НАЧНИ.</div>
   <div style={{position:'absolute',bottom:260,width:'100%',textAlign:'center',fontFamily:'Georgia, Times New Roman, serif',fontSize:79,fontWeight:500,opacity:ease(frame,1650,1700)}}>O.</div>
  </div></Sequence>
  {frame<1500&&<AnimatedCursor x={cursorX} y={cursorY} click={frame>=1198&&frame<=1204}/>}
  <Audio src={staticFile('audio/1103.mp3')}/>
 </AbsoluteFill>;
};
