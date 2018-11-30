const XLSX = require('xlsx')
let todo = require('./todo.json')

// const wb = XLSX.utils.book_new()
// const str = JSON.stringify(todo).split('"body":').join('"note":')
// console.log(str)
// const sheet = XLSX.utils.json_to_sheet(JSON.parse(str))
// XLSX.utils.book_append_sheet(wb, sheet)
// XLSX.writeFile(wb, 'data.xlsx')

const workbook = XLSX.readFile('./notes.xlsx')
const sheetnamelist = workbook.SheetNames
let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])

function checkData (json, data) {
  let filtered = json.filter(element => !data.find(note => element.title === note.title))
  return filtered
}
console.log(checkData(todo, data))
