// Login logic
(function(){
  const form = document.getElementById('loginForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    document.querySelectorAll('.error').forEach(el=> el.textContent='');

    const users = SS.getUsers();
    const user = users.find(u=> u.email === email && u.password === password);
    if(!user){ setErr('password','Invalid email or password.'); return; }

    SS.setCurrentUserEmail(email);
    window.location.href = 'dashboard.html';
  });

  function setErr(key,msg){ const el = document.querySelector(`[data-error="${key}"]`); if(el) el.textContent = msg; }
})();
