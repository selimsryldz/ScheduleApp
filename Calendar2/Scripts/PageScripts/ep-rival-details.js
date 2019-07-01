$("#detail-rivalbrand-table").mDatatable(setDataTableOptionsNotSubTable({}));
$("#detail-customer-site-visit-table").mDatatable(setDataTableOptionsNotSubTable({}));

function stEditOpt(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/RivalBrand/EditRivalBrand?id=${id}`)
        .done(function (responsedata) {
            $("#edit-rival-brand-form").html(responsedata);
            $("#edit-rival-brand-modal").modal("show");
            $.unblockUI();
        });
}


function stDeleteOpt(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveRivalBrand?id=${id}`, res);
    });
}


//function stRemove(e) {
//    const id = e.attributes["data-id"].value;
//    httpGetLang("DeleteConfirmation").then((res) => {
//        console.log(res);
//        tableDataRemove(`RemoveRivalBrand?id=${id}`, res);
//    });
//}

function stEdit(e) {

    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Rival/EditRival?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();

        });

}

function addNewBrand(e) {
    const id = e.attributes["data-id"].value;
    $.get(`/RivalBrand/AddRivalBrand?id=${id}`)
        .done(function (responsedata) {
            $("#add-form").html(responsedata);
            $("#add-modal").modal("show");
        });
}
//function addPotential(e) {
//    const id = e.attributes["data-id"].value;
//    $.get(`/CustomerSiteVisit/AddPotentialProduct?id=${id}`)
//        .done(function (responsedata) {
//            $("#add-potential-form").html(responsedata);
//            $("#add-potential-modal").modal("show");
//        });
//}
//function addUsed(e) {
//    const id = e.attributes["data-id"].value;
//    $.get(`/CustomerSiteVisit/AddUsedProduct?id=${id}`)
//        .done(function (responsedata) {
//            $("#add-used-form").html(responsedata);
//            $("#add-used-modal").modal("show");
//        });
//}

function result(res) {
    httpResponse(res, { isRefresh: true });
    $("#add-modal").modal("hide");
}