$('#sidebar').css({display: 'none'});
$('#signup-section').css({display:'none'});
// Hide all content sections
document.querySelectorAll('.content-section').forEach(section => {
    section.style.display = 'none';
});
$('#signin-section').css({display: 'block'});

$('#signin-btn').on('click',(event)=>{
    event.preventDefault();
    const email = $('#signin-email').val();
    const password = $('#signin-password').val();
    console.log("signin-btn clicked!!", email," ",password);
    $.ajax({
            url: 'http://localhost:5050/cropManagementSystem/api/v1/auth/signin',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password }),
            success: function (response) {
                // Store the token from the response
                localStorage.setItem('token', response.token);
                localStorage.setItem('email',email);
                alert("Successfully signed in!!!");
                console.log("Success");
                $('#signin-section').css({display: 'none'});
                $('#sidebar').css({display: 'block'});
                $('#dropdownMenu').css({display: 'none'});
                navigateTo('crop');

            },
            error: function () {
                alert("Sign in failed!!!")
            }
        });
});

function navigateToSignUp() {
    $('#signin-section').css({display: 'none'});
    $('#signup-section').css({display:'block'});
}
function navigateToSignIn() {
    $('#signup-section').css({display:'none'});
    $('#signin-section').css({display: 'block'});
}

$('#signup-btn').on('click',()=>{
    $('#signin-section').css({display: 'none'});
    $('#signup-section').css({display:'block'});
    const email = $('#signup-email').val();
    const password = $('#signup-password').val();
    const role = $('#signup-role').val();
    $.ajax({
            url: 'http://localhost:5050/cropManagementSystem/api/v1/auth/signup',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ email, password, role }),
            success: function (response) {
                // Store the token from the response
                localStorage.setItem('token', response.token);
                alert("Sign-up successful! You can login now!");
            },
            error: function () {
                alert("Sign-up failed. Please try again.");
            }
        });
});
$('#logout-btn').on('click', ()=>{
    console.log("Logout btn clicked!")
    $('#sidebar').css({display: 'none'});
    $('#signup-section').css({display:'none'});
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });
    $('#signin-section').css({display: 'block'});
});

function toggleSidebar() {
    const dropdownMenu = document.getElementById('dropdownMenu');
    dropdownMenu.classList.toggle('active');
}

function navigateTo(sectionId) {
    // Hide all content sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.style.display = 'none';
    });

    // Show selected section
    document.getElementById(sectionId).style.display = 'block';

    // Hide the dropdown menu after selection on small screens
    document.getElementById('dropdownMenu').classList.remove('active');
}

// Modals in Crop
function openCropsModal() {
    document.getElementById("cropsModal").style.display = "block";
}
function openFieldsModalInCrop() {
    document.getElementById("fieldsModalInCrop").style.display = "block";
}
// Modals in Equipment
function openStaffModalInEquipment() {
    document.getElementById("staffModalInEquipment").style.display = "block";
}
function openFieldsModalInEquipment() {
    document.getElementById("fieldsModalInEquipment").style.display = "block";
}
function openEquipmentModal() {
    document.getElementById("equipmentsModal").style.display = "block";
}
// Modals in Field
function openFieldsModal() {
    document.getElementById("fieldsModal").style.display = "block";
}
function openStaffModalInField() {
    document.getElementById("staffModalInField").style.display = "block";
}
// Modals in Monitoring Log
function openLogModal() {
    document.getElementById("logModal").style.display = "block";
}
function openFieldsModalInLog() {
    document.getElementById("fieldsModalInLog").style.display = "block";
}
function openCropModalInLog() {
    document.getElementById("cropsModalInLog").style.display = "block";
}
function openStaffModalInLog() {
    document.getElementById("staffModalInLog").style.display = "block";
}
// Modals in Staff
function openStaffModal() {
    document.getElementById("staffModal").style.display = "block";
}
// Modals in Vehicle
function openVehicleModal() {
    document.getElementById("vehiclesModal").style.display = "block";
}
function openStaffModalInVehicle() {
    document.getElementById("staffModalInVehicle").style.display = "block";
}
function closeModal() {
    // Modals in crop
    document.getElementById("cropsModal").style.display = "none";
    document.getElementById("fieldsModalInCrop").style.display = "none";
    // Modals in equipment
    document.getElementById("staffModalInEquipment").style.display = "none";
    document.getElementById("equipmentsModal").style.display = "none";
    document.getElementById("fieldsModalInEquipment").style.display = "none";
    // Modals in field
    document.getElementById("fieldsModal").style.display = "none";
    document.getElementById("staffModalInField").style.display = "none";
    // Modals in monitoring log
    document.getElementById("logModal").style.display = "none";
    document.getElementById("fieldsModalInLog").style.display = "none";
    document.getElementById("cropsModalInLog").style.display = "none";
    document.getElementById("staffModalInLog").style.display = "none";
    // modals in staff
    document.getElementById("staffModal").style.display = "none";
    // modals in vehicle
    document.getElementById("vehiclesModal").style.display = "none";
    document.getElementById("staffModalInVehicle").style.display = "none";
}

// Optional: Close the modal when clicking outside of it
window.onclick = function(event) {
    // crops form
    const cropModal = document.getElementById("cropsModal");
    if (event.target == cropModal) {
        cropModal.style.display = "none";
    }
    const fieldsModalInCrop = document.getElementById("fieldsModalInCrop");
    if (event.target == fieldsModalInCrop) {
        fieldsModalInCrop.style.display = "none";
    }
    // equipment form
    const equipmentsModal = document.getElementById("equipmentsModal");
    if (event.target == equipmentsModal) {
        equipmentsModal.style.display = "none";
    }
    const staffModalInEquipment = document.getElementById("staffModalInEquipment");
    if (event.target == staffModalInEquipment) {
        staffModalInEquipment.style.display = "none";
    }
    const fieldsModalInEquipment = document.getElementById("fieldsModalInEquipment");
    if (event.target == fieldsModalInEquipment) {
        fieldsModalInEquipment.style.display = "none";
    }
    // fields form
    const fieldsModal = document.getElementById("fieldsModal");
    if (event.target == fieldsModal) {
        fieldsModal.style.display = "none";
    }
    const staffModalInField = document.getElementById("staffModalInField");
    if (event.target == staffModalInField) {
        staffModalInField.style.display = "none";
    }
    // monitoring log form
    const logModal = document.getElementById("logModal");
    if (event.target == logModal) {
        logModal.style.display = "none";
    }
    const fieldsModalInLog = document.getElementById("fieldsModalInLog");
    if (event.target == fieldsModalInLog) {
        fieldsModalInLog.style.display = "none";
    }
    const cropsModalInLog = document.getElementById("cropsModalInLog");
    if (event.target == cropsModalInLog) {
        cropsModalInLog.style.display = "none";
    }
    const staffModalInLog = document.getElementById("staffModalInLog");
    if (event.target == staffModalInLog) {
        staffModalInLog.style.display = "none";
    }
    //staff form
    const staffModal = document.getElementById("staffModal");
    if (event.target == staffModal) {
        staffModal.style.display = "none";
    }
    //vehicles form
    const vehiclesModal = document.getElementById("vehiclesModal");
    if (event.target == vehiclesModal) {
        vehiclesModal.style.display = "none";
    }
    const staffModalInVehicle = document.getElementById("staffModalInVehicle");
    if (event.target == staffModalInVehicle) {
        staffModalInVehicle.style.display = "none";
    }
};
