import React, { useState } from 'react';

const According = ({week, index}) => {
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    };
    return (
        <div className="card my-2 shadow-lg" key={index}>
        <div className="card-header" id={`week${week.Week}Heading`}>
            <h5 className="mb-0">
                <button onClick={handleCollapse} className="btn btn-link text-decoration-none" data-toggle="collapse" data-target={`#week${week.Week}Content`} aria-expanded={index === 0} aria-controls={`week${week.Week}Content`}>
                    Week {week.Week}
                </button>
            </h5>
        </div>
        <div id={`week${week.Week}Content`} className={`collapse${isCollapsed ? ' show' : ''}`} aria-labelledby={`week${week.Week}Heading`} data-parent="#syllabusAccordion">
            <div className="card-body">
                <ul>
                    {week.Topics.map((topic, topicIndex) => (
                        <li key={topicIndex}>{topic}</li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
    );
};

export default According;