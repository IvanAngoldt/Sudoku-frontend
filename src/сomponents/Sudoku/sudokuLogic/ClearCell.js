import React from 'react';
import RoundButton from './RoundButton';

const ClearCell = ({ clearCell }) => (
  <RoundButton onClick={clearCell} icon="🧽" label="Clear" />
);

export default ClearCell;