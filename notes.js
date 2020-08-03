const fs = require('fs')
const chalk = require('chalk')

const getNotes = function () {
    return 'Your notes...'
}

const addNote = function (title, body) {
    const notes = loadNotes()
    //const duplicateNotes = notes.filter((note)=> note.title === title)
    const duplicateNote = notes.find((note)=> note.title === title)                 
    

    if (duplicateNote===undefined)
     {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title already  taken!'))
       
    }
}

const saveNotes = function (notes) {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJSON)
}

const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}
const removeNotes = function (title) 
{
    console.log(title);
    const notes = loadNotes()
    console.log(notes);
    const notesToKeep = notes.filter((note)=> {
        return (note.title !== title)
    })

    if (notes.length > notesToKeep.length) {
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    } else {
        console.log(chalk.red.inverse('No note found!'))
    }   
}

const showList=function()
{
   console.log(chalk.yellow.inverse("Your Log is here!!")) 
   const notes=loadNotes();
   notes.forEach(element => {
       console.log(element.title);
       
   });
}

const readNotes=function(title)
{
    const notes=loadNotes();
    const searchNotes=notes.find((note)=>note.title===title)
    if(searchNotes===undefined)
    {
    console.log(chalk.red.inverse("Error..No Title found"));
    }
    else{
       console.log(chalk.blue.inverse(searchNotes.title))
       console.log(searchNotes.body)
    }
}
module.exports = {
    getNotes: getNotes,
    addNote: addNote,
    removeNotes:removeNotes,
    showList:showList,
    readNotes:readNotes
}