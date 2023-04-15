

const isVlaidCommunity = (role) => {
    if(!["Community Admin" ,"Community Moderator" ,"Community Member"].includes(role)) return false;
    return true;
};

const isValid =  (value) => {
    if (typeof value === undefined || value == null || value.length <= 2) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    return true;
  };

  const isEmpty = (empty) => {
          if(Object.keys(empty).length == 0) return false;
          return true;
  }

  const isValidName = function (string) {
    let regex = /^[a-zA-Z\\s]{2,20}$/;
    if (regex.test(string)) {
        return true;
    }
    return false;
};

const isValidPassword = function (password) {
  if(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,15}$/.test(password)) return true;
  return false;
};

const isValidEmail = function (mail) {
  if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) return true;
    return false;
};


module.exports = {isVlaidCommunity ,isValid ,isEmpty ,isValidName ,isValidPassword ,isValidEmail}