import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import { Toggle } from './components/Toggle';
import { useDarkMode } from './styles/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';
import Footer from './components/Footer/Footer';
import { Modal, Button } from 'semantic-ui-react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import DOMPurify from 'dompurify';

const Container = styled.div`
  max-width: 50%;
  margin: 8rem auto 0;
`;

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '09/06/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '10/06/2021',
		},
	]);

	const [searchText, setSearchText] = useState('');
	const [selectedNote, setSelectedNote] = useState(null);

	useEffect(() => {
		AOS.init({
			duration: 2000,
		});
		const savedNotes = JSON.parse(
			localStorage.getItem('react-notes-app-data')
		);

		if (savedNotes) {
			setNotes(savedNotes);
		}
	}, []);

	useEffect(() => {
		localStorage.setItem(
			'react-notes-app-data',
			JSON.stringify(notes)
		);
	}, [notes]);

	const addNote = (title, text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
			title: title,
			text: text,
			date: date.toLocaleDateString(),
		};
		const newNotes = [...notes, newNote];
		setNotes(newNotes);
	};

	const deleteNote = (id) => {
		const newNotes = notes.filter((note) => note.id !== id);
		setNotes(newNotes);
	};

	const [theme, toggleTheme] = useDarkMode();
	const themeMode = theme === 'light' ? lightTheme : darkTheme;


	return (
		<div className='container'>
			<Header />
			<Search handleSearchNote={setSearchText} />
			<NotesList
				notes={notes.filter((note) =>
					note.text.toLowerCase().includes(searchText) ||
					(note.title && note.title.toLowerCase().includes(searchText))
				)}
				handleAddNote={addNote}
				handleDeleteNote={deleteNote}
				handleReadNote={setSelectedNote}
			/>
			<Modal
				open={!!selectedNote}
				onClose={() => setSelectedNote(null)}
				closeIcon
			>
				<Modal.Header>{selectedNote?.title || 'Note Details'}</Modal.Header>
				<Modal.Content scrolling>
					<Modal.Description>
						{selectedNote?.title && <h3 style={{ marginBottom: '1rem' }}>{selectedNote.title}</h3>}
						<div
							dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(selectedNote?.text) }}
							style={{ fontSize: '1.2rem', lineHeight: '1.5' }}
						/>
						<p style={{ color: 'gray', marginTop: '1rem' }}>
							Date: {selectedNote?.date}
						</p>
					</Modal.Description>
				</Modal.Content>
				<Modal.Actions>
					<Button onClick={() => setSelectedNote(null)} primary>
						Close
					</Button>
				</Modal.Actions>
			</Modal>
			<ThemeProvider theme={themeMode}>
				<Container>
					<GlobalStyles />
					<Toggle theme={theme} toggleTheme={toggleTheme} />
				</Container>
			</ThemeProvider>
			<Footer />
		</div>
	);

};

export default App;