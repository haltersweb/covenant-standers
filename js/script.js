(function () {
    'use strict';
    const openMenu = document.getElementById('openMenu'),
        closeMenu = document.getElementById('closeMenu'),
        nav = document.getElementById('nav');
    openMenu.addEventListener('click', function (evt) {
        nav.classList.add('active');
        closeMenu.focus();
    });
    closeMenu.addEventListener('click', function (evt) {
        nav.classList.remove('active');
        openMenu.focus();
    });
}());