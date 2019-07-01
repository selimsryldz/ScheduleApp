function stRemoveRole(e) {
    const id = e.attributes["data-id"].value;

    const id2 = e.attributes["data-id2"].value;

    console.log(id);
    httpGetLang("DeleteConfirmation").then((result) => {
        tableDataRemove(`RemoveUserRole?userId=${id}&roleId=${id2}`, result);
    });
}
function stChangePw(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Account/ChangePw?id=${id}`)
        .done(function (responsedata) {
            $("#change-psw-form").html(responsedata);
            $('#change-psw-modal').modal('show');
            $.unblockUI();
        });
}
function stEditProfile(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    const dataType = e.attributes["data-type"];
    var type = "";
    if (dataType != undefined) {
        type = dataType.value;
    }
    $.get(`/Account/EditProfile?id=${id}&type=${type}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function stAddRoleToUser(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/User/AddRoleToUser?id=${id}`)
        .done(function (responsedata) {
            $("#add-role-form").html(responsedata);
            $('#add-role-modal').modal('show');
            $.unblockUI();
        });
}
const options = { tableId: "transactionTable", orderColumn: "1", orderArrow: "asc" }

setDatatable(null, true, options);
function result(res) {
    httpResponse(res);
}