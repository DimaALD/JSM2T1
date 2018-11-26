const yargs = require('yargs')
const fs = require('fs')

const path = './todo.json'

yargs.command('add [title] [body]','Create new note',{},(argv)=>{
    if(!argv.title || !argv.body){
        throw new Error("'Fields title and body can't be empty")
    }
    const file = getJSON()
    addNote(file, argv)
    printInFile(file)
}).argv

function getJSON(){
    if(fs.existsSync(path)){
        return require(path)
    }else{
        return []
    }
}
function addNote(file, argv){
    checkDublicates(file, argv)
    file.push({title : argv.title , body : argv.body})
}

function printInFile(note){
    fs.writeFileSync('todo.json',JSON.stringify(note, null, " "))
    console.log('Note is added in file')
}

function checkDublicates(file, argv){
    file.forEach(element => {
        if(element.title === argv.title || element.body === argv.body){
            throw new Error("Notes must be unique")}    
        });
}