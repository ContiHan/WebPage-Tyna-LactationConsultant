// ============================
// KONFIGURACE ČASTÝCH DOTAZŮ (FAQ)
// ============================
// Tento soubor obsahuje data pro sekci FAQ.

const FAQ_DATA = [
    {
        id: 1,
        question: "Jak probíhá laktační konzultace u mě doma?",
        answer: "Osobní návštěva trvá obvykle 60–90 minut. V klidu probereme vaše potřeby, zkontrolujeme techniku kojení a nastavíme praktické kroky pro vaši spokojenost. Součástí je i následná podpora na telefonu."
    },
    {
        id: 2,
        question: "Dojíždíte i mimo Nechanice?",
        answer: "Ano, jezdím za maminkami do Hradce Králové, Hořic, Nového Bydžova, Jaroměře a dalších obcí v Královéhradeckém kraji. Cestovné účtuji 8 Kč/km."
    },
    {
        id: 3,
        question: "Je online konzultace stejně efektivní jako osobní?",
        answer: "Mnoho situací lze vyřešit i na dálku. Online konzultace je skvělá pro rychlou krizovou podporu nebo konzultaci teoretických otázek. Pro nácvik techniky kojení u novorozenců však doporučuji spíše osobní návštěvu."
    },
    {
        id: 4,
        question: "Půjčujete i ergonomická nosítka nebo šátky?",
        answer: "Ano, v rámci mých služeb nabízím pronájem ergonomických nosítek, šátků i stříbrných kloboučků na hojení bradavek. Ráda vás také naučím, jak je správně používat."
    },
    {
        id: 5,
        question: "Kdy je nejvhodnější doba pro kontaktování laktační poradkyně?",
        answer: "Ideální je absolvovat předporodní přípravu ještě v těhotenství. Pokud už máte miminko, neváhejte se ozvat hned při prvních pochybnostech nebo bolesti. Čím dříve problém zachytíme, tím snadnější je cesta k nápravě."
    },
    {
        id: 6,
        question: "Musím mít na návštěvu doma nějak speciálně připraveno nebo uklizeno?",
        answer: "Vůbec ne! Chci vidět vaši běžnou realitu a zajistit vám pohodu v přirozeném prostředí. Mým cílem je vás podpořit, ne vás stresovat úklidem. Stačí jen místo, kde se spolu budeme cítit dobře."
    },
    {
        id: 7,
        question: "Pomáháte i v případě, že se rozhodnu s kojením úplně skončit?",
        answer: "Ano, samozřejmě. Nabízím specializovaný program Odstav s respektem (podle metodiky Evy Labič), který umožní vám i vašemu děťátku se s kojením citlivě a s láskou rozloučit v okamžiku, kdy nastane správný čas."
    },
    {
        id: 8,
        question: "Co přesně obsahuje e-book, který zmiňujete v ceníku?",
        answer: "Je to přehledný digitální dokument, který vám zašlu po naší konzultaci. Obsahuje shrnutí všech důležitých bodů, které jsme probraly, praktické rady na míru vaší situaci a tipy, ke kterým se můžete kdykoli vrátit."
    },
    {
        id: 9,
        question: "Máte zkušenosti i s psychickou podporou maminek v náročných začátcích?",
        answer: "Ano, velmi. Sama jsem si prošla všemi odstíny mateřství, včetně středně těžké deprese a bolestivých začátků. Vím, jak důležité je být vyslechnuta bez posuzování a mít v někom oporu v nejtěžších chvílích."
    },
    {
        id: 10,
        question: "Fungujete i během víkendů nebo státních svátků?",
        answer: "Laktační krize a dotazy si čas nevybírají. Proto jsem pro krizovou podporu i konzultace k dispozici denně od 6:00 do 22:00, včetně víkendů a svátků, abychom situaci vyřešily co nejdříve."
    }
];

// Export pro použití v jiných souborech (volitelné)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { FAQ_DATA };
}
