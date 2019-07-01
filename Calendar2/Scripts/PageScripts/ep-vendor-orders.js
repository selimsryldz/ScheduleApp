$(".addNewItem").click(function () {
    blockUi();
    $.get("/Vendor/Add")
        .done(function (responsedata) {
            $("#add-form").html(responsedata);
            $("#add-modal").modal("show");
            $.unblockUI();
            $('#add-modal').on('hidden.bs.modal',
                function (e) {
                    $("#add-form").html("");
                });
        });
});
function deleteOrder(e) {
    const id = getId(e);
    tableDataRemove(`DeleteOrder?orderId=${id}`,"Bu siparişi gerçekten silmek istediğinize emin misiniz ?");
   
}
function stEdit(e) {
    $.blockUI({
        message: "Lütfen bekleyin",
        css: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    });
    const id = e.attributes["data-id"].value;
    window.location.href = `/Product/Detail?id=${id}`;
}
function detailContent(e) {
    blockUi();
    const id = e.data["#"].split("_")[1];
    window.location.href = `/Vendor/POrderDetail?id=${id}`;
}
function updateNewOrder(e) {
    blockUi();
    $.get("/Vendor/OrderAddProduct?id=" + getId(e)).done((res) => {
        $("#add-product-form").html(res);
        $('#add-product-modal').modal('show');
        $('#add-product-modal').on('hidden.bs.modal',
            function (e) {
                $("#add-product-form").html("");
            });
        $.unblockUI();
    });
}
const options =
    {
        tableId: "table",
        orderColumn: "1",
        orderArrow: "desc"
    }
setDatatable(null, true, options);
function result(res) {
    httpResponse(res);
}
function sendApproveOrder(e) {
    const id = getId(e);
    console.log(id);
    epSwalAlert({ message: "Siparişi kapatıp onaya göndermek istediğinize emin misiniz" }).then((a) => {
        if (a.value) {
            httpGet(`SenToPoApprove?id=${id}`).then((r) => {
                console.log(r);
                if (r.Errors.length <= 0) {
                    location.reload();
                } else {
                    toastr.warning("Onaylanamadı", "Hata");
                }
            });

        }
    });
}
