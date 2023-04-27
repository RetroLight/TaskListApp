import React, {useEffect, useState} from "react";
import './taskPage.styles.scss';

import {connect} from "react-redux";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";

import TaskItem from "../../components/task_item/TaskItem.component";
import CustomButton from "../../components/button/CustomButton.component";
import Popup from "../../components/popup/Popup.component";
import CustomInput from "../../components/input/CustomInput.component";

import {changeTasksOrder, createTaskStart, startTaskTimer} from "../../redux/tasks/tasks.actions";
import {setLocalStorageData} from "../../utils/localStorage";

const TaskPage = ({projects, createTask, location, tasksOrderChanger, runTaskTimer}) => {

    const [isModalActive, setIsModalActive] = useState(false);
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDescription, setTaskDescription] = useState('');
    const [radioBtnValue, setRadioBtnValue] = useState(undefined);
    const [tasksArr, setTasksArr] = useState(projects.find(project => project.id === location.state.projectId).tasksArr);

    const radioBtnHandler = (radioValue) => {
        setRadioBtnValue(radioValue)
    }

    const createTaskHandler = (projectId, taskTitle, taskDescription, radioBtnValue) => {
        createTask(projectId, taskTitle, taskDescription, radioBtnValue);
        setIsModalActive(false);
        setTaskTitle('');
        setTaskDescription('');
        setRadioBtnValue(undefined);
    }

    const handleOndragEnd = (result) => {
        console.log(result)
        if (!result.destination) return;
        const items = Array.from(projects.find(project => project.id === location.state.projectId).tasksArr);
        items[result.source.index].taskStatus = parseInt(result.destination.droppableId);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);
        setTasksArr(items);
        tasksOrderChanger(items, location.state.projectId);
        // runTaskTimer(items.find(task => task.taskStatus === 1));
    }

    useEffect(() => {
        setLocalStorageData('projectsArr', projects);
        setTasksArr(projects.find(project => project.id === location.state.projectId).tasksArr)
    }, [projects])


    return (
        <div className='tasks_page_container'>
            <div className="create_task_btn_cont">
                <CustomButton onBtnClick={() => setIsModalActive(true)}>Новая задача</CustomButton>
            </div>
            <div className="cols_container">
                <DragDropContext onDragEnd={handleOndragEnd}>
                    <div className='tasks_col tasks_queue_col'>
                        <div className="col_header queue">В очереди</div>
                        <Droppable droppableId='0'>
                            {(provided, snapshot) => (
                                <ul className="col_content" {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                    {tasksArr.map((item, index) => {
                                        if (item.taskStatus === 0) {
                                            return (
                                                <Draggable key={item.taskId} draggableId={item.taskId} index={index}>
                                                    {(provided) => (
                                                        <li {...provided.dragHandleProps} {...provided.draggableProps}
                                                            ref={provided.innerRef}>
                                                            <TaskItem key={item.taskId} item={item}/>
                                                            {provided.placeholder}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                    })}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                    <div className='tasks_col tasks_in_progress_col'>
                        <div className="col_header in_progress">В работе</div>
                        <Droppable droppableId='1'>
                            {(provided, snapshot) => (
                                <ul className="col_content" {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                    {tasksArr.map((item, index) => {
                                        if (item.taskStatus === 1) {
                                            return (
                                                <Draggable key={item.taskId} draggableId={item.taskId}
                                                           index={index}>
                                                    {(provided) => (
                                                        <li {...provided.dragHandleProps} {...provided.draggableProps}
                                                            ref={provided.innerRef}>
                                                            <TaskItem key={item.taskId} item={item}/>
                                                            {provided.placeholder}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                    })}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                    <div className='tasks_col tasks_done_col'>
                        <div className="col_header finished">Выполнено</div>
                        <Droppable droppableId='2'>
                            {(provided, snapshot) => (
                                <ul className="col_content" {...provided.droppableProps} ref={provided.innerRef} isDraggingOver={snapshot.isDraggingOver}>
                                    {tasksArr.map((item, index) => {
                                        if (item.taskStatus === 2) {
                                            return (
                                                <Draggable key={item.taskId} draggableId={item.taskId}
                                                           index={index}>
                                                    {(provided) => (
                                                        <li {...provided.dragHandleProps} {...provided.draggableProps}
                                                            ref={provided.innerRef}>
                                                            <TaskItem key={item.taskId} item={item}/>
                                                            {provided.placeholder}
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        }
                                    })}
                                </ul>
                            )}
                        </Droppable>
                    </div>
                </DragDropContext>
            </div>

            <Popup popup_title='Новая задача' isActive={isModalActive} setIsActive={setIsModalActive}>
                <div className="popup_input_container">
                    <CustomInput type='text' onInput={setTaskTitle} inputValue={taskTitle}
                                 placeholder='Заголовок задачи'/>
                </div>
                <div className="popup_input_container">
                    <CustomInput type='textarea' onInput={setTaskDescription} inputValue={taskDescription}
                                 placeholder='Описание задачи'/>
                </div>
                <div className="new_task_radio_container">
                    <span>Приоритет задачи</span>
                    <div>
                        <CustomInput isRadioChecked={radioBtnValue == 0}
                                     name='option'
                                     handleChangeRadio={radioBtnHandler}
                                     type='radio'
                                     label='Низкий'
                                     radioValue={0}/>
                        <CustomInput isRadioChecked={radioBtnValue == 1}
                                     name='option'
                                     handleChangeRadio={radioBtnHandler}
                                     type='radio'
                                     label='Средний'
                                     radioValue={1}/>
                        <CustomInput isRadioChecked={radioBtnValue == 2}
                                     name='option'
                                     handleChangeRadio={radioBtnHandler}
                                     type='radio'
                                     label='Высокий'
                                     radioValue={2}/>
                    </div>
                </div>

                <div className="create_task_btn_cont">
                    <CustomButton
                        onBtnClick={() => createTaskHandler(location.state.projectId, taskTitle, taskDescription, radioBtnValue)}>Создать</CustomButton>
                </div>
            </Popup>
        </div>
    )
};

const mapStateToProps = state => ({
    projects: state.projects.projectsArr
});

const mapDispatchToProps = dispatch => ({
    createTask: (projectId, taskTitle, taskDescription, priorityLevel) => dispatch(createTaskStart(projectId, taskTitle, taskDescription, priorityLevel)),
    tasksOrderChanger: (tasksArr, projectId) => dispatch(changeTasksOrder(tasksArr, projectId)),
    runTaskTimer: item => dispatch(startTaskTimer(item))
})

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);
