openAddForm("/CustomerSiteVisit/AddCustomerSiteVisit");

function getCustomerSiteVisitDetail(e) {
    blockUi();
    window.location.href = `/CustomerSiteVisit/Details?id=${getId(e)}`;
}
setDatatable();
function result(res) {
    httpResponse(res, { isRefresh: true });
}