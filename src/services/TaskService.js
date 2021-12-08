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
    const task = (await axios.post(host + "/api/Tasks", {
        description : description,
        title : title,
        difficulty : complexity,
        createdBy : userId
        })).data;
    console.log('task', task);
    orders = orders.replace(/\s/g, '');
    console.log('orders', orders);
    const expectedResultsOrders = orders.split(',').map(function(item) {
        return parseInt(item, 10);
    });

    const taskId = task.taskId;
    await codeBlocks.forEach(async (codeBlock, i) => {
        const createdBlock = (await axios.post(host + "/api/CodeBlocks", {
            code : codeBlock
            })).data;

        const expectedResultsOrder =  expectedResultsOrders[i]
        const expectedResult = (await axios.post(host + "/api/ExpectedResults", {
            taskId : taskId,
            codeBlockId : createdBlock.codeBlockId,
            order : expectedResultsOrder
            })).data;

    });
}

//code blocks - array of code block ids in order user puts them in
export const submitTask = async (userId, taskId, codeBlocks) => {

}