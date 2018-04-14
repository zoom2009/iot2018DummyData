const gpsDistance = require('gps-distance')
const request = require('request')

CAR_DATA = [
  {
    carID: "car001",
    startStation: "station001",
    finishStation: "station005"
  },
  {
    carID: "car002",
    startStation: "station001",
    finishStation: "station003"
  },
  {
    carID: "car003",
    startStation: "station005",
    finishStation: "station002"
  },
  {
    carID: "car004",
    startStation: "station005",
    finishStation: "station001"
  },
  {
    carID: "car005",
    startStation: "station002",
    finishStation: "station004"
  }
]
// 5 car

STUDENT_DATA = [
  {
    RFID: "rfid_dummy_001",
    firstName: "Jack",
    lastName: "Daniels"
  },
  {
    RFID: "rfid_dummy_002",
    firstName: "John",
    lastName: "Wick"
  },
  {
    RFID: "rfid_dummy_003",
    firstName: "Tom",
    lastName: "Jerry"
  },
  {
    RFID: "rfid_dummy_004",
    firstName: "Anna",
    lastName: "Kendrick"
  },
  {
    RFID: "rfid_dummy_005",
    firstName: "Susan"
  },
  {
    RFID: "rfid_dummy_006",
    firstName: "Jordan",
    lastName: "Gomez"
  },
  {
    RFID: "rfid_dummy_007",
    firstName: "Man"
  },
  {
    RFID: "rfid_dummy_008",
    firstName: "Johnny",
    lastName: "English"
  },
  {
    RFID: "rfid_dummy_009",
    firstName: "Nico",
    lastName: "Born"
  },
  {
    RFID: "rfid_dummy_010",
    firstName: "Dona",
    lastName: "Thumb"
  },
]
// 10 data

STATION_DATA = [
  {
    stationID: "station001",
    name: "Book Center",
    lat: "8.6448331",
    lng: "99.8980755"
  },
  {
    stationID: "station002",
    name: "หอดูดาว",
    lat: "8.6393239",
    lng: "99.897485"
  },
  {
    stationID: "station003",
    name: "อุทยานวิทยาศาสตร์และเทคโนโลยี",
    lat: "8.6417004",
    lng: "99.892807"
  },
  {
    stationID: "station004",
    name: "Seven Eleven",
    lat: "8.6471238",
    lng: "99.8948334"
  },
  {
    stationID: "station005",
    name: "Walailak University Hospital ",
    lat: "8.6412511",
    lng: "99.9110802"
  }
]
// 5 data

ROUTE_DETAIL_DATA = [
  {
    rdID: "rd001",
    from: "station001",
    to: "station009",
    index: "1"
  },
]

GET_IN_OUT_CAR_DATA = [
  {
    RFID: "rfid_dummy_001",
    carID: "car001",
    in_out: "i",
    stationID: "station001",
    dateTime: "12-04-2018 10:42:58"
  }
]

CAR_STATE = [
  {
    carID: "car001",
    status: "r",
    seats: "1",
    dateTime: "12-04-2018 10:42:58"
  }
]

CAR_CURRENT_LOCATION = [
  {
    carID: "car001",
    lat: "",
    lng: "",
    dateTime: "12-04-2018 10:42:58"
  }
]

let command = process.argv[2]

var promises = [];

let carPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      'http://localhost:4000/CAR',
      { json: {
        carID: CAR_DATA[i].carID,
        startStation: CAR_DATA[i].startStation,
        finishStation: CAR_DATA[i].finishStation
      } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
              resolve(body+'\n')
          }else{
            reject('error to post\n')
          }
      }
    )
  })
}

let studentPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      'http://localhost:4000/STUDENT',
      { json: {
        RFID: STUDENT_DATA[i].RFID,
        firstName: STUDENT_DATA[i].firstName,
        lastName: STUDENT_DATA[i].lastName
      } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
              resolve(body+'\n')
          }else{
            reject('error to post\n')
          }
      }
    )
  })
}

let stationPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      'http://localhost:4000/STATION',
      { json: {
        stationID: STATION_DATA[i].stationID,
        name: STATION_DATA[i].name,
        lat: STATION_DATA[i].lat,
        lng: STATION_DATA[i].lng
      } },
      function (error, response, body) {
          if (!error && response.statusCode == 200) {
              console.log(body)
              resolve(body+'\n')
          }else{
            reject('error to post\n')
          }
      }
    )
  })
}

if(command === 'help'){
  console.log('command is : \n\ndrop-db\nsave-all\nsave-car\nsave-student\nsave-station\nsave-route-detail\nsave-car-state\nsave-current-location\n')
}else if(command === 'drop-db'){
  console.log('drop-db')
}else if(command === 'save-all'){
  console.log('save-all')
}else if(command === 'save-car'){
  console.log('save-car')
  for(let i=0;i<CAR_DATA.length;i++){
    promises.push(carPost(i))
  }
}else if(command === 'save-student'){
  console.log('save-student')
  for(let i=0;i<STUDENT_DATA.length;i++){
    promises.push(studentPost(i))
  }
}else if(command === 'save-station'){
  console.log('save-station')
  for(let i=0;i<STATION_DATA.length;i++){
    promises.push(stationPost(i))
  }
}else if(command === 'save-route-detail'){
  console.log('save-route-detail')
}else if(command === 'save-car-state'){
  console.log('save-car-state')
}else if(command === 'save-current-location'){
  console.log('save-current-location')
}
