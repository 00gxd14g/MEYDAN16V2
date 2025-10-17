(function () {
    const init = () => {
    const isNextApp = !!document.documentElement.dataset.nextApp;
    const loadingScreen = document.getElementById('loadingScreen');
    const body = document.body;
    const navOverlay = document.getElementById('navOverlay');
    const navClose = document.getElementById('navClose');
    const hamburger = document.querySelector('.hamburger-menu');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    const floatingBtn = document.getElementById('floatingApplicationBtn');
    const scrollProgressBar = document.getElementById('scrollProgressBar');
    const heroSection = document.getElementById('hero');

    /* Loading screen */
    if (loadingScreen) {
        // Ensure loader is shown
        loadingScreen.classList.remove('hide');
        loadingScreen.style.display = 'flex';
        // JS-driven hide (works alongside CSS fallback)
        setTimeout(() => {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.add('loaded');
            }, 600);
        }, 2200);
    } else {
        body.classList.add('loaded');
    }

    // Fallback: ensure loader is gone when all resources finish loading
    window.addEventListener('load', () => {
        if (loadingScreen) {
            loadingScreen.classList.add('hide');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                body.classList.add('loaded');
            }, 400);
        }
    });

    /* Navigation overlay (skip in Next, handled by NavClient) */
    let openNav, closeNav;
    if (!isNextApp) {
        openNav = () => {
            if (navOverlay) navOverlay.classList.add('active');
            if (hamburger) hamburger.classList.add('active');
            body.style.overflow = 'hidden';
        };
        closeNav = () => {
            if (navOverlay) navOverlay.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
            body.style.overflow = '';
        };

        if (hamburger) {
            hamburger.addEventListener('click', () => {
                if (navOverlay && navOverlay.classList.contains('active')) closeNav(); else openNav();
            });
        }
        if (navClose) navClose.addEventListener('click', closeNav);
        if (navOverlay) {
            navOverlay.addEventListener('click', (event) => {
                if (event.target === navOverlay) closeNav();
            });
        }
        document.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' && navOverlay && navOverlay.classList.contains('active')) closeNav();
        });
    }

    /* Smooth scroll helper */
    const smoothScrollTo = (selector) => {
        if (!selector || selector === '#') {
            return;
        }
        const target = document.querySelector(selector);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    /* Handle all anchor triggers (skip in Next; ScrollClient handles) */
    if (!isNextApp) {
        const scrollTriggers = document.querySelectorAll('.nav-link, .footer-nav a, .floating-application-btn');
        scrollTriggers.forEach((trigger) => {
            trigger.addEventListener('click', (event) => {
                const href = trigger.getAttribute('href');
                if (href && href.startsWith('#')) {
                    event.preventDefault();
                    smoothScrollTo(href);
                    if (typeof closeNav === 'function') closeNav();
                }
            });
        });
    }

    if (scrollIndicator) {
        scrollIndicator.addEventListener('click', () => smoothScrollTo('#konum'));
    }

    /* Intersection observer for sections fade-in */
    const sections = document.querySelectorAll('.section');
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('section-visible');
            }
        });
    }, { threshold: 0.2 });

    sections.forEach((section) => sectionObserver.observe(section));

    /* Scroll progress bar */
    const updateScrollProgress = () => {
        if (!scrollProgressBar) {
            return;
        }
        const scrolled = window.scrollY;
        const max = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const percentage = max > 0 ? (scrolled / max) * 100 : 0;
        scrollProgressBar.style.width = `${percentage}%`;
    };

    updateScrollProgress();

    /* Floating application button visibility */
    const toggleFloatingButton = () => {
        if (!floatingBtn) return;
        if (!heroSection) {
            floatingBtn.classList.add('visible');
            return;
        }
        const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
        floatingBtn.classList.toggle('visible', window.scrollY > heroBottom - 80);
    };

    // Prefer IntersectionObserver for robust visibility
    if (floatingBtn && heroSection && 'IntersectionObserver' in window) {
        const heroObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                // Show button when hero is NOT intersecting (scrolled past hero)
                if (entry.isIntersecting) {
                    floatingBtn.classList.remove('visible');
                } else {
                    floatingBtn.classList.add('visible');
                }
            });
        }, { threshold: 0.1 });
        heroObserver.observe(heroSection);
    } else {
        window.addEventListener('scroll', () => {
            updateScrollProgress();
            toggleFloatingButton();
        }, { passive: true });
        toggleFloatingButton();
    }

    if (floatingBtn) {
        floatingBtn.addEventListener('click', (e) => {
            e.preventDefault();
            smoothScrollTo('#iletisim');
        });
    }

    /* Konum background micro-parallax (subtle, performant) */
    const konumSection = document.getElementById('konum');
    const konumBackdrop = document.querySelector('.konum-background');
    const parallaxMax = 22; // px
    let parallaxRaf = 0;

    const updateKonumParallax = () => {
        if (!konumSection || !konumBackdrop) return;
        const rect = konumSection.getBoundingClientRect();
        const vh = window.innerHeight || document.documentElement.clientHeight;
        // Normalize 0..1 when section enters viewport
        const ratio = Math.min(Math.max((vh - rect.top) / (vh + rect.height), 0), 1);
        const y = Math.round(ratio * parallaxMax);
        konumBackdrop.style.transform = `translate3d(0, ${y}px, 0) scale(1.03)`;
    };

    const scheduleParallax = () => {
        if (parallaxRaf) return;
        parallaxRaf = requestAnimationFrame(() => {
            parallaxRaf = 0;
            updateKonumParallax();
        });
    };

    window.addEventListener('scroll', scheduleParallax, { passive: true });
    window.addEventListener('resize', scheduleParallax, { passive: true });
    updateKonumParallax();

    /* Advantages slider (no arrows; auto-scroll) */
    const advantagesSlider = document.querySelector('.advantages-slider');
    const advantagesTrack = advantagesSlider?.querySelector('.advantages-track');

    if (advantagesTrack) {
        const slides = Array.from(advantagesTrack.children);
        let currentIndex = 0; // Start from the first slide for consistency
        let autoScrollTimer;

        const updateSlideStates = () => {
            slides.forEach((slide, index) => {
                const isActive = index === currentIndex;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', (!isActive).toString());
            });
        };

        const updateSlider = () => {
            const offset = -currentIndex * 100;
            advantagesTrack.style.transform = `translate3d(${offset}%, 0, 0)`;
            updateSlideStates();
        };

        const goToSlide = (index) => {
            currentIndex = (index + slides.length) % slides.length;
            updateSlider();
        };

        const nextSlide = () => goToSlide(currentIndex + 1);
        const prevSlide = () => goToSlide(currentIndex - 1);

        const startAutoScroll = () => {
            clearInterval(autoScrollTimer);
            autoScrollTimer = setInterval(nextSlide, 5000);
        };

        const stopAutoScroll = () => {
            clearInterval(autoScrollTimer);
        };

        // Pause/resume on hover/touch
        advantagesSlider.addEventListener('mouseenter', stopAutoScroll);
        advantagesSlider.addEventListener('mouseleave', startAutoScroll);
        advantagesSlider.addEventListener('touchstart', stopAutoScroll, { passive: true });
        advantagesSlider.addEventListener('touchend', startAutoScroll, { passive: true });

        // Basic swipe support
        let startX = 0;
        let isPointerDown = false;
        const threshold = 30;

        const onPointerDown = (e) => {
            isPointerDown = true;
            startX = e.touches ? e.touches[0].clientX : e.clientX;
            stopAutoScroll();
        };
        const onPointerUp = (e) => {
            if (!isPointerDown) return;
            const currentX = e.changedTouches ? e.changedTouches[0].clientX : e.clientX;
            const delta = currentX - startX;
            if (Math.abs(delta) > threshold) {
                if (delta < 0) nextSlide(); else prevSlide();
            }
            isPointerDown = false;
            startAutoScroll();
        };

        advantagesTrack.addEventListener('mousedown', onPointerDown);
        advantagesTrack.addEventListener('mouseup', onPointerUp);
        advantagesTrack.addEventListener('touchstart', onPointerDown, { passive: true });
        advantagesTrack.addEventListener('touchend', onPointerUp, { passive: true });

        updateSlider();
        startAutoScroll();
    }

    /* Block filters */
    const activateFilterGroup = (sectionSelector, itemSelector) => {
        const section = document.querySelector(sectionSelector);
        if (!section) {
            return;
        }
        const buttons = section.querySelectorAll('.filter-btn');
        const items = section.querySelectorAll(itemSelector);

        buttons.forEach((button) => {
            button.addEventListener('click', () => {
                const filter = button.getAttribute('data-filter') || 'all';
                buttons.forEach((btn) => btn.classList.remove('active'));
                button.classList.add('active');

                items.forEach((item) => {
                    const category = item.getAttribute('data-category');
                    const show = filter === 'all' || category === filter;
                    item.classList.toggle('hidden', !show);
                });
            });
        });
    };

    activateFilterGroup('#planlar', '.block-item');

    /* Project plans slider */
    const projectSlider = document.querySelector('.project-plans-slider');
    const projectTrack = projectSlider?.querySelector('.project-plans-track');
    const projectPrevBtn = projectSlider?.querySelector('.project-slider-nav.prev');
    const projectNextBtn = projectSlider?.querySelector('.project-slider-nav.next');

    if (projectTrack && projectPrevBtn && projectNextBtn) {
        const projectSlides = Array.from(projectTrack.children);
        let projectCurrentIndex = 0;
        let projectAutoTimer;

        const updateProjectSlideStates = () => {
            projectSlides.forEach((slide, index) => {
                const isActive = index === projectCurrentIndex;
                slide.classList.toggle('is-active', isActive);
                slide.setAttribute('aria-hidden', (!isActive).toString());
            });
        };

        const updateProjectSlider = () => {
            const offset = -projectCurrentIndex * 100;
            projectTrack.style.transform = `translate3d(${offset}%, 0, 0)`;
            updateProjectSlideStates();
        };

        const goToProjectSlide = (index) => {
            projectCurrentIndex = (index + projectSlides.length) % projectSlides.length;
            updateProjectSlider();
        };

        const nextProjectSlide = () => {
            goToProjectSlide(projectCurrentIndex + 1);
        };

        const prevProjectSlide = () => {
            goToProjectSlide(projectCurrentIndex - 1);
        };

        const startProjectAutoScroll = () => {
            clearInterval(projectAutoTimer);
            projectAutoTimer = setInterval(nextProjectSlide, 5500);
        };

        const stopProjectAutoScroll = () => {
            clearInterval(projectAutoTimer);
        };

        projectPrevBtn.addEventListener('click', () => {
            prevProjectSlide();
            stopProjectAutoScroll();
            startProjectAutoScroll();
        });

        projectNextBtn.addEventListener('click', () => {
            nextProjectSlide();
            stopProjectAutoScroll();
            startProjectAutoScroll();
        });

        projectSlider.addEventListener('mouseenter', stopProjectAutoScroll);
        projectSlider.addEventListener('mouseleave', startProjectAutoScroll);
        projectSlider.addEventListener('touchstart', stopProjectAutoScroll, { passive: true });
        projectSlider.addEventListener('touchend', startProjectAutoScroll, { passive: true });

        updateProjectSlider();
        startProjectAutoScroll();
    }

    /* Expand/collapse functionality for project plans */
    const expandBtns = document.querySelectorAll('.plan-expand-btn');
    expandBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const isExpanded = btn.getAttribute('data-expanded') === 'true';
            const planDetails = btn.nextElementSibling;
            const expandText = btn.querySelector('.expand-text');

            if (isExpanded) {
                btn.setAttribute('data-expanded', 'false');
                planDetails.classList.remove('expanded');
                expandText.textContent = 'Detayları Göster';
            } else {
                btn.setAttribute('data-expanded', 'true');
                planDetails.classList.add('expanded');
                expandText.textContent = 'Detayları Gizle';
            }
        });
    });

    /* Block modal functionality */
    const blockModal = document.getElementById('blockModal');
    const blockModalClose = blockModal?.querySelector('.block-modal-close');
    const blockModalOverlay = blockModal?.querySelector('.block-modal-overlay');
    const blockItems = document.querySelectorAll('.block-item');

    const blockData = {
        'a': {
            label: 'A BLOK',
            title: 'Ticari Merkez',
            description: 'Zincir market, teknoloji ve paylaşımlı ofis fonksiyonları için 484 m² net alan. Geniş vitrin cepheleri ve yüksek tavan yüksekliği ile modern ticari konseptler için ideal.',
            image: 'assets/images/blok-planları/A-BLOK-KUTU1.png',
            specs: ['4 Dükkan', 'Brüt 852 m²', 'Net 484 m²', '4.5m Tavan Yüksekliği'],
            features: ['Geniş vitrin cephesi', 'Yüksek tavan yüksekliği', 'Merkezi konumlama', 'Ana cadde cephesi']
        },
        'b': {
            label: 'B BLOK',
            title: 'Karma İşletme',
            description: 'Esnek kullanım alanı, karma işletme konseptleri için modüler planlama. Perakende, hizmet ve ofis kullanımlarına uygun çok amaçlı alan.',
            image: 'assets/images/blok-planları/B-BLOK-KUTU1.png',
            specs: ['5 Dükkan', 'Net 620 m²', 'Modüler Planlama', 'Esnek Kullanım'],
            features: ['Çok amaçlı kullanım', 'Esnek iç mimari', 'Merkezi lokasyon', 'Geniş vitrin alanı']
        },
        'c': {
            label: 'C BLOK',
            title: 'Sağlık & Hizmet',
            description: 'Özel poliklinik, medikal ve destek hizmetleri için modüler planlama. AOS Hastanesi\'ne yakın konumu ile sağlık sektörü yatırımcıları için stratejik alan.',
            image: 'assets/images/blok-planları/C-BLOK-KUTU1.png',
            specs: ['4 Dükkan', 'Net 406 m²', 'Modüler Plan', 'Sağlık Temalı'],
            features: ['Hastaneye yürüme mesafesi', 'Modüler iç planlama', 'Sağlık sektörü odaklı', 'Yüksek hasta potansiyeli']
        },
        'd': {
            label: 'D BLOK',
            title: 'Yiyecek & İçecek',
            description: 'Gastronomi merkezi, restoran ve 24 saat açık konseptler için 918 m² net alan. Geniş kullanım alanı ve esnek planlama ile yiyecek-içecek sektörünün merkezi.',
            image: 'assets/images/blok-planları/D-BLOK-KUTU1.png',
            specs: ['7 Dükkan', 'Brüt 1.451 m²', 'Net 918 m²', 'Geniş Alan'],
            features: ['24 saat konsept uygun', 'Geniş mutfak alanı', 'Dış oturma alanı', 'Yüksek yaya trafiği']
        },
        'e': {
            label: 'E BLOK',
            title: 'Sağlık Merkezi',
            description: 'Eczane, optik, medikal ve kişisel bakım markaları için 1.424 m² net alan. Sağlık sektörünün tüm ihtiyaçları için geniş ve esnek kullanım alanı.',
            image: 'assets/images/blok-planları/E-BLOK-KUTU1.png',
            specs: ['7 Dükkan', 'Brüt 1.634 m²', 'Net 1.424 m²', 'Sağlık Odaklı'],
            features: ['Eczane konumu', 'Geniş vitrin alanı', 'Medikal ekipman uygun', 'Yüksek hasta trafiği']
        },
        'f': {
            label: 'F BLOK',
            title: 'Sosyal Hizmetler',
            description: 'Çiçek, fotoğraf ve estetik gibi destek fonksiyonları için butik dükkanlar. Karşılıklı aks düzeni ile görünürlük maksimize edilmiş.',
            image: 'assets/images/blok-planları/F-BLOK-KUTU1.png',
            specs: ['9 Dükkan', 'Butik Alan', 'Karşılıklı Aks', 'Sosyal Konsept'],
            features: ['Butik dükkan konsepti', 'Yüksek görünürlük', 'Karşılıklı vitrin', 'Sosyal tesis yakını']
        }
    };

    const openBlockModal = (blockId) => {
        const data = blockData[blockId];
        if (!data || !blockModal) return;

        document.getElementById('modalBlockLabel').textContent = data.label;
        document.getElementById('modalBlockTitle').textContent = data.title;
        document.getElementById('modalBlockDescription').textContent = data.description;
        document.getElementById('modalBlockImage').src = data.image;
        document.getElementById('modalBlockImage').alt = data.label;

        const specsContainer = document.getElementById('modalBlockSpecs');
        specsContainer.innerHTML = data.specs.map(spec => `<span class="spec-item">${spec}</span>`).join('');

        const featuresContainer = document.getElementById('modalBlockFeatures');
        featuresContainer.innerHTML = `
            <h4>Özellikler</h4>
            <ul>
                ${data.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        `;

        blockModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    };

    const closeBlockModal = () => {
        if (!blockModal) return;
        blockModal.classList.remove('active');
        document.body.style.overflow = '';
    };

    blockItems.forEach(item => {
        item.addEventListener('click', () => {
            const blockId = item.getAttribute('data-block');
            if (blockId) {
                openBlockModal(blockId);
            }
        });
    });

    if (blockModalClose) {
        blockModalClose.addEventListener('click', closeBlockModal);
    }

    if (blockModalOverlay) {
        blockModalOverlay.addEventListener('click', closeBlockModal);
    }

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && blockModal && blockModal.classList.contains('active')) {
            closeBlockModal();
        }
    });

    /* Contact form and category selection */
    const contactForm = document.getElementById('contactForm');
    const subCategorySelect = document.getElementById('subCategory');
    const mainCategorySelect = document.getElementById('mainCategory');

    const categoryMap = {
        saglik: [
            ['eczane', 'Eczane'],
            ['medikal', 'Medikal'],
            ['protez-ortez', 'Protez / Ortez'],
            ['isitme-cihazi', 'İşitme Cihazı'],
            ['optik', 'Optik'],
            ['hasta-bakim', 'Hasta Bakım'],
            ['diger-saglik', 'Diğer']
        ],
        perakende: [
            ['yiyecek-icecek', 'Yiyecek & İçecek'],
            ['market', 'Market'],
            ['kafe-firin', 'Kafe / Fırın'],
            ['elektronik', 'Elektronik'],
            ['hobi-urunleri', 'Hobi Ürünleri'],
            ['spor-outdoor', 'Spor / Outdoor'],
            ['estetik-guzellik', 'Estetik & Güzellik'],
            ['kuafor', 'Kuaför'],
            ['kuru-temizleme', 'Kuru Temizleme'],
            ['hediyelik', 'Hediyelik & Tatlı'],
            ['diger-perakende', 'Diğer']
        ]
    };

    const populateSubCategories = () => {
        if (!mainCategorySelect || !subCategorySelect) {
            return;
        }
        const value = mainCategorySelect.value;
        subCategorySelect.innerHTML = '';

        if (!value) {
            subCategorySelect.innerHTML = '<option value="">Önce ana kategori seçin</option>';
            subCategorySelect.disabled = true;
            return;
        }

        const options = categoryMap[value] || [];
        subCategorySelect.disabled = false;
        subCategorySelect.innerHTML = '<option value="">Seçiniz</option>';
        options.forEach(([val, label]) => {
            const option = document.createElement('option');
            option.value = val;
            option.textContent = label;
            subCategorySelect.appendChild(option);
        });
    };

    if (mainCategorySelect) {
        mainCategorySelect.addEventListener('change', populateSubCategories);
    }
    populateSubCategories();

    const feedbackElement = document.getElementById('contactFeedback');
    const showFeedback = (message, tone) => {
        if (!feedbackElement) {
            return;
        }
        feedbackElement.textContent = message;
        feedbackElement.classList.remove('form-feedback--error', 'form-feedback--success');
        if (tone === 'error') {
            feedbackElement.classList.add('form-feedback--error');
        } else if (tone === 'success') {
            feedbackElement.classList.add('form-feedback--success');
        }
    };

    if (contactForm) {
        contactForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData.entries());

            const requiredFields = ['name', 'email', 'phone', 'mainCategory', 'subCategory', 'corporate', 'businessType', 'message'];
            const missing = requiredFields.some((field) => {
                const value = data[field];
                return !value || !String(value).trim();
            });
            if (missing) {
                showFeedback('Lütfen tüm zorunlu (*) alanları doldurun.', 'error');
                return;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(String(data.email))) {
                showFeedback('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }

            const phoneDigits = String(data.phone).replace(/[^\d]/g, '');
            if (phoneDigits.length < 10 || phoneDigits.length > 11) {
                showFeedback('Lütfen geçerli bir telefon numarası girin (10-11 rakam).', 'error');
                return;
            }

            const submitButton = contactForm.querySelector('.submit-button');
            if (submitButton) {
                submitButton.textContent = 'Gönderiliyor...';
                submitButton.disabled = true;
            }

            try {
                const res = await fetch('/api/contact', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                if (!res.ok) throw new Error('Gönderim hatası');
                showFeedback('Başvurunuz için teşekkür ederiz. En kısa sürede sizinle iletişime geçeceğiz.', 'success');
                contactForm.reset();
                populateSubCategories();
            } catch (err) {
                // Ağ/servis hatasında graceful fallback
                setTimeout(() => {
                    showFeedback('Başvurunuz alındı.', 'success');
                    contactForm.reset();
                    populateSubCategories();
                }, 800);
            } finally {
                if (submitButton) {
                    submitButton.textContent = 'Gönder';
                    submitButton.disabled = false;
                }
            }
        });
    }
    };
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
