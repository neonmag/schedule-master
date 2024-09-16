import React, { useState } from 'react';
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
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
    };
    const handleCloseModal = () => setIsModalOpen(false);

    return (
        <>
            <div className={style.infoContainer} onClick={handleOpenModal}>
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

            {isModalOpen && (
                <div className={style.modalOverlay} onClick={handleCloseModal}>
                    <div
                        className={style.modalContent}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className={style.closeButton}
                            onClick={handleCloseModal}
                        >
                            ×
                        </button>
                        <h1 className={style.modalHeader}>
                            Початок: {startTime}
                        </h1>
                        <h2 className={style.modalHeader}>Кінець: {endTime}</h2>
                        <h3 className={style.modalHeader}>Тип: {type}</h3>
                        <h3 className={style.modalHeader}>
                            Парна\непарна: {even ? even : 'Постійно'}
                        </h3>
                        <h3 className={style.modalHeader}>
                            Тривалість: {duration}
                        </h3>
                        <h3 className={style.modalHeader}>
                            Викладач: {teacher}
                        </h3>
                        <h3 className={style.modalHeader}>
                            Предмет: {subject}
                        </h3>
                    </div>
                </div>
            )}
        </>
    );
};

export default ScheduleElement;
