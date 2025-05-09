import { Link } from 'react-router-dom';
import { FaGraduationCap, FaPuzzlePiece, FaBrain } from 'react-icons/fa';
import "./StrategiesPage.css";

const getting_started = [
  { link: '/strategies/introduction', name: 'Introduction' },
  { link: '/strategies/last_remaining_cell_in_a_box', name: 'Last Remaining Cell in a Box' },
  { link: '/strategies/last_remaining_cell_in_a_row', name: 'Last Remaining Cell in a Row (or Column)' },
  { link: '/strategies/pinned', name: 'Pinned!' },
  { link: '/strategies/the_last_possible_number', name: 'The Last Possible Number' },
];

const basic_strategies = [
  { link: '/strategies/naked_pairs', name: 'Naked Pairs' },
  { link: '/strategies/naked_triples', name: 'Naked Triples' },
  { link: '/strategies/naked_quads', name: 'Naked Quads' },
  { link: '/strategies/hidden_triples', name: 'Hidden Triples' },
  { link: '/strategies/hidden_quads', name: 'Hidden Quads' },
  { link: '/strategies/pointing_pairs', name: 'Pointing Pairs' },
  { link: '/strategies/box_line_intersection', name: 'Box/Line Intersection' }
];

const bent_sets = [
  { link: '/strategies/chute_remote_pairs', name: 'Chute Remote Pairs' },
  { link: '/strategies/y_wing', name: 'Y-Wing' },
  { link: '/strategies/xyz_wing', name: 'XYZ-Wing' },
  { link: '/strategies/wxyz_wing', name: 'WXYZ-Wing' },
  { link: '/strategies/almost_locked_pairs_triples', name: 'Almost Locked Pairs/Triples' },
  { link: '/strategies/fireworks', name: 'Fireworks' }
];

const StrategyCard = ({ title, data, icon: Icon }) => (
  <div className="strategy-card">
    <div className="strategy-card-header">
      <Icon className="strategy-icon" />
      <h3>{title}</h3>
    </div>
    <ul>
      {data.map((strategy) => (
        <li key={strategy.link}>
          <Link to={strategy.link}>{strategy.name}</Link>
        </li>
      ))}
    </ul>
  </div>
);

const StrategiesPage = () => {
  const categories = [
    { title: 'Getting Started', data: getting_started, icon: FaGraduationCap },
    { title: 'Basic Strategies', data: basic_strategies, icon: FaPuzzlePiece },
    { title: "'Bent' Sets (Coming Soon)", data: bent_sets, icon: FaBrain }
  ];

  return (
    <div className="strategies-main-container">
      <div className="strategies-main-content">
        <h2 className="strategies-title">Sudoku Strategies</h2>
        <div className="strategies-grid">
          {categories.map((category) => (
            <StrategyCard key={category.title} {...category} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StrategiesPage;
