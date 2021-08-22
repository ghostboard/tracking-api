import { socketio } from '../../sources/socketio'
import getSocketList from '../../services/socket/getSocketList'

export default async function emitSetup(blogId: string) {
    if (!blogId) {
        return false
    }
    const sockets: string[] = await getSocketList('setup', blogId)
    sockets.forEach((socketId) => {
        socketio.of("/setup").to(socketId).emit("setup:done", true)
    })
    return true
}