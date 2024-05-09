import { socketio } from '../../sources/socketio';
import getSocketList from '../../services/socket/getSocketList';

export default async function emitDashboard(blogId: string) {
  if (!blogId) {
    return false;
  }
  const sockets: string[] = await getSocketList('dashboard', blogId);
  sockets.forEach((socketId) => {
    socketio.of('/dashboard').to(socketId).emit('update', true);
  });
  return true;
}
