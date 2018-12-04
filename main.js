const main = require('./mainFunctionality')
const xlsx = require('./xlsx')
const sort = require('./sort')
const update = require('./updateNote')
const yargs = require('yargs')
// eslint-disable-next-line no-unused-expressions
yargs.command('add <title> <body>',
  'Create new note', {}, (argv) => {
    const file = main.getJSON()
    main.addNote(file, argv.title, argv.body)
    main.printInFile(file)
  })
  .command('list',
    'List of all notes', {}, () => {
      const file = main.getJSON()
      main.printAllNotes(file)
    })
  .command('read <title>',
    "Read one note by it's title", {}, (argv) => {
      const file = main.getJSON()
      main.checkTitleExistance(file, argv.title)
      main.readByTitle(file, argv.title)
    })
  .command('remove <title>',
    'Remove note by title', {}, (argv) => {
      const file = main.getJSON()
      main.checkTitleExistance(file, argv.title)
      main.removeByTitle(file, argv.title)
      main.printInFile(file)
    })
  .command('writeToExcel',
    'Write all notes in xslx format', {}, () => {
      const file = main.getJSON()
      xlsx.writeToExcel(file)
    })
  .command('readFromExcel <path>',
    'Read from xlsx and write in json', {}, (argv) => {
      const file = main.getJSON()
      main.printInFile(xlsx.readFromExcel(file, argv.path))
    })
  .command('findAndUpdate <title>',
    'To update note use that example: findAndUpdate <title> --newTitle="name of new title" --newBody= "text Of new body"',
    {}, (argv) => {
      const file = main.getJSON()
      main.checkTitleExistance(file, argv.title)
      main.checkDublicates(file, argv.newTitle)
      let updated = update.findAndUpdate(file, argv.title, argv.newTitle, argv.newBody)
      main.printInFile(updated)
    })
  .command('sort <type> <order>',
    'Sort all notes by chosen type and order. desc - sort in descending order . asc - sort in ascending order', {}, (argv) => {
      const file = main.getJSON()
      sort.sortAllNotes(file, argv)
    })
  .demandCommand(1, 'You need at least one command before moving on')
  .argv
