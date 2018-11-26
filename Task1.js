const yargs = require('yargs')
const fs = require('fs')

const path = './todo.json'

yargs.command('add [title] [body]', 'Create new note', {}, (argv) => {
  const file = getJSON()
  addNote(file, argv)
  printInFile(file)
}).command('list', 'List of all notes', {}, () => {
  const file = getJSON()
  printAllNotes(file)
}).command('read [title]', "Read one note by it's title", {}, (argv) => {
  const file = getJSON()
  readByTitle(file, argv.title)
}).command('remove [title]', 'Remove note by title', {}, (argv) => {
  const file = getJSON()
  removeByTitle(file, argv.title)
  printInFile(file)
}).demandCommand(1, 'You need at least one command before moving on').argv

function getJSON () {
  if (fs.existsSync(path)) {
    return require(path)
  } else {
    return []
  }
}

function addNote (file, argv) {
  checkDublicates(file, argv)
  file.push({ title: argv.title, body: argv.body })
}

function printInFile (file) {
  fs.writeFileSync('todo.json', JSON.stringify(file, null, ' '))
  console.log('Note is added in file')
}

function printAllNotes (file) {
  if (file.length === 0) {
    throw new Error('List of notes is empty')
  } else {
    file.forEach(element => {
      console.log('\r\n' + 'title : ' + element.title + '\r\n' + 'body : ' + element.body + '\r\n')
    })
  }
}

function readByTitle (file, title) {
  let resultOfSearch = false
  file.forEach(element => {
    if (element.title === title) {
      resultOfSearch = true
      console.log('\r\n' + 'title : ' + element.title + '\r\n' + 'body : ' + element.body + '\r\n')
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

function checkDublicates (file, argv) {
  file.forEach(element => {
    if (element.title === argv.title || element.body === argv.body) {
      throw new Error('Notes must be unique')
    }
  })
}
