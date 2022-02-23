import { IComment} from "./comment";

export const Comments: IComment[] = [
    {
        commentid: 1,
        taskid: 1,
        dateadded: '2022-02-02',
        commenttext: 'Comment 1 to task 1',
        commenttype: 'Initial',
        reminderdate: '2022-02-02'
    },
    {
        commentid: 2,
        taskid: 1,
        dateadded: '2022-02-02',
        commenttext: 'Comment 2 to task 1',
        commenttype: 'Initial',
        reminderdate: '2022-02-02'
    },
    {
        commentid: 3,
        taskid: 2,
        dateadded: '2022-02-02',
        commenttext: 'Comment 1 to task 2',
        commenttype: 'Initial',
        reminderdate: '2022-02-02'
    },
    {
        commentid: 4,
        taskid: 3,
        dateadded: '2022-02-02',
        commenttext: 'Comment 1 to task 3',
        commenttype: 'Initial',
        reminderdate: '2022-02-02'
    }


]