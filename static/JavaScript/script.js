document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        let menuIcons = document.querySelector('.menu-icons');
        let nav = document.querySelector('nav');

        if (menuIcons && nav) {
            menuIcons.addEventListener('click', () => {
                nav.classList.toggle('active');
            });
        } else {
            console.error('menuIcons or nav element not found');
        }
    }, 100); 
});

// document.addEventListener('DOMContentLoaded', function () {
//     const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

//     dropdownToggles.forEach(toggle => {
//         toggle.addEventListener('click', function (event) {
//             event.preventDefault(); 

        
//             const icon = toggle.querySelector('.fas.fa-caret-down');
//             if (icon) {
//                 icon.classList.toggle('rotate');
//             }

//             const submenu = toggle.nextElementSibling;
//             if (submenu && submenu.classList.contains('sub-menu')) {
//                 submenu.classList.toggle('open');
//             }
//         });
//     });
// });

