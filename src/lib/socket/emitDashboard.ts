import { socketio } from '../../sources/socketio'
import getSocketList from '../../services/socket/getSocketList'

export default async function emitDashboard(blogId: string) {
    const sockets: string[] = await getSocketList('dashboard', blogId)
    console.log('>> getSocketList dashboard', blogId)
    console.log('>> list', sockets)
    sockets.forEach((socketId) => {
        socketio.of("/dashboard").to(socketId).emit("update", true)
    })
    return true
}