import { MdDeleteForever, MdShare } from 'react-icons/md';
import DOMPurify from 'dompurify';
import { Button } from 'semantic-ui-react';
import { useState, useRef, useEffect } from 'react';
import { FaWhatsapp, FaFacebook, FaInstagram, FaShareAlt, FaCopy } from 'react-icons/fa';

const Note = ({ id, title, text, date, handleDeleteNote, handleReadNote }) => {
	const [showShare, setShowShare] = useState(false);
	const [access, setAccess] = useState('view');
	const shareRef = useRef(null);

	const createMarkup = (html) => {
		return {
			__html: DOMPurify.sanitize(html)
		}
	}

	const shareUrl = `${window.location.origin}/note/${id}?access=${access}`;

	const handleCopyLink = () => {
		navigator.clipboard.writeText(shareUrl);
		alert(`Link copied with ${access.toUpperCase()} access!`);
	};

	const handleSocialShare = (platform) => {
		const shareText = `Check out this note: ${title || 'Untitled'} \n${shareUrl}`;
		let url = '';

		switch (platform) {
			case 'whatsapp':
				url = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
				break;
			case 'facebook':
				url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
				break;
			case 'instagram':
				alert('Instagram does not support direct web sharing. Link copied to clipboard!');
				handleCopyLink();
				return;
			case 'others':
				if (navigator.share) {
					navigator.share({
						title: title || 'Untitled Note',
						text: shareText,
						url: shareUrl,
					}).catch((error) => console.log('Error sharing', error));
				} else {
					alert('Web Share API not supported in this browser. Link copied.');
					handleCopyLink();
				}
				return;
			default:
				break;
		}
		if (url) window.open(url, '_blank');
	};

	useEffect(() => {
		const handleClickOutside = (event) => {
			if (shareRef.current && !shareRef.current.contains(event.target)) {
				setShowShare(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		<div className='note' onClick={() => handleReadNote({ id, title, text, date })} style={{ cursor: 'pointer' }} data-aos='fade-up'>
			{title && <h3 style={{ marginBottom: '10px', borderBottom: '1px solid rgba(0,0,0,0.1)', paddingBottom: '5px' }}>{title}</h3>}
			<div dangerouslySetInnerHTML={createMarkup(text)} style={{ flex: 1, overflow: 'hidden' }} />
			<div className='note-footer'>
				<small>{date}</small>
				<div style={{ display: 'flex', gap: '10px', alignItems: 'center', position: 'relative' }} ref={shareRef}>
					{showShare && (
						<div
							onClick={(e) => e.stopPropagation()}
							style={{
								position: 'absolute',
								bottom: '100%',
								right: '-10px',
								marginBottom: '10px',
								backgroundColor: 'white',
								padding: '10px',
								borderRadius: '8px',
								boxShadow: '0 2px 10px rgba(0,0,0,0.2)',
								display: 'flex',
								flexDirection: 'column',
								gap: '10px',
								zIndex: 100,
								width: 'max-content'
							}}
						>
							<select
								value={access}
								onChange={(e) => setAccess(e.target.value)}
								style={{ padding: '5px', borderRadius: '4px', border: '1px solid #ddd', fontSize: '0.9em' }}
							>
								<option value="view">View Access</option>
								<option value="edit">Edit Access</option>
							</select>
							<div style={{ display: 'flex', gap: '5px' }}>
								<Button circular color='green' size='mini' onClick={() => handleSocialShare('whatsapp')}><FaWhatsapp size={15} /></Button>
								<Button circular color='facebook' size='mini' onClick={() => handleSocialShare('facebook')}><FaFacebook size={15} /></Button>
								<Button circular color='instagram' size='mini' onClick={() => handleSocialShare('instagram')}><FaInstagram size={15} /></Button>
								<Button circular size='mini' onClick={() => handleSocialShare('others')}><FaShareAlt size={15} /></Button>
								<Button circular size='mini' onClick={() => handleCopyLink()}><FaCopy size={15} /></Button>
							</div>
						</div>
					)}
					<MdShare
						onClick={(e) => {
							e.stopPropagation();
							setShowShare(!showShare);
						}}
						className='delete-icon'
						size='1.3em'
					/>
					<MdDeleteForever
						onClick={(e) => {
							e.stopPropagation();
							handleDeleteNote(id);
						}}
						className='delete-icon'
						size='1.3em'
					/>
				</div>
			</div>
		</div>
	);
};

export default Note;
