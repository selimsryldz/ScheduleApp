openAddForm("/Product/AddCategory");
function stRemove(e) {
    const id = e.attributes["data-id"].value;
    tableDataRemove(`RemoveProductCategory?id=${id}`, "Ürün kategorisini siliyorsunuz!");
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    localStorage.setItem("name", e.parentElement.parentElement.children[0].textContent);
    localStorage.setItem("description", e.parentElement.parentElement.children[1].textContent);
    $.get(`/Product/EditCategory?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}

setDatatable();

function result(res) {
    httpResponse(res);
}