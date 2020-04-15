
const vw = window.innerWidth;
const vh = window.innerHeight;

const textures = document.querySelectorAll(".star");
const main = document.querySelector("main");
const frag = document.createDocumentFragment();

const appearMin = 0.3;
const appearMax = 0.8;

const delayMin = 2;
const delayMax = 6;

const durationMin = 0.3;
const durationMax = 1;

const numAnimations = 50;
const numStars = 300;

const stars = [];
const eases = [];

for (var i = 0; i < numAnimations; i++) {
  
  const ease = new RoughEase({ 
    template:  Linear.easeNone, 
    strength: random(1, 3), 
    points: random(50, 200)|0, 
    taper: "both", 
    randomize: true, 
    clamp: true
  });
  
  eases.push(ease);
}

// Wait for images to load
window.addEventListener("load", onLoad);

function onLoad() {
    
  for (var i = 0; i < numStars; i++) {
    stars.push(createStar());
  }
  
  main.appendChild(frag);
}

function createStar() {
 
  const index = random(textures.length)|0;
  const star = textures[index].cloneNode(true);
  frag.appendChild(star);
  
  TweenLite.set(star, {
    rotation: random(360),
    xPercent: -50,
    yPercent: -50,
    scale: 0,
    x: random(vw),
    y: random(vh),
  });
  
  const tl = new TimelineMax({ repeat: -1, yoyo: true });
   
  for (var i = 0; i < numAnimations; i++) {
    
    const ease1 = eases[random(numAnimations)|0];
    const ease2 = eases[random(numAnimations)|0];
    
    const alpha = random(0.7, 1);
    const scale = random(0.15, 0.4);
    
    const appear = "+=" + random(appearMin, appearMax);
    const delay = "+=" + random(delayMin, delayMax);  
    const duration1 = random(durationMin, durationMax);
    const duration2 = random(durationMin, durationMax);   
    
    tl.to(star, duration1, { autoAlpha: alpha, scale: scale, ease: ease1 }, delay)
      .to(star, duration2, { autoAlpha: 0, scale: 0, ease: ease2 }, appear)
  }
    
  tl.progress(random(1));
  
  return {
    element: star,
    timeline: tl
  };
}

function random(min, max) {
  if (max == null) { max = min; min = 0; }
  if (min > max) { const tmp = min; min = max; max = tmp; }
  return min + (max - min) * Math.random();
}
