import db from '../../models'

export default async function emitDashboard(params, io) {
    const query = {
        space: "/dashboard",
        $or: [
            { userId: params.blog.user },
            { blogId: params.blog._id.toString() }
        ]
    };
    const sockets = await db.Socket.find(query).lean();
    sockets.forEach((socket) => {
        const socketId = socket && socket.socketId;
        const mustEmitSetup = socketId && io;
        if (mustEmitSetup) {
            io.of("/dashboard")
                .to(socketId)
                .emit("update", true);
        }
    });
    return true;
}