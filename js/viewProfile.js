// View profile page logic
(function(){
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');

  const profiles = HC.getProfiles();
  let profile;
  if(id){ profile = profiles.find(p => (p.id === id || p.email === id)); }
  if(!profile){
    // Fallback to current user profile
    const session = HC.getSession();
    profile = profiles.find(p => p.email === session) || profiles[0];
  }
  if(!profile){
    document.getElementById('viewName').textContent = 'No profile yet';
    document.getElementById('viewBio').textContent = 'Create your profile to get started.';
    return;
  }

  document.getElementById('viewName').textContent = profile.name || 'Anonymous';
  document.getElementById('viewMeta').textContent = `${profile.age ? profile.age + ' • ' : ''}${profile.city || ''}${profile.country ? ', ' + profile.country : ''}`;
  const img = document.getElementById('viewPhoto');
  if(profile.photo){ img.src = profile.photo; img.style.display = 'block'; } else { img.style.display = 'none'; }
  document.getElementById('viewBio').textContent = profile.bio || '';

  const socialsEl = document.getElementById('viewSocials');
  socialsEl.innerHTML = '';
  const socials = profile.socials || {};
  const entries = [
    ['Facebook', socials.facebook, socials.facebook],
    ['Instagram', socials.instagram, socials.instagram],
    ['Snapchat', socials.snapchat, socials.snapchat ? `https://snapchat.com/add/${socials.snapchat}` : '']
  ];
  entries.forEach(([label, val, href])=>{
    if(!val) return;
    const a = document.createElement('a');
    a.className = 'social-link';
    a.href = href || '#';
    a.target = '_blank';
    a.rel = 'noopener';
    a.textContent = label;
    socialsEl.appendChild(a);
  });

  const interestsEl = document.getElementById('viewInterests');
  interestsEl.innerHTML = (profile.interests||[]).map(i=>`<span class="chip">${i}</span>`).join('');
})();
