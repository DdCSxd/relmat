const itemsWithDetails = [
    'mms', 'legend', 'tandem', 'mc1', 'altitrack',
    'viso2', 'galaxy', 'mesa', 't10Ornamentacao', 'piriquitoOrnamentacao'
];

// Mostrar campos adicionais ao selecionar
itemsWithDetails.forEach(item => {
    const checkbox = document.getElementById(item);
    const input = document.getElementById(item + (item === 'mesa' ? 'Quantidade' : 'Id'));

    checkbox.addEventListener('change', () => {
        input.classList.toggle('hidden', !checkbox.checked);
    });
});

// Gerar relatório
function generateReport() {
    const output = document.getElementById('output');
    const copyButton = document.getElementById('copyButton');
    output.value = ''; // Limpar texto anterior

    let reportContent = 'Relatório de Materiais:\n\n';

    // Processar cada item
    itemsWithDetails.forEach(item => {
        const checkbox = document.getElementById(item);
        const input = document.getElementById(item + (item === 'mesa' ? 'Quantidade' : 'Id'));

        if (checkbox.checked) {
            const label = checkbox.closest('label').textContent.trim();
            const detail = input && !input.classList.contains('hidden') ? `: ${input.value}` : '';
            reportContent += `${label}${detail}\n`;
        }
    });

    // Adicionar itens sem detalhes
    const remainingItems = [
        'g13', 't10as', 't10r', 'rac', 'capaceteGrande', 
        'capaceteZx', 'bolsaPlaquetas', 'quadrosIdentificacao', 'suportesParaquedas'
    ];

    remainingItems.forEach(item => {
        const checkbox = document.getElementById(item);
        if (checkbox.checked) {
            const label = checkbox.closest('label').textContent.trim();
            reportContent += `${label}\n`;
        }
    });

    // Exibir o relatório
    output.value = reportContent;
    output.classList.remove('hidden');
    copyButton.classList.remove('hidden');
}

// Copiar relatório
function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Relatório copiado para a área de transferência!');
}
