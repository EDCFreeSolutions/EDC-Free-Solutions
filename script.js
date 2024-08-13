$(document).ready(function() {
    $('#resultTable').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
    });
});

function checkIngredients() {
    const ingredients = document.getElementById("ingredients").value.toLowerCase();
    const harmfulIngredients = [
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Methylparaben", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        
        // Add more harmful ingredients here
    ];
    
    const results = harmfulIngredients.filter(ingredient => ingredients.includes(ingredient.name.toLowerCase()));

    const tableBody = $("#resultTable tbody");
    tableBody.empty(); // Clear previous results
    if (results.length > 0) {
        results.forEach(result => {
            const row = `<tr>
                <td>${result.name}</td>
                <td>${result.description}</td>
                <td>${result.reference}</td>
            </tr>`;
            tableBody.append(row);
        });
    } else {
        tableBody.append('<tr><td colspan="3">No harmful ingredients found!</td></tr>');
    }
}
