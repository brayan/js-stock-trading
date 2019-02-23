const fields = [document.querySelector("#date"),
document.querySelector("#numberOfStocks"),
document.querySelector("#value")];

console.log(fields);

let tBody = document.querySelector("table tbody");
document.querySelector(".form").addEventListener("submit", function(event) {
    event.preventDefault();
    let tr = document.createElement("tr");
    fields.forEach(field => {
        let td = document.createElement("td");
        td.textContent = field.value;
        tr.appendChild(td);
    });
    let tdVolume = document.createElement("td");
    tdVolume.textContent = fields[1].value * fields[2].value;
    tr.appendChild(tdVolume);
    tBody.appendChild(tr);

    fields[0].value = "";
    fields[1].value = 1;
    fields[2].value = 0;

    fields[0].focus();
});