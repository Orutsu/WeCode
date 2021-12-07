var pjson = require('../../package.json');
var axios = require('axios').default;
var host = pjson.host;
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

export const getAllTasks = async () => {
    const tasksInfo = await axios.get(host + `/api/Tasks`);
    return tasksInfo.data;
}

export const getTask = async (taskId) => {
    const taskInfo = await axios.get(host + `/api/Tasks/${taskId}`);
    return taskInfo.data;
}

export const getUserCompletedTasks = async (userId) => {
    const tasksResults = await axios.get(host + `/api/TaskResults`);
    console.log('tasksResults', tasksResults.data)
    return tasksResults.data.filter((tasksResult) => tasksResult.submittedBy == userId);
}

export const getUserCreatedTasks = async (userId) => {
    const tasks = await getAllTasks();
    return tasks.filter((task) => task.createdBy == userId);
}

//code blocks - array of strings that contain code
//orders - string of ints separated by coma eg "1, 2, 3"
export const createTask = async (userId, title, description, complexity, codeBlocks, orders) => {

}

//code blocks - array of code block ids in order user puts them in
export const submitTask = async (userId, taskId, codeBlocks) => {

}