// ============================
// KONFIGURACE CEN SLUŽEB
// ============================
// Tento soubor je jediným místem, kde se spravují ceny všech služeb.
// Při změně ceny stačí upravit hodnotu zde a změna se projeví v celé aplikaci.

const SERVICE_PRICES = {
    // Hlavní služby
    konzultaceDoma: {
        hourlyRate: 700,      // Kč za hodinu
        minutelyRate: 700/60, // Kč za minutu (vypočítáno z hodinové sazby)
        travelRate: 8,        // Kč za km
        description: 'Konzultace u Vás doma'
    },

    konzultaceOnline: {
        hourlyRate: 700,      // Kč za hodinu
        minutelyRate: 700/60, // Kč za minutu (vypočítáno z hodinové sazby)
        description: 'Konzultace on-line'
    },

    predporodniPriprava: {
        basePrice: 1950,      // Kč za workshop (pár)
        travelRate: 8,        // Kč za km (při osobní konzultaci)
        description: 'Předporodní příprava na kojení'
    },

    odstav: {
        basePrice: 1690,      // Kč za program
        travelRate: 8,        // Kč za km (při osobní konzultaci)
        description: 'Odstav s respektem'
    },

    // Doplňkové služby
    stribrnyKloboucek: {
        weeklyRate: 300,      // Kč za týden
        description: 'Stříbrný klobouček (pronájem)'
    },

    nositko: {
        monthlyRate: 600,     // Kč za měsíc
        description: 'Nosítko (pronájem)'
    },

    satek: {
        monthlyRate: 400,     // Kč za měsíc
        description: 'Šátek (pronájem)'
    },

    olej: {
        pricePerPiece: 200,   // Kč za 2 ml
        description: 'Esenciální levandulový olej'
    }
};

// Pro zpětnou kompatibilitu s existujícím kódem
const PRICES = {
    konzultaceDoma: {
        hourly: SERVICE_PRICES.konzultaceDoma.hourlyRate,
        minutely: SERVICE_PRICES.konzultaceDoma.minutelyRate,
        perKm: SERVICE_PRICES.konzultaceDoma.travelRate
    },
    konzultaceOnline: {
        hourly: SERVICE_PRICES.konzultaceOnline.hourlyRate,
        minutely: SERVICE_PRICES.konzultaceOnline.minutelyRate
    },
    predporodniPriprava: {
        base: SERVICE_PRICES.predporodniPriprava.basePrice,
        perKm: SERVICE_PRICES.predporodniPriprava.travelRate
    },
    odstav: {
        base: SERVICE_PRICES.odstav.basePrice,
        perKm: SERVICE_PRICES.odstav.travelRate
    },
    stribrnyKloboucek: {
        perWeek: SERVICE_PRICES.stribrnyKloboucek.weeklyRate
    },
    nositko: {
        perMonth: SERVICE_PRICES.nositko.monthlyRate
    },
    satek: {
        perMonth: SERVICE_PRICES.satek.monthlyRate
    },
    olej: {
        perPiece: SERVICE_PRICES.olej.pricePerPiece
    }
};

// Export pro použití v jiných souborech
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { SERVICE_PRICES, PRICES };
}
