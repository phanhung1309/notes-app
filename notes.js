const chalk = require('chalk')
const fs = require('fs')

const getNotes = () => {
    return 'ERROR!'
}

const addNote = (title, body) => {
    // Try to read file notes.json, if empty notes will assign to empty array
    const notes = loadNote()

    //Check exist of title note? 
    const duplicateNotes = notes.filter((note) => {
        return note.title === title
    })

    if(duplicateNotes.length == 0) {
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
    const noteToKeep = notes.filter((note) => {
        return note.title !== title
    })

    if (notes.length == noteToKeep.length) {
        console.log(chalk.red.inverse('No note found'))
    } else {
        saveNote(noteToKeep)
        console.log(chalk.green.inverse('Note removed!'))
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
    getNotes: getNotes,
    addNote: addNote,
    removeNote: removeNote,
}