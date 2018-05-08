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
let url = process.argv[3]

var promises = [];

let carPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      url,
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
      url,
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
      url,
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

let getInOutCarPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      url,
      { json: {
        RFID: GET_IN_OUT_CAR_DATA[i].RFID,
        carID: GET_IN_OUT_CAR_DATA[i].carID,
        in_out: GET_IN_OUT_CAR_DATA[i].in_out,
        stationID: GET_IN_OUT_CAR_DATA[i].stationID,
        dateTime: GET_IN_OUT_CAR_DATA[i].dateTime
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

let routeDetailPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      url,
      { json: {
        carID: ROUTE_DETAIL_DATA[i].carID,
        index: ROUTE_DETAIL_DATA[i].index,
        from: ROUTE_DETAIL_DATA[i].from,
        to: ROUTE_DETAIL_DATA[i].to
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

let carStatePost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      url,
      { json: {
        carID: CAR_STATE_DATA[i].carID,
        status: CAR_STATE_DATA[i].status,
        seats: CAR_STATE_DATA[i].seats,
        dateTime: CAR_STATE_DATA[i].dateTime
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

let carCurrentLocationPost = (i) => {
  return new Promise((resolve, reject) => {
    request.post(
      url,
      { json: {
        carID: CAR_CURRENT_LOCATION_DATA[i].carID,
        lat: CAR_CURRENT_LOCATION_DATA[i].lat,
        lng: CAR_CURRENT_LOCATION_DATA[i].lng,
        dateTime: CAR_CURRENT_LOCATION_DATA[i].dateTime
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
  console.log('command is : \n\n\tsave-all <url>\n\tsave-car <url>\n\tsave-student <url>\n\tsave-station <url>\n\tsave-route-detail <url>\n\tsave-get-inout-car <url>\n\tsave-car-state <url>\n\tsave-current-location <url>\n')
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
}else if(command === 'save-get-inout-car'){
  console.log('save-get-inout-car')
  for(let i=0;i<GET_IN_OUT_CAR_DATA.length;i++){
    promises.push(getInOutCarPost(i))
  }
}else if(command === 'save-route-detail'){
  console.log('save-route-detail')
  for(let i=0;i<ROUTE_DETAIL_DATA.length;i++){
    promises.push(routeDetailPost(i))
  }
}else if(command === 'save-car-state'){
  console.log('save-car-state')
  for(let i=0;i<CAR_STATE_DATA.length;i++){
    promises.push(carStatePost(i))
  }
}else if(command === 'save-current-location'){
  console.log('save-current-location')
  for(let i=0;i<CAR_CURRENT_LOCATION_DATA.length;i++){
    promises.push(carCurrentLocationPost(i))
  }
}
