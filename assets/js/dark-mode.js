// Dark mode toggle functionality
(function() {
  // Check for saved dark mode preference or default to dark mode
  const currentTheme = localStorage.getItem('theme') || 'dark';
  
  // Apply the theme immediately to prevent flash
  if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
  }

  // Wait for DOM to be ready
  document.addEventListener('DOMContentLoaded', function() {
    // Create toggle button
    const toggleButton = document.createElement('button');
    toggleButton.className = 'dark-mode-toggle';
    toggleButton.setAttribute('aria-label', 'Toggle dark mode');
    toggleButton.setAttribute('title', 'Toggle dark/light mode');
    
    // Set initial icon
    updateToggleIcon(toggleButton, currentTheme === 'dark');
    
    // Add button to page
    document.body.appendChild(toggleButton);
    
    // Toggle dark mode on click
    toggleButton.addEventListener('click', function() {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      
      // Save preference
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      // Update icon
      updateToggleIcon(toggleButton, isDark);
    });
  });

  function updateToggleIcon(button, isDark) {
    // Use sun icon for dark mode (click to go light), moon for light mode (click to go dark)
    button.innerHTML = isDark ? '☀️' : '🌙';
  }
})();
