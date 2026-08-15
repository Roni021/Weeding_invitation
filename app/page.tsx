// ============================================================
// Anindita & Rocky — WEDDING INVITATION
// Main Next.js page
//
// Structure:
// 01. Intro / Envelope
// 02. Navigation
// 03. Hero
// 04. Countdown
// 05. Couple
// 06. Story
// 07. Photo Story
// 08. Events
// 09. Venue
// 10. Save The Date
// 11. Gallery
// 12. Family
// 13. Travel
// 14. Dress Code
// 15. RSVP
// 16. Wishes
// 17. Hashtag / Sharing
// 18. Weather
// 19. Contact
// 20. Closing / Footer
// ============================================================

"use client";
import { weddingData,eventsData,galleryData,storyData } from "../data/wedding";
import { FormEvent, useEffect, useMemo, useRef, useState } from "react";

function SafeImage({ src, alt, className }: { src:string; alt:string; className?:string }) {
  const [current, setCurrent] = useState(src);
  return <img className={className} src={current} alt={alt} loading="lazy" onError={() => setCurrent("/images/story-1.png")} />;
}

function Reveal({ children, className="" }: { children:React.ReactNode; className?:string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setShow(true); obs.disconnect(); }
    }, { threshold: .12 });
    obs.observe(node);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={`${className} ${show ? "in" : ""}`}>{children}</div>;
}


export default function Home() {
  const [intro, setIntro] = useState(true);
const [opened, setOpened] = useState(false);
const [menu, setMenu] = useState(false);
const [scrolled, setScrolled] = useState(false);
const [progress, setProgress] = useState(0);
const [menuOpen, setMenuOpen] = useState(false);
const [filter, setFilter] = useState("all");
const [lightbox, setLightbox] = useState<number | null>(null);
const [attending, setAttending] = useState("");
const [selectedEvents, setSelectedEvents] = useState<string[]>([]);
const [rsvpSent, setRsvpSent] = useState(false);
const [wishes, setWishes] = useState([
  {name:"Riya & Kunal",message:"Wishing you both a lifetime of love, laughter and happiness."},
  {name:"The Kapoor Family",message:"May your bond grow stronger with each passing year. Congratulations!"},
  {name:"Simran",message:"Two beautiful souls, one beautiful journey ahead. So happy for you both."},
]);
const [music, setMusic] = useState(false);
const [shareOpen, setShareOpen] = useState(false);
//Petals animation
useEffect(() => {
  const container = document.getElementById("petals");

  if (!container) return;

  container.innerHTML = "";

  const count = window.innerWidth < 600 ? 12 : 24;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement("span");

    petal.className = "petal";

    const size = Math.random() * 8 + 5;
    const left = Math.random() * 100;
    const duration = Math.random() * 7 + 6;
    const delay = Math.random() * 8;
    const drift = Math.random() * 160 - 80;

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.5}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty("--drift", `${drift}px`);

    container.appendChild(petal);
  }

  return () => {
    container.innerHTML = "";
  };
}, []);
//subtle parallax effect
useEffect(() => {
  const handleParallax = () => {
    const hero = document.querySelector(".hero-bg") as HTMLElement;

    if (hero) {
      const offset = window.scrollY * 0.18;
      hero.style.transform = `scale(1.08) translateY(${offset}px)`;
    }
  };

  window.addEventListener("scroll", handleParallax, {
    passive: true,
  });

  return () => {
    window.removeEventListener("scroll", handleParallax);
  };
}, []);
//Reveal animations
useEffect(() => {
  const elements = document.querySelectorAll(
    ".reveal, .reveal-left, .reveal-right, .reveal-scale"
  );

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -60px 0px",
    }
  );

  elements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);
//Countdown timer
const weddingDate = new Date("2026-11-27T18:00:00").getTime();

const [countdown, setCountdown] = useState({
  days: 0,
  hours: 0,
  mins: 0,
  secs: 0,
  today: false,
});

useEffect(() => {
  const updateCountdown = () => {
    const distance = weddingDate - Date.now();

    if (distance <= 0) {
      setCountdown({
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        today: true,
      });
      return;
    }

    setCountdown({
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
      mins: Math.floor((distance / (1000 * 60)) % 60),
      secs: Math.floor((distance / 1000) % 60),
      today: false,
    });
  };

  updateCountdown();

  const timer = setInterval(updateCountdown, 1000);

  return () => clearInterval(timer);
}, []);

const audioRef = useRef<HTMLAudioElement>(null);

// ============================================================
// INTRO
// ============================================================

const enter = () => {
  setOpened(true);
  setTimeout(() => {
    setIntro(false);
  }, 800);
};

// ============================================================
// SCROLL PROGRESS
// ============================================================

useEffect(() => {
  const onScroll = () => {
    setScrolled(window.scrollY > 40);

    const h =
      document.documentElement.scrollHeight - window.innerHeight;

    setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
  };

  window.addEventListener("scroll", onScroll, { passive: true });

  onScroll();

  return () => {
    window.removeEventListener("scroll", onScroll);
  };
}, []);

// ============================================================
// GOOGLE CALENDAR
// ============================================================

const calendarUrl = (
  title: string,
  date: string,
  time: string,
  venue: string
) =>
  `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(`Wedding event: ${title}`)}&location=${encodeURIComponent(venue)}`;

// ============================================================
// DOWNLOAD ICS
// ============================================================

const downloadICS = () => {
  const event = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Anindita & Rocky Wedding//EN
BEGIN:VEVENT
UID:Anindita-Rocky-wedding-2026@example.com
DTSTART:2027127T100000
DTEND:20271127T130000
SUMMARY:Anindita & Rocky Wedding
DESCRIPTION:Wedding ceremony of Anindita and Rocky
LOCATION:West Bengal, India
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([event], {
    type: "text/calendar;charset=utf-8",
  });

  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = "Anindita-Rocky-wedding.ics";

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
};

// ============================================================
// GALLERY
// ============================================================

const visibleGallery =
  filter === "all"
    ? galleryData
    : galleryData.filter((item) => item.cat === filter);

// ============================================================
// RSVP
// ============================================================

const submitRSVP = (e: FormEvent) => {
  e.preventDefault();
  setRsvpSent(true);
};

// ============================================================
// WISHES
// ============================================================

const addWish = (e: FormEvent) => {
  e.preventDefault();
  alert("Thank you for your wishes!");
};

// ============================================================
// SHARE
// ============================================================

const share=(platform:string)=>{const url=window.location.href,text=`Join Anindita & Rocky's wedding! ${url}`;
if(platform==="whatsapp")window.open(`https://wa.me/?text=${encodeURIComponent(text)}`,"_blank");
else if(platform==="facebook")window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,"_blank");
else if(platform==="x")window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,"_blank");};

// ============================================================
// COPY LINK
// ============================================================

const copy=async(text:string)=>{await navigator.clipboard.writeText(text);alert("Hashtag copied!");};

// ============================================================
// MUSIC
// ============================================================

const toggleMusic = async () => {
  if (!audioRef.current) return;

  if (music) {
    audioRef.current.pause();
    setMusic(false);
  } else {
    try {
      await audioRef.current.play();
      setMusic(true);
    } catch {
      setMusic(false);
    }
  }
};

// ============================================================
// PAGE RENDER
// ============================================================

return (
    <>
      {/* ========================================================
          GLOBAL UI
          ======================================================== */}
      <div id="scroll-progress" style={{width:`${progress}%`}} />

      {/* ========================================================
          01. INTRO / ENVELOPE
          ======================================================== */}
{intro && <div id="intro" className={opened ? "opened hide" : ""}>
        <div className="intro-inner">
          <p className="eyebrow">You Are Invited</p>
          <div className="envelope">
            <div className="env-body" /><div className="env-card">With love, we invite you</div>
            <div className="env-flap" /><div className="env-seal">A&R</div>
          </div>
          <h1 className="intro-names">Anindita <span className="intro-amp">&amp;</span> Rocky</h1>
          <p className="intro-date">27th November 2026 &nbsp;•&nbsp; Pandua, West Bengal</p>
          <div className="intro-actions">
            <button className="btn btn-solid" onClick={enter}>Enter Invitation</button>
            <button className="link-skip" onClick={() => setIntro(false)}>Skip Intro</button>
          </div>
        </div>
      </div>}

      
      {/* ========================================================
          02. NAVIGATION
          ======================================================== */}
<nav id="navbar" className={scrolled ? "scrolled" : ""}>
        <a href="#hero" className="nav-mark">A&nbsp;&amp;&nbsp;R</a>
        <ul className="nav-links">
          {["Home","Story","Events","Venue","Gallery","RSVP"].map(x => <li key={x}><a href={`#${x==="Home"?"hero":x.toLowerCase()}`} className="active">{x}</a></li>)}
        </ul>
        <button className={`nav-toggle ${menu ? "open":""}`} onClick={()=>setMenu(!menu)} aria-label="Menu"><span/><span/><span/></button>
      </nav>
      
       {/* ========================================================
          Mobile Navigation Menu
          ======================================================== */}
          <div id="mobile-nav" className={menu ? "open" : ""}>
  <button
    className="mobile-nav-close"
    onClick={() => setMenu(false)}
    aria-label="Close navigation"
  >
    ×
  </button>

  <nav className="mobile-nav-links">
    {["Home", "Story", "Events", "Venue", "Gallery", "RSVP"].map((x) => (
      <a
        key={x}
        href={`#${x === "Home" ? "hero" : x.toLowerCase()}`}
        onClick={() => setMenu(false)}
      >
        {x}
      </a>
    ))}
  </nav>
</div>
      
      {/* ========================================================
          03. HERO
          ======================================================== */}
<section id="hero">
        <div className="hero-bg" />
        <div id="petals" />
        <div className="hero-content">
          <p className="eyebrow reveal in">Together With Their Families</p>
          <p className="hero-family reveal in">we joyfully invite you</p>
          <h1 className="hero-names reveal in">Anindita<span className="hero-amp">&amp;</span>Rocky</h1>
          <p className="hero-tag reveal in">are getting married</p>
          <div className="hero-meta reveal in"><span>📅 27th November 2026</span><span>📍 Pandua , West Bengal</span></div>
          <a href="#story" className="hero-scroll">Explore Our Story ↓</a>
        </div>
      </section>

      
      {/* ========================================================
          04. COUNTDOWN
          ======================================================== */}
<section id="countdown" className="section">
        <div className="container">
          <p className="eyebrow center reveal">The Big Day</p><h2 className="section-title reveal">Our Countdown To Forever</h2>
          <p className="section-sub reveal">27th November 2026 · Pandua, West Bengal</p>
          {!countdown.today ? <div className="count-grid reveal-scale">
            {[["days",countdown.days],["hours",countdown.hours],["mins",countdown.mins],["secs",countdown.secs]].map(([label,val]) =>
              <div className="count-box" key={label}><div className="count-num">{val}</div><div className="count-label">{label === "mins" ? "Minutes" : label === "secs" ? "Seconds" : String(label)[0].toUpperCase() + String(label).slice(1)}</div></div>)}
          </div> : <p className="count-today">Today Is The Day! ❤️</p>}
        </div>
      </section>

      
      {/* ========================================================
          05. COUPLE
          ======================================================== */}
<section id="couple" className="section">
        <div className="container">
          <p className="eyebrow center reveal">Meet</p><h2 className="section-title reveal">The Couple</h2><div className="divider reveal"><span className="line"/><span>♥</span><span className="line"/></div>
          <div className="couple-grid">
            <div className="profile-card reveal-left"><div className="profile-photo"><SafeImage src={weddingData.bride.image} alt="Anindita"/></div><div className="profile-body">
              <h3>Anindita</h3><p className="profile-role">The Bride</p><p className="profile-bio">A lover of old libraries, monsoon evenings and her grandmother's recipes. Anindita finds joy in painting, curating playlists for every mood, and long conversations over chai.</p>
              <div className="profile-hobbies"><span className="chip">Painting</span><span className="chip">Classical Dance</span><span className="chip">Cooking</span></div>
            </div></div>
            <div className="heart-between reveal">♥</div>
            <div className="profile-card reveal-right"><div className="profile-photo"><SafeImage src={weddingData.groom.image} alt="Rocky"/></div><div className="profile-body">
              <h3>Rocky</h3><p className="profile-role">The Groom</p><p className="profile-bio">An doctor by profession and a dreamer at heart. Rocky loves cricket on Sunday mornings, exploring hidden cafes, and planning the next big adventure with Anindita.</p>
              <div className="profile-hobbies"><span className="chip">Doctor</span><span className="chip">Cricket</span><span className="chip">Travel</span></div>
            </div></div>
          </div>
        </div>
      </section>

      
      {/* ========================================================
          06. OUR STORY
          ======================================================== */}
<section id="story" className="section" style={{background:"var(--ivory-deep)"}}>
        <div className="container"><p className="eyebrow center reveal">Our Journey</p><h2 className="section-title reveal">Our Story</h2><p className="section-sub reveal">Every love story is beautiful, but ours is our favourite.</p>
          <div className="timeline">
            {[
              ["August 2019","The First Meeting","A mutual friend's birthday party, a shared laugh over spilled coffee — and a conversation that lasted till the lights came on.","/images/story/story-1.png"],
              ["September 2019","The First Conversation","What started as \"just checking in\" turned into hours of texting about everything and nothing at all.","/images/story/story-1.png"],
              ["November 2019","The First Date","Dinner at a tiny rooftop café overlooking the city lights — neither of us wanted the evening to end.","/images/story/story-1.png"],
              ["March 2024","The Proposal","On a quiet hilltop at sunset, with the sky turning gold, Rocky finally asked the question — and Anindita said yes before he finished it.","/images/story/story-2.png"],
              ["October 2025","The Engagement","Surrounded by both families, we celebrated the promise of forever with laughter, tears and way too many photographs.","/images/events/engagement.png"],
              ["27 November 2026","The Wedding","And now, the chapter we've been waiting for — where we say \"I do\" surrounded by everyone we love.","/images/events/wedding.png"]
            ].map((s,i)=><div className={`tl-item ${i%2?"reveal-right":"reveal-left"}`} key={s[1]}><div className="tl-dot"/><div className="tl-card"><div className="tl-photo"><SafeImage src={s[3]} alt={s[1]}/></div><p className="tl-date">{s[0]}</p><h4>{s[1]}</h4><p>{s[2]}</p></div></div>)}
          </div>
        </div>
      </section>

      
      {/* ========================================================
          07. PHOTO STORY
          ======================================================== */}
<section id="photostory" className="section"><div className="container">
        {[["/images/couple/couple-1.jpg","And then, everything changed."],["/images/couple/couple-2.jpg","Two hearts. One journey."],["/images/story/story-1.jpg","A thousand memories, one beautiful story."]].map((x,i)=><div className="photostory-block" key={x[1]}><div className={`ps-img ${i%2?"reveal-right":"reveal-left"}`}><SafeImage src={x[0]} alt={x[1]}/></div><div className={`ps-text ${i%2?"reveal-left":"reveal-right"}`}><p className="script">"{x[1]}"</p></div></div>)}
      </div></section>

      
      {/* ========================================================
          08. WEDDING EVENTS
          ======================================================== */}
      <section
  id="events"
  className="section"
  style={{ background: "var(--ivory-deep)" }}
>
  <div className="container">

    <p className="eyebrow center reveal">
      Join Us For
    </p>

    <h2 className="section-title reveal">
      The Wedding Celebrations
    </h2>

    <p className="section-sub reveal">
      Three days of colour, music and joy — we can't wait to share them with you.
    </p>

    <div className="events-grid">

      {eventsData.map(ev => (
        <div className="event-card reveal" key={ev.title}>

          <div className="event-img">
            <SafeImage src={ev.img} alt={ev.title} />
            <div className="event-icon">{ev.icon}</div>
          </div>

          <div className="event-body">

            <h3>{ev.title}</h3>

            <div className="event-meta">
              📅 {ev.date} &nbsp; ⏰ {ev.time}
            </div>

            <div className="event-meta">
              📍 {ev.venue}
            </div>

            <p className="event-desc">
              {ev.desc}
            </p>

            <span className="event-dress">
              {ev.dress}
            </span>

            <div className="event-actions">

              <a
                className="pill-btn"
                href={ev.mapsUrl}
                target="_blank"
                rel="noreferrer"
              >
                View Location
              </a>

              <a
                className="pill-btn"
                href={calendarUrl(
                  ev.title,
                  ev.date,
                  ev.time,
                  ev.venue
                )}
                target="_blank"
                rel="noreferrer"
              >
                Add To Calendar
              </a>

            </div>

          </div>
        </div>
      ))}

    </div>
  </div>
</section>

      
      {/* ========================================================
          09. VENUE
          ======================================================== */}
<section id="venue" className="section"><div className="container"><p className="eyebrow center reveal">Where We Celebrate</p><h2 className="section-title reveal">The Venue</h2>
        <div className="venue-wrap"><div className="venue-photo reveal-left"><SafeImage src="/images/venue/venue.jpg" alt="Fateh Bagh Palace"/></div><div className="venue-info reveal-right"><h3>Aponjon Marriage Hall</h3><p className="venue-addr">{weddingData.wedding.address}</p>
          <div className="venue-facts"><div className="venue-fact"><h5>Parking</h5><p>Complimentary valet parking available on-site.</p></div><div className="venue-fact"></div><div className="venue-fact"><h5>Transport</h5><p>Easy transpotation from Pandua railway station.</p></div><div className="venue-fact"><h5>Dress</h5><p>Traditional attire recommended for palace grounds.</p></div></div>
          <a href={weddingData.wedding.mapsUrl} target="_blank" rel="noreferrer" className="btn btn-solid" style={{borderColor:"var(--maroon)",background:"var(--maroon)",color:"var(--ivory)"}}>Get Directions →</a>
          <div className="map-frame"><iframe
  src="https://www.google.com/maps?q=23.0746319,88.2729102&output=embed"
  loading="lazy"
  allowFullScreen
  title="Aponjon Marriage Hall map"
/></div>
        </div></div>
      </div></section>

      
      {/* ========================================================
          10. SAVE THE DATE
          ======================================================== */}
<section id="savedate" className="section"><div className="container"><p className="eyebrow center reveal" style={{color:"var(--gold-light)"}}>Mark Your Calendar</p><h2 className="section-title reveal">Save The Date</h2>
        <div className="calendar-card reveal-scale"><div className="calendar-top">November</div><div className="calendar-day">27</div><div className="calendar-bottom">Tuesday, 2026</div></div>
        <div className="reveal" style={{display:"flex",gap:14,justifyContent:"center",flexWrap:"wrap"}}><a href={calendarUrl("Anindita & Rocky Wedding","27 Nov 2026","10:00 AM",weddingData.wedding.venue)} className="btn btn-solid" target="_blank" rel="noreferrer">Add To Google Calendar</a><button onClick={downloadICS} className="btn">Download .ics</button></div>
      </div></section>

      
      {/* ========================================================
          11. GALLERY
          ======================================================== */}
<section id="gallery" className="section"><div className="container"><p className="eyebrow center reveal">Frame By Frame</p><h2 className="section-title reveal">Captured Moments</h2>
        <div className="gallery-filters reveal">{["all","us","pre-wedding","family","memories"].map(f=><button key={f} className={`filter-btn ${filter===f?"active":""}`} onClick={()=>setFilter(f)}>{f==="pre-wedding"?"Pre-Wedding":f[0].toUpperCase()+f.slice(1)}</button>)}</div>
        <div className="masonry">{visibleGallery.map((g,i)=><div className="g-item" key={g.src} onClick={()=>setLightbox(galleryData.indexOf(g))}><SafeImage src={g.src} alt={g.cap}/><div className="g-cap">{g.cap}</div></div>)}</div>
      </div></section>

      
      {/* Gallery lightbox */}
{lightbox !== null && <div id="lightbox" className="open" onClick={e=>{if(e.target===e.currentTarget)setLightbox(null)}}><button className="lb-close" onClick={()=>setLightbox(null)}>&times;</button><button className="lb-prev" onClick={()=>setLightbox((lightbox-1+galleryData.length)%galleryData.length)}>&#8249;</button><div><SafeImage src={galleryData[lightbox].src} alt={galleryData[lightbox].cap}/><p className="lb-cap">{galleryData[lightbox].cap}</p></div><button className="lb-next" onClick={()=>setLightbox((lightbox+1)%galleryData.length)}>&#8250;</button></div>}

      
      {/* ========================================================
          12. FAMILY
          ======================================================== */}
<section id="family" className="section"><div className="container"><p className="eyebrow center reveal">With The Blessings Of</p><h2 className="section-title reveal">Our Families</h2>
        <div className="family-grid"><div className="family-card reveal-left"><div className="family-photo"><SafeImage src="/images/family/bride-family.jpg" alt="Bride's family"/></div><div className="family-body"><h4>Bride's Family</h4><h3>Mr. Tapas &amp; Mrs. Kalyani Biswas</h3><p>"We are overjoyed to welcome Rocky into our family and can't wait to celebrate this beautiful union with all of you."</p></div></div>
        <div className="family-card reveal-right"><div className="family-photo"><SafeImage src="/images/family/groom-family.jpg" alt="Groom's family"/></div><div className="family-body"><h4>Groom's Family</h4><h3>Mr. Rabi &amp; Mrs. Kabita Singh</h3><p>"Anindita has brought so much light into our lives. We're grateful to begin this new chapter surrounded by loved ones."</p></div></div></div>
      </div></section>

      
      {/* ========================================================
          13. TRAVEL INFORMATION
          ======================================================== */}
<section id="travel" className="section" style={{background:"var(--ivory-deep)"}}><div className="container"><p className="eyebrow center reveal">Plan Your Trip</p><h2 className="section-title reveal">Getting There</h2>
        <div className="travel-grid">{[["🚆","By Train","Pandua Railway Station, 1 km from venue. Well connected to major cities."],["🚗","By Road","Easy access from GT Road, Pandua, with convenient parking facilities available at the venue."],["🅿️","Parking","Complimentary parking for 150+ vehicles with dedicated attendants."],["🏨","Stay","Special rooms reserved by the Groom’s family for our guests."]].map(t=><div className="travel-card reveal" key={t[1]}><h4>{t[0]} {t[1]}</h4><p>{t[2]}</p></div>)}</div>
        <div className="travel-actions reveal"><a href={weddingData.wedding.mapsUrl} target="_blank" rel="noreferrer" className="pill-btn">Get Directions</a>
        {/* <a href="https://www.google.com/travel/hotels/Udaipur" target="_blank" rel="noreferrer" className="pill-btn">View Hotels</a> */}
        </div>
      </div></section>

      
      {/* ========================================================
          14. DRESS CODE
          ======================================================== */}
<section id="dresscode" className="section"><div className="container"><p className="eyebrow center reveal">Come Dressed To Celebrate</p><h2 className="section-title reveal">Match your vibe</h2>
        <div className="dress-grid">{[["#E7B94C","Haldi","Bright yellows & florals. Casual, comfortable & fun."],["#2E7D64","Mehendi","Vibrant greens, pastels & playful prints."],["#8C1D2B","Wedding","Traditional Indian formals — reds, maroons & gold."],["#1B2A4A","Reception","Elegant evening wear — jewel tones encouraged."]].map(d=><div className="dress-card reveal" key={d[1]}><div className="dress-swatch" style={{background:d[0]}}/><h4>{d[1]}</h4><p>{d[2]}</p></div>)}</div>
      </div></section>

      
      {/* ========================================================
          15. RSVP
          ======================================================== */}
<section id="rsvp" className="section"><div className="container"><p className="eyebrow center reveal">Kindly Respond</p><h2 className="section-title reveal">Will You Join Us?</h2><p className="section-sub reveal">Your presence would mean the world to us.</p>
        {!rsvpSent ? <form className="rsvp-form reveal-scale" onSubmit={submitRSVP}><div className="form-row"><div className="field"><label>Full Name</label><input name="name" required/></div><div className="field"><label>Email</label><input name="email" type="email" required/></div></div>
        <div className="form-row"><div className="field"><label>Phone</label><input name="phone" type="tel" required/></div><div className="field"><label>Number Of Guests</label><select name="guests"><option>1</option><option>2</option><option>3</option><option>4</option><option>5+</option></select></div></div>
        <div className="field"><label>Attending?</label><div className="attend-toggle"><button type="button" className={`attend-opt ${attending==="yes"?"selected":""}`} onClick={()=>setAttending("yes")}>Yes, I'll be there</button><button type="button" className={`attend-opt ${attending==="no"?"selected":""}`} onClick={()=>setAttending("no")}>Sadly, can't make it</button></div></div>
        <div className="field"><label>Events Attending</label><div className="event-checks">{["haldi","mehendi","sangeet","wedding","reception"].map(x=><button type="button" key={x} className={`event-check ${selectedEvents.includes(x)?"selected":""}`} onClick={()=>setSelectedEvents(p=>p.includes(x)?p.filter(v=>v!==x):[...p,x])}>{x[0].toUpperCase()+x.slice(1)}</button>)}</div></div>
        <div className="field"><label>Dietary Preference</label><select name="diet"><option>Vegetarian</option><option>Non-Vegetarian</option><option>Vegan</option><option>Jain</option><option>Other</option></select></div>
        <div className="field"><label>Message For Us</label><textarea name="message" rows={3} placeholder="Leave a note for the couple..."/></div>
        <button type="submit" className="btn rsvp-submit">Confirm Attendance ❤️</button></form> :
        <div id="rsvp-success" className="show"><div className="success-heart">❤️</div><h3 style={{color:"var(--maroon-deep)",marginTop:10}}>Thank You!</h3><p style={{color:"var(--ink-soft)",marginTop:8}}>We can't wait to celebrate with you.</p></div>}
      </div></section>

      
      {/* ========================================================
          16. GUEST WISHES
          ======================================================== */}
<section id="wishes" className="section"><div className="container"><p className="eyebrow center reveal">Words Of Love</p><h2 className="section-title reveal">Leave Your Blessings</h2>
        <form className="wish-form reveal" onSubmit={addWish}><div className="field"><label>Name</label><input name="wishName" required/></div><div className="field"><label>Message</label><textarea name="wishMessage" rows={2} required/></div><button type="submit" className="btn btn-solid" style={{alignSelf:"center",background:"var(--maroon)",borderColor:"var(--maroon)",color:"var(--ivory)"}}>Send Blessing</button></form>
        <div className="wishes-wall">{wishes.map((w,i)=><div className="wish-card" key={`${w.name}-${i}`}><p>"{w.message}"</p><span>— {w.name}</span></div>)}</div>
      </div></section>

      
      {/* ========================================================
          17. HASHTAG / SOCIAL SHARING
          ======================================================== */}
<section id="hashtag" className="section"><div className="container center"><p className="eyebrow" style={{color:"var(--gold-light)"}}>Share The Love</p><h2 className="hashtag-big reveal-scale">{weddingData.hashtag}</h2><button className="btn" onClick={()=>copy(weddingData.hashtag)}>Copy Hashtag</button>
        <div className="social-row"><button className="social-circle" onClick={()=>share("whatsapp")}>🟢</button><button className="social-circle" onClick={()=>share("facebook")}>📘</button><button className="social-circle" onClick={()=>share("x")}>✖️</button></div>
      </div></section>

      
      {/* ========================================================
          18. WEATHER
          ======================================================== */}
<section id="weather" className="section" style={{background:"var(--ivory-deep)"}}><div className="container"><p className="eyebrow center reveal">Good To Know</p><h2 className="section-title reveal">Wedding Day Weather</h2>
        <div className="weather-grid reveal">{[["🌤","24°C","Temperature"],["☔","10%","Rain Chance"],["💧","42%","Humidity"],["🌡","Clear","Condition"]].map(w=><div className="weather-item" key={w[2]}><div className="wicon">{w[0]}</div><div className="wval">{w[1]}</div><div className="wlabel">{w[2]}</div></div>)}</div><p className="weather-note reveal">Forecast is indicative — connect a live weather API for real-time updates closer to the date.</p>
      </div></section>

      
      {/* ========================================================
          19. CONTACT
          ======================================================== */}
<section id="contact" className="section"><div className="container"><p className="eyebrow center reveal">Need Help?</p><h2 className="section-title reveal">Get In Touch</h2><div className="contact-grid">
        <div className="contact-card reveal-left"><h4>Bride's Family</h4><p>+91 98765 xxxxx</p><div className="contact-actions"><a href="tel:+919876xxxxx" className="pill-btn">Call</a><a href="https://wa.me/919876543210" target="_blank" rel="noreferrer" className="pill-btn">WhatsApp</a></div></div>
        <div className="contact-card reveal-right"><h4>Groom's Family</h4><p>+91 91234 xxxxx</p><div className="contact-actions"><a href="tel:+919123xxxxx" className="pill-btn">Call</a><a href="https://wa.me/919123456789" target="_blank" rel="noreferrer" className="pill-btn">WhatsApp</a></div></div>
      </div></div></section>

      
      {/* ========================================================
          20. CLOSING + FOOTER
          ======================================================== */}
<section id="closing"><div className="closing-bg"/><div className="closing-content"><h2 className="reveal">Anindita &amp; Rocky</h2><span className="script reveal">"Forever begins here."</span><p className="closing-date reveal">27th November 2026</p><p className="closing-thanks reveal">Thank you for being a part of our journey. ❤️</p></div></section>
      <footer><span className="script">Anindita &amp; Rocky</span>With love, always. · #AninditaMeetsRocky</footer>

      
      {/* ========================================================
          FLOATING CONTROLS
          ======================================================== */}
<button id="back-to-top" className={scrolled ? "show":""} onClick={()=>window.scrollTo({top:0,behavior:"smooth"})} aria-label="Back to top">↑</button>

      <div id="music-player" className={music ? "playing":""}><button className="music-toggle" onClick={toggleMusic}>♫</button><span className="music-info">Our Song — Track 01</span><audio ref={audioRef} loop preload="none"><source src="/audio/our-song.mp3" type="audio/mpeg"/></audio></div>

      <div id="share-fab" className={shareOpen ? "open":""}><div className="share-options"><button className="share-opt" onClick={()=>share("whatsapp")}>🟢</button><button className="share-opt" onClick={()=>share("copy")}>🔗</button>
     <button
  className="share-opt"
  onClick={() =>
    navigator.share?.({
      title: document.title,
      text: "Join Anindita & Rocky's wedding!",
      url: window.location.href,
    })
  }
>
  ↗</button></div><button className="share-main" onClick={()=>setShareOpen(!shareOpen)}>↗</button></div>
    
    </>
  );
}
