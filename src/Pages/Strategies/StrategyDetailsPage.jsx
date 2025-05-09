import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import LastRemainingCellInABox from './allStrategies/LastRemainingCellInABox';
import LastRemainingCellInARow from './allStrategies/LastRemainingCellInARow';
import Pinned from './allStrategies/Pinned';
import TheLastPossibleNumber from './allStrategies/TheLastPossibleNumber';
import NakedPairs from './allStrategies/NakedPairs';
import NakedTriples from './allStrategies/NakedTriples';
import Introduction from './allStrategies/Introduction';
import GettingStarted from './allStrategies/GettingStarted';

import "./StrategyDetailsPage.css";

const strategySections = {
    'getting_started': [
        'introduction',
        'last_remaining_cell_in_a_box',
        'last_remaining_cell_in_a_row',
        'pinned',
        'the_last_possible_number'
    ],
    'basic_strategies': [
        'naked_pairs',
        'naked_triples',
        'naked_quads',
        'hidden_triples',
        'hidden_quads',
        'pointing_pairs',
        'box_line_intersection'
    ],
    'bent_sets': [
        'chute_remote_pairs',
        'y_wing',
        'xyz_wing',
        'wxyz_wing',
        'almost_locked_pairs_triples',
        'fireworks'
    ]
};

const allStrategyIds = [
    'last_remaining_cell_in_a_box',
    'last_remaining_cell_in_a_row',
    'pinned',
    'the_last_possible_number',
    'introduction',
    'getting_started',
    'naked_pairs',
    'naked_triples',
    'naked_quads',
    'hidden_triples',
    'hidden_quads',
    'pointing_pairs',
    'box_line_intersection',
    'chute_remote_pairs',
    'y_wing',
    'xyz_wing',
    'wxyz_wing',
    'almost_locked_pairs_triples',
    'fireworks',
];

const strategyComponents = {
    'last_remaining_cell_in_a_box': LastRemainingCellInABox,
    'last_remaining_cell_in_a_row': LastRemainingCellInARow,
    'pinned': Pinned,
    'the_last_possible_number': TheLastPossibleNumber,
    'introduction': Introduction,
    'getting_started': GettingStarted,
    'naked_pairs': NakedPairs,
    'naked_triples': NakedTriples,
};

const StrategyDetailsPage = () => {
    const { strategyId } = useParams();
    const [isStrategyLearned, setIsStrategyLearned] = useState(false);

    useEffect(() => {
        setIsStrategyLearned(false);
    }, [strategyId]);

    if (!strategyId || !allStrategyIds.includes(strategyId)) {
        return <div>Стратегии "{strategyId}" нет</div>;
    }

    const getCurrentSection = (id) => {
        for (const [section, strategies] of Object.entries(strategySections)) {
            if (strategies.includes(id)) {
                return section;
            }
        }
        return null;
    };

    const currentSection = getCurrentSection(strategyId);
    const currentIndex = strategySections[currentSection]?.indexOf(strategyId) ?? -1;
    const isLastInSection = currentIndex === (strategySections[currentSection]?.length ?? 0) - 1;
    const nextStrategyId = !isLastInSection ? strategySections[currentSection]?.[currentIndex + 1] : null;

    const StrategyComponent = strategyComponents[strategyId];

    if (!StrategyComponent) {
        return <div>Стратегия "{strategyId}" не найдена</div>;
    }

    return (
        <div className="strategy-content">
            <div className="navigation-buttons">
                <Link to={"/strategies"} className="back-button">
                    <FaArrowLeft />
                    <span>Назад к списку стратегий</span>
                </Link>
                {isStrategyLearned && nextStrategyId && (
                    <Link to={`/strategies/${nextStrategyId}`} className="next-button">
                        <span>Следующая стратегия</span>
                        <FaArrowRight />
                    </Link>
                )}
            </div>
            <StrategyComponent onStrategyLearned={() => setIsStrategyLearned(true)} />
        </div>
    );
};

export default StrategyDetailsPage;
