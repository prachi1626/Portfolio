

function toggleMenu() {
    const h = document.getElementById('ham'), m = document.getElementById('mobileMenu');
    h.classList.toggle('open'); m.classList.toggle('open');
    document.body.style.overflow = m.classList.contains('open') ? 'hidden' : '';
}
function closeMenu() {
    document.getElementById('ham').classList.remove('open');
    document.getElementById('mobileMenu').classList.remove('open');
    document.body.style.overflow = '';
}

const skills = [
    { name: 'User Research', pct: 88, color: '#a78bfa' },
    { name: 'Wireframing', pct: 90, color: '#38bdf8' },
    { name: 'Prototyping', pct: 87, color: '#f472b6' },
    { name: 'Hi-Fi UI Design', pct: 85, color: '#a78bfa' },
    { name: 'Figma', pct: 92, color: '#38bdf8' },
    { name: 'Design Systems', pct: 80, color: '#f472b6' },
    { name: 'HTML & CSS', pct: 75, color: '#a78bfa' },
    { name: 'Usability Testing', pct: 82, color: '#38bdf8' }
];
const grid = document.getElementById('skillsGrid');
skills.forEach((s, i) => {
    const r = 42, circ = 2 * Math.PI * r;
    const el = document.createElement('div');
    el.className = 'skill-item reveal';
    el.style.transitionDelay = `${i * .07}s`;
    el.innerHTML = `<div class="radial-wrap"><svg class="radial-svg" width="104" height="104" viewBox="0 0 104 104"><circle class="radial-bg" cx="52" cy="52" r="${r}"/><circle class="radial-fill" cx="52" cy="52" r="${r}" stroke="${s.color}" stroke-dasharray="${circ}" stroke-dashoffset="${circ}" data-target="${circ * (1 - s.pct / 100)}"/></svg><div class="radial-label"><span class="radial-pct" style="color:${s.color}">${s.pct}%</span></div></div><div class="skill-name">${s.name}</div>`;
    grid.appendChild(el);
});

const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('visible');
        e.target.querySelectorAll('.radial-fill[data-target]').forEach(a => { setTimeout(() => { a.style.strokeDashoffset = a.dataset.target; }, 150); });
        io.unobserve(e.target);
    });
}, { threshold: .1 });
document.querySelectorAll('.reveal,.case-card').forEach(el => io.observe(el));

document.querySelectorAll('.case-img img').forEach(img => {
    function tryShow() { if (img.naturalWidth > 0) { img.classList.add('img-loaded'); const ph = img.parentElement.querySelector('.case-placeholder'); if (ph) ph.style.opacity = '0'; } }
    img.addEventListener('load', tryShow); tryShow();
});

document.addEventListener('mousemove', e => {
    const x = (e.clientX / window.innerWidth - .5) * 18, y = (e.clientY / window.innerHeight - .5) * 18;
    document.querySelectorAll('.orb').forEach((o, i) => { const d = (i + 1) * 1.6; o.style.transform = `translate(${x * d}px,${y * d}px)`; });
});
document.querySelectorAll('.btn-primary,.btn-secondary').forEach(btn => {
    btn.addEventListener('mousemove', e => { const r = btn.getBoundingClientRect(); btn.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .13}px,${(e.clientY - r.top - r.height / 2) * .13}px) translateY(-2px)`; });
    btn.addEventListener('mouseleave', () => { btn.style.transform = ''; });
});
