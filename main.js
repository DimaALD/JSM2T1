const main = require('./mainFunctionality')
const xlsx = require('./xlsx')
const addFunc = require('./addFunc')
const yargs = require('yargs')
// eslint-disable-next-line no-unused-expressions
yargs.command('add <path> <title> <body>',
  'Create new note', {}, (argv) => {
    const file = main.getJSON(argv.path)
    main.addNote(file, argv.title, argv.body)
    main.printInFile(file, argv.path)
  })
  .command('list <path>',
    'List of all notes', {}, (argv) => {
      const file = main.getJSON(argv.path)
      main.printAllNotes(file)
    })
  .command('read <path> <title>',
    "Read one note by it's title", {}, (argv) => {
      const file = main.getJSON(argv.path)
      main.checkTitleExistance(file, argv.title)
      main.readByTitle(file, argv.title)
    })
  .command('remove <path> <title>',
    'Remove note by title', {}, (argv) => {
      const file = main.getJSON(argv.path)
      main.checkTitleExistance(file, argv.title)
      main.removeByTitle(file, argv.title)
      main.printInFile(file, argv.path)
    })
  .command('toExcel <inpath> <outpath>',
    'Write all notes in xslx format', {}, (argv) => {
      const file = main.getJSON(argv.inpath)
      xlsx.writeToExcel(file, argv.outpath)
    })
  .command('readExcel <json> <xlsx>',
    'Read from xlsx and write in json', {}, (argv) => {
      const file = main.getJSON(argv.json)
      main.printInFile(xlsx.readFromExcel(file, argv.xlsx), argv.json)
    })
  .command('update <path> <title>',
    'To update note use that example: findAndUpdate <title> --newTitle="name of new title" --newBody= "text Of new body"',
    {}, (argv) => {
      const file = main.getJSON(argv.path)
      main.checkTitleExistance(file, argv.title)
      main.checkDublicates(file, argv.newTitle)
      let updated = addFunc.findAndUpdate(file, argv.title, argv.newTitle, argv.newBody)
      main.printInFile(updated, argv.path)
    })
  .command('sort <path> <type> <order>',
    'Sort all notes by chosen type and order. desc - sort in descending order . asc - sort in ascending order', {}, (argv) => {
      const file = main.getJSON(argv.path)
      addFunc.sortAllNotes(file, argv)
    })
  .demandCommand(1, 'You need at least one command before moving on')
  .argv
