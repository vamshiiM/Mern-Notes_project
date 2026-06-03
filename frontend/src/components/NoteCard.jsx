import { Trash2Icon, PenSquareIcon } from 'lucide-react'
import React from 'react'
import { Link } from "react-router"
import { formatDate } from "../lib/utils.js"
import axiosInstance from '../lib/axios.js'
import toast from 'react-hot-toast'

const NoteCard = ({ note, setNotes }) => {

    const handleDelete = async (e, id) => {
        e.preventDefault(); // get rid of the default behaviour

        if (!window.confirm("Are you sure you want to delete this note")) return;

        try {
            await axiosInstance.delete(`/notes/${id}`);
            setNotes((prev) => prev.filter(note => note._id !== id)) // this is to remove the deleted note from Ui
            toast.success("Note deleted successfully");

        } catch (error) {
            console.log("Error in handleDelete", error);
            toast.error("failed to delete Note")
        }

    }


    return (<Link to={`/note/${note._id}`} className="card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-{#00FF90}">
        <div className="card-body">
            <h3 className="card-title text-base-content">{note.title}</h3>
            <p className="text-base-content/70 line-clamp-3">{note.content}</p>
            <div className="card-action justify-between items-center mt-4">
                <span className="text-sm text-base-content/60">
                    {formatDate(new Date(note.createdAt))}
                </span>
                <div className="flex items-center gap-1">
                    <PenSquareIcon className="size-4" />
                    <button className="btn btn-ghost btn-xs text-error" onClick={(e) => handleDelete(e, note._id)}>
                        <Trash2Icon className="size-4" />
                    </button>
                </div>
            </div>
        </div>
    </Link >)
}

export default NoteCard