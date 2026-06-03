import Note from "../models/Note.js";


// U can replace the req with _ if it doesn't is in use
export async function FetchALL(_, res) {
    // note: an async function will have wait inside it 
    try {
        // res.send("notes are present"); 
        const notes = await Note.find().sort({ createdAt: -1 }) // .sort is used get the newest one // 1 is bydefault and provides the oldest one first
        res.status(200).json(notes);
    } catch (error) {
        console.error("error in FetchALL ,notesController", error);

        res.status(500).json({ message: "error in fetching notes" });
    }

    // res.status(200).send("You just fetched the notes");

}

export async function FetchByID(req, res) {
    try {

        const OneNote = await Note.findById(req.params.id);

        if (!OneNote) return res.status(404).json({ message: "Note not found" });

        res.status(200).json(OneNote);


    } catch (error) {
        console.error("Error in FetchByID, NotesController", error);

        res.status(500).json({ message: "error in fetching the note" });
    }
}

export async function createNote(req, res) {


    try {

        const { title, content } = req.body;
        // express.json() works in here 
        console.log(title, content);

        // creating new document
        const newNote = new Note({ title, content });

        await newNote.save();
        res.status(201).json({ message: "Note created succesfully" });

        // This can also be done but it is optional , it would return the saved data 
        // const savedNote = await newNote.save()
        // res.status(201).json(savedNote);

    } catch (error) {
        console.error("error in createALL ,notesController", error);

        res.status(500).json({ message: "error in creating notes" });
    }


}

export async function updateNote(req, res) {
    try {

        const { title, content } = req.body;

        // check if the note is present before it can be updated

        // findByIdAndUpdate returns the default note before update as it is 
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, { title, content }, {
            new: true, // this will return document after it is updated 
        })

        if (!updateNote) return res.status(404).json({ message: "not found" });

        res.status(200).json({ message: "Note updated succesfully" });

    } catch (error) {
        console.error("error in updateNote ,notesController", error);

        res.status(500).json({ message: "error in updating notes" });
    }

}

export async function deleteNote(req, res) {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id)

        if (!deletedNote) return res.status(404).json({ message: "note not found" });

        res.status(200).json({ message: "note deleted" })

    } catch (error) {
        console.error("error in deleteNote,notesController", error);

        res.status(500).json({ message: "error deleting the note" });
    }
}

export function tpFunction(req, res) {
    res.send("hiii there !");
}