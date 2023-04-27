import React, {useEffect} from 'react';
import './taskItem.styles.scss';

import {connect} from "react-redux";

import Timer from "../timer/Timer.components";

import {ReactComponent as TrashIco} from "../../assets/trash_ico_default.svg";

import {deleteTaskAC} from "../../redux/tasks/tasks.actions";

const TaskItem = ({item, deleteTask}) => {
    const {projectId, taskId, taskTitle, taskDescription, createTime, taskPriority, taskStatus, taskWorkTime} = item;

    const priorityIdentify = (taskPriority) => {
        if (taskPriority == 0) {
            return 'Low'
        } else if (taskPriority == 1) {
            return 'Standard'
        }
        return 'High'
    }

    const priorityClass = (taskPriority) => {
        if (taskPriority == 0) {
            return 'task_priority low'
        } else if (taskPriority == 1) {
            return 'task_priority standard'
        }
        return 'task_priority high'
    }

    const taskStatusColor = (taskStatus) => {
        if (taskStatus === 0) {
            return 'task_item_container queue'
        } else if (taskStatus === 1) {
            return 'task_item_container in_progress'
        }
        return 'task_item_container done'
    }

    return (
        <div className={taskStatusColor(taskStatus)}>
            <div className='task_title'>{taskTitle}</div>
            <div className='priority_time_cont'>
                <span className={priorityClass(taskPriority)}>{priorityIdentify(taskPriority)}</span>
                <Timer taskStatus={taskStatus} taskTimer={taskWorkTime}/>
            </div>
            <div className='task_description'>{taskDescription}</div>
            <div className='subtasks_container'>
                <div className='subtask_item'></div>
            </div>
            <div className='task_item_timer_container'>

            </div>
            <div className='task_footer_cont'>
                <span className='task_create_time'>{`${createTime.date} ${createTime.time}`}</span>
                <div className='delete_btn_cont'>
                    <TrashIco className='trash_icon' onClick={() => deleteTask(projectId, taskId)}/>
                </div>
            </div>
        </div>
    )
};

const mapDispatchToProps = dispatch => ({
    deleteTask: (projectId, taskId) => dispatch(deleteTaskAC(projectId, taskId)),
})

export default connect(null, mapDispatchToProps)(TaskItem);
