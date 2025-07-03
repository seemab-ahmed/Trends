
//   toogle menu code
  document.addEventListener("DOMContentLoaded", function () {
    const navToggle = document.getElementById("navToggle");
    const navLinks = document.querySelector(".nav-links");
    const closeToggle = document.getElementById("closeToggle");
    navToggle.addEventListener("click", function (e) {
      e.stopPropagation(); // prevent from bubbling up
      navLinks.classList.add("active");
    });
    closeToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      navLinks.classList.remove("active");
    });
    document.addEventListener("click", function (e) {
      const isClickInside = navLinks.contains(e.target) || navToggle.contains(e.target);
      if (!isClickInside) {
        navLinks.classList.remove("active");
      }
    });
  });

// hero animation
//   document.addEventListener("DOMContentLoaded", () => {
//     const title = document.querySelector(".hero-title");
//     const subtitle = document.querySelector(".hero-subtitle");

//     title.addEventListener("mousemove", (e) => {
//       const x = (e.clientX / window.innerWidth - 0.5) * 10;
//       const y = (e.clientY / window.innerHeight - 0.5) * 10;
//       title.style.transform = `translate(${x}px, ${y}px)`;
//     });

//     title.addEventListener("mouseleave", () => {
//       title.style.transform = "translate(0, 0)";
//     });
//   });

//   scrool animation on cards
// const steps = document.querySelectorAll('[data-step]');
//   const stepObserver = new IntersectionObserver(entries => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         entry.target.classList.add('active');
//         stepObserver.unobserve(entry.target);
//       }
//     });
//   }, { threshold: 0.4 });
//   steps.forEach(step => stepObserver.observe(step));


// Script per funzionalità future
document.addEventListener('DOMContentLoaded', () => {
    // Inizializza animazioni hero
    initHeroAnimations();
    
    // Test connessione Google Apps Script
    setTimeout(() => {
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz36LHPHfH10uMdGSBqSYIeTAaUPGpvHwBZtjlHyJF961EaMqEb2FA6-SMcOePTXRq4_w/exec';
        fetch(SCRIPT_URL, { method: 'GET' })
            .then(response => response.text())
            .catch(error => {
                // Gestione errore silente per produzione
            });
    }, 2000);
    
    // Aggiungiamo event listeners ai form
    const signupForm = document.getElementById('signupForm');
    const demoForm = document.getElementById('demoForm');
    
    if (signupForm) {
        signupForm.addEventListener('submit', handleDemoSubmit);
        
        // Verifica che l'input email sia accessibile
        const signupEmailInput = document.getElementById('signupEmail');
        if (signupEmailInput) {
            // Event listener per focus
            signupEmailInput.addEventListener('focus', () => {
                // Focus gestito
            });
        }
        
        // Event listener alternativo per il pulsante submit
        const signupButton = signupForm.querySelector('button[type="submit"]');
        if (signupButton) {
            signupButton.addEventListener('click', (e) => {
                e.preventDefault();
                handleDemoSubmit({ target: signupForm, preventDefault: () => {} });
            });
        }
    }
    
    if (demoForm) {
        demoForm.addEventListener('submit', handleDemoSubmit);
        
        // Verifica che l'input email sia accessibile
        const demoEmailInput = document.getElementById('demoEmail');
        if (demoEmailInput) {
            // Event listener per focus
            demoEmailInput.addEventListener('focus', () => {
                // Focus gestito
            });
        }
        
        // Event listener alternativo per il pulsante submit
        const demoButton = demoForm.querySelector('button[type="submit"]');
        if (demoButton) {
            demoButton.addEventListener('click', (e) => {
                e.preventDefault();
                handleDemoSubmit({ target: demoForm, preventDefault: () => {} });
            });
        }
    }
    
    // Scroll Progress Bar Logic
    const scrollProgress = document.querySelector('.scroll-progress');
    const scrollProgressBar = document.querySelector('.scroll-progress-bar');
    let scrollTimeout = null;
    let isScrolling = false;

    function updateScrollProgress() {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY;
        const scrollPercentage = (currentScroll / windowHeight) * 100;
        
        // Update progress bar width from center
        scrollProgressBar.style.width = `${scrollPercentage}%`;
    }

    function showScrollProgress() {
        if (!isScrolling) {
            isScrolling = true;
            scrollProgress.classList.add('visible');
        }

        // Clear previous timeout
        if (scrollTimeout) {
            clearTimeout(scrollTimeout);
        }

        // Set new timeout
        scrollTimeout = setTimeout(() => {
            scrollProgress.classList.remove('visible');
            isScrolling = false;
        }, 1500);
    }

    // Add scroll event listener with throttling
    let ticking = false;
    document.addEventListener('scroll', () => {
        showScrollProgress();
        
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateScrollProgress();
                ticking = false;
            });
            ticking = true;
        }
    });

    // Roadmap Animation Logic
    const timelineItems = document.querySelectorAll('.timeline-item[data-aos]');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };

    const animateItem = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateItem, observerOptions);
    timelineItems.forEach(item => observer.observe(item));

    // Language translations
    const translations = {
        en: {
            // Navigation
            trendIntro: "About Trend",
            investOpportunity: "Invest in the Project",
            joinUs: "Join the Team",
            ourTeam: "Meet the Founders",
            joinBeta: "Join Beta",

            // About Page
            aboutTitle: "About Trend",
            problemTitle: "The Problem",
            problemText: "Today, platforms reward those with more capital, not better insights. Trend flips that paradigm.",
            solutionTitle: "The Trend Solution",
            solutionText: "Each user can make predictions on stocks and crypto. Accuracy is tracked and rewarded with points, badges, and leaderboard visibility. No capital risk, no trading — just skill.",
            howItWorksTitle: "How It Works",
            howItWorksText: "Make a prediction → Track it → Climb the leaderboard. All in a transparent, traceable, zero-fee environment.",
            whyDifferentTitle: "Why It's Different",
            whyDifferentText: "Trend isn't a social network, a broker, or a simulator. It's a reputation system built on accuracy. Top users earn visibility, perks, access to advanced features, and eventually rewards.",

            // Hero Section
            heroTitle: "Trend: your market radar",
            heroSubtitle: "Trend is a prediction platform that leverages gamification to validate user accuracy. Each user makes predictions on stocks and crypto assets, monitors performance, and earns reputation scores based on precision. No direct trading, just signals and competition.",
            discoverTrend: "Discover Trend",
            requestDemo: "Request Demo",

            // Rest of the translations...
            step1Title: "Make a prediction",
            step1Desc: "Choose an asset from stocks or crypto.\nDecide if it will rise or fall over time.\nSet a horizon: from 1 hour to 1 year.\nAdd an expected percentage.\nSubmit your prediction in seconds.",
            step2Title: "Track the outcome",
            step2Desc: "Every prediction is tracked live.\nYou can see the trend and performance.\nYou always have access to your history.\nMore accuracy means more reputation.\nEverything is visible and updated in real-time.",
            step3Title: "Climb the leaderboard",
            step3Desc: "Get a score for each prediction.\nTop performers enter the monthly ranking.\nChallenge other users with your insights.\nMore precision = more visibility.\nBecome a top predictor and build credibility.",
            kickstarterTitle: "Support us on Kickstarter",
            kickstarterIntro: "Trend is live on Kickstarter and has already raised €1,400 from early supporters. Help us build the future of predictive finance!",
            raised: "Raised",
            completed: "Completed",
            nextStep: "Next step",
            emailTitle: "Want early updates?",
            emailPlaceholder: "Your email address",
            subscribe: "Subscribe",
            faqTitle: "Frequently Asked Questions",
            faqQ1: "What makes Trend different from a trading app?",
            faqA1: "Trend is not a broker: you don't buy or sell assets. You make predictions, earn reputation, and compete with the community.",
            faqQ2: "Is it free?",
            faqA2: "Yes, the basic version is free. Premium features will be available in the future.",
            faqQ3: "Do I need experience to start?",
            faqA3: "No, Trend is designed to be accessible to anyone, even those approaching markets for the first time.",
            roadmapTitle: "Trend grows with the community",
            roadmapCompletedTitle: "Completed",
            roadmapInProgressTitle: "In Progress",
            roadmapFutureTitle: "Next Steps",
            roadmapValidationTitle: "Idea & Community Validation",
            roadmapValidationDesc: "We gathered feedback from hundreds of users and investors to test the Trend concept.",
            roadmapLandingTitle: "Landing Page MVP",
            roadmapLandingDesc: "First version of the website is online, with multilingual support and expandable structure.",
            roadmapMvpTitle: "Working MVP (sandbox)",
            roadmapMvpDesc: "The current prototype shows the final structure but is not yet interactive: you can explore the interface, but not submit predictions.",
            roadmapPredictionTitle: "Prediction System",
            roadmapPredictionDesc: "Building the module that will allow users to submit predictions on stocks and crypto.",
            roadmapAccountTitle: "User Account & Profile",
            roadmapAccountDesc: "Creation of personal profiles, prediction history and visible reputation.",
            roadmapMobileTitle: "Mobile-first Design",
            roadmapMobileDesc: "Full optimization for smartphones and PWA for mobile browser use.",
            roadmapNotificationsTitle: "Notifications & Updates",
            roadmapNotificationsDesc: "Automatic alerts on prediction outcomes and leaderboard position.",
            socialTitle: "Follow us on social",
            socialTwitterDesc: "Real-time updates and news",
            socialLinkedinDesc: "Project news and insights",
            socialInstagramDesc: "Visual content and stories",
            socialTelegramDesc: "Community and direct updates",
            socialDiscordDesc: "Real-time chat and support",
            footerRights: "© 2024 Trend. All rights reserved.",
            footerDisclaimer: "© 2024 Trend. All rights reserved. The content on this site, including text, images, logos, and graphics, is protected by copyright and may not be copied, reproduced, or distributed without written permission. The information provided does not constitute financial advice. Use of the platform implies acceptance of the terms and conditions.",

            // Demo Page
            demoTitle: "Request a Demo",
            demoIntro: "Enter your email address and we'll get in touch with you shortly.",
            demoEmailPlaceholder: "Your email",
            demoSubmit: "Submit request",
            demoThankYou: "Thanks for your request! We'll contact you as soon as possible.",

            // Collaborate Page
            collaborateTitle: "Join Trend – Let's build the future of predictive finance together",
            collaborateDescription1: "Trend is an innovative project that aims to redefine the interaction between financial prediction and user reputation. Through a platform that combines gamification and technology, we validate users' predictive accuracy on stock and cryptocurrency markets, promoting transparency, competence and meritocracy.",
            collaborateDescription2: "We are constantly looking for professionals, developers, creatives, marketing experts and fintech enthusiasts who want to join a dynamic, ambitious environment oriented towards real impact. If you share our vision and want to contribute concretely to building the platform, we'll be happy to learn about your profile.",
            collaborateContactText: "If you're interested, you can send your CV or collaboration proposal to:",
            collaboratePageTitle: "Join Trend - Your market radar",

            // Team Page
            teamPageTitle: "Meet the Founders of Trend",
            teamPageIntro: "Here you'll find the profiles of the founders and the team members who are building Trend.",

            // Team Page Content
            teamSectionTitle: "Our team",
            teamIntroText: "Our most important resource at Trend is the team.<br>We are a growing reality that focuses on innovation, quality and impact: every day we are committed to building a tool that revolutionizes the way users analyze and predict financial markets.<br>Behind every feature, interface or strategy there is a close-knit, determined and transparent team.",
            teamValuesTitle: "The values that guide us",
            teamCultureText: "Trend's culture defines our identity.<br>We are a team open to dialogue, guided by user satisfaction and focused on operational excellence. We believe in collaboration, curiosity and continuous improvement.",
            teamValue1: "<strong>Teamwork</strong> – We take responsibility for our common goals, working in synergy to build a useful and lasting product.",
            teamValue2: "<strong>User orientation</strong> – We put the needs of investors, analysts and anyone who wants to grow in the world of markets at the center.",
            teamValue3: "<strong>Ambition</strong> – We want to learn, grow and overcome our limits.",
            teamValue4: "<strong>Conscious innovation</strong> – Every function is born from a real need and active listening.",
            teamValue5: "<strong>Integrity</strong> – We promote transparency in decisions and communication, both within the team and externally.",

            // Invest Page
            investPageTitle: "Invest in the Future with Trend",
            investPageIntro: "Discover the investment opportunities and how to become part of the Trend project.",

            // Invest Page Content
            investMainTitle: "Investment Opportunities",
            investIntroTitle: "Transparent Introduction",
            investIntroText: "Trend is an independent fintech initiative, currently in pre-incorporation phase. The project was born with the ambition to revolutionize the way users and analysts share market predictions, through a reputational and gamified platform. We are looking for collaborations, mentors and investors who want to support a new vision of financial forecasting.",
            investStatusTitle: "Current Project Status",
            investStatus1: "Public working MVP accessible from browser",
            investStatus2: "Reputational scoring system and leaderboard already operational",
            investStatus3: "Growing community, with first active registrations",
            investStatus4: "First Kickstarter campaign completed successfully",
            investStatus5: "Live hosting on dedicated domain: www.trendmarketapp.com",
            investStatus6: "Clear roadmap: mobile version, badge system, API and premium model",
            investSupportTitle: "What we are looking for support in",
            investSupport1: "Technical or growth co-founders with shared vision",
            investSupport2: "Pre-seed investors for the company incorporation phase",
            investSupport3: "Industry advisors with experience in fintech, reputation, AI",
            investSupport4: "Connections with funds, incubators or accelerators",
            investWhyTitle: "Why Trend is a valid bet",
            investWhy1: "Expanding market: social trading, reputation and gamification",
            investWhy2: "No consolidated player with this 'prediction-driven' structure",
            investWhy3: "Scalable model, with transparent monetization (premium, B2B insights, API)",
            investWhy4: "Original positioning in the European landscape",
            investContactTitle: "Direct Contacts",
            investContactText: "If you are interested in collaborating or investing in the project, you can write to us at:",
            investContactNote: "The team will respond with additional material on request (pitch, deck, roadmap, market analysis).",

            // our Story section
            storytittle:"Discover Our Story: Redefine Digital Excellence at NextMarketing.",
            storylead:"Step into the heart of NextMarketing, where a dynamic blend of passion and expertise fuels our journey to redefine digital success.",
            storydesc:"Since 2012, we’ve been pioneering innovative solutions, crafting unique narratives, and consistently delivering exceptional results. Join us in shaping the future of digital excellence!",
            storystarted:"Get Started",
            storywork:"How it work?",
            featuretitle1:"Digital Innovation Leaders",
             featuretitle2:"Proven Results Achievers",
              featuretitle3:"Tailored Strategy Experts",
        
                   //   about section
            aboutlabel:"About Us",
            abouttitle:"Finance Guide On All Phase Of Life.",
            aboutdesc:"This statistic is based on our average personal current account online opening time from the last 12 months.",
            aboutfeaturetitle1:"Solution Focused",
            aboutfeaturedesc1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat",
            aboutfeaturetitle2:"99.99% Success",
            aboutfeaturedesc2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat",
            aboutdiscover:"Discover More",
        },
        it: {
            // Navigation
            trendIntro: "Cos'è Trend",
            investOpportunity: "Opportunità di investimento",
            joinUs: "Collabora con noi",
            ourTeam: "Il nostro Team",
            joinBeta: "Partecipa alla Beta",

            // About Page
            aboutTitle: "Cos'è Trend",
            problemTitle: "Il problema",
            problemText: "Oggi le piattaforme premiano chi ha più soldi da investire, non chi ha buone intuizioni. Trend cambia questo paradigma.",
            solutionTitle: "La soluzione Trend",
            solutionText: "Ogni utente può fare previsioni su azioni e criptovalute. La precisione viene tracciata e premiata con punti, badge e visibilità in classifica. Nessun rischio di capitale, nessuna operatività: solo la tua capacità.",
            howItWorksTitle: "Come funziona",
            howItWorksText: "Fai una previsione → Monitora → Scala la classifica. Il tutto in un ambiente trasparente, tracciabile e senza commissioni.",
            whyDifferentTitle: "Perché è diverso",
            whyDifferentText: "Trend non è un social, non è un broker e non è un simulatore: è un sistema reputazionale basato sull'accuratezza. I migliori ottengono visibilità, vantaggi, accesso a funzioni avanzate e in futuro compensi.",

            // Hero Section
            heroTitle: "Trend: il tuo radar sui mercati",
            heroSubtitle: "Trend è una piattaforma di previsione dei mercati finanziari che sfrutta la gamification per validare l'accuratezza degli utenti. Ogni utente formula previsioni su asset azionari e crypto, monitora le performance e ottiene punteggi reputazionali in base alla precisione. Nessuna operatività diretta, solo signal e competizione.",
            discoverTrend: "Scopri Trend",
            requestDemo: "Richiedi Demo",

            // Rest of the translations...
            step1Title: "Fai una previsione",
            step1Desc: "Scegli un asset tra azioni o crypto.\nDecidi se salirà o scenderà nel tempo.\nImposta un orizzonte: da 1 ora a 1 anno.\nAggiungi una percentuale attesa.\nInvia la tua previsione in pochi secondi.",
            step2Title: "Monitora l'esito",
            step2Desc: "Ogni previsione viene tracciata live.\nPuoi vedere l'andamento e la performance.\nHai sempre accesso al tuo storico.\nPiù sei accurato, più guadagni reputazione.\nTutto è visibile e aggiornato in tempo reale.",
            step3Title: "Scala la classifica",
            step3Desc: "Ottieni un punteggio per ogni previsione.\nI migliori entrano nel ranking mensile.\nSfida gli altri utenti con le tue intuizioni.\nPiù precisione = più visibilità.\nDiventa un top predictor e costruisci credibilità.",
            kickstarterTitle: "Sostienici su Kickstarter",
            kickstarterIntro: "Trend è live su Kickstarter e ha già raccolto €1.400 dai primi sostenitori. Aiutaci a costruire il futuro della finanza predittiva!",
            raised: "Raccolti",
            completed: "Completato",
            nextStep: "Prossima tappa",
            emailTitle: "Vuoi ricevere aggiornamenti in anteprima?",
            emailPlaceholder: "Il tuo indirizzo email",
            subscribe: "Iscriviti",
            faqTitle: "Domande Frequenti",
            faqQ1: "Cosa rende Trend diverso da un'app di trading?",
            faqA1: "Trend non è un broker: non compri o vendi asset. Fai previsioni, guadagni reputazione e ti confronti con la community.",
            faqQ2: "È gratis?",
            faqA2: "Sì, la versione base è gratuita. In futuro saranno disponibili funzionalità premium opzionali.",
            faqQ3: "Serve esperienza per iniziare?",
            faqA3: "No, Trend è pensata per essere accessibile a chiunque, anche a chi si avvicina per la prima volta ai mercati.",
            roadmapTitle: "Trend cresce con la community",
            roadmapCompletedTitle: "Completato",
            roadmapInProgressTitle: "In corso",
            roadmapFutureTitle: "Prossimi step",
            roadmapValidationTitle: "Validazione idea e community",
            roadmapValidationDesc: "Abbiamo raccolto feedback da centinaia di utenti e investitori per testare il concetto di Trend.",
            roadmapLandingTitle: "Landing page MVP",
            roadmapLandingDesc: "Online la prima versione del sito, con supporto multilingua e struttura espandibile.",
            roadmapMvpTitle: "MVP funzionante (sandbox)",
            roadmapMvpDesc: "Il prototipo attuale mostra la struttura finale ma non è ancora interattivo: puoi esplorare l'interfaccia, ma non inserire previsioni.",
            roadmapPredictionTitle: "Sistema di previsioni",
            roadmapPredictionDesc: "Costruzione del modulo che permetterà agli utenti di inviare previsioni su azioni e crypto.",
            roadmapAccountTitle: "Account utente & profilo",
            roadmapAccountDesc: "Creazione dei profili personali, storico previsioni e reputazione visibile.",
            roadmapMobileTitle: "Mobile-first design",
            roadmapMobileDesc: "Ottimizzazione totale per smartphone e PWA per uso da browser mobile.",
            roadmapNotificationsTitle: "Notifiche e aggiornamenti",
            roadmapNotificationsDesc: "Avvisi automatici su esito delle previsioni e posizionamento in classifica.",
            socialTitle: "Seguici sui social",
            socialTwitterDesc: "Aggiornamenti in tempo reale e novità",
            socialLinkedinDesc: "News e insights sul progetto",
            socialInstagramDesc: "Contenuti visual e stories",
            socialTelegramDesc: "Community e aggiornamenti diretti",
            socialDiscordDesc: "Chat e supporto real-time",
            footerRights: "© 2024 Trend. Tutti i diritti riservati.",
            footerDisclaimer: "© 2024 Trend. Tutti i diritti riservati. I contenuti presenti su questo sito, inclusi testi, immagini, loghi e grafiche, sono protetti da copyright e non possono essere copiati, riprodotti o distribuiti senza autorizzazione scritta. Le informazioni fornite non costituiscono consulenza finanziaria. L'utilizzo della piattaforma implica l'accettazione dei termini e delle condizioni.",

            // Demo Page
            demoTitle: "Richiedi una demo",
            demoIntro: "Inserisci il tuo indirizzo email per essere ricontattato dal team di Trend.",
            demoEmailPlaceholder: "La tua email",
            demoSubmit: "Invia richiesta",
            demoThankYou: "Grazie per la richiesta! Ti contatteremo il prima possibile.",

            // Collaborate Page
            collaborateTitle: "Unisciti a Trend – Costruiamo insieme il futuro della finanza predittiva",
            collaborateDescription1: "Trend è un progetto innovativo che si pone l'obiettivo di ridefinire l'interazione tra previsione finanziaria e reputazione utente. Attraverso una piattaforma che unisce gamification e tecnologia, validiamo l'accuratezza predittiva degli utenti su mercati azionari e criptovalutari, promuovendo trasparenza, competenza e meritocrazia.",
            collaborateDescription2: "Siamo alla costante ricerca di professionisti, sviluppatori, creativi, esperti di marketing e appassionati del mondo fintech che desiderano unirsi a un ambiente dinamico, ambizioso e orientato all'impatto reale. Se condividi la nostra visione e vuoi contribuire in modo concreto alla costruzione della piattaforma, saremo lieti di conoscere il tuo profilo.",
            collaborateContactText: "Se sei interessato, puoi inviare il tuo CV o una proposta di collaborazione a:",
            collaboratePageTitle: "Collabora con Trend - Il tuo radar sui mercati",

            // Team Page
            teamPageTitle: "Incontra i Fondatori di Trend",
            teamPageIntro: "Qui troverai i profili dei fondatori e dei membri del team che stanno costruendo Trend.",

            // Team Page Content
            teamSectionTitle: "Il nostro team",
            teamIntroText: "La nostra risorsa più importante in Trend è il team.<br>Siamo una realtà in crescita che punta sull'innovazione, sulla qualità e sull'impatto: ogni giorno ci impegniamo per costruire uno strumento che rivoluzioni il modo in cui gli utenti analizzano e prevedono i mercati finanziari.<br>Dietro ogni funzionalità, interfaccia o strategia c'è una squadra affiatata, determinata e trasparente.",
            teamValuesTitle: "I valori che ci guidano",
            teamCultureText: "La cultura di Trend definisce la nostra identità.<br>Siamo un team aperto al confronto, guidato dalla soddisfazione degli utenti e focalizzato sull'eccellenza operativa. Crediamo nella collaborazione, nella curiosità e nel miglioramento continuo.",
            teamValue1: "<strong>Lavoro di squadra</strong> – Ci assumiamo la responsabilità dei nostri obiettivi comuni, lavorando in sinergia per costruire un prodotto utile e duraturo.",
            teamValue2: "<strong>Orientamento all'utente</strong> – Mettiamo al centro i bisogni degli investitori, degli analisti e di chiunque voglia crescere nel mondo dei mercati.",
            teamValue3: "<strong>Ambizione</strong> – Vogliamo imparare, crescere e superare i nostri limiti.",
            teamValue4: "<strong>Innovazione consapevole</strong> – Ogni funzione nasce da un bisogno reale e da un ascolto attivo.",
            teamValue5: "<strong>Integrità</strong> – Promuoviamo la trasparenza nelle decisioni e nella comunicazione, sia all'interno del team che verso l'esterno.",

            // Invest Page
            investPageTitle: "Investi nel Futuro con Trend",
            investPageIntro: "Scopri le opportunità di investimento e come diventare parte del progetto Trend.",

            // Invest Page Content
            investMainTitle: "Opportunità di investimento",
            investIntroTitle: "Introduzione trasparente",
            investIntroText: "Trend è un'iniziativa fintech indipendente, attualmente in fase pre-costituzione. Il progetto nasce con l'ambizione di rivoluzionare il modo in cui utenti e analisti condividono previsioni di mercato, attraverso una piattaforma reputazionale e gamificata. Siamo alla ricerca di collaborazioni, mentor e investitori che vogliano supportare una visione nuova del forecasting finanziario.",
            investStatusTitle: "Stato attuale del progetto",
            investStatus1: "MVP pubblico funzionante e accessibile da browser",
            investStatus2: "Sistema di punteggio reputazionale e classifica già operativo",
            investStatus3: "Community in crescita, con prime iscrizioni attive",
            investStatus4: "Prima campagna Kickstarter completata con successo",
            investStatus5: "Hosting live su dominio dedicato: www.trendmarketapp.com",
            investStatus6: "Roadmap chiara: versione mobile, sistema badge, API e premium model",
            investSupportTitle: "In cosa cerchiamo supporto",
            investSupport1: "Co-fondatori tecnici o growth con visione condivisa",
            investSupport2: "Investitori pre-seed per la fase di costituzione della società",
            investSupport3: "Advisor di settore con esperienza in fintech, reputazione, AI",
            investSupport4: "Connessioni con fondi, incubatori o acceleratori",
            investWhyTitle: "Perché Trend è una scommessa valida",
            investWhy1: "Mercato in espansione: social trading, reputazione e gamification",
            investWhy2: "Nessun player consolidato con questa struttura \"prediction-driven\"",
            investWhy3: "Modello scalabile, con monetizzazione trasparente (premium, B2B insights, API)",
            investWhy4: "Posizionamento originale nel panorama europeo",
            investContactTitle: "Contatti diretti",
            investContactText: "Se sei interessato a collaborare o investire nel progetto, puoi scriverci a:",
            investContactNote: "Il team risponderà con materiale aggiuntivo su richiesta (pitch, deck, roadmap, analisi di mercato).",

            // our Story section
            storytittle:"Scopri la nostra storia: Ridefinisci l'eccellenza digitale con NextMarketing.",
            storylead:"Entra nel cuore di NextMarketing, dove un mix dinamico di passione e competenza alimenta il nostro percorso per ridefinire il successo digitale.",
            storydesc:"Dal 2012, siamo pionieri di soluzioni innovative, creiamo narrazioni uniche e forniamo costantemente risultati eccezionali. Unisciti a noi per plasmare il futuro dell'eccellenza digitale!",
            storystarted:"Inizia",
            storywork:"Come funziona?",
            featuretitle1:"Leader dell'innovazione digitale",
             featuretitle2:"Risultati comprovati Persone di successo",
              featuretitle3:"Esperti in strategie su misura",

            //   about section
            aboutlabel:"Chi siamo",
            abouttitle:"Guida finanziaria per tutte le fasi della vita.",
            aboutdesc:"Questa statistica si basa sul tempo medio di apertura dei nostri conti correnti personali online negli ultimi 12 mesi.",
            aboutfeaturetitle1:"Focalizzata sulla soluzione",
            aboutfeaturedesc1:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat",
            aboutfeaturetitle2:"Successo del 99,99%",
            aboutfeaturedesc2:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec felis tincidunt feugiat",
            aboutdiscover:"Scopri di più",

        }
    };

    // Get saved language or default to Italian
    let currentLang = localStorage.getItem('language') || 'it';

    // Function to update text content
    function updateContent(lang) {
        // Update all elements with data-i18n attribute
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (element.tagName.toLowerCase() === 'title') {
                    document.title = translations[lang][key];
                } else {
                    // Check if the translation contains HTML tags
                    if (translations[lang][key].includes('<')) {
                        element.innerHTML = translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                }
            }
        });

        // Update placeholders for inputs with data-i18n-placeholder
        document.querySelectorAll('[data-i18n-placeholder]').forEach(element => {
            const key = element.getAttribute('data-i18n-placeholder');
            if (translations[lang][key]) {
                element.placeholder = translations[lang][key];
            }
        });

        // Update active language in toggle
        document.querySelectorAll('.lang-option').forEach(option => {
            const isActive = option.getAttribute('data-lang') === lang;
            option.classList.toggle('active', isActive);
        });

        // Update document language
        document.documentElement.lang = lang;
    }

    // Set up language toggle listeners
    document.querySelectorAll('.lang-option').forEach(option => {
        option.addEventListener('click', (e) => {
            const newLang = e.target.getAttribute('data-lang');
            if (newLang !== currentLang) {
                currentLang = newLang;
                localStorage.setItem('language', currentLang);
                updateContent(currentLang);
            }
        });
    });

    // Initialize content with saved language
    updateContent(currentLang);

    // Initialize active language in toggle
    document.querySelector(`[data-lang="${currentLang}"]`).classList.add('active');

    // Carousel Navigation
    const carousel = document.getElementById('socialCarousel');
    if (!carousel) return;

    const cardsContainer = carousel.querySelector('.social-cards-container');
    const cards = carousel.querySelectorAll('.social-card');
    const cardWidth = 240; // Width of each card
    const gap = 32; // Gap between cards
    let currentIndex = 0;
    let startX = 0;
    let scrollLeft = 0;
    let isDragging = false;

    // Clone cards for infinite scroll
    cards.forEach(card => {
        const clone = card.cloneNode(true);
        cardsContainer.appendChild(clone);
    });

    function updateCarousel(direction) {
        const totalCards = cards.length;
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % totalCards;
        } else {
            currentIndex = (currentIndex - 1 + totalCards) % totalCards;
        }
        
        const offset = -(currentIndex * (cardWidth + gap));
        cardsContainer.style.transform = `translateX(${offset}px)`;
    }

    // Button controls
    const prevBtn = carousel.querySelector('.prev-btn');
    const nextBtn = carousel.querySelector('.next-btn');

    prevBtn?.addEventListener('click', () => {
        updateCarousel('prev');
    });

    nextBtn?.addEventListener('click', () => {
        updateCarousel('next');
    });

    // Touch events
    carousel.addEventListener('touchstart', dragStart);
    carousel.addEventListener('touchend', dragEnd);
    carousel.addEventListener('touchmove', drag);

    // Mouse events
    carousel.addEventListener('mousedown', dragStart);
    carousel.addEventListener('mouseup', dragEnd);
    carousel.addEventListener('mouseleave', dragEnd);
    carousel.addEventListener('mousemove', drag);

    function dragStart(e) {
        isDragging = true;
        carousel.classList.add('dragging');
        startX = e.type === 'touchstart' ? e.touches[0].pageX : e.pageX;
        scrollLeft = cardsContainer.scrollLeft;
    }

    function drag(e) {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.type === 'touchmove' ? e.touches[0].pageX : e.pageX;
        const walk = (x - startX) * 2;
        cardsContainer.scrollLeft = scrollLeft - walk;
    }

    function dragEnd() {
        isDragging = false;
        carousel.classList.remove('dragging');
        
        // Snap to nearest card
        const cardCenter = cardWidth + gap;
        const scrollPos = cardsContainer.scrollLeft;
        const nearestCard = Math.round(scrollPos / cardCenter);
        
        cardsContainer.scrollTo({
            left: nearestCard * cardCenter,
            behavior: 'smooth'
        });
    }

    // Auto scroll
    let autoScrollInterval;
    
    function startAutoScroll() {
        autoScrollInterval = setInterval(() => {
            updateCarousel('next');
        }, 3000);
    }

    function stopAutoScroll() {
        clearInterval(autoScrollInterval);
    }

    // Start auto scroll and handle hover pause
    startAutoScroll();
    
    carousel.addEventListener('mouseenter', stopAutoScroll);
    carousel.addEventListener('mouseleave', startAutoScroll);

    // How It Works Scroll Animation
    const section = document.querySelector('.how-it-works-scroll');
    const title = document.querySelector('.scroll-title');
    const panels = document.querySelectorAll('.step-panel');
    
    if (!section || !title || panels.length === 0) return;

    // Calcola l'altezza totale della sezione
    const totalHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
    const scrollStep = totalHeight / (panels.length + 1); // +1 per includere il titolo

    function updateScroll() {
        const sectionRect = section.getBoundingClientRect();
        const scrollProgress = -sectionRect.top / (totalHeight - viewportHeight);

        // Anima il titolo
        if (scrollProgress >= 0 && scrollProgress <= 0.2) {
            title.classList.add('visible');
        } else {
            title.classList.remove('visible');
        }

        // Anima i pannelli
        panels.forEach((panel, index) => {
            const panelProgress = (scrollProgress - (index * 0.33)) * 3;
            
            if (panelProgress >= 0 && panelProgress <= 1) {
                panel.classList.add('active');
                panel.style.opacity = Math.min(1, 2 - panelProgress * 2);
            } else {
                panel.classList.remove('active');
                panel.style.opacity = 0;
            }
        });
    }

    // Gestisci lo scroll
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateScroll);
    });

    // Inizializza lo stato
    updateScroll();
});

// Scroll animations
function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Only animate once
        }
    });
}

// Set up the Intersection Observer
const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

// Observe all elements with animate-on-scroll class
document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.animate-on-scroll');
    elements.forEach(el => observer.observe(el));
});

// Demo form handling
async function handleDemoSubmit(event) {
    event.preventDefault();
    const form = event.target;
    
    const messageDiv = form.id === 'demoForm' ? 
        document.getElementById('demoMessage') : 
        document.getElementById('signupMessage');
    const submitButton = form.querySelector('button[type="submit"]');
    const email = form.id === 'demoForm' ? 
        document.getElementById('demoEmail').value : 
        document.getElementById('signupEmail').value;
    
    // Email validation
    
    // Disabilita il bottone durante l'invio
    submitButton.disabled = true;
    submitButton.style.opacity = '0.7';
    messageDiv.style.display = 'none';
    
    try {
        // Get current date and time in Italy timezone
        const now = new Date();
        const options = { timeZone: 'Europe/Rome' };
        const date = now.toLocaleDateString('it-IT', options);
        const time = now.toLocaleTimeString('it-IT', options);

        // Google Apps Script endpoint
        const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbz36LHPHfH10uMdGSBqSYIeTAaUPGpvHwBZtjlHyJF961EaMqEb2FA6-SMcOePTXRq4_w/exec';
        
        const payload = {
            date: date,
            time: time,
            email: email,
            source: form.id === 'demoForm' ? 'demo' : 'newsletter' // Aggiungiamo la fonte della richiesta
        };
        
        // Invio dati al server
        
        const response = await fetch(SCRIPT_URL, {
            redirect: 'follow',
            method: 'POST',
            headers: {
                'Content-Type': 'text/plain;charset=utf-8',
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Invio completato con successo
        messageDiv.textContent = form.id === 'demoForm' ?
            'Grazie per la richiesta! Ti contatteremo il prima possibile.' :
            'Grazie per l\'iscrizione! Riceverai i nostri aggiornamenti.';
        messageDiv.style.backgroundColor = 'rgba(79, 70, 229, 0.1)';
        messageDiv.style.display = 'block';
        form.reset();
        
    } catch (error) {
        // Gestione errore
        messageDiv.textContent = 'Errore durante l\'invio. Per favore riprova tra qualche minuto.';
        messageDiv.style.backgroundColor = 'rgba(255, 0, 0, 0.1)';
        messageDiv.style.display = 'block';
    } finally {
        // Riabilita il bottone
        submitButton.disabled = false;
        submitButton.style.opacity = '1';
    }
    
    return false;
}

// Funzione per inizializzare le animazioni hero
function initHeroAnimations() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        const heroElements = document.querySelectorAll('.hero-title-animated, .hero-subtitle-animated, .hero-cta-animated');
        heroElements.forEach(element => {
            element.style.opacity = '1';
            element.style.transform = 'none';
            element.style.animation = 'none';
        });
    }
}

// simple faq js
//   const faqItems = document.querySelectorAll(".faq-item");
//   faqItems.forEach(item => {
//     const question = item.querySelector(".faq-question");
//     question.addEventListener("click", () => {
//       const isOpen = item.classList.contains("active");
//       faqItems.forEach(i => i.classList.remove("active"));
//       if (!isOpen) item.classList.add("active");
//     });
//   });
/*
ISTRUZIONI PER CONFIGURARE GOOGLE APPS SCRIPT:

1. Vai su Google Drive e crea un nuovo Google Sheet
2. Rinomina il foglio in "Demo Requests"
3. Aggiungi le intestazioni: Data | Ora | Email
4. Vai su Extensions > Apps Script
5. Sostituisci il codice con questo script:

function doPost(e) {
  try {
    Logger.log('Inizio elaborazione richiesta');
    
    // Abilita CORS
    var headers = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST',
      'Access-Control-Allow-Headers': 'Content-Type'
    };

    // Verifica se abbiamo ricevuto dei dati
    if (!e || !e.postData) {
      Logger.log('Nessun oggetto evento o postData');
      return ContentService.createTextOutput(JSON.stringify({
        'status': 'error',
        'message': 'No data received'
      }))
      .setMimeType(ContentService.MimeType.JSON)
      .setHeaders(headers);
    }

    // Log dei dati ricevuti
    Logger.log('Dati ricevuti: ' + JSON.stringify(e));
    Logger.log('Post data: ' + JSON.stringify(e.postData));
    
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    Logger.log('Dati parsati: ' + JSON.stringify(data));
    
    // Verifica che i dati necessari siano presenti
    if (!data.date || !data.time || !data.email) {
      throw new Error('Dati mancanti nel payload');
    }
    
    sheet.appendRow([
      data.date,
      data.time,
      data.email
    ]);
    
    Logger.log('Riga aggiunta con successo');
    
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'success',
      'message': 'Data added successfully'
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    Logger.log('Errore: ' + error.toString());
    return ContentService.createTextOutput(JSON.stringify({
      'status': 'error',
      'message': error.toString()
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

// Aggiungi questa funzione per testare che lo script sia attivo
function doGet(e) {
  return ContentService.createTextOutput('Service is running');
}

6. Fai clic su Deploy > New deployment
7. Scegli "Web app"
8. Imposta:
   - Execute as: Me
   - Who has access: Anyone
9. Fai clic su "Deploy"
10. Copia l'URL generato
11. Sostituisci YOUR_GOOGLE_SCRIPT_URL nello js/script.js con l'URL copiato

NOTA SULLA SICUREZZA:
- Il deployment è pubblico per semplicità
- Per maggiore sicurezza, considera:
  * Aggiungere validazione lato server
  * Implementare rate limiting
  * Aggiungere un token di autenticazione
  * Limitare l'accesso a domini specifici
*/ 

 // FAQs Js here
$(document).ready(function() {
  // Hide all FAQ bodies initially
  $('.faq-answer').hide();

  // Show the first FAQ item by default
  $('.faq-item:first-child .faq-answer').show();
  $('.faq-item:first-child .faq-question').addClass('active');

  // Click event for FAQ headers
  $('.faq-question').click(function() {
    var $thisBody = $(this).next('.faq-answer');

    // Toggle the clicked body
    $thisBody.slideToggle();
    $(this).toggleClass('active');

    // Close all other FAQ bodies and remove active class
    $('.faq-question').not(this).removeClass('active');
    $('.faq-answer').not($thisBody).slideUp();
  });
});