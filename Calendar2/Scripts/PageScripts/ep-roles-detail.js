openAddForm("/User/AddRolePartial");

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`RemoveRole?id=${id}`, "Rolü silmek istiyormusunuz");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Role/EditRole?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}
function stAddTransaction(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Role/AddTransactions?id=${id}`)
        .done(function (responsedata) {
            $("#add-transactions-form").html(responsedata);
            $('#add-transactions-modal').modal('show');
            $.unblockUI();
        });
}
function stAddUserRole(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    const name = e.attributes["data-name"].value;
    $.get(`/Role/AddUserRole?id=${id}&name=${name}`)
        .done(function (responsedata) {
            $("#add-userRole-form").html(responsedata);
            $('#add-userRole-modal').modal('show');
            $.unblockUI();
        });
}

setDatatable(2);
function result(res) {
    httpResponse(res);
}
function removeUserRole(e) {
    const userId = e.attributes["data-userId"].value;
    const roleId = e.attributes["data-roleId"].value;
    //tableDataRemove(`RemoveUserRole?userId=${userId}&roleId=${roleId}`, "Kullanıcıyı bu rolden çıkarmak istediğinize emin misiniz?");
    tableDataRemove("RemoveUserRole?userId=" + userId + "&roleId=" + roleId, "Kullanıcıyı bu rolden çıkarmak istediğinize emin misiniz?");
}
function removeRoleTransaction(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`RemoveRoleTransaction?roleTransactionId=${id}`, "Rolden bu yetkiyi çıkarmak istediğinize emin misiniz?");
}