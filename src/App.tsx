import {useEffect,useMemo,useState} from 'react'
import {ArrowUpRight,ChevronLeft,ChevronRight,Menu,X,MoveUpRight} from 'lucide-react'

type Project={name:string;type:string;year:string;location:string;image:string;description:string}
const projects:Project[]=[
{name:'Casa Nera',type:'Residential',year:'2026',location:'Alibaug, India',image:'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1500&q=90',description:'A quiet coastal residence organized around shadow, stone and framed garden views.'},
{name:'Monsoon House',type:'Residential',year:'2025',location:'Goa, India',image:'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1500&q=90',description:'Tropical modernism softened by deep verandas, rain gardens and natural textures.'},
{name:'Atelier 17',type:'Commercial',year:'2025',location:'Mumbai, India',image:'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1500&q=90',description:'A creative workplace where circulation, daylight and crafted joinery define the experience.'},
{name:'Courtyard 09',type:'Residential',year:'2024',location:'Pune, India',image:'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1500&q=90',description:'A compact urban home that turns inward, creating a private garden at its center.'},
{name:'The Form House',type:'Interior',year:'2024',location:'Bengaluru, India',image:'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1500&q=90',description:'Warm minimal interiors built from oak, limewash, brushed metal and collected objects.'},
{name:'Lumen Gallery',type:'Commercial',year:'2023',location:'New Delhi, India',image:'https://images.unsplash.com/photo-1511818966892-d7d671e672a2?auto=format&fit=crop&w=1500&q=90',description:'A gallery conceived as a sequence of light-filled rooms and precise thresholds.'}
]
const filters=['All','Residential','Commercial','Interior']

function App(){
 const [filter,setFilter]=useState('All')
 const [active,setActive]=useState<number|null>(null)
 const [menu,setMenu]=useState(false)
 const [scrolled,setScrolled]=useState(false)
 const visible=useMemo(()=>filter==='All'?projects:projects.filter(p=>p.type===filter),[filter])
 useEffect(()=>{
  const onScroll=()=>setScrolled(window.scrollY>30); window.addEventListener('scroll',onScroll,{passive:true})
  const els=[...document.querySelectorAll('.reveal')]
  const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');io.unobserve(e.target)}}),{threshold:.08,rootMargin:'0px 0px -35px 0px'})
  els.forEach(e=>io.observe(e))
  return()=>{window.removeEventListener('scroll',onScroll);io.disconnect()}
 },[])
 const go=(id:string)=>{document.getElementById(id)?.scrollIntoView({behavior:'smooth'});setMenu(false)}
 return <div className="site">
  <header className={`nav ${scrolled?'solid':''}`}>
   <button className="logo" onClick={()=>go('home')}><span className="logo-box">A</span><span>ATRIA<span className="thin"> / STUDIO</span></span></button>
   <nav>{['Work','Studio','Services'].map(x=><button key={x} onClick={()=>go(x.toLowerCase())}>{x}</button>)}<button className="contact-btn" onClick={()=>go('contact')}>Start a project <ArrowUpRight size={15}/></button></nav>
   <button className="menu" onClick={()=>setMenu(v=>!v)} aria-label="Menu">{menu?<X/>:<Menu/>}</button>
  </header>
  {menu&&<div className="mobile-nav">{['Work','Studio','Services','Contact'].map(x=><button key={x} onClick={()=>go(x.toLowerCase())}>{x}</button>)}</div>}
  <main id="home">
   <section className="hero">
    <div className="hero-bg"/>
    <div className="hero-shade"/>
    <div className="hero-copy reveal"><p className="overline">ARCHITECTURE · INTERIORS · INDIA</p><h1>Spaces that<br/><i>feel inevitable.</i></h1><p className="lead">Atria is an independent architecture studio creating calm, characterful places through light, proportion and material.</p><button className="hero-link" onClick={()=>go('work')}>Explore selected work <MoveUpRight size={16}/></button></div>
    <div className="hero-index">01 <span>/</span> 06</div>
    <div className="scroll">SCROLL TO EXPLORE <span/></div>
   </section>

   <section className="manifesto reveal" id="studio"><div className="tiny">01 — STUDIO</div><div><h2>Less noise.<br/><i>More meaning.</i></h2><p>We design architecture that earns attention slowly. Our work begins with the site, the climate and the lives that will happen inside it — then removes everything that does not belong.</p><p>From private homes to hospitality and workspaces, every project is a conversation between structure, material and light.</p><button className="line-link" onClick={()=>go('services')}>How we work <ArrowUpRight size={15}/></button></div></section>

   <section className="work" id="work"><div className="section-top reveal"><div><span className="tiny">02 — SELECTED WORK</span><h2>Recent <i>projects.</i></h2></div><span className="count">{String(visible.length).padStart(2,'0')} projects</span></div>
    <div className="filters reveal">{filters.map(f=><button key={f} className={filter===f?'active':''} onClick={()=>setFilter(f)}>{f}</button>)}</div>
    <div className="project-grid">{visible.map((p,i)=><button key={p.name} className={`project reveal p${i+1}`} onClick={()=>setActive(projects.indexOf(p))}><div className="project-img"><img src={p.image} alt={p.name}/><span>View project <ArrowUpRight size={14}/></span></div><div className="project-info"><div><h3>{p.name}</h3><p>{p.type} · {p.location}</p></div><strong>{p.year}</strong></div></button>)}</div>
   </section>

   <section className="statement reveal"><div className="statement-number">A/03</div><h2>“Architecture is not<br/>about making objects.<br/><i>It is about making room<br/>for life.</i>”</h2><p>— Atria Studio</p></section>

   <section className="services reveal" id="services"><div className="tiny">03 — SERVICES</div><div className="service-list">
    {['Architecture','Interior Architecture','Hospitality & Retail','Brand Environments'].map((s,i)=><div className="service" key={s}><span>0{i+1}</span><h3>{s}</h3><ArrowUpRight size={18}/></div>)}
   </div></section>

   <section className="contact reveal" id="contact"><div><span className="tiny">04 — LET'S TALK</span><h2>Have a space<br/><i>in mind?</i></h2><p>Tell us a little about your project. We will get back to you within two working days.</p></div><form onSubmit={e=>{e.preventDefault();alert('Thank you. Your project enquiry has been received.')}}><input required placeholder="Your name"/><input required type="email" placeholder="Email address"/><input placeholder="Project location"/><textarea required rows={4} placeholder="Tell us about the project..."/><button type="submit">Send enquiry <ArrowUpRight size={16}/></button></form></section>
  </main>
  <footer><div className="footer-logo">ATRIA / STUDIO</div><div>Mumbai · Goa · Everywhere<br/><span>hello@atriastudio.example</span></div><div>© 2026 Atria Studio</div></footer>
  {active!==null&&<div className="modal" role="dialog" aria-modal="true" onClick={()=>setActive(null)}><button className="close" onClick={()=>setActive(null)} aria-label="Close"><X/></button><button className="modal-prev" onClick={e=>{e.stopPropagation();setActive((active-1+projects.length)%projects.length)}}><ChevronLeft/></button><div className="modal-card" onClick={e=>e.stopPropagation()}><img src={projects[active].image} alt={projects[active].name}/><div><span>{projects[active].type} · {projects[active].year}</span><h2>{projects[active].name}</h2><p>{projects[active].description}</p><small>{projects[active].location}</small></div></div><button className="modal-next" onClick={e=>{e.stopPropagation();setActive((active+1)%projects.length)}}><ChevronRight/></button></div>}
 </div>
}
export default App