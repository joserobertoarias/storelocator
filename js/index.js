var map;
var markers = [];
var infoWindow;
const _URLBASE =
  "https://www.google.com/maps/dir/?api=1&destination=";

function initMap() {
  var losAngeles = {
    lat: 34.06338,
    lng: -118.35808
  };

  map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: losAngeles,
    styles: [
      {
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#523735"
          }
        ]
      },
      {
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#c9b2a6"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#dcd2be"
          }
        ]
      },
      {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#ae9e90"
          }
        ]
      },
      {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#93817c"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#a5b076"
          }
        ]
      },
      {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#447530"
          }
        ]
      },
      {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f5f1e6"
          }
        ]
      },
      {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#fdfcf8"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#f8c967"
          }
        ]
      },
      {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#e9bc62"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#e98d58"
          }
        ]
      },
      {
        "featureType": "road.highway.controlled_access",
        "elementType": "geometry.stroke",
        "stylers": [
          {
            "color": "#db8555"
          }
        ]
      },
      {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#806b63"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#8f7d77"
          }
        ]
      },
      {
        "featureType": "transit.line",
        "elementType": "labels.text.stroke",
        "stylers": [
          {
            "color": "#ebe3cd"
          }
        ]
      },
      {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [
          {
            "color": "#dfd2ae"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
          {
            "color": "#b9d3c2"
          }
        ]
      },
      {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
          {
            "color": "#92998d"
          }
        ]
      }
    ]
  });

  infoWindow = new google.maps.InfoWindow();

  //displayStores is no longer ,
  //displayStores();
  //now we use function searchStores
  searchStores();

  //this funcion is no longer,now showStores from searchStores function
  //showStoresMarkers();

  //this function is no longer
  //setOnClickListener();
}

function setOnClickListener() {
  //adding a click listener to all elements with class ...
  var storeElements = document.querySelectorAll(".store-container");
  //console.log(storeElements);
  //loop elements
  storeElements.forEach(function (elem, index) {
    elem.addEventListener("click", function () {
      google.maps.event.trigger(markers[index], "click");
    });
  });
}

//before withous parameters used variable list store-data but now we use a parameter
//wich we pass from searchStores.
function displayStores(stores) {
  var storesHtml = "";
  stores.forEach(function (store, index) {
    //console.log(store);
    var address = store.addressLines;
    var phone = store.phoneNumber;

    storesHtml += `
    <div class="store-container">  
      <div class="store-container-background">      
        <div class="store-info-container">
          <div class="store-address">
            <span>${address[0]}</span>
            <span>${address[1]}</span>
          </div>
          <div class="store-phone-number">${phone}</div>
        </div>
        <div class="store-number-container">
          <div class="store-number">
            ${index + 1}
          </div>
        </div>
      </div>        
    </div>`;
  });

  document.querySelector(".stores-list").innerHTML = storesHtml;
}

function showStoresMarkers(stores) {
  var bounds = new google.maps.LatLngBounds();
  stores.forEach(function (store, index) {
    var latlng = new google.maps.LatLng(
      store.coordinates.latitude,
      store.coordinates.longitude
    );
    var name = store.name;
    var address = store.addressLines[1];
    var phone = store.phoneNumber;
    var openStatusText = store.openStatusText;
    bounds.extend(latlng);
    createMarker(latlng, name, address, openStatusText, phone, index);
  });
  map.fitBounds(bounds);
}

function createMarker(latlng, name, address, openStatusText, phone, index) {
  var html = "<b>" + name + "</b> <br/>" + address;
  let urlDirection = createUrlDirection(address);
  html = `
    <div class="store-info-window">
      <div class="store-info-name">${name}</div>
      <div class="store-info-status">${openStatusText}</div>
      <div class="store-info-address">
        <div class="circle">
          <i class="fas fa-location-arrow"></i>
        </div>
        <a href="${urlDirection}">${address}</a>
      </div>
      <div class="store-info-phone">
      <div class="circle">
        <i class="fas fa-phone-alt"></i>      
      </div>
        ${phone}
      </div>
    </div>
    `;



  var htmlInfoWindow =
    '<div class="info-window">' +
    '<div class="info-window-head">' +
    '  <div class="info-store-name">' +
    name +
    "</div>" +
    '  <div class="info-store-openStatus">' +
    openStatusText +
    "</div>" +
    "</div>" +
    '<div class="info-window-detail">' +
    '  <div class="info-store-address">' +
    '    <div class="info-store-address-icon">' +
    '      <i class="fas fa-location-arrow"></i>' +
    "    </div>" +
    '    <div class="info-store-address-text"><a href="' +
    urlDirection +
    '">' +
    address +
    "</a></div>" +
    "  </div>" +
    '  <div class="info-store-phone">' +
    '    <div class="info-store-phone-icon">' +
    '      <i class="fas fa-phone-square-alt"></i>' +
    "    </div>" +
    '  <div class="info-store-phone-text">' +
    phone +
    "</div>" +
    "  </div>" +
    "</div>" +
    "</div>";

  var marker = new google.maps.Marker({
    map: map,
    position: latlng,
    label: `${index + 1}`,
    icon: 'https://epicstorelocator.imfast.io/img/starbucks-logo-icon.png'
  });

  //google.maps.event.addListener(marker, 'mouseover', function() {
  google.maps.event.addListener(marker, "click", function () {
    //console.log(htmlInfoWindow);
    infoWindow.setContent(html);
    infoWindow.open(map, marker);
  });
  markers.push(marker);
}

function createUrlDirection(directionAddress) {
  let address = directionAddress.replace(" ", "%20");
  let url = _URLBASE + address;
  return url;
}

function searchStores() {
  //new list stores with the zip code variable
  var foundStores = [];
  var zipCode = document.getElementById("zip-code-input").value;

  if (zipCode) {
    stores.forEach(function (store) {
      //get only first five letters of postal code
      var postal = store.address.postalCode.substring(0, 5);
      if (postal == zipCode) {
        foundStores.push(store);
      }
    });
  } else {
    foundStores = stores;
  }

  //console.log(foundStores);

  clearLocations();
  displayStores(foundStores);
  showStoresMarkers(foundStores);
  setOnClickListener();
}

function clearLocations() {
  infoWindow.close();
  for (var i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers.length = 0;
}
