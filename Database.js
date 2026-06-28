const fs = require("fs");
const path = require("path");

const DATA_PATH = path.join(__dirname, "data", "users.json");

// Nếu chưa có file thì tạo
if (!fs.existsSync(DATA_PATH)) {
    fs.writeFileSync(DATA_PATH, "{}");
}

// Đọc dữ liệu
function loadData() {
    return JSON.parse(fs.readFileSync(DATA_PATH, "utf8"));
}

// Lưu dữ liệu
function saveData(data) {
    fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 4));
}

// Tạo người chơi mới
function createUser(id) {

    const data = loadData();

    if (!data[id]) {

        data[id] = {

            id,

            coins: 50000,

            bank: 0,

            level: 1,

            exp: 0,

            win: 0,

            lose: 0,

            daily: 0,

            weekly: 0,

            monthly: 0

        };

        saveData(data);

    }

}

// Lấy thông tin người chơi
function getUser(id){

    createUser(id);

    const data = loadData();

    return data[id];

}

// Cộng coin
function addCoins(id,amount){

    const data=loadData();

    createUser(id);

    data[id].coins+=amount;

    saveData(data);

}

// Trừ coin
function removeCoins(id,amount){

    const data=loadData();

    createUser(id);

    data[id].coins-=amount;

    if(data[id].coins<0)
        data[id].coins=0;

    saveData(data);

}

module.exports={

    loadData,

    saveData,

    createUser,

    getUser,

    addCoins,

    removeCoins

};
