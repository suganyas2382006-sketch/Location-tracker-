const socket = io();

const map = L.map("map").setView([20.5937,78.9629],5);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

let marker;

if(navigator.geolocation){

navigator.geolocation.watchPosition(

(position)=>{

const lat=position.coords.latitude;
const lng=position.coords.longitude;

console.log("Latitude:",lat);
console.log("Longitude:",lng);

socket.emit(
"send-location",
{lat,lng}
);

map.setView(
[lat,lng],
15
);

if(marker){

marker.setLatLng(
[lat,lng]
);

}else{

marker=L.marker(
[lat,lng]
).addTo(map);

}

},

(error)=>{

console.log(error);

alert(
"Location permission denied"
);

},

{
enableHighAccuracy:true,
timeout:5000,
maximumAge:0
}

);

}else{

alert(
"Geolocation not supported"
);

}

socket.on(
"receive-location",
(data)=>{

L.marker(
[data.lat,data.lng]
).addTo(map);

});