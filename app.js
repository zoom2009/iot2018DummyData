const gpsDistance = require('gps-distance')
const request = require('request')

const {CAR_DATA} = require('./Dummy-Data/CAR_DATA')
const {STUDENT_DATA} = require('./Dummy-Data/STUDENT_DATA')
const {STATION_DATA} = require('./Dummy-Data/STATION_DATA')
const {ROUTE_DETAIL_DATA} = require('./Dummy-Data/ROUTE_DETAIL_DATA')
const {GET_IN_OUT_CAR_DATA} = require('./Dummy-Data/GET_IN_OUT_CAR_DATA')
const {CAR_STATE_DATA} = require('./Dummy-Data/CAR_STATE_DATA')
const {CAR_CURRENT_LOCATION_DATA} = require('./Dummy-Data/CAR_CURRENT_LOCATION_DATA')

console.log('@@@ Run command help for more information @@@')

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
  console.log('command is : \n\n\tdrop-db\n\tsave-all\n\tsave-car\n\tsave-student\n\tsave-station\n\tsave-route-detail\n\tsave-car-state\n\tsave-current-location\n')
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
