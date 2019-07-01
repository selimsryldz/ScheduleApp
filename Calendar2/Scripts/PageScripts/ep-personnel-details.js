function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Personnel/EditPersonnel?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $('#edit-modal').modal('show');
            $.unblockUI();
        });
}
function stDetailExpense(e) {
    blockUi();

    $.get(`/PersonnelExpense/Detail?id=${getId(e)}`)
        .done(function (responsedata) {
            $("#detail-expense").html(responsedata);
            $('#detail-modal').modal('show');
            $.unblockUI();
        });
}

function stRemoveCustomer(e) {
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveCustomer?id=${getId(e)}`, res);
    });
}
function getSiteVisitDetail(e) {
    window.location.href = `/CustomerSiteVisit/Details?id=${getId(e)}`;
}
function getCustomerDetail(e) {
    window.location.href = `/Customer/Details?id=${getId(e)}`;
}
function getExpenseDetail() {
    window.location.href = `/PersonnelExpense/Index`;
}
function stEditImage(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Account/EditImage?id=${id}&type=Personnel`)
        .done(function (responsedata) {
            $("#edit-image-form").html(responsedata);
            $("#edit-image-modal").modal("show");
            $.unblockUI();
        });
}
$("#customers-table").mDatatable(setDataTableOptionsNotSubTable());
$("#site-visits-table").mDatatable(setDataTableOptionsNotSubTable());
$("#expenses-table").mDatatable(setDataTableOptionsNotSubTable());

function result(res) {
    httpResponse(res);
}