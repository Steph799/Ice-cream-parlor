export const subjects = ["General", "Feedback", "Complain", "workshops & Careers"]
export const navBarOptions = [{ name: "Home", navigate: "homepage" }, { name: "Our products", navigate: "products" },
{ name: "Deliveries", navigate: "deliveries" }, { name: "About Jaujita", navigate: "aboutus" },
{ name: "Contact us", navigate: "contact" }] 


export const accessDenied = "Access denied, email or password is not correct"    //logging form "
export const minPasswordLength = 8

export const allFlavors = ["Dark chocolate", "Milk chocolate", "Vanilla", "Strawberry", "Mango", "Passion fruit",
    "Ferrero Rocher", "Snickers", "Brownie", "Pineapple", "Mocha", "Cafe", "Banana", "Raspberry & blackberry", "Cranberry",
    "Chocolate & hazelnuts", "Chocolate & almonds", "Vanilla and cookies", "Kinder chocolate", "Calafate", "Tiramisu", "Melon",
    "Watermelon", "Peach", "Chocolate chips", "Coconut", "Cinnamon", "Frosty"]; //Frosty stands for vanilla with mocha

export const workshops = ["Ice-creams for beginners", "Ice-creams for advanced", "How to make chocolate chips cookies",
    "The brownie's secrets", "The best Soufflé", "How to make a tasty & healthy Yogurt", "Upgrade your Waffles"]



export const minIdVal = 10000000  // user/buy
export const minIdDigitsError = `Id must be at least ${minIdVal.toString().length} digits` // user/buy
export const minPasswordDigitsError = `Password must contain at least ${minPasswordLength} characters`

export const deliveryReq = `http://localhost:4000/api/deliveries`; //buy form
export const creditCardFormatLength = 19;  //1111-2222-3333-4444
export const thanksForBuying = `Thank you for buying from Jaujita. Your order number is ${Math.floor(Math.random() * 1000000)}. 
we will send you an update when your order has shipped. We hope to hear from you again soon`
  
export const creditCardFormatNote = "* Your credit card format number should be like that: 1111-2222-3333-4444"
export const streetNumError = "street number should be integer & positive"



export const getCurrentFlavors = (date) => {
    const currentIceCreams = []
    switch (date.getMonth()) {
        case 1:
        case 9:
            allFlavors.sort((a, b) => a - b)
            return fillContainers(currentIceCreams)
        case 2:
        case 10:
            allFlavors.sort((a, b) => b - a)
            return fillContainers(currentIceCreams)
        case 3:
            const upperIndexes = allFlavors.filter((iceCream, index) => index > 12)
            return fillContainers(upperIndexes)
        case 4:
            const evens = allFlavors.filter((iceCream, index) => index % 2 === 0)
            return fillContainers(evens)
        case 5:
            const odds = allFlavors.filter((iceCream, index) => index % 2 === 1)
            return fillContainers(odds)
        case 6:
            const evenOrDividedBy3 = allFlavors.filter((iceCream, index) => index % 2 === 0 || index % 3 === 0)
            return fillContainers(evenOrDividedBy3)
        case 7:
            const filterByChocolates = allFlavors.filter((iceCream) => iceCream.contains("chocolate") || iceCream.contains("Chocolate"))
            return fillContainers(filterByChocolates)
        case 8:
            const middle = allFlavors.filter((iceCream, index) => index > 6 && index < 20)
            return fillContainers(middle)

        default: return fillContainers(currentIceCreams)
    }
}

const fillContainers = (currentIceCreams) => {
    for (let i = 0; i < 12; i++)  currentIceCreams.push(allFlavors[i])
    return currentIceCreams
}

export const currentWorkshop = (date) => {
    switch (date.getMonth()) {
        case 0:
        case 1:
            return workshops[0]
        case 2:
        case 3:
            return workshops[1]
        case 4:
        case 5:
            return workshops[2]
        case 6:
        case 7:
            return workshops[3]
        case 8:
        case 9:
            return workshops[4]
        case 10: return workshops[5]
        default: return workshops[6]
    }
}

export const products = [{ name: "Ice-creams & Milkshakes", route: "ice-creams&milkshakes", image: "https://images.unsplash.com/photo-1579954115563-e72bf1381629?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80" },
{ name: "Yogurts", route: "yogurts", image: 'https://images.unsplash.com/photo-1517422361159-d84fd5600d22?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1331&q=80' },
{ name: "Pancakes", route: "pancakes", image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1025&q=80" },
{ name: "Waffles", route: "waffles", image: "https://images.unsplash.com/photo-1562513872-634b8fae6dbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" },
{ name: "Souffle", route: "souffle", image: "https://apiv1.chef-lavan.co.il/uploads/images/f7b1f7ffda3fa42366573fc96f114de2.jpg" },
{ name: "Beverages", route: "beverages", image: "https://images.unsplash.com/photo-1557142046-c704a3adf364?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=387&q=80" }]


export const productsDetails = [{
    product: "Ice-creams & Milkshakes", basicData: `We have a dozen of flavors that change for time to time.
Every one of the is unique and very authentic. Every ice-cream is 100% natural. The fruits are always the fruits of the season. You will
notice immediately that the taste will mimic the original thing`, price: [`1 ball - 3$`, `2 balls - 5$`, `3 balls - 6.5$`,
        `1kg - 8$`, `1.5kg - 11$`, `2kg - 14$`, `3 kg - 20$`, `Small glass of milkshake (up to 3 flavors) - 5$`,
        `Big glass of milkshake (up to 5 flavors) - 7$`]
},
{
    product: "Yogurts", basicData: `Natural yogurts that are made with 1.5% fat and contains 7gr of proteins for every 100ml. Also they are enriched 
with Calcium. You can add additions (fruits or candies) as much as you want`, price: ["Small - 5$", "Medium - 8$", "Big - 10$"]
}, {
    product: "Pancakes", basicData: `Homemade pancakes with
     a variety of choices for your decision (based on fruits or chocolates...). It comes with 2 small ice-cream balls for your choice`,
    price: [`Small portion - 12$`, `Big portion - 21$`]
},
{
    product: "Waffles", basicData: `The origin may come from Belgium, but we brought it to perfection. A crispy waffle with many
ingredients, accompanied with one ice-cream for your choice.`, price: [`Small waffle - 13$`, `Big waffle - 22$`]
},
{
    product: "Souffle", basicData: `A hot chocolate souffle which made from a very high quality chocolate. It comes with lava centre served
     and an ice cream`, price: ["Small - 15$", "Big - 24$"]
},
{
    product: "Beverages", basicData: `Coffee beans from Colombia (from the region of \"Valle del Cocora\"  to be precise) and chocolate from Ecuador
    in short`, price: ["Cappuccino - 3$", "Espresso - 2$", "Hot-chocolate - 4$", "Mocha - 4$", "Latte-macchiato - 4.5$", "Ice-cafe - 4%",
        "Te - 2$"]
}]


export const codes = ["03", "04", "07", "09", "050", "051", "052", "053", "054", "058"]
export const minZipCodeNum = 1000000
export const zipCodeError = `Zip code should contain at least ${minZipCodeNum.toString().length} digits!`
export const pricesPerWeight = { 1: 8, 1.5: 11, 2: 14, 3: 20 }
export const maxWeight = Math.max(...Object.keys(pricesPerWeight))
export const maxFlavors = 4;

export const maxFlavorsPerWeight = (weight) => {
    switch (Number(weight)) {
        case 1:
            return 2;
        case 1.5:
        case 2:
            return 3
        default:
            return maxFlavors
    }
}

export const maxRate = 5;
export const rateRangeError = 'Rate values must be between 0 and 5';

const biggerThanTen = (number) => `${(number < 10 ? `0${number}` : number)}`;

export const today = new Date();
const currentYear = today.getFullYear();
const currentMonth = today.getMonth() + 1;
const currentDay = today.getDate();
export const convertDate = (date) => `${date.getFullYear()}-${biggerThanTen(date.getMonth() + 1)}-${biggerThanTen(date.getDate())}`
export const maxDate = `${currentYear}-${biggerThanTen(currentMonth)}-${biggerThanTen(currentDay)}`       //for hire date


const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1);
const validMonth = nextMonth.getMonth() + 1;
const validYear = nextMonth.getFullYear();
export const minDate = `${validYear}-${biggerThanTen(validMonth)}`; //for card validation

const legalAge = 18;
const defaultYear = 1970;

export const getAge = (birthDay) => new Date(today - birthDay).getFullYear() - defaultYear

export const isLegalAge = (birthDay) => {
    const age = getAge(birthDay);
    return age >= legalAge
}

export const roles = ["CEO", "CTO", "Web developer", "Chef", "Waiter", "Accountant", "Designer", "Receptionist", "Shift manager"]
export const confirmDelete = (firstName, lastName) => `Are you sure you want to delete ${firstName} ${lastName} from the system?`
export const passwordVerification = "In order to make changes, please enter the password of the user";
export const googleMapAddress = (street, houseNumber, city) => `https://www.google.com/maps/place/${street}+${houseNumber}+${city}`;
export const goBackMsg = "Are you sure want to go back (details won't be saved)?"
export const legalAgeMsg = "An employee must have at least 18 years old!"
export const updateEmployeeMsg = "Employee details were updated"
export const addedEmployeeMsg = "The new employee was added to the system"
export const validExpirationDateMsg = "Date must be later than the current month"
export const postCommentMsg = `Your comment has been posted`;
export const deliveryTimeValidationMsg = 'Delivery time must be later than the current time'
export const deliveryServiceHours = 'Delivery service is available only between 10:00 to 22:00';
export const distinctFlavorsMsg = 'All of your flavors must be distinct'
export const msgArrived = `Thank you for contact with us. Your message has arrived successfully`
export const logoutConfirmation = "Are you sure you want to log out?"
export const deliveryProcessFailed = "Oops... something failed during the process"
export const confirmationTime = 300;
export const exceededTimeMsg = `The system cancel the request since you didn't confirm for ${confirmationTime/60} minutes`
export const confirmCancellationMsg = "Your details will be deleted. Are you sure you want to cancel the order?"