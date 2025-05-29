# app/services/socket_service.py
import socketio
from app.config import settings


class SocketService:
    _instance = None

    def __new__(cls):
        if cls._instance is None:
            cls._instance = super().__new__(cls)
            cls._instance.initialize()
        return cls._instance

    def initialize(self):
        self.sio = socketio.AsyncServer(
            async_mode='asgi',
            cors_allowed_origins=settings.WEBSOCKET_CORS_ORIGINS_LIST,
            logger=settings.IS_DEVELOPMENT,
            engineio_logger=settings.IS_DEVELOPMENT,
            async_handlers=True
        )
        self.app = socketio.ASGIApp(
            socketio_server=self.sio,
            socketio_path=settings.WEBSOCKET_PATH
        )
        self._register_core_handlers()

    def _register_core_handlers(self):
        @self.sio.on('connect')
        async def connect(sid, environ):
            print(f"Client connected: {sid}")

        @self.sio.on('disconnect')
        async def disconnect(sid):
            print(f"Client disconnected: {sid}")

    async def emit_to_all(self, event: str, data: dict):
        """Emit event to all connected clients"""
        await self.sio.emit(event, data)

    async def emit_to_room(self, event: str, data: dict, room: str):
        """Emit event to specific room"""
        await self.sio.emit(event, data, room=room)

    async def emit_to_client(self, event: str, data: dict, sid: str):
        """Emit event to specific client"""
        await self.sio.emit(event, data, room=sid)


# Singleton instance
socket_service = SocketService()
