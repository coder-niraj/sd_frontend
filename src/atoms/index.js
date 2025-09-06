import { atom } from "recoil"
import { recoilPersist } from 'recoil-persist'

const { persistAtom } = recoilPersist()
const currentUserData = atom({
    key: 'CurrentUserData',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

const chatUserData = atom({
    key: 'chatUser',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

const profileData = atom({
    key: 'profileData',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

const groupChat = atom({
    key: 'groupChat',
    default: {},
    effects_UNSTABLE: [persistAtom],
})

export default { currentUserData, chatUserData, profileData, groupChat }