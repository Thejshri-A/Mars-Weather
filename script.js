document.addEventListener('DOMContentLoaded', () => {
    const csvPath = 'mars-weather.csv'; // Replace with your CSV file path
    let data = [];
    let availableDates = [];

    // Fetch and parse CSV data
    function fetchData() {
        Papa.parse(csvPath, {
            download: true,
            header: true,
            skipEmptyLines: true,
            complete: function(results) {
                data = results.data;
                availableDates = Array.from(new Set(data.map(row => row.terrestrial_date)));
                initializeFlatpickr();
                if (availableDates.length > 0) {
                    displayWeatherData(availableDates[0]); // Display data for the first available date
                }
            },
            error: function(error) {
                console.error('Error fetching CSV data:', error);
            }
        });
    }

    // Initialize Flatpickr with available dates
    function initializeFlatpickr() {
        flatpickr('#calendar', {
            enable: availableDates,
            dateFormat: "Y-m-d",
            onChange: function(selectedDates, dateStr) {
                displayWeatherData(dateStr);
            }
        });
    }

    // Display weather data based on selected date
    function displayWeatherData(selectedDate) {
        const selectedData = data.find(row => row.terrestrial_date === selectedDate);

        if (selectedData) {
            document.getElementById('sol').querySelector('.data').textContent = selectedData.sol || 'N/A';
            document.getElementById('minTemp').querySelector('.data').textContent = `${selectedData.min_temp} °C` || 'N/A';
            document.getElementById('maxTemp').querySelector('.data').textContent = `${selectedData.max_temp} °C` || 'N/A';
            document.getElementById('pressure').querySelector('.data').textContent = `${selectedData.pressure} Pa` || 'N/A';
            document.getElementById('windSpeed').querySelector('.data').textContent = `${selectedData.wind_speed} m/s` || 'N/A';
            document.getElementById('atmoOpacity').querySelector('.data').textContent = selectedData.atmo_opacity || 'N/A';
        } else {
            // Clear the data if no valid date is selected
            document.getElementById('sol').querySelector('.data').textContent = 'N/A';
            document.getElementById('minTemp').querySelector('.data').textContent = 'N/A';
            document.getElementById('maxTemp').querySelector('.data').textContent = 'N/A';
            document.getElementById('pressure').querySelector('.data').textContent = 'N/A';
            document.getElementById('windSpeed').querySelector('.data').textContent = 'N/A';
            document.getElementById('atmoOpacity').querySelector('.data').textContent = 'N/A';
        }
    }

    fetchData(); // Fetch and process the data when the page loads
});
