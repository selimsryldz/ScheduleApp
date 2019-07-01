var options = {
    tableId: "detail-exists-table",
    orderColumn: "0",
    orderArrow: "asc"
};
setDatatable(null, true, options);
var options2 = {
    tableId: "detail-potantial-table",
    orderColumn: "0",
    orderArrow: "asc"
};
setDatatable(null, true, options2);
var options3 = {
    tableId: "detail-used-table",
    orderColumn: "0",
    orderArrow: "asc"
};
setDatatable(null, true, options3);

function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/CustomerSiteVisit/Edit?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}

function addExists(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/CustomerSiteVisit/AddExistsProduct?id=${id}`)
        .done(function (responsedata) {
            $("#add-exist-form").html(responsedata);
            $("#add-exist-modal").modal("show");
            $.unblockUI();
        });
}
function addPotential(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/CustomerSiteVisit/AddPotentialProduct?id=${id}`)
        .done(function (responsedata) {
            $("#add-potential-form").html(responsedata);
            $("#add-potential-modal").modal("show");
            $.unblockUI();
        });
}
function addUsed(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/CustomerSiteVisit/AddUsedProduct?id=${id}`)
        .done(function (responsedata) {
            $("#add-used-form").html(responsedata);
            $("#add-used-modal").modal("show");
            $.unblockUI();
        });
}

function stRemoveExistProduct(e) {
    tableDataRemove(`RemoveExistProduct?id=${getId(e)}`, "Bu ürünü silmek istiyor musunuz?");
}
function stRemovePotentialProduct(e) {
    tableDataRemove(`RemovePotentialProduct?id=${getId(e)}`, "Bu ürünü silmek istiyor musunuz?");
}
function stRemoveUsedProduct(e) {
    tableDataRemove(`RemoveUsedProduct?id=${getId(e)}`, "Bu ürünü silmek istiyor musunuz?");
}
function stSendApprove(e) {
    const id = e.attributes["data-id2"].value;
    tableDataRemove(`SendApproveSiteVisit?id=${id}`, "Formu onaya göndermek istediğinize emin misiniz? Onaya gönderilen formlar yeniden düzenlenemez.");
}
function stPerform(e) {
    const id = e.attributes["data-id2"].value;
    tableDataRemove(`PerformSiteVisit?id=${id}`, "Ziyareti gerçekleştirmek istediğinize emin misiniz? Bu işlemden sonra form düzenleme işlemlerine başlayabileceksiniz.");
}
function stApprove(e) {
    const id = e.attributes["data-id2"].value;
    const id3 = e.attributes["data-id3"].value;
    tableDataRemove(`ApproveSiteVisit?id=${id}&uId=${id3}`, "Formu onaylamak istediğinize emin misiniz?");
}
function stCancel(e) {
    const id = e.attributes["data-id2"].value;
    tableDataRemove(`CancelSiteVisit?id=${id}`, "Ziyaret programını iptal edip silmek istediğinize emin misiniz?");
}
function stTurnBackSiteVisit(e) {
    const id = e.attributes["data-id2"].value;
    const id3 = e.attributes["data-id3"].value;
    tableDataRemove(`TurnBackSiteVisit?id=${id}&uId=${id3}`, "Formu yeniden düzenlemeye göndermek istediğinize emin misiniz?");
}
function result(res) {
    httpResponse(res, { isRefresh: true });
    $("#add-modal").modal("hide");
}