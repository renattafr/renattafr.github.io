var quotation = []

$(document).ready(function () {
    console.log("ready!");
    // load data
    $.ajax({
        url: "dataM.json"
    }).done(function (data) {
        //$(this).addClass("done");
        console.log("DONE",data)
        let gross = 0
        let totalDiscount = 0
        let Tdiscount = 0
        dataStr=""
        for(let d in data){
            // save the data record into our global variable
            quotation.push(data[d])
            let total = data[d].ppu * data[d].quantity
            gross += total
            totalDiscount += data[d].discount
            Tdiscount = gross - totalDiscount
            dataStr += `<tr>
                <td><img class='icon' src='bin.png' onclick='deleteProduct("${d}")'style='width:20px; height:20px'></td>
                <td>${data[d].quantity}</td>
                <td>${data[d].item}</td>
                <td>${data[d].ppu}</td>
                <td>${total}</td>
                <td>${data[d].discount}</td>
                <td>${total - data[d].discount}</td>
            </tr>`
            
        }
        
        $('#productBody').html(dataStr)
        $("#gross").html(gross)
        $("#discountP").html(totalDiscount)
        $("#Tdiscount").html(Tdiscount)
        
        let vat = gross * 0.07
        let net = Tdiscount + vat
        $("#vat").html(vat.toFixed(2))
        $("#net").html(net.toFixed(2))

        console.log(quotation)

    });
});

function addToQuotation() {
    
    let productObj = {
        quantity: $('#quantity_field').val(),
        item: $('#item_field').val(),
        ppu: $('#price_field').val(),
        discount: $('#discount_field').val()
    }
        
    quotation.push(productObj)
    console.log(productObj)
    loadData()
}

function deleteProduct(index) {
    console.log("DELETE",index)
    delete quotation[index]  // delete the element from array
    $('#productBody').html("")
    loadData()
}

function loadData() {
    let allRows = ""
    let gross = 0
    let totalDiscount = 0
    let Tdiscount = 0
    for (let p in quotation) {
        let total = quotation[p].ppu * quotation[p].quantity
        gross += total
        totalDiscount += quotation[p].discount 
        Tdiscount = gross - totalDiscount
        let row = `<tr>
        <td><img class='icon' src='bin.png' onclick='deleteProduct("${p}")'style='width:20px; height:20px'></td>
        <td>${quotation[p].quantity}</td>
        <td>${quotation[p].item}</td>
        <td>${quotation[p].ppu}</td>
        <td>${total}</td>
        <td>${quotation[p].discount}</td>
        <td>${total - quotation[p].discount}</td>
    </tr>`
    allRows += row
   
    }
    $('#productBody').html(allRows)
    console.log(quotation)
    $("#gross").html(gross)
    $("#discountP").html(totalDiscount)
    $("#Tdiscount").html(Tdiscount)

    let vat = gross * 0.07
    let net = Tdiscount + vat
    $("#vat").html(vat.toFixed(2))
    $("#net").html(net.toFixed(2))
    
   

}

function ClearT() {
    $("#productBody").remove();
}
