function getAndUpdate() {
    console.log("Updating List...");
    var form = document.getElementById('todoForm');
    var titleValue = document.getElementById('title').value;
    var descValue = document.getElementById('description').value;

    if (titleValue.trim() !== "" && descValue.trim() !== "") {
        if (localStorage.getItem('itemsJson') == null) {
            itemJsonArray = [];
            itemJsonArray.push([titleValue, descValue]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        } else {
            itemJsonArrayStr = localStorage.getItem('itemsJson');
            itemJsonArray = JSON.parse(itemJsonArrayStr);
            itemJsonArray.push([titleValue, descValue]);
            localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
        }

        form.reset();
        update();
    } else {
        alert("Please enter a title and description for the item.");
    }
}

function update() {
    if (localStorage.getItem('itemsJson') == null) {
        itemJsonArray = [];
        localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    } else {
        itemJsonArrayStr = localStorage.getItem('itemsJson');
        itemJsonArray = JSON.parse(itemJsonArrayStr);
    }

    // Populate the table
    let tableBody = document.getElementById("tableBody");
    let str = "";
    itemJsonArray.forEach((element, index) => {
        str += `
            <tr>
                <th scope="row">${index + 1}</th>
                <td>${element[0]}</td>
                <td>${element[1]}</td>
                <td><button class="btn btn-sm btn-primary" onclick="deleteItem(${index})">Delete</button></td>
            </tr>`;
    });
    tableBody.innerHTML = str;
}

add = document.getElementById("add");
add.addEventListener("click", getAndUpdate);
update();

function deleteItem(itemIndex) {
    itemJsonArrayStr = localStorage.getItem('itemsJson');
    itemJsonArray = JSON.parse(itemJsonArrayStr);

    itemJsonArray.splice(itemIndex, 1);
    localStorage.setItem('itemsJson', JSON.stringify(itemJsonArray));
    update();
}

function clearStorage() {
    if (confirm("Are you sure you want to clear the list?")) {
        localStorage.clear();
        update();
    }
}