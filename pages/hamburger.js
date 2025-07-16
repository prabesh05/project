// Hamburger menu toggle functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const body = document.body;
    
    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        
        // Add/remove body class to prevent scrolling
        if (sidebar.classList.contains('active')) {
            body.classList.add('sidebar-open');
            
            // Create overlay if it doesn't exist
            if (!document.querySelector('.sidebar-overlay')) {
                const overlay = document.createElement('div');
                overlay.className = 'sidebar-overlay';
                overlay.addEventListener('click', closeSidebar);
                document.body.appendChild(overlay);
            }
            document.querySelector('.sidebar-overlay').style.display = 'block';
            
            // Optional: Change hamburger icon to X
            const icon = menuToggle.querySelector('ion-icon');
            if (icon) {
                icon.setAttribute('name', 'close-outline');
            }
        } else {
            body.classList.remove('sidebar-open');
            
            // Hide overlay
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) {
                overlay.style.display = 'none';
            }
            
            // Change icon back to hamburger
            const icon = menuToggle.querySelector('ion-icon');
            if (icon) {
                icon.setAttribute('name', 'menu-outline');
            }
        }
    }
    
    // Close sidebar function
    function closeSidebar() {
        sidebar.classList.remove('active');
        body.classList.remove('sidebar-open');
        
        const overlay = document.querySelector('.sidebar-overlay');
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        // Change icon back to hamburger
        const icon = menuToggle.querySelector('ion-icon');
        if (icon) {
            icon.setAttribute('name', 'menu-outline');
        }
    }
    
    // Event listener for hamburger menu
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            toggleSidebar();
        });
    }
    
    // Close sidebar when clicking on sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-menus a, .sidebar-logout a');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
    
    // Close sidebar when window is resized to desktop size
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 1024) {
            closeSidebar();
        }
    });
    
    // Close sidebar with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebar.classList.contains('active')) {
            closeSidebar();
        }
    });
    
    // Prevent clicks on main content when sidebar is open
    main.addEventListener('click', function(e) {
        if (sidebar.classList.contains('active') && !menuToggle.contains(e.target)) {
            e.preventDefault();
            e.stopPropagation();
            closeSidebar();
        }
    });
})