class GroupChat {

    constructor(from, groupId, message, seen, msgTime, msgDate, msgType, name, avatar) {
        this.from = from;
        this.message = message;
        this.isGroup = true;
        this.groupId = groupId;
        this.msgTime = msgTime;
        this.msgDate = msgDate;
        this.msgType = msgType;
        this.seen = seen;
        this.avatar = avatar;
        this.fromName = name
    }
}
export default GroupChat