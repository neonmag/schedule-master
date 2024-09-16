import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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

interface ScheduleProps {
    scheduleFile: string;
}

const Schedule = ({ scheduleFile }: ScheduleProps) => {
    const [scheduleData, setScheduleData] = useState<ScheduleDay | null>(null);
    const [groups, setGroups] = useState<string[]>([]);
    const [groupSchedules, setGroupSchedules] = useState<{
        [key: string]: { [key: string]: ScheduleElementProps[] };
    }>({});
    const [selectedDay, setSelectedDay] = useState<string | null>(null);
    const [selectedGroupType, setSelectedGroupType] = useState<string | null>(
        null
    );

    const location = useLocation();

    useEffect(() => {
        const fetchScheduleData = async () => {
            try {
                const response = await fetch(scheduleFile);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setScheduleData(data);

                if (!selectedDay && Object.keys(data).length > 0) {
                    setSelectedDay(Object.keys(data)[0]);
                }
                console.log(groups);
                updateGroupsAndSchedules(data);
            } catch (error) {
                console.error('Ошибка при загрузке JSON:', error);
            }
        };

        fetchScheduleData();
    }, [scheduleFile, location.key]);

    useEffect(() => {
        if (scheduleData) {
            updateGroupsAndSchedules(scheduleData);
        }
    }, [selectedDay, scheduleData]);

    const updateGroupsAndSchedules = (data: ScheduleDay) => {
        if (selectedDay) {
            const dayGroups = data[selectedDay];
            const allGroups = new Set<string>();
            const allGroupSchedules: {
                [key: string]: { [key: string]: ScheduleElementProps[] };
            } = {};

            for (const groupType in dayGroups) {
                for (const group in dayGroups[groupType]) {
                    if (!allGroupSchedules[group]) {
                        allGroupSchedules[group] = {};
                    }
                    const groupSchedules = dayGroups[groupType][group];
                    if (Array.isArray(groupSchedules)) {
                        groupSchedules.forEach((pair: any) => {
                            if (!allGroupSchedules[group][pair.startTime]) {
                                allGroupSchedules[group][pair.startTime] = [];
                            }
                            allGroupSchedules[group][pair.startTime].push(pair);
                        });
                        allGroups.add(group);
                    } else {
                        console.error(
                            `Expected an array for group ${group}, but got ${typeof groupSchedules}`
                        );
                    }
                }
            }

            setGroups(Array.from(allGroups));
            setGroupSchedules(allGroupSchedules);
        }
    };

    const handleDayChange = (day: string) => {
        setSelectedDay(day);
    };

    const handleGroupTypeChange = (type: string) => {
        setSelectedGroupType(type);
    };

    const days = scheduleData ? Object.keys(scheduleData) : [];
    const times = ['8:00', '9:50', '11:40', '13:30'];

    const filteredGroups = selectedGroupType
        ? Object.keys(groupSchedules).filter((group) =>
              group.startsWith(selectedGroupType)
          )
        : Object.keys(groupSchedules);

    if (!selectedDay) {
        return <div>Нет данных для отображения</div>;
    }

    return (
        <div className="mainContainer">
            <div className="daysContainer">
                {days.map((day) => (
                    <button
                        key={day}
                        onClick={() => handleDayChange(day)}
                        className={`dayButton ${
                            selectedDay === day ? 'selected' : ''
                        }`}
                    >
                        {day}
                    </button>
                ))}
            </div>
            {selectedDay && (
                <div className="groupTypeContainer">
                    <label>Оберіть тип групи:</label>
                    <select
                        onChange={(e) => handleGroupTypeChange(e.target.value)}
                        value={selectedGroupType || ''}
                    >
                        <option value="">Всі</option>
                        {Array.from(
                            new Set(
                                Object.keys(groupSchedules).map(
                                    (group) => group.split(/[0-9]/)[0]
                                )
                            )
                        ).map((type) => (
                            <option key={type} value={type}>
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
            )}
            <table className="tableContainer" cellPadding={10}>
                <thead>
                    <tr>
                        {filteredGroups.map((group, index) => (
                            <th key={index}>{group}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {times.map((time) => (
                        <tr className="tableRowContainer" key={time}>
                            {filteredGroups.map((group) => (
                                <td key={group} className="centeredCell">
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
