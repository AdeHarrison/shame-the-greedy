$(function () {

    const FILTER_LEECHES_COOKIE = "filterLeeches";
    const FILTER_MY_LEECHES_COOKIE = "filterMyLeeches";

    $("#filterBtn").on("click", () => {
        let url = "/users/details";

        $.get({url: url}).then(details => {
            url = "/leeches"

            $.get({url: url}).then(dataSet => {
                $('#filterTableId').DataTable({
                    data: convertToArray(dataSet),
                    "pageLength": 5,
                    "lengthChange": false,
                    "columnDefs": [
                        {
                            "visible": false,
                            "searchable": false,
                            "targets": 0,
                        },
                        {
                            "title": "Vote Count",
                            "width": "10%",
                            "searchable": true,
                            "targets": 1,
                        },
                        {
                            "title": "Shop Name",
                            "width": "30%",
                            "searchable": true,
                            "targets": 2,
                        },
                        {
                            "title": "City / Town",
                            "width": "30%",
                            "searchable": true,
                            "targets": 3,
                        },
                        {
                            "title": "District / Area",
                            "width": "30%",
                            "searchable": true,
                            "targets": 4,
                        }],
                }).column(0).visible(false);

                $('#gridSystemModal').modal('show');
            });
        });
    });

    $("#viewFiltered").on("click", () => {
        let filterData = $('#filterTableId').DataTable().rows({filter: 'applied'}).data();
        let filteredIds = Array();

        for (let i = 0; i < filterData.length; i++) {
            filteredIds.push(filterData[i][0]);
        }

        document.cookie = FILTER_LEECHES_COOKIE + "=" + filteredIds;
        document.cookie = FILTER_MY_LEECHES_COOKIE + +'=; expires=Thu, 01 Jan 1970 00:00:01GMT;';

        $('#gridSystemModal').modal('hide');
        window.location.replace("/");
    });

    $("#showMyLeeches").on("change", () => {
        document.cookie = FILTER_MY_LEECHES_COOKIE + "=true";
        document.cookie = FILTER_LEECHES_COOKIE + '=; expires=Thu, 01 Jan 1970 00:00:01GMT;';

        $('#gridSystemModal').modal('hide');
        window.location.replace("/");
    });
});

function convertToArray(dataSetIn) {
    var dataSetOut = Array();

    for (let i = 0; i < dataSetIn.length; i++) {
        let row = Array();

        row.push(dataSetIn[i]._id);
        row.push(dataSetIn[i].voteCount);
        row.push(dataSetIn[i].shopName);
        row.push(dataSetIn[i].cityTown);
        row.push(dataSetIn[i].districtArea);

        dataSetOut.push(row);
    }

    return dataSetOut;
}
