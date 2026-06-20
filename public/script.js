const socket=io();

const map=L.map("map")
.setView([0,0],13);

L.tileLayer(
'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
{
maxZoom:19
}
).addTo(map);

let marker;

navigator.geolocation.watchPosition(
(position)=>{

const lat=
position.coords.latitude;

const lng=
position.coords.longitude;

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

}
);

socket.on(
"receive-location",
(data)=>{

L.marker(
[data.lat,data.lng]
).addTo(map);

}
);
