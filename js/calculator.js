// ============================
// CALCULATOR LOGIC
// ============================

// Ceny jsou nyní načítány ze sdíleného konfiguračního souboru prices-config.js
// Pro změnu cen stačí upravit soubor js/prices-config.js

// ============================
// INICIALIZACE
// ============================

document.addEventListener('DOMContentLoaded', function() {
    updatePriceLabels();
    initializeCalculator();
});

// ============================
// DYNAMIC PRICE LABELS UPDATE
// ============================

function updatePriceLabels() {
    // Aktualizace cen v popiscích služeb podle konfigurace
    const priceLabels = {
        'konzultace-doma': `${PRICES.konzultaceDoma.hourly} Kč/hod + ${PRICES.konzultaceDoma.perKm} Kč/km`,
        'konzultace-online': `${PRICES.konzultaceOnline.hourly} Kč/hod`,
        'predporodni-priprava': `${PRICES.predporodniPriprava.base} Kč/pár + ${PRICES.predporodniPriprava.perKm} Kč/km (osobní)`,
        'odstav': `${PRICES.odstav.base} Kč + ${PRICES.odstav.perKm} Kč/km (osobní)`,
        'stribrny-kloboucek': `${PRICES.stribrnyKloboucek.perWeek} Kč/týden`,
        'nositko': `${PRICES.nositko.perMonth} Kč/měsíc`,
        'satek': `${PRICES.satek.perMonth} Kč/měsíc`,
        'olej': `${PRICES.olej.perPiece} Kč/2 ml`
    };

    // Aktualizace všech cen v HTML
    Object.keys(priceLabels).forEach(serviceId => {
        const label = document.querySelector(`label[for="${serviceId}"] .service-base-price`);
        if (label) {
            label.textContent = priceLabels[serviceId];
        }
    });
}

function initializeCalculator() {
    // Konzultace doma
    setupServiceCheckbox('konzultace-doma', 'inputs-konzultace-doma');
    setupInputListener('hodiny-doma', calculateKonzultaceDoma);
    setupInputListener('minuty-doma', calculateKonzultaceDoma);
    setupInputListener('km-doma', calculateKonzultaceDoma);

    // Konzultace online
    setupServiceCheckbox('konzultace-online', 'inputs-konzultace-online');
    setupInputListener('hodiny-online', calculateKonzultaceOnline);
    setupInputListener('minuty-online', calculateKonzultaceOnline);

    // Předporodní příprava
    setupServiceCheckbox('predporodni-priprava', 'inputs-predporodni-priprava');
    setupSelectListener('typ-predporodni', function() {
        const isPersonal = document.getElementById('typ-predporodni').value === 'osobni';
        document.getElementById('km-predporodni-group').style.display = isPersonal ? 'block' : 'none';
        calculatePredporodniPriprava();
    });
    setupInputListener('km-predporodni', calculatePredporodniPriprava);

    // Odstav
    setupServiceCheckbox('odstav', 'inputs-odstav');
    setupSelectListener('typ-odstav', function() {
        const isPersonal = document.getElementById('typ-odstav').value === 'osobni';
        document.getElementById('km-odstav-group').style.display = isPersonal ? 'block' : 'none';
        calculateOdstav();
    });
    setupInputListener('km-odstav', calculateOdstav);

    // Stříbrný klobouček
    setupServiceCheckbox('stribrny-kloboucek', 'inputs-stribrny-kloboucek');
    setupInputListener('tydny-kloboucek', calculateStribrnyKloboucek);

    // Nosítko
    setupServiceCheckbox('nositko', 'inputs-nositko');
    setupInputListener('mesice-nositko', calculateNositko);

    // Šátek
    setupServiceCheckbox('satek', 'inputs-satek');
    setupInputListener('mesice-satek', calculateSatek);

    // Olej
    setupServiceCheckbox('olej', 'inputs-olej');
    setupInputListener('ks-olej', calculateOlej);

    // Reset button
    document.getElementById('btn-reset').addEventListener('click', resetCalculator);
}

// ============================
// HELPER FUNCTIONS
// ============================

function setupServiceCheckbox(checkboxId, inputsId) {
    const checkbox = document.getElementById(checkboxId);
    const inputs = document.getElementById(inputsId);

    checkbox.addEventListener('change', function() {
        if (this.checked) {
            inputs.style.display = 'block';
            // Trigger calculation for this service
            triggerCalculation(checkboxId);
        } else {
            inputs.style.display = 'none';
            // Clear subtotal for this service
            clearSubtotal(checkboxId);
        }
        updateTotalPrice();
    });
}

function setupInputListener(inputId, calculateFunction) {
    const input = document.getElementById(inputId);
    input.addEventListener('input', function() {
        calculateFunction();
        updateTotalPrice();
    });
}

function setupSelectListener(selectId, changeFunction) {
    const select = document.getElementById(selectId);
    select.addEventListener('change', function() {
        changeFunction();
        updateTotalPrice();
    });
}

function triggerCalculation(serviceId) {
    switch(serviceId) {
        case 'konzultace-doma':
            calculateKonzultaceDoma();
            break;
        case 'konzultace-online':
            calculateKonzultaceOnline();
            break;
        case 'predporodni-priprava':
            calculatePredporodniPriprava();
            break;
        case 'odstav':
            calculateOdstav();
            break;
        case 'stribrny-kloboucek':
            calculateStribrnyKloboucek();
            break;
        case 'nositko':
            calculateNositko();
            break;
        case 'satek':
            calculateSatek();
            break;
        case 'olej':
            calculateOlej();
            break;
    }
}

function clearSubtotal(serviceId) {
    const subtotalMap = {
        'konzultace-doma': 'subtotal-doma',
        'konzultace-online': 'subtotal-online',
        'predporodni-priprava': 'subtotal-predporodni',
        'odstav': 'subtotal-odstav',
        'stribrny-kloboucek': 'subtotal-kloboucek',
        'nositko': 'subtotal-nositko',
        'satek': 'subtotal-satek',
        'olej': 'subtotal-olej'
    };

    const subtotalId = subtotalMap[serviceId];
    if (subtotalId) {
        document.getElementById(subtotalId).textContent = '0 Kč';
    }
}

function formatPrice(price) {
    return Math.round(price).toLocaleString('cs-CZ') + ' Kč';
}

// ============================
// CALCULATION FUNCTIONS
// ============================

function calculateKonzultaceDoma() {
    if (!document.getElementById('konzultace-doma').checked) return 0;

    const hours = parseFloat(document.getElementById('hodiny-doma').value) || 0;
    const minutes = parseFloat(document.getElementById('minuty-doma').value) || 0;
    const km = parseFloat(document.getElementById('km-doma').value) || 0;

    const total = (hours * PRICES.konzultaceDoma.hourly) + (minutes * PRICES.konzultaceDoma.minutely) + (km * PRICES.konzultaceDoma.perKm);
    document.getElementById('subtotal-doma').textContent = formatPrice(total);

    return total;
}

function calculateKonzultaceOnline() {
    if (!document.getElementById('konzultace-online').checked) return 0;

    const hours = parseFloat(document.getElementById('hodiny-online').value) || 0;
    const minutes = parseFloat(document.getElementById('minuty-online').value) || 0;

    const total = (hours * PRICES.konzultaceOnline.hourly) + (minutes * PRICES.konzultaceOnline.minutely);
    document.getElementById('subtotal-online').textContent = formatPrice(total);

    return total;
}

function calculatePredporodniPriprava() {
    if (!document.getElementById('predporodni-priprava').checked) return 0;

    const type = document.getElementById('typ-predporodni').value;
    let total = PRICES.predporodniPriprava.base;

    if (type === 'osobni') {
        const km = parseFloat(document.getElementById('km-predporodni').value) || 0;
        total += km * PRICES.predporodniPriprava.perKm;
    }

    document.getElementById('subtotal-predporodni').textContent = formatPrice(total);

    return total;
}

function calculateOdstav() {
    if (!document.getElementById('odstav').checked) return 0;

    const type = document.getElementById('typ-odstav').value;
    let total = PRICES.odstav.base;

    if (type === 'osobni') {
        const km = parseFloat(document.getElementById('km-odstav').value) || 0;
        total += km * PRICES.odstav.perKm;
    }

    document.getElementById('subtotal-odstav').textContent = formatPrice(total);

    return total;
}

function calculateStribrnyKloboucek() {
    if (!document.getElementById('stribrny-kloboucek').checked) return 0;

    const weeks = parseFloat(document.getElementById('tydny-kloboucek').value) || 0;

    const total = weeks * PRICES.stribrnyKloboucek.perWeek;
    document.getElementById('subtotal-kloboucek').textContent = formatPrice(total);

    return total;
}

function calculateNositko() {
    if (!document.getElementById('nositko').checked) return 0;

    const months = parseFloat(document.getElementById('mesice-nositko').value) || 0;

    const total = months * PRICES.nositko.perMonth;
    document.getElementById('subtotal-nositko').textContent = formatPrice(total);

    return total;
}

function calculateSatek() {
    if (!document.getElementById('satek').checked) return 0;

    const months = parseFloat(document.getElementById('mesice-satek').value) || 0;

    const total = months * PRICES.satek.perMonth;
    document.getElementById('subtotal-satek').textContent = formatPrice(total);

    return total;
}

function calculateOlej() {
    if (!document.getElementById('olej').checked) return 0;

    const count = parseFloat(document.getElementById('ks-olej').value) || 0;

    const total = count * PRICES.olej.perPiece;
    document.getElementById('subtotal-olej').textContent = formatPrice(total);

    return total;
}

// ============================
// TOTAL PRICE UPDATE
// ============================

function updateTotalPrice() {
    const total =
        calculateKonzultaceDoma() +
        calculateKonzultaceOnline() +
        calculatePredporodniPriprava() +
        calculateOdstav() +
        calculateStribrnyKloboucek() +
        calculateNositko() +
        calculateSatek() +
        calculateOlej();

    document.getElementById('total-price').textContent = formatPrice(total);
}

// ============================
// RESET FUNCTION
// ============================

function resetCalculator() {
    // Uncheck all checkboxes
    document.querySelectorAll('.service-checkbox').forEach(checkbox => {
        checkbox.checked = false;
    });

    // Hide all input sections
    document.querySelectorAll('.service-inputs').forEach(inputs => {
        inputs.style.display = 'none';
    });

    // Reset all input values
    document.getElementById('hodiny-doma').value = 1;
    document.getElementById('minuty-doma').value = 0;
    document.getElementById('km-doma').value = 0;
    document.getElementById('hodiny-online').value = 1;
    document.getElementById('minuty-online').value = 0;
    document.getElementById('typ-predporodni').value = 'online';
    document.getElementById('km-predporodni').value = 0;
    document.getElementById('km-predporodni-group').style.display = 'none';
    document.getElementById('typ-odstav').value = 'online';
    document.getElementById('km-odstav').value = 0;
    document.getElementById('km-odstav-group').style.display = 'none';
    document.getElementById('tydny-kloboucek').value = 1;
    document.getElementById('mesice-nositko').value = 1;
    document.getElementById('mesice-satek').value = 1;
    document.getElementById('ks-olej').value = 1;

    // Clear all subtotals
    document.querySelectorAll('.service-subtotal span').forEach(subtotal => {
        subtotal.textContent = '0 Kč';
    });

    // Reset total price
    document.getElementById('total-price').textContent = '0 Kč';
}
