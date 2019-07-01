openAddForm("/User/AddUser");
function stRemove(e) {
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`BanUser?userId=${getId(e)}`, res);
    });
}

function stDetail(e) {
    window.location.href = `/User/UserProfile?id=${getId(e)}`;
}
function stTransactions(e) {
    window.location.href = `/User/SpecialTransactions?id=${getId(e)}`;
}
setDatatable();

function result(res) {
    httpResponse(res);
}