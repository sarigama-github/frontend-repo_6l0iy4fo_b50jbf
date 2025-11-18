// Login page logic
(function(){
  const form = document.getElementById('loginForm');
  if(!form) return;

  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value.trim().toLowerCase();
    const password = document.getElementById('password').value;

    const users = HC.getUsers();
    const match = users.find(u => u.email === email && u.password === password);
    if(!match) return HC.toast('Invalid email or password.');

    HC.setSession(email);
    HC.toast('Logged in!');
    setTimeout(()=> window.location.href = 'dashboard.html', 600);
  });
})();
