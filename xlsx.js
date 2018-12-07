const fs = require('fs')
const XLSX = require('xlsx')

const writeToExcel = function (json, path) {
  const wb = XLSX.utils.book_new()
  const sheet = XLSX.utils.json_to_sheet(json)
  XLSX.utils.book_append_sheet(wb, sheet)
  XLSX.writeFile(wb, path + '.xlsx')
  if (fs.existsSync(path + '.xlsx')) {
    console.log('Xlsx file was created')
  } else {
    throw new Error("Error.JSON file wasn't converted")
  }
}

const readFromExcel = function readFromXlsx (json, path) {
  const workbook = XLSX.readFile(path + '.xlsx')
  const sheetnamelist = workbook.SheetNames
  let data = XLSX.utils.sheet_to_json(workbook.Sheets[sheetnamelist[0]])
  return json.concat(getFiltered(json, data))
}
// todo
const getFiltered = function (json, data) {
  // get all titles of json file
  let titles = json.map(elem => {
    return elem.title
  })
  // create collection of unique objects from xlsx files
  let allXlxsData = new Map()
  let uniqueData = []
  data.map(elem => {
    allXlxsData.set(elem.title, elem)
  })
  allXlxsData.forEach(elem => {
    uniqueData.push(elem)
  })
  let filtered = uniqueData.filter(elem => {
    let result = true
    if (titles.includes(elem.title)) {
      result = false
    }
    if (elem.time) {
      let time = new Date((elem.time - 25569) * 86400 * 1000)
      const timestring = `${time.getMonth() + 1}/${time.getDate()}/${time.getFullYear()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`
      elem.time = timestring
    }
    return result
  })
  return filtered
}
module.exports.writeToExcel = writeToExcel
module.exports.readFromExcel = readFromExcel
