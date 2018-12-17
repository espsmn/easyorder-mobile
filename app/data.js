

const speisen = [
{
	id: "1",
	title: "Spaghetti Bolognese",
	description: "Hausgemachte Spaghetti",
	picture: require("./assets/images/speisen/Spaghetti.jpg"),
	cost: 12
},
{
	id: "2",
	title: "Pizza Funghi",
	description: "Steinoffenpizza mit frischen Pilzen aus der Region",
	picture: require("./assets/images/speisen/Pizza.jpg"),
	cost: 10
},
{
	id: "3",
	title: "Wiener Schnitzel",
	description: "Schnitzel vom Lamm nach Wiener Art",
	picture: require("./assets/images/speisen/Schnitzel.jpg"),
	cost: 12.90
},
{
	id: "4",
	title: "Cesar Salat",
	description: "Knackiger Salat direkt aus unserem Garten",
	picture: require("./assets/images/speisen/CesarSalad.jpg"),
	cost: 45.99
},

];

export const getProducts = () => {
    return speisen;
    
}


