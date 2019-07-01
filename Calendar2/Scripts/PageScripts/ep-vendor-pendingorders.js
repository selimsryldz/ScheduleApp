
function stRemove(e) {
    console.warn("ÜRÜN SİLME");
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
    $.blockUI({
        message: "Lütfen bekleyin",
        css: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    });
    const id = e.data["#"].split("_")[1];
    console.log(id);
    window.location.href = `/Vendor/POrderDetail?id=${id}`;

}
var language = "tr-TR";

setDatatable();
function result(res) {
    console.log(res);
    httpResponse(res);
}