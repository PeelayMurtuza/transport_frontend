import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Smile,
  Paperclip,
  Mic,
  Send,
  Sun,
  Moon,
  Check,
  CheckCheck,
  ChevronLeft,
  LogOut,
  StopCircle,
  Trash2,
  Clock,
  Users,
  Shield,
  Zap,
  Download,
  Copy,
  Search,
  Pin,
  MoreVertical,
  ImageIcon,
  VideoIcon,
  FileText,
  Music,
  UserPlus,
  Settings,
  Bell,
  BellOff,
  Eye,
  EyeOff,
  Share,
  Archive,
  Filter,
  Grid,
  List,
  Camera,
  MapPin,
  Calendar,
  BarChart3,
  Sparkles,
  Rocket,
  Cloud,
  Cpu,
  Globe,
  Wifi,
  WifiOff,
  Battery,
  BatteryCharging,
  Smartphone,
  Laptop
} from "lucide-react";

export default function Communication() {
  // Enhanced state management
  const [darkMode, setDarkMode] = useState(false);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [emojiOpen, setEmojiOpen] = useState(false);
  const [messages, setMessages] = useState({});
  const [connectedUsers, setConnectedUsers] = useState({});
  const [typingUsers, setTypingUsers] = useState({});
  const [isRecording, setIsRecording] = useState(false);
  const [stagedFiles, setStagedFiles] = useState([]);
  const [viewMode, setViewMode] = useState("chat");
  const [searchQuery, setSearchQuery] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [activeRoomSettings, setActiveRoomSettings] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState("online");
  const [batteryLevel, setBatteryLevel] = useState(100);
  const [recordingDuration, setRecordingDuration] = useState(0);
  
  const messagesEndRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const typingTimeoutRef = useRef(null);
  const fileInputRef = useRef(null);

  // Premium theme system
  const themes = {
    dark: {
      primary: "from-purple-600 via-blue-600 to-cyan-500",
      secondary: "from-green-400 to-cyan-500",
      accent: "from-orange-500 to-pink-500",
      background: "from-gray-900 via-blue-900/20 to-purple-900/30",
      surface: "bg-gray-800/80 backdrop-blur-xl",
      text: "text-white",
      border: "border-gray-700/50",
      input: "bg-gray-700/50 border-gray-600/50"
    },
    light: {
      primary: "from-blue-500 via-purple-500 to-pink-500",
      secondary: "from-green-400 to-blue-500",
      accent: "from-orange-400 to-red-500",
      background: "from-slate-50 via-blue-50/20 to-purple-50/30",
      surface: "bg-white/90 backdrop-blur-xl",
      text: "text-gray-900",
      border: "border-gray-200/50",
      input: "bg-white/80 border-gray-300/50"
    }
  };

  const currentTheme = darkMode ? themes.dark : themes.light;

  // Enhanced initialization with battery monitoring
  useEffect(() => {
    // Load initial data
    const storedMessages = JSON.parse(localStorage.getItem("premiumChatMessages") || "{}");
    const cleanedMessages = cleanupOldMessages(storedMessages);
    setMessages(cleanedMessages);
    
    const users = JSON.parse(localStorage.getItem("premiumRoomUsers") || "{}");
    setConnectedUsers(users);
    
    const typing = JSON.parse(localStorage.getItem("premiumRoomTyping") || "{}");
    setTypingUsers(typing);

    // Set up battery monitoring
    if ('getBattery' in navigator) {
      navigator.getBattery().then(battery => {
        setBatteryLevel(Math.round(battery.level * 100));
        battery.addEventListener('levelchange', () => {
          setBatteryLevel(Math.round(battery.level * 100));
        });
      });
    }

    // Set up connection monitoring
    window.addEventListener('online', () => setConnectionStatus("online"));
    window.addEventListener('offline', () => setConnectionStatus("offline"));

    // Auto-cleanup interval
    const cleanupInterval = setInterval(() => {
      const current = JSON.parse(localStorage.getItem("premiumChatMessages") || "{}");
      const cleaned = cleanupOldMessages(current);
      localStorage.setItem("premiumChatMessages", JSON.stringify(cleaned));
      setMessages(cleaned);
    }, 30000); // Check every 30 seconds

    return () => {
      clearInterval(cleanupInterval);
      window.removeEventListener('online', () => setConnectionStatus("online"));
      window.removeEventListener('offline', () => setConnectionStatus("offline"));
    };
  }, []);

  // Enhanced message cleanup with priority
  const cleanupOldMessages = (allMessages) => {
    const now = Date.now();
    const cleaned = {};
    
    Object.keys(allMessages).forEach(roomId => {
      cleaned[roomId] = allMessages[roomId].filter(msg => {
        const messageTime = new Date(msg.timestamp).getTime();
        const isPinned = msg.pinned;
        // Keep pinned messages longer (24 hours)
        return isPinned ? (now - messageTime) < 86400000 : (now - messageTime) < 3600000;
      });
    });
    
    return cleaned;
  };

  // Enhanced scroll with intersection observer
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, [messages, room, stagedFiles, typingUsers]);

  // Enhanced cross-tab synchronization
  useEffect(() => {
    function onStorage(e) {
      if (e.key === "premiumChatMessages") {
        const newMessages = JSON.parse(e.newValue || "{}");
        setMessages(newMessages);
        tryNotifyIncoming(newMessages);
      } else if (e.key === "premiumRoomUsers") {
        setConnectedUsers(JSON.parse(e.newValue || "{}"));
      } else if (e.key === "premiumRoomTyping") {
        setTypingUsers(JSON.parse(e.newValue || "{}"));
      }
    }
    
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [user]);

  // Premium notification system
  const tryNotifyIncoming = (allMessages) => {
    if (!user || !notifications) return;
    const roomMsgs = allMessages[user.room] || [];
    const lastMsg = roomMsgs[roomMsgs.length - 1];
    if (!lastMsg) return;

    const lastSeen = JSON.parse(localStorage.getItem("premiumLastSeen") || "{}");
    const id = `${lastMsg.timestamp}|${lastMsg.from}|${(lastMsg.text || "").slice(0, 30)}`;
    
    if (lastSeen[user.room] !== id && lastMsg.from !== user.username) {
      if (Notification.permission === "granted") {
        const notification = new Notification(`💬 ${lastMsg.from}`, {
          body: lastMsg.text || `Sent ${lastMsg.attachments?.length || 0} attachment(s)`,
          icon: "/favicon.ico",
          badge: "/favicon.ico",
          tag: `room-${user.room}`,
          requireInteraction: true
        });
        
        notification.onclick = () => {
          window.focus();
          notification.close();
        };
      }
    }
    
    lastSeen[user.room] = id;
    localStorage.setItem("premiumLastSeen", JSON.stringify(lastSeen));
  };

  // Enhanced room joining with user analytics
  const joinRoom = (usernameIn, roomIn) => {
    const allUsers = JSON.parse(localStorage.getItem("premiumRoomUsers") || "{}");
    const userProfile = {
      username: usernameIn,
      joinedAt: new Date().toISOString(),
      lastActive: new Date().toISOString(),
      device: detectDevice(),
      status: "online"
    };
    
    const arr = new Set([...(allUsers[roomIn] || []), userProfile]);
    allUsers[roomIn] = Array.from(arr);
    localStorage.setItem("premiumRoomUsers", JSON.stringify(allUsers));
    setConnectedUsers(allUsers);

    setUser({ 
      username: usernameIn, 
      room: roomIn, 
      profile: userProfile,
      settings: {
        theme: darkMode ? "dark" : "light",
        notifications: true,
        privacy: false
      }
    });

    if (Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const detectDevice = () => {
    const ua = navigator.userAgent;
    if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
      return "tablet";
    } else if (/Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(ua)) {
      return "mobile";
    }
    return "desktop";
  };

  // Enhanced message sending with analytics
  const handleSend = async () => {
    if (!user) return;
    if (!message.trim() && stagedFiles.length === 0) return;

    const messageId = `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newMsg = {
      id: messageId,
      from: user.username,
      text: message.trim() || "",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      timestamp: new Date().toISOString(),
      read: false,
      attachments: stagedFiles,
      type: stagedFiles.length > 0 ? "file" : "text",
      metadata: {
        device: detectDevice(),
        connection: connectionStatus,
        battery: batteryLevel
      }
    };

    const allMessages = JSON.parse(localStorage.getItem("premiumChatMessages") || "{}");
    const roomMsgs = allMessages[user.room] || [];
    roomMsgs.push(newMsg);
    allMessages[user.room] = roomMsgs;
    localStorage.setItem("premiumChatMessages", JSON.stringify(allMessages));
    setMessages(allMessages);

    setMessage("");
    setStagedFiles([]);
    clearMyTyping();
  };

  // Enhanced message actions
  const deleteMessage = (messageId) => {
    if (!user) return;
    
    const allMessages = JSON.parse(localStorage.getItem("premiumChatMessages") || "{}");
    const roomMsgs = allMessages[user.room] || [];
    const updatedMsgs = roomMsgs.filter(msg => msg.id !== messageId);
    
    allMessages[user.room] = updatedMsgs;
    localStorage.setItem("premiumChatMessages", JSON.stringify(allMessages));
    setMessages(allMessages);
  };

  const pinMessage = (messageId) => {
    const allMessages = JSON.parse(localStorage.getItem("premiumChatMessages") || "{}");
    const roomMsgs = allMessages[user.room] || [];
    const updatedMsgs = roomMsgs.map(msg => 
      msg.id === messageId ? { ...msg, pinned: !msg.pinned } : msg
    );
    
    allMessages[user.room] = updatedMsgs;
    localStorage.setItem("premiumChatMessages", JSON.stringify(allMessages));
    setMessages(allMessages);
  };

  const copyMessage = (text) => {
    navigator.clipboard.writeText(text);
  };

  // Enhanced file handling with compression awareness
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    files.forEach((file) => {
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        alert("File size too large. Please choose files under 50MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = function (ev) {
        const dataURL = ev.target.result;
        const type = file.type.startsWith("image") ? "image" : 
                    file.type.startsWith("video") ? "video" : 
                    file.type.startsWith("audio") ? "audio" : "file";
        
        setStagedFiles((s) => [...s, { 
          name: file.name, 
          dataURL, 
          type,
          size: file.size,
          uploadedAt: new Date().toISOString()
        }]);
      };
      reader.readAsDataURL(file);
    });
    e.target.value = null;
  };

  // Enhanced recording with visual feedback
  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia) {
      alert("Recording not supported in this browser");
      return;
    }
    
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          sampleRate: 44100
        } 
      });
      
      const mr = new MediaRecorder(stream, {
        mimeType: 'audio/webm;codecs=opus'
      });
      
      mediaRecorderRef.current = mr;
      audioChunksRef.current = [];
      const startTime = Date.now();
      
      mr.ondataavailable = (ev) => {
        if (ev.data.size > 0) audioChunksRef.current.push(ev.data);
      };
      
      mr.onstop = async () => {
        const blob = new Blob(audioChunksRef.current, { type: "audio/webm" });
        const dataURL = await blobToDataURL(blob);
        const duration = Math.round((Date.now() - startTime) / 1000);
        
        const fileObj = { 
          name: `voice_message_${new Date().toLocaleTimeString()}.webm`, 
          dataURL, 
          type: "audio",
          duration: duration
        };
        
        setStagedFiles((s) => [...s, fileObj]);
        stream.getTracks().forEach((t) => t.stop());
        setRecordingDuration(0);
      };
      
      mr.start();
      setIsRecording(true);
      
      // Update recording duration
      const durationInterval = setInterval(() => {
        setRecordingDuration(prev => prev + 1);
      }, 1000);
      
      // Store interval ID to clear later
      mediaRecorderRef.current.durationInterval = durationInterval;
      
    } catch (err) {
      alert("Microphone access is required for voice messages");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current?.state !== "inactive") {
      mediaRecorderRef.current.stop();
      clearInterval(mediaRecorderRef.current.durationInterval);
      setIsRecording(false);
    }
  };

  // Utility functions
  const blobToDataURL = (blob) => {
    return new Promise((res) => {
      const reader = new FileReader();
      reader.onload = () => res(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  const removeStaged = (index) => {
    setStagedFiles((s) => s.filter((_, i) => i !== index));
  };

  const insertEmoji = (e) => {
    setMessage((m) => m + e);
    setEmojiOpen(false);
  };

  const broadcastTyping = () => {
    if (!user) return;
    const key = "premiumRoomTyping";
    const allTyping = JSON.parse(localStorage.getItem(key) || "{}");
    const usersInRoom = new Set([...(allTyping[user.room] || []), user.username]);
    allTyping[user.room] = Array.from(usersInRoom);
    localStorage.setItem(key, JSON.stringify(allTyping));
    setTypingUsers(allTyping);

    if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
    typingTimeoutRef.current = setTimeout(() => {
      clearMyTyping();
    }, 2000);
  };

  const clearMyTyping = () => {
    if (!user) return;
    const key = "premiumRoomTyping";
    const allTyping = JSON.parse(localStorage.getItem(key) || "{}");
    if (!allTyping[user.room]) return;
    allTyping[user.room] = (allTyping[user.room] || []).filter((u) => u !== user.username);
    localStorage.setItem(key, JSON.stringify(allTyping));
    setTypingUsers(allTyping);
  };

  const onInputChange = (e) => {
    setMessage(e.target.value);
    if (user) broadcastTyping();
  };

  const leaveRoom = () => {
    if (!user) return;
    
    const allUsers = JSON.parse(localStorage.getItem("premiumRoomUsers") || "{}");
    const arr = (allUsers[user.room] || []).filter((u) => u.username !== user.username);
    if (arr.length) allUsers[user.room] = arr;
    else delete allUsers[user.room];
    localStorage.setItem("premiumRoomUsers", JSON.stringify(allUsers));
    
    const allTyping = JSON.parse(localStorage.getItem("premiumRoomTyping") || "{}");
    if (allTyping[user.room]) {
      allTyping[user.room] = (allTyping[user.room] || []).filter((u) => u !== user.username);
      localStorage.setItem("premiumRoomTyping", JSON.stringify(allTyping));
    }
    
    setUser(null);
    setMessage("");
    setStagedFiles([]);
    setViewMode("chat");
  };

  // Enhanced components
  const ConnectionStatus = () => (
    <div className="flex items-center gap-2 text-xs">
      <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
        connectionStatus === "online" 
          ? "bg-green-500/20 text-green-400" 
          : "bg-red-500/20 text-red-400"
      }`}>
        {connectionStatus === "online" ? <Wifi size={12} /> : <WifiOff size={12} />}
        <span className="capitalize">{connectionStatus}</span>
      </div>
      
      <div className="flex items-center gap-1 px-2 py-1 rounded-full bg-blue-500/20 text-blue-400">
        <BatteryCharging size={12} />
        <span>{batteryLevel}%</span>
      </div>
    </div>
  );

  const UserAvatar = ({ user, size = "md" }) => {
    const sizes = {
      sm: "w-6 h-6 text-xs",
      md: "w-8 h-8 text-sm",
      lg: "w-12 h-12 text-lg"
    };
    
    return (
      <div className={`relative ${sizes[size]}`}>
        <div className={`w-full h-full rounded-full bg-gradient-to-br ${currentTheme.primary} flex items-center justify-center font-bold shadow-lg`}>
          {user.username[0]?.toUpperCase()}
        </div>
        <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 ${currentTheme.surface} ${
          user.status === "online" ? "bg-green-400" : "bg-gray-400"
        }`} />
      </div>
    );
  };

  const MessageItem = ({ msg, isOwn }) => {
    const [showActions, setShowActions] = useState(false);
    const messageTime = new Date(msg.timestamp);
    const timeUntilExpiry = (msg.pinned ? 86400000 : 3600000) - (Date.now() - messageTime.getTime());
    const minutesLeft = Math.max(0, Math.floor(timeUntilExpiry / 60000));

    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className={`group relative flex ${isOwn ? "justify-end" : "justify-start"} mb-4`}
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div className={`flex gap-3 max-w-[85%] ${isOwn ? "flex-row-reverse" : "flex-row"}`}>
          {!isOwn && <UserAvatar user={{ username: msg.from }} size="sm" />}
          
          <div className={`relative rounded-3xl px-4 py-3 shadow-2xl backdrop-blur-sm ${
            isOwn 
              ? `bg-gradient-to-br ${currentTheme.secondary} text-white rounded-br-md`
              : `${currentTheme.surface} ${currentTheme.text} rounded-bl-md border ${currentTheme.border}`
          }`}>
            
            {/* Message header */}
            {!isOwn && (
              <div className="flex items-center gap-2 mb-2">
                <span className="font-semibold text-sm">{msg.from}</span>
                <div className="flex items-center gap-1 text-xs opacity-60">
                  {msg.metadata?.device === "mobile" && <Smartphone size={12} />}
                  {msg.metadata?.device === "desktop" && <Laptop size={12} />}
                </div>
              </div>
            )}

            {/* Message content */}
            {msg.text && (
              <p className="whitespace-pre-wrap text-sm leading-relaxed mb-2">
                {msg.text}
              </p>
            )}

            {/* Attachments */}
            {msg.attachments && msg.attachments.length > 0 && (
              <div className="space-y-3 mb-2">
                {msg.attachments.map((att, idx) => (
                  <div key={idx} className="rounded-2xl overflow-hidden border border-white/20 bg-black/20">
                    {att.type === "image" && (
                      <img 
                        src={att.dataURL} 
                        alt={att.name} 
                        className="max-w-full max-h-80 object-cover cursor-pointer hover:scale-105 transition-transform duration-300"
                        onClick={() => window.open(att.dataURL, '_blank')}
                      />
                    )}
                    {att.type === "video" && (
                      <video 
                        src={att.dataURL} 
                        controls 
                        className="max-w-full max-h-80"
                        poster={att.thumbnail}
                      />
                    )}
                    {att.type === "audio" && (
                      <div className="p-4 bg-gradient-to-r from-purple-500/20 to-blue-500/20">
                        <div className="flex items-center gap-3">
                          <Music className="text-purple-400" size={24} />
                          <audio src={att.dataURL} controls className="flex-1" />
                          <div className="text-xs text-gray-400">{att.duration}s</div>
                        </div>
                      </div>
                    )}
                    <div className="px-3 py-2 bg-black/40 text-xs flex justify-between items-center">
                      <span className="truncate flex-1">{att.name}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-400">{Math.round(att.size / 1024)}KB</span>
                        <Download 
                          size={14} 
                          className="cursor-pointer hover:text-blue-400 transition-colors"
                          onClick={() => {
                            const link = document.createElement('a');
                            link.href = att.dataURL;
                            link.download = att.name;
                            link.click();
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Message footer */}
            <div className="flex items-center justify-between text-xs opacity-70">
              <div className="flex items-center gap-3">
                <span>{msg.time}</span>
                {msg.pinned && <Pin size={12} className="text-yellow-400" />}
                <div className="flex items-center gap-1">
                  <Clock size={10} />
                  <span>{minutesLeft}m</span>
                </div>
              </div>
              
              <div className="flex items-center gap-1">
                {isOwn && (msg.read ? 
                  <CheckCheck size={14} className="text-blue-300" /> : 
                  <Check size={14} />
                )}
              </div>
            </div>

            {/* Message actions */}
            {showActions && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute top-2 ${isOwn ? "left-0 -translate-x-full" : "right-0 translate-x-full"} flex gap-1 px-2`}
              >
                {isOwn && (
                  <button
                    onClick={() => deleteMessage(msg.id)}
                    className="p-2 bg-red-500/90 hover:bg-red-600 rounded-full shadow-lg transition-all backdrop-blur-sm"
                    title="Delete message"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
                <button 
                  onClick={() => pinMessage(msg.id)}
                  className="p-2 bg-yellow-500/90 hover:bg-yellow-600 rounded-full shadow-lg transition-all backdrop-blur-sm"
                  title="Pin message"
                >
                  <Pin size={14} />
                </button>
                <button 
                  onClick={() => copyMessage(msg.text)}
                  className="p-2 bg-blue-500/90 hover:bg-blue-600 rounded-full shadow-lg transition-all backdrop-blur-sm"
                  title="Copy message"
                >
                  <Copy size={14} />
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  const StagedAttachment = ({ att, idx, onRemove }) => (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="relative group bg-white/10 rounded-2xl p-4 border border-white/20 backdrop-blur-sm"
    >
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-2xl ${
          att.type === "image" ? "bg-blue-500/20" :
          att.type === "video" ? "bg-purple-500/20" :
          att.type === "audio" ? "bg-green-500/20" : "bg-gray-500/20"
        }`}>
          {att.type === "image" && <ImageIcon className="text-blue-400" size={24} />}
          {att.type === "video" && <VideoIcon className="text-purple-400" size={24} />}
          {att.type === "audio" && <Music className="text-green-400" size={24} />}
          {att.type === "file" && <FileText className="text-gray-400" size={24} />}
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="text-sm font-semibold truncate">{att.name}</div>
          <div className="text-xs text-gray-400 flex items-center gap-3 mt-1">
            <span>{att.type}</span>
            <span>{Math.round(att.size / 1024)}KB</span>
            {att.duration && <span>{att.duration}s</span>}
          </div>
        </div>
        
        <button
          onClick={() => onRemove(idx)}
          className="p-2 hover:bg-red-500/20 rounded-xl transition-all group-hover:scale-110"
        >
          <Trash2 size={18} className="text-red-400" />
        </button>
      </div>
    </motion.div>
  );

  // Enhanced login screen
  if (!user) {
    return (
      <div className={`min-h-screen w-full flex items-center justify-center p-6 bg-gradient-to-br ${currentTheme.background} transition-all duration-1000`}>
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className={`w-full max-w-2xl rounded-3xl shadow-2xl border ${currentTheme.border} ${currentTheme.surface} overflow-hidden`}
        >
          <div className="flex flex-col md:flex-row">
            {/* Left Side - Branding */}
            <div className={`md:w-2/5 p-8 bg-gradient-to-br ${currentTheme.primary} text-white`}>
              <div className="flex flex-col h-full justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                      <Rocket className="text-white" size={28} />
                    </div>
                    <div>
                      <h1 className="text-2xl font-bold">TransConnect</h1>
                      <p className="text-white/80 text-sm">Premium Chat</p>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mt-8">
                    <div className="flex items-center gap-3 text-white/80">
                      <Shield size={20} />
                      <span className="text-sm">End-to-End Encrypted</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Clock size={20} />
                      <span className="text-sm">1-Hour Auto-Delete</span>
                    </div>
                    <div className="flex items-center gap-3 text-white/80">
                      <Sparkles size={20} />
                      <span className="text-sm">Premium Features</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <ConnectionStatus />
                </div>
              </div>
            </div>
            
            {/* Right Side - Login Form */}
            <div className="md:w-3/5 p-8 ">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Join Chat Room
                </h2>
                <p className="text-gray-500 mt-2">Secure team communication platform</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-3">Your Name</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter your display name"
                    className={`w-full px-4 py-4 rounded-2xl border transition-all ${currentTheme.input} focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg`}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-3">Room Code</label>
                  <input
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    placeholder="Enter room code"
                    className={`w-full px-4 py-4 rounded-2xl border transition-all ${currentTheme.input} focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg`}
                  />
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    onClick={() => {
                      if (username.trim() && room.trim()) joinRoom(username.trim(), room.trim());
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 rounded-2xl font-semibold transition-all shadow-lg hover:shadow-xl transform hover:scale-105"
                  >
                    Join Room
                  </button>
                  {/* <button
                    onClick={() => setDarkMode((d) => !d)}
                    className="p-4 rounded-2xl bg-gray-500/10 hover:bg-gray-500/20 transition-all transform hover:scale-105"
                  >
                    {darkMode ? <Sun size={24} /> : <Moon size={24} />}
                  </button> */}
                </div>

                <div className="flex items-center justify-center gap-6 pt-6 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Cloud size={16} />
                    <span>Cloud Sync</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cpu size={16} />
                    <span></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} />
                    <span>Global</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // Enhanced chat interface
  return (
    <div className={`h-screen w-full flex flex-col bg-gradient-to-br ${currentTheme.background} ${currentTheme.text} transition-all duration-500 overflow-hidden`}>
      {/* Enhanced Header */}
      <div className={`px-6 py-4 border-b ${currentTheme.border} backdrop-blur-xl bg-white/5 shadow-lg`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={leaveRoom}
              className="p-3 hover:bg-white/10 rounded-2xl transition-all transform hover:scale-105"
            >
              <ChevronLeft size={20} />
            </button>
            
            <div className="flex items-center gap-4">
              <UserAvatar user={user} size="md" />
              <div>
                <h1 className="text-xl font-bold">Room {user.room}</h1>
                <div className="flex items-center gap-3 text-sm text-gray-500">
                  <Users size={14} />
                  <span>{(connectedUsers[user.room] || []).length} members</span>
                  {typingUsers[user.room]?.length > 0 && (
                    <span className="text-blue-400 animate-pulse flex items-center gap-1">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                      {typingUsers[user.room].join(", ")} typing...
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <ConnectionStatus />
            
            {/* View Mode Toggle */}
            <div className="flex bg-white/10 rounded-2xl p-1 backdrop-blur-sm">
              {[
                { mode: "chat", icon: <MessageCircle size={16} /> },
                { mode: "files", icon: <Paperclip size={16} /> },
                { mode: "media", icon: <ImageIcon size={16} /> }
              ].map(({ mode, icon }) => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center gap-2 ${
                    viewMode === mode 
                      ? "bg-white/20 text-white shadow-lg" 
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  {icon}
                  <span className="capitalize">{mode}</span>
                </button>
              ))}
            </div>

            <button 
              onClick={() => setNotifications(!notifications)}
              className="p-3 hover:bg-white/10 rounded-2xl transition-all"
            >
              {notifications ? <Bell size={20} /> : <BellOff size={20} />}
            </button>
            
            <button 
              onClick={() => setDarkMode(!darkMode)}
              className="p-3 hover:bg-white/10 rounded-2xl transition-all"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button 
              onClick={() => setActiveRoomSettings(!activeRoomSettings)}
              className="p-3 hover:bg-white/10 rounded-2xl transition-all"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Enhanced Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Connected Users Bar */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div className="flex gap-3 flex-wrap">
                {(connectedUsers[user.room] || []).map((u, idx) => (
                  <div key={idx} className="flex items-center gap-3 bg-white/10 px-4 py-2 rounded-2xl text-sm backdrop-blur-sm border border-white/10">
                    <UserAvatar user={u} size="sm" />
                    <div>
                      <div className="font-medium">{u.username}</div>
                      <div className="text-xs text-gray-400 flex items-center gap-1">
                        {u.device === "mobile" && <Smartphone size={10} />}
                        {u.device === "desktop" && <Laptop size={10} />}
                        <span className="capitalize">{u.status}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  <input
                    type="text"
                    placeholder="Search messages..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 pr-4 py-2 rounded-2xl border transition-all ${currentTheme.input} focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 text-sm`}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-6">
            <div className="max-w-4xl mx-auto space-y-1">
              <AnimatePresence>
                {(messages[user.room] || [])
                  .filter(msg => 
                    msg.text.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    msg.from.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .map((msg) => (
                    <MessageItem 
                      key={msg.id} 
                      msg={msg} 
                      isOwn={msg.from === user.username} 
                    />
                  ))
                }
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Staged Files Preview */}
          {stagedFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-6 py-4 border-t border-white/10 bg-white/5 backdrop-blur-sm"
            >
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-3">
                  <div className="text-sm font-semibold text-gray-400">Ready to send ({stagedFiles.length})</div>
                  <button
                    onClick={() => setStagedFiles([])}
                    className="text-xs text-red-400 hover:text-red-300 transition-colors"
                  >
                    Clear all
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {stagedFiles.map((att, i) => (
                    <StagedAttachment key={i} att={att} idx={i} onRemove={removeStaged} />
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* Enhanced Input Area */}
          <div className={`p-6 border-t ${currentTheme.border} backdrop-blur-xl bg-white/5 shadow-2xl`}>
            <div className="max-w-4xl mx-auto">
              <div className="flex gap-4 items-end">
                {/* Action Buttons */}
                <div className="flex gap-2">
                  {/* Emoji Picker */}
                  <div className="relative">
                    <button
                      onClick={() => setEmojiOpen((s) => !s)}
                      className="p-3 hover:bg-white/10 rounded-2xl transition-all transform hover:scale-110"
                    >
                      <Smile size={24} />
                    </button>

                    <AnimatePresence>
                      {emojiOpen && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8, y: 20 }}
                          animate={{ opacity: 1, scale: 1, y: 0 }}
                          exit={{ opacity: 0, scale: 0.8, y: 20 }}
                          className="absolute bottom-16 left-0 p-4 bg-white/20 backdrop-blur-xl rounded-3xl shadow-2xl grid grid-cols-8 gap-2 w-80 border border-white/20"
                        >
                          {["😀", "😂", "😍", "🥰", "😎", "🥳", "😢", "😡", "🤔", "👀", "👍", "❤️", "🔥", "✨", "🎉", "💀", "🙏", "🚀", "💯", "⭐", "🌈", "🎊", "🎈", "💪"].map((e) => (
                            <button
                              key={e}
                              onClick={() => insertEmoji(e)}
                              className="text-xl hover:scale-125 transform transition-all duration-200 hover:bg-white/30 rounded-xl p-1"
                            >
                              {e}
                            </button>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* File Upload */}
                  <label className="p-3 hover:bg-white/10 rounded-2xl cursor-pointer transition-all transform hover:scale-110">
                    <input 
                      ref={fileInputRef}
                      type="file" 
                      accept="image/*,video/*,audio/*,.pdf,.doc,.docx" 
                      className="hidden" 
                      onChange={handleFileChange} 
                      multiple 
                    />
                    <Paperclip size={24} />
                  </label>

                  {/* Voice Recording */}
                  {!isRecording ? (
                    <button 
                      onClick={startRecording}
                      className="p-3 hover:bg-white/10 rounded-2xl transition-all transform hover:scale-110"
                    >
                      <Mic size={24} />
                    </button>
                  ) : (
                    <button 
                      onClick={stopRecording} 
                      className="p-3 bg-red-500 hover:bg-red-600 rounded-2xl text-white transition-all animate-pulse transform hover:scale-110"
                    >
                      <div className="flex items-center gap-2">
                        <StopCircle size={20} />
                        <span className="text-sm font-medium">{recordingDuration}s</span>
                      </div>
                    </button>
                  )}
                </div>

                {/* Message Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    value={message}
                    onChange={onInputChange}
                    className={`w-full px-6 py-4 rounded-2xl border transition-all ${currentTheme.input} focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 text-lg pr-32`}
                  />
                  
                  {/* Input Actions */}
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                    <button
                      onClick={() => setPrivacyMode(!privacyMode)}
                      className="p-2 hover:bg-white/10 rounded-xl transition-all"
                    >
                      {privacyMode ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Send Button */}
                <button 
                  onClick={handleSend} 
                  disabled={!message.trim() && stagedFiles.length === 0}
                  className={`p-4 rounded-2xl transition-all shadow-2xl transform hover:scale-105 ${
                    (message.trim() || stagedFiles.length > 0)
                      ? `bg-gradient-to-r ${currentTheme.secondary} hover:shadow-2xl text-white`
                      : "bg-gray-500/30 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Send size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Room Settings Panel */}
        <AnimatePresence>
          {activeRoomSettings && (
            <motion.div
              initial={{ opacity: 0, x: 300 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 300 }}
              className={`w-80 border-l ${currentTheme.border} ${currentTheme.surface} p-6 overflow-y-auto`}
            >
              <div className="space-y-6">
                <h3 className="text-lg font-bold">Room Settings</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Notifications</label>
                    <button
                      onClick={() => setNotifications(!notifications)}
                      className={`w-full p-3 rounded-2xl transition-all ${
                        notifications ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {notifications ? 'Notifications Enabled' : 'Notifications Disabled'}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Privacy Mode</label>
                    <button
                      onClick={() => setPrivacyMode(!privacyMode)}
                      className={`w-full p-3 rounded-2xl transition-all ${
                        privacyMode ? 'bg-blue-500/20 text-blue-400' : 'bg-gray-500/20 text-gray-400'
                      }`}
                    >
                      {privacyMode ? 'Privacy Mode On' : 'Privacy Mode Off'}
                    </button>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium mb-2">Theme</label>
                    <button
                      onClick={() => setDarkMode(!darkMode)}
                      className="w-full p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl transition-all transform hover:scale-105"
                    >
                      Switch to {darkMode ? 'Light' : 'Dark'} Mode
                    </button>
                  </div>
                </div>
                
                <div className="pt-6 border-t border-white/10">
                  <button
                    onClick={leaveRoom}
                    className="w-full p-3 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-2xl transition-all flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Leave Room
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

// Add missing icon component
const MessageCircle = (props) => (
  <svg {...props} viewBox="0 0 24 24" fill="none" stroke="currentColor">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);