const XLSX = require('xlsx')
let todo = require('./todo.json')

// const wb = XLSX.utils.book_new()
// const str = JSON.stringify(todo).split('"body":').join('"note":')
// console.log(str)
// const sheet = XLSX.utils.json_to_sheet(JSON.parse(str))
// XLSX.utils.book_append_sheet(wb, sheet)
// XLSX.writeFile(wb, 'data.xlsx')

// const workbook = XLSX.readFile('./notes.xlsx')
// const sheetnamelist = workbook.SheetNames
// let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])

// function checkData (json, data) {
//   let filtered = data.filter(element => !json.find(note => element.title === note.title))
//   let list = filtered
//   list = list.reduce((prev, curr) => {
//     if (!prev.filter((duplicate) => curr.title.toLowerCase().trim() === duplicate.title.toLowerCase().trim())[0]) {
//       prev.push(curr)
//     }
//     return prev
//   }, [])
//   filtered = list
//   return filtered
// }
// console.log(checkData(todo, data))

function sortByDate (arr) {
  arr.sort(function (a, b) {
    console.log(Number(new Date(b.time)))
    return Number(new Date(a.time)) - Number(new Date(b.time))
  })

  return arr
}
console.log(sortByDate(todo))
