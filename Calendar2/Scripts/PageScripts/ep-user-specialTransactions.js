function stRemoveUserTransaction(e) {
    const id = e.attributes["data-id"].value;
    const id2 = e.attributes["data-id2"].value;
    console.log(id);
    httpGetLang("DeleteConfirmation").then((result) => {
        tableDataRemove(`RemoveUserTransaction?uId=${id}&tId=${id2}`, result);
    });
}
function stAddTransactions(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/User/AddTransactions?id=${id}`)
        .done(function (responsedata) {
            $("#add-transactions-form").html(responsedata);
            $('#add-transactions-modal').modal('show');
            $.unblockUI();
        });
}

setDatatable();

function result(res) {
    httpResponse(res);
}