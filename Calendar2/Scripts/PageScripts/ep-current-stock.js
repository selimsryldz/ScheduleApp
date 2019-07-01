//$("#table").mDatatable(setDataTableOptions({ detailContent: detailContent }));

function optQuantityRevision(poid, qid, sid, camount) {
    blockUi();
    localStorage.setItem("camount", camount);
    $.get(`/Storage/QuantityRevision?productOptionId=${poid}&productOptQuantityId=${qid}&storageId=${sid}`)
        .done(function (responsedata) {
            $("#revision-opt-quantity-form").html(responsedata);
            $("#revision-opt-quantity-modal").modal("show");
            $.unblockUI();
        });
}
function stDeleteOpt(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`DeleteProductOption?id=${id}`, res);
    });
}
function removeQuantity(qid) {
    httpGetLang("DeleteConfirmation").then((res) => {
        tableDataRemove(`RemoveQuantity?id=${qid}`, res);
    });
}

function editOptQuantity(poid, qid) {
    blockUi();
    localStorage.setItem("poid", poid);
    $.get(`/Storage/EditProductOptionQuantity?id=${qid}`)
        .done(function (responsedata) {
            $("#edit-opt-quantity-form").html(responsedata);
            $("#edit-opt-quantity-modal").modal("show");
            $.unblockUI();
        });
}

function stAddStockQuery(e) {
    blockUi();
    const id = getId(e);
    $.get(`/StockQuery/AddStockQuery?id=${id}`)
        .done(function (responsedata) {
            $("#add-form").html(responsedata);
            $("#add-modal").modal("show");
            $.unblockUI();
        });
}


function result(res) {
    httpResponse(res);
}
