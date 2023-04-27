export class ProjectItem {
    constructor(projectTitle, projectImg) {
        this.id = this.randomProjectId();
        this.projectTitle = projectTitle;
        this.projectImg = projectImg;
        this.totalTasksNumber = 0;
        this.tasksArr = [];
    }

    randomProjectId= () => Math.floor(Math.random() * 10000)
};
