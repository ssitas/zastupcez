// skript.js

document.addEventListener('DOMContentLoaded', function() {

    // --- Logika pro formulář absence ---
    const absenceForm = document.getElementById('absence-form');
    if (absenceForm) {
        absenceForm.addEventListener('submit', function(event) {
            // Zabráníme standardnímu odeslání formuláře (které by znovu načetlo stránku)
            event.preventDefault(); 
            
            // Skryjeme formulář
            const formContainer = document.getElementById('form-container');
            formContainer.style.display = 'none';
            
            // Zobrazíme zprávu o úspěchu
            const successMessage = document.getElementById('success-message');
            successMessage.style.display = 'block';
        });
    }

    // --- Logika pro generování průběžné klasifikace ---
    const predmetBloky = document.querySelectorAll('.predmet-blok');
    predmetBloky.forEach(blok => {
        const dataZnamky = blok.getAttribute('data-znamky');
        const tbody = blok.querySelector('table tbody');

        // Pokud nejsou žádná data, nic nedělej
        if (!dataZnamky) return;

        // Rozdělíme data na jednotlivé známky (oddělovač je středník ';')
        const znamky = dataZnamky.split(';');

        znamky.forEach(znamkaString => {
            // Rozdělíme údaje jedné známky (oddělovač je čárka ',')
            // NOVĚ: přidána proměnná 'tema' pro čtvrtý údaj
            const [znamka, vaha, datum, tema] = znamkaString.trim().split(',');

            // Zkontrolujeme, zda jsou všechny potřebné údaje k dispozici
            if (znamka && vaha && datum && tema) {
                // Vytvoříme nový řádek v tabulce
                const tr = document.createElement('tr');
                // NOVĚ: přidán čtvrtý sloupec <td> pro téma
                tr.innerHTML = `<td>${znamka.trim()}</td><td>${vaha.trim()}</td><td>${datum.trim()}</td><td>${tema.trim()}</td>`;
                tbody.appendChild(tr);
            }
        });
    });
});