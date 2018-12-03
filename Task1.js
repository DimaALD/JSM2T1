/* eslint-disable indent */
/* eslint-disable no-unused-expressions */
const yargs = require('yargs')
const fs = require('fs')
const XLSX = require('xlsx')

const path = './todo.json'

yargs.command('add <title> <body>',
  'Create new note', {}, (argv) => {
    const file = getJSON()
    addNote(file, argv.title, argv.body)
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
      checkTitleExistance(file, argv.title)
      readByTitle(file, argv.title)
    })
  .command('remove <title>',
    'Remove note by title', {}, (argv) => {
      const file = getJSON()
      checkTitleExistance(file, argv.title)
      removeByTitle(file, argv.title)
      printInFile(file)
    })
  .command('writeToExcel',
  'Write all notes in xslx format', {}, () => {
    const file = getJSON()
    writeToExcel(file)
    })
    .command('readFromExcel <path>',
    'Read from xlsx and write in json', {}, (argv) => {
    const file = getJSON()
    printInFile(readFromXlsx(file, argv.path))
  })
  .command('findAndUpdate <title>',
    'To update note use that example: findAndUpdate <title> --newTitle="name of new title" --newBody= "text Of new body"',
     {}, (argv) => {
      const file = getJSON()
      checkTitleExistance(file, argv.title)
      checkDublicates(file, argv.newTitle)
      let updated = findAndUpdate(file, argv.title, argv.newTitle, argv.newBody)
      printInFile(updated)
    })
    .command('sort <type>',
    'Sort all notes by chosen type', {}, (argv) => {
      const file = getJSON()
      sortAllNotes(file, argv)
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

function addNote (file, title, body) {
  checkDublicates(file, title)
  file.push({ title: title, body: body, time: getCurrentDate() })
}

function printInFile (file) {
  fs.writeFileSync('todo.json', JSON.stringify(file, null, ' '))
  console.log('Note is added in file')
}

function printAllNotes (file) {
  if (file.length === 0) {
    throw new Error('List of notes is empty')
  } else {
    file.forEach(obj => { Object.keys(obj).forEach(key => { console.log(key + ':' + obj[key] + '\r\n') }) })
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
    throw new Error("Error.JSON file wasn't converted")
  }
}
function checkDublicates (file, title) {
  file.forEach(element => {
    if (element.title === title) {
      throw new Error('Notes must be unique')
    }
  })
}

function getCurrentDate () {
  const date = new Date()
  const datestring = date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear() + ' ' +
date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  return datestring
}

function readFromXlsx (json, path) {
  const workbook = XLSX.readFile(path)
  const sheetnamelist = workbook.SheetNames
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])
  return json.concat(getFiltered(json, data))
}

function getFiltered (json, data) {
  let filtered = data.filter(element => !json.find(note => element.title === note.title))
  let list = filtered
  list = list.reduce((prev, curr) => {
    if (!prev.filter((duplicate) => curr.title.toLowerCase().trim() === duplicate.title.toLowerCase().trim())[0]) {
      prev.push(curr)
    }
    return prev
  }, [])
  filtered = list
  return filtered
}

function findAndUpdate (file, title, newTitle, newBody) {
  if (!newTitle && !newBody) {
      throw new Error('Error.Input new title or new body')
  } else {
    let changed = file.filter(element => {
      if (element.title.toLowerCase().trim() === title.toLowerCase().trim()) {
        element.title = newTitle || element.title
        element.body = newBody || element.body
      }
      return element
    })
    console.log('Note has been changed')
      return changed
  }
   }

   function checkTitleExistance (file, title) {
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

   function sortAllNotes (file, argv) {
      switch (argv.type) {
        case 'date':
        file.sort((date1, date2) => {
          return Number(new Date(date2.time)) - Number(new Date(date1.time))
       })
       printInFile(file)
       break
       case 'note length':
       file.sort((note1, note2) => {
        if (note1.title.length + note1.body.length < note2.title.length + note2.body.length) { return -1 }
        if (note1.title.length + note1.body.length > note2.title.length + note2.body.length) { return 1 }
        return 0
       })
       printInFile(file)
       break
       case 'title length':
       file.sort((note1, note2) => {
        if (note1.title.length < note2.title.length) { return -1 }
        if (note1.title.length > note2.title.length) { return 1 }
        return 0
       })
       printInFile(file)
       break
       case 'alphabetical':
       file.sort((note1, note2) => {
        if (note1.title < note2.title) { return -1 }
        if (note1.title > note2.title) { return 1 }
        return 0
       })
       printInFile(file)
       break
      }
     }
