import React, { useState } from 'react';
import { MdSearch } from 'react-icons/md';
import Typewriter from 'typewriter-effect';

const Search = ({ handleSearchNote }) => {
	const [isTyping, setIsTyping] = useState(false);

	return (
		<div className='search' style={{ position: 'relative' }}>
			<MdSearch className='search-icons' size='1.3em' />
			{!isTyping && (
				<div style={{ position: 'absolute', left: '35px', color: '#888', pointerEvents: 'none' }}>
					<Typewriter
						options={{
							strings: ['Type to search...', 'Find your notes...'],
							autoStart: true,
							loop: true,
						}}
					/>
				</div>
			)}
			<input
				onChange={(event) => {
					handleSearchNote(event.target.value);
					setIsTyping(event.target.value.length > 0);
				}}
				type='text'
				style={{ background: 'transparent', position: 'relative', zIndex: 1 }}
			/>
		</div>
	);
};

export default Search;
