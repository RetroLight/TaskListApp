export class TaskItem {
    constructor(projectId, taskTitle, taskDescription, taskPriority) {
        this.projectId = projectId;
        this.taskId = this.createTaskId();
        this.taskTitle = taskTitle;
        this.taskDescription = taskDescription;
        this.taskPriority = taskPriority;
        this.createTime = this.createTimeHandler();
        this.taskStatus = 0;
        this.taskWorkTime = {hours: 0, minutes: 0};
    }

    createTimeHandler() {
        return {
            date: new Date().toLocaleString("ru", {month: 'short', day: 'numeric'}),
            time: new Date().toLocaleString("ru", {hour: 'numeric',minute: 'numeric'}),
        }
    }

    createTaskId() {
        return (this.projectId + Math.floor(Math.random() * 10000)).toString();
    }
};
