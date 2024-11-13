// Show different sections based on navigation
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
}

// Fetch Crops from backend
function fetchCrops() {
    fetch('http://localhost:8080/api/crops')
        .then(response => response.json())
        .then(data => {
            const cropTable = document.getElementById('cropTable');
            cropTable.innerHTML = `<tr>
                <th>Crop Code</th>
                <th>Crop Common Name</th>
                <th>Crop Scientific Name</th>
                <th>Crop Image</th>
                <th>Category</th>
                <th>Crop Season</th>
                <th>Field Code</th>
            </tr>`;
            data.forEach(crop => {
                const row = `<tr>
                    <td>${crop.id}</td>
                    <td>${crop.name}</td>
                    <td>${crop.type}</td>
                    <td><button onclick="deleteCrop(${crop.id})">Delete</button></td>
                </tr>`;
                cropTable.insertAdjacentHTML('beforeend', row);
            });
        });
}

// Fetch Fields from backend
function fetchFields() {
    fetch('http://localhost:8080/api/fields')
        .then(response => response.json())
        .then(data => {
            const fieldTable = document.getElementById('fieldTable');
            fieldTable.innerHTML = `<tr>
                <th>ID</th>
                <th>Location</th>
                <th>Size</th>
                <th>Action</th>
            </tr>`;
            data.forEach(field => {
                const row = `<tr>
                    <td>${field.id}</td>
                    <td>${field.location}</td>
                    <td>${field.size}</td>
                    <td><button onclick="deleteField(${field.id})">Delete</button></td>
                </tr>`;
                fieldTable.insertAdjacentHTML('beforeend', row);
            });
        });
}

// Fetch Staff from backend
function fetchStaff() {
    fetch('http://localhost:8080/api/staff')
        .then(response => response.json())
        .then(data => {
            const staffTable = document.getElementById('staffTable');
            staffTable.innerHTML = `<tr>
                <th>ID</th>
                <th>Name</th>
                <th>Role</th>
                <th>Action</th>
            </tr>`;
            data.forEach(staff => {
                const row = `<tr>
                    <td>${staff.id}</td>
                    <td>${staff.name}</td>
                    <td>${staff.role}</td>
                    <td><button onclick="deleteStaff(${staff.id})">Delete</button></td>
                </tr>`;
                staffTable.insertAdjacentHTML('beforeend', row);
            });
        });
}

// Fetch Vehicles from backend
function fetchVehicles() {
    fetch('http://localhost:8080/api/vehicles')
        .then(response => response.json())
        .then(data => {
            const vehicleTable = document.getElementById('vehicleTable');
            vehicleTable.innerHTML = `<tr>
                <th>ID</th>
                <th>License Plate</th>
                <th>Type</th>
                <th>Status</th>
                <th>Action</th>
            </tr>`;
            data.forEach(vehicle => {
                const row = `<tr>
                    <td>${vehicle.id}</td>
                    <td>${vehicle.licensePlate}</td>
                    <td>${vehicle.type}</td>
                    <td>${vehicle.status}</td>
                    <td><button onclick="deleteVehicle(${vehicle.id})">Delete</button></td>
                </tr>`;
                vehicleTable.insertAdjacentHTML('beforeend', row);
            });
        });
}

// Example delete functions for each entity
function deleteCrop(id) {
    fetch(`http://localhost:8080/api/crops/${id}`, { method: 'DELETE' })
        .then(() => fetchCrops());
}

function deleteField(id) {
    fetch(`http://localhost:8080/api/fields/${id}`, { method: 'DELETE' })
        .then(() => fetchFields());
}

function deleteStaff(id) {
    fetch(`http://localhost:8080/api/staff/${id}`, { method: 'DELETE' })
        .then(() => fetchStaff());
}

function deleteVehicle(id) {
    fetch(`http://localhost:8080/api/vehicles/${id}`, { method: 'DELETE' })
        .then(() => fetchVehicles());
}
