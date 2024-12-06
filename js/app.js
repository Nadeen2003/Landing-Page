// Define Global Variables
const navbarList = document.getElementById('navbar__list'); // Navigation menu container
const sections = document.querySelectorAll('section'); // All sections on the page

// Add CSS styles dynamically using JavaScript
function addCSS() {
    const style = document.createElement('style');
    style.textContent = `
        /* Base styles for the navigation */
        .navbar__menu {
          display: flex; 
          justify-content: flex-end; 
          align-items: center; 
          position: relative;
          width: 100%;
          background-color: #fff;
          box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
          margin: 0; 
        }

        .menu-toggle {
            display: none; /* Hide hamburger by default on larger screens */
            background: transparent;
            border: none;
            font-size: 2em;
            cursor: pointer;
            color: #333;
            padding: 15px;
            margin-left: 10px;
        }

        /* Styles for the scroll-to-top button */
        #Topbtn {
            display: none;
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 100;
            border: none;
            outline: none;
            background-color: #cc1;
            color: white;
            cursor: pointer;
            padding: 15px;
            border-radius: 50%;
            font-size: 18px;
        }
        #Topbtn:hover {
            background-color: #555;
        }

        /* Highlight styles for active nav link */
        .menulink.active-nav {
            background-color: #333;
            color: white !important;
        }

        /* Navigation link styles */
        .menulink {
            display: block;
            padding: 15px 20px;
            text-align: left;
            text-decoration: none;
            color: #333;
            border-bottom: 1px solid #ddd;
            font-size: 1.1em;
        }

        /* Responsive styles for small screens */
        @media only screen and (max-width: 600px) {
            .navbar__menu ul {
                display: none; /* Hide menu initially */
                flex-direction: column;
                background-color: #333;
                position: absolute;
                width: 100%;
                top: 60px;
                z-index: 10;
            }

            .menu-toggle {
                display: block;
            }

            .menulink {
                display: block;
                color: white;
                text-align: center;
            }
        }
    `;
    document.head.appendChild(style);
}

// Create the hamburger menu button
const menuToggleBtn = document.createElement('button');
menuToggleBtn.classList.add('menu-toggle');
menuToggleBtn.innerHTML = '&#9776;'; // Unicode for hamburger icon
document.querySelector('.navbar__menu').prepend(menuToggleBtn); // Add the button at the beginning of the nav

// Build the navigation menu based on sections
function buildNav() {
  sections.forEach(section => {
    const Listitem = document.createElement('li'); // Create list item for each section
    const sectionlink = document.createElement('a'); // Create link inside the list item
    sectionlink.href = `#${section.id}`; // Set link to section's id
    sectionlink.classList.add('menulink'); // Add class for CSS styling
    sectionlink.innerHTML = section.getAttribute('data-nav'); // Set link text from section's data-nav attribute
    Listitem.appendChild(sectionlink);
    navbarList.appendChild(Listitem); // Add the list item to the navigation menu
  });
}

// Toggle menu visibility on small screens
menuToggleBtn.addEventListener('click', () => {
  const isMenuVisible = navbarList.style.display === 'block';
  navbarList.style.display = isMenuVisible ? 'none' : 'block';
});


// Highlight the active section in the viewport and its corresponding nav link
function makeActive() {
  let activeSectionFound = false; // Track if an active section has been found

  sections.forEach((section, index) => {
    const sectionview = section.getBoundingClientRect(); // Get the section's position in the viewport
    const navLink = document.querySelectorAll('.menulink')[index]; // Get the corresponding navigation link

    if (!activeSectionFound && sectionview.top <= 150 && sectionview.bottom >= 150) {
      // activenow class is added to the section and nav link when section is in viewport
      section.classList.add('activenow');
      navLink.classList.add('active-nav');
      activeSectionFound = true; // Mark the first section in the viewport as active
    } else {
      // Remove 'active' class if section is out of viewport
      section.classList.remove('activenow');
      navLink.classList.remove('active-nav');
    }
  });
}

// Smooth scroll to section on nav link click
function scrollToSection() {
  const links = document.querySelectorAll('.menulink'); // Get all nav links
  links.forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent the default behavior
      const targetSection = document.querySelector(link.getAttribute('href')); // Find the section to scroll to
      targetSection.scrollIntoView({ behavior: 'smooth' }); // Smooth scroll to the section

      // Update active class for navigation links when clicked
      links.forEach(link => link.classList.remove('active-nav')); // Remove 'active-nav' from all links
      link.classList.add('active-nav'); // Add 'active-nav' to the clicked link
    });
  });
}

// Add scroll-to-top button with functionality
function addScrollToTopButton() {
  const Topbtn = document.createElement('button'); // Create the scroll-to-top button
  Topbtn.id = 'Topbtn';
  Topbtn.textContent = 'Top';
  document.body.appendChild(Topbtn); // Add button to the body

  // Toggle button visibility on scroll
  window.addEventListener('scroll', () => {
    Topbtn.style.display = document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? 'block' : 'none';
  });

  // Scroll to top when button is clicked
  Topbtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', addCSS); // Add CSS on page load
document.addEventListener('DOMContentLoaded', buildNav); // Build nav on page load
document.addEventListener('DOMContentLoaded', scrollToSection); // Enable smooth scroll on link click
document.addEventListener('scroll', makeActive); // Highlight active section on scroll
document.addEventListener('DOMContentLoaded', addScrollToTopButton); // Add scroll-to-top button
