import { useState, useEffect } from 'react';
import ScheduleElement from './ScheduleElement/ScheduleElement';
import './Schedule.css';

interface ScheduleElementProps {
    startTime: string;
    endTime: string;
    type: string;
    even: string | null;
    duration: string;
    teacher: string;
    subject: string;
}

interface GroupName {
    [key: string]: ScheduleElementProps[];
}

interface ScheduleDay {
    [key: string]: GroupName;
}

const Schedule = () => {
    const [scheduleData, setScheduleData] = useState<ScheduleDay | null>(null);
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSchedules, setGroupSchedules] = useState<{
        [key: string]: { [key: string]: ScheduleElementProps[] };
    }>({});
    const [selectedDay, setSelectedDay] = useState<string | null>(null);

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch('/schedule.json');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setScheduleData(data);

                if (Object.keys(data).length > 0) {
                    setSelectedDay(Object.keys(data)[0]);
                }

                updateGroupsAndSchedules(data);
            } catch (error) {
                console.error('Ошибка при загрузке JSON:', error);
            }
        };

        fetchScheduleData();
    }, []);

    useEffect(() => {
        if (scheduleData && selectedDay) {
            updateGroupsAndSchedules(scheduleData);
        }
    }, [selectedDay, scheduleData]);

    const updateGroupsAndSchedules = (data: ScheduleDay) => {
        const allGroups = new Set<string>();
        const allGroupSchedules: {
            [key: string]: { [key: string]: ScheduleElementProps[] };
        } = {};

        for (const day in data) {
            if (day === selectedDay) {
                const dayGroups = data[day];
                for (const group in dayGroups) {
                    if (!allGroupSchedules[group]) {
                        allGroupSchedules[group] = {};
                    }
                    dayGroups[group].forEach((pair: any) => {
                        if (!allGroupSchedules[group][pair.startTime]) {
                            allGroupSchedules[group][pair.startTime] = [];
                        }
                        allGroupSchedules[group][pair.startTime].push(pair);
                    });
                    allGroups.add(group);
                }
            }
        }

        setGroups(Array.from(allGroups));
        setGroupSchedules(allGroupSchedules);
    };

    const days = scheduleData ? Object.keys(scheduleData) : [];
    const times = ['8:00', '9:50', '11:40', '13:30'];

    if (!selectedDay) {
        return <div>Нет данных для отображения</div>;
    }

    return (
        <div className="mainContainer">
            <div className="daysContainer">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className="dayButton"
                    >
                        {day}
                    </button>
                ))}
            </div>
            <table className="tableContainer" cellPadding={10}>
                <thead>
                    <tr>
                        <th>Час</th>
                        {groups.map((group, index) => (
                            <th key={index}>{group}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time) => (
                        <tr className="tableRowContainer" key={time}>
                            <td className="tableRowContainer">{time}</td>
                            {groups.map((group) => (
                                <td key={group}>
                                    {groupSchedules[group] &&
                                    groupSchedules[group][time]
                                        ? groupSchedules[group][time].map(
                                              (pair, index) => (
                                                  <ScheduleElement
                                                      key={index}
                                                      startTime={pair.startTime}
                                                      endTime={pair.endTime}
                                                      type={pair.type}
                                                      even={pair.even}
                                                      duration={pair.duration}
                                                      teacher={pair.teacher}
                                                      subject={pair.subject}
                                                  />
                                              )
                                          )
                                        : '—'}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Schedule;
