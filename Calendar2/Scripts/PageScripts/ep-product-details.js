function stRemoveContact(e) {
}
function stEditOpt(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Product/EditProductOption?id=${id}`)
        .done(function (responsedata) {
            $("#edit-opt-form").html(responsedata);
            $("#edit-opt-modal").modal("show");
            $.unblockUI();
        });
}
function stDetailExpense(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/PersonnelExpense/Detail?id=${id}`)
        .done(function (responsedata) {
            $("#detail-expense").html(responsedata);
            $('#detail-modal').modal('show');
            $.unblockUI();
        });
}
function stEditImage(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Product/EditImage?id=${id}`)
        .done(function (responsedata) {
            $("#edit-image-form").html(responsedata);
            $("#edit-image-modal").modal("show");
            $.unblockUI();
        });
}
function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Product/Edit?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}
function stAddOpt(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Product/AddOption?id=${id}`)
        .done(function (responsedata) {
            $("#add-option-form").html(responsedata);
            $("#add-option-modal").modal("show");
            $.unblockUI();
        });
}
function detailContent(e) {
    //console.log(e);
    const id = e.data["#"].split("_")[1];
    $("<div/>").attr("id", `s_${e.data["#"]}`).appendTo(e.detailCell).mDatatable({
        data: {
            type: "remote",
            source: {
                read: {
                    url: setApiUrl(`GetProductOptionQuantities?id=${id}`, "get"),
                    method: "GET",
                    params: {
                    },
                    map: function (raw) {
                        console.log(raw.Result);
                        return raw.Result;
                    }
                }
            },
            pageSize: 10,
            serverPaging: 1,
            serverFiltering: 0,
            serverSorting: 1
        },
        layout: {
            theme: "default",
            scroll: 1,
            height: 300,
            footer: 0,
            spinner: {
                type: 1,
                theme: "default"
            }
        },
        sortable: 1,
        columns: [
            {
                field: "EpStorages.Name",
                title: "Depo"
            },
            {
                field: "Location",
                title: "Lokasyon"
            }, {
                field: "Quantity",
                title: "Miktar"
            }
        ]
    });
}
//  window.location.href = `/Customer/Details?id=${id}`;
$("#detail-option-table").mDatatable(setDataTableOptions({ detailContent: detailContent }));
$("#detail-intransit-option-table").mDatatable(setDataTableOptionsNotSubTable({}));
$("#stock-movements-table").mDatatable(setDataTableOptionsNotSubTable({}));


function begin(e) {
    console.log(e);
}
function optQuantityRevision(poid, qid, sid, camount) {
    localStorage.setItem("camount", camount);
    $.get(`/Product/QuantityRevision?productOptionId=${poid}&productOptQuantityId=${qid}&storageId=${sid}`)
        .done(function (responsedata) {
            $("#revision-opt-quantity-form").html(responsedata);
            $("#revision-opt-quantity-modal").modal("show");
        });
}
function stDeleteOpt(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`DeleteProductOption?id=${id}`, res);
    });
}
function removeQuantity(qid) {
    epSwalAlert({ message: "Stok bilgisini silmek istiyor musunuz" }).then(function (e) {
        if (e.value) {
            getRequest(`RemoveQuantity?id=${qid}`).then((res) => {
                httpResponse(res);
            });
        }
    });
}

function editOptQuantity(poid, qid) {
    localStorage.setItem("poid", poid);
    $.get(`/Product/EditProductOptionQuantity?id=${qid}`)
        .done(function (responsedata) {
            $("#edit-opt-quantity-form").html(responsedata);
            $("#edit-opt-quantity-modal").modal("show");
        });
}
function stAddQt(e) {
    $.get(`/Product/AddProductOptionQuantity?id=${getId(e)}`)
        .done(function (responsedata) {
            $("#add-opt-quantity-form").html(responsedata);
            $("#add-opt-quantity-modal").modal("show");
        });
}

function result(res) {
    httpResponse(res);
}