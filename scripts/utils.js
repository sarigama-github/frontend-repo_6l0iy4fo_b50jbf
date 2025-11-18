// Sapphic Space - Utils & Storage Helpers
(function(){
  const KEY_USERS = 'ss_users';
  const KEY_PROFILES = 'ss_profiles';
  const KEY_SESSION = 'ss_session_email';

  function readJSON(key, fallback){
    try{ const raw = localStorage.getItem(key); return raw ? JSON.parse(raw) : fallback; }catch(e){ return fallback; }
  }
  function writeJSON(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

  // Session
  function getCurrentUserEmail(){ return localStorage.getItem(KEY_SESSION) || null; }
  function setCurrentUserEmail(email){ if(email){ localStorage.setItem(KEY_SESSION, email);} }
  function logout(){ localStorage.removeItem(KEY_SESSION); }

  // Users
  function getUsers(){ return readJSON(KEY_USERS, []); }
  function saveUsers(list){ writeJSON(KEY_USERS, list); }

  // Profiles
  function getProfiles(){ return readJSON(KEY_PROFILES, []); }
  function saveProfiles(list){ writeJSON(KEY_PROFILES, list); }
  function upsertProfile(profile){
    const list = getProfiles();
    const idx = list.findIndex(p=> p.id === profile.id || (profile.ownerEmail && p.ownerEmail === profile.ownerEmail));
    if(idx >= 0){ list[idx] = {...list[idx], ...profile}; } else { list.push(profile); }
    saveProfiles(list);
    return profile;
  }
  function getProfileById(id){ return getProfiles().find(p=> String(p.id) === String(id)); }

  function uid(){ return Math.random().toString(36).slice(2,10); }

  function ensureMockProfiles(){
    const existing = getProfiles();
    if(existing && existing.length){ return existing; }
    const mock = [
      {
        id: uid(),
        name: 'Luna', age: 26, city: 'Seattle', country: 'United States',
        bio: 'Coffee dates, rainy walks, and indie gigs. Dog mom to Nova. 🌧️',
        interests: ['Hiking','Indie Music','Coffee','Board Games'],
        ownerEmail: null,
        photo: null,
        socials: { instagram: 'https://instagram.com/luna', facebook: '', snapchat: '' }
      },
      {
        id: uid(),
        name: 'Maya', age: 31, city: 'Toronto', country: 'Canada',
        bio: 'Plant lady, bookworm, occasional salsa dancer. Let’s trade recipes. 🌿',
        interests: ['Reading','Cooking','Plants','Salsa'],
        ownerEmail: null,
        photo: null,
        socials: { instagram: '', facebook: 'https://facebook.com/maya', snapchat: '' }
      },
      {
        id: uid(),
        name: 'Sofia', age: 22, city: 'Madrid', country: 'Spain',
        bio: 'Art student. Museum buddy? 🎨',
        interests: ['Art','Photography','Brunch','Travel'],
        ownerEmail: null,
        photo: null,
        socials: { instagram: 'https://instagram.com/sofi', facebook: '', snapchat: 'https://snapchat.com/add/sofi' }
      }
    ];
    saveProfiles(mock);
    return mock;
  }

  function ageRange(age){ if(!age) return ''; if(age<25) return '18-24'; if(age<35) return '25-34'; if(age<45) return '35-44'; return '45+'; }

  function avatarFor(name){
    const initials = (name||'?').split(' ').map(w=>w[0]).join('').slice(0,2).toUpperCase();
    const el = document.createElement('div');
    el.className = 'avatar';
    el.textContent = initials;
    return el;
  }

  function requireAuth(redirect='login.html'){
    if(!getCurrentUserEmail()){
      window.location.href = redirect;
      return false;
    }
    return true;
  }

  // Expose
  window.SS = {
    KEY_USERS, KEY_PROFILES, KEY_SESSION,
    readJSON, writeJSON,
    getCurrentUserEmail, setCurrentUserEmail, logout,
    getUsers, saveUsers,
    getProfiles, saveProfiles, upsertProfile, getProfileById,
    ensureMockProfiles,
    uid,
    ageRange,
    avatarFor,
    requireAuth
  };
})();
