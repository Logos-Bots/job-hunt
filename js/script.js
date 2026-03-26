document.addEventListener('DOMContentLoaded', () => {
  const burgerBtn = document.querySelector('.header__burger');
  const menu = document.querySelector('.header__menu');
  const nav = document.querySelector('.header__nav');

  const dropdown = document.querySelector('.dropdown');
  const dropdownToggle = document.querySelector('.dropdown__toggle');
  const dropdownMenu = document.querySelector('.dropdown__menu');
  const navLinks = document.querySelectorAll('.nav__link, .dropdown__link');

  const mobileBreakpoint = 768;

  const closeDropdown = () => {
    if (!dropdownToggle || !dropdownMenu) return;

    dropdownToggle.setAttribute('aria-expanded', 'false');
    dropdownMenu.hidden = true;
  };

  const openDropdown = () => {
    if (!dropdownToggle || !dropdownMenu) return;

    dropdownToggle.setAttribute('aria-expanded', 'true');
    dropdownMenu.hidden = false;
  };

  const toggleDropdown = () => {
    if (!dropdownToggle || !dropdownMenu) return;

    const isExpanded = dropdownToggle.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const closeMenu = () => {
    if (!burgerBtn || !menu) return;

    burgerBtn.classList.remove('header__burger_active');
    menu.classList.remove('header__menu_active');
    burgerBtn.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
    closeDropdown();
  };

  const openMenu = () => {
    if (!burgerBtn || !menu) return;

    burgerBtn.classList.add('header__burger_active');
    menu.classList.add('header__menu_active');
    burgerBtn.setAttribute('aria-expanded', 'true');
    document.body.classList.add('no-scroll');
    closeDropdown();
  };

  const toggleMenu = () => {
    if (!burgerBtn || !menu) return;

    const isOpen = burgerBtn.classList.contains('header__burger_active');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  if (burgerBtn && menu) {
    burgerBtn.addEventListener('click', () => {
      toggleMenu();
    });
  }

  if (dropdownToggle && dropdownMenu) {
    dropdownToggle.addEventListener('click', (event) => {
      event.stopPropagation();
      toggleDropdown();
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeDropdown();

      if (window.innerWidth <= mobileBreakpoint) {
        closeMenu();
      }
    });
  });

  document.addEventListener('click', (event) => {
    if (dropdown && !dropdown.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closeDropdown();

      if (window.innerWidth <= mobileBreakpoint) {
        closeMenu();
      }
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > mobileBreakpoint) {
      closeMenu();
    }
  });
});
