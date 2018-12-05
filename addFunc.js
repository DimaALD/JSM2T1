const main = require('./mainFunctionality')
const sortAllNotes = function sortAllNotes (file, argv) {
  let order
  if (argv.order === 'asc') {
    order = -1
  }
  if (argv.order === 'desc') {
    order = 1
  }
  switch (argv.type) {
    case 'date':
      file.sort((date1, date2) => {
        if (date2.time > date1.time) { return order }
        if (date2.time < date1.time) { return (-1) * order }
        return 0
      })
      main.printInFile(file)
      break
    case 'note length':
      file.sort((note1, note2) => {
        if (note1.title.length + note1.body.length < note2.title.length + note2.body.length) { return order }
        if (note1.title.length + note1.body.length > note2.title.length + note2.body.length) { return (-1) * order }
        return 0
      })
      main.printInFile(file)
      break
    case 'title length':
      file.sort((note1, note2) => {
        if (note1.title.length < note2.title.length) { return order }
        if (note1.title.length > note2.title.length) { return (-1) * order }
        return 0
      })
      main.printInFile(file)
      break
    case 'alphabetical':
      file.sort((note1, note2) => {
        if (note1.title < note2.title) { return order }
        if (note1.title > note2.title) { return (-1) * order }
        return 0
      })
      main.printInFile(file)
      break
  }
}

const findAndUpdate = function (file, title, newTitle, newBody) {
  if (!newTitle && !newBody) {
    throw new Error('Error.Input new title or new body')
  } else {
    let changed = file.filter(element => {
      if (element.title.toString().toLowerCase().trim() === title.toString().toLowerCase().trim()) {
        element.title = newTitle || element.title
        element.body = newBody || element.body
      }
      return element
    })
    console.log('Note has been changed')
    return changed
  }
}
module.exports.sortAllNotes = sortAllNotes
module.exports.findAndUpdate = findAndUpdate
