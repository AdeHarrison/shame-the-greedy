$(function () {

    const FILTER_LEECHES_COOKIE = "filterLeeches";

    $('#filterTableId').DataTable({
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

    $("#filterBtn").on("click", () => {
        let url = "/leeches"

        $.get({url: url}).then(dataSet => {
            let dataTable = $('#filterTableId').DataTable();
            dataTable.clear();
            dataTable.rows.add(convertToArray(dataSet));
            dataTable.draw();

            $('#gridSystemModal').modal('show');
        });
    });

    $("#viewFiltered").on("click", () => {
        let filterData = $('#filterTableId').DataTable().rows({filter: 'applied'}).data();
        let filteredIds = Array();

        for (let i = 0; i < filterData.length; i++) {
            filteredIds.push(filterData[i][0]);
        }

        document.cookie = FILTER_LEECHES_COOKIE + "=" + filteredIds;

        $('#gridSystemModal').modal('hide');
        window.location.replace("/");
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
});
