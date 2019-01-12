export const config = {
    devName: "Karo",
    tasks: {
        perPage: 3,
    },
    filter: {
        sort: ['id', 'username', 'email', 'status'],
        direction: ['asc', 'desc'],
        default: {
            sort: 'id',
            direction: 'asc',
            page: 1
        }
    },
    auth: {
        username: 'admin',
        password: '123'
    }
};