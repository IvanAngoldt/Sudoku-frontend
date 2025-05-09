import React from 'react';
import RoundButton from './RoundButton';

const Undo = ({ undoClick }) => (
  <RoundButton onClick={undoClick} icon="↩" label="Undo" />
);

export default Undo;
