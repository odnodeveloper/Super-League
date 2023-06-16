// Add an event listener to the form submission
document.getElementById('coordinatesForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get the input values for Point A and Point B
    const pointA = document.getElementById('pointA').value.trim();
    const pointB = document.getElementById('pointB').value.trim();

    // Split the coordinates into latitude and longitude
    const latLonA = pointA.split(',');
    const latLonB = pointB.split(',');

    // Get the latitude and longitude values
    const latA = parseFloat(latLonA[0]);
    const lonA = parseFloat(latLonA[1]);
    const latB = parseFloat(latLonB[0]);
    const lonB = parseFloat(latLonB[1]);

    // Calculate the air distance between the two points
    const distance = calculateAirDistance(latA, lonA, latB, lonB);

    // Display the result
    document.getElementById('result').textContent = 'Distance: ' + distance.toFixed(2) + ' km';
});

// Function to calculate the air distance between two points using Haversine formula
function calculateAirDistance(latA, lonA, latB, lonB) {
    const earthRadius = 6371; // Radius of the Earth in kilometers

    // Convert latitude and longitude to radians
    const radLatA = toRadians(latA);
    const radLonA = toRadians(lonA);
    const radLatB = toRadians(latB);
    const radLonB = toRadians(lonB);

    // Calculate the differences
    const deltaLat = radLatB - radLatA;
    const deltaLon = radLonB - radLonA;

    // Calculate the distance using Haversine formula
    const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
        Math.cos(radLatA) * Math.cos(radLatB) *
        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = earthRadius * c;

    return distance;
}

// Function to convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}
