const fs = require('fs')
const XLSX = require('xlsx')

const writeToExcel = function (json) {
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

const readFromExcel = function readFromXlsx (json, path) {
  const workbook = XLSX.readFile(path)
  const sheetnamelist = workbook.SheetNames
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])
  return json.concat(getFiltered(json, data))
}
// todo
const getFiltered = function (json, data) {
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
module.exports.writeToExcel = writeToExcel
module.exports.readFromExcel = readFromExcel
