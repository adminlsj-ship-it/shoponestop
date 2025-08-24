import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { ArrowLeft, Search, MessageCircle, Phone, Video, MoveHorizontal as MoreHorizontal, Send, Paperclip } from 'lucide-react-native';

const conversations = [
  {
    id: '1',
    clientName: 'Emma Wilson',
    clientImage: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Thank you for the amazing haircut! Can I book another appointment?',
    timestamp: '2 min ago',
    unread: true,
    online: true,
  },
  {
    id: '2',
    clientName: 'Sofia Martinez',
    clientImage: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'What time works best for the makeup session tomorrow?',
    timestamp: '1 hour ago',
    unread: false,
    online: false,
  },
  {
    id: '3',
    clientName: 'Isabella Chen',
    clientImage: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?auto=compress&cs=tinysrgb&w=400',
    lastMessage: 'Perfect! See you at 3 PM for the spa treatment.',
    timestamp: '3 hours ago',
    unread: false,
    online: true,
  },
];

const messages = [
  {
    id: '1',
    senderId: 'client',
    message: 'Hi! I loved my last appointment. Can I book another one for next week?',
    timestamp: '10:30 AM',
    type: 'text',
  },
  {
    id: '2',
    senderId: 'business',
    message: 'Hi Emma! I\'m so glad you loved it! I have availability next Tuesday at 2 PM or Wednesday at 11 AM. Which works better for you?',
    timestamp: '10:32 AM',
    type: 'text',
  },
  {
    id: '3',
    senderId: 'client',
    message: 'Tuesday at 2 PM sounds perfect!',
    timestamp: '10:35 AM',
    type: 'text',
  },
  {
    id: '4',
    senderId: 'business',
    message: 'Great! I\'ve booked you for Tuesday, December 24th at 2:00 PM for a Hair Cut & Style. Looking forward to seeing you!',
    timestamp: '10:36 AM',
    type: 'text',
  },
];

export default function MessagesScreen() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredConversations = conversations.filter(conv =>
    conv.clientName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    
    // Add message logic here
    setNewMessage('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <ArrowLeft size={24} color="#374151" strokeWidth={2} />
        </TouchableOpacity>
        <Text style={styles.title}>Messages</Text>
        <View style={styles.placeholder} />
      </View>

      <View style={styles.content}>
        {/* Conversations List */}
        <View style={styles.conversationsList}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#6B7280" strokeWidth={2} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search conversations..."
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholderTextColor="#9CA3AF"
            />
          </View>

          <ScrollView style={styles.conversationsScroll}>
            {filteredConversations.map((conversation) => (
              <TouchableOpacity
                key={conversation.id}
                style={[
                  styles.conversationItem,
                  selectedConversation.id === conversation.id && styles.selectedConversation
                ]}
                onPress={() => setSelectedConversation(conversation)}
              >
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: conversation.clientImage }} style={styles.avatar} />
                  {conversation.online && <View style={styles.onlineIndicator} />}
                </View>
                
                <View style={styles.conversationInfo}>
                  <View style={styles.conversationHeader}>
                    <Text style={styles.clientName}>{conversation.clientName}</Text>
                    <Text style={styles.timestamp}>{conversation.timestamp}</Text>
                  </View>
                  <Text style={[
                    styles.lastMessage,
                    conversation.unread && styles.unreadMessage
                  ]} numberOfLines={1}>
                    {conversation.lastMessage}
                  </Text>
                </View>
                
                {conversation.unread && <View style={styles.unreadBadge} />}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Chat Area */}
        <View style={styles.chatArea}>
          {/* Chat Header */}
          <View style={styles.chatHeader}>
            <View style={styles.chatHeaderLeft}>
              <Image source={{ uri: selectedConversation.clientImage }} style={styles.chatAvatar} />
              <View>
                <Text style={styles.chatClientName}>{selectedConversation.clientName}</Text>
                <Text style={styles.chatStatus}>
                  {selectedConversation.online ? 'Online' : 'Last seen 2 hours ago'}
                </Text>
              </View>
            </View>
            
            <View style={styles.chatActions}>
              <TouchableOpacity style={styles.chatActionButton}>
                <Phone size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <Video size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.chatActionButton}>
                <MoreHorizontal size={20} color="#6B7280" strokeWidth={2} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Messages */}
          <ScrollView style={styles.messagesContainer}>
            {messages.map((message) => (
              <View
                key={message.id}
                style={[
                  styles.messageItem,
                  message.senderId === 'business' ? styles.sentMessage : styles.receivedMessage
                ]}
              >
                <Text style={[
                  styles.messageText,
                  message.senderId === 'business' ? styles.sentMessageText : styles.receivedMessageText
                ]}>
                  {message.message}
                </Text>
                <Text style={[
                  styles.messageTimestamp,
                  message.senderId === 'business' ? styles.sentTimestamp : styles.receivedTimestamp
                ]}>
                  {message.timestamp}
                </Text>
              </View>
            ))}
          </ScrollView>

          {/* Message Input */}
          <View style={styles.messageInput}>
            <TouchableOpacity style={styles.attachButton}>
              <Paperclip size={20} color="#6B7280" strokeWidth={2} />
            </TouchableOpacity>
            <TextInput
              style={styles.textInput}
              placeholder="Type a message..."
              value={newMessage}
              onChangeText={setNewMessage}
              placeholderTextColor="#9CA3AF"
              multiline
            />
            <TouchableOpacity 
              style={styles.sendButton}
              onPress={handleSendMessage}
            >
              <Send size={20} color="#FFFFFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: '#111827',
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    flexDirection: 'row',
  },
  conversationsList: {
    width: '35%',
    backgroundColor: '#FFFFFF',
    borderRightWidth: 1,
    borderRightColor: '#E5E7EB',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin: 16,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
  },
  conversationsScroll: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  selectedConversation: {
    backgroundColor: '#FEF2F2',
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
  },
  onlineIndicator: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#10B981',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  conversationInfo: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  clientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
  },
  timestamp: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#9CA3AF',
  },
  lastMessage: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#6B7280',
  },
  unreadMessage: {
    fontFamily: 'Inter-SemiBold',
    color: '#111827',
  },
  unreadBadge: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#F43F5E',
    marginLeft: 8,
  },
  chatArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  chatHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  chatClientName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#111827',
    marginBottom: 2,
  },
  chatStatus: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#10B981',
  },
  chatActions: {
    flexDirection: 'row',
    gap: 8,
  },
  chatActionButton: {
    padding: 8,
  },
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageItem: {
    marginBottom: 16,
    maxWidth: '80%',
  },
  sentMessage: {
    alignSelf: 'flex-end',
  },
  receivedMessage: {
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 4,
  },
  sentMessageText: {
    backgroundColor: '#F43F5E',
    color: '#FFFFFF',
    padding: 12,
    borderRadius: 16,
    borderBottomRightRadius: 4,
    fontFamily: 'Inter-Regular',
  },
  receivedMessageText: {
    backgroundColor: '#F3F4F6',
    color: '#111827',
    padding: 12,
    borderRadius: 16,
    borderBottomLeftRadius: 4,
    fontFamily: 'Inter-Regular',
  },
  messageTimestamp: {
    fontSize: 10,
    fontFamily: 'Inter-Regular',
  },
  sentTimestamp: {
    color: '#9CA3AF',
    textAlign: 'right',
  },
  receivedTimestamp: {
    color: '#9CA3AF',
    textAlign: 'left',
  },
  messageInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
  attachButton: {
    padding: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#111827',
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#F43F5E',
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
});