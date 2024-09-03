$(document).ready(function() {
    $('#resultTable').DataTable({
        "paging": true,
        "searching": true,
        "ordering": true,
    });
});

function normalizeIngredient(input) {
    // Remove spaces and hyphens, and convert to lowercase
    return input.replace(/\s+/g, '').replace(/-/g, '').toLowerCase();
}

function checkIngredients() {
    const ingredients = document.getElementById("ingredients").value;
    const harmfulIngredients = [
        { name: "Triclosan", description: "Considered safe as a preservative at specified maximum concentrations in various personal care products. Not safe in body lotion at concentrations above 0.03%.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety_opinions/'>SCCS/1643/22</a>" },
        { name: "Methylparaben", description: "The SCCS is of the opinion that the use of Methylparaben as a preservative in cosmetic products at concentrations of up to 0.4% (expressed as acid) is safe. It is also safe when used up to 0.4% in a mixture of esters for which the total concentration of all esters does not exceed 0.8% (as acid), as indicated in entry 12 of Annex V to the Cosmetics Regulation.", reference: "<a href='https://health.ec.europa.eu/document/download/eb3192aa-089c-4fcf-8cac-b34892dd0b3e_en?filename=sccs_o_276_final.pdf'>SCCS/1652/23</a>" },
        { name: "Butylparaben", description: "The SCCS is of the opinion that the use of Butylparaben as a preservative in cosmetic products at concentrations of up to 0.14% (expressed as acid) is safe.", reference: "<a href='https://health.ec.europa.eu/document/download/aa892d36-cb89-49c2-b0b1-5a14f4006642_en?filename=sccs_o_275.pdf'>SCCS/1651/23</a>" },
        { name: "Ethylparaben", description: "The SCCS is of the opinion that the use of Ethylparaben as a preservative in cosmetic products at concentrations of up to 0.4% (expressed as acid) is safe. It is also safe when used up to 0.4% in a mixture of esters for which the total concentration of all esters does not exceed 0.8% (as acid), as indicated in entry 12 of Annex V to the Cosmetics Regulation.", reference: "<a href='https://ec.europa.eu/health/scientific_committees/consumer_safety/docs/sccs_o_041.pdf'>Opinion on Paraben</a>" },
        { name: "Propylparaben", description: "The SCCS has concluded that propylparaben is safe when used as a preservative in cosmetic products up to a maximum concentration of 0.14%.", reference: "<a href='https://health.ec.europa.eu/system/files/2022-08/sccs_o_243.pdf'>SCCS/1623/20</a>" },
        { name: "Isobutylparaben", description: "Subsequent research and agency assessments may find isobutylparaben to be as or more hazardous to the endocrine system than butylparaben.", reference: "<a href='https://www.ewg.org/skindeep/search/?search=ISOBUTYLPARABEN'>ewg skin deep</a>" },
        { name: "Isopropylparaben", description: "Subsequent research and agency assessments may find isopropylparaben to be as or more hazardous to the endocrine system than propylparaben.", reference: "<a href='https://www.ewg.org/skindeep/search/?search=ISOPROPYLPARABEN'>ewg skin deep</a>" },
        { name: "dimethylphthalate", description: "No safety dossier submitted. So far not evaluated at EU level", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "diisobutylphthalate", description: "So far not evaluated at EU level", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "di-n-butylphthalate", description: "Banned under the Cosmetics Directive as CMR substance.", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "benzylbutylphthalate", description: "Banned under the Cosmetics Directive as CMR substance.", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "dicyclohexylphthalate", description: "So far not evaluated at EU level", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "di-2-ethylhexylphthalate", description: "Banned under the Cosmetics Directive as CMR substance", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "di-n-octylphthalate", description: "Under risk assessment in chemical legislation Council Regulation (793/93/EEC)", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "diisononylphthalate", description: "Exposure to DINP from cosmetics is extremely low compared with exposure from other sources, such as food and non-food products (EFSA, 2005a; CSTEE, 2004, RAR, 2003). Thus the inadvertent occurrence of DINP in cosmetics does not seem to be a concern for consumer health.", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "diisodecylphthalate", description: "Exposure to DIDP from cosmetics is extremely low compared with exposure from other sources, such as food and non-food products (EFSA, 2005b; CSTEE, 2004, DIDP RAR, 2003). Thus the inadvertent occurrence of DIDP in cosmetics does not seem to be a concern for consumer health.", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        { name: "diethylphthalate", description: "The range of diethyl phthalate (DEP) in perfume was from 0.4 to 22299 mg/kg or 2.23% with a median concentration of 1073 mg/kg. These concentrations are within the range allowed for DEP use in perfumes.", reference: "<a href='https://ec.europa.eu/health/ph_risk/committees/04_sccp/docs/sccp_o_106.pdf'>Opinion on Phthalate</a>" },
        
        // Add more harmful ingredients here
    ];
    
    const tableBody = $("#resultTable tbody");
    tableBody.empty(); // Clear previous results

    if (normalizeIngredient(ingredients) === "phthalate" || normalizeIngredient(ingredients) === "paraben") {
        const messageRow = `<tr><td colspan="3">Please specify more details, such as the exact type of phthalate or paraben.</td></tr>`;
        tableBody.append(messageRow);
        return;
    }

    const ingredientList = ingredients.split(/\s*,\s*/).map(normalizeIngredient); // Split input by commas and normalize
    const results = harmfulIngredients.filter(ingredient => ingredientList.includes(normalizeIngredient(ingredient.name)));

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
            
    // Scroll to the result section
    document.getElementById("resultSection").scrollIntoView({ behavior: "smooth" });
}
