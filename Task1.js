/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
const yargs = require('yargs')
const fs = require('fs')
const XLSX = require('xlsx')

const path = './todo.json'

yargs.command('add <title> <body>',
  'Create new note', {}, (argv) => {
    const file = getJSON()
    addNote(file, argv)
    printInFile(file)
  })
  .command('list',
    'List of all notes', {}, () => {
      const file = getJSON()
      printAllNotes(file)
    })
  .command('read <title>',
    "Read one note by it's title", {}, (argv) => {
      const file = getJSON()
      readByTitle(file, argv.title)
    })
  .command('remove <title>',
    'Remove note by title', {}, (argv) => {
      const file = getJSON()
      removeByTitle(file, argv.title)
      printInFile(file)
    })
  .command('writeToExcel',
  'Write all notes in xslx format', {}, () => {
    const file = getJSON()
    writeToExcel(file)
    })
    .command('readFromExcel <path>', 'Read from xlsx and write in json', {}, (argv) => {
    const file = getJSON()
    readFromXlsx(file, argv.path)
  })
  .command('findAndUpdate <title> [newTitle] [newBody]',
    'Find note by title and update title or body', {}, (argv) => {
      const file = getJSON()
      findAndUpdate(file, argv.title, argv.newTitle, argv.newBody)
    })
  .demandCommand(1, 'You need at least one command before moving on')
  .argv

function getJSON () {
  if (fs.existsSync(path)) {
    return require(path)
  } else {
    throw new Error('todo.json file is not found')
  }
}

function addNote (file, argv) {
  checkDublicates(file, argv)
  file.push({ title: argv.title, body: argv.body, time: getCurrentDate() })
}

function printInFile (file) {
  fs.writeFileSync('todo.json', JSON.stringify(file, null, ' '))
  console.log('Note is added in file')
}

function printAllNotes (file) {
  if (file.length === 0) {
    throw new Error('List of notes is empty')
  } else {
    file.forEach(obj => { Object.keys(obj).forEach(key => { console.log(+key + ':' + obj[key] + '\r\n') }) })
  }
}

function readByTitle (file, title) {
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

function removeByTitle (file, title) {
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
function writeToExcel (json) {
  const wb = XLSX.utils.book_new()
  const sheet = XLSX.utils.json_to_sheet(json)
  XLSX.utils.book_append_sheet(wb, sheet)
  XLSX.writeFile(wb, 'notes.xlsx')
  if (fs.existsSync('notes.xlsx')) {
    console.log('Xlsx file was created')
  } else {
    throw new Error("'Error.JSON file wasn't converted")
  }
}
function checkDublicates (file, argv) {
  file.forEach(element => {
    if (element.title === argv.title) {
      throw new Error('Notes must be unique')
    }
  })
}

function getCurrentDate () {
  const date = new Date()
  const datestring = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +
date.getHours() + ':' + date.getMinutes() + date.getSeconds()
  return datestring
}

function readFromXlsx (json, path) {
  const workbook = XLSX.readFile(path)
  const sheetnamelist = workbook.SheetNames
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])
  return json.concat(getFiltered(json, data))
}

function getFiltered (json, data) {
  let filtered = json.filter(element => !data.find(note => element.title === note.title))
  return filtered
}

function findAndUpdate (file, title, newTitle, newBody) {
  if (newTitle && newBody) {
    file.forEach(element => {
      if(element.title === title){
        element.title === newTitle
        element.body === newBody
      }
    })
  }
}
