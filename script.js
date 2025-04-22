document.addEventListener('DOMContentLoaded', () => {
    // Tab functionaliteit
    function openTab(evt, tabName) {
        const tabcontent = document.querySelectorAll('.tabcontent');
        const tablinks = document.querySelectorAll('.tablink');
        tabcontent.forEach(tab => tab.classList.remove('active'));
        tablinks.forEach(link => link.classList.remove('active'));
        document.getElementById(tabName).classList.add('active');
    }
    window.openTab = openTab;
    document.querySelector('.tablink').click();

    // CSV upload
    const cityList = document.getElementById('cityList');
    document.getElementById('uploadBtn').addEventListener('click', () => {
        const fileInput = document.getElementById('uploadCSV');
        if (fileInput.files.length === 0) return alert('Selecteer een CSV-bestand.');
        const reader = new FileReader();
        reader.onload = (e) => {
            const rows = e.target.result.split('\n');
            cityList.innerHTML = rows.map(city => `<option value="${city.trim()}">`).join('');
            alert('Gemeenten succesvol geüpload.');
        };
        reader.readAsText(fileInput.files[0]);
    });

    // Aanwezigheid toevoegen
    const attendanceForm = document.getElementById('attendanceForm');
    const attendanceTable = document.querySelector('#attendanceTable tbody');
    const attendanceData = JSON.parse(localStorage.getItem('attendanceData')) || [];

    attendanceForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const formData = new FormData(attendanceForm);
        const record = {
            name: formData.get('name'),
            age: formData.get('age'),
            gender: formData.get('gender'),
            city: formData.get('city'),
            date: formData.get('date')
        };
        attendanceData.push(record);
        localStorage.setItem('attendanceData', JSON.stringify(attendanceData));
        renderAttendanceTable();
        attendanceForm.reset();
    });

    function renderAttendanceTable() {
        attendanceTable.innerHTML = attendanceData.map((entry) => `
            <tr>
                <td>${entry.name}</td>
                <td>${entry.age}</td>
                <td>${entry.gender}</td>
                <td>${entry.city}</td>
                <td>${entry.date}</td>
            </tr>
        `).join('');
    }
    renderAttendanceTable();
});