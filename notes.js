const chalk = require('chalk')
const fs = require('fs')

const addNote = (title, body) => {
    // Try to read file notes.json, if empty notes will assign to empty array
    const notes = loadNote()

    //Check exist of title note? 
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote) {
        // Push object to notes array
        notes.push({
            title: title,
            body: body,
        })
        // Save notes array to noptes.json file
        saveNote(notes)
        console.log(chalk.green.inverse('New note added!'))
    } else {
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const removeNote = (title) => {
    // Try to read file notes.json, if empty notes will assign to empty array
    const notes = loadNote()

    // Keep all note that have title different with removeNote title
    const noteToKeep = notes.filter((note) => note.title !== title)

    if (notes.length == noteToKeep.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNote(noteToKeep)
        console.log(chalk.green.inverse('Note removed!'))
    }
}

const listNotes = () => {
    const notes = loadNote()
    
    console.log(chalk.inverse('Your notes'))

    notes.forEach((note) => {
        console.log(note.title)
    })
}

const readNote = (title) => {
    const notes = loadNote()
    const noteToRead = notes.find((note) => note.title == title)
    if(noteToRead) {
        console.log(chalk.inverse(noteToRead.title))
        console.log(noteToRead.body)
    } else {
        console.log(chalk.red.inverse('Note not found'))
    }
}

const loadNote = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch (e) {
        return []
    }
}

const saveNote = (notes) => {
    const noteJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json', noteJSON)
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}