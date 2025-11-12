import { PaperAirplaneIcon, EllipsisHorizontalIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

// Mock data for conversations
const conversations = [
  {
    id: 1,
    name: 'Max & Bella',
    lastMessage: 'Hey! How about we meet at the park tomorrow?',
    time: '2h ago',
    unread: 3,
    avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 2,
    name: 'Charlie & Daisy',
    lastMessage: 'Daisy had so much fun playing with Charlie last time!',
    time: '1d ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
  {
    id: 3,
    name: 'Luna & Cooper',
    lastMessage: 'Are you free this weekend for a playdate?',
    time: '2d ago',
    unread: 0,
    avatar: 'https://images.unsplash.com/photo-1583511655826-057004d788d8?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  },
];

// Mock data for current conversation
const currentConversation = {
  id: 1,
  name: 'Max & Bella',
  avatar: 'https://images.unsplash.com/photo-1544568100-847a948585b9?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80',
  messages: [
    { id: 1, text: 'Hey there! How are you?', sent: true, time: '10:30 AM' },
    { id: 2, text: "Hi! I'm good, thanks! How about you?", sent: false, time: '10:32 AM' },
    { id: 3, text: 'Doing well! Would you like to schedule a playdate for our pups?', sent: true, time: '10:33 AM' },
    { id: 4, text: 'That sounds great! When are you thinking?', sent: false, time: '10:35 AM' },
    { id: 5, text: 'How about this Saturday at the dog park?', sent: true, time: '10:36 AM' },
    { id: 6, text: 'Hey! How about we meet at the park tomorrow?', sent: false, time: '2:15 PM' },
  ],
};

export default function MessagesPage() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-full md:w-1/3 lg:w-1/4 bg-white border-r border-gray-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-gray-800">Messages</h1>
            <button
              type="button"
              className="p-1 rounded-full text-gray-500 hover:bg-gray-100"
              aria-label="More options"
            >
              <EllipsisHorizontalIcon className="h-6 w-6" />
            </button>
          </div>
          
          {/* Search */}
          <div className="mt-4 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-full bg-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
              placeholder="Search messages"
            />
          </div>
        </div>
        
        {/* Conversation list */}
        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              className={`p-4 border-b border-gray-100 flex items-center hover:bg-gray-50 cursor-pointer ${
                conversation.id === currentConversation.id ? 'bg-blue-50' : ''
              }`}
            >
              <div className="flex-shrink-0">
                <img
                  className="h-12 w-12 rounded-full object-cover"
                  src={conversation.avatar}
                  alt={conversation.name}
                />
              </div>
              <div className="ml-3 flex-1 min-w-0">
                <div className="flex justify-between">
                  <p className="text-sm font-medium text-gray-900 truncate">{conversation.name}</p>
                  <p className="text-xs text-gray-500">{conversation.time}</p>
                </div>
                <p className="text-sm text-gray-500 truncate">{conversation.lastMessage}</p>
              </div>
              {conversation.unread > 0 && (
                <span className="ml-2 inline-flex items-center justify-center h-5 w-5 rounded-full bg-indigo-600 text-xs font-medium text-white">
                  {conversation.unread}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
      
      {/* Chat area */}
      <div className="hidden md:flex md:flex-col flex-1">
        {/* Chat header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between bg-white">
          <div className="flex items-center">
            <img
              className="h-10 w-10 rounded-full object-cover"
              src={currentConversation.avatar}
              alt={currentConversation.name}
            />
            <div className="ml-3">
              <h2 className="text-lg font-medium text-gray-900">{currentConversation.name}</h2>
              <p className="text-sm text-gray-500">Online</p>
            </div>
          </div>
          <button
            type="button"
            className="p-2 rounded-full text-gray-500 hover:bg-gray-100"
            aria-label="More options"
          >
            <EllipsisHorizontalIcon className="h-5 w-5" />
          </button>
        </div>
        
        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
          <div className="space-y-4">
            {currentConversation.messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sent ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg px-4 py-2 rounded-lg ${
                    message.sent
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 rounded-bl-none shadow'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 text-right ${
                    message.sent ? 'text-indigo-200' : 'text-gray-500'
                  }`}>
                    {message.time}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Message input */}
        <div className="p-4 border-t border-gray-200 bg-white">
          <div className="flex items-center">
            <input
              type="text"
              className="block w-full rounded-full border-0 py-2 pl-4 pr-12 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder="Type a message..."
            />
            <button
              type="button"
              className="ml-2 inline-flex items-center justify-center rounded-full bg-indigo-600 p-2 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <PaperAirplaneIcon className="h-5 w-5" aria-hidden="true" />
              <span className="sr-only">Send message</span>
            </button>
          </div>
        </div>
      </div>
      
      {/* Empty state for mobile when no conversation is selected */}
      <div className="md:hidden flex-1 flex items-center justify-center bg-gray-50">
        <div className="text-center p-6">
          <svg
            className="mx-auto h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          <h3 className="mt-2 text-sm font-medium text-gray-900">No conversation selected</h3>
          <p className="mt-1 text-sm text-gray-500">Select a conversation or start a new one</p>
        </div>
      </div>
    </div>
  );
}
