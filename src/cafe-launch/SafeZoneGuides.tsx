import React from 'react';
import {AbsoluteFill} from 'remotion';

export const SafeZoneGuides:React.FC<{enabled?:boolean}>=({enabled=false})=>enabled?<AbsoluteFill style={{pointerEvents:'none',zIndex:100}}><div style={{position:'absolute',left:90,top:220,width:770,height:1280,border:'3px dashed #FFDF42',boxSizing:'border-box'}}/><div style={{position:'absolute',left:90,top:180,padding:'5px 9px',background:'#FFDF42',color:'#050A18',font:'bold 20px Arial'}}>SAFE ZONE · X 90–860 · Y 220–1500</div></AbsoluteFill>:null;
