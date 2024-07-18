document.addEventListener("DOMContentLoaded", () => {
    let arrows = document.querySelectorAll(".arrow");
    let sidebar = document.querySelector(".sidebar");
    let sidebarBtns = document.querySelectorAll(".bx-menu");
    let sections = document.querySelectorAll("section");
    let navLinks = document.querySelectorAll("nav ul li a");

    // Toggle menu visibility on arrow click
    arrows.forEach(arrow => {
        arrow.addEventListener("click", (e) => {
            let arrowParent = e.target.parentElement.parentElement; // selecting main parent of arrow
            arrowParent.classList.toggle("showMenu");
        });
    });

    // Toggle sidebar visibility on button click
    sidebarBtns.forEach(btn => {
        btn.addEventListener("click", () => {
            sidebar.classList.toggle("close");
        });
    });

    // Function to set active link
    const setActiveLink = (id) => {
        navLinks.forEach(link => {
            link.classList.remove("active");
        });
        document.querySelector(`nav ul li a[href*=${id}]`).classList.add("active");
    };

    // Add active class to navigation link on scroll and save active link to localStorage
    window.addEventListener('scroll', () => {
        let middleOfViewport = window.innerHeight / 4; // Height to add classname
    
        sections.forEach(section => {
            let top = window.scrollY;
            let offset = section.offsetTop;
            let height = section.offsetHeight;
            let id = section.getAttribute("id");
    
            if (top + middleOfViewport >= offset && top + middleOfViewport < offset + height) {
                setActiveLink(id);
                section.classList.add("show-animate");
                localStorage.setItem('activeSection', id); // Store active section in localStorage
            } else {
                section.classList.remove("show-animate");
            }
        });
    });

    // Set active link on page load from localStorage
    window.addEventListener('load', () => {
        let activeSection = localStorage.getItem('activeSection');
        if (activeSection) {
            sections.forEach(section => {
                if (section.getAttribute("id") === activeSection) {
                    setActiveLink(activeSection);
                    section.classList.add("show-animate");
                    // Scroll to the section to make it visible
                    
                } else {
                    section.classList.remove("show-animate");
                }
            });
        }
    });
});
