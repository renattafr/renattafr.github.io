var customers = []

$(document).ready(function () {
    console.log("ready!");
    // load data
    $.ajax({
        url: "data.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE",data)
        dataStr=""
        for(let d in data){
            // save the data record into our global variable
            customers.push(data[d])
            dataStr += `<tr>
                <td><img class='icon' src='x_delete.png' onclick='deleteProduct("${d}")'style='width:20px; height:20px'> ${data[d].name}</td>
                <td>${data[d].email}</td>
                <td>${data[d].phone}</td>
            </tr>`
        }
        
        $('#custBody').html(dataStr)
        

        console.log(customers)

    });
});

function addToCustomers() {

    let productObj = {
        name: $('#name_field').val(),
        email: $('#email_field').val(),
        phone: $('#phone_field').val()
    }
    customers.push(productObj)
    loadData()
}

function deleteProduct(index) {
    console.log("DELETE",index)
    delete customers[index]  // delete the element from array
    $('#productBody').html("")
    loadData()
}

function loadData() {
    let allRows = ""
    for (let p in customers) {
        let cellName = `<td><img class='icon' src='x_delete.png' onclick='deleteProduct("${p}")' style='width:20px; height:20px'>` + customers[p].name + "</td>"
        let cellEmail = '<td class="text-right">' + customers[p].email + "</td>"
        let cellPhone = '<td class="text-right">' + customers[p].phone + "</td>"
        
        let row = `<tr>${cellName}${cellEmail}${cellPhone}</tr>`
        allRows += row
    }
    $('#custBody').html(allRows)
    console.log(customers)

    

}
