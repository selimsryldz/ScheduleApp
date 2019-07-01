function addContact(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/AddContact?id=${id}`)
        .done(function (responsedata) {
            $("#contact-form").html(responsedata);
            $("#add-contact-modal").modal("show");
            $.unblockUI();
        });
}


function addCustomerActivityNote(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/AddCustomerActivityNote?id=${id}`)
        .done(function (responsedata) {
            $("#activity-note-form").html(responsedata);
            $("#add-activity-note-modal").modal("show");
            $.unblockUI();
        });
}



function stEditCustomerActivity(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/EditCustomerActivityNote?id=${id}`)
        .done(function (responsedata) {
            $("#edit-activity-note-form").html(responsedata);
            $("#edit-activity-note-modal").modal("show");
            $.unblockUI();
        });
}


function stEdit(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/Edit?id=${id}`)
        .done(function (responsedata) {
            $("#edit-form").html(responsedata);
            $("#edit-modal").modal("show");
            $.unblockUI();
        });
}

function addAddres(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/AddAddress?id=${id}`)
        .done(function (responsedata) {
            $("#address-form").html(responsedata);
            $("#add-address").modal("show");
            $.unblockUI();
        });
}
function addMarketRegion(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    $.get(`/Customer/AddCustomerMarketRegion?id=${id}`)
        .done(function (responsedata) {
            $("#marketRegion-form").html(responsedata);
            $("#add-marketRegion").modal("show");
            $.unblockUI();
        });
}

function stRemoveAddress(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveAddress?id=${id}`, res);
    });
}


function stRemoveCustomerActivity(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveCustomerActivityNote?id=${id}`, res);
    });
}
function stRemoveMarketRegion(e) {
    const id = getId(e);
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveMarketRegion?id=${id}`, res);
    });
}
function stEditAddress(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    localStorage.setItem("ccid", id);
    $.get(`/Customer/EditAddress?id=${id}`)
        .done(function (responsedata) {
            $("#edit-address-form").html(responsedata);
            $("#edit-address-modal").modal("show");
            $.unblockUI();
        });
}
function stRemoveContact(e) {
    const id = e.attributes["data-id"].value;
    httpGetLang("DeleteConfirmation").then((res) => {
        console.log(res);
        tableDataRemove(`RemoveContacts?id=${id}`, res);
    });
}

function stEditContact(e) {
    blockUi();
    const id = e.attributes["data-id"].value;
    localStorage.setItem("ccid", id);
    $.get(`/Customer/EditContact?id=${id}`)
        .done(function (responsedata) {
            $("#edit-contact-form").html(responsedata);
            $("#edit-contact").modal("show");
            $.unblockUI();
        });
}
$("#detail-address-table").mDatatable(setDataTableOptionsNotSubTable());
$("#detail-contact-table").mDatatable(setDataTableOptionsNotSubTable());
$("#detail-marketregion-table").mDatatable(setDataTableOptionsNotSubTable());
$("#detail-customer-activity-table").mDatatable(setDataTableOptionsNotSubTable());



const orderTable =
    {
        tableId: "detail-orders-table",
        orderColumn: "1",
        orderArrow: "desc"
    }
setDatatable(null, true, orderTable);


function result(res) {
    httpResponse(res);
}
