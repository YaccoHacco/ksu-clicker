export const icons = {
    'money': 'mdi:cash-multiple',
    'upgrades': 'mdi:cash-multiple',
    'account': 'material-symbols:account-circle',
    'stats': 'gridicons:stats',
    'prestige': 'material-symbols:keyboard-double-arrow-up-rounded',
    'settings': 'mdi:cog',
    'arrow-right': 'material-symbols:arrow-forward-ios-rounded',
    'arrow-left': 'material-symbols:arrow-back-ios-new-rounded',
    'dropdown': 'material-symbols:arrow-drop-down-circle-outline-rounded',
    'google': 'logos:google-icon',
}


const priceFunc = (start) => {
    //return (x) => (x * Math.log(x + 1)) * speed + start
    return (x) => start*Math.pow(1.1,x)

}

export const upgrades = {
    "College Student": {
        price: priceFunc(1),
        sub: {
            "Coffee Booster": {
                desc: "Increase +0.1",
                price: (x) => [10,100,250,500,1000][x],
            },
            "SAS Attendance": {
                desc: "Increase +0.25",
                price: (x) => [300,500,1000,1500,3000][x],
            },
            "Better Computer": {
                desc: "Multiply 30%",
                price: (x) => [1000,2500,5000,10000,20000][x],
            },
        },
    },
    "Graduate Student": {
        price: priceFunc(15),
        sub: {
            "Better Computer": {
                desc: "Increase +0.2",
                price: (x) => [300,500,1000,1500,3000][x],
            },
            "Recitation Instruction": {
                desc: "Multiply 35%",
                price: (x) => [1000,2500,5000,10000,20000][x],
            },
            "PhD Thesis": {
                desc: "Increase +1",
                price: (x) => [2500,5000,10000,20000,30000][x],
            },
        },
    },
    "Professor": {
        price: priceFunc(250),
        sub: {
            "Better Chalk": {
                desc: "Increase +2",
                price: (x) => [5000,10000,25000,50000,100000][x],
            },
            "Better Projector": {
                desc: "Multiply 40%",
                price: (x) => [10000,25000,50000,100000,200000][x],
            },
            "Lecture Hall Renovations": {
                desc: "Increase +6",
                price: (x) => [25000,50000,100000,200000,250000][x],
            },
        },
    },
    "College Dean": {
        price: priceFunc(2000),
        sub: {
            "Undergraduate Help": {
                desc: "Increase +8",
                price: (x) => [8000,1000,17000,25000,50000][x],
            },
            "Office Renovations": {
                desc: "Multiply 45%",
                price: (x) => [30000,50000,100000,200000,400000][x],
            },
            "Raise": {
                desc: "Increase +25",
                price: (x) => [10000,25000,50000,100000,200000][x],
            },
        },
    },
    "College Dorm": {
        price: priceFunc(40000),
        sub: {
            "Dorm Renovations": {
                desc: "Increase +30",
                price: (x) => [10000,30000,50000,100000,150000][x],
            },
            "Staff Upgrade": {
                desc: "Multiply 50%",
                price: (x) => [100000,200000,300000,500000,700000][x],
            },
            "Dining Hall": {
                desc: "Increase +50",
                price: (x) => [30000,50000,100000,200000,400000][x],
            },
        },
    },
    "Campus Building": {
        price: priceFunc(90000),
        sub: {
            "Water Fountain Upgrade": {
                desc: "Increase +70",
                price: (x) => [90000,150000,200000,250000,300000][x],
            },
            "Coffee Shop": {
                desc: "Multiply 55%",
                price: (x) => [120000,200000,340000,500000,760000][x],
            },
            "New Lecture Hall": {
                desc: "Increase +120",
                price: (x) => [100000,200000,300000,500000,700000][x],
            },
        },
    },
    "Bramlage Coliseum": {
        price: priceFunc(550000),
        sub: {
            "Willie Upgrade": {
                desc: "Increase +320",
                price: (x) => [80000,100000,150000,200000,300000,500000][x],
            },
            "Hoop Upgrade": {
                desc: "Multiply 60%",
                price: (x) => [600000,1000000,1400000,1700000,1900000][x],
            },
            "Player Equipment": {
                desc: "Increase +500",
                price: (x) => [100000,200000,300000,500000,700000][x],
            },
        },
    },
    "Bill Snyder Family Stadium": {
        price: priceFunc(11250000),
        sub: {
            "Band Upgrade": {
                desc: "Increase +750",
                price: (x) => [200000,400000,700000,1000000,1200000][x],
            },
            "Turf Upgrade": {
                desc: "Multiply 65%",
                price: (x) => [1000000,1500000,2000000,2500000,3000000][x],
            },
            "Player Equipment": {
                desc: "Increase +1200",
                price: (x) => [600000,1000000,1400000,1700000,1900000][x],
            },
        },
    },
    "Call Hall": {
        price: priceFunc(100000000),
        sub: {
            "New Icecream Flavor": {
                desc: "Increase +7000",
                price: (x) => [3000000,4500000,6000000,7500000,9000000][x],
            },
            "More Milk Supply": {
                desc: "Multiply 70%",
                price: (x) => [100000000,150000000,200000000,250000000,300000000][x],
            },
            "Staff Upgrade": {
                desc: "Increase +15000",
                price: (x) => [10000000,15000000,20000000,25000000,30000000][x],
            },
        },
    },
    "Kansas State University": {
        price: (x) => 100000000000,
    },
}

export const prestiges = {
    "Rec Pass": {
        desc: "Multiple all output by 3",
        price: 20,
    },
    "Cat Cash": {
        desc: "Cut costs in half",
        price: 35,
    },
    "Bosco Plaza": {
        desc: "Multiple clicks by 100",
        price: 50,
    },
    "Coach Tang": {
        desc: "Cut costs by 1/4",
        price: 80,
    },
    "Bill Snyder": {
        desc: "Multiple output by 7",
        price: 100,
    },
}