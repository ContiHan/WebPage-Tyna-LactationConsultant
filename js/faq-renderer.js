// ============================
// FAQ RENDERER
// ============================
// Tento skript dynamicky generuje položky FAQ z dat v faq-config.js.

document.addEventListener('DOMContentLoaded', function() {
    renderFAQ();
});

function renderFAQ() {
    const faqListEl = document.querySelector('.faq-list');
    if (!faqListEl) return;

    // Vyčištění existujícího obsahu (pokud tam nějaký je)
    faqListEl.innerHTML = '';

    // Generování jednotlivých položek
    FAQ_DATA.forEach(item => {
        const formattedNumber = item.id < 10 ? `0${item.id}` : item.id;
        
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item';
        
        faqItem.innerHTML = `
            <p class="faq-number">${formattedNumber}</p>
            <p class="faq-question">${item.question}</p>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="faq-icon">
                <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
            </svg>
            <div class="faq-answer-box">
                <p class="faq-answer">${item.answer}</p>
            </div>
        `;

        // Přidání event listeneru pro akordeon
        faqItem.addEventListener('click', function() {
            this.classList.toggle('faq-open');
        });

        faqListEl.appendChild(faqItem);
    });
}
