// Common auth + storage helpers for HerConnect
(function(){
  const LS_USERS = 'hc_users';
  const LS_SESSION = 'hc_session';
  const LS_PROFILES = 'hc_profiles';

  function read(key, fallback){
    try { return JSON.parse(localStorage.getItem(key)) ?? fallback; } catch { return fallback; }
  }
  function write(key, value){ localStorage.setItem(key, JSON.stringify(value)); }

  function getUsers(){ return read(LS_USERS, []); }
  function setUsers(users){ write(LS_USERS, users); }
  function getSession(){ return read(LS_SESSION, null); }
  function setSession(email){ write(LS_SESSION, email); }
  function clearSession(){ localStorage.removeItem(LS_SESSION); }
  function getProfiles(){ return read(LS_PROFILES, []); }
  function setProfiles(list){ write(LS_PROFILES, list); }

  function toast(msg){
    const el = document.getElementById('toast');
    if(!el) return alert(msg);
    el.textContent = msg; el.classList.add('show');
    setTimeout(()=> el.classList.remove('show'), 2200);
  }

  function ensureMockProfiles(){
    const existing = getProfiles();
    if(existing && existing.length) return;
    const mock = [
      { id: 'p1', name: 'Maya', age: 24, city: 'Seattle', country: 'USA', bio: 'Coffee dates and coastal hikes. INFJ.', interests: ['hiking','coffee','indie film'], photo: '', socials: { instagram: 'https://instagram.com/maya' } },
      { id: 'p2', name: 'Aisha', age: 29, city: 'London', country: 'UK', bio: 'Art teacher, museum crawler, plant mom.', interests: ['art','gallery','yoga'], photo: '', socials: { instagram: 'https://instagram.com/aisha' } },
      { id: 'p3', name: 'Sofia', age: 33, city: 'Lisbon', country: 'Portugal', bio: 'Surfing at sunrise, tacos at sunset.', interests: ['surf','travel','food'], photo: '', socials: { facebook: 'https://facebook.com/sofia' } },
      { id: 'p4', name: 'Harper', age: 26, city: 'Toronto', country: 'Canada', bio: 'Book clubs and board games. ENFP.', interests: ['books','games','tea'], photo: '', socials: { snapchat: 'harper.snap' } },
      { id: 'p5', name: 'Yumi', age: 31, city: 'Osaka', country: 'Japan', bio: 'Night runs, synth pop, ramen enthusiast.', interests: ['running','music','ramen'], photo: '', socials: { instagram: 'https://instagram.com/yumi' } }
    ];
    setProfiles(mock);
  }

  function requireAuth(redirect = 'login.html'){
    const s = getSession();
    if(!s){ window.location.href = redirect; }
  }

  // Expose minimal global API
  window.HC = {
    getUsers, setUsers, getSession, setSession, clearSession,
    getProfiles, setProfiles, ensureMockProfiles, toast
  };
})();
