// Dashboard page logic
(function(){
  // Optional: require login to browse; comment out to allow public browsing
  // HC.requireAuth?.();

  const profilesEl = document.getElementById('profiles');
  const emptyEl = document.getElementById('emptyState');
  const search = document.getElementById('search');
  const age = document.getElementById('age');
  const country = document.getElementById('country');
  const logoutBtn = document.getElementById('logoutBtn');

  if(logoutBtn){
    logoutBtn.addEventListener('click', ()=>{
      HC.clearSession();
      HC.toast('Logged out.');
      setTimeout(()=> window.location.href = 'index.html', 600);
    });
  }

  function ageRangeMatch(a){
    const val = age.value;
    if(!val) return true;
    if(val === '18-24') return a >= 18 && a <= 24;
    if(val === '25-34') return a >= 25 && a <= 34;
    if(val === '35-44') return a >= 35 && a <= 44;
    if(val === '45+') return a >= 45;
    return true;
  }

  function render(list){
    profilesEl.innerHTML = '';
    if(!list.length){ emptyEl.style.display = 'block'; return; }
    emptyEl.style.display = 'none';
    list.forEach(p => {
      const card = document.createElement('a');
      card.href = `profile.html?id=${encodeURIComponent(p.id || p.email || p.name)}`;
      card.className = 'glass-card profile-card card-hover';
      card.innerHTML = `
        <div class="profile-top">
          <div class="avatar">${p.photo ? `<img src="${p.photo}" alt="${p.name}">` : ''}</div>
          <div class="profile-meta">
            <div class="profile-name">${p.name || 'Anonymous'}</div>
            <div class="profile-sub">${p.age ? p.age + ' • ' : ''}${p.city ? p.city + ', ' : ''}${p.country || ''}</div>
          </div>
          <button class="btn">View</button>
        </div>
        ${p.interests?.length ? `<div class="chips">${p.interests.slice(0,4).map(i=>`<span class='chip'>${i}</span>`).join('')}</div>` : ''}
      `;
      profilesEl.appendChild(card);
    });
  }

  function applyFilters(){
    const all = HC.getProfiles();
    const q = (search.value || '').toLowerCase();
    const ctry = (country.value || '').toLowerCase();

    const filtered = all.filter(p => {
      const matchesText = !q || (p.name?.toLowerCase().includes(q) || p.bio?.toLowerCase().includes(q) || (p.interests||[]).join(' ').toLowerCase().includes(q));
      const matchesAge = ageRangeMatch(Number(p.age));
      const matchesCountry = !ctry || (p.country||'').toLowerCase() === ctry;
      return matchesText && matchesAge && matchesCountry;
    });
    render(filtered);
  }

  [search, age, country].forEach(el => el && el.addEventListener('input', applyFilters));

  // initial render
  applyFilters();
})();
