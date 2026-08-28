// Theme toggle helper for all pages
(function() {
  // Get the stored theme or default to 'light'
  function getStoredTheme() {
    return localStorage.getItem('ethioTheme') || 'light';
  }

  function setTheme(theme) {
    document.body.classList.remove('dark');
    if (theme === 'dark') {
      document.body.classList.add('dark');
    } else if (theme === 'system') {
      const prefers = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (prefers) document.body.classList.add('dark');
    }
    localStorage.setItem('ethioTheme', theme);
    
    // Update any theme toggle buttons on the page
    document.querySelectorAll('.theme-toggle').forEach(btn => {
      const isDark = document.body.classList.contains('dark');
      btn.innerHTML = isDark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
    });
  }

  // Apply the saved theme on load
  const savedTheme = getStoredTheme();
  setTheme(savedTheme);

  // Listen for theme toggle clicks
  document.addEventListener('click', function(e) {
    const toggle = e.target.closest('.theme-toggle');
    if (toggle) {
      const current = getStoredTheme();
      const next = current === 'dark' ? 'light' : 'dark';
      setTheme(next);
    }
  });

  // Watch for system theme changes if 'system' is selected
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
    if (getStoredTheme() === 'system') {
      setTheme('system');
    }
  });
})();
