document.addEventListener("DOMContentLoaded", function () {
  // Initialize the Leaflet map
  const map = L.map("map").setView([-27.5, 153.0], 10);
  L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a>',
    maxZoom: 18
  }).addTo(map);

  //  Brisbane Park Locations
  fetch("https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/park-locations/records?limit=100")
    .then(res => res.json())
    .then(data => {
      data.results.forEach(record => {
        const lat = record.latitude;
        const lon = record.longitude;
        const name = record.park_name;
        if (lat && lon) {
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<strong>${name}</strong><br>${record.suburb || ""}`);
        }
      });
    })
    .catch(err => console.error("Error loading park locations:", err));

  //  Brisbane Event Locations
  fetch("https://data.brisbane.qld.gov.au/api/explore/v2.1/catalog/datasets/brisbane-city-council-events-locations/records?limit=100")
    .then(res => res.json())
    .then(data => {
      data.results.forEach(record => {
        const lat = record.latitude;
        const lon = record.longitude;
        const venue = record.venue_name;
        if (lat && lon) {
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<strong>${venue}</strong><br>${record.suburb || ""}`);
        }
      });
    })
    .catch(err => console.error("Error loading event locations:", err));

  //  Queensland CKAN Dataset
  fetch("https://www.data.qld.gov.au/api/3/action/datastore_search?resource_id=553b3049-2b8b-46a2-95e6-640d7986a8c1&limit=100")
    .then(res => res.json())
    .then(data => {
      const records = data.result.records;
      records.forEach(record => {
        const lat = record.Lat || record.latitude;
        const lon = record.Lon || record.longitude;
        const title = record.Title || record.name;
        if (lat && lon) {
          L.marker([lat, lon])
            .addTo(map)
            .bindPopup(`<strong>${title}</strong>`);
        }
      });
    })
    .catch(err => console.error("Error loading CKAN dataset:", err));
});
