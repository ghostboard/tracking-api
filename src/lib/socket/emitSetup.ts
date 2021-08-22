import { socketio } from '../../sources/socketio'
import getSocketList from '../../services/socket/getSocketList'

export default async function emitSetup(blogId: string) {
    const sockets: string[] = await getSocketList('setup', blogId)
    console.log('>> getSocketList setup', blogId)
    console.log('>> list', sockets)
    sockets.forEach((socketId) => {
        socketio.of("/setup").to(socketId).emit("setup:done", true)
    })
    return true
}