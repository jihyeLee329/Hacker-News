import { atom } from "recoil";


const DimmedAtom = atom({
    key:'dimmed',
    default:false
});

const ShowAboutAtom = atom({
    key:'showAbout',
    default:false
})

const UserChkAtom = atom({
    key:'userChk',
    default: false
})

const UserIdAtom = atom({
    key:'userId',
    default:""
})

const SortCheckedAtom = atom({
    key:'sortChecked',
    default:true
})

const ListModeToggle = atom({
    key:'listModeToggle',
    default: true
})

const DarkModeBtn = atom({
    key:'darkMode',
    default:false
})

export {DimmedAtom, ShowAboutAtom, UserChkAtom, UserIdAtom, 
    SortCheckedAtom,ListModeToggle, DarkModeBtn};