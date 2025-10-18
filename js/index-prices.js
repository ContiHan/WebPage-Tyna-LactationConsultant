// ============================
// INDEX.HTML PRICE UPDATER
// ============================
// Tento skript automaticky aktualizuje ceny v index.html podle konfigurace z prices-config.js

document.addEventListener('DOMContentLoaded', function() {
    updateIndexPrices();
});

function updateIndexPrices() {
    // Získání všech pricing-price elementů
    const priceElements = document.querySelectorAll('.pricing-price');
    const additionalPriceElements = document.querySelectorAll('.pricing-additional-price');

    // Pole pro identifikaci a aktualizaci jednotlivých cen
    const priceUpdates = [
        // Hlavní služby
        {
            name: 'Konzultace u Vás doma',
            priceIndex: 1, // druhý pricing-price element (první je 0 pro krizovou podporu)
            price: PRICES.konzultaceDoma.hourly,
            additionalPriceText: `+ cestovné ${PRICES.konzultaceDoma.perKm} Kč/km`
        },
        {
            name: 'Konzultace on-line',
            priceIndex: 2,
            price: PRICES.konzultaceOnline.hourly
        },
        {
            name: 'Předporodní příprava na kojení',
            priceIndex: 3,
            price: PRICES.predporodniPriprava.base,
            unit: 'Kč/pár',
            additionalPriceText: `+ cestovné ${PRICES.predporodniPriprava.perKm} Kč/km (osobní schůzka)`
        },
        {
            name: 'Odstav s respektem',
            priceIndex: 4,
            price: PRICES.odstav.base,
            additionalPriceText: `+ cestovné ${PRICES.odstav.perKm} Kč/km (osobní schůzka)`
        },
        // Doplňkové služby
        {
            name: 'Stříbrný klobouček',
            priceIndex: 5,
            price: PRICES.stribrnyKloboucek.perWeek
        },
        {
            name: 'Nosítko',
            priceIndex: 6,
            price: PRICES.nositko.perMonth
        },
        {
            name: 'Šátek',
            priceIndex: 7,
            price: PRICES.satek.perMonth
        },
        {
            name: 'Esenciální levandulový olej',
            priceIndex: 8,
            price: PRICES.olej.perPiece
        }
    ];

    // Aktualizace všech cen
    priceUpdates.forEach(item => {
        if (priceElements[item.priceIndex]) {
            const unit = item.unit || 'Kč';
            priceElements[item.priceIndex].innerHTML = `${item.price}<span>${unit}</span>`;
        }
    });

    // Aktualizace cestovného
    if (additionalPriceElements[0]) {
        additionalPriceElements[0].textContent = `+ cestovné ${PRICES.konzultaceDoma.perKm} Kč/km`;
    }
    if (additionalPriceElements[1]) {
        additionalPriceElements[1].textContent = `+ cestovné ${PRICES.predporodniPriprava.perKm} Kč/km (osobní schůzka)`;
    }
    if (additionalPriceElements[2]) {
        additionalPriceElements[2].textContent = `+ cestovné ${PRICES.odstav.perKm} Kč/km (osobní schůzka)`;
    }
}

