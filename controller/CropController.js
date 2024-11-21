import {cropDb} from "../db/Db.js";
import {fieldDb} from "../db/Db.js";

$(document).ready(function (){
    var baseURL = "http://localhost:5050/cropManagementSystem/api/v1/crops"
    var cropRecordIndex;
    var cropCode;
    console.log("crop controller is working")
    $('#see-all-crops-btn').on('click', () =>{
        fetchCrops();
    });
    $('#see-all-fields-btn-in-crop-form').on('click', () =>{
        fetchFields()
    });


    function fetchCrops() {
        $.ajax({
            url: baseURL,
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Crops retrieved successfully:', data);
                cropDb.length = 0; // Clear existing crops
                cropDb.push(...data); // Add fetched crops
                loadCropTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch crops:', status, error);
            }
        });
    }
    /* Load crops to the table */
    function loadCropTable() {
        $('#crop-table-tbody').empty();
        console.log(cropDb);
        cropDb.forEach((item) =>{
            let record = `<tr>
                <td class="crop_code_value">${item.cropCode}</td>
                <td class="crop_common_name_value">${item.cropCommonName}</td>
                <td class="crop_scientific_name_value">${item.cropScientificName}</td>
                <td class="crop_image_value">${item.cropImage}</td>
                <td class="crop_category_value">${item.category}</td>
                <td class="crop_season_value">${item.cropSeason}</td>
                <td class="field_code_value">${item.fieldCode}</td>
            </tr>`;
            $('#crop-table-tbody').append(record);
        })
    }
    /* Search a crop from table */
    $('#crop-table-tbody').on('click', 'tr', function (){
        let index = $(this).index();
        cropRecordIndex = index;
        console.log("index: ", index);

        cropCode = $(this).find(".crop_code_value").text();
        $("#crop-code").val(cropCode);
        $.ajax({
            url: baseURL + '/' + cropCode,
            type: 'GET',
            dataType: 'json',
            success: function(data) {
                console.log("Crop data retrieved successfully:", data);
                // Populate the update form fields with fetched data
                $('#update-crop-common-name').val(data.cropCommonName);   // Set common name
                $('#update-crop-scientific-name').val(data.cropScientificName); // Set scientific name
                $('#update-category').val(data.category);                 // Set category
                $('#update-crop-season').val(data.cropSeason);            // Set season
                $('#update-field-code').val(data.fieldCode);// Set field code
                // Update the image preview if an image is available
                if (data.cropImage) {
                    $('#update-crop-image-preview').attr('src', data.cropImage); // Update the preview
                } else {
                    $('#update-crop-image-preview').attr('src', ''); // Clear the preview if no image
                }
            },
            error: function(xhr, status, error) {
                console.error("Failed to fetch crop data:", status, error);
            }
        });
    });
    $('#crop-delete-btn').on('click', () => {
        let cropCode = $('#crop-code').val()

        $.ajax({
            url: baseURL + '/' + cropCode,
            type: 'DELETE',
            contentType: 'application/json',
            success: function (data) {
                console.log('Crop deleted successfully:', data);
                fetchCrops();
                clearCropFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to delete crop:', status, error);
            }
        });
    });
    function fetchFields() {
        $.ajax({
            url: "http://localhost:5050/cropManagementSystem/api/v1/fields",
            type: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log('Fields retrieved successfully:', data);
                fieldDb.length = 0;
                fieldDb.push(...data);
                loadFieldTable();
            },
            error: function (xhr, status, error) {
                console.error('Failed to fetch fields:', status, error);
            }
        });
    }
    function loadFieldTable() {
        $('#field-table-in-crop-table-tbody').empty();
        console.log(fieldDb);

        fieldDb.forEach((item) => {
            // Create a new record string
            let record = `<tr>
                <td class="crop_form_field_code_value">${item.fieldCode}</td>
                <td class="crop_form_field_name_value">${item.fieldName}</td>
                <td class="crop_form_field_location_value">${item.fieldLocation.x}, ${item.fieldLocation.y}</td>  <td class="crop_form_extent_size_value">${item.extentSize}</td>
                <td class="crop_form_field_image1_value">${item.fieldImage1}</td>
            </tr>`;

            $('#field-table-in-crop-table-tbody').append(record);
        });
    }

    // Event handler for selecting the field code
    $('#field-table-in-crop-table-tbody').on('click', 'tr', function () {
        let fieldCode = $(this).find(".crop_form_field_code_value").text();
        $("#field-code").val(fieldCode);
    });

    $('#crop-save-btn').on('click', () => {
        const formData = new FormData();

        formData.append('cropCommonName', $('#crop-common-name').val());
        formData.append('cropScientificName', $('#crop-scientific-name').val());
        let cropImageInput = $('#crop-image').get(0);
        if (cropImageInput && cropImageInput.files.length > 0) {
            formData.append('cropImage', cropImageInput.files[0]);
        } else {
            console.error("No file selected.");
        }
        formData.append('category', $('#crop-category').val());
        formData.append('cropSeason', $('#crop-season').val());
        let fieldCode = $('#field-code').val();
        formData.append('fieldCode', fieldCode);

        $.ajax({
            url: baseURL,
            type: 'POST',
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log('Crop data saved successfully:', response);
                alert("Crop data saved successfully")
                fetchCrops();
                clearCropFields();
            },
            error: function (xhr, status, error) {
                console.error('Failed to save crop data:', status, error);
                // Handle error, e.g., display an error message
            }
        });
    });
    function clearCropFields() {
        $('#crop-common-name').val('');
        $('#crop-scientific-name').val('');
        $('#crop-image').val('');
        $('#crop-category').val('');
        $('#crop-season').val('');
        $('#field-code').val('');
    }
})