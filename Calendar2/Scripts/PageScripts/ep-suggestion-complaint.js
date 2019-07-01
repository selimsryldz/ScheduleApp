openAddForm("/SuggestionComplaint/AddSuggestion");

var options = {
    tableId: "suggestion-complaint-table",
    orderColumn: "3",
    orderArrow: "desc"
};
setDatatable(null, true, options);

function stRemove(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveSuggestion?id=${id}`, res);
    });
}

function stEdit(e) {

    blockUi();
    const id = e.attributes["data-id"].value;
   $.get(`/SuggestionComplaint/EditSuggestion?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
           
        });
    
}

function getDetail(e) {
    blockUi();
    const id = getId(e);
    $.get(`/SuggestionComplaint/Details?id=${id}`)
        .done(function (responsedata) {
            $("#detail-form").html(responsedata);
            $('#detail-modal').modal('show');
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