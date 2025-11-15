/* Enhanced JS: Smooth scroll, reveal animations, nav slide-in, typing effect & floating sparkles */

document.addEventListener('DOMContentLoaded', function(){
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', function(e){
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        e.preventDefault();
        window.scrollTo({
          top: target.getBoundingClientRect().top + window.pageYOffset - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // Reveal animations on scroll
  const revealNodes = document.querySelectorAll('.hero-left, .photo-circle, .about-box, .skill-card, .project-card, .contact-left, .contact-form');
  const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.style.transition = 'opacity .9s ease, transform .9s cubic-bezier(.2,.9,.2,1)';
        entry.target.style.transform = 'translateY(0) scale(1)';
        entry.target.style.opacity = '1';
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});

  revealNodes.forEach(n=>{
    n.style.opacity = '0';
    n.style.transform = 'translateY(30px) scale(0.98)';
    observer.observe(n);
  });

  // Navbar slide-in animation
  const navbar = document.querySelector('nav');
  if(navbar){
    navbar.style.transform = 'translateY(-100%)';
    navbar.style.transition = 'transform 0.8s ease-out';
    setTimeout(()=> navbar.style.transform = 'translateY(0)', 300);
  }

  // Typing effect for hero text (if exists)
  const heroTitle = document.querySelector('.hero-left h1');
  if(heroTitle){
    const text = heroTitle.textContent.trim();
    heroTitle.textContent = '';
    let i = 0;
    const typing = setInterval(()=>{
      heroTitle.textContent += text.charAt(i);
      i++;
      if(i >= text.length) clearInterval(typing);
    }, 90);
  }

  // Floating decorative dots
  const createDot = (x,y,delay) => {
    const dot = document.createElement('div');
    dot.style.position='fixed';
    dot.style.width='10px'; 
    dot.style.height='10px'; 
    dot.style.borderRadius='50%';
    dot.style.background='rgba(140,110,215,0.8)'; 
    dot.style.left = x + 'px'; 
    dot.style.top = y + 'px';
    dot.style.zIndex = '5'; 
    dot.style.opacity = '0.9';
    dot.style.filter='blur(0.6px)';
    dot.style.transition = `transform 6s linear ${delay}s, opacity 6s ${delay}s`;
    document.body.appendChild(dot);
    setTimeout(()=> { 
      dot.style.transform = 'translateY(900px) translateX(-140px) rotate(90deg)'; 
      dot.style.opacity='0'; 
    }, 50);
    setTimeout(()=> dot.remove(), 7000);
  };

  // Create a few decorative dots
  createDot(window.innerWidth * 0.66, 180, 0.6);
  createDot(window.innerWidth * 0.25, 420, 1.4);
  createDot(window.innerWidth * 0.8, 600, 2.0);

  // Optional sparkle trail animation on mousemove
  document.addEventListener('mousemove', e=>{
    const sparkle = document.createElement('div');
    sparkle.style.position = 'fixed';
    sparkle.style.width = '6px';
    sparkle.style.height = '6px';
    sparkle.style.borderRadius = '50%';
    sparkle.style.background = 'rgba(255,255,255,0.7)';
    sparkle.style.left = e.pageX + 'px';
    sparkle.style.top = e.pageY + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.transition = 'transform 0.6s ease-out, opacity 0.6s ease-out';
    document.body.appendChild(sparkle);
    setTimeout(()=> {
      sparkle.style.transform = 'translateY(-20px) scale(0)';
      sparkle.style.opacity = '0';
    }, 10);
    setTimeout(()=> sparkle.remove(), 600);
  });
});