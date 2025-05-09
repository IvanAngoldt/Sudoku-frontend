import React from 'react';
import RoundButton from './RoundButton';

const NoteMode = ({ noteClick, noteMode }) => (
  <RoundButton onClick={noteClick} icon="✏️" label="Note" active={noteMode} />
);

export default NoteMode;
