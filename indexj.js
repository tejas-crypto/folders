document.getElementById('darkModeToggle').addEventListener('change', function(event) {
    document.getElementById('body').classList.toggle('dark-mode', event.target.checked);
  });
  