package com.bookstore.chat.model;

public class ChatMessage {

    public enum MessageType {
        ENTER, TALK, LEAVE
    }

    private MessageType type;
    private String message;
    private String sender;
    private String roomId;

    //Getters and Setters
    public MessageType getType(){ return type; }
    public void setType(MessageType type){ this.type = type; }

    public String getRoomId(){ return roomId; }
    public void setRoomId(String roomId){ this.roomId = roomId; }

    public String getSender(){ return sender;}
    public void setSender(String sender){ this.sender = sender; }

    public String getMessage(){ return message; }
    public void setMessage(String message){ this.message = message; }

}
