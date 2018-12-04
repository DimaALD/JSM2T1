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

module.exports.findAndUpdate = findAndUpdate
