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

// Adicionar e salvar itens personalizados
const addItemButton = document.getElementById('addItemButton');
const newItemSection = document.getElementById('newItemSection');
const saveNewItemButton = document.getElementById('saveNewItemButton');
const newItemNameInput = document.getElementById('newItemName');
const newItemIdInput = document.getElementById('newItemId');

// Armazenar os novos itens
let dynamicItems = [];

// Mostrar seção para adicionar novos itens
addItemButton.addEventListener('click', () => {
    newItemSection.classList.toggle('hidden');
});

// Salvar o novo item
saveNewItemButton.addEventListener('click', () => {
    const itemName = newItemNameInput.value.trim();
    const itemId = newItemIdInput.value.trim();

    if (itemName) {
        dynamicItems.push({ name: itemName, id: itemId });
        newItemNameInput.value = ''; // Limpar o campo
        newItemIdInput.value = ''; // Limpar o campo

        // Adicionar o item à lista de opções
        addItemToForm(itemName, itemId);
        newItemSection.classList.add('hidden');
    } else {
        alert('Por favor, insira o nome do item.');
    }
});

// Função para adicionar item ao formulário
function addItemToForm(itemName, itemId) {
    const itemDiv = document.createElement('div');
    itemDiv.classList.add('item');

    const label = document.createElement('label');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = itemName;

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('hidden');
    input.id = itemId ? `${itemName}Id` : `${itemName}Id`;

    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(itemName));
    itemDiv.appendChild(label);
    itemDiv.appendChild(input);

    document.getElementById('materialForm').appendChild(itemDiv);

    // Mostrar o campo de texto quando o checkbox for selecionado
    checkbox.addEventListener('change', () => {
        input.classList.toggle('hidden', !checkbox.checked);
    });
}

// Modificar a função generateReport para incluir novos itens
function generateReport() {
    const output = document.getElementById('output');
    const copyButton = document.getElementById('copyButton');
    output.value = ''; // Limpar texto anterior

    let reportContent = 'Relatório de Materiais:\n\n';

    // Processar os itens fixos
    const allItems = [...itemsWithDetails, ...dynamicItems.map(item => item.name)];

    allItems.forEach(item => {
        const checkbox = document.getElementById(item);
        const input = document.getElementById(item + (item === 'mesa' ? 'Quantidade' : 'Id'));

        if (checkbox && checkbox.checked) {
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
        if (checkbox && checkbox.checked) {
            const label = checkbox.closest('label').textContent.trim();
            reportContent += `${label}\n`;
        }
    });

    // Exibir o relatório
    output.value = reportContent;
    output.classList.remove('hidden');
    copyButton.classList.remove('hidden');
}

// Função para copiar o relatório para a área de transferência
function copyToClipboard() {
    const output = document.getElementById('output');
    output.select();
    document.execCommand('copy');
    alert('Relatório copiado para a área de transferência!');
}
