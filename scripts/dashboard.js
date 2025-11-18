// Dashboard listing
(function(){
  const cards = document.getElementById('cards');
  const search = document.getElementById('search');
  const ageFilter = document.getElementById('ageFilter');
  const countryFilter = document.getElementById('countryFilter');
  const logoutBtn = document.getElementById('logoutBtn');

  // Optional gate: allow browsing without login, but logout appears only when logged in
  if(logoutBtn){
    logoutBtn.addEventListener('click', (e)=>{ e.preventDefault(); SS.logout(); window.location.href='index.html'; });
    if(!SS.getCurrentUserEmail()) logoutBtn.style.display = 'none';
  }

  const profiles = SS.ensureMockProfiles();
  render(profiles);

  [search, ageFilter, countryFilter].forEach(el => el && el.addEventListener('input', ()=> render(profiles)));

  function render(list){
    const q = (search?.value || '').toLowerCase();
    const ageR = ageFilter?.value || '';
    const country = countryFilter?.value || '';

    const filtered = list.filter(p=>{
      const matchesSearch = !q || [p.name, p.city, p.country, (p.interests||[]).join(' ')].join(' ').toLowerCase().includes(q);
      const matchesAge = !ageR || SS.ageRange(Number(p.age)) === ageR;
      const matchesCountry = !country || (p.country||'') === country;
      return matchesSearch && matchesAge && matchesCountry;
    });

    cards.innerHTML = '';
    filtered.forEach(p=>{
      const card = document.createElement('div');
      card.className = 'card profile-card card-hover fade-in';

      const avatar = p.photo ? new Image() : SS.avatarFor(p.name);
      if(p.photo){ avatar.src = p.photo; avatar.className = 'avatar'; avatar.style.objectFit='cover'; }

      const meta = document.createElement('div');
      meta.className = 'meta';
      const name = document.createElement('div');
      name.className = 'name';
      name.textContent = `${p.name} ${p.age? '• '+p.age: ''}`;
      const sub = document.createElement('div');
      sub.className = 'sub';
      sub.textContent = [p.city, p.country].filter(Boolean).join(', ');

      const actions = document.createElement('div');
      const view = document.createElement('a');
      view.href = `profile.html?id=${p.id}`;
      view.className = 'btn btn-outline';
      view.textContent = 'View profile';
      actions.appendChild(view);

      meta.appendChild(name);
      meta.appendChild(sub);
      meta.appendChild(actions);

      card.appendChild(avatar);
      card.appendChild(meta);

      cards.appendChild(card);
    });
  }
})();
