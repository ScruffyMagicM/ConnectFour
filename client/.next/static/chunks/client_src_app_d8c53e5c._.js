(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/client/src/app/hooks/useAppState.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useAppState",
    ()=>useAppState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useAppState = ()=>{
    _s();
    const [gameStatus, setGameStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('lobby');
    const [roomId, setRoomId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('');
    const [currentPlayer, setCurrentPlayer] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [justQuitGame, setJustQuitGame] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    return {
        gameStatus,
        setGameStatus,
        message,
        setMessage,
        roomId,
        setRoomId,
        currentPlayer,
        setCurrentPlayer,
        justQuitGame,
        setJustQuitGame
    };
};
_s(useAppState, "NO60TsyEjNwNe92UpcatSVgyhhE=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/config/api.config.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "API_CONFIG",
    ()=>API_CONFIG
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/client/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const API_CONFIG = {
    baseURL: __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/utils/apiClient.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiClient",
    ()=>apiClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$config$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/config/api.config.ts [app-client] (ecmascript)");
;
;
class ApiClient {
    async request(endpoint) {
        let options = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
        const controller = new AbortController();
        const timeoutId = setTimeout(()=>controller.abort(), this.timeout);
        try {
            const response = await fetch("".concat(this.baseURL).concat(endpoint), {
                ...options,
                headers: {
                    ...this.defaultHeaders,
                    ...options.headers
                },
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.message || 'API request failed');
            }
            return await response.json();
        } catch (error) {
            clearTimeout(timeoutId);
            if (error instanceof Error) {
                if (error.name === 'AbortError') {
                    throw new Error('Request timeout');
                }
                throw error;
            }
            throw new Error('Unknown error occurred');
        }
    }
    async get(endpoint, socketId, params) {
        const queryString = params ? '?' + new URLSearchParams(params).toString() : '';
        return this.request("".concat(endpoint).concat(queryString), {
            method: 'GET',
            headers: {
                'x-socket-id': socketId
            }
        });
    }
    async post(endpoint, socketId, data) {
        return this.request(endpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'x-socket-id': socketId
            }
        });
    }
    async put(endpoint, socketId, data) {
        return this.request(endpoint, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'x-socket-id': socketId
            }
        });
    }
    async delete(endpoint, socketId) {
        return this.request(endpoint, {
            method: 'DELETE',
            headers: {
                'x-socket-id': socketId
            }
        });
    }
    async patch(endpoint, socketId, data) {
        return this.request(endpoint, {
            method: 'PATCH',
            body: JSON.stringify(data),
            headers: {
                'x-socket-id': socketId
            }
        });
    }
    constructor(baseURL, timeout, headers){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "baseURL", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "timeout", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "defaultHeaders", void 0);
        this.baseURL = baseURL;
        this.timeout = timeout;
        this.defaultHeaders = headers;
    }
}
const apiClient = new ApiClient(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$config$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].baseURL, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$config$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].timeout, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$config$2f$api$2e$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["API_CONFIG"].headers);
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/services/lobbyAPIService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LobbyAPIService",
    ()=>LobbyAPIService,
    "lobbyApiService",
    ()=>lobbyApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/utils/apiClient.ts [app-client] (ecmascript)");
;
;
class LobbyAPIService {
    async getGames(socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("".concat(this.basePath), socketId);
    }
    async getGame(gameId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("".concat(this.basePath, "/getGame/").concat(gameId), '');
    }
    async createGame(gameName, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("".concat(this.basePath, "/create"), socketId, {
            gameName
        });
    }
    async quitGame(playerId, gameId, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("".concat(this.basePath, "/quit"), socketId, {
            playerId,
            gameId
        });
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "basePath", '/lobby');
    }
}
const lobbyApiService = new LobbyAPIService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/hooks/useLobbySocket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "useLobbySocket",
    ()=>useLobbySocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useLobbySocket = (socket, callbacks)=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useLobbySocket.useEffect": ()=>{
            if (!socket) return;
            socket.on('gameCreated', callbacks.onGameCreated);
            socket.on('playerJoined', callbacks.onPlayerJoined);
            socket.on('playerQuit', callbacks.onPlayerQuit);
            return ({
                "useLobbySocket.useEffect": ()=>{
                    socket.off('gameCreated', callbacks.onGameCreated);
                    socket.off('playerJoined', callbacks.onPlayerJoined);
                    socket.off('playerQuit', callbacks.onPlayerQuit);
                }
            })["useLobbySocket.useEffect"];
        }
    }["useLobbySocket.useEffect"], [
        socket,
        callbacks
    ]);
    const createGame = (name)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('gameCreated', {
            name
        });
    };
    const joinGame = (roomId, playerId)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('playerJoined', {
            roomId: roomId,
            playerId: playerId
        });
    };
    const quitGame = (roomId, playerId)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('playerQuit', {
            roomId,
            playerId
        });
    };
    return {
        createGame,
        joinGame,
        quitGame
    };
};
_s(useLobbySocket, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/hooks/useSocketConnection.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Base hook that manages the socket connection itself
__turbopack_context__.s([
    "useSocketConnection",
    ()=>useSocketConnection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/client/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
let socket;
const useSocketConnection = ()=>{
    if (!socket) {
        socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])('http://localhost:3001', {
            autoConnect: false,
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5
        });
    }
    return socket;
}; /*  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const newSocket = io('http://localhost:3001');
    setSocket(newSocket);

    newSocket.on('connect', () => {
      setIsConnected(true);
      console.log('Socket connected');
    });

    newSocket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Socket disconnected');
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  return { socket, isConnected };
};*/ 
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/components/lobby.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GamesList",
    ()=>GamesList,
    "default",
    ()=>Lobby
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$lobbyAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/services/lobbyAPIService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useLobbySocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useLobbySocket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useAppState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useSocketConnection.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Lobby(param) {
    let { enterGame, setMessage } = param;
    _s();
    const { roomId, setRoomId, currentPlayer, setCurrentPlayer, justQuitGame, setJustQuitGame } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"])();
    const [games, setGames] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocketConnection"])();
    // Lobby-specific socket events and actions
    const {} = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useLobbySocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLobbySocket"])(socket, {
        onGameCreated: {
            "Lobby.useLobbySocket": (data)=>{
                setGames({
                    "Lobby.useLobbySocket": (prevGames)=>[
                            ...prevGames,
                            {
                                id: data.gameId,
                                name: data.roomName,
                                players: 0,
                                completed: false
                            }
                        ]
                }["Lobby.useLobbySocket"]);
            }
        }["Lobby.useLobbySocket"],
        onPlayerJoined: {
            "Lobby.useLobbySocket": (data)=>{
                setGames({
                    "Lobby.useLobbySocket": (prevGames)=>prevGames.map({
                            "Lobby.useLobbySocket": (game)=>game.id === data.gameId ? {
                                    ...game,
                                    players: game.players + 1
                                } : game
                        }["Lobby.useLobbySocket"])
                }["Lobby.useLobbySocket"]);
            }
        }["Lobby.useLobbySocket"],
        onPlayerQuit: {
            "Lobby.useLobbySocket": (data)=>{
                setGames({
                    "Lobby.useLobbySocket": (prevGames)=>prevGames.map({
                            "Lobby.useLobbySocket": (game)=>game.id === data.gameId ? {
                                    ...game,
                                    players: game.players - 1
                                } : game
                        }["Lobby.useLobbySocket"])
                }["Lobby.useLobbySocket"]);
            }
        }["Lobby.useLobbySocket"]
    });
    const clickJoinGame = (gameId)=>{
        const game = games.find((game)=>game.id === gameId);
        if (game === undefined || game.players > 1) return;
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$lobbyAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lobbyApiService"].getGame(gameId).then((response)=>{
            if (response.data) {
                setMessage("Joining game ".concat(game.name, "!"));
                setCurrentPlayer(game.players + 1);
                setRoomId(gameId);
                socket.disconnect();
                setMessage("Joined game ".concat(game.name, "!"));
                enterGame(gameId, game.players + 1);
            }
        });
    };
    const makeGame = ()=>{
        //Open prompt to create game
        const gameName = prompt("Enter a name for your game:");
        if (!gameName && gameName !== "") {
            return;
        }
        const tempName = "Game_".concat(Math.floor(Math.random() * 1000));
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$lobbyAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lobbyApiService"].createGame(gameName ? gameName : tempName, socket.id).then((response)=>{
            if (response.data) {
                setMessage('Game "'.concat(gameName ? gameName : tempName, '" created!'));
                setGames((prevGames)=>[
                        ...prevGames,
                        response.data
                    ]);
            }
        });
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lobby.useEffect": ()=>{
            if (justQuitGame === true) {
                setJustQuitGame(false);
            }
        }
    }["Lobby.useEffect"], [
        justQuitGame
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Lobby.useEffect": ()=>{
            console.log("Connecting socket...");
            socket.connect();
            console.log("Socket connected.");
            console.log("Fetching games list from lobby...");
            __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$lobbyAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lobbyApiService"].getGames(socket.id).then({
                "Lobby.useEffect": (response)=>{
                    console.log("Got lobby...");
                    const newGames = [];
                    if (response.data) {
                        response.data.forEach({
                            "Lobby.useEffect": (game)=>{
                                newGames.push(game);
                            }
                        }["Lobby.useEffect"]);
                    }
                    setGames(newGames);
                    setIsLoading(false);
                }
            }["Lobby.useEffect"]);
        }
    }["Lobby.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "lobby text-black",
        children: [
            !isLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                className: "game-list",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GamesList, {
                    games: games,
                    joinGame: clickJoinGame
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/lobby.tsx",
                    lineNumber: 113,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/lobby.tsx",
                lineNumber: 112,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "lobby-button px-4 py-2 border rounded bg-blue-500 text-white hover:bg-blue-600",
                onClick: ()=>makeGame(),
                children: "Create Game"
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/lobby.tsx",
                lineNumber: 116,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/components/lobby.tsx",
        lineNumber: 110,
        columnNumber: 5
    }, this);
}
_s(Lobby, "4bTlEy3J90fsAZd8uO2+TykXaGw=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocketConnection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useLobbySocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useLobbySocket"]
    ];
});
_c = Lobby;
function GamesList(param) {
    let { games, joinGame } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "grid grid-cols-[1fr_auto_auto] gap-4 items-center mb-4",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-bold",
                children: "Game Name"
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/lobby.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-bold",
                children: "Players"
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/lobby.tsx",
                lineNumber: 126,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "font-bold",
                children: "Action"
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/lobby.tsx",
                lineNumber: 127,
                columnNumber: 7
            }, this),
            games.map((game)=>{
                var _game_players;
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: game.name
                        }, "".concat(game.id, "-name"), false, {
                            fileName: "[project]/client/src/app/components/lobby.tsx",
                            lineNumber: 132,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                (_game_players = game.players) !== null && _game_players !== void 0 ? _game_players : 0,
                                "/2"
                            ]
                        }, "".concat(game.id, "-players"), true, {
                            fileName: "[project]/client/src/app/components/lobby.tsx",
                            lineNumber: 133,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            hidden: game.completed || game.players >= 2,
                            className: "join-button px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600",
                            onClick: ()=>joinGame(game.id),
                            children: "Join"
                        }, "".concat(game.id, "-button"), false, {
                            fileName: "[project]/client/src/app/components/lobby.tsx",
                            lineNumber: 134,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            hidden: game.players < 2,
                            children: "Full"
                        }, "".concat(game.id, "-full"), false, {
                            fileName: "[project]/client/src/app/components/lobby.tsx",
                            lineNumber: 142,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true);
            })
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/components/lobby.tsx",
        lineNumber: 123,
        columnNumber: 5
    }, this);
}
_c1 = GamesList;
var _c, _c1;
__turbopack_context__.k.register(_c, "Lobby");
__turbopack_context__.k.register(_c1, "GamesList");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/services/gameAPIService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GameService",
    ()=>GameService,
    "gameApiService",
    ()=>gameApiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/utils/apiClient.ts [app-client] (ecmascript)");
;
;
class GameService {
    async getGame(gameId, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].get("".concat(this.basePath, "/").concat(gameId), socketId);
    }
    async joinGame(playerId, gameId, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("".concat(this.basePath, "/join"), socketId, {
            playerId,
            gameId
        });
    }
    async updateGameState(gameId, move, playerId, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("".concat(this.basePath, "/updateGameState"), socketId, {
            gameId,
            move,
            playerId
        });
    }
    async quitGame(gameId, playerId, socketId) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$utils$2f$apiClient$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiClient"].post("".concat(this.basePath, "/quitGame"), socketId, {
            gameId: gameId,
            playerId: playerId
        });
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "basePath", '/game');
    }
}
const gameApiService = new GameService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/hooks/useGameSocket.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Hook specifically for in-game socket events
__turbopack_context__.s([
    "useGameSocket",
    ()=>useGameSocket
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var _s = __turbopack_context__.k.signature();
;
const useGameSocket = (socket, callbacks)=>{
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "useGameSocket.useEffect": ()=>{
            if (!socket) return;
            socket.on('gameStateUpdate', callbacks.onGameStateUpdate);
            socket.on('playerJoinedGame', callbacks.onPlayerJoinedGame);
            socket.on('playerQuitGame', callbacks.onPlayerQuitGame);
            return ({
                "useGameSocket.useEffect": ()=>{
                    socket.off('gameStateUpdate', callbacks.onGameStateUpdate);
                    socket.off('playerJoinedGame', callbacks.onPlayerJoinedGame);
                    socket.off('playerQuitGame', callbacks.onPlayerQuitGame);
                }
            })["useGameSocket.useEffect"];
        }
    }["useGameSocket.useEffect"], [
        socket,
        callbacks
    ]);
    //Rewrite to use REST call, then just have the callbacks after server does full emit?
    const playerJoinedGame = (playerId)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('playerJoinedGame', {
            playerId
        });
    };
    const playerQuitGame = (playerId)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('playerQuitGame', {
            playerId
        });
    };
    const updateGameState = (gameState)=>{
        socket === null || socket === void 0 ? void 0 : socket.emit('gameStateUpdate', {
            gameState
        });
    };
    return {
        playerJoinedGame,
        playerQuitGame,
        updateGameState
    };
};
_s(useGameSocket, "OD7bBpZva5O2jO+Puf00hKivP7c=");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/components/board.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Board
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$gameAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/services/gameAPIService.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$canvas$2d$confetti$2f$dist$2f$confetti$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/canvas-confetti/dist/confetti.module.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useGameSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useGameSocket.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useSocketConnection.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
function Board(param) {
    let { gameId, playerId, setMessage, leaveGame } = param;
    _s();
    const currGameId = gameId;
    const currPlayerId = playerId;
    const socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocketConnection"])();
    const {} = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useGameSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameSocket"])(socket, {
        onPlayerJoinedGame (data) {
            setMessage("Player ".concat(data.playerId, " joined the game."));
        },
        onPlayerQuitGame (data) {
            setMessage("Player ".concat(data.playerId, " quit the game."));
        },
        onGameStateUpdate: {
            "Board.useGameSocket": (data)=>{
                setBoard(data.game.board);
                setRowTop(findRowTop(data.game.board));
                if (data.game.turn > 2) {
                    endGame(data.game.turn);
                }
                setTurn(data.game.turn);
                if (data.game.turn === playerId) setMessage('It\'s your turn!');
            }
        }["Board.useGameSocket"]
    });
    //Update to use existing game state
    const [board, setBoard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array(42));
    const [rowTop, setRowTop] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(Array(7));
    const [turn, setTurn] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [confettiVisible, setConfettiVisible] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Board.useEffect": ()=>{
            window.addEventListener('beforeunload', quitGame);
            if (!socket) return;
            socket.connect();
            const handleConnect = {
                "Board.useEffect.handleConnect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$gameAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameApiService"].joinGame(currPlayerId, currGameId, socket.id).then({
                        "Board.useEffect.handleConnect": (response)=>{
                            setBoard(response.data.board);
                            setTurn(response.data.turn);
                            setRowTop(findRowTop(response.data.board));
                        }
                    }["Board.useEffect.handleConnect"]);
                }
            }["Board.useEffect.handleConnect"];
            socket.on('connect', handleConnect);
            // Cleanup function
            return ({
                "Board.useEffect": ()=>{
                    socket.off('connect', handleConnect);
                    socket.disconnect();
                }
            })["Board.useEffect"];
        }
    }["Board.useEffect"], []);
    function findRowTop(board) {
        const tops = [];
        for(let col = 0; col < 7; col++){
            let top = 5; // Start from the bottom row
            while(top >= 0 && board[col + top * 7] !== 0){
                top--;
            }
            tops[col] = top;
        }
        return tops;
    }
    function findSingleRowTop(board, column) {
        let top = 5; // Start from the bottom row
        while(top >= 0 && board[column + top * 7] !== 0){
            top--;
        }
        return top;
    }
    function quitGame() {
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$gameAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameApiService"].quitGame(currGameId, currPlayerId, socket.id).then(()=>{
            setMessage("You quit the game.");
            leaveGame(currGameId, currPlayerId);
        });
    }
    function handleSquareClick(column) {
        if (turn !== currPlayerId) return; // not this player's turn
        const id = column + rowTop[column] * 7;
        if (board[id] !== 0) return; // already filled
        rowTop[column] -= 1;
        // Submit new move to server here
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$services$2f$gameAPIService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["gameApiService"].updateGameState(currGameId, id, turn, socket.id).then((response)=>{
            const newSquares = board.slice();
            newSquares[id] = turn;
            setBoard(newSquares);
            rowTop[column] = findSingleRowTop(newSquares, column);
            setRowTop(rowTop);
            if (response.data > 2) {
                endGame(currPlayerId);
            }
        });
        turn === 1 ? setTurn(2) : setTurn(1);
        setMessage('It is your opponent\'s turn');
    }
    function endGame(player) {
        setTimeout(()=>{
            player = player === 3 || player === 1 ? 1 : 2;
            if (currPlayerId !== player) alert("You lose!");
            else {
                alert("You win!");
                setConfettiVisible(true);
            }
            setConfettiVisible(false);
            // Show exit option
            alert("Game over! Press OK to exit to lobby.");
            quitGame();
        }, 300);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "current-turn-".concat(turn),
                children: [
                    "Current Turn: Player ",
                    turn
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/components/board.tsx",
                lineNumber: 137,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "current-turn-".concat(currPlayerId),
                children: [
                    "You are player ",
                    currPlayerId
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/components/board.tsx",
                lineNumber: 138,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "board",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[0],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 141,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[1],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 142,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[2],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 143,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[3],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 144,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[4],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 145,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[5],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 146,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[6],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 147,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 140,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[7],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 150,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[8],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 151,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[9],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 152,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[10],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 153,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[11],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[12],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 156,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[13],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 149,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[14],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[15],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[16],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 162,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[17],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 163,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[18],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 164,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[19],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 165,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[20],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 166,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[21],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 169,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[22],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 170,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[23],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[24],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 172,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[25],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 173,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[26],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 174,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[27],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 175,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 168,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[28],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 178,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[29],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 179,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[30],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[31],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 181,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[32],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 182,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[33],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 183,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[34],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 184,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 177,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "board-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[35],
                                onSquareClick: ()=>handleSquareClick(0)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[36],
                                onSquareClick: ()=>handleSquareClick(1)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[37],
                                onSquareClick: ()=>handleSquareClick(2)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 189,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[38],
                                onSquareClick: ()=>handleSquareClick(3)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 190,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[39],
                                onSquareClick: ()=>handleSquareClick(4)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[40],
                                onSquareClick: ()=>handleSquareClick(5)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 192,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Square, {
                                value: board[41],
                                onSquareClick: ()=>handleSquareClick(6)
                            }, void 0, false, {
                                fileName: "[project]/client/src/app/components/board.tsx",
                                lineNumber: 193,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/client/src/app/components/board.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/client/src/app/components/board.tsx",
                lineNumber: 139,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: confettiVisible && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$canvas$2d$confetti$2f$dist$2f$confetti$2e$module$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {}, void 0, false, {
                    fileName: "[project]/client/src/app/components/board.tsx",
                    lineNumber: 196,
                    columnNumber: 32
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/board.tsx",
                lineNumber: 196,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    className: "quit-button px-3 py-1 border rounded bg-blue-500 text-white hover:bg-blue-600",
                    onClick: ()=>quitGame(),
                    children: "Quit Game"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/board.tsx",
                    lineNumber: 197,
                    columnNumber: 12
                }, this)
            }, void 0, false, {
                fileName: "[project]/client/src/app/components/board.tsx",
                lineNumber: 197,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/client/src/app/components/board.tsx",
        lineNumber: 136,
        columnNumber: 5
    }, this);
}
_s(Board, "g96QZIj7Fa1lcASxfOpluZ7s+J0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useSocketConnection$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSocketConnection"],
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useGameSocket$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useGameSocket"]
    ];
});
_c = Board;
function Square(param) {
    let { value, onSquareClick } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "disc disc-".concat(value),
        onClick: onSquareClick
    }, void 0, false, {
        fileName: "[project]/client/src/app/components/board.tsx",
        lineNumber: 203,
        columnNumber: 10
    }, this);
}
_c1 = Square;
var _c, _c1;
__turbopack_context__.k.register(_c, "Board");
__turbopack_context__.k.register(_c1, "Square");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/client/src/app/components/connectFour.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ConnectFour
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/hooks/useAppState.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$components$2f$lobby$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/components/lobby.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$components$2f$board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/client/src/app/components/board.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
;
function ConnectFour() {
    _s();
    const { gameStatus, setGameStatus, message, setMessage, roomId, setRoomId, currentPlayer, setCurrentPlayer, setJustQuitGame } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"])();
    const joinGame = (gameId, playerId)=>{
        // Switch from Lobby to Board
        setRoomId(gameId);
        setCurrentPlayer(playerId);
        setGameStatus('playing');
    };
    const quitGame = (gameId, playerId)=>{
        // Switch from Board to Lobby
        setJustQuitGame(true);
        setGameStatus('lobby');
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen flex items-center justify-center p-8",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "bg-white rounded-2xl shadow-2xl p-8 max-w-4xl w-full",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: "text-4xl font-bold text-center mb-8 text-gray-800",
                    children: "Connect Four Multiplayer"
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/connectFour.tsx",
                    lineNumber: 38,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: "mb-6 text-gray-600",
                    children: message
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/connectFour.tsx",
                    lineNumber: 41,
                    columnNumber: 9
                }, this),
                gameStatus === 'lobby' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$components$2f$lobby$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    enterGame: joinGame,
                    setMessage: setMessage
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/connectFour.tsx",
                    lineNumber: 46,
                    columnNumber: 11
                }, this),
                gameStatus === 'playing' && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$components$2f$board$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    gameId: roomId,
                    playerId: currentPlayer,
                    setMessage: setMessage,
                    leaveGame: quitGame
                }, void 0, false, {
                    fileName: "[project]/client/src/app/components/connectFour.tsx",
                    lineNumber: 50,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/client/src/app/components/connectFour.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/client/src/app/components/connectFour.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(ConnectFour, "ut4nvKssDcF8ATKyXkF3Bc/+79g=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$client$2f$src$2f$app$2f$hooks$2f$useAppState$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppState"]
    ];
});
_c = ConnectFour;
var _c;
__turbopack_context__.k.register(_c, "ConnectFour");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=client_src_app_d8c53e5c._.js.map