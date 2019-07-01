openAddForm("/PersonnelExpense/AddPersonelExpense");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`DeletePersonnelExpense?id=${id}`, "Kayıtı silmek istediğinize emin misiniz?");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/PersonnelExpense/EditPersonelExpense?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function stDetail(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/PersonnelExpense/Detail?id=${id}`)
        .done(function (responsedata) {
            $("#detail").html(responsedata);
            $('#detail-modal').modal('show');
            $.unblockUI();
        });
}
function stAddAttch(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/PersonnelExpense/AddAttch?id=${id}`)
        .done(function (responsedata) {
            $("#add-attch").html(responsedata);
            $('#attch-modal').modal('show');
            $.unblockUI();
        });
}

function stSendApprove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`SendApprovePersonnelExpense?id=${id}`, "Onaya göndermek istediğinize emin misiniz? Onaya gönderirseniz değişiklik yapamayacaksınız!");
}
var options = {
    tableId: "table",
    orderColumn: "0",
    orderArrow: "asc"
};
setDatatable(null, true, options);

function result(res) {
    httpResponse(res);
}
function addExpenseDetail(e) {
    const id = getId(e);
    console.log(id);
    inlineModalGenerator(`/personelexpense/addexpensedetail?id=${id}`, "#add-detail-form", "#add-detail-modal");
}
function getExpenseDetails(e) {
    const id = getId(e);
    inlineModalGenerator(`/personelexpense/GetDetails?id=${id}`, "#get-detail-form", "#get-detail-modal");
}