function detailContent(e) {

}
$("#html_table").mDatatable(setDataTableOptions({ detailContent: detailContent }));

function result(res) {
    httpResponse(res);
}