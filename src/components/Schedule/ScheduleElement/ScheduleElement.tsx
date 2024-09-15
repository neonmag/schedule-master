import React from 'react';

import style from './ScheduleElement.module.css';

const ScheduleElement: React.FC<{
    startTime: string | null;
    endTime: string | null;
    type: string | null;
    even: string | null;
    duration: string | null;
    teacher: string | null;
    subject: string | null;
}> = ({ startTime, endTime, type, even, duration, teacher, subject }) => {
    return (
        <div className={style.infoContainer}>
            <h1 className={style.headerText}>Початок: {startTime}</h1>
            <h2 className={style.headerText}>Кінець: {endTime}</h2>
            <h3 className={style.headerText}>Тип: {type}</h3>
            <h3 className={style.headerText}>
                Парна\непарна: {even ? even : 'Постійно'}
            </h3>
            <h3 className={style.headerText}>Тривалість: {duration}</h3>
            <h3 className={style.headerText}>Викладач: {teacher}</h3>
            <h3 className={style.headerText}>Предмет: {subject}</h3>
        </div>
    );
};

export default ScheduleElement;
