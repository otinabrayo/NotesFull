import {useState, useEffect} from 'react'
import api from '../api'
import Note from '../components/Note';
import '../styles/Home.css'

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');

    useEffect(() => {
        getNotes();
    }, [])

    const getNotes = () => {
        api
            .get('/api/notes/')
            .then((response) => response.data)
            .then((data) => {setNotes(data); console.log(data)})
            .catch((err) => alert(err));
    }

    const deleteNote = (id) => {
        api
            .delete(`/api/notes/delete/${id}`)
            .then((response) => {
                if (response.status === 204) alert("Note deleted!");
                else alert("Failed to delete note");
                getNotes();
            })
            .catch((error) => alert(error))
    }

    const cretateNote = (e) => {
        e.preventDefault();
        api
            .post("/api/notes/", {content, title})
            .then((response) => {
                if (response.status === 201) alert("Note created!");
                else alert("Failed to make note.");
                getNotes()
            })
            .catch((err) => alert(err))
    }

    return <div>
        <div>
            <h2>Notes</h2>
            {notes.map((note) =>
                (<Note note={note} onDelete={deleteNote} key={note.id}/>
            ))}
        </div>
        <h2>Create a Note</h2>
        <form onSubmit={cretateNote}>
            <label htmlFor="title">Title:</label>
            <br/>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                required onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="title">Title:</label>
            <br/>
            <textarea
                name="content"
                id="content"
                required
                value={content}
                onChange={(e) => setContent(e.target.value)}
            ></textarea>
            <br/>
            <input type="submit" value="submit"/>
        </form>
    </div>
}

export default Home