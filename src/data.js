export class Product {
   static list = [
      { id: 1, name: "Дегустаційні набори", sublist: [] },
      { id: 2, name: "Напої", sublist: ["Чай", "Бульйон", "Лимонад"] },
      { id: 3, name: "Перші страви", sublist: [] },
      { id: 4, name: "другі страви", sublist: [] },
      { id: 5, name: "фуд конструктор", sublist: [] },
      { id: 6, name: "хлібобулочні вироби", sublist: [] },
      { id: 7, name: "фаст фуд", sublist: [] },
      { id: 8, name: "На вугіллі", sublist: [] },
      { id: 9, name: "Напівфабрикати", sublist: [] },
      { id: 10, name: "Соуси", sublist: [] },
      { id: 11, name: "Десерти", sublist: [] },
      { id: 12, name: "Інші товари", sublist: [] },
   ];
   static sublist = [
      { id: 1, name: "Чай" },
      { id: 2, name: "Бульйон" },
      { id: 3, name: "Лимонад" },
   ];

   static productList = [];

   constructor(name, price, sublist, list) {
      this.name = name;
      this.price = price;
      this.list = list;
      this.sublist = sublist;
   }

   static add = (name, price, sublist, list) => {
      const product = new Product(name, price, sublist, list);

      this.productList.push(product);
      return this.productList;
   };

   static getListNames = () => {
      return this.list.map((obj) => obj.name);
   };

   static getList = () => {
      return this.list;
   };

   static getSubList = (listName) => {
      const listItem = this.list.find((obj) => obj.name === listName);
      return listItem.sublist;
   };

   static getProducts = (subListName) => {
      return this.productList.filter((obj) => obj.name === subListName);
   };
}
