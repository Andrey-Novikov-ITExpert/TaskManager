import { ITask} from "./task";

export const Tasks: ITask[] = [
    {
        taskId: 1,
        createdDate: '2022-02-01',
        requiredByDate: '2022-02-01',
        taskDescription: 'test',
        taskStatus: 'test status',
        taskType: 'test',
        assignedTo: 'Andrey Novikov'
    },
    {
        taskId: 2,
        createdDate: '2022-02-02',
        requiredByDate: '2022-02-02',
        taskDescription: 'test 2',
        taskStatus: 'test status 2',
        taskType: 'test 2',
        assignedTo: 'Andrey Novikov'
    },
    {
        taskId: 3,
        createdDate: '2022-02-03',
        requiredByDate: '2022-02-03',
        taskDescription: 'test 3',
        taskStatus: 'test status 3',
        taskType: 'test 3',
        assignedTo: 'Andrey Novikov'
    }

]