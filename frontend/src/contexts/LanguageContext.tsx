import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'es';

interface Translations {
  // Navigation
  nav: {
    home: string;
    about: string;
    playAreas: string;
    admission: string;
    requirements: string;
    gallery: string;
    contact: string;
    waiver: string;
  };
  // Hero Section
  hero: {
    title: string;
    subtitle: string;
    signWaiver: string;
    contactUs: string;
    hours: string;
    hoursValue: string;
    daily: string;
    ages: string;
    agesValue: string;
    safeFun: string;
    location: string;
    locationValue: string;
  };
  // About Section
  about: {
    title: string;
    subtitle: string;
    cleanSafeTitle: string;
    description1: string;
    description2: string;
    safetyFirst: string;
    safetyDesc: string;
    cleanEnvironment: string;
    cleanDesc: string;
    ageAppropriate: string;
    ageDesc: string;
    supervisedPlay: string;
    supervisedDesc: string;
    importantRequirements: string;
    waiverRequired: string;
    waiverDesc: string;
    gripSocks: string;
    gripSocksDesc: string;
    adultPolicy: string;
    adultPolicyDesc: string;
  };
  // Play Areas
  playAreas: {
    title: string;
    subtitle: string;
    toddlerZone: string;
    toddlerDesc: string;
    climbingStructures: string;
    climbingDesc: string;
    activePlayZone: string;
    activeDesc: string;
    interactiveGames: string;
    interactiveDesc: string;
    creativeCorner: string;
    creativeDesc: string;
    adventureArea: string;
    adventureDesc: string;
    equipmentSafety: string;
    equipmentDesc: string;
  };
  // Safety Notice
  safety: {
    title: string;
    gripSocksRequired: string;
    gripSocksDesc: string;
    available: string;
    childrenSocks: string;
    adultSocks: string;
    perPair: string;
    purchaseNote: string;
    pleaseNote: string;
    mandatoryNote: string;
  };
  // Daily Admission
  admission: {
    title: string;
    subtitle: string;
    weekday: string;
    weekend: string;
    perChild: string;
    allDayAccess: string;
    freeAdults: string;
    additionalAdults: string;
    whatsIncluded: string;
    allDayAccessDesc: string;
    freeAdultsDesc: string;
    allPlayAreasDesc: string;
    timeDefinitions: string;
    weekdays: string;
    weekends: string;
    signWaiverVisit: string;
  };
  // Group Discounts
  groups: {
    title: string;
    subtitle: string;
    groupsOf10: string;
    perChild: string;
    perfectFor: string;
    schools: string;
    daycares: string;
    summerCamps: string;
    youthOrgs: string;
    benefits: string;
    savePerChild: string;
    allDayAccess: string;
    supervised: string;
    safeFacility: string;
    callAhead: string;
    callAheadDesc: string;
    phone: string;
    email: string;
  };
  // Birthday Packages
  birthday: {
    title: string;
    subtitle: string;
    basic: string;
    plus: string;
    weekday: string;
    weekend: string;
    passes: string;
    guestOfHonor: string;
    socksIncluded: string;
    partyRoom: string;
    additionalChildren: string;
    smallerCelebrations: string;
    biggerCelebrations: string;
    allKidsReady: string;
    everyoneReady: string;
    plentyOfTime: string;
    mostPopular: string;
    bookPackage: string;
    readyToBook: string;
    readyToBookDesc: string;
  };
  // Monthly Passes
  monthly: {
    title: string;
    subtitle: string;
    unlimitedPlay: string;
    perChild: string;
    benefits: string;
    unlimitedVisits: string;
    unlimitedDesc: string;
    allDayAccess: string;
    allDayDesc: string;
    weekdaysWeekends: string;
    weekdaysWeekendsDesc: string;
    bestValue: string;
    bestValueDesc: string;
    greatValue: string;
    greatValueDesc: string;
    getPass: string;
    contactNote: string;
  };
  // Requirements
  requirements: {
    title: string;
    subtitle: string;
    waiverRequirement: string;
    waiverDesc: string;
    waiverIncludes: string;
    acknowledgment: string;
    release: string;
    photoRelease: string;
    supervision: string;
    signOnline: string;
    gripSocksPolicy: string;
    gripSocksDesc: string;
    gripSocksHelps: string;
    preventSlips: string;
    maintainCleanliness: string;
    betterTraction: string;
    childrenSocks: string;
    adultSocks: string;
    perPair: string;
    availableAtDesk: string;
    adultAdmission: string;
    includedAdults: string;
    includedAdultsDesc: string;
    mustRemain: string;
    additionalAdults: string;
    additionalAdultsDesc: string;
    importantReminders: string;
    parentsRemain: string;
    childrenSupervised: string;
    facilityAges: string;
    foodDrinks: string;
    followRules: string;
    questionsContact: string;
  };
  // Gallery
  gallery: {
    title: string;
    subtitle: string;
    loading: string;
    photoLabel: string;
    visitUs: string;
  };
  // Contact
  contact: {
    title: string;
    subtitle: string;
    address: string;
    phone: string;
    email: string;
    hours: string;
    hoursValue: string;
  };
  // Footer
  footer: {
    quickLinks: string;
    contactInfo: string;
    followUs: string;
    adminLogin: string;
    employeeWaiverCheck: string;
    builtWith: string;
  };
  // Waiver Page
  waiver: {
    backToHome: string;
    title: string;
    subtitle: string;
    parentInfo: string;
    fullName: string;
    email: string;
    phone: string;
    childrenInfo: string;
    childrenInfoDesc: string;
    child: string;
    childName: string;
    birthday: string;
    optional: string;
    termsAndConditions: string;
    readTerms: string;
    agreeToTerms: string;
    agreeDesc: string;
    submit: string;
    submitting: string;
    cancel: string;
    successTitle: string;
    successMessage: string;
    signAnother: string;
    returnHome: string;
    enterName: string;
    enterEmail: string;
    enterPhone: string;
    enterChildName: string;
    atLeastOne: string;
    agreeRequired: string;
    submitError: string;
  };
  // Employee Waiver Check
  employee: {
    title: string;
    subtitle: string;
    searchTitle: string;
    searchDesc: string;
    searchPlaceholder: string;
    searching: string;
    foundResults: string;
    recentWaivers: string;
    searchResults: string;
    autoRefresh: string;
    matchingCriteria: string;
    mostRecent: string;
    loadingWaivers: string;
    failedToLoad: string;
    noWaivers: string;
    noResults: string;
    children: string;
    child: string;
    childrenInfo: string;
    agreedToTerms: string;
    didNotAgree: string;
    home: string;
  };
  // Common
  common: {
    tax: string;
    daily: string;
    minutes: string;
    min: string;
  };
}

const translations: Record<Language, Translations> = {
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      playAreas: 'Play Areas',
      admission: 'Admission',
      requirements: 'Requirements',
      gallery: 'Gallery',
      contact: 'Contact',
      waiver: 'Waiver',
    },
    hero: {
      title: "Oklahoma City's Premier Indoor Playground",
      subtitle: 'Where Fun Meets Safety!',
      signWaiver: 'Sign Waiver',
      contactUs: 'Contact Us',
      hours: 'Hours',
      hoursValue: '9:30 AM - 8:30 PM',
      daily: 'Daily',
      ages: 'Ages',
      agesValue: '6 Months - 10 Years',
      safeFun: 'Safe & Fun',
      location: 'Location',
      locationValue: '1624 W I-240 Service Rd',
    },
    about: {
      title: 'About Our Facility',
      subtitle: "Oklahoma City's premier indoor playground designed with your child's safety and fun in mind",
      cleanSafeTitle: 'Clean, Safe Play Areas',
      description1: 'Our facility features state-of-the-art play equipment specifically designed for children\'s safety. Every area is regularly cleaned and maintained to ensure a hygienic environment for your little ones.',
      description2: 'We provide a complete indoor play experience with various play zones including soft play areas, climbing structures, slides, and interactive games suitable for children aged 6 months to 10 years.',
      safetyFirst: 'Safety First',
      safetyDesc: 'All equipment meets safety standards and is regularly inspected',
      cleanEnvironment: 'Clean Environment',
      cleanDesc: 'Daily deep cleaning and sanitization of all play areas',
      ageAppropriate: 'Age Appropriate',
      ageDesc: 'Designed for children 6 months to 10 years old',
      supervisedPlay: 'Supervised Play',
      supervisedDesc: 'Parents can relax while kids play in a safe environment',
      importantRequirements: 'Important Requirements',
      waiverRequired: 'Waiver Required:',
      waiverDesc: 'All children must have a signed waiver before play',
      gripSocks: 'Grip Socks:',
      gripSocksDesc: 'Required for all children - $2/pair + Tax (available for purchase)',
      adultPolicy: 'Adult Policy:',
      adultPolicyDesc: 'Each child admission includes 2 free adults. Additional adults $5 per person + Tax',
    },
    playAreas: {
      title: 'Our Play Areas',
      subtitle: 'Explore our diverse play zones designed to engage, entertain, and inspire children of all ages',
      toddlerZone: 'Toddler Zone',
      toddlerDesc: 'Safe, soft play area designed specifically for our youngest visitors (6 months - 3 years)',
      climbingStructures: 'Climbing Structures',
      climbingDesc: 'Multi-level climbing equipment with slides and tunnels for active play',
      activePlayZone: 'Active Play Zone',
      activeDesc: 'High-energy area with obstacle courses and physical challenges',
      interactiveGames: 'Interactive Games',
      interactiveDesc: 'Digital and physical games that encourage learning through play',
      creativeCorner: 'Creative Corner',
      creativeDesc: 'Arts, crafts, and imaginative play stations for creative minds',
      adventureArea: 'Adventure Area',
      adventureDesc: 'Themed play zones that spark imagination and adventure',
      equipmentSafety: "Equipment Designed for Children's Safety",
      equipmentDesc: 'All our play equipment meets or exceeds safety standards and is regularly inspected and maintained. We prioritize your child\'s safety while ensuring maximum fun!',
    },
    safety: {
      title: 'Important Safety Notice',
      gripSocksRequired: 'Grip Socks Required',
      gripSocksDesc: 'All children must wear grip socks for safety while playing in our facility. This helps prevent slips and falls on our play equipment.',
      available: 'Grip Socks Available',
      childrenSocks: "Children's Grip Socks",
      adultSocks: 'Adult Socks',
      perPair: 'per pair',
      purchaseNote: 'Available for purchase at our front desk',
      pleaseNote: 'Please Note:',
      mandatoryNote: "Grip socks are mandatory for all children. If you don't have grip socks, you can purchase them at our facility before play begins.",
    },
    admission: {
      title: 'Daily Admission',
      subtitle: 'All-day play access with unlimited fun for your little ones!',
      weekday: 'Weekday Admission',
      weekend: 'Weekend Admission',
      perChild: 'per child',
      allDayAccess: 'All-day play access',
      freeAdults: '2 free adults per child',
      additionalAdults: 'Additional adults: $5 + Tax each',
      whatsIncluded: "What's Included",
      allDayAccessDesc: 'Play as long as you want during operating hours',
      freeAdultsDesc: 'Two adults included with each child admission',
      allPlayAreasDesc: 'Access to every zone in our facility',
      timeDefinitions: 'Time Definitions',
      weekdays: 'Weekdays: Monday - Thursday',
      weekends: 'Weekends: Friday - Sunday',
      signWaiverVisit: 'Sign Waiver & Visit Today',
    },
    groups: {
      title: 'Group Discounts',
      subtitle: 'Special pricing for schools, daycares, and large groups',
      groupsOf10: 'Groups of 10+ Children',
      perChild: 'per child',
      perfectFor: 'Perfect For',
      schools: 'Schools & Field Trips',
      daycares: 'Daycare Centers',
      summerCamps: 'Summer Camps',
      youthOrgs: 'Youth Organizations',
      benefits: 'Benefits',
      savePerChild: 'Save $1-$3 per child',
      allDayAccess: 'All-day play access',
      supervised: 'Supervised environment',
      safeFacility: 'Safe, clean facility',
      callAhead: 'Call Ahead to Book Your Group Visit',
      callAheadDesc: 'Please contact us in advance to schedule your group visit and ensure we can accommodate your party.',
      phone: 'Phone:',
      email: 'Email:',
    },
    birthday: {
      title: 'Birthday Party Packages',
      subtitle: "Make your child's birthday unforgettable with our all-inclusive party packages!",
      basic: 'Basic Birthday Package',
      plus: 'Plus Birthday Package',
      weekday: 'Weekday',
      weekend: 'Weekend',
      passes: 'Passes',
      guestOfHonor: '+ Guest of Honor',
      socksIncluded: 'Grip Socks Included',
      partyRoom: 'Minutes Party Room',
      additionalChildren: 'Additional Children',
      smallerCelebrations: 'Perfect for smaller celebrations',
      biggerCelebrations: 'Perfect for bigger celebrations',
      allKidsReady: 'All kids ready to play safely',
      everyoneReady: 'Everyone ready to play safely',
      plentyOfTime: 'Plenty of time for cake and fun',
      mostPopular: 'Most Popular',
      bookPackage: 'Book This Package',
      readyToBook: 'Ready to Book Your Party?',
      readyToBookDesc: "Contact us today to reserve your party date and make your child's birthday celebration extra special!",
    },
    monthly: {
      title: 'Monthly Passes',
      subtitle: 'Unlimited play for a full month - the best value for frequent visitors!',
      unlimitedPlay: 'Unlimited Monthly Play',
      perChild: 'per child',
      benefits: 'Pass Benefits',
      unlimitedVisits: 'Unlimited Visits',
      unlimitedDesc: 'Come as often as you like',
      allDayAccess: 'All-Day Access',
      allDayDesc: 'Stay as long as you want',
      weekdaysWeekends: 'Weekdays & Weekends',
      weekdaysWeekendsDesc: "Valid any day we're open",
      bestValue: 'Best Value',
      bestValueDesc: 'Pay once, play all month',
      greatValue: '💰 Great Value!',
      greatValueDesc: 'Visit just 5 times and you\'ve already saved money compared to daily admission! Perfect for families who love to play often.',
      getPass: 'Get Your Monthly Pass',
      contactNote: 'Contact us to purchase your monthly pass today!',
    },
    requirements: {
      title: 'Requirements & Policies',
      subtitle: 'Please review our facility requirements before your visit',
      waiverRequirement: 'Waiver Requirement',
      waiverDesc: 'All children must have a signed waiver before play.',
      waiverIncludes: 'Parents or legal guardians must complete and sign a comprehensive liability waiver for each child before they can access our play areas. This waiver includes:',
      acknowledgment: 'Acknowledgment of inherent risks in physical play activities',
      release: 'Release of liability for injuries or accidents',
      photoRelease: 'Photo and video release authorization',
      supervision: 'Agreement to supervise children during play',
      signOnline: 'Sign Waiver Online',
      gripSocksPolicy: 'Grip Socks Policy',
      gripSocksDesc: 'Grip socks are required for all children.',
      gripSocksHelps: 'For safety and hygiene reasons, all children must wear grip socks while playing in our facility. This policy helps:',
      preventSlips: 'Prevent slips and falls on play equipment',
      maintainCleanliness: 'Maintain cleanliness of play areas',
      betterTraction: 'Provide better traction during active play',
      childrenSocks: "Children's Grip Socks",
      adultSocks: 'Adult Socks',
      perPair: '/pair + Tax',
      availableAtDesk: 'Available for purchase at our front desk',
      adultAdmission: 'Adult Admission Policy',
      includedAdults: 'Included Adults',
      includedAdultsDesc: 'Each child admission includes 2 free adults to supervise and accompany the child during play.',
      mustRemain: 'Adults must remain on premises to supervise their children at all times.',
      additionalAdults: 'Additional Adults',
      additionalAdultsDesc: 'Each additional adult beyond the 2 included adults requires a separate admission fee.',
      importantReminders: 'Important Reminders',
      parentsRemain: 'Parents/guardians must remain on premises during their child\'s visit',
      childrenSupervised: 'Children must be supervised by an adult at all times',
      facilityAges: 'Facility is designed for children ages 6 months to 10 years',
      foodDrinks: 'Food and drinks are allowed in designated areas only',
      followRules: 'Please follow all posted safety rules and staff instructions',
      questionsContact: 'Questions about our requirements? Contact us at',
    },
    gallery: {
      title: 'Play Area Gallery',
      subtitle: 'See the fun and excitement at KIDS Indoor Play & Event',
      loading: 'Loading gallery images...',
      photoLabel: 'Photo',
      visitUs: 'Visit us to experience the fun in person! Follow us on social media for more photos and updates.',
    },
    contact: {
      title: 'Contact Us',
      subtitle: 'Get in touch with us for bookings, questions, or visit information',
      address: 'Address',
      phone: 'Phone',
      email: 'Email',
      hours: 'Hours',
      hoursValue: '9:30 AM - 8:00 PM Daily',
    },
    footer: {
      quickLinks: 'Quick Links',
      contactInfo: 'Contact Info',
      followUs: 'Follow Us',
      adminLogin: 'Admin Login',
      employeeWaiverCheck: 'Employee Waiver Check',
      builtWith: 'Built with love using',
    },
    waiver: {
      backToHome: 'Back to Home',
      title: 'Liability Waiver & Photo Release',
      subtitle: 'Required for all children before play',
      parentInfo: 'Parent/Guardian Information',
      fullName: 'Full Name',
      email: 'Email Address',
      phone: 'Phone Number',
      childrenInfo: 'Children Information',
      childrenInfoDesc: 'Enter information for up to 6 children (at least one required)',
      child: 'Child',
      childName: "Child's Full Name",
      birthday: 'Birthday',
      optional: 'Optional',
      termsAndConditions: 'Terms and Conditions',
      readTerms: 'Please read the following terms carefully before agreeing',
      agreeToTerms: 'I agree to the Liability Waiver and Photo Release:',
      agreeDesc: 'I have read and understand the comprehensive liability waiver and photo release above. I acknowledge the risks involved, agree to release KIDS Indoor Play & Event from all liability, agree to supervise my children at all times, and authorize the use of photographs and videos of my child(ren) for promotional purposes.',
      submit: 'Submit Waiver',
      submitting: 'Submitting...',
      cancel: 'Cancel',
      successTitle: 'Waiver Submitted Successfully!',
      successMessage: "Thank you for signing the waiver. You're all set to visit us!",
      signAnother: 'Sign Another Waiver',
      returnHome: 'Return to Home',
      enterName: 'Enter your full name',
      enterEmail: 'your.email@example.com',
      enterPhone: '(405) 123-4567',
      enterChildName: "Enter child's name",
      atLeastOne: "Please enter at least one child's name",
      agreeRequired: 'Please agree to the liability waiver and photo release terms',
      submitError: 'Failed to submit waiver. Please try again.',
    },
    employee: {
      title: 'Employee Waiver Check',
      subtitle: 'Search for waivers by child or parent name',
      searchTitle: 'Search Waivers',
      searchDesc: "Enter a child's name or parent's name to search",
      searchPlaceholder: 'Search by child or parent name...',
      searching: 'Searching...',
      foundResults: 'Found',
      recentWaivers: 'Recent Waivers',
      searchResults: 'Search Results',
      autoRefresh: 'Auto-refreshes every 5 seconds',
      matchingCriteria: 'Waivers matching your search criteria',
      mostRecent: 'The 5 most recently submitted waivers',
      loadingWaivers: 'Loading waivers...',
      failedToLoad: 'Failed to load waivers. Please try again later.',
      noWaivers: 'No recent waivers',
      noResults: 'No waivers found matching your search',
      children: 'children',
      child: 'child',
      childrenInfo: 'Children Information',
      agreedToTerms: 'Agreed to liability waiver and photo release',
      didNotAgree: 'Did not agree to terms',
      home: 'Home',
    },
    common: {
      tax: '+ Tax',
      daily: 'Daily',
      minutes: 'minutes',
      min: 'min',
    },
  },
  es: {
    nav: {
      home: 'Inicio',
      about: 'Acerca de',
      playAreas: 'Áreas de Juego',
      admission: 'Admisión',
      requirements: 'Requisitos',
      gallery: 'Galería',
      contact: 'Contacto',
      waiver: 'Exención',
    },
    hero: {
      title: 'El Principal Parque de Juegos Interior de Oklahoma City',
      subtitle: '¡Donde la Diversión se Encuentra con la Seguridad!',
      signWaiver: 'Firmar Exención',
      contactUs: 'Contáctenos',
      hours: 'Horario',
      hoursValue: '9:30 AM - 8:30 PM',
      daily: 'Diario',
      ages: 'Edades',
      agesValue: '6 Meses - 10 Años',
      safeFun: 'Seguro y Divertido',
      location: 'Ubicación',
      locationValue: '1624 W I-240 Service Rd',
    },
    about: {
      title: 'Acerca de Nuestra Instalación',
      subtitle: 'El principal parque de juegos interior de Oklahoma City diseñado pensando en la seguridad y diversión de su hijo',
      cleanSafeTitle: 'Áreas de Juego Limpias y Seguras',
      description1: 'Nuestra instalación cuenta con equipos de juego de última generación diseñados específicamente para la seguridad de los niños. Cada área se limpia y mantiene regularmente para garantizar un ambiente higiénico para sus pequeños.',
      description2: 'Proporcionamos una experiencia de juego interior completa con varias zonas de juego que incluyen áreas de juego suave, estructuras para escalar, toboganes y juegos interactivos adecuados para niños de 6 meses a 10 años.',
      safetyFirst: 'Seguridad Primero',
      safetyDesc: 'Todo el equipo cumple con los estándares de seguridad y se inspecciona regularmente',
      cleanEnvironment: 'Ambiente Limpio',
      cleanDesc: 'Limpieza profunda diaria y desinfección de todas las áreas de juego',
      ageAppropriate: 'Apropiado para la Edad',
      ageDesc: 'Diseñado para niños de 6 meses a 10 años',
      supervisedPlay: 'Juego Supervisado',
      supervisedDesc: 'Los padres pueden relajarse mientras los niños juegan en un ambiente seguro',
      importantRequirements: 'Requisitos Importantes',
      waiverRequired: 'Exención Requerida:',
      waiverDesc: 'Todos los niños deben tener una exención firmada antes de jugar',
      gripSocks: 'Calcetines Antideslizantes:',
      gripSocksDesc: 'Requeridos para todos los niños - $2/par + Impuesto (disponibles para compra)',
      adultPolicy: 'Política de Adultos:',
      adultPolicyDesc: 'Cada admisión de niño incluye 2 adultos gratis. Adultos adicionales $5 por persona + Impuesto',
    },
    playAreas: {
      title: 'Nuestras Áreas de Juego',
      subtitle: 'Explore nuestras diversas zonas de juego diseñadas para involucrar, entretener e inspirar a niños de todas las edades',
      toddlerZone: 'Zona de Niños Pequeños',
      toddlerDesc: 'Área de juego suave y segura diseñada específicamente para nuestros visitantes más jóvenes (6 meses - 3 años)',
      climbingStructures: 'Estructuras para Escalar',
      climbingDesc: 'Equipo de escalada multinivel con toboganes y túneles para juego activo',
      activePlayZone: 'Zona de Juego Activo',
      activeDesc: 'Área de alta energía con cursos de obstáculos y desafíos físicos',
      interactiveGames: 'Juegos Interactivos',
      interactiveDesc: 'Juegos digitales y físicos que fomentan el aprendizaje a través del juego',
      creativeCorner: 'Rincón Creativo',
      creativeDesc: 'Estaciones de arte, manualidades y juego imaginativo para mentes creativas',
      adventureArea: 'Área de Aventura',
      adventureDesc: 'Zonas de juego temáticas que despiertan la imaginación y la aventura',
      equipmentSafety: 'Equipo Diseñado para la Seguridad de los Niños',
      equipmentDesc: '¡Todo nuestro equipo de juego cumple o supera los estándares de seguridad y se inspecciona y mantiene regularmente. Priorizamos la seguridad de su hijo mientras garantizamos la máxima diversión!',
    },
    safety: {
      title: 'Aviso de Seguridad Importante',
      gripSocksRequired: 'Calcetines Antideslizantes Requeridos',
      gripSocksDesc: 'Todos los niños deben usar calcetines antideslizantes por seguridad mientras juegan en nuestra instalación. Esto ayuda a prevenir resbalones y caídas en nuestro equipo de juego.',
      available: 'Calcetines Antideslizantes Disponibles',
      childrenSocks: 'Calcetines Antideslizantes para Niños',
      adultSocks: 'Calcetines para Adultos',
      perPair: 'por par',
      purchaseNote: 'Disponibles para compra en nuestra recepción',
      pleaseNote: 'Tenga en Cuenta:',
      mandatoryNote: 'Los calcetines antideslizantes son obligatorios para todos los niños. Si no tiene calcetines antideslizantes, puede comprarlos en nuestra instalación antes de comenzar a jugar.',
    },
    admission: {
      title: 'Admisión Diaria',
      subtitle: '¡Acceso de juego todo el día con diversión ilimitada para sus pequeños!',
      weekday: 'Admisión Entre Semana',
      weekend: 'Admisión de Fin de Semana',
      perChild: 'por niño',
      allDayAccess: 'Acceso de juego todo el día',
      freeAdults: '2 adultos gratis por niño',
      additionalAdults: 'Adultos adicionales: $5 + Impuesto cada uno',
      whatsIncluded: 'Qué Está Incluido',
      allDayAccessDesc: 'Juegue todo el tiempo que quiera durante el horario de operación',
      freeAdultsDesc: 'Dos adultos incluidos con cada admisión de niño',
      allPlayAreasDesc: 'Acceso a cada zona en nuestra instalación',
      timeDefinitions: 'Definiciones de Tiempo',
      weekdays: 'Entre Semana: Lunes - Jueves',
      weekends: 'Fines de Semana: Viernes - Domingo',
      signWaiverVisit: 'Firme la Exención y Visite Hoy',
    },
    groups: {
      title: 'Descuentos para Grupos',
      subtitle: 'Precios especiales para escuelas, guarderías y grupos grandes',
      groupsOf10: 'Grupos de 10+ Niños',
      perChild: 'por niño',
      perfectFor: 'Perfecto Para',
      schools: 'Escuelas y Excursiones',
      daycares: 'Centros de Cuidado Infantil',
      summerCamps: 'Campamentos de Verano',
      youthOrgs: 'Organizaciones Juveniles',
      benefits: 'Beneficios',
      savePerChild: 'Ahorre $1-$3 por niño',
      allDayAccess: 'Acceso de juego todo el día',
      supervised: 'Ambiente supervisado',
      safeFacility: 'Instalación segura y limpia',
      callAhead: 'Llame con Anticipación para Reservar su Visita de Grupo',
      callAheadDesc: 'Por favor contáctenos con anticipación para programar su visita de grupo y asegurarnos de que podamos acomodar a su grupo.',
      phone: 'Teléfono:',
      email: 'Correo Electrónico:',
    },
    birthday: {
      title: 'Paquetes de Fiesta de Cumpleaños',
      subtitle: '¡Haga que el cumpleaños de su hijo sea inolvidable con nuestros paquetes de fiesta todo incluido!',
      basic: 'Paquete Básico de Cumpleaños',
      plus: 'Paquete Plus de Cumpleaños',
      weekday: 'Entre Semana',
      weekend: 'Fin de Semana',
      passes: 'Pases',
      guestOfHonor: '+ Invitado de Honor',
      socksIncluded: 'Calcetines Antideslizantes Incluidos',
      partyRoom: 'Minutos de Sala de Fiesta',
      additionalChildren: 'Niños Adicionales',
      smallerCelebrations: 'Perfecto para celebraciones más pequeñas',
      biggerCelebrations: 'Perfecto para celebraciones más grandes',
      allKidsReady: 'Todos los niños listos para jugar de forma segura',
      everyoneReady: 'Todos listos para jugar de forma segura',
      plentyOfTime: 'Mucho tiempo para pastel y diversión',
      mostPopular: 'Más Popular',
      bookPackage: 'Reservar Este Paquete',
      readyToBook: '¿Listo para Reservar su Fiesta?',
      readyToBookDesc: '¡Contáctenos hoy para reservar la fecha de su fiesta y hacer que la celebración de cumpleaños de su hijo sea extra especial!',
    },
    monthly: {
      title: 'Pases Mensuales',
      subtitle: '¡Juego ilimitado durante un mes completo - el mejor valor para visitantes frecuentes!',
      unlimitedPlay: 'Juego Mensual Ilimitado',
      perChild: 'por niño',
      benefits: 'Beneficios del Pase',
      unlimitedVisits: 'Visitas Ilimitadas',
      unlimitedDesc: 'Venga tan a menudo como quiera',
      allDayAccess: 'Acceso Todo el Día',
      allDayDesc: 'Quédese todo el tiempo que quiera',
      weekdaysWeekends: 'Entre Semana y Fines de Semana',
      weekdaysWeekendsDesc: 'Válido cualquier día que estemos abiertos',
      bestValue: 'Mejor Valor',
      bestValueDesc: 'Pague una vez, juegue todo el mes',
      greatValue: '💰 ¡Gran Valor!',
      greatValueDesc: '¡Visite solo 5 veces y ya habrá ahorrado dinero en comparación con la admisión diaria! Perfecto para familias que aman jugar a menudo.',
      getPass: 'Obtenga su Pase Mensual',
      contactNote: '¡Contáctenos para comprar su pase mensual hoy!',
    },
    requirements: {
      title: 'Requisitos y Políticas',
      subtitle: 'Por favor revise los requisitos de nuestra instalación antes de su visita',
      waiverRequirement: 'Requisito de Exención',
      waiverDesc: 'Todos los niños deben tener una exención firmada antes de jugar.',
      waiverIncludes: 'Los padres o tutores legales deben completar y firmar una exención de responsabilidad integral para cada niño antes de que puedan acceder a nuestras áreas de juego. Esta exención incluye:',
      acknowledgment: 'Reconocimiento de riesgos inherentes en actividades de juego físico',
      release: 'Liberación de responsabilidad por lesiones o accidentes',
      photoRelease: 'Autorización de liberación de fotos y videos',
      supervision: 'Acuerdo para supervisar a los niños durante el juego',
      signOnline: 'Firmar Exención en Línea',
      gripSocksPolicy: 'Política de Calcetines Antideslizantes',
      gripSocksDesc: 'Se requieren calcetines antideslizantes para todos los niños.',
      gripSocksHelps: 'Por razones de seguridad e higiene, todos los niños deben usar calcetines antideslizantes mientras juegan en nuestra instalación. Esta política ayuda a:',
      preventSlips: 'Prevenir resbalones y caídas en el equipo de juego',
      maintainCleanliness: 'Mantener la limpieza de las áreas de juego',
      betterTraction: 'Proporcionar mejor tracción durante el juego activo',
      childrenSocks: 'Calcetines Antideslizantes para Niños',
      adultSocks: 'Calcetines para Adultos',
      perPair: '/par + Impuesto',
      availableAtDesk: 'Disponibles para compra en nuestra recepción',
      adultAdmission: 'Política de Admisión de Adultos',
      includedAdults: 'Adultos Incluidos',
      includedAdultsDesc: 'Cada admisión de niño incluye 2 adultos gratis para supervisar y acompañar al niño durante el juego.',
      mustRemain: 'Los adultos deben permanecer en las instalaciones para supervisar a sus hijos en todo momento.',
      additionalAdults: 'Adultos Adicionales',
      additionalAdultsDesc: 'Cada adulto adicional más allá de los 2 adultos incluidos requiere una tarifa de admisión separada.',
      importantReminders: 'Recordatorios Importantes',
      parentsRemain: 'Los padres/tutores deben permanecer en las instalaciones durante la visita de su hijo',
      childrenSupervised: 'Los niños deben ser supervisados por un adulto en todo momento',
      facilityAges: 'La instalación está diseñada para niños de 6 meses a 10 años',
      foodDrinks: 'Los alimentos y bebidas están permitidos solo en áreas designadas',
      followRules: 'Por favor siga todas las reglas de seguridad publicadas e instrucciones del personal',
      questionsContact: '¿Preguntas sobre nuestros requisitos? Contáctenos al',
    },
    gallery: {
      title: 'Galería de Áreas de Juego',
      subtitle: 'Vea la diversión y emoción en KIDS Indoor Play & Event',
      loading: 'Cargando imágenes de la galería...',
      photoLabel: 'Foto',
      visitUs: '¡Visítenos para experimentar la diversión en persona! Síguenos en las redes sociales para más fotos y actualizaciones.',
    },
    contact: {
      title: 'Contáctenos',
      subtitle: 'Póngase en contacto con nosotros para reservas, preguntas o información de visita',
      address: 'Dirección',
      phone: 'Teléfono',
      email: 'Correo Electrónico',
      hours: 'Horario',
      hoursValue: '9:30 AM - 8:00 PM Diario',
    },
    footer: {
      quickLinks: 'Enlaces Rápidos',
      contactInfo: 'Información de Contacto',
      followUs: 'Síguenos',
      adminLogin: 'Inicio de Sesión de Administrador',
      employeeWaiverCheck: 'Verificación de Exención de Empleados',
      builtWith: 'Construido con amor usando',
    },
    waiver: {
      backToHome: 'Volver al Inicio',
      title: 'Exención de Responsabilidad y Liberación de Fotos',
      subtitle: 'Requerido para todos los niños antes de jugar',
      parentInfo: 'Información del Padre/Tutor',
      fullName: 'Nombre Completo',
      email: 'Correo Electrónico',
      phone: 'Número de Teléfono',
      childrenInfo: 'Información de los Niños',
      childrenInfoDesc: 'Ingrese información para hasta 6 niños (al menos uno requerido)',
      child: 'Niño',
      childName: 'Nombre Completo del Niño',
      birthday: 'Cumpleaños',
      optional: 'Opcional',
      termsAndConditions: 'Términos y Condiciones',
      readTerms: 'Por favor lea los siguientes términos cuidadosamente antes de aceptar',
      agreeToTerms: 'Acepto la Exención de Responsabilidad y Liberación de Fotos:',
      agreeDesc: 'He leído y entiendo la exención de responsabilidad integral y la liberación de fotos anteriores. Reconozco los riesgos involucrados, acepto liberar a KIDS Indoor Play & Event de toda responsabilidad, acepto supervisar a mis hijos en todo momento y autorizo el uso de fotografías y videos de mi(s) hijo(s) con fines promocionales.',
      submit: 'Enviar Exención',
      submitting: 'Enviando...',
      cancel: 'Cancelar',
      successTitle: '¡Exención Enviada Exitosamente!',
      successMessage: '¡Gracias por firmar la exención. ¡Está todo listo para visitarnos!',
      signAnother: 'Firmar Otra Exención',
      returnHome: 'Volver al Inicio',
      enterName: 'Ingrese su nombre completo',
      enterEmail: 'su.correo@ejemplo.com',
      enterPhone: '(405) 123-4567',
      enterChildName: 'Ingrese el nombre del niño',
      atLeastOne: 'Por favor ingrese el nombre de al menos un niño',
      agreeRequired: 'Por favor acepte los términos de la exención de responsabilidad y liberación de fotos',
      submitError: 'Error al enviar la exención. Por favor intente de nuevo.',
    },
    employee: {
      title: 'Verificación de Exención de Empleados',
      subtitle: 'Buscar exenciones por nombre de niño o padre',
      searchTitle: 'Buscar Exenciones',
      searchDesc: 'Ingrese el nombre de un niño o padre para buscar',
      searchPlaceholder: 'Buscar por nombre de niño o padre...',
      searching: 'Buscando...',
      foundResults: 'Encontrado',
      recentWaivers: 'Exenciones Recientes',
      searchResults: 'Resultados de Búsqueda',
      autoRefresh: 'Se actualiza automáticamente cada 5 segundos',
      matchingCriteria: 'Exenciones que coinciden con sus criterios de búsqueda',
      mostRecent: 'Las 5 exenciones enviadas más recientemente',
      loadingWaivers: 'Cargando exenciones...',
      failedToLoad: 'Error al cargar exenciones. Por favor intente de nuevo más tarde.',
      noWaivers: 'No hay exenciones recientes',
      noResults: 'No se encontraron exenciones que coincidan con su búsqueda',
      children: 'niños',
      child: 'niño',
      childrenInfo: 'Información de los Niños',
      agreedToTerms: 'Aceptó la exención de responsabilidad y liberación de fotos',
      didNotAgree: 'No aceptó los términos',
      home: 'Inicio',
    },
    common: {
      tax: '+ Impuesto',
      daily: 'Diario',
      minutes: 'minutos',
      min: 'min',
    },
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translations;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved === 'es' ? 'es' : 'en') as Language;
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t: translations[language],
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
