const fs = require('fs')
const path = './todo.json'

const getJSON = function () {
  if (fs.existsSync(path)) {
    return require(path)
  } else {
    throw new Error('todo.json file is not found')
  }
}

const addNote = function (file, title, body) {
  checkDublicates(file, title)
  file.push({ title: title, body: body, time: getCurrentDate() })
}

const printInFile = function (file) {
  fs.writeFileSync('todo.json', JSON.stringify(file, null, ' '))
  console.log('Note is added in file')
}

const printAllNotes = function (file) {
  if (file.length === 0) {
    throw new Error('List of notes is empty')
  } else {
    file.forEach(obj => { Object.keys(obj).forEach(key => { console.log(key + ':' + obj[key] + '\r\n') }) })
  }
}
const readByTitle = function (file, title) {
  let resultOfSearch = false
  file.forEach(element => {
    if (element.title === title) {
      resultOfSearch = true
      Object.keys(element).forEach(key => { console.log(key + ':' + element[key] + '\r\n') })
    }
  })
  if (resultOfSearch !== true) {
    console.log('Note is not found.')
  }
}

const removeByTitle = function (file, title) {
  const firstLength = file.length
  file.forEach((element, index) => {
    if (element.title === title) {
      file.splice(index, 1)
    }
  })
  if (firstLength !== file.length) {
    console.log('Note is deleted')
  } else {
    throw new Error('Note is not deleted')
  }
}

const checkDublicates = function (file, title) {
  file.forEach(element => {
    if (element.title === title) {
      throw new Error('Notes must be unique')
    }
  })
}

const getCurrentDate = function () {
  const date = new Date()
  const datestring = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`
  return datestring
}

const checkTitleExistance = function (file, title) {
  let resultOfSearch = false
  file.forEach(element => {
    if (element.title === title) {
      resultOfSearch = true
    }
  })
  if (!resultOfSearch) {
    throw new Error("Error.Title wasn't found")
  }
}

module.exports.getJSON = getJSON
module.exports.addNote = addNote
module.exports.printInFile = printInFile
module.exports.checkDublicates = checkDublicates
module.exports.getCurrentDate = getCurrentDate
module.exports.readByTitle = readByTitle
module.exports.removeByTitle = removeByTitle
module.exports.printAllNotes = printAllNotes
module.exports.checkTitleExistance = checkTitleExistance
