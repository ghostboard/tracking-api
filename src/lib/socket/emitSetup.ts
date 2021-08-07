import db from '../../db/models'

export default async function emitSetup(params, io) {
    const proceedEmit = params.isFirstVisit || !params.blog.firstVisit;
    if (!proceedEmit) {
        return false;
    }

    const query = {
        userId: params.blog.user,
        space: "/setup"
    };
    const socket = await db.Socket.findOne(query).lean();
    const socketId = socket && socket.socketId;
    const mustEmitSetup = socketId && io;
    if (mustEmitSetup) {
        io.of("/setup")
            .to(socketId)
            .emit("setup:done", true);
    }
    return true;
}