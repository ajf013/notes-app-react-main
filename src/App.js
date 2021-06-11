import { useState, useEffect } from 'react';
import { nanoid } from 'nanoid';
import NotesList from './components/NotesList';
import Search from './components/Search';
import { Toggle } from './components/Toggle';
import { useDarkMode } from './styles/useDarkMode';
import { GlobalStyles, lightTheme, darkTheme } from './styles/globalStyles';
import styled, { ThemeProvider } from 'styled-components';
import Header from './components/Header';

const Container = styled.div`
  max-width: 50%;
  margin: 8rem auto 0;
`;

const App = () => {
	const [notes, setNotes] = useState([
		{
			id: nanoid(),
			text: 'This is my first note!',
			date: '15/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my second note!',
			date: '21/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my third note!',
			date: '28/04/2021',
		},
		{
			id: nanoid(),
			text: 'This is my new note!',
			date: '30/04/2021',
		},
	]);

	const [searchText, setSearchText] = useState('');

	useEffect(() => {
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

	const addNote = (text) => {
		const date = new Date();
		const newNote = {
			id: nanoid(),
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

	const [ theme, toggleTheme ] = useDarkMode();
  	const themeMode = theme === 'light' ? lightTheme : darkTheme;


	return (
			<div className='container'>
				<Header />
				<Search handleSearchNote={setSearchText} />
				<NotesList
					notes={notes.filter((note) =>
						note.text.toLowerCase().includes(searchText)
					)}
					handleAddNote={addNote}
					handleDeleteNote={deleteNote}
				/>
				<ThemeProvider theme={themeMode}>
      				<Container>
        			<GlobalStyles />
        			<Toggle theme={theme} toggleTheme={toggleTheme} />
      				</Container>
    				</ThemeProvider>
			</div>
	);
	
};

export default App;