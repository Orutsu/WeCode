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

export const getCodeBlock = async (codeBlockId) => {
    const codeBlockInfo = await axios.get(host + `/api/CodeBlocks/${codeBlockId}`);
    return codeBlockInfo.data;
}

export const getUserCompletedTasks = async (userId) => {
    const tasksResults = await axios.get(host + `/api/TaskResults`);
    console.log('tasksResults', tasksResults.data)
    return tasksResults.data.filter((tasksResult) => tasksResult.submittedBy === userId);
}

export const getUserCreatedTasks = async (userId) => {
    const tasks = await getAllTasks();
    console.log(userId, tasks)
    return tasks.filter((task) => task.createdBy === userId);
}

export const getTaskWithCodeBlocks = async (taskId) => {
    const task = await getTask(taskId);
    const expectedResultsOfTask = await getExpectedResultsOfTask(taskId);
    return {task : task, expectedResults : expectedResultsOfTask};
}

export const getAllCodeBlocks = async () => {
    const codeBlocksinfo = await axios.get(host + `/api/CodeBlocks`);
    return codeBlocksinfo.data;
}

export const getExpectedResultsOfTask = async (taskId) => {
    const allExpectedResults = (await axios.get(host + `/api/ExpectedResults`)).data;
    const expectedResults = allExpectedResults.filter((expectedResult) => expectedResult.taskId === taskId);
    return expectedResults;
}

/// eg await updateTask(22, 24, 'titile', 'dedsc', 3);
export const updateTask = async (taskId, userId, title, description, complexity) => {
    await axios.put(host + `/api/Tasks/${taskId}`, {
        taskId : taskId,
        description : description,
        title : title,
        difficulty : complexity,
        createdBy : userId
        });
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

    const taskId = task.taskId;
    await codeBlocks.forEach(async (codeBlock, i) => {
        const createdBlock = (await axios.post(host + "/api/CodeBlocks", {
            code : codeBlock
            })).data;

        const expectedResult = (await axios.post(host + "/api/ExpectedResults", {
            taskId : taskId,
            codeBlockId : createdBlock.codeBlockId,
            order : i + 1
            })).data;
    });
}

//code blocks - array of code block ids in order user puts them in
export const submitTask = async (userId, taskId, codeBlocks) => {
    const score = await getScore(taskId, codeBlocks);
    console.log('score', score);
    const taskResult = (await axios.post(host + "/api/TaskResults", {
        taskId : taskId,
        submittedBy : userId,
        score : score,
        })).data;
    console.log('taskResult', taskResult);
    await codeBlocks.forEach(async (codeBlock, i) => {
        const actualResult = (await axios.post(host + "/api/ActualResults", {
            taskResultId : taskResult.taskResultId,
            codeBlockId : codeBlock.id,
            order : i + 1
            })).data;
    });

    return score;
}

const getScore = async (taskId, codeBlocks) => {
    const expectedResults = await getExpectedResultsOfTask(taskId);
    console.log('expectedResults', expectedResults);
    expectedResults.sort(compare);
    console.log('expectedResultssorted', expectedResults);
    let correctBlocks = 0;
    expectedResults.forEach((expectedResult, i) => {
        if(expectedResult.codeBlockId === codeBlocks[i]?.id){
            ++correctBlocks;
        }
    });

    return parseInt(correctBlocks * 100.0 / expectedResults.length) ;
}

const compare = (a,b) => {
    if (a.order < b.order)
       return -1;
    if (a.order > b.order)
      return 1;
    return 0;
  }