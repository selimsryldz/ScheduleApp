const options =
    {
        tableId: "table",
        orderColumn: "2",
        orderArrow: "asc"
    }
setDatatable(null, true, options);

const options2 =
    {
        tableId: "table2",
        orderColumn: "0",
        orderArrow: "asc"
    }
setDatatable(null, true, options2);
//setDatatable();
$("#change-modal").modal("hide");


function detailDelivery(e) {
    const id = getId(e);
    inlineModalGenerator(`/Vendor/GetDeliveryForm?id=${id}`, "#delivery-detail-view", '#delivery-detail-modal');
}
function stDeliveryFormDetail(e) {
    blockUi();
    $.get(`/SellingOrder/DetailDeliveryForm?id=${getId(e)}`)
        .done(function (responsedata) {
            $("#detailDeliveryForm-form").html(responsedata);
            $('#detailDeliveryForm-modal').modal('show');
            $.unblockUI();
        });
}
function completedSellingOrder(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`CompletedSellingOrder?id=${id}`, "Teslimatı Tamamlandı statüsüne getirmeyi onaylıyor musunuz?");
}
function addDeliveryForm(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/SellingOrder/AddDeliveryForm?id=${id}`)
        .done(function (responsedata) {
            $("#addDelivery-form").html(responsedata);
            $('#addDelivery-modal').modal('show');
            $.unblockUI();
        });
}

function result(res) {
    httpResponse(res);
}

function begin() {
    blockUi();
}
function complete() {
    $.unblockUI();
}