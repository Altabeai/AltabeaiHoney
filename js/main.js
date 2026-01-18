// Main JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // State
    const state = {
        lang: localStorage.getItem('altabeai_lang') || 'ar',
        mobileMenuOpen: false
    };

    // DOM Elements
    const langSwitchBtn = document.getElementById('lang-switch');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const body = document.body;
    const yearSpan = document.getElementById('year');

    // Content Dictionary
    // Used for dynamic attributes like placeholders or JS specific messages
    // Most content is toggled via CSS classes .lang-ar / .lang-en
    
    // Initialize
    function init() {
        applyLanguage(state.lang);
        if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    }

    // Language System
    function toggleLanguage() {
        state.lang = state.lang === 'ar' ? 'en' : 'ar';
        localStorage.setItem('altabeai_lang', state.lang);
        applyLanguage(state.lang);
    }

    function applyLanguage(lang) {
        // Set document attributes
        document.documentElement.lang = lang;
        document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
        
        // Show/Hide Elements based on class
        const arElements = document.querySelectorAll('.lang-ar');
        const enElements = document.querySelectorAll('.lang-en');

        if (lang === 'ar') {
            arElements.forEach(el => el.classList.remove('hidden'));
            enElements.forEach(el => el.classList.add('hidden'));
            if(langSwitchBtn) langSwitchBtn.textContent = 'English';
        } else {
            arElements.forEach(el => el.classList.add('hidden'));
            enElements.forEach(el => el.classList.remove('hidden'));
            if(langSwitchBtn) langSwitchBtn.textContent = 'العربية';
        }

        // Update form placeholders if they exist
        updatePlaceholders(lang);
    }

    function updatePlaceholders(lang) {
        const inputs = document.querySelectorAll('[data-placeholder-ar]');
        inputs.forEach(input => {
            input.placeholder = input.getAttribute(`data-placeholder-${lang}`);
        });
    }

    // Mobile Menu
    if (hamburger) {
        hamburger.addEventListener('click', () => {
            state.mobileMenuOpen = !state.mobileMenuOpen;
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Event Listeners
    if (langSwitchBtn) {
        langSwitchBtn.addEventListener('click', (e) => {
            e.preventDefault();
            toggleLanguage();
        });
    }

    // WhatsApp Order Generator
    window.orderProduct = function(productNameAr, productNameEn) {
        const name = state.lang === 'ar' ? productNameAr : productNameEn;
        const phone = '201092862363'; // Added country code
        const textAr = `أرغب بطلب ${productNameAr}`;
        const textEn = `I would like to order ${productNameEn}`;
        const text = state.lang === 'ar' ? textAr : textEn;
        
        const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`;
        window.open(url, '_blank');
    };

    // Smooth Scroll for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (state.mobileMenuOpen) {
                    navLinks.classList.remove('active');
                    state.mobileMenuOpen = false;
                }
            }
        });
    });

    init();
});
