import {AbsoluteFill, spring} from 'remotion';
import {C, DISPLAY, FONT, Grid, Headline, Label, PosterBase, Rule, move, sweep, useTimeline} from './design';

const RevealedLine = ({text, second, at, top, size, color = C.ink}: {text: string; second: number; at: number; top: number; size: number; color?: string}) =>
  <div style={{position: 'absolute', left: 82, top, width: 930, height: size * 1.08, overflow: 'hidden'}}>
    <Headline style={{fontSize: size, color, translate: `0 ${move(second, at, at + .46, size * 1.12, 0)}px`}}>{text}</Headline>
  </div>;

const MiniCompany = ({active, dark = false}: {active: boolean; dark?: boolean}) => <div style={{width: '100%', height: '100%', boxSizing: 'border-box', border: `3px solid ${active ? C.blue : dark ? '#7A858A' : C.ink}`, backgroundColor: active ? C.blue : dark ? C.ink : C.paper, color: active ? C.paper : dark ? C.paper : C.ink, padding: 18, overflow: 'hidden'}}>
  <div style={{display: 'flex', justifyContent: 'space-between', fontSize: 19, fontWeight: 800, letterSpacing: 1}}><span>{active ? '02 / ВИДЕН' : '01 / КАЧЕСТВО'}</span><span>●</span></div>
  <div style={{marginTop: 28, width: active ? '88%' : '65%', height: 12, backgroundColor: 'currentColor'}} />
  <div style={{marginTop: 12, width: active ? '72%' : '82%', height: 8, backgroundColor: 'currentColor', opacity: .6}} />
  <div style={{marginTop: 30, display: 'flex', gap: 8}}>{[0, 1, 2].map(i => <div key={i} style={{width: 38, height: 38, border: '2px solid currentColor', borderRadius: '50%', opacity: active || i === 0 ? 1 : .35}} />)}</div>
</div>;

const CompetitionIllustration: React.FC<{s: number}> = ({s}) => <div style={{position: 'absolute', left: 82, top: 1260, width: 916, height: 270}}>
  <div style={{position: 'absolute', left: 0, top: 0, width: 400, height: 250, clipPath: `inset(0 0 ${move(s, .7, 1.15, 100, 0)}% 0)`, translate: `${move(s, 1.2, 2, 0, -35)}px 0`, scale: move(s, 1.2, 2, 1, .83), transformOrigin: 'left center'}}><MiniCompany active={false} /></div>
  <div style={{position: 'absolute', left: move(s, 1.05, 2, 540, 480), top: 0, width: 400, height: 250, clipPath: `inset(0 0 ${move(s, 1, 1.5, 100, 0)}% 0)`, scale: move(s, 1.2, 2, .86, 1), transformOrigin: 'right center'}}><MiniCompany active /></div>
  <div style={{position: 'absolute', left: move(s, 1.1, 2, 450, 425), top: 108, width: 76, height: 3, backgroundColor: C.blue, scale: `${move(s, 1.15, 1.55, 0, 1)} 1`}} />
</div>;

const Hook: React.FC = () => {
  const {second: s} = useTimeline();
  return <PosterBase>
    <Grid />
    <Label>01 / 00:00—00:03</Label>
    <div style={{position: 'absolute', left: 82, top: 205, fontSize: 28, letterSpacing: 3}}>ПОЧЕМУ ВЫБИРАЮТ НЕ ЛУЧШИХ?</div>
    <RevealedLine text="ВАШ" second={s} at={-.18} top={530} size={180} />
    <RevealedLine text="КОНКУРЕНТ" second={s} at={.10} top={715} size={122} />
    <RevealedLine text="ХУЖЕ." second={s} at={.34} top={900} size={235} />
    <div style={{position: 'absolute', left: 82, top: 1150, width: move(s, .75, 1.3, 0, 900), height: 12, backgroundColor: C.blue}} />
    <CompetitionIllustration s={s} />
    <Rule top={1590} color={C.ink} />
    <div style={{position: 'absolute', left: 82, top: 1615, fontSize: 26}}>01 — НАЧАЛО</div>
  </PosterBase>;
};

const Choice: React.FC = () => {
  const {second: s} = useTimeline();
  return <PosterBase dark>
    <Grid dark />
    <Label dark>02 / 00:03—00:06</Label>
    <div style={{position: 'absolute', left: 60, top: 360, width: 960, height: 810, overflow: 'hidden', clipPath: `inset(0 ${100 - move(s, 3.05, 3.75, 0, 100)}% 0 0)`}}>
      <svg width="960" height="810" viewBox="0 0 960 810" style={{position: 'absolute', inset: 0}} fill="none" stroke={C.paper} strokeWidth="4" aria-hidden="true">
        <path d="M40 52H140V232H320V52H420V553H320V348H140V553H40Z" />
      </svg>
      <div style={{fontFamily: DISPLAY, fontSize: 690, fontWeight: 900, lineHeight: 1, letterSpacing: -38, color: 'transparent'}}><span style={{visibility: 'hidden'}}>Н</span><span style={{WebkitTextStroke: `4px ${C.paper}`}}>О</span></div>
    </div>
    <RevealedLine text="ВЫБРАЛИ" second={s} at={3.62} top={1115} size={154} color={C.paper} />
    <RevealedLine text="ЕГО." second={s} at={3.85} top={1280} size={165} color={C.paper} />
    <div style={{position: 'absolute', left: 505, top: 1305, width: 205, height: 275, scale: move(s, 4.03, 4.48, .76, 1), opacity: move(s, 4.03, 4.48, 0, .65)}}><MiniCompany active={false} dark /></div>
    <div style={{position: 'absolute', left: 744, top: 1275, width: 235, height: 315, scale: move(s, 4.22, 4.68, .76, 1), opacity: move(s, 4.22, 4.68, 0, 1), outline: `${move(s, 4.78, 5.08, 0, 7)}px solid ${C.blue}`, outlineOffset: 7}}><MiniCompany active={false} dark /></div>
    <div style={{position: 'absolute', left: 744, top: 1275, width: 235, height: 315, backgroundColor: C.blue, clipPath: `inset(0 ${move(s, 5.12, 5.42, 100, 0)}% 0 0)`, boxSizing: 'border-box', padding: 20, color: C.paper, fontSize: 28, fontWeight: 800}}>ВЫБРАН<br />02</div>
    <svg width="78" height="98" viewBox="0 0 72 90" style={{position: 'absolute', left: move(s, 4.48, 5.1, 690, 882), top: move(s, 4.48, 5.1, 1540, 1515), opacity: move(s, 4.48, 4.72, 0, 1)}}><path d="M4 3V76L22 59L34 86L48 80L36 54H64Z" fill={C.paper} stroke={C.ink} strokeWidth="4" /></svg>
    <Rule top={1640} color="#546069" />
  </PosterBase>;
};

const SearchResult = ({index, selected = false}: {index: number; selected?: boolean}) => <div style={{height: 168, borderBottom: `2px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 30, padding: '0 24px'}}>
  <div style={{width: 112, height: 112, backgroundColor: selected ? C.blue : '#D6D7D2', flexShrink: 0}} />
  <div style={{flex: 1}}>
    <div style={{fontSize: 33, fontWeight: 700}}>{selected ? 'Ресторан «Форма»' : ['Кафе «Север»', 'Ресторан «Линия»', 'Бистро «Точка»', 'Кафе «Берег»'][index % 4]}</div>
    <div style={{fontSize: 23, marginTop: 8, color: '#59626A'}}>Меню · Фото · Адрес · Отзывы</div>
  </div>
  <div style={{fontSize: 29, fontWeight: 700}}>{selected ? '4,8' : '4,3'}</div>
</div>;

const CompanyCard = ({index, selected = false}: {index: number; selected?: boolean}) => <div style={{position: 'absolute', left: selected ? 154 : 90 + index * 150, top: selected ? 600 : 640 + index * 155, width: selected ? 560 : 370, height: selected ? 690 : 500, backgroundColor: C.paper, color: C.ink, border: `2px solid ${C.paper}`, boxShadow: '0 16px 45px #0005', rotate: selected ? '-4deg' : `${index * 4 - 8}deg`, overflow: 'hidden'}}>
  <div style={{padding: 25, fontSize: 23, fontWeight: 700}}>ФОРМА <span style={{float: 'right'}}>● ● ●</span></div>
  <div style={{height: selected ? 330 : 215, margin: '0 24px', backgroundColor: selected ? C.blue : '#26333D', position: 'relative', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: '12%', top: '20%', width: '76%', height: '70%', border: `3px solid ${C.paper}`, borderRadius: '50%'}} />
    <div style={{position: 'absolute', left: '48%', top: 0, width: 3, height: '100%', backgroundColor: C.paper}} />
    <div style={{position: 'absolute', left: 0, top: '70%', width: '100%', height: 3, backgroundColor: C.paper}} />
  </div>
  <div style={{padding: '25px', fontSize: selected ? 34 : 28, fontWeight: 800}}>РЕСТОРАН «ФОРМА»</div>
  <div style={{margin: '0 25px', height: 7, width: '72%', backgroundColor: '#ADB1AE'}} />
  <div style={{margin: '17px 25px', height: 7, width: '52%', backgroundColor: '#D7D8D2'}} />
  <div style={{margin: '30px 25px', fontSize: 24}}>★ 4,8 · ЦЕНТР ГОРОДА</div>
</div>;

const Search: React.FC = () => {
  const {second: s} = useTimeline();
  const cards = move(s, 8.45, 9.15, 0, 100);
  return <PosterBase>
    <div style={{position: 'absolute', inset: 0, backgroundColor: C.ink, clipPath: `inset(0 0 ${100 - cards}% 0)`}} />
    <Label style={{color: cards > 50 ? C.paper : C.ink}}>03 / 00:06—00:10</Label>
    <div style={{position: 'absolute', left: 82, top: 265, fontSize: 51, fontWeight: 800, color: cards > 50 ? C.paper : C.ink}}>ПОТОМУ ЧТО ЕГО НАШЛИ.</div>
    <div style={{position: 'absolute', left: 82, top: 440, width: 916, height: 110, border: `2px solid ${C.ink}`, borderRadius: 60, backgroundColor: C.paper, display: 'flex', alignItems: 'center', padding: '0 34px', gap: 28, clipPath: `inset(0 ${move(s, 9, 9.45, 0, 100)}% 0 0)`}}>
      <div style={{width: 27, height: 27, border: `3px solid ${C.ink}`, borderRadius: '50%', position: 'relative'}}><div style={{position: 'absolute', width: 16, height: 3, backgroundColor: C.ink, rotate: '45deg', left: 21, top: 25}} /></div>
      <div style={{fontSize: 32}}>ресторан рядом</div>
    </div>
    <div style={{position: 'absolute', left: 82, top: 600, width: 916, border: `2px solid ${C.line}`, backgroundColor: C.paper, clipPath: `inset(0 0 ${move(s, 6.25, 7.2, 100, 0)}% 0)`}}>
      {[0, 1, 2, 3, 4].map((index) => <SearchResult key={index} index={index} selected={index === 1} />)}
    </div>
    <div style={{position: 'absolute', inset: 0, clipPath: `inset(${100 - cards}% 0 0 0)`}}>
      <CompanyCard index={0} />
      <CompanyCard index={1} />
      <CompanyCard index={2} selected />
    </div>
  </PosterBase>;
};

const Map: React.FC<{s: number}> = ({s}) => <div style={{position: 'absolute', inset: 0, backgroundColor: C.paper}}>
  {[0, 1, 2, 3, 4, 5].map((i) => <div key={`h${i}`} style={{position: 'absolute', left: 0, right: 0, top: 365 + i * 190, height: 2, backgroundColor: '#D9D9D2', rotate: '-23deg'}} />)}
  {[0, 1, 2, 3, 4].map((i) => <div key={`v${i}`} style={{position: 'absolute', top: 200, bottom: 160, left: 115 + i * 210, width: 2, backgroundColor: '#D9D9D2', rotate: '29deg'}} />)}
  {[[250, 650], [700, 550], [420, 1050], [825, 1160], [190, 1330]].map(([x, y], i) => <div key={i} style={{position: 'absolute', left: x, top: y, width: 26, height: 26, borderRadius: '50%', backgroundColor: C.ink, scale: move(s, 10 + i * .09, 10.45 + i * .09, 0, 1)}} />)}
  <div style={{position: 'absolute', left: 520, top: 815, width: 180, height: 180, borderRadius: '50%', backgroundColor: '#1646F533', scale: move(s, 10.3, 10.9, 0, 1)}} />
  <div style={{position: 'absolute', left: 580, top: 875, width: 60, height: 60, borderRadius: '50%', backgroundColor: C.blue, scale: move(s, 10.3, 10.9, 0, 1)}} />
  <div style={{position: 'absolute', left: 82, bottom: 310, fontSize: 29, fontWeight: 700}}>ТАМ, ГДЕ ИЩУТ</div>
</div>;

const SiteCard: React.FC = () => <div style={{position: 'absolute', left: 152, top: 360, width: 776, height: 1170, backgroundColor: C.paper, color: C.ink, boxShadow: '0 24px 60px #0005', overflow: 'hidden'}}>
  <div style={{height: 70, padding: '20px 28px', fontSize: 27, borderBottom: `2px solid ${C.line}`}}>● ● ● <span style={{float: 'right', fontWeight: 800}}>ФОРМА</span></div>
  <div style={{margin: 26, height: 430, backgroundColor: C.ink, position: 'relative', overflow: 'hidden'}}>
    <div style={{position: 'absolute', left: 95, top: 60, width: 540, height: 310, border: `3px solid ${C.paper}`}} />
    {[0, 1, 2].map((i) => <div key={i} style={{position: 'absolute', left: 150 + i * 135, top: 125, width: 50, height: 245, border: `2px solid ${C.paper}`}} />)}
    <div style={{position: 'absolute', left: 110, top: 320, width: 560, height: 3, backgroundColor: C.paper}} />
  </div>
  <div style={{padding: '20px 35px', fontFamily: DISPLAY, fontSize: 66, fontWeight: 900}}>РЕСТОРАН</div>
  <div style={{padding: '0 35px', fontSize: 30}}>Современная кухня в центре города.</div>
  <div style={{margin: '45px 35px', width: 270, height: 65, backgroundColor: C.blue, color: C.paper, fontSize: 25, display: 'grid', placeItems: 'center'}}>ЗАБРОНИРОВАТЬ</div>
  <div style={{display: 'flex', gap: 15, margin: '80px 35px'}}>{[0, 1, 2].map(i => <div key={i} style={{width: 210, height: 145, backgroundColor: i === 1 ? '#35434B' : '#89918F'}} />)}</div>
</div>;

const ContentGrid: React.FC = () => <div style={{position: 'absolute', left: 70, top: 340, width: 940, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, rotate: '-7deg'}}>
  {[0, 1, 2, 3, 4, 5].map(i => <div key={i} style={{height: 365, backgroundColor: i === 3 ? C.blue : i % 2 ? '#29343C' : C.paper, padding: 20, boxSizing: 'border-box'}}>
    <div style={{height: 170, border: `2px solid ${i % 2 ? C.paper : C.ink}`, opacity: .7, marginBottom: 20}} />
    <div style={{height: 10, backgroundColor: i % 2 ? C.paper : C.ink, width: '70%', opacity: .7}} />
    <div style={{height: 8, backgroundColor: i % 2 ? C.paper : C.ink, width: '48%', opacity: .5, marginTop: 15}} />
  </div>)}
</div>;

const Seen: React.FC = () => {
  const {second: s} = useTimeline();
  const site = move(s, 11.15, 11.7, 0, 100);
  const content = move(s, 12.25, 12.85, 0, 100);
  return <PosterBase>
    <Map s={s} />
    <div style={{position: 'absolute', inset: 0, backgroundColor: C.ink, clipPath: `circle(${move(s, 11.05, 11.75, 0, 1500)}px at 56% 48%)`}} />
    <div style={{position: 'absolute', inset: 0, clipPath: `circle(${move(s, 11.05, 11.75, 0, 1500)}px at 56% 48%)`, scale: move(s, 11.15, 11.7, .2, 1)}}><SiteCard /></div>
    <div style={{position: 'absolute', inset: 0, backgroundColor: C.ink, clipPath: `inset(0 ${100 - content}% 0 0)`}}><ContentGrid /></div>
    <div style={{position: 'absolute', left: 82, top: 200, color: content > 55 || site > 55 ? C.paper : C.ink, fontSize: 38, fontWeight: 800}}>УВИДЕЛИ. ПОВЕРИЛИ.</div>
    <Label style={{color: content > 55 || site > 55 ? C.paper : C.ink}}>04 / 00:10—00:14</Label>
    <div style={{position: 'absolute', left: 82, bottom: 240, width: 916, height: 6, backgroundColor: C.blue}} />
  </PosterBase>;
};

const Chosen: React.FC = () => {
  const {second: s} = useTimeline();
  return <PosterBase>
    <div style={{position: 'absolute', inset: 0, width: `${move(s, 14, 14.62, 0, 68)}%`, backgroundColor: C.blue}} />
    <Label>05 / 00:14—00:16</Label>
    <div style={{position: 'absolute', left: 112, top: 360, width: 195, height: 170, opacity: move(s, 14.3, 14.7, 0, .46), scale: move(s, 14.6, 15.2, 1, .84)}}><MiniCompany active={false} dark /></div>
    <div style={{position: 'absolute', left: 382, top: 325, width: 260, height: 220, opacity: move(s, 14.45, 14.9, 0, 1), scale: move(s, 14.6, 15.2, .85, 1), boxShadow: '12px 14px 0 #101820', outline: `8px solid ${C.paper}`}}><MiniCompany active /></div>
    <div style={{position: 'absolute', left: 720, top: 360, width: 195, height: 170, opacity: move(s, 14.55, 15, 0, .46), scale: move(s, 14.7, 15.2, 1, .84)}}><MiniCompany active={false} /></div>
    <div style={{position: 'absolute', left: 661, top: 352, width: 40, height: 40, borderRadius: '50%', backgroundColor: C.ink, color: C.paper, display: 'grid', placeItems: 'center', fontSize: 25, fontWeight: 900, scale: move(s, 15.15, 15.45, 0, 1)}}>✓</div>
    <div style={{position: 'absolute', left: 82, top: 565, width: 925, overflow: 'hidden', clipPath: `inset(0 ${100 - move(s, 14.3, 14.9, 0, 100)}% 0 0)`}}>
      <Headline style={{fontSize: 260, color: C.paper}}>И</Headline>
    </div>
    <div style={{position: 'absolute', left: 82, top: 920, width: 925, overflow: 'hidden', clipPath: `inset(0 ${100 - move(s, 14.55, 15.15, 0, 100)}% 0 0)`}}>
      <Headline style={{fontSize: 165, color: C.ink}}>ВЫБРАЛИ.</Headline>
    </div>
    <Rule top={1440} color={C.ink} />
  </PosterBase>;
};

const Thesis: React.FC = () => {
  const {second: s, fps} = useTimeline();
  const accent = spring({frame: Math.max(0, Math.min((s - 16.72) * fps, (17.3 - 16.72) * fps)), fps, config: {damping: 25, stiffness: 100}});
  return <PosterBase>
    <Grid />
    <Label>06 / 00:16—00:18</Label>
    <div style={{position: 'absolute', left: 82, top: 295, color: C.ink, fontSize: 31, fontWeight: 700}}>ПОСЛЕДНИЙ ТЕЗИС</div>
    <RevealedLine text="КАЧЕСТВА" second={s} at={16.02} top={550} size={122} />
    <RevealedLine text="НЕДОСТАТОЧНО." second={s} at={16.16} top={680} size={96} />
    <RevealedLine text="НУЖНО БЫТЬ" second={s} at={16.43} top={960} size={105} />
    <div style={{position: 'absolute', left: 82, top: 1090, width: 930, height: 170, overflow: 'hidden'}}>
      <Headline style={{fontSize: 132, color: C.blue, translate: `0 ${(1 - accent) * 170}px`}}>ЗАМЕТНЫМ.</Headline>
    </div>
    <svg width="134" height="134" viewBox="0 0 134 134" style={{position: 'absolute', left: 838, top: 580}} fill="none" stroke={C.ink} strokeWidth="5" strokeLinecap="square">
      <path d="M15 15L119 119" strokeDasharray="148" strokeDashoffset={148 * (1 - move(s, 16.32, 16.58))} />
      <path d="M119 15L15 119" strokeDasharray="148" strokeDashoffset={148 * (1 - move(s, 16.54, 16.8))} />
    </svg>
    <svg width="150" height="130" viewBox="0 0 150 130" style={{position: 'absolute', left: 828, top: 1000}} fill="none" stroke={C.blue} strokeWidth="7" strokeLinecap="square" strokeLinejoin="miter">
      <path d="M12 68L54 106L138 17" pathLength="1" strokeDasharray="1" strokeDashoffset={1 - move(s, 16.72, 17.17)} />
    </svg>
    <Rule top={1520} color={C.ink} />
    <div style={{position: 'absolute', left: 82, top: 1540, fontSize: 28}}>00 — 18</div>
  </PosterBase>;
};

const Offer: React.FC = () => {
  const {second: s} = useTimeline();
  const services = ['ЗАПУСК БИЗНЕСА ОНЛАЙН', 'САЙТЫ', 'КАРТЫ', 'БРЕНД', 'КОНТЕНТ'];
  return <PosterBase>
    <Grid />
    <Label>07 / 00:18—00:22</Label>
    <div style={{position: 'absolute', left: 82, top: 300, fontSize: 30, fontWeight: 700, letterSpacing: 2}}>СЛЕДУЮЩИЙ ШАГ</div>
    <RevealedLine text="ХОТИТЕ БЫТЬ" second={s} at={18.17} top={445} size={112} />
    <RevealedLine text="ЗАМЕТНЫМИ?" second={s} at={18.43} top={590} size={108} color={C.blue} />
    <Rule top={785} color={C.ink} />
    <div style={{position: 'absolute', left: 82, top: 815, width: 916, display: 'grid', gridTemplateColumns: '1fr 1fr', borderTop: `2px solid ${C.ink}`}}>
      {services.map((service, i) => <div key={service} style={{height: i === 0 ? 170 : 125, gridColumn: i === 0 ? '1 / 3' : undefined, borderBottom: `2px solid ${C.ink}`, borderRight: i % 2 === 1 ? `2px solid ${C.ink}` : undefined, padding: '27px 18px 15px 0', boxSizing: 'border-box', overflow: 'hidden'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: 20, fontSize: i === 0 ? 36 : 35, fontWeight: 800, letterSpacing: .5, translate: `0 ${move(s, 18.75 + i * .15, 19.16 + i * .15, 100, 0)}px`}}>
          <svg width="36" height="24" viewBox="0 0 36 24" style={{flexShrink: 0}} fill="none" stroke={C.ink} strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter" aria-hidden="true"><path d="M2 12H32M23 3L32 12L23 21" /></svg>
          <span>{service}</span>
        </div>
      </div>)}
    </div>
    <div style={{position: 'absolute', left: 82, top: 1440, width: move(s, 20.25, 20.7, 0, 916), height: 112, backgroundColor: C.ink, overflow: 'hidden'}}>
      <div style={{color: C.paper, whiteSpace: 'nowrap', padding: '24px 34px', fontFamily: DISPLAY, fontSize: 62, fontWeight: 900, opacity: move(s, 20.62, 20.9, 0, 1)}}>НАПИШИТЕ МНЕ.</div>
    </div>
    <div style={{position: 'absolute', left: 82, top: 1585, width: 916, color: C.ink, fontSize: 28, fontWeight: 700, letterSpacing: 1, opacity: move(s, 20.75, 21.12, 0, 1)}}>ПОМОГУ ВЫВЕСТИ БИЗНЕС В ОНЛАЙН.</div>
  </PosterBase>;
};

export const DigitalVisibilityReel: React.FC = () => {
  const {second: s} = useTimeline();
  return <AbsoluteFill style={{backgroundColor: C.paper, fontFamily: FONT}}>
    <Hook />
    <AbsoluteFill style={{clipPath: `inset(0 ${100 - sweep(s, 2.78, 3.25, 0, 100)}% 0 0)`}}><Choice /></AbsoluteFill>
    <AbsoluteFill style={{clipPath: `inset(0 0 0 ${100 - sweep(s, 5.78, 6.25, 0, 100)}%)`}}><Search /></AbsoluteFill>
    <AbsoluteFill style={{clipPath: `inset(0 ${100 - sweep(s, 9.78, 10.25, 0, 100)}% 0 0)`}}><Seen /></AbsoluteFill>
    <AbsoluteFill style={{clipPath: `inset(0 0 0 ${100 - sweep(s, 13.78, 14.25, 0, 100)}%)`}}><Chosen /></AbsoluteFill>
    <AbsoluteFill style={{clipPath: `inset(0 ${100 - sweep(s, 15.78, 16.25, 0, 100)}% 0 0)`}}><Thesis /></AbsoluteFill>
    <AbsoluteFill style={{backgroundColor: C.blue, clipPath: `circle(${move(s, 17.74, 18.18, 0, 1480)}px at 65% 61%)`}} />
    <AbsoluteFill style={{clipPath: `circle(${move(s, 17.95, 18.42, 0, 1480)}px at 65% 61%)`}}><Offer /></AbsoluteFill>
  </AbsoluteFill>;
};
