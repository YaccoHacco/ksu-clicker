import { _view } from './stores'


export const setView = (view) => {
    _view.set(view)
}

export const getOutputPer = (user, name) => {
    let r = 0
    switch (name) {
        case "College Student":
            r = (0.1 + user.upgrades[name]["Coffee Booster"]*0.1 + user.upgrades[name]["SAS Attendance"]*0.25) * (Math.max(1,user.upgrades[name]["Better Computer"]*1.3)) * (user.prestiges["Bosco Plaza"] ? 100 : 1)
        break;
        case "Graduate Student":
            r = (0.2 + user.upgrades[name]["Better Computer"]*0.2 + user.upgrades[name]["PhD Thesis"]*1) * (Math.max(1,user.upgrades[name]["Recitation Instruction"]*1.35))
        break;
        case "Professor":
            r = (2 + user.upgrades[name]["Better Chalk"]*2 + user.upgrades[name]["Lecture Hall Renovations"]*6) * (Math.max(1,user.upgrades[name]["Better Projector"]*1.4))
        break;
        case "College Dean":
            r = (10 + user.upgrades[name]["Undergraduate Help"]*8 + user.upgrades[name]["Raise"]*25) * (Math.max(1,user.upgrades[name]["Office Renovations"]*1.45))
        break;
        case "College Dorm":
            r = (35 + user.upgrades[name]["Dorm Renovations"]*30 + user.upgrades[name]["Dining Hall"]*50) * (Math.max(1,user.upgrades[name]["Staff Upgrade"]*1.5))
        break;
        case "Campus Building":
            r = (100 + user.upgrades[name]["Water Fountain Upgrade"]*70 + user.upgrades[name]["New Lecture Hall"]*120) * (Math.max(1,user.upgrades[name]["Coffee Shop"]*1.55))
        break;
        case "Bramlage Coliseum":
            r = (400 + user.upgrades[name]["Willie Upgrade"]*320 + user.upgrades[name]["Player Equipment"]*500) * (Math.max(1,user.upgrades[name]["Hoop Upgrade"]*1.6))
        break;
        case "Bill Snyder Family Stadium":
            r = (1000 + user.upgrades[name]["Band Upgrade"]*750 + user.upgrades[name]["Player Equipment"]*1200) * (Math.max(1,user.upgrades[name]["Turf Upgrade"]*1.65))
        break;
        case "Call Hall":
            r = (10000 + user.upgrades[name]["New Icecream Flavor"]*7000 + user.upgrades[name]["Staff Upgrade"]*15000) * (Math.max(1,user.upgrades[name]["More Milk Supply"]*1.70))
        break;
        case "Kansas State University":
            r = (100000)
        break;
    }

    return r * (1 + user.prestige*0.05)
            * (user.prestiges["Rec Pass"] ? 3 : 1)
            * (user.prestiges["Bill Snyder"] ? 7 : 1)
}

export const getMoneyPerClick = (user) => {
    return user ? (user.upgrades["College Student"].count + 1) * getOutputPer(user, "College Student") : 0
}

export const getMoneyPerSecond = (user) => {
    return user ? (
        (user.upgrades["Graduate Student"].count)*getOutputPer(user, "Graduate Student") + 
        (user.upgrades["Professor"].count)*getOutputPer(user, "Professor") + 
        (user.upgrades["College Dean"].count)*getOutputPer(user, "College Dean") + 
        (user.upgrades["College Dorm"].count)*getOutputPer(user, "College Dorm") + 
        (user.upgrades["Campus Building"].count)*getOutputPer(user, "Campus Building") + 
        (user.upgrades["Bramlage Coliseum"].count)*getOutputPer(user, "Bramlage Coliseum") + 
        (user.upgrades["Bill Snyder Family Stadium"].count)*getOutputPer(user, "Bill Snyder Family Stadium") + 
        (user.upgrades["Call Hall"].count)*getOutputPer(user, "Call Hall") + 
        (user.upgrades["Kansas State University"].count)*getOutputPer(user, "Kansas State University")
    ) : 0
}

export const getPrestigePoints = (user) => {
    return user ? Math.pow(user.money, 1.01)/10000000 : 0
}


const numAbbrv = [
    "",
    "K", 	//Thousand (Kilo) 	10^3 	1000
    "M", 	//Million 	10^6 	1000K
    "B", 	//Billion 	10^9 	1000M
    "t", 	//Trillion 	10^12 	1000B
    "q", 	//Quadrillion 	10^15 	1000t
    "Q", 	//Quintillion 	10^18 	1000q
    "s", 	//Sextillion 	10^21 	1000Q
    "S", 	//Septillion 	10^24 	1000s
    "o", 	//Octillion 	10^27 	1000S
    "n", 	//Nonillion 	10^30 	1000o
    "d", 	//Decillion 	10^33 	1000n
    "U", 	//Undecillion 	10^36 	1000d
    "D", 	//Duodecillion 	10^39 	1000U
    "T", 	//Tredecillion 	10^42 	1000D
    "Qt", 	//Quattuordecillion 	10^45 	1000T
    "Qd", 	//Quindecillion 	10^48 	1000Qt
    "Sd", 	//Sexdecillion 	10^51 	1000Qd
    "St", 	//Septendecillion 	10^54 	1000Sd
    "O",	//Octodecillion 	10^57 	1000St
    "N",	//Novemdecillion 	10^60 	1000O
    "v",    //Vigintillion 	10^63 	1000N
    "c",    //Unvigintillion 	10^66 	1000v 
]

export const stringNum = (num) => {
    let prefix = num < 0 ? "-" : ""
    num = Math.abs(num)
    if (num < 0.01) return "0"
    let dig = Math.max(Math.floor(Math.log10(num)/3),0)
    let short = (num / (Math.pow(10,dig*3))).toPrecision(3)
    if (dig < numAbbrv.length) return prefix + short + "" + numAbbrv[dig]
    return  prefix + short + "e" + (dig*3)
}